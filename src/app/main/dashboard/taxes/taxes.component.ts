import {Component, OnInit, ViewEncapsulation, ViewChild} from '@angular/core';
import {fuseAnimations} from '../../../../@fuse/animations';
import {FuseSidebarService} from '../../../../@fuse/components/sidebar/sidebar.service';
import {MatDialog} from '@angular/material/dialog';
import {TaxesCreateComponent} from './taxes-create/taxes-create.component';
import {FormGroup} from '@angular/forms';
import {TaxesListComponent} from './taxes-list/taxes-list.component';
import {PermissionConstant} from '../../../shared/constants/permission-constant';

@Component({
    selector: 'app-taxes',
    templateUrl: './taxes.component.html',
    styleUrls: ['./taxes.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class TaxesComponent implements OnInit {
    dialogRef: any;
    permissionAddTaxes = [PermissionConstant.TAXES_CREATE];
    @ViewChild(TaxesListComponent) getTaxesList: TaxesListComponent;

    constructor(
        private _fuseSidebarService: FuseSidebarService,
        private _matDialog: MatDialog) {
    }

    ngOnInit(): void {
    }

    addTax(): void {
        this.dialogRef = this._matDialog.open(TaxesCreateComponent, {
            panelClass: 'contact-form-dialog',
            data: {action: 'CREATE'}
        });
        this.dialogRef.afterClosed().subscribe((response: FormGroup) => {
            if (!response) {
                return;
            }
            this.getTaxesList.getTaxesList();
        });
    }
}

