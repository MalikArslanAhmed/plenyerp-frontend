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
export class RelationshipService extends BaseService {
    constructor(public http: HttpClient, public alertService: AlertService, public globalService: GlobalService) {
        super(http, alertService, globalService);
    }

    addRelationship(data): Observable<any> {
        return this.postRequest(AppUrl.RELATIONSHIP(), data);
    }

    getRelationship(data): Observable<any> {
        return this.getRequest(AppUrl.GET_RELATIONSHIPS(), data);
    }

    deleteRelationship(id): Observable<any> {
        return this.deleteRequest(AppUrl.DELETE_RELATIONSHIP(id));
    }

    updateRelationship(id, data): Observable<any> {
        return this.putRequest(AppUrl.RELATIONSHIP(id), data);
    }
}