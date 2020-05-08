import {Component, OnInit, Output, ViewEncapsulation, EventEmitter, ViewChild} from '@angular/core';
import {fuseAnimations} from '../../../../@fuse/animations';
import {FuseSidebarService} from '../../../../@fuse/components/sidebar/sidebar.service';
import {MatDialog} from '@angular/material/dialog';
import {QualificationCreateComponent} from './qualification-create/qualification-create.component';
import {FormGroup} from '@angular/forms';
import {QualificationListComponent} from './qualification-list/qualification-list.component';

@Component({
    selector: 'app-qualification',
    templateUrl: './qualification.component.html',
    styleUrls: ['./qualification.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class QualificationComponent implements OnInit {
    dialogRef: any;
    @ViewChild(QualificationListComponent) getQualification: QualificationListComponent;

    constructor(
        private _fuseSidebarService: FuseSidebarService,
        private _matDialog: MatDialog) {
    }

    ngOnInit(): void {
    }

    addQualification() {
        this.dialogRef = this._matDialog.open(QualificationCreateComponent, {
            panelClass: 'contact-form-dialog',
            data: {action: 'CREATE'}
        });
        this.dialogRef.afterClosed().subscribe((response: FormGroup) => {
            if (!response) {
                return;
            }
            this.getQualification.getQualifications();
        });
    }
}
