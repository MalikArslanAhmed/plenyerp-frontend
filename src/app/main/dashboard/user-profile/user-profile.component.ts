import {Component, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {FuseSidebarService} from '../../../../@fuse/components/sidebar/sidebar.service';
import {MatDialog} from '@angular/material/dialog';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {fuseAnimations} from '../../../../@fuse/animations';
import {PasswordUpdateComponent} from './password-update/password-update.component.';
import {UserProfileService} from '../../../shared/services/user-profile.service';

@Component({
    selector: 'app-user-profile',
    templateUrl: './user-profile.component.html',
    styleUrls: ['./user-profile.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class UserProfileComponent implements OnInit {
    dialogRef: any;
    profileForm: FormGroup;
   user;
    constructor(
        private _fuseSidebarService: FuseSidebarService,
        private fb: FormBuilder,
        private userProfileService: UserProfileService,
        private _matDialog: MatDialog) {
    }

    ngOnInit(): void {
        this.profileForm = this.fb.group({
            name: ['', Validators.required],
            email: ['', Validators.required],
            username: ['', Validators.required]
        });

        this.getUser();

    }

    changePassword() {
        this.dialogRef = this._matDialog.open(PasswordUpdateComponent, {
            panelClass: 'contact-form-dialog',
            data: {action: 'UPDATE', userId: this.user.id}
        });
        this.dialogRef.afterClosed().subscribe((response: FormGroup) => {
            if (!response) {
                return;
            }

        });
    }

    getUser() {
        this.userProfileService.getSelf().subscribe(data => {
            console.log('user--', data);
            this.user = data;
            if (this.user) {
               this.profileForm.patchValue({
                   name: this.user.name,
                   email: this.user.email,
                   username: this.user.username
               });

            }
        });
    }

    updateUser() {
        if (this.profileForm.valid) {
            this.userProfileService.getUpdate(this.user.id, this.profileForm.value).subscribe(val => {
                this.getUser();
            });
        }

    }
}
