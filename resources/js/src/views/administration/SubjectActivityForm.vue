<template>
    <vs-sidebar click-not-close position-right parent="body" default-index="1" color="primary" class="add-new-data-sidebar items-no-padding" spacer v-model="isSidebarActiveLocal">
        <div class="mt-6 flex items-center justify-between px-6">
            <h4>Add Activity Type</h4>
            <feather-icon icon="XIcon" @click.stop="isSidebarActiveLocal = false" class="cursor-pointer"></feather-icon>
        </div>
        <vs-divider class="mb-0"></vs-divider>

        <component :is="scrollbarTag" class="scroll-area--data-list-add-new" :settings="settings" :key="$vs.rtl">

            <div class="p-6">
                <label for=""><b>Activity Type</b></label>
                <vs-select label="" v-model="markValue" class="w-full"">
                    <vs-select-item :key="item.id" :value="item.id" :text="item.type" v-for="(item , index) in this.markingvalues.data" />
                </vs-select>
                <small v-if="common.errors.has('markValue')" class="text-danger">{{ common.errors.get('markValue') }}</small>
                <br>
                <label for=""><b>Weightage</b> </label>
                <vs-input-number style="width: 22%" color="danger" v-model="weightage"/>
                <small v-if="common.errors.has('weightage')" class="text-danger">{{ common.errors.get('weightage') }}</small>
            </div>

        </component>

        <div class="flex flex-wrap items-center p-6" slot="footer">
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
        markingvalues : {
          required : true
        },
    },
    components: {
        VuePerfectScrollbar,
    },

    data () {
        return {
            common : new Common(this.$store),
            markValue : '',
            weightage : '',
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
                    // this.$validator.reset()
                    //this.initValues()
                }
            }
        },
        scrollbarTag () { return this.$store.getters.scrollbarTag }
    },
    methods: {

        initValues() {
            this.markValue = ''
            this.weightage = 0
        },
        submitData () {
            this.common.errors.clear()

            if(this.markValue == '') {
                this.common.errors.record({'markValue' : 'Activity type must be selected'})
            }
            else if (this.weightage == 0) {
                this.common.errors.record({'weightage' : 'Weightage should not be 0'})
            }
            else if (this.weightage < 0) {
                this.common.errors.record({'weightage' : 'Weightage should not be less than 0'})
            }
            else  {
                const obj = {
                    'id' : this.markValue,
                    'weightage' : this.weightage,
                }
                this.$emit('closeSidebar')
                this.$emit('addActivity' , obj)
            }
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
