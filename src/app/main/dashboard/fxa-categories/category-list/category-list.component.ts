import {Component, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {fuseAnimations} from '../../../../../@fuse/animations';
import {FxaCategoriesService} from '../../../../shared/services/fxa-categories.service';
import {Router} from '@angular/router';
import {FlatTreeControl} from '@angular/cdk/tree';
import {MatTreeFlatDataSource, MatTreeFlattener} from '@angular/material/tree';
import {CreateCategoryComponent} from '../create-category/create-category.component';
import {FormGroup} from '@angular/forms';
import {AddCreateAdminSegmentsComponent} from '../../admin-segments/add-create-admin-segments/add-create-admin-segments.component';
import {MatDialog} from '@angular/material/dialog';
import {DeleteListModalComponent} from '../../delete-list-modal/delete-list-modal.component';

interface SegmentNode {
    id: number;
    parentId: number;
    title: string;
    depreciationRate: string;
    depreciationMethod: string;
    assetNoPrefixLine: string;
    fixedAssetAcctId: string;
    accumDeprAcctId: string;
    deprExpsAcctId: string;
    subCategories?: SegmentNode[];
    createdAt?: string;
    updatedAt?: string;
    individualCode: string;
    combinedCode: string;
    maxLevel: number;
    characterCount: number;
    isActive: number;
}

const TREE_DATA: SegmentNode[] = [];

interface ExampleFlatNode {
    expandable: boolean;
    title: string;
    level: number;
}

@Component({
    selector: 'app-category-list',
    templateUrl: './category-list.component.html',
    styleUrls: ['./category-list.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class CategoryListComponent implements OnInit {
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
            depreciationRate: node.depreciationRate,
            depreciationMethod: node.depreciationMethod,
            assetNoPrefixLine: node.assetNoPrefixLine,
            fixedAssetAcctId: node.fixedAssetAcctId,
            accumDeprAcctId: node.accumDeprAcctId,
            deprExpsAcctId: node.deprExpsAcctId,
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
        this.fxaCategoryService.getCategories(param).subscribe(
            data => {
                const treeData: any = {
                    id: 0,
                    isChildEnabled: true,
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
        this.dialogRef = this._matDialog.open(CreateCategoryComponent, {
            minWidth: 1200,
            panelClass: 'contact-form-dialog',
            data
        });
        this.dialogRef.afterClosed().subscribe((response: FormGroup) => {
            this.getCategories();
        });
    }

    editItem(node): void {
        this.dialogRef = this._matDialog.open(CreateCategoryComponent, {
            minWidth: 1200,
            panelClass: 'contact-form-dialog',
            data: {action: 'EDIT', node: node, levelConfig: this.levelConfig}
        });
        this.dialogRef.afterClosed().subscribe((response: FormGroup) => {
            this.getCategories();
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
