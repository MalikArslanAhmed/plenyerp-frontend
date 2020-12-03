import {Component, Inject, OnInit, ViewEncapsulation} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";
import {fuseAnimations} from "../../../../../../@fuse/animations";
import {PaymentVoucherTaxesComponent} from '../payment-voucher-taxes/payment-voucher-taxes.component';
import {AlertService} from "../../../../../shared/services/alert.service";
import {NumberToWordsPipe} from "../../../../../shared/pipes/number-to-word.pipe";
import {EmployeeService} from "../../../../../shared/services/employee.service";
import {AdminSegmentEmployeeSelectComponent} from "../../default-setting-voucher-info/admin-segment-employee-select/admin-segment-employee-select.component";
import {PaymentVoucherService} from "../../../../../shared/services/payment-voucher.service";

@Component({
    selector: 'app-schedule-payee-employee',
    templateUrl: './schedule-payee-employee.component.html',
    styleUrls: ['./schedule-payee-employee.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class SchedulePayeeEmployeeComponent implements OnInit {
    action: any;
    dialogTitle: any;
    schedulePayeeEmployeeForm: FormGroup;
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
    payeeBankId: any;

    constructor(public matDialogRef: MatDialogRef<SchedulePayeeEmployeeComponent>,
                @Inject(MAT_DIALOG_DATA) private _data: any,
                private fb: FormBuilder,
                private _matDialog: MatDialog,
                private alertService: AlertService,
                private employeesService: EmployeeService,
                private paymentVoucherService: PaymentVoucherService) {
        this.action = _data.action;
        this.payeeData = _data.pv;
        if (this.action === 'EDIT') {
            this.dialogTitle = 'Edit Country';
            if (_data.country) {
                this.updateData = _data;
            }
        } else {
            this.dialogTitle = 'Non-Personal Advance | PV - Schedule Payees Employee';
        }
    }

    ngOnInit(): void {
        this.refresh();
        this.getEmployees();
        // this.checkForUpdate();
    }

    refresh() {
        this.schedulePayeeEmployeeForm = this.fb.group({
            year: [''],
            departmentalNo: [{'value': '', disabled: true}],
            details: [''],
            employeeId: [{'value': '', disabled: true}],
            payeeName: [{'value': '', disabled: true}],
            netAmount: [''],
            totalTax: [{'value': '', disabled: true}],
            totalAmount: [{'value': '', disabled: true}],
            totalAmountInWords: [{'value': '', disabled: true}]
        });
        this.schedulePayeeEmployeeForm.patchValue({
            'departmentalNo': this.payeeData && this.payeeData.deptalId ? this.payeeData.deptalId : ''
        })
    }

    savePayeeEmployee() {
        this.isSubmitted = true;
        if (!this.schedulePayeeEmployeeForm.valid) {
            this.isSubmitted = false;
            return;
        }

        if (this.isSubmitted) {
            let params = {
                'employeeId': this.schedulePayeeEmployeeForm.getRawValue().employeeId,
                'netAmount': this.schedulePayeeEmployeeForm.getRawValue().netAmount,
                'totalTax': this.schedulePayeeEmployeeForm.getRawValue().totalTax,
                'year': this.schedulePayeeEmployeeForm.getRawValue().year,
                'payeeBankId': this.payeeBankId ? this.payeeBankId : ''
            };
            this.paymentVoucherService.schedulePayee(this.payeeData.id, params).subscribe(data => {
                this.schedulePayeeEmployeeForm.reset();
                this.isSubmitted = false;
                this.matDialogRef.close(this.schedulePayeeEmployeeForm);
            });
        }
    }

    addApplicableTaxes() {
        if (!this.schedulePayeeEmployeeForm.value || this.schedulePayeeEmployeeForm.value.netAmount === '') {
            this.alertService.showErrors('Net Amount can\'t be empty');
            return;
        }
        this.dialogRef = this._matDialog.open(PaymentVoucherTaxesComponent, {
            panelClass: 'contact-form-dialog',
            data: {
                action: 'CREATE',
                netAmount: this.schedulePayeeEmployeeForm.value.netAmount,
            }
        });
        const numberToWords = new NumberToWordsPipe();
        this.dialogRef.afterClosed().subscribe((response) => {
            if (!response) {
                return;
            }
            this.schedulePayeeEmployeeForm.patchValue({
                'totalTax': response['totalTaxes'],
                'totalAmount': parseInt(this.schedulePayeeEmployeeForm.value.netAmount) + parseInt(response['totalTaxes']),
                'totalAmountInWords': numberToWords.transform(parseInt(this.schedulePayeeEmployeeForm.value.netAmount) + parseInt(response['totalTaxes']))
            });
        });
    }

    getEmployees(): void {
        this.employees = [];
        this.employeesService.getEmployees({page: -1}).subscribe(data => {
            this.employees = data.items;
        });
    }

    getBanks(id) {
        this.employeesService.getBankDetailsList(id, {'page': -1}).subscribe(data => {
            this.banks = data.items;
            console.log("bank", this.banks);
        });
    }

    selectAdminEmployee(type) {
        let allowType: any = 'BOTH';
        let node: any = undefined;
        if (type === 'Select Checking Employee' || type === 'Select Paying Employee' || type === 'Select Financial Control') {
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
                this.schedulePayeeEmployeeForm.patchValue({
                    checkingOfficerId: response['empData'].id,
                    payeeName: response['empData'].firstName + ' ' + response['empData'].lastName,
                    disabled: true
                });
            } else if (type === 'Select Payee Employee') {
                this.payingOfficers = [{
                    'name': response['empData'].id,
                    'id': response['empData'].id
                }];
                this.schedulePayeeEmployeeForm.patchValue({
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
                this.schedulePayeeEmployeeForm.patchValue({
                    financialControllerId: response['empData'].id,
                    payeeName: response['empData'].firstName + ' ' + response['empData'].lastName,
                    disabled: true
                });
            }
        });
    }

    selectRadio(id) {
        this.payeeBankId = id;
    }
}
