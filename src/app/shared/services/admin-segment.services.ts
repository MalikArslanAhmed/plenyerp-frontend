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

export class AdminSegmentServices extends BaseService{
    constructor(public http: HttpClient, public alertService: AlertService, public globalService: GlobalService) {
        super(http, alertService, globalService);
    }

    getAllSegments(id?): Observable<any> {
        return this.getRequest(AppUrl.SEGMENT(id));
    }

    addSegment(data): Observable<any> {
        return this.postRequest(AppUrl.SEGMENT(), data);
    }

    updateSegment(id, data): Observable<any> {
        return this.putRequest(AppUrl.SEGMENT(id), data);
    }

    deleteSegment(id): Observable<any> {
        return this.deleteRequest(AppUrl.SEGMENT(id));
    }

    updateCharCount(id, data): Observable<any> {
        return this.postRequest(AppUrl.UPDATE_LEVEL_COUNTS(id), data);
    }
}
