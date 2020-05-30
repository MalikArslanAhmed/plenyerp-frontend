import {FuseNavigation} from '@fuse/types';
import {AppConstants} from '../shared/constants/app-constants';

export const navigation: FuseNavigation[] = [
    {
        id: 'main-actions',
        title: 'Main Actions',
        // translate: 'NAV.APPLICATIONS',
        type: 'group',
        icon: 'apps',
        roles: [],
        children: [
            {
                id: 'employees-management',
                title: 'Employees Management',
                roles: [],
                // translate: 'NAV.DASHBOARDS',
                type: 'collapsable',
                icon: 'supervisor_account',
                children: [
                    {
                        id: 'employee-list',
                        title: 'Employee List',
                        roles: [],
                        type: 'item',
                        url: 'dashboard/employees'
                    },
                    {
                        id: 'employee-action',
                        title: 'Add Employee / Enrolments',
                        roles: [],
                        type: 'item',
                        url: 'dashboard/employee-action'
                    }
                ]
            },
            {
                id: 'admin-segments',
                title: 'Charts of Accounts',
                roles: [AppConstants.ROLE_ID_ADMIN],
                // translate: 'NAV.CALENDAR',
                type: 'item',
                icon: 'watch_later',
                url: '/dashboard/admin-segments'
            },
            {
                id: 'managers',
                title: 'Managers',
                roles: [AppConstants.ROLE_ID_ADMIN],
                // translate: 'NAV.CALENDAR',
                type: 'item',
                icon: 'assignment_ind',
                url: '/dashboard/managers'
            },
            {
                id: 'training-management',
                title: 'Training Management',
                roles: [],
                // translate: 'NAV.CALENDAR',
                type: 'item',
                icon: 'watch_later',
                url: '/apps/calendar'
            },
            {
                id: 'access-control',
                title: 'Access Control',
                roles: [],
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
        roles: [],
        children: [
            {
                id: 'company-information',
                title: 'Company Information',
                // translate: 'NAV.DASHBOARDS',
                type: 'collapsable',
                icon: 'account_balance',
                roles: [],
                children: [
                    {
                        id: 'work-location',
                        title: 'Work Locations',
                        roles: [],
                        type: 'item',
                        url: 'dashboard/work-locations'
                    },
                    {
                        id: 'structure',
                        title: 'Structure',
                        roles: [],
                        type: 'item',
                        url: 'dashboard/structure'
                    },
                    {
                        id: 'depratments',
                        title: 'Departments',
                        roles: [],
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
                roles: [],
                children: [
                    {
                        id: 'designation',
                        title: 'Designations',
                        roles: [],
                        type: 'item',
                        url: 'dashboard/designation'
                    },
                    {
                        id: 'salary-scales',
                        title: 'Salary Scales',
                        roles: [],
                        type: 'item',
                        url: 'dashboard/salary-scales'
                    },
                    {
                        id: 'grade-level',
                        title: 'Grade Level',
                        roles: [],
                        type: 'item',
                        url: 'dashboard/grade-level'
                    },
                    {
                        id: 'gl-step',
                        title: 'GL Step',
                        roles: [],
                        type: 'item',
                        url: 'dashboard/gl-step'
                    }
                ]
            },
            {
                id: 'contact-info',
                title: 'Contact Info',
                roles: [],
                // translate: 'NAV.DASHBOARDS',
                type: 'collapsable',
                icon: 'perm_contact_calendar',
                children: [
                    {
                        id: 'country',
                        title: 'Country',
                        roles: [],
                        type: 'item',
                        url: 'dashboard/country'
                    },
                    {
                        id: 'region',
                        title: 'Region',
                        roles: [],
                        type: 'item',
                        url: 'dashboard/region'
                    },
                    {
                        id: 'states',
                        title: 'States ',
                        roles: [],
                        type: 'item',
                        url: 'dashboard/states'
                    },
                    {
                        id: 'lga',
                        title: 'LGA',
                        roles: [],
                        type: 'item',
                        url: 'dashboard/lga'
                    },
                    {
                        id: 'address-type',
                        title: 'Address Type',
                        roles: [],
                        type: 'item',
                        url: 'dashboard/address-type'
                    },
                    {
                        id: 'phone-type',
                        title: 'Phone Type',
                        roles: [],
                        type: 'item',
                        url: 'dashboard/phone-type'
                    }
                ]
            },
            {
                id: 'holiday',
                title: 'Holidays',
                roles: [],
                // translate: 'NAV.DASHBOARDS',
                type: 'collapsable',
                icon: 'calendar_today',
                children: [
                    {
                        id: 'leaves-type',
                        title: 'Type of leaves',
                        roles: [],
                        type: 'item',
                        url: 'dashboard/leaves-type'
                    },
                    {
                        id: 'leave-group',
                        title: 'Leave Group',
                        roles: [],
                        type: 'item',
                        url: 'dashboard/leave-group'
                    },
                    {
                        id: 'public-holiday',
                        title: 'Public Holidays ',
                        roles: [],
                        type: 'item',
                        url: 'dashboard/public-holiday'
                    }
                ]
            },
            {
                id: 'qualifications',
                title: 'Qualifications',
                roles: [],
                // translate: 'NAV.DASHBOARDS',
                type: 'collapsable',
                icon: 'school',
                children: [
                    {
                        id: 'qualification',
                        title: 'Qualification',
                        roles: [],
                        type: 'item',
                        url: 'dashboard/qualification'
                    },
                    {
                        id: 'skills',
                        title: 'Skills',
                        roles: [],
                        type: 'item',
                        url: 'dashboard/skills'
                    },
                    {
                        id: 'languages',
                        title: 'Languages',
                        roles: [],
                        type: 'item',
                        url: 'dashboard/languages'
                    },
                    {
                        id: 'schedule',
                        title: 'Schedule',
                        roles: [],
                        type: 'item',
                        url: 'dashboard/schedule'
                    },
                    {
                        id: 'academic-major',
                        title: 'Academic Major',
                        roles: [],
                        type: 'item',
                        url: 'dashboard/academic-major'
                    }
                ]
            },
            {
                id: 'extended-profile',
                title: 'Extended profile',
                roles: [],
                // translate: 'NAV.DASHBOARDS',
                type: 'collapsable',
                icon: 'person_pin',
                children: [
                    {
                        id: 'relationship',
                        title: 'Relationship',
                        roles: [],
                        type: 'item',
                        url: 'dashboard/relationship'
                    },
                    {
                        id: 'categories',
                        title: 'Categories',
                        roles: [],
                        type: 'item',
                        url: 'dashboard/categories'
                    },
                    {
                        id: 'status',
                        title: 'Status',
                        roles: [],
                        type: 'item',
                        url: 'dashboard/status'
                    },
                    {
                        id: 'disengagement',
                        title: 'Disengagement',
                        roles: [],
                        type: 'item',
                        url: 'dashboard/disengagement'
                    },
                    {
                        id: 'censures',
                        title: 'Censures',
                        roles: [],
                        type: 'item',
                        url: 'dashboard/censures'
                    },
                ]
            },
            {
                id: 'organizations',
                title: 'Organizations',
                roles: [],
                // translate: 'NAV.DASHBOARDS',
                type: 'collapsable',
                icon: 'business',
                children: [
                    {
                        id: 'arm-of-service',
                        title: 'Arm Of Service',
                        roles: [],
                        type: 'item',
                        url: 'dashboard/arm-of-service'
                    },
                    {
                        id: 'membership',
                        title: 'Membership',
                        roles: [],
                        type: 'item',
                        url: 'dashboard/membership'
                    }
                ]
            }
        ]
    }
];
