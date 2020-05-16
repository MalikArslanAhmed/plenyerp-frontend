import {Injectable} from '@angular/core';

@Injectable()
export class AppConstants {
    static maritalStatuses = [
        {
            'name': 'Others',
            'value': 'OTHERS'
        },
        {
            'name': 'Married',
            'value': 'MARRIED'
        },
        {
            'name': 'Unmarried',
            'value': 'SINGLE'
        }
    ];

    static genders = [
        {
            'name': 'Male',
            'value': 'MALE'
        },
        {
            'name': 'Female',
            'value': 'FEMALE'
        },
    ];

    static religions = [
        {
            'name': 'Hinduism',
            'value': 'HINDUISM',
        },
        {
            'name': 'Christianity',
            'value': 'CHRISTIANITY',
        },
        {
            'name': 'Muslim',
            'value': 'MUSLIM',
        },
        {
            'name': 'Buddhism',
            'value': 'BUDDHISM',
        },
        {
            'name': 'Others',
            'value': 'OTHERS',
        }
    ];
}