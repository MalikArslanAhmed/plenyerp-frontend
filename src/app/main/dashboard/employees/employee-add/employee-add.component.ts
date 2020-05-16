import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {fuseAnimations} from "../../../../../@fuse/animations";
import {FormGroup, FormBuilder, Validators} from '@angular/forms';
import {AppConstants} from "../../../../shared/constants/app-constants";
import {DepartmentListSelectComponent} from "../../structure/department-list/department-list-select.component";
import {JobPositionsListSelectComponent} from "../job-positions-list-select/job-positions-list-select.component";
import {StructureService} from "../../../../shared/services/structure.service";
import {FuseSidebarService} from "../../../../../@fuse/components/sidebar/sidebar.service";
import {MatDialog} from "@angular/material/dialog";
import {SalaryScalesService} from "../../../../shared/services/salary-scales.service";
import {SkillService} from "../../../../shared/services/skill.service";
import {WorkLocationsListSelectComponent} from "../work-locations-list-select/work-locations-list-select.component";
import {EmployeeService} from "../../../../shared/services/employee.service";
import { Router } from '@angular/router';

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
    designations = [];
    countries = [];
    countriesOther = [];
    states = [];
    statesOther = [];
    lgas = [];
    lgasOthers = [];
    regions = [];
    regionsOther = [];
    dialogRef: any;
    jobPositions = [];
    workLocations = [];
    departments = [];
    salaryScales = [];
    gradeLevels = [];
    gradeLevelSteps = [];
    isSubmitted = false;
    employeeId: any;

    constructor(private structureService: StructureService,
                private _fuseSidebarService: FuseSidebarService,
                private _matDialog: MatDialog,
                private salaryScalesService: SalaryScalesService,
                private skillService: SkillService,
                private fb: FormBuilder,
                private employeeService: EmployeeService,
                private router: Router) {
    }

    ngOnInit(): void {
        this.refresh();
        this.getDesignations();
        this.getSalaryScales();
        this.getCountries();
        this.getCountriesOther();
    }

    refresh() {
        this.employeeForm = this.fb.group({
            personnelFileNumber: ['', Validators.required],
            title: ['', Validators.required],
            maidenName: [''],
            lastName: ['', Validators.required],
            firstName: ['', Validators.required],
            otherName: ['']
        });

        this.personalDetailsForm = this.fb.group({
            dateOfBirth: ['', Validators.required],
            maritalStatus: ['SINGLE', Validators.required],
            gender: ['MALE', Validators.required],
            religion: ['CHRISTIANITY', Validators.required],
            phone: ['', Validators.required],
            email: ['', Validators.required],
            appointedOn: ['', Validators.required],
            assumedDutyOn: ['', Validators.required],
            typeOfAppointment: ['TENURED', Validators.required],
            isPermanentStaff: ['', Validators.required]
        });

        this.jobProfileSalaryPlacementForm = this.fb.group({
            currentAppointment: ['', Validators.required],
            jobPositionId: ['', Validators.required],
            departmentId: ['', Validators.required],
            workLocationId: ['', Validators.required],
            designationId: ['', Validators.required],
            salaryScaleId: ['', Validators.required],
            gradeLevelId: ['', Validators.required],
            gradeLevelStepId: ['', Validators.required]
        });

        this.citizenshipContactDetailsForm = this.fb.group({
            countryId: ['', Validators.required],
            regionId: ['', Validators.required],
            stateId: ['', Validators.required],
            lgaId: ['', Validators.required],
            addressLine1: ['', Validators.required],
            addressLine2: ['', Validators.required],
            city: ['', Validators.required],
            zipCode: ['', Validators.required],
            otherCountryId: [''],
            otherRegionId: [''],
            otherStateId: [''],
            otherLgaId: ['']
        });
    }

    getCountries() {
        this.structureService.getCountries({'page': -1}).subscribe(data => {
            this.countries = data.items
        });
    }

    getCountriesOther() {
        this.structureService.getCountries({'page': -1}).subscribe(data => {
            this.countriesOther = data.items
        });
    }

    /*save() {
        console.log('citizenshipContactDetailsForm', this.citizenshipContactDetailsForm.value);
    }*/

    jobPositionListSelect() {
        this.dialogRef = this._matDialog.open(JobPositionsListSelectComponent, {
            panelClass: 'contact-form-dialog',
        });
        this.dialogRef.afterClosed().subscribe((response) => {
            if (!response) {
                return;
            }
            this.jobPositions = [{
                'name': response.name,
                'id': response.id
            }];
            this.jobProfileSalaryPlacementForm.patchValue({
                jobPositionId: response.id,
                disabled: true
            });
            if (this.salaryScales && this.salaryScales.length > 0) {
                let salaryScales = this.salaryScales.find(function (salaryScale) {
                    return (salaryScale.id === response.salaryScaleId);
                });
                this.salaryScales = [{
                    'id': salaryScales.id,
                    'name': salaryScales.name
                }];
                this.jobProfileSalaryPlacementForm.patchValue({
                    'salaryScaleId': salaryScales.id
                });
                if (salaryScales) {
                    if (salaryScales['gradeLevels'] && salaryScales['gradeLevels'].length > 0) {
                        let gradeLevels = salaryScales['gradeLevels'].find(function (gradeLevel) {
                            return (gradeLevel.id === response.gradeLevelId);
                        });
                        this.gradeLevels = [{
                            'id': gradeLevels.id,
                            'name': gradeLevels.name
                        }];
                        this.jobProfileSalaryPlacementForm.patchValue({
                            'gradeLevelId': gradeLevels.id
                        });

                        if (gradeLevels && gradeLevels['gradeLevelSteps'].length > 0) {
                            let gradeLevelSteps = gradeLevels['gradeLevelSteps'].find(function (gradeLevelStep) {
                                return (gradeLevelStep.id === response.gradeLevelStepId);
                            });

                            this.gradeLevelSteps = [{
                                'id': gradeLevelSteps.id,
                                'name': gradeLevelSteps.name
                            }];
                            this.jobProfileSalaryPlacementForm.patchValue({
                                'gradeLevelStepId': gradeLevelSteps.id
                            });
                        }
                    }
                }
            }
        });
    }

    workLocationListSelect() {
        this.dialogRef = this._matDialog.open(WorkLocationsListSelectComponent, {
            panelClass: 'contact-form-dialog',
        });
        this.dialogRef.afterClosed().subscribe((response) => {
            if (!response) {
                return;
            }
            this.workLocations = [{
                'name': response.name,
                'id': response.id
            }];
            this.jobProfileSalaryPlacementForm.patchValue({
                workLocationId: response.id,
                disabled: true
            });
        });
    }

    adminUnitListSelect() {
        this.dialogRef = this._matDialog.open(DepartmentListSelectComponent, {
            panelClass: 'contact-form-dialog',
        });
        this.dialogRef.afterClosed().subscribe((response) => {
            if (!response) {
                return;
            }
            this.departments = [{
                'name': response.name,
                'id': response.id
            }];
            this.jobProfileSalaryPlacementForm.patchValue({
                departmentId: response.id,
                disabled: true
            });
        });
    }

    getDesignations() {
        this.structureService.getDesignations({'page': -1}).subscribe(data => {
            this.designations = data.items
        });
    }

    getSalaryScales() {
        this.salaryScalesService.getSalaryScales({'page': -1}).subscribe(data => {
            this.salaryScales = data
        });
    }

    saveEmployee() {
        console.log('this.employeeForm', this.employeeForm.value);
        this.isSubmitted = true;
        if (!this.employeeForm.valid) {
            this.isSubmitted = false;
            return;
        }

        if (this.isSubmitted) {
            this.employeeService.addEmployee(this.employeeForm.value).subscribe(data => {
                this.employeeId = data.id;
                this.isSubmitted = false;
            });
        }
    }

    savePersonalDetail() {
        console.log('this.personalDetailsForm', this.personalDetailsForm.value);
        this.isSubmitted = true;
        if (!this.personalDetailsForm.valid) {
            this.isSubmitted = false;
            return;
        }

        if (this.isSubmitted) {
            this.personalDetailsForm.value['dateOfBirth'] = this.personalDetailsForm.value['dateOfBirth'].format('YYYY-MM-DD');
            this.personalDetailsForm.value['appointedOn'] = this.personalDetailsForm.value['appointedOn'].format('YYYY-MM-DD');
            this.personalDetailsForm.value['assumedDutyOn'] = this.personalDetailsForm.value['assumedDutyOn'].format('YYYY-MM-DD');
            this.employeeService.addPersonalDetails(this.employeeId, this.personalDetailsForm.value).subscribe(data => {
                this.isSubmitted = false;
            });
        }
    }

    saveJobProfile() {
        console.log('this.jobProfileSalaryPlacementForm', this.jobProfileSalaryPlacementForm.value);
        this.isSubmitted = true;
        if (!this.jobProfileSalaryPlacementForm.valid) {
            this.isSubmitted = false;
            return;
        }

        if (this.isSubmitted) {
            this.jobProfileSalaryPlacementForm.value['currentAppointment'] = this.jobProfileSalaryPlacementForm.value['currentAppointment'].format('YYYY-MM-DD');
            console.log('this.jobProfileSalaryPlacementForm.value', this.jobProfileSalaryPlacementForm.value);
            this.employeeService.addJobProfile(this.employeeId, this.jobProfileSalaryPlacementForm.value).subscribe(data => {
                this.isSubmitted = false;
            });
        }
    }

    saveContactDetails() {
        console.log('this.citizenshipContactDetailsForm', this.citizenshipContactDetailsForm.value);
        this.isSubmitted = true;
        if (!this.citizenshipContactDetailsForm.valid) {
            this.isSubmitted = false;
            return;
        }

        if (this.isSubmitted) {
            this.employeeService.addContactDetails(this.employeeId, this.citizenshipContactDetailsForm.value).subscribe(data => {
                this.isSubmitted = false;
                this.router.navigateByUrl(`/dashboard/employees`);
            });
        }
    }

    chooseRegion(event) {
        this.structureService.getRegions({'page': -1, 'countryId': event}).subscribe(data => {
            this.regions = data.items
        });
    }

    chooseState(event) {
        this.structureService.getStates({'page': -1, 'regionId': event}).subscribe(data => {
            this.states = data.items
        });
    }

    chooseLga(event) {
        this.structureService.getLga({'page': -1, 'lgaId': event}).subscribe(data => {
            this.lgas = data.items
        });
    }


    chooseRegionOther(event) {
        this.structureService.getRegions({'page': -1, 'countryId': event}).subscribe(data => {
            this.regionsOther = data.items
        });
    }

    chooseStateOther(event) {
        this.structureService.getStates({'page': -1, 'regionId': event}).subscribe(data => {
            this.statesOther = data.items
        });
    }

    chooseLgaOther(event) {
        this.structureService.getLga({'page': -1, 'lgaId': event}).subscribe(data => {
            this.lgasOthers = data.items
        });
    }
}
