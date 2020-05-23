import {Directive, ElementRef, Input, OnInit} from '@angular/core';
import {GlobalService} from '../services/global.service';

@Directive({selector: '[appPermissionBind]'})
export class PermissionBindDirective implements OnInit {
    permission: string;
    onlyAdmin: boolean;
    onlyClient: boolean;
    roles = [];
    isDev = false;
    departments = [];
    userTypes = [];
    userPermissions = [];
    customDisplaySetting = null;

    constructor(private el: ElementRef,
                private globalService: GlobalService) {
        this.globalService.self
            .subscribe(
                (user) => {
                    this.verifyPermission();
                }
            );
    }

    @Input('permission')
    set setPermission(value) {
        this.permission = value;
        this.verifyPermission();
    }

    @Input('customDisplaySetting')
    set setCustomDisplaySetting(value) {
        this.customDisplaySetting = value;
        this.verifyPermission();
    }

    @Input('userTypes')
    set setUserTypes(value) {
        this.userTypes = value;
        this.verifyPermission();
    }

    @Input('onlyAdmin')
    set setOnlyAdmin(value: boolean) {
        this.onlyAdmin = value;
        this.verifyPermission();
    }

    @Input('onlyClient')
    set setOnlyClient(value: boolean) {
        this.onlyClient = value;
        this.verifyPermission();
    }

    @Input('roles')
    set setRoles(value: Array<number>) {
        this.roles = value;
        this.verifyPermission();
    }

    @Input('departments')
    set setDepartments(value: any) {
        this.departments = value;
        this.verifyPermission();
    }

    ngOnInit(): void {
    }

    verifyPermission(user?) {
        const permissions = [];
        let hasPermission = false;

        /*for (let i = 0; i < this.globalService.getSelf().permissions.length; i++) {
            if (this.permission && this.permission.length) {
                for (let j = 0; j < this.permission.length; j++) {
                    if (this.globalService.getSelf().permissions[i].id === this.permission[j] || this.globalService.getSelf().permissions[i].entityName === this.permission[j]) {
                        isNone = false;
                        break;
                    }
                }
            }
        }*/

        if ( this.globalService.getSelf()) {
            for (let i = 0; i < this.globalService.getSelf().roles.length; i++) {
                if (this.globalService.getSelf().roles[i].roleId === 1) {
                    hasPermission = true;
                    break;
                }
                for (let j = 0; j < this.roles.length; j++) {
                    if (this.globalService.getSelf().roles[i].id === this.roles[j]) {
                        hasPermission = true;
                        break;
                    }
                }
            }

            if (!(this.roles && this.roles.length)) {
                hasPermission = true;
            }
        }

        if (hasPermission) {
            this.el.nativeElement.style.display = this.customDisplaySetting || 'inherit';
        } else {
            this.el.nativeElement.style.display = 'none';
        }
    }
}
