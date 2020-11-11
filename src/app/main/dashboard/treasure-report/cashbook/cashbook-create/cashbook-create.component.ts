import {Component, Inject, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {FormBuilder, FormGroup, Validators, FormControl} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {fuseAnimations} from '../../../../../../@fuse/animations';
import {CashbookService} from '../../../../../shared/services/cashbook.service';

@Component({
    selector: 'app-cashbook-create',
    templateUrl: './cashbook-create.component.html',
    styleUrls: ['./cashbook-create.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class CashbookCreateComponent implements OnInit {
    action: any;
    dialogTitle: any;
    cashbookAccountForm: FormGroup;
    isSubmitted = false;
    salaryScales: any = [];
    updateData: any;
    constructor(public matDialogRef: MatDialogRef<CashbookCreateComponent>,
                @Inject(MAT_DIALOG_DATA) private _data: any,
                private fb: FormBuilder,
                private cashbookService: CashbookService) {
        this.action = _data.action;
        if (this.action === 'EDIT') {
            this.dialogTitle = 'Edit a Cashbook Account';
            if (_data.roles) {
                this.updateData = _data;
            }
        } else {
            this.dialogTitle = 'Add a Cashbook Account';
        }
    }

    ngOnInit(): void {
        this.refresh();
        this.checkForUpdate();
    }

    refresh() {
        this.cashbookAccountForm = this.fb.group({
            eco_code: ['', Validators.required],
            cashbook_title: ['', Validators.required],
            full_code: ['', Validators.required],
            bankStmt: ['', Validators.required],
            cashbook: ['', Validators.required],
            x_rate: ['', Validators.required],
            pv: ['', Validators.required],
            rv: ['', Validators.required],
            prifix: ['', Validators.required],
            suffix: ['', Validators.required],
            e_mandate: ['', Validators.required],
            fund_own: ['', Validators.required],
            bankAcNumber: ['', Validators.required],
            title: ['', Validators.required],
            bank: ['', Validators.required],
            branch: ['', Validators.required],
            currency: ['', Validators.required],
            bank_e_mandate: ['', Validators.required],
            month_1: [''],
            month_2: [''],
            month_3: [''],
            month_4: [''],
            month_5: [''],
            month_6: [''],
            month_7: [''],
            month_8: [''],
            month_9: [''],
            month_10: [''],
            month_11: [''],
            month_12: [''],
        });
    }

    checkForUpdate() {
        if (this.updateData) {
            this.cashbookAccountForm.patchValue({
                // name: this.updateData.roles.role,
                // description: this.updateData.roles.description
            });
        }
    }

    saveCashbookDetails() {
        console.log('-->save', this.cashbookAccountForm.getRawValue());
        if (!this.cashbookAccountForm.valid) {
            return;
        }
        // this.cashbookService.addCashbook(this.cashbookAccountForm.value).subscribe(data => {
        //     this.cashbookAccountForm.reset();
        // });
    }

    updateCashbookDetails() {
        console.log('-->update', this.cashbookAccountForm.getRawValue());
        if (!this.cashbookAccountForm.valid) {
            return;
        }
        // this.cashbookService.updateCashbook(this.updateData.roles.id, this.cashbookAccountForm.value).subscribe(data => {
        //     this.updateData = undefined;
        //     this.cashbookAccountForm.reset();
        // });
    }
}
