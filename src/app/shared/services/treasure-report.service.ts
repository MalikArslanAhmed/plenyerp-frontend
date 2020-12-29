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
export class TreasureReportService extends BaseService {
    constructor(public http: HttpClient, public alertService: AlertService, public globalService: GlobalService) {
        super(http, alertService, globalService);
    }

    save(data): Observable<any> {
        return this.postRequest(AppUrl.GET_VOUCHER_SOURCE_UNIT(), data);
    }

    list(data): Observable<any> {
        return this.getRequest(AppUrl.GET_VOUCHER_SOURCE_UNIT(), data);
    }

    delete(id): Observable<any> {
        return this.deleteRequest(AppUrl.GET_VOUCHER_SOURCE_UNIT(id));
    }

    update(id, data): Observable<any> {
        return this.putRequest(AppUrl.GET_VOUCHER_SOURCE_UNIT(id), data);
    }

    advancesLedgerEmployee(data): Observable<any> {
        return this.getRequest(AppUrl.ADVANCE_LEDGER_EMPLOYEE(), data);
    }
}