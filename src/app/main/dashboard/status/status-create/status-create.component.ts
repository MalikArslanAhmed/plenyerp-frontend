import {Component, Inject, OnInit, ViewEncapsulation} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {StatusService} from 'app/shared/services/status.service';
import {fuseAnimations} from "../../../../../@fuse/animations";

@Component({
    selector: 'app-status-create',
    templateUrl: './status-create.component.html',
    styleUrls: ['./status-create.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class StatusCreateComponent implements OnInit {
    action: any;
    dialogTitle: any;
    statusForm: FormGroup;
    isSubmitted = false;
    status: any = [];
    updateData: any;

    constructor(public matDialogRef: MatDialogRef<StatusCreateComponent>,
                @Inject(MAT_DIALOG_DATA) private _data: any,
                private fb: FormBuilder,
                private statusService: StatusService) {
        this.action = _data.action;
        if (this.action === 'EDIT') {
            this.dialogTitle = 'Edit Status';
            if (_data.status) {
                this.updateData = _data;
            }
        } else {
            this.dialogTitle = 'Add Status';
        }
    }

    ngOnInit(): void {
        this.refresh();
        this.checkForUpdate();
    }

    refresh() {
        this.statusForm = this.fb.group({
            'name': ['', Validators.required],
            'isActive': [true, Validators.required]
        });
    }

    checkForUpdate() {
        if (this.updateData) {
            this.statusForm.patchValue({
                'name': this.updateData.status.name,
                'isActive': this.updateData.status.isActive
            });
        }
    }

    saveStatus() {
        this.isSubmitted = true;
        if (!this.statusForm.valid) {
            this.isSubmitted = false;
            return;
        }

        if (this.isSubmitted) {
            this.statusService.addStatus(this.statusForm.value).subscribe(data => {
                this.statusForm.reset();
                this.isSubmitted = false;
            });
        }
    }

    updateStatus() {
        this.isSubmitted = true;
        if (!this.statusForm.valid) {
            this.isSubmitted = false;
            return;
        }
        if (this.isSubmitted) {
            this.statusService.updateStatus(this.updateData.status.id, this.statusForm.value).subscribe(data => {
                this.updateData = undefined;
                this.statusForm.reset();
                this.isSubmitted = false;
            });
        }
    }
}
