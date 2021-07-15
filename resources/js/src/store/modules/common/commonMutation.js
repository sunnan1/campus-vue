export default {
    SET_WORKING_HOURS_INFO (state, data) {
        state.workinghours = data
    },
    SET_HOLIDAYS_INFO (state, data) {
        state.holidays = data
    },
    SET_ACTIVITY_TYPE_INFO (state, data) {
        state.activitytypes = data
    },
    SET_MARKING_VALUES_INFO (state, data) {
        state.markingValues = data
    },
    SET_COUNTRIES_INFO (state , country) {
        state.countries = country
    },
    SET_SESSIONS_INFO (state , obj) {
        state.sessions = obj
    },
}

