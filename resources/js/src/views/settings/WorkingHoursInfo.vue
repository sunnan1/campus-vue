<template>
    <div id="demo-basic-card">
        <working-hours-form :isSidebarActive="addNewDataSidebar" :workinghours="workinghours" @loadWorkinghours="getWorkingHours" @closeSidebar="toggleDataSidebar" :data="sidebarData" />
        <div class="vx-row match-height">
            <div class="vx-col w-full sm:w-1/3 lg:w-1/4 mb-base" v-for="(tr, indextr) in days">
                <vx-card>
                    <center>
                        <h3 class="mb-2">{{ tr }}</h3>
                        <br>
                        <h5 v-for="(t, index) in getTimings(tr)" class="text-grey mb-3 hover:text-black">{{ t.starttime }} ~ {{ t.endtime }}
                            <feather-icon icon="TrashIcon" svgClasses="w-5 h-5 hover:text-danger stroke-current" class="ml-2" @click.stop="openConfirm(t.id)" />
                        </h5>

                        <br>
                        <vs-divider></vs-divider>
                        <div class="" style="text-align: center">
                            <vs-button class="mt-4 shadow-lg" @click="addNewData(tr)" type="gradient">Add Hours</vs-button>
                        </div>
                    </center>
                </vx-card>
            </div>
        </div>
    </div>
</template>

<script>
import loader from '../../core/utilities/Loader'
import WorkingHoursForm from './WorkingHoursForm'
export default {
  components: {
    'working-hours-form' : WorkingHoursForm
  },
  data () {
    return {
      workinghourid : '',
      days : [],
      isMounted: false,
      // Data Sidebar
      addNewDataSidebar: false,
      sidebarData: {}
    }
  },
  computed: {

    workinghours () {
      return this.$store.getters['common/getWorkingHours']
    },
  },
  methods: {
    addNewData (data) {
        var id = 0
        this.workinghours.map( (index,value) => {
            if(index.day == data)
            {
                id = index.dayid
            }
        })
      this.sidebarData = id
      this.toggleDataSidebar(true)
    },

    editData (data) {
      this.sidebarData = data
      this.toggleDataSidebar(true)
    },
    toggleDataSidebar (val = false) {
      this.addNewDataSidebar = val
    },
    deleteData () {
        if(this.workinghourid != '') {
            this.$store.dispatch('common/processWorkinghours', {
                'id' : this.workinghourid,
                'type' : 'delete'
            })
                .then ( () => {
                    this.$vs.notify({
                        color: 'success',
                        text: 'Working hour deleted successfully !',
                    })
                })
                .catch( () => {
                    this.$vs.notify({
                        color: 'danger',
                        text: 'Something went wrong ! Please contact system administrator',
                    })
                })
                .finally( () => {
                    this.getWorkingHours()
                })
        }
    },
      openConfirm (tr) {
          this.workinghourid = tr
          this.$vs.dialog({
              type: 'confirm',
              color: 'danger',
              title: 'Confirmation',
              text: 'Are you sure want to delete this Working Hour ?',
              accept: this.deleteData,
              cancel : this.cancel,
          })
      },
      cancel  () {
          this.workinghourid = ''
      },
    getWorkingHours () {
      loader.show(this.$vs)

      this.$store.dispatch('common/processWorkinghours', {
        'type' : 'get'
      })
        .finally(() => {
            this.workinghours.map( (index , value) => {
                if(! this.days.includes(index.day))
                {
                    this.days.push(index.day)
                }
            })

          loader.hide(this.$vs)
        })
    },
    getTimings (day) {
        var tempArr = []
        this.workinghours.map( (index, value) => {
          if(day == index.day)
          {
              tempArr.push(index)
          }
        })
        return tempArr
    }
  },
  created () {
    this.getWorkingHours()
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
<style lang="scss">
#demo-basic-card {
    .overlay-card {
        .vx-card__collapsible-content {
            max-height: 485px;
        }
    }

    .chat-card-log {
        height: 360px;

        .chat-sent-msg {
            background-color: #f2f4f7 !important;
        }
    }

    .card-video {
        .video-js {
            height: 370px;
        }
    }
}
</style>
