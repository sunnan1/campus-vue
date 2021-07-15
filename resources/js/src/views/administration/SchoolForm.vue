<template>

    <div id="page-user-edit" v-if="schools != undefined">
        <vx-card>

            <div slot="no-body" class="tabs-container px-6 pt-6" >
                <vs-tabs class="tab-action-btn-fill-conatiner">
                    <vs-tab label="Information" icon-pack="feather" icon="icon-info">
                        <div class="tab-text">
                            <div class="vx-row">
                                <div class="vx-col w-full">
                                    <div class="flex items-start flex-col sm:flex-row">
                                        <img :src="logo" class="mr-8 rounded h-25 w-25" />

                                    </div>
                                </div>
                            </div>
                            <div class="vx-row">
                                <div class="vx-col w-full">
                                    <input type="file" class="hidden" ref="updateImgInput" @change="updateCurrImg" accept="image/*">
                                    <vs-button class="mr-4" @click="$refs.updateImgInput.click()">Replace Logo</vs-button>
                                </div>
                            </div>
                            <br>
                            <div class="vx-row">
                                <div class="vx-col w-full md:w-1/2">

                                    <!-- Col Content -->
                                    <div>
                                        <label for=""><b>Institute Code</b></label>
                                        <vs-input class="w-full" label="" :class="school.errors.has('short_name') ? 'red_border' : 'grey_border'" v-model="short_name" @keydown="school.errors.clear('short_name')"/>
                                        <span class="text-danger text-sm"  v-show="school.errors.has('short_name')">{{ school.errors.get('short_name') }}</span>
                                        <br>
                                        <label for=""><b>Institute Name</b></label>
                                        <vs-input class="w-full" label="" :class="school.errors.has('institute_name') ? 'red_border' : 'grey_border'" v-model="institute_name" @keydown="school.errors.clear('institute_name')" />
                                        <span class="text-danger text-sm"  v-show="school.errors.has('institute_name')">{{ school.errors.get('institute_name') }}</span>
                                        <br>
                                        <label for=""><b>Country</b></label>
                                        <vs-select label="" v-model="country_id" :class="school.errors.has('country_id') ? 'red_border' : 'grey_border'" class="w-full" >
                                            <vs-select-item :key="item.id" :value="item.id" :text="item.name" v-for="item in this.countries" />
                                        </vs-select>
                                        <span class="text-danger text-sm"  v-show="school.errors.has('country_id')">{{ school.errors.get('country_id') }}</span>
                                    </div>
                                </div>
                                <div class="vx-col w-full md:w-1/2">

                                    <div>
                                        <label for=""><b>Institute Email</b></label>
                                        <vs-input class="w-full" label="" :class="school.errors.has('email') ? 'red_border' : 'grey_border'" v-model="email" @keydown="school.errors.clear('email')"/>
                                        <span class="text-danger text-sm"  v-show="school.errors.has('email')">{{ school.errors.get('email') }}</span>
                                        <br>
                                        <label for=""><b>Institute Phone</b></label>
                                        <vs-input class="w-full" label="" :class="school.errors.has('phone') ? 'red_border' : 'grey_border'" v-model="phone" @keydown="school.errors.clear('phone')" />
                                        <span class="text-danger text-sm"  v-show="school.errors.has('phone')">{{ school.errors.get('phone') }}</span>
                                        <br>
                                        <label for=""><b>Postal Code</b></label>
                                        <vs-input class="w-full" label="" :class="school.errors.has('post_code') ? 'red_border' : 'grey_border'" v-model="post_code" @keydown="school.errors.clear('post_code')" />
                                        <span class="text-danger text-sm"  v-show="school.errors.has('post_code')">{{ school.errors.get('post_code') }}</span>

                                    </div>
                                </div>

                            </div>
                            <div class="vx-row">
                                <div class="vx-col w-full">
                                    <vs-input class="w-full mt-4" label="Address" :class="school.errors.has('address') ? 'red_border' : 'grey_border'" v-model="address" />
                                    <span class="text-danger text-sm"  v-show="school.errors.has('address')">{{ school.errors.get('address') }}</span>
                                </div>
                            </div>
                            <div class="vx-row">
                                <div class="vx-col w-full">
                                    <div class="mt-8 flex flex-wrap items-center justify-end">
                                        <vs-button class="mr-2 mt-2" :to="{name: 'schools-info'}" color="danger" type="border">Cancel</vs-button>
                                        <vs-button class="mt-2" @click="submitData" :disabled="school.errors.any() || isReady">Save</vs-button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </vs-tab>
                </vs-tabs>

            </div>

        </vx-card>
    </div>
</template>

<script>
import SchoolForm from '../../core/utilities/SchoolForm'
import loader from '../../core/utilities/Loader'
import administration from '../../store/modules/administration/administrationDataList'
import common from '../../core/requests/common'

export default {

    data () {
        return {
            countries : [],
            school : new SchoolForm(this.$store),
            short_name : '',
            institute_name : '',
            email : '',
            phone : '',
            country_id : '',
            post_code: '',
            address : '',
            logo : '',
            id : '',
            updateImgInput : ''
        }
    },
    computed: {
        isReady () {
            return this.logo == this.schools.logo &&
            this.short_name == this.schools.code &&
            this.institute_name == this.schools.name &&
            this.email == this.schools.email &&
            this.phone == this.schools.phone &&
            this.country_id == this.schools.country &&
            this.post_code == this.schools.postcode &&
            this.address == this.schools.address
        },
        schools () {
            return this.$store.getters['adminData/getSchools']
        },
    },
    methods: {

        submitData () {

            let form = new FormData()
            form.append("_method" , "put")
            if(this.dataImg != null)
            {
                form.append("logo" , this.dataImg)
            }
            form.append('institute_name' , this.institute_name)
            form.append('short_name' , this.short_name)
            form.append('phone' , this.phone)
            form.append('email' , this.email)
            form.append('country_id' , this.country_id)
            form.append('post_code' , this.post_code)
            form.append('address' , this.address)

            loader.show(this.$vs)
            this.school.post(form , this.id)
                .then( response => {
                    this.$vs.notify({
                        color: 'success',
                        text: 'Institute Profile updated successfully !',
                    })
                    this.$router.push({name : 'schools-info'})
                })
                .catch( error => {
                    this.school.record(error)
                })
                .finally( () => {
                    loader.hide(this.$vs)
                })
        },
        updateCurrImg (input) {
            if (input.target.files && input.target.files[0]) {
                this.dataImg = input.target.files[0]
                const reader = new FileReader()
                reader.onload = e => {
                    this.logo = e.target.result
                }
                reader.readAsDataURL(input.target.files[0])
            }
        },
        getSchools () {
            loader.show(this.$vs)
            common.countries(this.$root.$store.state)
            .then((response) => {
                this.countries = response.data.data.data
            })

            this.$store.dispatch('adminData/fetchSchools')
                .finally(() => {
                    this.logo = this.schools.logo
                    this.short_name = this.schools.code
                    this.institute_name = this.schools.name
                    this.email = this.schools.email
                    this.phone = this.schools.phone
                    this.country_id = this.schools.country
                    this.post_code = this.schools.postcode
                    this.address = this.schools.address
                    this.id = this.schools.id
                    loader.hide(this.$vs)
                })

        }
    },
    created () {
        if (!administration.isRegistered) {
            this.$store.registerModule('adminData', administration)
            administration.isRegistered = true
        }
        this.getSchools()
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
