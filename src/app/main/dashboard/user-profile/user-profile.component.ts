import {Component, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {FuseSidebarService} from '../../../../@fuse/components/sidebar/sidebar.service';
import {MatDialog} from '@angular/material/dialog';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {fuseAnimations} from '../../../../@fuse/animations';

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
    // @ViewChild(DesignationListComponent) getDesignationList: DesignationListComponent;

    constructor(
        private _fuseSidebarService: FuseSidebarService,
        private fb: FormBuilder,
        private _matDialog: MatDialog) {
    }

    ngOnInit(): void {
        this.profileForm = this.fb.group({
            name: ['', Validators.required],
            email: ['', Validators.required],
            username: ['', Validators.required],
            file: [''],
        });

    }

    // addDesignation() {
    //     this.dialogRef = this._matDialog.open(DesignationCreateComponent, {
    //         panelClass: 'contact-form-dialog',
    //         data: {action: 'CREATE'}
    //     });
    //     this.dialogRef.afterClosed().subscribe((response: FormGroup) => {
    //         if (!response) {
    //             return;
    //         }
    //         this.getDesignationList.getDesignationList();
    //     });
    // }
}
