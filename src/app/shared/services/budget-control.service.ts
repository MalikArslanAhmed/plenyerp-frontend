import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {AppUrl} from '../constants/app-url';
import {AlertService} from './alert.service';
import {BaseService} from './base.service';
import {GlobalService} from './global.service';

@Injectable({
    providedIn: 'root'
})
export class BudgetControlService extends BaseService {
    constructor(public http: HttpClient, public alertService: AlertService, public globalService: GlobalService) {
        super(http, alertService, globalService);
    }

    getBudgetControlForEconomic(params): Observable<any> {
        return this.getRequest(AppUrl.GET_BUDGET_CONTROL_ECONOMIC(), params);
    }

    getBudgetControlForProgramm(params): Observable<any> {
        return this.getRequest(AppUrl.GET_BUDGET_CONTROL_PROGRAMME(), params);
    }

    deleteBudget(id): Observable<any> {
        return this.deleteRequest(AppUrl.DELETE_BUDGET(id));
    }

    getCurrencies(): Observable<any> {
        return this.getRequest(AppUrl.CURRENCIES());
    }

    addBudget(data): Observable<any> {
        return this.postRequestWithoutDataDeletion(AppUrl.ADD_BUDGET(), data);
    }

    updateBudget(id, data): Observable<any> {
        return this.putRequestWithoutDataDeletion(AppUrl.ADD_BUDGET(id), data);
    }

    budgetControlAieList(data): Observable<any> {
        return this.getRequest(AppUrl.GET_BUDGET_CONTROL_AIE(), data);
    }

    deleteBudgetAie(id): Observable<any> {
        return this.deleteRequest(AppUrl.GET_BUDGET_CONTROL_AIE(id));
    }

    addBudgetControlAie(data): Observable<any> {
        return this.postRequestWithoutDataDeletion(AppUrl.GET_BUDGET_CONTROL_AIE(), data);
    }
    updateBudgetControlAie(id, data): Observable<any> {
        return this.putRequestWithoutDataDeletion(AppUrl.GET_BUDGET_CONTROL_AIE(id), data);
    }
}
