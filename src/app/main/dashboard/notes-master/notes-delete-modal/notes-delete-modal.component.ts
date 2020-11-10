import {Component, Inject, OnInit, ViewEncapsulation} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {FormBuilder} from "@angular/forms";
import {fuseAnimations} from "../../../../../@fuse/animations";

@Component({
    selector: 'app-notes-delete-modal',
    templateUrl: './notes-delete-modal.component.html',
    styleUrls: ['./notes-delete-modal.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class NotesDeleteModalComponent implements OnInit {
    action: any;
    dialogTitle: any;
    data: any;
    isDeleteItems = false;

    constructor(public matDialogRef: MatDialogRef<NotesDeleteModalComponent>,
                @Inject(MAT_DIALOG_DATA) private _data: any,
                private fb: FormBuilder,
    ) {
        this.data = _data.data;
    }

    ngOnInit(): void {
        this.refresh();
    }

    refresh() {
    }
}
