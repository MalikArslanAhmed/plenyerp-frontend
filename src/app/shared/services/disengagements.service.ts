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
export class DisengagementsService extends BaseService {
    constructor(public http: HttpClient, public alertService: AlertService, public globalService: GlobalService) {
        super(http, alertService, globalService);
    }

    addDisengagement(data): Observable<any> {
        return this.postRequest(AppUrl.DISENGAGEMENT(), data);
    }

    getDisengagements(data): Observable<any> {
        return this.getRequest(AppUrl.GET_DISENGAGEMENTS(), data);
    }

    deleteDisengagement(id): Observable<any> {
        return this.deleteRequest(AppUrl.DELETE_DISENGAGEMENT(id));
    }

    updateDisengagement(id, data): Observable<any> {
        return this.putRequest(AppUrl.DISENGAGEMENT(id), data);
    }
}