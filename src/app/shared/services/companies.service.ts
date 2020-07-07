import {BaseService} from './base.service';
import {HttpClient} from '@angular/common/http';
import {AlertService} from './alert.service';
import {GlobalService} from './global.service';
import {Observable} from 'rxjs';
import {AppUrl} from '../constants/app-url';
import {Injectable} from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class CompaniesService extends BaseService {

    constructor(public http: HttpClient, public alertService: AlertService, public globalService: GlobalService) {
        super(http, alertService, globalService);
    }

    getCompaniesList(data): Observable<any> {
        return this.getRequest(AppUrl.GET_COMPANIES_LIST(), data);
    }
    addCompany(data): Observable<any> {
        return this.postRequest(AppUrl.ADD_COMPANY(), data);
    }
    updateCompany(id, data): Observable<any> {
        return this.putRequest(AppUrl.UPDATE_COMPANY(id), data);
    }
    deleteCompany(id): Observable<any> {
        return this.deleteRequest(AppUrl.DELETE_COMPANY(id));
    }
    companyConfig(data): Observable<any> {
        return this.getRequest(AppUrl.GET_COMPANIES_CONFIG(), data);
    }
}
