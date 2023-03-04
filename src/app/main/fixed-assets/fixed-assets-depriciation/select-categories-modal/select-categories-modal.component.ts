import { FlatTreeControl } from '@angular/cdk/tree';
import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatTreeFlatDataSource, MatTreeFlattener } from '@angular/material/tree';
import { ActivatedRoute } from '@angular/router';
import { FuseSidebarService } from '@fuse/components/sidebar/sidebar.service';
import { FxaAssetsService } from 'app/shared/services/fxa-assets.service';
import { FxaCategoriesService } from 'app/shared/services/fxa-categories.service';

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
  selector: 'app-select-categories-modal',
  templateUrl: './select-categories-modal.component.html',
  styleUrls: ['./select-categories-modal.component.scss']
})
export class SelectCategoriesModalComponent implements OnInit {

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

    constructor(public matDialogRef: MatDialogRef<SelectCategoriesModalComponent>,
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
        this.choosenNode = node;
        this.categoriesAllIds = [];
        this.categoriesAllIds.push(node);

        this.findAllIds(node);
        this.selectedCategory = node.title;
        this.matDialogRef.close(this.categoriesAllIds)

    }

    resetSelection() {
        this.choosenNode = undefined;
        this.categoriesAllIds = [];
        this.selectedCategory = undefined;
    }
    findAllIds(data) {
        data.subCategories.forEach(item => {
            if (item.subCategories && item.subCategories.length > 0) {
                this.categoriesAllIds.push(item);
                this.findAllIds(item);
            } else {
                this.categoriesAllIds.push(item);
                return;
            }
        });
    }
}
