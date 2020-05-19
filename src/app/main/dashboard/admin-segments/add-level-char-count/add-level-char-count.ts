import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {FormBuilder} from '@angular/forms';
import {AdminSegmentServices} from '../../../../shared/services/admin-segment.services';

@Component({
    selector: 'add-level-char-count',
    templateUrl: './add-level-char-count.html',
    styleUrls: ['./add-level-char-count.scss'],
})

// tslint:disable-next-line:component-class-suffix
export class AddLevelCharCount implements OnInit {
    displayedColumns = ['level', 'charCount'];
    dataSource = {
        levels: []
    };
    dialogTitle;
    action;
    updateData;
    adminSegmentId;
    constructor(public matDialogRef: MatDialogRef<AddLevelCharCount>,
                @Inject(MAT_DIALOG_DATA) private _data: any,
                private adminSegmentServices: AdminSegmentServices) {
        this.action = _data.action;
        this.adminSegmentId = _data.adminSegmentId;
        if (this.action === 'EDIT') {
            this.dialogTitle = 'Char Count Config';
            if (_data.levelConfig) {
                 _data.levelConfig.forEach(v => {
                     this.dataSource.levels.push({
                         level: v.level,
                         value: v.count,
                     });
                });
            }
        } else {
            this.dialogTitle = 'Add Char Count Config';
        }

    }
    ngOnInit(): void {

    }

    updateLevelCharCount() {
        this.adminSegmentServices.updateCharCount(this.adminSegmentId, this.dataSource).subscribe(v => {
            // console.log('------>>>charcount response', v);
        });
    }
}
