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
export class StoreSetupCategoriesService extends BaseService {
    constructor(public http: HttpClient, public alertService: AlertService, public globalService: GlobalService) {
        super(http, alertService, globalService);
    }

    getStoresCategories(data): Observable<any> {
        return this.getRequest(AppUrl.GET_STORE_SETUP_CATEGORIES(), data);
    }

    addStoreCategories(data): Observable<any> {
        return this.postRequest(AppUrl.STORE_SETUP_CATEGORIES(), data);
    }

    updateStoreCategories(id, data): Observable<any> {
        return this.putRequest(AppUrl.STORE_SETUP_CATEGORIES(id), data);
    }

    deleteStoreCategories(id): Observable<any> {
        return this.deleteRequest(AppUrl.DELETE_SETUP_CATEGORIES(id));
    }
}