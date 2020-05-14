import {Component, Inject, OnInit} from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ManagersService} from "../../../../shared/services/managers.service";

@Component({
    selector: 'app-managers-create',
    templateUrl: './managers-create.component.html',
    styleUrls: ['./managers-create.component.scss']
})
export class ManagersCreateComponent implements OnInit {
    action: any;
    dialogTitle: any;
    managerForm: FormGroup;
    isSubmitted = false;
    managers: any = [];
    updateData: any;

    constructor(public matDialogRef: MatDialogRef<ManagersCreateComponent>,
                @Inject(MAT_DIALOG_DATA) private _data: any,
                private fb: FormBuilder,
                private managersService: ManagersService) {
        this.action = _data.action;
        if (this.action === 'EDIT') {
            this.dialogTitle = 'Edit Managers';
            if (_data.manager) {
                this.updateData = _data;
            }
        } else {
            this.dialogTitle = 'Add Managers';
        }
    }

    ngOnInit(): void {
        this.refresh();
        this.checkForUpdate();
    }

    refresh(): void {
        const config: any = {
            name: ['', Validators.required],
            email: ['', Validators.required],
            username: ['', Validators.required],
            password: ['', Validators.required]
        };
        if (this.action !== 'EDIT') {
            config.password = [''];
        }
        this.managerForm = this.fb.group(config);

    }

    checkForUpdate(): void {
        if (this.updateData
        ) {
            // console.log('=>>> updating', this.managerForm.getError);
            this.managerForm.controls['password'].clearValidators();
            this.managerForm.patchValue({
                'name': this.updateData.manager.name,
                'email': this.updateData.manager.email,
                'username': this.updateData.manager.username,
                'password': this.updateData.manager.password
                // 'isActive': this.updateData.qualification.isActive
            });
        } else {
            // this.managerForm.controls['password'].setValidators([Validators.required]);
            // this.managerForm.controls['password'].
        }
    }

    saveManager() {
        this.isSubmitted = true;
        if (!this.managerForm.valid) {
            this.isSubmitted = false;
            return;
        }

        if (this.isSubmitted) {
            this.managersService.addManager(this.managerForm.value).subscribe(data => {
                this.managerForm.reset();
                this.isSubmitted = false;
            });
        }
    }

    updateManager() {
        this.isSubmitted = true;
        // if (!this.managerForm.valid) {
        //     this.isSubmitted = false;
        //     return;
        // }
        if (this.isSubmitted) {
            this.managersService.updateManager(this.updateData.manager.id, this.managerForm.value).subscribe(data => {
                this.updateData = undefined;
                this.managerForm.reset();
                this.isSubmitted = false;
            });
        }
    }
}
