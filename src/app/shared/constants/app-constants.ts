import {Injectable} from '@angular/core';

@Injectable()
export class AppConstants {
    static ROLE_ID_ADMIN = 1;
    static ROLE_ID_HR = 7;
    static ROLE_ID_INVENTORY = 3;

    static maritalStatuses = [
        {
            name: 'Unmarried',
            value: 'SINGLE'
        },
        {
            name: 'Married',
            value: 'MARRIED'
        },
        {
            name: 'Divorced',
            value: 'DIVORCED'
        },
        {
            name: 'Widowed',
            value: 'WIDOWED'
        },
        {
            name: 'Others',
            value: 'OTHERS'
        }
    ];

    static genders = [
        {
            name: 'Male',
            value: 'MALE'
        },
        {
            name: 'Female',
            value: 'FEMALE'
        },
    ];

    static religions = [
        {
            name: 'Hinduism',
            value: 'HINDUISM',
        },
        {
            name: 'Christianity',
            value: 'CHRISTIANITY',
        },
        {
            name: 'Muslim',
            value: 'MUSLIM',
        },
        {
            name: 'Buddhism',
            value: 'BUDDHISM',
        },
        {
            name: 'Others',
            value: 'OTHERS',
        }
    ];

    static typeOfAppointments = [
        {
            name: 'Permanent Staff',
            value: 'PERMANENT_STAFF',
        },
        {
            name: 'Tenured',
            value: 'TENURED',
        },
        {
            name: 'Sabbatical',
            value: 'SABBATICAL',
        },
        {
            name: 'Visiting',
            value: 'VISITING',
        },
        {
            name: 'Contract',
            value: 'CONTRACT',
        },
        {
            name: 'Adjunct',
            value: 'ADJUNCT',
        },
        {
            name: 'Month To Month',
            value: 'MONTH_TO_MONTH',
        },
        {
            name: 'Temporary',
            value: 'TEMPORARY',
        },
        {
            name: 'Full Time',
            value: 'FULL_TIME',
        },
        {
            name: 'Not Applicable',
            value: 'NOT_APPLICABLE',
        }
    ];
}