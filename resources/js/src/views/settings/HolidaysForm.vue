<template>
    <vs-sidebar click-not-close position-right parent="body" default-index="1" color="primary" class="add-new-data-sidebar items-no-padding" spacer v-model="isSidebarActiveLocal">
        <div class="mt-6 flex items-center justify-between px-6">
            <h4>{{ Object.entries(this.data).length === 0 ? "Add New" : "Update" }} Holidays</h4>
            <feather-icon icon="XIcon" @click.stop="isSidebarActiveLocal = false" class="cursor-pointer"></feather-icon>
        </div>
        <vs-divider class="mb-0"></vs-divider>

        <component :is="scrollbarTag" class="scroll-area--data-list-add-new" :settings="settings" :key="$vs.rtl">

            <div class="p-6">
                <label for=""><b>Holiday Name</b></label>
                <vs-input label="" v-model="name" :class="common.errors.has('name') ? 'red_border' : 'grey_border'" class="w-full" @keydown="common.errors.clear('name')" />
                <small v-if="common.errors.has('name')" class="text-danger">{{ common.errors.get('name') }}</small>
                <br>
                <label for=""><b>Holiday Type</b></label>
                <vs-select label="" v-model="type" :class="common.errors.has('type') ? 'red_border' : 'grey_border'" class="w-full" @focusin="common.errors.clear('type')" >
                    <vs-select-item :key="item.id" :value="item.id" :text="item.title" v-for="(item , index) in holidaytypes" />
                </vs-select>
                <small v-if="common.errors.has('type')" class="text-danger">{{ common.errors.get('type') }}</small>
                <br>
                <label for=""><b>{{ this.type == 0 ? 'Date' : 'Start Date' }}</b> </label>
                <date-picker :data="'startdate'" :date="startdate" @updateStartDate="updateStartDate"></date-picker>
                <small v-if="common.errors.has('startdate')" class="text-danger">{{ common.errors.get('startdate') }}</small>
                <br>
                <label for="" v-if="this.type != 0"><b>End Date</b> </label>
                <date-picker  v-if="this.type != 0" :data="'enddate'" :date="enddate" @updateEndDate="updateEndDate"></date-picker>
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
        holidaytypes: {
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
            type : '',
            startdate : '',
            enddate : '',
            year : '',
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
                if(this.data.id)
                {
                    this.name = this.data.name
                    this.type = this.data.title
                    this.type = this.data.type
                    this.startdate = this.data.startdate
                    this.enddate = this.data.enddate
                    this.year = ( this.data.year != null && this.data.year != 0 ) ? this.data.year : new Date().getFullYear()
                }
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
                    // this.$validator.reset()
                    //this.initValues()
                }
            }
        },
        scrollbarTag () { return this.$store.getters.scrollbarTag }
    },
    methods: {

        initValues() {
            var d = new Date()
            this.name = ''
            this.startdate = d.getFullYear() + "-"+(d.getMonth()+1)+"-"+d.getDay()
            this.enddate = d.getFullYear() + "-"+(d.getMonth()+1)+"-"+d.getDay()
            this.type = ''
            this.year = (new Date()).getFullYear()
            this.common.errors.clear()
        },
        updateStartDate (val) {
            this.startdate = val
        },
        updateEndDate (val) {
            this.enddate = val
        },
        submitData () {
            var d = new Date(this.startdate)
            var d1 = new Date(this.enddate)
            var current = new Date()
            if(this.type == 0)
            {
                this.enddate = null
            }
            else  {
                this.enddate = d1.getFullYear()+"-"+(d1.getMonth()+1)+"-"+d1.getDate()
            }
            this.common.errors.clear()
            if (d <= current) {
                this.common.errors.record({startdate : 'Start Date must be greater than current date'})
                return
            }
            if (d1 <= d) {
                this.common.errors.record({enddate : 'End Date must be greater than Start Date'})
                return
            }
            const obj = {
                'id' : this.data.id,
                'name' : this.name,
                'type' : this.type,
                'startdate' : d.getFullYear()+"-"+(d.getMonth()+1)+"-"+d.getDate(),
                'enddate' : this.enddate,
                'year' : this.year,
            }

            loader.show(this.$vs)
            this.common.post("common/processHolidays" , {
                'type' : 'post',
                'OBJ'  : obj
            })
                .then( response => {
                    if (this.data.id) {
                        this.$vs.notify({
                            color: 'success',
                            text: 'Holiday updated successfully !',
                        })
                    }
                    else {
                        this.$vs.notify({
                            color: 'success',
                            text: 'Holiday added successfully !',
                        })
                    }
                    this.$emit('closeSidebar')
                    this.$emit('loadHolidays')
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
