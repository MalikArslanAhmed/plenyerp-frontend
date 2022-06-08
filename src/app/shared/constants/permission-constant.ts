import { Injectable } from '@angular/core';

@Injectable()
export class PermissionConstant {
    // admin
    static COMPANIES = 'COMPANIES';
    static COMPANIES_SETTING = 'COMPANIES.SETTING';
    static COMPANIES_CREATE = 'COMPANIES.CREATE';
    static COMPANIES_LIST = 'COMPANIES.LIST';
    static COMPANIES_UPDATE = 'COMPANIES.UPDATE';
    static COMPANIES_DELETE = 'COMPANIES.DELETE';
    static COMPANIES_BANK_CREATE = 'COMAPNIES.BANK.CREATE';
    static TAXES = 'TAXES';
    static TAXES_LIST = 'TAXES.LIST';
    static TAXES_CREATE = 'TAXES.CREATE';
    static TAXES_UPDATE = 'TAXES.EDIT';
    static TAXES_DELETE = 'TAXES.DELETE';

    static COA_LIST = 'COA.LIST';
    static COA_ADD_CHAR_COUNT_CONFIG = 'COA.ADD.CHAR.COUNT.CONFIG';
    static COA_ADMIN_SEGMENT_DETAILS = 'COA.ADMIN.SEGMENT.DETAILS';
    static COA_EDIT = 'COA.EDIT';


    static ROLES_LIST = 'ROLE.LIST';
    static ROLES_ADD = 'ROLE.ADD';
    static ROLES_EDIT = 'ROLE.EDIT';
    static ROLES_DELETE = 'ROLE.DELETE';
    static ROLES_PERMISSION_ADD = 'ROLE.PERMISSIONS.ADD';
    static CURRENCIES = 'CURRENCIES';
    static BANKS = 'BANKS';
    static CUSTOMERS = 'PAYERS.PAYEES';
    //static EDIT_COA_ADMIN = 'EDIT.COA.ADMIN'; //ALSO IN HR
    static EDIT_COA_FUNCTIONS = 'EDIT.COA.FUNC';
    static EDIT_COA_PROGRAMME = 'EDIT.COA.PROG';
    static EDIT_COA_GEO = 'EDIT.COA.GEO';
    static EDIT_COA_FUND = 'EDIT.COA.FUND';
    static EDIT_COA_ECONOMIC = 'EDIT.COA.ECONO';
    // static ADD_LOGIN = 'ADD.LOGIN'; //ALSO IN HR
    //static EDIT_LOGIN = 'EDIT.LOGIN' //ALSO IN HR
    //  static DELETE_LOGIN = 'DELETE.LOGIN'; //ALSO IN HR

    // HR
    static EMPLOYEE_LIST = 'EMPLOYEE.LIST';
    static EMPLOYEE_ENROLLMENT_LIST = 'EMPLOYEE.ADD.ENROLLMENT.LIST';

    static GRADE_LEVEL_LIST = 'GRADE.LEVEL.LIST';
    static GL_STEP_LIST = 'GL.STEP.LIST';

    static COUNTRIES_ADD = 'COUNTIRES.ADD';
    static COUNTRIES_EDIT = 'COUNTIRES.EDIT';
    static COUNTRIES_LIST = 'COUNTIRES.LIST';
    static COUNTRIES_DELETE = 'COUNTIRES.DELETE';
    static COUNTRIES = 'COUNTIRES';


    static REGION_ADD = 'REGION.ADD';
    static REGION_EDIT = 'REGION.EDIT';
    static REGION_LIST = 'REGION.LIST';
    static REGION_DELETE = 'REGION.DELETE';

    static STATES_ADD = 'STATES.ADD';
    static STATES_EDIT = 'STATES.EDIT';
    static STATES_LIST = 'STATES.LIST';
    static STATES_DELETE = 'STATES.DELETE';

    static LGA_ADD = 'LGA.ADD';
    static LGA_EDIT = 'LGA.EDIT';
    static LGA_LIST = 'LGA.LIST';
    static LGA_DELETE = 'LGA.DELETE';

    static SCHEDULE_ADD = 'SCHEDULE.ADD';
    static SCHEDULE_EDIT = 'SCHEDULE.EDIT';
    static SCHEDULE_LIST = 'SCHEDULE.LIST';
    static SCHEDULE_DELETE = 'SCHEDULE.DELETE';

    static WORK_LOCATION_ADD = 'WORK.LOCATIONS.ADD';
    static WORK_LOCATION_EDIT = 'WORK.LOCATIONS.EDIT';
    static WORK_LOCATION_LIST = 'WORK.LOCATIONS.LIST';
    static WORK_LOCATION_DELETE = 'WORK.LOCATIONS.DELETE';

    static DISENGAGEMENT_ADD = 'DISENGAGEMENT.ADD';
    static DISENGAGEMENT_EDIT = 'DISENGAGEMENT.EDIT';
    static DISENGAGEMENT_LIST = 'DISENGAGEMENT.LIST';
    static DISENGAGEMENT_DELETE = 'DISENGAGEMENT.DELETE';

    static STRUCTURE_ADD = 'STRUCTURE.ADD';
    static STRUCTURE_EDIT = 'STRUCTURE.EDIT';
    static STRUCTURE_LIST = 'STRUCTURE.LIST';
    static STRUCTURE_DELETE = 'STRUCTURE.DELETE';

    static DESIGNATION_ADD = 'DESIGNATIONS.ADD';
    static DESIGNATION_EDIT = 'DESIGNATIONS.EDIT';
    static DESIGNATION_LIST = 'DESIGNATIONS.LIST';
    static DESIGNATION_DELETE = 'DESIGNATIONS.DELETE';

    static SALARYSCALES_ADD = 'SALARY.SCALES.ADD';
    static SALARYSCALES_EDIT = 'SALARY.SCALES.EDIT';
    static SALARYSCALES_LIST = 'SALARY.SCALES.LIST';
    static SALARYSCALES_DELETE = 'SALARY.SCALES.DELETE';

    static QUALIFICATION_ADD = 'QUALIFICATIONS.ADD';
    static QUALIFICATION_EDIT = 'QUALIFICATIONS.EDIT';
    static QUALIFICATION_LIST = 'QUALIFICATIONS.LIST';
    static QUALIFICATION_DELETE = 'QUALIFICATIONS.DELETE';

    static JOB_SKILLS_ADD = 'JOB.SKILLS.ADD';
    static JOB_SKILLS_EDIT = 'JOB.SKILLS.EDIT';
    static JOB_SKILLS_LIST = 'JOB.SKILLS.LIST';
    static JOB_SKILLS_DELETE = 'JOB.SKILLS.DELETE';

    static LANGUAGES_ADD = 'LANGUAGES.ADD';
    static LANGUAGES_EDIT = 'LANGUAGES.EDIT';
    static LANGUAGES_LIST = 'LANGUAGES.LIST';
    static LANGUAGES_DELETE = 'LANGUAGES.DELETE';

    static SCHOOL_CATEGORIES_ADD = 'SCHOOL.CATEGORIES.ADD';
    static SCHOOL_CATEGORIES_EDIT = 'SCHOOL.CATEGORIES.EDIT';
    static SCHOOL_CATEGORIES_LIST = 'SCHOOL.CATEGORIES.LIST';
    static SCHOOL_CATEGORIES_DELETE = 'SCHOOL.CATEGORIES.DELETE';

    static ACADEMIC_MAJORS_ADD = 'ACADEMIC.MAJORS.ADD';
    static ACADEMIC_MAJORS_EDIT = 'ACADEMIC.MAJORS.EDIT';
    static ACADEMIC_MAJORS_LIST = 'ACADEMIC.MAJORS.LIST';
    static ACADEMIC_MAJORS_DELETE = 'ACADEMIC.MAJORS.DELETE';

    static RELATIONS_ADD = 'RELATIONS.ADD';
    static RELATIONS_EDIT = 'RELATIONS.EDIT';
    static RELATIONS_LIST = 'RELATIONS.LIST';
    static RELATIONS_DELETE = 'RELATIONS.DELETE';

    static STAFF_CATEGORIES_ADD = 'STAFF.CATEGORIES.ADD';
    static STAFF_CATEGORIES_EDIT = 'STAFF.CATEGORIES.EDIT';
    static STAFF_CATEGORIES_LIST = 'STAFF.CATEGORIES.LIST';
    static STAFF_CATEGORIES_DELETE = 'STAFF.CATEGORIES.DELETE';

    static STAFF_STATUS_ADD = 'STAFF.STATUS.ADD';
    static STAFF_STATUS_EDIT = 'STAFF.STATUS.EDIT';
    static STAFF_STATUS_LIST = 'STAFF.STATUS.LIST';
    static STAFF_STATUS_DELETE = 'STAFF.STATUS.DELETE';

    static EXIT_OPTIONS_ADD = 'EXIT.OPTIONS.ADD';
    static EXIT_OPTIONS_EDIT = 'EXIT.OPTIONS.EDIT';
    static EXIT_OPTIONS_LIST = 'EXIT.OPTIONS.LIST';
    static EXIT_OPTIONS_DELETE = 'EXIT.OPTIONS.DEKETE';

    static CENSURES_ADD = 'CENSURES.ADD';
    static CENSURES_EDIT = 'CENSURES.EDIT';
    static CENSURES_LIST = 'CENSURES.LIST';
    static CENSURES_DELETE = 'CENSURES.DELETE';

    static ARM_OF_SERVICE_ADD = 'ARMS.OF.SERVICE.ADD';
    static ARM_OF_SERVICE_EDIT = 'ARMS.OF.SERVICE.EDIT';
    static ARM_OF_SERVICE_LIST = 'ARMS.OF.SERVICE.LIST';
    static ARM_OF_SERVICE_DELETE = 'ARMS.OF.SERVICE.DELETE';

    static MEMBERSHIP_ADD = 'MEMBERSHIPS.ADD';
    static MEMBERSHIP_EDIT = 'MEMBERSHIPS.EDIT';
    static MEMBERSHIP_LIST = 'MEMBERSHIPS.LIST';
    static MEMBERSHIP_DELETE = 'MEMBERSHIPS.DELETE';

    static TYPES_OF_LEAVES_ADD = 'TYPES.OF.LEAVE.ADD';
    static TYPES_OF_LEAVES_EDIT = 'TYPES.OF.LEAVE.EDIT';
    static TYPES_OF_LEAVES_LIST = 'TYPES.OF.LEAVE.LIST';
    static TYPES_OF_LEAVES_DELETE = 'TYPES.OF.LEAVE.DELETE';

    static LEAVE_GROUP_ADD = 'LEAVE.GROUP.ADD';
    static LEAVE_GROUP_EDIT = 'LEAVE.GROUP.EDIT';
    static LEAVE_GROUP_LIST = 'LEAVE.GROUP.LIST';
    static LEAVE_GROUP_DELETE = 'LEAVE.GROUP.DELETE';

    static LEAVE_GROUP_MEMBER_ADD = 'LEAVE.GROUP.MEMBER.ADD';
    static LEAVE_GROUP_MEMBER_EDIT = 'LEAVE.GROUP.MEMBER.EDIT';
    static LEAVE_GROUP_MEMBER_LIST = 'LEAVE.GROUP.MEMBER.LIST';
    static LEAVE_GROUP_MEMBER_DELETE = 'LEAVE.GROUP.MEMBER.DELETE';

    static LEAVE_GROUP_Entitlement_ADD = 'LEAVE.GROUP.Entitlement.ADD';
    static LEAVE_GROUP_Entitlement_EDIT = 'LEAVE.GROUP.Entitlement.EDIT';
    static LEAVE_GROUP_Entitlement_LIST = 'LEAVE.GROUP.Entitlement.LIST';
    static LEAVE_GROUP_Entitlement_DELETE = 'LEAVE.GROUP.Entitlement.DELETE';

    static LEAVE_ENTITLEMENT_SALARY_SCALE_ADD = 'LEAVE.ENTITLEMENT.SALARY.SCALE.ADD';
    static LEAVE_ENTITLEMENT_SALARY_SCALE_EDIT = 'LEAVE.ENTITLEMENT.SALARY.SCALE.EDIT';
    static LEAVE_ENTITLEMENT_SALARY_SCALE_LIST = 'LEAVE.ENTITLEMENT.SALARY.SCALE.LIST';
    static LEAVE_ENTITLEMENT_SALARY_SCALE_DELETE = 'LEAVE.ENTITLEMENT.SALARY.SCALE.DELETE';

    static LEAVE_ENTITLEMENT_GRADE_LEVEL_ADD = 'LEAVE.ENTITLEMENT.GRADE.LEVEL.ADD';
    static LEAVE_ENTITLEMENT_GRADE_LEVEL_EDIT = 'LEAVE.ENTITLEMENT.GRADE.LEVEL.EDIT';
    static LEAVE_ENTITLEMENT_GRADE_LEVEL_LIST = 'LEAVE.ENTITLEMENT.GRADE.LEVEL.LIST';
    static LEAVE_ENTITLEMENT_GRADE_LEVEL_DELETE = 'LEAVE.ENTITLEMENT.GRADE.LEVEL.DELETE';

    static LEAVE_YEAR_ADD = 'LEAVE.YEAR.ADD';
    static LEAVE_YEAR_EDIT = 'LEAVE.YEAR.EDIT';
    static LEAVE_YEAR_LIST = 'LEAVE.YEAR.LIST';
    static LEAVE_YEAR_DELETE = 'LEAVE.YEAR.DELETE';

    static HR_LEAVE_REQUEST_APPROVED_ADD = 'HR.LEAVE.REQUEST.APPROVED.ADD';
    static HR_LEAVE_REQUEST_APPROVED_EDIT = 'HR.LEAVE.REQUEST.APPROVED.EDIT';
    static HR_LEAVE_REQUEST_APPROVED_LIST = 'HR.LEAVE.REQUEST.APPROVED.LIST';
    static HR_LEAVE_REQUEST_APPROVED_DELETE = 'HR.LEAVE.REQUEST.APPROVED.DELETE';

    static HR_LEAVE_REQUEST_CLOSED_APPROVED = 'HR.LEAVE.REQUEST.CLOSED.APPROVED.ADD';
    static HR_LEAVE_REQUEST_CLOSED_APPROVED_EDIT = 'HR.LEAVE.REQUEST.CLOSED.APPROVED.EDIT';
    static HR_LEAVE_REQUEST_CLOSED_APPROVED_LIST = 'HR.LEAVE.REQUEST.CLOSED.APPROVED.LIST';
    static HR_LEAVE_REQUEST_CLOSED_APPROVED_DELETE = 'HR.LEAVE.REQUEST.CLOSED.APPROVED.DELETE';

    static HOD_LEAVE_REQUEST_APPROVED_ADD = 'HOD.LEAVE.REQUEST.APPROVED.ADD';
    static HOD_LEAVE_REQUEST_APPROVED_EDIT = 'HOD.LEAVE.REQUEST.APPROVED.EDIT';
    static HOD_LEAVE_REQUEST_APPROVED_LIST = 'HOD.LEAVE.REQUEST.APPROVED.LIST';
    static HOD_LEAVE_REQUEST_APPROVED_DELETE = 'HOD.LEAVE.REQUEST.APPROVED.DELETE';

    static HOD_LEAVE_REQUEST_CLOSED_APPROVED_ADD = 'HOD.LEAVE.REQUEST.CLOSED.APPROVED.ADD';
    static HOD_LEAVE_REQUEST_CLOSED_APPROVED_EDIT = 'HOD.LEAVE.REQUEST.CLOSED.APPROVED.EDIT';
    static HOD_LEAVE_REQUEST_CLOSED_APPROVED_LIST = 'HOD.LEAVE.REQUEST.CLOSED.APPROVED.LIST';
    static HOD_LEAVE_REQUEST_CLOSED_APPROVED_DELETE = 'HOD.LEAVE.REQUEST.CLOSED.APPROVED.DELETE';

    static LEAVE_CREDIT_ADD = 'LEAVE.CREDIT.ADD';
    static LEAVE_CREDIT_EDIT = 'LEAVE.CREDIT.EDIT';
    static LEAVE_CREDIT_LIST = 'LEAVE.CREDIT.LIST';
    static LEAVE_CREDIT_DELETE = 'LEAVE.CREDIT.DELETE';

    static LEAVE_REQUESTS_ADD = 'LEAVE.REQUESTS.ADD';
    static LEAVE_REQUESTS_EDIT = 'LEAVE.REQUESTS.EDIT';
    static LEAVE_REQUESTS_LIST = 'LEAVE.REQUESTS.LIST';
    static LEAVE_REQUESTS_DELETE = 'LEAVE.REQUESTS.DELETE';

    static LEAVE_REQUESTS_CLOSED_ADD = 'LEAVE.REQUESTS.CLOSED.ADD';
    static LEAVE_REQUESTS_CLOSED_EDIT = 'LEAVE.REQUESTS.CLOSED.EDIT';
    static LEAVE_REQUESTS_CLOSED_LIST = 'LEAVE.REQUESTS.CLOSED.LIST';
    static LEAVE_REQUESTS_CLOSED_DELETE = 'LEAVE.REQUESTS.CLOSED.DELETE';

    static INFORMATION_ADD = 'INFORMATION.ADD';
    static INFORMATION_EDIT = 'INFORMATION.EDIT';
    static INFORMATION_LIST = 'INFORMATION.LIST';
    static INFORMATION_DELETE = 'INFORMATION.DELETE';

    static PUBLIC_HOLIDAYS_ADD = 'PUBLIC.HOLIDAYS.ADD';
    static PUBLIC_HOLIDAYS_EDIT = 'PUBLIC.HOLIDAYS.EDIT';
    static PUBLIC_HOLIDAYS_LIST = 'PUBLIC.HOLIDAYS.LIST';
    static PUBLIC_HOLIDAYS_DELETE = 'PUBLIC.HOLIDAYS.DELETE';

    static ADDRESS_ADD = 'ADDRESSES.ADD';
    static ADDRESS_EDIT = 'ADDRESSES.EDIT';
    static ADDRESS_LIST = 'ADDRESSES.LIST';
    static ADDRESS_DELETE = 'ADDRESSES.DELETE';

    static TYPES_OF_PHONE_NUM_ADD = 'TYPES.OF.PHONE.NUM.ADD';
    static TYPES_OF_PHONE_NUM_EDIT = 'TYPES.OF.PHONE.NUM.EDIT';
    static TYPES_OF_PHONE_NUM_LIST = 'TYPES.OF.PHONE.NUM.LIST';
    static TYPES_OF_PHONE_NUM_DELETE = 'TYPES.OF.PHONE.NUM.DELETE';

    static GEO_LOC_ADD = 'GEO.LOC.ADD';
    static GEO_LOC_EDIT = 'GEO.LOC.EDIT';
    static GEO_LOC_LIST = 'GEO.LOC.LIST';
    static GEO_LOC_DELETE = 'GEO.LOC.DELETE';

    static COMPANY_INFO_ADD = 'COMPANY.INFO.ADD';
    static COMPANY_INFO_EDIT = 'COMPANY.INFO.EDIT';
    static COMPANY_INFO_LIST = 'COMPANY.INFO.LIST';
    static COMPANY_INFO_DELETE = 'COMPANY.INFO.DELETE';

    static OFFICE_LOCATION_ADD = 'OFFICE.LOCACTION.ADD';
    static OFFICE_LOCATION_EDIT = 'OFFICE.LOCACTION.EDIT';
    static OFFICE_LOCATION_LIST = 'OFFICE.LOCACTION.LIST';
    static OFFICE_LOCATION_DELETE = 'OFFICE.LOCACTION.DELETE';

    static JOB_POSITION_ADD = 'JOB.POSITION.ADD';
    static JOB_POSITION_EDIT = 'JOB.POSITION.EDIT';
    static JOB_POSITION_LIST = 'JOB.POSITION.LIST';
    static JOB_POSITION_DELETE = 'JOB.POSITION.DELETE';

    static DEPARTMENT_ADD = 'DEPARTMENT.ADD';
    static DEPARTMENT_EDIT = 'DEPARTMENT.EDIT';
    static DEPARTMENT_LIST = 'DEPARTMENT.LIST';
    static DEPARTMENT_DELETE = 'DEPARTMENT.DELETE';

    static ADD_EMPLOYEE = 'ADD.EMPLOYEE';
    static ACTIVATE_EMPLOYEE = 'ACTIVATE.EMPLOYEE';
    static DELETE_EMPLOYEE = 'DELETE.EMPLOYEE';
    static UPDATE_EMPLOYEE_PHOTO_FILE = 'UPDATE.EMPLOYEE.PHOTO.FILE';
    static EDIT_EMPLOYEE = 'EDIT.EMPLOYEE';
    static EDIT_EMLOYEE_DETAIL = 'EDIT.EMPLOYEE.DETAILS';
    static EDIT_EMPLOYEE_ADDRESS = 'EDIT.EMPLOYEE.ADDRESS';
    static EDIT_EMPLOYEE_CENSURE = 'EDIT.EMPLOYEE.CENSURE';
    static EDIT_EMPLOYEE_HISTORY = 'EDIT.EMPLOYEE.HISTORY';
    static EDIT_EMPLOYEE_LANGUAGE = 'EDIT.EMPLOYEE.LANGS';
    static EDIT_EMPLOYEE_PROF_MEMBER = 'EDIT.EMPLOYEE.PROF.MEMBER';
    static EDIT_EMPLOYEE_OTHER_MEMBER = 'EDIT.EMPLOYEE.OTHER.MEMBER';
    static EDIT_EMPLOYEE_MILITARY_SERVICE = 'EDIT.EMPLOYEE.MILITARY.SERVICE';
    static EDIT_EMPLOYEE_PHONE = 'EDIT.EMPLOYEE.PHONES';
    static EDIT_EMPLOYEE_PROGRESS = 'EDIT.EMPLOYEE.PROGRESS';
    static EDIT_EMPLOYEE_QUALIFICATION = 'EDIT.EMPLOYEE.QUALIFICATION';
    static EDIT_EMPLOYEE_RELATIONS = 'EDIT.EMPLOYEE.RELATIONS';
    static EDIT_EMPLOYEE_SCHOOLS = 'EDIT.EMPLOYEE.SCHOOLS';
    static EDIT_EMPLOYEE_SKILLS = 'EDIT.EMPLOYEE.SKILLS';
    static EDIT_EMPLOYEE_PHOTO = 'EDIT.EMPLOYEE.PHOTO';
    static EDIT_EMPLOYEE_EXIT = 'EDIT.EMPLOYEE.EXIT';
    static EDIT_EMPLOYEE_CONFIRM = 'EDIT.EMPLOYEE.CONFIRM';
    static PRINT_EMPLOYEES = 'PRINT.EMPLOYEES';
    static ADD_LOGIN = 'ADD.LOGIN';
    static EDIT_LOGIN = 'EDIT.LOGIN';
    static DELETE_LOGIN = 'DELETE.LOGIN';
    static EDIT_COA_ADMIN_HR = 'EDIT.COA.ADMIN';
    static EDIT_EMPLOYEE_BANK = 'EDIT.EMPLOYEE.BANK';
    static DELETE_EMPLOYEE_4RM_PAYROOL = 'DELETE.EMPLOYEE.4RM.PAYROLL';
    static ADD_EMPLOYEE_TO_PAYROLL = 'ADD.EMPLOYEE.TO.PAYROLL';


    //finance

    static ADD_GL_JV = 'GL.JV.ADD';
    static EDIT_GL_JV = 'GL.JV.EDIT';
    static LIST_GL_JV = 'GL.JV.LIST';
    static DELETE_GL_JV = 'GL.JV.DELETE';
    static CHECK_GL_JV = 'GL.JV.CHECK';
    static POST_GL_JV = 'GL.JV.POST';
    static ADD_ECONOMIC_BUDGET = 'ADD.ECONOMIC.BUDGET';
    static EDIT_ECONOMIC_BUDGET = 'EDIT.ECONOMIC.BUDGET';
    static ECONOMIC_BUDGET_CONTROL_LIST = 'ECONOMIC.BUDGET.CONTROL.LIST';
    static PROGRAMME_BUDGET_CONTROL_LIST = 'PROGRAMME.BUDGET.CONTROL.LIST';
    static COMMIT_PAYMENT_APPROVAL = 'COMMIT.PAYMENT.APPROVAL';
    static POST_TO_GL = 'POST.TP.GL';
    static DELETE_ECONOMIC_BUDGET = 'DELETE.ECONOMIC.BUDGET';
    static ADD_PROGRAMME_BUDGET = 'ADD.PROGRAMME.BUDGET';
    static EDIT_PROGRAMME_BUDGET = 'EDIT.PROGRAMME.BUDGET';
    static DELETE_PROGRAMME_BUDGET = 'DELETE.PROGRAMME.BUDGET';
    static JV_DETAILS_ADD = 'GL.JV.ADD.DETAILS';
    static JV_DETAILS_EDIT = 'GL.JV.EDIT.DETAILS';
    static JV_DETAILS_DELETE = 'GL.JV.DELETE.DETAILS';
    static TRAIL_BALANCE_LIST = 'TRAIL.BALANCE.LIST';
    static TRAIL_BALANCE_NOTES_ADD = 'TRAIL.BALANCE.NOTE.CREATE';
    static NOTES_MASTER_LIST = 'NOTES.MASTER.LIST';
    static NOTES_MASTER_NOTE_ADD = 'NOTES.MASTER.NOTE.CREATE';
    static JV_LEDGER_LIST = 'JV.LEDGER.REPORT.LIST';

    //inventory

    static AUTO_UPDATE_FUNCTION_LIST = 'AUTO.UPDATE.FUNCS';
    static DELETE_BUTTON_MAINTENANCE_FORM = 'MAINTCE.DEL';
    static EDIT_BUTTON_MAINTENANCE_FORM = 'MAINTENANCE.EDIT';
    static DELETE_BUTTON_TRANSACTION_FORM = 'TRANSACTION.DEL';
    static EDIT_BUTTON_TRANSACTION_FORM = 'TRANSSACTION.EDIT';
    static USERS_ACCOUNTS = 'USERS';
    static USERS_GROUPS = 'USERS.GROUPS';
    static EDIT_INVENTORY_CATEGORIES = 'EDIT.INVENTORY.CATEGORIES';


    static STORE_SETUP_ITEMS_ADD = 'ITEMS.ADD';
    static STORE_SETUP_ITEMS_EDIT = 'ITEMS.EDIT';
    static STORE_SETUP_ITEMS_LIST = 'ITEMS.LIST';
    static STORE_SETUP_ITEMS_DELETE = 'ITEMS.DELETE';

    static STORE_SETUP_CATEGORIES_ADD = 'CATEGORIES.ADD';
    static STORE_SETUP_CATEGORIES_EDIT = 'CATEGORIES.EDIT';
    static STORE_SETUP_CATEGORIES_LIST = 'CATEGORIES.LIST';
    static STORE_SETUP_CATEGORIES_DELETE = 'CATEGORIES.DELETE';

    static STORE_SETUP_STORES_ADD = 'STORES.ADD';
    static STORE_SETUP_STORES_EDIT = 'STORES.EDIT';
    static STORE_SETUP_STORES_LIST = 'STORES.LIST';
    static STORE_SETUP_STORES_DELETE = 'STORES.DELETE';

    static STORE_SETUP_UNIT_OF_MEASURES_ADD = 'UNIT.OF.MEASURES.ADD';
    static STORE_SETUP_UNIT_OF_MEASURES_EDIT = 'UNIT.OF.MEASURES.EDIT';
    static STORE_SETUP_UNIT_OF_MEASURES_LIST = 'UNIT.OF.MEASURES.LIST';
    static STORE_SETUP_UNIT_OF_MEASURES_DELETE = 'UNIT.OF.MEASURES.DELETE';

    static SRV_PURCHASE_INVOICE_LIST = 'SRV.PURCHASE.INVOICE.LIST';
    static SRV_PURCHASE_RETURN_LIST = 'SRV.PURCHASE.RETURN.LIST';
    static SALES_INVOICE_LIST = 'SALES.INVOICE.LIST';
    static SALES_RETURN_BY_CUSTOMER_LIST = 'SALES.RETURN.BY.CUSTOMER.LIST';
    static STV_STORE_TRANSFER_LIST = 'STV.STORE.TRANSFER.LIST';
    static STORE_ADJUSTMENT_LIST = 'STORE.ADJUSTMENT.LIST';
    static DONATION_LIST = 'TRANSACTION.DONATION.LIST';

    static BIN_CARD_LIST = 'BIN.CARD.LIST';
    static INVENTORY_LEDGER_LIST = 'INVENTORY.LEDGER.LIST';
    static QUALITY_BALANCE_LIST = 'QUALITY.BALANCE.LIST';
    static OFF_LEVEL_LIST = 'OFF.LEVEL.LIST';

    static PV_VOUCHER_DETAILS_ADD = 'PV.VOUCHER.DETAILS.ADD';
    static PV_VOUCHER_DETAILS_LIST = 'PV.VOUCHER.DETAILS.LIST';
    static PV_VOUCHER_SCHEDULE_PAYEE_EMPLOYEES_ADD = 'PV.VOUCHER.SCHEDULE_PAYEE_EMPLOYEES.ADD';
    static PV_VOUCHER_SCHEDULE_ECONOMIC_CODE_ADD = 'PV.VOUCHER.SCHEDULE_ECONOMIC_CODE.ADD';
    static PV_VOUCHER_EDIT = 'PV.VOUCHER.EDIT';
    static PV_VOUCHER_SCHEDULE_PAYEE_ECONOMIC_CODES_ADD = 'PV.VOUCHER.SCHEDULE_PAYEE.ECONOMIC_CODES.ADD';
    static PV_VOUCHER_CHANGE_STATUS = 'PV.VOUCHER.CHANGE_STATUS';
    static PV_VOUCHER_EXPORT_PDF = 'PV.VOUCHER.EXPORT.PDF';
    static PV_VOUCHER_DELETE = 'PV.VOUCHER.DELETE';
    static MANDATE_LIST = 'MANDATE.LIST';
    static MANDATE_ADD = 'MANDATE.ADD';
    static MANDATE_EDIT = 'MANDATE.EDIT';
    static MANDATE_DELETE = 'MANDATE.DELETE';
    static MANDATE_CHANGE_STATUS = 'MANDATE.CHANGE_STATUS';
    static MANDATE_POST = 'MANDATE.POST';
    static RETIRE_VOUCHER_EDIT_LIABILITY = 'RETIRE.VOUCHER.EDIT.LIABILITY';
    static RETIRE_VOUCHER_CHANGE_STATUS = 'RETIRE.VOUCHER.CHANGE_STATUS';
    static RETIRE_VOUCHER_POST = 'RETIRE.VOUCHER.POST';
    static RV_LIST = 'RV.LIST';
    static RV_ADD = 'RV.ADD';
    static RV_DETAILS_EDIT = 'RV.DETAILS.EDIT';
    static RV_CLOSE = 'RV.CLOSE';
    static RV_POST = 'RV.POST';
    static RV_DELETE = 'RV.DELETE';
    static RV_PDF_DOWNLOAD = 'RV.PDF.DOWNLOAD';
    static RV_SCHEDULE_PAYER_EMPLOYEE = 'RV.SCHEDULE.PAYER_EMPLOYEE';
    static RV_SCHEDULE_ECONOMIC_CODE = 'RV.SCHEDULE.ECONOMIC_CODE';
    static RV_SCHEDULE_PAYER_EMPLOYEE_ECONOMIC_CODE_EDIT = 'RV.SCHEDULE.PAYER_EMPLOYEE.ECONOMIC_CODE.EDIT';
    static PAYMENT_APPROVAL_LIST = 'PAYMENT.APPROVAL.LIST';
    static PAYMENT_APPROVAL_ADD = 'PAYMENT.APPROVAL.ADD';
    static PAYMENT_APPROVAL_EDIT = 'PAYMENT.APPROVAL.EDIT';
    static PAYMENT_APPROVAL_CHECK = 'PAYMENT.APPROVAL.CHECK';
    static PAYMENT_APPROVAL_APPROVE = 'PAYMENT.APPROVAL.APPROVE';
    static PAYMENT_APPROVAL_SCHEDULE_PAYEE_EMPLOYEE = 'PAYMENT.APPROVAL.SCHEDULE.PAYEE_EMPLOYEE';
    static PAYMENT_APPROVAL_SCHEDULE_PAYEE_EMPLOYEE_EDIT = 'PAYMENT.APPROVAL.SCHEDULE.PAYEE_EMPLOYEE.EDIT';
    static PAYMENT_APPROVAL_SCHEDULE_PAYEE_EMPLOYEE_DELETE = 'PAYMENT.APPROVAL.SCHEDULE.PAYEE_EMPLOYEE.DELETE';
    static PYA_ADD = 'PYA.ADD';
    static PYA_LIST = 'PYA.LIST';
    static PYA_EDIT = 'PYA.EDIT';
    static PYA_DELETE = 'PYA.DELETE';
    static PYA_CLOSE = 'PYA.CLOSE';
    static PYA_POST = 'PYA.POST';
    static VSU_LIST = 'VSU.LIST';
    static VSU_ADD = 'VSU.ADD';
    static VSU_EDIT = 'VSU.EDIT';
    static VSU_MARKED_PERSONAL_ADVANCED_UNIT = 'VSU.MARKED.PERSONAL_ADVANCED_UNIT';
    static CASHBOOK_LIST = 'CASHBOOK.LIST';
    static CASHBOOK_ADD = 'CASHBOOK.ADD';
    static CASHBOOK_EDIT = 'CASHBOOK.EDIT';
    static CASHBOOK_DELETE = 'CASHBOOK.DELETE';
    static DEFAULT_SETTINGS_EDIT = 'DEFAULT.SETTINGS.EDIT';
    static REPORTS_TREASURY_PV_VIEW_REPORTS = 'REPORTS.TREASURY.PV.VIEW.REPORTS';
    static REPORTS_TREASURY_PV_ADD_COLUMNS = 'REPORTS.TREASURY.PV.ADD_COLUMNS';
    static REPORTS_TREASURY_PV_DOWNLOAD_REPORT = 'REPORTS.TREASURY.PV.DOWNLOAD_REPORT';
    static REPORTS_TREASURY_PV_CLOSE_OPEN_REPORTS = 'REPORTS.TREASURY.PV.CLOSE_OPEN_REPORTS';
    static REPORTS_TREASURY_PV_OPEN_ALL_REPORTS = 'REPORTS.TREASURY.PV.OPEN_ALL_REPORTS';
    static REPORTS_TREASURY_RV_VIEW_REPORTS = 'REPORTS.TREASURY.RV.VIEW.REPORTS';
    static REPORTS_TREASURY_RV_ADD_COLUMNS = 'REPORTS.TREASURY.RV.ADD_COLUMNS';
    static REPORTS_TREASURY_RV_DOWNLOAD_REPORT = 'REPORTS.TREASURY.RV.DOWNLOAD_REPORT';
    static REPORTS_TREASURY_RV_CLOSE_OPEN_REPORTS = 'REPORTS.TREASURY.RV.CLOSE_OPEN_REPORTS';
    static REPORTS_TREASURY_RV_OPEN_ALL_REPORTS = 'REPORTS.TREASURY.RV.OPEN_ALL_REPORTS';
    static REPORTS_TREASURY_SUMMARY_NON_PERSONAL_ADVANCES_VIEW_DEPARTMENT_REPORT = 'REPORTS.TREASURY.SUMMARY_NON_PERSONAL_ADVANCES.VIEW_DEPARTMENT_REPORT';
    static REPORTS_TREASURY_SUMMARY_NON_PERSONAL_ADVANCES_VIEW_EMPLOYEE_REPORT = 'REPORTS.TREASURY.SUMMARY_NON_PERSONAL_ADVANCES.VIEW_EMPLOYEE_REPORT';
    static REPORTS_TREASURY_SUMMARY_PERSONAL_ADVANCES_VIEW_DEPARTMENT_REPORT = 'REPORTS.TREASURY.SUMMARY_PERSONAL_ADVANCES.VIEW_DEPARTMENT_REPORT';
    static REPORTS_TREASURY_SUMMARY_PERSONAL_ADVANCES_VIEW_EMPLOYEE_REPORT = 'REPORTS.TREASURY.SUMMARY_PERSONAL_ADVANCES.VIEW_EMPLOYEE_REPORT';
    static REPORTS_TREASURY_SUMMARY_STANDING_IMPREST_VIEW_DEPARTMENT_REPORT = 'REPORTS.TREASURY.SUMMARY_STANDING_IMPREST.VIEW_DEPARTMENT_REPORT';
    static REPORTS_TREASURY_SUMMARY_STANDING_IMPREST_VIEW_EMPLOYEE_REPORT = 'REPORTS.TREASURY.SUMMARY_STANDING_IMPREST.VIEW_EMPLOYEE_REPORT';
    static REPORTS_TREASURY_SUMMARY_SPECIAL_IMPREST_VIEW_DEPARTMENT_REPORT = 'REPORTS.TREASURY.SUMMARY_SPECIAL_IMPREST.VIEW_DEPARTMENT_REPORT';
    static REPORTS_TREASURY_SUMMARY_SPECIAL_IMPREST_VIEW_EMPLOYEE_REPORT = 'REPORTS.TREASURY.SUMMARY_SPECIAL_IMPREST.VIEW_EMPLOYEE_REPORT';
    static REPORTS_TREASURY_SUMMARY_ADVANCE_LEDGER_VIEW_REPORT = 'REPORTS.TREASURY.SUMMARY_ADVANCE_LEDGER.VIEW_REPORT';
    static BUDGET_CONTROL_AIE_ADD = 'BUDGET.CONTROL.AIE.ADD';
    static BUDGET_CONTROL_AIE_SEARCH = 'BUDGET.CONTROL.AIE.SEARCH';
    static BUDGET_CONTROL_AIE_EDIT = 'BUDGET.CONTROL.AIE.EDIT';
    static BUDGET_CONTROL_AIE_DELETE = 'BUDGET.CONTROL.AIE.DELETE';
    static GL_JV_CREATE = 'GL.JV.CREATE';
    static GL_JV_ADD_DETAILS = 'GL.JV.ADD.DETAILS';
    static GL_JV_EDIT = 'GL.JV.EDIT';
    static GL_JV_DELETE = 'GL.JV.DELETE';
    static BUDGET_CONTROL_ECONOMIC_ADD = 'BUDGET.CONTROL.ECONOMIC.ADD';
    static BUDGET_CONTROL_ECONOMIC_EDIT = 'BUDGET.CONTROL.ECONOMIC.EDIT';
    static BUDGET_CONTROL_ECONOMIC_VIEW_LIST = 'BUDGET.CONTROL.ECONOMIC.VIEW_LIST';
    static BUDGET_CONTROL_ECONOMIC_DELETE = 'BUDGET.CONTROL.ECONOMIC.DELETE';
    static BUDGET_CONTROL_PROGRAMME_ADD = 'BUDGET.CONTROL.PROGRAMME.ADD';
    static BUDGET_CONTROL_PROGRAMME_EDIT = 'BUDGET.CONTROL.PROGRAMME.EDIT';
    static BUDGET_CONTROL_PROGRAMME_VIEW = 'BUDGET.CONTROL.PROGRAMME.VIEW';
    static BUDGET_CONTROL_PROGRAMME_DELETE = 'BUDGET.CONTROL.PROGRAMME.DELETE';
    static SETUP_CURRENCIES_ADD = 'SETUP.CURRENCIES.ADD';
    static SETUP_CURRENCIES_EDIT = 'SETUP.CURRENCIES.EDIT';
    static SETUP_CURRENCIES_DELETE = 'SETUP.CURRENCIES.DELETE';
    static SETUP_BANKS_ADD = 'SETUP.BANKS.ADD';
    static SETUP_BANKS_EDIT = 'SETUP.BANKS.EDIT';
    static SETUP_BANKS_DELETE = 'SETUP.BANKS.DELETE';
    static SETUP_BANKS_MARK_ACTIVE_INACTIVE = 'SETUP.BANKS.MARK_ACTIVE_INACTIVE';
    static SETUP_BANKS_ADD_BRANCH = 'SETUP.BANKS.ADD_BRANCH';
    static SETUP_BANKS_EDIT_BRANCH = 'SETUP.BANKS.EDIT_BRANCH';
    static SETUP_BANKS_DELETE_BRANCH = 'SETUP.BANKS.DELETE_BRANCH';
    static SETTINGS_COMPANY_INFO_VIEW = 'SETTINGS.COMPANY.INFO.VIEW';
    static SETTINGS_COMPANY_INFO_CHANGE_STATUS_AUTO_POSTED_JV = 'SETTINGS.COMPANY.INFO.CHANGE_STATUS_AUTO_POSTED_JV';
    static SETTINGS_COMPANY_INFO_CHANGE_STATUS_PAYMENT_APPROVAL_REQUIRED = 'SETTINGS.COMPANY.INFO.CHANGE_STATUS_PAYMENT_APPROVAL_REQUIRED';
    static SETTINGS_COMPANY_INFO_CHANGE_STATUS_DEFAULT_STATUS_AUTO_POSTED_JV = 'SETTINGS.COMPANY.INFO.CHANGE_STATUS.DEFAULT_STATUS_AUTO_POSTED_JV';
    static REPORTS_FINANCE_TRIAL_BALANCE_VIEW_REPORT = 'REPORTS.FINANCE.TRIAL_BALANCE.VIEW.REPORT';
    static REPORTS_FINANCE_TRIAL_BALANCE_CREATE_NOTE = 'REPORTS.FINANCE.TRIAL_BALANCE.CREATE.NOTE';
    static REPORTS_FINANCE_NOTES_MASTER_VIEW_REPORT = 'REPORTS.FINANCE.NOTES_MASTER.VIEW.REPORT';
    static REPORTS_FINANCE_NOTES_MASTER_DOWNLOAD_REPORT = 'REPORTS.FINANCE.NOTES_MASTER.DOWNLOAD.REPORT';
    static REPORTS_FINANCE_NOTES_MASTER_ADD_NOTES = 'REPORTS.FINANCE.NOTES_MASTER.ADD.NOTES';
    static REPORTS_FINANCE_NOTES_MASTER_RESET_NOTES = 'REPORTS.FINANCE.NOTES_MASTER.RESET_NOTES';
    static REPORTS_FINANCE_JV_LEDGER_VIEW_REPORT = 'REPORTS.FINANCE.JV_LEDGER.VIEW.REPORT';
    static REPORTS_FINANCE_JV_LEDGER_SIBLING_VIEW_REPORT = 'REPORTS.FINANCE.JV_LEDGER_SIBLING.VIEW.REPORT';
    static REPORTS_JV_LEDGER_REPORT_STATEMENT_OF_POSTION = 'REPORTS_JV_LEDGER_REPORT_STATEMENT_OF_POSTION';
    static REPORTS_JV_LEDGER_REPORT_FINANCIAL_PERFORMANCE = 'REPORTS_JV_LEDGER_REPORT_FINANCIAL_PERFORMANCE';
    static REPORTS_JV_LEDGER_MONTHLY_ACTIVITY = 'REPORTS.FINANCE.JV_LEDGER_MONTHLY_ACTIVITY';
    static REPORTS_FINANCE_IFR_NOTES_MASTER = 'REPORTS.FINANCE.IFR_NOTES_MASTER';
}
