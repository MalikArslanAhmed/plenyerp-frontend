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
export class QualificationService extends BaseService {
    constructor(public http: HttpClient, public alertService: AlertService, public globalService: GlobalService) {
        super(http, alertService, globalService);
    }

    addQualification(data): Observable<any> {
        return this.postRequest(AppUrl.QUALIFICATION(), data);
    }

    getQualifications(data): Observable<any> {
        return this.getRequest(AppUrl.GET_QUALIFICATIONS(), data);
    }

    deleteQualification(id): Observable<any> {
        return this.deleteRequest(AppUrl.DELETE_QUALIFICATION(id));
    }

    updateQualification(id, data): Observable<any> {
        return this.putRequest(AppUrl.QUALIFICATION(id), data);
    }
}