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
export class EmployeesService extends BaseService {
    constructor(public http: HttpClient, public alertService: AlertService, public globalService: GlobalService) {
        super(http, alertService, globalService);
    }

    addCategory(data): Observable<any> {
        return this.postRequest(AppUrl.CATEGORY(), data);
    }

    getEmployees(data): Observable<any> {
        return this.getRequest(AppUrl.GET_EMPLOYEES(), data);
    }

    deleteCategory(id): Observable<any> {
        return this.deleteRequest(AppUrl.DELETE_CATEGORY(id));
    }

    updateCategory(id, data): Observable<any> {
        return this.putRequest(AppUrl.CATEGORY(id), data);
    }

    downloadReport(data): Observable<any> {
        return this.getRequest(AppUrl.DOWNLOAD_REPORT(), data);
    }
}