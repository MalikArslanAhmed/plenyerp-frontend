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
export class ArmOfServiceService extends BaseService {
    constructor(public http: HttpClient, public alertService: AlertService, public globalService: GlobalService) {
        super(http, alertService, globalService);
    }

    addArmOfService(data): Observable<any> {
        return this.postRequest(AppUrl.ARM_OF_SERVICE(), data);
    }

    getArmOfServices(data): Observable<any> {
        return this.getRequest(AppUrl.GET_ARM_OF_SERVICES(), data);
    }

    deleteArmOfService(id): Observable<any> {
        return this.deleteRequest(AppUrl.DELETE_ARM_OF_SERVICE(id));
    }

    updateArmOfService(id, data): Observable<any> {
        return this.putRequest(AppUrl.ARM_OF_SERVICE(id), data);
    }
}