import { Component, Inject, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialog } from '@angular/material/dialog';
import { AdminSegmentEmployeeSelectComponent } from 'app/main/dashboard/treasure-report/default-setting-voucher-info/admin-segment-employee-select/admin-segment-employee-select.component';
import { EmployeesService } from 'app/shared/services/employees.service';
import { fuseAnimations } from '../../../../../../@fuse/animations';
import { ContactInfoService } from '../../../../../shared/services/contact-info.service';
import { EmployeeSelectComponent } from '../../employee-select/employee-select.component';

@Component({
    selector: 'leave-group-member-create',
    templateUrl: './leave-group-member-create.component.html',
    styleUrls: ['./leave-group-member-create.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class LeaveGroupMemberCreateComponent implements OnInit {
    action: any;
    dialogTitle: any;
    leaveGroupMemberForm: FormGroup;
    isSubmitted = false;
    salaryScales: any = [];
    updateData: any;
    dialogRef: any;
    stores = [];
    donationsForm: FormGroup;
    selectedEmployee: any;
    leaveGroupList = []
    employeeList = []
    constructor(public matDialogRef: MatDialogRef<LeaveGroupMemberCreateComponent>,
        @Inject(MAT_DIALOG_DATA) private _data: any,
        private fb: FormBuilder,
        private _matDialog: MatDialog,
        private contactInfoService: ContactInfoService,
        private employeesService: EmployeesService,
    ) {
        this.action = _data.action;
        if (this.action === 'EDIT') {
            this.dialogTitle = 'Edit Leave Group Member';
            if (_data.leaveGroupMember) {
                this.updateData = _data;
            }
        } else {
            this.dialogTitle = 'Add Group Member';
        }
    }

    ngOnInit(): void {
        this.refresh();
        this.getGroupList()
        this.getEmployeeList()
    }
    getEmployeeList() {
        this.employeesService.getEmployees({}).subscribe(data => {
            this.employeeList = data.items
            this.checkForUpdate();
        })
    }
    refresh() {
        this.leaveGroupMemberForm = this.fb.group({
            leaveGroupId: ['', Validators.required],
            staffId: ['', Validators.required]
        });
    }
    getGroupList() {
        this.contactInfoService.getLeavesGroupList({}).subscribe(data => {
            this.leaveGroupList = data.items;
        });
    }

    checkForUpdate() {
        console.log('updated',this.updateData);
        
        if (this.updateData) {
            let index = this.employeeList.findIndex(resp => resp.id === this.updateData.leaveGroupMember.staffId)
            if (index > -1) {
                this.selectedEmployee = [{
                    'name': this.employeeList[index].firstName + ' ' + this.employeeList[index].lastName,
                    'id': this.employeeList[index].id
                }];
            }
            this.leaveGroupMemberForm.patchValue({
                leaveGroupId: this.updateData.leaveGroupMember.leaveGroupId,
                staffId: this.updateData.leaveGroupMember.staffId
            });
        }
    }

    saveLeaves() {
        this.isSubmitted = true;
        if (!this.leaveGroupMemberForm.valid) {
            this.isSubmitted = false;
            return;
        }

        if (this.isSubmitted) {
            // console.log(this.leaveGroupMemberForm.value);
            this.contactInfoService.addLeaveGroupMember(this.leaveGroupMemberForm.value).subscribe(data => {
                this.leaveGroupMemberForm.reset();
                this.isSubmitted = false;
            });


        }
    }

    updateLeaves() {
        this.isSubmitted = true;
        if (!this.leaveGroupMemberForm.valid) {
            this.isSubmitted = false;
            return;
        }
        if (this.isSubmitted) {
            this.contactInfoService.updateLeaveGroupMember(this.updateData.leaveGroupMember.id, this.leaveGroupMemberForm.value).subscribe(data => {
                this.updateData = undefined;
                this.leaveGroupMemberForm.reset();
                this.isSubmitted = false;
            });

        }
    }

    selectAdminEmployee(type) {
        let allowType: any = 'BOTH';
        let node: any = undefined;
        if (type === 'Select Employee') {
            allowType = 'BOTH';
        }

        this.dialogRef = this._matDialog.open(EmployeeSelectComponent, {
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
                this.leaveGroupMemberForm.patchValue({
                    staffId: response['empData'].id
                });
            }
        });
    }
}
