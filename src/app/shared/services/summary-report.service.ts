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
export class SummaryReportService extends BaseService {
    constructor(public http: HttpClient, public alertService: AlertService, public globalService: GlobalService) {
        super(http, alertService, globalService);
    }

    summaryReportNonPersonal(data): Observable<any> {
        return this.getRequest(AppUrl.SUMMARY_REPORT_NON_PERSONAL(), data);
    }

    summaryReportPersonal(data): Observable<any> {
        return this.getRequest(AppUrl.SUMMARY_REPORT_PERSONAL(), data);
    }

    summaryReportStandingImprest(data): Observable<any> {
        return this.getRequest(AppUrl.SUMMARY_REPORT_STANDING_IMPREST(), data);
    }

    summaryReportSpecialImprest(data): Observable<any> {
        return this.getRequest(AppUrl.SUMMARY_REPORT_SPECIAL_IMPREST(), data);
    }
}