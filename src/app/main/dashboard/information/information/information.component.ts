import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FormGroup } from '@angular/forms';
import { fuseAnimations } from '../../../../../@fuse/animations';
import { InformationListComponent } from './information-list/information-list.component';
import { InformationCreateComponent } from './information-create/information-create.component';

@Component({
    selector: 'app-information',
    templateUrl: './information.component.html',
    styleUrls: ['./information.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class InformationComponent implements OnInit {
    dialogRef: any;
    @ViewChild(InformationListComponent) getInformationList: InformationListComponent;
    showAdd = false
    constructor(
        private _matDialog: MatDialog,
    ) {
    }

    ngOnInit(): void {
    }

    setValue(value) {
        this.showAdd = value
    }
    
    addInformation() {
        this.dialogRef = this._matDialog.open(InformationCreateComponent, {
            panelClass: 'contact-form-dialog',
            data: { action: 'CREATE' }
        });
        this.dialogRef.afterClosed().subscribe((response: FormGroup) => {
            if (!response) {
                return;
            }
            this.getInformationList.getInformationList();
        });
    }
}
