import Vue from 'vue'
import Router from 'vue-router'
import loader from '../src/core/utilities/Loader'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  base: '/',
  scrollBehavior () {
    return { x: 0, y: 0 }
  },
  routes: [

    {
      // =============================================================================
      // MAIN LAYOUT ROUTES
      // =============================================================================
      path: '',
      component: () => import('./layouts/main/Main.vue'),
      children: [
        // =============================================================================
        // Theme Routes
        // =============================================================================
        {
          path: '/',
          name: 'home',
          component: () => import('./views/Home.vue')
        },
        {
          path: '/administration/schools-info',
          name: 'schools-info',
          component: () => import('@/views/administration/SchoolInfo.vue'),
          meta: {
            breadcrumb: [
              { title: 'Home', url: '/' },
              { title: 'Administration'},
              { title: 'Institute Profile', active: true }
            ],
            pageTitle: 'Institute Profile'
          }
        },
          {
          path: '/administration/institute-form',
          name: 'institute-form',
          component: () => import('@/views/administration/SchoolForm.vue'),
          meta: {
            breadcrumb: [
              { title: 'Home', url: '/' },
              { title: 'Administration'},
              { title: 'Institute Profile', active: true }
            ],
            pageTitle: 'Edit Institute Profile'
          }
        },
        {
          path: '/administration/campuses-info',
          name: 'campuses',
          component: () => import('@/views/administration/CampusesInfo.vue'),
          meta: {
            breadcrumb: [
              { title: 'Home', url: '/' },
              { title: 'Administration'},
              { title: 'Campus List', active: true }
            ],
            pageTitle: 'Campuses'
          }
        },
        {
          path: '/administration/departments-info',
          name: 'departments',
          component: () => import('@/views/administration/DepartmentsInfo.vue'),
          meta: {
            breadcrumb: [
              { title: 'Home', url: '/' },
              { title: 'Administration'},
              { title: 'Department List', active: true }
            ],
            pageTitle: 'Departments'
          }
        },
        {
          path: '/administration/subjects',
          name: 'subjects',
          component: () => import('@/views/administration/Subjects.vue'),
          meta: {
            breadcrumb: [
              { title: 'Home', url: '/' },
              { title: 'Subjects'},
              { title: 'Subjects List', active: true }
            ],
            pageTitle: 'Subjects'
          }
        },
        {
          path: '/administration/subjects/new-subject',
          name: 'new-subject',
          component: () => import('@/views/administration/SubjectForm.vue'),
          meta: {
            breadcrumb: [
              { title: 'Home', url: '/' },
              { title: 'Subjects'},
              { title: 'Add New Subject', active: true }
            ],
            pageTitle: 'Subject Information'
          }
        },
        {
          path: '/administration/subjects/edit-subject/:id',
          name: 'edit-subject',
          component: () => import('@/views/administration/SubjectForm.vue'),
          meta: {
            breadcrumb: [
              { title: 'Home', url: '/' },
              { title: 'Subjects'},
              { title: 'Edit Subject', active: true }
            ],
            pageTitle: 'Subject Information'
          }
        },
        {
          path: '/administration/classes',
          name: 'classes',
          component: () => import('@/views/administration/Classes.vue'),
          meta: {
            breadcrumb: [
              { title: 'Home', url: '/' },
              { title: 'Classes'},
              { title: 'Classes List', active: true }
            ],
            pageTitle: 'Classes'
          }
        },
        {
          path: '/administration/classes/sections/:id',
          name: 'class-sections',
          component: () => import('@/views/administration/ClassSections.vue'),
          meta: {
            breadcrumb: [
              { title: 'Home', url: '/' },
              { title: 'Sections'},
              { title: 'Class Sections List', active: true }
            ],
            pageTitle: 'Class Sections'
          }
        },
        {
          path: '/administration/sections/:sectionid/subjects',
          name: 'section-subjects',
          component: () => import('@/views/administration/SectionSubjects.vue'),
          meta: {
            breadcrumb: [
              { title: 'Home', url: '/' },
            ],
            pageTitle: 'Section Subjects'
          }
        },
        {
          path: '/settings/designations-info',
          name: 'designations',
          component: () => import('@/views/settings/DesignationsInfo.vue'),
          meta: {
            breadcrumb: [
              { title: 'Home', url: '/' },
              { title: 'Settings'},
              { title: 'Designations List', active: true }
            ],
            pageTitle: 'Designations'
          }
        },
        {
          path: '/settings/relationships-info',
          name: 'relationships',
          component: () => import('@/views/settings/RelationshipInfo.vue'),
          meta: {
            breadcrumb: [
              { title: 'Home', url: '/' },
              { title: 'Settings'},
              { title: 'Relationships List', active: true }
            ],
            pageTitle: 'Relationships'
          }
        },
        {
          path: '/settings/department-types',
          name: 'department-types',
          component: () => import('@/views/settings/DepartmentTypesInfo.vue'),
          meta: {
            breadcrumb: [
              { title: 'Home', url: '/' },
              { title: 'Settings'},
              { title: 'Department Types List', active: true }
            ],
            pageTitle: 'Department Types'
          }
        },
        {
          path: '/settings/leave-type',
          name: 'leave-type',
          component: () => import('@/views/settings/LeaveTypeInfo.vue'),
          meta: {
            breadcrumb: [
              { title: 'Home', url: '/' },
              { title: 'Settings'},
              { title: 'Leave Types List', active: true }
            ],
            pageTitle: 'Leave Types'
          }
        },
        {
          path: '/settings/timeformats-info',
          name: 'timeformats-info',
          component: () => import('@/views/settings/TimeformatsInfo.vue'),
          meta: {
            breadcrumb: [
              { title: 'Home', url: '/' },
              { title: 'Settings'},
              { title: 'Time Formats List', active: true }
            ],
            pageTitle: 'Time Formats'
          }
        },
        {
          path: '/settings/dateformats-info',
          name: 'dateformats-info',
          component: () => import('@/views/settings/DateformatsInfo.vue'),
          meta: {
            breadcrumb: [
              { title: 'Home', url: '/' },
              { title: 'Settings'},
              { title: 'Date Formats List', active: true }
            ],
            pageTitle: 'Date Formats'
          }
        },
        {
          path: '/settings/currencies-info',
          name: 'currencies-info',
          component: () => import('@/views/settings/CurrenciesInfo.vue'),
          meta: {
            breadcrumb: [
              { title: 'Home', url: '/' },
              { title: 'Settings'},
              { title: 'Currencies List', active: true }
            ],
            pageTitle: 'Currencies'
          }
        },
        {
          path: '/settings/working-hours-info',
          name: 'working-hours-info',
          component: () => import('@/views/settings/WorkingHoursInfo.vue'),
          meta: {
            breadcrumb: [
              { title: 'Home', url: '/' },
              { title: 'Settings'},
              { title: 'Working Hours', active: true }
            ],
            pageTitle: 'Working Hours'
          }
        },
        {
          path: '/settings/holidays-info',
          name: 'holidays-info',
          component: () => import('@/views/settings/HolidaysInfo.vue'),
          meta: {
            breadcrumb: [
              { title: 'Home', url: '/' },
              { title: 'Settings'},
              { title: 'Holidays List', active: true }
            ],
            pageTitle: 'Holidays'
          }
        },
        {
          path: '/settings/activity-types',
          name: 'activity-types',
          component: () => import('@/views/settings/ActivityTypeInfo.vue'),
          meta: {
            breadcrumb: [
              { title: 'Home', url: '/' },
              { title: 'Settings'},
              { title: 'Activity Types List', active: true }
            ],
            pageTitle: 'Activity Types'
          }
        },
        {
          path: '/settings/sessions',
          name: 'sessions',
          component: () => import('@/views/settings/Session.vue'),
          meta: {
            breadcrumb: [
              { title: 'Home', url: '/' },
              { title: 'Settings'},
              { title: 'Sessions', active: true }
            ],
            pageTitle: 'Session'
          }
        },
        {
          path: '/settings/sessions/session-subjects/:id',
          name: 'session-subjects',
          component: () => import('@/views/settings/SessionSubjects.vue'),
          meta: {
            breadcrumb: [
              { title: 'Home', url: '/' },
              { title: 'Sessions' , url : '/settings/sessions'},
              { title: 'Session Subjects', active: true }
            ],
            pageTitle: 'Session Subjects'
          }
        },
        {
          path: '/settings/marking-values',
          name: 'activity-types',
          component: () => import('@/views/settings/MarkingValuesInfo.vue'),
          meta: {
            breadcrumb: [
              { title: 'Home', url: '/' },
              { title: 'Settings'},
              { title: 'Marking Values List', active: true }
            ],
            pageTitle: 'Marking Values'
          }
        },
        {
          path: '/settings/countries',
          name: 'countries',
          component: () => import('@/views/settings/Countries.vue'),
          meta: {
            breadcrumb: [
              { title: 'Home', url: '/' },
              { title: 'Settings'},
              { title: 'Countries List', active: true }
            ],
            pageTitle: 'Countries'
          }
        },
        {
          path: '/settings/session/new-session',
          name: 'new-session',
          component: () => import('@/views/settings/NewSession.vue'),
          meta: {
            breadcrumb: [
              { title: 'Home', url: '/' },
              { title: 'Settings'},
              { title: 'Create Session', active: true }
            ],
            pageTitle: 'Create Session'
          }
        },
        {
          path: '/settings/session/edit-session/:id',
          name: 'edit-session',
          component: () => import('@/views/settings/EditSession.vue'),
          meta: {
            breadcrumb: [
              { title: 'Home', url: '/' },
              { title: 'Settings'},
              { title: 'Edit Session', active: true }
            ],
            pageTitle: 'Edit Session'
          }
        },

      ]
    },
    // =============================================================================
    // FULL PAGE LAYOUTS
    // =============================================================================
    {
      path: '',
      component: () => import('@/layouts/full-page/FullPage.vue'),
      children: [
        // =============================================================================
        // PAGES
        // =============================================================================
        {
          path: '/login',
          name: 'page-login',
          component: () => import('@/views/pages/Login.vue')
        },
        {
          path: '/pages/error-404',
          name: 'page-error-404',
          component: () => import('@/views/pages/Error404.vue')
        }
      ]
    },
    // Redirect to 404 page, if no match found
    {
      path: '*',
      redirect: '/pages/error-404'
    }
  ]
})

router.afterEach(() => {
  // Remove initial loading
  const appLoading = document.getElementById('loading-bg')
})
router.beforeEach((to, from, next) => {
  if (localStorage.getItem('userInfo')) {
    if (to.name !== 'page-login') {
      next()
    } else {
      next({name : 'home'})
    }
  } else if (to.name !== 'page-login') {
    next({name : 'page-login'})
  } else {
    next()
  }
})

export default router
