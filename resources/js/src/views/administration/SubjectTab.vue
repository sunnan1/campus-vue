<template>
    <div id="data-list-list-view" class="data-list-container">
        <vx-card style="padding: 1%">
        <div class="vx-row">
            <div class="flex items-end">
                <span class="leading-none font-medium">Subject Basic Information</span>
            </div>
        </div>
        <br>
        <div class="vx-row">
            <div class="vx-col w-full md:w-1/2">
                    <!-- DOB -->
                    <label for=""><b>Code</b></label>
                    <vs-input class="w-full" label="" v-model="code" :class="common.errors.has('code') ? 'red_border' : 'grey_border'" @keydown="common.errors.clear('code')" />
                    <small v-if="common.errors.has('code')" class="text-danger">{{ common.errors.get('code') }}</small>
                <br>
                    <label for=""><b>Marking</b></label>
                    <vs-select label="" v-model="marking" class="w-full" @click="common.errors.clear('markingvalue')" >
                        <vs-select-item :key="item" :value="item" :text="item" v-for="(item , index) in markings" />
                    </vs-select>
                    <small v-if="common.errors.has('markingvalue')" class="text-danger">{{ common.errors.get('markingvalue') }}</small>
                <br>
                    <label for="" v-if="marking == 'Yes'"><b>Total Marks</b></label>
                    <vs-input v-if="marking == 'Yes'" class="w-full" :class="common.errors.has('marks') ? 'red_border' : 'grey_border'" label="" @keydown="common.errors.clear('marks')" v-model="marks" />
                    <small v-if="common.errors.has('marks')" class="text-danger">{{ common.errors.get('marks') }}</small>
            </div>

            <!-- Address Col -->
            <div class="vx-col w-full md:w-1/2">

                <!-- Col Header -->
                <label for=""><b>Name</b></label>
                <vs-input class="w-full" label="" v-model="name" :class="common.errors.has('name') ? 'red_border' : 'grey_border'" @keydown="common.errors.clear('name')"  />
                <small v-if="common.errors.has('name')" class="text-danger">{{ common.errors.get('name') }}</small>
                <br>
                <label for=""><b>Credit</b></label>
                <vs-input class="w-full" label="" v-model="credit" :class="common.errors.has('credit') ? 'red_border' : 'grey_border'" @keydown="common.errors.clear('credit')" />
                <small v-if="common.errors.has('credit')" class="text-danger">{{ common.errors.get('credit') }}</small>
            </div>
        </div>
        <div class="vx-row">
            <div class="vx-col w-full">
                <div class="mt-8 flex flex-wrap items-center justify-end">
                    <vs-button class="ml-auto " @click="saveData" >Save</vs-button>
                </div>
            </div>
        </div>
        </vx-card>
        <br>

        <vx-card style="padding: 1%" v-if="marking == 'Yes'">
            <div class="vx-row">
                <div class="flex items-end">
                    <span class="leading-none font-medium">Subject Activities Information</span>
                </div>
            </div>
            <div class="vx-row" style="margin-top:2%">
                <div class="vx-col w-full">
                    <subject-activity-grid :dataArr="dataArr" :markingvalues="activitytypes" @updateArr="updateArr"></subject-activity-grid>
                </div>
            </div>
        </vx-card>

        <vx-card style="padding: 1%" v-if="marking == 'No'">
        <div class="vx-row">
            <div class="flex items-end">
                <span class="leading-none font-medium">Subject Marking Information</span>
            </div>
        </div>
        <div class="vx-row" style="margin-top:2%">
            <div class="vx-col w-full">
                <subject-marking-grid :dataArr="dataArr" :markingvalues="markingvalues" @updateArr="updateArr"></subject-marking-grid>
            </div>
        </div>
        </vx-card>


    </div>
</template>

<script>
import loader from '../../core/utilities/Loader'
import Common from '../../core/utilities/Common'
import SubjectActivityGrid from './SubjectActivityGrid'
import SubjectMarkingGrid from './SubjectMarkingGrid'

export default {
    components : {
        'subject-activity-grid' : SubjectActivityGrid,
        'subject-marking-grid' : SubjectMarkingGrid
    },
    computed : {
      validForm () {
          return this.common.errors.any()
      },
      activitytypes () {
          return this.$store.getters['common/getActivityTypes']
      },
      markingvalues () {
          return this.$store.getters['common/getMarkingValues']
      },
    },
    data () {
        return  {
            markings : ['Yes' , 'No'],
            common : new Common(this.$store),
            name : '',
            code : '',
            credit : '',
            marking : '',
            marks : '',
            dataArr : [],
        }
    },
    watch: {
        "marking": function () {
            if (this.$route.params.id) {
                if (this.marking == (this.subject.marking == 1 ? 'Yes' : 'No'))
                {
                    this.dataArr = this.subject.marking == 1 ? this.subject.activities : this.subject.markingvalues
                }
                else  {
                    this.dataArr = []
                }
            }

            if(this.marking == 'Yes') {
                this.getActivityTypes()
            }
            else if(this.marking == 'No') {
                this.getMarkingValues()
            }
        },
    },
    methods : {
        updateArr (data) {
            this.dataArr = data
        },
        getActivityTypes () {
            loader.show(this.$vs)
            this.$store.dispatch('common/processActivityTypes' , {
                'type' : 'get',
            })
            .finally( () => {
                if (this.$route.params.id) {
                    this.daraArr = this.subject.activites
                }
                loader.hide(this.$vs)
            })
        },
        getMarkingValues () {
            loader.show(this.$vs)

            this.$store.dispatch('common/processMarkingValues' , {
                'type' : 'get'
            })
            .finally(() => {
                if (this.$route.params.id) {
                    this.daraArr = this.subject.markingvalues
                }
                loader.hide(this.$vs)
            })
        },
        saveData () {
            this.common.errors.clear()
            loader.show(this.$vs)
            let obj = {}
            if(this.marking == 'Yes')
            {
                obj = {
                    'id' : (this.$route.params.id) ? this.$route.params.id : '',
                    'name' : this.name,
                    'code' : this.code,
                    'credit' : this.credit,
                    'marking' : this.marking == 'Yes' ? 1 : 0,
                    'marks' : this.marks,
                    'activity' : this.dataArr
                }
            }
            else {
                obj = {
                    'id' : (this.$route.params.id) ? this.$route.params.id : '',
                    'name' : this.name,
                    'code' : this.code,
                    'credit' : this.credit,
                    'marking' : this.marking == 'Yes' ? 1 : 0,
                    'marks' : this.marks,
                    'markingvalue' : this.dataArr
                }
            }

            this.$store.dispatch('adminData/processSubjects' , {
                'type' : 'post',
                'OBJ' : obj
            })
            .then((response) => {
                if (this.$route.params.id) {
                    this.$vs.notify({
                        color: 'success',
                        text: 'Subject updated successfully !',
                    })
                }
                else {
                    this.$vs.notify({
                        color: 'success',
                        text: 'Subject saved successfully !',
                    })
                    this.$router.push({name : 'subjects'})
                }
            })
            .catch((error) => {
                this.$vs.notify({
                    color: 'danger',
                    text: 'Something went wrong ! Please contact system administrator',
                })
                this.common.record(error)
            })
            .finally(() => {
                loader.hide(this.$vs)
            })
        },
        getSubject (subjectid) {
            this.$store.dispatch('adminData/processSubjects' , {
                'type' : 'get',
                'id'  : subjectid
            })
                .then( (response) => {
                    this.subject = response.data.data
                    this.code = this.subject.code
                    this.name = this.subject.name
                    this.credit = this.subject.credit
                    this.marks = this.subject.marks
                    this.marking = this.subject.marking == 1 ? 'Yes' : 'No'
                    this.dataArr = this.marking == 'Yes' ? this.subject.activities : this.subject.markingvalues
                })
                .catch( (error) => {
                    this.$vs.notify({
                        color: 'danger',
                        text: 'Something went wrong ! Please contact system administrator',
                    })
                })
        }
    },
    created () {
        if (this.$route.params.id){
            this.getSubject(this.$route.params.id)
        }
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
