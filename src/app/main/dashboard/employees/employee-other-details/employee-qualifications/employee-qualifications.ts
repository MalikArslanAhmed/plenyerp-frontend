import {Component, Inject, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {FormBuilder, FormGroup, Validators, FormControl} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {fuseAnimations} from '../../../../../../@fuse/animations';

@Component({
    selector: 'app-employee-qualifications',
    templateUrl: './employee-qualifications.html',
    styleUrls: ['./employee-qualifications.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})

// tslint:disable-next-line:component-class-suffix
export class EmployeeQualifications implements OnInit {
    data: any;
    dialogTitle: any;
    employeeQualificationForm: FormGroup;
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
    employeeQualificationList = [
        {
            sno: 1,
            name: 'abcd',
        },
        {
            sno: 2,
            name: 'abcd1',
        }
    ];
    employeeQualificationColumns = ['sno', 'name', 'actions'];
    certifications = [];
    majors = [];
    countryOfIssues = [];
    constructor(public matDialogRef: MatDialogRef<EmployeeQualifications>,
                @Inject(MAT_DIALOG_DATA) private _data: any,
                private fb: FormBuilder,
                ) {
        this.data = _data;
        if (_data.title === 'QUALIFICATIONS') {
            this.dialogTitle = 'Qualification';
        }

    }

    ngOnInit(): void {
        this.refresh();
    }

    refresh() {
        this.employeeQualificationForm = this.fb.group({
            institution: ['', Validators.required],
            certification: ['', Validators.required],
            major: ['',  Validators.required],
            countryOfIssue: ['', Validators.required],
            yearObtained: ['', Validators.required],
        });
    }


    editEmployeeQualification(employeeQualification: any) {

    }

    deleteEmployeeQualification(id: any) {

    }
}
