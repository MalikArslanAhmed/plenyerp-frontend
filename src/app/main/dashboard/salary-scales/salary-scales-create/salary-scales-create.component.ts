import {Component, Inject, OnInit, ViewEncapsulation} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {SkillService} from 'app/shared/services/skill.service';
import {fuseAnimations} from '../../../../../@fuse/animations';
import {SalaryScalesService} from '../../../../shared/services/salary-scales.service';

@Component({
    selector: 'salary-scales-create',
    templateUrl: './salary-scales-create.component.html',
    styleUrls: ['./salary-scales-create.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class SalaryScalesCreateComponent implements OnInit {
    action: any;
    dialogTitle: any;
    salaryScalesForm: FormGroup;
    isSubmitted = false;
    salaryScales: any = [];
    updateData: any;

    constructor(public matDialogRef: MatDialogRef<SalaryScalesCreateComponent>,
                @Inject(MAT_DIALOG_DATA) private _data: any,
                private fb: FormBuilder,
                private salaryScalesService: SalaryScalesService) {
        this.action = _data.action;
        if (this.action === 'EDIT') {
            this.dialogTitle = 'Edit Salary Scale';
            if (_data.salaryScale) {
                this.updateData = _data;
            }
        } else {
            this.dialogTitle = 'Add Salary Scale';
        }
    }

    ngOnInit(): void {
        this.refresh();
        this.checkForUpdate();
    }

    refresh() {
        this.salaryScalesForm = this.fb.group({
            'name': ['', Validators.required]
        });
    }

    checkForUpdate() {
        if (this.updateData) {
            this.salaryScalesForm.patchValue({
                'name': this.updateData.salaryScale.name
            });
        }
    }

    saveSalaryScale() {
        this.isSubmitted = true;
        if (!this.salaryScalesForm.valid) {
            this.isSubmitted = false;
            return;
        }

        if (this.isSubmitted) {
            this.salaryScalesService.addSalaryScales(this.salaryScalesForm.value).subscribe(data => {
                this.salaryScalesForm.reset();
                this.isSubmitted = false;
            });
        }
    }

    updateSalaryScale() {
        this.isSubmitted = true;
        if (!this.salaryScalesForm.valid) {
            this.isSubmitted = false;
            return;
        }
        if (this.isSubmitted) {
            this.salaryScalesService.updateSalaryScales(this.updateData.salaryScale.id, this.salaryScalesForm.value).subscribe(data => {
                this.updateData = undefined;
                this.salaryScalesForm.reset();
                this.isSubmitted = false;
            });
        }
    }
}
