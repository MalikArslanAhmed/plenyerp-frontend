import {Component, Inject, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {FormBuilder, FormGroup, Validators, FormControl} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {fuseAnimations} from '../../../../../../@fuse/animations';
import {ContactInfoService} from '../../../../../shared/services/contact-info.service';

@Component({
    selector: 'region-create',
    templateUrl: './region-create.component.html',
    styleUrls: ['./region-create.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class RegionCreateComponent implements OnInit {
    action: any;
    dialogTitle: any;
    regionForm: FormGroup;
    isSubmitted = false;
    salaryScales: any = [];
    updateData: any;
    countries = [];
    constructor(public matDialogRef: MatDialogRef<RegionCreateComponent>,
                @Inject(MAT_DIALOG_DATA) private _data: any,
                private fb: FormBuilder,
                private contactInfoService: ContactInfoService) {
        this.action = _data.action;
        if (this.action === 'EDIT') {
            this.dialogTitle = 'Edit Region';
            if (_data.region) {
                this.updateData = _data;
            }
        } else {
            this.dialogTitle = 'Add Region';
        }
    }

    ngOnInit(): void {
        this.refresh();
        this.getCountry();
        this.checkForUpdate();
    }

    refresh() {
        this.regionForm = this.fb.group({
            countryId: ['', Validators.required],
            name: ['', Validators.required],
            isActive: [true, Validators.required]
        });
    }

    checkForUpdate() {
        if (this.updateData) {
            this.regionForm.patchValue({
                name: this.updateData.region.name,
                countryId: this.updateData.region.country.id,
                isActive: this.updateData.region.isActive
            });
        }
    }

    saveRegion() {
        this.isSubmitted = true;
        if (!this.regionForm.valid) {
            this.isSubmitted = false;
            return;
        }

        if (this.isSubmitted) {
            this.contactInfoService.addRegion(this.regionForm.value).subscribe(data => {
                this.regionForm.reset();
                this.isSubmitted = false;
            });


        }
    }

    updateRegion() {
        this.isSubmitted = true;
        if (!this.regionForm.valid) {
            this.isSubmitted = false;
            return;
        }
        if (this.isSubmitted) {
            this.contactInfoService.updateRegion(this.updateData.region.id, this.regionForm.value).subscribe(data => {
                this.updateData = undefined;
                this.regionForm.reset();
                this.isSubmitted = false;
            });

        }
    }

    getCountry() {
        this.contactInfoService.country().subscribe(data => {
            this.countries = data.items;
        });
    }

}
