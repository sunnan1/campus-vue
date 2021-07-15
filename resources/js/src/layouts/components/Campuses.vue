<template>
    <vs-dropdown vs-custom-content vs-trigger-click class="cursor-pointer">
        <span class="cursor-pointer flex items-center i18n-locale">
          <span class="hidden sm:block ml-2">{{ defaultCampus.name }}</span>&nbsp;<feather-icon icon="ChevronDownIcon" svgClasses="h-4 w-4" />
        </span>
        <vs-dropdown-menu class="vx-navbar-dropdown">
            <ul style="min-width: 9rem">
                <li class="flex py-2 px-4 cursor-pointer hover:bg-primary hover:text-white" @click="updateCampus(item.id)" v-for="item in otherCampuses">
                    <span class="ml-2">{{ item.name }}</span>
                </li>
            </ul>
        </vs-dropdown-menu>
    </vs-dropdown>
</template>
<script>
import vSelect from 'vue-select'
export default {

    components : {
        'v-select': vSelect
    },
    data () {
        return {
            campus : [],
            otherCampuse : []
        }
    },
    name: 'Campuses',
    computed : {
        defaultCampus () {
            let obj =  this.campus.campuses.find( a => a.id == this.campus.campus)
            return obj
        },
        otherCampuses () {
            this.otherCampuse = []
            for (let index = 0 ; index < this.campus.campuses.length ; index ++) {
                if (this.campus.campuses[index].id != this.campus.campus) {
                    this.otherCampuse.push ({
                        'id' : this.campus.campuses[index].id,
                        'name' : this.campus.campuses[index].name
                    })
                }
            }
            return this.otherCampuse
        }
    },
    methods : {
        updateCampus (campusId) {
             this.$root.$store.dispatch('updateCampus', campusId)
            .then ( () => {
                this.$root.$store.dispatch('refreshtoken')
                .then ( () => {
                    this.$vs.notify({
                        color: 'success',
                        text: 'Campus updated successfully !',
                    })
                    window.location.reload()
                })
                .catch( () => {
                    this.$vs.notify({
                        color: 'danger',
                        text: 'Something went wrong while changing campus',
                    })
                })
            })
            .catch ( () => {
                this.$vs.notify({
                    color: 'danger',
                    text: 'The selected campus is not authorize to this user!',
                })
            })
        }
    },

    created () {
        var base64Url = JSON.parse(localStorage.getItem('userInfo')).token.split('.')[1];
        var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        var jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));
        this.campus = JSON.parse(jsonPayload)
    }
}
</script>

<style scoped>

</style>
