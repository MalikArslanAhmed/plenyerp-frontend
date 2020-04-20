import {HttpEvent, HttpEventType, HttpResponse} from '@angular/common/http';
import {filter, map, tap} from 'rxjs/operators';
import {pipe} from 'rxjs';
import {FormGroup} from '@angular/forms';
import {EventEmitter, Injectable} from '@angular/core';
import * as moment from 'moment';

@Injectable({
    providedIn: 'root'
})
export class UtilsService {
    isLoading = new EventEmitter();

    static downloadFile(url) {
        const newWin = window.open(url, 'blank');
        if (!newWin || newWin.closed || typeof newWin.closed === 'undefined') {
            alert('Please Allow Pop Up');
        }
    }

    static pick(object, keys) {
        const res = {};
        keys.forEach((key) => {
            if (object[key] || object[key] === 0 || object[key] === false) {
                res[key] = object[key];
            }
        });
        return res;
    }

    static getLeftOut(pagination = {total: 0, page: 1, perpage: 10}) {
        return Math.max(0, pagination.total - (pagination.page * pagination.perpage));
    }

    static parseWeight(weight = '') {
        const w: any = weight + '';
        let result = '';
        const digits = '-0123456789.';
        for (let i in w) {
            if (digits.indexOf(w[i]) > -1) {
                result += w[i];
            }
        }
        return isNaN(parseFloat(result)) ? 0 : parseFloat(result);
    }

    static getDatepickerDate(date) {
        const array = date.split('-');
        const mainDate = {
            year: parseInt(array[0]),
            month: parseInt(array[1]),
            day: parseInt(array[2])
        };
        return mainDate;
    }

    static deleteEmptyKeys(object) {
        const obj = object;
        if (object) {
            for (const key in obj) {
                if (obj[key] === undefined || obj[key] === null || obj[key].length <= 0) {
                    delete obj[key];
                }
            }
        }
        return obj;
    }

    static checkValue(key) {
        if (!key) {
            return '-'
        }
        return key;
    }

    daysSinceLastUpdated(dateToCompareFrom) {
        if (!dateToCompareFrom) {
            return '-';
        }
        moment.updateLocale('en', {
            relativeTime: {
                d: '1',
                dd: '%d',
            }
        });
        const a = moment(new Date(dateToCompareFrom));
        return Math.abs(a.diff(new Date(), 'days'));
    }
}


export function uploadProgress<T>(cb: (progress: number) => void) {
    return tap((event: HttpEvent<T>) => {
        if (event.type === HttpEventType.UploadProgress) {
            cb(Math.round((100 * event.loaded) / event.total));
        }
    });
}

export function uploadRemainingTime<T>(cb: (sec: number) => void) {
    return tap((event: HttpEvent<T>) => {
        if (event.type === HttpEventType.UploadProgress) {
            cb(Math.round((event.total - event.loaded) / 1703936));
        }
    });
}

export function toResponseBody<T>() {
    return pipe(
        filter((event: HttpEvent<T>) => event.type === HttpEventType.Response),
        map((res: HttpResponse<T>) => res.body)
    );
}

export function markAllAsDirty(form: FormGroup) {
    for (const control of Object.keys(form.controls)) {
        form.controls[control].markAsDirty();
    }
}

export function percentageClass(percentage) {
    const intPercentage = parseInt(percentage, 10);
    if (intPercentage >= 0 && intPercentage <= 50) {
        return 'bg-danger';
    } else if (intPercentage > 50 && intPercentage <= 80) {
        return 'bg-warning';
    } else if (intPercentage > 80 && intPercentage <= 100) {
        return 'bg-primary';
    } else {
        return 'bg-info'
    }
}

export function isValidPhoneNumber(str) {
    return /^[0]?[6789]\d{9}$/.test(str);
}
