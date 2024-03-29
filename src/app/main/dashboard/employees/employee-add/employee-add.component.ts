import {Component, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {fuseAnimations} from '../../../../../@fuse/animations';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AppConstants} from '../../../../shared/constants/app-constants';
import {DepartmentListSelectComponent} from '../../structure/department-list/department-list-select.component';
import {JobPositionsListSelectComponent} from '../job-positions-list-select/job-positions-list-select.component';
import {StructureService} from '../../../../shared/services/structure.service';
import {FuseSidebarService} from '../../../../../@fuse/components/sidebar/sidebar.service';
import {MatDialog} from '@angular/material/dialog';
import {SalaryScalesService} from '../../../../shared/services/salary-scales.service';
import {SkillService} from '../../../../shared/services/skill.service';
import {WorkLocationsListSelectComponent} from '../work-locations-list-select/work-locations-list-select.component';
import {EmployeeService} from '../../../../shared/services/employee.service';
import {ActivatedRoute, Router} from '@angular/router';
import {MatStepper} from '@angular/material/stepper';
import {AlertService} from "../../../../shared/services/alert.service";
import {CompaniesService} from "../../../../shared/services/companies.service";

@Component({
    selector: 'app-employee-add',
    templateUrl: './employee-add.component.html',
    styleUrls: ['./employee-add.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class EmployeeAddComponent implements OnInit {
    @ViewChild('stepper') private employeeStepper: MatStepper;
    employeeForm: FormGroup;
    personalDetailsForm: FormGroup;
    jobProfileSalaryPlacementForm: FormGroup;
    citizenshipContactDetailsForm: FormGroup;
    progressionForm: FormGroup;
    idNosForm: FormGroup;
    genders = AppConstants.genders;
    maritalStatuses;
    religions;
    typeOfAppointments;
    countryCodes;
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
    pensionCheck: boolean;
    jobProfileSalaryPlacementDisable = false;
    companies = [];

    constructor(private structureService: StructureService,
                private _fuseSidebarService: FuseSidebarService,
                private _matDialog: MatDialog,
                private salaryScalesService: SalaryScalesService,
                private skillService: SkillService,
                private fb: FormBuilder,
                private employeeService: EmployeeService,
                private router: Router,
                private activatedRoute: ActivatedRoute,
                private alertService: AlertService,
                private companiesService: CompaniesService) {
    }

    ngOnInit(): void {
        this.refresh();
        this.getDesignations();
        this.getSalaryScales();
        this.getCountries();
        this.getCountriesOther();
        this.getEmployeeId();
        this.getAppointmentsType();
        this.getCountryCode();
        this.getReligions();
        this.getMaritialStatus();
        this.getCompaniesForPfa();
    }

    pensionChecked(data) {
        (!data) ? this.progressionForm.controls['dateStarted'].disable() : this.progressionForm.controls['dateStarted'].enable();
        (!data) ? this.progressionForm.controls['gratuity'].disable() : this.progressionForm.controls['gratuity'].enable();
        (!data) ? this.progressionForm.controls['monthlyPension'].disable() : this.progressionForm.controls['monthlyPension'].enable();
        (!data) ? this.progressionForm.controls['otherPension'].disable() : this.progressionForm.controls['otherPension'].enable();
        // if(!data){
        //     this.progressionForm.controls['gratuity'].disable();
        // }else{
        //     this.progressionForm.controls['gratuity'].enable();
        // }
    }

    getAppointmentsType() {
        this.employeeService.getAppointmentsType().subscribe((data) => {
            this.typeOfAppointments = data.items;
        });
    }

    getCompaniesForPfa() {
        this.companies = [];
        const params = {
            'isActive': 1,
            'isPfa': 1
        };
        this.companiesService.getCompaniesList(params).subscribe(data => {
            this.companies = data.items;
            /*this.pagination.page = data.page;
            this.pagination.total = data.total;
            if (this.companiesList && this.companiesList.length > 0) {
                let i = 1;
                this.companiesList.forEach(company => {
                    company['sno'] = i;
                    i++;
                });
            }*/
        });
    }

    getCountryCode() {
        this.employeeService.getCountryCode().subscribe((data) => {
            this.countryCodes = data.items;
            // console.log('country codes ----->', this.countryCodes);
        });
    }

    getReligions() {
        this.employeeService.getReligions().subscribe((data) => {
            this.religions = data.items;
        });
    }

    getMaritialStatus() {
        this.employeeService.getMaritialStatus().subscribe((data) => {
            this.maritalStatuses = data.items;
        });
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
            countryCode: ['', Validators.required],
            phone: ['', Validators.required],
            email: ['', Validators.required],
            appointedOn: ['', Validators.required],
            assumedDutyOn: ['', Validators.required],
            typeOfAppointment: ['TENURED', Validators.required],
            isPermanentStaff: [false]
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
            addressLine2: [''],
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
            dateStarted: [{value: '', disabled: true}],
            gratuity: [{value: '', disabled: true}],
            monthlyPension: [{value: '', disabled: true}],
            otherPension: [{value: '', disabled: true}]
        });

        this.idNosForm = this.fb.group({
            nhfNumber: [''],
            tinNumber: [''],
            nationalIdNumber: [''],
            driverLicenseNumber: [''],
            bankVersionNumber: [''],
            pensionFundAdministration: [''],
            pfaNumber: [''],
            payrollPin: [''],
            passportNumber: [''],
            issuedAt: [''],
            issuedDate: [''],
            workPermitNumber: [''],
            expiryDate: [''],
            isForeignEmployee: [true, Validators.required]
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
            if (this.selectedEmployeeId && this.selectedEmployee) {
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
            'dateOfBirth': this.selectedEmployee && this.selectedEmployee.employeePersonalDetails && this.selectedEmployee.employeePersonalDetails.dateOfBirth ? this.selectedEmployee && this.selectedEmployee.employeePersonalDetails.dateOfBirth : '',
            'maritalStatus': this.selectedEmployee && this.selectedEmployee.employeePersonalDetails && this.selectedEmployee.employeePersonalDetails.maritalStatus ? this.selectedEmployee && this.selectedEmployee.employeePersonalDetails.maritalStatus : '',
            'gender': this.selectedEmployee && this.selectedEmployee.employeePersonalDetails && this.selectedEmployee.employeePersonalDetails.gender ? this.selectedEmployee && this.selectedEmployee.employeePersonalDetails.gender : '',
            'religion': this.selectedEmployee && this.selectedEmployee.employeePersonalDetails && this.selectedEmployee.employeePersonalDetails.religion ? this.selectedEmployee && this.selectedEmployee.employeePersonalDetails.religion : '',
            'countryCode': this.selectedEmployee && this.selectedEmployee.employeePersonalDetails && this.selectedEmployee.employeePersonalDetails.countryCode ? this.selectedEmployee && this.selectedEmployee.employeePersonalDetails.countryCode : '',
            'phone': this.selectedEmployee && this.selectedEmployee.employeePersonalDetails && this.selectedEmployee.employeePersonalDetails.phone ? this.selectedEmployee && this.selectedEmployee.employeePersonalDetails.phone : '',
            'email': this.selectedEmployee && this.selectedEmployee.employeePersonalDetails && this.selectedEmployee.employeePersonalDetails.email ? this.selectedEmployee && this.selectedEmployee.employeePersonalDetails.email : '',
            'appointedOn': this.selectedEmployee && this.selectedEmployee.employeePersonalDetails && this.selectedEmployee.employeePersonalDetails.appointedOn ? this.selectedEmployee && this.selectedEmployee.employeePersonalDetails.appointedOn : '',
            'assumedDutyOn': this.selectedEmployee && this.selectedEmployee.employeePersonalDetails && this.selectedEmployee.employeePersonalDetails.assumedDutyOn ? this.selectedEmployee && this.selectedEmployee.employeePersonalDetails.assumedDutyOn : '',
            'typeOfAppointment': this.selectedEmployee && this.selectedEmployee.employeePersonalDetails && this.selectedEmployee.employeePersonalDetails.typeOfAppointment ? this.selectedEmployee && this.selectedEmployee.employeePersonalDetails.typeOfAppointment : '',
            'isPermanentStaff': this.selectedEmployee && this.selectedEmployee.employeePersonalDetails && this.selectedEmployee.employeePersonalDetails.isPermanentStaff ? this.selectedEmployee && this.selectedEmployee.employeePersonalDetails.isPermanentStaff : false
        });
    }

    patchJobProfileSalaryPlacementForm() {
        this.jobPositions = [{
            'name': this.selectedEmployee.employeeJobProfiles && this.selectedEmployee.employeeJobProfiles.jobPosition.name ? this.selectedEmployee.employeeJobProfiles.jobPosition.name : '',
            'id': this.selectedEmployee.employeeJobProfiles && this.selectedEmployee.employeeJobProfiles.jobPositionId ? this.selectedEmployee.employeeJobProfiles.jobPositionId : '',
        }];

        this.departments = [{
            'name': this.selectedEmployee.employeeJobProfiles && this.selectedEmployee.employeeJobProfiles.department.name ? this.selectedEmployee.employeeJobProfiles.department.name : '',
            'id': this.selectedEmployee.employeeJobProfiles && this.selectedEmployee.employeeJobProfiles.departmentId ? this.selectedEmployee.employeeJobProfiles.departmentId : '',
        }];

        this.workLocations = [{
            'name': this.selectedEmployee.employeeJobProfiles && this.selectedEmployee.employeeJobProfiles.workLocation.name ? this.selectedEmployee.employeeJobProfiles.workLocation.name : '',
            'id': this.selectedEmployee.employeeJobProfiles && this.selectedEmployee.employeeJobProfiles.workLocationId ? this.selectedEmployee.employeeJobProfiles.workLocationId : '',
        }];

        this.salaryScales = [{
            'name': this.selectedEmployee.employeeJobProfiles && this.selectedEmployee.employeeJobProfiles.empSalaryScale.name ? this.selectedEmployee.employeeJobProfiles.empSalaryScale.name : '',
            'id': this.selectedEmployee.employeeJobProfiles && this.selectedEmployee.employeeJobProfiles.salaryScaleId ? this.selectedEmployee.employeeJobProfiles.salaryScaleId : '',
        }];

        this.gradeLevels = [{
            'name': this.selectedEmployee.employeeJobProfiles && this.selectedEmployee.employeeJobProfiles.empGradeLevel.name ? this.selectedEmployee.employeeJobProfiles.empGradeLevel.name : '',
            'id': this.selectedEmployee.employeeJobProfiles && this.selectedEmployee.employeeJobProfiles.gradeLevelId ? this.selectedEmployee.employeeJobProfiles.gradeLevelId : '',
        }];

        this.gradeLevelSteps = [{
            'name': this.selectedEmployee.employeeJobProfiles && this.selectedEmployee.employeeJobProfiles.empGradeLevelStep.name ? this.selectedEmployee.employeeJobProfiles.empGradeLevelStep.name : '',
            'id': this.selectedEmployee.employeeJobProfiles && this.selectedEmployee.employeeJobProfiles.gradeLevelStepId ? this.selectedEmployee.employeeJobProfiles.gradeLevelStepId : '',
        }];

        // this.salaryScaleChange(this.selectedEmployee.employeeJobProfiles.salaryScaleId, 'edit');

        this.jobProfileSalaryPlacementForm.patchValue({
            'currentAppointment': this.selectedEmployee.employeeJobProfiles && this.selectedEmployee.employeeJobProfiles.currentAppointment ? this.selectedEmployee.employeeJobProfiles.currentAppointment : '',
            'jobPositionId': this.selectedEmployee.employeeJobProfiles && this.selectedEmployee.employeeJobProfiles.jobPositionId ? this.selectedEmployee.employeeJobProfiles.jobPositionId : '',
            'departmentId': this.selectedEmployee.employeeJobProfiles && this.selectedEmployee.employeeJobProfiles.departmentId ? this.selectedEmployee.employeeJobProfiles.departmentId : '',
            'workLocationId': this.selectedEmployee.employeeJobProfiles && this.selectedEmployee.employeeJobProfiles.workLocationId ? this.selectedEmployee.employeeJobProfiles.workLocationId : '',
            'designationId': this.selectedEmployee.employeeJobProfiles && this.selectedEmployee.employeeJobProfiles.designationId ? this.selectedEmployee.employeeJobProfiles.designationId : '',
            'salaryScaleId': this.selectedEmployee.employeeJobProfiles && this.selectedEmployee.employeeJobProfiles.salaryScaleId ? this.selectedEmployee.employeeJobProfiles.salaryScaleId : '',
            'gradeLevelId': this.selectedEmployee.employeeJobProfiles && this.selectedEmployee.employeeJobProfiles.gradeLevelId ? this.selectedEmployee.employeeJobProfiles.gradeLevelId : '',
            'gradeLevelStepId': this.selectedEmployee.employeeJobProfiles && this.selectedEmployee.employeeJobProfiles.gradeLevelStepId ? this.selectedEmployee.employeeJobProfiles.gradeLevelStepId : ''
        });
        if ((this.jobProfileSalaryPlacementForm.value['currentAppointment'] && this.jobProfileSalaryPlacementForm.value['currentAppointment'] !== '') &&
            (this.jobProfileSalaryPlacementForm.value['jobPositionId'] && this.jobProfileSalaryPlacementForm.value['jobPositionId'] !== '') &&
            (this.jobProfileSalaryPlacementForm.value['departmentId'] && this.jobProfileSalaryPlacementForm.value['departmentId'] !== '')) {
            this.jobProfileSalaryPlacementForm.get('currentAppointment').disable();
            this.jobProfileSalaryPlacementForm.get('jobPositionId').disable();
            this.jobProfileSalaryPlacementForm.get('departmentId').disable();
            this.jobProfileSalaryPlacementForm.get('workLocationId').disable();
            this.jobProfileSalaryPlacementForm.get('designationId').disable();
            this.jobProfileSalaryPlacementForm.get('salaryScaleId').disable();
            this.jobProfileSalaryPlacementForm.get('gradeLevelId').disable();
            this.jobProfileSalaryPlacementForm.get('gradeLevelStepId').disable();
            this.jobProfileSalaryPlacementDisable = true;
        }
        // console.log('this.jobProfileSalaryPlacementForm', this.jobProfileSalaryPlacementForm.value);
    }

    patchCitizenshipContactDetailsForm() {
        if (this.selectedEmployee.employeeContactDetails && this.selectedEmployee.employeeContactDetails.countryId) {
            this.chooseRegion(this.selectedEmployee.employeeContactDetails.countryId);
        }

        if (this.selectedEmployee.employeeContactDetails && this.selectedEmployee.employeeContactDetails.regionId) {
            this.chooseState(this.selectedEmployee.employeeContactDetails.regionId);
        }

        if (this.selectedEmployee.employeeContactDetails && this.selectedEmployee.employeeContactDetails.stateId) {
            this.chooseLga(this.selectedEmployee.employeeContactDetails.stateId);
        }

        if (this.selectedEmployee.employeeContactDetails && this.selectedEmployee.employeeContactDetails.otherCountryId) {
            this.chooseRegionOther(this.selectedEmployee.employeeContactDetails.otherCountryId);
        }

        if (this.selectedEmployee.employeeContactDetails && this.selectedEmployee.employeeContactDetails.otherRegionId) {
            this.chooseStateOther(this.selectedEmployee.employeeContactDetails.otherRegionId);
        }

        if (this.selectedEmployee.employeeContactDetails && this.selectedEmployee.employeeContactDetails.otherStateId) {
            this.chooseLgaOther(this.selectedEmployee.employeeContactDetails.otherStateId);
        }

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
        this.pensionChecked(this.selectedEmployee.employeePensions && this.selectedEmployee.employeePensions.isPensionStarted);

        this.progressionForm.patchValue({
            'lastIncrement': this.selectedEmployee.employeeProgressions && this.selectedEmployee.employeeProgressions.lastIncrement ? this.selectedEmployee.employeeProgressions && this.selectedEmployee.employeeProgressions.lastIncrement : '',
            'nextIncrement': this.selectedEmployee.employeeProgressions && this.selectedEmployee.employeeProgressions.nextIncrement ? this.selectedEmployee.employeeProgressions && this.selectedEmployee.employeeProgressions.nextIncrement : '',
            'confirmationDueDate': this.selectedEmployee.employeeProgressions && this.selectedEmployee.employeeProgressions.confirmationDueDate ? this.selectedEmployee.employeeProgressions && this.selectedEmployee.employeeProgressions.confirmationDueDate : '',
            'isConfirmed': this.selectedEmployee.employeeProgressions && this.selectedEmployee.employeeProgressions.isConfirmed ? this.selectedEmployee.employeeProgressions && this.selectedEmployee.employeeProgressions.isConfirmed : '',
            'lastPromoted': this.selectedEmployee.employeeProgressions && this.selectedEmployee.employeeProgressions.lastPromoted ? this.selectedEmployee.employeeProgressions && this.selectedEmployee.employeeProgressions.lastPromoted : '',
            'nextPromotion': this.selectedEmployee.employeeProgressions && this.selectedEmployee.employeeProgressions.nextPromotion ? this.selectedEmployee.employeeProgressions && this.selectedEmployee.employeeProgressions.nextPromotion : '',
            'expectedExitDate': this.selectedEmployee.employeeProgressions && this.selectedEmployee.employeeProgressions.expectedExitDate ? this.selectedEmployee.employeeProgressions && this.selectedEmployee.employeeProgressions.expectedExitDate : '',
            'isExited': this.selectedEmployee.employeeProgressions && this.selectedEmployee.employeeProgressions.isExited ? this.selectedEmployee.employeeProgressions && this.selectedEmployee.employeeProgressions.isExited : '',
            'isPensionStarted': this.selectedEmployee.employeePensions && this.selectedEmployee.employeePensions.isPensionStarted ? this.selectedEmployee.employeePensions && this.selectedEmployee.employeePensions.isPensionStarted : '',
            'dateStarted': this.selectedEmployee.employeePensions && this.selectedEmployee.employeePensions.dateStarted ? this.selectedEmployee.employeePensions && this.selectedEmployee.employeePensions.dateStarted : '',
            'gratuity': this.selectedEmployee.employeePensions && this.selectedEmployee.employeePensions.gratuity ? this.selectedEmployee.employeePensions && this.selectedEmployee.employeePensions.gratuity : '',
            'monthlyPension': this.selectedEmployee.employeePensions && this.selectedEmployee.employeePensions.monthlyPension ? this.selectedEmployee.employeePensions && this.selectedEmployee.employeePensions.monthlyPension : '',
            'otherPension': this.selectedEmployee.employeePensions && this.selectedEmployee.employeePensions.otherPension ? this.selectedEmployee.employeePensions && this.selectedEmployee.employeePensions.otherPension : '',
        });
    }

    patchIdNosForm() {
        // console.log("12334",this.selectedEmployee);
        this.idNosForm.patchValue({
            'nhfNumber': this.selectedEmployee.employeeIdNos && this.selectedEmployee.employeeIdNos.nhfNumber ? this.selectedEmployee.employeeIdNos && this.selectedEmployee.employeeIdNos.nhfNumber : '',
            'tinNumber': this.selectedEmployee.employeeIdNos && this.selectedEmployee.employeeIdNos.tinNumber ? this.selectedEmployee.employeeIdNos && this.selectedEmployee.employeeIdNos.tinNumber : '',
            'nationalIdNumber': this.selectedEmployee.employeeIdNos && this.selectedEmployee.employeeIdNos.nationalIdNumber ? this.selectedEmployee.employeeIdNos && this.selectedEmployee.employeeIdNos.nationalIdNumber : '',
            'driverLicenseNumber': this.selectedEmployee.employeeIdNos && this.selectedEmployee.employeeIdNos.driverLicenseNumber ? this.selectedEmployee.employeeIdNos && this.selectedEmployee.employeeIdNos.driverLicenseNumber : '',
            'bankVersionNumber': this.selectedEmployee.employeeIdNos && this.selectedEmployee.employeeIdNos.bankVersionNumber ? this.selectedEmployee.employeeIdNos && this.selectedEmployee.employeeIdNos.bankVersionNumber : '',
            'pensionFundAdministration': this.selectedEmployee.employeeIdNos && this.selectedEmployee.employeeIdNos.pensionFundAdministration ? this.selectedEmployee.employeeIdNos && this.selectedEmployee.employeeIdNos.pensionFundAdministration : '',
            'pfaNumber': this.selectedEmployee.employeeIdNos && this.selectedEmployee.employeeIdNos.pfaNumber ? this.selectedEmployee.employeeIdNos && this.selectedEmployee.employeeIdNos.pfaNumber : '',
            'payrollPin': this.selectedEmployee.employeeIdNos && this.selectedEmployee.employeeIdNos.payrollPin ? this.selectedEmployee.employeeIdNos && this.selectedEmployee.employeeIdNos.payrollPin : '',
            'passportNumber': this.selectedEmployee.employeeInternationalPassports && this.selectedEmployee.employeeInternationalPassports.passportNumber ? this.selectedEmployee.employeeInternationalPassports && this.selectedEmployee.employeeInternationalPassports.passportNumber : '',
            'issuedAt': this.selectedEmployee.employeeInternationalPassports && this.selectedEmployee.employeeInternationalPassports.issuedAt ? this.selectedEmployee.employeeInternationalPassports && this.selectedEmployee.employeeInternationalPassports.issuedAt : '',
            'issuedDate': this.selectedEmployee.employeeInternationalPassports && this.selectedEmployee.employeeInternationalPassports.issuedDate ? this.selectedEmployee.employeeInternationalPassports && this.selectedEmployee.employeeInternationalPassports.issuedDate : '',
            'workPermitNumber': this.selectedEmployee.employeeInternationalPassports && this.selectedEmployee.employeeInternationalPassports.workPermitNumber ? this.selectedEmployee.employeeInternationalPassports && this.selectedEmployee.employeeInternationalPassports.workPermitNumber : '',
            'expiryDate': this.selectedEmployee.employeeInternationalPassports && this.selectedEmployee.employeeInternationalPassports.expiryDate ? this.selectedEmployee.employeeInternationalPassports && this.selectedEmployee.employeeInternationalPassports.expiryDate : '',
            // 'isForeignEmployee': this.selectedEmployee.employeeIdNos.isForeignEmployee
            'isForeignEmployee': this.selectedEmployee.employeeIdNos && this.selectedEmployee.employeeIdNos.isForeignEmployee ? this.selectedEmployee.employeeIdNos && this.selectedEmployee.employeeIdNos.isForeignEmployee : false,
        });
    }

    getCountries() {
        this.structureService.getCountries({'page': -1, 'isActive': 1, orderby: 'name'}).subscribe(data => {
            this.countries = data.items;
        });
    }

    getCountriesOther() {
        this.structureService.getCountries({'page': -1, 'isActive': 1, orderby: 'name'}).subscribe(data => {
            this.countriesOther = data.items;
        });
    }

    jobPositionListSelect() {
        this.dialogRef = this._matDialog.open(JobPositionsListSelectComponent, {
            panelClass: 'contact-form-dialog',
        });
        this.dialogRef.afterClosed().subscribe((response) => {
            /*console.log('response job---->', response);
            console.log('salary scale---->', this.salaryScales);
            console.log('gradelevels---->', this.gradeLevels);*/
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

                // console.log('let salary scale---->', salaryScales);

                // this.salaryScales = [{
                //     'id': salaryScales.id,
                //     'name': salaryScales.name
                // }];
                // console.log('new salary scale---->', this.salaryScales);
                this.jobProfileSalaryPlacementForm.patchValue({
                    'salaryScaleId': salaryScales.id
                });
                if (salaryScales) {
                    if (salaryScales['gradeLevels'] && salaryScales['gradeLevels'].length > 0) {
                        // console.log('salaryScales', salaryScales);
                        this.gradeLevels = salaryScales['gradeLevels'];
                        let gradeLevels = salaryScales['gradeLevels'].find(function (gradeLevel) {
                            return (gradeLevel.id === response.gradeLevelId);
                        });

                        // console.log('this gradelevels---->', this.gradeLevels);
                        // console.log('let gradelevels---->', gradeLevels);
                        // this.gradeLevels = [{
                        //     'id': gradeLevels.id,
                        //     'name': gradeLevels.name
                        // }];
                        this.jobProfileSalaryPlacementForm.patchValue({
                            'gradeLevelId': gradeLevels.id
                        });

                        if (gradeLevels && gradeLevels['gradeLevelSteps'].length > 0) {
                            this.gradeLevelSteps = gradeLevels['gradeLevelSteps'];
                            let gradeLevelSteps = gradeLevels['gradeLevelSteps'].find(function (gradeLevelStep) {
                                return (gradeLevelStep.id === response.gradeLevelStepId);
                            });

                            // console.log('this gradelevelsteps---->', this.gradeLevelSteps);
                            // console.log('let gradelevelsteps---->', gradeLevelSteps);

                            // this.gradeLevelSteps = [{
                            //     'id': gradeLevelSteps.id,
                            //     'name': gradeLevelSteps.name
                            // }];
                            this.jobProfileSalaryPlacementForm.patchValue({
                                'gradeLevelStepId': gradeLevelSteps.id
                            });
                        }
                    }
                }
            }
        });
    }

    salaryScaleChange(data, action?) {
        let salaryScales = this.salaryScales.find(function (salaryScale) {
            return (salaryScale.id === data);
        });
        this.gradeLevels = salaryScales && salaryScales['gradeLevels'] ? salaryScales['gradeLevels'] : [];

        if (!action) {
            this.gradeScaleChange();
        }
    }

    gradeScaleChange(data?) {
        if (data) {
            let gradeScales = this.gradeLevels.find(function (gradeLevel) {
                return (gradeLevel.id === data);
            });
            this.gradeLevelSteps = gradeScales && gradeScales['gradeLevelSteps'] ? gradeScales['gradeLevelSteps'] : [];
        } else {
            this.gradeLevelSteps = [];
        }

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
        this.structureService.getDesignations({'page': -1, 'isActive': 1, orderby: 'name'}).subscribe(data => {
            this.designations = data.items;
        });
    }

    getSalaryScales() {
        this.salaryScalesService.getSalaryScales({'page': -1, 'isActive': 1, orderby: 'name'}).subscribe(data => {
            this.salaryScales = data;
        });
    }

    saveEmployee() {
        // console.log('this.employeeForm', this.employeeForm.value);
        this.isSubmitted = true;
        if (!this.employeeForm.valid) {
            this.isSubmitted = false;
            return;
        }

        if (this.isSubmitted) {
            this.employeeService.addEmployee(this.employeeForm.value).subscribe(data => {
                this.employeeId = data.id;
                this.isSubmitted = false;
                this.goForward();
            });
        }
    }

    updateEmployee() {
        this.isSubmitted = true;
        if (!this.employeeForm.valid) {
            this.isSubmitted = false;
            return;
        }

        if (this.isSubmitted) {
            this.employeeService.updateEmployee(this.selectedEmployeeId, this.employeeForm.value).subscribe(data => {
                this.employeeId = data.id;
                this.isSubmitted = false;
                this.goForward();
            });
        }
    }

    savePersonalDetail() {
        // console.log('this.personalDetailsForm', this.personalDetailsForm.value);
        this.isSubmitted = true;
        if (!this.personalDetailsForm.valid) {
            this.isSubmitted = false;
            return;
        }

        if (this.isSubmitted) {
            if (this.selectedEmployeeId) {
                this.employeeId = this.selectedEmployeeId;
            }
            let params = {
                ...this.personalDetailsForm.value
            };
            params['dateOfBirth'] = this.personalDetailsForm.value['dateOfBirth'] && typeof this.personalDetailsForm.value['dateOfBirth'] === 'object' ? this.personalDetailsForm.value['dateOfBirth'].format('YYYY-MM-DD') : this.personalDetailsForm.value['dateOfBirth'];
            params['appointedOn'] = this.personalDetailsForm.value['appointedOn'] && typeof this.personalDetailsForm.value['appointedOn'] === 'object' ? this.personalDetailsForm.value['appointedOn'].format('YYYY-MM-DD') : this.personalDetailsForm.value['appointedOn'];
            params['assumedDutyOn'] = this.personalDetailsForm.value['assumedDutyOn'] && typeof this.personalDetailsForm.value['assumedDutyOn'] === 'object' ? this.personalDetailsForm.value['assumedDutyOn'].format('YYYY-MM-DD') : this.personalDetailsForm.value['assumedDutyOn'];
            this.employeeService.addPersonalDetails(this.employeeId, params).subscribe(data => {
                this.isSubmitted = false;
                this.goForward();
            });
        }
    }


    saveJobProfile() {
        // console.log('this.jobProfileSalaryPlacementForm', this.jobProfileSalaryPlacementForm.value);
        this.isSubmitted = true;
        if (!this.jobProfileSalaryPlacementForm.valid) {
            this.isSubmitted = false;
            return;
        }

        if (this.isSubmitted) {
            if (this.selectedEmployeeId) {
                this.employeeId = this.selectedEmployeeId;
            }
            let params = {
                ...this.jobProfileSalaryPlacementForm.value
            };
            params['currentAppointment'] = (this.jobProfileSalaryPlacementForm.value['currentAppointment'] && typeof this.jobProfileSalaryPlacementForm.value['currentAppointment'] === 'object') ? this.jobProfileSalaryPlacementForm.value['currentAppointment'].format('YYYY-MM-DD') : this.jobProfileSalaryPlacementForm.value['currentAppointment'];
            // console.log('params', params);
            this.employeeService.addJobProfile(this.employeeId, params).subscribe(data => {
                this.isSubmitted = false;
                this.goForward();
            });
        }
    }

    saveContactDetails() {
        // console.log('this.citizenshipContactDetailsForm', this.citizenshipContactDetailsForm.value);
        this.isSubmitted = true;
        if (!this.citizenshipContactDetailsForm.valid) {
            this.isSubmitted = false;
            return;
        }

        if (this.isSubmitted) {
            if (this.selectedEmployeeId) {
                this.employeeId = this.selectedEmployeeId;
            }
            let params = {
                ...this.citizenshipContactDetailsForm.value
            };
            this.employeeService.addContactDetails(this.employeeId, params).subscribe(data => {
                this.isSubmitted = false;
                this.goForward();
            });
        }
    }

    saveProgression() {
        this.isSubmitted = true;
        if (!this.progressionForm.valid) {
            this.isSubmitted = false;
            return;
        }

        if (this.isSubmitted) {
            if (this.selectedEmployeeId) {
                this.employeeId = this.selectedEmployeeId;
            }
            let params = {
                ...this.progressionForm.value
            };
            params['lastIncrement'] = (this.progressionForm.value['lastIncrement'] && typeof this.progressionForm.value['lastIncrement'] === 'object') ? this.progressionForm.value['lastIncrement'].format('YYYY-MM-DD') : this.progressionForm.value['lastIncrement'];
            params['confirmationDueDate'] = (this.progressionForm.value['confirmationDueDate'] && typeof this.progressionForm.value['confirmationDueDate'] === 'object') ? this.progressionForm.value['confirmationDueDate'].format('YYYY-MM-DD') : this.progressionForm.value['confirmationDueDate'];
            params['lastPromoted'] = (this.progressionForm.value['lastPromoted'] && typeof this.progressionForm.value['lastPromoted'] === 'object') ? this.progressionForm.value['lastPromoted'].format('YYYY-MM-DD') : this.progressionForm.value['lastPromoted'];
            params['expectedExitDate'] = (this.progressionForm.value['expectedExitDate'] && typeof this.progressionForm.value['expectedExitDate'] === 'object') ? this.progressionForm.value['expectedExitDate'].format('YYYY-MM-DD') : this.progressionForm.value['expectedExitDate'];
            this.employeeService.addProgression(this.employeeId, params).subscribe(data => {
                this.isSubmitted = false;
                this.goForward();
            });
        }
    }

    saveIdNos() {
        // console.log('this.idNosForm', this.idNosForm.value);
        if (this.idNosForm.value && this.idNosForm.value['isForeignEmployee']) {
            if (!this.idNosForm.value['passportNumber'] || this.idNosForm.value['passportNumber'] === '') {
                this.alertService.showErrors('Passport Number can\'t be blank');
                return;
            } else if (!this.idNosForm.value['issuedAt'] || this.idNosForm.value['issuedAt'] === '') {
                this.alertService.showErrors('Issued at can\'t be blank');
                return;
            } else if (!this.idNosForm.value['issuedDate'] || this.idNosForm.value['issuedDate'] === '') {
                this.alertService.showErrors('Issued Date can\'t be blank');
                return;
            } else if (!this.idNosForm.value['expiryDate'] || this.idNosForm.value['expiryDate'] === '') {
                this.alertService.showErrors('Expiry Date can\'t be blank');
                return;
            } else if (!this.idNosForm.value['workPermitNumber'] || this.idNosForm.value['workPermitNumber'] === '') {
                this.alertService.showErrors('Work permit number can\'t be blank');
                return;
            }
        }
        this.isSubmitted = true;
        if (!this.idNosForm.valid) {
            this.isSubmitted = false;
            return;
        }

        if (this.isSubmitted) {
            if (this.selectedEmployeeId) {
                this.employeeId = this.selectedEmployeeId;
            }
            let params = {
                ...this.idNosForm.value
            };
            params['issuedDate'] = this.idNosForm.value['issuedDate'] && typeof this.idNosForm.value['issuedDate'] === 'object' ? this.idNosForm.value['issuedDate'].format('YYYY-MM-DD') : this.idNosForm.value['issuedDate'];
            params['expiryDate'] = this.idNosForm.value['expiryDate'] && typeof this.idNosForm.value['expiryDate'] === 'object' ? this.idNosForm.value['expiryDate'].format('YYYY-MM-DD') : this.idNosForm.value['expiryDate'];
            this.employeeService.addIdNos(this.employeeId, params).subscribe(data => {
                this.isSubmitted = false;
                this.router.navigateByUrl(`/dashboard/employees`);
            });
        }
    }

    chooseRegion(event) {
        this.structureService.getRegions({
            'page': -1,
            'countryId': event,
            'isActive': 1,
            orderby: 'name'
        }).subscribe(data => {
            this.regions = data.items;
        });
        this.citizenshipContactDetailsForm.controls['regionId'].reset();
        this.citizenshipContactDetailsForm.controls['stateId'].reset();
        this.citizenshipContactDetailsForm.controls['lgaId'].reset();
        this.states = [];
        this.lgas = [];
    }

    chooseState(event) {
        this.structureService.getStates({
            'page': -1,
            'regionId': event,
            'isActive': 1,
            orderby: 'name'
        }).subscribe(data => {
            this.states = data.items;
        });
    }

    chooseLga(event) {
        this.structureService.getLga({
            'page': -1,
            'stateId': event,
            'isActive': 1,
            orderby: 'name'
        }).subscribe(data => {
            this.lgas = data.items;
        });
    }

    chooseRegionOther(event) {
        this.structureService.getRegions({
            'page': -1,
            'countryId': event,
            'isActive': 1,
            orderby: 'name'
        }).subscribe(data => {
            this.regionsOther = data.items;
        });
        this.citizenshipContactDetailsForm.controls['otherRegionId'].reset();
        this.citizenshipContactDetailsForm.controls['otherStateId'].reset();
        this.citizenshipContactDetailsForm.controls['otherLgaId'].reset();
        this.statesOther = [];
        this.lgasOthers = [];
    }

    chooseStateOther(event) {
        this.structureService.getStates({
            'page': -1,
            'regionId': event,
            'isActive': 1,
            orderby: 'name'
        }).subscribe(data => {
            this.statesOther = data.items;
        });
    }

    chooseLgaOther(event) {
        // console.log('event', event);
        this.structureService.getLga({
            'page': -1,
            'stateId': event,
            'isActive': 1,
            orderby: 'name'
        }).subscribe(data => {
            this.lgasOthers = data.items;
            // console.log('this.lgasOthers', this.lgasOthers);
        });
    }


    goBack() {
        this.employeeStepper.previous();
    }

    goForward() {
        this.employeeStepper.next();
    }

    onToggle(event) {
        // console.log(event.checked);
        if (event.checked == true) {
            this.idNosForm.controls['passportNumber'].setValidators([Validators.required]);
            this.idNosForm.get('passportNumber').updateValueAndValidity();

            this.idNosForm.controls['issuedAt'].setValidators([Validators.required]);
            this.idNosForm.get('issuedAt').updateValueAndValidity();

            this.idNosForm.controls['workPermitNumber'].setValidators([Validators.required]);
            this.idNosForm.get('workPermitNumber').updateValueAndValidity();
        } else {
            this.idNosForm.get('passportNumber').clearValidators();
            this.idNosForm.get('passportNumber').updateValueAndValidity();

            this.idNosForm.get('issuedAt').clearValidators();
            this.idNosForm.get('issuedAt').updateValueAndValidity();

            this.idNosForm.get('workPermitNumber').clearValidators();
            this.idNosForm.get('workPermitNumber').updateValueAndValidity();
        }
    }

    setPFA(event) {
        if (this.companies && this.companies.length > 0) {
            let pfa = '';
            this.companies.forEach(company => {
                if (parseInt(company.id) === parseInt(event.value)) {
                    pfa = company.name;
                }
            });
            this.idNosForm.patchValue({
                'pensionFundAdministration': pfa
            });
        }
    }
}
