import {Component, OnInit, ViewChild, ViewEncapsulation, Output, EventEmitter} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {FormGroup} from '@angular/forms';
import {StatesCreateComponent} from '../states-create/states-create.component';
import {fuseAnimations} from '../../../../../../@fuse/animations';
import {ContactInfoService} from '../../../../../shared/services/contact-info.service';
import {PageEvent} from '@angular/material/paginator';
import { DeleteListModalComponent } from 'app/main/dashboard/delete-list-modal/delete-list-modal.component';
import { PermissionConstant } from 'app/shared/constants/permission-constant';

@Component({
    selector: 'app-states-list',
    templateUrl: './states-list.component.html',
    styleUrls: ['./states-list.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class StatesListComponent implements OnInit {
    statesList = [];
    displayedStatesColumns = ['id', 'country', 'region', 'name', 'status', 'actions'];
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

    permissionEditStates = [PermissionConstant.STATES_EDIT];
    permissionDeleteStates = [PermissionConstant.STATES_DELETE];

    constructor(private contactInfoService: ContactInfoService,
                private _matDialog: MatDialog) {
    }

    ngOnInit(): void {
        this.getStatesList();
    }

    getStatesList() {
        this.statesList = [];
        this.contactInfoService.getStateList({page: this.pagination.page}).subscribe(data => {
            this.statesList = data.items;
            this.pagination.page = data.page;
            this.pagination.total = data.total;
            if (this.statesList && this.statesList.length > 0) {
                let i = 1;
                this.statesList.forEach(val => {
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
                this.deleteStates(items.id);
            }
        });

    } 

    deleteStates(id) {
        this.contactInfoService.deleteStates(id).subscribe(data => {
            if (data) {
                this.getStatesList();
            }
        });
    }

    editStates(state) {
        this.dialogRef = this._matDialog.open(StatesCreateComponent, {
            panelClass: 'contact-form-dialog',
            data: {action: 'EDIT', state: state},
        });
        this.dialogRef.afterClosed().subscribe((response: FormGroup) => {
            if (!response) {
                return;
            }
            this.getStatesList();
        });
    }
    onPageChange(page) {
        this.pagination.page = page.pageIndex + 1;
        this.getStatesList();
    }
}
