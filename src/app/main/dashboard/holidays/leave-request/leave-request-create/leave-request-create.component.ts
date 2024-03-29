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
    selector: 'leave-request-create',
    templateUrl: './leave-request-create.component.html',
    styleUrls: ['./leave-request-create.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class LeaveRequestCreateComponent implements OnInit {
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
    selectedhodStaff: any = ''
    leaveRequestList: any = []
    selectedCredit: any = 0
    currentYear = null
    dateChecks = {
        startMinDate: null,
        startMaxDate: null,
        valueMinDate: null,
        valueMaxDate: null,
    }
    constructor(public matDialogRef: MatDialogRef<LeaveRequestCreateComponent>,
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
                this.selectedreliefOfficerStaff = [{
                    'name': _data.leaveRequest.reliefOfficer.firstName + ' ' + _data.leaveRequest.reliefOfficer.lastName,
                    'id': _data.leaveRequest.reliefOfficer.id
                }];
                this.selectedhodStaff = [{
                    'name': _data.leaveRequest.approvedHodStaff.firstName + ' ' + _data.leaveRequest.approvedHodStaff.lastName,
                    'id': _data.leaveRequest.approvedHodStaff.id
                }];
                // this.getLeaveCreditList(_data.employeeDetail.id)
            }
        } else {
            this.dialogTitle = 'Add Leave Request';
        }
    }

    ngOnInit(): void {
        this.refresh();
        this.getLeaveCreditList(this._data.employeeDetail.id)
        this.getLeaveYear()

    }
    getLeaveYear(): void {
        this.contactInfoService.getInformationList({ 'page': -1 }).subscribe(data => {
            this.currentYear = data.items[0].leaveYear.year;
            this.dateChecks.startMaxDate = new Date(`12-31-${this.currentYear}`)
            this.dateChecks.startMinDate = new Date(`1-1-${this.currentYear}`)
            this.dateChecks.valueMaxDate = new Date(`12-31-${this.currentYear}`)
            this.dateChecks.valueMinDate = new Date(`1-1-${this.currentYear}`)
        })
    }
    getLeaveCreditList(id) {
        this.leaveCreditList = []
        this.contactInfoService.getLeaveCreditList({ 'page': -1, staffId: id }).subscribe(data => {
            let creditsTempList = data.items;
            this.contactInfoService.getLeaveRequestList({ page: -1, staffId: this._data.employeeDetail.id }).subscribe(data => {
                this.leaveRequestList = data.items;
                creditsTempList.forEach((credit: any) => {
                    let totalCreditLeft = credit.dueDays
                    this.leaveRequestList.forEach((leaveRequest: any) => {
                        if (this.action !== 'EDIT' && leaveRequest.leaveCreditId === credit.id) {
                            totalCreditLeft = totalCreditLeft - +leaveRequest.daysSpent
                        }
                        if (this.action === 'EDIT' && leaveRequest.leaveCreditId === credit.id && leaveRequest.id !== this._data.leaveRequest.id) {
                            totalCreditLeft = totalCreditLeft - +leaveRequest.daysSpent
                        }
                    })
                    if (totalCreditLeft > 0) {
                        credit.totalCreditLeft = totalCreditLeft
                        this.leaveCreditList.push(credit)
                    }
                })
                this.checkForUpdate();

            })
        });
    }

    refresh() {
        this.leaveRequestForm = this.fb.group({
            staffId: [this._data.employeeDetail.id],
            leaveCreditId: ['', Validators.required],
            startDate: ['', Validators.required],
            reliefOfficerStaffId: ['', Validators.required],
            duration: ['', Validators.required],
            daysSpent: [''],
            preparedVDate: ['', Validators.required],
            preparedTDate: [''],
            preparedLoginId: [this.gService.self.value.username, Validators.required],
            hodStaffId: ['', Validators.required],
            requestReady: [false, Validators.required],
            userRemarks: [''],
        });
        this.leaveRequestForm.get('leaveCreditId').valueChanges.subscribe((resp: any) => {
            let index = this.leaveCreditList.findIndex(item => item.id === this.leaveRequestForm.controls.leaveCreditId.value)
            if (index > -1) {
                this.selectedCredit = this.leaveCreditList[index]
                this.leaveRequestForm.controls.duration.setValidators([Validators.required, Validators.max(this.selectedCredit.totalCreditLeft)])
            }
        })
        this.leaveRequestForm.get('startDate').valueChanges.subscribe((resp: any) => {
            this.dateChecks.valueMaxDate = new Date(this.leaveRequestForm.controls.startDate.value)
        })
        this.leaveRequestForm.get('preparedVDate').valueChanges.subscribe((resp: any) => {
            this.dateChecks.startMinDate = new Date(this.leaveRequestForm.controls.preparedVDate.value)

        })
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
                // this.getLeaveCreditList(response.empData.id)
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
                staffId: this.updateData.leaveRequest.staffId,
                leaveCreditId: this.updateData.leaveRequest.leaveCreditId,
                startDate: this.updateData.leaveRequest.startDate,
                reliefOfficerStaffId: this.updateData.leaveRequest.reliefOfficerStaffId,
                duration: this.updateData.leaveRequest.duration,
                daysSpent: this.updateData.leaveRequest.daysSpent,
                preparedVDate: this.updateData.leaveRequest.preparedVDate,
                preparedTDate: this.updateData.leaveRequest.preparedTDate,
                preparedLoginId: this.updateData.leaveRequest.preparedLoginId,
                hodStaffId: this.updateData.leaveRequest.hodStaffId,
                requestReady: this.updateData.leaveRequest.requestReady,
                userRemarks: this.updateData.leaveRequest.userRemarks,
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
        data.startDate = moment(data.startDate).format('YYYY-MM-DD HH:mm:ss')
        data.preparedVDate = moment(data.preparedVDate).format('YYYY-MM-DD HH:mm:ss')
        data.preparedTDate = moment(new Date()).format('YYYY-MM-DD HH:mm:ss')
        data.daysSpent = data.duration
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
            let data = this.leaveRequestForm.value
            data.startDate = moment(data.startDate).format('YYYY-MM-DD HH:mm:ss')
            data.preparedVDate = moment(data.preparedVDate).format('YYYY-MM-DD HH:mm:ss')
            data.preparedTDate = moment(new Date()).format('YYYY-MM-DD HH:mm:ss')
            data.daysSpent = data.duration
            this.contactInfoService.updateLeaveRequest(this.updateData.leaveRequest.id, data).subscribe(data => {
                this.updateData = undefined;
                this.leaveRequestForm.reset();
                this.isSubmitted = false;
            });

        }
    }
}
