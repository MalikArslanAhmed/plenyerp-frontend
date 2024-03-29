import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {FormGroup} from "@angular/forms";
import {fuseAnimations} from "../../../../../@fuse/animations";
import {StoreSetupUnitOfMeasuresCreateComponent} from "../store-setup-unit-of-measures-create/store-setup-unit-of-measures-create.component";
import { StoreSetupUnitOfMeasuresService } from 'app/shared/services/store-setup-unit-of-measures.service';
import {PageEvent} from '@angular/material/paginator';
import { DeleteListModalComponent } from '../../delete-list-modal/delete-list-modal.component';
import { PermissionConstant } from 'app/shared/constants/permission-constant';

@Component({
    selector: 'app-store-setup-unit-of-measures-list',
    templateUrl: './store-setup-unit-of-measures-list.component.html',
    styleUrls: ['./store-setup-unit-of-measures-list.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class StoreSetupUnitOfMeasuresListComponent implements OnInit {
    unitOfMeasures = [];
    displayedColumns = ['id', 'name', 'status', 'actions'];
    dialogRef: any;
    pagination = {
        page: 1,
        total: null,
        perpage: 15,
        pages: null
    };
    pageEvent: PageEvent;
    
    permissionEditStoreSetupUnitOfMeasures = [PermissionConstant.STORE_SETUP_UNIT_OF_MEASURES_EDIT];
    permissionDeleteStoreSetupUnitOfMeasures = [PermissionConstant.STORE_SETUP_UNIT_OF_MEASURES_DELETE];

    constructor(private storeSetupUnitOfMeasuresService: StoreSetupUnitOfMeasuresService,
                private _matDialog: MatDialog) {
    }

    ngOnInit(): void {
        this.getStoreSetupUnitOfMeasure();
    }

    getStoreSetupUnitOfMeasure() {
        this.unitOfMeasures = [];
        this.storeSetupUnitOfMeasuresService.getStoreSetupUnitOfMeasures({page: this.pagination.page}).subscribe(data => {
            this.unitOfMeasures = data.items;
            this.pagination.page = data.page;
            this.pagination.total = data.total;

            if (this.unitOfMeasures && this.unitOfMeasures.length > 0) {
                let i = 1;
                this.unitOfMeasures.forEach(qualification => {
                    qualification['sno'] = i;
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
                this.deleteUnitOfMeasures(items.id);
            }
        });

    }

    deleteUnitOfMeasures(id) {
        this.storeSetupUnitOfMeasuresService.deleteStoreSetupUnitOfMeasures(id).subscribe(data => {
            if (data) {
                this.getStoreSetupUnitOfMeasure();
            }
        })
    }

    editStore(store) {
        this.dialogRef = this._matDialog.open(StoreSetupUnitOfMeasuresCreateComponent, {
            panelClass: 'contact-form-dialog',
            data: {action: 'EDIT', store: store},
        });
        this.dialogRef.afterClosed().subscribe((response: FormGroup) => {
            if (!response) {
                return;
            }
            this.getStoreSetupUnitOfMeasure();
        });
    }
    onPageChange(page) {
        this.pagination.page = page.pageIndex + 1;
        this.getStoreSetupUnitOfMeasure();
    }
}
