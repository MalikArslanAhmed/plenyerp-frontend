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
export class IfrReportService extends BaseService {
    constructor(public http: HttpClient, public alertService: AlertService, public globalService: GlobalService) {
        super(http, alertService, globalService);
    }

    ifrNotes(data): Observable<any> {
        return this.getRequest(AppUrl.IFR_NOTES(), data);
    }

    addIfrNote(data): Observable<any> {
        return this.postRequest(AppUrl.IFR_NOTES(), data);
    }

    applicationOfFundData(data): Observable<any> {
        return this.getRequest(AppUrl.APPLICATION_FUND_REPORT_DATA(), data);
    }

    applicationOfFundChildData(data): Observable<any> {
        return this.getRequest(AppUrl.APPLICATION_FUND_REPORT_DATA(), data);
    }

    sourcesFundData(data): Observable<any> {
        return this.getRequest(AppUrl.SOURCES_USES_FUND_REPORT_DATA(), data);
    }
}