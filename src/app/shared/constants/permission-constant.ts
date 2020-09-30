import {Injectable} from '@angular/core';
@Injectable()
export class PermissionConstant {
    // admin
    static COMPANIES = 'COMPANIES';
    static COMPANIES_CREATE = 'COMPANIES.CREATE';
    static COMPANIES_LIST = 'COMPANIES.LIST';
    static COMPANIES_UPDATE = 'COMPANIES.UPDATE';
    static COMPANIES_DELETE = 'COMPANIES.DELETE';
    static COMPANIES_BANK_CREATE = 'COMAPNIES.BANK.CREATE';
    static TAXES = 'TAXES';
    static TAXES_LIST = 'TAXES.LIST';
    static TAXES_CREATE = 'TAXES.CREATE';
    static TAXES_UPDATE = 'TAXES.UPDATE';
    static TAXES_DELETE = 'TAXES.DELETE';

    // HR
    static EMPLOYEE_MANAGEMENT_EMPLOYEE_LIST = 'EMPLOYEE_MANAGEMENT.EMPLOYEE_LIST.LIST';
    static EMPLOYEE_MANAGEMENT_EMPLOYEE_LIST_ADD_EMPLOYEE = 'EMPLOYEE_MANAGEMENT.EMPLOYEE_LIST.ADD_EMPLOYEE';
    static EMPLOYEE_MANAGEMENT_EMPLOYEE_LIST_ADD_COLUMNS = 'EMPLOYEE_MANAGEMENT.EMPLOYEE_LIST.ADD_COLUMNS';
    static EMPLOYEE_MANAGEMENT_EMPLOYEE_LIST_EXPORT_TO_EXCEL = 'EMPLOYEE_MANAGEMENT.EMPLOYEE_LIST.EXPORT_TO_EXCEL';



}
