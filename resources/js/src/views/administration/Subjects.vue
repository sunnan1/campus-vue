<template>
    <div id="data-list-list-view" class="data-list-container" v-if="total != 0">

        <vs-table ref="table"  v-model="selected" :max-items="subjects.per_page" search :data="subArr"  >

            <div slot="header" class="flex flex-wrap-reverse items-center flex-grow justify-between">

                <div class="btn-add-new p-3 mb-4 mr-4 rounded-lg cursor-pointer flex items-center justify-center text-lg font-medium text-base text-primary border border-solid border-primary" @click="addNewData">
                    <feather-icon icon="PlusIcon" svgClasses="h-4 w-4" />
                    <span class="ml-2 text-base text-primary">Add New</span>
                </div>

                <vs-dropdown vs-trigger-click class="cursor-pointer mb-4 mr-4 items-per-page-handler">
                    <div class="p-4 border border-solid d-theme-border-grey-light rounded-full d-theme-dark-bg cursor-pointer flex items-center justify-between font-medium">
                        <span class="mr-2">{{ subjects.from }} - {{ subjects.to }} of {{ subjects.total }}</span>
                    </div>
                </vs-dropdown>
            </div>

            <template slot="thead">
                <vs-th sort-key="code">Code</vs-th>
                <vs-th sort-key="name">Subject Name</vs-th>
                <vs-th sort-key="credit">Credit</vs-th>
                <vs-th sort-key="marking">Marking</vs-th>
                <vs-th sort-key="marks">Marks</vs-th>
                <vs-th sort-key="">Components</vs-th>
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
                        <p class="product-name font-medium truncate">{{ tr.credit }}</p>
                    </vs-td>
                    <vs-td>
                        <p class="product-name font-medium truncate">{{ tr.marking == 1 ? 'Yes' : 'No' }}</p>
                    </vs-td>
                    <vs-td>
                        <p class="product-name font-medium truncate">{{ tr.marks }}</p>
                    </vs-td>
                    <vs-td >
                        <p v-if="tr.marking == 1" class="product-name font-medium truncate">{{ getCompLength(tr.activities) }}</p>
                        <p v-if="tr.marking == 0" class="product-name font-medium truncate">{{ getCompLength(tr.markingvalues) }}</p>
                    </vs-td>
                    <vs-td class="whitespace-no-wrap">
                        <feather-icon icon="EditIcon" svgClasses="w-5 h-5 hover:text-primary stroke-current" @click.stop="editData(tr.id)" />
                        <feather-icon icon="TrashIcon" svgClasses="w-5 h-5 hover:text-danger stroke-current" @click.stop="openConfirm(tr.id)" />
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

export default {
    data () {
        return {
            subjectid : '',
            selected: [],
            countries : [],
            total : 0,
            current : 1,
        }
    },
    computed: {
        subjects () {
            return this.$store.getters['adminData/getSubjects']
        },
        subArr () {
            return this.$store.getters['adminData/getSubjectsData']
        }
    },
    watch: {
        "current": function () {
            this.loadSubjects(this.current)
        },
    },
    methods: {
        getCompLength (act) {
            try {
                return act.length
            }catch (e) {
            }
        },
        addNewData () {
            this.$router.push('/administration/subjects/new-subject')
        },
        editData (data) {
            this.$router.push({name : 'edit-subject' , params : {id : data}})
        },
        loadSubjects (currentPage) {
            loader.show(this.$vs)
            this.$store.dispatch('adminData/processSubjects' ,{
                'type' : 'get',
                'OBJ' : {
                    'page' : currentPage
                }
            })
            .finally( () => {
                this.total = this.subjects.last_page
                this.current = this.subjects.current_page
                loader.hide(this.$vs)
            })
        },
        deleteData () {
          if(this.subjectid != ''){
              loader.show(this.$vs)
              this.$store.dispatch('adminData/processSubjects' , {
                  'id' : this.subjectid,
                  'type' : 'delete'
              })
              .then( () => {
                  this.$vs.notify({
                      color: 'success',
                      text: 'Subject deleted successfully !',
                  })
              })
              .catch( () => {
                  this.$vs.notify({
                      color: 'danger',
                      text: 'Something went wrong ! Please contact system administrator',
                  })
              })
              .finally( () => {
                  this.loadSubjects(this.current)
                  loader.hide(this.$vs)
              })
          }
        },
        openConfirm (tr) {
            this.subjectid = tr
            this.$vs.dialog({
                type: 'confirm',
                color: 'danger',
                title: 'Confirmation',
                text: 'Are you sure want to delete this Subject ?',
                accept: this.deleteData,
                cancel : this.cancel,
            })
        },
        cancel  () {
            this.subjectid = ''
        },

    },
    created () {
        if (!administration.isRegistered) {
            this.$store.registerModule('adminData', administration)
            administration.isRegistered = true
        }
        this.loadSubjects(this.current)
    },
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
