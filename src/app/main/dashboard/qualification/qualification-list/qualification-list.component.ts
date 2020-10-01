import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {fuseAnimations} from '../../../../../@fuse/animations';
import {QualificationService} from '../../../../shared/services/qualification.service';
import {QualificationCreateComponent} from '../qualification-create/qualification-create.component';
import {FormGroup} from '@angular/forms';
import {MatDialog} from '@angular/material/dialog';
import {PageEvent} from '@angular/material/paginator';
import { DeleteListModalComponent } from '../../delete-list-modal/delete-list-modal.component';
import { PermissionConstant } from 'app/shared/constants/permission-constant';

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
    pagination = {
        page: 1,
        total: null,
        perpage: 15,
        pages: null
    };

    permissionEditQualification = [PermissionConstant.QUALIFICATION_EDIT];
    permissionDeleteQualification = [PermissionConstant.QUALIFICATION_DELETE];
    
    pageEvent: PageEvent;
    constructor(private qualificationService: QualificationService,
                private _matDialog: MatDialog) {
    }

    ngOnInit(): void {
        this.getQualifications();
    }

    getQualifications() {
        this.qualifications = [];
        this.qualificationService.getQualifications({page: this.pagination.page}).subscribe(data => {
            this.qualifications = data.items;
            this.pagination.page = data.page;
            this.pagination.total = data.total;
            if (this.qualifications && this.qualifications.length > 0) {
                let i = 1;
                this.qualifications.forEach(qualification => {
                    qualification['sno'] = i;
                    i++;
                });
            }
        });
    }

    deleteItemModal(items) {
        this.dialogRef = this._matDialog.open(DeleteListModalComponent, {
            panelClass: 'delete-items-dialog',
            data: {data: items}
        });
        this.dialogRef.afterClosed().subscribe((response: boolean) => {
            if (response) {
                this.deleteQualification(items.id);
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
    onPageChange(page) {
        this.pagination.page = page.pageIndex + 1;
        this.getQualifications();
    }
}
