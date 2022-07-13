import { Component, Inject, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialog } from '@angular/material/dialog';
import { GlobalService } from 'app/shared/services/global.service';
import { fuseAnimations } from '../../../../../../@fuse/animations';
import { ContactInfoService } from '../../../../../shared/services/contact-info.service';
import { EmployeeSelectSingleComponent } from '../../employee-select-single/employee-select-single.component';
import * as moment from 'moment'
import { forkJoin } from 'rxjs';
@Component({
    selector: 'leave-credit-create',
    templateUrl: './leave-credit-create.component.html',
    styleUrls: ['./leave-credit-create.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class LeaveCreditCreateComponent implements OnInit {
    moment = moment
    action: any;
    dialogTitle: any;
    leaveCreditForm: FormGroup;
    isSubmitted = false;
    updateData: any;
    dialogRef: any;
    groupTypeList = []
    activeYearsList = []
    selectedEmployee: any = ''
    constructor(public matDialogRef: MatDialogRef<LeaveCreditCreateComponent>,
        @Inject(MAT_DIALOG_DATA) public _data: any,
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
                console.log('updated data', _data);
                this.selectedEmployee = [{
                    'name': _data.leaveCredit.employee.firstName + ' ' + _data.leaveCredit.employee.lastName,
                    'id': _data.leaveCredit.employee.id
                }];
            }
        } else {
            this.dialogTitle = 'Add Leave Credit';
        }
    }

    ngOnInit(): void {
        this.refresh();
        if (!this._data.bulkUploadData) {
            this.getleaveTypeList()
            this.getYearList()
            this.checkForUpdate();
        }
    }
    bulkUpload() {
        this.gService.bulkUpload = true
        let bulkuploadData: any = []
        this._data.bulkUploadData.leaveCreditViewList.forEach((resp: any) => {
            if (resp.repeatEveryYear) {
                let data = {
                    preparedLoginId: this.gService.self.value.id,
                    staffId: resp.empID,
                    leaveTypeId: resp.LeaveTypeID,
                    dueDays: resp.dueDays,
                    leaveYearId: this._data.bulkUploadData.currentYear.currentLeaveYearId,
                    preparedVDate: moment(this.leaveCreditForm.controls.preparedVDate.value).format('YYYY-MM-DD HH:mm:ss'),
                    preparedTDate: moment(new Date()).format('YYYY-MM-DD HH:mm:ss')
                }
                bulkuploadData.push(data)
            }
        })
        this.contactInfoService.bulkUploadLeaveCredit(bulkuploadData).subscribe((resp: any) => {
            this.gService.bulkUpload = false
        }
        )
    }
    getleaveTypeList() {
        this.contactInfoService.getLeavesTypeList({}).subscribe(data => {
            this.groupTypeList = data.items
        })
    }

    getYearList() {
        this.contactInfoService.getLeaveYearList({ 'page': -1, isActive: 1 }).subscribe(data => {
            this.activeYearsList = data.items;
        });
    }

    refresh() {
        const currentDate = moment(new Date()).format('YYYY-MM-DD HH:mm:ss')
        if (this._data.bulkUploadData) {
            this.leaveCreditForm = this.fb.group({
                preparedVDate: ['', Validators.required],
            });
        } else {
            this.leaveCreditForm = this.fb.group({
                preparedLoginId: [this.gService.self.value.id, Validators.required],
                staffId: ['', Validators.required],
                leaveTypeId: ['', Validators.required],
                dueDays: ['', Validators.required],
                leaveYearId: ['', Validators.required],
                preparedVDate: ['', Validators.required],
                preparedTDate: [currentDate, Validators.required],
            });
        }
    }

    selectAdminEmployee(type) {
        let allowType: any = 'BOTH';
        let node: any = undefined;
        if (type === 'Select Paying Employee') {
            allowType = 'BOTH';
        }

        this.dialogRef = this._matDialog.open(EmployeeSelectSingleComponent, {
            panelClass: 'transaction-items-form-dialog',
            data: { head: type, allow: allowType, node: node }
        });
        this.dialogRef.afterClosed().subscribe((response) => {
            if (!response) {
                return;
            }
            if (type === 'Select Employee') {
                this.selectedEmployee = [{
                    'name': response['empData'].firstName + ' ' + response['empData'].lastName,
                    'id': response['empData'].id
                }];
                this.leaveCreditForm.controls.staffId.setValue(response.empData.id)
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
        this.leaveCreditForm.value.preparedVDate = moment(this.leaveCreditForm.value.preparedVDate).format('YYYY-MM-DD HH:mm:ss')
        console.log('form values', this.leaveCreditForm.value);
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
        this.leaveCreditForm.value.preparedVDate = moment(this.leaveCreditForm.value.preparedVDate).format('YYYY-MM-DD HH:mm:ss')
        if (this.isSubmitted) {
            this.contactInfoService.updateLeaveCredit(this.updateData.leaveCredit.id, this.leaveCreditForm.value).subscribe(data => {
                this.updateData = undefined;
                this.leaveCreditForm.reset();
                this.isSubmitted = false;
            });

        }
    }
}
