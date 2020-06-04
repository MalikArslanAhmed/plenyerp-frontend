import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {QualificationService} from "../../../../shared/services/qualification.service";
import {MatDialog} from "@angular/material/dialog";
import {StoreSetupStoresCreateComponent} from "../../store-setup-stores/store-setup-stores-create/store-setup-stores-create.component";
import {FormGroup} from "@angular/forms";
import {fuseAnimations} from "../../../../../@fuse/animations";

@Component({
    selector: 'app-store-setup-items-list',
    templateUrl: './store-setup-items-list.component.html',
    styleUrls: ['./store-setup-items-list.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class StoreSetupItemsListComponent implements OnInit {
    items = [];
    displayedColumns = ['id', 'name', 'status', 'actions'];
    dialogRef: any;

    constructor(private qualificationService: QualificationService,
                private _matDialog: MatDialog) {
    }

    ngOnInit(): void {
        this.getStores();
    }

    getStores() {
        this.qualificationService.getQualifications({'page': -1}).subscribe(data => {
            this.items = data.items;

            if (this.items && this.items.length > 0) {
                let i = 1;
                this.items.forEach(qualification => {
                    qualification['sno'] = i;
                    i++;
                });
            }
        });
    }

    deleteStore(id) {
        this.qualificationService.deleteQualification(id).subscribe(data => {
            if (data) {
                this.getStores();
            }
        })
    }

    editStore(store) {
        this.dialogRef = this._matDialog.open(StoreSetupStoresCreateComponent, {
            panelClass: 'contact-form-dialog',
            data: {action: 'EDIT', store: store},
        });
        this.dialogRef.afterClosed().subscribe((response: FormGroup) => {
            if (!response) {
                return;
            }
            this.getStores();
        });
    }
}
