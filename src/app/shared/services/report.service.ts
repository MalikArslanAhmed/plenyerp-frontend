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
export class ReportService extends BaseService {
    constructor(public http: HttpClient, public alertService: AlertService, public globalService: GlobalService) {
        super(http, alertService, globalService);
    }

    getBinReports(data): Observable<any> {
        return this.getRequest(AppUrl.GET_BIN_REPORT(), data);
    }

    getInventoryLedgerReports(data): Observable<any> {
        return this.getRequest(AppUrl.GET_INVENTORY_LEDGER_REPORT(), data);
    }

    getQuantityBalanceReports(data): Observable<any> {
        return this.getRequest(AppUrl.GET_QUANTITY_BALANCE_REPORT(), data);
    }

    getOffLevelReports(data): Observable<any> {
        return this.getRequest(AppUrl.GET_OFF_LEVEL_REPORT(), data);
    }

    downloadTransactionReport(data): Observable<any> {
        return this.getRequest(AppUrl.DOWNLOAD_TRANSACTION_REPORT(), data);
    }
}