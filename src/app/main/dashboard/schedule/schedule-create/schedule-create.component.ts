import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {ScheduleService} from 'app/shared/services/schedule.service';

@Component({
    selector: 'app-schedule-create',
    templateUrl: './schedule-create.component.html',
    styleUrls: ['./schedule-create.component.scss']
})
export class ScheduleCreateComponent implements OnInit {
    action: any;
    dialogTitle: any;
    scheduleForm: FormGroup;
    isSubmitted = false;
    updateData: any;

    constructor(public matDialogRef: MatDialogRef<ScheduleCreateComponent>,
                @Inject(MAT_DIALOG_DATA) private _data: any,
                private fb: FormBuilder,
                private scheduleService: ScheduleService) {
        this.action = _data.action;
        if (this.action === 'EDIT') {
            this.dialogTitle = 'Edit Schedule';
            if (_data.schedule) {
                this.updateData = _data;
            }
        } else {
            this.dialogTitle = 'Add Schedule';
        }
    }

    ngOnInit(): void {
        this.refresh();
        this.checkForUpdate();
    }

    refresh() {
        this.scheduleForm = this.fb.group({
            'name': ['', Validators.required]
        });
    }

    checkForUpdate() {
        if (this.updateData) {
            this.scheduleForm.patchValue({
                'name': this.updateData.schedule.name
            });
        }
    }

    saveSchedule() {
        this.isSubmitted = true;
        if (!this.scheduleForm.valid) {
            this.isSubmitted = false;
            return;
        }

        if (this.isSubmitted) {
            this.scheduleService.addSchedule(this.scheduleForm.value).subscribe(data => {
                this.scheduleForm.reset();
                this.isSubmitted = false;
            });
        }
    }

    updateSchedule() {
        this.isSubmitted = true;
        if (!this.scheduleForm.valid) {
            this.isSubmitted = false;
            return;
        }
        if (this.isSubmitted) {
            this.scheduleService.updateSchedule(this.updateData.schedule.id, this.scheduleForm.value).subscribe(data => {
                this.updateData = undefined;
                this.scheduleForm.reset();
                this.isSubmitted = false;
            });
        }
    }
}
