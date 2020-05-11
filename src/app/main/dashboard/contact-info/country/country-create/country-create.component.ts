import {Component, Inject, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {FormBuilder, FormGroup, Validators, FormControl} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {fuseAnimations} from '../../../../../../@fuse/animations';
import {ContactInfoService} from '../../../../../shared/services/contact-info.service';

@Component({
    selector: 'salary-country-create',
    templateUrl: './country-create.component.html',
    styleUrls: ['./country-create.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class CountryCreateComponent implements OnInit {
    action: any;
    dialogTitle: any;
    countryForm: FormGroup;
    isSubmitted = false;
    salaryScales: any = [];
    updateData: any;   
    constructor(public matDialogRef: MatDialogRef<CountryCreateComponent>,
                @Inject(MAT_DIALOG_DATA) private _data: any,
                private fb: FormBuilder,
                private contactInfoService: ContactInfoService) {
        this.action = _data.action;
        if (this.action === 'EDIT') {
            this.dialogTitle = 'Edit Country';
            if (_data.country) {
                this.updateData = _data;
            }
        } else {
            this.dialogTitle = 'Add Country';
        }
    }

    ngOnInit(): void {
        this.refresh();
        this.checkForUpdate();
    }

    refresh() {
        this.countryForm = this.fb.group({
            name: ['', Validators.required]
        });
    }

    checkForUpdate() {
        if (this.updateData) {
            this.countryForm.patchValue({
                name: this.updateData.country.name,
            });
        }
    }

    saveCountry() {
        this.isSubmitted = true;
        if (!this.countryForm.valid) {
            this.isSubmitted = false;
            return;
        }

        if (this.isSubmitted) {
            this.contactInfoService.addCountry(this.countryForm.value).subscribe(data => {
                this.countryForm.reset();
                this.isSubmitted = false;
            });


        }
    }

    updateCountry() {
        this.isSubmitted = true;
        if (!this.countryForm.valid) {
            this.isSubmitted = false;
            return;
        }
        if (this.isSubmitted) {
            this.contactInfoService.updateCountry(this.updateData.country.id, this.countryForm.value).subscribe(data => {
                this.updateData = undefined;
                this.countryForm.reset();
                this.isSubmitted = false;
            });

        }
    }
}
