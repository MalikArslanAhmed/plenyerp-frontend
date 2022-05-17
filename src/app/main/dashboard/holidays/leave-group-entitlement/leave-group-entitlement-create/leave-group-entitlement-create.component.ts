import { Component, Inject, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialog } from '@angular/material/dialog';
import { EmployeesService } from 'app/shared/services/employees.service';
import { fuseAnimations } from '../../../../../../@fuse/animations';
import { ContactInfoService } from '../../../../../shared/services/contact-info.service';

@Component({
    selector: 'leave-group-entitlement-create',
    templateUrl: './leave-group-entitlement-create.component.html',
    styleUrls: ['./leave-group-entitlement-create.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class LeaveGroupEntitlementCreateComponent implements OnInit {
    action: any;
    dialogTitle: any;
    leaveGroupEntitlementForm: FormGroup;
    isSubmitted = false;
    salaryScales: any = [];
    updateData: any;
    dialogRef: any;
    stores = [];
    donationsForm: FormGroup;
    leaveGroupList = []
    groupTypeList = []
    constructor(public matDialogRef: MatDialogRef<LeaveGroupEntitlementCreateComponent>,
        @Inject(MAT_DIALOG_DATA) private _data: any,
        private fb: FormBuilder,
        private _matDialog: MatDialog,
        private contactInfoService: ContactInfoService,
    ) {
        this.action = _data.action;
        if (this.action === 'EDIT') {
            this.dialogTitle = 'Edit Leave Group Entitlement';
            if (_data.leaveGroupEntitlement) {
                this.updateData = _data;
            }
        } else {
            this.dialogTitle = 'Add Group Entitlement';
        }
    }

    ngOnInit(): void {
        this.refresh();
        this.getGroupList()
        this.getleaveTypeList()
        this.checkForUpdate();
    }
    getleaveTypeList() {
        this.contactInfoService.getLeavesTypeList({}).subscribe(data => {
            this.groupTypeList = data.items
        })
    }
    refresh() {
        this.leaveGroupEntitlementForm = this.fb.group({
            leaveGroupId: ['', Validators.required],
            leaveTypeId: ['', Validators.required],
            dueDays: [0, Validators.required]
        });
    }
    getGroupList() {
        this.contactInfoService.getLeavesGroupList({}).subscribe(data => {
            this.leaveGroupList = data.items;
        });
    }

    checkForUpdate() {
        if (this.updateData) {
            this.leaveGroupEntitlementForm.patchValue({
                leaveGroupId: this.updateData.leaveGroupEntitlement.leaveGroupId,
                leaveTypeId: this.updateData.leaveGroupEntitlement.leaveTypeId,
                dueDays: this.updateData.leaveGroupEntitlement.dueDays
            });
        }
    }

    saveLeaveGroupEntitlement() {
        this.isSubmitted = true;
        if (!this.leaveGroupEntitlementForm.valid) {
            this.isSubmitted = false;
            return;
        }

        if (this.isSubmitted) {
            // console.log(this.leaveGroupEntitlementForm.value);
            this.contactInfoService.addLeaveGroupEntitlement(this.leaveGroupEntitlementForm.value).subscribe(data => {
                this.leaveGroupEntitlementForm.reset();
                this.isSubmitted = false;
            });


        }
    }

    updateLeaveGroupEntitlement() {
        this.isSubmitted = true;
        if (!this.leaveGroupEntitlementForm.valid) {
            this.isSubmitted = false;
            return;
        }
        if (this.isSubmitted) {
            this.contactInfoService.updateLeaveGroupEntitlement(this.updateData.leaveGroupEntitlement.id, this.leaveGroupEntitlementForm.value).subscribe(data => {
                this.updateData = undefined;
                this.leaveGroupEntitlementForm.reset();
                this.isSubmitted = false;
            });

        }
    }
}
