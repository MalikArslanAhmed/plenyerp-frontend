import { Directive } from '@angular/core';
import { MAT_MOMENT_DATE_ADAPTER_OPTIONS, MomentDateAdapter } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import * as _moment from 'moment';
const moment = _moment;
export const DATE_FORMAT_YEAR = {
    parse: {
        dateInput: 'YYYY',
    },
    display: {
        dateInput: 'YYYY',
        monthYearLabel: 'YYYY',
        monthYearA11yLabel: 'YYYY',
    },
};

@Directive({
    selector: '[dateFormatYear]',
    providers: [
        {
            provide: MAT_DATE_FORMATS, useValue: DATE_FORMAT_YEAR
        },
    ],
})
export class DatePickerFormatDirective {

    constructor() { }

}
