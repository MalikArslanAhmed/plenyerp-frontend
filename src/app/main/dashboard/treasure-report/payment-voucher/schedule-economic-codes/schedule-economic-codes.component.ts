import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material/dialog';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AlertService} from '../../../../../shared/services/alert.service';
import {EmployeeService} from '../../../../../shared/services/employee.service';
import {PaymentVoucherService} from '../../../../../shared/services/payment-voucher.service';

@Component({
    selector: 'app-schedule-economic-codes',
    templateUrl: './schedule-economic-codes.component.html',
    styleUrls: ['./schedule-economic-codes.component.scss']
})
export class ScheduleEconomicCodesComponent implements OnInit {
    action: any;
    dialogTitle: any;
    economicCodeForm: FormGroup;
    dialogRef: any;
    banks = [
        // {
        //     accountNo: '2345678',
        //     amount: '45678'
        // }
    ];



    constructor(
        public matDialogRef: MatDialogRef<ScheduleEconomicCodesComponent>,
        @Inject(MAT_DIALOG_DATA) private _data: any,
        private fb: FormBuilder,
        private _matDialog: MatDialog,
        private alertService: AlertService,
        private employeesService: EmployeeService,
        private paymentVoucherService: PaymentVoucherService,
    ) {
    }

    ngOnInit(): void {
        this.refresh();
    }

    refresh() {
        this.economicCodeForm = this.fb.group({
            year: [''],
            deptal_no: [''],
            eco_code: [''],
            eco_code_title: [''],
            gross_amount: [''],
            payee_name: [''],
            ledger_code: [''],
            ledger_code_title: [''],

        });
    }

    saveEconomicCode() {

    }

    updateEconomicCode() {

    }
}
