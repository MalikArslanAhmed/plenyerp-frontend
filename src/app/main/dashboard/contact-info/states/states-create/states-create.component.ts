import {Component, Inject, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {FormBuilder, FormGroup, Validators, FormControl} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {fuseAnimations} from '../../../../../../@fuse/animations';
import {ContactInfoService} from '../../../../../shared/services/contact-info.service';

@Component({
    selector: 'states-create',
    templateUrl: './states-create.component.html',
    styleUrls: ['./states-create.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class StatesCreateComponent implements OnInit {
    action: any;
    dialogTitle: any;
    statesForm: FormGroup;
    isSubmitted = false;
    salaryScales: any = [];
    updateData: any;
    countries = [];
    regions = [];
    constructor(public matDialogRef: MatDialogRef<StatesCreateComponent>,
                @Inject(MAT_DIALOG_DATA) private _data: any,
                private fb: FormBuilder,
                private contactInfoService: ContactInfoService) {
        this.action = _data.action;
        if (this.action === 'EDIT') {
            this.dialogTitle = 'Edit State';
            if (_data.state) {
                this.updateData = _data;
            }
        } else {
            this.dialogTitle = 'Add State';
        }
    }

    ngOnInit(): void {
        this.refresh();
        this.checkForUpdate();
    }

    refresh() {
        this.statesForm = this.fb.group({
            countryId: ['', Validators.required],
            regionId: ['', Validators.required],
            name: ['', Validators.required]

        });
    }

    checkForUpdate() {
        if (this.updateData) {
            this.statesForm.patchValue({
                name: this.updateData.state.name,
                countryId: this.updateData.state.countryId,
                regionId: this.updateData.state.regionId,
            });
        }
    }

    saveState() {
        this.isSubmitted = true;
        if (!this.statesForm.valid) {
            this.isSubmitted = false;
            return;
        }

        if (this.isSubmitted) {
            this.contactInfoService.addState(this.statesForm.value).subscribe(data => {
                this.statesForm.reset();
                this.isSubmitted = false;
            });


        }
    }

    updateStates() {
        this.isSubmitted = true;
        if (!this.statesForm.valid) {
            this.isSubmitted = false;
            return;
        }
        if (this.isSubmitted) {
            this.contactInfoService.updateState(this.updateData.state.id, this.statesForm.value).subscribe(data => {
                this.updateData = undefined;
                this.statesForm.reset();
                this.isSubmitted = false;
            });

        }
    }
}
