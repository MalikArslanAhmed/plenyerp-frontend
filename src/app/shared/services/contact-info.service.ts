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
export class ContactInfoService extends BaseService {
    constructor(public http: HttpClient, public alertService: AlertService, public globalService: GlobalService) {
        super(http, alertService, globalService);
    }

    addCountry(data): Observable<any> {
        return this.postRequest(AppUrl.COUNTRIES(), data);
    }

    getCountryList(data): Observable<any> {
        return this.getRequest(AppUrl.GET_COUNTRY_LIST(), data);
    }

    deleteCountry(id): Observable<any> {
        return this.deleteRequest(AppUrl.DELETE_COUNTRY(id));
    }

    updateCountry(id, data): Observable<any> {
        return this.putRequest(AppUrl.COUNTRIES(id), data);
    }
    deleteRegion(id): Observable<any> {
        return this.deleteRequest(AppUrl.DELETE_REGION(id));
    }
    getRegionList(data): Observable<any> {
        return this.getRequest(AppUrl.GET_REGION_LIST(), data);
    }
    addRegion(data): Observable<any> {
        return this.postRequest(AppUrl.REGIONS(), data);
    }
    updateRegion(id, data): Observable<any> {
        return this.putRequest(AppUrl.REGIONS(id), data);
    }
    getStateList(data): Observable<any> {
        return this.getRequest(AppUrl.GET_STATE_LIST(), data);
    }
    addState(data): Observable<any> {
        return this.postRequest(AppUrl.STATES(), data);
    }
    updateState(id, data): Observable<any> {
        return this.putRequest(AppUrl.STATES(id), data);
    }
    deleteStates(id): Observable<any> {
        return this.deleteRequest(AppUrl.DELETE_STATE(id));
    }
    getLgaList(data): Observable<any> {
        return this.getRequest(AppUrl.GET_LGA_LIST(), data);
    }
    addLga(data): Observable<any> {
        return this.postRequest(AppUrl.LGAS(), data);
    }
    updateLga(id, data): Observable<any> {
        return this.putRequest(AppUrl.LGAS(id), data);
    }
    deleteLga(id): Observable<any> {
        return this.deleteRequest(AppUrl.DELETE_LGA(id));
    }
    country(): Observable<any> {
        return this.getRequest(AppUrl.GET_COUNTRY());
    }
    region(data): Observable<any> {
        return this.getRequest(AppUrl.GET_REGION(), data);
    }
    state(data): Observable<any> {
        return this.getRequest(AppUrl.GET_STATE(), data);
    }

    getLeavesTypeList(data): Observable<any> {
        return this.getRequest(AppUrl.GET_LEAVES_TYPE_LIST(), data);
    }
    addLeaves(data): Observable<any> {
        return this.postRequest(AppUrl.LEAVES_TYPE(), data);
    }
    updateLeaves(id, data): Observable<any> {
        return this.putRequest(AppUrl.LEAVES_TYPE(id), data);
    }
    deleteLeaves(id): Observable<any> {
        return this.deleteRequest(AppUrl.DELETE_LEAVES(id));
    }

    getLeavesGroupList(data): Observable<any> {
        return this.getRequest(AppUrl.GET_LEAVE_GROUP_LIST(), data);
    }
    addLeavesGroup(data): Observable<any> {
        return this.postRequest(AppUrl.LEAVES_GROUP(), data);
    }
    updateLeavesGroup(id, data): Observable<any> {
        return this.putRequest(AppUrl.LEAVES_GROUP(id), data);
    }
    deleteLeavesGroup(id): Observable<any> {
        return this.deleteRequest(AppUrl.DELETE_LEAVES_GROUP(id));
    }

    getPublicHolidayList(data): Observable<any> {
        return this.getRequest(AppUrl.GET_PUBLIC_HOLIDAY_LIST(), data);
    }
    addPublicHoliday(data): Observable<any> {
        return this.postRequest(AppUrl.PUBLIC_HOLIDAY(), data);
    }
    updatePublicHoliday(id, data): Observable<any> {
        return this.putRequest(AppUrl.PUBLIC_HOLIDAY(id), data);
    }
    deletePublicHoliday(id): Observable<any> {
        return this.deleteRequest(AppUrl.DELETE_PUBLIC_HOLIDAY(id));
    }

    getDesignationList(data): Observable<any> {
        return this.getRequest(AppUrl.GET_DESIGNATION_LIST(), data);
    }
    addDesignation(data): Observable<any> {
        return this.postRequest(AppUrl.DESIGNATION(), data);
    }
    updateDesignation(id, data): Observable<any> {
        return this.putRequest(AppUrl.DESIGNATION(id), data);
    }
    deleteDesignation(id): Observable<any> {
        return this.deleteRequest(AppUrl.DELETE_DESIGNATION(id));
    }

}