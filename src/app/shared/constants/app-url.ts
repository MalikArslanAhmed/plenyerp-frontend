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
        return AppUrl.API_URL + `work-locations`;
    }

    static GET_JOB_LOCATIONS(): string {
        return AppUrl.API_URL + `job-positions`;
    }

    static GET_DESIGNATIONS(): string {
        return AppUrl.API_URL + `designations`;
    }

    static WORK_LOCATIONS(id?): string {
        if (id) {
            return AppUrl.API_URL + `work-locations/` + id;
        } else {
            return AppUrl.API_URL + `work-locations`;
        }
    }

    static ADD_JOB_POSITIONS(): string {
        return AppUrl.API_URL + `job-positions`;
    }

    static DELETE_WORK_LOCATION(id): string {
        return AppUrl.API_URL + `work-locations/` + id;
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
            return AppUrl.API_URL + 'public-holidays/' + id;
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
        return AppUrl.API_URL + 'public-holidays/' + id;
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

    static SCHEDULES(id?): string {
        if (id) {
            return AppUrl.API_URL + 'schedules/' + id;
        } else {
            return AppUrl.API_URL + 'schedules';
        }
    }

    static GET_SCHEDULES(): string {
        return AppUrl.API_URL + `schedules`;
    }

    static DELETE_SCHEDULE(id?): string {
        return AppUrl.API_URL + 'schedules/' + id;
    }

    static ACAMEDIC_MAJOR(id?): string {
        if (id) {
            return AppUrl.API_URL + 'academics/' + id;
        } else {
            return AppUrl.API_URL + 'academics';
        }
    }

    static GET_ACAMEDIC_MAJORS(): string {
        return AppUrl.API_URL + `academics`;
    }

    static DELETE_ACAMEDIC_MAJOR(id?): string {
        return AppUrl.API_URL + 'academics/' + id;
    }

    static RELATIONSHIP(id?): string {
        if (id) {
            return AppUrl.API_URL + 'relationships/' + id;
        } else {
            return AppUrl.API_URL + 'relationships';
        }
    }

    static GET_RELATIONSHIPS(): string {
        return AppUrl.API_URL + `relationships`;
    }

    static DELETE_RELATIONSHIP(id?): string {
        return AppUrl.API_URL + 'relationships/' + id;
    }

    static CATEGORY(id?): string {
        if (id) {
            return AppUrl.API_URL + 'categories/' + id;
        } else {
            return AppUrl.API_URL + 'categories';
        }
    }

    static GET_CATEGORIES(): string {
        return AppUrl.API_URL + `categories`;
    }

    static DELETE_CATEGORY(id?): string {
        return AppUrl.API_URL + 'categories/' + id;
    }

    static STATUS(id?): string {
        if (id) {
            return AppUrl.API_URL + 'status/' + id;
        } else {
            return AppUrl.API_URL + 'status';
        }
    }

    static GET_STATUSES(): string {
        return AppUrl.API_URL + `status`;
    }

    static DELETE_STATUS(id?): string {
        return AppUrl.API_URL + 'status/' + id;
    }

    static DISENGAGEMENT(id?): string {
        if (id) {
            return AppUrl.API_URL + 'disengagements/' + id;
        } else {
            return AppUrl.API_URL + 'disengagements';
        }
    }

    static GET_DISENGAGEMENTS(): string {
        return AppUrl.API_URL + `disengagements`;
    }

    static DELETE_DISENGAGEMENT(id?): string {
        return AppUrl.API_URL + 'disengagements/' + id;
    }

    static CENSURE(id?): string {
        if (id) {
            return AppUrl.API_URL + 'censures/' + id;
        } else {
            return AppUrl.API_URL + 'censures';
        }
    }

    static GET_CENSURES(): string {
        return AppUrl.API_URL + `censures`;
    }

    static DELETE_CENSURE(id?): string {
        return AppUrl.API_URL + 'censures/' + id;
    }

    static ARM_OF_SERVICE(id?): string {
        if (id) {
            return AppUrl.API_URL + 'arm-of-services/' + id;
        } else {
            return AppUrl.API_URL + 'arm-of-services';
        }
    }

    static GET_ARM_OF_SERVICES(): string {
        return AppUrl.API_URL + `arm-of-services`;
    }

    static DELETE_ARM_OF_SERVICE(id?): string {
        return AppUrl.API_URL + 'arm-of-services/' + id;
    }

    static MEMBERSHIP(id?): string {
        if (id) {
            return AppUrl.API_URL + 'memberships/' + id;
        } else {
            return AppUrl.API_URL + 'memberships';
        }
    }

    static GET_MEMBERSHIPS(): string {
        return AppUrl.API_URL + `memberships`;
    }

    static DELETE_MEMBERSHIP(id?): string {
        return AppUrl.API_URL + 'memberships/' + id;
    }

    static SALARY_SCALES(id?): string {
        if (id) {
            return AppUrl.API_URL + 'salary-scales/' + id;
        } else {
            return AppUrl.API_URL + 'salary-scales';
        }
    }

    static GET_SALARY_SCALES(): string {
        return AppUrl.API_URL + `salary-scales`;
    }

    static DELETE_SALARY_SCALES(id?): string {
        return AppUrl.API_URL + 'salary-scales/' + id;
    }

    static GRADE_LEVEL(id?): string {
        if (id) {
            return AppUrl.API_URL + 'grade-levels/' + id;
        } else {
            return AppUrl.API_URL + 'grade-levels';
        }
    }

    static DELETE_GRADE_LEVEL(id?): string {
        return AppUrl.API_URL + 'grade-levels/' + id;
    }

    static STEP_LEVEL(id?): string {
        if (id) {
            return AppUrl.API_URL + 'grade-levels-steps/' + id;
        } else {
            return AppUrl.API_URL + 'grade-levels-steps';
        }
    }

    static DELETE_STEP_LEVEL(id?): string {
        return AppUrl.API_URL + 'grade-levels-steps/' + id;
    }


    static GET_ALL_SEGMENTS(id?): string {
        if (id) {
            return AppUrl.API_URL + 'admin/' + id;
        } else {
            return AppUrl.API_URL + 'admin';
        }
    }

    static ADD_SEGMENT(id?): string {
        if (id) {
            return AppUrl.API_URL + 'admin/' + id;
        } else {
            return AppUrl.API_URL + 'admin';
        }
    }

    static GET_COUNTRY_LIST(): string {
        return AppUrl.API_URL + `countries`;
    }

    static GET_REGION_LIST(): string {
        return AppUrl.API_URL + `regions`;
    }

    static GET_STATE_LIST(): string {
        return AppUrl.API_URL + `states`;
    }

    static GET_LGA_LIST(): string {
        return AppUrl.API_URL + `lgas`;
    }

    static GET_COUNTRY(): string {
        return AppUrl.API_URL + `countries`;
    }

    static GET_REGION(): string {
        return AppUrl.API_URL + `regions`;
    }

    static GET_STATE(): string {
        return AppUrl.API_URL + `states`;
    }

    static GET_LEAVES_TYPE_LIST(): string {
        return AppUrl.API_URL + `leaves`;
    }

    static LEAVES_TYPE(id?): string {
        if (id) {
            return AppUrl.API_URL + 'leaves/' + id;
        } else {
            return AppUrl.API_URL + 'leaves';
        }
    }

    static DELETE_LEAVES(id?): string {
        return AppUrl.API_URL + 'leaves/' + id;
    }

    static GET_LEAVE_GROUP_LIST(): string {
        return AppUrl.API_URL + `leave-groups`;
    }

    static LEAVES_GROUP(id?): string {
        if (id) {
            return AppUrl.API_URL + 'leave-groups/' + id;
        } else {
            return AppUrl.API_URL + 'leave-groups';
        }
    }

    static DELETE_LEAVES_GROUP(id?): string {
        return AppUrl.API_URL + 'leave-groups/' + id;
    }

    static GET_PUBLIC_HOLIDAY_LIST(): string {
        return AppUrl.API_URL + `public-holidays`;
    }

    static PUBLIC_HOLIDAY(id?): string {
        if (id) {
            return AppUrl.API_URL + 'public-holidays/' + id;
        } else {
            return AppUrl.API_URL + 'public-holidays';
        }
    }

    static DELETE_PUBLIC_HOLIDAY(id?): string {
        return AppUrl.API_URL + 'public-holidays/' + id;
    }

    static GET_DESIGNATION_LIST(): string {
        return AppUrl.API_URL + `designations`;
    }

    static DESIGNATION(id?): string {
        if (id) {
            return AppUrl.API_URL + 'designations/' + id;
        } else {
            return AppUrl.API_URL + 'designations';
        }
    }

    static DELETE_DESIGNATION(id?): string {
        return AppUrl.API_URL + 'designations/' + id;
    }

}
