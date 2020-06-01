import {Component, Inject, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {FormBuilder, FormGroup, Validators, FormControl} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {fuseAnimations} from '../../../../../../@fuse/animations';
import { EmployeeOtherDetailsService } from '../../../../../shared/services/employee-other-details.service';

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
    
    employeeQualificationList = [];
    employeeQualificationColumns = ['sno', 'name', 'actions'];
    certifications = [];
    majors = [];
    countryOfIssues = [];
    // years:any;
    years = [2015, 2016, 2017, 2018, 2019, 2020];

    employeeQualification;
    employeeQualificationId = null;
    constructor(public matDialogRef: MatDialogRef<EmployeeQualifications>,
                @Inject(MAT_DIALOG_DATA) private _data: any,
                private fb: FormBuilder,
                private employeeOtherDetailsService: EmployeeOtherDetailsService
                ) {
        this.data = _data;
        if (_data.title === 'QUALIFICATIONS') {
            this.dialogTitle = 'Qualification';
        }

    }

    ngOnInit(): void {
        this.refresh();
        this.getCertifications();
        this.getMajors();
        this.getEmployeeQualificationList();
        this.getCountry();
        this.getYears();
    }

    refresh() {
        this.employeeQualificationForm = this.fb.group({
            instituteName: ['', Validators.required],
            qualificationId: ['', Validators.required],
            academicId: ['',  Validators.required],
            countryId: ['', Validators.required],
            year: ['', Validators.required]
        });
    }

    getYears(){
        const currentYear = new Date().getFullYear();
    }

    getCountry() {
        this.employeeOtherDetailsService.allCountry().subscribe(data => {
            this.countryOfIssues = data.items;
        });
    }

    getCertifications() {
        this.employeeOtherDetailsService.getCertifications().subscribe(data => {
            this.certifications = data.items;
        });
    }

    getMajors() {
        this.employeeOtherDetailsService.getMajors().subscribe(data => {
            this.majors = data.items;
        });
    }

    getEmployeeQualificationList() {
        this.employeeOtherDetailsService.getEmployeeQualificationList(this.data.employeeId).subscribe(data => {
            this.employeeQualificationList = data.items;
            let index = 0;
            this.employeeQualificationList.forEach(value => {
                index += 1;
                value['sno'] = index;
            });
        });
    }

    addEmployeeQualification() {
        this.employeeOtherDetailsService.addEmployeeQualification(this.data.employeeId, this.employeeQualificationForm.value).subscribe(data => {
            this.getEmployeeQualificationList();
        });
    }


    editEmployeeQualification(employeeQualification: any) {
        this.employeeQualificationId = employeeQualification.id;
        this.employeeQualificationForm.patchValue({
            instituteName: employeeQualification.instituteName,
            qualificationId: employeeQualification.qualificationId,
            academicId: employeeQualification.academicId,
            countryId: employeeQualification.countryId,
            year: employeeQualification.year
        });
    }

    updateEmployeeQualification(){
        this.employeeOtherDetailsService.updateEmployeeQualification(this.data.employeeId, this.employeeQualificationId, this.employeeQualificationForm.value).subscribe(data => {
            this.employeeQualificationId = null;
            this.getEmployeeQualificationList();
            this.employeeQualificationForm.reset();
        });
    }

    deleteEmployeeQualification(id: any) {
        this.employeeOtherDetailsService.deleteEmployeeQualification(id).subscribe(data => {
            this.getEmployeeQualificationList();
        });
    }
}
