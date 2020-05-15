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
                        url: 'dashboard/employees'
                    },
                    {
                        id: 'add-employee',
                        title: 'Add Employee / Enrolments',
                        type: 'item',
                        url: 'dashboard/add-employee'
                    }
                ]
            },
            {
                id: 'admin-segments',
                title: 'Charts of Accounts',
                // translate: 'NAV.CALENDAR',
                type: 'item',
                icon: 'watch_later',
                url: '/dashboard/admin-segments'
            },
            {
                id: 'managers',
                title: 'Managers',
                // translate: 'NAV.CALENDAR',
                type: 'item',
                icon: 'user',
                url: '/dashboard/managers'
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
                        url: 'dashboard/structure'
                    },
                    {
                        id: 'depratments',
                        title: 'Departments',
                        type: 'item',
                        url: 'dashboard/departments'
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
                        id: 'designation',
                        title: 'Designations',
                        type: 'item',
                        url: 'dashboard/designation'
                    },
                    {
                        id: 'salary-scales',
                        title: 'Salary Scales',
                        type: 'item',
                        url: 'dashboard/salary-scales'
                    },
                    {
                        id: 'grade-level',
                        title: 'Grade Level',
                        type: 'item',
                        url: 'dashboard/grade-level'
                    },
                    {
                        id: 'gl-step',
                        title: 'GL Step',
                        type: 'item',
                        url: 'dashboard/gl-step'
                    }
                ]
            },
            {
                id: 'contact-info',
                title: 'Contact Info',
                // translate: 'NAV.DASHBOARDS',
                type: 'collapsable',
                icon: 'assignment_ind',
                children: [
                    {
                        id: 'country',
                        title: 'Country',
                        type: 'item',
                        url: 'dashboard/country'
                    },
                    {
                        id: 'region',
                        title: 'Region',
                        type: 'item',
                        url: 'dashboard/region'
                    },
                    {
                        id: 'states',
                        title: 'States ',
                        type: 'item',
                        url: 'dashboard/states'
                    },
                    {
                        id: 'lga',
                        title: 'LGA',
                        type: 'item',
                        url: 'dashboard/lga'
                    }
                ]
            },
            {
                id: 'holiday',
                title: 'Holidays',
                // translate: 'NAV.DASHBOARDS',
                type: 'collapsable',
                icon: 'calendar_today',
                children: [
                    {
                        id: 'leaves-type',
                        title: 'Type of leaves',
                        type: 'item',
                        url: 'dashboard/leaves-type'
                    },
                    {
                        id: 'leave-group',
                        title: 'Leave Group',
                        type: 'item',
                        url: 'dashboard/leave-group'
                    },
                    {
                        id: 'public-holiday',
                        title: 'Public Holidays ',
                        type: 'item',
                        url: 'dashboard/public-holiday'
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
                        id: 'languages',
                        title: 'Languages',
                        type: 'item',
                        url: 'dashboard/languages'
                    },
                    {
                        id: 'schedule',
                        title: 'Schedule',
                        type: 'item',
                        url: 'dashboard/schedule'
                    },
                    {
                        id: 'academic-major',
                        title: 'Academic Major',
                        type: 'item',
                        url: 'dashboard/academic-major'
                    }
                ]
            },
            {
                id: 'extended-profile',
                title: 'Extended profile',
                // translate: 'NAV.DASHBOARDS',
                type: 'collapsable',
                icon: 'school',
                children: [
                    {
                        id: 'relationship',
                        title: 'Relationship',
                        type: 'item',
                        url: 'dashboard/relationship'
                    },
                    {
                        id: 'categories',
                        title: 'Categories',
                        type: 'item',
                        url: 'dashboard/categories'
                    },
                    {
                        id: 'status',
                        title: 'Status',
                        type: 'item',
                        url: 'dashboard/status'
                    },
                    {
                        id: 'disengagement',
                        title: 'Disengagement',
                        type: 'item',
                        url: 'dashboard/disengagement'
                    },
                    {
                        id: 'censures',
                        title: 'Censures',
                        type: 'item',
                        url: 'dashboard/censures'
                    },
                ]
            },
            {
                id: 'organizations',
                title: 'Organizations',
                // translate: 'NAV.DASHBOARDS',
                type: 'collapsable',
                icon: 'school',
                children: [
                    {
                        id: 'arm-of-service',
                        title: 'Arm Of Service',
                        type: 'item',
                        url: 'dashboard/arm-of-service'
                    },
                    {
                        id: 'membership',
                        title: 'Membership',
                        type: 'item',
                        url: 'dashboard/membership'
                    }
                ]
            }
        ]
    }
];
