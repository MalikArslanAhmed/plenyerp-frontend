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
    companyeBankDetailsForm: FormGroup;
    isSubmitted = false;
    updateData: any;
    currentCompany: any;
    bankList = [];
    displayedBankColumns = ['id', 'number', 'type', 'name', 'branch', 'isAuthorised', 'actions'];
    banksName;
    selectedBankBranchName;
    selectedBankList;
    editAction = false;

    constructor(private employeesService: EmployeeService,
                public matDialogRef: MatDialogRef<CompanyBankDetailsComponent>,
                @Inject(MAT_DIALOG_DATA) private _data: any,
                private fb: FormBuilder) {
        this.action = _data.action;
        this.currentCompany = _data.selectedCompany;
    }

    ngOnInit(): void {
        this.refresh();
        this.getBankDetailsList(this.currentCompany.id);
        this.getBanksName();
    }

    refresh() {
        this.companyeBankDetailsForm = this.fb.group({
            companyId: [this.currentCompany.id, Validators.required],
            name: [this.currentCompany.name, Validators.required],
            accNumber: ['', Validators.required],
            accType: ['', Validators.required],
            bankName: ['', Validators.required],
            bankBranchName: ['', Validators.required],
            isAuthorised: [false]
        });
    }

    checkForUpdate() {
        if (this.updateData) {
            this.companyeBankDetailsForm.patchValue({
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

    getBankDetailsList(compId) {
        this.employeesService.getCompanyBankDetailsList(compId, {'page': -1}).subscribe(data => {
            this.bankList = data.items;
            if (this.bankList && this.bankList.length > 0) {
                let i = 1;
                this.bankList.forEach(val => {
                    val['sno'] = i;
                    i++;
                });
            }
        });
    }

    saveBankDetails() {
        this.isSubmitted = true;
        if (!this.companyeBankDetailsForm.valid) {
            this.isSubmitted = false;
            return;
        }

        if (this.isSubmitted) {
            const params = {};
            let reqObj = this.companyeBankDetailsForm.value;
            if (reqObj.bankName) {
                params['bankId'] = reqObj.bankName
            }

            if (reqObj.bankBranchName) {
                params['branchId'] = reqObj.bankBranchName
            }

            if (reqObj.isAuthorised) {
                params['isAuthorised'] = reqObj.isAuthorised
            }

            if (reqObj.accNumber) {
                params['bankAccountNumber'] = reqObj.accNumber
            }

            if (reqObj.accType) {
                params['typeOfBankAccount'] = reqObj.accType
            }

            this.employeesService.addCompanyBankDetails(this.currentCompany.id, params).subscribe(data => {
                // this.companyeBankDetailsForm.reset();
                this.companyeBankDetailsForm.controls['accNumber'].reset();
                this.companyeBankDetailsForm.controls['accType'].reset();
                this.companyeBankDetailsForm.controls['bankName'].reset();
                this.companyeBankDetailsForm.controls['bankBranchName'].reset();
                this.companyeBankDetailsForm.controls['isAuthorised'].reset();
                this.isSubmitted = false;
                this.getBankDetailsList(this.currentCompany.id);
            });
        }
    }

    updateBankDetails() {
        this.isSubmitted = true;
        if (!this.companyeBankDetailsForm.valid) {
            this.isSubmitted = false;
            return;
        }

        if (this.isSubmitted) {
            const params = {};
            let reqObj = this.companyeBankDetailsForm.value;
            if (reqObj.bankName) {
                params['bankId'] = reqObj.bankName
            }

            if (reqObj.bankBranchName) {
                params['branchId'] = reqObj.bankBranchName
            }

            if (reqObj.isAuthorised) {
                params['isAuthorised'] = reqObj.isAuthorised
            }

            if (reqObj.accNumber) {
                params['bankAccountNumber'] = reqObj.accNumber
            }

            if (reqObj.accType) {
                params['typeOfBankAccount'] = reqObj.accType
            }
            this.employeesService.updateCompanyBankDetails(this.currentCompany.id, this.selectedBankList.id, params).subscribe(data => {
                this.companyeBankDetailsForm.controls['accNumber'].reset();
                this.companyeBankDetailsForm.controls['accType'].reset();
                this.companyeBankDetailsForm.controls['bankName'].reset();
                this.companyeBankDetailsForm.controls['bankBranchName'].reset();
                this.companyeBankDetailsForm.controls['isAuthorised'].reset();
                this.isSubmitted = false;
                this.selectedBankList = false;
                this.editAction = false;
                this.getBankDetailsList(this.currentCompany.id);
            });
        }
    }

    editBank(bank) {
        this.getBankBranchName(bank.bankId);
        this.editAction = true;
        this.selectedBankList = bank;
        this.companyeBankDetailsForm.patchValue({
            accNumber: bank.bankAccountNumber,
            accType: bank.typeOfBankAccount,
            bankName: bank.bank.id,
            bankBranchName: bank.branchId,
            isAuthorised: bank.isAuthorised
        });
    }


    deleteBank(bankId) {
        this.employeesService.deleteBankDetails(bankId).subscribe(data => {
            if (data) {
                this.getBankDetailsList(this.currentCompany.id);
            }
        });
    }
}
