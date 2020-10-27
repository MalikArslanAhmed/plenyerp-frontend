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
export class JournalVoucherLedgerReportService extends BaseService{

  constructor(public http: HttpClient, public alertService: AlertService, public globalService: GlobalService) {
    super(http, alertService, globalService);
  }

  getJVLedgerReport(data): Observable<any> {
    return this.getRequest(AppUrl.GET_JV_LEDGER_REPORT(), data);
 }

 getJVLedgerSiblingReport(data): Observable<any> {
   return this.getRequest(AppUrl.GET_JV_LEDGER_SIBLING_REPORT(), data);
 }

 getStatementPositionReport(data): Observable<any> {
   return this.getRequest(AppUrl.GET_STATEMENT_POSITION_REPORT(), data);
 }

 getFinanceStatementReport(data): Observable<any> {
  return this.getRequest(AppUrl.GET_FINANCIAL_PEFROMANCE_REPORT(), data);
 }

 getMonthlyActivityReport(data): Observable<any> {
   return this.getRequest(AppUrl.GET_MONTHLY_ACTIVITY_REPORT(), data);
 }
}
 