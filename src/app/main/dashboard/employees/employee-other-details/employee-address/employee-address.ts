import {Component, Inject, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {FormBuilder, FormGroup, Validators, FormControl} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {fuseAnimations} from '../../../../../../@fuse/animations';

@Component({
    selector: 'app-employee-address',
    templateUrl: './employee-address.html',
    styleUrls: ['./employee-address.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})

// tslint:disable-next-line:component-class-suffix
export class EmployeeAddress implements OnInit {
    data: any;
    dialogTitle: any;
    employeeOtherDetailsForm: FormGroup;
    typeOfAddress = [
        {
            name: 'abcd',
            value: 'ABCD'
        },
        {
            name: 'xyz',
            value: 'XYZ'
        }
    ];
    countries = [];
    states = [];
    regions = [];
    lgas = [];
    employeeAddressList = [
        {
            sno: 1,
            name: 'abcd',
        },
        {
            sno: 2,
            name: 'abcd1',
        }
        ];
    employeeAddressColumns = ['sno', 'name', 'actions'];

    constructor(public matDialogRef: MatDialogRef<EmployeeAddress>,
                @Inject(MAT_DIALOG_DATA) private _data: any,
                private fb: FormBuilder,
                ) {
        this.data = _data;
        if ( _data.title === 'ADDRESS') {
            this.dialogTitle = 'Address';
        }

    }

    ngOnInit(): void {
        this.refresh();
    }

    refresh() {
        this.employeeOtherDetailsForm = this.fb.group({
            typeOfAddress: ['', Validators.required],
            addressLine1: ['', Validators.required],
            addressLine2: [''],
            city: ['', Validators.required],
            zip: ['', Validators.required],
            country: ['', Validators.required],
            state: ['', Validators.required],
            region: ['', Validators.required],
            lga: ['', Validators.required],
        });
    }


    editEmployeeAddress(employeeAddress: any) {

    }

    deleteEmployeeAddress(id: any) {

    }
}
