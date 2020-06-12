import {BaseService} from './base.service';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {AlertService} from './alert.service';
import {GlobalService} from './global.service';
import {Observable} from 'rxjs';
import {AppUrl} from '../constants/app-url';
import {Injectable} from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class UserProfileService extends BaseService {
    constructor(public http: HttpClient, public alertService: AlertService, public globalService: GlobalService) {
        super(http, alertService, globalService);
    }

    getSelf(): Observable<any> {
        return this.getRequest(AppUrl.SELF);
    }

    getUpdate(data): Observable<any> {
        return this.putRequest(AppUrl.USER_UPDATE(), data);
    }

    getRemoveProfileImg(data): Observable<any> {
        return this.putRequestWithoutDataDeletion(AppUrl.USER_UPDATE(), data);
    }

    public uploadFile(obj): Observable<any> {
        let headers = new HttpHeaders();
        headers = headers.set('Content-Type', 'multipart/form-data');

        return this.http.post(AppUrl.USER_IMAGE_UPLOAD(), toFormData(obj), {
            headers: headers
        });
    }
}

// tslint:disable-next-line:typedef
export function toFormData<T>(formValue: T) {
    const formData = new FormData();

    for (const key of Object.keys(formValue)) {
        const value = formValue[key];
        formData.append(key, value);
    }

    return formData;
}