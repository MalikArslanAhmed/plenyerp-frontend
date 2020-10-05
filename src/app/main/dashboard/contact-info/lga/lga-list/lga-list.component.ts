import {Component, OnInit, ViewChild, ViewEncapsulation, Output, EventEmitter} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {FormGroup} from '@angular/forms';
import {LgaCreateComponent} from '../lga-create/lga-create.component';
import {fuseAnimations} from '../../../../../../@fuse/animations';
import {ContactInfoService} from '../../../../../shared/services/contact-info.service';
import {PageEvent} from '@angular/material/paginator';
import { DeleteListModalComponent } from 'app/main/dashboard/delete-list-modal/delete-list-modal.component';
import { PermissionConstant } from 'app/shared/constants/permission-constant';

@Component({
    selector: 'app-lga-list',
    templateUrl: './lga-list.component.html',
    styleUrls: ['./lga-list.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class LgaListComponent implements OnInit {
    lgaList = [];
    displayedLgaColumns = ['id', 'country', 'region', 'state', 'name', 'status', 'actions'];
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

    permissionEditLGA = [PermissionConstant.LGA_EDIT];
    permissionDeleteLGA = [PermissionConstant.LGA_DELETE];
    
    constructor(private contactInfoService: ContactInfoService,
                private _matDialog: MatDialog) {
    }

    ngOnInit(): void {
        this.getLgaList();
    }

    getLgaList() {
        this.lgaList = [];
        this.contactInfoService.getLgaList({page: this.pagination.page}).subscribe(data => {
            this.lgaList = data.items;
            this.pagination.page = data.page;
            this.pagination.total = data.total;
            if (this.lgaList && this.lgaList.length > 0) {
                let i = 1;
                this.lgaList.forEach(val => {
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
                this.deleteLga(items.id);
            }
        });

    } 
    deleteLga(id) {
        this.contactInfoService.deleteLga(id).subscribe(data => {
            if (data) {
                this.getLgaList();
            }
        });
    }

    editLga(lga) {
        this.dialogRef = this._matDialog.open(LgaCreateComponent, {
            panelClass: 'contact-form-dialog',
            data: {action: 'EDIT', lga: lga},
        });
        this.dialogRef.afterClosed().subscribe((response: FormGroup) => {
            if (!response) {
                return;
            }
            this.getLgaList();
        });
    }
    onPageChange(page) {
        this.pagination.page = page.pageIndex + 1;
        this.getLgaList();
    }

}
