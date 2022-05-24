import { Component, Inject, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialog } from '@angular/material/dialog';
import { GlobalService } from 'app/shared/services/global.service';
import { fuseAnimations } from '../../../../../../@fuse/animations';
import { ContactInfoService } from '../../../../../shared/services/contact-info.service';
import { EmployeeSelectSingleComponent } from '../../employee-select-single/employee-select-single.component';

@Component({
    selector: 'leave-credit-create',
    templateUrl: './leave-credit-create.component.html',
    styleUrls: ['./leave-credit-create.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class LeaveCreditCreateComponent implements OnInit {
    action: any;
    dialogTitle: any;
    leaveCreditForm: FormGroup;
    isSubmitted = false;
    updateData: any;
    dialogRef: any;
    groupTypeList = []
    informationList = []
    selectedEmployee: any = ''
    constructor(public matDialogRef: MatDialogRef<LeaveCreditCreateComponent>,
        @Inject(MAT_DIALOG_DATA) private _data: any,
        private fb: FormBuilder,
        private _matDialog: MatDialog,
        private contactInfoService: ContactInfoService,
        private gService: GlobalService
    ) {
        this.action = _data.action;
        if (this.action === 'EDIT') {
            this.dialogTitle = 'Edit Leave Credit';
            if (_data.leaveCredit) {
                this.updateData = _data;
                this.selectedEmployee = _data.leaveGroupMember
            }
        } else {
            this.dialogTitle = 'Add Leave Credit';
        }
    }

    ngOnInit(): void {
        this.refresh();
        this.getleaveTypeList()
        this.getYearList()
        this.checkForUpdate();
        console.log(this.gService.self.value.id);
    }

    getleaveTypeList() {
        this.contactInfoService.getLeavesTypeList({}).subscribe(data => {
            this.groupTypeList = data.items
        })
    }

    getYearList() {
        this.contactInfoService.getLeaveYearList({}).subscribe(data => {
            this.informationList = data.items;
        });
    }

    refresh() {
        const currentDate = new Date()
        this.leaveCreditForm = this.fb.group({
            preparedLoginId: [this.gService.self.value.id, Validators.required],
            staffId: [22, Validators.required],
            leaveTypeId: ['', Validators.required],
            dueDays: ['', Validators.required],
            leaveYearId: ['', Validators.required],
            preparedVDate: ['', Validators.required],
            preparedTDate: [currentDate, Validators.required],
        });
    }

    selectAdminEmployee(type) {
        let allowType: any = 'BOTH';
        let node: any = undefined;
        if (type === 'Select Employee') {
            allowType = 'BOTH';
        }
        this.dialogRef = this._matDialog.open(EmployeeSelectSingleComponent, {
            panelClass: 'transaction-items-form-dialog',
            data: { head: type, allow: allowType, node: node, leaveGroupMember: this.selectedEmployee }
        });
        this.dialogRef.afterClosed().subscribe((response) => {
            if (!response) {
                return;
            }
            if (type === 'Select Employees') {
                console.log('response', response);

                this.selectedEmployee = response.empData
                this.leaveCreditForm.controls.staffId.setValue(this.selectedEmployee)
            }
        });
    }

    checkForUpdate() {
        if (this.updateData) {
            this.leaveCreditForm.patchValue({
                preparedLoginId: this.updateData.leaveCredit.preparedLoginId,
                staffId: this.updateData.leaveCredit.staffId,
                leaveTypeId: this.updateData.leaveCredit.leaveTypeId,
                dueDays: this.updateData.leaveCredit.dueDays,
                leaveYearId: this.updateData.leaveCredit.leaveYearId,
                preparedVDate: this.updateData.leaveCredit.preparedVDate,
                preparedTDate: this.updateData.leaveCredit.preparedTDate,
            });
        }
    }

    saveLeaveCredit() {
        this.isSubmitted = true;
        if (!this.leaveCreditForm.valid) {
            this.isSubmitted = false;
            return;
        }
        console.log('form values', this.leaveCreditForm.value);

        return
        if (this.isSubmitted) {
            // console.log(this.leaveCreditForm.value);
            this.contactInfoService.addLeaveCredit(this.leaveCreditForm.value).subscribe(data => {
                this.leaveCreditForm.reset();
                this.isSubmitted = false;
            });


        }
    }

    updateLeaveCredit() {
        this.isSubmitted = true;
        if (!this.leaveCreditForm.valid) {
            this.isSubmitted = false;
            return;
        }
        if (this.isSubmitted) {
            this.contactInfoService.updateLeaveCredit(this.updateData.leaveCredit.id, this.leaveCreditForm.value).subscribe(data => {
                this.updateData = undefined;
                this.leaveCreditForm.reset();
                this.isSubmitted = false;
            });

        }
    }
}
