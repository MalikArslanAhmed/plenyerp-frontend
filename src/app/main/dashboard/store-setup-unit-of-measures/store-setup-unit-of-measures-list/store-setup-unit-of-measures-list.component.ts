import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {FormGroup} from "@angular/forms";
import {fuseAnimations} from "../../../../../@fuse/animations";
import {StoreSetupUnitOfMeasuresCreateComponent} from "../store-setup-unit-of-measures-create/store-setup-unit-of-measures-create.component";
import { StoreSetupUnitOfMeasuresService } from 'app/shared/services/store-setup-unit-of-measures.service';

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

    constructor(private storeSetupUnitOfMeasuresService: StoreSetupUnitOfMeasuresService,
                private _matDialog: MatDialog) {
    }

    ngOnInit(): void {
        this.getStoreSetupUnitOfMeasure();
    }

    getStoreSetupUnitOfMeasure() {
        this.storeSetupUnitOfMeasuresService.getStoreSetupUnitOfMeasures({'page': -1}).subscribe(data => {
            this.unitOfMeasures = data.items;

            if (this.unitOfMeasures && this.unitOfMeasures.length > 0) {
                let i = 1;
                this.unitOfMeasures.forEach(qualification => {
                    qualification['sno'] = i;
                    i++;
                });
            }
        });
    }

    deleteStore(id) {
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
}
