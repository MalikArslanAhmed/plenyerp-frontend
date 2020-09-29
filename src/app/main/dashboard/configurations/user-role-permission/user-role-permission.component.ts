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
    labelPosition: 'before' | 'after' = 'after';
    disabled = false;
    roleId;
    permissionModule = [
        // {
        //     id: 1,
        //     moduleName: ' Self aware panel 1',
        //     rolePermission: [],
        // },
        // {
        //     id: 2,
        //     moduleName: ' Self aware panel 2',
        //     rolePermission: [],
        // },
        // {
        //     id: 3,
        //     moduleName: ' Self aware panel 3',
        //     rolePermission: [],
        // }
    ];
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
            console.log('---->>', this.roleId);
        });
        if (this.roleId) {
            this.getRoleBasePermission();
        }
    }

    getRoleBasePermission() {
        this.userRolesPermissionService.roleBasePermissionList(this.roleId, {}).subscribe(data => {
            console.log('--->>>permission', data);
            this.permissionModule = data;
        });
    }

    getPermissions(e, rolePermission) {
        if (e['checked'] && this.permissionIds.indexOf(rolePermission.id) === -1) {
            // console.log('---->>>', e['checked']);
            this.permissionIds.push(rolePermission.id);
        } else if (this.permissionIds.indexOf(rolePermission.id) !== -1) {
            // console.log('---->>>', e['checked']);
            const selectedIndex = this.permissionIds.indexOf(rolePermission.id);
            this.permissionIds.splice(selectedIndex, 1);

        }
        console.log('--->>this.permissionIds', this.permissionIds);
    }
}
