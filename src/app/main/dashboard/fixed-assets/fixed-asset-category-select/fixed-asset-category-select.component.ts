import {Component, Inject, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {fuseAnimations} from '../../../../../@fuse/animations';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material/dialog';
import {FuseSidebarService} from '../../../../../@fuse/components/sidebar/sidebar.service';
import {ActivatedRoute} from '@angular/router';
import {AdminSegmentServices} from '../../../../shared/services/admin-segment.services';
import {FlatTreeControl} from '@angular/cdk/tree';
import {MatTreeFlatDataSource, MatTreeFlattener} from '@angular/material/tree';
import {FxaCategoriesService} from '../../../../shared/services/fxa-categories.service';

interface SegmentNode {
    id: number;
    parentId: number;
    title: string;
    depreciationRate: string;
    depreciationMethod: string;
    assetNoPrefixLine: string;
    fixedAssetAcctId: string;
    fixedAssetAcct: object;
    accumDeprAcctId: string;
    accumDeprAcct: object;
    deprExpsAcctId: string;
    deprExpsAcct: object;
    subCategories?: SegmentNode[];
    createdAt?: string;
    updatedAt?: string;
    individualCode: string;
    combinedCode: string;
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
    selector: 'app-fixed-asset-category-select',
    templateUrl: './fixed-asset-category-select.component.html',
    styleUrls: ['./fixed-asset-category-select.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class FixedAssetCategorySelectComponent implements OnInit {
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
            assetNoPrefixLine: node.assetNoPrefixLine,
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
            characterCount: node.characterCount,
            combinedCode: node.combinedCode,
            subCategories: node.subCategories,
            showDelete: node.subCategories && node.subCategories.length === 0
        };
    }, node => node.level, node => node.expandable, node => node.subCategories);
    dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);
    dialogRef: any;
    segmentName: string;
    segmentId: number;
    levelConfig: any;

    constructor(public matDialogRef: MatDialogRef<FixedAssetCategorySelectComponent>,
                @Inject(MAT_DIALOG_DATA) private _data: any,
                private _fuseSidebarService: FuseSidebarService,
                private fxaCategoryService: FxaCategoriesService,
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
        this.fxaCategoryService.getCategories({isParent: true}).subscribe(
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
}
