<template>
    <div id="data-list-list-view" class="data-list-container">

        <department-form :isSidebarActive="addNewDataSidebar" @loadDepartments="getDepartments" @closeSidebar="toggleDataSidebar" :data="sidebarData" :depttype="depttype" />

        <vs-table ref="table"  v-model="selected" :max-items="departments.per_page" search :data="depts">

            <div slot="header" class="flex flex-wrap-reverse items-center flex-grow justify-between">

                <div class="btn-add-new p-3 mb-4 mr-4 rounded-lg cursor-pointer flex items-center justify-center text-lg font-medium text-base text-primary border border-solid border-primary" @click="addNewData">
                    <feather-icon icon="PlusIcon" svgClasses="h-4 w-4" />
                    <span class="ml-2 text-base text-primary">Add New</span>
                </div>

                <vs-dropdown vs-trigger-click class="cursor-pointer mb-4 mr-4 items-per-page-handler">
                    <div class="p-4 border border-solid d-theme-border-grey-light rounded-full d-theme-dark-bg cursor-pointer flex items-center justify-between font-medium">
                        <span class="mr-2">{{ departments.from }} - {{ departments.to }} of {{ departments.total }}</span>
                    </div>
                </vs-dropdown>
            </div>

            <template slot="thead">
                <vs-th sort-key="code">Code</vs-th>
                <vs-th sort-key="name">Department Name</vs-th>
                <vs-th sort-key="status">Status</vs-th>
                <vs-th sort-key="">Type</vs-th>
                <vs-th>Action</vs-th>
            </template>

            <template slot-scope="{data}">
                <tbody>
                <vs-tr :data="tr" :key="indextr" v-for="(tr, indextr) in data">

                    <vs-td>
                        <p class="product-name font-medium truncate">{{ tr.code }}</p>
                    </vs-td>
                    <vs-td>
                        <p class="product-name font-medium truncate">{{ tr.name }}</p>
                    </vs-td>
                    <vs-td>
                        <vs-switch color="success" :checked="tr.status" @click="changeStatus(tr)" />
                    </vs-td>
                    <vs-td>
                        <p class="product-name font-medium truncate">{{ getDeptType(tr.typeid) }}</p>
                    </vs-td>
                    <vs-td class="whitespace-no-wrap">
                        <feather-icon icon="EditIcon" svgClasses="w-5 h-5 hover:text-primary stroke-current" @click.stop="editData(tr)" />
                        <feather-icon icon="TrashIcon" svgClasses="w-5 h-5 hover:text-danger stroke-current" class="ml-2" @click.stop="openConfirm(tr.id)" />
                    </vs-td>
                </vs-tr>
                </tbody>
            </template>
        </vs-table>
        <vs-pagination class="mt-4" :total="total" v-model="current"></vs-pagination>
    </div>

</template>

<script>
import administration from '../../store/modules/administration/administrationDataList.js'
import loader from '../../core/utilities/Loader'
import DepartmentForm from './DepartmentForm'
import departmenttype from '../../core/requests/departmenttype'

export default {
    components: {
        'department-form' : DepartmentForm
    },
    data () {

        return {
            depts : [],
            selected: [],
            isMounted: false,

            // Data Sidebar
            addNewDataSidebar: false,
            sidebarData: {},
            depttype : [],
            total : 0,
            current : 1,
        }
    },
    computed: {
        departments () {
            return this.$store.getters['adminData/getDepartments']
        },
    },
    watch: {
        "current": function () {
            this.getDepartments(this.current)
        },
    },
    methods: {
        changeStatus (tr) {
            loader.show(this.$vs)
            const obj = {
                'id' :   tr.id,
                'code' :  tr.code,
                'name' :  tr.name,
                'status' : !tr.status,
                'type' : tr.typeid,
            }
            this.$store.dispatch('adminData/postDepartment', {
                'OBJ' : obj,
                'type': "post"
            })
                .then ( () => {
                    this.$vs.notify({
                        color: 'success',
                        text: 'Department updated successfully !',
                    })
                })
                .catch ( () => {
                    this.$vs.notify({
                        color: 'danger',
                        text: 'Something went wrong ! Please contact system administrator',
                    })
                })
                .finally( () => {
                    loader.hide(this.$vs)
                    this.getDepartments(this.current)
            })
        },
        addNewData () {
            this.sidebarData = {}
            this.toggleDataSidebar(true)
        },
        getDeptType (typeId) {
             let val = this.depttype.map( (val , index) => {
                return ( typeId == val.id ) ? val.name  : ''
            })
            return val[0] == "" ? val[1] : val[0]
        },
        deleteData () {
            if(this.deptid != '') {
                this.$store.dispatch('adminData/removeDepartment' , {
                    'OBJ' : this.deptid,
                    'type' : 'delete',
                })
                    .then ( () => {
                        this.$vs.notify({
                            color: 'success',
                            text: 'Department deleted successfully !',
                        })
                    })
                    .catch ( () => {
                        this.$vs.notify({
                            color: 'danger',
                            text: 'Something went wrong ! Please contact system administrator',
                        })
                    })
                    .finally( () => {
                        this.getDepartments(this.current)
                })
            }
        },
        openConfirm (tr) {
            this.deptid = tr
            this.$vs.dialog({
                type: 'confirm',
                color: 'danger',
                title: 'Confirmation',
                text: 'Are you sure you want to delete this Department ?',
                accept: this.deleteData,
                cancel : this.cancel,
            })
        },
        cancel  () {
            this.deptid = ''
        },

        editData (data) {
            this.sidebarData = data
            this.toggleDataSidebar(true)
        },
        toggleDataSidebar (val = false) {
            this.addNewDataSidebar = val
        },

        getDepartmentType () {
            departmenttype.fetch(this.$root.$store.state)
            .then( response => {
                this.depttype = response.data.data
            })
            .catch( error => {
            })
        },

        getDepartments (current) {
            loader.show(this.$vs)
            this.$store.dispatch('adminData/fetchDepartments' , {
                'OBJ' : {
                    'page' : current
                }
            })
            .finally(() => {
                this.depts = this.departments.data
                this.total = this.departments.last_page
                this.current = this.departments.current_page
                loader.hide(this.$vs)
            })
        },
    },
    created () {
        if (!administration.isRegistered) {
            this.$store.registerModule('adminData', administration)
            administration.isRegistered = true
        }
        this.getDepartmentType()
        this.getDepartments(this.current)
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
