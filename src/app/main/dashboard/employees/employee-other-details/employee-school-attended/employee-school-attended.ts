import { Component, Inject, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { fuseAnimations } from '../../../../../../@fuse/animations';
import { EmployeeOtherDetailsService } from '../../../../../shared/services/employee-other-details.service';

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
    employeeSchoolAttendedList: any;
    employeeSchoolAttendedColumns = ['sno', 'name', 'country', 'dateEntered', 'dateExited', 'actions'];
    countries = [];
    schedules;
    schoolAttendedId = null;

    constructor(public matDialogRef: MatDialogRef<EmployeeSchoolAttended>,
        @Inject(MAT_DIALOG_DATA) private _data: any,
        private fb: FormBuilder,
        private employeeOtherDetailsService: EmployeeOtherDetailsService
    ) {
        this.data = _data;
        if (_data.title === 'SCHOOLS_ATTENDED') {
            this.dialogTitle = 'Schools Attended';
        }

    }

    ngOnInit(): void {
        this.refresh();
        this.getCountry();
        this.getSchoolAttendedList();
        this.getSchedule();
    }

    refresh() {
        this.employeeSchoolAttendedForm = this.fb.group({
            school: ['', Validators.required],
            address: ['', Validators.required],
            scheduleId: ['', Validators.required],
            countryId: ['', Validators.required],
            enteredAt: ['', Validators.required],
            exitedAt: ['', Validators.required],
        });
    }

    getCountry() {
        this.employeeOtherDetailsService.allCountry().subscribe(data => {
            this.countries = data.items;
        });
    }

    getSchedule() {
        this.employeeOtherDetailsService.getSchedule().subscribe(data => {
            this.schedules = data.items;
        });
    }

    getSchoolAttendedList() {
        this.employeeOtherDetailsService.getSchoolAttendedList(this.data.employeeId).subscribe(data => {
            this.employeeSchoolAttendedList = data.items;
            let index = 0;
            this.employeeSchoolAttendedList.forEach(value => {
                index += 1;
                value['sno'] = index;
            });
        });
    }

    addEmployeeSchoolAttended() {
        this.employeeOtherDetailsService.addEmployeeSchoolAttended(this.data.employeeId, this.employeeSchoolAttendedForm.value).subscribe(data => {
            this.getSchoolAttendedList();
        });
    }


    editEmployeeSchoolAttended(employeeSchoolAttended: any) {
        this.schoolAttendedId = employeeSchoolAttended.id;
        this.employeeSchoolAttendedForm.patchValue({
            school: employeeSchoolAttended.school,
            address: employeeSchoolAttended.address,
            scheduleId: employeeSchoolAttended.scheduleId,
            countryId: employeeSchoolAttended.countryId,
            enteredAt: employeeSchoolAttended.enteredAt,
            exitedAt: employeeSchoolAttended.exitedAt
        });
    }

    updateEmployeeSchoolAttended(){
        this.employeeOtherDetailsService.updateEmployeeSchoolAttended(this.data.employeeId, this.schoolAttendedId, this.employeeSchoolAttendedForm.value).subscribe(data => {
            this.schoolAttendedId = null;
            this.getSchoolAttendedList();
            this.employeeSchoolAttendedForm.reset();
        });
    }

    deleteEmployeeSchoolAttended(id: any) {
        this.employeeOtherDetailsService.deleteEmployeeSchoolAttended(id).subscribe(data => {
            this.getSchoolAttendedList();
        });
    }
}
