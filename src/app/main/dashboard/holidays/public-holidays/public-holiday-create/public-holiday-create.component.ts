import {Component, Inject, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {FormBuilder, FormGroup, Validators, FormControl} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {fuseAnimations} from '../../../../../../@fuse/animations';
import {ContactInfoService} from '../../../../../shared/services/contact-info.service';
import * as moment from 'moment';

@Component({
    selector: 'app-public-holiday-create',
    templateUrl: './public-holiday-create.component.html',
    styleUrls: ['./public-holiday-create.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class PublicHolidayCreateComponent implements OnInit {
    action: any;
    dialogTitle: any;
    publicHolidayForm: FormGroup;
    isSubmitted = false;
    salaryScales: any = [];
    updateData: any;
    constructor(public matDialogRef: MatDialogRef<PublicHolidayCreateComponent>,
                @Inject(MAT_DIALOG_DATA) private _data: any,
                private fb: FormBuilder,
                private contactInfoService: ContactInfoService) {
        this.action = _data.action;
        if (this.action === 'EDIT') {
            this.dialogTitle = 'Edit Public Holiday';
            if (_data.publicHoliday) {
                this.updateData = _data;
            }
        } else {
            this.dialogTitle = 'Add Public Holiday';
        }
    }

    ngOnInit(): void {
        this.refresh();
        this.checkForUpdate();
    }

    refresh() {
        this.publicHolidayForm = this.fb.group({
            name: ['', Validators.required],
            date: ['', Validators.required],
            isRepeatYearly: [false, Validators.required],
            isOneTime: [false, Validators.required],

        });
    }

    checkForUpdate() {
        if (this.updateData) {
            this.publicHolidayForm.patchValue({
                name: this.updateData.publicHoliday.name,
                date: this.updateData.publicHoliday.date,
                isRepeatYearly: this.updateData.publicHoliday.isRepeatYearly,
                isOneTime: this.updateData.publicHoliday.isOneTime,
            });
        }
    }

    savePublicHoliday() {
        this.isSubmitted = true;
        if (!this.publicHolidayForm.valid) {
            this.isSubmitted = false;
            return;
        }

        if (this.isSubmitted) {
            const f = this.publicHolidayForm.value;
            const date = moment(f.date).format('YYYY-MM-DD');
            const obj = {
                name: f.name,
                date: date,
                isRepeatYearly: f.isRepeatYearly,
                isOneTime: f.isOneTime,
            };
            this.contactInfoService.addPublicHoliday(obj).subscribe(data => {
                this.publicHolidayForm.reset();
                this.isSubmitted = false;
            });


        }
    }

    updatePublicHoliday() {
        this.isSubmitted = true;
        if (!this.publicHolidayForm.valid) {
            this.isSubmitted = false;
            return;
        }
        if (this.isSubmitted) {
            const f = this.publicHolidayForm.value;
            const date = moment(f.date).format('YYYY-MM-DD');
            const obj = {
                name: f.name,
                date: date,
                isRepeatYearly: f.isRepeatYearly,
                isOneTime: f.isOneTime,
            };
            this.contactInfoService.updatePublicHoliday(this.updateData.publicHoliday.id, obj).subscribe(data => {
                this.updateData = undefined;
                this.publicHolidayForm.reset();
                this.isSubmitted = false;
            });

        }
    }
}
