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
    isEditProfileImage = false;
    profileImage;
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
            username: ['', Validators.required],
            fileId: [],
        });

        this.getUser();

    }

    fileUpload(event) {
        const file = event && event.target.files[0];
        const obj = {
            type: 'USER_IMAGE',
            fileType: 'Normal',
        };
        obj['file'] = file;
        this.userProfileService.uploadFile(obj).subscribe((fileData: any) => {
                this.profileImage = fileData.data;
                this.isEditProfileImage = false;
                // console.log('---->>>', this.profileImage);
                if (this.profileImage) {
                    this.profileForm.patchValue({
                        fileId:   this.profileImage.id
                    });
                }


            }
        );
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
            // console.log('user--', data);
            this.user = data;
            if (this.user) {
                this.profileForm.patchValue({
                    name: this.user.name,
                    email: this.user.email,
                    username: this.user.username
                });

                this.profileImage = this.user.file;
            }

        });
    }

    updateUser() {
        // console.log('------->>>>', this.profileForm.value);
        if (this.profileForm.valid) {
            this.userProfileService.getUpdate(this.profileForm.value).subscribe(val => {
                this.getUser();
                window.location.reload();
            });
        }

    }
    removeProfileImage() {
            this.userProfileService.getRemoveProfileImg({fileId: null}).subscribe(val => {
                this.getUser();
            });

    }
}
