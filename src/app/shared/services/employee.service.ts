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

    setStatusEmployee(data): Observable<any> {
        return this.postRequest(AppUrl.SET_EMPLOYEE_STATUS(), data);
    }

    getAppointmentsType(data?): Observable<any> {
        return this.getRequest(AppUrl.GET_APPOINTMENTS_TYPE(), data);
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