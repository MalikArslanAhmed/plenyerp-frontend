import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {FormGroup} from '@angular/forms';
import {StatusService} from '../../../../shared/services/status.service';
import {StatusCreateComponent} from '../status-create/status-create.component';
import {fuseAnimations} from '../../../../../@fuse/animations';
import {PageEvent} from '@angular/material/paginator';
import { DeleteListModalComponent } from '../../delete-list-modal/delete-list-modal.component';

@Component({
    selector: 'app-status-list',
    templateUrl: './status-list.component.html',
    styleUrls: ['./status-list.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class StatusListComponent implements OnInit {
    statuses = [];
    displayedColumns = ['id', 'name', 'status', 'actions'];
    dialogRef: any;
    pagination = {
        page: 1,
        total: null,
        perpage: 15,
        pages: null
    };
    pageEvent: PageEvent;
    constructor(private statusService: StatusService,
                private _matDialog: MatDialog) {
    }

    ngOnInit(): void {
        this.getStatus();
    }

    getStatus() {
        this.statuses = [];
        this.statusService.getStatus({page: this.pagination.page}).subscribe(data => {
            this.statuses = data.items;

            if (this.statuses && this.statuses.length > 0) {
                let i = 1;
                this.statuses.forEach(status => {
                    status['sno'] = i;
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
                this.deleteStatus(items.id);
            }
        });

    } 

    deleteStatus(id) {
        this.statusService.deleteStatus(id).subscribe(data => {
            if (data) {
                this.getStatus();
            }
        })
    }

    editStatus(status) {
        this.dialogRef = this._matDialog.open(StatusCreateComponent, {
            panelClass: 'contact-form-dialog',
            data: {action: 'EDIT', status: status},
        });
        this.dialogRef.afterClosed().subscribe((response: FormGroup) => {
            if (!response) {
                return;
            }
            this.getStatus();
        });
    }
    onPageChange(page) {
        this.pagination.page = page.pageIndex + 1;
        this.getStatus();
    }
}
