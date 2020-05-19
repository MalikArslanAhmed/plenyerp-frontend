import {BaseService} from './base.service';
import {HttpClient} from '@angular/common/http';
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

    updatePersonalDetails(id, data): Observable<any> {
        return this.putRequest(AppUrl.ADD_UPDATE_PERSONAL_DETAILS(id), data);
    }

    addJobProfile(id, data): Observable<any> {
        return this.postRequest(AppUrl.ADD_JOB_POSITIONS(id), data);
    }

    addContactDetails(id, data): Observable<any> {
        return this.postRequest(AppUrl.ADD_CONTACT_DETAILS(id), data);
    }

    addProgression(id, data): Observable<any> {
        return this.postRequest(AppUrl.ADD_PROGRESSION(id), data);
    }

    addIdNos(id, data): Observable<any> {
        return this.postRequest(AppUrl.ADD_ID_NOS(id), data);
    }

    getEmployees(data): Observable<any> {
        return this.getRequest(AppUrl.GET_EMPLOYEES(), data);
    }
}