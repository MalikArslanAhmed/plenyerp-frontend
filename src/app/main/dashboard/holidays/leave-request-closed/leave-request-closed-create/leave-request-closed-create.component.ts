import { Component, Inject, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialog } from '@angular/material/dialog';
import { EmployeesService } from 'app/shared/services/employees.service';
import { GlobalService } from 'app/shared/services/global.service';
import * as moment from 'moment';
import { fuseAnimations } from '../../../../../../@fuse/animations';
import { ContactInfoService } from '../../../../../shared/services/contact-info.service';
import { EmployeeSelectSingleComponent } from '../../employee-select-single/employee-select-single.component';

@Component({
    selector: 'leave-request-closed-create',
    templateUrl: './leave-request-closed-create.component.html',
    styleUrls: ['./leave-request-closed-create.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class LeaveRequestClosedCreateComponent implements OnInit {
    moment = moment
    action: any;
    dialogTitle: any;
    leaveRequestForm: FormGroup;
    isSubmitted = false;
    salaryScales: any = [];
    updateData: any;
    dialogRef: any;
    stores = [];
    leaveGroupList = []
    groupTypeList = []
    leaveRequestList = []
    selectedreliefOfficerStaff: any = ''
    selectedhodStaff: any = ''
    datesCheck = {
        valueMinDate: null,
        valueMaxDate: null,
    }
    currentYear = null
    constructor(public matDialogRef: MatDialogRef<LeaveRequestClosedCreateComponent>,
        @Inject(MAT_DIALOG_DATA) private _data: any,
        private fb: FormBuilder,
        private contactInfoService: ContactInfoService,
        private gService: GlobalService,
        private _matDialog: MatDialog,
    ) {
        this.action = _data.action;
        if (this.action === 'EDIT') {
            this.dialogTitle = 'Edit Leave Request';
            if (_data.leaveRequest) {
                this.updateData = _data;
                this.selectedhodStaff = [{
                    'name': _data.leaveRequest.leaveRequest.approvedHodStaff.firstName + ' ' + _data.leaveRequest.leaveRequest.approvedHodStaff.lastName,
                    'id': _data.leaveRequest.leaveRequest.approvedHodStaff.id
                }];
                this.getLeaveRequestList(_data.leaveRequest.leaveRequest.reliefOfficerStaffId)
            }
        } else {
            this.dialogTitle = 'Add Leave Request';
        }
    }

    ngOnInit(): void {
        this.refresh();
        this.checkForUpdate();
        this.getLeaveRequestList(this._data.employeeDetail.id)
    }

    getLeaveRequestList(id) {
        this.contactInfoService.getLeaveRequestList({ 'page': -1, staffId: id, requestClosed: 0 }).subscribe(data => {
            this.leaveRequestList = data.items;
        });
    }

    refresh() {
        this.leaveRequestForm = this.fb.group({
            leaveRequestId: [this._data.leaveRequestData.id, Validators.required],
            daysSpent: ['', Validators.required],
            preparedVDate: ['', Validators.required],
            preparedTDate: [''],
            preparedLoginId: [this.gService.self.value.username, Validators.required],
            hodStaffId: ['', Validators.required],
            requestReady: [false, Validators.required],
        });
        this.currentYear = new Date(this._data.leaveRequestData.approvedHrVDate).getFullYear()
        this.datesCheck = {
            valueMinDate: new Date(this._data.leaveRequestData.approvedHrVDate),
            valueMaxDate: new Date(`12-31-${this.currentYear}`)
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
            if (type === 'relief Officer Staff') {
                this.selectedreliefOfficerStaff = [{
                    'name': response['empData'].firstName + ' ' + response['empData'].lastName,
                    'id': response['empData'].id
                }];
                this.leaveRequestForm.controls.reliefOfficerStaffId.setValue(response.empData.id)
                this.getLeaveRequestList(response.empData.id)
            } else if (type === 'Select HOD Staff') {
                this.selectedhodStaff = [{
                    'name': response['empData'].firstName + ' ' + response['empData'].lastName,
                    'id': response['empData'].id
                }];
                this.leaveRequestForm.controls.hodStaffId.setValue(response.empData.id)
            }
        });
    }

    checkForUpdate() {
        if (this.updateData) {
            this.leaveRequestForm.patchValue({
                leaveRequestId: this.updateData.leaveRequest.leaveRequestId,
                daysSpent: this.updateData.leaveRequest.daysSpent,
                preparedVDate: this.updateData.leaveRequest.preparedVDate,
                preparedTDate: this.updateData.leaveRequest.preparedTDate,
                preparedLoginId: this.updateData.leaveRequest.preparedLoginId,
                hodStaffId: this.updateData.leaveRequest.hodStaffId,
                requestReady: this.updateData.leaveRequest.requestReady,
            });
        }
    }

    saveLeaveRequestClosed() {
        this.isSubmitted = true;
        if (!this.leaveRequestForm.valid) {
            this.isSubmitted = false;
            return;
        }
        let data = this.leaveRequestForm.value
        data.preparedVDate = moment(data.preparedVDate).format('YYYY-MM-DD HH:mm:ss')
        data.preparedTDate = moment(new Date()).format('YYYY-MM-DD HH:mm:ss')
        if (this.isSubmitted) {
            this.contactInfoService.addLeaveRequestClosed(data).subscribe(data => {
                this.leaveRequestForm.reset();
                this.isSubmitted = false;
            });
        }
    }

    updateLeaveRequestClosed() {
        this.isSubmitted = true;
        if (!this.leaveRequestForm.valid) {
            this.isSubmitted = false;
            return;
        }
        if (this.isSubmitted) {
            let data = this.leaveRequestForm.value
            data.preparedVDate = moment(data.preparedVDate).format('YYYY-MM-DD HH:mm:ss')
            data.preparedTDate = moment(new Date()).format('YYYY-MM-DD HH:mm:ss')
            this.contactInfoService.updateLeaveRequestClosed(this.updateData.leaveRequest.id, data).subscribe(data => {
                this.updateData = undefined;
                this.leaveRequestForm.reset();
                this.isSubmitted = false;
            });

        }
    }
}
