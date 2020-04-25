import {Component, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {FuseSidebarService} from "../../../../@fuse/components/sidebar/sidebar.service";
import {MatDialog} from "@angular/material/dialog";
import {FormGroup} from "@angular/forms";
import {fuseAnimations} from "../../../../@fuse/animations";
import {CensuresListComponent} from './censures-list/censures-list.component';
import {CensuresCreateComponent} from './censures-create/censures-create.component';

@Component({
    selector: 'app-censures',
    templateUrl: './censures.component.html',
    styleUrls: ['./censures.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class CensuresComponent implements OnInit {
    dialogRef: any;
    @ViewChild(CensuresListComponent) getCensures: CensuresListComponent;

    constructor(
        private _fuseSidebarService: FuseSidebarService,
        private _matDialog: MatDialog) {
    }

    ngOnInit(): void {
    }

    addCensures() {
        this.dialogRef = this._matDialog.open(CensuresCreateComponent, {
            panelClass: 'contact-form-dialog',
            data: {action: 'CREATE'}
        });
        this.dialogRef.afterClosed().subscribe((response: FormGroup) => {
            if (!response) {
                return;
            }
            this.getCensures.getCensures();
        });
    }
}
