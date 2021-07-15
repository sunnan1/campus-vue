<template>
    <div id="data-list-list-view" class="data-list-container">
        <div v-if="startdate != ''">
            <session-term-form :sessionstart="startdate" :sessionend="enddate" @addTerm="CreateTerm" :terms="terms" :isSidebarActive="addNewDataSidebar" @closeSidebar="toggleDataSidebar" />
        </div>
        <div class="vx-row">
            <div class="vx-col w-full mb-base">
                <vx-card style="padding: 1%">
                    <div class="vx-row">
                        <div class="flex items-end">
                            <span class="leading-none font-medium">Session Basic Information</span>
                        </div>
                    </div>

                    <br>
                    <div class="vx-row">
                        <div class="vx-col w-full sm:w-6/12">
                            <label for=""><b>Name</b></label>
                            <vs-input class="w-full" label="" v-model="name" :class="common.errors.has('name') ? 'red_border' : 'grey_border'" @keydown="common.errors.clear('name')" />
                            <small v-if="common.errors.has('name')" class="text-danger">{{ common.errors.get('name') }}</small>
                        </div>
                        <div class="vx-col w-full sm:w-4/12">
                        </div>
                        <div class="vx-col w-full sm:w-2/12">
                            <label for=""><b>Status</b></label>
                            <vs-switch color="success" v-model="status"/>
                        </div>
                    </div>
                    <br>
                    <div class="vx-row">
                        <div class="vx-col w-full md:w-1/2">
                            <label for=""><b>Start Date</b></label>
                            <date-picker class="mb-base" :data="'startdate'" :date="startdate" @updateStartDate="updateStartDate"></date-picker>
                            <small v-if="common.errors.has('start_date')" class="text-danger">{{ common.errors.get('start_date') }}</small>
                        </div>
                        <div class="vx-col w-full md:w-1/2">
                            <label for=""><b>End Date</b></label>
                            <date-picker class="mb-base" :data="'enddate'" :date="enddate" @updateEndDate="updateEndDate"></date-picker>
                            <small v-if="common.errors.has('end_date')" class="text-danger">{{ common.errors.get('end_date') }}</small>
                        </div>
                    </div>

                    <div class="vx-row">
                        <div class="vx-col w-full">
                            <div class="flex flex-wrap items-center justify-end">
                                <vs-button class="ml-auto" :disabled="disable" @click="saveData" >Save</vs-button>
                            </div>
                        </div>
                    </div>
                </vx-card>
            </div>
        </div>
        <div class="vx-row">
            <div class="vx-col w-full mb-base">
                <vx-card style="padding: 1%">
                    <div class="vx-row">
                        <div class="vx-col w-full sm:w-1/2">
                            <div class="flex items-end">
                                <span class="leading-none font-medium">Session Terms Information</span>
                            </div>
                        </div>
                        <div class="vx-col w-full sm:w-1/2">
                            <div class="flex items-end">
                                <vs-button class="ml-auto" @click="addNewData" >Add Term</vs-button>
                            </div>
                        </div>
                    </div>
                </vx-card>
            </div>
        </div>
        <div class="vx-row match-height">
            <div class="vx-col w-full sm:w-1/3 mb-base" v-for="tr in terms">
                <vx-card>
                    <feather-icon icon="TrashIcon" svgClasses="w-5 h-5 hover:text-danger stroke-current" class="ml-2" @click.stop="openConfirm(tr)" style="float: right" />
                    <center>
                        <h3 class="mb-2">{{ tr.name }}</h3>
                        <br>
                        <h5 class="text-grey mb-3 hover:text-black">{{ tr.startdate | generalDate }} ~ {{ tr.enddate | generalDate }}
                        </h5>
                    </center>
                </vx-card>
            </div>
        </div>
    </div>
</template>

<script>
import Common from '../../core/utilities/Common'
import DatePicker from '../common/DatePicker'
import SessionTermForm from './SessionTermForm'
import loader from '../../core/utilities/Loader'

export default {
    components : {
        'date-picker' : DatePicker,
        'session-term-form' : SessionTermForm
    },
    computed : {
    },
    data () {
        return  {
            common : new Common(this.$store),
            name : '',
            startdate : '',
            enddate : '',
            status : 1,
            terms : [],
            isMounted: false,
            addNewDataSidebar: false,
            termid : '',
            disable : true
        }
    },
    watch: {
        "name" : function (){
            this.disable = true
            if (this.name != '') {
                this.disable = false
            }
        },
        "startdate" : function (){
            this.disable = true
            if (this.startdate != '') {
                this.disable = false
            }
        },
        "enddate" : function (){
            this.disable = true
            if (this.enddate != '') {
                this.disable = false
            }
        },
        "terms" : function (){
            this.disable = true
            if (this.terms != '') {
                this.disable = false
            }
        },
    },
    methods : {
        saveData () {
            this.common.errors.clear()
            var d = new Date(this.startdate)
            var d1 = new Date(this.enddate)
            const obj = {
                'name' : this.name,
                'start_date' : d.getFullYear()+"-"+(d.getMonth()+1)+"-"+d.getDate(),
                'end_date' : d1.getFullYear()+"-"+(d1.getMonth()+1)+"-"+d1.getDate(),
                'status' : this.status,
                'terms' : this.terms
            }

            loader.show(this.$vs)
            this.common.post("common/processSessions" , {
                'type' : 'post',
                'OBJ'  : obj
            })
                .then( response => {
                    this.$vs.notify({
                        color: 'success',
                        text: 'Session created successfully !',
                    })
                    this.$router.push({name : 'sessions'})
                })
                .catch( error => {
                    this.$vs.notify({
                        color: 'danger',
                        text: 'Something went wrong ! Please contact system administrator',
                    })
                    this.common.record(error)
                })
                .finally( () => {
                    loader.hide(this.$vs)
                })

        },
        CreateTerm (obj) {
          this.terms.push(obj)
        },
        updateStartDate (val) {
            this.startdate = val
        },
        updateEndDate (val) {
            this.enddate = val
        },
        addNewData () {
            this.toggleDataSidebar(true)
        },
        toggleDataSidebar (val = false) {
            this.addNewDataSidebar = val
        },
        initValues() {
            var d = new Date()
            this.name = ''
            this.startdate = d.getFullYear() + "-"+(d.getMonth()+1)+"-"+d.getDay()
            this.enddate = d.getFullYear() + "-"+(d.getMonth()+1)+"-"+d.getDay()
            this.status = 1
            this.common.errors.clear()
        },
        deleteData () {
          if (this.termid != '') {
              var index = this.terms.map(x => {
                  return x.name;
              }).indexOf(termid.name);
              this.terms.splice(index,1)

              this.$vs.notify({
                  color: 'danger',
                  text : 'Term removed successfully !'
              })
          }
        },
        openConfirm (tr) {
            this.termid = tr
            this.$vs.dialog({
                type: 'confirm',
                color: 'danger',
                title: 'Confirmation',
                text: 'Are you sure want to delete this Term ?',
                accept: this.deleteData,
                cancel : this.cancel,
            })
        },
        cancel  () {
            this.termid = ''
        },
    },
    created () {
        this.initValues()
    },
    mounted () {
        this.isMounted = true
    }
}
</script>

<style lang="scss" scoped>
.red_border {
    ::v-deep .vs-input--input {
        border-color: red !important;
    }
}
.grey_border {
    ::v-deep .vs-input--input {
        border-color: #cccccc !important;
    }
}
</style>
