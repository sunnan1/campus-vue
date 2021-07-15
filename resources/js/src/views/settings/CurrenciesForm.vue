<template>
    <vs-sidebar click-not-close position-right parent="body" default-index="1" color="primary" class="add-new-data-sidebar items-no-padding" spacer v-model="isSidebarActiveLocal">
        <div class="mt-6 flex items-center justify-between px-6">
            <h4>{{ Object.entries(this.data).length === 0 ? "Add New" : "Update" }} Currency</h4>
            <feather-icon icon="XIcon" @click.stop="isSidebarActiveLocal = false" class="cursor-pointer"></feather-icon>
        </div>
        <vs-divider class="mb-0"></vs-divider>

        <component :is="scrollbarTag" class="scroll-area--data-list-add-new" :settings="settings" :key="$vs.rtl">

            <div class="p-6">
                <label for=""><b>Name</b></label>
                <vs-input label="" v-model="name" :class="currency.errors.has('name') ? 'red_border' : 'grey_border'" class="w-full" @keydown="currency.errors.clear('name')" />
                <small v-if="currency.errors.has('name')" class="text-danger">{{ currency.errors.get('name') }}</small>
                <br>
                <label for=""><b>Code</b></label>
                <vs-input label="" v-model="code" :class="currency.errors.has('code') ? 'red_border' : 'grey_border'" class="w-full" @keydown="currency.errors.clear('code')" />
                <small v-if="currency.errors.has('code')" class="text-danger">{{ currency.errors.get('code') }}</small>
                <br>
                <label for=""><b>Symbol</b></label>
                <vs-input label="" v-model="symbol" :class="currency.errors.has('symbol') ? 'red_border' : 'grey_border'" class="w-full" @keydown="currency.errors.clear('symbol')" />
                <small v-if="currency.errors.has('symbol')" class="text-danger">{{ currency.errors.get('symbol') }}</small>
            </div>
        </component>

        <div class="flex flex-wrap items-center p-6" slot="footer">
            <vs-button class="mr-6" @click="submitData" :disabled="this.currency.errors.any()">Save</vs-button>
            <vs-button type="border" color="danger" @click="isSidebarActiveLocal = false">Cancel</vs-button>
        </div>
    </vs-sidebar>
</template>

<script>
import VuePerfectScrollbar from 'vue-perfect-scrollbar'
import loader from '../../core/utilities/Loader'
import CurrencyForm from '../../core/utilities/CurrenciesForm'

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
    },
    components: {
        VuePerfectScrollbar
    },

    data () {
        return {
            currency : new CurrencyForm(this.$store),
            name : '',
            code : '',
            symbol : '',
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
                    this.code = this.data.code
                    this.symbol = this.data.symbol
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

        initValues() {
            this.name = ''
            this.code = ''
            this.symbol = ''
        },
        submitData () {

            const obj = {
                'id' : this.data.id,
                'name' : this.name,
                'code' : this.code,
                'symbol' : this.symbol,
                'type' : 'post'
            }

            loader.show(this.$vs)
            this.currency.post(obj)
                .then( response => {
                    if (this.data.id) {
                        this.$vs.notify({
                            color: 'success',
                            text: 'Currency updated successfully !',
                        })
                    }
                    else {
                        this.$vs.notify({
                            color: 'success',
                            text: 'Currency added successfully !',
                        })
                    }
                    this.$emit('closeSidebar')
                    this.$emit('loadCurrencies')
                })
                .catch( error => {
                    this.$vs.notify({
                        color: 'danger',
                        text: 'Something went wrong ! Please contact system administrator',
                    })
                    this.currency.record(error)
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
