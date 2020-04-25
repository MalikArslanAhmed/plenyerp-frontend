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
export class AcademicMajorService extends BaseService {
    constructor(public http: HttpClient, public alertService: AlertService, public globalService: GlobalService) {
        super(http, alertService, globalService);
    }

    addAcademicMajor(data): Observable<any> {
        return this.postRequest(AppUrl.ACAMEDIC_MAJOR(), data);
    }

    getAcademicMajors(data): Observable<any> {
        return this.getRequest(AppUrl.GET_ACAMEDIC_MAJORS(), data);
    }

    deleteAcademicMajor(id): Observable<any> {
        return this.deleteRequest(AppUrl.DELETE_ACAMEDIC_MAJOR(id));
    }

    updateAcademicMajor(id, data): Observable<any> {
        return this.putRequest(AppUrl.ACAMEDIC_MAJOR(id), data);
    }
}