<template>
    <flat-pickr :config="configdateTimePicker" v-model="Time" placeholder="Choose time" />
</template>

<script>
import flatPickr from 'vue-flatpickr-component'
import 'flatpickr/dist/flatpickr.css'

export default {
    props : ['time' , "data"],
    data () {
        return {
            Time: this.time,
            configdateTimePicker: {
                enableTime: true,
                enableSeconds: false,
                noCalendar: true
            }
        }
    },
    watch: {
        time (val) {
            this.Time = val
        },
        Time (val) {
            if(this.data == 'starttime'){
                this.$emit("updateStarttime" , val)
            }
            else if(this.data == 'endtime') {
                this.$emit("updateEndtime" , val)
            }
            else {
                this.$emit("updateTime" , val)
            }
        }
    },
    components: {
        flatPickr
    },
    created () {

        this.Time = this.time
    }
}
</script>
