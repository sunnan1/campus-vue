<template>
    <div id="data-list-list-view" class="data-list-container">

        <campus-form :isSidebarActive="addNewDataSidebar" @reloadcampuses="getCampuses" @closeSidebar="toggleDataSidebar" :data="sidebarData" :countries="countries" :currencies="currencies" :timeformats="timeformats" :dateformats="dateformats" :timezones="timezones" />

        <vs-table ref="table" search :data="campuses">

            <div slot="header" class="flex flex-wrap-reverse items-center flex-grow justify-between">

                <div class="btn-add-new p-3 mb-4 mr-4 rounded-lg cursor-pointer flex items-center justify-center text-lg font-medium text-base text-primary border border-solid border-primary" @click="addNewData">
                    <feather-icon icon="PlusIcon" svgClasses="h-4 w-4" />
                    <span class="ml-2 text-base text-primary">Add New</span>
                </div>
            </div>

            <template slot="thead">
                <vs-th sort-key="code">Code</vs-th>
                <vs-th sort-key="name">Campus Name</vs-th>
                <vs-th sort-key="email">Email</vs-th>
                <vs-th sort-key="phone">Phone</vs-th>
                <vs-th sort-key="country">Country</vs-th>
                <vs-th sort-key="timezone">Time Zone</vs-th>
                <vs-th>Action</vs-th>
            </template>

            <template slot-scope="{data}">
                <tbody>
                <vs-tr :data="tr" :key="indextr" v-for="(tr, indextr) in data">

                    <vs-td>
                        <p class="product-code font-medium truncate">{{ tr.code }}</p>
                    </vs-td>
                    <vs-td>
                        <p class="product-name font-medium truncate">{{ tr.name }}</p>
                    </vs-td>
                    <vs-td>
                        <p class="product-name font-medium truncate">{{ tr.email }}</p>
                    </vs-td>
                    <vs-td>
                        <p class="product-name font-medium truncate">{{ tr.phone }}</p>
                    </vs-td>
                    <vs-td>
                        <p class="product-name font-medium truncate">{{ countryname(tr.country) }}</p>
                    </vs-td>
                    <vs-td>
                        <p class="product-name font-medium truncate">{{ tr.timezone }}</p>
                    </vs-td>

                    <vs-td class="whitespace-no-wrap">
                        <feather-icon icon="EditIcon" svgClasses="w-5 h-5 hover:text-primary stroke-current" @click.stop="editData(tr)" />
                        <feather-icon icon="TrashIcon" svgClasses="w-5 h-5 hover:text-danger stroke-current" class="ml-2" @click.stop="openConfirm(tr.id)" />
                    </vs-td>
                </vs-tr>
                </tbody>
            </template>
        </vs-table>
    </div>
</template>

<script>
import administration from '../../store/modules/administration/administrationDataList.js'
import loader from '../../core/utilities/Loader'
import common from '../../core/requests/common'
import CampusForm from './CampusForm'

export default {
    components: {
        'campus-form' : CampusForm
    },
    data () {
        return {
            campusid : '',
            isMounted: false,

            // Data Sidebar
            addNewDataSidebar: false,
            sidebarData: {},
            countries : []
        }
    },
    computed: {

        campuses () {
            return this.$store.getters['adminData/getCampuses']
        },
        currencies () {
            return this.$store.getters['currencies']
        },
        timeformats () {
            return this.$store.getters['timeformats']
        },
        dateformats () {
            return this.$store.getters['dateformats']
        },
        timezones () {
            return this.$store.getters['timezone']
        },

    },
    methods: {
        countryname (countryid) {
            return this.countries.map( (val , index) => {
                return ( countryid == val.id ) ? val.name : ''
            })[0]
        },
        addNewData () {
            loader.show(this.$vs)

            this.sidebarData = {}
            this.toggleDataSidebar(true)
            this.loadDetails()
        },
        deleteData () {
            if(this.campusid != '') {
                this.$store.dispatch('adminData/removeCampus' , {
                    'id' : this.campusid
                })
                    .then ( () => {
                        this.$vs.notify({
                            color: 'success',
                            text: 'Campus deleted successfully !',
                        })
                    })
                    .catch ( () => {
                        this.$vs.notify({
                            color: 'danger',
                            text: 'Something went wrong ! Please contact system administrator',
                        })
                    })
                    .finally( () => {
                    this.getCampuses()
                })
            }
        },
        openConfirm (tr) {
            this.campusid = tr
            this.$vs.dialog({
                type: 'confirm',
                color: 'danger',
                title: 'Confirmation',
                text: 'Are you sure you want to delete this Campus ?',
                accept: this.deleteData,
                cancel : this.cancel,
            })
        },
        cancel  () {
            this.campusid = ''
        },

        async loadDetails () {
            await this.$store.dispatch('fetchCurrencies')
            await this.$store.dispatch('fetchtimeformats')
            await this.$store.dispatch('fetchdateformats')
            await this.$store.dispatch('fetchtimezones')
            loader.hide(this.$vs)
        },
        loadCountries() {
            loader.show(this.$vs)
            common.countries(this.$store.state)
                .then( response => {
                    this.countries = response.data.data.data
                })
                .catch( error => {

                })
                .finally( () => {
                    loader.hide(this.$vs)
                })
        },
        editData (data) {
            this.loadDetails()
            this.sidebarData = data
            this.toggleDataSidebar(true)
        },
        toggleDataSidebar (val = false) {
            this.addNewDataSidebar = val
        },

        getCampuses () {
            loader.show(this.$vs)

            this.$store.dispatch('adminData/fetchCampuses')
                .finally(() => {
                    loader.hide(this.$vs)
                })
        },
    },
    created () {
        if (!administration.isRegistered) {
            this.$store.registerModule('adminData', administration)
            administration.isRegistered = true
        }
        this.getCampuses()
        this.loadCountries()
    },
    mounted () {
        this.isMounted = true
    }
}
</script>

<style lang="scss">
#data-list-list-view {
    .vs-con-table {

        /*
          Below media-queries is fix for responsiveness of action buttons
          Note: If you change action buttons or layout of this page, Please remove below style
        */
        @media (max-width: 689px) {
            .vs-table--search {
                margin-left: 0;
                max-width: unset;
                width: 100%;

                .vs-table--search-input {
                    width: 100%;
                }
            }
        }

        @media (max-width: 461px) {
            .items-per-page-handler {
                display: none;
            }
        }

        @media (max-width: 341px) {
            .data-list-btn-container {
                width: 100%;

                .dd-actions,
                .btn-add-new {
                    width: 100%;
                    margin-right: 0 !important;
                }
            }
        }

        .product-name {
            max-width: 23rem;
        }

        .vs-table--header {
            display: flex;
            flex-wrap: wrap;
            margin-left: 1.5rem;
            margin-right: 1.5rem;
            > span {
                display: flex;
                flex-grow: 1;
            }

            .vs-table--search{
                padding-top: 0;

                .vs-table--search-input {
                    padding: 0.9rem 2.5rem;
                    font-size: 1rem;

                    &+i {
                        left: 1rem;
                    }

                    &:focus+i {
                        left: 1rem;
                    }
                }
            }
        }

        .vs-table {
            border-collapse: separate;
            border-spacing: 0 1.3rem;
            padding: 0 1rem;

            tr{
                box-shadow: 0 4px 20px 0 rgba(0,0,0,.05);
                td{
                    padding: 20px;
                    &:first-child{
                        border-top-left-radius: .5rem;
                        border-bottom-left-radius: .5rem;
                    }
                    &:last-child{
                        border-top-right-radius: .5rem;
                        border-bottom-right-radius: .5rem;
                    }
                }
                td.td-check{
                    padding: 20px !important;
                }
            }
        }

        .vs-table--thead{
            th {
                padding-top: 0;
                padding-bottom: 0;

                .vs-table-text{
                    text-transform: uppercase;
                    font-weight: 600;
                }
            }
            th.td-check{
                padding: 0 15px !important;
            }
            tr{
                background: none;
                box-shadow: none;
            }
        }

        .vs-table--pagination {
            justify-content: center;
        }
    }
}
</style>
