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
export class StoreSetupUnitOfMeasuresService extends BaseService {
    constructor(public http: HttpClient, public alertService: AlertService, public globalService: GlobalService) {
        super(http, alertService, globalService);
    }

    addStoreSetupUnitOfMeasures(data): Observable<any> {
        return this.postRequest(AppUrl.STORE_SETUP_UNIT_OF_MEASURES(), data);
    }

    getStoreSetupUnitOfMeasures(data): Observable<any> {
        return this.getRequest(AppUrl.GET_STORE_SETUP_UNIT_OF_MEASURES(), data);
    }

    deleteStoreSetupUnitOfMeasures(id): Observable<any> {
        return this.deleteRequest(AppUrl.DELETE_STORE_SETUP_UNIT_OF_MEASURES(id));
    }

    updateStoreSetupUnitOfMeasures(id, data): Observable<any> {
        return this.putRequest(AppUrl.STORE_SETUP_UNIT_OF_MEASURES(id), data);
    }
    applicableTaxesList(data): Observable<any> {
        return this.getRequest(AppUrl.GET_TAXES_LIST(), data);
    }
}