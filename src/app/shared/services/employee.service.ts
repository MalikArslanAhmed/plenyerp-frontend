import {BaseService} from './base.service';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {AlertService} from './alert.service';
import {GlobalService} from './global.service';
import {Observable} from 'rxjs';
import {AppUrl} from '../constants/app-url';
import {Injectable} from "@angular/core";

@Injectable({
    providedIn: 'root'
})
export class EmployeeService extends BaseService {
    constructor(public http: HttpClient, public alertService: AlertService, public globalService: GlobalService) {
        super(http, alertService, globalService);
    }

    addEmployee(data): Observable<any> {
        return this.postRequest(AppUrl.ADD_UPDATE_EMPLOYEE(), data);
    }

    updateEmployee(id, data): Observable<any> {
        return this.putRequest(AppUrl.ADD_UPDATE_EMPLOYEE(id), data);
    }

    addPersonalDetails(id, data): Observable<any> {
        return this.postRequest(AppUrl.ADD_UPDATE_PERSONAL_DETAILS(id), data);
    }

    addJobProfile(id, data): Observable<any> {
        return this.postRequest(AppUrl.ADD_UPDATE_JOB_POSITIONS(id), data);
    }

    addContactDetails(id, data): Observable<any> {
        return this.postRequest(AppUrl.ADD_UPDATE_CONTACT_DETAILS(id), data);
    }

    addProgression(id, data): Observable<any> {
        return this.postRequest(AppUrl.ADD_UPDATE_PROGRESSION(id), data);
    }

    addIdNos(id, data): Observable<any> {
        return this.postRequest(AppUrl.ADD_UPDATE_ID_NOS(id), data);
    }

    getEmployees(data): Observable<any> {
        return this.getRequest(AppUrl.GET_EMPLOYEES(), data);
    }

    getEmployeesDetailsDownload(id, data): Observable<any> {
        return this.getRequest(AppUrl.GET_EMPLOYEES_DETAILS_DOWNLOAD(id), data);
    }

    setStatusEmployee(data): Observable<any> {
        return this.postRequest(AppUrl.SET_EMPLOYEE_STATUS(), data);
    }

    getAppointmentsType(data?): Observable<any> {
        return this.getRequest(AppUrl.GET_APPOINTMENTS_TYPE(), data);
    }

    getCountryCode(data?): Observable<any> {
        return this.getRequest(AppUrl.GET_COUNTRY_CODE(), data);
    }

    getReligions(data?): Observable<any> {
        return this.getRequest(AppUrl.GET_RELIGIONS(), data);
    }

    getMaritialStatus(data?): Observable<any> {
        return this.getRequest(AppUrl.GET_MARITIAL_STATUS(), data);
    }

    editEmployeeProfilePic(id, data): Observable<any> {
        return this.putRequest(AppUrl.EDIT_EMPLOYEE_PROFILE_PIC(id), data);
    }

    getBankDetailsList(empId,data): Observable<any> {
        return this.getRequest(AppUrl.GET_BANK_DETAILS_LIST(empId), data);
    }

    getCompanyBankDetailsList(compId,data): Observable<any> {
        return this.getRequest(AppUrl.GET_COMPANY_BANK_DETAILS_LIST(compId), data);
    }

    getBanksName(data?): Observable<any> {
        return this.getRequest(AppUrl.GET_BANKS_NAME(), data);
    }

    getBankBranchName(banksId,data?): Observable<any> {
        return this.getRequest(AppUrl.GET_BANK_BRANCH_NAME(banksId), data);
    }

    addBankDetails(empId, data): Observable<any> {
        return this.postRequest(AppUrl.ADD_BANK_DETAILS(empId), data);
    }

    addCompanyBankDetails(compId, data): Observable<any> {
        return this.postRequest(AppUrl.ADD_COMPANY_DETAILS(compId), data);
    }

    updateBankDetails(empId, bankListId, data): Observable<any> {
        return this.putRequest(AppUrl.UPDATE_BANK_DETAILS(empId, bankListId), data);
    }

    updateCompanyBankDetails(compId, bankListId, data): Observable<any> {
        return this.putRequest(AppUrl.UPDATE_COMPANY_BANK_DETAILS(compId, bankListId), data);
    }

    deleteBankDetails(id): Observable<any> {
        return this.deleteRequest(AppUrl.DELETE_BANK_DETAILS(id));
    }

    getProgressionList(id): Observable<any>{
        return this.getRequest(AppUrl.GET_EMPLOYEE_PROGRESSION_LIST(id));
    }

    addEmployeeProgression(empId,data): Observable<any> {
        return this.postRequest(AppUrl.ADD_EMPLOYEE_PROGRESSION_DETAILS(empId), data);
    }

    updateProgressionDetails(empId, progressionId, data): Observable<any> {
        return this.putRequest(AppUrl.UPDATE_EMPLOYEE_PROGRESSION_DETAILS(empId, progressionId), data);
    }
    
    public uploadFile(obj): Observable<any>  {
        let headers = new HttpHeaders();
        headers = headers.set('Content-Type', 'multipart/form-data');

        return this.http.post(AppUrl.USER_IMAGE_UPLOAD(), toFormData(obj), {
            headers: headers
        });
    }
}

export function toFormData<T>( formValue: T ) {
    const formData = new FormData();

    for ( const key of Object.keys(formValue) ) {
        const value = formValue[key];
        formData.append(key, value);
    }

    return formData;
}