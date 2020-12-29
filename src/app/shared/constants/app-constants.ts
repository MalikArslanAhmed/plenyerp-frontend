import {Injectable} from '@angular/core';

@Injectable()
export class AppConstants {
    static ROLE_ID_ADMIN = 1;
    static ROLE_ID_HR = 7;
    static ROLE_ID_INVENTORY = 3;
    static ROLE_ID_FINANCIAL = 5;
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

    static REPORT_TYPES = [
        {
            name: 'Semester Wise',
            value: 'SEMESTER'
        },
        {
            name: 'Quarter Wise',
            value: 'QUARTER'
        },
        {
            name: 'Monthly',
            value: 'MONTHLY'
        }
    ];

    static SEMESTERS = [
        {
            name: '1st Semester',
            value: '1'
        },
        {
            name: '2nd Semester',
            value: '2'
        }
    ];

    static QUARTERS = [
        {
            name: '1st Quarter',
            value: '1'
        },
        {
            name: '2nd Quarter',
            value: '2'
        },
        {
            name: '3rd Quarter',
            value: '3'
        },
        {
            name: '4th Quarter',
            value: '4'
        }
    ];

    static MONTHS = [
        {
            name: 'January',
            value: '1'
        },
        {
            name: 'February',
            value: '2'
        },
        {
            name: 'March ',
            value: '3'
        },
        {
            name: 'April',
            value: '4'
        },
        {
            name: 'May',
            value: '5'
        },
        {
            name: 'June',
            value: '6'
        },
        {
            name: 'July',
            value: '7'
        },
        {
            name: 'August',
            value: '8'
        },
        {
            name: 'September',
            value: '9'
        },
        {
            name: 'October',
            value: '10'
        },
        {
            name: 'November',
            value: '11'
        },
        {
            name: 'December',
            value: '12'
        },
    ];
}