import {Component, OnInit, ViewChild, ViewEncapsulation, Output, EventEmitter} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {FormGroup} from '@angular/forms';
import {SkillService} from 'app/shared/services/skill.service';
import {SalaryScalesCreateComponent} from '../salary-scales-create/salary-scales-create.component';
import {fuseAnimations} from '../../../../../@fuse/animations';
import {SalaryScalesService} from '../../../../shared/services/salary-scales.service';
import {GradeLevelCreateComponent} from '../grade-level-create/grade-level-create.component';
import {MatTabChangeEvent, MatTabGroup} from '@angular/material/tabs';
import {StepLevelCreateComponent} from '../step-level-create/step-level-create.component';

@Component({
    selector: 'app-salary-scales-list',
    templateUrl: './salary-scales-list.component.html',
    styleUrls: ['./salary-scales-list.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class SalaryScalesListComponent implements OnInit {
    salaryScales = [];
    displayedColumns = ['id', 'name', 'actions'];
    dialogRef: any;
    gradeLevels = [];
    displayedGradeLevelColumns = ['id', 'name', 'incrementDue', 'promotionDue', 'confirmAfter', 'retireAfter', 'retireType', 'actions'];
    stepsLevels = [];
    displayedStepsLevelColumns = ['id', 'name', 'actions'];
    selectIndex = 0;
    selectTab = 0;
    isNotAutoCreate = true;
    salaryScalesId;
    gradeLevelId;
    @Output() selectedIndexChange: EventEmitter<number>;

    constructor(private salaryScalesService: SalaryScalesService,
                private _matDialog: MatDialog) {
    }

    ngOnInit(): void {
        this.getSalaryScales();
    }

    getSalaryScales() {
        this.salaryScalesService.getSalaryScales({'page': -1}).subscribe(data => {
            this.salaryScales = data;

            if (this.salaryScales && this.salaryScales.length > 0) {
                let i = 1;
                this.salaryScales.forEach(skill => {
                    skill['sno'] = i;
                    i++;
                });
            }
            this.goToGradeLevel(this.salaryScales[this.selectIndex]);
        });
    }


    deleteSalaryScales(id) {
        this.salaryScalesService.deleteSalaryScales(id).subscribe(data => {
            if (data) {
                this.getSalaryScales();
            }
        });
    }

    editSalaryScales(salaryScale) {
        this.dialogRef = this._matDialog.open(SalaryScalesCreateComponent, {
            panelClass: 'contact-form-dialog',
            data: {action: 'EDIT', salaryScale: salaryScale},
        });
        this.dialogRef.afterClosed().subscribe((response: FormGroup) => {
            if (!response) {
                return;
            }
            this.getSalaryScales();
        });
    }

    goToGradeLevel(value) {
        this.gradeLevels = [];
        this.selectTab = 0;
        this.salaryScales.forEach(v => {
            if (value.id === v.id) {
                v['isSelected'] = true;
                this.isNotAutoCreate = v.isAutomaticCreate;
                this.salaryScalesId = v.id;
                this.gradeLevels = v.gradeLevels;
            } else {
                v['isSelected'] = false;
            }
        });
        if (this.gradeLevels && this.gradeLevels.length > 0) {
            let i = 1;
            this.gradeLevels.forEach(gradeL => {
                gradeL['sno'] = i;
                i++;
            });
        }
        this.goToStepLevel(this.gradeLevels[this.selectIndex]);
    }

    goToStepLevel(value) {
        this.stepsLevels = [];
        this.gradeLevels.forEach(v => {
            if (value.id === v.id) {
                v['isSelected'] = true;
                this.gradeLevelId = v.id;
                this.stepsLevels = v['gradeLevelSteps'];
            } else {
                v['isSelected'] = false;
            }
        });


        if (this.stepsLevels && this.stepsLevels.length > 0) {
            let i = 1;
            this.stepsLevels.forEach(stepL => {
                stepL['sno'] = i;
                i++;
            });
        }
    }

    addGradeLevel() {
        this.dialogRef = this._matDialog.open(GradeLevelCreateComponent, {
            panelClass: 'contact-form-dialog',
            data: {action: 'CREATE', salaryScaleId: this.salaryScalesId}
        });
        this.dialogRef.afterClosed().subscribe((response: FormGroup) => {
            if (!response) {
                return;
            }
            this.getSalaryScales();
        });
    }

    editGradeLevel(gradeLevel) {
        this.dialogRef = this._matDialog.open(GradeLevelCreateComponent, {
            panelClass: 'contact-form-dialog',
            data: {action: 'EDIT', gradeLevel: gradeLevel},
        });
        this.dialogRef.afterClosed().subscribe((response: FormGroup) => {
            if (!response) {
                return;
            }
            this.getSalaryScales();
        });
    }

    deleteGradeLevel(id) {
        this.salaryScalesService.deleteGradeLevel(id).subscribe(data => {
            if (data) {
                this.getSalaryScales();
            }
        });
    }

    addStepLevel() {
        this.dialogRef = this._matDialog.open(StepLevelCreateComponent, {
            panelClass: 'contact-form-dialog',
            data: {action: 'CREATE', gradeLevelId: this.gradeLevelId}
        });
        this.dialogRef.afterClosed().subscribe((response: FormGroup) => {
            if (!response) {
                return;
            }
            this.getSalaryScales();
        });
    }

    editStepLevel(stepLevel) {
        this.dialogRef = this._matDialog.open(StepLevelCreateComponent, {
            panelClass: 'contact-form-dialog',
            data: {action: 'EDIT', stepLevel: stepLevel},
        });
        this.dialogRef.afterClosed().subscribe((response: FormGroup) => {
            if (!response) {
                return;
            }
            this.getSalaryScales();
        });
    }

    deleteStepLevel(id) {
        this.salaryScalesService.deleteStepLevel(id).subscribe(data => {
            if (data) {
                this.getSalaryScales();
            }
        });
    }
}
