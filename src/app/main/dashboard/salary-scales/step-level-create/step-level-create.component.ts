import {Component, Inject, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {FormBuilder, FormGroup, Validators, FormControl} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {SkillService} from 'app/shared/services/skill.service';
import {fuseAnimations} from '../../../../../@fuse/animations';
import {SalaryScalesService} from '../../../../shared/services/salary-scales.service';
import {SalaryScalesListComponent} from '../salary-scales-list/salary-scales-list.component';

@Component({
    selector: 'grade-level-create',
    templateUrl: './step-level-create.component.html',
    styleUrls: ['./step-level-create.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class StepLevelCreateComponent implements OnInit {
    action: any;
    dialogTitle: any;
    stepLevelForm: FormGroup;
    isSubmitted = false;
    salaryScales: any = [];
    updateData: any;
    gradeLevelId;


    constructor(public matDialogRef: MatDialogRef<StepLevelCreateComponent>,
                @Inject(MAT_DIALOG_DATA) private _data: any,
                private fb: FormBuilder,
                private salaryScalesService: SalaryScalesService) {
        this.action = _data.action;
        this.gradeLevelId = _data.gradeLevelId;
        if (this.action === 'EDIT') {
            this.dialogTitle = 'Edit GL Step';
            if (_data.stepLevel) {
                this.updateData = _data;
            }
        } else {
            this.dialogTitle = 'Add GL Step';
        }
    }

    ngOnInit(): void {
        this.refresh();
        this.checkForUpdate();
    }

    refresh() {
        this.stepLevelForm = this.fb.group({
            gradeLevelId: [this.gradeLevelId, Validators.required],
            name: ['', Validators.required],
        });        
    }

    checkForUpdate() {
        if (this.updateData) {
            console.log(this.updateData);
            this.stepLevelForm.patchValue({
                gradeLevelId: this.updateData.stepLevel.gradeLevelId,
                name: this.updateData.stepLevel.name,
            });
           
        }
    }

    saveStepLevel() {
        this.isSubmitted = true;
        if (!this.stepLevelForm.valid) {
            this.isSubmitted = false;
            return;
        }

        if (this.isSubmitted) {
            this.salaryScalesService.addStepLevel(this.stepLevelForm.value).subscribe(data => {
                this.stepLevelForm.reset();
                this.isSubmitted = false;
            });

        }
    }

    updateStepLevel() {
        this.isSubmitted = true;
        if (!this.stepLevelForm.valid) {
            this.isSubmitted = false;
            return;
        }
        if (this.isSubmitted) {
            this.salaryScalesService.updateStepLevel(this.updateData.stepLevel.id, this.stepLevelForm.value).subscribe(data => {
                this.updateData = undefined;
                this.stepLevelForm.reset();
                this.isSubmitted = false;
            });

        }
    }
}
