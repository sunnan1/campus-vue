export default [
    {
        url: "/",
        name: "Dashboard",
        slug: "dashboard",
        icon: "HomeIcon",
    },
    {
        url: null,
        name: 'Administration',
        icon: 'HomeIcon',
        i18n: 'Administration',
        submenu: [
            {
                url: '/administration/schools-info',
                name: 'My Institute',
                slug: 'school-info',
                i18n: 'Schools'
            },
            {
                url: '/administration/campuses-info',
                name: 'Campuses',
                slug: 'campuses',
                i18n: 'Campuses'
            },
            {
                url: '/administration/departments-info',
                name: 'Departments',
                slug: 'departments',
                i18n: 'Departments'
            },
            {
                url: '/administration/subjects',
                name: 'Subjects',
                slug: 'subjects',
                i18n: 'Subjects'
            },
            {
                url: '/administration/classes',
                name: 'Classes',
                slug: 'classes',
                i18n: 'Classes'
            }
        ]
    },
    {
        url: null,
        name: 'Settings',
        icon: 'PlusCircleIcon',
        i18n: 'Settings',
        submenu: [
            {
                url: '/settings/sessions',
                name: 'Sessions',
                slug: 'sessions',
            },
            {
                url: '/settings/designations-info',
                name: 'Designations',
                slug: 'designation-info',
                i18n: 'Designations'
            },
            {
                url: '/settings/relationships-info',
                name: 'Relationships',
                slug: 'relationships-info',
                i18n: 'Relationships'
            },
            {
                url: '/settings/department-types',
                name: 'Department Types',
                slug: 'department-types',
                i18n: 'Department Types'
            },
            {
                url: '/settings/leave-type',
                name: 'Leave Types',
                slug: 'leave-type',
                i18n: 'Leave Types'
            },
            {
                url: '/settings/timeformats-info',
                name: 'Time Formats',
                slug: 'timeformats-info',
                i18n: 'Time Formats'
            },
            {
                url: '/settings/dateformats-info',
                name: 'Date Formats',
                slug: 'dateformats-info',
                i18n: 'Date Formats'
            },
            {
                url: '/settings/currencies-info',
                name: 'Currencies',
                slug: 'currencies-info',
                i18n: 'Currencies'
            },
            {
                url: '/settings/working-hours-info',
                name: 'Working Hours',
                slug: 'working-hours-info',
                i18n: 'Working Hours'
            },
            {
                url: '/settings/holidays-info',
                name: 'Holidays',
                slug: 'holidays-info',
                i18n: 'Holidays'
            },
            {
                url: '/settings/activity-types',
                name: 'Activity Types',
                slug: 'activity-types',
                i18n: 'Activity Types'
            },
            {
                url: '/settings/marking-values',
                name: 'Markings',
                slug: 'marking-values',
                i18n: 'Markings'
            },
            {
                url: '/settings/countries',
                name: 'Countries',
                slug: 'countries',
                i18n: 'Countries'
            },
        ]
    },
]
