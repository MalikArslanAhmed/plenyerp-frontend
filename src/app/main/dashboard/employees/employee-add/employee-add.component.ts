import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {fuseAnimations} from "../../../../../@fuse/animations";
import {FormGroup, FormBuilder, Validators} from '@angular/forms';
import {AppConstants} from "../../../../shared/constants/app-constants";

@Component({
    selector: 'app-employee-add',
    templateUrl: './employee-add.component.html',
    styleUrls: ['./employee-add.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class EmployeeAddComponent implements OnInit {
    employeeForm: FormGroup;
    personalDetailsForm: FormGroup;
    jobProfileSalaryPlacementForm: FormGroup;
    citizenshipContactDetailsForm: FormGroup;
    maritalStatuses = AppConstants.maritalStatuses;
    genders = AppConstants.genders;
    religions = AppConstants.religions;

    typeOfAppointments = [
        {
            'name': 'Tenured',
            'value': 'TENURED',
        }
    ];

    designations = [
        {
            'name': 'Engineer',
            'value': 1
        },
        {
            'name': 'Manager',
            'value': 2
        }
    ];

    countries = [];
    states = [];
    lgas = [];
    regions = [];

    constructor(private fb: FormBuilder) {
    }

    ngOnInit(): void {
        this.refresh()
    }

    refresh() {
        this.employeeForm = this.fb.group({
            id: ['', Validators.required],
            pfile: ['', Validators.required],
            title: ['', Validators.required],
            maiden: [''],
            lastName: ['', Validators.required],
            firstName: ['', Validators.required],
            otherName: ['']
        });

        this.personalDetailsForm = this.fb.group({
            dob: ['', Validators.required],
            maritalStatus: ['OTHERS', Validators.required],
            gender: ['MALE', Validators.required],
            religion: ['OTHERS', Validators.required],
            phone: ['', Validators.required],
            email: ['', Validators.required],
            appointed: ['', Validators.required],
            assumedDuty: ['', Validators.required],
            typeOfAppointment: ['TENURED', Validators.required],
            permanentStaff: ['', Validators.required]
        });

        this.jobProfileSalaryPlacementForm = this.fb.group({
            dateCurrentAppt: ['', Validators.required],
            jobPosition: ['', Validators.required],
            adminUnit: ['', Validators.required],
            workLocation: ['', Validators.required],
            designation: ['1', Validators.required],
            sScale: ['', Validators.required],
            gScale: ['', Validators.required],
            glScale: ['', Validators.required]
        });

        this.citizenshipContactDetailsForm = this.fb.group({
            citizenshipCountry: ['', Validators.required],
            citizenshipRegion: ['', Validators.required],
            citizenshipState: ['', Validators.required],
            citizenshipLga: ['', Validators.required],
            address1: ['1', Validators.required],
            address2: ['', Validators.required],
            contactInfoCity: ['', Validators.required],
            contactInfoZipCode: ['', Validators.required],
            contactInfoCountry: ['', Validators.required],
            contactInfoState: ['', Validators.required],
            contactInfoRegion: ['', Validators.required],
            contactInfoLga: ['', Validators.required],
        });
    }

    save() {
        console.log('citizenshipContactDetailsForm', this.citizenshipContactDetailsForm.value);
    }
}
