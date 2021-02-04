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

    update(id, data): Observable<any> {
        return this.putRequest(AppUrl.PAYMENT_VOUCHER(id), data);
    }

    deleteSchedulePayee(reportId, id): Observable<any> {
        return this.deleteRequest(AppUrl.SCHEDULE_PAYEES_DELETE(reportId, id));
    }

    deleteScheduleCustomer(reportId, id): Observable<any> {
        return this.deleteRequest(AppUrl.SCHEDULE_PAYEES_DELETE(reportId, id));
    }

    get(data): Observable<any> {
        return this.getRequest(AppUrl.PAYMENT_VOUCHER(), data);
    }

    delete(id): Observable<any> {
        return this.deleteRequest(AppUrl.PAYMENT_VOUCHER(id));
    }

    downloadPDF(id): Observable<any> {
        return this.getRequest(AppUrl.PAYMENT_VOUCHER_DOWNLOAD(id));
    }

    downloadPDFTax(id): Observable<any> {
        return this.getRequest(AppUrl.PAYMENT_VOUCHER_TAX_DOWNLOAD(id));
    }

    deleteEconomicCode(reportId, id): Observable<any> {
        return this.deleteRequest(AppUrl.SCHEDULE_ECONOMIC_DELETE(reportId, id));
    }

    getUpdateStatus(data): Observable<any> {
        return this.postRequest(AppUrl.UPDATE_VOUCHER_STATUS(), data);
    }

    schedulePayee(id, data): Observable<any> {
        return this.postRequest(AppUrl.SCHEDULE_PAYEES(id), data);
    }

    updateSchedulePayee(reportId, id, data): Observable<any> {
        return this.putRequest(AppUrl.SCHEDULE_PAYEES_UPDATE(reportId, id), data);
    }

    updateScheduleCompany(reportId, id, data): Observable<any> {
        return this.putRequest(AppUrl.SCHEDULE_COMPANY_UPDATE(reportId, id), data);
    }

    scheduleEconomic(id, data): Observable<any> {
        return this.postRequest(AppUrl.SCHEDULE_ECONOMIC(id), data);
    }

    getSchedulePayee(id, data): Observable<any> {
        return this.getRequest(AppUrl.SCHEDULE_PAYEES(id), data);
    }

    getScheduleEconomic(id, data?): Observable<any> {
        return this.getRequest(AppUrl.GET_SCHEDULE_ECONOMIC(id), data);
    }

    typeData(id): Observable<any> {
        return this.getRequest(AppUrl.GET_SOURCE_UNIT_TYPE(id));
    }

    getPaymentVoucherStatus(data): Observable<any> {
        return this.getRequest(AppUrl.GET_PAYMENT_VOUCHER_STATUS(), data);
    }
}