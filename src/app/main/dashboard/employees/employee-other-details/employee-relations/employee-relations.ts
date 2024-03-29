import { Component, Inject, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { fuseAnimations } from '../../../../../../@fuse/animations';
import { AppConstants } from '../../../../../shared/constants/app-constants';
import { EmployeeOtherDetailsService } from '../../../../../shared/services/employee-other-details.service';

@Component({
    selector: 'app-employee-relations',
    templateUrl: './employee-relations.html',
    styleUrls: ['./employee-relations.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})

// tslint:disable-next-line:component-class-suffix
export class EmployeeRelations implements OnInit {
    data: any;
    dialogTitle: any;
    employeeRelationsForm: FormGroup;
    countries = [];
    states = [];
    regions = [];
    lgas = [];
    relations;
    genders = AppConstants.genders;
    employeeRelationsList: any;
    employeeRelationsColumns = ['sno', 'lname', 'fname', 'relationship', 'kin', 'actions'];
    employeeRelationId = null;
    constructor(public matDialogRef: MatDialogRef<EmployeeRelations>,
        @Inject(MAT_DIALOG_DATA) private _data: any,
        private fb: FormBuilder,
        private employeeOtherDetailsService: EmployeeOtherDetailsService
    ) {
        this.data = _data;
        if (_data.title === 'RELATIONS') {
            this.dialogTitle = 'Relations';
        }

    }

    ngOnInit(): void {
        this.refresh();
        this.getRelations();
        this.getCountry();
        this.getEmployeeRelationsList();
    }

    refresh() {
        this.employeeRelationsForm = this.fb.group({
            firstName: ['', Validators.required],
            relativeId: [''],
            lastName: ['', Validators.required],
            gender: ['', Validators.required],
            nationalId: ['', Validators.required],
            dateOfBirth: ['', Validators.required],
            relationshipId: ['', Validators.required],
            isNextOfKin: ['', Validators.required],
            addressLine1: ['', Validators.required],
            addressLine2: [''],
            city: ['', Validators.required],
            zipCode: ['', Validators.required],
            countryId: ['', Validators.required],
            stateId: ['', Validators.required],
            regionId: ['', Validators.required],
            lgaId: ['', Validators.required],
            phone: ['', Validators.required],
            email: ['', Validators.required]
        });

        this.employeeRelationsForm.get('countryId').valueChanges.subscribe(val => {
            this.states = [];
            this.regions = [];
            this.lgas = [];
            this.employeeRelationsForm.get('regionId').patchValue('');
            this.employeeRelationsForm.get('stateId').patchValue('');
            this.employeeRelationsForm.get('lgaId').patchValue('');
            if (val) {
                this.getRegion(val);
            }
        });
        this.employeeRelationsForm.get('regionId').valueChanges.subscribe(val => {
            this.states = [];
            this.lgas = [];
            this.employeeRelationsForm.get('stateId').patchValue('');
            this.employeeRelationsForm.get('lgaId').patchValue('');
            if (val) {
                this.getState(val);
            }
        });
        this.employeeRelationsForm.get('stateId').valueChanges.subscribe(val => {
            this.lgas = [];
            this.employeeRelationsForm.get('lgaId').patchValue('');
            if (val) {
                this.getLga(val);
            }
        });
    }

    getRelations() {
        this.employeeOtherDetailsService.getRelations({'isActive' : 1}).subscribe(data => {
            this.relations = data.items;
        });
    }

    getCountry() {
        this.employeeOtherDetailsService.allCountry({'isActive' : 1}).subscribe(data => {
            this.countries = data.items;
        });
    }
    getRegion(countryId) {
        this.employeeOtherDetailsService.allRegion({ countryId: countryId }).subscribe(data => {
            this.regions = data.items;
        });
    }
    getState(regionId) {
        this.employeeOtherDetailsService.allState({ regionId: regionId }).subscribe(data => {
            this.states = data.items;
        });
    }
    getLga(stateId) {
        this.employeeOtherDetailsService.allLga({ stateId: stateId }).subscribe(data => {
            this.lgas = data.items;
        });
    }

    getEmployeeRelationsList() {
        this.employeeOtherDetailsService.getEmployeeRelationsList(this.data.employeeId).subscribe(data => {
            this.employeeRelationsList = data.items;
            console.log('employeeRelationsList---->', this.employeeRelationsList);
            let index = 0;
            this.employeeRelationsList.forEach(value => {
                index += 1;
                value['sno'] = index;
            });
        });
    }

    addEmployeeRelation() {
        this.employeeOtherDetailsService.addEmployeeRelation(this.data.employeeId, this.employeeRelationsForm.value).subscribe(data => {
            this.getEmployeeRelationsList();
            this.employeeRelationId = null;
            this.employeeRelationsForm.reset();
        });
    }


    editEmployeeRelation(employeeRelation: any) {
        this.employeeRelationId = employeeRelation.id;
        this.employeeRelationsForm.patchValue({
            lastName: employeeRelation.lastName,
            relativeId: employeeRelation.relativeId,
            firstName: employeeRelation.firstName,
            gender: employeeRelation.gender,
            nationalId: employeeRelation.nationalId,
            dateOfBirth: employeeRelation.dateOfBirth,
            relationshipId: employeeRelation.relationshipId,
            isNextOfKin: employeeRelation.isNextOfKin,
            addressTypeId: employeeRelation.addressTypeId,
            addressLine1: employeeRelation.addressLine1,
            addressLine2: employeeRelation.addressLine2,
            city: employeeRelation.city,
            zipCode: employeeRelation.zipCode,
            countryId: employeeRelation.country.id,
            regionId: employeeRelation.region.id,
            stateId: employeeRelation.state.id,
            lgaId: employeeRelation.lga.id,
            phone: employeeRelation.phone,
            email: employeeRelation.email,

        });
    }

    updateEmployeeRelation() {
        this.employeeOtherDetailsService.updateEmployeeRelation(this.data.employeeId, this.employeeRelationId, this.employeeRelationsForm.value).subscribe(data => {
            this.employeeRelationId = null;
            this.getEmployeeRelationsList();
            this.employeeRelationsForm.reset();
        });
    }

    deleteEmployeeRelation(id: any) {
        this.employeeOtherDetailsService.deleteEmployeeRelation(id).subscribe(data => {
            this.getEmployeeRelationsList();
        });
    }
    cancelUpdate() {
        this.employeeRelationId = null;
        this.employeeRelationsForm.reset();
    }
}
