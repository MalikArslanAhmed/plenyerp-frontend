import {Component, Inject, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {FormBuilder, FormGroup, Validators, FormControl} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {fuseAnimations} from '../../../../../../@fuse/animations';
import {ContactInfoService} from '../../../../../shared/services/contact-info.service';
import {UserRolesPermissionService} from '../../../../../shared/services/user-roles-permission.service';

@Component({
    selector: 'app-user-role-create',
    templateUrl: './user-role-create.component.html',
    styleUrls: ['./user-role-create.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class UserRoleCreateComponent implements OnInit {
    action: any;
    dialogTitle: any;
    userRoleForm: FormGroup;
    isSubmitted = false;
    salaryScales: any = [];
    updateData: any;   
    constructor(public matDialogRef: MatDialogRef<UserRoleCreateComponent>,
                @Inject(MAT_DIALOG_DATA) private _data: any,
                private fb: FormBuilder,
                private userRolesPermissionService: UserRolesPermissionService) {
        this.action = _data.action;
        if (this.action === 'EDIT') {
            this.dialogTitle = 'Edit Role';
            if (_data.roles) {
                this.updateData = _data;
            }
        } else {
            this.dialogTitle = 'Add Role';
        }
    }

    ngOnInit(): void {
        this.refresh();
        this.checkForUpdate();
    }

    refresh() {
        this.userRoleForm = this.fb.group({
            name: ['', Validators.required],
            description: [''],
        });
    }

    checkForUpdate() {
        if (this.updateData) {
            this.userRoleForm.patchValue({
                name: this.updateData.roles.role,
                description: this.updateData.roles.description
            });
        }
    }

    saveUserRole() {
        if (!this.userRoleForm.valid) {
            return;
        }
        this.userRolesPermissionService.addUserRoles(this.userRoleForm.value).subscribe(data => {
            this.userRoleForm.reset();
        });
    }

    updateUserRole() {
        if (!this.userRoleForm.valid) {
            return;
        }
        this.userRolesPermissionService.updateUserRoles(this.updateData.roles.id, this.userRoleForm.value).subscribe(data => {
            this.updateData = undefined;
            this.userRoleForm.reset();
        });
    }
}
