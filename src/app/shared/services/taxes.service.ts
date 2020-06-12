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
export class TaxesService extends BaseService {

    constructor(public http: HttpClient, public alertService: AlertService, public globalService: GlobalService) {
        super(http, alertService, globalService);
    }

    getTaxesList(data): Observable<any> {
        return this.getRequest(AppUrl.GET_TAXES_LIST(), data);
    }
    addTax(data): Observable<any> {
        return this.postRequest(AppUrl.ADD_TAXES(), data);
    }
    updateTax(id, data): Observable<any> {
        return this.putRequest(AppUrl.UPDATE_TAXES(id), data);
    }
    deleteTax(id): Observable<any> {
        return this.deleteRequest(AppUrl.DELETE_TAXES(id));
    }
}
