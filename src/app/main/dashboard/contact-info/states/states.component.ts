import {Component, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {FuseSidebarService} from '../../../../../@fuse/components/sidebar/sidebar.service';
import {MatDialog} from '@angular/material/dialog';
import {FormGroup} from '@angular/forms';
import {StatesCreateComponent} from './states-create/states-create.component';
import {StatesListComponent} from './states-list/states-list.component';
import {fuseAnimations} from '../../../../../@fuse/animations';

@Component({
    selector: 'app-states',
    templateUrl: './states.component.html',
    styleUrls: ['./states.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class StatesComponent implements OnInit {
    dialogRef: any;
    @ViewChild(StatesListComponent) getStatesList: StatesListComponent;

    constructor(
        private _fuseSidebarService: FuseSidebarService,
        private _matDialog: MatDialog) {
    }

    ngOnInit(): void {
    }

    addStates() {
        this.dialogRef = this._matDialog.open(StatesCreateComponent, {
            panelClass: 'contact-form-dialog',
            data: {action: 'CREATE'}
        });
        this.dialogRef.afterClosed().subscribe((response: FormGroup) => {
            if (!response) {
                return;
            }
            this.getStatesList.getStatesList();
        });
    }
}
