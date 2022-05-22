import { Component, Inject, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialog } from '@angular/material/dialog';
import { EmployeesService } from 'app/shared/services/employees.service';
import { fuseAnimations } from '../../../../../../@fuse/animations';
import { ContactInfoService } from '../../../../../shared/services/contact-info.service';

@Component({
    selector: 'information-create',
    templateUrl: './information-create.component.html',
    styleUrls: ['./information-create.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class InformationCreateComponent implements OnInit {
    action: any;
    dialogTitle: any;
    informationForm: FormGroup;
    isSubmitted = false;
    updateData: any;
    dialogRef: any;
    informationList = []
    constructor(public matDialogRef: MatDialogRef<InformationCreateComponent>,
        @Inject(MAT_DIALOG_DATA) private _data: any,
        private fb: FormBuilder,
        private _matDialog: MatDialog,
        private contactInfoService: ContactInfoService,
    ) {
        this.action = _data.action;
        if (this.action === 'EDIT') {
            this.dialogTitle = 'Edit Information';
            if (_data.information) {
                this.updateData = _data;
            }
        } else {
            this.dialogTitle = 'Add Information';
        }
    }

    ngOnInit(): void {
        this.refresh();
        this.getYearList()
        this.checkForUpdate();
    }
    refresh() {
        this.informationForm = this.fb.group({
            currentLeaveYearId: ['', Validators.required],
        });
    }
    getYearList() {
        this.contactInfoService.getLeaveYearList({}).subscribe(data => {
            this.informationList = data.items;
        });
    }
    checkForUpdate() {
        console.log('sd0',this.updateData);
        
        if (this.updateData) {
            this.informationForm.patchValue({
                currentLeaveYearId: this.updateData.information.currentLeaveYearId,
            });
        }
    }

    saveInformation() {
        this.isSubmitted = true;
        if (!this.informationForm.valid) {
            this.isSubmitted = false;
            return;
        }

        if (this.isSubmitted) {
            // console.log(this.informationForm.value);
            this.contactInfoService.addInformation(this.informationForm.value).subscribe(data => {
                this.informationForm.reset();
                this.isSubmitted = false;
            });


        }
    }

    updateInformation() {
        this.isSubmitted = true;
        if (!this.informationForm.valid) {
            this.isSubmitted = false;
            return;
        }
        if (this.isSubmitted) {
            this.contactInfoService.updateInformation(this.updateData.information.id, this.informationForm.value).subscribe(data => {
                this.updateData = undefined;
                this.informationForm.reset();
                this.isSubmitted = false;
            });

        }
    }
}
