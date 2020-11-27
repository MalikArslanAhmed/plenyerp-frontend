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
export class PaymentVoucherService extends BaseService {
    constructor(public http: HttpClient, public alertService: AlertService, public globalService: GlobalService) {
        super(http, alertService, globalService);
    }

    save(data): Observable<any> {
        return this.postRequest(AppUrl.PAYMENT_VOUCHER(), data);
    }

    get(data): Observable<any> {
        return this.getRequest(AppUrl.PAYMENT_VOUCHER(), data);
    }

    delete(id): Observable<any> {
        return this.deleteRequest(AppUrl.CURRENCIES(id));
    }

    update(id, data): Observable<any> {
        return this.putRequest(AppUrl.CURRENCIES(id), data);
    }

    getUpdateStatus(data): Observable<any> {
        return this.postRequest(AppUrl.UPDATE_VOUCHER_STATUS(), data);
    }

    schedulePayee(id, data): Observable<any> {
        return this.postRequest(AppUrl.SCHEDULE_PAYEES(id), data);
    }
}