import {Component, Inject, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {FormBuilder, FormGroup, Validators, FormControl} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {fuseAnimations} from '../../../../../../@fuse/animations';

@Component({
    selector: 'app-employee-languages',
    templateUrl: './employee-languages.html',
    styleUrls: ['./employee-languages.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})

// tslint:disable-next-line:component-class-suffix
export class EmployeeLanguages implements OnInit {
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
    constructor(public matDialogRef: MatDialogRef<EmployeeLanguages>,
                @Inject(MAT_DIALOG_DATA) private _data: any,
                private fb: FormBuilder,
                ) {
        this.data = _data;
        if (_data.title === 'LANGUAGES') {
            this.dialogTitle = 'Language Profeciency';
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


}
