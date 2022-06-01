import { Component, Inject, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialog } from '@angular/material/dialog';
import { GlobalService } from 'app/shared/services/global.service';
import * as moment from 'moment';
import { forkJoin } from 'rxjs';
import { fuseAnimations } from '../../../../../../@fuse/animations';
import { ContactInfoService } from '../../../../../shared/services/contact-info.service';
import { EmployeeSelectSingleComponent } from '../../employee-select-single/employee-select-single.component';

@Component({
    selector: 'hr-leave-request-closed-approved-create',
    templateUrl: './hr-leave-request-closed-approved-create.component.html',
    styleUrls: ['./hr-leave-request-closed-approved-create.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class HrLeaveRequestClosedApprovedCreateComponent implements OnInit {
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
    leaveCreditList = []
    selectedreliefOfficerStaff: any = ''
    selectedhrStaff: any = ''
    constructor(public matDialogRef: MatDialogRef<HrLeaveRequestClosedApprovedCreateComponent>,
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
                if (_data.leaveRequest.approvedHrStaff) {
                    this.selectedhrStaff = [{
                        'name': _data.leaveRequest.approvedHrStaff.firstName + ' ' + _data.leaveRequest.approvedHrStaff.lastName,
                        'id': _data.leaveRequest.approvedHrStaff.id
                    }];
                }
            }
        } else {
            this.dialogTitle = 'Add Leave Request';
        }
    }

    ngOnInit(): void {
        this.refresh();
        this.checkForUpdate();
    }

    refresh() {
        this.leaveRequestForm = this.fb.group({
            //Old
            leaveRequestId: ['', Validators.required],
            daysSpent: ['', Validators.required],
            preparedVDate: ['', Validators.required],
            preparedTDate: [''],
            preparedLoginId: [this.gService.self.value.username, Validators.required],
            requestReady: [false, Validators.required],
            hodStaffId: ['', Validators.required],
            userRemarks: [''],
            //old HOD
            approvedHod: ['pending', Validators.required],
            approvedHodVDate: ['', Validators.required],
            approvedHodTDate: [''],
            approvedHodLoginId: [this.gService.self.value.username, Validators.required],
            approvedHrStaffId: ['', Validators.required],
            hodRemarks: [''],
            //New
            approvedHr: ['pending', Validators.required],
            approvedHrVDate: ['', Validators.required],
            approvedHrTDate: [''],
            approvedHrLoginId: [this.gService.self.value.username, Validators.required],
            hrRemarks: [''],
        });
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
            if (type === 'Select HR Staff') {
                this.selectedhrStaff = [{
                    'name': response['empData'].firstName + ' ' + response['empData'].lastName,
                    'id': response['empData'].id
                }];
                this.leaveRequestForm.controls.approvedHrStaffId.setValue(response.empData.id)
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
                userRemarks: this.updateData.leaveRequest.userRemarks,
                //Old HOD
                approvedHod: this.updateData.leaveRequest.approvedHod,
                approvedHodVDate: this.updateData.leaveRequest.approvedHodVDate,
                approvedHodTDate: this.updateData.leaveRequest.approvedHodTDate,
                approvedHodLoginId: this.updateData.leaveRequest.approvedHodLoginId,
                approvedHrStaffId: this.updateData.leaveRequest.approvedHrStaffId,
                hodRemarks: this.updateData.leaveRequest.hodRemarks,
                //New
                approvedHr: this.updateData.leaveRequest.approvedHr,
                approvedHrVDate: this.updateData.leaveRequest.approvedHrVDate,
                approvedHrTDate: this.updateData.leaveRequest.approvedHrTDate,
                approvedHrLoginId: this.gService.self.value.username,
                hrRemarks: this.updateData.leaveRequest.hrRemarks,
            });
        }
    }

    saveLeaveRequest() {
        this.isSubmitted = true;
        if (!this.leaveRequestForm.valid) {
            this.isSubmitted = false;
            return;
        }
        let data = this.leaveRequestForm.value
        data.approvedHrVDate = moment(data.approvedHrVDate).format('YYYY-MM-DD HH:mm:ss')
        data.approvedHrTDate = moment(new Date()).format('YYYY-MM-DD HH:mm:ss')
        if (this.isSubmitted) {
            this.contactInfoService.addLeaveRequest(data).subscribe(data => {
                this.leaveRequestForm.reset();
                this.isSubmitted = false;
            });
        }
    }

    updateLeaveRequest() {
        this.isSubmitted = true;
        if (!this.leaveRequestForm.valid) {
            this.isSubmitted = false;
            return;
        }
        if (this.isSubmitted) {
            let leaveRequestCloseddata = this.leaveRequestForm.value
            leaveRequestCloseddata.approvedHrVDate = moment(leaveRequestCloseddata.approvedHrVDate).format('YYYY-MM-DD HH:mm:ss')
            leaveRequestCloseddata.approvedHrTDate = moment(new Date()).format('YYYY-MM-DD HH:mm:ss')
            if (leaveRequestCloseddata.approvedHr == 'rejected' || leaveRequestCloseddata.approvedHr == 'approved') {
                let leaveRequestData = this.updateData.leaveRequest.leaveRequest
                leaveRequestData.requestClosed = true
                let apiMultiCalls = [
                    this.contactInfoService.updateLeaveRequest(this.updateData.leaveRequest.leaveRequest.id, leaveRequestData),
                    this.contactInfoService.updateLeaveRequestClosed(this.updateData.leaveRequest.id, leaveRequestCloseddata)
                ]
                forkJoin(apiMultiCalls).subscribe(data => {
                    this.updateData = undefined;
                    this.leaveRequestForm.reset();
                    this.isSubmitted = false;
                });
            }
        }
    }
}
