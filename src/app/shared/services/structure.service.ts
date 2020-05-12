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
export class StructureService extends BaseService {
    constructor(public http: HttpClient, public alertService: AlertService, public globalService: GlobalService) {
        super(http, alertService, globalService);
    }

    getJobLocations(data): Observable<any> {
        return this.getRequest(AppUrl.GET_JOB_LOCATIONS(), data);
    }

    addStructures(data): Observable<any> {
        return this.postRequest(AppUrl.WORK_LOCATIONS(), data);
    }

    updateStructure(id, data): Observable<any> {
        return this.putRequest(AppUrl.WORK_LOCATIONS(id), data);
    }

    deleteStructure(id): Observable<any> {
        return this.deleteRequest(AppUrl.DELETE_WORK_LOCATION(id));
    }

    getDesignations(data): Observable<any> {
        return this.getRequest(AppUrl.GET_DESIGNATIONS(), data);
    }

    addJobPosition(data): Observable<any> {
        return this.postRequest(AppUrl.ADD_JOB_POSITIONS(), data);
    }
}