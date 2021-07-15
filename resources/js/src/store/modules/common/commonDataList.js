
import state from './commonState.js'
import mutations from './commonMutation.js'
import actions from './commonAction.js'
import getters from './commonGetter.js'

export default {
    isRegistered: false,
    namespaced: true,
    state,
    mutations,
    actions,
    getters
}

