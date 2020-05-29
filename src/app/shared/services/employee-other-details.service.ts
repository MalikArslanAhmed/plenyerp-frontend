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
export class EmployeeOtherDetailsService extends BaseService {
    constructor(public http: HttpClient, public alertService: AlertService, public globalService: GlobalService) {
        super(http, alertService, globalService);
    }
    
    public uploadFile(obj): Observable<any>  {
        let headers = new HttpHeaders();
        headers = headers.set('Content-Type', 'multipart/form-data');

        return this.http.post(AppUrl.USER_IMAGE_UPLOAD(), toFormData(obj), {
            headers: headers
        });
    }

    typeOfAddress(data?): Observable<any> {
        return this.getRequest(AppUrl.GET_TYPE_OF_ADDRESS(), data);
    }

    allCountry(data?): Observable<any> {
        return this.getRequest(AppUrl.GET_COUNTRIES(), data);
    }
    getSchedule(data?): Observable<any> {
        return this.getRequest(AppUrl.GET_SCHEDULES(), data);
    }
    allRegion(data?): Observable<any> {
        return this.getRequest(AppUrl.GET_REGION(), data);
    }
    allState(data?): Observable<any> {
        return this.getRequest(AppUrl.GET_STATE(), data);
    }
    allLga(data?): Observable<any> {
        return this.getRequest(AppUrl.GET_LGAS(), data);
    }
    employeeAddressList(id, data?): Observable<any> {
        return this.getRequest(AppUrl.GET_EMPLOYEE_ADDRESS(id), data);
    }
    addEmployeeAddress(id, data): Observable<any> {
        return this.postRequest(AppUrl.SET_EMPLOYEE_ADDRESS(id), data);
    }
    deleteAddress(id): Observable<any> {
        return this.deleteRequest(AppUrl.DELETE_EMPLOYEE_ADDRESS(id));
    }
    addEmployeeSchoolAttended(id, data): Observable<any> {
        return this.postRequest(AppUrl.ADD_EMPLOYEE_SCHOOL_ATTENDED(id), data);
    }
    updateEmployeeSchoolAttended(empId, schoolId, data): Observable<any> {
        return this.putRequest(AppUrl.UPDATE_EMPLOYEE_SCHOOL_ATTENDED(empId, schoolId), data);
    }
    getSchoolAttendedList(empId, data?): Observable<any> {
        return this.getRequest(AppUrl.GET_EMPLOYEE_SCHOOL_ATTENDED(empId), data);
    }
    deleteEmployeeSchoolAttended(id): Observable<any> {
        return this.deleteRequest(AppUrl.DELETE_EMPLOYEE_SCHOOL_ATTENDED(id));
    }

    updateAddress(employeeId, addressId, data?): Observable<any> {
        return this.putRequest(AppUrl.UPDATE_EMPLOYEE_ADDRESS(employeeId, addressId), data);
    }
    employeeHistoryList(id, data?): Observable<any> {
        return this.getRequest(AppUrl.GET_EMPLOYEE_HISTORY(id), data);
    }
    addEmployeeHistory(id, data): Observable<any> {
        return this.postRequest(AppUrl.SET_EMPLOYEE_HISTORY(id), data);
    }
    deleteHistory(id): Observable<any> {
        return this.deleteRequest(AppUrl.DELETE_EMPLOYEE_HISTORY(id));
    }

    updateHistory(employeeId, historyId, data?): Observable<any> {
        return this.putRequest(AppUrl.UPDATE_EMPLOYEE_HISTORY(employeeId, historyId), data);
    }

    armOfService(data?): Observable<any> {
        return this.getRequest(AppUrl.GET_ARM_OF_SERVICES(), data);
    }
    employeeMilitaryServiceList(id, data?): Observable<any> {
        return this.getRequest(AppUrl.EMPLOYEE_MILITARY_SERVICE(id), data);
    }
    addEmployeeMilitaryService(id, data): Observable<any> {
        return this.postRequest(AppUrl.EMPLOYEE_MILITARY_SERVICE(id), data);
    }
    deleteMilitaryService(id): Observable<any> {
        return this.deleteRequest(AppUrl.DELETE_MILITARY_SERVICE(id));
    }
    updateMilitaryService(employeeId, militaryId, data?): Observable<any> {
        return this.putRequest(AppUrl.UPDATE_MILITARY_SERVICE(employeeId, militaryId), data);
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