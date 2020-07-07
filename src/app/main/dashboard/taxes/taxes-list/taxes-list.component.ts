import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {fuseAnimations} from '../../../../../@fuse/animations';
import {TaxesService} from '../../../../shared/services/taxes.service';
import {TaxesCreateComponent} from '../taxes-create/taxes-create.component';
import {FormBuilder, FormGroup} from '@angular/forms';
import {MatDialog} from '@angular/material/dialog';
import {PageEvent} from '@angular/material/paginator';
import { DeleteListModalComponent } from '../../delete-list-modal/delete-list-modal.component';

@Component({
    selector: 'app-taxes-list',
    templateUrl: './taxes-list.component.html',
    styleUrls: ['./taxes-list.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})

export class TaxesListComponent implements OnInit {
    taxesList = [];
    displayedColumns = ['SN', 'id', 'taxTitle', 'taxPercentage', 'GLCode', 'benCode', 'benName', 'actions'];
    dialogRef: any;
    itemsFilterForm: FormGroup;
    pagination = {
        page: 1,
        total: null,
        perpage: 15,
        pages: null
    };
    pageEvent: PageEvent;
    constructor(private taxesService: TaxesService,
                private fb: FormBuilder,
                private _matDialog: MatDialog) {
    }

    ngOnInit(): void {
        this.refresh();
        this.getTaxesList();
    }

    refresh() {
        this.itemsFilterForm = this.fb.group({
            search: [''],
        });
    }

    getTaxesList(params = {}): void {
        this.taxesList = [
            // {id:1,personnelFileNumber:'1',lastName:'20',firstName:'gl1',employeePersonalDetails:[{phone:124}],employeeJobProfiles:[{department:[{name:'dept1'}]}]},
            // {id:1,personnelFileNumber:'1',lastName:'20',firstName:'gl2',employeePersonalDetails:[{phone:124}],employeeJobProfiles:[{department:[{name:'dept1'}]}]}
        ];
      
        this.taxesService.getTaxesList(params).subscribe(data => {
            this.taxesList = data.items;           
            this.pagination.page = data.page;
            this.pagination.total = data.total;
            if (this.taxesList && this.taxesList.length > 0) {
                let i = 1;
                this.taxesList.forEach(tax => {
                    tax['sno'] = i;
                    i++;
                });
            }
        });
    }

    deleteItemModal(items): void {
        this.dialogRef = this._matDialog.open(DeleteListModalComponent, {
            panelClass: 'delete-items-dialog',
            data: {data: items}
        });
        this.dialogRef.afterClosed().subscribe((response: boolean) => {
            if (response) {
                this.deleteTax(items.id);
            }
        });
    }

    deleteTax(id): void {
        this.taxesService.deleteTax(id).subscribe(data => {
            if (data) {
                this.getTaxesList();
            }
        });
    }

    editTax(tax): void {
        this.dialogRef = this._matDialog.open(TaxesCreateComponent, {
            panelClass: 'contact-form-dialog',
            data: {action: 'EDIT', tax: tax},
        });
        this.dialogRef.afterClosed().subscribe((response: FormGroup) => {
            if (!response) {
                return;
            }
            this.getTaxesList();
        });
    }

    onPageChange(page) {
        this.pagination.page = page.pageIndex + 1;
        this.getTaxesList();
    }

    getItems(params) {
        this.getTaxesList(params);
    }
}


