import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {fuseAnimations} from "../../../../../@fuse/animations";
import {QualificationService} from "../../../../shared/services/qualification.service";
import {QualificationCreateComponent} from "../qualification-create/qualification-create.component";
import {FormGroup} from "@angular/forms";
import {MatDialog} from "@angular/material/dialog";

@Component({
    selector: 'app-qualification-list',
    templateUrl: './qualification-list.component.html',
    styleUrls: ['./qualification-list.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class QualificationListComponent implements OnInit {
    qualifications = [];
    displayedColumns = ['id', 'name', 'status', 'actions'];
    dialogRef: any;

    constructor(private qualificationService: QualificationService,
                private _matDialog: MatDialog) {
    }

    ngOnInit(): void {
        this.getQualifications();
    }

    getQualifications() {
        this.qualificationService.getQualifications({'page': -1}).subscribe(data => {
            this.qualifications = data.items;

            if (this.qualifications && this.qualifications.length > 0) {
                let i = 1;
                this.qualifications.forEach(qualification => {
                    qualification['sno'] = i;
                    i++;
                });
            }
        });
    }

    deleteQualification(id) {
        this.qualificationService.deleteQualification(id).subscribe(data => {
            if (data) {
                this.getQualifications();
            }
        })
    }

    editQualification(qualification) {
        console.log('id', qualification);
        this.dialogRef = this._matDialog.open(QualificationCreateComponent, {
            panelClass: 'contact-form-dialog',
            data: {action: 'EDIT', qualification: qualification},
        });
        this.dialogRef.afterClosed().subscribe((response: FormGroup) => {
            if (!response) {
                return;
            }
            this.getQualifications();
        });
    }
}
