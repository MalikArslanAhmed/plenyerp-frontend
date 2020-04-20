import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {throwError} from 'rxjs';
import {catchError, map} from 'rxjs/operators';
import {AlertService} from './alert.service';
import {UtilsService} from './utils.service';
import {StorageService} from "./storage.service";
import {GlobalService} from './global.service';
import {takeUntil} from 'rxjs/internal/operators';

@Injectable()
export class BaseService {
    constructor(public http: HttpClient, public alertService: AlertService, public globalService: GlobalService) {
    }

    public joinMessages(array) {
        let string = '';
        array.forEach(message => {
            string = string + message;
        });
        return string;
    }

    public postRequest(url, data = {}, handler = {success: null, failure: null}) {
        data = UtilsService.deleteEmptyKeys(data);
        return this.postRequestWithoutDataDeletion(url, data, handler);
    }

    public postRequestWithoutDataDeletion(url, data = {}, handler = {success: null, failure: null}) {
        return this.http.post(url, data).pipe(takeUntil(this.globalService.isSessionExist),
            map(res => {
                if (res['message']) {
                    this.alertService.showSuccess({title: 'Success', message: res['message']});
                }
                return res['data'];
            }),
            catchError(err => {
                return this.handleError(err);
            })
        );
    }

    public patchRequest(url, data = {}) {
        data = UtilsService.deleteEmptyKeys(data);
        return this.http.patch(url, data).pipe(
            takeUntil(this.globalService.isSessionExist),
            map(res => {
                if (res['message']) {
                    this.alertService.showSuccess({title: 'Success', message: res['message']});
                }
                return res['data'];
            }),
            catchError(err => {
                return this.handleError(err);
            })
        );
    }

    public deleteRequest(url, data = {}) {
        data = UtilsService.deleteEmptyKeys(data);
        return this.http.delete(url, data).pipe(
            takeUntil(this.globalService.isSessionExist),
            map(res => {
                if (res['message']) {
                    this.alertService.showSuccess({title: 'Success', message: res['message']});
                }
                return res['data'];
            }),
            catchError(err => {
                return this.handleError(err);
            })
        );
    }

    public putRequest(url, data = {}) {
        data = UtilsService.deleteEmptyKeys(data);
        return this.putRequestWithoutDataDeletion(url, data);
    }

    public putRequestWithoutDataDeletion(url, data = {}) {
        return this.http.put(url, data).pipe(
            takeUntil(this.globalService.isSessionExist),
            map(res => {
                if (res['message']) {
                    this.alertService.showSuccess({title: 'Success', message: res['message']});
                }
                return res['data'];
            }),
            catchError(err => {
                return this.handleError(err);
            })
        );
    }

    public getRequest(url, params = {}) {
        return this.http.get(url, {params}).pipe(
            takeUntil(this.globalService.isSessionExist),
            map(res => {
                return res['data'];
            }),
            catchError(err => {
                return this.handleError(err);
            })
        );
    }


    public handleError(error: HttpErrorResponse) {
        if (error instanceof HttpErrorResponse) {
            if (error.status === 401 && error.error && error.error.type !== 'INVALID_CREDENTIALS') {
                StorageService.clearAll();
                this.globalService.setIsSessionExist();
                this.alertService.showErrors('Session Expired!');
            }
        }

        if (error instanceof ErrorEvent) {
            console.error('An error occurred:', error.error.message);
        } else {
            console.error(
                `Backend returned code ${error.status}, ` +
                `body was: ${error.error}`);
        }
        console.log(error);
        switch (error.error.type) {
            case 'INTERNAL_SERVER_ERROR':
            case 'RESOURCE_NOT_FOUND':
            case 'FORBIDDEN_ERROR':
            case 'INVALID_CREDENTIALS':
            case 'BUSINESS_LOGIC_ERROR':
            case 'BAD_REQUEST':
                this.alertService.showErrors(error.error.error);
                return throwError(error.error.error);
            case 'VALIDATION':
                const errorMessageObject = error.error.message;
                this.alertService.showErrors(this.returnArrayOfErrors(errorMessageObject));
                return throwError(this.returnArrayOfErrors(errorMessageObject));
        }
        return throwError(error);
    }

    public returnArrayOfErrors(errorMessageObject) {
        const parsedArray = [];
        Object.keys(errorMessageObject).forEach(message => {
            const keyName = (message.split('.').join(' ')).replace(/([A-Z])/g, ' $1').replace(/\w\S*/g, function (txt) {
                return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
            });
            const description = this.joinMessages(errorMessageObject[message]).split('.').join(' ');
            const errorObject = {
                keyName,
                description,
                completeMessage: `${keyName} : ${description}`
            };
            parsedArray.push(errorObject);
        });
        return parsedArray;
    }
}