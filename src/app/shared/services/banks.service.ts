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
export class BanksService extends BaseService {
    constructor(public http: HttpClient, public alertService: AlertService, public globalService: GlobalService) {
        super(http, alertService, globalService);
    }

    addBanks(data): Observable<any> {
        return this.postRequest(AppUrl.BANKS(), data);
    }

    getBanks(data): Observable<any> {
        return this.getRequest(AppUrl.BANKS(), data);
    }

    deleteBanks(id): Observable<any> {
        return this.deleteRequest(AppUrl.DELETE_BANKS(id));
    }

    updateBanks(id, data): Observable<any> {
        return this.putRequest(AppUrl.BANKS(id), data);
    }

    addBranches(bankId, data): Observable<any> {
        return this.postRequest(AppUrl.BANK_BRANCHES(bankId), data);
    }
    getBranches(bankId, data): Observable<any> {
        return this.getRequest(AppUrl.BANK_BRANCHES(bankId), data);
    }
    updateBranch(bankId, branchId, data): Observable<any> {
        return this.putRequest(AppUrl.BANK_BRANCHES(bankId, branchId), data);
    }
    deleteBranch(bankId, branchId): Observable<any> {
        return this.deleteRequest(AppUrl.BANK_BRANCHES(bankId, branchId));
    }
}