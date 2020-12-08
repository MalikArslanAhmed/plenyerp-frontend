import {Component, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {FuseSidebarService} from '../../../../../@fuse/components/sidebar/sidebar.service';
import {MatDialog} from '@angular/material/dialog';
import {FormGroup} from '@angular/forms';
import {fuseAnimations} from '../../../../../@fuse/animations';
import {ActivatedRoute} from '@angular/router';
import {UserRolesPermissionService} from '../../../../shared/services/user-roles-permission.service';

@Component({
    selector: 'app-user-role-permission',
    templateUrl: './user-role-permission.component.html',
    styleUrls: ['./user-role-permission.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class UserRolePermissionComponent implements OnInit {
    dialogRef: any;
    panelOpenState = false;
    checked = false;
    indeterminate = false;
    disabled = false;
    roleId;
    permissionModule = [];
    permissionIds = [];

    constructor(
        private _fuseSidebarService: FuseSidebarService,
        private userRolesPermissionService: UserRolesPermissionService,
        private route: ActivatedRoute,
        private _matDialog: MatDialog) {
    }

    ngOnInit(): void {
        this.route.params.subscribe(d => {
            this.roleId = d.roleId;
            // console.log('---->>', this.roleId);
        });
        this.getPermission();
    }

    getRoleBasePermission() {
        this.userRolesPermissionService.roleBasePermissionList(this.roleId, {}).subscribe(data => {
            // console.log('--->>>role id base permission', data);
            const roleBasePer = data;
            this.permissionIds = [];
            if (roleBasePer && roleBasePer.length) {
                roleBasePer.map(v => {
                    this.permissionIds.push(v.id);
                });
            }
            // console.log('-->>', this.permissionIds);
            // this.permissionModule = data;
            this.patchPermissionCheckbox();
        });
    }

    patchPermissionCheckbox() {
        if (this.permissionIds && this.permissionIds.length) {
            this.permissionIds.forEach(v => {
                this.permissionModule.forEach(module => {
                    module['children'].forEach(d => {
                        if (v === d.id) {
                            d['isSelected'] = true;
                        }
                    });
                });
            });
        }
    }

    getPermission() {
        this.userRolesPermissionService.permissionList({}).subscribe(data => {
            // console.log('--->>>permission', data);
            this.permissionModule = data;
            if (this.roleId && this.permissionModule && this.permissionModule.length) {
                this.getRoleBasePermission();
            }
        });
    }

    checkPermissions(e, rolePermission) {
        if (e['checked'] && this.permissionIds.indexOf(rolePermission.id) === -1) {
            this.permissionIds.push(rolePermission.id);
        } else if (this.permissionIds.indexOf(rolePermission.id) !== -1) {
            const selectedIndex = this.permissionIds.indexOf(rolePermission.id);
            this.permissionIds.splice(selectedIndex, 1);
        }
        // console.log('--->>this.permissionIds', this.permissionIds);
    }

    checkAllPermissions(e, index, rolePermission) {
        // console.log('index', index);
        // console.log('rolePermission', rolePermission);
        if (e.checked) {
            if (this.permissionModule[index] && this.permissionModule[index].children && this.permissionModule[index].children.length > 0) {
                this.permissionModule[index].children.forEach(permission => {
                    permission['isSelected'] = true;
                });
                rolePermission.forEach((value) => {
                    this.permissionIds.push(value.id);
                });
            }
        } else {
            this.permissionIds = [];
            if (this.permissionModule[index] && this.permissionModule[index].children && this.permissionModule[index].children.length > 0) {
                this.permissionModule[index].children.forEach(permission => {
                    permission['isSelected'] = false;
                });
            }

            if (this.permissionModule && this.permissionModule.length > 0) {
                this.permissionModule.forEach(perModule => {
                    if (perModule && perModule['children'] && perModule['children'].length > 0) {
                        perModule['children'].forEach(children => {
                            if (children && children['isSelected']) {
                                this.permissionIds.push(children.id)
                            }
                        })
                    }
                });
            }
        }
    }

    submitPermission() {
        const params = {
            permissionIds: this.permissionIds
        };
        this.userRolesPermissionService.addPermissions(this.roleId, params).subscribe(data => {
            this.getPermission();
        });
    }
}
