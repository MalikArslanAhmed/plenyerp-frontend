import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { QualificationComponent } from './qualification/qualification.component';
import { SkillsComponent } from './skills/skills.component';
import { FuseSharedModule } from '../../../@fuse/shared.module';
import { QualificationListComponent } from './qualification/qualification-list/qualification-list.component';
import { MatTableModule } from '@angular/material/table';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { _MatMenuDirectivesModule, MatMenuModule } from '@angular/material/menu';
import { QualificationCreateComponent } from './qualification/qualification-create/qualification-create.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTooltipModule } from '@angular/material/tooltip';
import { SkillCreateComponent } from './skills/skill-create/skill-create.component';
import { SkillListComponent } from './skills/skill-list/skill-list.component';
import { WorkLocationsComponent } from './work-locations/work-locations.component';
import { MatTreeModule } from '@angular/material/tree';
import { UpdateWorkLocationsComponent } from './work-locations/update-work-locations/update-work-locations.component';
import { LanguagesComponent } from './languages/languages.component';
import { LanguageCreateComponent } from './languages/language-create/language-create.component';
import { LanguageListComponent } from './languages/language-list/language-list.component';
import { ScheduleComponent } from './schedule/schedule.component';
import { ScheduleCreateComponent } from './schedule/schedule-create/schedule-create.component';
import { ScheduleListComponent } from './schedule/schedule-list/schedule-list.component';
import { AcademicMajorComponent } from './academic-major/academic-major.component';
import { AcdemicMajorCreateComponent } from './academic-major/acdemic-major-create/acdemic-major-create.component';
import { AcdemicMajorListComponent } from './academic-major/acdemic-major-list/acdemic-major-list.component';
import { RelationshipComponent } from './relationship/relationship.component';
import { RelationshipCreateComponent } from './relationship/relationship-create/relationship-create.component';
import { RelationshipListComponent } from './relationship/relationship-list/relationship-list.component';
import { CategoriesComponent } from './categories/categories.component';
import { CategoriesListComponent } from './categories/categories-list/categories-list.component';
import { CategoriesCreateComponent } from './categories/categories-create/categories-create.component';
import { StatusComponent } from './status/status.component';
import { StatusListComponent } from './status/status-list/status-list.component';
import { StatusCreateComponent } from './status/status-create/status-create.component';
import { DisengagementComponent } from './disengagement/disengagement.component';
import { DisengagementListComponent } from './disengagement/disengagement-list/disengagement-list.component';
import { DisengagementCreateComponent } from './disengagement/disengagement-create/disengagement-create.component';
import { CensuresComponent } from './censures/censures.component';
import { CensuresListComponent } from './censures/censures-list/censures-list.component';
import { CensuresCreateComponent } from './censures/censures-create/censures-create.component';
import { ArmOfServiceComponent } from './arm-of-service/arm-of-service.component';
import { ArmOfServiceCreateComponent } from './arm-of-service/arm-of-service-create/arm-of-service-create.component';
import { ArmOfServiceListComponent } from './arm-of-service/arm-of-service-list/arm-of-service-list.component';
import { MembershipComponent } from './membership/membership.component';
import { MembershipListComponent } from './membership/membership-list/membership-list.component';
import { MembershipCreateComponent } from './membership/membership-create/membership-create.component';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { SalaryScalesComponent } from './salary-scales/salary-scales.component';
import { SalaryScalesListComponent } from './salary-scales/salary-scales-list/salary-scales-list.component';
import { SalaryScalesCreateComponent } from './salary-scales/salary-scales-create/salary-scales-create.component';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatTabsModule } from '@angular/material/tabs';
import { GradeLevelCreateComponent } from './salary-scales/grade-level-create/grade-level-create.component';
import { StepLevelCreateComponent } from './salary-scales/step-level-create/step-level-create.component';
import { EmployeesComponent } from './employees/employees.component';
import { EmployeeAddComponent } from './employees/employee-add/employee-add.component';
import { EmployeeListComponent } from './employees/employee-list/employee-list.component';
import { AdminSegmentsComponent } from './admin-segments/admin-segments.component';
import { SegmentsListComponent } from './admin-segments/segments-list/segments-list.component';
import { SegmentDetailsComponent } from './admin-segments/segment-details/segment-details.component';
import { AddCreateAdminSegmentsComponent } from './admin-segments/add-create-admin-segments/add-create-admin-segments.component';
import { EditSegmentListComponent } from './admin-segments/edit-segment-list/edit-segment-list';
import { MatStepperModule } from '@angular/material/stepper';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatOptionModule } from '@angular/material/core';
import { MatRadioModule } from '@angular/material/radio';
import { StructureComponent } from './structure/structure.component';
import { DepartmentsComponent } from './departments/departments.component';
import { CountryCreateComponent } from './contact-info/country/country-create/country-create.component';
import { CountryListComponent } from './contact-info/country/country-list/country-list.component';
import { CountryComponent } from './contact-info/country/country.component';
import { RegionComponent } from './contact-info/region/region.component';
import { RegionCreateComponent } from './contact-info/region/region-create/region-create.component';
import { RegionListComponent } from './contact-info/region/region-list/region-list.component';
import { StatesComponent } from './contact-info/states/states.component';
import { StatesCreateComponent } from './contact-info/states/states-create/states-create.component';
import { StatesListComponent } from './contact-info/states/states-list/states-list.component';
import { LgaComponent } from './contact-info/lga/lga.component';
import { LgaCreateComponent } from './contact-info/lga/lga-create/lga-create.component';
import { LgaListComponent } from './contact-info/lga/lga-list/lga-list.component';
import { MatSelectModule } from '@angular/material/select';
import { LeaveTypeComponent } from './holidays/leave-type/leave-type.component';
import { LeaveTypeCreateComponent } from './holidays/leave-type/leave-type-create/leave-type-create.component';
import { LeaveTypeListComponent } from './holidays/leave-type/leave-type-list/leave-type-list.component';
import { LeaveGroupComponent } from './holidays/leave- group/leave-group.component';
import { LeaveGroupCreateComponent } from './holidays/leave- group/leave-group-create/leave-group-create.component';
import { LeaveGroupListComponent } from './holidays/leave- group/leave-group-list/leave-group-list.component';
import { PublicHolidayCreateComponent } from './holidays/public-holidays/public-holiday-create/public-holiday-create.component';
import { PublicHolidaysComponent } from './holidays/public-holidays/public-holidays.component';
import { PublicHolidayListComponent } from './holidays/public-holidays/public-holiday-list/public-holiday-list.component';
import { DesignationComponent } from './designation/designation.component';
import { DesignationCreateComponent } from './designation/designation-create/designation-create.component';
import { DesignationListComponent } from './designation/designation-list/designation-list.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { PasswordUpdateComponent } from './user-profile/password-update/password-update.component.';
import { ManagersComponent } from './managers/managers.component';
import { ManagersListComponent } from './managers/managers-list/managers-list.component';
import { ManagersCreateComponent } from './managers/managers-create/managers-create.component';
import { RolesComponent } from './managers/roles/roles.component';
import { RolesListComponent } from './managers/roles/roles-list/roles-list.component';
import { RolesCreateComponent } from './managers/roles/roles-create/roles-create.component';
import { DepartmentListSelectComponent } from './structure/department-list/department-list-select.component';
import { MaterialFileInputModule } from 'ngx-material-file-input';
import { JobPositionsListSelectComponent } from './employees/job-positions-list-select/job-positions-list-select.component';
import { WorkLocationsListSelectComponent } from './employees/work-locations-list-select/work-locations-list-select.component';
import { EmployeeActionComponent } from './employees/employee-action/employee-action.component';
import { AddLevelCharCount } from './admin-segments/add-level-char-count/add-level-char-count';
import { EmployeePreviewComponent } from './employees/employee-preview/employee-preview.component';
import { EmpListHeadersComponent } from './employees/employee-list/emp-list-headers/emp-list-headers.component';
import { EmployeeAddress } from './employees/employee-other-details/employee-address/employee-address';
import { EmployeeCensure } from './employees/employee-other-details/employee-censure/employee-censure';
import { EmployeeHistory } from './employees/employee-other-details/employee-history/employee-history';
import { EmployeeLanguages } from './employees/employee-other-details/employee-languages/employee-languages';
import { EmployeeMembership } from './employees/employee-other-details/employee-membership/employee-membership';
import { EmployeeMilitaryService } from './employees/employee-other-details/employee-military-service/employee-military-service';
import { EmployeePhoneNumber } from './employees/employee-other-details/employee-phone-number/employee-phone-number';
import { EmployeeQualifications } from './employees/employee-other-details/employee-qualifications/employee-qualifications';
import { EmployeeRelations } from './employees/employee-other-details/employee-relations/employee-relations';
import { EmployeeSchoolAttended } from './employees/employee-other-details/employee-school-attended/employee-school-attended';
import { AddressTypeComponent } from './contact-info/address-type/address-type.component';
import { AddressTypeCreateComponent } from './contact-info/address-type/address-type-create/address-type-create.component';
import { AddressTypeListComponent } from './contact-info/address-type/address-type-list/address-type-list.component';
import { PhoneTypeComponent } from './contact-info/phone-type/phone-type.component';
import { PhoneTypeCreateComponent } from './contact-info/phone-type/phone-type-create/phone-type-create.component';
import { PhoneTypeListComponent } from './contact-info/phone-type/phone-type-list/phone-type-list.component';
import { EmployeeBankDetailsComponent } from './employees/employee-action/employee-bank-details/employee-bank-details.component';
import { EmployeeBackground } from './employees/employee-other-details/employee-background/employee-background';
import { SharedModule } from '../../shared/shared.module';
import { StoreSetupItemsComponent } from './store-setup-items/store-setup-items.component';
import { StoreSetupItemsListComponent } from './store-setup-items/store-setup-items-list/store-setup-items-list.component';
import { StoreSetupItemsCreateComponent } from './store-setup-items/store-setup-items-create/store-setup-items-create.component';
import { StoreSetupCategoriesComponent } from './store-setup-categories/store-setup-categories.component';
import { StoreSetupCategoriesCreateComponent } from './store-setup-categories/store-setup-categories-create/store-setup-categories-create.component';
import { StoreSetupStoresComponent } from './store-setup-stores/store-setup-stores.component';
import { StoreSetupStoresCreateComponent } from './store-setup-stores/store-setup-stores-create/store-setup-stores-create.component';
import { StoreSetupStoresListComponent } from './store-setup-stores/store-setup-stores-list/store-setup-stores-list.component';
import { StoreSetupUnitOfMeasuresComponent } from './store-setup-unit-of-measures/store-setup-unit-of-measures.component';
import { StoreSetupUnitOfMeasuresCreateComponent } from './store-setup-unit-of-measures/store-setup-unit-of-measures-create/store-setup-unit-of-measures-create.component';
import { StoreSetupUnitOfMeasuresListComponent } from './store-setup-unit-of-measures/store-setup-unit-of-measures-list/store-setup-unit-of-measures-list.component';
import { CategoriesListSelectComponent } from './store-setup-items/categories-list-select/categories-list-select.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { TransactionSrvPurchaseInvoiceComponent } from './transaction-srv-purchase-invoice/transaction-srv-purchase-invoice.component';
import { TransactionSrvPurchaseReturnComponent } from './transaction-srv-purchase-return/transaction-srv-purchase-return.component';
import { TransactionSalesInvoiceComponent } from './transaction-sales-invoice/transaction-sales-invoice.component';
import { TransactionSalesReturnByCustomerComponent } from './transaction-sales-return-by-customer/transaction-sales-return-by-customer.component';
import { TransactionStvStoreTransferComponent } from './transaction-stv-store-transfer/transaction-stv-store-transfer.component';
import { TransactionStoreAdjustmentComponent } from './transaction-store-adjustment/transaction-store-adjustment.component';
import { TransactionDonationsComponent } from './transaction-donations/transaction-donations.component';
import { ApplicableTaxesComponent } from './applicable-taxes/applicable-taxes.component';
import { DeleteListModalComponent } from './delete-list-modal/delete-list-modal.component';
import { TaxesComponent } from './taxes/taxes.component';
import { TaxesListComponent } from './taxes/taxes-list/taxes-list.component';
import { TaxesCreateComponent } from './taxes/taxes-create/taxes-create.component';
import { CompaniesComponent } from './companies/companies.component';
import { CompaniesListComponent } from './companies/companies-list/companies-list.component';
import { CompaniesCreateComponent } from './companies/companies-create/companies-create.component';
import { ReportBinCardComponent } from './report-bin-card/report-bin-card.component';
import { ReportInventoryLedgerComponent } from './report-inventory-ledger/report-inventory-ledger.component';
import { ReportQuantityBalanceComponent } from './report-quantity-balance/report-quantity-balance.component';
import { ReportOffLevelComponent } from './report-off-level/report-off-level.component';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { TransactionSupplierSelectComponent } from './transaction-supplier-select/transaction-supplier-select.component';
import { TransactionStoreSelectComponent } from './transaction-store-select/transaction-store-select.component';
import { CompanyBankDetailsComponent } from './companies/company-bank-details/company-bank-details.component';
import { TransactionsItemsSelectComponent } from './transactions-items-select/transactions-items-select.component';
import { MatListModule } from '@angular/material/list';
import { GlCodeSelectComponent } from './taxes/gl-code-select/gl-code-select.component';
import { CurrenciesComponent } from './currencies/currencies.component';
import { CurrenciesListComponent } from './currencies/currencies-list/currencies-list.component';
import { CurrenciesCreateComponent } from './currencies/currencies-create/currencies-create.component';
import { EmployeeProgressionHistoryComponent } from './employees/employee-action/employee-progression-history/employee-progression-history.component';
import { BudgetControlComponent } from './budget-control/budget-control.component';
import { MatCardModule } from '@angular/material/card';
import { BudgetControlListComponent } from './budget-control/budget-control-list/budget-control-list.component';
import { JournalVoucherComponent } from './journal-voucher/journal-voucher.component';
import { JournalVoucherListComponent } from './journal-voucher/journal-voucher-list/journal-voucher-list.component';
import { JournalVoucherCreateComponent } from './journal-voucher/journal-voucher-create/journal-voucher-create.component';
import { FundSegmentSelectComponent } from './journal-voucher/fund-segment-select/fund-segment-select.component';
import { AdminSegmentSelectComponent } from './journal-voucher/admin-segment-select/admin-segment-select.component';
import { EconomicSegmentSelectComponent } from './journal-voucher/economic-segment-select/economic-segment-select.component';
import { ProgrammingSegmentSelectComponent } from './journal-voucher/programming-segment-select/programming-segment-select.component';
import { FunctionalSegmentSelectComponent } from './journal-voucher/functional-segment-select/functional-segment-select.component';
import { GeoCodeSegmentSelectComponent } from './journal-voucher/geo-code-segment-select/geo-code-segment-select.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatSortModule } from '@angular/material/sort';
import { JournalVoucherDetailCreateComponent } from './journal-voucher/journal-voucher-detail-create/journal-voucher-detail-create.component';
import { JournalVoucherUpdateComponent } from './journal-voucher/journal-voucher-update/journal-voucher-update.component';
import { BanksComponent } from './banks/banks.component';
import { BankCreateComponent } from './banks/bank-create/bank-create.component';
import { BranchCreateComponent } from './banks/branch-create/branch-create.component';
import { CompanyInformationComponent } from './company-information/company-information.component';
import { UserRoleComponent } from './configurations/user-role/user-role.component';
import { UserRoleListComponent } from './configurations/user-role/user-role-list/user-role-list.component';
import { UserRoleCreateComponent } from './configurations/user-role/user-role-create/user-role-create.component';
import { UserRolePermissionComponent } from './configurations/user-role-permission/user-role-permission.component';
import { UpdateListModelComponent } from './update-list-model/update-list-model.component';
import { TrialBalanceComponent } from './trial-balance/trial-balance.component';
import { JournalVoucherLedgerReportComponent } from './journal-voucher-ledger-report/journal-voucher-ledger-report.component';
import { NotesMasterComponent } from './notes-master/notes-master.component';
import { BalanceAmountModelComponent } from './journal-voucher/balance-amount-model/balance-amount-model.component';
import { JvLedgerSiblingComponent } from './jv-ledger-sibling/jv-ledger-sibling.component';
import { StatementOfPositionComponent } from './statement-of-position/statement-of-position.component';
import { FinancialPerformanceReportComponent } from './financial-performance-report/financial-performance-report.component';
import { MonthlyActivityComponent } from './monthly-activity/monthly-activity.component';
import { MonthlyActivityEconomicSegmentComponent } from './monthly-activity/monthly-activity-economic-segment/monthly-activity-economic-segment.component';
import { NotesDeleteModalComponent } from './notes-master/notes-delete-modal/notes-delete-modal.component';
import { VoucherSourceUnitComponent } from './treasure-report/voucher-source-unit/voucher-source-unit.component';
import { VoucherSourceUnitCreateComponent } from './treasure-report/voucher-source-unit/voucher-source-unit-create/voucher-source-unit-create.component';
import { VoucherSourceUnitListComponent } from './treasure-report/voucher-source-unit/voucher-source-unit-list/voucher-source-unit-list.component';
import { CashbookListComponent } from './treasure-report/cashbook/cashbook-list/cashbook-list.component';
import { CashbookCreateComponent } from './treasure-report/cashbook/cashbook-create/cashbook-create.component';
import { CashbookComponent } from './treasure-report/cashbook/cashbook.component';
import { PaymentVoucherComponent } from './treasure-report/payment-voucher/payment-voucher.component';
import { PaymentVoucherCreateComponent } from './treasure-report/payment-voucher/payment-voucher-create/payment-voucher-create.component';
import { SchedulePayeeEmployeeComponent } from './treasure-report/payment-voucher/schedule-payee-employee/schedule-payee-employee.component';
import { SchedulePayeeCustomerComponent } from './treasure-report/payment-voucher/schedule-payee-customer/schedule-payee-customer.component';
import { DefaultSettingVoucherInfoComponent } from './treasure-report/default-setting-voucher-info/default-setting-voucher-info.component';
import { AdminSegmentEmployeeSelectComponent } from './treasure-report/default-setting-voucher-info/admin-segment-employee-select/admin-segment-employee-select.component';
import { AdminSegmentSelectAccountHeadComponent } from './treasure-report/default-setting-voucher-info/admin-segment-select-account-head/admin-segment-select-account-head.component';
import { BudgetControlAieComponent } from './budget-control-aie/budget-control-aie.component';
import { BudgetControlAieModalComponent } from './budget-control-aie/budget-control-aie-modal/budget-control-aie-modal.component';
import { PaymentVoucherTaxesComponent } from './treasure-report/payment-voucher/payment-voucher-taxes/payment-voucher-taxes.component';
import { SelectPayeeCustomerComponent } from './treasure-report/payment-voucher/select-payee-customer/select-payee-customer.component';
import { ScheduleEconomicCodesComponent } from './treasure-report/payment-voucher/schedule-economic-codes/schedule-economic-codes.component';
import { SelectAieComponent } from './treasure-report/payment-voucher/select-aie/select-aie.component';
import { SubOrgranisationSelectComponent } from './treasure-report/default-setting-voucher-info/sub-orgranisation-select/sub-orgranisation-select.component';
import { PaymentReportComponent } from './payment-report/payment-report.component';
import { ReportListHeadersComponent } from './payment-report/report-list-headers/report-list-headers.component';
import { ReceiptVouchersComponent } from './treasure-report/receipt-vouchers/receipt-vouchers.component';
import { ReceiptVoucherCreateComponent } from './treasure-report/receipt-vouchers/receipt-voucher-create/receipt-voucher-create.component';
import { SchedulePayersCustomerComponent } from './treasure-report/receipt-vouchers/schedule-payers-customer/schedule-payers-customer.component';
import { SelectPayersCustomerComponent } from './treasure-report/receipt-vouchers/select-payers-customer/select-payers-customer.component';
import { SchedulePayersEmployeeComponent } from './treasure-report/receipt-vouchers/schedule-payers-employee/schedule-payers-employee.component';
import { ScheduleEconomicCodesReceiptComponent } from './treasure-report/receipt-vouchers/schedule-economic-codes-receipt/schedule-economic-codes-receipt.component';
import { RvReportListComponent } from './rv-report-list/rv-report-list.component';
import { RvReportListHeadersComponent } from './rv-report-list/rv-report-list-headers/rv-report-list-headers.component';
import { ApplicationFundReportsComponent } from './treasure-report/application-fund-reports/application-fund-reports.component';
import { SourcesUsesFundComponent } from './treasure-report/sources-uses-fund/sources-uses-fund.component';
import { SpecialAccountActivityReportComponent } from './treasure-report/special-account-activity-report/special-account-activity-report.component';
import { SummaryReportNonPersonalAdvancesComponent } from './summary-report-non-personal-advances/summary-report-non-personal-advances.component';
import { SummaryReportPersonalAdvancesComponent } from './summary-report-personal-advances/summary-report-personal-advances.component';
import { SummaryReportStandingImprestComponent } from './summary-report-standing-imprest/summary-report-standing-imprest.component';
import { SummaryReportSpecialImprestComponent } from './summary-report-special-imprest/summary-report-special-imprest.component';
import { SummaryAdminSegmentSelectComponent } from './summary-admin-segment-select/summary-admin-segment-select.component';
import { AdvancesLedgerEmployeeReportComponent } from './treasure-report/advances-ledger-employee-report/advances-ledger-employee-report.component';
import { IfrNotesMasterComponent } from './ifr-notes-master/ifr-notes-master.component';
import { RetireVouchersComponent } from './treasure-report/retire-vouchers/retire-vouchers.component';
import { LiabilitiesComponent } from './treasure-report/retire-vouchers/liabilities/liabilities.component';
import { OnMandateComponent } from './treasure-report/on-mandate/on-mandate.component';
import { OnMandateListComponent } from './treasure-report/on-mandate/on-mandate-list/on-mandate-list.component';
import { OnMandateCreateComponent } from './treasure-report/on-mandate/on-mandate-create/on-mandate-create.component';
import { PaymentApprovalCreateComponent } from './treasure-report/payment-approval/payment-approval-create/payment-approval-create.component';
import { PaymentApprovalListComponent } from './treasure-report/payment-approval/payment-approval-list/payment-approval-list.component';
import { PaymentApprovalComponent } from './treasure-report/payment-approval/payment-approval.component';
import { SchedulePaymentApprovalEmployeeComponent } from './treasure-report/payment-approval/schedule-payment-approval-employee/schedule-payment-approval-employee.component';
import { SchedulePaymentApprovalCustomerComponent } from './treasure-report/payment-approval/schedule-payment-approval-customer/schedule-payment-approval-customer.component';
import { PreviousYearAdvancesComponent } from './treasure-report/previous-year-advances/previous-year-advances.component';
import { PreviousYearAdvancesCreateComponent } from './treasure-report/previous-year-advances/previous-year-advances-create/previous-year-advances-create.component';
import { SchedulePayersEmployeePreviousAdvancesComponent } from './treasure-report/previous-year-advances/schedule-payers-employee-previous-advances/schedule-payers-employee-previous-advances.component';
import { SchedulePayersCustomerPreviousAdvancesComponent } from './treasure-report/previous-year-advances/schedule-payers-customer-previous-advances/schedule-payers-customer-previous-advances.component';
import { ScheduleEconomicCodesReceiptPreviousAdvancesComponent } from './treasure-report/previous-year-advances/schedule-economic-codes-receipt-previous-advances/schedule-economic-codes-receipt-previous-advances.component';
import { AbsoluteAmountPipe } from '../../shared/pipes/absolute-amount.pipe';
import { EmployeeLoginAccessComponent } from './employees/employee-action/employee-login-access/employee-login-access.component';
import { LeaveGroupMemberListComponent } from './holidays/leave-group-member/leave-group-member-list/leave-group-member-list.component';
import { LeaveGroupMemberCreateComponent } from './holidays/leave-group-member/leave-group-member-create/leave-group-member-create.component';
import { LeaveGroupMemberComponent } from './holidays/leave-group-member/leave-group-member.component';
import { EmployeeSelectComponent } from './holidays/employee-select/employee-select.component';
import { LeaveGroupEntitlementComponent } from './holidays/leave-group-entitlement/leave-group-entitlement.component';
import { LeaveGroupEntitlementCreateComponent } from './holidays/leave-group-entitlement/leave-group-entitlement-create/leave-group-entitlement-create.component';
import { LeaveGroupEntitlementListComponent } from './holidays/leave-group-entitlement/leave-group-entitlement-list/leave-group-entitlement-list.component';
import { LeaveYearComponent } from './holidays/leave-year/leave-year.component';
import { LeaveYearCreateComponent } from './holidays/leave-year/leave-year-create/leave-year-create.component';
import { LeaveYearListComponent } from './holidays/leave-year/leave-year-list/leave-year-list.component';
import { InformationComponent } from './information/information/information.component';
import { InformationCreateComponent } from './information/information/information-create/information-create.component';
import { InformationListComponent } from './information/information/information-list/information-list.component';
import { LeaveCreditComponent } from './holidays/leave-credit/leave-credit.component';
import { LeaveCreditCreateComponent } from './holidays/leave-credit/leave-credit-create/leave-credit-create.component';
import { LeaveCreditListComponent } from './holidays/leave-credit/leave-credit-list/leave-credit-list.component';
import { EmployeeSelectSingleComponent } from './holidays/employee-select-single/employee-select-single.component';
import { LeaveEntitlementSalaryScaleComponent } from './holidays/leave-entitlement-salary-scale/leave-entitlement-salary-scale.component';
import { LeaveEntitlementSalaryScaleListComponent } from './holidays/leave-entitlement-salary-scale/leave-entitlement-salary-scale-list/leave-entitlement-salary-scale-list.component';
import { LeaveEntitlementSalaryScaleCreateComponent } from './holidays/leave-entitlement-salary-scale/leave-entitlement-salary-scale-create/leave-entitlement-salary-scale-create.component';
import { LeaveEntitlementGradeLevelCreateComponent } from './holidays/leave-entitlement-grade-level/leave-entitlement-grade-level-create/leave-entitlement-grade-level-create.component';
import { LeaveEntitlementGradeLevelListComponent } from './holidays/leave-entitlement-grade-level/leave-entitlement-grade-level-list/leave-entitlement-grade-level-list.component';
import { LeaveEntitlementGradeLevelComponent } from './holidays/leave-entitlement-grade-level/leave-entitlement-grade-level.component';
import { LeaveRequestComponent } from './holidays/leave-request/leave-request.component';
import { LeaveRequestCreateComponent } from './holidays/leave-request/leave-request-create/leave-request-create.component';
import { LeaveRequestListComponent } from './holidays/leave-request/leave-request-list/leave-request-list.component';
import { LeaveRequestApprovedComponent } from './holidays/leave-request-approved/leave-request-approved.component';
import { LeaveRequestApprovedCreateComponent } from './holidays/leave-request-approved/leave-request-approved-create/leave-request-approved-create.component';
import { LeaveRequestApprovedListComponent } from './holidays/leave-request-approved/leave-request-approved-list/leave-request-approved-list.component';
import { HrLeaveRequestApprovedComponent } from './holidays/hr-leave-request-approved/hr-leave-request-approved.component';
import { HrLeaveRequestApprovedCreateComponent } from './holidays/hr-leave-request-approved/hr-leave-request-approved-create/hr-leave-request-approved-create.component';
import { HrLeaveRequestApprovedListComponent } from './holidays/hr-leave-request-approved/hr-leave-request-approved-list/hr-leave-request-approved-list.component';
import { LeaveRequestClosedComponent } from './holidays/leave-request-closed/leave-request-closed.component';
import { LeaveRequestClosedCreateComponent } from './holidays/leave-request-closed/leave-request-closed-create/leave-request-closed-create.component';
import { LeaveRequestClosedListComponent } from './holidays/leave-request-closed/leave-request-closed-list/leave-request-closed-list.component';
import { HodLeaveRequestClosedApprovedComponent } from './holidays/hod-leave-request-closed-approved/hod-leave-request-closed-approved.component';
import { HodLeaveRequestClosedApprovedCreateComponent } from './holidays/hod-leave-request-closed-approved/hod-leave-request-closed-approved-create/hod-leave-request-closed-approved-create.component';
import { HodLeaveRequestClosedApprovedListComponent } from './holidays/hod-leave-request-closed-approved/hod-leave-request-closed-approved-list/hod-leave-request-closed-approved-list.component';
import { HrLeaveRequestClosedApprovedComponent } from './holidays/hr-leave-request-closed-approved/hr-leave-request-closed-approved.component';
import { HrLeaveRequestClosedApprovedCreateComponent } from './holidays/hr-leave-request-closed-approved/hr-leave-request-closed-approved-create/hr-leave-request-closed-approved-create.component';
import { HrLeaveRequestClosedApprovedListComponent } from './holidays/hr-leave-request-closed-approved/hr-leave-request-closed-approved-list/hr-leave-request-closed-approved-list.component';

@NgModule({
    declarations: [
        DashboardComponent,
        QualificationComponent,
        SkillsComponent,
        QualificationListComponent,
        QualificationCreateComponent,
        SkillCreateComponent,
        SkillListComponent,
        WorkLocationsComponent,
        UpdateWorkLocationsComponent,
        LanguagesComponent,
        LanguageCreateComponent,
        LanguageListComponent,
        ScheduleComponent,
        ScheduleCreateComponent,
        ScheduleListComponent,
        AcademicMajorComponent,
        AcdemicMajorCreateComponent,
        AcdemicMajorListComponent,
        RelationshipComponent,
        RelationshipCreateComponent,
        RelationshipListComponent,
        CategoriesComponent,
        CategoriesListComponent,
        CategoriesCreateComponent,
        StatusComponent,
        StatusListComponent,
        StatusCreateComponent,
        DisengagementComponent,
        DisengagementListComponent,
        DisengagementCreateComponent,
        CensuresComponent,
        CensuresListComponent,
        CensuresCreateComponent,
        ArmOfServiceComponent,
        ArmOfServiceCreateComponent,
        ArmOfServiceListComponent,
        MembershipComponent,
        MembershipListComponent,
        MembershipCreateComponent,
        SalaryScalesComponent,
        SalaryScalesListComponent,
        SalaryScalesCreateComponent,
        GradeLevelCreateComponent,
        StepLevelCreateComponent,
        EmployeesComponent,
        EmployeeAddComponent,
        EmployeeListComponent,
        StepLevelCreateComponent,
        AdminSegmentsComponent,
        SegmentsListComponent,
        SegmentDetailsComponent,
        AddCreateAdminSegmentsComponent,
        EditSegmentListComponent,
        StructureComponent,
        DepartmentsComponent,
        EmployeeListComponent,
        CountryComponent,
        CountryCreateComponent,
        CountryListComponent,
        RegionComponent,
        RegionCreateComponent,
        RegionListComponent,
        StatesComponent,
        StatesCreateComponent,
        StatesListComponent,
        LgaComponent,
        LgaCreateComponent,
        LgaListComponent,
        LeaveTypeComponent,
        LeaveTypeCreateComponent,
        LeaveTypeListComponent,
        LeaveGroupMemberComponent,
        LeaveGroupMemberCreateComponent,
        LeaveGroupMemberListComponent,
        LeaveGroupEntitlementComponent,
        LeaveGroupEntitlementCreateComponent,
        LeaveGroupEntitlementListComponent,
        LeaveEntitlementSalaryScaleComponent,
        LeaveEntitlementSalaryScaleCreateComponent,
        LeaveEntitlementSalaryScaleListComponent,
        LeaveEntitlementGradeLevelComponent,
        LeaveEntitlementGradeLevelCreateComponent,
        LeaveEntitlementGradeLevelListComponent,
        LeaveYearComponent,
        LeaveYearCreateComponent,
        LeaveYearListComponent,
        LeaveRequestComponent,
        LeaveRequestCreateComponent,
        LeaveRequestListComponent,
        LeaveRequestApprovedComponent,
        LeaveRequestApprovedCreateComponent,
        LeaveRequestApprovedListComponent,
        HodLeaveRequestClosedApprovedComponent,
        HodLeaveRequestClosedApprovedCreateComponent,
        HodLeaveRequestClosedApprovedListComponent,
        HrLeaveRequestClosedApprovedComponent,
        HrLeaveRequestClosedApprovedCreateComponent,
        HrLeaveRequestClosedApprovedListComponent,
        HrLeaveRequestApprovedComponent,
        HrLeaveRequestApprovedCreateComponent,
        HrLeaveRequestApprovedListComponent,
        LeaveRequestClosedComponent,
        LeaveRequestClosedCreateComponent,
        LeaveRequestClosedListComponent,
        LeaveGroupComponent,
        LeaveGroupCreateComponent,
        LeaveGroupListComponent,
        InformationComponent,
        InformationCreateComponent,
        InformationListComponent,
        LeaveCreditComponent,
        LeaveCreditCreateComponent,
        LeaveCreditListComponent,
        PublicHolidayCreateComponent,
        PublicHolidaysComponent,
        PublicHolidayListComponent,
        DesignationComponent,
        DesignationCreateComponent,
        DesignationListComponent,
        UserProfileComponent,
        PasswordUpdateComponent,
        ManagersComponent,
        ManagersListComponent,
        ManagersCreateComponent,
        RolesComponent,
        RolesListComponent,
        RolesCreateComponent,
        UserProfileComponent,
        DepartmentListSelectComponent,
        JobPositionsListSelectComponent,
        WorkLocationsListSelectComponent,
        EmployeeActionComponent,
        EmployeePreviewComponent,
        AddLevelCharCount,
        EmpListHeadersComponent,
        AddressTypeComponent,
        AddressTypeCreateComponent,
        AddressTypeListComponent,
        PhoneTypeComponent,
        PhoneTypeCreateComponent,
        PhoneTypeListComponent,
        EmployeeBankDetailsComponent,
        EmpListHeadersComponent,
        EmployeeAddress,
        EmployeeCensure,
        EmployeeHistory,
        EmployeeLanguages,
        EmployeeMembership,
        EmployeeMilitaryService,
        EmployeePhoneNumber,
        EmployeeQualifications,
        EmployeeRelations,
        EmployeeSchoolAttended,
        EmployeeBackground,
        StoreSetupItemsComponent,
        StoreSetupItemsListComponent,
        StoreSetupItemsCreateComponent,
        StoreSetupCategoriesComponent,
        StoreSetupCategoriesCreateComponent,
        StoreSetupStoresComponent,
        StoreSetupStoresCreateComponent,
        StoreSetupStoresListComponent,
        StoreSetupUnitOfMeasuresComponent,
        StoreSetupUnitOfMeasuresCreateComponent,
        StoreSetupUnitOfMeasuresListComponent,
        CategoriesListSelectComponent,
        TransactionSrvPurchaseInvoiceComponent,
        TransactionSrvPurchaseReturnComponent,
        TransactionSalesInvoiceComponent,
        TransactionSalesReturnByCustomerComponent,
        TransactionStvStoreTransferComponent,
        TransactionStoreAdjustmentComponent,
        TransactionDonationsComponent,
        ApplicableTaxesComponent,
        DeleteListModalComponent,
        TaxesComponent,
        TaxesListComponent,
        TaxesCreateComponent,
        CompaniesComponent,
        CompaniesListComponent,
        CompaniesCreateComponent,
        ReportBinCardComponent,
        ReportInventoryLedgerComponent,
        ReportQuantityBalanceComponent,
        ReportOffLevelComponent,
        TransactionSupplierSelectComponent,
        TransactionStoreSelectComponent,
        CompanyBankDetailsComponent,
        TransactionsItemsSelectComponent,
        GlCodeSelectComponent,
        EmployeeProgressionHistoryComponent,
        BanksComponent,
        BankCreateComponent,
        BranchCreateComponent,
        CurrenciesComponent,
        CurrenciesListComponent,
        CurrenciesCreateComponent,
        BudgetControlComponent,
        BudgetControlListComponent,
        JournalVoucherComponent,
        JournalVoucherListComponent,
        JournalVoucherCreateComponent,
        FundSegmentSelectComponent,
        AdminSegmentSelectComponent,
        EconomicSegmentSelectComponent,
        ProgrammingSegmentSelectComponent,
        FunctionalSegmentSelectComponent,
        GeoCodeSegmentSelectComponent,
        JournalVoucherDetailCreateComponent,
        JournalVoucherUpdateComponent,
        CompanyInformationComponent,
        UserRoleComponent,
        UserRoleListComponent,
        UserRoleCreateComponent,
        UserRolePermissionComponent,
        UpdateListModelComponent,
        TrialBalanceComponent,
        JournalVoucherLedgerReportComponent,
        NotesMasterComponent,
        BalanceAmountModelComponent,
        JvLedgerSiblingComponent,
        StatementOfPositionComponent,
        FinancialPerformanceReportComponent,
        MonthlyActivityComponent,
        MonthlyActivityEconomicSegmentComponent,
        NotesDeleteModalComponent,
        VoucherSourceUnitComponent,
        VoucherSourceUnitCreateComponent,
        VoucherSourceUnitListComponent,
        CashbookListComponent,
        CashbookCreateComponent,
        CashbookComponent,
        PaymentVoucherComponent,
        PaymentVoucherCreateComponent,
        SchedulePayeeEmployeeComponent,
        SchedulePayeeCustomerComponent,
        DefaultSettingVoucherInfoComponent,
        AdminSegmentEmployeeSelectComponent,
        AdminSegmentSelectAccountHeadComponent,
        BudgetControlAieComponent,
        BudgetControlAieModalComponent,
        PaymentVoucherTaxesComponent,
        SelectPayeeCustomerComponent,
        ScheduleEconomicCodesComponent,
        SelectAieComponent,
        SubOrgranisationSelectComponent,
        PaymentReportComponent,
        ReportListHeadersComponent,
        ReceiptVouchersComponent,
        ReceiptVoucherCreateComponent,
        SchedulePayersCustomerComponent,
        SelectPayersCustomerComponent,
        SchedulePayersEmployeeComponent,
        ScheduleEconomicCodesReceiptComponent,
        RvReportListComponent,
        RvReportListHeadersComponent,
        ApplicationFundReportsComponent,
        SourcesUsesFundComponent,
        SpecialAccountActivityReportComponent,
        SourcesUsesFundComponent,
        SummaryReportNonPersonalAdvancesComponent,
        SummaryReportPersonalAdvancesComponent,
        SummaryReportStandingImprestComponent,
        SummaryReportSpecialImprestComponent,
        SummaryAdminSegmentSelectComponent,
        EmployeeSelectComponent,
        EmployeeSelectSingleComponent,
        AdvancesLedgerEmployeeReportComponent,
        IfrNotesMasterComponent,
        RetireVouchersComponent,
        LiabilitiesComponent,
        OnMandateComponent,
        OnMandateListComponent,
        OnMandateCreateComponent,
        PaymentApprovalCreateComponent,
        PaymentApprovalListComponent,
        PaymentApprovalComponent,
        SchedulePaymentApprovalEmployeeComponent,
        SchedulePaymentApprovalCustomerComponent,
        PreviousYearAdvancesComponent,
        PreviousYearAdvancesCreateComponent,
        SchedulePayersEmployeePreviousAdvancesComponent,
        SchedulePayersCustomerPreviousAdvancesComponent,
        ScheduleEconomicCodesReceiptPreviousAdvancesComponent,
        EmployeeLoginAccessComponent,
    ],
    imports: [
        CommonModule,
        DashboardRoutingModule,
        FuseSharedModule,
        MatTableModule,
        MatCheckboxModule,
        MatButtonModule,
        MatIconModule,
        _MatMenuDirectivesModule,
        MatMenuModule,
        MatToolbarModule,
        MatDialogModule,
        MatFormFieldModule,
        MatInputModule,
        MatTooltipModule,
        MatTreeModule,
        MatSlideToggleModule,
        MatGridListModule,
        MatTabsModule,
        MatSelectModule,
        MatStepperModule,
        MatDatepickerModule,
        MatOptionModule,
        MatRadioModule,
        MaterialFileInputModule,
        SharedModule,
        MatPaginatorModule,
        MatAutocompleteModule,
        MatListModule,
        MatCardModule,
        MatExpansionModule,
        MatSortModule
    ],
    providers: [

    ]
})
export class DashboardModule {
}
