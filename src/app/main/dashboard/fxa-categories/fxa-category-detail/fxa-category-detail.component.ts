import {Component, OnInit, ViewChild} from '@angular/core';
import {FlatTreeControl} from '@angular/cdk/tree';
import {MatTreeFlatDataSource, MatTreeFlattener} from '@angular/material/tree';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {StructureService} from '../../../../shared/services/structure.service';
import {FuseSidebarService} from '../../../../../@fuse/components/sidebar/sidebar.service';
import {MatDialog} from '@angular/material/dialog';
import {FxaCategoriesService} from '../../../../shared/services/fxa-categories.service';
import {ActivatedRoute, Router} from '@angular/router';
import {AlertService} from '../../../../shared/services/alert.service';
import {AddCreateAdminSegmentsComponent} from '../../admin-segments/add-create-admin-segments/add-create-admin-segments.component';

interface SegmentNode {
    id: number;
    parentId: number;
    title: string;
    children?: SegmentNode[];
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
    name: string;
    level: number;
}

@Component({
  selector: 'app-fxa-category-detail',
  templateUrl: './fxa-category-detail.component.html',
  styleUrls: ['./fxa-category-detail.component.scss']
})
export class FxaCategoryDetailComponent implements OnInit {
    @ViewChild('tree') tree;
    categoryName;
    treeControl = new FlatTreeControl<ExampleFlatNode>(node => node.level, node => node.expandable);
    treeFlattener = new MatTreeFlattener((node: SegmentNode, level: number) => {
        return {
            expandable: !!node.children && node.children.length > 0,
            name: node.title,
            level: level,
            id: node.id,
            isActive: true,
            parentId: node.parentId,
            maxLevel: node.maxLevel,
            individualCode: node.individualCode,
            characterCount: node.characterCount,
            combinedCode: node.combinedCode,
            children: node.children,
            showDelete: node.children && node.children.length === 0
        };
    }, node => node.level, node => node.expandable, node => node.children);
    dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);
    categoryForm: FormGroup;
    selectedCategoryId: any;
    dialogRef: any;
    levelConfig: any;

    constructor(private structureService: StructureService,
                private _fuseSidebarService: FuseSidebarService,
                private _matDialog: MatDialog,
                private fb: FormBuilder,
                private fxaCategoryService: FxaCategoriesService,
                private router: Router,
                private activatedRoute: ActivatedRoute,
                private alertService: AlertService) {
    }

    ngOnInit(): void {
        this.refresh();
        this.getCategoryChild();
    }

    refresh(): void {
        this.categoryForm = this.fb.group({
            title: ['', Validators.required],
            depreciationRate: [''],
            depreciationMethod: [''],
            assetNoPrefixLine: ['']
        });
    }

    hasChild = (_: number, node: ExampleFlatNode) => node.expandable;


    getCategoryChild(): void {
        const param = {
            parentId: 1
        };
        this.fxaCategoryService.getCategories(param).subscribe(
            data => {
                console.log('===', data.items);
                const treeData: any = {
                    title: 'Test',
                    children: data.items,
                    SegmentNode: 0
                };
                this.dataSource.data = [treeData];
                this.tree.treeControl.expandAll();
            }
        );
    }

    saveCategories(): void {
        this.fxaCategoryService.saveCategories(this.categoryForm.value).subscribe(
            data => {
                this.router.navigateByUrl('dashboard/fixed-assets-categories');
            }
        );
    }

    updateCategories(): void {
        this.fxaCategoryService.updateCategories(this.selectedCategoryId, this.categoryForm.value).subscribe(
            data => {
                this.router.navigateByUrl('dashboard/fixed-assets-categories');
            }
        );
    }

    addItem(node): void {
        this.dialogRef = this._matDialog.open(AddCreateAdminSegmentsComponent, {
            panelClass: 'contact-form-dialog',
            data: {action: 'CREATE', node: node, levelConfig: this.levelConfig}
        });
        this.dialogRef.afterClosed().subscribe((response: FormGroup) => {
            console.log(response);
            if (!response) {
                return;
            }
            this.getCategoryChild();
        });
    }

    editItem(node): void {
        this.dialogRef = this._matDialog.open(AddCreateAdminSegmentsComponent, {
            panelClass: 'contact-form-dialog',
            data: {action: 'EDIT', node: node, levelConfig: this.levelConfig}
        });
        this.dialogRef.afterClosed().subscribe((response: FormGroup) => {
            console.log(response);
            if (!response) {
                return;
            }
            this.getCategoryChild();
        });
    }

    deleteItem(node): void {
        this.fxaCategoryService.deleteCategories(node.id).subscribe(data => {
            this.getCategoryChild();
        });
    }

}
