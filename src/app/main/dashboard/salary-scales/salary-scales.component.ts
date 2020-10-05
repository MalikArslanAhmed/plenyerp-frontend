import {Component, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {FuseSidebarService} from '../../../../@fuse/components/sidebar/sidebar.service';
import {MatDialog} from '@angular/material/dialog';
import {FormGroup} from '@angular/forms';
import {SkillCreateComponent} from '../skills/skill-create/skill-create.component';
import {SkillListComponent} from '../skills/skill-list/skill-list.component';
import {fuseAnimations} from '../../../../@fuse/animations';
import {SalaryScalesCreateComponent} from './salary-scales-create/salary-scales-create.component';
import {SalaryScalesListComponent} from './salary-scales-list/salary-scales-list.component';
import { PermissionConstant } from 'app/shared/constants/permission-constant';

@Component({
    selector: 'app-salary-scales',
    templateUrl: './salary-scales.component.html',
    styleUrls: ['./salary-scales.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class SalaryScalesComponent implements OnInit {
    dialogRef: any;
    @ViewChild(SalaryScalesListComponent) getSalaryScale: SalaryScalesListComponent;

    permissionAddSalaryScale = [PermissionConstant.SALARYSCALES_ADD];
    constructor(
        private _fuseSidebarService: FuseSidebarService,
        private _matDialog: MatDialog) {
    }

    ngOnInit(): void {
    }

    addSalaryScales() {
        this.dialogRef = this._matDialog.open(SalaryScalesCreateComponent, {
            panelClass: 'contact-form-dialog',
            data: {action: 'CREATE'}
        });
        this.dialogRef.afterClosed().subscribe((response: FormGroup) => {
            if (!response) {
                return;
            }
            this.getSalaryScale.getSalaryScales();
        });
    }
}
