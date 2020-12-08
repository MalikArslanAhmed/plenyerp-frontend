import {Component, Inject, OnInit, ViewEncapsulation} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";
import {AlertService} from "../../../../../shared/services/alert.service";
import {EmployeeService} from "../../../../../shared/services/employee.service";
import {PaymentVoucherTaxesComponent} from "../../payment-voucher/payment-voucher-taxes/payment-voucher-taxes.component";
import {NumberToWordsPipe} from "../../../../../shared/pipes/number-to-word.pipe";
import {AdminSegmentEmployeeSelectComponent} from "../../default-setting-voucher-info/admin-segment-employee-select/admin-segment-employee-select.component";
import {fuseAnimations} from "../../../../../../@fuse/animations";
import {ReceiptVoucherService} from "../../../../../shared/services/receipt-voucher.service";

@Component({
    selector: 'app-schedule-payers-employee',
    templateUrl: './schedule-payers-employee.component.html',
    styleUrls: ['./schedule-payers-employee.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class SchedulePayersEmployeeComponent implements OnInit {
    action: any;
    dialogTitle: any;
    schedulePayersEmployeeForm: FormGroup;
    isSubmitted = false;
    salaryScales: any = [];
    updateData: any;
    dialogRef: any;
    employees = [];
    payingOfficers = [];
    checkingOfficers = [];
    financialControllers = [];
    payeeData: any;
    banks = [];
    payerMode: any;

    constructor(public matDialogRef: MatDialogRef<SchedulePayersEmployeeComponent>,
                @Inject(MAT_DIALOG_DATA) private _data: any,
                private fb: FormBuilder,
                private _matDialog: MatDialog,
                private alertService: AlertService,
                private employeesService: EmployeeService,
                private receiptVoucherService: ReceiptVoucherService) {
        this.action = _data.action;
        this.payeeData = _data.pv;
        this.dialogTitle = 'Non-Personal Advance | RV - Schedule Payers Employee';
    }

    ngOnInit(): void {
        this.refresh();
        this.getEmployees();
    }

    refresh() {
        this.schedulePayersEmployeeForm = this.fb.group({
            year: [{'value': '', disabled: true}],
            departmentalNo: [{'value': '', disabled: true}],
            details: [''],
            employeeId: [{'value': '', disabled: true}],
            payeeName: [{'value': '', disabled: true}],
            amount: [''],
            // totalTax: [{'value': '', disabled: true}],
            totalAmount: [{'value': '', disabled: true}],
            totalAmountInWords: [{'value': '', disabled: true}],
            lineDetails: [''],
            number: [''],
            type: [''],
            tellerNumber: [''],
            issuedBy: ['']
        });
        if (this.payeeData && this.payeeData['valueDate']) {
            let valArr1 = this.payeeData['valueDate'].split(" ");
            let valArr2 = valArr1[0].split("-");

            this.schedulePayersEmployeeForm.patchValue({
                'year': valArr2 && valArr2[0] ? valArr2[0] : ''
            });
        }
        this.schedulePayersEmployeeForm.patchValue({
            'departmentalNo': this.payeeData && this.payeeData.deptalId ? this.payeeData.deptalId : ''
        });
    }

    savePayersEmployee() {
        this.isSubmitted = true;
        if (!this.schedulePayersEmployeeForm.valid) {
            this.isSubmitted = false;
            return;
        }

        if (!this.payerMode || this.payerMode === '') {
            this.alertService.showErrors('Please select payee bank');
            this.isSubmitted = false;
            return;
        }

        if (this.isSubmitted) {
            let params = {
                'employeeId': this.schedulePayersEmployeeForm.getRawValue().employeeId,
                'amount': this.schedulePayersEmployeeForm.getRawValue().amount,
                'totalTax': this.schedulePayersEmployeeForm.getRawValue().totalTax,
                'year': this.schedulePayersEmployeeForm.getRawValue().year,
                'details': this.schedulePayersEmployeeForm.getRawValue().details,
                'payerMode': this.payerMode ? this.payerMode : ''
            };
            this.receiptVoucherService.schedulePayer(this.payeeData.id, params).subscribe(data => {
                this.schedulePayersEmployeeForm.reset();
                this.matDialogRef.close(this.schedulePayersEmployeeForm);
                this.isSubmitted = false;
            });
        }
    }

    /*addApplicableTaxes() {
        if (!this.schedulePayersEmployeeForm.value || this.schedulePayersEmployeeForm.value.amount === '') {
            this.alertService.showErrors('Amount can\'t be empty');
            return;
        }
        this.dialogRef = this._matDialog.open(PaymentVoucherTaxesComponent, {
            panelClass: 'contact-form-dialog',
            data: {
                action: 'CREATE',
                amount: this.schedulePayersEmployeeForm.value.amount,
            }
        });
        const numberToWords = new NumberToWordsPipe();
        this.dialogRef.afterClosed().subscribe((response) => {
            if (!response) {
                return;
            }
            this.schedulePayersEmployeeForm.patchValue({
                'totalTax': response['totalTaxes'],
                'totalAmount': parseInt(this.schedulePayersEmployeeForm.value.amount) + parseInt(response['totalTaxes']),
                'totalAmountInWords': numberToWords.transform(parseInt(this.schedulePayersEmployeeForm.value.amount) + parseInt(response['totalTaxes']))
            });
        });
    }*/

    getEmployees(): void {
        this.employees = [];
        this.employeesService.getEmployees({page: -1}).subscribe(data => {
            this.employees = data.items;
        });
    }

    getBanks(id) {
        this.employeesService.getBankDetailsList(id, {'page': -1}).subscribe(data => {
            this.banks = data.items;
        });
    }

    selectAdminEmployee(type) {
        let allowType: any = 'BOTH';
        let node: any = undefined;
        if (type === 'Select Checking Employee' || type === 'Select Payeer Employee' || type === 'Select Financial Control') {
            allowType = 'BOTH';
        }

        this.dialogRef = this._matDialog.open(AdminSegmentEmployeeSelectComponent, {
            panelClass: 'transaction-items-form-dialog',
            data: {head: type, allow: allowType, node: node}
        });
        this.dialogRef.afterClosed().subscribe((response) => {
            if (!response) {
                return;
            }
            if (type === 'Select Checking Employee') {
                this.checkingOfficers = [{
                    'name': response['empData'].id,
                    'id': response['empData'].id
                }];
                this.schedulePayersEmployeeForm.patchValue({
                    checkingOfficerId: response['empData'].id,
                    payeeName: response['empData'].firstName + ' ' + response['empData'].lastName,
                    disabled: true
                });
            } else if (type === 'Select Payeer Employee') {
                this.payingOfficers = [{
                    'name': response['empData'].id,
                    'id': response['empData'].id
                }];
                this.schedulePayersEmployeeForm.patchValue({
                    employeeId: response['empData'].id,
                    payeeName: response['empData'].firstName + ' ' + response['empData'].lastName,
                    disabled: true
                });
                this.getBanks(response['empData'].id);
            } else if (type === 'Select Financial Control') {
                this.financialControllers = [{
                    'name': response['empData'].id,
                    'id': response['empData'].id
                }];
                this.schedulePayersEmployeeForm.patchValue({
                    financialControllerId: response['empData'].id,
                    payeeName: response['empData'].firstName + ' ' + response['empData'].lastName,
                    disabled: true
                });
            }
        });
    }

    selectRadio(mode) {
        this.payerMode = mode;
    }
}
