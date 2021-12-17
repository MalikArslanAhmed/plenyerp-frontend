import {Component, OnInit} from '@angular/core';
import {PermissionConstant} from '../../../shared/constants/permission-constant';
import {FormBuilder, FormGroup} from '@angular/forms';
import {FuseSidebarService} from '../../../../@fuse/components/sidebar/sidebar.service';
import {MatDialog} from '@angular/material/dialog';
import {CreateCategoryComponent} from './create-category/create-category.component';
import {Router} from '@angular/router';

@Component({
    selector: 'app-fxa-categories',
    templateUrl: './fxa-categories.component.html',
    styleUrls: ['./fxa-categories.component.scss']
})
export class FxaCategoriesComponent implements OnInit {

    constructor(private _fuseSidebarService: FuseSidebarService,
                private _matDialog: MatDialog,
                private router: Router,
                private fb: FormBuilder) {
    }

    dialogRef: any;
    permissionAddJV = [PermissionConstant.ADD_GL_JV];
    selectedCategoryId: any;
    employeeForm: FormGroup;
    ngOnInit(): void {
    }

    addCategories() {
        this.router.navigateByUrl(`/dashboard/fxa-categories-create`);
    }

    addCategonries() {
        this.dialogRef = this._matDialog.open(CreateCategoryComponent, {
            panelClass: 'contact-form-dialog',
            data: {action: 'CREATE'}
        });
        this.dialogRef.afterClosed().subscribe((response: FormGroup) => {
            if (!response) {
                return;
            }
            // this.getJournalVoucherData.getJournalVoucherList();
        });
    }
}
