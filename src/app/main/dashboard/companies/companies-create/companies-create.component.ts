import {Component, OnInit, Inject, ViewEncapsulation} from '@angular/core';
import {MatDialogRef, MatDialog, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {fuseAnimations} from '../../../../../@fuse/animations';
import {CompaniesService} from '../../../../shared/services/companies.service';

@Component({
    selector: 'app-companies-create',
    templateUrl: './companies-create.component.html',
    styleUrls: ['./companies-create.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class CompaniesCreateComponent implements OnInit {
    action: any;
    dialogTitle: any;
    itemForm: FormGroup;
    isSubmitted = false;
    qualifications: any = [];
    updateData: any;
    dialogRef: any;

    constructor(public matDialogRef: MatDialogRef<CompaniesCreateComponent>,
                @Inject(MAT_DIALOG_DATA) private _data: any,
                private fb: FormBuilder,
                private _matDialog: MatDialog,
                private companiesService: CompaniesService
    ) {
        this.action = _data.action;
        if (this.action === 'EDIT') {
            this.dialogTitle = 'Edit Company';
            if (_data.company) {
                this.updateData = _data;
            }
        } else {
            this.dialogTitle = 'Add New Company';
        }
    }

    ngOnInit(): void {
        this.refresh();
        this.checkForUpdate();
    }

    refresh() {
        this.itemForm = this.fb.group({
            name: ['', Validators.required],
            city: ['', Validators.required],
            address: ['', Validators.required],
            state: ['', Validators.required],
            country: ['', Validators.required],
            phone: ['', Validators.required],
            email: ['', Validators.required],
            website: ['', Validators.required],
            isActive: [false, Validators.required],
            isSupplier: [false, Validators.required],
            isCustomer: [false, Validators.required],
            isCashbookAc: [false, Validators.required],
            isOnOff: [false, Validators.required],
            isPf: [false, Validators.required]

            // 'categoryId': ['', Validators.required],
            // 'measurementId': ['', Validators.required],
            // 'unitPrice': ['', Validators.required],
            // 'leadDays': ['', Validators.required],
            // 'reorderQuantity': ['', Validators.required],
            // 'salesCommission': ['', Validators.required],
            // 'minimumQuantity': ['', Validators.required],
            // 'maximumQuantity': ['', Validators.required],
            // 'isChargedVat': [false, Validators.required],
            // 'isChargedOtherTax': [false, Validators.required],
            // 'isPhysicalQuantity': [false, Validators.required]
        });
    }

    checkForUpdate(): void {
        if (this.updateData) {
            this.itemForm.patchValue({
                name: this.updateData.company.name,
                city: this.updateData.company.city,
                address: this.updateData.company.address,
                state: this.updateData.company.state,
                country: this.updateData.company.country,
                phone: this.updateData.company.phone,
                email: this.updateData.company.email,
                website: this.updateData.company.website,
                isActive: this.updateData.company.isActive,
                isSupplier: this.updateData.company.isSupplier,
                isCustomer: this.updateData.company.isCustomer,
                isCashbookAc: this.updateData.company.isCashbookAc,
                isOnOff: this.updateData.company.isOnOff,
                isPf: this.updateData.company.isPf
            });
        }
    }

    saveCompany(): void {
        this.isSubmitted = true;
        if (!this.itemForm.valid) {
            this.isSubmitted = false;
            return;
        }

        if (this.isSubmitted) {
            this.companiesService.addCompany(this.itemForm.value).subscribe(data => {
                this.itemForm.reset();
                this.isSubmitted = false;
            });
        }
    }

    updateCompany() {
        this.isSubmitted = true;
        if (!this.itemForm.valid) {
            this.isSubmitted = false;
            return;
        }
        if (this.isSubmitted) {
            this.companiesService.updateCompany(this.updateData.company.id, this.itemForm.value).subscribe(data => {
                this.updateData = undefined;
                this.itemForm.reset();
                this.isSubmitted = false;
            });
        }
    }

    resetForm(){
        this.itemForm.reset();
        this.itemForm.controls['isActive'].setValue(true);
    }

}
