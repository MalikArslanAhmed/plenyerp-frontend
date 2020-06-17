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
export class TransactionService extends BaseService {
    constructor(public http: HttpClient, public alertService: AlertService, public globalService: GlobalService) {
        super(http, alertService, globalService);
    }

    getCompanies(data): Observable<any> {
        return this.getRequest(AppUrl.GET_COMPANIES(), data);
    }

    getStores(data): Observable<any> {
        return this.getRequest(AppUrl.STORE_SETUP_STORES(), data);
    }

    getTaxes(data): Observable<any> {
        return this.getRequest(AppUrl.GET_TAXES(), data);
    }

    saveSrvPurchaseInvoice(data): Observable<any> {
        return this.postRequest(AppUrl.SRV_PURCHASE_INVOICE(), data);
    }

    saveSrvPurchaseReturn(data): Observable<any> {
        return this.postRequest(AppUrl.SRV_PURCHASE_RETURN(), data);
    }

    saveSalesInvocie(data): Observable<any> {
        return this.postRequest(AppUrl.SALES_INVOICE(), data);
    }

    saveSalesReturnByCustomer(data): Observable<any> {
        return this.postRequest(AppUrl.SALES_RETURN_BY_CUSTOMER(), data);
    }

    saveStoreTransfer(data): Observable<any> {
        return this.postRequest(AppUrl.SALES_STORE_TRANSFER(), data);
    }

    saveStoreAdjustment(data): Observable<any> {
        return this.postRequest(AppUrl.STORE_ADJUSTMENT(), data);
    }

    saveDonation(data): Observable<any> {
        return this.postRequest(AppUrl.DONATIONS(), data);
    }
}