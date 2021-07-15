import router from '../../../router'
import common from '../../../core/requests/common'

export default {
    processWorkinghours (context , payload) {
        return new Promise((resolve, reject) => {
            common.execute(context.rootState , "workinghours" , payload)
                .then(response => {
                    if(payload.type == context.rootState.get)
                    {
                        if (response.data.status === context.rootState.Success) {
                            context.commit('SET_WORKING_HOURS_INFO' , response.data.data.data)
                        }
                    }
                    resolve(response)
                })
                .catch(error => {

                    if(error.response.status === 400 && error.response.data.message === context.rootState.TOKEN_EXPIRE)
                    {
                        localStorage.removeItem('userInfo')
                        router.push({name : 'page-login'})
                    }
                    reject(error)
                })
        })
    },
    processHolidays (context , payload) {
        return new Promise((resolve, reject) => {
            common.execute(context.rootState , "holidays" , payload)
                .then(response => {
                    if(payload.type == context.rootState.get)
                    {
                        if (response.data.status === context.rootState.Success) {
                            context.commit('SET_HOLIDAYS_INFO' , response.data.data)
                        }
                    }
                    resolve(response)
                })
                .catch(error => {

                    if(error.response.status === 400 && error.response.data.message === context.rootState.TOKEN_EXPIRE)
                    {
                        localStorage.removeItem('userInfo')
                        router.push({name : 'page-login'})
                    }
                    reject(error)
                })
        })
    },
    processActivityTypes (context , payload) {
        return new Promise((resolve, reject) => {
            common.execute(context.rootState , "activitytypes" , payload)
                .then(response => {
                    if(payload.type == context.rootState.get)
                    {
                        if (response.data.status === context.rootState.Success) {
                            context.commit('SET_ACTIVITY_TYPE_INFO' , response.data.data)
                        }
                    }
                    resolve(response)
                })
                .catch(error => {

                    if(error.response.status === 400 && error.response.data.message === context.rootState.TOKEN_EXPIRE)
                    {
                        localStorage.removeItem('userInfo')
                        router.push({name : 'page-login'})
                    }
                    reject(error)
                })
        })
    },
    processMarkingValues (context , payload) {
        return new Promise((resolve, reject) => {
            common.execute(context.rootState , "markingvalues" , payload)
                .then(response => {
                    if(payload.type == context.rootState.get)
                    {
                        if (response.data.status === context.rootState.Success) {
                            context.commit('SET_MARKING_VALUES_INFO' , response.data.data.data)
                        }
                    }
                    resolve(response)
                })
                .catch(error => {

                    if(error.response.status === 400 && error.response.data.message === context.rootState.TOKEN_EXPIRE)
                    {
                        localStorage.removeItem('userInfo')
                        router.push({name : 'page-login'})
                    }
                    reject(error)
                })
        })
    },
    processCountries (context , payload) {
        return new Promise((resolve, reject) => {
            common.execute(context.rootState , "countries" , payload)
                .then(response => {
                    if(payload.type == context.rootState.get)
                    {
                        if (response.data.status === context.rootState.Success) {
                            context.commit('SET_COUNTRIES_INFO' , response.data.data)
                        }
                    }
                    resolve(response)
                })
                .catch(error => {

                    if(error.response.status === 400 && error.response.data.message === context.rootState.TOKEN_EXPIRE)
                    {
                        localStorage.removeItem('userInfo')
                        router.push({name : 'page-login'})
                    }
                    reject(error)
                })
        })
    },
    processSessions (context , payload) {
        return new Promise((resolve, reject) => {
            common.execute(context.rootState , "sessions" , payload)
                .then(response => {
                    if(payload.type == context.rootState.get)
                    {
                        if (response.data.status === context.rootState.Success) {
                            context.commit('SET_SESSIONS_INFO' , response.data.data.data)
                        }
                    }
                    resolve(response)
                })
                .catch(error => {

                    if(error.response.status === 400 && error.response.data.message === context.rootState.TOKEN_EXPIRE)
                    {
                        localStorage.removeItem('userInfo')
                        router.push({name : 'page-login'})
                    }
                    reject(error)
                })
        })
    },
}
