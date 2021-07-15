/*=========================================================================================
  File Name: moduleCalendarMutations.js
  Description: Calendar Module Mutations
  ----------------------------------------------------------------------------------------
  Item Name: Vuexy - Vuejs, HTML & Laravel Admin Dashboard Template
  Author: Pixinvent
  Author URL: http://www.themeforest.net/user/pixinvent
==========================================================================================*/


export default {
  SET_SCHOOL_INFO (state, school) {
    state.schools = school
  },
  SET_CAMPUS_INFO (state, school) {
    state.campuses = school
  },
  SET_DEPARTMENTS_INFO (state, school) {
    state.departments = school
  },
  SET_SUBJECTS_INFO (state, school) {
    state.subjects = school
  },
  SET_SUBJECTS_TABLE (state, school) {
    state.subjectArr = school
  },
  SET_CLASSES_INFO (state, classes) {
    state.classes = classes
  },
  SET_GRADING_SCHEME_INFO (state, obj) {
    state.gradingscheme = obj
  },
  SET_CLASS_SECTIONS_INFO (state, obj) {
    state.classsections = obj
  },
  SET_SECTION_SUBJECTS (state, obj) {
    state.sectionsubjects = obj
  },
}
