
import state from './administrationState.js'
import mutations from './administrationMutations.js'
import actions from './administrationActions.js'
import getters from './administrationGetters.js'

export default {
  isRegistered: false,
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}

