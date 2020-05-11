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
        return this.getRequest(AppUrl.GET_ALL_SEGMENTS(id));
    }

    addSegment(data): Observable<any> {
        return this.postRequest(AppUrl.ADD_SEGMENT(), data);
    }

    updateSegment(id, data): Observable<any> {
        const path = AppUrl.ADD_SEGMENT(id);
        console.log(path, 'path');
        return this.putRequest(AppUrl.ADD_SEGMENT(id), data);
    }
}
