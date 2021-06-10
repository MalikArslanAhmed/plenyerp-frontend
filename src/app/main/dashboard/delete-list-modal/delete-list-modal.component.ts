import {Component, Inject, OnInit, ViewEncapsulation} from '@angular/core';
import {FormBuilder} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {fuseAnimations} from '../../../../@fuse/animations';
import {GlobalService} from '../../../shared/services/global.service';

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
    header: string;
    message: string;
    isShowUserNameAndDate: boolean = false;
    userName = '';
    date = new Date();

    constructor(public matDialogRef: MatDialogRef<DeleteListModalComponent>,
                @Inject(MAT_DIALOG_DATA) private _data: any,
                private globalService: GlobalService,
                private fb: FormBuilder,
    ) {
        this.data = _data.data;
        if (_data.showUserNameAndDate) {
            this.isShowUserNameAndDate = _data.showUserNameAndDate;
        }

        if (_data.header) {
            this.header = _data.header;
        } else {
            this.header = 'Delete';
        }
        if (_data.message) {
            this.message = _data.message;
        } else {
            this.message = 'Are You Sure ?';
        }

    }

    ngOnInit(): void {
        this.refresh();
        this.userName = this.globalService.getSelf().username;

    }

    refresh(): void {

    }

}
