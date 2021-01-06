import {Component, EventEmitter, OnInit, Output, ViewEncapsulation} from '@angular/core';
import {PageEvent} from "@angular/material/paginator";
import {CashbookService} from "../../../../../shared/services/cashbook.service";
import {Router} from "@angular/router";
import {MatDialog} from "@angular/material/dialog";
import {DeleteListModalComponent} from "../../../delete-list-modal/delete-list-modal.component";
import {CashbookCreateComponent} from "../../cashbook/cashbook-create/cashbook-create.component";
import {FormGroup} from "@angular/forms";
import {fuseAnimations} from "../../../../../../@fuse/animations";

@Component({
    selector: 'app-on-mandate-list',
    templateUrl: './on-mandate-list.component.html',
    styleUrls: ['./on-mandate-list.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class OnMandateListComponent implements OnInit {
    cashbookAccountList = [];
    displayedCountryColumns = ['s_no', 'id', 'title', 'actions'];
    dialogRef: any;
    selectIndex = 0;
    pagination = {
        page: 1,
        total: null,
        perpage: 15,
        pages: null
    };
    pageEvent: PageEvent;
    @Output() selectedIndexChange: EventEmitter<number>;

    constructor(private cashbookService: CashbookService,
                private router: Router,
                private _matDialog: MatDialog) {
    }

    ngOnInit(): void {
        this.getcashbookList();
    }

    getcashbookList() {
        this.cashbookAccountList = [];
        this.cashbookService.list({page: this.pagination.page}).subscribe(data => {
            this.cashbookAccountList = data.items;
            this.pagination.page = data.page;
            this.pagination.total = data.total;
            if (this.cashbookAccountList && this.cashbookAccountList.length > 0) {
                let i = 1;
                this.cashbookAccountList.forEach(val => {
                    val['sno'] = i;
                    i++;
                });
            }
        });
    }


    deleteItemModel(items) {
        this.dialogRef = this._matDialog.open(DeleteListModalComponent, {
            panelClass: 'delete-items-dialog',
            data: {data: items}
        });
        this.dialogRef.afterClosed().subscribe((response: boolean) => {
            if (response) {
                this.deleteCashbook(items.id);
            }
        });

    }

    deleteCashbook(id) {
        this.cashbookService.delete(id).subscribe(data => {
            if (data) {
                this.getcashbookList();
            }
        });
    }

    editCashbook(cashbook) {
        this.dialogRef = this._matDialog.open(CashbookCreateComponent, {
            panelClass: 'contact-form-dialog',
            data: {action: 'EDIT', cashbook: cashbook},
        });
        this.dialogRef.afterClosed().subscribe((response: FormGroup) => {
            if (!response) {
                return;
            }
            this.getcashbookList();
        });
    }

    onPageChange(page) {
        this.pagination.page = page.pageIndex + 1;
        this.getcashbookList();
    }
}
