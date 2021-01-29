import {Component, Inject, OnInit, ViewEncapsulation} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";
import {AlertService} from "../../../../../shared/services/alert.service";
import {EmployeeService} from "../../../../../shared/services/employee.service";
import {NumberToWordsPipe} from "../../../../../shared/pipes/number-to-word.pipe";
import {fuseAnimations} from "../../../../../../@fuse/animations";
import {ReceiptVoucherService} from "../../../../../shared/services/receipt-voucher.service";
import {GlobalService} from "../../../../../shared/services/global.service";
import {SelectPayersCustomerComponent} from '../select-payers-customer/select-payers-customer.component';

@Component({
    selector: 'app-schedule-payers-customer',
    templateUrl: './schedule-payers-customer.component.html',
    styleUrls: ['./schedule-payers-customer.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class SchedulePayersCustomerComponent implements OnInit {
    dialogTitle: any;
    schedulePayersCustomerForm: FormGroup;
    isSubmitted = false;
    salaryScales: any = [];
    updateData: any;
    dialogRef: any;
    employees = [];
    customers = [];
    payeeData: any;
    banks = [];
    payMode: any;
    user: any;

    constructor(public matDialogRef: MatDialogRef<SchedulePayersCustomerComponent>,
                @Inject(MAT_DIALOG_DATA) private _data: any,
                private fb: FormBuilder,
                private _matDialog: MatDialog,
                private alertService: AlertService,
                private employeesService: EmployeeService,
                private receiptVoucherService: ReceiptVoucherService,
                private globalService: GlobalService) {
        if (_data.action === 'EDIT') {
            this.updateData = _data;
            this.payeeData = _data.rv;
            this.dialogTitle = (_data && _data['report'].types && _data['report'].types.name) ? _data['report'].types.name + ' | RV - Schedule Payers Company' : '-';
        } else {
            this.payeeData = _data.rv;
            this.dialogTitle = (this.payeeData && this.payeeData.types && this.payeeData.types.name) ? this.payeeData.types.name + ' | RV - Schedule Payers Company' : '-';
        }
    }

    ngOnInit(): void {
        this.refresh();
        this.getEmployees();
        if (this.updateData) {
            this.patchForm();
        }
    }

    refresh() {
        this.user = this.globalService.getSelf();
        this.schedulePayersCustomerForm = this.fb.group({
            year: [{'value': '', disabled: true}],
            departmentalNo: [{'value': '', disabled: true}],
            details: [{'value': '', disabled: true}],
            companyId: [{'value': '', disabled: true}],
            payerName: [{'value': '', disabled: true}],
            amount: [''],
            totalAmount: [{'value': '', disabled: true}],
            totalAmountInWords: [{'value': '', disabled: true}],
            lineDetail: [''],
            instrumentNumber: [''],
            instrumentType: [''],
            instrumentTellerNumber: [''],
            instrumentIssuedBy: ['']
        });
        this.schedulePayersCustomerForm.patchValue({
            details: (this.payeeData && this.payeeData.paymentDescription) ? this.payeeData.paymentDescription : '',
        });
        if (this.payeeData && this.payeeData['valueDate']) {
            let valArr1 = this.payeeData['valueDate'].split(" ");
            let valArr2 = valArr1[0].split("-");

            this.schedulePayersCustomerForm.patchValue({
                'year': valArr2 && valArr2[0] ? valArr2[0] : ''
            });
        }
        this.schedulePayersCustomerForm.patchValue({
            'departmentalNo': this.payeeData && this.payeeData.deptalId ? this.payeeData.deptalId : ''
        });
    }

    patchForm() {
        const numberToWords = new NumberToWordsPipe();
        this.customers = [{
            'id': (this.updateData && this.updateData['rv'] && this.updateData['rv']['adminCompany'] && this.updateData['rv']['adminCompany'].id) ? this.updateData['rv']['adminCompany'].id : '',
            'name': (this.updateData && this.updateData['rv'] && this.updateData['rv']['adminCompany'] && this.updateData['rv']['adminCompany'].id) ? this.updateData['rv']['adminCompany'].id : '',
        }];
        this.payMode = this.updateData['rv'].payMode;
        this.schedulePayersCustomerForm.patchValue({
            year: (this.updateData && this.updateData['report']) ? this.updateData['report'].year : '',
            departmentalNo: (this.updateData && this.updateData['report']) ? this.updateData['report'].deptalId : '',
            details: (this.updateData && this.updateData['report']) ? this.updateData['report'].paymentDescription : '',
            companyId: (this.updateData && this.updateData['rv']) ? this.updateData['rv'].companyId : '',
            payerName: (this.updateData && this.updateData['rv'] && this.updateData['rv']['adminCompany']) ? this.updateData['rv']['adminCompany'].name : '',
            amount: (this.updateData && this.updateData['rv'] && this.updateData['rv'].totalAmount) ? this.updateData['rv'].totalAmount : '',
            totalAmountInWords: numberToWords.transform(parseInt(this.updateData['rv'].totalAmount)),
            lineDetail: (this.updateData && this.updateData['rv']) ? this.updateData['rv'].lineDetail : '',
            instrumentNumber: (this.updateData && this.updateData['rv']) ? this.updateData['rv'].instrumentNumber : '',
            instrumentType: (this.updateData && this.updateData['rv']) ? this.updateData['rv'].instrumentType : '',
            instrumentTellerNumber: (this.updateData && this.updateData['rv']) ? this.updateData['rv'].instrumentTellerNumber : '',
            instrumentIssuedBy: (this.updateData && this.updateData['rv']) ? this.updateData['rv'].instrumentIssuedBy : ''
        });
    }

    savePayersCustomer() {
        this.isSubmitted = true;
        if (!this.schedulePayersCustomerForm.valid) {
            this.isSubmitted = false;
            return;
        }

        if (!this.payMode || this.payMode === '') {
            this.alertService.showErrors('Please select pay mode');
            this.isSubmitted = false;
            return;
        }

        if (this.isSubmitted) {
            let params = {
                'companyId': this.schedulePayersCustomerForm.getRawValue().companyId ? this.schedulePayersCustomerForm.getRawValue().companyId : '',
                'totalAmount': this.schedulePayersCustomerForm.getRawValue().amount ? this.schedulePayersCustomerForm.getRawValue().amount : '',
                'year': this.schedulePayersCustomerForm.getRawValue().year ? this.schedulePayersCustomerForm.getRawValue().year : '',
                'details': this.schedulePayersCustomerForm.getRawValue().details ? this.schedulePayersCustomerForm.getRawValue().details : '',
                'payMode': this.payMode ? this.payMode : '',
                'lineDetail': this.schedulePayersCustomerForm.getRawValue().lineDetail ? this.schedulePayersCustomerForm.getRawValue().lineDetail : '',
                'instrumentNumber': this.schedulePayersCustomerForm.getRawValue().instrumentNumber ? this.schedulePayersCustomerForm.getRawValue().instrumentNumber : '',
                'instrumentType': this.schedulePayersCustomerForm.getRawValue().instrumentType ? this.schedulePayersCustomerForm.getRawValue().instrumentType : '',
                'instrumentTellerNumber': this.schedulePayersCustomerForm.getRawValue().instrumentTellerNumber ? this.schedulePayersCustomerForm.getRawValue().instrumentTellerNumber : '',
                'instrumentIssuedBy': this.schedulePayersCustomerForm.getRawValue().instrumentIssuedBy ? this.schedulePayersCustomerForm.getRawValue().instrumentIssuedBy : '',
            };
            if (!this.updateData) {
                this.receiptVoucherService.schedulePayer(this.payeeData.id, params).subscribe(data => {
                    this.schedulePayersCustomerForm.reset();
                    this.matDialogRef.close(this.schedulePayersCustomerForm);
                    this.isSubmitted = false;
                });
            } else {
                this.receiptVoucherService.updateSchedulePayer(this.updateData['report'].id, this.payeeData.id, params).subscribe(data => {
                    this.schedulePayersCustomerForm.reset();
                    this.matDialogRef.close(this.schedulePayersCustomerForm);
                    this.isSubmitted = false;
                });
            }
        }
    }

    totalAmountWords(amount) {
        if (amount) {
            const numberToWords = new NumberToWordsPipe();
            this.schedulePayersCustomerForm.patchValue({
                'totalAmountInWords': numberToWords.transform(parseInt(this.schedulePayersCustomerForm.value.amount))
            });
        }
    }

    getEmployees(): void {
        this.employees = [];
        this.employeesService.getEmployees({page: -1}).subscribe(data => {
            this.employees = data.items;
        });
    }

    selectPayerCustomer() {
        this.dialogRef = this._matDialog.open(SelectPayersCustomerComponent, {
            panelClass: 'transaction-items-form-dialog',
        });
        this.dialogRef.afterClosed().subscribe((response) => {
            if (!response) {
                return;
            }
            this.customers = [{
                id: response.id,
                name: response.id,
            }];
            this.schedulePayersCustomerForm.patchValue({
                'companyId': response.id,
                'payerName': response.name
            });
        });
    }

    selectRadio(mode) {
        this.payMode = mode;
    }
}
