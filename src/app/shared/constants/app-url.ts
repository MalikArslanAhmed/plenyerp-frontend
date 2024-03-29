import { environment } from '../../../environments/environment';
import { Injectable } from '@angular/core';

@Injectable()
export class AppUrl {
    static get API_URL(): string {
        return environment.appUrl + 'api/';
    }

    static get APP_URL(): string {
        return environment.appUrl + 'admin/';
    }

    static get VERIFY_USER(): string {
        return AppUrl.APP_URL + 'verify-user';
    }

    static get AUTH(): string {
        return AppUrl.API_URL + 'authenticate';
    }

    static get SELF(): string {
        return AppUrl.API_URL + 'self';
    }


    static ROLES(mId, roleId?): string {
        if (roleId) {
            return AppUrl.API_URL + 'user/' + mId + '/role/' + roleId;
        } else {
            return AppUrl.API_URL + 'user/' + mId + '/role';
        }
    }

    static GET_ROLES(id): string {
        return AppUrl.API_URL + `users/` + id;
    }

    static DELETE_ROLE(mId, roleId): string {
        return AppUrl.API_URL + 'user/' + mId + '/role/' + roleId;
    }

    static GET_AVAILABLE_ROLES(): string {
        return AppUrl.API_URL + `roles`;
    }


    static MANAGERS(id?): string {
        if (id) {
            return AppUrl.API_URL + 'users/' + id;
        } else {
            return AppUrl.API_URL + 'users';
        }
    }

    static GET_MANAGERS(): string {
        return AppUrl.API_URL + `users`;
    }

    static DELETE_MANAGER(id?): string {
        return AppUrl.API_URL + 'users/' + id;
    }

    static QUALIFICATION(id?): string {
        if (id) {
            return AppUrl.API_URL + 'qualifications/' + id;
        } else {
            return AppUrl.API_URL + 'qualifications';
        }
    }

    static STORE_SETUP_STORES(id?): string {
        if (id) {
            return AppUrl.API_URL + 'stores/' + id;
        } else {
            return AppUrl.API_URL + 'stores';
        }
    }

    static STORE_SETUP_ITEMS(id?): string {
        if (id) {
            return AppUrl.API_URL + 'inventory-items/' + id;
        } else {
            return AppUrl.API_URL + 'inventory-items';
        }
    }

    static STORE_SETUP_UNIT_OF_MEASURES(id?): string {
        if (id) {
            return AppUrl.API_URL + 'measurements/' + id;
        } else {
            return AppUrl.API_URL + 'measurements';
        }
    }

    static GET_QUALIFICATIONS(): string {
        return AppUrl.API_URL + `qualifications`;
    }

    static GET_COMPANIES(): string {
        return AppUrl.API_URL + `companies?isCustomer=1`;
    }

    static GET_TAXES(): string {
        return AppUrl.API_URL + `taxes`;
    }

    static GET_STORE_SETUP_STORES(): string {
        return AppUrl.API_URL + `stores`;
    }

    static GET_STORE_SETUP_ITEMS(): string {
        return AppUrl.API_URL + `inventory-items`;
    }

    static GET_STORE_SETUP_UNIT_OF_MEASURES(): string {
        return AppUrl.API_URL + `measurements`;
    }

    static DELETE_QUALIFICATION(id?): string {
        return AppUrl.API_URL + 'qualifications/' + id;
    }

    static DELETE_STORE_SETUP_STORE(id?): string {
        return AppUrl.API_URL + 'stores/' + id;
    }

    static DELETE_STORE_SETUP_UNIT_OF_MEASURES(id?): string {
        return AppUrl.API_URL + 'measurements/' + id;
    }

    static DELETE_STORE_SETUP_ITEMS(id?): string {
        return AppUrl.API_URL + 'inventory-items/' + id;
    }

    static SKILL(id?): string {
        if (id) {
            return AppUrl.API_URL + 'skills/' + id;
        } else {
            return AppUrl.API_URL + 'skills';
        }
    }

    static GET_SKILLS(): string {
        return AppUrl.API_URL + `skills`;
    }

    static DELETE_SKILL(id?): string {
        return AppUrl.API_URL + 'skills/' + id;
    }

    static GET_WORK_LOCATIONS(): string {
        return AppUrl.API_URL + `work-locations`;
    }

    static GET_ALL_WORK_LOCATIONS(): string {
        return AppUrl.API_URL + `work-locations/all`;
    }

    static GET_STORE_SETUP_CATEGORIES(): string {
        return AppUrl.API_URL + `inventory-categories`;
    }

    static STORE_SETUP_CATEGORIES(id?): string {
        if (id) {
            return AppUrl.API_URL + `inventory-categories/` + id;
        } else {
            return AppUrl.API_URL + `inventory-categories`;
        }
    }

    static GET_JOB_LOCATIONS(): string {
        return AppUrl.API_URL + `job-positions`;
    }

    static GET_COUNTRIES(): string {
        return AppUrl.API_URL + `countries`;
    }

    static GET_REGIONS(): string {
        return AppUrl.API_URL + `regions`;
    }

    static GET_STATES(): string {
        return AppUrl.API_URL + `states`;
    }

    static GET_LGAS(): string {
        return AppUrl.API_URL + `lgas`;
    }

    static GET_DESIGNATIONS(): string {
        return AppUrl.API_URL + `designations`;
    }

    static WORK_LOCATIONS(id?): string {
        if (id) {
            return AppUrl.API_URL + `work-locations/` + id;
        } else {
            return AppUrl.API_URL + `work-locations`;
        }
    }

    static JOB_POSITIONS(id?): string {
        if (id) {
            return AppUrl.API_URL + `job-positions/` + id;
        } else {
            return AppUrl.API_URL + `job-positions`;
        }
    }

    static EDIT_EMPLOYEE_PROFILE_PIC(id?): string {
        return AppUrl.API_URL + `employees/` + id;
    }

    static ADD_UPDATE_EMPLOYEE(id?): string {
        if (id) {
            return AppUrl.API_URL + `employees/` + id;
        } else {
            return AppUrl.API_URL + `employees`;
        }
    }

    static ADD_UPDATE_PERSONAL_DETAILS(id?): string {
        if (id) {
            return AppUrl.API_URL + `employees/` + id + '/details';
        }
    }

    static ADD_UPDATE_JOB_POSITIONS(id?): string {
        if (id) {
            return AppUrl.API_URL + `employees/` + id + '/job-profile';
        }
    }

    static ADD_UPDATE_CONTACT_DETAILS(id?): string {
        if (id) {
            return AppUrl.API_URL + `employees/` + id + '/location';
        }
    }

    static ADD_UPDATE_PROGRESSION(id?): string {
        if (id) {
            return AppUrl.API_URL + `employees/` + id + '/progression';
        }
    }

    static ADD_UPDATE_ID_NOS(id?): string {
        if (id) {
            return AppUrl.API_URL + `employees/` + id + '/id-nos';
        }
    }

    static SET_EMPLOYEE_STATUS(): string {
        return AppUrl.API_URL + `employees/status`;
    }

    static DELETE_JOB_POSTIONS(id): string {
        return AppUrl.API_URL + `job-positions/` + id;
    }

    static DELETE_SETUP_CATEGORIES(id): string {
        return AppUrl.API_URL + `inventory-categories/` + id;
    }

    static DELETE_WORK_LOCATION(id): string {
        return AppUrl.API_URL + `work-locations/` + id;
    }

    static COUNTRIES(id?): string {
        if (id) {
            return AppUrl.API_URL + 'countries/' + id;
        } else {
            return AppUrl.API_URL + 'countries';
        }
    }

    static REGIONS(id?): string {
        if (id) {
            return AppUrl.API_URL + 'regions/' + id;
        } else {
            return AppUrl.API_URL + 'regions';
        }
    }

    static STATES(id?): string {
        if (id) {
            return AppUrl.API_URL + 'states/' + id;
        } else {
            return AppUrl.API_URL + 'states';
        }
    }

    static LGAS(id?): string {
        if (id) {
            return AppUrl.API_URL + 'lgas/' + id;
        } else {
            return AppUrl.API_URL + 'lgas';
        }
    }

    static ADDRESS_TYPE(id?): string {
        if (id) {
            return AppUrl.API_URL + 'address-type/' + id;
        } else {
            return AppUrl.API_URL + 'address-type';
        }
    }

    static PHONE_TYPE(id?): string {
        if (id) {
            return AppUrl.API_URL + 'phone-type/' + id;
        } else {
            return AppUrl.API_URL + 'phone-type';
        }
    }

    static DELETE_COUNTRY(id?): string {
        return AppUrl.API_URL + 'countries/' + id;
    }

    static DELETE_REGION(id?): string {
        return AppUrl.API_URL + 'regions/' + id;
    }

    static DELETE_STATE(id?): string {
        return AppUrl.API_URL + 'states/' + id;
    }

    static DELETE_LGA(id?): string {
        return AppUrl.API_URL + 'lgas/' + id;
    }

    static DELETE_ADDRESS_TYPE(id?): string {
        return AppUrl.API_URL + 'address-type/' + id;
    }

    static DELETE_PHONE_TYPE(id?): string {
        return AppUrl.API_URL + 'phone-type/' + id;
    }

    static LANGUAGES(id?): string {
        if (id) {
            return AppUrl.API_URL + 'languages/' + id;
        } else {
            return AppUrl.API_URL + 'languages';
        }
    }

    static GET_LANGUAGES(): string {
        return AppUrl.API_URL + `languages`;
    }

    static DELETE_LANGUAGE(id?): string {
        return AppUrl.API_URL + 'languages/' + id;
    }

    static SCHEDULES(id?): string {
        if (id) {
            return AppUrl.API_URL + 'schedules/' + id;
        } else {
            return AppUrl.API_URL + 'schedules';
        }
    }

    static GET_SCHEDULES(): string {
        return AppUrl.API_URL + `schedules`;
    }

    static DELETE_SCHEDULE(id?): string {
        return AppUrl.API_URL + 'schedules/' + id;
    }

    static ACAMEDIC_MAJOR(id?): string {
        if (id) {
            return AppUrl.API_URL + 'academics/' + id;
        } else {
            return AppUrl.API_URL + 'academics';
        }
    }

    static GET_ACAMEDIC_MAJORS(): string {
        return AppUrl.API_URL + `academics`;
    }

    static DELETE_ACAMEDIC_MAJOR(id?): string {
        return AppUrl.API_URL + 'academics/' + id;
    }

    static RELATIONSHIP(id?): string {
        if (id) {
            return AppUrl.API_URL + 'relationships/' + id;
        } else {
            return AppUrl.API_URL + 'relationships';
        }
    }

    static GET_RELATIONSHIPS(): string {
        return AppUrl.API_URL + `relationships`;
    }

    static DELETE_RELATIONSHIP(id?): string {
        return AppUrl.API_URL + 'relationships/' + id;
    }

    static DOWNLOAD_REPORT(): string {
        return AppUrl.API_URL + `employees/report-download`;
    }

    static DOWNLOAD_NOTES_MASTER_REPORT(): string {
        return AppUrl.API_URL + `download/notes`;
    }


    static DELETE_NOTES(): string {
        return AppUrl.API_URL + `finance/notes`;
    }

    static GET_EMPLOYEES(): string {
        return AppUrl.API_URL + `employees`;
    }

    static DELETE_EMPLOYEES(id): string {
        return AppUrl.API_URL + `employees/` + id;
    }

    static GET_EMPLOYEE_JOB_PROFILE(): string {
        return AppUrl.API_URL + `employees-job-profiles`;
    }

    static GET_EMPLOYEES_DETAILS_DOWNLOAD(id): string {
        return AppUrl.API_URL + `employee/` + id + `/details-download`;
    }

    static GET_APPOINTMENTS_TYPE(): string {
        return AppUrl.API_URL + `type-of-appointments`;
    }

    static GET_COUNTRY_CODE(): string {
        return AppUrl.API_URL + `country-codes`;
    }

    static GET_RELIGIONS(): string {
        return AppUrl.API_URL + `religions`;
    }

    static GET_MARITIAL_STATUS(): string {
        return AppUrl.API_URL + `marriages`;
    }

    static CATEGORY(id?): string {
        if (id) {
            return AppUrl.API_URL + 'categories/' + id;
        } else {
            return AppUrl.API_URL + 'categories';
        }
    }

    static GET_CATEGORIES(): string {
        return AppUrl.API_URL + `categories`;
    }

    static DELETE_CATEGORY(id?): string {
        return AppUrl.API_URL + 'categories/' + id;
    }

    static STATUS(id?): string {
        if (id) {
            return AppUrl.API_URL + 'status/' + id;
        } else {
            return AppUrl.API_URL + 'status';
        }
    }

    static GET_STATUSES(): string {
        return AppUrl.API_URL + `status`;
    }

    static DELETE_STATUS(id?): string {
        return AppUrl.API_URL + 'status/' + id;
    }

    static DISENGAGEMENT(id?): string {
        if (id) {
            return AppUrl.API_URL + 'disengagements/' + id;
        } else {
            return AppUrl.API_URL + 'disengagements';
        }
    }

    static GET_DISENGAGEMENTS(): string {
        return AppUrl.API_URL + `disengagements`;
    }

    static DELETE_DISENGAGEMENT(id?): string {
        return AppUrl.API_URL + 'disengagements/' + id;
    }

    static CENSURE(id?): string {
        if (id) {
            return AppUrl.API_URL + 'censures/' + id;
        } else {
            return AppUrl.API_URL + 'censures';
        }
    }

    static GET_CENSURES(): string {
        return AppUrl.API_URL + `censures`;
    }

    static CURRENCIES(id?): string {
        if (id) {
            return AppUrl.API_URL + `currencies/` + id;
        } else {
            return AppUrl.API_URL + `currencies`;
        }
    }

    static PAYMENT_VOUCHER(id?): string {
        if (id) {
            return AppUrl.API_URL + `treasury/payment-vouchers/` + id;
        } else {
            return AppUrl.API_URL + `treasury/payment-vouchers`;
        }
    }

    static PAYMENT_VOUCHER_DOWNLOAD(id?): string {
        return AppUrl.API_URL + `treasury/payment-voucher/` + id + '/download';
    }

    static PAYMENT_VOUCHER_TAX_DOWNLOAD(id?): string {
        return AppUrl.API_URL + `treasury/payment-voucher-tax/` + id + '/download';
    }

    static RETIRE_VOUCHER(id?): string {
        if (id) {
            return AppUrl.API_URL + `treasury/retire-voucher` + id;
        } else {
            return AppUrl.API_URL + `treasury/retire-voucher`;
        }
    }

    static RETIRE_VOUCHER_DOWNLOAD(id?): string {
        return AppUrl.API_URL + `retire-voucher/` + id + '/download';
    }

    static RV_REPORT_DATA(id?): string {
        if (id) {
            return AppUrl.API_URL + `treasury/receipt-vouchers` + id;
        } else {
            return AppUrl.API_URL + `treasury/receipt-vouchers`;
        }
    }

    static RECEIPT_VOUCHER(id?): string {
        if (id) {
            return AppUrl.API_URL + `treasury/receipt-vouchers/` + id;
        } else {
            return AppUrl.API_URL + `treasury/receipt-vouchers`;
        }
    }

    static PREVIOUS_YEAR_ADANCES(id?): string {
        if (id) {
            return AppUrl.API_URL + `treasury/payment-vouchers/previous-advances/` + id;
        } else {
            return AppUrl.API_URL + `treasury/payment-vouchers/previous-advances`;
        }
    }

    static RV_SOURCE_UNIT_TYPE(id): string {
        return AppUrl.API_URL + `treasury/source-units/${id}/rv-types`;
    }

    static RV_VOUCHER_STATUS(): string {
        return AppUrl.API_URL + `treasury/receipt-vouchers/update-status`;
    }

    static RV_VOUCHER_DOWNLOAD(id): string {
        return AppUrl.API_URL + `treasury/receipt-voucher/` + id + '/download';
    }

    static PREVIOUS_YEAR_VOUCHER_STATUS(): string {
        return AppUrl.API_URL + `treasury/payment-vouchers/previous-advances-update`;
    }

    static SCHEDULE_PAYEES_PREVIOUS_YEAR_UPDATE(reportId?, id?): string {
        if (id && reportId) {
            return AppUrl.API_URL + `treasury/payment-vouchers/` + reportId + `/schedule-payees/` + id;
        }
    }

    static SCHEDULE_PAYEES_PREVIOUS_YEAR_DELETE(reportId?, id?): string {
        if (id && reportId) {
            return AppUrl.API_URL + `treasury/payment-vouchers/` + reportId + `/schedule-payees/` + id;
        }
    }

    static RV_SCHEDULE_PAYEES(id?): string {
        if (id) {
            return AppUrl.API_URL + `treasury/receipt-vouchers/` + id + `/schedule-payees`;
        }
    }

    static RV_SCHEDULE_PAYEES_DELETE(reportId?, id?): string {
        if (id && reportId) {
            return AppUrl.API_URL + `treasury/receipt-vouchers/` + reportId + `/schedule-payees/` + id;
        }
    }

    static RV_UPDATE_SCHEDULE_PAYEES(reportId?, id?): string {
        if (id && reportId) {
            return AppUrl.API_URL + `treasury/receipt-vouchers/` + reportId + `/schedule-payees/` + id;
        }
    }

    static SCHEDULE_PAYEES(id?): string {
        if (id) {
            return AppUrl.API_URL + `treasury/payment-vouchers/` + id + `/schedule-payees`;
        }
    }

    static SCHEDULE_PAYEES_DELETE(reportId?, id?): string {
        if (id && reportId) {
            return AppUrl.API_URL + `treasury/payment-vouchers/` + reportId + `/schedule-payees/` + id;
        }
    }

    static SCHEDULE_PAYEES_UPDATE(reportId?, id?): string {
        if (id && reportId) {
            return AppUrl.API_URL + `treasury/payment-vouchers/` + reportId + `/schedule-payees/` + id;
        }
    }

    static SCHEDULE_COMPANY_UPDATE(reportId, id?): string {
        if (reportId && id) {
            return AppUrl.API_URL + `treasury/payment-vouchers/` + reportId + `/schedule-payees/` + id;
        }
    }

    static SCHEDULE_PAYEES_PAYMENT_APPROVAL(id?): string {
        if (id) {
            return AppUrl.API_URL + `treasury/payment-approval/` + id + `/schedule-payees`;
        }
    }

    static SCHEDULE_PAYEES_PAYMENT_APPROVAL_DELETE(reportId?, id?): string {
        if (id && reportId) {
            return AppUrl.API_URL + `treasury/payment-approval/` + reportId + `/schedule-payees/` + id;
        }
    }

    static SCHEDULE_PAYEES_PAYMENT_APPROVAL_UPDATE(reportId?, id?): string {
        if (id && reportId) {
            return AppUrl.API_URL + `treasury/payment-approval/` + reportId + `/schedule-payees/` + id;
        }
    }

    static SCHEDULE_ECONOMIC(id?): string {
        if (id) {
            return AppUrl.API_URL + `treasury/payee-vouchers/` + id + `/schedule-economic`;
        }
    }

    static SCHEDULE_ECONOMIC_DELETE(reportId?, id?): string {
        if (id && reportId) {
            return AppUrl.API_URL + `treasury/payee-vouchers/` + reportId + `/schedule-economic/` + id;
        }
    }

    static LIABILITIES(): string {
        return AppUrl.API_URL + `treasury/retire-voucher`;
    }

    static GET_LIABILITIES(id) {
        return AppUrl.API_URL + `treasury/retire-voucher/` + id + `/liabilities`;
    }

    static DELETE_LIABILITIES(id?): string {
        const url = id ? '/' + id : '';
        return AppUrl.API_URL + `treasury/retire-liabilities` + url;
    }

    static RV_SCHEDULE_ECONOMIC(id?): string {
        if (id) {
            return AppUrl.API_URL + `treasury/receipt-payees/` + id + `/schedule-economic`;
        }
    }

    static RV_SCHEDULE_ECONOMIC_DELETE(reportId?, id?): string {
        if (id && reportId) {
            return AppUrl.API_URL + `treasury/receipt-payees/` + reportId + `/schedule-economic/` + id;
        }
    }

    static GET_SCHEDULE_ECONOMIC(id?): string {
        if (id) {
            return AppUrl.API_URL + `treasury/payment-vouchers/` + id + `/schedule-economic`;
        }
    }

    static RV_GET_SCHEDULE_ECONOMIC(id?): string {
        if (id) {
            return AppUrl.API_URL + `treasury/receipt-vouchers/` + id + `/schedule-economic`;
        }
    }

    static DELETE_CENSURE(id?): string {
        return AppUrl.API_URL + 'censures/' + id;
    }

    static ARM_OF_SERVICE(id?): string {
        if (id) {
            return AppUrl.API_URL + 'arm-of-services/' + id;
        } else {
            return AppUrl.API_URL + 'arm-of-services';
        }
    }

    static GET_ARM_OF_SERVICES(): string {
        return AppUrl.API_URL + `arm-of-services`;
    }

    static DELETE_ARM_OF_SERVICE(id?): string {
        return AppUrl.API_URL + 'arm-of-services/' + id;
    }

    static MEMBERSHIP(id?): string {
        if (id) {
            return AppUrl.API_URL + 'memberships/' + id;
        } else {
            return AppUrl.API_URL + 'memberships';
        }
    }

    static GET_MEMBERSHIPS(): string {
        return AppUrl.API_URL + `memberships`;
    }

    static DELETE_MEMBERSHIP(id?): string {
        return AppUrl.API_URL + 'memberships/' + id;
    }

    static SALARY_SCALES(id?): string {
        if (id) {
            return AppUrl.API_URL + 'salary-scales/' + id;
        } else {
            return AppUrl.API_URL + 'salary-scales';
        }
    }

    static GET_SALARY_SCALES(): string {
        return AppUrl.API_URL + `salary-scales`;
    }

    static DELETE_SALARY_SCALES(id?): string {
        return AppUrl.API_URL + 'salary-scales/' + id;
    }

    static GRADE_LEVEL(id?): string {
        if (id) {
            return AppUrl.API_URL + 'grade-levels/' + id;
        } else {
            return AppUrl.API_URL + 'grade-levels';
        }
    }

    static DELETE_GRADE_LEVEL(id?): string {
        return AppUrl.API_URL + 'grade-levels/' + id;
    }

    static STEP_LEVEL(id?): string {
        if (id) {
            return AppUrl.API_URL + 'grade-levels-steps/' + id;
        } else {
            return AppUrl.API_URL + 'grade-levels-steps';
        }
    }

    static DELETE_STEP_LEVEL(id?): string {
        return AppUrl.API_URL + 'grade-levels-steps/' + id;
    }

    static SEGMENT(id?): string {
        const path = id ? 'admin/' + id : 'admin';
        return AppUrl.API_URL + path;
    }

    static SEGMENT_WITH_PAGINATION(): string {
        return AppUrl.API_URL + 'admin';
    }

    static GET_COUNTRY_LIST(): string {
        return AppUrl.API_URL + `countries`;
    }

    static GET_REGION_LIST(): string {
        return AppUrl.API_URL + `regions`;
    }

    static GET_STATE_LIST(): string {
        return AppUrl.API_URL + `states`;
    }

    static GET_LGA_LIST(): string {
        return AppUrl.API_URL + `lgas`;
    }

    static GET_ADDRESS_TYPE_LIST(): string {
        return AppUrl.API_URL + `address-type`;
    }

    static GET_PHONE_TYPE_LIST(): string {
        return AppUrl.API_URL + `phone-type`;
    }

    static GET_COUNTRY(): string {
        return AppUrl.API_URL + `countries`;
    }

    static GET_REGION(): string {
        return AppUrl.API_URL + `regions`;
    }

    static GET_STATE(): string {
        return AppUrl.API_URL + `states`;
    }

    static GET_LEAVES_TYPE_LIST(): string {
        return AppUrl.API_URL + `leaves`;
    }

    static LEAVES_TYPE(id?): string {
        if (id) {
            return AppUrl.API_URL + 'leaves/' + id;
        } else {
            return AppUrl.API_URL + 'leaves';
        }
    }

    static DELETE_LEAVES(id?): string {
        return AppUrl.API_URL + 'leaves/' + id;
    }

    static GET_LEAVE_GROUP_LIST(): string {
        return AppUrl.API_URL + `leave-groups`;
    }

    static LEAVES_GROUP(id?): string {
        if (id) {
            return AppUrl.API_URL + 'leave-groups/' + id;
        } else {
            return AppUrl.API_URL + 'leave-groups';
        }
    }

    static DELETE_LEAVES_GROUP(id?): string {
        return AppUrl.API_URL + 'leave-groups/' + id;
    }

    //
    static GET_LEAVE_GROUP_MEMBER_LIST(): string {
        return AppUrl.API_URL + `leave-group-members`;
    }

    static LEAVE_GROUP_MEMBER(id?): string {
        if (id) {
            return AppUrl.API_URL + 'leave-group-members/' + id;
        } else {
            return AppUrl.API_URL + 'leave-group-members';
        }
    }

    static DELETE_LEAVE_GROUP_MEMBER(id?): string {
        return AppUrl.API_URL + 'leave-group-members/' + id;
    }
    //Leave reports URLS
    static GET_LEAVE_BALANCE_REPORT_LIST(): string {
        return AppUrl.API_URL + `leave-balance-report`;
    }

    static GET_LEAVE_SCHEDULE_REPORT_LIST(): string {
        return AppUrl.API_URL + `leave-schedule-report`;
    }

    static GET_LEAVE_REQUEST_REPORT_LIST(): string {
        return AppUrl.API_URL + `leave-request-report`;
    }
    //leave group Entitlements
    //
    static GET_LEAVE_GROUP_Entitlement_LIST(): string {
        return AppUrl.API_URL + `leave-group-entitlements`;
    }

    static LEAVE_GROUP_Entitlement(id?): string {
        if (id) {
            return AppUrl.API_URL + 'leave-group-entitlements/' + id;
        } else {
            return AppUrl.API_URL + 'leave-group-entitlements';
        }
    }

    static DELETE_LEAVE_GROUP_Entitlement(id?): string {
        return AppUrl.API_URL + 'leave-group-entitlements/' + id;
    }
    //
    //Leave Year
    static GET_LEAVE_YEAR_LIST(): string {
        return AppUrl.API_URL + `leave-years`;
    }

    static LEAVE_YEAR(id?): string {
        if (id) {
            return AppUrl.API_URL + 'leave-years/' + id;
        } else {
            return AppUrl.API_URL + 'leave-years';
        }
    }

    static DELETE_LEAVE_YEAR(id?): string {
        return AppUrl.API_URL + 'leave-years/' + id;
    }

    //Leave Year Ended

    //Leave Request
    static GET_LEAVE_REQUEST_LIST(): string {
        return AppUrl.API_URL + `leave-requests`;
    }

    static LEAVE_REQUEST(id?): string {
        if (id) {
            return AppUrl.API_URL + 'leave-requests/' + id;
        } else {
            return AppUrl.API_URL + 'leave-requests';
        }
    }

    static DELETE_LEAVE_REQUEST(id?): string {
        return AppUrl.API_URL + 'leave-requests/' + id;
    }

    //Leave Request Ended

    //Leave Request Closed
    static GET_LEAVE_REQUEST_CLOSED_LIST(): string {
        return AppUrl.API_URL + `leave-requests-closed`;
    }

    static LEAVE_REQUEST_CLOSED(id?): string {
        if (id) {
            return AppUrl.API_URL + 'leave-requests-closed/' + id;
        } else {
            return AppUrl.API_URL + 'leave-requests-closed';
        }
    }

    static DELETE_LEAVE_REQUEST_CLOSED(id?): string {
        return AppUrl.API_URL + 'leave-requests-closed/' + id;
    }

    //Leave Request Closed Ended

    //Leave Entitlement Salary Scale
    static GET_LEAVE_ENTITLEMENT_SALARY_SCALE_LIST(): string {
        return AppUrl.API_URL + `leave-entitlement-salary-scales`;
    }

    static LEAVE_ENTITLEMENT_SALARY_SCALE(id?): string {
        if (id) {
            return AppUrl.API_URL + 'leave-entitlement-salary-scales/' + id;
        } else {
            return AppUrl.API_URL + 'leave-entitlement-salary-scales';
        }
    }

    static DELETE_LEAVE_ENTITLEMENT_SALARY_SCALE(id?): string {
        return AppUrl.API_URL + 'leave-entitlement-salary-scales/' + id;
    }
    //Leave Entitlement Salary Scale

    //Leave Entitlement Grade Level
    static GET_LEAVE_ENTITLEMENT_GRADE_LEVEL_LIST(): string {
        return AppUrl.API_URL + `leave-entitlement-grade-levels`;
    }

    static LEAVE_ENTITLEMENT_GRADE_LEVEL(id?): string {
        if (id) {
            return AppUrl.API_URL + 'leave-entitlement-grade-levels/' + id;
        } else {
            return AppUrl.API_URL + 'leave-entitlement-grade-levels';
        }
    }

    static DELETE_LEAVE_ENTITLEMENT_GRADE_LEVEL(id?): string {
        return AppUrl.API_URL + 'leave-entitlement-grade-levels/' + id;
    }
    //Leave Entitlement Grade Level

    //Leave Credit
    static GET_LEAVE_CREDIT_LIST(): string {
        return AppUrl.API_URL + `leave-credits`;
    }

    static LEAVE_CREDIT(id?): string {
        if (id) {
            return AppUrl.API_URL + 'leave-credits/' + id;
        } else {
            return AppUrl.API_URL + 'leave-credits';
        }
    }
    static BULK_UPLOAD_LEAVE_CREDIT(): string {
        return AppUrl.API_URL + 'bulk-upload-leave-credits';
    }

    static DELETE_LEAVE_CREDIT(id?): string {
        return AppUrl.API_URL + 'leave-credits/' + id;
    }
    static DELETE_ALL_LEAVE_CREDIT(id?): string {
        return AppUrl.API_URL + 'delete-all-leave-credits';
    }
    static GET_LEAVE_CREDIT_VIEW_LIST(): string {
        return AppUrl.API_URL + `leave-credits-view`;
    }
    //Leave Credit Ended

    //Hr Information
    static GET_HR_INFORMATION_LIST(): string {
        return AppUrl.API_URL + `hr-informations`;
    }

    static HR_INFORMATION(id?): string {
        if (id) {
            return AppUrl.API_URL + 'hr-informations/' + id;
        } else {
            return AppUrl.API_URL + 'hr-informations';
        }
    }

    static DELETE_HR_INFORMATION(id?): string {
        return AppUrl.API_URL + 'hr-informations/' + id;
    }
    //Hr Information Ended

    static ASSETS_DEPRECIATION(): string {
        return AppUrl.API_URL + `fixed-assets/asset-depreciation`;
    }
    static FIXED_ASSETS_REPORT(): string {
        return AppUrl.API_URL + `fixed-assets/register-of-assets`;
    }
    static GET_PUBLIC_HOLIDAY_LIST(): string {
        return AppUrl.API_URL + `public-holidays`;
    }

    static PUBLIC_HOLIDAY(id?): string {
        if (id) {
            return AppUrl.API_URL + 'public-holidays/' + id;
        } else {
            return AppUrl.API_URL + 'public-holidays';
        }
    }

    static DELETE_PUBLIC_HOLIDAY(id?): string {
        return AppUrl.API_URL + 'public-holidays/' + id;
    }

    static GET_DESIGNATION_LIST(): string {
        return AppUrl.API_URL + `designations`;
    }

    static DESIGNATION(id?): string {
        if (id) {
            return AppUrl.API_URL + 'designations/' + id;
        } else {
            return AppUrl.API_URL + 'designations';
        }
    }

    static DELETE_DESIGNATION(id?): string {
        return AppUrl.API_URL + 'designations/' + id;
    }

    static USER_UPDATE(): string {
        return AppUrl.API_URL + 'profile';
    }

    static USER_IMAGE_UPLOAD(): string {
        return AppUrl.API_URL + 'files';
    }

    static UPDATE_LEVEL_COUNTS(id?): string {
        return AppUrl.API_URL + 'admin-segments/' + id + '/levels';
    }

    static GET_TYPE_OF_ADDRESS(): string {
        return AppUrl.API_URL + `address-type`;
    }

    static SET_EMPLOYEE_ADDRESS(id): string {
        return AppUrl.API_URL + 'employee/' + id + '/addresses';
    }

    static GET_EMPLOYEE_ADDRESS(id): string {
        return AppUrl.API_URL + 'employee/' + id + '/addresses';
    }

    static DELETE_EMPLOYEE_ADDRESS(id): string {
        return AppUrl.API_URL + 'employee-addresses/' + id;
    }

    static UPDATE_EMPLOYEE_ADDRESS(employeeId, addressId): string {
        return AppUrl.API_URL + 'employee/' + employeeId + '/addresses/' + addressId;
    }

    static ADD_EMPLOYEE_SCHOOL_ATTENDED(id): string {
        return AppUrl.API_URL + 'employee/' + id + '/schools';
    }

    static UPDATE_EMPLOYEE_SCHOOL_ATTENDED(empId, schoolId): string {
        return AppUrl.API_URL + 'employee/' + empId + '/schools/' + schoolId;
    }

    static GET_EMPLOYEE_SCHOOL_ATTENDED(id): string {
        return AppUrl.API_URL + 'employee/' + id + '/schools';
    }

    static DELETE_EMPLOYEE_SCHOOL_ATTENDED(id): string {
        return AppUrl.API_URL + 'employee-schools/' + id;
    }

    static GET_EMPLOYEE_HISTORY(id): string {
        return AppUrl.API_URL + 'employee/' + id + '/histories';
    }

    static SET_EMPLOYEE_HISTORY(id): string {
        return AppUrl.API_URL + 'employee/' + id + '/histories';
    }

    static DELETE_EMPLOYEE_HISTORY(id): string {
        return AppUrl.API_URL + 'employee-histories/' + id;
    }

    static UPDATE_EMPLOYEE_HISTORY(employeeId, historyId): string {
        return AppUrl.API_URL + 'employee/' + employeeId + '/histories/' + historyId;
    }

    static EMPLOYEE_MILITARY_SERVICE(id): string {
        return AppUrl.API_URL + 'employee/' + id + '/military';
    }

    static DELETE_MILITARY_SERVICE(id): string {
        return AppUrl.API_URL + 'employee-military/' + id;
    }

    static UPDATE_MILITARY_SERVICE(employeeId, militaryId): string {
        return AppUrl.API_URL + 'employee/' + employeeId + '/military/' + militaryId;
    }

    static GET_BANKS_NAME(): string {
        return AppUrl.API_URL + `banks`;
    }

    static GET_BANK_BRANCH_NAME(id): string {
        return AppUrl.API_URL + `bank/` + id + '/branches';
    }

    static GET_BANK_DETAILS_LIST(empId): string {
        return AppUrl.API_URL + `employee/` + empId + '/banks';
    }

    static GET_COMPANY_BANK_DETAILS_LIST(compId): string {
        return AppUrl.API_URL + `company/` + compId + '/bank';
    }

    static ADD_BANK_DETAILS(empId): string {
        return AppUrl.API_URL + `employee/` + empId + '/banks';
    }

    static ADD_LOGIN_ACCESS(empId): string {
        return AppUrl.API_URL + `employee-login-access/` + empId;
    }

    static ADD_COMPANY_DETAILS(empId): string {
        return AppUrl.API_URL + `company/` + empId + '/bank';
    }

    static UPDATE_BANK_DETAILS(empId, bankListId): string {
        return AppUrl.API_URL + `employee/` + empId + '/banks/' + bankListId;
    }

    static UPDATE_COMPANY_BANK_DETAILS(compId, bankListId): string {
        return AppUrl.API_URL + `company/` + compId + '/bank/' + bankListId;
    }

    static DELETE_BANK_DETAILS(bankId): string {
        return AppUrl.API_URL + `employee-banks/` + bankId;
    }

    static ADD_EMPLOYEE_QUALIFICATION(id): string {
        return AppUrl.API_URL + 'employee/' + id + '/qualifications';
    }

    static UPDATE_EMPLOYEE_QUALIFICATION(empId, qId): string {
        return AppUrl.API_URL + 'employee/' + empId + '/qualifications/' + qId;
    }

    static GET_EMPLOYEE_QUALIFICATION(id): string {
        return AppUrl.API_URL + 'employee/' + id + '/qualifications';
    }

    static DELETE_EMPLOYEE_QUALIFICATION(id): string {
        return AppUrl.API_URL + 'employee-qualifications/' + id;
    }

    static EMPLOYEE_MEMBERSHIP(id): string {
        return AppUrl.API_URL + 'employee/' + id + '/memberships';
    }

    static EMPLOYEE_DELETE_MEMBERSHIP(id): string {
        return AppUrl.API_URL + 'employee-memberships/' + id;
    }

    static UPDATE_MEMBERSHIP(employeeId, membershipId): string {
        return AppUrl.API_URL + 'employee/' + employeeId + '/memberships/' + membershipId;
    }

    static EMPLOYEE_PHONE_NUMBER(id): string {
        return AppUrl.API_URL + 'employee/' + id + '/phones';
    }

    static EMPLOYEE_DELETE_PHONE_NUMBER(id): string {
        return AppUrl.API_URL + 'employee-phones/' + id;
    }

    static GET_PHONE_NUMBER_TYPE(): string {
        return AppUrl.API_URL + 'phone-type';
    }

    static UPDATE_PHONE_NUMBER(employeeId, phoneNumberId): string {
        return AppUrl.API_URL + 'employee/' + employeeId + '/phones/' + phoneNumberId;
    }

    static ADD_EMPLOYEE_RELATION(id): string {
        return AppUrl.API_URL + 'employee/' + id + '/relations';
    }

    static UPDATE_EMPLOYEE_RELATION(empId, relationId): string {
        return AppUrl.API_URL + 'employee/' + empId + '/relations/' + relationId;
    }

    static GET_EMPLOYEE_RELATION(id): string {
        return AppUrl.API_URL + 'employee/' + id + '/relations';
    }

    static DELETE_EMPLOYEE_RELATION(id): string {
        return AppUrl.API_URL + 'employee-relations/' + id;
    }

    static EMPLOYEE_LANGUAGE(id): string {
        return AppUrl.API_URL + 'employee/' + id + '/languages';
    }

    static EMPLOYEE_DELETE_LANGUAGE(id): string {
        return AppUrl.API_URL + 'employee-languages/' + id;
    }

    static UPDATE_LANGUAGE(employeeId, languageId): string {
        return AppUrl.API_URL + 'employee/' + employeeId + '/languages/' + languageId;
    }

    static EMPLOYEE_CENSURE(id): string {
        return AppUrl.API_URL + 'employee/' + id + '/censures';
    }

    static EMPLOYEE_DELETE_CENSURE(id): string {
        return AppUrl.API_URL + 'employee-censures/' + id;
    }

    static UPDATE_CENSURE(employeeId, censureId): string {
        return AppUrl.API_URL + 'employee/' + employeeId + '/censures/' + censureId;
    }

    static EMPLOYEE_BACKGROUND(id): string {
        return AppUrl.API_URL + 'employee/' + id + '/background';
    }

    static EMPLOYEE_DELETE_BACKGROUND(id): string {
        return AppUrl.API_URL + 'employee-background/' + id;
    }

    static UPDATE_BACKGROUND(employeeId, backgroundId): string {
        return AppUrl.API_URL + 'employee/' + employeeId + '/background/' + backgroundId;
    }

    static SRV_PURCHASE_INVOICE(): string {
        return AppUrl.API_URL + `srv-purchase`;
    }

    static SRV_PURCHASE_RETURN(): string {
        return AppUrl.API_URL + `srv-return`;
    }

    static SALES_INVOICE(): string {
        return AppUrl.API_URL + `sale-outwards`;
    }

    static SALES_RETURN_BY_CUSTOMER(): string {
        return AppUrl.API_URL + `sale-inwards`;
    }

    static SALES_STORE_TRANSFER(): string {
        return AppUrl.API_URL + `store-transfer`;
    }

    static STORE_ADJUSTMENT(): string {
        return AppUrl.API_URL + `store-adjustment`;
    }

    static DONATIONS(): string {
        return AppUrl.API_URL + `srv-donation`;
    }

    static GET_TAXES_LIST(): string {
        return AppUrl.API_URL + 'taxes';
    }

    static ADD_TAXES(): string {
        return AppUrl.API_URL + 'taxes';
    }

    static UPDATE_TAXES(id): string {
        return AppUrl.API_URL + 'taxes/' + id;
    }

    static DELETE_TAXES(id): string {
        return AppUrl.API_URL + 'taxes/' + id;
    }

    static GET_COMPANIES_LIST(): string {
        return AppUrl.API_URL + 'companies';
    }

    static GET_COMPANIES_CONFIG(): string {
        return AppUrl.API_URL + 'company-config';
    }

    static ADD_COMPANY(): string {
        return AppUrl.API_URL + 'companies';
    }

    static UPDATE_COMPANY(id): string {
        return AppUrl.API_URL + 'companies/' + id;
    }

    static DELETE_COMPANY(id): string {
        return AppUrl.API_URL + 'companies/' + id;
    }

    static GET_BIN_REPORT(): string {
        return AppUrl.API_URL + 'bin-card/report';
    }

    static DOWNLOAD_TRANSACTION_REPORT(): string {
        return AppUrl.API_URL + 'bin-card/report/download';
    }

    static GET_INVENTORY_LEDGER_REPORT(): string {
        return AppUrl.API_URL + 'inventory-ledger-report';
    }

    static GET_QUANTITY_BALANCE_REPORT(): string {
        return 'https://run.mocky.io/v3/dfdd92c6-3af0-4ed3-ac58-2c8c4b70dd5d';
    }

    static GET_OFF_LEVEL_REPORT(): string {
        return AppUrl.API_URL + 'off-level-report';
    }

    static GET_EMPLOYEE_PROGRESSION_LIST(id): string {
        return AppUrl.API_URL + 'employee/' + id + '/progression-history';
    }

    static ADD_EMPLOYEE_PROGRESSION_DETAILS(empId): string {
        return AppUrl.API_URL + `employee/` + empId + '/progression-history';
    }

    static UPDATE_EMPLOYEE_PROGRESSION_DETAILS(empId, progressionId): string {
        return AppUrl.API_URL + `employee/` + empId + '/progression-history/' + progressionId;
    }

    // user-role-permission
    static GET_USER_ROLE_LIST(id?): string {
        if (id) {
            return AppUrl.API_URL + `roles/` + id;
        } else {
            return AppUrl.API_URL + `roles`;
        }

    }

    static GET_ROLE_BASED_PERMISSION_LIST(id): string {
        return AppUrl.API_URL + `roles/` + id + `/permissions`;
    }

    static GET_PERMISSION_LIST(): string {
        return AppUrl.API_URL + `permissions`;
    }

    static JOURNAL_VOUCHER(jvId?): string {
        if (jvId) {
            return AppUrl.API_URL + `journal-vouchers/` + jvId;
        } else {
            return AppUrl.API_URL + `journal-vouchers`;
        }
    }

    static JOURNAL_VOUCHER_UPDATE(): string {
        return AppUrl.API_URL + `journal-vouchers/update`;
    }

    static JOURNAL_VOUCHER_DETAILS(jvId, detId?): string {
        if (detId) {
            return AppUrl.API_URL + `journal-vouchers/` + jvId + `/details/` + detId;
        } else {
            return AppUrl.API_URL + `journal-vouchers/` + jvId + `/details`;
        }
    }

    // banks api

    static BANKS(id?): string {
        if (id) {
            return AppUrl.API_URL + 'banks/' + id;
        } else {
            return AppUrl.API_URL + 'banks';
        }
    }


    static FXA_CATEGORIES(id?): string {
        if (id) {
            return AppUrl.API_URL + 'banks/' + id;
        } else {
            return AppUrl.API_URL + 'banks';
        }
    }

    static FXA_ASSETS(id?): string {
        if (id) {
            return AppUrl.API_URL + 'fxa/fixed-assets/' + id;
        } else {
            return AppUrl.API_URL + 'fxa/fixed-assets';
        }
    }

    static DELETE_BANKS(id?): string {
        return AppUrl.API_URL + 'banks/' + id;
    }

    static BANK_BRANCHES(bankId?, branchId?): string {
        if (bankId && branchId) {
            return AppUrl.API_URL + 'bank/' + bankId + '/branches/' + branchId;
        } else {
            return AppUrl.API_URL + 'bank/' + bankId + '/branches';
        }
    }

    static GET_BUDGET_CONTROL_ECONOMIC(): string {
        return AppUrl.API_URL + `economic-budget`;
    }

    static GET_BUDGET_CONTROL_PROGRAMME(): string {
        return AppUrl.API_URL + `programme-budget`;
    }

    static DELETE_BUDGET(id?): string {
        return AppUrl.API_URL + 'budget/' + id;
    }

    static ADD_BUDGET(id?): string {
        if (id) {
            return AppUrl.API_URL + `budget/` + id;
        } else {
            return AppUrl.API_URL + `budget`;
        }

    }

    static GET_BUDGET_CONTROL_AIE(id?): string {
        if (id) {
            return AppUrl.API_URL + `treasury/aies/` + id;
        } else {
            return AppUrl.API_URL + `treasury/aies`;
        }
    }

    static GET_COMPANY_INFORMATION(): string {
        return AppUrl.API_URL + 'company-information';
    }

    static GET_COMPANY_SETTING(): string {
        return AppUrl.API_URL + 'company-setting';
    }

    static UPDATE_COMPANY_SETTING(id): string {
        return AppUrl.API_URL + 'company-setting/' + id;
    }

    static GET_JV_LEDGER_REPORT(): string {
        return AppUrl.API_URL + 'finance/jv-ledger';
    }

    static GET_TRAIL_REPORT(): string {
        return AppUrl.API_URL + 'finance/trial-report';
    }

    static ADD_NOTE_TRAIL_REPORT(id): string {
        return AppUrl.API_URL + 'notes/' + id;
    }

    static GET_NOTE_MASTER_DATA(): string {
        return AppUrl.API_URL + 'finance/notes-trial-report';
    }

    static GET_JV_LEDGER_SIBLING_REPORT(): string {
        return AppUrl.API_URL + 'finance/jv-sibling';
    }

    static GET_STATEMENT_POSITION_REPORT(): string {
        return AppUrl.API_URL + 'finance/statement-of-position';
    }

    static GET_FINANCIAL_PEFROMANCE_REPORT(): string {
        return AppUrl.API_URL + 'finance/financial-performance';
    }

    static GET_MONTHLY_ACTIVITY_REPORT(): string {
        return AppUrl.API_URL + 'finance/monthly-activity';
    }

    static GET_VOUCHER_SOURCE_UNIT(id?): string {
        if (id) {
            return AppUrl.API_URL + `treasury/source-units/` + id;
        } else {
            return AppUrl.API_URL + `treasury/source-units`;
        }

    }

    static CASHBOOKS(id?): string {
        if (id) {
            return AppUrl.API_URL + `treasury/cashbooks/` + id;
        } else {
            return AppUrl.API_URL + `treasury/cashbooks`;
        }
    }

    static MANDATE(id?): string {
        if (id) {
            return AppUrl.API_URL + `treasury/mandate/` + id;
        } else {
            return AppUrl.API_URL + `treasury/mandate`;
        }
    }

    static MANDATE_DOWNLOAD(id?): string {
        return AppUrl.API_URL + `treasury/mandate/` + id + '/download';
    }

    static MANDATE_CBN_DOWNLOAD(id?): string {
        return AppUrl.API_URL + `treasury/mandate-cbn/` + id + '/download';
    }

    static UPDATE_MANDATE_STATUS(): string {
        return AppUrl.API_URL + `treasury/mandate-update`;
    }

    static UPDATE_RETIRE_STATUS(): string {
        return AppUrl.API_URL + `treasury/retire-voucher-update`;
    }

    static PAYMENT_APPROVAL(id?): string {
        if (id) {
            return AppUrl.API_URL + `treasury/payment-approval/` + id;
        } else {
            return AppUrl.API_URL + `treasury/payment-approval`;
        }
    }

    static UPDATE_PAYMENT_APPROVAL_STATUS(): string {
        return AppUrl.API_URL + `treasury/payment-approval-update`;
    }

    static DEFAULT_SETTING_VOUCHER_INFO(id?): string {
        if (id) {
            return AppUrl.API_URL + `treasury/default-settings/` + id;
        } else {
            return AppUrl.API_URL + `treasury/default-settings`;
        }
    }

    static CASHBOOK_TYPES(): string {
        return AppUrl.API_URL + `treasury/cashbook-types`;
    }

    static UPDATE_VOUCHER_STATUS(): string {
        return AppUrl.API_URL + `treasury/payment-vouchers/update-status`;
    }

    static GET_SOURCE_UNIT_TYPE(id): string {
        return AppUrl.API_URL + `treasury/source-units/${id}/types`;
    }

    static GET_PAYMENT_VOUCHER_STATUS(): string {
        return AppUrl.API_URL + `treasury/payment-voucher-status`;
    }

    static GET_RETIRE_VOUCHER_STATUS(): string {
        return AppUrl.API_URL + `treasury/retire-voucher-status`;
    }

    static GET_RECEIPT_VOUCHER_STATUS(): string {
        return AppUrl.API_URL + `treasury/receipt-voucher-status`;
    }

    static SUMMARY_REPORT_NON_PERSONAL(id?): string {
        if (id) {
            return AppUrl.API_URL + `treasury/report/summary-non-personal` + id;
        } else {
            return AppUrl.API_URL + `treasury/report/summary-non-personal`;
        }
    }

    static SUMMARY_REPORT_PERSONAL(id?): string {
        if (id) {
            return AppUrl.API_URL + `treasury/report/summary-personal` + id;
        } else {
            return AppUrl.API_URL + `treasury/report/summary-personal`;
        }
    }

    static SUMMARY_REPORT_STANDING_IMPREST(id?): string {
        if (id) {
            return AppUrl.API_URL + `treasury/report/summary-standing` + id;
        } else {
            return AppUrl.API_URL + `treasury/report/summary-standing`;
        }
    }

    static SUMMARY_REPORT_SPECIAL_IMPREST(id?): string {
        if (id) {
            return AppUrl.API_URL + `treasury/report/summary-special` + id;
        } else {
            return AppUrl.API_URL + `treasury/report/summary-special`;
        }
    }

    static APPLICATION_FUND_REPORT_DATA(id?): string {
        if (id) {
            return AppUrl.API_URL + `finance/report/application-of-funds/` + id;
        } else {
            return AppUrl.API_URL + `finance/report/application-of-funds`;
        }
    }

    static IFR_NOTES(id?): string {
        if (id) {
            return AppUrl.API_URL + `finance/ifr-notes/` + id;
        } else {
            return AppUrl.API_URL + `finance/ifr-notes`;
        }
    }

    static ADVANCE_LEDGER_EMPLOYEE(): string {
        return AppUrl.API_URL + `treasury/report/advance-ledger`;
    }

    static DOWNLOAD_PV_LIST_REPORT(): string {
        return AppUrl.API_URL + `treasury/download/payment-vouchers`;
    }

    static DOWNLOAD_RV_LIST_REPORT(): string {
        return AppUrl.API_URL + `treasury/download/receipt-vouchers`;
    }

    static SOURCES_USES_FUND_REPORT_DATA(id?): string {
        if (id) {
            return AppUrl.API_URL + `finance/report/uses-of-funds/` + id;
        } else {
            return AppUrl.API_URL + `finance/report/uses-of-funds`;
        }
    }

    // Fixed Assets
    static FIXED_ASSET_STATUSES(): string {
        return AppUrl.API_URL + `fixed-assets/statuses`;
    }

    static FIXED_ASSET_DEPRECIATIONS(): string {
        return AppUrl.API_URL + `fixed-assets/depreciations`;
    }

    static FIXED_ASSET_CATEGORIES(id?): string {
        return AppUrl.API_URL + `fixed-assets/categories` + (id ? `/${id}` : '');
    }

    static FIXED_ASSETS(id?): string {
        return AppUrl.API_URL + `fixed-assets` + (id ? `/${id}` : '');
    }

    static FIXED_ASSETS_DEPLOYMENT(id): string {
        return AppUrl.API_URL + `fixed-assets/${id}/deployments`;
    }

    static FIXED_ASSETS_RE_DEPLOYMENT(): string {
        return AppUrl.API_URL + `fixed-assets/re-deployments`;
    }

    static FIXED_ASSETS_DEPRECIATION(): string {
        return AppUrl.API_URL + `fixed-assets/depreciations`;
    }

}
