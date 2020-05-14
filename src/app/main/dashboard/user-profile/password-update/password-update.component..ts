import {Component, Inject, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {FormBuilder, FormGroup, Validators, FormControl} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {fuseAnimations} from '../../../../../@fuse/animations';
import {ContactInfoService} from '../../../../shared/services/contact-info.service';
import {UserProfileService} from '../../../../shared/services/user-profile.service';
import {AlertService} from '../../../../shared/services/alert.service';

@Component({
    selector: 'app-password-update',
    templateUrl: './password-update.component.html',
    styleUrls: ['./password-update.component..scss'],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class PasswordUpdateComponent implements OnInit {
    action: any;
    dialogTitle: any;
    changePasswordForm: FormGroup;
    isSubmitted = false;
    salaryScales: any = [];
    updateData: any;
    countries = [];
    userId;
    newPass = false;
    currentPass = false;
    confirmPass = false;
    constructor(public matDialogRef: MatDialogRef<PasswordUpdateComponent>,
                @Inject(MAT_DIALOG_DATA) private _data: any,
                private fb: FormBuilder,
                private alertService: AlertService,
                private userProfileService: UserProfileService) {
        this.action = _data.action;
        this.userId = _data.userId;
        if (this.action === 'UPDATE') {
            this.dialogTitle = 'Update Password';
        }
    }

    ngOnInit(): void {
        this.refresh();
    }

    refresh() {
        this.changePasswordForm = this.fb.group({
            oldPassword: ['', Validators.required],
            newPassword: ['', Validators.required],
            confirmPassword: ['', Validators.required],

        });
    }

    updatePassword() {
        this.isSubmitted = true;
        if (!this.changePasswordForm.valid) {
            this.isSubmitted = false;
            return;
        }
        if (this.isSubmitted) {
            if (this.changePasswordForm.value.newPassword === this.changePasswordForm.value.oldPassword) {
                this.alertService.showErrors('New password and current password cannot be same');
                return;
            }
            if (this.changePasswordForm.value.newPassword === this.changePasswordForm.value.confirmPassword) {
                // console.log(this.userId, this.changePasswordForm.value);
                this.userProfileService.getUpdate(this.changePasswordForm.value).subscribe(data => {
                    this.updateData = undefined;
                    this.changePasswordForm.reset();
                    this.isSubmitted = false;
                });
            } else {
                this.alertService.showErrors('New password and confirm password does not match');
            }

        }
    }

}
