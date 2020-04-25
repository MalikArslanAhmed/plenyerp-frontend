import {Component, Inject, OnInit, ViewEncapsulation} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {fuseAnimations} from "../../../../../@fuse/animations";
import {MembershipService} from "../../../../shared/services/membership.service";
import {CensuresService} from "../../../../shared/services/censures.service";

@Component({
    selector: 'app-membership-create',
    templateUrl: './membership-create.component.html',
    styleUrls: ['./membership-create.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class MembershipCreateComponent implements OnInit {
    action: any;
    dialogTitle: any;
    membershipsForm: FormGroup;
    isSubmitted = false;
    updateData: any;

    constructor(public matDialogRef: MatDialogRef<MembershipCreateComponent>,
                @Inject(MAT_DIALOG_DATA) private _data: any,
                private fb: FormBuilder,
                private membershipService: MembershipService) {
        this.action = _data.action;
        if (this.action === 'EDIT') {
            this.dialogTitle = 'Edit Membership';
            if (_data.membership) {
                this.updateData = _data;
            }
        } else {
            this.dialogTitle = 'Add Membership';
        }
    }

    ngOnInit(): void {
        this.refresh();
        this.checkForUpdate();
    }

    refresh() {
        this.membershipsForm = this.fb.group({
            'name': ['', Validators.required]
        });
    }

    checkForUpdate() {
        if (this.updateData) {
            this.membershipsForm.patchValue({
                'name': this.updateData.membership.name
            });
        }
    }

    saveMembership() {
        this.isSubmitted = true;
        if (!this.membershipsForm.valid) {
            this.isSubmitted = false;
            return;
        }

        if (this.isSubmitted) {
            this.membershipService.addMembership(this.membershipsForm.value).subscribe(data => {
                this.membershipsForm.reset();
                this.isSubmitted = false;
            });
        }
    }

    updateMembership() {
        this.isSubmitted = true;
        if (!this.membershipsForm.valid) {
            this.isSubmitted = false;
            return;
        }
        if (this.isSubmitted) {
            this.membershipService.updateMembership(this.updateData.membership.id, this.membershipsForm.value).subscribe(data => {
                this.updateData = undefined;
                this.membershipsForm.reset();
                this.isSubmitted = false;
            });
        }
    }
}
