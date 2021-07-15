<template>
    <vs-sidebar click-not-close position-right parent="body" default-index="1" color="primary" class="add-new-data-sidebar items-no-padding" spacer v-model="isSidebarActiveLocal">
        <div class="mt-6 flex items-center justify-between px-6">
            <h4>{{ Object.entries(this.data).length === 0 ? "Add New" : "Update" }} Activity Type</h4>
            <feather-icon icon="XIcon" @click.stop="isSidebarActiveLocal = false" class="cursor-pointer"></feather-icon>
        </div>
        <vs-divider class="mb-0"></vs-divider>

        <component :is="scrollbarTag" class="scroll-area--data-list-add-new" :settings="settings" :key="$vs.rtl">

            <div class="p-6">
                <label for=""><b>Type</b></label>
                <vs-input label="" v-model="type" :class="common.errors.has('type') ? 'red_border' : 'grey_border'" class="w-full" @keydown="common.errors.clear('type')" />
                <small v-if="common.errors.has('type')" class="text-danger">{{ common.errors.get('type') }}</small>
                <br>
                <!-- NAME -->
                <label for=""><b>Term Exam</b></label>
                <vs-select label="" v-model="term_exam" :class="common.errors.has('term_exam') ? 'red_border' : 'grey_border'" class="w-full" @focusin="common.errors.clear('term_exam')" >
                    <vs-select-item :key="item.id" :value="item.id" :text="item.title" v-for="(item , index) in termexam" />
                </vs-select>
                <small v-if="common.errors.has('term_exam')" class="text-danger">{{ common.errors.get('term_exam') }}</small>
                <br>
                <label for=""><b>Exam Contribution</b></label>
                <vs-select label="" v-model="exam_cont" :class="common.errors.has('exam_contribution') ? 'red_border' : 'grey_border'" class="w-full" @focusin="common.errors.clear('exam_contribution')" >
                    <vs-select-item :key="item.id" :value="item.id" :text="item.title" v-for="(item , index) in examcont" />
                </vs-select>
                <small v-if="common.errors.has('exam_contribution')" class="text-danger">{{ common.errors.get('exam_contribution') }}</small>

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
        termexam: {
            required: true
        },
        examcont: {
            required: true
        },
    },
    components: {
        VuePerfectScrollbar,
    },

    data () {
        return {
            common : new Common(this.$store),
            type : '',
            term_exam : '',
            exam_cont : '',
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
                    this.type = this.data.type
                    this.term_exam = this.data.term_exam
                    this.exam_cont = this.data.exam_contribution
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
            this.type = ''
            this.term_exam = 0
            this.exam_cont = 0
            this.common.errors.clear()
        },
        submitData () {
            this.common.errors.clear()
            const obj = {
                'id' : this.data.id,
                'type' : this.type,
                'term_exam' : this.term_exam,
                'exam_contribution' : this.exam_cont,
            }

            loader.show(this.$vs)
            this.common.post("common/processActivityTypes" , {
                'type' : 'post',
                'OBJ'  : obj
            })
                .then( response => {
                    if (this.data.id) {
                        this.$vs.notify({
                            color: 'success',
                            text: 'Activity Type updated successfully !',
                        })
                    }
                    else {
                        this.$vs.notify({
                            color: 'success',
                            text: 'Activity Type added successfully !',
                        })
                    }
                    this.$emit('closeSidebar')
                    this.$emit('loadActivityType')
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
