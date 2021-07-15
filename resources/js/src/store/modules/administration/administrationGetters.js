/*=========================================================================================
  File Name: moduleCalendarGetters.js
  Description: Calendar Module Getters
  ----------------------------------------------------------------------------------------
  Item Name: Vuexy - Vuejs, HTML & Laravel Admin Dashboard Template
  Author: Pixinvent
  Author URL: http://www.themeforest.net/user/pixinvent
==========================================================================================*/


export default {
  getSchools (state) {
    return state.schools[0]
  },
  getCampuses (state) {
    return state.campuses
  },
  getDepartments (state) {
    return state.departments
  },
  getSubjects (state) {
    return state.subjects
  },
  getSubjectsData (state) {
    return state.subjectArr
  },
  getClasses (state) {
    return state.classes
  },
  getGradingScheme (state) {
    return state.gradingscheme
  },
  getClassSections (state) {
    return state.classsections
  },
  getSectionSubjects (state) {
    return state.sectionsubjects
  }
}
