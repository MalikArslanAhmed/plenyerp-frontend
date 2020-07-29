import {Component, Inject, OnInit, ViewEncapsulation} from '@angular/core';
import {fuseAnimations} from '../../../../../@fuse/animations';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {AdminSegmentServices} from '../../../../shared/services/admin-segment.services';

@Component({
    selector: 'edit-segment-list',
    templateUrl: './edit-segment-list.html',
    styleUrls: ['./edit-segment-list.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations,
})

export class EditSegmentListComponent implements OnInit {
    action: any;
    dialogTitle: any;
    segmentListForm: FormGroup;
    isSubmitted: false;
    segment: any = [];
    segmenntCode = '';

    constructor(public matDialogRef: MatDialogRef<EditSegmentListComponent>,
                @Inject(MAT_DIALOG_DATA) private _data: any, private fb: FormBuilder,
                private segmentServices: AdminSegmentServices
    ) {
        this.action = _data.action;
        this.segment = _data.node;
        this.segment.levelConfig.forEach(levelC => {
            for (let i = 0; i < levelC.count; ++i) {
                this.segmenntCode += 'X';
            }
            this.segmenntCode += '-';
        });
        this.segmenntCode = this.segmenntCode.replace(/-+$/, '').replace(/^-/, '');

        console.log(this.segment)
        this.dialogTitle = 'Update Segment';
    }


    ngOnInit(): void {
        this.refresh();
    }

    refresh() {
        this.segmentListForm = this.fb.group({
            name: [this.segment.name, Validators.required],
            maxLevel: [this.segment.maxLevel, [Validators.required, Validators.pattern("^[0-9]*$")]],
        });
    }

    updateSegment() {
        const formValues = this.segmentListForm.value;
        const {id} = this.segment;
        const payloadToUpdate = {
            ...formValues,
        };
        this.segmentServices.updateSegment(id, payloadToUpdate).subscribe();
    }

}
