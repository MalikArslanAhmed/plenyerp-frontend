import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {fuseAnimations} from '../../../../@fuse/animations';
import {BanksService} from '../../../shared/services/banks.service';
import {CompaniesCreateComponent} from '../companies/companies-create/companies-create.component';
import {FormGroup} from '@angular/forms';
import {MatDialog} from '@angular/material/dialog';
import {BankCreateComponent} from './bank-create/bank-create.component';
import {FuseSidebarService} from '../../../../@fuse/components/sidebar/sidebar.service';
import {BranchCreateComponent} from './branch-create/branch-create.component';

@Component({
    selector: 'app-banks',
    templateUrl: './banks.component.html',
    styleUrls: ['./banks.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class BanksComponent implements OnInit {
    banks = [
        // {
        //     'sno': 1,
        //     'bankId': 1,
        //     'title': 'HDFC Bank',
        //     'isActive': 'Active',
        //     'branches': [
        //         {
        //             'sno': 1,
        //             'branchId': 1,
        //             'title': 'HDFC Bank 1',
        //             'address': 'Address 1',
        //             'sortCode': 'HDMT',
        //             'isActive': 'Active',
        //         },
        //         {
        //             'sno': 2,
        //             'branchId': 2,
        //             'title': 'HDFC Bank 2',
        //             'address': 'Address 2',
        //             'sortCode': 'HDCC',
        //             'isActive': 'Active',
        //         }
        //     ]
        // }
    ];
    displayedColumns = ['id', 'bankId', 'title', 'isActive', 'action'];
    displayedBranchColumns = ['id', 'title', 'address', 'sortCode', 'action'];
    bankBranch = [];
    pagination = {
        page: 1,
        total: null,
        perpage: 15,
        pages: null
    };
    paginationBranches = {
        page: 1,
        total: null,
        perpage: 15,
        pages: null
    };
    selectedBankId;
    dialogRef: any;

    constructor(private bankService: BanksService,
                private _fuseSidebarService: FuseSidebarService,
                private _matDialog: MatDialog) {
    }

    ngOnInit(): void {
        this.getBanksList();
    }

    getBanksList() {
        this.bankService.getBanks({page: this.pagination.page, perpage: this.pagination.perpage}).subscribe(data => {
            this.banks = data.items;
            this.pagination.page = data.page;
            this.pagination.total = data.total;
            if (this.banks && this.banks.length > 0) {
                let i = 1;
                this.banks.forEach(item => {
                    item['sno'] = i;
                    i++;
                });
                this.selectBranch(this.banks[0]);
            }

        });
    }

    deleteBank(bank) {
        this.bankService.deleteBanks(bank.id).subscribe(item => {
            this.getBanksList();
            this.getBranches();
        });
    }

    selectBranch(bankBranch) {
        this.selectedBankId = bankBranch.id;
        this.banks.forEach(v => {
            if (this.selectedBankId === v.id) {
                v['isSelected'] = true;
            } else {
                v['isSelected'] = false;
            }
        });
        // console.log(bankBranch);
        this.getBranches();

    }

    getBranches() {
        this.bankService.getBranches(this.selectedBankId, {page: this.paginationBranches.page, perpage: this.pagination.perpage}).subscribe(data => {
            this.bankBranch = data.items;
            this.paginationBranches.page = data.page;
            this.paginationBranches.total = data.total;
            if (this.bankBranch && this.bankBranch.length > 0) {
                let i = 1;
                this.bankBranch.forEach(item => {
                    item['sno'] = i;
                    i++;
                });
            }
        });
    }

    deleteBranch(branch) {
        this.bankService.deleteBranch(this.selectedBankId, branch.id).subscribe(item => {
            this.getBranches();
        });
    }

    onPageChange(page) {
        this.pagination.page = page.pageIndex + 1;
        this.getBanksList();
    }

    onBranchPageChange(page) {
        this.paginationBranches.page = page.pageIndex + 1;
        this.getBranches();
    }

    addBanks() {
        this.dialogRef = this._matDialog.open(BankCreateComponent, {
            panelClass: 'contact-form-dialog',
            data: {action: 'CREATE'}
        });
        this.dialogRef.afterClosed().subscribe((response: FormGroup) => {
            if (!response) {
                return;
            }
            this.getBanksList();
        });
    }

    editBank(bank): void {
        this.dialogRef = this._matDialog.open(BankCreateComponent, {
            panelClass: 'contact-form-dialog',
            data: {action: 'EDIT', bank: bank},
        });
        this.dialogRef.afterClosed().subscribe((response: FormGroup) => {
            if (!response) {
                return;
            }
            this.getBanksList();
        });
    }

    addBranch() {
        if (!this.selectedBankId) {
            return;
        }
        this.dialogRef = this._matDialog.open(BranchCreateComponent, {
            panelClass: 'contact-form-dialog',
            data: {action: 'CREATE', bankId: this.selectedBankId}
        });
        this.dialogRef.afterClosed().subscribe((response: FormGroup) => {
            if (!response) {
                return;
            }
            this.getBranches();
        });
    }

    editBranch(branch) {
        this.dialogRef = this._matDialog.open(BranchCreateComponent, {
            panelClass: 'contact-form-dialog',
            data: {action: 'EDIT', branch: branch, bankId: this.selectedBankId}
        });
        this.dialogRef.afterClosed().subscribe((response: FormGroup) => {
            if (!response) {
                return;
            }
            this.getBranches();
        });
    }
}
