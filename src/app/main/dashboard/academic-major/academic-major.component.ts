import {Component, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {fuseAnimations} from "../../../../@fuse/animations";
import {FuseSidebarService} from "../../../../@fuse/components/sidebar/sidebar.service";
import {MatDialog} from "@angular/material/dialog";
import {FormGroup} from "@angular/forms";
import {AcdemicMajorListComponent} from './acdemic-major-list/acdemic-major-list.component';
import {AcdemicMajorCreateComponent} from './acdemic-major-create/acdemic-major-create.component';
import { PermissionConstant } from 'app/shared/constants/permission-constant';

@Component({
    selector: 'app-academic-major',
    templateUrl: './academic-major.component.html',
    styleUrls: ['./academic-major.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class AcademicMajorComponent implements OnInit {
    dialogRef: any;
    @ViewChild(AcdemicMajorListComponent) getAcademicMajor: AcdemicMajorListComponent;

    permissionAddMajor = [PermissionConstant.ACADEMIC_MAJORS_ADD];
    
    constructor(
        private _fuseSidebarService: FuseSidebarService,
        private _matDialog: MatDialog) {
    }

    ngOnInit(): void {
    }

    addMajorAcademic() {
        this.dialogRef = this._matDialog.open(AcdemicMajorCreateComponent, {
            panelClass: 'contact-form-dialog',
            data: {action: 'CREATE'}
        });
        this.dialogRef.afterClosed().subscribe((response: FormGroup) => {
            if (!response) {
                return;
            }
            this.getAcademicMajor.getAcademicMajors();
        });
    }
}
