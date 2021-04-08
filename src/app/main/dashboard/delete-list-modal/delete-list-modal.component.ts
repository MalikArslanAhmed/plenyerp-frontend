import {Component, Inject, OnInit, ViewEncapsulation} from '@angular/core';
import {FormBuilder} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {fuseAnimations} from '../../../../@fuse/animations';

@Component({
    selector: 'app-delete-list-modal',
    templateUrl: './delete-list-modal.component.html',
    styleUrls: ['./delete-list-modal.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class DeleteListModalComponent implements OnInit {
    action: any;
    dialogTitle: any;
    data: any;
    isDeleteItems = false;

    constructor(public matDialogRef: MatDialogRef<DeleteListModalComponent>,
                @Inject(MAT_DIALOG_DATA) private _data: any,
                private fb: FormBuilder,
    ) {
        this.data = _data.data;

    }

    ngOnInit(): void {
        this.refresh();

    }

    refresh(): void {

    }

}
