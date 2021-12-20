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
export class FxaCategoriesService extends BaseService {
    constructor(public http: HttpClient, public alertService: AlertService, public globalService: GlobalService) {
        super(http, alertService, globalService);
    }

    getStatus(params): Observable<any> {
        return this.getRequest(AppUrl.FIXED_ASSET_STATUSES(), params);
    }

    getDepreciation(params): Observable<any> {
        return this.getRequest(AppUrl.FIXED_ASSET_DEPRECIATIONS(), params);
    }

    getCategories(params): Observable<any> {
        return this.getRequest(AppUrl.FIXED_ASSET_CATEGORIES(), params);
    }

    get(params): Observable<any> {
        return this.getRequest(AppUrl.FIXED_ASSETS(), params);
    }

    add(data): Observable<any> {
        return this.postRequest(AppUrl.BANKS(), data);
    }

    delete(id): Observable<any> {
        return this.deleteRequest(AppUrl.DELETE_BANKS(id));
    }

    update(id, data): Observable<any> {
        return this.putRequest(AppUrl.BANKS(id), data);
    }

}