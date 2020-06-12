import {Component, Inject, OnInit} from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {TaxesService} from '../../../../shared/services/taxes.service';

@Component({
    selector: 'app-taxes-create',
    templateUrl: './taxes-create.component.html',
    styleUrls: ['./taxes-create.component.scss']
})
export class TaxesCreateComponent implements OnInit {
    action: any;
    dialogTitle: any;
    taxMasterForm: FormGroup;
    isSubmitted = false;
    taxes: any = [];
    updateData: any;

    constructor(public matDialogRef: MatDialogRef<TaxesCreateComponent>,
                @Inject(MAT_DIALOG_DATA) private _data: any,
                private fb: FormBuilder,
                private taxesService: TaxesService) {
        this.action = _data.action;
        if (this.action === 'EDIT') {
            this.dialogTitle = 'Edit';
            if (_data.tax) {
                this.updateData = _data;
            }
        } else {
            this.dialogTitle = 'Add';
        }
    }

    ngOnInit(): void {
        this.refresh();
        this.checkForUpdate();
    }

    refresh(): void {
        this.taxMasterForm = this.fb.group({
            taxTitle: ['', Validators.required],
            taxPercentage: ['', Validators.required],
            glCode: ['', Validators.required],
            glCodeName: ['', Validators.required],
            benCode: ['', Validators.required],
            benName: ['', Validators.required],
            isActive: [true, Validators.required]
        });
    }

    checkForUpdate(): void {
        if (this.updateData) {
            this.taxMasterForm.patchValue({
                taxTitle: this.updateData.tax.taxTitle,
                taxPercentage: this.updateData.tax.taxPercentage,
                glCode: this.updateData.tax.glCode,
                glCodeName: this.updateData.tax.glCodeName,
                benCode: this.updateData.tax.benCode,
                benName: this.updateData.tax.benName,
                isActive: this.updateData.tax.isActive
            });
        }
    }

    saveTax(): void {
        this.isSubmitted = true;
        if (!this.taxMasterForm.valid) {
            this.isSubmitted = false;
            return;
        }

        if (this.isSubmitted) {
            this.taxesService.addTax(this.taxMasterForm.value).subscribe(data => {
                this.taxMasterForm.reset();
                this.isSubmitted = false;
            });
        }
    }

    updateTax(): void {
        this.isSubmitted = true;
        if (!this.taxMasterForm.valid) {
            this.isSubmitted = false;
            return;
        }
        if (this.isSubmitted) {
            this.taxesService.updateTax(this.updateData.tax.id, this.taxMasterForm.value).subscribe(data => {
                this.updateData = undefined;
                this.taxMasterForm.reset();
                this.isSubmitted = false;
            });
        }
    }

    resetTaxMasterForm(){
        this.taxMasterForm.reset();
        this.taxMasterForm.controls['isActive'].setValue(true);
    }
}
