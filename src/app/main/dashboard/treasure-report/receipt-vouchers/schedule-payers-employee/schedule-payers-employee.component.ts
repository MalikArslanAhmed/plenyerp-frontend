import {Component, Inject, OnInit, ViewEncapsulation} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";
import {AlertService} from "../../../../../shared/services/alert.service";
import {EmployeeService} from "../../../../../shared/services/employee.service";
import {NumberToWordsPipe} from "../../../../../shared/pipes/number-to-word.pipe";
import {AdminSegmentEmployeeSelectComponent} from "../../default-setting-voucher-info/admin-segment-employee-select/admin-segment-employee-select.component";
import {fuseAnimations} from "../../../../../../@fuse/animations";
import {ReceiptVoucherService} from "../../../../../shared/services/receipt-voucher.service";
import {GlobalService} from "../../../../../shared/services/global.service";

@Component({
    selector: 'app-schedule-payers-employee',
    templateUrl: './schedule-payers-employee.component.html',
    styleUrls: ['./schedule-payers-employee.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class SchedulePayersEmployeeComponent implements OnInit {
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
    payMode: any;
    user: any;

    constructor(public matDialogRef: MatDialogRef<SchedulePayersEmployeeComponent>,
                @Inject(MAT_DIALOG_DATA) private _data: any,
                private fb: FormBuilder,
                private _matDialog: MatDialog,
                private alertService: AlertService,
                private employeesService: EmployeeService,
                private receiptVoucherService: ReceiptVoucherService,
                private globalService: GlobalService) {
        if (_data.action === 'EDIT') {
            this.updateData = _data;
            this.dialogTitle = (_data && _data['report'].types && _data['report'].types.name) ? _data['report'].types.name + ' | RV - Schedule Payers Employee' : '-';
        } else {
            this.payeeData = _data.rv;
            this.dialogTitle = (this.payeeData && this.payeeData.types && this.payeeData.types.name) ? this.payeeData.types.name + ' | RV - Schedule Payers Employee' : '-';
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
        this.schedulePayersEmployeeForm = this.fb.group({
            year: [{'value': '', disabled: true}],
            departmentalNo: [{'value': '', disabled: true}],
            details: [{'value': '', disabled: true}],
            employeeId: [{'value': '', disabled: true}],
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
        this.schedulePayersEmployeeForm.patchValue({
            details: (this.payeeData && this.payeeData.paymentDescription) ? this.payeeData.paymentDescription : '',
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

    patchForm() {
        const numberToWords = new NumberToWordsPipe();
        this.payingOfficers = [{
            'id': (this.updateData && this.updateData['rv'] && this.updateData['rv']['employee'] && this.updateData['rv']['employee'].id) ? this.updateData['rv']['employee'].id : '',
            'name': (this.updateData && this.updateData['rv'] && this.updateData['rv']['employee'] && this.updateData['rv']['employee'].id) ? this.updateData['rv']['employee'].id : '',
        }];
        this.payMode = this.updateData['rv'].payMode;
        this.schedulePayersEmployeeForm.patchValue({
            year: (this.updateData && this.updateData['report']) ? this.updateData['report'].year : '',
            departmentalNo: (this.updateData && this.updateData['report']) ? this.updateData['report'].deptalId : '',
            details: (this.updateData && this.updateData['report']) ? this.updateData['report'].paymentDescription : '',
            employeeId: (this.updateData && this.updateData['rv']) ? this.updateData['rv'].employeeId : '',
            payerName: (this.updateData && this.updateData['rv'] && this.updateData['rv']['employee']) ? this.updateData['rv']['employee'].firstName + ' ' + this.updateData['rv']['employee'].lastName : '',
            amount: (this.updateData && this.updateData['rv']) ? this.updateData['rv'].totalAmount : '',
            totalAmountInWords: numberToWords.transform(parseInt(this.updateData['rv'].totalAmount)),
            lineDetail: (this.updateData && this.updateData['rv']) ? this.updateData['rv'].lineDetail : '',
            instrumentNumber: (this.updateData && this.updateData['rv']) ? this.updateData['rv'].instrumentNumber : '',
            instrumentType: (this.updateData && this.updateData['rv']) ? this.updateData['rv'].instrumentType : '',
            instrumentTellerNumber: (this.updateData && this.updateData['rv']) ? this.updateData['rv'].instrumentTellerNumber : '',
            instrumentIssuedBy: (this.updateData && this.updateData['rv']) ? this.updateData['rv'].instrumentIssuedBy : ''
        });
    }

    savePayersEmployee() {
        this.isSubmitted = true;
        if (!this.schedulePayersEmployeeForm.valid) {
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
                'employeeId': this.schedulePayersEmployeeForm.getRawValue().employeeId ? this.schedulePayersEmployeeForm.getRawValue().employeeId : '',
                'totalAmount': this.schedulePayersEmployeeForm.getRawValue().amount ? this.schedulePayersEmployeeForm.getRawValue().amount : '',
                'year': this.schedulePayersEmployeeForm.getRawValue().year ? this.schedulePayersEmployeeForm.getRawValue().year : '',
                'details': this.schedulePayersEmployeeForm.getRawValue().details ? this.schedulePayersEmployeeForm.getRawValue().details : '',
                'payMode': this.payMode ? this.payMode : '',
                'lineDetail': this.schedulePayersEmployeeForm.getRawValue().lineDetail ? this.schedulePayersEmployeeForm.getRawValue().lineDetail : '',
                'instrumentNumber': this.schedulePayersEmployeeForm.getRawValue().instrumentNumber ? this.schedulePayersEmployeeForm.getRawValue().instrumentNumber : '',
                'instrumentType': this.schedulePayersEmployeeForm.getRawValue().instrumentType ? this.schedulePayersEmployeeForm.getRawValue().instrumentType : '',
                'instrumentTellerNumber': this.schedulePayersEmployeeForm.getRawValue().instrumentTellerNumber ? this.schedulePayersEmployeeForm.getRawValue().instrumentTellerNumber : '',
                'instrumentIssuedBy': this.schedulePayersEmployeeForm.getRawValue().instrumentIssuedBy ? this.schedulePayersEmployeeForm.getRawValue().instrumentIssuedBy : '',
            };
            if (!this.updateData) {
                this.receiptVoucherService.schedulePayer(this.payeeData.id, params).subscribe(data => {
                    this.schedulePayersEmployeeForm.reset();
                    this.matDialogRef.close(this.schedulePayersEmployeeForm);
                    this.isSubmitted = false;
                });
            } else {
                this.receiptVoucherService.updateSchedulePayer(this.payeeData.id, params).subscribe(data => {
                    this.schedulePayersEmployeeForm.reset();
                    this.matDialogRef.close(this.schedulePayersEmployeeForm);
                    this.isSubmitted = false;
                });
            }
        }
    }

    totalAmountWords(amount) {
        if (amount) {
            const numberToWords = new NumberToWordsPipe();
            this.schedulePayersEmployeeForm.patchValue({
                'totalAmountInWords': numberToWords.transform(parseInt(this.schedulePayersEmployeeForm.value.amount))
            });
        }
    }

    getEmployees(): void {
        this.employees = [];
        this.employeesService.getEmployees({page: -1}).subscribe(data => {
            this.employees = data.items;
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
                    payerName: response['empData'].firstName + ' ' + response['empData'].lastName,
                    disabled: true
                });
            } else if (type === 'Select Payeer Employee') {
                this.payingOfficers = [{
                    'name': response['empData'].id,
                    'id': response['empData'].id
                }];
                this.schedulePayersEmployeeForm.patchValue({
                    employeeId: response['empData'].id,
                    payerName: response['empData'].firstName + ' ' + response['empData'].lastName,
                    disabled: true
                });
            } else if (type === 'Select Financial Control') {
                this.financialControllers = [{
                    'name': response['empData'].id,
                    'id': response['empData'].id
                }];
                this.schedulePayersEmployeeForm.patchValue({
                    financialControllerId: response['empData'].id,
                    payerName: response['empData'].firstName + ' ' + response['empData'].lastName,
                    disabled: true
                });
            }
        });
    }

    selectRadio(mode) {
        this.payMode = mode;
    }
}
