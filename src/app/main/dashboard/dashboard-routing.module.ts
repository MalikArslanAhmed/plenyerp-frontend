import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { QualificationComponent } from './qualification/qualification.component';
import { SkillsComponent } from './skills/skills.component';
import { WorkLocationsComponent } from './work-locations/work-locations.component';
import { LanguagesComponent } from './languages/languages.component';
import { ScheduleComponent } from './schedule/schedule.component';
import { AcademicMajorComponent } from './academic-major/academic-major.component';
import { RelationshipComponent } from './relationship/relationship.component';
import { CategoriesComponent } from './categories/categories.component';
import { StatusComponent } from './status/status.component';
import { DisengagementComponent } from './disengagement/disengagement.component';
import { CensuresComponent } from './censures/censures.component';
import { ArmOfServiceComponent } from './arm-of-service/arm-of-service.component';
import { MembershipComponent } from './membership/membership.component';
import { SalaryScalesComponent } from './salary-scales/salary-scales.component';
import { AdminSegmentsComponent } from './admin-segments/admin-segments.component';
import { SegmentDetailsComponent } from './admin-segments/segment-details/segment-details.component';
import { EmployeesComponent } from './employees/employees.component';
import { EmployeeAddComponent } from './employees/employee-add/employee-add.component';
import { CountryComponent } from './contact-info/country/country.component';
import { RegionComponent } from './contact-info/region/region.component';
import { StatesComponent } from './contact-info/states/states.component';
import { LgaComponent } from './contact-info/lga/lga.component';
import { AddressTypeComponent } from './contact-info/address-type/address-type.component';
import { PhoneTypeComponent } from './contact-info/phone-type/phone-type.component';
import { StructureComponent } from './structure/structure.component';
import { DepartmentsComponent } from './departments/departments.component';
import { LeaveTypeComponent } from './holidays/leave-type/leave-type.component';
import { LeaveGroupComponent } from './holidays/leave- group/leave-group.component';
import { PublicHolidaysComponent } from './holidays/public-holidays/public-holidays.component';
import { DesignationComponent } from './designation/designation.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { ManagersComponent } from './managers/managers.component';
import { RolesComponent } from './managers/roles/roles.component';
import { EmployeeActionComponent } from './employees/employee-action/employee-action.component';
import { StoreSetupItemsComponent } from './store-setup-items/store-setup-items.component';
import { StoreSetupCategoriesComponent } from './store-setup-categories/store-setup-categories.component';
import { StoreSetupStoresComponent } from './store-setup-stores/store-setup-stores.component';
import { StoreSetupUnitOfMeasuresComponent } from './store-setup-unit-of-measures/store-setup-unit-of-measures.component';
import { TransactionSrvPurchaseInvoiceComponent } from './transaction-srv-purchase-invoice/transaction-srv-purchase-invoice.component';
import { TransactionSrvPurchaseReturnComponent } from './transaction-srv-purchase-return/transaction-srv-purchase-return.component';
import { TransactionSalesInvoiceComponent } from './transaction-sales-invoice/transaction-sales-invoice.component';
import { TransactionSalesReturnByCustomerComponent } from './transaction-sales-return-by-customer/transaction-sales-return-by-customer.component';
import { TransactionStvStoreTransferComponent } from './transaction-stv-store-transfer/transaction-stv-store-transfer.component';
import { TransactionStoreAdjustmentComponent } from './transaction-store-adjustment/transaction-store-adjustment.component';
import { TransactionDonationsComponent } from './transaction-donations/transaction-donations.component';
import { TaxesComponent } from './taxes/taxes.component';
import { CompaniesComponent } from './companies/companies.component';
import { ReportBinCardComponent } from './report-bin-card/report-bin-card.component';
import { ReportInventoryLedgerComponent } from './report-inventory-ledger/report-inventory-ledger.component';
import { ReportQuantityBalanceComponent } from './report-quantity-balance/report-quantity-balance.component';
import { ReportOffLevelComponent } from './report-off-level/report-off-level.component';
import { JournalVoucherComponent } from './journal-voucher/journal-voucher.component';
import { BudgetControlComponent } from './budget-control/budget-control.component';
import { CurrenciesComponent } from './currencies/currencies.component';
import { BanksComponent } from './banks/banks.component';
import { CompanyInformationComponent } from './company-information/company-information.component';
import { RouteGuard } from 'app/shared/guards/route.guard';
import { UserRoleComponent } from './configurations/user-role/user-role.component';
import { UserRolePermissionComponent } from './configurations/user-role-permission/user-role-permission.component';
import { PermissionConstant } from 'app/shared/constants/permission-constant';
import { TrialBalanceComponent } from "./trial-balance/trial-balance.component";
import { JournalVoucherLedgerReportComponent } from './journal-voucher-ledger-report/journal-voucher-ledger-report.component';
import { NotesMasterComponent } from './notes-master/notes-master.component';
import { JvLedgerSiblingComponent } from './jv-ledger-sibling/jv-ledger-sibling.component';
import { StatementOfPositionComponent } from './statement-of-position/statement-of-position.component';
import { FinancialPerformanceReportComponent } from './financial-performance-report/financial-performance-report.component';
import { MonthlyActivityComponent } from './monthly-activity/monthly-activity.component';
import { VoucherSourceUnitComponent } from './treasure-report/voucher-source-unit/voucher-source-unit.component';
import { CashbookComponent } from './treasure-report/cashbook/cashbook.component';
import { PaymentVoucherComponent } from './treasure-report/payment-voucher/payment-voucher.component';
import { DefaultSettingVoucherInfoComponent } from "./treasure-report/default-setting-voucher-info/default-setting-voucher-info.component";
import { BudgetControlAieComponent } from './budget-control-aie/budget-control-aie.component';
import { PaymentReportComponent } from './payment-report/payment-report.component';
import { ReceiptVouchersComponent } from "./treasure-report/receipt-vouchers/receipt-vouchers.component";
import { RvReportListComponent } from './rv-report-list/rv-report-list.component';
import { ApplicationFundReportsComponent } from './treasure-report/application-fund-reports/application-fund-reports.component';
import { SourcesUsesFundComponent } from './treasure-report/sources-uses-fund/sources-uses-fund.component';
import { SpecialAccountActivityReportComponent } from './treasure-report/special-account-activity-report/special-account-activity-report.component';
import { SummaryReportNonPersonalAdvancesComponent } from "./summary-report-non-personal-advances/summary-report-non-personal-advances.component";
import { SummaryReportPersonalAdvancesComponent } from "./summary-report-personal-advances/summary-report-personal-advances.component";
import { SummaryReportStandingImprestComponent } from "./summary-report-standing-imprest/summary-report-standing-imprest.component";
import { SummaryReportSpecialImprestComponent } from "./summary-report-special-imprest/summary-report-special-imprest.component";
import { AdvancesLedgerEmployeeReportComponent } from './treasure-report/advances-ledger-employee-report/advances-ledger-employee-report.component';
import { IfrNotesMasterComponent } from "./ifr-notes-master/ifr-notes-master.component";
import { RetireVouchersComponent } from "./treasure-report/retire-vouchers/retire-vouchers.component";
import { OnMandateComponent } from "./treasure-report/on-mandate/on-mandate.component";
import { PaymentApprovalComponent } from './treasure-report/payment-approval/payment-approval.component';
import { PreviousYearAdvancesComponent } from "./treasure-report/previous-year-advances/previous-year-advances.component";
import { LeaveGroupMemberComponent } from './holidays/leave-group-member/leave-group-member.component';
import { LeaveGroupEntitlementComponent } from './holidays/leave-group-entitlement/leave-group-entitlement.component';
import { LeaveYearComponent } from './holidays/leave-year/leave-year.component';
import { InformationComponent } from './information/information/information.component';
import { LeaveCreditComponent } from './holidays/leave-credit/leave-credit.component';
import { LeaveEntitlementSalaryScaleComponent } from './holidays/leave-entitlement-salary-scale/leave-entitlement-salary-scale.component';
import { LeaveEntitlementGradeLevelComponent } from './holidays/leave-entitlement-grade-level/leave-entitlement-grade-level.component';
import { LeaveRequestComponent } from './holidays/leave-request/leave-request.component';
import { LeaveRequestApprovedComponent } from './holidays/leave-request-approved/leave-request-approved.component';
import { HrLeaveRequestApprovedComponent } from './holidays/hr-leave-request-approved/hr-leave-request-approved.component';
import { LeaveRequestClosedComponent } from './holidays/leave-request-closed/leave-request-closed.component';
import { HodLeaveRequestClosedApprovedComponent } from './holidays/hod-leave-request-closed-approved/hod-leave-request-closed-approved.component';
import { HrLeaveRequestClosedApprovedComponent } from './holidays/hr-leave-request-closed-approved/hr-leave-request-closed-approved.component';
import { LeaveBalanceComponent } from './holidays/reports/leave-balance/leave-balance.component';
import { LeaveScheduleComponent } from './holidays/reports/leave-schedule/leave-schedule.component';
import { LeaveRequestReportComponent } from './holidays/reports/leave-request-report/leave-request-report.component';
import { LeaveOnComponent } from './holidays/reports/leave-on/leave-on.component';

const routes: Routes = [
    {
        path: '',
        component: DashboardComponent,
        canActivate: [RouteGuard],
        data: {
            title: 'Dashboard Home',
            permissions: [],
        },
    },
    {
        path: 'qualification',
        component: QualificationComponent,
        canActivate: [RouteGuard],
        data: {
            title: 'Qualification',
            permissions: [PermissionConstant.QUALIFICATION_LIST],
        },
    },
    {
        path: 'skills',
        component: SkillsComponent,
        canActivate: [RouteGuard],
        data: {
            title: 'Skills',
            permissions: [PermissionConstant.JOB_SKILLS_LIST],
        },
    },
    {
        path: 'work-locations',
        component: WorkLocationsComponent,
        canActivate: [RouteGuard],
        data: {
            title: 'Work Locations',
            permissions: [PermissionConstant.WORK_LOCATION_LIST]
        },
    },
    {
        path: 'languages',
        component: LanguagesComponent,
        canActivate: [RouteGuard],
        data: {
            title: 'Languages',
            permissions: [PermissionConstant.LANGUAGES_LIST]
        },
    },
    {
        path: 'schedule',
        component: ScheduleComponent,
        canActivate: [RouteGuard],
        data: {
            title: 'Schedule',
            permissions: [PermissionConstant.SCHEDULE_LIST]
        },
    },
    {
        path: 'academic-major',
        component: AcademicMajorComponent,
        canActivate: [RouteGuard],
        data: {
            title: 'Academic Major',
            permissions: [PermissionConstant.ACADEMIC_MAJORS_LIST]
        },
    },
    {
        path: 'relationship',
        component: RelationshipComponent,
        canActivate: [RouteGuard],
        data: {
            title: 'Relationship',
            permissions: [PermissionConstant.RELATIONS_LIST]
        },
    },
    {
        path: 'categories',
        component: CategoriesComponent,
        canActivate: [RouteGuard],
        data: {
            title: 'Categories',
            permissions: [PermissionConstant.STAFF_CATEGORIES_LIST]
        },
    },
    {
        path: 'status',
        component: StatusComponent,
        canActivate: [RouteGuard],
        data: {
            title: 'Status',
            permissions: [PermissionConstant.STAFF_STATUS_LIST]
        },
    },
    {
        path: 'disengagement',
        component: DisengagementComponent,
        canActivate: [RouteGuard],
        data: {
            title: 'Disengagement',
            permissions: [PermissionConstant.DISENGAGEMENT_LIST]
        },
    },
    {
        path: 'censures',
        component: CensuresComponent,
        canActivate: [RouteGuard],
        data: {
            title: 'Censures',
            permissions: [PermissionConstant.CENSURES_LIST]
        },
    },
    {
        path: 'arm-of-service',
        component: ArmOfServiceComponent,
        canActivate: [RouteGuard],
        data: {
            title: 'Arm Of Service',
            permissions: [PermissionConstant.ARM_OF_SERVICE_LIST]
        },
    },
    {
        path: 'membership',
        component: MembershipComponent,
        canActivate: [RouteGuard],
        data: {
            title: 'Membership',
            permissions: [PermissionConstant.MEMBERSHIP_LIST]
        },
    },
    {
        path: 'salary-scales',
        component: SalaryScalesComponent,
        canActivate: [RouteGuard],
        data: {
            title: 'Salary Scales',
            permissions: [PermissionConstant.SALARYSCALES_LIST]
        },
    },
    {
        path: 'grade-level',
        component: SalaryScalesComponent,
        canActivate: [RouteGuard],
        data: {
            title: 'Grade Level',
            permissions: [PermissionConstant.GRADE_LEVEL_LIST]
        },
    },
    {
        path: 'gl-step',
        component: SalaryScalesComponent,
        canActivate: [RouteGuard],
        data: {
            title: 'GL Step',
            permissions: [PermissionConstant.GL_STEP_LIST]
        },
    },
    {
        path: 'employees',
        component: EmployeesComponent,
        canActivate: [RouteGuard],
        data: {
            title: 'Employees',
            permissions: [PermissionConstant.EMPLOYEE_LIST]
        },
    },
    {
        path: 'add-employee',
        component: EmployeeAddComponent,
        canActivate: [RouteGuard],
        data: {
            title: 'Add Employees',
            permissions: [PermissionConstant.EMPLOYEE_LIST]
        },
    },
    {
        path: 'employee/edit/:id',
        component: EmployeeAddComponent,
        canActivate: [RouteGuard],
        data: {
            title: 'Employee Edit',
            permissions: [PermissionConstant.EMPLOYEE_LIST]
        },
    },
    {
        path: 'employee-action',
        component: EmployeeActionComponent,
        canActivate: [RouteGuard],
        data: {
            title: 'Employee Action',
            permissions: [PermissionConstant.EMPLOYEE_LIST]
        },
    },
    {
        path: 'admin-segments',
        component: AdminSegmentsComponent,
        canActivate: [RouteGuard],
        data: {
            title: 'Admin Segment',
            permissions: [PermissionConstant.COA_LIST]
        },
    },
    {
        path: 'admin-segment-detail/:segmentId',
        component: SegmentDetailsComponent,
        canActivate: [RouteGuard],
        data: {
            title: 'Segment Details',
            permissions: [PermissionConstant.COA_LIST]
        },
    },
    {
        path: 'departments',
        component: DepartmentsComponent,
        canActivate: [RouteGuard],
        data: {
            title: 'Departments',
            permissions: [PermissionConstant.DEPARTMENT_LIST]
        },
    },
    {
        path: 'structure',
        component: StructureComponent,
        canActivate: [RouteGuard],
        data: {
            title: 'Structure',
            permissions: [PermissionConstant.STRUCTURE_LIST]
        },
    },
    {
        path: 'country',
        component: CountryComponent,
        canActivate: [RouteGuard],
        data: {
            title: 'Country',
            permissions: [PermissionConstant.COUNTRIES_LIST]
        },
    },
    {
        path: 'region',
        component: RegionComponent,
        canActivate: [RouteGuard],
        data: {
            title: 'Region',
            permissions: [PermissionConstant.REGION_LIST]
        },
    },
    {
        path: 'states',
        component: StatesComponent,
        canActivate: [RouteGuard],
        data: {
            title: 'States',
            permissions: [PermissionConstant.STATES_LIST]
        },
    },
    {
        path: 'lga',
        component: LgaComponent,
        canActivate: [RouteGuard],
        data: {
            title: 'LGA',
            permissions: [PermissionConstant.LGA_LIST]
        },
    },
    {
        path: 'address-type',
        component: AddressTypeComponent,
        canActivate: [RouteGuard],
        data: {
            title: 'Address Type',
            permissions: [PermissionConstant.ADDRESS_LIST]
        },
    },
    {
        path: 'phone-type',
        component: PhoneTypeComponent,
        canActivate: [RouteGuard],
        data: {
            title: 'Phone Type',
            permissions: [PermissionConstant.TYPES_OF_PHONE_NUM_LIST]
        },
    },
    {
        path: 'leaves-type',
        component: LeaveTypeComponent,
        canActivate: [RouteGuard],
        data: {
            title: 'Types of leave',
            permissions: [PermissionConstant.TYPES_OF_LEAVES_LIST]
        },
    },
    {
        path: 'leave-group-member/:leaveGroupId',
        component: LeaveGroupMemberComponent,
        canActivate: [RouteGuard],
        data: {
            title: 'Leave group members',
            permissions: [PermissionConstant.LEAVE_GROUP_MEMBER_LIST]
        },
    },
    {
        path: 'leave-group-entitlement/:leaveGroupId',
        component: LeaveGroupEntitlementComponent,
        canActivate: [RouteGuard],
        data: {
            title: 'Leave group entitlements',
            permissions: [PermissionConstant.LEAVE_GROUP_MEMBER_LIST]
        },
    },
    {
        path: 'leave-entitlement-salary-scales/:leaveEntitlementSalaryScaleId',
        component: LeaveEntitlementSalaryScaleComponent,
        canActivate: [RouteGuard],
        data: {
            title: 'Leave entitlement salary scale',
            permissions: [PermissionConstant.LEAVE_ENTITLEMENT_SALARY_SCALE_LIST]
        },
    },
    {
        path: 'leave-entitlement-grade-levels/:leaveEntitlementGradeLevelId',
        component: LeaveEntitlementGradeLevelComponent,
        canActivate: [RouteGuard],
        data: {
            title: 'Leave entitlement grade levels',
            permissions: [PermissionConstant.LEAVE_ENTITLEMENT_GRADE_LEVEL_LIST]
        },
    },
    {
        path: 'leave-year',
        component: LeaveYearComponent,
        canActivate: [RouteGuard],
        data: {
            title: 'Leave Years',
            permissions: [PermissionConstant.LEAVE_YEAR_LIST]
        },
    },
    {
        path: 'leave-request',
        component: LeaveRequestComponent,
        // canActivate: [RouteGuard],
        data: {
            title: 'Leave Requests',
            // permissions: [PermissionConstant.LEAVE_YEAR_LIST]
        },
    },
    {
        path: 'hod-leave-request-approved',
        component: LeaveRequestApprovedComponent,
        canActivate: [RouteGuard],
        data: {
            title: 'HOD Leave Requests Approval',
            permissions: [PermissionConstant.HOD_LEAVE_REQUEST_APPROVED_LIST]
        },
    },
    {
        path: 'leave-report/leave-balance',
        component: LeaveBalanceComponent,
        canActivate: [RouteGuard],
        data: {
            title: 'Leave Balance',
            permissions: [PermissionConstant.LEAVE_BALANCE_LIST]
        },
    },
    {
        path: 'leave-report/leave-schedule',
        component: LeaveScheduleComponent,
        canActivate: [RouteGuard],
        data: {
            title: 'Leave Schedule',
            permissions: [PermissionConstant.LEAVE_SCHEDULE_LIST]
        },
    },
    {
        path: 'leave-report/leave-on',
        component: LeaveOnComponent,
        canActivate: [RouteGuard],
        data: {
            title: 'Leave Schedule',
            permissions: [PermissionConstant.LEAVE_ON_LIST]
        },
    },
    {
        path: 'leave-report/leave-request',
        component: LeaveRequestReportComponent,
        canActivate: [RouteGuard],
        data: {
            title: 'Leave Request',
            permissions: [PermissionConstant.LEAVE_REQUEST_REPORT_LIST]
        },
    },
    {
        path: 'hr-leave-request-approved',
        component: HrLeaveRequestApprovedComponent,
        canActivate: [RouteGuard],
        data: {
            title: 'HR Leave Requests Approval',
            permissions: [PermissionConstant.HR_LEAVE_REQUEST_APPROVED_LIST]
        },
    },
    {
        path: 'leave-request/:leaveRequestId/leave-request-closed',
        component: LeaveRequestClosedComponent,
        // canActivate: [RouteGuard],
        data: {
            title: 'Leave Requests Closed',
            // permissions: [PermissionConstant.LEAVE_YEAR_LIST]
        },
    },
    {
        path: 'hod-leave-request-closed-approved',
        component: HodLeaveRequestClosedApprovedComponent,
        canActivate: [RouteGuard],
        data: {
            title: 'HOD Leave Requests Closed Approval',
            permissions: [PermissionConstant.HOD_LEAVE_REQUEST_CLOSED_APPROVED_LIST]
        },
    },
    {
        path: 'hr-leave-request-closed-approved',
        component: HrLeaveRequestClosedApprovedComponent,
        canActivate: [RouteGuard],
        data: {
            title: 'HR Leave Requests Closed Approval',
            permissions: [PermissionConstant.HR_LEAVE_REQUEST_CLOSED_APPROVED_LIST]
        },
    },
    {
        path: 'leave-credit',
        component: LeaveCreditComponent,
        canActivate: [RouteGuard],
        data: {
            title: 'Leave Credits',
            permissions: [PermissionConstant.LEAVE_CREDIT_LIST]
        },
    },
    {
        path: 'hr-information',
        component: InformationComponent,
        canActivate: [RouteGuard],
        data: {
            title: 'Hr Information',
            permissions: [PermissionConstant.INFORMATION_LIST]
        },
    },
    {
        path: 'leave-group',
        component: LeaveGroupComponent,
        canActivate: [RouteGuard],
        data: {
            title: 'Leave Group',
            permissions: [PermissionConstant.LEAVE_GROUP_LIST]
        },
    },
    {
        path: 'public-holiday',
        component: PublicHolidaysComponent,
        canActivate: [RouteGuard],
        data: {
            title: 'Public Holidays',
            permissions: [PermissionConstant.PUBLIC_HOLIDAYS_LIST]
        },
    },
    {
        path: 'designation',
        component: DesignationComponent,
        canActivate: [RouteGuard],
        data: {
            title: 'Designations',
            permissions: [PermissionConstant.DESIGNATION_LIST]
        },
    },
    {
        path: 'profile',
        component: UserProfileComponent,
        canActivate: [],
        data: {
            title: 'Profile',
            permissions: []
        },
    },
    {
        path: 'managers',
        component: ManagersComponent,
        canActivate: [RouteGuard],
        data: {
            title: 'Managers',
            permissions: [PermissionConstant.USERS_ACCOUNTS]
        }
    },
    {
        path: 'managers/:id/user-role',
        component: RolesComponent,
        canActivate: [RouteGuard],
        data: {
            title: 'Roles',
            permissions: [PermissionConstant.USERS_ACCOUNTS]
        },
    },
    {
        path: 'store-setup-items',
        component: StoreSetupItemsComponent,
        canActivate: [RouteGuard],
        data: {
            title: 'Items',
            permissions: [PermissionConstant.STORE_SETUP_ITEMS_LIST]
        }
    },
    {
        path: 'store-setup-categories',
        component: StoreSetupCategoriesComponent,
        canActivate: [RouteGuard],
        data: {
            title: 'Categories',
            permissions: [PermissionConstant.STORE_SETUP_CATEGORIES_LIST]
        }
    },
    {
        path: 'store-setup-stores',
        component: StoreSetupStoresComponent,
        canActivate: [RouteGuard],
        data: {
            title: 'Stores',
            permissions: [PermissionConstant.STORE_SETUP_STORES_LIST]
        }
    },
    {
        path: 'store-setup-unit-of-measures',
        component: StoreSetupUnitOfMeasuresComponent,
        canActivate: [RouteGuard],
        data: {
            title: 'Unit of Measures',
            permissions: [PermissionConstant.STORE_SETUP_UNIT_OF_MEASURES_LIST]
        }
    },
    {
        path: 'transaction-srv-purchase-invoice',
        component: TransactionSrvPurchaseInvoiceComponent,
        canActivate: [RouteGuard],
        data: {
            title: 'SRV - Purchase Invoice',
            permissions: [PermissionConstant.SRV_PURCHASE_INVOICE_LIST]
        }
    },
    {
        path: 'transaction-srv-purchase-return',
        component: TransactionSrvPurchaseReturnComponent,
        canActivate: [RouteGuard],
        data: {
            title: 'SRV - Purchase Return',
            permissions: [PermissionConstant.SRV_PURCHASE_RETURN_LIST]
        }
    },
    {
        path: 'transaction-sales-invoice',
        component: TransactionSalesInvoiceComponent,
        canActivate: [RouteGuard],
        data: {
            title: 'Sales Invoice',
            permissions: [PermissionConstant.SALES_INVOICE_LIST]
        }
    },
    {
        path: 'transaction-sales-return-by-customer',
        component: TransactionSalesReturnByCustomerComponent,
        canActivate: [RouteGuard],
        data: {
            title: 'Sales Return By Customer',
            permissions: [PermissionConstant.SALES_RETURN_BY_CUSTOMER_LIST]
        }
    },
    {
        path: 'transaction-stv-store-transfer',
        component: TransactionStvStoreTransferComponent,
        canActivate: [RouteGuard],
        data: {
            title: 'STV - Store Transfer',
            permissions: [PermissionConstant.STV_STORE_TRANSFER_LIST]
        }
    },
    {
        path: 'transaction-store-adjustment',
        component: TransactionStoreAdjustmentComponent,
        canActivate: [RouteGuard],
        data: {
            title: 'Store Adjustment',
            permissions: [PermissionConstant.STORE_ADJUSTMENT_LIST]
        }
    },
    {
        path: 'transaction-donations',
        component: TransactionDonationsComponent,
        canActivate: [RouteGuard],
        data: {
            title: 'Donations',
            permissions: [PermissionConstant.DONATION_LIST]
        }
    },
    {
        path: 'taxes',
        component: TaxesComponent,
        canActivate: [RouteGuard],
        data: {
            title: 'Taxes',
            permissions: [PermissionConstant.TAXES_LIST]
        }
    },
    {
        path: 'companies',
        component: CompaniesComponent,
        canActivate: [RouteGuard],
        data: {
            title: 'Companies',
            permissions: [PermissionConstant.COMPANIES]
        }
    },
    {
        path: 'report-bin-card',
        component: ReportBinCardComponent,
        canActivate: [RouteGuard],
        data: {
            title: 'Report Bin Card',
            permissions: [PermissionConstant.BIN_CARD_LIST]
        }
    },
    {
        path: 'report-inventory-ledger',
        component: ReportInventoryLedgerComponent,
        canActivate: [RouteGuard],
        data: {
            title: 'Report Inventory Ledger',
            permissions: [PermissionConstant.INVENTORY_LEDGER_LIST]
        }
    },
    {
        path: 'report-quantity-balance',
        component: ReportQuantityBalanceComponent,
        canActivate: [RouteGuard],
        data: {
            title: 'Report Quantity Balance',
            permissions: [PermissionConstant.QUALITY_BALANCE_LIST]
        }
    },
    {
        path: 'report-off-level',
        component: ReportOffLevelComponent,
        canActivate: [RouteGuard],
        data: {
            title: 'Report Off Level',
            permissions: [PermissionConstant.OFF_LEVEL_LIST]
        }
    },
    {
        path: 'user-role',
        component: UserRoleComponent,
        canActivate: [RouteGuard],
        data: {
            title: 'Roles',
            permissions: [PermissionConstant.ROLES_LIST]
        }
    },
    {
        path: 'user-role/:roleId',
        component: UserRolePermissionComponent,
        canActivate: [RouteGuard],
        data: {
            title: 'User Role Permission',
            permissions: [PermissionConstant.ROLES_LIST]
        }
    },

    {
        path: 'company-info',
        component: CompanyInformationComponent,
        canActivate: [RouteGuard],
        data: {
            title: 'Company Information',
            permissions: [PermissionConstant.COMPANIES_SETTING]
        }
    },
    {
        path: 'banks',
        component: BanksComponent,
        canActivate: [RouteGuard],
        data: {
            title: 'Banks',
            permissions: [PermissionConstant.BANKS]
        }
    },
    {
        path: 'budget-control/:type',
        component: BudgetControlComponent,
        canActivate: [RouteGuard],
        data: {
            title: 'Budget Control',
            permissions: [PermissionConstant.ECONOMIC_BUDGET_CONTROL_LIST, PermissionConstant.PROGRAMME_BUDGET_CONTROL_LIST]
        }
    },
    {
        path: 'journal-voucher',
        component: JournalVoucherComponent,
        canActivate: [RouteGuard],
        data: {
            title: 'journal Voucher',
            permissions: [PermissionConstant.LIST_GL_JV]
        }
    },
    {
        path: 'currencies',
        component: CurrenciesComponent,
        canActivate: [RouteGuard],
        data: {
            title: 'Currencies',
            permissions: [PermissionConstant.CURRENCIES]
        }
    },
    {
        path: 'trial-balance',
        component: TrialBalanceComponent,
        data: {
            title: 'Trial Balance'
        }
    },
    {
        path: 'jv-ledger-report',
        component: JournalVoucherLedgerReportComponent,
        data: {
            title: 'JV Legder Report'
        }
    },
    {
        path: 'notes-master',
        component: NotesMasterComponent,
        data: {
            title: 'Notes Master'
        }
    },
    {
        path: 'jv-ledger-sibling',
        component: JvLedgerSiblingComponent,
        data: {
            title: 'JV Ledger Sibling Report'
        }
    },
    {
        path: 'statement-of-position',
        component: StatementOfPositionComponent,
        data: {
            title: 'Statment of Position Report'
        }
    },
    {
        path: 'financial-performance',
        component: FinancialPerformanceReportComponent,
        data: {
            title: 'Financial Performance Report'
        }
    },
    {
        path: 'monthly-activity',
        component: MonthlyActivityComponent,
        data: {
            title: 'Monthly Activity Report'
        }
    },
    {
        path: 'voucher-source-unit',
        component: VoucherSourceUnitComponent,
        data: {
            title: 'Voucher Source Unit'
        }
    },
    {
        path: 'cashbook-account',
        component: CashbookComponent,
        data: {
            title: 'Cashbook'
        }
    },
    {
        path: 'payment-voucher',
        component: PaymentVoucherComponent,
        data: {
            title: 'Payment Voucher'
        }
    },
    {
        path: 'previous-year-advance',
        component: PreviousYearAdvancesComponent,
        data: {
            title: 'Previous Year Advances'
        }
    },
    {
        path: 'receipt-voucher',
        component: ReceiptVouchersComponent,
        data: {
            title: 'Receipt Voucher'
        }
    },
    {
        path: 'receipt-voucher',
        component: ReceiptVouchersComponent,
        data: {
            title: 'Receipt Voucher'
        }
    },
    {
        path: 'default-setting-voucher-info',
        component: DefaultSettingVoucherInfoComponent,
        data: {
            title: 'Default Setting Voucher Info'
        }
    },
    {
        path: 'budget-controls/AIE',
        component: BudgetControlAieComponent,
        data: {
            title: 'Budget Control AIE'
        }
    },
    {
        path: 'pv-list',
        component: PaymentReportComponent,
        data: {
            title: 'PV List'
        }
    },
    {
        path: 'rv-list',
        component: RvReportListComponent,
        data: {
            title: 'RV List'
        }
    },
    {
        path: 'application-fund-report',
        component: ApplicationFundReportsComponent,
        data: {
            title: 'Application of Fund Report'
        }
    },
    {
        path: 'source-uses-fund',
        component: SourcesUsesFundComponent,
        data: {
            title: 'Sources & Uses of Fund Stmt.'
        }
    },
    {
        path: 'special-account-activity',
        component: SpecialAccountActivityReportComponent,
        data: {
            title: 'Special Account Activity Stmt.'
        }
    },
    {
        path: 'summary-non-personal-advances',
        component: SummaryReportNonPersonalAdvancesComponent,
        data: {
            title: 'Summary - Non Personal Advances'
        }
    },
    {
        path: 'summary-personal-advances',
        component: SummaryReportPersonalAdvancesComponent,
        data: {
            title: 'Summary - Personal Advances'
        }
    },
    {
        path: 'summary-standing-imprest',
        component: SummaryReportStandingImprestComponent,
        data: {
            title: 'Summary - Standing Imprest'
        }
    },
    {
        path: 'summary-special-imprest',
        component: SummaryReportSpecialImprestComponent,
        data: {
            title: 'Summary - Special Imprest'
        }
    },
    {
        path: 'advances-ledger-by-employee',
        component: AdvancesLedgerEmployeeReportComponent,
        data: {
            title: 'Advances Ledger (By Employee)'
        }
    },
    {
        path: 'ifr-notes-master',
        component: IfrNotesMasterComponent,
        data: {
            title: 'IFR Notes Master'
        }
    },
    {
        path: 'retire-vouchers',
        component: RetireVouchersComponent,
        data: {
            title: 'Retire Vouchers'
        }
    },
    {
        path: 'on-mandate',
        component: OnMandateComponent,
        data: {
            title: 'On Mandate'
        }
    },
    {
        path: 'payment-approval',
        component: PaymentApprovalComponent,
        data: {
            title: 'Payment Approval'
        }
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class DashboardRoutingModule {
}
