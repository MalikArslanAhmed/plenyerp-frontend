import {Component, Inject, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {FormBuilder, FormGroup, Validators, FormControl} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {fuseAnimations} from '../../../../../../@fuse/animations';

@Component({
    selector: 'app-employee-phone-number',
    templateUrl: './employee-phone-number.html',
    styleUrls: ['./employee-phone-number.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})

// tslint:disable-next-line:component-class-suffix
export class EmployeePhoneNumber implements OnInit {
    data: any;
    dialogTitle: any;
    employeePhoneNumberForm: FormGroup;
    phoneDetails = [
        {
            name: 'abcd',
            value: 'ABCD'
        },
        {
            name: 'xyz',
            value: 'XYZ'
        }
    ];
    employeePhoneNumberList = [
        {
            sno: 1,
            name: 'abcd',
        },
        {
            sno: 2,
            name: 'abcd1',
        }
    ];
    employeePhoneNumberColumns = ['sno', 'name', 'actions'];
    constructor(public matDialogRef: MatDialogRef<EmployeePhoneNumber>,
                @Inject(MAT_DIALOG_DATA) private _data: any,
                private fb: FormBuilder,
                ) {
        this.data = _data;
        if (_data.title === 'PHONE_NUMBER') {
            this.dialogTitle = 'Phone Numbers';
        }

    }

    ngOnInit(): void {
        this.refresh();
    }

    refresh() {
        this.employeePhoneNumberForm = this.fb.group({
            phoneDetail: ['', Validators.required],
            extension: ['', Validators.required],
            phoneNumber: [''],
        });
    }


    editEmployeePhoneNumber(employeePhoneNumber: any) {

    }

    deleteEmployeePhoneNumber(id: any) {

    }
}
