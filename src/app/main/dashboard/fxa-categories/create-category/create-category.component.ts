import {Component, Inject, OnInit, ViewEncapsulation} from '@angular/core';
import {fuseAnimations} from '../../../../../@fuse/animations';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {StructureService} from '../../../../shared/services/structure.service';
import {FuseSidebarService} from '../../../../../@fuse/components/sidebar/sidebar.service';
import {MAT_DIALOG_DATA, MatDialog} from '@angular/material/dialog';
import {ActivatedRoute, Router} from '@angular/router';
import {AlertService} from '../../../../shared/services/alert.service';
import {FxaCategoriesService} from '../../../../shared/services/fxa-categories.service';
import {FlatTreeControl} from '@angular/cdk/tree';
import {MatTreeFlatDataSource, MatTreeFlattener} from '@angular/material/tree';
import {AddCreateAdminSegmentsComponent} from '../../admin-segments/add-create-admin-segments/add-create-admin-segments.component';
import {SummaryAdminSegmentSelectComponent} from '../../summary-admin-segment-select/summary-admin-segment-select.component';
import {EconomicSegmentSelectComponent} from '../../journal-voucher/economic-segment-select/economic-segment-select.component';

@Component({
    selector: 'app-create-category',
    templateUrl: './create-category.component.html',
    styleUrls: ['./create-category.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class CreateCategoryComponent implements OnInit {
    selectedCategory: any;
    parentNode: any;
    categoryForm: FormGroup;
    dialogRef: any;
    adminSegments = [];
    fixedAssetAcctAr = [];
    accumDeprAcctAr = [];
    deprExpsAcctAr = [];

    constructor(private structureService: StructureService,
                private _fuseSidebarService: FuseSidebarService,
                private _matDialog: MatDialog,
                private fb: FormBuilder,
                private fxaCategoryService: FxaCategoriesService,
                @Inject(MAT_DIALOG_DATA) private _data: any,
                private router: Router) {
        if (_data.parent) {
            this.parentNode = _data.parent;
        }
    }

    ngOnInit(): void {
        this.refresh();
    }


    refresh(): void {
        this.categoryForm = this.fb.group({
            title: ['', Validators.required],
            depreciationRate: [''],
            depreciationMethod: [''],
            assetNoPrefixLine: [''],
            fixedAssetAcctId: [''],
            accumDeprAcctId: [''],
            deprExpsAcctId: [''],
        });
    }

    saveCategories(): void {
        const reqObj = {
            ...this.categoryForm.value
        };
        if (this.parentNode) {
            reqObj['parent_id'] = this.parentNode.id;
        }
        this.fxaCategoryService.saveCategories(reqObj).subscribe(
            data => {
                this.router.navigateByUrl('dashboard/fixed-assets-categories');
            }
        );
    }

    updateCategories(): void {
        this.fxaCategoryService.updateCategories(this.selectedCategory.id, this.categoryForm.value).subscribe(
            data => {
                this.router.navigateByUrl('dashboard/fixed-assets-categories');
            }
        );
    }

    fixedAssetAcct(type): void {
        this.dialogRef = this._matDialog.open(EconomicSegmentSelectComponent, {
            panelClass: 'contact-form-dialog',
        });
        this.dialogRef.afterClosed().subscribe((response) => {
            if (!response) {
                return;
            }
            this.fixedAssetAcctAr = [];
            this.fixedAssetAcctAr = [{
                name: response.name,
                id: response.id
            }];
            this.categoryForm.patchValue({
                fixedAssetAcctId: response.id,
            });

        });
    }

    accumDeprAcct(type): void {
        this.dialogRef = this._matDialog.open(EconomicSegmentSelectComponent, {
            panelClass: 'contact-form-dialog',
        });
        this.dialogRef.afterClosed().subscribe((response) => {
            if (!response) {
                return;
            }

            this.accumDeprAcctAr = [];
            this.accumDeprAcctAr = [{
                name: response.name,
                id: response.id
            }];

            this.categoryForm.patchValue({
                accumDeprAcctId: response.id,
            });

        });
    }

    deprExpsAcct(type): void {
        this.dialogRef = this._matDialog.open(EconomicSegmentSelectComponent, {
            panelClass: 'contact-form-dialog',
        });
        this.dialogRef.afterClosed().subscribe((response) => {
            if (!response) {
                return;
            }
            this.deprExpsAcctAr = [];
            this.deprExpsAcctAr = [{
                name: response.name,
                id: response.id
            }];
            this.categoryForm.patchValue({
                deprExpsAcctId: response.id,
            });

        });
    }

}
