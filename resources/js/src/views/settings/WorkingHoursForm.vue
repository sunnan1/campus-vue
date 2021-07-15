<template>
    <vs-sidebar click-not-close position-right parent="body" default-index="1" color="primary" class="add-new-data-sidebar items-no-padding" spacer v-model="isSidebarActiveLocal">
        <div class="mt-6 flex items-center justify-between px-6">
            <h4>{{ Object.entries(this.data).length === 0 ? "Add New" : "Update" }} Working Hour</h4>
            <feather-icon icon="XIcon" @click.stop="isSidebarActiveLocal = false" class="cursor-pointer"></feather-icon>
        </div>
        <vs-divider class="mb-0"></vs-divider>

        <component :is="scrollbarTag" class="scroll-area--data-list-add-new" :settings="settings" :key="$vs.rtl">

            <div class="p-6">
                <!-- NAME -->
                <vs-select label="Day" v-model="day" class="mt-5 w-full" :class="common.errors.has('day') ? 'red_border' : 'grey_border'" @focusin="common.errors.clear('day')" :disabled="true" >
                    <vs-select-item  :key="item.dayid" :value="item.dayid" :text="item.day" v-for="(item , index) in uniqueworking" />
                </vs-select>
                <small v-if="common.errors.has('day')" class="text-danger">{{ common.errors.get('day') }}</small>
                <br>
                <br>
                <label for="">Start Time  </label><small v-if="common.errors.has('starttime')" class="text-danger">{{ common.errors.get('starttime') }}</small>
                <br>
                <start-time class="mb-base" :data="'starttime'" :time="starttime"  @updateStarttime="updateStart"></start-time>
                <br>
                <label for="">End Time  </label><small v-if="common.errors.has('endtime')" class="text-danger">{{ common.errors.get('endtime') }}</small>
                <br>
                <start-time class="mb-base" :data="'endtime'" :time="endtime" @updateEndtime="updateEnd"></start-time>
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
      required: true
    },
    workinghours: {
      required: true
    }
  },
  components: {
    VuePerfectScrollbar,
    'start-time' : TimePicker,
    'end-time' : TimePicker
  },

  data () {
    return {
      common : new Common(this.$store),
      uniqueworking : [],
      day : '',
      starttime : '',
      endtime : '',
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
        this.uniqueworking = this.workinghours.map(e => e['dayid'])
          .map((e, i, final) => final.indexOf(e) === i && i)
          .filter((e) => this.workinghours[e]).map(e => this.workinghours[e])
          this.initValues()

          if(! isNaN(this.data))
          {
              this.day = this.data
          }
          else if (this.data.id) {
              this.day = this.data.dayid
              this.starttime = this.data.starttime
              this.endtime = this.data.endtime
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
      this.day = ''
      this.starttime = ''
      this.endtime = ''
      this.common.errors.clear()
    },
    updateStart (val) {
      this.starttime = val
    },
    updateEnd (val) {
      this.endtime = val
    },
    submitData () {
      this.common.errors.clear()
      const obj = {
        'id' : this.data.id,
        'day' : this.day,
        'starttime' : this.starttime,
        'endtime' : this.endtime
      }

      loader.show(this.$vs)
      this.common.post('common/processWorkinghours', {
        'type' : 'post',
        'OBJ'  : obj
      })
        .then(response => {
          this.$emit('closeSidebar')
          this.$emit('loadWorkinghours')
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
