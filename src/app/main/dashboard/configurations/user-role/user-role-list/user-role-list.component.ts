import {Component, OnInit, ViewChild, ViewEncapsulation, Output, EventEmitter} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {FormGroup} from '@angular/forms';
import {UserRoleCreateComponent} from '../user-role-create/user-role-create.component';
import {fuseAnimations} from '../../../../../../@fuse/animations';
import {PageEvent} from '@angular/material/paginator';
import { DeleteListModalComponent } from 'app/main/dashboard/delete-list-modal/delete-list-modal.component';
import {UserRolesPermissionService} from '../../../../../shared/services/user-roles-permission.service';
import {Router} from '@angular/router';

@Component({
    selector: 'app-user-role-list',
    templateUrl: './user-role-list.component.html',
    styleUrls: ['./user-role-list.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class UserRoleListComponent implements OnInit {
    userRoleList = [];
    displayedCountryColumns = ['id', 'roleName', 'description', 'actions'];
    dialogRef: any;    
    selectIndex = 0;
    pagination = {
        page: 1,
        total: null,
        perpage: 15,
        pages: null
    };
    pageEvent: PageEvent;
    @Output() selectedIndexChange: EventEmitter<number>;

    // tslint:disable-next-line:no-shadowed-variable
    constructor(private userRolesPermissionService: UserRolesPermissionService,
                private router: Router,
                private _matDialog: MatDialog) {
    }

    ngOnInit(): void {
        this.getUserRoleList();
    }

    getUserRoleList() {
        this.userRoleList = [];
        this.userRolesPermissionService.userRoleList({page: this.pagination.page}).subscribe(data => {
            this.userRoleList = data.items;
            // console.log('---->>>roles', this.userRoleList);
            this.pagination.page = data.page;
            this.pagination.total = data.total;
            if (this.userRoleList && this.userRoleList.length > 0) {
                let i = 1;
                this.userRoleList.forEach(val => {
                    val['sno'] = i;
                    i++;
                });
            }
        });
    }


    deleteItemModel(items) {
        this.dialogRef = this._matDialog.open(DeleteListModalComponent, {
            panelClass: 'delete-items-dialog',
            data: {data: items}
        });
        this.dialogRef.afterClosed().subscribe((response: boolean) => {
            if (response) {
                this.deleteUserRole(items.id);
            }
        });

    } 
    deleteUserRole(id) {
        this.userRolesPermissionService.deleteRoles(id).subscribe(data => {
            if (data) {
                this.getUserRoleList();
            }
        });
    }

    editUserRole(roles) {
        this.dialogRef = this._matDialog.open(UserRoleCreateComponent, {
            panelClass: 'contact-form-dialog',
            data: {action: 'EDIT', roles: roles},
        });
        this.dialogRef.afterClosed().subscribe((response: FormGroup) => {
            if (!response) {
                return;
            }
            this.getUserRoleList();
        });
    }
    onPageChange(page) {
        this.pagination.page = page.pageIndex + 1;
        this.getUserRoleList();
    }

    addPermissions(userRole) {
    this.router.navigateByUrl('dashboard/user-role/' + userRole.id);
        // user-role/:roleId/permissions/
    // role-permissions/:roleId
    }
}
