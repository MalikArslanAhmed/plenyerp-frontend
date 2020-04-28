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
export class WorkLocationService extends BaseService {
    constructor(public http: HttpClient, public alertService: AlertService, public globalService: GlobalService) {
        super(http, alertService, globalService);
    }

    getWorkLocations(data): Observable<any> {
        return this.getRequest(AppUrl.GET_WORK_LOCATIONS(), data);
    }

    addWorkLocations(data): Observable<any> {
        return this.postRequest(AppUrl.WORK_LOCATIONS(), data);
    }

    addCountry(data): Observable<any> {
        return this.postRequest(AppUrl.COUNTRIES(), data);
    }

    addRegion(data): Observable<any> {
        return this.postRequest(AppUrl.REGIONS(), data);
    }

    addState(data): Observable<any> {
        return this.postRequest(AppUrl.STATES(), data);
    }

    addLga(data): Observable<any> {
        return this.postRequest(AppUrl.LGAS(), data);
    }

    deleteCountry(id): Observable<any> {
        return this.deleteRequest(AppUrl.DELETE_COUNTRY(id));
    }

    deleteRegion(id): Observable<any> {
        return this.deleteRequest(AppUrl.DELETE_REGION(id));
    }

    deleteState(id): Observable<any> {
        return this.deleteRequest(AppUrl.DELETE_STATE(id));
    }

    deleteLga(id): Observable<any> {
        return this.deleteRequest(AppUrl.DELETE_LGA(id));
    }

    updateCountry(id, data): Observable<any> {
        return this.putRequest(AppUrl.COUNTRIES(id), data);
    }

    updateRegion(id, data): Observable<any> {
        return this.putRequest(AppUrl.REGIONS(id), data);
    }

    updateState(id, data): Observable<any> {
        return this.putRequest(AppUrl.STATES(id), data);
    }

    updateLga(id, data): Observable<any> {
        return this.putRequest(AppUrl.LGAS(id), data);
    }
}