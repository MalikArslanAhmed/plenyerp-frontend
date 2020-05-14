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
export class ManagersService extends BaseService {

  constructor(public http: HttpClient, public alertService: AlertService, public globalService: GlobalService) {
    super(http, alertService, globalService);
  }

  addManager(data): Observable<any> {
    return this.postRequest(AppUrl.MANAGERS(), data);
  }

  getManagers(data): Observable<any> {
    return this.getRequest(AppUrl.GET_MANAGERS(), data);
  }

  deleteManager(id): Observable<any> {
    return this.deleteRequest(AppUrl.DELETE_MANAGER(id));
  }

  updateManager(id, data): Observable<any> {
    return this.putRequest(AppUrl.MANAGERS(id), data);
  }
}