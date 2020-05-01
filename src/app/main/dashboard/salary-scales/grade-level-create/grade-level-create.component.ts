import {Component, Inject, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {FormBuilder, FormGroup, Validators, FormControl} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {SkillService} from 'app/shared/services/skill.service';
import {fuseAnimations} from '../../../../../@fuse/animations';
import {SalaryScalesService} from '../../../../shared/services/salary-scales.service';
import {SalaryScalesListComponent} from '../salary-scales-list/salary-scales-list.component';

@Component({
    selector: 'grade-level-create',
    templateUrl: './grade-level-create.component.html',
    styleUrls: ['./grade-level-create.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class GradeLevelCreateComponent implements OnInit {
    action: any;
    dialogTitle: any;
    gradeLevelForm: FormGroup;
    isSubmitted = false;
    salaryScales: any = [];
    updateData: any;
    retireType = '';
    retireTypesData = [
        {
            name: 'First Appointment',
            value: 'FIRST_APPOINTMENT'
        },
        {
            name: 'Current Appointment',
            value: 'CURRENT_APPOINTMENT'
        },
        {
            name: 'Date Of Birth',
            value: 'DATE_OF_BIRTH'
        },
    ];
    salaryScalesId;
    constructor(public matDialogRef: MatDialogRef<GradeLevelCreateComponent>,
                @Inject(MAT_DIALOG_DATA) private _data: any,
                private fb: FormBuilder,
                private salaryScalesService: SalaryScalesService) {
        this.action = _data.action;
        this.salaryScalesId = _data.salaryScaleId;
        if (this.action === 'EDIT') {
            this.dialogTitle = 'Edit Grade Level';
            if (_data.gradeLevel) {
                this.updateData = _data;
            }
        } else {
            this.dialogTitle = 'Add Grade Level';
        }
    }

    ngOnInit(): void {
        this.refresh();
        this.checkForUpdate();
    }

    refresh () {
        this.gradeLevelForm = this.fb.group({
            salaryScaleId: [this.salaryScalesId, Validators.required],
            name: ['', Validators.required],
            retireType: ['', Validators.required],
            incrementDue: ['', Validators.required],
            promotionDue: ['', Validators.required],
            confirmAfter: ['', Validators.required],
            retireAfter: ['', Validators.required]
        });
    }

    checkForUpdate() {
        if (this.updateData) {
            this.gradeLevelForm.patchValue({
                salaryScaleId: this.updateData.gradeLevel.salaryScaleId,
                name: this.updateData.gradeLevel.name,
                retireType: this.updateData.gradeLevel.retireType,
                incrementDue: this.updateData.gradeLevel.incrementDue,
                promotionDue: this.updateData.gradeLevel.promotionDue,
                confirmAfter: this.updateData.gradeLevel.confirmAfter,
                retireAfter: this.updateData.gradeLevel.retireAfter,

            });
        }
    }

    saveGradeLevel() {
        this.isSubmitted = true;
        if (!this.gradeLevelForm.valid) {
            this.isSubmitted = false;
            return;
        }

        if (this.isSubmitted) {
            this.salaryScalesService.addGradeLevel(this.gradeLevelForm.value).subscribe(data => {
                this.gradeLevelForm.reset();
                this.isSubmitted = false;
            });

        }
    }

    updateGradeLevel() {
        this.isSubmitted = true;
        if (!this.gradeLevelForm.valid) {
            this.isSubmitted = false;
            return;
        }
        if (this.isSubmitted) {
            this.salaryScalesService.updateGradeLevel(this.updateData.gradeLevel.id, this.gradeLevelForm.value).subscribe(data => {
                this.updateData = undefined;
                this.gradeLevelForm.reset();
                this.isSubmitted = false;
            });

        }
    }
}
