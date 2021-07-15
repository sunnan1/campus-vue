<template>
    <vs-sidebar click-not-close position-right parent="body" default-index="1" color="primary" class="add-new-data-sidebar items-no-padding" spacer v-model="isSidebarActiveLocal">
        <div class="mt-6 flex items-center justify-between px-6">
            <h4>{{ (this.id == '' || this.id == null) ? "Add New" : "Update" }} Campus</h4>
            <feather-icon icon="XIcon" @click.stop="isSidebarActiveLocal = false" class="cursor-pointer"></feather-icon>
        </div>
        <vs-divider class="mb-0"></vs-divider>

        <component :is="scrollbarTag" class="scroll-area--data-list-add-new" :settings="settings" :key="$vs.rtl">

            <div class="p-6">

                <!-- NAME -->
                <label for=""><b>Code</b></label>
                <vs-input label="" v-model="code" class="w-full" :class="campus.errors.has('code') ? 'red_border' : 'grey_border'" @keydown="campus.errors.clear('code')" />
                <small v-if="campus.errors.has('code')" class="text-danger">{{ campus.errors.get('code') }}</small>
                <br>
                <label for=""><b>Name</b></label>
                <vs-input label="" v-model="name" class="w-full" :class="campus.errors.has('name') ? 'red_border' : 'grey_border'" @keydown="campus.errors.clear('name')" />
                <small v-if="campus.errors.has('name')" class="text-danger">{{ campus.errors.get('name') }}</small>
                <br>
                <label for=""><b>Country</b></label>
                <vs-select label="" v-model="country_id" :class="campus.errors.has('country_id') ? 'red_border' : 'grey_border'" class="w-full" @focusin="campus.errors.clear('country_id')" >
                    <vs-select-item :key="item.id" :value="item.id" :text="item.name" v-for="item in countries" />
                </vs-select>
                <small v-if="campus.errors.has('country_id')" class="text-danger">{{ campus.errors.get('country_id') }}</small>
                <br>
                <label for=""><b>Postcode</b></label>
                <vs-input label="" v-model="postal_code" :class="campus.errors.has('postal_code') ? 'red_border' : 'grey_border'" class="w-full" @keydown="campus.errors.clear('postal_code')"  />
                <small v-if="campus.errors.has('postal_code')" class="text-danger">{{ campus.errors.get('postal_code') }}</small>
                <br>
                <label for=""><b>Address</b></label>
                <vs-input label="" v-model="address" class="w-full"  />
                <br>
                <label for=""><b>Phone</b></label>
                <vs-input label="" v-model="phone" class="w-full"  />
                <br>
                <label for=""><b>Email</b></label>
                <vs-input label="" v-model="email" :class="campus.errors.has('email') ? 'red_border' : 'grey_border'" class="w-full" @keydown="campus.errors.clear('email')"  />
                <small v-if="campus.errors.has('email')" class="text-danger">{{ campus.errors.get('email') }}</small>
                <br>
                <label for=""><b>Currency</b></label>
                <vs-select label="" v-model="currency_id" :class="campus.errors.has('currency_id') ? 'red_border' : 'grey_border'" class="w-full" @focusin="campus.errors.clear('currency_id')" >
                    <vs-select-item :key="item.id" :value="item.id" :text="item.name" v-for="item in currencies" />
                </vs-select>
                <small v-if="campus.errors.has('currency_id')" class="text-danger">{{ campus.errors.get('currency_id') }}</small>
                <br>
                <label for=""><b>Date Format</b></label>
                <vs-select label="" v-model="dateformat_id" :class="campus.errors.has('dateformat_id') ? 'red_border' : 'grey_border'" class="w-full" @focusin="campus.errors.clear('dateformat_id')" >
                    <vs-select-item :key="item.id" :value="item.id" :text="item.format" v-for="item in dateformats" />
                </vs-select>
                <small v-if="campus.errors.has('dateformat_id')" class="text-danger">{{ campus.errors.get('dateformat_id') }}</small>
                <br>
                <label for=""><b>Time Format</b></label>
                <vs-select label="" v-model="timeformat_id" :class="campus.errors.has('timeformat_id') ? 'red_border' : 'grey_border'" class="w-full" @focusin="campus.errors.clear('timeformat_id')" >
                    <vs-select-item :key="item.id" :value="item.id" :text="item.format" v-for="item in timeformats" />
                </vs-select>
                <small v-if="campus.errors.has('timeformat_id')" class="text-danger">{{ campus.errors.get('timeformat_id') }}</small>
                <br>
                <label for=""><b>Timezone</b></label>
                <vs-select label="" v-model="timezone" class="w-full" >
                    <vs-select-item :key="item" :value="item" :text="item" v-for="item in timezones" />
                </vs-select>

            </div>
        </component>

        <div class="flex flex-wrap items-center p-6" slot="footer">
            <vs-button class="mr-6" @click="submitData" :disabled="this.campus.errors.any()">Save</vs-button>
            <vs-button type="border" color="danger" @click="isSidebarActiveLocal = false">Cancel</vs-button>
        </div>
    </vs-sidebar>
</template>

<script>
import VuePerfectScrollbar from 'vue-perfect-scrollbar'
import CampusForm from '../../core/utilities/CampusForm'
import loader from '../../core/utilities/Loader'
import vSelect from 'vue-select'

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
        countries: {
            required: true
        },
        timeformats: {
            required: true
        },
        dateformats: {
            required: true
        },
        timezones: {
            required: true
        },
        currencies:{
            required: true
        }
    },
    components: {
        VuePerfectScrollbar,
        'v-select': vSelect
    },
    data () {
        return {
            campus : new CampusForm(this.$store),
            settings: { // perfectscrollbar settings
                maxScrollbarLength: 60,
                wheelSpeed: .60
            },
            updateImgInput : '',
            id : '',
            code : '',
            name : '',
            phone : '',
            email : '',
            country_id : '',
            currency_id : '',
            postal_code : '',
            address : '',
            dateformat_id : '',
            timeformat_id : '',
            timezone : ''
        }
    },
    watch: {
        isSidebarActive (val) {
            if(val)
            {
                this.initValue()
                if(this.data.id)
                {
                    this.id = this.data.id
                    this.code = this.data.code
                    this.name = this.data.name
                    this.phone = this.data.phone
                    this.email = this.data.email
                    this.country_id = this.data.country
                    this.currency_id = this.data.currency
                    this.postal_code = this.data.postcode
                    this.address = this.data.address
                    this.dateformat_id = this.data.dateformat
                    this.timeformat_id = this.data.timeformat
                    this.timezone = this.data.timezone
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

        submitData () {
            const obj = {
              'id' :   this.id,
              'code' :  this.code,
              'name' :  this.name,
              'phone' :  this.phone,
              'email' :  this.email,
              'country_id'  : this.country_id,
              'currency_id' : this.currency_id,
              'postal_code' : this.postal_code,
              'address' : this.address,
              'dateformat_id' :  this.dateformat_id,
              'timeformat_id' :  this.timeformat_id,
              'timezone' : this.timezone
            }

            loader.show(this.$vs)
            this.campus.post(obj)
                .then( response => {
                    if(this.data.id) {
                        this.$vs.notify({
                            color: 'success',
                            text: 'Campus updated successfully !',
                        })
                    }
                    else  {
                        this.$vs.notify({
                            color: 'success',
                            text: 'Campus added successfully !',
                        })
                    }
                    this.$emit('closeSidebar')
                    this.$emit('reloadcampuses')
                })
                .catch( error => {
                    this.campus.record(error)
                    this.$vs.notify({
                        color: 'danger',
                        text: 'Something went wrong ! Please contact system administrator',
                    })
                })
                .finally( () => {
                    loader.hide(this.$vs)
                })
        },
        initValue () {
            this.id = ''
            this.code = ''
            this.name = ''
            this.phone = ''
            this.dateformat_id = ''
            this.timeformat_id = ''
            this.timezone = ''
            this.postal_code = ''
            this.address = ''
            this.currency_id = ''
            this.country_id = ''
            this.email = ''
        }
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
