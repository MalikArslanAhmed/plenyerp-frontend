import {Component, Inject, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {FormBuilder, FormGroup, Validators, FormControl} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {fuseAnimations} from '../../../../../../@fuse/animations';

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
    memberships = [
        {
            name: 'abcd',
            value: 'ABCD'
        },
        {
            name: 'xyz',
            value: 'XYZ'
        }
    ];
    employeeMembershipList = [
        {
            sno: 1,
            name: 'abcd',
        },
        {
            sno: 2,
            name: 'abcd1',
        }
    ];
    employeeMembershipColumns = ['sno', 'name', 'actions'];
    constructor(public matDialogRef: MatDialogRef<EmployeeMembership>,
                @Inject(MAT_DIALOG_DATA) private _data: any,
                private fb: FormBuilder,
                ) {
        this.data = _data;
        if (_data.title === 'MEMBERSHIP') {
            this.dialogTitle = 'Membership';
        }

    }

    ngOnInit(): void {
        this.refresh();
    }

    refresh() {
        this.employeeMembershipForm = this.fb.group({
            membership: ['', Validators.required],
            membershipRegNo: ['', Validators.required],
            membershipRank: ['', Validators.required],
            dateJoin: ['', Validators.required],
        });
    }


    deleteEmployeeMembership(id: any) {

    }

    editEmployeeMembership(employeeMembership: any) {

    }
}
