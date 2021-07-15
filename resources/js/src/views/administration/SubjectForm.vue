<template>
    <vx-card>
        <div slot="no-body" class="tabs-container px-6 pt-6">
            <subject-tab></subject-tab>
        </div>
    </vx-card>
</template>

<script>
import SubjectTab from './SubjectTab'
import administration from '../../store/modules/administration/administrationDataList.js'

export default {
    components: {
        'subject-tab': SubjectTab,
    },
    computed: {
        markings () {
            return this.$store.getters['common/getMarkingValues']
        }
    },
    methods: {

    },
    created () {
        if (!administration.isRegistered) {
            this.$store.registerModule('adminData', administration)
            administration.isRegistered = true
        }
    }
}

</script>
