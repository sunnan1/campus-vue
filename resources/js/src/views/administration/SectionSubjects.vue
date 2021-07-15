<template>
    <div id="data-list-list-view" class="data-list-container">
        <div v-if="ready">
            <section-subject-select :isSidebarActive="addNewDataSidebar" :type="type" @update="updateArr" :core="this.coresubjects" :elective="this.electivesubjects" :activity="this.activities" :subjects="this.subjects" @closeSidebar="toggleSidebar" />
        </div>
        <div class="vx-row">
            <div class="vx-col w-full sm:w-1/2 lg:w-1/2 mb-base">
            </div>
            <div class="vx-col w-full sm:w-1/2 lg:w-1/2 mb-base" style="text-align: right">
                <vs-button class="mt-4 mr-2 shadow-lg" type="gradient" color="primary" :disabled="!isReady" gradient-color-secondary="#CE9FFC" @click="saveData">Save</vs-button>
            </div>
        </div>
        <div class="vx-row">
            <div class="vx-col w-full sm:w-1/2 lg:w-1/2 mb-base">
                <vx-card>
                    <div class="flex justify-between flex-wrap">
                        <h4 for=""><b>Core Subjects</b></h4>
                        <vs-button class="mt-4 mr-2 shadow-lg" type="gradient" color="primary" gradient-color-secondary="#CE9FFC" @click="addNewData('Core')">Add New</vs-button>
                    </div>
                    <br>
                    <div>
                        <vs-table :data="coresubjects">

                            <template slot="thead">
                                <vs-th>Code</vs-th>
                                <vs-th>Name</vs-th>
                                <vs-th>Credit</vs-th>
                                <vs-th>Total Marks</vs-th>
                                <vs-th></vs-th>
                            </template>

                            <template slot-scope="{data}">
                                <vs-tr :key="indextr" v-for="(tr, indextr) in data">
                                    <vs-td :data="data[indextr].code">
                                        {{data[indextr].code}}
                                    </vs-td>
                                    <vs-td :data="data[indextr].name">
                                        {{data[indextr].name}}
                                    </vs-td>
                                    <vs-td :data="data[indextr].credit">
                                        {{data[indextr].credit}}
                                    </vs-td>
                                    <vs-td :data="data[indextr].marks">
                                        {{data[indextr].marks}}
                                    </vs-td>
                                    <vs-td>
                                        <feather-icon icon="TrashIcon" svgClasses="w-5 h-5 hover:text-danger stroke-current" @click.stop="deleteCore(tr.id)" />
                                    </vs-td>
                                </vs-tr>
                            </template>
                        </vs-table>
                    </div>
                </vx-card>
            </div>
            <div class="vx-col w-full sm:w-1/2 lg:w-1/2 mb-base">
                <vx-card>
                    <div class="flex justify-between flex-wrap">
                        <h4 for=""><b>Elective Subjects</b></h4>
                        <vs-button class="mt-4 mr-2 shadow-lg" type="gradient" color="primary" gradient-color-secondary="#CE9FFC" @click="addNewData('Elective')">Add New</vs-button>
                    </div>
                    <br>
                    <div>
                        <vs-table :data="electivesubjects">

                            <template slot="thead">
                                <vs-th>Code</vs-th>
                                <vs-th>Name</vs-th>
                                <vs-th>Credit</vs-th>
                                <vs-th>Total Marks</vs-th>
                                <vs-th></vs-th>
                            </template>

                            <template slot-scope="{data}">
                                <vs-tr :key="indextr" v-for="(tr, indextr) in data">
                                    <vs-td :data="data[indextr].code">
                                        {{data[indextr].code}}
                                    </vs-td>
                                    <vs-td :data="data[indextr].name">
                                        {{data[indextr].name}}
                                    </vs-td>
                                    <vs-td :data="data[indextr].credit">
                                        {{data[indextr].credit}}
                                    </vs-td>
                                    <vs-td :data="data[indextr].marks">
                                        {{data[indextr].marks}}
                                    </vs-td>
                                    <vs-td>
                                        <feather-icon icon="TrashIcon" svgClasses="w-5 h-5 hover:text-danger stroke-current" @click.stop="deleteElective(tr.id)" />
                                    </vs-td>
                                </vs-tr>
                            </template>
                        </vs-table>
                    </div>
                </vx-card>
            </div>
        </div>
        <div class="vx-row">
            <div class="vx-col w-full sm:w-1/2 lg:w-1/2 mb-base">
                <vx-card>
                    <div class="flex justify-between flex-wrap">
                        <h4 for=""><b>Activities</b></h4>
                        <vs-button class="mt-4 mr-2 shadow-lg" type="gradient" color="primary" gradient-color-secondary="#CE9FFC" @click="addNewData('Activity')">Add New</vs-button>
                    </div>
                    <br>
                    <div>
                        <vs-table :data="activities">

                            <template slot="thead">
                                <vs-th>Code</vs-th>
                                <vs-th>Name</vs-th>
                                <vs-th>Credit</vs-th>
                                <vs-th>Total Marks</vs-th>
                                <vs-th></vs-th>
                            </template>

                            <template slot-scope="{data}">
                                <vs-tr :key="indextr" v-for="(tr, indextr) in data">
                                    <vs-td :data="data[indextr].code">
                                        {{data[indextr].code}}
                                    </vs-td>
                                    <vs-td :data="data[indextr].name">
                                        {{data[indextr].name}}
                                    </vs-td>
                                    <vs-td :data="data[indextr].credit">
                                        {{data[indextr].credit}}
                                    </vs-td>
                                    <vs-td :data="data[indextr].marks">
                                        {{data[indextr].marks}}
                                    </vs-td>
                                    <vs-td>
                                        <feather-icon icon="TrashIcon" svgClasses="w-5 h-5 hover:text-danger stroke-current" @click.stop="deleteActivity(tr.id)" />
                                    </vs-td>
                                </vs-tr>
                            </template>
                        </vs-table>
                    </div>
                </vx-card>
            </div>
        </div>
    </div>
</template>

<script>
import administration from '../../store/modules/administration/administrationDataList.js'
import loader from '../../core/utilities/Loader'
import SectionSubjectSelect from './SectionSubjectSelect'

export default {
    components: {
        'section-subject-select' : SectionSubjectSelect,
    },
    data () {
        return {
            isReady : false,
            type : '',
            sectionid : '',
            subjectid : '',
            ready : false,
            // products: [],

            isMounted: false,

            // Data Sidebar
            addNewDataSidebar: false,
            coresubjects : [],
            electivesubjects : [],
            activities : [],
            availablesubjects : []
        }
    },
    computed: {
        sectionsubjects () {
            return this.$store.getters['adminData/getSectionSubjects']
        },
        subjects () {
            return this.$store.getters['adminData/getSubjects']
        },
    },
    watch: {
        "coresubjects": function () {
            this.isReady = false

            if (this.coresubjects.length != this.sectionsubjects.core.length) {
                this.isReady = true
            }
            else {
                for (var i = 0 ; i < this.coresubjects.length ; i++) {
                    if (this.coresubjects[i].id != this.sectionsubjects.core[i].id) {
                        this.isReady = true
                        break
                    }
                }
            }
        },
        "electivesubjects": function () {
            this.isReady = false
            if (this.electivesubjects.length != this.sectionsubjects.elective.length) {
                this.isReady = true
            }
            else {
                for (var i = 0 ; i < this.electivesubjects.length ; i++) {
                    if (this.electivesubjects[i].id != this.sectionsubjects.elective[i].id) {
                        this.isReady = true
                        break
                    }
                }
            }
        },
        "activities": function () {
            this.isReady = false
            if (this.activities.length != this.sectionsubjects.activity.length) {
                this.isReady = true
            }
            else {
                for (var i = 0 ; i < this.activities.length ; i++) {
                    if (this.activities[i].id != this.sectionsubjects.activity[i].id) {
                        this.isReady = true
                        break
                    }
                }
            }
        },
    },
    methods: {

        updateArr (obj) {
            if (this.type == 'Core') {
                this.coresubjects.push(obj)
            }
            else if (this.type == 'Elective') {
                this.electivesubjects.push(obj)
            }
            else if (this.type == 'Activity') {
                this.activities.push(obj)
            }
        },

        saveData () {
            var core_subj = []
            var elective_subj = []
            var activity_subj = []

            for (var i = 0 ; i < this.coresubjects.length ;i++)
            {
                core_subj.push(this.coresubjects[i].id)
            }
            for (var i = 0 ; i < this.electivesubjects.length ;i++)
            {
                elective_subj.push(this.electivesubjects[i].id)
            }
            for (var i = 0 ; i < this.activities.length ;i++)
            {
                activity_subj.push(this.activities[i].id)
            }
            const obj = {
                'core_subjects' :  core_subj,
                'elective_subjects' :  elective_subj,
                'activities' :  activity_subj,
            }
            loader.show(this.$vs)

            this.$store.dispatch('adminData/saveSectionSubjects', {
                'type' : 'post',
                'OBJ'  : obj,
                'id' : this.sectionid
            })
                .then( response => {
                    this.isReady = false
                    this.$vs.notify({
                        color: 'success',
                        text: 'Section Subjects saved successfully !',
                    })
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
        updateSubjects() {
            for ( var i = 0 ; i < this.subjects.length ; i++) {
                this.availablesubjects.push({
                    'id' : this.subjects[i].id,
                    'name' : this.subjects[i].name,
                    'code' : this.subjects[i].code,
                    'marks' : this.subjects[i].marks,
                    'marking' : this.subjects[i].marking,
                    'credit' : this.subjects[i].credit,
                })
            }
            this.ready = true
        },

        addNewData (type) {
            this.type = type
            this.toggleSidebar(true)
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
        deleteCore (tr) {
            this.subjectid = tr
            this.$vs.dialog({
                type: 'confirm',
                color: 'danger',
                title: 'Confirmation',
                text: 'Are you sure want to delete this Subject ?',
                accept: this.removeCore,
                cancel : this.cancel,
            })
        },
        deleteElective (tr) {
            this.subjectid = tr
            this.$vs.dialog({
                type: 'confirm',
                color: 'danger',
                title: 'Confirmation',
                text: 'Are you sure want to delete this Subject ?',
                accept: this.removeElective,
                cancel : this.cancel,
            })
        },
        deleteActivity (tr) {
            this.subjectid = tr
            this.$vs.dialog({
                type: 'confirm',
                color: 'danger',
                title: 'Confirmation',
                text: 'Are you sure want to delete this Subject ?',
                accept: this.removeActivity,
                cancel : this.cancel,
            })
        },
        removeCore () {
            if (this.subjectid != '') {
                for ( var i = 0 ; i < this.coresubjects.length ; i++){
                    if (this.coresubjects[i].id == this.subjectid) {
                        this.coresubjects.splice(i , 1)
                        this.$vs.notify({
                            text : 'Subject removed successfully !',
                            color : 'success'
                        })
                    }
                }
            }
        },
        removeElective () {
            if (this.subjectid != '') {
                for ( var i = 0 ; i < this.electivesubjects.length ; i++){
                    if (this.electivesubjects[i].id == this.subjectid) {
                        this.electivesubjects.splice(i , 1)
                        this.$vs.notify({
                            text : 'Subject removed successfully !',
                            color : 'success'
                        })
                    }
                }
            }
        },
        removeActivity () {
            if (this.subjectid != '') {
                for ( var i = 0 ; i < this.activities.length ; i++){
                    if (this.activities[i].id == this.subjectid) {
                        this.activities.splice(i , 1)
                        this.$vs.notify({
                            text : 'Subject removed successfully !',
                            color : 'success'
                        })
                    }
                }
            }
        },
        cancel  () {
            this.subjectid = ''
        },

        loadDetails () {
            loader.show(this.$vs)
            this.$store.dispatch('adminData/processSubjects', {
                'type': 'get',
                'pagination' : 'no'
            })
                .then( () => {
                    this.$store.dispatch('adminData/getSectionSubjects', {
                        'type': 'get',
                        'OBJ' : {
                            'sectionid' : this.sectionid
                        }
                    })
                    .finally( () => {
                        for ( var i = 0; i < this.sectionsubjects.core.length; i++) {
                            this.coresubjects.push ({
                                'id' : this.sectionsubjects.core[i].id,
                                'name' : this.sectionsubjects.core[i].name,
                                'code' : this.sectionsubjects.core[i].code,
                                'marks' : this.sectionsubjects.core[i].marks,
                                'marking' : this.sectionsubjects.core[i].marking,
                                'credit' : this.sectionsubjects.core[i].credit,
                            })
                        }
                        for ( var i = 0; i < this.sectionsubjects.elective.length; i++) {
                            this.electivesubjects.push ({
                                'id' : this.sectionsubjects.elective[i].id,
                                'name' : this.sectionsubjects.elective[i].name,
                                'code' : this.sectionsubjects.elective[i].code,
                                'marks' : this.sectionsubjects.elective[i].marks,
                                'marking' : this.sectionsubjects.elective[i].marking,
                                'credit' : this.sectionsubjects.elective[i].credit,
                            })
                        }
                        for ( var i = 0; i < this.sectionsubjects.activity.length; i++) {
                            this.activities.push ({
                                'id' : this.sectionsubjects.activity[i].id,
                                'name' : this.sectionsubjects.activity[i].name,
                                'code' : this.sectionsubjects.activity[i].code,
                                'marks' : this.sectionsubjects.activity[i].marks,
                                'marking' : this.sectionsubjects.activity[i].marking,
                                'credit' : this.sectionsubjects.activity[i].credit,
                            })
                        }
                        this.updateSubjects()
                    })
                })
            .finally( () => {
                loader.hide(this.$vs)
            })
        },
        toggleSidebar (val = false) {
            this.addNewDataSidebar = val
        },
    },
    created () {
        if (!administration.isRegistered) {
            this.$store.registerModule('adminData', administration)
            administration.isRegistered = true
        }
        if (! this.$route.params.sectionid) {
            this.router.push({name : 'classes'})
        }
        else  {
            this.sectionid = this.$route.params.sectionid
            this.loadDetails()
        }
    },
    mounted () {
        this.isMounted = true
    },

    beforeRouteLeave (to, from , next) {
        if (this.isReady) {
            this.$vs.dialog({
                type: 'confirm',
                color: 'danger',
                title: 'Confirmation',
                text: 'Do you really want to leave? you have unsaved changes!',
                accept: function () {
                    next ()
                },
                cancel : this.cancel,
            })
        }
        else  {
            next ()
        }
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
