import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {PageEvent} from "@angular/material/paginator";
import {MatDialog} from "@angular/material/dialog";
import {DeleteListModalComponent} from "../../delete-list-modal/delete-list-modal.component";
import {FormGroup} from "@angular/forms";
import {fuseAnimations} from "../../../../../@fuse/animations";
import {CurrencyService} from "../../../../shared/services/currency.service";
import {CurrenciesCreateComponent} from '../currencies-create/currencies-create.component';
import {PermissionConstant} from '../../../../shared/constants/permission-constant';

@Component({
    selector: 'app-currencies-list',
    templateUrl: './currencies-list.component.html',
    styleUrls: ['./currencies-list.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class CurrenciesListComponent implements OnInit {

    permissionEditCur = [PermissionConstant.SETUP_CURRENCIES_EDIT];
    permissionDelCur = [PermissionConstant.SETUP_CURRENCIES_DELETE];
    currencies = [];
    displayedColumns = ['id', 'code', 'currencyName', 'currencyChange', 'currentRate', 'sign', 'countryCode', 'actions'];
    dialogRef: any;
    pagination = {
        page: 1,
        total: null,
        perpage: 15,
        pages: null
    };
    pageEvent: PageEvent;

    constructor(private currencyService: CurrencyService,
                private _matDialog: MatDialog) {
    }

    ngOnInit(): void {
        this.getCurrencies();
    }

    getCurrencies() {
        this.currencies = [];
        this.currencyService.getCurrency({page: this.pagination.page}).subscribe(data => {
            this.currencies = data.items;

            if (this.currencies && this.currencies.length > 0) {
                let i = 1;
                this.currencies.forEach(currency => {
                    currency['sno'] = i;
                    i++;
                });
            }
            this.pagination.page = data.page;
            this.pagination.total = data.total;
        });
    }

    deleteItemModal(items) {
        this.dialogRef = this._matDialog.open(DeleteListModalComponent, {
            panelClass: 'delete-items-dialog',
            data: {data: items}
        });
        this.dialogRef.afterClosed().subscribe((response: boolean) => {
            if (response) {
                this.deleteCurrency(items.id);
            }
        });

    }

    deleteCurrency(id) {
        this.currencyService.deleteCurrency(id).subscribe(data => {
            if (data) {
                this.getCurrencies();
            }
        });
    }

    editCurrency(currency) {
        this.dialogRef = this._matDialog.open(CurrenciesCreateComponent, {
            panelClass: 'contact-form-dialog',
            data: {action: 'EDIT', currency: currency},
        });
        this.dialogRef.afterClosed().subscribe((response: FormGroup) => {
            if (!response) {
                return;
            }
            this.getCurrencies();
        });
    }

    onPageChange(page) {
        this.pagination.page = page.pageIndex + 1;
        this.getCurrencies();
    }
}
