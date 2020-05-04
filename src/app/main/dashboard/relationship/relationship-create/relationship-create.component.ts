import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {RelationshipService} from "../../../../shared/services/relationship.service";

@Component({
    selector: 'app-relationship-create',
    templateUrl: './relationship-create.component.html',
    styleUrls: ['./relationship-create.component.scss']
})
export class RelationshipCreateComponent implements OnInit {
    action: any;
    dialogTitle: any;
    relationshipForm: FormGroup;
    isSubmitted = false;
    updateData: any;

    constructor(public matDialogRef: MatDialogRef<RelationshipCreateComponent>,
                @Inject(MAT_DIALOG_DATA) private _data: any,
                private fb: FormBuilder,
                private relationshipService: RelationshipService) {
        this.action = _data.action;
        if (this.action === 'EDIT') {
            this.dialogTitle = 'Edit Relationship';
            if (_data.relationship) {
                this.updateData = _data;
            }
        } else {
            this.dialogTitle = 'Add Relationship';
        }
    }

    ngOnInit(): void {
        this.refresh();
        this.checkForUpdate();
    }

    refresh() {
        this.relationshipForm = this.fb.group({
            'name': ['', Validators.required],
            'isActive': [true, Validators.required]
        });
    }

    checkForUpdate() {
        if (this.updateData) {
            this.relationshipForm.patchValue({
                'name': this.updateData.relationship.name,
                'isActive': this.updateData.relationship.isActive
            });
        }
    }

    saveRelationship() {
        this.isSubmitted = true;
        if (!this.relationshipForm.valid) {
            this.isSubmitted = false;
            return;
        }

        if (this.isSubmitted) {
            this.relationshipService.addRelationship(this.relationshipForm.value).subscribe(data => {
                this.relationshipForm.reset();
                this.isSubmitted = false;
            });
        }
    }

    updateRelationship() {
        this.isSubmitted = true;
        if (!this.relationshipForm.valid) {
            this.isSubmitted = false;
            return;
        }
        if (this.isSubmitted) {
            this.relationshipService.updateRelationship(this.updateData.relationship.id, this.relationshipForm.value).subscribe(data => {
                this.updateData = undefined;
                this.relationshipForm.reset();
                this.isSubmitted = false;
            });
        }
    }
}
