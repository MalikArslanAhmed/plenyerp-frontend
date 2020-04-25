import {environment} from '../../../environments/environment';
import {Injectable} from '@angular/core';

@Injectable()
export class AppUrl {
    static get API_URL(): string {
        return environment.appUrl + 'api/';
    }

    static get APP_URL(): string {
        return environment.appUrl + 'admin/';
    }

    static get VERIFY_USER(): string {
        return AppUrl.APP_URL + 'verify-user';
    }

    static get AUTH(): string {
        return AppUrl.API_URL + 'authenticate';
    }

    static get SELF(): string {
        return AppUrl.API_URL + 'self';
    }

    static QUALIFICATION(id?): string {
        if (id) {
            return AppUrl.API_URL + 'qualifications/' + id;
        } else {
            return AppUrl.API_URL + 'qualifications';
        }
    }

    static GET_QUALIFICATIONS(): string {
        return AppUrl.API_URL + `qualifications`;
    }

    static DELETE_QUALIFICATION(id?): string {
        return AppUrl.API_URL + 'qualifications/' + id;
    }

    static SKILL(id?): string {
        if (id) {
            return AppUrl.API_URL + 'skills/' + id;
        } else {
            return AppUrl.API_URL + 'skills';
        }
    }

    static GET_SKILLS(): string {
        return AppUrl.API_URL + `skills`;
    }

    static DELETE_SKILL(id?): string {
        return AppUrl.API_URL + 'skills/' + id;
    }

    static GET_WORK_LOCATIONS(): string {
        return AppUrl.API_URL + `locations`;
    }

    static COUNTRIES(id?): string {
        if (id) {
            return AppUrl.API_URL + 'countries/' + id;
        } else {
            return AppUrl.API_URL + 'countries';
        }
    }

    static REGIONS(id?): string {
        if (id) {
            return AppUrl.API_URL + 'regions/' + id;
        } else {
            return AppUrl.API_URL + 'regions';
        }
    }

    static STATES(id?): string {
        if (id) {
            return AppUrl.API_URL + 'states/' + id;
        } else {
            return AppUrl.API_URL + 'states';
        }
    }

    static LGAS(id?): string {
        if (id) {
            return AppUrl.API_URL + 'lgas/' + id;
        } else {
            return AppUrl.API_URL + 'lgas';
        }
    }

    static DELETE_COUNTRY(id?): string {
        return AppUrl.API_URL + 'countries/' + id;
    }

    static DELETE_REGION(id?): string {
        return AppUrl.API_URL + 'regions/' + id;
    }

    static DELETE_STATE(id?): string {
        return AppUrl.API_URL + 'states/' + id;
    }

    static DELETE_LGA(id?): string {
        return AppUrl.API_URL + 'lgas/' + id;
    }

    static LANGUAGES(id?): string {
        if (id) {
            return AppUrl.API_URL + 'languages/' + id;
        } else {
            return AppUrl.API_URL + 'languages';
        }
    }

    static GET_LANGUAGES(): string {
        return AppUrl.API_URL + `languages`;
    }

    static DELETE_LANGUAGE(id?): string {
        return AppUrl.API_URL + 'languages/' + id;
    }
}