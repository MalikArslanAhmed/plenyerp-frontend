import {Component, Inject, OnInit, ViewEncapsulation} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {CensuresService} from "../../../../shared/services/censures.service";
import {fuseAnimations} from "../../../../../@fuse/animations";

@Component({
    selector: 'app-censures-create',
    templateUrl: './censures-create.component.html',
    styleUrls: ['./censures-create.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class CensuresCreateComponent implements OnInit {
    action: any;
    dialogTitle: any;
    censuresForm: FormGroup;
    isSubmitted = false;
    updateData: any;

    constructor(public matDialogRef: MatDialogRef<CensuresCreateComponent>,
                @Inject(MAT_DIALOG_DATA) private _data: any,
                private fb: FormBuilder,
                private censuresService: CensuresService) {
        this.action = _data.action;
        if (this.action === 'EDIT') {
            this.dialogTitle = 'Edit Censures';
            if (_data.censure) {
                this.updateData = _data;
            }
        } else {
            this.dialogTitle = 'Add Censures';
        }
    }

    ngOnInit(): void {
        this.refresh();
        this.checkForUpdate();
    }

    refresh() {
        this.censuresForm = this.fb.group({
            'name': ['', Validators.required],
            'isActive': [true, Validators.required]
        });
    }

    checkForUpdate() {
        if (this.updateData) {
            this.censuresForm.patchValue({
                'name': this.updateData.censure.name,
                'isActive': this.updateData.censure.isActive
            });
        }
    }

    saveCensure() {
        this.isSubmitted = true;
        if (!this.censuresForm.valid) {
            this.isSubmitted = false;
            return;
        }

        if (this.isSubmitted) {
            this.censuresService.addCensure(this.censuresForm.value).subscribe(data => {
                this.censuresForm.reset();
                this.isSubmitted = false;
            });
        }
    }

    updateCensure() {
        this.isSubmitted = true;
        if (!this.censuresForm.valid) {
            this.isSubmitted = false;
            return;
        }
        if (this.isSubmitted) {
            this.censuresService.updateCensure(this.updateData.censure.id, this.censuresForm.value).subscribe(data => {
                this.updateData = undefined;
                this.censuresForm.reset();
                this.isSubmitted = false;
            });
        }
    }
}
