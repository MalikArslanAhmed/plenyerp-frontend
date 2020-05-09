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
export class ContactInfoService extends BaseService {
    constructor(public http: HttpClient, public alertService: AlertService, public globalService: GlobalService) {
        super(http, alertService, globalService);
    }

    addCountry(data): Observable<any> {
        return this.postRequest(AppUrl.COUNTRIES(), data);
    }

    getCountryList(data): Observable<any> {
        return this.getRequest(AppUrl.GET_COUNTRY_LIST(), data);
    }

    deleteCountry(id): Observable<any> {
        return this.deleteRequest(AppUrl.DELETE_COUNTRY(id));
    }

    updateCountry(id, data): Observable<any> {
        return this.putRequest(AppUrl.COUNTRIES(id), data);
    }
    deleteRegion(id): Observable<any> {
        return this.deleteRequest(AppUrl.DELETE_REGION(id));
    }
    getRegionList(data): Observable<any> {
        return this.getRequest(AppUrl.GET_REGION_LIST(), data);
    }
    addRegion(data): Observable<any> {
        return this.postRequest(AppUrl.REGIONS(), data);
    }
    updateRegion(id, data): Observable<any> {
        return this.putRequest(AppUrl.REGIONS(id), data);
    }
    getStateList(data): Observable<any> {
        return this.getRequest(AppUrl.GET_STATE_LIST(), data);
    }
    addState(data): Observable<any> {
        return this.postRequest(AppUrl.STATES(), data);
    }
    updateState(id, data): Observable<any> {
        return this.putRequest(AppUrl.STATES(id), data);
    }
    deleteStates(id): Observable<any> {
        return this.deleteRequest(AppUrl.DELETE_STATE(id));
    }
    getLgaList(data): Observable<any> {
        return this.getRequest(AppUrl.GET_LGA_LIST(), data);
    }
    addLga(data): Observable<any> {
        return this.postRequest(AppUrl.LGAS(), data);
    }
    updateLga(id, data): Observable<any> {
        return this.putRequest(AppUrl.LGAS(id), data);
    }
    deleteLga(id): Observable<any> {
        return this.deleteRequest(AppUrl.DELETE_LGA(id));
    }
    country(): Observable<any> {
        return this.getRequest(AppUrl.GET_COUNTRY());
    }
    region(data): Observable<any> {
        return this.getRequest(AppUrl.GET_REGION(), data);
    }
    state(data): Observable<any> {
        return this.getRequest(AppUrl.GET_STATE(), data);
    }
}