import {FuseNavigation} from '@fuse/types';

export const navigation: FuseNavigation[] = [
    {
        id: 'main-actions',
        title: 'Main Actions',
        // translate: 'NAV.APPLICATIONS',
        type: 'group',
        icon: 'apps',
        children: [
            {
                id: 'employees-management',
                title: 'Employees Management',
                // translate: 'NAV.DASHBOARDS',
                type: 'collapsable',
                icon: 'supervisor_account',
                children: [
                    {
                        id: 'employee-list',
                        title: 'Employee List',
                        type: 'item',
                        url: '/apps/dashboards/analytics'
                    },
                    {
                        id: 'add-employee',
                        title: 'Add Employee / Enrolments',
                        type: 'item',
                        url: '/apps/dashboards/project'
                    }
                ]
            },
            {
                id: 'training-management',
                title: 'Training Management',
                // translate: 'NAV.CALENDAR',
                type: 'item',
                icon: 'watch_later',
                url: '/apps/calendar'
            },
            {
                id: 'access-control',
                title: 'Access Control',
                // translate: 'NAV.CALENDAR',
                type: 'item',
                icon: 'settings_applications',
                url: '/apps/calendar'
            }
        ]
    },
    {
        id: 'masters',
        title: 'Masters (Definitions)',
        // translate: 'NAV.APPLICATIONS',
        type: 'group',
        children: [
            {
                id: 'company-information',
                title: 'Company Information',
                // translate: 'NAV.DASHBOARDS',
                type: 'collapsable',
                icon: 'account_balance',
                children: [
                    {
                        id: 'work-location',
                        title: 'Work Locations',
                        type: 'item',
                        url: 'dashboard/work-locations'
                    },
                    {
                        id: 'structure',
                        title: 'Structure',
                        type: 'item',
                        url: '/apps/dashboards/analytics'
                    },
                    {
                        id: 'depratments',
                        title: 'Departments',
                        type: 'item',
                        url: '/apps/dashboards/analytics'
                    }
                ]
            },
            {
                id: 'job-info',
                title: 'Job Info',
                // translate: 'NAV.DASHBOARDS',
                type: 'collapsable',
                icon: 'work',
                children: [
                    {
                        id: 'designations',
                        title: 'Designations',
                        type: 'item',
                        url: '/apps/dashboards/analytics'
                    },
                    {
                        id: 'salary-scales',
                        title: 'Salary Scales',
                        type: 'item',
                        url: '/apps/dashboards/analytics'
                    },
                    {
                        id: 'grade-level',
                        title: 'Grade Level',
                        type: 'item',
                        url: '/apps/dashboards/analytics'
                    },
                    {
                        id: 'gl-step',
                        title: 'GL Step',
                        type: 'item',
                        url: '/apps/dashboards/analytics'
                    }
                ]
            },
            {
                id: 'qualifications',
                title: 'Qualifications',
                // translate: 'NAV.DASHBOARDS',
                type: 'collapsable',
                icon: 'school',
                children: [
                    {
                        id: 'qualification',
                        title: 'Qualification',
                        type: 'item',
                        url: 'dashboard/qualification'
                    },
                    {
                        id: 'skills',
                        title: 'Skills',
                        type: 'item',
                        url: 'dashboard/skills'
                    },
                    {
                        id: 'language',
                        title: 'Languages',
                        type: 'item',
                        url: '/apps/dashboards/analytics'
                    },
                    {
                        id: 'schedule',
                        title: 'Schedule',
                        type: 'item',
                        url: '/apps/dashboards/analytics'
                    },
                    {
                        id: 'academic-major',
                        title: 'Academic Major',
                        type: 'item',
                        url: '/apps/dashboards/analytics'
                    }
                ]
            },
        ]
    }
];
