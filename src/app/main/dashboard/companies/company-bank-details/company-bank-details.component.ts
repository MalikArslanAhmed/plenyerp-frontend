import {Component, Inject, OnInit, ViewEncapsulation} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {EmployeeService} from "../../../../shared/services/employee.service";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {fuseAnimations} from "../../../../../@fuse/animations";

@Component({
    selector: 'app-company-bank-details',
    templateUrl: './company-bank-details.component.html',
    styleUrls: ['./company-bank-details.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class CompanyBankDetailsComponent implements OnInit {
    action: any;
    employeeBankDetailsForm: FormGroup;
    isSubmitted = false;
    updateData: any;

    currentEmployee: any;
    // indexNo = 1;

    bankList = [];
    displayedBankColumns = ['id', 'title', 'number', 'type', 'name', 'branch', 'actions'];
    banksName;
    selectedBankBranchName;
    selectedBankList;

    editAction = false;

    constructor(private employeesService: EmployeeService,
                public matDialogRef: MatDialogRef<CompanyBankDetailsComponent>,
                @Inject(MAT_DIALOG_DATA) private _data: any,
                private fb: FormBuilder) {
        this.action = _data.action;
        this.currentEmployee = _data.selectedEmployee;
        // if (this.action === 'EDIT') {
        //   if (_data.bankDetails) {
        //     this.updateData = _data;
        //   }
        // }
    }

    ngOnInit(): void {
        this.refresh();
        this.getBankDetailsList(this.currentEmployee.id);
        this.getBanksName();
    }

    refresh() {
        this.employeeBankDetailsForm = this.fb.group({
            employeeId: [this.currentEmployee.id, Validators.required],
            name: [this.currentEmployee.firstName, Validators.required],
            // index: [this.indexNo, Validators.required],
            title: ['', Validators.required],
            accNumber: ['', Validators.required],
            accType: ['', Validators.required],
            bankName: ['', Validators.required],
            bankBranchName: ['', Validators.required]
        });
    }

    checkForUpdate() {
        if (this.updateData) {
            this.employeeBankDetailsForm.patchValue({
                employeeId: this.updateData.bankDetails.name,
            });
        }
    }

    getBanksName() {
        this.employeesService.getBanksName().subscribe(data => {
            this.banksName = data.items;
        })
    }

    getBankBranchName(bankId) {
        this.employeesService.getBankBranchName(bankId).subscribe(data => {
            this.selectedBankBranchName = data.items;
        })
    }

    getBankDetailsList(empId) {
        this.employeesService.getBankDetailsList(empId, {'page': -1}).subscribe(data => {
            this.bankList = data.items;

            if (this.bankList && this.bankList.length > 0) {
                let i = 1;
                this.bankList.forEach(val => {
                    val['sno'] = i;
                    // this.employeeBankDetailsForm.controls['index'].setValue(i+1);
                    i++;
                });
            }
        });
    }

    saveBankDetails() {
        this.isSubmitted = true;
        if (!this.employeeBankDetailsForm.valid) {
            this.isSubmitted = false;
            return;
        }

        if (this.isSubmitted) {
            const params = {};
            let reqObj = this.employeeBankDetailsForm.value;
            if (reqObj.bankName) {
                params['bankId'] = reqObj.bankName
            }

            if (reqObj.bankBranchName) {
                params['bankBranchId'] = reqObj.bankBranchName
            }

            if (reqObj.title) {
                params['title'] = reqObj.title
            }

            if (reqObj.accNumber) {
                params['number'] = reqObj.accNumber
            }

            if (reqObj.accType) {
                params['type'] = reqObj.accType
            }

            this.employeesService.addBankDetails(this.currentEmployee.id, params).subscribe(data => {
                // this.employeeBankDetailsForm.reset();
                this.employeeBankDetailsForm.controls['title'].reset();
                this.employeeBankDetailsForm.controls['accNumber'].reset();
                this.employeeBankDetailsForm.controls['accType'].reset();
                this.employeeBankDetailsForm.controls['bankName'].reset();
                this.employeeBankDetailsForm.controls['bankBranchName'].reset();
                this.isSubmitted = false;
                this.getBankDetailsList(this.currentEmployee.id);
            });
        }
    }

    updateBankDetails() {
        this.isSubmitted = true;
        if (!this.employeeBankDetailsForm.valid) {
            this.isSubmitted = false;
            return;
        }

        if (this.isSubmitted) {
            const params = {};
            let reqObj = this.employeeBankDetailsForm.value;
            if (reqObj.bankName) {
                params['bankId'] = reqObj.bankName
            }

            if (reqObj.bankBranchName) {
                params['bankBranchId'] = reqObj.bankBranchName
            }

            if (reqObj.title) {
                params['title'] = reqObj.title
            }

            if (reqObj.accNumber) {
                params['number'] = reqObj.accNumber
            }

            if (reqObj.accType) {
                params['type'] = reqObj.accType
            }

            this.employeesService.updateBankDetails(this.currentEmployee.id, this.selectedBankList.id, params).subscribe(data => {
                this.employeeBankDetailsForm.controls['title'].reset();
                this.employeeBankDetailsForm.controls['accNumber'].reset();
                this.employeeBankDetailsForm.controls['accType'].reset();
                this.employeeBankDetailsForm.controls['bankName'].reset();
                this.employeeBankDetailsForm.controls['bankBranchName'].reset();
                this.isSubmitted = false;
                this.editAction = false;
                this.getBankDetailsList(this.currentEmployee.id);
            });
        }
    }

    editBank(bank) {
        this.getBankBranchName(bank.bankId);
        this.editAction = true;
        this.selectedBankList = bank;
        this.employeeBankDetailsForm.patchValue({
            // index: bank.indexNo,
            title: bank.title,
            accNumber: bank.number,
            accType: bank.type,
            bankName: bank.bankId,
            bankBranchName: bank.bankBranchId
        });
    }


    deleteBank(bankId) {
        this.employeesService.deleteBankDetails(bankId).subscribe(data => {
            if (data) {
                this.getBankDetailsList(this.currentEmployee.id);
            }
        });
    }
}
