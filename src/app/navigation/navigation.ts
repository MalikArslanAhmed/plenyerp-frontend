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
                roles: [AppConstants.ROLE_ID_HR],
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
                roles: [AppConstants.ROLE_ID_HR],
                // translate: 'NAV.CALENDAR',
                type: 'item',
                icon: 'watch_later',
                url: '/apps/calendar'
            },
            {
                id: 'access-control',
                title: 'Access Control',
                roles: [AppConstants.ROLE_ID_HR],
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
                id: 'comapnies',
                title: 'Companies',
                roles: [AppConstants.ROLE_ID_ADMIN],
                // translate: 'NAV.CALENDAR',
                type: 'item',
                icon: 'building',
                url: '/dashboard/companies'
            },
            {
                id: 'taxes',
                title: 'Taxes',
                roles: [AppConstants.ROLE_ID_ADMIN],
                // translate: 'NAV.CALENDAR',
                type: 'item',
                icon: 'money',
                url: '/dashboard/taxes'
            },
            {
                id: 'company-information',
                title: 'Company Information',
                // translate: 'NAV.DASHBOARDS',
                type: 'collapsable',
                icon: 'account_balance',
                roles: [AppConstants.ROLE_ID_HR],
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
                roles: [AppConstants.ROLE_ID_HR],
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
                roles: [AppConstants.ROLE_ID_HR],
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
                roles: [AppConstants.ROLE_ID_HR],
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
                roles: [AppConstants.ROLE_ID_HR],
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
                roles: [AppConstants.ROLE_ID_HR],
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
                roles: [AppConstants.ROLE_ID_HR],
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
            },
            {
                id: 'store-setup',
                title: 'Store Setup',
                roles: [AppConstants.ROLE_ID_INVENTORY],
                // translate: 'NAV.DASHBOARDS',
                type: 'collapsable',
                icon: 'store',
                children: [
                    {
                        id: 'items',
                        title: 'Items',
                        roles: [],
                        type: 'item',
                        url: 'dashboard/store-setup-items'
                    },
                    {
                        id: 'catergories',
                        title: 'Categories',
                        roles: [],
                        type: 'item',
                        url: 'dashboard/store-setup-categories'
                    },
                    {
                        id: 'stores',
                        title: 'Stores',
                        roles: [],
                        type: 'item',
                        url: 'dashboard/store-setup-stores'
                    },
                    {
                        id: 'unit-of-measures',
                        title: 'Unit of Measures',
                        roles: [],
                        type: 'item',
                        url: 'dashboard/store-setup-unit-of-measures'
                    }
                ]
            },
            {
                id: 'transaction',
                title: 'Transaction',
                roles: [AppConstants.ROLE_ID_INVENTORY],
                // translate: 'NAV.DASHBOARDS',
                type: 'collapsable',
                icon: 'insert_chart',
                children: [
                    {
                        id: 'srv-purchase-invoice',
                        title: 'SRV - Purchase Invocie',
                        roles: [],
                        type: 'item',
                        url: 'dashboard/transaction-srv-purchase-invoice'
                    },
                    {
                        id: 'srv-purchase-return',
                        title: 'SRV - Purchase Return',
                        roles: [],
                        type: 'item',
                        url: 'dashboard/transaction-srv-purchase-return'
                    },
                    {
                        id: 'sales-invoice',
                        title: 'Sales Invoice',
                        roles: [],
                        type: 'item',
                        url: 'dashboard/transaction-sales-invoice'
                    },
                    {
                        id: 'sales-return-by-customer',
                        title: 'Sales return by customer',
                        roles: [],
                        type: 'item',
                        url: 'dashboard/transaction-sales-return-by-customer'
                    },
                    {
                        id: 'stv-store-transfer',
                        title: 'STV - Store Transfer',
                        roles: [],
                        type: 'item',
                        url: 'dashboard/transaction-stv-store-transfer'
                    },
                    {
                        id: 'store-adjustment',
                        title: 'Store Adjustment',
                        roles: [],
                        type: 'item',
                        url: 'dashboard/transaction-store-adjustment'
                    },
                    {
                        id: 'donations',
                        title: 'Donations',
                        roles: [],
                        type: 'item',
                        url: 'dashboard/transaction-donations'
                    }
                ]
            },
            {
                id: 'report',
                title: 'Report',
                roles: [AppConstants.ROLE_ID_INVENTORY],
                // translate: 'NAV.DASHBOARDS',
                type: 'collapsable',
                icon: 'report',
                children: [
                    {
                        id: 'bin-card',
                        title: 'Bin Card',
                        roles: [],
                        type: 'item',
                        url: 'dashboard/report-bin-card'
                    },
                    {
                        id: 'inventory-ledger',
                        title: 'Inventory Ledger',
                        roles: [],
                        type: 'item',
                        url: 'dashboard/report-inventory-ledger'
                    },
                    {
                        id: 'quantity-balance',
                        title: 'Quantity Balance',
                        roles: [],
                        type: 'item',
                        url: 'dashboard/report-quantity-balance'
                    },
                    {
                        id: 'off-level',
                        title: 'Off Level',
                        roles: [],
                        type: 'item',
                        url: 'dashboard/report-off-level'
                    }
                ]
            }
        ]
    }
];
