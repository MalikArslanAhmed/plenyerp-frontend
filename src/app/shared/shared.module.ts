import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {PermissionBindDirective} from './directives/permission-bind.directive';
import {MomentDatePipe} from './pipes/moment-date.pipe';
import {NumberToWordsPipe} from './pipes/number-to-word.pipe';
import {UnderscoreSeparatePipe} from './pipes/underscore-separate.pipe';
import {AbsoluteAmountPipe} from './pipes/absolute-amount.pipe';
import {IndianNumberPipe} from './pipes/indian-number.pipe';

@NgModule({
    declarations: [
        PermissionBindDirective,
        MomentDatePipe,
        NumberToWordsPipe,
        UnderscoreSeparatePipe,
        AbsoluteAmountPipe,
        IndianNumberPipe
    ],
    imports: [
        CommonModule
    ],
    exports: [
        PermissionBindDirective,
        MomentDatePipe,
        NumberToWordsPipe,
        UnderscoreSeparatePipe,
        AbsoluteAmountPipe,
        IndianNumberPipe
    ]
})
export class SharedModule {
}
