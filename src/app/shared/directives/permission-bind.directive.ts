import {Directive, ElementRef, Input, OnInit} from '@angular/core';
import {GlobalService} from '../services/global.service';

@Directive({selector: '[appPermissionBind]'})
export class PermissionBindDirective implements OnInit {
    permission: string;
    roles = [];
    departments = [];
    customDisplaySetting = null;

    constructor(private el: ElementRef,
                private globalService: GlobalService) {
        this.globalService.self$.subscribe(
            (user) => {
                if (user) {
                    this.verifyPermission();
                }
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

    @Input('roles')
    set setRoles(value: any) {
        this.roles = value;
        this.verifyPermission();
    }

    ngOnInit(): void {
    }

    verifyPermission(): void {
        let isNone = true;
        if (!this.globalService.getSelf()) {
            return;
        }
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