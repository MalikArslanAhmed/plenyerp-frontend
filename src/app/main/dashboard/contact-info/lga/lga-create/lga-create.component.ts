import {Component, Inject, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {FormBuilder, FormGroup, Validators, FormControl} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {fuseAnimations} from '../../../../../../@fuse/animations';
import {ContactInfoService} from '../../../../../shared/services/contact-info.service';

@Component({
    selector: 'lga-create',
    templateUrl: './lga-create.component.html',
    styleUrls: ['./lga-create.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class LgaCreateComponent implements OnInit {
    action: any;
    dialogTitle: any;
    lgaForm: FormGroup;
    isSubmitted = false;
    salaryScales: any = [];
    updateData: any;
    countries = [];
    regions = [];
    states = [];
    constructor(public matDialogRef: MatDialogRef<LgaCreateComponent>,
                @Inject(MAT_DIALOG_DATA) private _data: any,
                private fb: FormBuilder,
                private contactInfoService: ContactInfoService) {
        this.action = _data.action;
        if (this.action === 'EDIT') {
            this.dialogTitle = 'Edit Country';
            if (_data.lga) {
                this.updateData = _data;
            }
        } else {
            this.dialogTitle = 'Add Country';
        }
    }

    ngOnInit(): void {
        this.refresh();
        this.getCountry();
        this.checkForUpdate();
    }

    refresh() {
        this.lgaForm = this.fb.group({
            countryId: ['', Validators.required],
            regionId: ['', Validators.required],
            stateId: ['', Validators.required],
            name: ['', Validators.required]
        });
        this.lgaForm.get('countryId').valueChanges.subscribe(val => {
            if (val) {
                this.getRegion(val);
            }
        });
        this.lgaForm.get('regionId').valueChanges.subscribe(val => {
            if (val) {
                this.getState(val);
            }
        });
    }

    checkForUpdate() {
        if (this.updateData) {
            this.lgaForm.patchValue({
                countryId: this.updateData.lga.state.region.country.id,
                regionId: this.updateData.lga.state.region.id,
                stateId: this.updateData.lga.state.id,
                name: this.updateData.lga.name,
            });
        }
    }

    saveLga() {
        this.isSubmitted = true;
        if (!this.lgaForm.valid) {
            this.isSubmitted = false;
            return;
        }

        if (this.isSubmitted) {
            this.contactInfoService.addLga(this.lgaForm.value).subscribe(data => {
                this.lgaForm.reset();
                this.isSubmitted = false;
            });


        }
    }

    updateLga() {
        this.isSubmitted = true;
        if (!this.lgaForm.valid) {
            this.isSubmitted = false;
            return;
        }
        if (this.isSubmitted) {
            this.contactInfoService.updateLga(this.updateData.lga.id, this.lgaForm.value).subscribe(data => {
                this.updateData = undefined;
                this.lgaForm.reset();
                this.isSubmitted = false;
            });

        }
    }

    getCountry() {
        this.contactInfoService.country().subscribe(data => {
            this.countries = data.items;
        });
    }
    getRegion(countryId) {
        this.regions = [];
        console.log(countryId);
        this.contactInfoService.region({countryId: countryId}).subscribe(data => {
            this.regions = data.items;
        });
    }
    getState(regionId) {
        this.states = [];
        console.log(regionId);
        this.contactInfoService.state({regionId: regionId}).subscribe(data => {
            this.states = data.items;
        });
    }
}
