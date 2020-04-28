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

    updateWorkLocations(id, data): Observable<any> {
        return this.putRequest(AppUrl.WORK_LOCATIONS(id), data);
    }

    deleteWorkLocation(id): Observable<any> {
        return this.deleteRequest(AppUrl.DELETE_WORK_LOCATION(id));
    }
}