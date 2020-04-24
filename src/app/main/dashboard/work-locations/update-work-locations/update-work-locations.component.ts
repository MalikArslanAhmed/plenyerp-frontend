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
            this.dialogTitle = 'Edit Work Location';
            if (_data.node) {
                this.updateData = _data;
            }
        }
    }

    ngOnInit(): void {
        this.refresh();
        this.checkForUpdate();
    }

    refresh() {
        this.workLocationForm = this.fb.group({
            'name': ['', Validators.required]
        });
    }

    checkForUpdate() {
        if (this.updateData) {
            this.workLocationForm.patchValue({
                'name': this.updateData.node.item
            });
        }
    }

    updateLocation() {
        if (this.updateData.updationType === 'COUNTRY') {
            this.workLocationService.updateCountry(this.updateData.selectedId, this.workLocationForm.value).subscribe(data => {
                console.log('data', data);
            })
        } else if (this.updateData.updationType === 'REGION') {
            this.workLocationService.updateRegion(this.updateData.selectedId, this.workLocationForm.value).subscribe(data => {
                console.log('data', data);
            })
        } else if (this.updateData.updationType === 'STATE') {
            this.workLocationService.updateState(this.updateData.selectedId, this.workLocationForm.value).subscribe(data => {
                console.log('data', data);
            })
        } else if (this.updateData.updationType === 'LGA') {
            this.workLocationService.updateLga(this.updateData.selectedId, this.workLocationForm.value).subscribe(data => {
                console.log('data', data);
            })
        }
    }
}
