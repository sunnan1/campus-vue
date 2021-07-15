import designations from '../../../core/requests/designations'
import router from '../../../router'
import relationships from '../../../core/requests/relationships'
import departmenttype from '../../../core/requests/departmenttype'
import leavetype from '../../../core/requests/leavetype'
import timeformats from '../../../core/requests/timeformat'
import dateformats from '../../../core/requests/dateformat'
import currencies from '../../../core/requests/currencies'
import common from '../../../core/requests/common'

export default {

    fetchDesignations (context , payload) {
        return new Promise((resolve, reject) => {
            designations.fetch(context.rootState , payload)
                .then(response => {
                    if (response.data.status === context.rootState.Success) {
                        context.commit('SET_DESIGNATIONS_INFO' , response.data.data)
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
    postDesignation (context , payload) {
        return new Promise((resolve, reject) => {
            designations.post(context.rootState , payload)
                .then(response => {
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
    removeDesignation (context , payload) {
        return new Promise((resolve, reject) => {
            designations.remove(context.rootState , payload)
                .then(response => {
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
    fetchRelationships (context) {
        return new Promise((resolve, reject) => {
            relationships.fetch(context.rootState)
                .then(response => {
                    if (response.data.status === context.rootState.Success) {
                        context.commit('SET_RELATIONSHIPS_INFO' , response.data.data.data)
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
    postRelationship (context , payload) {
        return new Promise((resolve, reject) => {
            relationships.post(context.rootState , payload)
                .then(response => {
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
    removeRelationship (context , payload) {
        return new Promise((resolve, reject) => {
            relationships.remove(context.rootState , payload)
                .then(response => {
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
    postLeavetype (context , payload) {
        return new Promise((resolve, reject) => {
            leavetype.post(context.rootState , payload)
                .then(response => {
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
    fetchDepartmentType (context) {
        return new Promise((resolve, reject) => {
            departmenttype.fetch(context.rootState)
                .then(response => {
                    if (response.data.status === context.rootState.Success) {
                        context.commit('SET_DEPARTMENTTYPE_INFO' , response.data.data)
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
    fetchLeaveType (context , payload) {
        return new Promise((resolve, reject) => {
            leavetype.fetch(context.rootState, payload)
                .then(response => {
                    if (response.data.status === context.rootState.Success) {
                        context.commit('SET_LEAVETYPE_INFO' , response.data.data)
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
    removeLeaveType (context , payload) {
        return new Promise((resolve, reject) => {
            leavetype.remove(context.rootState , payload)
                .then(response => {
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
    fetchTimeformats (context , payload) {
        return new Promise((resolve, reject) => {
            timeformats.fetch(context.rootState , payload)
                .then(response => {
                    if (response.data.status === context.rootState.Success) {
                        context.commit('SET_TIMEFORMATS_INFO' , response.data.data)
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
    postTimeformat (context , payload) {
        return new Promise((resolve, reject) => {
            timeformats.post(context.rootState , payload)
                .then(response => {
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
    removeTimeformat (context , payload) {
        return new Promise((resolve, reject) => {
            timeformats.remove(context.rootState , payload)
                .then(response => {
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
    processDateformats (context , payload) {
        return new Promise((resolve, reject) => {
            dateformats.execute(context.rootState , payload)
                .then(response => {
                    if(payload.type == context.rootState.get)
                    {
                        if (response.data.status === context.rootState.Success) {
                            context.commit('SET_DATEFORMATS_INFO' , response.data.data)
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
    processCurrencies (context , payload) {
        return new Promise((resolve, reject) => {
            currencies.execute(context.rootState , payload)
                .then(response => {
                    if(payload.type == context.rootState.get)
                    {
                        if (response.data.status === context.rootState.Success) {
                            context.commit('SET_CURRENCIES_INFO' , response.data.data)
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
