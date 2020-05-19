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
import {ActivatedRoute, Router} from '@angular/router';

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
    progressionForm: FormGroup;
    idNosForm: FormGroup;
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
    selectedEmployeeId: any;
    selectedEmployee: any;

    constructor(private structureService: StructureService,
                private _fuseSidebarService: FuseSidebarService,
                private _matDialog: MatDialog,
                private salaryScalesService: SalaryScalesService,
                private skillService: SkillService,
                private fb: FormBuilder,
                private employeeService: EmployeeService,
                private router: Router,
                private activatedRoute: ActivatedRoute) {
    }

    ngOnInit(): void {
        this.refresh();
        this.getDesignations();
        this.getSalaryScales();
        this.getCountries();
        this.getCountriesOther();
        this.getEmployeeId();
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

        this.progressionForm = this.fb.group({
            lastIncrement: [''],
            nextIncrement: [''],
            confirmationDueDate: [''],
            isConfirmed: [false],
            lastPromoted: [''],
            nextPromotion: [''],
            expectedExitDate: [''],
            isExited: [false],
            isPensionStarted: [false],
            dateStarted: [''],
            gratuity: [''],
            monthlyPension: [''],
            otherPension: ['']
        });

        this.idNosForm = this.fb.group({
            nhfNumber: [''],
            tinNumber: [''],
            nationalIdNumber: [''],
            driverLicenseNumber: [''],
            bankVersionNumber: [''],
            pensionFundAdministration: [''],
            pfaNumber: [''],
            passportNumber: [''],
            issuedAt: [''],
            issuedDate: [''],
            workPermitNumber: [''],
            expiryDate: ['']
        });
    }

    getEmployeeId() {
        this.selectedEmployeeId = this.activatedRoute.snapshot.params.id;
        if (this.selectedEmployeeId) {
            this.getEmployeeById();
        }
    }

    getEmployeeById() {
        this.employeeService.getEmployees({'page': -1, 'id': this.selectedEmployeeId}).subscribe(data => {
            this.selectedEmployee = data.items[0];
            if (this.selectedEmployeeId) {
                this.patchEmployeeForm();
                this.patchPersonalDetailsForm();
                this.patchJobProfileSalaryPlacementForm();
                this.patchCitizenshipContactDetailsForm();
                this.patchProgressionForm();
                this.patchIdNosForm();
            }
        });
    }

    patchEmployeeForm() {
        this.employeeForm.patchValue({
            'personnelFileNumber': this.selectedEmployee && this.selectedEmployee.personnelFileNumber ? this.selectedEmployee && this.selectedEmployee.personnelFileNumber : '',
            'title': this.selectedEmployee && this.selectedEmployee.title ? this.selectedEmployee && this.selectedEmployee.title : '',
            'maidenName': this.selectedEmployee && this.selectedEmployee.maidenName ? this.selectedEmployee && this.selectedEmployee.maidenName : '',
            'lastName': this.selectedEmployee && this.selectedEmployee.lastName ? this.selectedEmployee && this.selectedEmployee.lastName : '',
            'firstName': this.selectedEmployee && this.selectedEmployee.firstName ? this.selectedEmployee && this.selectedEmployee.firstName : '',
            'otherName': this.selectedEmployee && this.selectedEmployee.otherName ? this.selectedEmployee && this.selectedEmployee.otherName : ''
        });
    }

    patchPersonalDetailsForm() {
        this.personalDetailsForm.patchValue({
            'dateOfBirth': this.selectedEmployee && this.selectedEmployee.employeePersonalDetails.dateOfBirth ? this.selectedEmployee && this.selectedEmployee.employeePersonalDetails.dateOfBirth : '',
            'maritalStatus': this.selectedEmployee && this.selectedEmployee.employeePersonalDetails.maritalStatus ? this.selectedEmployee && this.selectedEmployee.employeePersonalDetails.maritalStatus : '',
            'gender': this.selectedEmployee && this.selectedEmployee.employeePersonalDetails.gender ? this.selectedEmployee && this.selectedEmployee.employeePersonalDetails.gender : '',
            'religion': this.selectedEmployee && this.selectedEmployee.employeePersonalDetails.religion ? this.selectedEmployee && this.selectedEmployee.employeePersonalDetails.religion : '',
            'phone': this.selectedEmployee && this.selectedEmployee.employeePersonalDetails.phone ? this.selectedEmployee && this.selectedEmployee.employeePersonalDetails.phone : '',
            'email': this.selectedEmployee && this.selectedEmployee.employeePersonalDetails.email ? this.selectedEmployee && this.selectedEmployee.employeePersonalDetails.email : '',
            'appointedOn': this.selectedEmployee && this.selectedEmployee.employeePersonalDetails.appointedOn ? this.selectedEmployee && this.selectedEmployee.employeePersonalDetails.appointedOn : '',
            'assumedDutyOn': this.selectedEmployee && this.selectedEmployee.employeePersonalDetails.assumedDutyOn ? this.selectedEmployee && this.selectedEmployee.employeePersonalDetails.assumedDutyOn : '',
            'typeOfAppointment': this.selectedEmployee && this.selectedEmployee.employeePersonalDetails.typeOfAppointment ? this.selectedEmployee && this.selectedEmployee.employeePersonalDetails.typeOfAppointment : '',
            'isPermanentStaff': this.selectedEmployee && this.selectedEmployee.employeePersonalDetails.isPermanentStaff ? this.selectedEmployee && this.selectedEmployee.employeePersonalDetails.isPermanentStaff : ''
        });
    }

    patchJobProfileSalaryPlacementForm() {
        this.jobPositions = [{
            'name': this.selectedEmployee.employeeJobProfiles && this.selectedEmployee.employeeJobProfiles.jobPosition.name ? this.selectedEmployee.employeeJobProfiles && this.selectedEmployee.employeeJobProfiles.jobPosition.name : '',
            'id': this.selectedEmployee.employeeJobProfiles && this.selectedEmployee.employeeJobProfiles.jobPositionId ? this.selectedEmployee.employeeJobProfiles && this.selectedEmployee.employeeJobProfiles.jobPositionId : '',
        }];

        this.departments = [{
            'name': this.selectedEmployee.employeeJobProfiles && this.selectedEmployee.employeeJobProfiles.department.name ? this.selectedEmployee.employeeJobProfiles && this.selectedEmployee.employeeJobProfiles.department.name : '',
            'id': this.selectedEmployee.employeeJobProfiles && this.selectedEmployee.employeeJobProfiles.departmentId ? this.selectedEmployee.employeeJobProfiles && this.selectedEmployee.employeeJobProfiles.departmentId : '',
        }];

        this.workLocations = [{
            'name': this.selectedEmployee.employeeJobProfiles && this.selectedEmployee.employeeJobProfiles.workLocation.name ? this.selectedEmployee.employeeJobProfiles && this.selectedEmployee.employeeJobProfiles.workLocation.name : '',
            'id': this.selectedEmployee.employeeJobProfiles && this.selectedEmployee.employeeJobProfiles.workLocationId ? this.selectedEmployee.employeeJobProfiles && this.selectedEmployee.employeeJobProfiles.workLocationId : '',
        }];

        this.jobProfileSalaryPlacementForm.patchValue({
            'currentAppointment': this.selectedEmployee.employeeJobProfiles && this.selectedEmployee.employeeJobProfiles.currentAppointment ? this.selectedEmployee.employeeJobProfiles && this.selectedEmployee.employeeJobProfiles.currentAppointment : '',
            'jobPositionId': this.selectedEmployee.employeeJobProfiles && this.selectedEmployee.employeeJobProfiles.jobPositionId ? this.selectedEmployee.employeeJobProfiles && this.selectedEmployee.employeeJobProfiles.jobPositionId : '',
            'departmentId': this.selectedEmployee.employeeJobProfiles && this.selectedEmployee.employeeJobProfiles.departmentId ? this.selectedEmployee.employeeJobProfiles && this.selectedEmployee.employeeJobProfiles.departmentId : '',
            'workLocationId': this.selectedEmployee.employeeJobProfiles && this.selectedEmployee.employeeJobProfiles.workLocationId ? this.selectedEmployee.employeeJobProfiles && this.selectedEmployee.employeeJobProfiles.workLocationId : '',
            'designationId': this.selectedEmployee.employeeJobProfiles && this.selectedEmployee.employeeJobProfiles.designationId ? this.selectedEmployee.employeeJobProfiles && this.selectedEmployee.employeeJobProfiles.designationId : '',
            'salaryScaleId': this.selectedEmployee.employeeJobProfiles && this.selectedEmployee.employeeJobProfiles.salaryScaleId ? this.selectedEmployee.employeeJobProfiles && this.selectedEmployee.employeeJobProfiles.salaryScaleId : '',
            'gradeLevelId': this.selectedEmployee.employeeJobProfiles && this.selectedEmployee.employeeJobProfiles.gradeLevelId ? this.selectedEmployee.employeeJobProfiles && this.selectedEmployee.employeeJobProfiles.gradeLevelId : '',
            'gradeLevelStepId': this.selectedEmployee.employeeJobProfiles && this.selectedEmployee.employeeJobProfiles.gradeLevelStepId ? this.selectedEmployee.employeeJobProfiles && this.selectedEmployee.employeeJobProfiles.gradeLevelStepId : ''
        });

        if (this.salaryScales && this.salaryScales.length > 0) {
            let selectedEmployee = this.selectedEmployee;
            let salaryScales = this.salaryScales.find(function (salaryScale) {
                return (salaryScale.id === selectedEmployee.employeeJobProfiles.jobPosition.salaryScaleId);
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
                        return (gradeLevel.id === selectedEmployee.employeeJobProfiles.jobPosition.salaryScaleId);
                    });
                    this.gradeLevels = [{
                        'id': gradeLevels.id ? gradeLevels.id : '',
                        'name': gradeLevels.name ? gradeLevels.name : ''
                    }];
                    this.jobProfileSalaryPlacementForm.patchValue({
                        'gradeLevelId': gradeLevels.id ? gradeLevels.id : ''
                    });

                    if (gradeLevels && gradeLevels['gradeLevelSteps'].length > 0) {
                        let gradeLevelSteps = gradeLevels['gradeLevelSteps'].find(function (gradeLevelStep) {
                            return (gradeLevelStep.id === 5);
                        });

                        this.gradeLevelSteps = [{
                            'id': gradeLevelSteps.id ? gradeLevelSteps.id : '',
                            'name': gradeLevelSteps.name ? gradeLevelSteps.name : ''
                        }];
                        this.jobProfileSalaryPlacementForm.patchValue({
                            'gradeLevelStepId': gradeLevelSteps.id
                        });
                    }
                }
            }
        }
    }

    patchCitizenshipContactDetailsForm() {
        this.chooseRegion(this.selectedEmployee.employeeContactDetails.countryId);
        this.chooseState(this.selectedEmployee.employeeContactDetails.regionId);
        this.chooseLga(this.selectedEmployee.employeeContactDetails.lgaId);
        this.chooseRegionOther(this.selectedEmployee.employeeContactDetails.otherCountryId);
        this.chooseStateOther(this.selectedEmployee.employeeContactDetails.otherRegionId);
        this.chooseLgaOther(this.selectedEmployee.employeeContactDetails.otherLgaId);
        this.citizenshipContactDetailsForm.patchValue({
            'countryId': this.selectedEmployee.employeeContactDetails && this.selectedEmployee.employeeContactDetails.countryId ? this.selectedEmployee.employeeContactDetails && this.selectedEmployee.employeeContactDetails.countryId : '',
            'regionId': this.selectedEmployee.employeeContactDetails && this.selectedEmployee.employeeContactDetails.regionId ? this.selectedEmployee.employeeContactDetails && this.selectedEmployee.employeeContactDetails.regionId : '',
            'stateId': this.selectedEmployee.employeeContactDetails && this.selectedEmployee.employeeContactDetails.stateId ? this.selectedEmployee.employeeContactDetails && this.selectedEmployee.employeeContactDetails.stateId : '',
            'lgaId': this.selectedEmployee.employeeContactDetails && this.selectedEmployee.employeeContactDetails.lgaId ? this.selectedEmployee.employeeContactDetails && this.selectedEmployee.employeeContactDetails.lgaId : '',
            'addressLine1': this.selectedEmployee.employeeContactDetails && this.selectedEmployee.employeeContactDetails.addressLine1 ? this.selectedEmployee.employeeContactDetails && this.selectedEmployee.employeeContactDetails.addressLine1 : '',
            'addressLine2': this.selectedEmployee.employeeContactDetails && this.selectedEmployee.employeeContactDetails.addressLine2 ? this.selectedEmployee.employeeContactDetails && this.selectedEmployee.employeeContactDetails.addressLine2 : '',
            'city': this.selectedEmployee.employeeContactDetails && this.selectedEmployee.employeeContactDetails.city ? this.selectedEmployee.employeeContactDetails && this.selectedEmployee.employeeContactDetails.city : '',
            'zipCode': this.selectedEmployee.employeeContactDetails && this.selectedEmployee.employeeContactDetails.zipCode ? this.selectedEmployee.employeeContactDetails && this.selectedEmployee.employeeContactDetails.zipCode : '',
            'otherCountryId': this.selectedEmployee.employeeContactDetails && this.selectedEmployee.employeeContactDetails.otherCountryId ? this.selectedEmployee.employeeContactDetails && this.selectedEmployee.employeeContactDetails.otherCountryId : '',
            'otherRegionId': this.selectedEmployee.employeeContactDetails && this.selectedEmployee.employeeContactDetails.otherRegionId ? this.selectedEmployee.employeeContactDetails && this.selectedEmployee.employeeContactDetails.otherRegionId : '',
            'otherStateId': this.selectedEmployee.employeeContactDetails && this.selectedEmployee.employeeContactDetails.otherStateId ? this.selectedEmployee.employeeContactDetails && this.selectedEmployee.employeeContactDetails.otherStateId : '',
            'otherLgaId': this.selectedEmployee.employeeContactDetails && this.selectedEmployee.employeeContactDetails.otherLgaId ? this.selectedEmployee.employeeContactDetails && this.selectedEmployee.employeeContactDetails.otherLgaId : ''
        });
    }

    patchProgressionForm() {
        this.progressionForm.patchValue({
            'lastIncrement': this.selectedEmployee.employeeProgressions && this.selectedEmployee.employeeProgressions.lastIncrement ? this.selectedEmployee.employeeProgressions && this.selectedEmployee.employeeProgressions.lastIncrement : '',
            'nextIncrement': this.selectedEmployee.employeeProgressions && this.selectedEmployee.employeeProgressions.nextIncrement ? this.selectedEmployee.employeeProgressions && this.selectedEmployee.employeeProgressions.nextIncrement : '',
            'confirmationDueDate': this.selectedEmployee.employeeProgressions && this.selectedEmployee.employeeProgressions.confirmationDueDate ? this.selectedEmployee.employeeProgressions && this.selectedEmployee.employeeProgressions.confirmationDueDate : '',
            'isConfirmed': this.selectedEmployee.employeeProgressions && this.selectedEmployee.employeeProgressions.isConfirmed ? this.selectedEmployee.employeeProgressions && this.selectedEmployee.employeeProgressions.isConfirmed : '',
            'lastPromoted': this.selectedEmployee.employeeProgressions && this.selectedEmployee.employeeProgressions.lastPromoted ? this.selectedEmployee.employeeProgressions && this.selectedEmployee.employeeProgressions.lastPromoted : '',
            'nextPromotion': this.selectedEmployee.employeeProgressions && this.selectedEmployee.employeeProgressions.nextPromotion ? this.selectedEmployee.employeeProgressions && this.selectedEmployee.employeeProgressions.nextPromotion : '',
            'expectedExitDate': this.selectedEmployee.employeeProgressions && this.selectedEmployee.employeeProgressions.expectedExitDate ? this.selectedEmployee.employeeProgressions && this.selectedEmployee.employeeProgressions.expectedExitDate : '',
            'isExited': this.selectedEmployee.employeeProgressions && this.selectedEmployee.employeeProgressions.isExited ? this.selectedEmployee.employeeProgressions && this.selectedEmployee.employeeProgressions.isExited : '',
            'isPensionStarted': this.selectedEmployee.employeeProgressions && this.selectedEmployee.employeeProgressions.isPensionStarted ? this.selectedEmployee.employeeProgressions && this.selectedEmployee.employeeProgressions.isPensionStarted : '',
            'dateStarted': this.selectedEmployee.employeeProgressions && this.selectedEmployee.employeeProgressions.dateStarted ? this.selectedEmployee.employeeProgressions && this.selectedEmployee.employeeProgressions.dateStarted : '',
            'gratuity': this.selectedEmployee.employeeProgressions && this.selectedEmployee.employeeProgressions.gratuity ? this.selectedEmployee.employeeProgressions && this.selectedEmployee.employeeProgressions.gratuity : '',
            'monthlyPension': this.selectedEmployee.employeeProgressions && this.selectedEmployee.employeeProgressions.monthlyPension ? this.selectedEmployee.employeeProgressions && this.selectedEmployee.employeeProgressions.monthlyPension : '',
            'otherPension': this.selectedEmployee.employeeProgressions && this.selectedEmployee.employeeProgressions.otherPension ? this.selectedEmployee.employeeProgressions && this.selectedEmployee.employeeProgressions.otherPension : '',
        });
    }

    patchIdNosForm() {
        this.idNosForm.patchValue({
            'nhfNumber': this.selectedEmployee.employeeIdNos && this.selectedEmployee.employeeIdNos.nhfNumber ? this.selectedEmployee.employeeIdNos && this.selectedEmployee.employeeIdNos.nhfNumber : '',
            'tinNumber': this.selectedEmployee.employeeIdNos && this.selectedEmployee.employeeIdNos.tinNumber ? this.selectedEmployee.employeeIdNos && this.selectedEmployee.employeeIdNos.tinNumber : '',
            'nationalIdNumber': this.selectedEmployee.employeeIdNos && this.selectedEmployee.employeeIdNos.nationalIdNumber ? this.selectedEmployee.employeeIdNos && this.selectedEmployee.employeeIdNos.nationalIdNumber : '',
            'driverLicenseNumber': this.selectedEmployee.employeeIdNos && this.selectedEmployee.employeeIdNos.driverLicenseNumber ? this.selectedEmployee.employeeIdNos && this.selectedEmployee.employeeIdNos.driverLicenseNumber : '',
            'bankVersionNumber': this.selectedEmployee.employeeIdNos && this.selectedEmployee.employeeIdNos.bankVersionNumber ? this.selectedEmployee.employeeIdNos && this.selectedEmployee.employeeIdNos.bankVersionNumber : '',
            'pensionFundAdministration': this.selectedEmployee.employeeIdNos && this.selectedEmployee.employeeIdNos.pensionFundAdministration ? this.selectedEmployee.employeeIdNos && this.selectedEmployee.employeeIdNos.pensionFundAdministration : '',
            'pfaNumber': this.selectedEmployee.employeeIdNos && this.selectedEmployee.employeeIdNos.pfaNumber ? this.selectedEmployee.employeeIdNos && this.selectedEmployee.employeeIdNos.pfaNumber : '',
            'passportNumber': this.selectedEmployee.employeeIdNos && this.selectedEmployee.employeeIdNos.passportNumber ? this.selectedEmployee.employeeIdNos && this.selectedEmployee.employeeIdNos.passportNumber : '',
            'issuedAt': this.selectedEmployee.employeeIdNos && this.selectedEmployee.employeeIdNos.issuedAt ? this.selectedEmployee.employeeIdNos && this.selectedEmployee.employeeIdNos.issuedAt : '',
            'issuedDate': this.selectedEmployee.employeeIdNos && this.selectedEmployee.employeeIdNos.issuedDate ? this.selectedEmployee.employeeIdNos && this.selectedEmployee.employeeIdNos.issuedDate : '',
            'workPermitNumber': this.selectedEmployee.employeeIdNos && this.selectedEmployee.employeeIdNos.workPermitNumber ? this.selectedEmployee.employeeIdNos && this.selectedEmployee.employeeIdNos.workPermitNumber : '',
            'expiryDate': this.selectedEmployee.employeeIdNos && this.selectedEmployee.employeeIdNos.expiryDate ? this.selectedEmployee.employeeIdNos && this.selectedEmployee.employeeIdNos.expiryDate : '',
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

    updateEmployee() {
        console.log('this.employeeForm', this.employeeForm.value);
        this.isSubmitted = true;
        if (!this.employeeForm.valid) {
            this.isSubmitted = false;
            return;
        }

        if (this.isSubmitted) {
            this.employeeService.updateEmployee(this.selectedEmployeeId, this.employeeForm.value).subscribe(data => {
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
            if (this.selectedEmployeeId) {
                this.employeeId = this.selectedEmployeeId;
            } else {
                this.personalDetailsForm.value['dateOfBirth'] = this.personalDetailsForm.value['dateOfBirth'].format('YYYY-MM-DD');
                this.personalDetailsForm.value['appointedOn'] = this.personalDetailsForm.value['appointedOn'].format('YYYY-MM-DD');
                this.personalDetailsForm.value['assumedDutyOn'] = this.personalDetailsForm.value['assumedDutyOn'].format('YYYY-MM-DD');
            }
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
            if (this.selectedEmployeeId) {
                this.employeeId = this.selectedEmployeeId
            } else {
                this.jobProfileSalaryPlacementForm.value['currentAppointment'] = this.jobProfileSalaryPlacementForm.value['currentAppointment'].format('YYYY-MM-DD');
            }
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
            });
        }
    }

    saveProgression() {
        console.log('this.progressionForm', this.progressionForm.value);
        this.isSubmitted = true;
        if (!this.progressionForm.valid) {
            this.isSubmitted = false;
            return;
        }

        if (this.isSubmitted) {
            this.progressionForm.value['lastIncrement'] = this.progressionForm.value['lastIncrement'].format('YYYY-MM-DD');
            this.progressionForm.value['confirmationDueDate'] = this.progressionForm.value['confirmationDueDate'].format('YYYY-MM-DD');
            this.progressionForm.value['lastPromoted'] = this.progressionForm.value['lastPromoted'].format('YYYY-MM-DD');
            this.progressionForm.value['expectedExitDate'] = this.progressionForm.value['expectedExitDate'].format('YYYY-MM-DD');
            this.progressionForm.value['dateStarted'] = this.progressionForm.value['dateStarted'].format('YYYY-MM-DD');
            this.employeeService.addProgression(this.employeeId, this.progressionForm.value).subscribe(data => {
                this.isSubmitted = false;
            });
        }
    }

    saveIdNos() {
        console.log('this.idNosForm', this.idNosForm.value);
        this.isSubmitted = true;
        if (!this.idNosForm.valid) {
            this.isSubmitted = false;
            return;
        }

        if (this.isSubmitted) {
            this.idNosForm.value['issuedDate'] = this.idNosForm.value['issuedDate'].format('YYYY-MM-DD');
            this.idNosForm.value['expiryDate'] = this.idNosForm.value['expiryDate'].format('YYYY-MM-DD');
            this.employeeService.addIdNos(this.employeeId, this.idNosForm.value).subscribe(data => {
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
