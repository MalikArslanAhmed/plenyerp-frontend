import {Component, Inject, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {FormBuilder, FormGroup, Validators, FormControl} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {fuseAnimations} from '../../../../../../@fuse/animations';
import {EmployeeOtherDetailsService} from '../../../../../shared/services/employee-other-details.service';
import * as moment from 'moment';

@Component({
    selector: 'app-employee-membership',
    templateUrl: './employee-membership.html',
    styleUrls: ['./employee-membership.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})

// tslint:disable-next-line:component-class-suffix
export class EmployeeMembership implements OnInit {
    data: any;
    dialogTitle: any;
    employeeMembershipForm: FormGroup;
    memberships = [];
    employeeMembershipList = [];
    employeeMembershipColumns = ['sno', 'membership', 'membershipRegNumber', 'membershipRank', 'joinAt', 'actions'];
    employeeMembershipId = null;
    constructor(public matDialogRef: MatDialogRef<EmployeeMembership>,
                @Inject(MAT_DIALOG_DATA) private _data: any,
                private fb: FormBuilder,
                private employeeOtherDetailsService: EmployeeOtherDetailsService,
                ) {
        this.data = _data;
        if (_data.title === 'MEMBERSHIP') {
            this.dialogTitle = 'Membership';
        }

    }

    ngOnInit(): void {
        this.refresh();
        this. getMembership();
        this. getMembershipList();
    }

    refresh() {
        this.employeeMembershipForm = this.fb.group({
            membershipId: ['', Validators.required],
            membershipRegistrationNumber: ['', Validators.required],
            membershipRank: ['', Validators.required],
            joinAt: ['', Validators.required],
        });
    }
    getMembership() {
        this.employeeOtherDetailsService.membership().subscribe(val => {
            this.memberships = val.items;
        });
    }

    deleteEmployeeMembership(id: any) {
        this.employeeOtherDetailsService.deleteMembership(id).subscribe(data => {
            this.employeeMembershipForm.reset();
            this.getMembershipList();
        });
    }

    editEmployeeMembership(employeeMembershipId: any) {
        this.employeeMembershipId = employeeMembershipId;
        this.employeeMembershipList.forEach(val => {
            if (val.id === employeeMembershipId) {
                this.employeeMembershipForm.patchValue({
                    membershipId: val.membershipId,
                    membershipRegistrationNumber: val.membershipRegistrationNumber,
                    membershipRank: val.membershipRank,
                    joinAt: val.joinAt,
                });
            }
        });
    }
    getMembershipList() {
        this.employeeOtherDetailsService.employeeMembershipList(this.data.employeeId).subscribe(data => {
            this.employeeMembershipList = data.items;
            let index = 0;
            this.employeeMembershipList.forEach(value => {
                index += 1;
                value['sno'] = index;
            });
        });
    }

    addMembership() {
        const f = this.employeeMembershipForm.value;
        const joinDate = moment(f.joinAt).format('YYYY-MM-DD');
        const obj = {
            membershipId: f.membershipId,
            membershipRegistrationNumber: f.membershipRegistrationNumber,
            membershipRank: f.membershipRank,
            joinAt: joinDate,
        };
        this.employeeOtherDetailsService.addEmployeeMembership(this.data.employeeId, obj).subscribe(v => {
            this.employeeMembershipForm.reset();
            this.getMembershipList();
        });
    }
    updateEmployeeMembership() {
        const f = this.employeeMembershipForm.value;
        const joinDate = moment(f.joinAt).format('YYYY-MM-DD');
        const obj = {
            membershipId: f.membershipId,
            membershipRegistrationNumber: f.membershipRegistrationNumber,
            membershipRank: f.membershipRank,
            joinAt: joinDate,
        };
        this.employeeOtherDetailsService.updateMembership(this.data.employeeId, this.employeeMembershipId, obj).subscribe(data => {
            this.employeeMembershipId = null;
            this.employeeMembershipForm.reset();
            this.getMembershipList();
        });
    }
    cancelUpdate() {
        this.employeeMembershipId = null;
        this.employeeMembershipForm.reset();
    }
}
