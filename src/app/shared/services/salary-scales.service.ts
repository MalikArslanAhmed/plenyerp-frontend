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
export class SalaryScalesService extends BaseService {
    constructor(public http: HttpClient, public alertService: AlertService, public globalService: GlobalService) {
        super(http, alertService, globalService);
    }

    addSalaryScales(data): Observable<any> {
        return this.postRequest(AppUrl.SALARY_SCALES(), data);
    }

    getSalaryScales(data): Observable<any> {
        return this.getRequest(AppUrl.GET_SALARY_SCALES(), data);
    }

    deleteSalaryScales(id): Observable<any> {
        return this.deleteRequest(AppUrl.DELETE_SALARY_SCALES(id));
    }

    updateSalaryScales(id, data): Observable<any> {
        return this.putRequest(AppUrl.SALARY_SCALES(id), data);
    }

    /*getGradeLevels(data): Observable<any> {
        return this.getRequest(AppUrl.GRADE_LEVEL(), data);
    }*/

    getGradeLevels(data): Observable<any> {
        return this.getRequest(AppUrl.GRADE_LEVEL(data.id));
    }

    addGradeLevel(data): Observable<any> {
        return this.postRequest(AppUrl.GRADE_LEVEL(), data);
    }

    updateGradeLevel(id, data): Observable<any> {
        return this.putRequest(AppUrl.GRADE_LEVEL(id), data);
    }

    deleteGradeLevel(id): Observable<any> {
        return this.deleteRequest(AppUrl.DELETE_GRADE_LEVEL(id));
    }

    addStepLevel(data): Observable<any> {
        return this.postRequest(AppUrl.STEP_LEVEL(), data);
    }

    updateStepLevel(id, data): Observable<any> {
        return this.putRequest(AppUrl.STEP_LEVEL(id), data);
    }

    deleteStepLevel(id): Observable<any> {
        return this.deleteRequest(AppUrl.DELETE_STEP_LEVEL(id));
    }
}