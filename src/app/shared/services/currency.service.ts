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
export class CurrencyService extends BaseService {
    constructor(public http: HttpClient, public alertService: AlertService, public globalService: GlobalService) {
        super(http, alertService, globalService);
    }

    addCurrency(data): Observable<any> {
        return this.postRequest(AppUrl.CURRENCIES(), data);
    }

    getCurrency(data): Observable<any> {
        return this.getRequest(AppUrl.CURRENCIES(), data);
    }

    deleteCurrency(id): Observable<any> {
        return this.deleteRequest(AppUrl.CURRENCIES(id));
    }

    updateCurrency(id, data): Observable<any> {
        return this.putRequest(AppUrl.CURRENCIES(id), data);
    }
}