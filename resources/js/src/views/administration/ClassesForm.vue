<template>
    <vs-sidebar click-not-close position-right parent="body" default-index="1" color="primary" class="add-new-data-sidebar items-no-padding" spacer v-model="isSidebarActiveLocal">
        <div class="mt-6 flex items-center justify-between px-6">
            <h4>{{ Object.entries(this.data).length === 0 ? "Add New" : "Update" }} Classes</h4>
            <feather-icon icon="XIcon" @click.stop="isSidebarActiveLocal = false" class="cursor-pointer"></feather-icon>
        </div>
        <vs-divider class="mb-0"></vs-divider>

        <component :is="scrollbarTag" class="scroll-area--data-list-add-new" :settings="settings" :key="$vs.rtl">

            <div class="p-6">
                <!-- NAME -->
                <label for=""><b>Code</b></label>
                <vs-input label="" v-model="code" class="w-full" :class="common.errors.has('code') ? 'red_border' : 'grey_border'" @keydown="common.errors.clear('code')" />
                <small v-if="common.errors.has('code')" class="text-danger">{{ common.errors.get('code') }}</small>
                <br>
                <label for=""><b>Name</b></label>
                <vs-input label="" v-model="name" class="w-full" :class="common.errors.has('name') ? 'red_border' : 'grey_border'" @keydown="common.errors.clear('name')" />
                <small v-if="common.errors.has('name')" class="text-danger">{{ common.errors.get('name') }}</small>
                <br>
                <label for=""><b>Grading Scheme</b></label>
                <vs-select label="" v-model="gradingschemes" :class="common.errors.has('gradingscheme') ? 'red_border' : 'grey_border'" class="w-full" @focusin="common.errors.clear('gradingscheme')" >
                    <vs-select-item :key="item.id" :value="item.id" :text="item.scheme" v-for="(item , index) in gradingscheme" />
                </vs-select>
                <small v-if="common.errors.has('gradingscheme')" class="text-danger">{{ common.errors.get('gradingscheme') }}</small>
                <br>
                <label for=""><b>Attendance</b></label>
                <vs-switch color="success" v-model="attendance" />
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
import TimePicker from '../common/TImePicker'

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
    gradingscheme: {
      required: true
    }
  },
  components: {
    VuePerfectScrollbar,
  },

  data () {
    return {
      common : new Common(this.$store),
      gradingschemes : '',
      code : '',
      name : '',
      attendance : true,
      settings: { // perfectscrollbar settings
        maxScrollbarLength: 60,
        wheelSpeed: .60
      },
      updateImgInput : ''
    }
  },
  watch: {
    isSidebarActive (val) {

      if (val) {
        this.initValues()
        if (this.data.id) {
          this.gradingschemes = this.data.gradingschemeId
          this.code = this.data.code
          this.name = this.data.name
          this.attendance = this.data.attendance == 1
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
        this.gradingschemes = ''
        this.code = ''
        this.name = ''
        this.attendance = true
      this.common.errors.clear()
    },
    submitData () {
      this.common.errors.clear()
      const obj = {
        'id' : this.data.id,
        'code' : this.code,
        'name' : this.name,
        'gradingscheme' : this.gradingschemes,
         'attendance' : this.attendance == true ? 1 : 0
      }

      loader.show(this.$vs)
      this.common.post('adminData/processClasses', {
        'type' : 'post',
        'OBJ'  : obj
      })
        .then(response => {
            if(this.data.id) {
                this.$vs.notify({
                    color: 'success',
                    text: 'Class updated successfully !',
                })
            }
            else {
                this.$vs.notify({
                    color: 'success',
                    text: 'Class added successfully !',
                })
            }
          this.$emit('closeSidebar')
          this.$emit('loadClasses')
        })
        .catch(error => {
          this.common.record(error)
        })
        .finally(() => {
          loader.hide(this.$vs)
        })

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
