/*=========================================================================================
  File Name: actions.js
  Description: Vuex Store - actions
  ----------------------------------------------------------------------------------------
  Item Name: Vuexy - Vuejs, HTML & Laravel Admin Dashboard Template
  Author: Pixinvent
  Author URL: http://www.themeforest.net/user/pixinvent
==========================================================================================*/

import common from '../core/requests/common.js'
import router from '../router'

const actions = {

    // /////////////////////////////////////////////
    // COMPONENTS
    // /////////////////////////////////////////////

    // Vertical NavMenu
    updateVerticalNavMenuWidth({ commit }, width) {
      commit('UPDATE_VERTICAL_NAV_MENU_WIDTH', width)
    },

    // VxAutoSuggest
    updateStarredPage({ commit }, payload) {
      commit('UPDATE_STARRED_PAGE', payload)
    },

    // The Navbar
    arrangeStarredPagesLimited({ commit }, list) {
      commit('ARRANGE_STARRED_PAGES_LIMITED', list)
    },
    arrangeStarredPagesMore({ commit }, list) {
      commit('ARRANGE_STARRED_PAGES_MORE', list)
    },

    // /////////////////////////////////////////////
    // UI
    // /////////////////////////////////////////////

    toggleContentOverlay({ commit }) {
      commit('TOGGLE_CONTENT_OVERLAY')
    },
    updateTheme({ commit }, val) {
      commit('UPDATE_THEME', val)
    },

    // /////////////////////////////////////////////
    // User/Account
    // /////////////////////////////////////////////

    updateUserInfo({ commit }, payload) {
      commit('UPDATE_USER_INFO', payload)
    },

    fetchCurrencies ( context ) {
        common.currencies( context.state )
            .then ( response => {
                context.commit('SET_CURRENCIES' , response.data.data.data)
            })
            .catch ( error => {
            })
    },
    fetchtimeformats ( context ) {
        common.timeformates( context.state )
            .then ( response => {
                context.commit('SET_TIMEFORMATS' , response.data.data.data)
            })
            .catch ( error => {
            })
    },
    fetchdateformats ( context ) {
        common.dateformates( context.state )
            .then ( response => {
                context.commit('SET_DATEFORMATS' , response.data.data.data)
            })
            .catch ( error => {
            })
    },
    fetchtimezones ( context ) {
        common.timezone( context.state )
            .then ( response => {
                context.commit('SET_TIMEZONES' , response.data.data)
            })
            .catch ( error => {
            })
    },
    updateCampus ( context, campus) {
        return new Promise((resolve, reject) => {
            common.updatecampus( context.state , campus )
                .then ( response => {
                    resolve(response)
                })
                .catch ( error => {
                    reject(error)
                })
        })
    },
    refreshtoken ( context ) {
        return new Promise((resolve, reject) => {
            common.refreshtoken( context.state )
                .then ( response => {
                    if (response.data.status === context.rootState.Success) {
                        context.commit('SET_BEARER', response.data , {root : true})
                        context.commit('UPDATE_USER_INFO', response.data.data , {root: true})
                    }
                    resolve(response)
                })
                .catch ( error => {
                    reject(error)
                })
        })
    }
}

export default actions
