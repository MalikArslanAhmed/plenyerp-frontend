import { BaseService } from './base.service';
import { HttpClient } from '@angular/common/http';
import { AlertService } from './alert.service';
import { GlobalService } from './global.service';
import { Observable } from 'rxjs';
import { AppUrl } from '../constants/app-url';
import { Injectable } from '@angular/core';

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


    country(data): Observable<any> {
        return this.getRequest(AppUrl.GET_COUNTRY(), data);
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
    //
    getLeaveGroupMemberList(data): Observable<any> {
        return this.getRequest(AppUrl.GET_LEAVE_GROUP_MEMBER_LIST(), data);
    }
    addLeaveGroupMember(data): Observable<any> {
        return this.postRequest(AppUrl.LEAVE_GROUP_MEMBER(), data);
    }
    updateLeaveGroupMember(id, data): Observable<any> {
        return this.putRequest(AppUrl.LEAVE_GROUP_MEMBER(id), data);
    }
    deleteLeaveGroupMember(id): Observable<any> {
        return this.deleteRequest(AppUrl.DELETE_LEAVE_GROUP_MEMBER(id));
    }
    //
    //Group Entitlement calls
    getLeaveGroupEntitlementList(data): Observable<any> {
        return this.getRequest(AppUrl.GET_LEAVE_GROUP_Entitlement_LIST(), data);
    }
    addLeaveGroupEntitlement(data): Observable<any> {
        return this.postRequest(AppUrl.LEAVE_GROUP_Entitlement(), data);
    }
    updateLeaveGroupEntitlement(id, data): Observable<any> {
        return this.putRequest(AppUrl.LEAVE_GROUP_Entitlement(id), data);
    }
    deleteLeaveGroupEntitlement(id): Observable<any> {
        return this.deleteRequest(AppUrl.DELETE_LEAVE_GROUP_Entitlement(id));
    }
    //Group entitlements calls end

    // Leave Year start
    getLeaveYearList(data): Observable<any> {
        return this.getRequest(AppUrl.GET_LEAVE_YEAR_LIST(), data);
    }
    addLeaveYear(data): Observable<any> {
        return this.postRequest(AppUrl.LEAVE_YEAR(), data);
    }
    updateLeaveYear(id, data): Observable<any> {
        return this.putRequest(AppUrl.LEAVE_YEAR(id), data);
    }
    deleteLeaveYear(id): Observable<any> {
        return this.deleteRequest(AppUrl.DELETE_LEAVE_YEAR(id));
    }
    //Leave year apis end

    // Leave Credit start
    getLeaveCreditList(data): Observable<any> {
        return this.getRequest(AppUrl.GET_LEAVE_CREDIT_LIST(), data);
    }
    addLeaveCredit(data): Observable<any> {
        return this.postRequest(AppUrl.LEAVE_CREDIT(), data);
    }
    updateLeaveCredit(id, data): Observable<any> {
        return this.putRequest(AppUrl.LEAVE_CREDIT(id), data);
    }
    deleteLeaveCredit(id): Observable<any> {
        return this.deleteRequest(AppUrl.DELETE_LEAVE_CREDIT(id));
    }
    //Leave credit apis end

    // Hr Information start
    getInformationList(data): Observable<any> {
        return this.getRequest(AppUrl.GET_HR_INFORMATION_LIST(), data);
    }
    addInformation(data): Observable<any> {
        return this.postRequest(AppUrl.HR_INFORMATION(), data);
    }
    updateInformation(id, data): Observable<any> {
        return this.putRequest(AppUrl.HR_INFORMATION(id), data);
    }
    deleteInformation(id): Observable<any> {
        return this.deleteRequest(AppUrl.DELETE_HR_INFORMATION(id));
    }
    //Hr Information apis end
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

    getAddressTypeList(data): Observable<any> {
        return this.getRequest(AppUrl.GET_ADDRESS_TYPE_LIST(), data);
    }

    deleteAddressType(id): Observable<any> {
        return this.deleteRequest(AppUrl.DELETE_ADDRESS_TYPE(id));
    }

    addAddressType(data): Observable<any> {
        return this.postRequest(AppUrl.ADDRESS_TYPE(), data);
    }

    updateAddressType(id, data): Observable<any> {
        return this.putRequest(AppUrl.ADDRESS_TYPE(id), data);
    }


    addPhoneType(data): Observable<any> {
        return this.postRequest(AppUrl.PHONE_TYPE(), data);
    }

    getPhoneTypeList(data): Observable<any> {
        return this.getRequest(AppUrl.GET_PHONE_TYPE_LIST(), data);
    }

    deletePhoneType(id): Observable<any> {
        return this.deleteRequest(AppUrl.DELETE_PHONE_TYPE(id));
    }

    updatePhoneType(id, data): Observable<any> {
        return this.putRequest(AppUrl.PHONE_TYPE(id), data);
    }

}