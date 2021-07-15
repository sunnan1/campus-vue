<template>
        <datepicker placeholder="Select Date" :format="format" v-model="dt"></datepicker>
</template>

<script>
import Datepicker from 'vuejs-datepicker'

export default {
    props : ['date' , "data"],
    data () {
        return {
            format: 'yyyy-MM-dd',
            dt: null
        }
    },
    watch: {
        date (val) {
            this.dt = val
        },
        dt (val) {
            if(this.data == 'startdate'){
                this.$emit("updateStartDate" , val)
            }
            else if(this.data == 'enddate') {
                this.$emit("updateEndDate" , val)
            }
            else {
                this.$emit("updateDate" , val)
            }
        }
    },
    components: {
        Datepicker
    },
    created () {
        this.dt = this.date
    }
}
</script>
