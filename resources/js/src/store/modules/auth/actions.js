/*
* File for Auth actions
* */

import login from '../../../core/requests/login'
import router from '@/router'

const actions = {

  validate (context, payload) {

    return new Promise((resolve, reject) => {
      login.authenticate(context.rootState, payload)
        .then(response => {
          if (response.data.status === context.rootState.Success) {
            context.commit('SET_BEARER', response.data , {root : true})
            context.commit('UPDATE_USER_INFO', response.data.data , {root: true})
            router.push({name : 'home'})
          }
          resolve(response)
        })
        .catch(error => {
          reject(error)
        })
    })
  }

}

export default actions
