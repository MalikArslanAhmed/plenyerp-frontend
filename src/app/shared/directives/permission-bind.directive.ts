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
        this.globalService.self$
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
    set setRoles(value: any) {
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

    verifyPermission() {
        let isNone = true;

        for (let i = 0; i < this.globalService.getSelf().permissions.length; i++) {
            if (this.permission && this.permission.length) {
                for (let j = 0; j < this.permission.length; j++) {
                    if (this.globalService.getSelf().permissions[i].id === this.permission[j] || this.globalService.getSelf().permissions[i].entityName === this.permission[j]) {
                        isNone = false;
                        break;
                    }
                }
            }
        }

        // for (let i = 0; i < this.globalService.getSelf().roleUsers.length; i++) {
        //     if (this.globalService.getSelf().roleUsers[i].roleId === 1) {
        //         isNone = false;
        //         break;
        //     }
        // }

        if (!(this.permission && this.permission.length)) {
            isNone = false;
        }

        if (isNone) {
            this.el.nativeElement.style.display = 'none';
        } else {
            this.el.nativeElement.style.display = this.customDisplaySetting || 'inherit';
        }
    }
}