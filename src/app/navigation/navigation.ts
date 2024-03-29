import { FuseNavigation } from '@fuse/types';
import { RouteGuard } from 'app/shared/guards/route.guard';
import { AppConstants } from '../shared/constants/app-constants';
import { PermissionConstant } from '../shared/constants/permission-constant';

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
                permissions: [PermissionConstant.EMPLOYEE_LIST, PermissionConstant.EMPLOYEE_ENROLLMENT_LIST],
                children: [
                    {
                        id: 'employee-list',
                        title: 'Employee List',
                        roles: [],
                        type: 'item',
                        url: 'dashboard/employees',
                        permissions: [PermissionConstant.EMPLOYEE_LIST]
                    },
                    {
                        id: 'employee-action',
                        title: 'Add Employee / Enrolments',
                        roles: [],
                        type: 'item',
                        url: 'dashboard/employee-action',
                        permissions: [PermissionConstant.EMPLOYEE_ENROLLMENT_LIST]
                    }
                ]
            },
            {
                id: 'setup',
                title: 'Setup',
                roles: [],
                // translate: 'NAV.DASHBOARDS',
                type: 'collapsable',
                icon: 'supervisor_account',
                permissions: [PermissionConstant.BANKS, PermissionConstant.CURRENCIES],
                children: [
                    {
                        id: 'banks',
                        title: 'Banks',
                        roles: [],
                        type: 'item',
                        url: 'dashboard/banks',
                        permissions: [PermissionConstant.BANKS]
                    },
                    {
                        id: 'currencies',
                        title: 'Currencies',
                        roles: [],
                        type: 'item',
                        url: 'dashboard/currencies',
                        permissions: [PermissionConstant.CURRENCIES]
                    }
                ]
            },
            {
                id: 'admin-segments',
                title: 'Charts of Accounts',
                roles: [],
                // translate: 'NAV.CALENDAR',
                type: 'item',
                icon: 'watch_later',
                url: '/dashboard/admin-segments',
                permissions: [PermissionConstant.COA_LIST],
                canActivate: [RouteGuard]
            },
            {
                id: 'setting',
                title: 'Setting',
                roles: [],
                // translate: 'NAV.DASHBOARDS',
                type: 'collapsable',
                icon: 'supervisor_account',
                permissions: [PermissionConstant.COMPANIES_SETTING],
                children: [
                    {
                        id: '' +
                            'company-info',
                        title: 'Company Information',
                        roles: [],
                        type: 'item',
                        url: 'dashboard/company-info',
                        permissions: [PermissionConstant.SETTINGS_COMPANY_INFO_VIEW],
                    }
                ]
            },
            /*{
                id: 'training-management',
                title: 'Training Management',
                user-role: [AppConstants.ROLE_ID_HR],
                // translate: 'NAV.CALENDAR',
                type: 'item',
                icon: 'watch_later',
                url: '/apps/calendar'
            },
            {
                id: 'access-control',
                title: 'Access Control',
                user-role: [AppConstants.ROLE_ID_HR],
                // translate: 'NAV.CALENDAR',
                type: 'item',
                icon: 'settings_applications',
                url: '/apps/calendar'
            }*/
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
                roles: [],
                permissions: [PermissionConstant.COMPANIES],
                // translate: 'NAV.CALENDAR',
                type: 'item',
                icon: 'building',
                url: '/dashboard/companies'
            },
            {
                id: 'taxes',
                title: 'Taxes',
                roles: [],
                permissions: [PermissionConstant.TAXES_LIST],
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
                roles: [],
                permissions: [PermissionConstant.DEPARTMENT_LIST, PermissionConstant.WORK_LOCATION_LIST, PermissionConstant.STRUCTURE_LIST],
                children: [
                    {
                        id: 'work-location',
                        title: 'Work Locations',
                        roles: [],
                        type: 'item',
                        url: 'dashboard/work-locations',
                        permissions: [PermissionConstant.WORK_LOCATION_LIST],
                    },
                    {
                        id: 'structure',
                        title: 'Structure',
                        roles: [],
                        type: 'item',
                        url: 'dashboard/structure',
                        permissions: [PermissionConstant.STRUCTURE_LIST],
                    },
                    {
                        id: 'depratments',
                        title: 'Departments',
                        roles: [],
                        type: 'item',
                        url: 'dashboard/departments',
                        permissions: [PermissionConstant.DEPARTMENT_LIST],
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
                permissions: [PermissionConstant.GL_STEP_LIST, PermissionConstant.GRADE_LEVEL_LIST, PermissionConstant.DESIGNATION_LIST, PermissionConstant.SALARYSCALES_LIST],
                children: [
                    {
                        id: 'designation',
                        title: 'Designations',
                        roles: [],
                        type: 'item',
                        url: 'dashboard/designation',
                        permissions: [PermissionConstant.DESIGNATION_LIST],
                    },
                    {
                        id: 'salary-scales',
                        title: 'Salary Scales',
                        roles: [],
                        type: 'item',
                        url: 'dashboard/salary-scales',
                        permissions: [PermissionConstant.SALARYSCALES_LIST],
                    },
                    {
                        id: 'grade-level',
                        title: 'Grade Level',
                        roles: [],
                        type: 'item',
                        url: 'dashboard/grade-level',
                        permissions: [PermissionConstant.GRADE_LEVEL_LIST],
                    },
                    {
                        id: 'gl-step',
                        title: 'GL Step',
                        roles: [],
                        type: 'item',
                        url: 'dashboard/gl-step',
                        permissions: [PermissionConstant.GL_STEP_LIST]
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
                permissions: [PermissionConstant.TYPES_OF_PHONE_NUM_LIST, PermissionConstant.ADDRESS_LIST, PermissionConstant.LGA_LIST, PermissionConstant.STATES_LIST, PermissionConstant.REGION_LIST, PermissionConstant.COUNTRIES_LIST],
                children: [
                    {
                        id: 'country',
                        title: 'Country',
                        roles: [],
                        type: 'item',
                        url: 'dashboard/country',
                        permissions: [PermissionConstant.COUNTRIES_LIST, PermissionConstant.COUNTRIES]
                    },
                    {
                        id: 'region',
                        title: 'Region',
                        roles: [],
                        type: 'item',
                        url: 'dashboard/region',
                        permissions: [PermissionConstant.REGION_LIST]
                    },
                    {
                        id: 'states',
                        title: 'States ',
                        roles: [],
                        type: 'item',
                        url: 'dashboard/states',
                        permissions: [PermissionConstant.STATES_LIST]
                    },
                    {
                        id: 'lga',
                        title: 'LGA',
                        roles: [],
                        type: 'item',
                        url: 'dashboard/lga',
                        permissions: [PermissionConstant.LGA_LIST]
                    },
                    {
                        id: 'address-type',
                        title: 'Address Type',
                        roles: [],
                        type: 'item',
                        url: 'dashboard/address-type',
                        permissions: [PermissionConstant.ADDRESS_LIST],
                    },
                    {
                        id: 'phone-type',
                        title: 'Phone Type',
                        roles: [],
                        type: 'item',
                        url: 'dashboard/phone-type',
                        permissions: [PermissionConstant.TYPES_OF_PHONE_NUM_LIST],
                    }
                ]
            },
            {
                id: 'holiday',
                title: 'Leave',
                roles: [AppConstants.ROLE_ID_HR],
                // translate: 'NAV.DASHBOARDS',
                type: 'collapsable',
                icon: 'calendar_today',
                // permissions: [PermissionConstant.PUBLIC_HOLIDAYS_LIST, PermissionConstant.LEAVE_GROUP_LIST, PermissionConstant.TYPES_OF_LEAVES_LIST],
                children: [
                    {
                        id: 'leaves-type',
                        title: 'Types of leave',
                        roles: [],
                        type: 'item',
                        url: 'dashboard/leaves-type',
                        permissions: [PermissionConstant.TYPES_OF_LEAVES_LIST]
                    },
                    {
                        id: 'leave-group',
                        title: 'Leave Group',
                        roles: [],
                        type: 'item',
                        url: 'dashboard/leave-group',
                        permissions: [PermissionConstant.LEAVE_GROUP_LIST]
                    },
                    {
                        id: 'leave-year',
                        title: 'Leave years',
                        roles: [],
                        type: 'item',
                        url: 'dashboard/leave-year',
                        permissions: [PermissionConstant.LEAVE_YEAR_LIST]
                    },
                    {
                        id: 'leave-credit',
                        title: 'Leave Credits',
                        roles: [],
                        type: 'item',
                        url: 'dashboard/leave-credit',
                        permissions: [PermissionConstant.LEAVE_CREDIT_LIST]
                    },
                    {
                        id: 'leave-requests',
                        title: 'Leave Requests',
                        roles: [],
                        type: 'item',
                        url: 'dashboard/leave-request',
                        permissions: [PermissionConstant.LEAVE_REQUESTS_LIST]
                    },
                    {
                        id: 'hod-leave-request-approved',
                        title: 'HOD Leave Requests Approval',
                        roles: [],
                        type: 'item',
                        url: 'dashboard/hod-leave-request-approved',
                        permissions: [PermissionConstant.HOD_LEAVE_REQUEST_APPROVED_LIST]
                    },
                    {
                        id: 'hr-leave-request-approved',
                        title: 'HR Leave Requests Approval',
                        roles: [],
                        type: 'item',
                        url: 'dashboard/hr-leave-request-approved',
                        permissions: [PermissionConstant.HR_LEAVE_REQUEST_APPROVED_LIST]
                    },
                    // {
                    //     id: 'leave-requests-closed',
                    //     title: 'Leave Requests Closed',
                    //     roles: [],
                    //     type: 'item',
                    //     url: 'dashboard/leave-request-closed',
                    //     permissions: [PermissionConstant.LEAVE_REQUESTS_CLOSED_LIST]
                    // },
                    {
                        id: 'hod-leave-request-closed-approved',
                        title: 'HOD Leave Requests Closed Approval',
                        roles: [],
                        type: 'item',
                        url: 'dashboard/hod-leave-request-closed-approved',
                        permissions: [PermissionConstant.HOD_LEAVE_REQUEST_CLOSED_APPROVED_LIST]
                    },
                    {
                        id: 'hr-leave-request-closed-approved',
                        title: 'HR Leave Requests Closed Approval',
                        roles: [],
                        type: 'item',
                        url: 'dashboard/hr-leave-request-closed-approved',
                        permissions: [PermissionConstant.HR_LEAVE_REQUEST_CLOSED_APPROVED_LIST]
                    },
                    {
                        id: 'public-holiday',
                        title: 'Public Holidays ',
                        roles: [],
                        type: 'item',
                        url: 'dashboard/public-holiday',
                        permissions: [PermissionConstant.PUBLIC_HOLIDAYS_LIST],
                    }
                ]
            },
            {
                id: 'leave-reports',
                title: 'Leave Reports',
                roles: [AppConstants.ROLE_ID_HR],
                // translate: 'NAV.DASHBOARDS',
                type: 'collapsable',
                icon: 'calendar_today',
                permissions: [PermissionConstant.LEAVE_BALANCE_LIST, PermissionConstant.LEAVE_SCHEDULE_LIST,PermissionConstant.LEAVE_REQUEST_REPORT_LIST,PermissionConstant.LEAVE_ON_LIST],
                children: [
                    {
                        id: 'leave-balance',
                        title: 'Leave Balance',
                        roles: [],
                        type: 'item',
                        url: 'dashboard/leave-report/leave-balance',
                        permissions: [PermissionConstant.LEAVE_BALANCE_LIST]
                    },
                    {
                        id: 'leave-schedule',
                        title: 'Leave Schedule',
                        roles: [],
                        type: 'item',
                        url: 'dashboard/leave-report/leave-schedule',
                        permissions: [PermissionConstant.LEAVE_SCHEDULE_LIST]
                    },
                    {
                        id: 'leave-request',
                        title: 'Leave Request',
                        roles: [],
                        type: 'item',
                        url: 'dashboard/leave-report/leave-request',
                        permissions: [PermissionConstant.LEAVE_REQUEST_REPORT_LIST]
                    },
                    {
                        id: 'leave-on',
                        title: 'Leave On',
                        roles: [],
                        type: 'item',
                        url: 'dashboard/leave-report/leave-on',
                        permissions: [PermissionConstant.LEAVE_ON_LIST]
                    },
                ]
            },
            {
                id: 'information',
                title: 'Hr Information',
                roles: [AppConstants.ROLE_ID_HR],
                // translate: 'NAV.DASHBOARDS',
                type: 'collapsable',
                icon: 'calendar_today',
                permissions: [PermissionConstant.INFORMATION_LIST],
                children: [
                    {
                        id: 'info',
                        title: 'Information',
                        roles: [],
                        type: 'item',
                        url: 'dashboard/hr-information',
                        permissions: [PermissionConstant.INFORMATION_LIST]
                    },
                ]
            },
            {
                id: 'qualifications',
                title: 'Qualifications',
                roles: [AppConstants.ROLE_ID_HR],
                // translate: 'NAV.DASHBOARDS',
                type: 'collapsable',
                icon: 'school',
                permissions: [PermissionConstant.ACADEMIC_MAJORS_LIST, PermissionConstant.SCHEDULE_LIST, PermissionConstant.LANGUAGES_LIST, PermissionConstant.JOB_SKILLS_LIST, PermissionConstant.QUALIFICATION_LIST],
                children: [
                    {
                        id: 'qualification',
                        title: 'Qualification',
                        roles: [],
                        type: 'item',
                        url: 'dashboard/qualification',
                        permissions: [PermissionConstant.QUALIFICATION_LIST],
                    },
                    {
                        id: 'skills',
                        title: 'Skills',
                        roles: [],
                        type: 'item',
                        url: 'dashboard/skills',
                        permissions: [PermissionConstant.JOB_SKILLS_LIST],
                    },
                    {
                        id: 'languages',
                        title: 'Languages',
                        roles: [],
                        type: 'item',
                        url: 'dashboard/languages',
                        permissions: [PermissionConstant.LANGUAGES_LIST],
                    },
                    {
                        id: 'schedule',
                        title: 'Schedule',
                        roles: [],
                        type: 'item',
                        url: 'dashboard/schedule',
                        permissions: [PermissionConstant.SCHEDULE_LIST]
                    },
                    {
                        id: 'academic-major',
                        title: 'Academic Major',
                        roles: [],
                        type: 'item',
                        url: 'dashboard/academic-major',
                        permissions: [PermissionConstant.ACADEMIC_MAJORS_LIST],
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
                permissions: [PermissionConstant.CENSURES_LIST, PermissionConstant.DISENGAGEMENT_LIST, PermissionConstant.STAFF_STATUS_LIST, PermissionConstant.RELATIONS_LIST, PermissionConstant.STAFF_CATEGORIES_LIST],
                children: [
                    {
                        id: 'relationship',
                        title: 'Relationship',
                        roles: [],
                        type: 'item',
                        url: 'dashboard/relationship',
                        permissions: [PermissionConstant.RELATIONS_LIST],
                    },
                    {
                        id: 'categories',
                        title: 'Categories',
                        roles: [],
                        type: 'item',
                        url: 'dashboard/categories',
                        permissions: [PermissionConstant.STAFF_CATEGORIES_LIST],

                    },
                    {
                        id: 'status',
                        title: 'Status',
                        roles: [],
                        type: 'item',
                        url: 'dashboard/status',
                        permissions: [PermissionConstant.STAFF_STATUS_LIST],
                    },
                    {
                        id: 'disengagement',
                        title: 'Disengagement',
                        roles: [],
                        type: 'item',
                        url: 'dashboard/disengagement',
                        permissions: [PermissionConstant.DISENGAGEMENT_LIST]
                    },
                    {
                        id: 'censures',
                        title: 'Censures',
                        roles: [],
                        type: 'item',
                        url: 'dashboard/censures',
                        permissions: [PermissionConstant.CENSURES_LIST],
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
                permissions: [PermissionConstant.ARM_OF_SERVICE_LIST, PermissionConstant.MEMBERSHIP_LIST],
                children: [
                    {
                        id: 'arm-of-service',
                        title: 'Arm Of Service',
                        roles: [],
                        type: 'item',
                        url: 'dashboard/arm-of-service',
                        permissions: [PermissionConstant.ARM_OF_SERVICE_LIST],
                    },
                    {
                        id: 'membership',
                        title: 'Membership',
                        roles: [],
                        type: 'item',
                        url: 'dashboard/membership',
                        permissions: [PermissionConstant.MEMBERSHIP_LIST],
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
                permissions: [PermissionConstant.STORE_SETUP_ITEMS_LIST, PermissionConstant.STORE_SETUP_CATEGORIES_LIST, PermissionConstant.STORE_SETUP_STORES_LIST, PermissionConstant.STORE_SETUP_UNIT_OF_MEASURES_LIST],
                children: [
                    {
                        id: 'items',
                        title: 'Items',
                        roles: [],
                        type: 'item',
                        url: 'dashboard/store-setup-items',
                        permissions: [PermissionConstant.STORE_SETUP_ITEMS_LIST],
                    },
                    {
                        id: 'catergories',
                        title: 'Categories',
                        roles: [],
                        type: 'item',
                        url: 'dashboard/store-setup-categories',
                        permissions: [PermissionConstant.STORE_SETUP_CATEGORIES_LIST]
                    },
                    {
                        id: 'stores',
                        title: 'Stores',
                        roles: [],
                        type: 'item',
                        url: 'dashboard/store-setup-stores',
                        permissions: [PermissionConstant.STORE_SETUP_STORES_LIST]
                    },
                    {
                        id: 'unit-of-measures',
                        title: 'Unit of Measures',
                        roles: [],
                        type: 'item',
                        url: 'dashboard/store-setup-unit-of-measures',
                        permissions: [PermissionConstant.STORE_SETUP_UNIT_OF_MEASURES_LIST]
                    }
                ]
            },
            {
                id: 'transaction',
                title: 'Transaction',
                roles: [],
                // translate: 'NAV.DASHBOARDS',
                type: 'collapsable',
                icon: 'insert_chart',
                permissions: [PermissionConstant.SRV_PURCHASE_INVOICE_LIST, PermissionConstant.SRV_PURCHASE_RETURN_LIST, PermissionConstant.SALES_INVOICE_LIST, PermissionConstant.SALES_RETURN_BY_CUSTOMER_LIST, PermissionConstant.STV_STORE_TRANSFER_LIST, PermissionConstant.STORE_ADJUSTMENT_LIST, PermissionConstant.DONATION_LIST],
                children: [
                    {
                        id: 'srv-purchase-invoice',
                        title: 'SRV - Purchase Invocie',
                        roles: [],
                        type: 'item',
                        url: 'dashboard/transaction-srv-purchase-invoice',
                        permissions: [PermissionConstant.SRV_PURCHASE_INVOICE_LIST]
                    },
                    {
                        id: 'srv-purchase-return',
                        title: 'SRV - Purchase Return',
                        roles: [],
                        type: 'item',
                        url: 'dashboard/transaction-srv-purchase-return',
                        permissions: [PermissionConstant.SRV_PURCHASE_RETURN_LIST]
                    },
                    {
                        id: 'sales-invoice',
                        title: 'Sales Invoice',
                        roles: [],
                        type: 'item',
                        url: 'dashboard/transaction-sales-invoice',
                        permissions: [PermissionConstant.SALES_INVOICE_LIST]
                    },
                    {
                        id: 'sales-return-by-customer',
                        title: 'Sales return by customer',
                        roles: [],
                        type: 'item',
                        url: 'dashboard/transaction-sales-return-by-customer',
                        permissions: [PermissionConstant.SALES_RETURN_BY_CUSTOMER_LIST]
                    },
                    {
                        id: 'stv-store-transfer',
                        title: 'STV - Store Transfer',
                        roles: [],
                        type: 'item',
                        url: 'dashboard/transaction-stv-store-transfer',
                        permissions: [PermissionConstant.STV_STORE_TRANSFER_LIST]
                    },
                    {
                        id: 'store-adjustment',
                        title: 'Store Adjustment',
                        roles: [],
                        type: 'item',
                        url: 'dashboard/transaction-store-adjustment',
                        permissions: [PermissionConstant.STORE_ADJUSTMENT_LIST]
                    },
                    {
                        id: 'donations',
                        title: 'Donations',
                        roles: [],
                        type: 'item',
                        url: 'dashboard/transaction-donations',
                        permissions: [PermissionConstant.DONATION_LIST]
                    }
                ]
            },
            {
                id: 'report',
                title: 'Report - Inventory',
                roles: [AppConstants.ROLE_ID_INVENTORY],
                // translate: 'NAV.DASHBOARDS',
                type: 'collapsable',
                icon: 'report',
                permissions: [PermissionConstant.BIN_CARD_LIST, PermissionConstant.INVENTORY_LEDGER_LIST, PermissionConstant.QUALITY_BALANCE_LIST, PermissionConstant.OFF_LEVEL_LIST],
                children: [
                    {
                        id: 'bin-card',
                        title: 'Bin Card',
                        roles: [],
                        type: 'item',
                        url: 'dashboard/report-bin-card',
                        permissions: [PermissionConstant.BIN_CARD_LIST]
                    },
                    {
                        id: 'inventory-ledger',
                        title: 'Inventory Ledger',
                        roles: [],
                        type: 'item',
                        url: 'dashboard/report-inventory-ledger',
                        permissions: [PermissionConstant.INVENTORY_LEDGER_LIST]
                    },
                    {
                        id: 'quantity-balance',
                        title: 'Quantity Balance',
                        roles: [],
                        type: 'item',
                        url: 'dashboard/report-quantity-balance',
                        permissions: [PermissionConstant.QUALITY_BALANCE_LIST]
                    },
                    {
                        id: 'off-level',
                        title: 'Off Level',
                        roles: [],
                        type: 'item',
                        url: 'dashboard/report-off-level',
                        permissions: [PermissionConstant.OFF_LEVEL_LIST]
                    }
                ]
            },
            {
                id: 'configurations',
                title: 'Access Control',
                roles: [],
                // translate: 'NAV.DASHBOARDS',
                type: 'collapsable',
                icon: 'admin_panel_settings',
                permissions: [PermissionConstant.ROLES_LIST, PermissionConstant.USERS_ACCOUNTS],
                children: [
                    {
                        id: 'user-role',
                        title: 'Roles',
                        roles: [],
                        type: 'item',
                        url: 'dashboard/user-role',
                        permissions: [PermissionConstant.ROLES_LIST],
                    },
                    {
                        id: 'managers',
                        title: 'Users',
                        roles: [],
                        // translate: 'NAV.CALENDAR',
                        type: 'item',
                        url: '/dashboard/managers',
                        permissions: [PermissionConstant.USERS_ACCOUNTS]
                    },
                ]
            },
            {
                id: 'budget-control-economic',
                title: 'Budget Control Economic',
                roles: [],
                // translate: 'NAV.CALENDAR',
                type: 'item',
                icon: 'monetization_on',
                url: '/dashboard/budget-control/economic',
                permissions: [PermissionConstant.ECONOMIC_BUDGET_CONTROL_LIST]
            },
            {
                id: 'budget-control-programme',
                title: 'Budget Control Programme',
                roles: [],
                // translate: 'NAV.CALENDAR',
                type: 'item',
                icon: 'monetization_on',
                url: '/dashboard/budget-control/programme',
                permissions: [PermissionConstant.PROGRAMME_BUDGET_CONTROL_LIST]
            },
            {
                id: 'budget-control-aie',
                title: 'Budget Control AIE',
                roles: [],
                // translate: 'NAV.CALENDAR',
                type: 'item',
                icon: 'monetization_on',
                url: '/dashboard/budget-controls/AIE',
                // permissions: []
                permissions: [PermissionConstant.BUDGET_CONTROL_AIE_SEARCH]
            },
            {
                id: 'report',
                title: 'Report - Financials',
                roles: [],
                // translate: 'NAV.DASHBOARDS',
                type: 'collapsable',
                icon: 'report',
                permissions: [PermissionConstant.JV_LEDGER_LIST, PermissionConstant.TRAIL_BALANCE_LIST, PermissionConstant.NOTES_MASTER_LIST],
                children: [
                    {
                        id: 'trial-balance',
                        title: 'Trial Balance',
                        roles: [],
                        type: 'item',
                        url: 'dashboard/trial-balance',
                        permissions: [PermissionConstant.REPORTS_FINANCE_TRIAL_BALANCE_VIEW_REPORT]
                    },
                    /*{
                        id: 'others',
                        title: 'Others',
                        roles: [],
                        type: 'item',
                        url: 'dashboard/others',
                        permissions: [PermissionConstant.TRAIL_BALANCE_LIST]
                    },*/
                    {
                        id: 'notes-master',
                        title: 'Notes Master',
                        roles: [],
                        type: 'item',
                        url: 'dashboard/notes-master',
                        permissions: [PermissionConstant.REPORTS_FINANCE_NOTES_MASTER_VIEW_REPORT]
                    },
                    {
                        id: 'jv-ledger-report',
                        title: 'Journal Voucher(JV) Ledger',
                        roles: [],
                        type: 'item',
                        url: 'dashboard/jv-ledger-report',
                        permissions: [PermissionConstant.REPORTS_FINANCE_JV_LEDGER_VIEW_REPORT]
                    },
                    {
                        id: 'jv-ledger-sibling',
                        title: 'JV Ledger Sibling',
                        roles: [],
                        type: 'item',
                        url: 'dashboard/jv-ledger-sibling',
                        permissions: [PermissionConstant.REPORTS_FINANCE_JV_LEDGER_SIBLING_VIEW_REPORT]
                    },
                    {
                        id: 'statement-of-position',
                        title: 'Statement of Position Report',
                        roles: [],
                        type: 'item',
                        url: 'dashboard/statement-of-position',
                        permissions: [PermissionConstant.REPORTS_JV_LEDGER_REPORT_STATEMENT_OF_POSTION]
                    },
                    {
                        id: 'financial-performance',
                        title: 'Financial Performance',
                        roles: [],
                        type: 'item',
                        url: 'dashboard/financial-performance',
                        permissions: [PermissionConstant.REPORTS_JV_LEDGER_REPORT_FINANCIAL_PERFORMANCE]
                    },
                    {
                        id: 'monthly-activity',
                        title: 'Monthly Activity',
                        roles: [],
                        type: 'item',
                        url: 'dashboard/monthly-activity',
                        permissions: [PermissionConstant.REPORTS_JV_LEDGER_MONTHLY_ACTIVITY]
                    },
                    {
                        id: 'ifr-notes-master',
                        title: 'IFR Notes Master',
                        roles: [],
                        type: 'item',
                        url: 'dashboard/ifr-notes-master',
                        permissions: [PermissionConstant.REPORTS_FINANCE_IFR_NOTES_MASTER]
                    },
                    {
                        id: 'ifr-reports',
                        title: 'Application of Fund Report',
                        roles: [],
                        type: 'item',
                        url: 'dashboard/application-fund-report',
                        permissions: []
                    },
                    {
                        id: 'source-uses-fund',
                        title: 'Sources & Uses of Fund Stmt.',
                        roles: [],
                        type: 'item',
                        url: 'dashboard/source-uses-fund',
                        permissions: []
                    },
                    {
                        id: 'special-account-activity',
                        title: 'Special Account Activity Stmt.',
                        roles: [],
                        type: 'item',
                        url: 'dashboard/special-account-activity',
                        permissions: []
                    }
                ]
            },
            {
                id: 'vouchers',
                title: 'Vouchers',
                roles: [],
                type: 'collapsable',
                icon: 'money',
                permissions: [PermissionConstant.LIST_GL_JV],
                children: [
                    {
                        id: 'journal-voucher',
                        title: 'Journal Voucher',
                        roles: [],
                        type: 'item',
                        url: 'dashboard/journal-voucher',
                        permissions: [PermissionConstant.LIST_GL_JV]
                    },
                    {
                        id: 'payment-voucher',
                        title: 'Payment Voucher',
                        roles: [],
                        // translate: 'NAV.CALENDAR',
                        type: 'item',
                        url: '/dashboard/payment-voucher',
                        permissions: [PermissionConstant.PV_VOUCHER_DETAILS_LIST]
                    },
                    {
                        id: 'receipt-voucher',
                        title: 'Receipt Voucher',
                        roles: [],
                        // translate: 'NAV.CALENDAR',
                        type: 'item',
                        url: '/dashboard/receipt-voucher',
                        permissions: [PermissionConstant.RV_LIST]
                    },
                    {
                        id: 'retire-vouchers',
                        title: 'Retire Vouchers',
                        roles: [],
                        // translate: 'NAV.CALENDAR',
                        type: 'item',
                        url: '/dashboard/retire-vouchers',
                        permissions: [PermissionConstant.PV_VOUCHER_DETAILS_LIST]
                    },
                    {
                        id: 'payment-approval',
                        title: 'Payment Approval',
                        roles: [],
                        // translate: 'NAV.CALENDAR',
                        type: 'item',
                        url: '/dashboard/payment-approval',
                        permissions: [PermissionConstant.PAYMENT_APPROVAL_LIST]
                    },
                    {
                        id: 'previous-year-advances',
                        title: 'Previous Year Advances',
                        roles: [],
                        // translate: 'NAV.CALENDAR',
                        type: 'item',
                        url: '/dashboard/previous-year-advance',
                        permissions: [PermissionConstant.PYA_LIST]
                    },
                ]
            },
            {
                id: 'voucher-source-unit',
                title: 'Voucher Source Unit',
                roles: [],
                // translate: 'NAV.CALENDAR',
                type: 'item',
                icon: 'local_offer',
                url: '/dashboard/voucher-source-unit',
                permissions: [PermissionConstant.VSU_LIST]
            },
            {
                id: 'cashbook',
                title: 'Cashbook',
                roles: [],
                // translate: 'NAV.CALENDAR',
                type: 'item',
                icon: 'payment',
                url: '/dashboard/cashbook-account',
                permissions: [PermissionConstant.CASHBOOK_LIST]
            },
            {
                id: 'om-mandate',
                title: 'Mandate',
                roles: [],
                // translate: 'NAV.CALENDAR',
                type: 'item',
                icon: 'payment',
                url: '/dashboard/on-mandate',
                permissions: [PermissionConstant.MANDATE_LIST]
            },
            {
                id: 'default-setting',
                title: 'Default Setting (Voucher Info)',
                roles: [],
                // translate: 'NAV.CALENDAR',
                type: 'item',
                icon: 'admin_panel_settings',
                url: '/dashboard/default-setting-voucher-info',
                permissions: [PermissionConstant.DEFAULT_SETTINGS_EDIT]
            },
            {
                id: 'payment-report',
                title: 'Reports - Treasury',
                roles: [],
                // translate: 'NAV.DASHBOARDS',
                type: 'collapsable',
                icon: 'report',
                permissions: [],
                children: [
                    {
                        id: 'pv-reports',
                        title: 'PV List',
                        roles: [],
                        type: 'item',
                        url: 'dashboard/pv-list',
                        permissions: [PermissionConstant.REPORTS_TREASURY_PV_VIEW_REPORTS]
                    },
                    {
                        id: 'rv-reports',
                        title: 'RV List',
                        roles: [],
                        type: 'item',
                        url: 'dashboard/rv-list',
                        permissions: [PermissionConstant.REPORTS_TREASURY_RV_VIEW_REPORTS]
                    },
                    {
                        id: 'summary-non-personal-advances',
                        title: 'Summary Non Personal Advances',
                        roles: [],
                        type: 'item',
                        url: 'dashboard/summary-non-personal-advances',
                        permissions: [
                            PermissionConstant.REPORTS_TREASURY_SUMMARY_NON_PERSONAL_ADVANCES_VIEW_DEPARTMENT_REPORT,
                            PermissionConstant.REPORTS_TREASURY_SUMMARY_NON_PERSONAL_ADVANCES_VIEW_EMPLOYEE_REPORT
                        ]
                    },
                    {
                        id: 'summary-personal-advances',
                        title: 'Summary Personal Advances',
                        roles: [],
                        type: 'item',
                        url: 'dashboard/summary-personal-advances',
                        permissions: [
                            PermissionConstant.REPORTS_TREASURY_SUMMARY_PERSONAL_ADVANCES_VIEW_DEPARTMENT_REPORT,
                            PermissionConstant.REPORTS_TREASURY_SUMMARY_PERSONAL_ADVANCES_VIEW_EMPLOYEE_REPORT
                        ]
                    },
                    {
                        id: 'summary-standing-imprest',
                        title: 'Summary Standing Imprest',
                        roles: [],
                        type: 'item',
                        url: 'dashboard/summary-standing-imprest',
                        permissions: [
                            PermissionConstant.REPORTS_TREASURY_SUMMARY_STANDING_IMPREST_VIEW_DEPARTMENT_REPORT,
                            PermissionConstant.REPORTS_TREASURY_SUMMARY_STANDING_IMPREST_VIEW_EMPLOYEE_REPORT
                        ]
                    },
                    {
                        id: 'summary-special-imprest',
                        title: 'Summary Special Imprest',
                        roles: [],
                        type: 'item',
                        url: 'dashboard/summary-special-imprest',
                        permissions: [
                            PermissionConstant.REPORTS_TREASURY_SUMMARY_SPECIAL_IMPREST_VIEW_DEPARTMENT_REPORT,
                            PermissionConstant.REPORTS_TREASURY_SUMMARY_SPECIAL_IMPREST_VIEW_EMPLOYEE_REPORT
                        ]
                    },
                    {
                        id: 'advances-ledger-by-employee',
                        title: 'Summary Advances Ledger (By Employee)',
                        roles: [],
                        type: 'item',
                        url: 'dashboard/advances-ledger-by-employee',
                        permissions: [
                            PermissionConstant.REPORTS_TREASURY_SUMMARY_ADVANCE_LEDGER_VIEW_REPORT
                        ]
                    }
                ]
            },
            {
                id: 'fixed-assets',
                title: 'Fixed Asset - Setup',
                roles: [],
                // translate: 'NAV.DASHBOARDS',
                type: 'collapsable',
                icon: 'report',
                permissions: [],
                children: [
                    {
                        id: 'categories',
                        title: 'Categories',
                        roles: [],
                        type: 'item',
                        url: 'fixed-assets/fixed-assets-categories',
                        permissions: [PermissionConstant.REPORTS_TREASURY_PV_VIEW_REPORTS]
                    },
                    {
                        id: 'fixed-assets',
                        title: 'Fixed Assets',
                        roles: [],
                        type: 'item',
                        url: 'fixed-assets/list',
                        permissions: [PermissionConstant.REPORTS_TREASURY_RV_VIEW_REPORTS]
                    }
                ]
            },
            {
                id: 'fixed-assets',
                title: 'Fixed Asset - Processing',
                roles: [],
                type: 'collapsable',
                icon: 'report',
                permissions: [],
                children: [
                    {
                        id: 'deployment',
                        title: 'Deployment',
                        roles: [],
                        type: 'item',
                        url: 'fixed-assets/deployments',
                        permissions: [PermissionConstant.REPORTS_TREASURY_PV_VIEW_REPORTS]
                    },
                    {
                        id: 'deprecation',
                        title: 'Deprecation',
                        roles: [],
                        type: 'item',
                        url: 'fixed-assets/deprecation',
                        permissions: [PermissionConstant.REPORTS_TREASURY_PV_VIEW_REPORTS]
                    },
                ]
            },
                        {
                id: 'fixed-assets-reports',
                title: 'Fixed Asset - Reports',
                roles: [],
                type: 'collapsable',
                icon: 'report',
                permissions: [],
                children: [
                    {
                        id: 'register-of-assets',
                        title: 'Fixed Assets Report',
                        roles: [],
                        type: 'item',
                        url: 'fixed-assets/report',
                        permissions: [PermissionConstant.REPORTS_TREASURY_PV_VIEW_REPORTS]
                    },
                    {
                        id: 'deprecation-report',
                        title: 'Depreciation Report',
                        roles: [],
                        type: 'item',
                        url: 'fixed-assets/depreciation-report',
                        permissions: [PermissionConstant.REPORTS_TREASURY_PV_VIEW_REPORTS]
                    },
                ]
            }
        ]
    }
];
