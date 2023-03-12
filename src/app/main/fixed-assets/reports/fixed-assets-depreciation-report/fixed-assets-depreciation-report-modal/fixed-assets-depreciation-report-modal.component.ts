import { Component, Inject, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { FlatTreeControl } from '@angular/cdk/tree';
import { MatTreeFlatDataSource, MatTreeFlattener } from '@angular/material/tree';
import { FuseSidebarService } from '@fuse/components/sidebar/sidebar.service';
import { FxaCategoriesService } from 'app/shared/services/fxa-categories.service';
import { FxaAssetsService } from 'app/shared/services/fxa-assets.service';

interface SegmentNode {
    id: number;
    parentId: number;
    title: string;
    depreciationRate: string;
    depreciationMethod: string;
    individualCode: string;
    combinedCode: string;
    nextAssetNo: string;

    fixedAssetAcctId: string;
    fixedAssetAcct: object;
    accumDeprAcctId: string;
    accumDeprAcct: object;
    deprExpsAcctId: string;
    deprExpsAcct: object;
    subCategories?: SegmentNode[];
    createdAt?: string;
    updatedAt?: string;
    maxLevel: number;
    characterCount: number;
    isActive: number;
    isParent: boolean;
}

const TREE_DATA: SegmentNode[] = [];

interface ExampleFlatNode {
    expandable: boolean;
    title: string;
    level: number;
}


@Component({
    selector: 'app-fixed-assets-depreciation-report-modal',
    templateUrl: './fixed-assets-depreciation-report-modal.component.html',
    styleUrls: ['./fixed-assets-depreciation-report-modal.component.scss']
})
export class FixedAssetsDepreciationReportModalComponent implements OnInit {

    @ViewChild('tree') tree;
    treeControl = new FlatTreeControl<ExampleFlatNode>(node => node.level, node => node.expandable);
    treeFlattener = new MatTreeFlattener((node: SegmentNode, level: number) => {
        return {
            expandable: !!node.subCategories && node.subCategories.length > 0,
            id: node.id,
            title: node.title,
            isParent: node.isParent,
            depreciationRate: node.depreciationRate,
            depreciationMethod: node.depreciationMethod,
            fixedAssetAcctId: node.fixedAssetAcctId,
            fixedAssetAcct: node.fixedAssetAcct,
            accumDeprAcctId: node.accumDeprAcctId,
            accumDeprAcct: node.accumDeprAcct,
            deprExpsAcctId: node.deprExpsAcctId,
            deprExpsAcct: node.deprExpsAcct,
            level: level,
            isActive: true,
            parentId: node.parentId,
            maxLevel: node.maxLevel,
            individualCode: node.individualCode,
            combinedCode: node.combinedCode,
            nextAssetNo: node.nextAssetNo,
            characterCount: node.characterCount,
            subCategories: node.subCategories,
            showDelete: node.subCategories && node.subCategories.length === 0
        };
    }, node => node.level, node => node.expandable, node => node.subCategories);
    dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);
    dialogRef: any;
    segmentName: string;
    segmentId: number;
    levelConfig: any;
    choosenNode: any;
    categoriesAllIds = [];
    selectedCategory: any;
    selectedMonth = ''
    params
    months = [
        { value: 1, name: 'January' },
        { value: 2, name: 'February' },
        { value: 3, name: 'March' },
        { value: 4, name: 'April' },
        { value: 5, name: 'May' },
        { value: 6, name: 'June' },
        { value: 7, name: 'July' },
        { value: 8, name: 'August' },
        { value: 9, name: 'September' },
        { value: 10, name: 'October' },
        { value: 11, name: 'November' },
        { value: 12, name: 'December' },
    ]
    constructor(public matDialogRef: MatDialogRef<FixedAssetsDepreciationReportModalComponent>,
        @Inject(MAT_DIALOG_DATA) private _data: any,
        private _fuseSidebarService: FuseSidebarService,
        private fxaCategoryService: FxaCategoriesService,
        private fxaAssetsService: FxaAssetsService,
        private route: ActivatedRoute,
        private _matDialog: MatDialog) {
        this.dataSource.data = TREE_DATA;
    }

    hasChild = (_: number, node: ExampleFlatNode) => node.expandable;

    ngOnInit(): void {
        this.route.paramMap.subscribe(params => {
            this.segmentId = 2;
            // console.log('this.segmentId', this.segmentId);
        });
        this.getList();
    }



    getList(): void {
        this.fxaCategoryService.getCategories({ isParent: true }).subscribe(
            data => {
                const treeData: any = {
                    id: 0,
                    isChildEnabled: true,
                    isParent: true,
                    parentId: 0,
                    title: 'Categories',
                    subCategories: data.items
                };
                this.dataSource.data = [treeData];
                this.tree.treeControl.expandAll();
            });
    }
    setCategoryIds(node) {
        // this.choosenNode = node;
        // this.categoriesAllIds = [];
        // this.categoriesAllIds.push(node.id);

        // this.findAllIds(node);
        // this.selectedCategory = node.title;
        // console.log('node', this.categoriesAllIds);
        this.choosenNode = node;
        this.categoriesAllIds = [];
        this.categoriesAllIds.push(node.id);
        this.selectedCategory = node.title;
    }
    proceedDepreciation() {
        this.fxaAssetsService.fixedAssetsReport({ categoriesAllIds: this.categoriesAllIds[0], dep_month: this.selectedMonth }).subscribe(data => {
            this.matDialogRef.close({data:data,categoriesAllIds :this.categoriesAllIds[0],dep_month: this.selectedMonth})
        })
        // this.fxaAssetsService.fixedAssetsReport({ categoriesAllIds: JSON.stringify(this.categoriesAllIds), dep_month: this.selectedMonth }).subscribe(data => {
        //     this.matDialogRef.close({data:data,categoriesAllIds :JSON.stringify(this.categoriesAllIds),dep_month: this.selectedMonth})
        // })
    }
    resetSelection() {
        this.choosenNode = undefined;
        this.categoriesAllIds = [];
        this.selectedCategory = undefined;
    }
    findAllIds(data) {
        data.subCategories.forEach(item => {
            if (item.subCategories && item.subCategories.length > 0) {
                this.categoriesAllIds.push(item.id);
                this.findAllIds(item);
            } else {
                this.categoriesAllIds.push(item.id);
                return;
            }
        });
    }
}
