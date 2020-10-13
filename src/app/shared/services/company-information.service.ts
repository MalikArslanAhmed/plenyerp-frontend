import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AppUrl } from '../constants/app-url';
import { AlertService } from './alert.service';
import { BaseService } from './base.service';
import { GlobalService } from './global.service';

@Injectable({
  providedIn: 'root'
})
export class CompanyInformationService extends BaseService {

  constructor(public http: HttpClient, public alertService: AlertService, public globalService: GlobalService) {
    super(http, alertService, globalService);
  }

  getCompaniesInformationList(): Observable<any> {
    return this.getRequest(AppUrl.GET_COMPANY_INFORMATION());
  }

  getCompanySetting(): Observable<any>{
    return this.getRequest(AppUrl.GET_COMPANY_SETTING());
  }
  updateCompanySetting(id, data): Observable<any> {
    return this.putRequest(AppUrl.UPDATE_COMPANY_SETTING(id), data);
}
}
 