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
export class MembershipService extends BaseService {
    constructor(public http: HttpClient, public alertService: AlertService, public globalService: GlobalService) {
        super(http, alertService, globalService);
    }

    addMembership(data): Observable<any> {
        return this.postRequest(AppUrl.MEMBERSHIP(), data);
    }

    getMemberships(data): Observable<any> {
        return this.getRequest(AppUrl.GET_MEMBERSHIPS(), data);
    }

    deleteMembership(id): Observable<any> {
        return this.deleteRequest(AppUrl.DELETE_MEMBERSHIP(id));
    }

    updateMembership(id, data): Observable<any> {
        return this.putRequest(AppUrl.MEMBERSHIP(id), data);
    }
}