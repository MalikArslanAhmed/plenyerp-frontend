import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {FormGroup} from "@angular/forms";
import {fuseAnimations} from "../../../../../@fuse/animations";
import {AcdemicMajorCreateComponent} from '../acdemic-major-create/acdemic-major-create.component';
import {AcademicMajorService} from "../../../../shared/services/academic-major.service";

@Component({
    selector: 'app-acdemic-major-list',
    templateUrl: './acdemic-major-list.component.html',
    styleUrls: ['./acdemic-major-list.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class AcdemicMajorListComponent implements OnInit {
    academicMajors = [];
    displayedColumns = ['id', 'name', 'status', 'actions'];
    dialogRef: any;

    constructor(private academicMajorService: AcademicMajorService,
                private _matDialog: MatDialog) {
    }

    ngOnInit(): void {
        this.getAcademicMajors();
    }

    getAcademicMajors() {
        this.academicMajorService.getAcademicMajors({'page': -1}).subscribe(data => {
            this.academicMajors = data.items;
            if (this.academicMajors && this.academicMajors.length > 0) {
                let i = 1;
                this.academicMajors.forEach(academic => {
                    academic['sno'] = i;
                    i++;
                });
            }
        });
    }

    deleteAcademicMajor(id) {
        this.academicMajorService.deleteAcademicMajor(id).subscribe(data => {
            if (data) {
                this.getAcademicMajors();
            }
        })
    }

    editAcademicMajor(academicMajor) {
        this.dialogRef = this._matDialog.open(AcdemicMajorCreateComponent, {
            panelClass: 'contact-form-dialog',
            data: {action: 'EDIT', academicMajor: academicMajor},
        });
        this.dialogRef.afterClosed().subscribe((response: FormGroup) => {
            if (!response) {
                return;
            }
            this.getAcademicMajors();
        });
    }
}