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
export class CashbookService extends BaseService {
    constructor(public http: HttpClient, public alertService: AlertService, public globalService: GlobalService) {
        super(http, alertService, globalService);
    }

    save(data): Observable<any> {
        return this.postRequest(AppUrl.CASHBOOKS(), data);
    }

    list(data): Observable<any> {
        return this.getRequest(AppUrl.CASHBOOKS(), data);
    }

    delete(id): Observable<any> {
        return this.deleteRequest(AppUrl.CASHBOOKS(id));
    }

    update(id, data): Observable<any> {
        return this.putRequest(AppUrl.CASHBOOKS(id), data);
    }

    fundOwned(data): Observable<any> {
        return this.getRequest(AppUrl.CASHBOOK_TYPES(), data);
    }
}