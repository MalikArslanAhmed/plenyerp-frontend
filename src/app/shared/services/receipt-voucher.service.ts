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
export class ReceiptVoucherService extends BaseService {
    constructor(public http: HttpClient, public alertService: AlertService, public globalService: GlobalService) {
        super(http, alertService, globalService);
    }

    save(data): Observable<any> {
        return this.postRequest(AppUrl.RECEIPT_VOUCHER(), data);
    }

    update(id, data): Observable<any> {
        return this.putRequest(AppUrl.RECEIPT_VOUCHER(id), data);
    }

    get(data): Observable<any> {
        return this.getRequest(AppUrl.RECEIPT_VOUCHER(), data);
    }

    delete(id): Observable<any> {
        return this.deleteRequest(AppUrl.RECEIPT_VOUCHER(id));
    }

    deleteSchedulePayerEmployee(reportId, id): Observable<any> {
        return this.deleteRequest(AppUrl.RV_SCHEDULE_PAYEES_DELETE(reportId, id));
    }

    deleteSchedulePayerCustomer(reportId, id): Observable<any> {
        return this.deleteRequest(AppUrl.RV_SCHEDULE_PAYEES_DELETE(reportId, id));
    }

    deleteEconomicCode(reportId, id): Observable<any> {
        return this.deleteRequest(AppUrl.RV_SCHEDULE_ECONOMIC_DELETE(reportId, id));
    }

    downloadPDF(id): Observable<any> {
        return this.getRequest(AppUrl.RV_VOUCHER_DOWNLOAD(id));
    }

    getUpdateStatus(data): Observable<any> {
        return this.postRequest(AppUrl.RV_VOUCHER_STATUS(), data);
    }

    schedulePayer(id, data): Observable<any> {
        return this.postRequest(AppUrl.RV_SCHEDULE_PAYEES(id), data);
    }

    updateSchedulePayer(reportId, id, data): Observable<any> {
        return this.putRequest(AppUrl.RV_UPDATE_SCHEDULE_PAYEES(reportId, id), data);
    }

    scheduleEconomic(id, data): Observable<any> {
        return this.postRequest(AppUrl.RV_SCHEDULE_ECONOMIC(id), data);
    }

    getSchedulePayee(id, data): Observable<any> {
        return this.getRequest(AppUrl.RV_SCHEDULE_PAYEES(id), data);
    }

    getScheduleEconomic(id, data?): Observable<any> {
        return this.getRequest(AppUrl.RV_GET_SCHEDULE_ECONOMIC(id), data);
    }

    typeData(id): Observable<any> {
        return this.getRequest(AppUrl.RV_SOURCE_UNIT_TYPE(id));
    }

    getReceiptVoucherStatus(data): Observable<any> {
        return this.getRequest(AppUrl.GET_RECEIPT_VOUCHER_STATUS(), data);
    }
}