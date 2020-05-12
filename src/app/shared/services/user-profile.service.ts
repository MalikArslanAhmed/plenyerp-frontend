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
export class UserProfileService extends BaseService {
    constructor(public http: HttpClient, public alertService: AlertService, public globalService: GlobalService) {
        super(http, alertService, globalService);
    }

    getDesignationList(data): Observable<any> {
        return this.getRequest(AppUrl.GET_DESIGNATION_LIST(), data);
    }
    addDesignation(data): Observable<any> {
        return this.postRequest(AppUrl.DESIGNATION(), data);
    }
    updateDesignation(id, data): Observable<any> {
        return this.putRequest(AppUrl.DESIGNATION(id), data);
    }
    deleteDesignation(id): Observable<any> {
        return this.deleteRequest(AppUrl.DELETE_DESIGNATION(id));
    }
    getSelf(): Observable<any> {
        return this.getRequest(AppUrl.SELF);
    }
    getUpdate(id, data): Observable<any> {
        return this.putRequest(AppUrl.USER_UPDATE(id), data);
    }
}