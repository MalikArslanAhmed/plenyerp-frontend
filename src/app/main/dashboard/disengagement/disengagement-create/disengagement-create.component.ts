import {Component, Inject, OnInit, ViewEncapsulation} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {fuseAnimations} from "../../../../../@fuse/animations";
import {DisengagementsService} from "../../../../shared/services/disengagements.service";

@Component({
    selector: 'app-disengagement-create',
    templateUrl: './disengagement-create.component.html',
    styleUrls: ['./disengagement-create.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class DisengagementCreateComponent implements OnInit {
    action: any;
    dialogTitle: any;
    disengagementForm: FormGroup;
    isSubmitted = false;
    updateData: any;

    constructor(public matDialogRef: MatDialogRef<DisengagementCreateComponent>,
                @Inject(MAT_DIALOG_DATA) private _data: any,
                private fb: FormBuilder,
                private disengagementsService: DisengagementsService) {
        this.action = _data.action;
        if (this.action === 'EDIT') {
            this.dialogTitle = 'Edit Disengagements';
            if (_data.disengagement) {
                this.updateData = _data;
            }
        } else {
            this.dialogTitle = 'Add Disengagement';
        }
    }

    ngOnInit(): void {
        this.refresh();
        this.checkForUpdate();
    }

    refresh() {
        this.disengagementForm = this.fb.group({
            'name': ['', Validators.required],
            'isActive': [true, Validators.required]
        });
    }

    checkForUpdate() {
        if (this.updateData) {
            this.disengagementForm.patchValue({
                'name': this.updateData.disengagement.name,
                'isActive': this.updateData.disengagement.isActive
            });
        }
    }

    saveDisengagement() {
        this.isSubmitted = true;
        if (!this.disengagementForm.valid) {
            this.isSubmitted = false;
            return;
        }

        if (this.isSubmitted) {
            this.disengagementsService.addDisengagement(this.disengagementForm.value).subscribe(data => {
                this.disengagementForm.reset();
                this.isSubmitted = false;
            });
        }
    }

    updateDisengagement() {
        this.isSubmitted = true;
        if (!this.disengagementForm.valid) {
            this.isSubmitted = false;
            return;
        }
        if (this.isSubmitted) {
            this.disengagementsService.updateDisengagement(this.updateData.disengagement.id, this.disengagementForm.value).subscribe(data => {
                this.updateData = undefined;
                this.disengagementForm.reset();
                this.isSubmitted = false;
            });
        }
    }
}
