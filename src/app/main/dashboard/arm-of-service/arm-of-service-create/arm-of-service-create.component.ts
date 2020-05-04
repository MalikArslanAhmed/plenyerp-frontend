import {Component, Inject, OnInit, ViewEncapsulation} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {fuseAnimations} from "../../../../../@fuse/animations";
import {ArmOfServiceService} from "../../../../shared/services/arm-of-service.service";

@Component({
    selector: 'app-arm-of-service-create',
    templateUrl: './arm-of-service-create.component.html',
    styleUrls: ['./arm-of-service-create.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class ArmOfServiceCreateComponent implements OnInit {
    action: any;
    dialogTitle: any;
    armOfServiceForm: FormGroup;
    isSubmitted = false;
    updateData: any;

    constructor(public matDialogRef: MatDialogRef<ArmOfServiceCreateComponent>,
                @Inject(MAT_DIALOG_DATA) private _data: any,
                private fb: FormBuilder,
                private armOfServiceService: ArmOfServiceService) {
        this.action = _data.action;
        if (this.action === 'EDIT') {
            this.dialogTitle = 'Edit Arm Of Service';
            if (_data.armOfService) {
                this.updateData = _data;
            }
        } else {
            this.dialogTitle = 'Add Arm Of Service';
        }
    }

    ngOnInit(): void {
        this.refresh();
        this.checkForUpdate();
    }

    refresh() {
        this.armOfServiceForm = this.fb.group({
            'name': ['', Validators.required],
            'isActive': [true, Validators.required]
        });
    }

    checkForUpdate() {
        if (this.updateData) {
            this.armOfServiceForm.patchValue({
                'name': this.updateData.armOfService.name,
                'isActive': this.updateData.armOfService.isActive
            });
        }
    }

    saveArmOfService() {
        this.isSubmitted = true;
        if (!this.armOfServiceForm.valid) {
            this.isSubmitted = false;
            return;
        }

        if (this.isSubmitted) {
            this.armOfServiceService.addArmOfService(this.armOfServiceForm.value).subscribe(data => {
                this.armOfServiceForm.reset();
                this.isSubmitted = false;
            });
        }
    }

    updateArmOfService() {
        this.isSubmitted = true;
        if (!this.armOfServiceForm.valid) {
            this.isSubmitted = false;
            return;
        }
        if (this.isSubmitted) {
            this.armOfServiceService.updateArmOfService(this.updateData.armOfService.id, this.armOfServiceForm.value).subscribe(data => {
                this.updateData = undefined;
                this.armOfServiceForm.reset();
                this.isSubmitted = false;
            });
        }
    }
}
