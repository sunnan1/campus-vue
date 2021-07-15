<template>
    <div id="page-user-view">

        <div id="user-data">

            <vx-card title="Account" class="mb-base">

                <!-- Avatar -->
                <div class="vx-row">

                    <!-- Avatar Col -->
                    <div class="vx-col" id="avatar-col">
                        <div class="img-container mb-4">
                            <img :src="sch.logo" class="rounded w-full" />
                        </div>
                    </div>

                    <div class="vx-col flex-1" id="account-info-col-1">
                        <table>
                            <tr>
                                <td class="font-semibold">Code</td>
                                <td>{{ sch.code }}</td>
                            </tr>
                            <tr>
                                <td class="font-semibold">Name</td>
                                <td>{{ sch.name }}</td>
                            </tr>
                            <tr>
                                <td class="font-semibold">Email</td>
                                <td>{{ sch.email }}</td>
                            </tr>
                        </table>
                    </div>

                    <div class="vx-col flex-1" id="account-info-col-2">
                        <table>
                            <tr>
                                <td class="font-semibold">Country</td>
                                <td>{{ sch.country_name }}</td>
                            </tr>
                            <tr>
                                <td class="font-semibold">Phone</td>
                                <td>{{ sch.phone }}</td>
                            </tr>
                            <tr>
                                <td class="font-semibold">Post Code</td>
                                <td>{{ sch.postcode }}</td>
                            </tr>
                            <tr>
                                <td class="font-semibold">Address</td>
                                <td>{{ sch.address }}</td>
                            </tr>
                        </table>
                    </div>
                    <div class="vx-col w-full flex" id="account-manage-buttons">
                        <vs-button icon-pack="feather" icon="icon-edit" class="mr-4" :to="{name: 'institute-form'}">Edit</vs-button>
                    </div>
                </div>

            </vx-card>
        </div>
    </div>
</template>

<script>
import administration from '../../store/modules/administration/administrationDataList.js'
import loader from '../../core/utilities/Loader'
import common from '../../core/requests/common'

export default {
    data () {
        return {
            sch : {}
        }
    },
    computed: {
        school () {
            return this.$store.getters['adminData/getSchools']
        },
    },
    methods: {
        getSchools () {
            loader.show(this.$vs)

            this.$store.dispatch('adminData/fetchSchools')
                // eslint-disable-next-line no-unused-vars
                .then(response => {
                })
                .catch(error => {
                })
                .finally(() => {
                    loader.hide(this.$vs)
                    this.sch = this.school
                })
        }
    },
    created () {
        if (!administration.isRegistered) {
            this.$store.registerModule('adminData', administration)
            administration.isRegistered = true
        }
        this.getSchools()
    },
    mounted () {
    }
}
</script>


<style lang="scss">
#avatar-col {
    width: 10rem;
}

#page-user-view {
    table {
        td {
            vertical-align: top;
            min-width: 140px;
            padding-bottom: .8rem;
            word-break: break-all;
        }

        &:not(.permissions-table) {
            td {
                @media screen and (max-width:370px) {
                    display: block;
                }
            }
        }
    }
}

// #account-info-col-1 {
//   // flex-grow: 1;
//   width: 30rem !important;
//   @media screen and (min-width:1200px) {
//     & {
//       flex-grow: unset !important;
//     }
//   }
// }


@media screen and (min-width:1201px) and (max-width:1211px),
only screen and (min-width:636px) and (max-width:991px) {
    #account-info-col-1 {
        width: calc(100% - 12rem) !important;
    }

    // #account-manage-buttons {
    //   width: 12rem !important;
    //   flex-direction: column;

    //   > button {
    //     margin-right: 0 !important;
    //     margin-bottom: 1rem;
    //   }
    // }

}

</style>
