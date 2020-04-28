import {Component, Inject, OnInit, ViewEncapsulation} from '@angular/core';
import {fuseAnimations} from "../../../../../@fuse/animations";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {WorkLocationService} from 'app/shared/services/work-location.service';

@Component({
    selector: 'app-update-work-locations',
    templateUrl: './update-work-locations.component.html',
    styleUrls: ['./update-work-locations.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class UpdateWorkLocationsComponent implements OnInit {
    action: any;
    dialogTitle: any;
    workLocationForm: FormGroup;
    isSubmitted = false;
    skills: any = [];
    updateData: any;

    constructor(public matDialogRef: MatDialogRef<UpdateWorkLocationsComponent>,
                @Inject(MAT_DIALOG_DATA) private _data: any,
                private fb: FormBuilder,
                private workLocationService: WorkLocationService) {
        this.action = _data.action;
        if (this.action === 'EDIT') {
            this.dialogTitle = 'Edit Work Location ' + _data.node.name;
            if (_data.node) {
                this.updateData = _data;
            }
        } else {
            if (_data.node.level === 0) {
                this.dialogTitle = 'Add New Work Location';
            } else {
                this.dialogTitle = 'Add Work Location inside ' + _data.node.name;
            }
        }
    }

    ngOnInit(): void {
        this.refresh();
        this.checkForUpdate();
    }

    refresh() {
        this.workLocationForm = this.fb.group({
            'name': ['', Validators.required],
            'isChildEnabled': [true, Validators.required]
        });
    }

    checkForUpdate() {
        if (this.updateData) {
            this.workLocationForm.patchValue({
                'name': this.updateData.node.name,
                'isChildEnabled': this.updateData.node.isChildEnabled,
            });
        }
    }

    updateLocation() {
        this.isSubmitted = true;
        if (!this.workLocationForm.valid) {
            this.isSubmitted = false;
            return;
        }
        if (this.isSubmitted) {
            this.workLocationService.updateWorkLocations(this.updateData.node.id, this.workLocationForm.value).subscribe(data => {
                this.updateData = undefined;
                this.workLocationForm.reset();
                this.isSubmitted = false;
            });
        }
    }

    createLocation() {
        if (this._data.node.parentId === 0) {
            this.workLocationForm.value['parentId'] = null;
        } else {
            this.workLocationForm.value['parentId'] = this._data.node.id;
        }
        this.isSubmitted = true;
        if (!this.workLocationForm.valid) {
            this.isSubmitted = false;
            return;
        }
        if (this.isSubmitted) {
            this.workLocationService.addWorkLocations(this.workLocationForm.value).subscribe(data => {
                this.updateData = undefined;
                this.workLocationForm.reset();
                this.isSubmitted = false;
            });
        }
    }
}
