import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {FormGroup} from '@angular/forms';
import {SkillService} from 'app/shared/services/skill.service';
import {SalaryScalesCreateComponent} from '../salary-scales-create/salary-scales-create.component';
import {fuseAnimations} from '../../../../../@fuse/animations';
import {SalaryScalesService} from '../../../../shared/services/salary-scales.service';

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
    displayedGradeLevelColumns = ['id', 'name', 'actions'];
    stepsLevels = [];
    displayedStepsLevelColumns = ['id', 'name', 'actions'];
    selectedIndex = 0;
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
            this.goToGradeLevel(this.salaryScales[this.selectedIndex]);
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
        this.salaryScales.forEach( v => {
            if (value.id === v.id) {
                v['isSelected'] = true;
            }
            if (value.id !== v.id) {
                v['isSelected'] = false;
            }
            this.gradeLevels = value.gradeLevels ;
            if (this.gradeLevels && this.gradeLevels.length > 0) {
                let i = 1;
                this.gradeLevels.forEach(gradeL => {
                    gradeL['sno'] = i;
                    i++;
                });
            }
            this.goToStepLevel(this.gradeLevels[this.selectedIndex]);
        });
    }
    goToStepLevel(value) {
        this.stepsLevels = []
        this.gradeLevels.forEach( v => {
            if (value.id === v.id) {
                v['isSelected'] = true;
            }
            if (value.id !== v.id) {
                v['isSelected'] = false;
            }
            this.stepsLevels = value.gradeLevelSteps;
            if (this.stepsLevels && this.stepsLevels.length > 0) {
                let i = 1;
                this.stepsLevels.forEach(stepL => {
                    stepL['sno'] = i;
                    i++;
                });
            }
        });
    }

    editGradeLevel(salaryScale) {
        // this.dialogRef = this._matDialog.open(SalaryScalesCreateComponent, {
        //     panelClass: 'contact-form-dialog',
        //     data: {action: 'EDIT', salaryScale: salaryScale},
        // });
        // this.dialogRef.afterClosed().subscribe((response: FormGroup) => {
        //     if (!response) {
        //         return;
        //     }
        //     this.getSalaryScales();
        // });
    }
    deleteGradeLevel(id) {
        // this.salaryScalesService.deleteSalaryScales(id).subscribe(data => {
        //     if (data) {
        //         this.getSalaryScales();
        //     }
        // });
    }
}
