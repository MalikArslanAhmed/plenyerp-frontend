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
export class DefaultSettingVoucherInfoService extends BaseService {
    constructor(public http: HttpClient, public alertService: AlertService, public globalService: GlobalService) {
        super(http, alertService, globalService);
    }

    save(data): Observable<any> {
        return this.postRequest(AppUrl.DEFAULT_SETTING_VOUCHER_INFO(), data);
    }

    list(data): Observable<any> {
        return this.getRequest(AppUrl.DEFAULT_SETTING_VOUCHER_INFO(), data);
    }

    detail(): Observable<any> {
        return this.getRequest(AppUrl.DEFAULT_SETTING_VOUCHER_INFO());
    }

    delete(id): Observable<any> {
        return this.deleteRequest(AppUrl.DEFAULT_SETTING_VOUCHER_INFO(id));
    }

    update(id, data): Observable<any> {
        return this.putRequest(AppUrl.DEFAULT_SETTING_VOUCHER_INFO(id), data);
    }
}