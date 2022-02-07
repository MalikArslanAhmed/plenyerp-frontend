import {Component, Inject, OnInit, ViewEncapsulation} from '@angular/core';
import {fuseAnimations} from '../../../../@fuse/animations';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {StructureService} from '../../../shared/services/structure.service';
import {FuseSidebarService} from '../../../../@fuse/components/sidebar/sidebar.service';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material/dialog';
import {FxaCategoriesService} from '../../../shared/services/fxa-categories.service';
import {EconomicSegmentSelectComponent} from '../../dashboard/journal-voucher/economic-segment-select/economic-segment-select.component';

@Component({
    selector: 'app-create-category',
    templateUrl: './fixed-asset-category-create.component.html',
    styleUrls: ['./fixed-asset-category-create.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class FixedAssetCategoryCreateComponent implements OnInit {
    dialogTitle = 'Add Category';
    parentNode: any;
    categoryForm: FormGroup;
    dialogRef: any;
    depreciationMethods = [];
    adminSegments = [];
    fixedAssetAcctAr = [];
    accumDeprAcctAr = [];
    deprExpsAcctAr = [];

    constructor(private structureService: StructureService,
                public matDialogRef: MatDialogRef<FixedAssetCategoryCreateComponent>,
                private _fuseSidebarService: FuseSidebarService,
                private _matDialog: MatDialog,
                private fb: FormBuilder,
                private fxaCategoryService: FxaCategoriesService,
                @Inject(MAT_DIALOG_DATA) private _data: any) {
        if (_data.parent) {
            this.parentNode = _data.parent;
        }
        if (this._data.action === 'EDIT') {
            this.dialogTitle = 'Edit Category';
        }
    }

    ngOnInit(): void {
        this.refresh(this._data.action === 'EDIT' ? this._data.node : {});
        this.patchForm(this._data.action === 'EDIT' ? this._data.node : this.parentNode);
        this.getDepreciation();
    }


    refresh(data): void {
        this.categoryForm = this.fb.group({
            id: [data.id || ''],
            title: [data.title || '', Validators.required],
            depreciationRate: [{
                value: this.parentNode ? this.parentNode.depreciationRate : (data.depreciationRate || ''),
                disabled: !!this.parentNode
            }],
            depreciationMethodId: [{
                value: this.parentNode ? this.parentNode.depreciationMethodId : (data.depreciationMethodId || ''),
                disabled: !!this.parentNode
            }],
            individualCode: [{
                value: data.individualCode,
                disabled: this._data.action === 'EDIT'
            }],
            nextAssetNo: [data.nextAssetNo || 1],
            combinedCode: [{
                value: this.parentNode ? this.parentNode.combinedCode : (data.combinedCode || ''),
                disabled: true
            }],
            isParent: [data.isParent || false],
            fixedAssetAcctId: [{
                value: this.parentNode ? this.parentNode.fixedAssetAcctId : (data.fixedAssetAcctId || ''),
                disabled: !!this.parentNode
            }],
            accumDeprAcctId: [{
                value: this.parentNode ? this.parentNode.accumDeprAcctId : (data.accumDeprAcctId || ''),
                disabled: !!this.parentNode
            }],
            deprExpsAcctId: [{
                value: this.parentNode ? this.parentNode.deprExpsAcctId : (data.deprExpsAcctId || ''),
                disabled: !!this.parentNode
            }],
        });
        if (data.id) {
            this.categoryForm.controls['isParent'].disable();
        }
    }

    getDepreciation(): void {
        this.fxaCategoryService.getDepreciation({}).subscribe(
            data => {
                this.depreciationMethods = data.items;
            }
        );
    }

    patchForm(updatedData): void {
        this.fixedAssetAcctAr = [{
            name: (updatedData && updatedData['fixedAssetAcct']) ? updatedData['fixedAssetAcct'].name : '',
            id: (updatedData && updatedData['fixedAssetAcct']) ? updatedData['fixedAssetAcct'].id : '',
        }];
        this.accumDeprAcctAr = [{
            name: (updatedData && updatedData['accumDeprAcct']) ? updatedData['accumDeprAcct'].name : '',
            id: (updatedData && updatedData['accumDeprAcct']) ? updatedData['accumDeprAcct'].id : '',
        }];
        this.deprExpsAcctAr = [{
            name: (updatedData && updatedData['deprExpsAcct']) ? updatedData['deprExpsAcct'].name : '',
            id: (updatedData && updatedData['deprExpsAcct']) ? updatedData['deprExpsAcct'].id : '',
        }];
    }

    saveCategories(): void {
        const reqObj = {
            ...this.categoryForm.getRawValue()
        };
        if (this.parentNode) {
            reqObj['parentId'] = this.parentNode.id;
        }
        this.fxaCategoryService.saveCategories(reqObj).subscribe(
            data => {
                this.matDialogRef.close({doRefresh: true});
            }
        );
    }

    updateCategories(): void {
        this.fxaCategoryService.updateCategories(this.categoryForm.value.id, this.categoryForm.value).subscribe(
            data => {
                this.matDialogRef.close({doRefresh: true});
            }
        );
    }

    fixedAssetAcct(type): void {
        if (!!this.parentNode) {
            return;
        }
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
        if (!!this.parentNode) {
            return;
        }
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
        if (!!this.parentNode) {
            return;
        }
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
