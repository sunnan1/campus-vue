<template>
    <div id="data-list-list-view" class="data-list-container">
        <vs-table ref="table" @selected="showSession" search :data="sessions"  >

            <div slot="header" class="flex flex-wrap-reverse items-center flex-grow justify-between">

                <div class="btn-add-new p-3 mb-4 mr-4 rounded-lg cursor-pointer flex items-center justify-center text-lg font-medium text-base text-primary border border-solid border-primary" @click="addNewData">
                    <feather-icon icon="PlusIcon" svgClasses="h-4 w-4" />
                    <span class="ml-2 text-base text-primary">Add New</span>
                </div>
            </div>

            <template slot="thead">
                <vs-th sort-key="code">Name</vs-th>
                <vs-th sort-key="name">Start Date</vs-th>
                <vs-th sort-key="credit">End Date</vs-th>
                <vs-th sort-key="marking">Offered Subjects</vs-th>
                <vs-th sort-key="marking">Status</vs-th>
                <vs-th sort-key="marking">Terms</vs-th>
                <vs-th>Action</vs-th>
            </template>

            <template slot-scope="{data}">
                <tbody>
                <vs-tr :data="tr" :key="indextr" v-for="(tr, indextr) in data">

                    <vs-td>
                        <p class="product-name font-medium truncate">{{ tr.name }}</p>
                    </vs-td>
                    <vs-td>
                        <p class="product-name font-medium truncate">{{ tr.start_date }}</p>
                    </vs-td>
                    <vs-td>
                        <p class="product-name font-medium truncate">{{ tr.end_date }}</p>
                    </vs-td>
                    <vs-td>
                        <feather-icon icon="InfoIcon" svgClasses="w-5 h-5 hover:text-primary stroke-current" class="ml-2" @click.stop="openOfferedSubjects(tr.id)" />
                    </vs-td>
                    <vs-td>
                        <vs-switch color="success" :checked="tr.status" />
                    </vs-td>
                    <vs-td>
                        <p class="product-name font-medium truncate">{{ getCompLength(tr.terms) }}</p>
                    </vs-td>
                    <vs-td class="whitespace-no-wrap">
                        <feather-icon icon="EditIcon" svgClasses="w-5 h-5 hover:text-primary stroke-current" @click.stop="editData(tr.id)" />
                        <feather-icon icon="TrashIcon" svgClasses="w-5 h-5 hover:text-danger stroke-current" @click.stop="openConfirm(tr.id)" />
                    </vs-td>
                </vs-tr>
                </tbody>
            </template>
        </vs-table>
    </div>
</template>

<script>
import administration from '../../store/modules/administration/administrationDataList.js'
import loader from '../../core/utilities/Loader'

export default {
    data () {
        return {
            sessionid : ''
        }
    },
    computed: {
        sessions () {
            return this.$store.getters['common/getSession']
        },
    },
    methods: {
        getCompLength (act) {
            try {
                return act.length
            }catch (e) {
            }
        },
        addNewData () {
            this.$router.push('/settings/session/new-session')
        },
        editData (data) {
            this.$router.push({name : 'edit-session' , params : {id : data}})
        },
        loadSessions () {
            loader.show(this.$vs)
            this.$store.dispatch('common/processSessions' ,{
                'type' : 'get',
            })
            .finally( () => {
                loader.hide(this.$vs)
            })
        },
        openOfferedSubjects (id) {
            this.$router.push({name : 'session-subjects' , params : {id : id}})
        },
        deleteData () {
            if(this.sessionid != ''){
                loader.show(this.$vs)
                this.$store.dispatch('common/processSessions' , {
                    'id' : this.sessionid,
                    'type' : 'delete'
                })
                    .then( () => {
                        this.$vs.notify({
                            color: 'success',
                            text: 'Session deleted successfully !',
                        })
                    })
                    .catch( () => {
                        this.$vs.notify({
                            color: 'danger',
                            text: 'Something went wrong ! Please contact system administrator',
                        })
                    })
                    .finally( () => {
                        this.loadSessions()
                        loader.hide(this.$vs)
                    })
            }
        },
        openConfirm (tr) {
            this.sessionid = tr
            this.$vs.dialog({
                type: 'confirm',
                color: 'danger',
                title: 'Confirmation',
                text: 'Are you sure want to delete this Session ?',
                accept: this.deleteData,
                cancel : this.cancel,
            })
        },
        cancel  () {
            this.sessionid = ''
        },
        showSession (tr) {
            this.$router.push({name : 'edit-session' , params : {id : tr.id}})
        },

    },
    created () {
        this.loadSessions()
    },
}
</script>

<style lang="scss">
#data-list-list-view {
    .vs-con-table {

        /*
          Below media-queries is fix for responsiveness of action buttons
          Note: If you change action buttons or layout of this page, Please remove below style
        */
        @media (max-width: 689px) {
            .vs-table--search {
                margin-left: 0;
                max-width: unset;
                width: 100%;

                .vs-table--search-input {
                    width: 100%;
                }
            }
        }

        @media (max-width: 461px) {
            .items-per-page-handler {
                display: none;
            }
        }

        @media (max-width: 341px) {
            .data-list-btn-container {
                width: 100%;

                .dd-actions,
                .btn-add-new {
                    width: 100%;
                    margin-right: 0 !important;
                }
            }
        }

        .product-name {
            max-width: 23rem;
        }

        .vs-table--header {
            display: flex;
            flex-wrap: wrap;
            margin-left: 1.5rem;
            margin-right: 1.5rem;
            > span {
                display: flex;
                flex-grow: 1;
            }

            .vs-table--search{
                padding-top: 0;

                .vs-table--search-input {
                    padding: 0.9rem 2.5rem;
                    font-size: 1rem;

                    &+i {
                        left: 1rem;
                    }

                    &:focus+i {
                        left: 1rem;
                    }
                }
            }
        }

        .vs-table {
            border-collapse: separate;
            border-spacing: 0 1.3rem;
            padding: 0 1rem;

            tr{
                box-shadow: 0 4px 20px 0 rgba(0,0,0,.05);
                td{
                    padding: 20px;
                    &:first-child{
                        border-top-left-radius: .5rem;
                        border-bottom-left-radius: .5rem;
                    }
                    &:last-child{
                        border-top-right-radius: .5rem;
                        border-bottom-right-radius: .5rem;
                    }
                }
                td.td-check{
                    padding: 20px !important;
                }
            }
        }

        .vs-table--thead{
            th {
                padding-top: 0;
                padding-bottom: 0;

                .vs-table-text{
                    text-transform: uppercase;
                    font-weight: 600;
                }
            }
            th.td-check{
                padding: 0 15px !important;
            }
            tr{
                background: none;
                box-shadow: none;
            }
        }

        .vs-table--pagination {
            justify-content: center;
        }
    }
}
</style>
