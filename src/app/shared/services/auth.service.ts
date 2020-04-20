import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {AppUrl} from '../constants/app-url';
import {BaseService} from './base.service';
import {Observable} from 'rxjs';
import {catchError} from 'rxjs/internal/operators';
import {StorageService} from "./storage.service";
import {AlertService} from './alert.service';
import {Router} from '@angular/router';
import {GlobalService} from "./global.service";

@Injectable({
    providedIn: 'root'
})
export class AuthService extends BaseService {

    constructor(public http: HttpClient, public alertService: AlertService, private router: Router, public globalService: GlobalService) {
        super(http, alertService, globalService);
    }

    authenticate(data): Observable<any> {
        return this.postRequest(AppUrl.AUTH, data);
    }

    verifyUser(data): Observable<any> {
        return this.http.post(AppUrl.VERIFY_USER, data)
            .pipe(
                catchError(this.handleError)
            );
    }

    self(params = {}): Observable<any> {
        return this.getRequest(AppUrl.SELF, params);
    }

    logout() {
        StorageService.clearAll();
        this.router.navigateByUrl('/auth/login');
    }
}
