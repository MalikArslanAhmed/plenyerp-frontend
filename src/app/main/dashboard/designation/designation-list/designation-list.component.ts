import {Component, OnInit, ViewChild, ViewEncapsulation, Output, EventEmitter} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {FormGroup} from '@angular/forms';
import {DesignationCreateComponent} from '../designation-create/designation-create.component';
import {fuseAnimations} from '../../../../../@fuse/animations';
import {ContactInfoService} from '../../../../shared/services/contact-info.service';
import {PageEvent} from '@angular/material/paginator';
import {DeleteListModalComponent} from '../../delete-list-modal/delete-list-modal.component';

@Component({
    selector: 'app-designation-list',
    templateUrl: './designation-list.component.html',
    styleUrls: ['./designation-list.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class DesignationListComponent implements OnInit {
    designationList = [];
    displayedDesignationColumns = ['id', 'name', 'status', 'actions'];
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

    constructor(private contactInfoService: ContactInfoService,
                private _matDialog: MatDialog) {
    }

    ngOnInit(): void {
        this.getDesignationList();
    }

    getDesignationList() {
        this.designationList = [];
        this.contactInfoService.getDesignationList({page: this.pagination.page}).subscribe(data => {
            this.designationList = data.items;
            this.pagination.page = data.page;
            this.pagination.total = data.total;
            if (this.designationList && this.designationList.length > 0) {
                let i = 1;
                this.designationList.forEach(val => {
                    val['sno'] = i;
                    i++;
                });
            }
        });
    }
    deleteItemModal(items) {
        this.dialogRef = this._matDialog.open(DeleteListModalComponent, {
            panelClass: 'delete-items-dialog',
            data: {data: items}
        });
        this.dialogRef.afterClosed().subscribe((response: boolean) => {
            if (response) {
                this.deleteDesignation(items.id);
            }
        });

    }

    deleteDesignation(id) {
        this.contactInfoService.deleteDesignation(id).subscribe(data => {
            if (data) {
                this.getDesignationList();
            }
        });
    }

    editDesignation(designation) {
        this.dialogRef = this._matDialog.open(DesignationCreateComponent, {
            panelClass: 'contact-form-dialog',
            data: {action: 'EDIT', designation: designation},
        });
        this.dialogRef.afterClosed().subscribe((response: FormGroup) => {
            if (!response) {
                return;
            }
            this.getDesignationList();
        });
    }
    onPageChange(page) {
        this.pagination.page = page.pageIndex + 1;
        this.getDesignationList();
    }

}
