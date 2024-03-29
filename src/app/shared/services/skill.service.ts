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
export class SkillService extends BaseService {
    constructor(public http: HttpClient, public alertService: AlertService, public globalService: GlobalService) {
        super(http, alertService, globalService);
    }

    addSkill(data): Observable<any> {
        return this.postRequest(AppUrl.SKILL(), data);
    }

    getSkills(data): Observable<any> {
        return this.getRequest(AppUrl.GET_SKILLS(), data);
    }

    deleteSkill(id): Observable<any> {
        return this.deleteRequest(AppUrl.DELETE_SKILL(id));
    }

    updateSkill(id, data): Observable<any> {
        return this.putRequest(AppUrl.SKILL(id), data);
    }
}