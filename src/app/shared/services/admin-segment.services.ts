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

    getAllSegments(): Observable<any> {
        return this.getRequest(AppUrl.GET_ALL_SEGMENTS())
    }
}
