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
export class CensuresService extends BaseService {
    constructor(public http: HttpClient, public alertService: AlertService, public globalService: GlobalService) {
        super(http, alertService, globalService);
    }

    addCensure(data): Observable<any> {
        return this.postRequest(AppUrl.CENSURE(), data);
    }

    getCensures(data): Observable<any> {
        return this.getRequest(AppUrl.GET_CENSURES(), data);
    }

    deleteCensure(id): Observable<any> {
        return this.deleteRequest(AppUrl.DELETE_CENSURE(id));
    }

    updateCensure(id, data): Observable<any> {
        return this.putRequest(AppUrl.CENSURE(id), data);
    }
}