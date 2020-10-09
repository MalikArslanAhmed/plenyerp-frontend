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
export class BudgetControlService extends BaseService {
  constructor(public http: HttpClient, public alertService: AlertService, public globalService: GlobalService) {
      super(http, alertService, globalService);
  }

  getBudgetControlForEconomic(): Observable<any> {
    return this.getRequest(AppUrl.GET_BUDGET_CONTROL_ECONOMIC());
  }
  getBudgetControlForProgramm(): Observable<any> {
    return this.getRequest(AppUrl.GET_BUDGET_CONTROL_PROGRAMME());
  }

  deleteBudget(id): Observable<any> {
    return this.deleteRequest(AppUrl.DELETE_BUDGET(id));
}
}
