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
export class FxaAssetsService extends BaseService {
    constructor(public http: HttpClient, public alertService: AlertService, public globalService: GlobalService) {
        super(http, alertService, globalService);
    }

    add(data): Observable<any> {
        return this.postRequest(AppUrl.BANKS(), data);
    }

    get(data): Observable<any> {
        return this.getRequest(AppUrl.BANKS(), data);
    }

    delete(id): Observable<any> {
        return this.deleteRequest(AppUrl.DELETE_BANKS(id));
    }

    update(id, data): Observable<any> {
        return this.putRequest(AppUrl.BANKS(id), data);
    }

    depreciateAssets(data): Observable<any> {
        return this.postRequest(AppUrl.ASSETS_DEPRECIATION(), data);
    }

    fixedAssetsReport(data): Observable<any> {
        return this.postRequest(AppUrl.FIXED_ASSETS_REPORT(), data);
    }
}