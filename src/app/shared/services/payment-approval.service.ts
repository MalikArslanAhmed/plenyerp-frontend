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
export class PaymentApprovalService extends BaseService {
    constructor(public http: HttpClient, public alertService: AlertService, public globalService: GlobalService) {
        super(http, alertService, globalService);
    }

    save(data): Observable<any> {
        return this.postRequest(AppUrl.PAYMENT_APPROVAL(), data);
    }

    updatePaymentApproval(id, data): Observable<any> {
        return this.putRequest(AppUrl.PAYMENT_APPROVAL(id), data);
    }

    list(data): Observable<any> {
        return this.getRequest(AppUrl.PAYMENT_APPROVAL(), data);
    }

    delete(id): Observable<any> {
        return this.deleteRequest(AppUrl.PAYMENT_APPROVAL(id));
    }

    update(id, data): Observable<any> {
        return this.putRequest(AppUrl.PAYMENT_APPROVAL(id), data);
    }

    updatePaymentApprovalStatus(data): Observable<any> {
        return this.postRequest(AppUrl.UPDATE_PAYMENT_APPROVAL_STATUS(), data);
    }

    schedulePayee(id, data): Observable<any> {
        return this.postRequest(AppUrl.SCHEDULE_PAYEES_PAYMENT_APPROVAL(id), data);
    }

    schedulePayeeUpdate(reportId, id, data): Observable<any> {
        return this.putRequest(AppUrl.SCHEDULE_PAYEES_PAYMENT_APPROVAL_UPDATE(reportId, id), data);
    }

    deleteSchedulePayee(reportId, id): Observable<any> {
        return this.deleteRequest(AppUrl.SCHEDULE_PAYEES_PAYMENT_APPROVAL_DELETE(reportId, id));
    }

    deleteScheduleCustomer(reportId, id): Observable<any> {
        return this.deleteRequest(AppUrl.SCHEDULE_PAYEES_PAYMENT_APPROVAL_DELETE(reportId, id));
    }

    getSchedulePayee(id, data): Observable<any> {
        return this.getRequest(AppUrl.SCHEDULE_PAYEES_PAYMENT_APPROVAL(id), data);
    }
}