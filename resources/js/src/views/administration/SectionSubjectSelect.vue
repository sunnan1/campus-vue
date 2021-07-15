<template>
    <vs-sidebar click-not-close position-right parent="body" default-index="1" color="primary" class="add-new-data-sidebar items-no-padding" spacer v-model="isSidebarActiveLocal">
        <div class="mt-6 flex items-center justify-between px-6">
            <h4>Select {{ type }} Subject</h4>
            <feather-icon icon="XIcon" @click.stop="isSidebarActiveLocal = false" class="cursor-pointer"></feather-icon>
        </div>
        <vs-divider class="mb-0"></vs-divider>

        <component :is="scrollbarTag" class="scroll-area--data-list-add-new" :settings="settings" :key="$vs.rtl">

            <div class="p-6">
                <!-- NAME -->
                <label for=""><b>Subject</b></label>
                <vs-select  class="w-full" v-model="subj" autocomplete>
                    <vs-select-item :key="index" :value="item.id" :text="item.name" v-for="(item,index) in subjArr" />
                </vs-select>
            </div>

        </component>

        <div class="flex flex-wrap items-center p-6" slot="footer">
            <vs-button class="mr-6" @click="saveSubject">Save</vs-button>
            <vs-button type="border" color="danger" @click="isSidebarActiveLocal = false">Cancel</vs-button>
        </div>
    </vs-sidebar>
</template>

<script>
import VuePerfectScrollbar from 'vue-perfect-scrollbar'
import vSelect from 'vue-select'

export default {

    props: {
        core : {
            required : true
        },
        elective : {
            required : true
        },
        activity : {
            required : true
        },
        subjects : {
            required : true
        },
        type : {
            required : true
        },
        isSidebarActive: {
            type: Boolean,
            required: true
        },
        data: {
            type: Object,
            default: () => {}
        },
    },
    components: {
        VuePerfectScrollbar,
        'v-select': vSelect,
    },

    data () {
        return {
            subjArr : [],
            subj : '',
            settings: { // perfectscrollbar settings
                maxScrollbarLength: 60,
                wheelSpeed: .60
            },
        }
    },
    watch: {
        isSidebarActive (val) {

            if (val) {
                this.loadSubjects()
            }
        }
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
        findWithAttr(array, attr, value) {
            for(var i = 0; i < array.length; i += 1) {
                if(array[i][attr] === value) {
                    return i;
                }
            }
            return -1;
        },
        getObj(array, attr, value) {
            for(var i = 0; i < array.length; i += 1) {
                if(array[i][attr] === value) {
                    return array[i];
                }
            }
        },
        saveSubject () {
            this.$emit('closeSidebar')
            if (this.type == 'Core') {
                this.$emit('update' , this.getObj(this.subjects,'id',this.subj))
                this.$vs.notify({
                    color : 'success',
                    text : 'Core Subject added successfully '
                })
            }
            if (this.type == 'Elective') {
                this.$emit('update' , this.getObj(this.subjects,'id',this.subj))
                this.$vs.notify({
                    color : 'success',
                    text : 'Elective Subject added successfully '
                })
            }
            if (this.type == 'Activity') {
                this.$emit('update' , this.getObj(this.subjects,'id',this.subj))
                this.$vs.notify({
                    color : 'success',
                    text : 'Activity Subject added successfully '
                })
            }
        },
        loadSubjects () {
            this.subj = ''
            this.subjArr = []
            var enter = 0
            for ( var i = 0 ; i < this.subjects.length ; i++) {
                enter = 0
                if (this.findWithAttr(this.core,'id',this.subjects[i].id) == -1) {
                    enter += 1
                }
                if (this.findWithAttr(this.elective,'id',this.subjects[i].id) == -1) {
                    enter += 1
                }
                if (this.findWithAttr(this.activity,'id',this.subjects[i].id) == -1) {
                    enter += 1
                }
                if (enter == 3)
                {
                    if (this.type == 'Activity') {
                        if (this.subjects[i].marking == 0) {
                            this.subjArr.push({
                                'id' : this.subjects[i].id,
                                'name' : this.subjects[i].name,
                                'code' : this.subjects[i].code,
                                'marks' : this.subjects[i].marks,
                                'marking' : this.subjects[i].marking,
                                'credit' : this.subjects[i].credit,
                            })
                        }
                    }
                    else {
                        if (this.subjects[i].marking == 1) {
                            this.subjArr.push({
                                'id': this.subjects[i].id,
                                'name': this.subjects[i].name,
                                'code': this.subjects[i].code,
                                'marks': this.subjects[i].marks,
                                'marking': this.subjects[i].marking,
                                'credit': this.subjects[i].credit,
                            })
                        }
                    }
                }
            }
            this.subjArr.sort(function(a, b){
                var nameA=a.name.toLowerCase(), nameB=b.name.toLowerCase()
                if (nameA < nameB) //sort string ascending
                    return -1
                if (nameA > nameB)
                    return 1
                return 0 //default return value (no sorting)
            })
        }
    },
    mounted () {
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
