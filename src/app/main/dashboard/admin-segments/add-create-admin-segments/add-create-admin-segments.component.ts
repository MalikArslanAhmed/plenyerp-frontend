import { Component, Inject, OnInit, ViewEncapsulation } from '@angular/core';
import {fuseAnimations} from '../../../../../@fuse/animations';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

@Component({
    selector: 'add-create-admin-segments',
    templateUrl: './add-create-admin-segments.component.html',
    styleUrls: ['./add-create-admin-segments.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations,
})

export class AddCreateAdminSegmentsComponent implements OnInit {
    action: any;
    dialogTitle: any;
    segmentForm: FormGroup;
    isSubmitted: false;
    segment: any = [];

    constructor(public matDialogRef: MatDialogRef<AddCreateAdminSegmentsComponent>,
                   @Inject(MAT_DIALOG_DATA) private _data: any, private fb: FormBuilder,
                ){
        this.action = _data.action;
        this.segment = _data.node;
        this.dialogTitle = this.action === 'EDIT' ? 'Update Segment' : 'Add Segment';
    }

   ngOnInit(): void {
        console.log('on init', this.segment);
        let parentChildren = this.segment.children || [];
        let nextIndividualCode = this.segment.individualCode;

        if (this.action !== 'EDIT') {
            if (parentChildren.length > 0) {
                let lastChild = parentChildren[parentChildren.length - 1];
                console.log('last child', lastChild);
                nextIndividualCode = `0${+lastChild.individualCode + 1}`;
            } else {
                nextIndividualCode = '01';
            }
        }
        this.refresh();
        this.updateFormFields(nextIndividualCode);
   }

    refresh() {
        this.segmentForm = this.fb.group({
            'name': ['', Validators.required],
            'characterCount': ['', Validators.required],
            'individualCode': [''],
            'isActive': [true, Validators.required]
        });
    }

    updateFormFields(nextIndividualCode) {
        let isEdit = this.action === 'EDIT';
        this.segmentForm = this.fb.group({
            'name': this.segment.name,
            'characterCount': {value: this.segment.characterCount, disabled: isEdit},
            'individualCode': {value: nextIndividualCode, disabled: true},
            'isActive': {value: this.segment.isActive, disabled: isEdit}
        });
    }

    handleSegmentAddOrUpdate() {
        console.log(this.segmentForm, this.segmentForm.getRawValue(), 'handleSegment');
        let formValues = this.segmentForm.getRawValue();
        let parentId = this.segment.parentId;

        let payloadToCreate = {
            ...formValues,
            parentId: !parentId ? undefined : parentId,
        }
        console.log(payloadToCreate, 'payloadToCreate');
    }

}