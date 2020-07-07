import {Component, Inject, OnInit} from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA, MatDialog} from '@angular/material/dialog';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {TaxesService} from '../../../../shared/services/taxes.service';
import {GlCodeSelectComponent} from '../gl-code-select/gl-code-select.component';
import { MatSelectChange } from '@angular/material/select';

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
    liabilities = [];
    dialogRef: any;
    beneficiaryList=[];
    beneficiaryId:any;
    constructor(public matDialogRef: MatDialogRef<TaxesCreateComponent>,
                @Inject(MAT_DIALOG_DATA) private _data: any,
                private fb: FormBuilder,
                private taxesService: TaxesService,
                private _matDialog: MatDialog) {
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
        this.getBeneficaryCode();
        
    }

    refresh(): void {
        this.taxMasterForm = this.fb.group({
            name: ['', Validators.required],
            tax: ['', Validators.required],
            departmentId: ['', Validators.required],
            glCodeName: ['', Validators.required],
            companyId: ['', Validators.required],
            benName: ['', Validators.required],
            isActive: [true, Validators.required]
        });
    }

    checkForUpdate(): void {
        //console.log(this.updateData.tax.adminSegment.individualCode)
        console.log('--->>>', this.updateData);
        if (this.updateData) {
            this.taxMasterForm.patchValue({
                name: this.updateData.tax.name,
                tax: this.updateData.tax.tax,
                departmentId: this.updateData.tax.adminSegment.individualCode.id,
                glCodeName: this.updateData.tax.glCodeName,
                companyId: this.updateData.tax.companyId,
                benName: this.updateData.tax.company.name,
                isActive: this.updateData.tax.isActive
            });
            console.log('gggg-------', this.taxMasterForm);
        }
    }

    getBeneficaryCode()
    {
        this.taxesService.getBeneficiaryList({isCustomer:1}).subscribe(data => {
            this.beneficiaryList = data.items;
            //console.log(this.beneficiaryList);
            // this.taxMasterForm.patchValue({
            //     benCode: this.beneficiaryList[name]
            // });
        });
    }

    saveTax(): void {
        this.isSubmitted = true;
        if (!this.taxMasterForm.valid) {
            this.isSubmitted = false;
            return;
        }

        console.log(this.taxMasterForm.value)
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

    resetTaxMasterForm() {
        this.taxMasterForm.reset();
        this.taxMasterForm.controls['isActive'].setValue(true);
    }
  
    liabilitySelect() {
        this.dialogRef = this._matDialog.open(GlCodeSelectComponent, {
            panelClass: 'contact-form-dialog',
        });
        this.dialogRef.afterClosed().subscribe((response) => {
            if (!response) {
                return;
            }
            console.log(response)
            this.liabilities = [{
                'name': response.individualCode,
                'id': response.id
            }];
            console.log(this.liabilities)
            this.taxMasterForm.patchValue({
                departmentId: response.id,
                disabled: true
            });
            this.taxMasterForm.patchValue({
                glCodeName: response.name,
                disabled: true
            });
        });
    }

    beneficiarySelect(beneficiaryId)
    {
      //  console.log(id);
        this.beneficiaryList.forEach((value)=>{
            if(value.id===beneficiaryId)
            {
                this.taxMasterForm.get('benName').patchValue(
                    value.name
                );
            }
        });
    }
}
