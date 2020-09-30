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
export class JournalVoucherService extends BaseService {
    constructor(public http: HttpClient, public alertService: AlertService, public globalService: GlobalService) {
        super(http, alertService, globalService);
    }

    create(data): Observable<any> {
        return this.postRequest(AppUrl.JOURNAL_VOUCHER(), data);
    }

    update(jvId, data): Observable<any> {
        return this.putRequest(AppUrl.JOURNAL_VOUCHER(jvId), data);
    }

    get(data): Observable<any> {
        return this.getRequest(AppUrl.JOURNAL_VOUCHER(), data);
    }

    addDetails(jvId, data): Observable<any> {
        return this.postRequest(AppUrl.JOURNAL_VOUCHER_DETAILS(jvId), data);
    }

    updateDetails(jvId, detailId, data): Observable<any> {
        return this.putRequest(AppUrl.JOURNAL_VOUCHER_DETAILS(jvId, detailId), data);
    }
}