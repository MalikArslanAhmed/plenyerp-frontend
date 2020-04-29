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

    constructor(private salaryScalesService: SalaryScalesService,
                private _matDialog: MatDialog) {
    }

    ngOnInit(): void {
        this.getSalaryScales();
    }

    getSalaryScales() {
        this.salaryScalesService.getSalaryScales({'page': -1}).subscribe(data => {
            this.salaryScales = data;
            console.log('---->>>', this.salaryScales);

            if (this.salaryScales && this.salaryScales.length > 0) {
                let i = 1;
                this.salaryScales.forEach(skill => {
                    skill['sno'] = i;
                    i++;
                });
            }
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
}
