import {Component, Inject, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {FormBuilder, FormGroup, Validators, FormControl} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {fuseAnimations} from '../../../../../../@fuse/animations';
import {ContactInfoService} from '../../../../../shared/services/contact-info.service';

@Component({
    selector: 'aap-employee-other-details-form',
    templateUrl: './employee-other-details.html',
    styleUrls: ['./employee-other-details.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})

// tslint:disable-next-line:component-class-suffix
export class EmployeeOtherDetails implements OnInit {
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

    constructor(public matDialogRef: MatDialogRef<EmployeeOtherDetails>,
                @Inject(MAT_DIALOG_DATA) private _data: any,
                private fb: FormBuilder,
                ) {
        this.data = _data;
        if ( _data.title === 'ADDRESS') {
            this.dialogTitle = 'Address';
        } else if (_data.title === 'CENSURE') {
            this.dialogTitle = 'Censure';
        }else if (_data.title === 'EMPLOYMENT_HISTORY') {
            this.dialogTitle = 'History';
        }else if (_data.title === 'LANGUAGES') {
            this.dialogTitle = 'Language Profeciency';
        }else if (_data.title === 'MEMBERSHIP') {
            this.dialogTitle = 'Membership';
        }else if (_data.title === 'MILITARY_SERVICE') {
            this.dialogTitle = 'Military Service';
        }else if (_data.title === 'PHONE_NUMBER') {
            this.dialogTitle = 'Phone Numbers';
        }else if (_data.title === 'QUALIFICATIONS') {
            this.dialogTitle = 'Qualification';
        }else if (_data.title === 'RELATIONS') {
            this.dialogTitle = 'Relations';
        }else if (_data.title === 'SCHOOLS_ATTENDED') {
            this.dialogTitle = 'Schools Attended';
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
