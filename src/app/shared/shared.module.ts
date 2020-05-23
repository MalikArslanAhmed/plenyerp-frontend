import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {PermissionBindDirective} from './directives/permission-bind.directive';

@NgModule({
    declarations: [
        PermissionBindDirective
    ],
    imports: [
        CommonModule
    ],

    exports: [
        PermissionBindDirective
    ]
})
export class SharedModule {
}
