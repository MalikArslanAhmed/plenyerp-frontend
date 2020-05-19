import {Component, Inject, OnInit, ViewEncapsulation} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {MembershipService} from "../../../../shared/services/membership.service";
import {fuseAnimations} from "../../../../../@fuse/animations";

@Component({
    selector: 'app-employee-preview',
    templateUrl: './employee-preview.component.html',
    styleUrls: ['./employee-preview.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class EmployeePreviewComponent implements OnInit {
    action: any;
    dialogTitle: any;
    employeePreviewForm: FormGroup;
    isSubmitted = false;
    updateData: any;

    constructor(public matDialogRef: MatDialogRef<EmployeePreviewComponent>,
                @Inject(MAT_DIALOG_DATA) private _data: any,
                private fb: FormBuilder) {
        this.action = _data.action;
        if (this.action === 'PREVIEW') {
            this.dialogTitle = 'PREVIEW';
            if (_data.employee) {
                this.updateData = _data.employee;
            }
        }
    }

    ngOnInit(): void {
        this.refresh();
        this.patchEmployee();
    }

    refresh() {
        this.employeePreviewForm = this.fb.group({
            'firstName': ['', Validators.required],
            'lastName': ['', Validators.required],
            'employeeId': ['', Validators.required],
            'personnelFileNumber': ['', Validators.required],
            'gender': ['', Validators.required],
            'dateOfBirth': ['', Validators.required],
            'maritalStatus': ['', Validators.required]
        });
    }

    patchEmployee() {
        const dob = this.updateData.employeePersonalDetails.dateOfBirth.split(" ");
        this.employeePreviewForm.patchValue({
            'firstName': this.updateData.firstName,
            'lastName': this.updateData.lastName,
            'employeeId': this.updateData.employeeJobProfiles.employeeId,
            'personnelFileNumber': this.updateData.personnelFileNumber,
            'gender': this.updateData.employeePersonalDetails.gender,
            'dateOfBirth': dob[0],
            'maritalStatus': this.updateData.employeePersonalDetails.maritalStatus
        });
        this.employeePreviewForm.get('firstName').disable();
        this.employeePreviewForm.get('lastName').disable();
        this.employeePreviewForm.get('employeeId').disable();
        this.employeePreviewForm.get('personnelFileNumber').disable();
        this.employeePreviewForm.get('gender').disable();
        this.employeePreviewForm.get('dateOfBirth').disable();
        this.employeePreviewForm.get('maritalStatus').disable();
    }

    /*checkForUpdate() {
        if (this.updateData) {
            this.membershipsForm.patchValue({
                'name': this.updateData.membership.name,
                'isActive': this.updateData.membership.isActive
            });
        }
    }*/

    /*saveMembership() {
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
    }*/
}
