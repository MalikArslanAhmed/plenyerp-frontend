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
import { DeleteListModalComponent } from '../../delete-list-modal/delete-list-modal.component';
import { PermissionConstant } from 'app/shared/constants/permission-constant';
import { Router } from '@angular/router';

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
    displayedGradeLevelColumns = ['id', 'name', 'incrementDue', 'promotionDue', 'confirmAfter', 'actions'];
    stepsLevels = [];
    displayedStepsLevelColumns = ['id', 'name', 'actions'];
    selectIndex = 0;
    selectTab = 0;
    isNotAutoCreate = true;
    salaryScalesId;
    selectedId = {
        salScaleId: '',
        gradeLeId: '',
        stepId: '',
    };
    gradeLevelId;
    isEditSalary = false;
    isGlSteps = false;
    @Output() selectedIndexChange: EventEmitter<number>;

    permissionEditSalaryScales = [PermissionConstant.SALARYSCALES_EDIT];
    permissionDeleteSalaryScales = [PermissionConstant.SALARYSCALES_DELETE];

    constructor(private salaryScalesService: SalaryScalesService,
                private _matDialog: MatDialog,
                private router:Router
                ) {
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

            if (this.selectedId.salScaleId && data && data.length) {
                this.salaryScales.forEach(v => {
                    if (this.selectedId.salScaleId === v.id) {
                        v['isSelected'] = true;
                        this.goToGradeLevel(v, 'gradeL');
                        if (this.selectedId.gradeLeId && this.gradeLevels) {
                            this.gradeLevels.forEach(gl => {
                                if (this.selectedId.gradeLeId === gl.id) {
                                    gl['isSelected'] = true;
                                    this.gradeLevelId = gl.id;
                                    this.stepsLevels = gl['gradeLevelSteps'];
                                    this.goToStepLevel(gl);

                                    if (this.selectedId.stepId && this.stepsLevels) {
                                        this.stepsLevels.forEach(sl => {
                                            if (this.selectedId.stepId === sl.id) {
                                                sl['isSelected'] = true;
                                            } else {
                                                sl['isSelected'] = false;
                                            }
                                        });
                                    }
                                } else {
                                    gl['isSelected'] = false;
                                }
                            });
                        }
                    } else {
                        v['isSelected'] = false;
                    }
                });
            } else {
                this.goToGradeLevel(this.salaryScales[this.selectIndex]);
            }
        });
    }

    addEntitlementSalaryScale(salaryScale) {
        this.router.navigateByUrl('dashboard/leave-entitlement-salary-scales/' + salaryScale.id);
    }

    addEntitlementGradeLevel(gradeLevel) {
        this.router.navigateByUrl('dashboard/leave-entitlement-grade-levels/' + gradeLevel.id);
    }

    deleteItemModalSalaryScale(items) {
        this.dialogRef = this._matDialog.open(DeleteListModalComponent, {
            panelClass: 'delete-items-dialog',
            data: {data: items}
        });
        this.dialogRef.afterClosed().subscribe((response: boolean) => {
            if (response) {
                this.deleteSalaryScales(items.id);
            }
        });

    } 

    deleteSalaryScales(id) {
        this.salaryScales.forEach(v => {
            if (id === v.id) {
                v['isSelected'] = true;
                this.isNotAutoCreate = v.isAutomaticCreate;
                this.salaryScalesId = v.id;
                this.gradeLevels = v.gradeLevels;
            } else {
                v['isSelected'] = false;
            }
        });
        this.salaryScalesService.deleteSalaryScales(id).subscribe(data => {
            if (data) {
                this.getSalaryScales();
            }
        });
    }

    editSalaryScales(salaryScale) {
        this.salaryScales.forEach(v => {
            if (salaryScale.id === v.id) {
                v['isSelected'] = true;
                this.isNotAutoCreate = v.isAutomaticCreate;
                this.salaryScalesId = v.id;
                this.gradeLevels = v.gradeLevels;
            } else {
                v['isSelected'] = false;
            }
        });
        this.selectedId.salScaleId = salaryScale.id;
        this.selectedId.gradeLeId = '';
        this.selectedId.stepId = '';
        this.dialogRef = this._matDialog.open(SalaryScalesCreateComponent, {
            panelClass: 'contact-form-dialog',
            data: {action: 'EDIT', salaryScale: salaryScale},
        });
        this.dialogRef.afterClosed().subscribe((response: FormGroup) => {
            if (!response) {
                return;
            }
            this.getSalaryScales();
            this.isEditSalary = true;
        });
    }

    goToGradeLevel(value, item?) {
        this.selectedId.salScaleId = value.id;
        this.gradeLevels = [];
        this.stepsLevels = [];
        this.salaryScales.forEach(v => {
            if (value.id === v.id) {
                v['isSelected'] = true;
                this.isNotAutoCreate = v.isAutomaticCreate;
                this.salaryScalesId = v.id;
                // this.selectTab = 0;
                this.isGlSteps = false;
                this.gradeLevels = v.gradeLevels;
                if (item !== 'gradeL' || (item === 'gradeL' && this.isEditSalary)) {
                    this.goToStepLevel(this.gradeLevels[this.selectIndex]);
                }

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

    }

    goToStepLevel(value) {
        this.isEditSalary = false;
        this.selectedId.gradeLeId = value.id;
        this.stepsLevels = [];
        this.gradeLevels.forEach(v => {
            if (value.id === v.id) {
                v['isSelected'] = true;
                this.gradeLevelId = v.id;
                // this.selectTab = 1;
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
        this.selectedId.gradeLeId = gradeLevel.id;
        this.selectedId.stepId = '';
        // console.log('----->>>>', this.selectedId);
        this.gradeLevels.forEach(v => {
            if (gradeLevel.id === v.id) {
                v['isSelected'] = true;
                this.gradeLevelId = v.id;
                this.stepsLevels = v['gradeLevelSteps'];
            } else {
                v['isSelected'] = false;
            }
        });
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

    deleteItemModalGradeLevel(items) {
        this.dialogRef = this._matDialog.open(DeleteListModalComponent, {
            panelClass: 'delete-items-dialog',
            data: {data: items}
        });
        this.dialogRef.afterClosed().subscribe((response: boolean) => {
            if (response) {
                this.deleteGradeLevel(items.id);
            }
        });

    } 

    deleteGradeLevel(id) {
        this.gradeLevels.forEach(v => {
            if (id === v.id) {
                v['isSelected'] = true;
                this.gradeLevelId = v.id;
                this.stepsLevels = v['gradeLevelSteps'];
            } else {
                v['isSelected'] = false;
            }
        });
        // console.log('----->>>>', this.selectedId);
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
        this.selectedId.stepId = stepLevel.id;
        this.stepsLevels.forEach(v => {
            if (stepLevel.id === v.id) {
                v['isSelected'] = true;
            } else {
                v['isSelected'] = false;
            }
        });
        this.dialogRef = this._matDialog.open(StepLevelCreateComponent, {
            panelClass: 'contact-form-dialog',
            data: {action: 'EDIT', stepLevel: stepLevel},
        });
        this.dialogRef.afterClosed().subscribe((response: FormGroup) => {
            if (!response) {
                return;
            }
            this.getSalaryScales();
            this.isGlSteps = true;
        });
    }

    deleteItemModalStepLevel(items) {
        this.dialogRef = this._matDialog.open(DeleteListModalComponent, {
            panelClass: 'delete-items-dialog',
            data: {data: items}
        });
        this.dialogRef.afterClosed().subscribe((response: boolean) => {
            if (response) {
                this.deleteStepLevel(items.id);
            }
        });

    } 

    deleteStepLevel(id) {
        this.salaryScalesService.deleteStepLevel(id).subscribe(data => {
            if (data) {
                this.getSalaryScales();
            }
        });
    }

    glStepLevel(value) {
        this.selectedId.stepId = value.id;
        this.stepsLevels.forEach(v => {
            if (value.id === v.id) {
                v['isSelected'] = true;
            } else {
                v['isSelected'] = false;
            }
        });
    }
}
