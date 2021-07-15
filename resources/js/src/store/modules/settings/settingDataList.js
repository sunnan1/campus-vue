
import state from './settingState.js'
import mutations from './settingMutations.js'
import actions from './settingActions.js'
import getters from './settingGetters.js'

export default {
    isRegistered: false,
    namespaced: true,
    state,
    mutations,
    actions,
    getters
}

