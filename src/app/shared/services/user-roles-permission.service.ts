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
export class UserRolesPermissionService extends BaseService {
    constructor(public http: HttpClient, public alertService: AlertService, public globalService: GlobalService) {
        super(http, alertService, globalService);
    }

    addUserRoles(data): Observable<any> {
        return this.postRequest(AppUrl.GET_USER_ROLE_LIST(), data);
    }

    userRoleList(data): Observable<any> {
        return this.getRequest(AppUrl.GET_USER_ROLE_LIST(), data);
    }

    deleteRoles(id): Observable<any> {
        return this.deleteRequest(AppUrl.GET_USER_ROLE_LIST(id));
    }

    updateUserRoles(id, data): Observable<any> {
        return this.putRequest(AppUrl.GET_USER_ROLE_LIST(id), data);
    }
    // @ts-ignore
    roleBasePermissionList(id, data): Observable<any> {
        return this.getRequest(AppUrl.GET_ROLE_BASED_PERMISSION_LIST(id), data);
    }

}