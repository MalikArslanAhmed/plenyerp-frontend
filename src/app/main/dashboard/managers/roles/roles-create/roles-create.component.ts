import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RolesService } from "../../../../../shared/services/roles.service";

@Component({
    selector: 'app-roles-create',
    templateUrl: './roles-create.component.html',
    styleUrls: ['./roles-create.component.scss']
})
export class RolesCreateComponent implements OnInit {
    action: any;
    dialogTitle: any;
    roleForm: FormGroup;
    isSubmitted = false;
    roles: any = [];
    updateData: any;

    managerId: any;
    availableRoles = [];

    constructor(public matDialogRef: MatDialogRef<RolesCreateComponent>,
        @Inject(MAT_DIALOG_DATA) private _data: any,
        private fb: FormBuilder,
        private rolesService: RolesService) {
        this.managerId = _data.mId;
        this.action = _data.action;
        if (this.action === 'EDIT') {
            this.dialogTitle = 'Edit Role';
            if (_data.role) {
                this.updateData = _data;
            }
        } else {
            this.dialogTitle = 'Add Role';
        }
    }

    ngOnInit(): void {
        this.refresh();
        this.checkForUpdate();
        this.getAvailableRoles();
    }

    getAvailableRoles() {
        this.rolesService.getAvailableRoles().subscribe(data => {
            this.availableRoles = data.items;
        });
    }

    refresh(): void {
        const config: any = {
            roleId: ['', Validators.required]
        };

        this.roleForm = this.fb.group(config);
    }

    checkForUpdate(): void {
        if (this.updateData) {
            this.roleForm.patchValue({
                'roleId': this.updateData.role.id
            });
        }
    }

    saveRole() {
        this.isSubmitted = true;
        if (!this.roleForm.valid) {
            this.isSubmitted = false;
            return;
        }

        if (this.isSubmitted) {
            this.rolesService.addRole(this.managerId, this.roleForm.value).subscribe(data => {
                this.roleForm.reset();
                this.isSubmitted = false;
            });
        }
    }

    updateRoles() {
        this.isSubmitted = true;
        if (!this.roleForm.valid) {
            this.isSubmitted = false;
            return;
        }
        if (this.isSubmitted) {
            this.rolesService.updateRoles(this.updateData.role.id, this.roleForm.value).subscribe(data => {
                this.updateData = undefined;
                this.roleForm.reset();
                this.isSubmitted = false;
            });
        }
    }
}
