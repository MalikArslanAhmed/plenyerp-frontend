import {Component, Inject, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {FormBuilder, FormGroup, Validators, FormControl} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {fuseAnimations} from '../../../../../../@fuse/animations';

@Component({
    selector: 'app-employee-school-attended',
    templateUrl: './employee-school-attended.html',
    styleUrls: ['./employee-school-attended.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})

// tslint:disable-next-line:component-class-suffix
export class EmployeeSchoolAttended implements OnInit {
    data: any;
    dialogTitle: any;
    employeeSchoolAttendedForm: FormGroup;
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
    employeeSchoolAttendedList = [
        {
            sno: 1,
            name: 'abcd',
        },
        {
            sno: 2,
            name: 'abcd1',
        }
    ];
    employeeSchoolAttendedColumns = ['sno', 'name', 'actions'];
    countries = [];
    categories = [];

    constructor(public matDialogRef: MatDialogRef<EmployeeSchoolAttended>,
                @Inject(MAT_DIALOG_DATA) private _data: any,
                private fb: FormBuilder,
    ) {
        this.data = _data;
        if (_data.title === 'SCHOOLS_ATTENDED') {
            this.dialogTitle = 'Schools Attended';
        }

    }

    ngOnInit(): void {
        this.refresh();
    }

    refresh() {
        this.employeeSchoolAttendedForm = this.fb.group({
            school: ['', Validators.required],
            address: ['', Validators.required],
            category: ['', Validators.required],
            country: ['', Validators.required],
            dateEntered: ['', Validators.required],
            dateExited: ['', Validators.required],
        });
    }

    editEmployeeSchoolAttended(employeeSchoolAttended: any) {

    }

    deleteEmployeeSchoolAttended(id: any) {

    }
}
