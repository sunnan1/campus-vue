<template>
    <div id="data-list-list-view" class="data-list-container">

        <classes-form :isSidebarActive="addNewDataSidebar" @loadClasses="loadClasses" :gradingscheme="gradingscheme" @closeSidebar="toggleDataSidebar" :data="sidebarData" />

        <vs-table ref="table" @selected="showSection" v-model="selected" :max-items="classes.per_page" search :data="cls">

            <div slot="header" class="flex flex-wrap-reverse items-center flex-grow justify-between">

                <div class="btn-add-new p-3 mb-4 mr-4 rounded-lg cursor-pointer flex items-center justify-center text-lg font-medium text-base text-primary border border-solid border-primary" @click="addNewData">
                    <feather-icon icon="PlusIcon" svgClasses="h-4 w-4" />
                    <span class="ml-2 text-base text-primary">Add New Class</span>
                </div>

                <vs-dropdown vs-trigger-click class="cursor-pointer mb-4 mr-4 items-per-page-handler">
                    <div class="p-4 border border-solid d-theme-border-grey-light rounded-full d-theme-dark-bg cursor-pointer flex items-center justify-between font-medium">
                        <span class="mr-2">{{ classes.from }} - {{ classes.to }} of {{ classes.total }}</span>
                    </div>
                </vs-dropdown>
            </div>

            <template slot="thead">
                <vs-th sort-key="code">Code</vs-th>
                <vs-th sort-key="name">Class Name</vs-th>
                <vs-th sort-key="">Attendance</vs-th>
                <vs-th sort-key="gradingscheme">Grading Scheme</vs-th>
                <vs-th sort-key="">Sections</vs-th>
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
                        <p class="product-name font-medium truncate">
                            <vs-switch color="success" @click="changeStatus(tr)" :checked="tr.attendance" />
                        </p>
                    </vs-td>
                    <vs-td>
                        <p class="product-name font-medium truncate">{{ tr.gradingscheme }}</p>
                    </vs-td>
                    <vs-td>
                        <feather-icon icon="InfoIcon" svgClasses="w-5 h-5 hover:text-primary stroke-current" class="ml-2" @click.stop="openSections(tr.id)" />
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
import ClassesForm from './ClassesForm'
export default {
  components: {
    'classes-form' : ClassesForm
  },
  data () {
    return {
        cls : [],
        total : 0,
        current : 1,
      classid : '',
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
    classes () {
      return this.$store.getters['adminData/getClasses']
    },
    gradingscheme () {
      return this.$store.getters['adminData/getGradingScheme']
    },
  },
    watch: {
        "current": function () {
            this.loadClasses(this.current)
        },
    },
  methods: {
    changeStatus (tr) {
        const obj = {
            'id' : tr.id,
            'code' : tr.code,
            'name' : tr.name,
            'gradingscheme' : tr.gradingschemeId,
            'attendance' : !tr.attendance
        }

        this.$store.dispatch('adminData/processClasses', {
            'type' : 'post',
            'OBJ'  : obj
        })
            .then( () => {
                this.$vs.notify({
                    color: 'success',
                    text: 'Class updated successfully !',
                })
            })
            .catch( () => {
                this.$vs.notify({
                    color: 'danger',
                    text: 'Something went wrong ! Please contact system administrator',
                })
            })
            .finally(() => {
            this.loadClasses(this.current)
        })
    },
    addNewData () {
      this.sidebarData = {}
      this.toggleDataSidebar(true)
    },
    deleteData () {
        if(this.classid != ''){
            this.$store.dispatch('adminData/processClasses', {
                'id' : this.classid,
                'type' : 'delete'
            })
                .then ( () => {
                    this.$vs.notify({
                        color: 'success',
                        text: 'Class deleted successfully !',
                    })
                })
                .catch( () => {
                    this.$vs.notify({
                        color: 'danger',
                        text: 'Something went wrong ! Please contact system administrator',
                    })
                })
                .finally(() => {
                this.loadClasses(this.current)
            })
        }
    },
      openSections (classid , name) {
        localStorage.setItem('clas' , name)
        this.$router.push({name : 'class-sections' , params : {id : classid}})
      },
      openConfirm (tr) {
          this.classid = tr
          this.$vs.dialog({
              type: 'confirm',
              color: 'danger',
              title: 'Confirmation',
              text: 'Are you sure want to delete this Class ?',
              accept: this.deleteData,
              cancel : this.cancel,
          })
      },
      cancel  () {
          this.classid = ''
      },
      showSection (tr) {
          localStorage.setItem('clas' , tr.name)
          this.$router.push({name : 'class-sections' , params : {id : tr.id}})
      },
    loadClasses (current) {
        loader.show(this.$vs)
        this.$store.dispatch('adminData/processClasses', {
            'type': 'get',
            'OBJ' : {
                'page' : current
            }
        })
        .finally( () => {
            this.cls = this.classes.data
            this.total = this.classes.last_page
            this.current = this.classes.current_page
            loader.hide(this.$vs)
        })
        this.$store.dispatch('adminData/processGradingScheme', {
            'type': 'get'
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
    this.loadClasses(this.current)
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
