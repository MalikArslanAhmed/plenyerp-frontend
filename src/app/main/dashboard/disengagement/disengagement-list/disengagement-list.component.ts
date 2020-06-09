import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {FormGroup} from '@angular/forms';
import {DisengagementsService} from '../../../../shared/services/disengagements.service';
import {DisengagementCreateComponent} from '../disengagement-create/disengagement-create.component';
import {fuseAnimations} from '../../../../../@fuse/animations';
import {PageEvent} from '@angular/material/paginator';
import { DeleteListModalComponent } from '../../delete-list-modal/delete-list-modal.component';

@Component({
    selector: 'app-disengagement-list',
    templateUrl: './disengagement-list.component.html',
    styleUrls: ['./disengagement-list.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class DisengagementListComponent implements OnInit {
    disengagements = [];
    displayedColumns = ['id', 'name', 'status', 'actions'];
    dialogRef: any;
    pagination = {
        page: 1,
        total: null,
        perpage: 15,
        pages: null
    };
    pageEvent: PageEvent;
    constructor(private disengagementService: DisengagementsService,
                private _matDialog: MatDialog) {
    }

    ngOnInit(): void {
        this.getDisengagements();
    }

    getDisengagements() {
        this.disengagements = [];
        this.disengagementService.getDisengagements({page: this.pagination.page}).subscribe(data => {
            this.disengagements = data.items;

            if (this.disengagements && this.disengagements.length > 0) {
                let i = 1;
                this.disengagements.forEach(disengagement => {
                    disengagement['sno'] = i;
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
                this.deleteDisengagement(items.id);
            }
        });

    } 

    deleteDisengagement(id) {
        this.disengagementService.deleteDisengagement(id).subscribe(data => {
            if (data) {
                this.getDisengagements();
            }
        });
    }

    editDisengagement(disengagement) {
        this.dialogRef = this._matDialog.open(DisengagementCreateComponent, {
            panelClass: 'contact-form-dialog',
            data: {action: 'EDIT', disengagement: disengagement},
        });
        this.dialogRef.afterClosed().subscribe((response: FormGroup) => {
            if (!response) {
                return;
            }
            this.getDisengagements();
        });
    }
    onPageChange(page) {
        this.pagination.page = page.pageIndex + 1;
        this.getDisengagements();
    }
}
