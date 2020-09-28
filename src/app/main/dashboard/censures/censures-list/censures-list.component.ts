import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {FormGroup} from '@angular/forms';
import {CensuresService} from '../../../../shared/services/censures.service';
import {CensuresCreateComponent} from '../censures-create/censures-create.component';
import {fuseAnimations} from '../../../../../@fuse/animations';
import {PageEvent} from '@angular/material/paginator';
import {DeleteListModalComponent} from '../../delete-list-modal/delete-list-modal.component';

@Component({
    selector: 'app-censures-list',
    templateUrl: './censures-list.component.html',
    styleUrls: ['./censures-list.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class CensuresListComponent implements OnInit {
    censures = [];
    displayedColumns = ['id', 'name', 'status', 'actions'];
    dialogRef: any;
    pagination = {
        page: 1,
        total: null,
        perpage: 15,
        pages: null
    };
    pageEvent: PageEvent;

    constructor(private censuresService: CensuresService,
                private _matDialog: MatDialog) {
    }

    ngOnInit(): void {
        this.getCensures();
    }

    getCensures() {
        this.censures = [];
        this.censuresService.getCensures({page: this.pagination.page}).subscribe(data => {
            this.censures = data.items;

            if (this.censures && this.censures.length > 0) {
                let i = 1;
                this.censures.forEach(censure => {
                    censure['sno'] = i;
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
                this.deleteCensure(items.id);
            }
        });

    }

    deleteCensure(id) {
        this.censuresService.deleteCensure(id).subscribe(data => {
            if (data) {
                this.getCensures();
            }
        });
    }

    editCensure(censure) {
        this.dialogRef = this._matDialog.open(CensuresCreateComponent, {
            panelClass: 'contact-form-dialog',
            data: {action: 'EDIT', censure: censure},
        });
        this.dialogRef.afterClosed().subscribe((response: FormGroup) => {
            if (!response) {
                return;
            }
            this.getCensures();
        });
    }

    onPageChange(page) {
        this.pagination.page = page.pageIndex + 1;
        this.getCensures();
    }
}
