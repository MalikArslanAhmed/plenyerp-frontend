import {Component, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {FuseSidebarService} from '../../../../../@fuse/components/sidebar/sidebar.service';
import {MatDialog} from '@angular/material/dialog';
import {FormGroup} from '@angular/forms';
import {LgaCreateComponent} from './lga-create/lga-create.component';
import {LgaListComponent} from './lga-list/lga-list.component';
import {fuseAnimations} from '../../../../../@fuse/animations';

@Component({
    selector: 'app-lga',
    templateUrl: './lga.component.html',
    styleUrls: ['./lga.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class LgaComponent implements OnInit {
    dialogRef: any;
    @ViewChild(LgaListComponent) getLgaList: LgaListComponent;

    constructor(
        private _fuseSidebarService: FuseSidebarService,
        private _matDialog: MatDialog) {
    }

    ngOnInit(): void {
    }

    addLga() {
        this.dialogRef = this._matDialog.open(LgaCreateComponent, {
            panelClass: 'contact-form-dialog',
            data: {action: 'CREATE'}
        });
        this.dialogRef.afterClosed().subscribe((response: FormGroup) => {
            if (!response) {
                return;
            }
            this.getLgaList.getLgaList();
        });
    }
}
