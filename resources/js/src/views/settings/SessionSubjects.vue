<template>
    <div id="ag-grid-demo">
        <vx-card style="padding: 1%">
            <div class="vx-row">
                <div class="flex items-end">
                    <span class="leading-none font-medium">Basic Information</span>
                </div>
            </div>
            <br>
            <div class="vx-row">
                <div class="vx-col w-full md:w-1/2">
                    <label for=""><b>Classes</b></label>
                    <vs-select label="" v-model="classes" class="w-full"  @change="getClass">
                        <vs-select-item :key="item.id" :value="item.id" :text="item.name" v-for="(item , index) in classesList" />
                    </vs-select>
                </div>
                <div class="vx-col w-full md:w-1/2">
                    <label for=""><b>Sections</b></label>
                    <vs-select label="" v-model="sections" class="w-full" @change="getSubjects">
                        <vs-select-item :key="item.id" :value="item.id" :text="item.name" v-for="(item , index) in sectionList" />
                    </vs-select>
                </div>
            </div>
        </vx-card>

    </div>
</template>

<script>
import { AgGridVue } from 'ag-grid-vue'

import '@sass/vuexy/extraComponents/agGridStyleOverride.scss'
import loader from '../../core/utilities/Loader'
import administration from '../../store/modules/administration/administrationDataList'

export default {
    components: {
        AgGridVue
    },
    computed : {
        allClasses () {
            return this.$store.getters['adminData/getClasses']
        },
        classsections () {
            return this.$store.getters['adminData/getClassSections']
        },

    },
    data () {
        return {
            classesList : '',
            sectionList : '',
            classes : '',
            sections : '',
            searchQuery: '',
            gridOptions: {},
            maxPageNumbers: 7,
            gridApi: null,
            defaultColDef: {
                sortable: true,
                editable: true,
                resizable: true,
                suppressMenu: true
            },
        }
    },
    watch: {
        '$store.state.windowWidth' (val) {
            if (val <= 576) {
                this.maxPageNumbers = 4
                this.gridOptions.columnApi.setColumnPinned('email', null)
            } else this.gridOptions.columnApi.setColumnPinned('email', 'left')
        }
    },
    methods: {
        getClass ()
        {
            if (this.classes  > 0) {
                this.loadSection(this.classes)
            }
        },
        loadSection (classes) {
            loader.show(this.$vs)
            this.$store.dispatch('adminData/processClassSections', {
                'type': 'get',
                'OBJ' : {
                    'classid' : classes,
                    'pagination' : 'no'
                }
            })
            .finally( () => {
                this.sectionList = this.classsections
                loader.hide(this.$vs)
            })
        },
        loadClasses () {
            loader.show(this.$vs)
            this.$store.dispatch('adminData/processClasses', {
                'type': 'get',
                'pagination' : 'no'
            })
            .finally( () => {
                this.classesList = this.allClasses.data
                loader.hide(this.$vs)
            })
        },
    },
    created () {
        if(this.$route.params.id)
        {
            if (!administration.isRegistered) {
                this.$store.registerModule('adminData', administration)
                administration.isRegistered = true
            }
            this.loadClasses()
        }
        else {
            this.$router.push({name : 'sessions'})
        }
    },
    mounted () {
        if (this.$vs.rtl) {
            const header = this.$refs.agGridTable.$el.querySelector('.ag-header-container')
            header.style.left = `-${  String(Number(header.style.transform.slice(11, -3)) + 9)  }px`
        }
    }
}

</script>
