import {Component, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {FuseSidebarService} from '../../../../../@fuse/components/sidebar/sidebar.service';
import {MatDialog} from '@angular/material/dialog';
import {FormGroup} from '@angular/forms';
import {UserRoleCreateComponent} from './user-role-create/user-role-create.component';
import {UserRoleListComponent} from './user-role-list/user-role-list.component';
import {fuseAnimations} from '../../../../../@fuse/animations';
import { PermissionConstant } from 'app/shared/constants/permission-constant';

@Component({
    selector: 'app-user-role',
    templateUrl: './user-role.component.html',
    styleUrls: ['./user-role.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class UserRoleComponent implements OnInit {
    dialogRef: any;
    @ViewChild(UserRoleListComponent) getUserRoleList: UserRoleListComponent;

    permissionAddRoles = [PermissionConstant.ROLES_ADD];
    constructor(
        private _fuseSidebarService: FuseSidebarService,
        private _matDialog: MatDialog) {
    }

    ngOnInit(): void {
    }

    addUserRole() {
        this.dialogRef = this._matDialog.open(UserRoleCreateComponent, {
            panelClass: 'contact-form-dialog',
            data: {action: 'CREATE'}
        });
        this.dialogRef.afterClosed().subscribe((response: FormGroup) => {
            if (!response) {
                return;
            }
            this.getUserRoleList.getUserRoleList();
        });
    }
}
