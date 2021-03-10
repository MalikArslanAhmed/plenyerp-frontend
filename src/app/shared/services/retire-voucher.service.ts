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
export class RetireVoucherService extends BaseService {
    constructor(public http: HttpClient, public alertService: AlertService, public globalService: GlobalService) {
        super(http, alertService, globalService);
    }

    save(data): Observable<any> {
        return this.postRequest(AppUrl.PAYMENT_VOUCHER(), data);
    }

    get(data): Observable<any> {
        return this.getRequest(AppUrl.RETIRE_VOUCHER(), data);
    }

    delete(id): Observable<any> {
        return this.deleteRequest(AppUrl.CURRENCIES(id));
    }

    update(id, data): Observable<any> {
        return this.putRequest(AppUrl.CURRENCIES(id), data);
    }

    deleteLiability(id): Observable<any> {
        return this.deleteRequest(AppUrl.DELETE_LIABILITIES(id));
    }

    liabilities(data): Observable<any> {
        return this.postRequest(AppUrl.LIABILITIES(), data);
    }

    getLiabilities(id, data): Observable<any> {
        return this.getRequest(AppUrl.GET_LIABILITIES(id), data);
    }

    getRetireVoucherStatus(data): Observable<any> {
        return this.getRequest(AppUrl.GET_RETIRE_VOUCHER_STATUS(), data);
    }

    updateRetireStatus(data): Observable<any> {
        return this.postRequest(AppUrl.UPDATE_RETIRE_STATUS(), data);
    }
}