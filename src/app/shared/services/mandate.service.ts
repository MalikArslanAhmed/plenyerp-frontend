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
export class MandateService extends BaseService {
    constructor(public http: HttpClient, public alertService: AlertService, public globalService: GlobalService) {
        super(http, alertService, globalService);
    }

    save(data): Observable<any> {
        return this.postRequest(AppUrl.MANDATE(), data);
    }

    list(data): Observable<any> {
        return this.getRequest(AppUrl.MANDATE(), data);
    }

    delete(id): Observable<any> {
        return this.deleteRequest(AppUrl.MANDATE(id));
    }

    update(id, data): Observable<any> {
        return this.putRequest(AppUrl.MANDATE(id), data);
    }

    updateMandateStatus(data): Observable<any> {
        return this.postRequest(AppUrl.UPDATE_MANDATE_STATUS(), data);
    }
}