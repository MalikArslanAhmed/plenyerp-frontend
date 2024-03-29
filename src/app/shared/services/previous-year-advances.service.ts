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
export class PreviousYearAdvancesService extends BaseService {
    constructor(public http: HttpClient, public alertService: AlertService, public globalService: GlobalService) {
        super(http, alertService, globalService);
    }

    save(data): Observable<any> {
        return this.postRequest(AppUrl.PREVIOUS_YEAR_ADANCES(), data);
    }

    updatePreviousYearAdvances(id, data): Observable<any> {
        return this.putRequest(AppUrl.PREVIOUS_YEAR_ADANCES(id), data);
    }

    get(data): Observable<any> {
        return this.getRequest(AppUrl.PREVIOUS_YEAR_ADANCES(), data);
    }

    delete(id): Observable<any> {
        return this.deleteRequest(AppUrl.PREVIOUS_YEAR_ADANCES(id));
    }

    deleteSchedulePayee(reportId, id): Observable<any> {
        return this.deleteRequest(AppUrl.SCHEDULE_PAYEES_PREVIOUS_YEAR_DELETE(reportId, id));
    }

    update(id, data): Observable<any> {
        return this.putRequest(AppUrl.CURRENCIES(id), data);
    }

    getUpdateStatus(data): Observable<any> {
        return this.postRequest(AppUrl.PREVIOUS_YEAR_VOUCHER_STATUS(), data);
    }

    schedulePayer(id, data): Observable<any> {
        return this.postRequest(AppUrl.SCHEDULE_PAYEES(id), data);
    }

    schedulePayerUpdate(reportId, id, data): Observable<any> {
        return this.putRequest(AppUrl.SCHEDULE_PAYEES_PREVIOUS_YEAR_UPDATE(reportId, id), data);
    }

    scheduleEconomic(id, data): Observable<any> {
        return this.postRequest(AppUrl.RV_SCHEDULE_ECONOMIC(id), data);
    }

    getSchedulePayee(id, data): Observable<any> {
        return this.getRequest(AppUrl.SCHEDULE_PAYEES(id), data);
    }

    getScheduleEconomic(id, data?): Observable<any> {
        return this.getRequest(AppUrl.RV_GET_SCHEDULE_ECONOMIC(id), data);
    }

    typeData(id): Observable<any> {
        return this.getRequest(AppUrl.RV_SOURCE_UNIT_TYPE(id));
    }

    getPreviousYearAdvancesStatus(data): Observable<any> {
        return this.getRequest(AppUrl.GET_RECEIPT_VOUCHER_STATUS(), data);
    }
}