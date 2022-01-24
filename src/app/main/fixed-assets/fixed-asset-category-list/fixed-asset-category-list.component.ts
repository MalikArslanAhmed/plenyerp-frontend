import {Component, OnInit, ViewChild} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {MatDialog} from '@angular/material/dialog';
import {Router} from '@angular/router';
import {FlatTreeControl} from '@angular/cdk/tree';
import {MatTreeFlatDataSource, MatTreeFlattener} from '@angular/material/tree';
import {FxaCategoriesService} from '../../../shared/services/fxa-categories.service';
import {FixedAssetCategoryCreateComponent} from '../fixed-asset-category-create/fixed-asset-category-create.component';
import {DeleteListModalComponent} from '../../dashboard/delete-list-modal/delete-list-modal.component';


interface SegmentNode {
    id: number;
    parentId: number;
    title: string;
    depreciationRate: string;
    depreciationMethod: string;
    depreciationMethodId: string;
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
    selector: 'app-fixed-asset-category-list',
    templateUrl: './fixed-asset-category-list.component.html',
    styleUrls: ['./fixed-asset-category-list.component.scss']
})
export class FixedAssetCategoryListComponent implements OnInit {
    @ViewChild('tree') tree;
    categories = [];
    dialogRef: any;
    levelConfig: any;
    treeControl = new FlatTreeControl<ExampleFlatNode>(node => node.level, node => node.expandable);
    treeFlattener = new MatTreeFlattener((node: SegmentNode, level: number) => {
        return {
            expandable: !!node.subCategories && node.subCategories.length > 0,
            id: node.id,
            title: node.title,
            isParent: node.isParent,
            depreciationRate: node.depreciationRate,
            depreciationMethodId: node.depreciationMethodId,
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

    constructor(private fxaCategoryService: FxaCategoriesService,
                private _matDialog: MatDialog,
                private router: Router) {
    }

    ngOnInit(): void {
        this.getCategories();
    }

    hasChild = (_: number, node: ExampleFlatNode) => node.expandable;

    getCategories(): void {
        const param = {
            isParent: true
        };
        this.dataSource.data = [];
        this.fxaCategoryService.getCategories(param).subscribe(
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
            }
        );
    }

    addItem(node): void {
        const data = {action: 'CREATE', node: node, levelConfig: this.levelConfig};
        if (node.id) {
            data['parent'] = node;
        }
        this.dialogRef = this._matDialog.open(FixedAssetCategoryCreateComponent, {
            minWidth: 1200,
            panelClass: 'contact-form-dialog',
            data
        });
        this.dialogRef.afterClosed().subscribe((response: any) => {
            if (response && response.doRefresh) {
                this.getCategories();
            }
        });
    }

    editItem(node): void {
        this.dialogRef = this._matDialog.open(FixedAssetCategoryCreateComponent, {
            minWidth: 1200,
            panelClass: 'contact-form-dialog',
            data: {action: 'EDIT', node: node, levelConfig: this.levelConfig}
        });
        this.dialogRef.afterClosed().subscribe((response: any) => {
            if (response && response.doRefresh) {
                this.getCategories();
            }
        });
    }

    deleteItemModal(node): void {
        this.dialogRef = this._matDialog.open(DeleteListModalComponent, {
            panelClass: 'delete-items-dialog',
            data: {data: node}
        });
        this.dialogRef.afterClosed().subscribe((response: boolean) => {
            if (response) {
                this.deleteItem(node);
            }
        });

    }

    deleteItem(node): void {
        this.fxaCategoryService.deleteCategories(node.id).subscribe(data => {
            this.getCategories();
        });
    }
}
