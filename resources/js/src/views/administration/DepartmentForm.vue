<template>
    <vs-sidebar click-not-close position-right parent="body" default-index="1" color="primary" class="add-new-data-sidebar items-no-padding" spacer v-model="isSidebarActiveLocal">
        <div class="mt-6 flex items-center justify-between px-6">
            <h4>{{ (this.data.id == '' || this.data.id == null) ? "Add New" : "Update" }} Department</h4>
            <feather-icon icon="XIcon" @click.stop="isSidebarActiveLocal = false" class="cursor-pointer"></feather-icon>
        </div>
        <vs-divider class="mb-0"></vs-divider>

        <component :is="scrollbarTag" class="scroll-area--data-list-add-new" :settings="settings" :key="$vs.rtl">

            <div class="p-6">

                <!-- NAME -->
                <label for=""><b>Code</b></label>
                <vs-input label="" v-model="code" :class="departmenttype.errors.has('code') ? 'red_border' : 'grey_border'" class="w-full" @keydown="departmenttype.errors.clear('code')" />
                <small v-if="departmenttype.errors.has('code')" class="text-danger">{{ departmenttype.errors.get('code') }}</small>
                <br>
                <label for=""><b>Name</b></label>
                <vs-input label="" v-model="name" :class="departmenttype.errors.has('name') ? 'red_border' : 'grey_border'" class="w-full" @keydown="departmenttype.errors.clear('name')" />
                <small v-if="departmenttype.errors.has('name')" class="text-danger">{{ departmenttype.errors.get('name') }}</small>
                <br>
                <!-- CATEGORY -->
                <label for=""><b>Department Type</b></label>
                <vs-select label="" v-model="typeid" :class="departmenttype.errors.has('typeid') ? 'red_border' : 'grey_border'" class="w-full" @focusin="departmenttype.errors.clear('country_id')" >
                    <vs-select-item :key="item.id" :value="item.id" :text="item.name" v-for="item in depttype" />
                </vs-select>
                <small v-if="departmenttype.errors.has('typeid')" class="text-danger">{{ departmenttype.errors.get('typeid') }}</small>

                <br>
                <label for=""><b>Status</b></label>
                <vs-switch color="success" v-model="status" />
            </div>
        </component>

        <div class="flex flex-wrap items-center p-6" slot="footer">
            <vs-button class="mr-6" @click="submitData" :disabled="this.departmenttype.errors.any()">Save</vs-button>
            <vs-button type="border" color="danger" @click="isSidebarActiveLocal = false">Cancel</vs-button>
        </div>
    </vs-sidebar>
</template>

<script>
import VuePerfectScrollbar from 'vue-perfect-scrollbar'
import DepartmentForm from '../../core/utilities/DepartmentForm'
import loader from '../../core/utilities/Loader'

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
        depttype: {
            required: true
        },
    },
    components: {
        VuePerfectScrollbar
    },
    data () {
        return {
            departmenttype : new DepartmentForm(this.$store),
            settings: { // perfectscrollbar settings
                maxScrollbarLength: 60,
                wheelSpeed: .60
            },
            updateImgInput : '',
            id : '',
            code : '',
            name : '',
            status : true,
            typeid : '',
            type : '',
        }
    },
    watch: {
        isSidebarActive (val) {
            if(val)
            {
                this.initValues()
                if (this.data.id) {
                    this.code = this.data.code
                    this.name = this.data.name
                    this.status = this.data.status == 1 ? true : false
                    this.typeid = this.data.typeid
                }
                else {
                    this.status = true
                }
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
        initValues () {
            this.code = ''
            this.name = ''
            this.status = true
            this.typeid = ''
        },
        submitData () {

            const obj = {
                'id' :   this.data.id,
                'code' :  this.code,
                'name' :  this.name,
                'status' : this.status == true ? 1 : 0,
                'type' : this.typeid,
            }

            loader.show(this.$vs)
            this.departmenttype.post(obj , "post")
                .then( response => {
                    if (this.data.id)
                    {
                        this.$vs.notify({
                            color: 'success',
                            text: 'Department updated successfully !',
                        })
                    }
                    else  {
                        this.$vs.notify({
                            color: 'success',
                            text: 'Department added successfully !',
                        })
                    }

                    this.$emit('closeSidebar')
                    this.$emit('loadDepartments')
                })
                .catch( error => {
                    this.$vs.notify({
                        color: 'danger',
                        text: 'Something went wrong ! Please contact system administrator',
                    })
                    this.departmenttype.record(error)
                })
                .finally( () => {
                    loader.hide(this.$vs)
                })
        },
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
