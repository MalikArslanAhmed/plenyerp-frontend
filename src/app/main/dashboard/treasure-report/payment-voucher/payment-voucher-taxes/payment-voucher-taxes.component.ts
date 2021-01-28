import {Component, Inject, OnInit, ViewEncapsulation} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {TransactionService} from "../../../../../shared/services/transaction.service";
import {fuseAnimations} from "../../../../../../@fuse/animations";

@Component({
    selector: 'app-payment-voucher-taxes',
    templateUrl: './payment-voucher-taxes.component.html',
    styleUrls: ['./payment-voucher-taxes.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class PaymentVoucherTaxesComponent implements OnInit {
    action: any;
    dialogTitle: any;
    applicableTaxesForm: FormGroup;
    isSubmitted = false;
    updateData: any;
    taxes = [];
    grossAmount: any;
    totalTaxes = 0;
    taxArray = [];

    constructor(public matDialogRef: MatDialogRef<PaymentVoucherTaxesComponent>,
                @Inject(MAT_DIALOG_DATA) private _data: any,
                private fb: FormBuilder, private transactionService: TransactionService) {
        this.grossAmount = _data.netAmount;
        if (_data.action === 'CREATE') {
            this.updateData = undefined;
            this.dialogTitle = 'Add Applicable Taxes';
        } else {
            console.log('data');
            this.taxArray = (_data.taxIds && _data.taxIds !== '') ? JSON.parse(_data.taxIds) : [];
            this.dialogTitle = 'Edit Applicable Taxes';
            this.updateData = _data;
            this.checkedItemsId();
        }
    }

    ngOnInit(): void {
        this.refresh();
        this.getTaxes();
    }

    refresh() {
        this.applicableTaxesForm = this.fb.group({
            'totalTaxes': ['']
        });

    }

    getTaxes() {
        this.transactionService.getTaxes({'page': -1}).subscribe(data => {
            if (this.updateData) {
                this.taxes = this.updateData.taxes;
                this.totalTaxes = this.updateData.totalTaxes;
            } else {
                this.taxes = data.items;
            }
        });
    }

    adjustTotal(index, event) {
        if (this.taxes && this.taxes.length > 0) {
            this.taxes[index].checked = event.checked;
            let checkedArr = [];
            this.taxes.forEach(tax => {
                if (tax && tax.hasOwnProperty('checked') && tax.checked) {
                    checkedArr.push(((tax.tax) * this.grossAmount) / 100);
                }
            });
            if (checkedArr && checkedArr.length > 0) {
                this.totalTaxes = checkedArr.reduce((a, b) => a + b, 0);
            } else if (checkedArr && checkedArr.length === 0) {
                this.totalTaxes = 0;
            }
        }
    }

    changeTax(index, event) {
        this.taxes[index].tax = event.target.value;

        if (this.taxes && this.taxes.length > 0) {
            let checkedArr = [];
            this.taxes.forEach(tax => {
                if (tax && tax.hasOwnProperty('checked') && tax.checked) {
                    checkedArr.push(((tax.tax) * this.grossAmount) / 100);
                }
            });
            if (checkedArr && checkedArr.length > 0) {
                this.totalTaxes = checkedArr.reduce((a, b) => a + b, 0);
            } else if (checkedArr && checkedArr.length === 0) {
                this.totalTaxes = 0;
            }
        }
    }

    save() {
        this.updateData = undefined;
    }

    checkedItemsId() {
        console.log('this.taxArray', this.taxArray);
        if (this.taxArray && this.taxArray.length > 0) {
            this.taxArray.map(val => {
                if (this.taxes && this.taxes.length > 0) {
                    this.taxes.forEach(v => {
                        if (v.id === val) {
                            v['checked'] = val;
                        }
                    });
                }
            });
        }
    }
}
