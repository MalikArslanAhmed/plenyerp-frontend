import {Component, Inject, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {FormBuilder, FormGroup, Validators, FormControl} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {SkillService} from 'app/shared/services/skill.service';
import {fuseAnimations} from '../../../../../@fuse/animations';
import {SalaryScalesService} from '../../../../shared/services/salary-scales.service';
import {SalaryScalesListComponent} from '../salary-scales-list/salary-scales-list.component';

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
            name: ['', Validators.required],
            numberOfLevels: ['', Validators.required],
            numberOfSteps: ['', Validators.required],
            active: [''],
            isAutomaticCreate: [false],
            retireType: ['', Validators.required],
        });
        this.salaryScalesForm.get('retireType').disable();
        this.salaryScalesForm.get('isAutomaticCreate').valueChanges.subscribe(val => {
            if (val === false) {
                this.salaryScalesForm.get('retireType').disable();
            }else {
                this.salaryScalesForm.get('retireType').enable();
            }
        });
    }

    checkForUpdate() {
        if (this.updateData) {
            this.salaryScalesForm.patchValue({
                name: this.updateData.salaryScale.name,
                numberOfLevels: this.updateData.salaryScale.numberOfLevels,
                numberOfSteps: this.updateData.salaryScale.numberOfSteps,
                active: this.updateData.salaryScale.active,
                isAutomaticCreate: this.updateData.salaryScale.isAutomaticCreate,
            });
            this.salaryScalesForm.get('numberOfLevels').disable();
            this.salaryScalesForm.get('numberOfSteps').disable();
            this.salaryScalesForm.get('active').disable();
            this.salaryScalesForm.get('isAutomaticCreate').disable();
            this.salaryScalesForm.get('retireType').disable();
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
