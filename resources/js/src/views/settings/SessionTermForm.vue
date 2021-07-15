<template>
    <vs-sidebar click-not-close position-right parent="body" default-index="1" color="primary" class="add-new-data-sidebar items-no-padding" spacer v-model="isSidebarActiveLocal">
        <div class="mt-6 flex items-center justify-between px-6">
            <h4>Add New Term</h4>
            <feather-icon icon="XIcon" @click.stop="isSidebarActiveLocal = false" class="cursor-pointer"></feather-icon>
        </div>
        <vs-divider class="mb-0"></vs-divider>

        <component :is="scrollbarTag" class="scroll-area--data-list-add-new" :settings="settings" :key="$vs.rtl">

            <div class="p-6">
                <label for=""><b>Name</b></label>
                <vs-input label="" v-model="name" :class="common.errors.has('name') ? 'red_border' : 'grey_border'" class="w-full" @keydown="common.errors.clear('name')" />
                <small v-if="common.errors.has('name')" class="text-danger">{{ common.errors.get('name') }}</small>
                <br>
                <label for=""><b>Start Date</b> </label>
                <date-picker :data="'startdate'" :date="termstartdate" @updateStartDate="updateStartDate"></date-picker>
                <small v-if="common.errors.has('startdate')" class="text-danger">{{ common.errors.get('startdate') }}</small>
                <br>
                <label for="" ><b>End Date</b> </label>
                <date-picker :data="'enddate'" :date="termenddate" @updateEndDate="updateEndDate"></date-picker>
                <small v-if="common.errors.has('enddate')" class="text-danger">{{ common.errors.get('enddate') }}</small>
            </div>

        </component>

        <div class="flex flex-wrap items-center p-6" slot="footer">
            <small v-if="common.errors.has('message')" class="text-danger">{{ common.errors.get('message') }}</small>
            <vs-button class="mr-6" @click="submitData">Save</vs-button>
            <vs-button type="border" color="danger" @click="isSidebarActiveLocal = false">Cancel</vs-button>
        </div>
    </vs-sidebar>
</template>

<script>
import VuePerfectScrollbar from 'vue-perfect-scrollbar'
import loader from '../../core/utilities/Loader'
import Common from '../../core/utilities/Common'
import DatePicker from '../common/DatePicker'

export default {

    props: {
        isSidebarActive: {
            type: Boolean,
            required: true
        },
        data: {
            type: Object,
            default: () => {}
        },
        sessionstart : {
            required : true
        },
        sessionend : {
            required : true
        },
        terms : {
            required: true
        }
    },
    components: {
        "date-picker" : DatePicker,
        VuePerfectScrollbar,
        years () {
            return this.$root.$store.getters['years']
        }
    },

    data () {
        return {
            common : new Common(this.$store),
            name : '',
            termstartdate : '',
            termenddate : '',
            settings: { // perfectscrollbar settings
                maxScrollbarLength: 60,
                wheelSpeed: .60
            },
            updateImgInput : ''
        }
    },
    watch: {
        isSidebarActive (val) {

            if(val)
            {
                this.initValues()
            }
        },
    },
    computed: {
        isSidebarActiveLocal: {
            get () {
                return this.isSidebarActive
            },
            set (val) {
                if (!val) {
                    this.$emit('closeSidebar')
                }
            }
        },
        scrollbarTag () { return this.$store.getters.scrollbarTag }
    },
    methods: {

        initValues() {
            var d = new Date()
            this.name = ''
            this.termstartdate = d.getFullYear() + "-"+(d.getMonth()+1)+"-"+d.getDay()
            this.termenddate = d.getFullYear() + "-"+(d.getMonth()+1)+"-"+d.getDay()
            this.common.errors.clear()
        },

        updateStartDate (val) {
            this.termstartdate = val
        },

        updateEndDate (val) {
            this.termenddate = val
        },

        submitData () {

            this.termstartdate = new Date(this.termstartdate)
            this.termenddate = new Date(this.termenddate)

            this.common.errors.clear()
            if (this.name == '' || this.name == undefined) {
                this.common.errors.record({'name' : 'The Name field is compulsory'})
                return
            }
            if (!((new Date(this.termstartdate) >= new Date(this.sessionstart)) && (new Date(this.termstartdate) <= new Date(this.sessionend)))) {
                this.common.errors.record({'startdate' : 'Term Start Date must be between Session Dates'})
                return
            }
            if (!((new Date(this.termenddate) >= new Date(this.sessionstart)) && (new Date(this.termenddate) <= new Date(this.sessionend)))) {
                this.common.errors.record({'enddate' : 'Term End Date must be between Session Dates'})
                return
            }
            if ((new Date(this.termenddate) <= new Date(this.termstartdate))) {
                this.common.errors.record({'enddate' : 'Term End Date must be between after Term Start Date'})
                return
            }

            for (var i = 0 ; i < this.terms.length ; i++) {
                if ((new Date(this.termstartdate) >= new Date(this.terms[i].startdate)) && (new Date(this.termstartdate) <= new Date(this.terms[i].enddate))) {
                    this.common.errors.record({'startdate' : 'Term Start Date is overlapping with other terms'})
                    return
                }
                if ((new Date(this.termenddate) >= new Date(this.terms[i].startdate)) && (new Date(this.termenddate) <= new Date(this.terms[i].enddate))) {
                    this.common.errors.record({'enddate' : 'Term End Date is overlapping with other terms'})
                    return
                }
                if ((new Date(this.terms[i].startdate) >= new Date(this.termstartdate)) && (new Date(this.terms[i].startdate) <= new Date(this.termenddate))) {
                    this.common.errors.record({'startdate' : 'Term Start Date is overlapping with other terms'})
                    this.common.errors.record({'enddate' : 'Term End Date is overlapping with other terms'})
                    return
                }
                if ((new Date(this.terms[i].enddate) >= new Date(this.termstartdate)) && (new Date(this.terms[i].enddate) <= new Date(this.termenddate))) {
                    this.common.errors.record({'startdate' : 'Term Start Date is overlapping with other terms'})
                    this.common.errors.record({'enddate' : 'Term End Date is overlapping with other terms'})
                    return
                }
            }

            this.$emit('addTerm' , {
                'id' : null,
                'name' : this.name,
                'startdate' : (this.termstartdate.getFullYear() + "-"+(this.termstartdate.getMonth()+1)+"-"+this.termstartdate.getDate()),
                'enddate' : (this.termenddate.getFullYear() + "-"+(this.termenddate.getMonth()+1)+"-"+this.termenddate.getDate())
            })
            this.$vs.notify({
                text : 'Term added successfully !',
                color : 'success'
            })
            this.$emit('closeSidebar')
        },
    },
    created () {

    }
}
</script>

<style lang="scss" scoped>
.add-new-data-sidebar {
    ::v-deep .vs-sidebar--background {
        z-index: 52010;
    }

    ::v-deep .vs-sidebar {
        z-index: 52010;
        width: 400px;
        max-width: 90vw;

        .img-upload {
            margin-top: 2rem;

            .con-img-upload {
                padding: 0;
            }

            .con-input-upload {
                width: 100%;
                margin: 0;
            }
        }
    }
}

.scroll-area--data-list-add-new {
    // height: calc(var(--vh, 1vh) * 100 - 4.3rem);
    height: calc(var(--vh, 1vh) * 100 - 16px - 45px - 82px);

    &:not(.ps) {
        overflow-y: auto;
    }
}
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
