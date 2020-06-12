import {Component, OnInit, Inject, ViewEncapsulation} from '@angular/core';
import {MatDialogRef, MatDialog, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {fuseAnimations} from "../../../../../@fuse/animations";

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
    ) {
        this.action = _data.action;
        if (this.action === 'EDIT') {
            this.dialogTitle = 'Edit Item';
            if (_data.store) {
                this.updateData = _data;
            }
        } else {
            this.dialogTitle = 'Add New Company';
        }
    }

    ngOnInit(): void {
        this.refresh();
    }

    refresh() {
        this.itemForm = this.fb.group({
            'companyName': ['', Validators.required],
            'city': ['', Validators.required],
            'address': ['', Validators.required],
            'state': ['', Validators.required],
            'country': ['', Validators.required],
            'phone': ['', Validators.required],
            'email': ['', Validators.required],
            'website': ['', Validators.required],
            'isActive': [false, Validators.required],
            'isSupplier': [false, Validators.required],
            'isCustomer': [false, Validators.required],
            'isCashbook': [false, Validators.required],
            'isOneoff': [false, Validators.required],
            'isPF': [false, Validators.required]

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

}
