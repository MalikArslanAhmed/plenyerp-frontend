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
export class TrialBalanceReportService extends BaseService {
    constructor(public http: HttpClient, public alertService: AlertService, public globalService: GlobalService) {
        super(http, alertService, globalService);
    }

    getTrailReport(data): Observable<any> {
        return this.getRequest(AppUrl.GET_TRAIL_REPORT(), data);
    }

    addNote(segmentId, data): Observable<any> {
        return this.postRequest(AppUrl.ADD_NOTE_TRAIL_REPORT(segmentId), data);
    }

    getNotesData(data): Observable<any> {
        return this.getRequest(AppUrl.GET_NOTE_MASTER_DATA(), data);
    }

    downloadNoteMasterReport(data): Observable<any> {
        return this.getRequest(AppUrl.DOWNLOAD_NOTES_MASTER_REPORT(), data);
    }

    deleteAll(): Observable<any> {
        return this.deleteRequest(AppUrl.DELETE_NOTES());
    }
}
