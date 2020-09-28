import {Component, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {FuseSidebarService} from "../../../../@fuse/components/sidebar/sidebar.service";
import {MatDialog} from "@angular/material/dialog";
import {FormGroup} from "@angular/forms";
import {fuseAnimations} from "../../../../@fuse/animations";
import {CurrenciesCreateComponent} from './currencies-create/currencies-create.component';

@Component({
    selector: 'app-currencies',
    templateUrl: './currencies.component.html',
    styleUrls: ['./currencies.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class CurrenciesComponent implements OnInit {
    dialogRef: any;

    // @ViewChild(CensuresListComponent) getCensures: CensuresListComponent;

    constructor(
        private _fuseSidebarService: FuseSidebarService,
        private _matDialog: MatDialog) {
    }

    ngOnInit(): void {
    }

    addCurrency() {
        this.dialogRef = this._matDialog.open(CurrenciesCreateComponent, {
            panelClass: 'contact-form-dialog',
            data: {action: 'CREATE'}
        });
        this.dialogRef.afterClosed().subscribe((response: FormGroup) => {
            if (!response) {
                return;
            }
            // this.getCensures.getCensures();
        });
    }
}
