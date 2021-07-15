/*
* File for Administration actions
* */

import schoolinfo from '../../../core/requests/school'
import campusinfo from '../../../core/requests/campus'
import departments from '../../../core/requests/departments'
import router from '../../../router'
import common from '../../../core/requests/common'

const actions = {

  fetchSchools (context) {

    return new Promise((resolve, reject) => {
      schoolinfo.fetch(context.rootState)
        .then(response => {
          if (response.data.status === context.rootState.Success) {
            context.commit('SET_SCHOOL_INFO', response.data.data)
          }
          resolve(response)
        })
        .catch(error => {
          if (error.response.status === 400 && error.response.data.message === context.rootState.TOKEN_EXPIRE) {
            localStorage.removeItem('userInfo')
            router.push({name : 'page-login'})
          }
          reject(error)
        })
    })
  },
  fetchCampuses (context) {

    return new Promise((resolve, reject) => {
      campusinfo.fetch(context.rootState)
        .then(response => {
          if (response.data.status === context.rootState.Success) {
            context.commit('SET_CAMPUS_INFO', response.data.data.data)
          }
          resolve(response)
        })
        .catch(error => {
          if (error.response.status === 400 && error.response.data.message === context.rootState.TOKEN_EXPIRE) {
            localStorage.removeItem('userInfo')
            router.push({name : 'page-login'})
          }
          reject(error)
        })
    })
  },

  putSchool (context, payload) {
    return new Promise((resolve, reject) => {
      schoolinfo.put(context.rootState, payload)
        .then(response => {
          resolve(response)
        })
        .catch(error => {
          reject(error)
        })
    })
  },
  postCampus (context, payload) {
    return new Promise((resolve, reject) => {
      campusinfo.post(context.rootState, payload)
        .then(response => {
          resolve(response)
        })
        .catch(error => {
          reject(error)
        })
    })
  },
  removeCampus (context, payload) {
        return new Promise((resolve, reject) => {
            campusinfo.delete(context.rootState, payload)
                .then(response => {
                    resolve(response)
                })
                .catch(error => {
                    reject(error)
                })
        })
  },
  postDepartment (context, payload) {
    return new Promise((resolve, reject) => {
      departments.execute(context.rootState, payload)
        .then(response => {
          resolve(response)
        })
        .catch(error => {
          reject(error)
        })
    })
  },
  removeDepartment (context, payload) {
    return new Promise((resolve, reject) => {
      departments.execute(context.rootState, payload)
        .then(response => {
          resolve(response)
        })
        .catch(error => {
          reject(error)
        })
    })
  },
  fetchDepartments (context , payload) {
    return new Promise((resolve, reject) => {
      departments.fetch(context.rootState , payload)
        .then(response => {
          if (response.data.status === context.rootState.Success) {
            context.commit('SET_DEPARTMENTS_INFO', response.data.data)
          }
          resolve(response)
        })
        .catch(error => {
          if (error.response.status === 400 && error.response.data.message === context.rootState.TOKEN_EXPIRE) {
            localStorage.removeItem('userInfo')
            router.push({name : 'page-login'})
          }
          reject(error)
        })
    })
  },
  processSubjects (context, payload) {
    return new Promise((resolve, reject) => {
      common.execute(context.rootState, 'subjects', payload)
        .then(response => {
          if (payload.type == context.rootState.get) {
            if (response.data.status === context.rootState.Success) {
              context.commit('SET_SUBJECTS_INFO', response.data.data)
                if(response.data.data.data) {
                    context.commit('SET_SUBJECTS_TABLE', response.data.data.data)
                }
            }
          }
          resolve(response)
        })
        .catch(error => {

          if (error.response.status === 400 && error.response.data.message === context.rootState.TOKEN_EXPIRE) {
            localStorage.removeItem('userInfo')
            router.push({name : 'page-login'})
          }
          reject(error)
        })
    })
  },
  processClasses (context, payload) {
    return new Promise((resolve, reject) => {
      common.execute(context.rootState, 'classes', payload)
        .then(response => {
          if (payload.type == context.rootState.get) {
            if (response.data.status === context.rootState.Success) {
              context.commit('SET_CLASSES_INFO', response.data.data)
            }
          }
          resolve(response)
        })
        .catch(error => {

          if (error.response.status === 400 && error.response.data.message === context.rootState.TOKEN_EXPIRE) {
            localStorage.removeItem('userInfo')
            router.push({name : 'page-login'})
          }
          reject(error)
        })
    })
  },
    processClassSections (context, payload) {
    return new Promise((resolve, reject) => {
      common.executeClassSection(context.rootState, 'sections', payload)
        .then(response => {
          if (payload.type == context.rootState.get) {
            if (response.data.status === context.rootState.Success) {
              context.commit('SET_CLASS_SECTIONS_INFO', response.data.data.data)
            }
          }
          resolve(response)
        })
        .catch(error => {

          if (error.response.status === 400 && error.response.data.message === context.rootState.TOKEN_EXPIRE) {
            localStorage.removeItem('userInfo')
            router.push({name : 'page-login'})
          }
          reject(error)
        })
    })
  },
  submitClassSection (context, payload) {
    return new Promise((resolve, reject) => {
      common.execute(context.rootState, 'sections', payload)
        .then(response => {
          resolve(response)
        })
        .catch(error => {

          if (error.response.status === 400 && error.response.data.message === context.rootState.TOKEN_EXPIRE) {
            localStorage.removeItem('userInfo')
            router.push({name : 'page-login'})
          }
          reject(error)
        })
    })
  },
  removeClassSection (context, payload) {
    return new Promise((resolve, reject) => {
      common.execute(context.rootState, 'sections', payload)
        .then(response => {
          resolve(response)
        })
        .catch(error => {

          if (error.response.status === 400 && error.response.data.message === context.rootState.TOKEN_EXPIRE) {
            localStorage.removeItem('userInfo')
            router.push({name : 'page-login'})
          }
          reject(error)
        })
    })
  },
  getSectionSubjects (context, payload) {
    return new Promise((resolve, reject) => {
      common.getSectionSubjects(context.rootState, 'subjects', payload)
        .then(response => {
            if (payload.type == context.rootState.get) {
                if (response.data.status === context.rootState.Success) {
                    context.commit('SET_SECTION_SUBJECTS', response.data.data)
                }
            }
          resolve(response)
        })
        .catch(error => {

          if (error.response.status === 400 && error.response.data.message === context.rootState.TOKEN_EXPIRE) {
            localStorage.removeItem('userInfo')
            router.push({name : 'page-login'})
          }
          reject(error)
        })
    })
  },
  processGradingScheme (context, payload) {
    return new Promise((resolve, reject) => {
      common.execute(context.rootState, 'gradingschemes', payload)
        .then(response => {
          if (payload.type == context.rootState.get) {
            if (response.data.status === context.rootState.Success) {
              context.commit('SET_GRADING_SCHEME_INFO', response.data.data.data)
            }
          }
          resolve(response)
        })
        .catch(error => {

          if (error.response.status === 400 && error.response.data.message === context.rootState.TOKEN_EXPIRE) {
            localStorage.removeItem('userInfo')
            router.push({name : 'page-login'})
          }
          reject(error)
        })
    })
  },
    saveSectionSubjects (context, payload) {
    return new Promise((resolve, reject) => {
      common.saveSectionSubjects(context.rootState, 'subjects', payload)
        .then(response => {
          resolve(response)
        })
        .catch(error => {

          if (error.response.status === 400 && error.response.data.message === context.rootState.TOKEN_EXPIRE) {
            localStorage.removeItem('userInfo')
            router.push({name : 'page-login'})
          }
          reject(error)
        })
    })
  },

}

export default actions
