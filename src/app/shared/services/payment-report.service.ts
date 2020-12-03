import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {AppUrl} from '../constants/app-url';
import {AlertService} from './alert.service';
import {BaseService} from './base.service';
import {GlobalService} from './global.service';

@Injectable({
    providedIn: 'root'
})
export class PaymentReportService extends BaseService {

    constructor(public http: HttpClient, public alertService: AlertService, public globalService: GlobalService) {
        super(http, alertService, globalService);
    }

    get(data): Observable<any> {
        return this.getRequest(AppUrl.PAYMENT_VOUCHER(), data);
    }

    getSchedulePayee(id, data): Observable<any> {
        return this.getRequest(AppUrl.SCHEDULE_PAYEES(id), data);
    }
    getScheduleEconomic(id): Observable<any> {
        return this.getRequest(AppUrl.GET_SCHEDULE_ECONOMIC(id));
    }
}
 