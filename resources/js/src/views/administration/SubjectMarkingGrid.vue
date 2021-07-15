<template>
    <div id="data-list-list-view" class="data-list-container">

        <subject-marking-form :isSidebarActive="addNewDataSidebar" @addMarkingValue="addMarkingValue" :markingvalues="markingvalues"  @closeSidebar="toggleDataSidebar" :data="sidebarData" />

        <vs-table ref="table" :data="subjActivities">

            <div slot="header" class="flex flex-wrap-reverse items-center flex-grow justify-between">
                <div class="btn-add-new p-3 mb-4 mr-4 rounded-lg cursor-pointer flex items-center justify-center text-lg font-medium text-base text-primary border border-solid border-primary" @click="addNewData">
                    <feather-icon icon="PlusIcon" svgClasses="h-4 w-4" />
                    <span class="ml-2 text-base text-primary">Add New</span>
                </div>
            </div>

            <template slot="thead">
                <vs-th sort-key="activitytype">Marking Value</vs-th>
                <vs-th>Action</vs-th>
            </template>

            <template slot-scope="{data}">
                <tbody>
                <vs-tr :data="tr" :key="indextr" v-for="(tr, indextr) in data">

                    <vs-td>
                        <p class="product-name font-medium truncate">{{ getMarkingName(tr) }}</p>
                    </vs-td>
                    <vs-td class="whitespace-no-wrap">
                        <feather-icon icon="TrashIcon" svgClasses="w-5 h-5 hover:text-danger stroke-current" class="ml-2" @click.stop="openConfirm(tr.id)" />
                    </vs-td>
                </vs-tr>
                </tbody>
            </template>
        </vs-table>
    </div>
</template>

<script>
import loader from '../../core/utilities/Loader'
import SubjectMarkingForm from './SubjectMarkingForm'

export default {
    components: {
        'subject-marking-form' : SubjectMarkingForm
    },
    props : ['markingvalues','dataArr'],
    data () {
        return {
            deleteAc : '',
            subjActivities : [],
            isMounted: false,
            addNewDataSidebar: false,
            sidebarData: {},
        }
    },
    computed: {

    },
    watch: {

    },
    methods: {
        getMarkingName (val) {
            let obj = this.markingvalues.find(e => e.id == val)
            return obj.name
        },
        addNewData () {
            this.sidebarData = {}
            this.toggleDataSidebar(true)
        },
        editData (data) {
            this.sidebarData = data
            this.toggleDataSidebar(true)
        },
        toggleDataSidebar (val = false) {
            this.addNewDataSidebar = val
        },
        deleteRecord (){
            var index = this.subjActivities.map(x => {
                return x.id;
            }).indexOf(this.deleteAc);

            this.subjActivities.splice(index, 1);
            this.$emit("updateArr" , this.subjActivities)
            this.$vs.notify({
                color: 'danger',
                text: 'Marking Value removed successfully !',
            })
        },
        openConfirm (tr) {
            this.deleteAc = tr
            this.$vs.dialog({
                type: 'confirm',
                color: 'danger',
                title: 'Confirmation',
                text: 'Are you sure you want to delete this Marking Value ?',
                accept: this.deleteRecord,
                cancel : this.cancel,
            })
        },
        cancel () {

        },
        addMarkingValue (data) {
            let obj = this.subjActivities.find(e => e == data)
            if (obj) {
                this.$vs.notify({
                    color: 'danger',
                    text: 'Marking Value already exists',
                })
            }
            else  {
                this.subjActivities.push(data)
                this.$emit("updateArr" , this.subjActivities)
            }
        }
    },
    created () {
        if (this.dataArr) {
            for (let index = 0 ; index < this.dataArr.length ; index ++) {
                this.addMarkingValue(this.dataArr[index].id)
            }
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
