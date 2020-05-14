import { BaseService } from './base.service';
import { HttpClient } from '@angular/common/http';
import { AlertService } from './alert.service';
import { GlobalService } from './global.service';
import { Observable } from 'rxjs';
import { AppUrl } from '../constants/app-url';
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class RolesService extends BaseService {

  constructor(public http: HttpClient, public alertService: AlertService, public globalService: GlobalService) {
    super(http, alertService, globalService);
  }

  addRole(mId,data): Observable<any> {
    return this.postRequest(AppUrl.ROLES(mId), data);
  }

  getRoles(id,data): Observable<any> {
    return this.getRequest(AppUrl.GET_ROLES(id), data);
  }

  deleteRoles(mId, roleId): Observable<any> {
    return this.deleteRequest(AppUrl.DELETE_ROLE(mId,roleId));
  }

  updateRoles(id, data): Observable<any> {
    return this.putRequest(AppUrl.ROLES(id), data);
  }

  getAvailableRoles(): Observable<any> {
    return this.getRequest(AppUrl.GET_AVAILABLE_ROLES());
  }
}