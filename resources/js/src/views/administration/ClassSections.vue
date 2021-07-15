<template>
    <div id="data-list-list-view" class="data-list-container">

        <class-section-form v-if="classid != ''" :isSidebarActive="addNewDataSidebar" :classid="classid" @loadSections="loadSections" @closeSidebar="toggleDataSidebar" :data="sidebarData" />

        <vs-table ref="table" @selected="showSubject" search :data="classsections">

            <div slot="header" class="flex flex-wrap-reverse items-center flex-grow justify-between">
                <div class="btn-add-new p-3 mb-4 mr-4 rounded-lg cursor-pointer flex items-center justify-center text-lg font-medium text-base text-primary border border-solid border-primary" @click="addNewData">
                    <feather-icon icon="PlusIcon" svgClasses="h-4 w-4" />
                    <span class="ml-2 text-base text-primary">Add New Section</span>
                </div>
            </div>

            <template slot="thead">
                <vs-th sort-key="code">Name</vs-th>
                <vs-th sort-key="name">Code</vs-th>
                <vs-th sort-key="class">Class</vs-th>
                <vs-th sort-key="">Enrollment</vs-th>
                <vs-th sort-key="">Attendance</vs-th>
                <vs-th sort-key="">Subjects</vs-th>
                <vs-th>Action</vs-th>
            </template>

            <template slot-scope="{data}">
                <tbody>
                <vs-tr :data="tr" :key="indextr" v-for="(tr, indextr) in data">

                    <vs-td>
                        <p class="product-name font-medium truncate">{{ tr.name }}</p>
                    </vs-td>
                    <vs-td>
                        <p class="product-name font-medium truncate">{{ tr.code }}</p>
                    </vs-td>
                    <vs-td>
                        <p class="product-name font-medium truncate">{{ tr.class }}</p>
                    </vs-td>
                    <vs-td>
                        <p class="product-name font-medium truncate">{{ tr.enrolmenttype == 1 ? 'By Session' : 'By Term' }}</p>
                    </vs-td>
                    <vs-td>
                        <p class="product-name font-medium truncate">{{ tr.attendancetype == 1 ? 'Class wise' : 'Subject wise' }}</p>
                    </vs-td>
                    <vs-td>
                        <feather-icon icon="InfoIcon" svgClasses="w-5 h-5 hover:text-primary stroke-current" @click.stop="openSubjects(tr.id , tr.name)" />
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

import ClassSectionForm from './ClassSectionForm'
export default {
    components: {
        'class-section-form' : ClassSectionForm
    },
    data () {
        return {
            total : 0,
            current : 1,
            classid : '',
            sectionid : '',
            selected: [],
            // products: [],

            isMounted: false,

            // Data Sidebar
            addNewDataSidebar: false,
            sidebarData: {},
            countries : []
        }
    },
    computed: {
        classsections () {
            return this.$store.getters['adminData/getClassSections']
        },
    },
    watch: {
    },
    methods: {
        addNewData () {
            this.sidebarData = {}
            this.toggleDataSidebar(true)
        },
        openSubjects (section) {
            this.$router.push({name : 'section-subjects' , params : {sectionid : section}})
        },
        showSubject (tr) {
            this.$router.push({name : 'section-subjects' , params : {sectionid : tr.id}})
        },
        deleteData () {
            if(this.sectionid != ''){
                this.$store.dispatch('adminData/removeClassSection', {
                    'id' : this.sectionid,
                    'type' : 'delete'
                })
                .then ( () => {
                    this.$vs.notify({
                        color: 'success',
                        text: 'Section deleted successfully !',
                    })
                })
                .catch( () => {
                    this.$vs.notify({
                        color: 'danger',
                        text: 'Something went wrong ! Please contact system administrator',
                    })
                })
                .finally(() => {
                    this.loadSections()
                })
            }
        },
        openConfirm (tr) {
            this.sectionid = tr
            this.$vs.dialog({
                type: 'confirm',
                color: 'danger',
                title: 'Confirmation',
                text: 'Are you sure want to delete this Section ?',
                accept: this.deleteData,
                cancel : this.cancel,
            })
        },
        cancel  () {
            this.sectionid = ''
        },

        loadSections () {
            loader.show(this.$vs)
            this.$store.dispatch('adminData/processClassSections', {
                'type': 'get',
                'OBJ' : {
                    'classid' : this.classid
                }
            })
            .finally( () => {
                loader.hide(this.$vs)
            })
        },
        editData (data) {
            this.sidebarData = data
            this.toggleDataSidebar(true)
        },
        toggleDataSidebar (val = false) {
            this.addNewDataSidebar = val
        },

    },
    created () {
        if (!administration.isRegistered) {
            this.$store.registerModule('adminData', administration)
            administration.isRegistered = true
        }
        if (! this.$route.params.id) {
            this.router.push({name : 'classes'})
        }
        else  {
            this.classid = this.$route.params.id
            this.loadSections()
        }
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
