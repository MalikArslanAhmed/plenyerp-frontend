import {Component, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {FlatTreeControl} from "@angular/cdk/tree";
import {MatTreeFlatDataSource, MatTreeFlattener} from "@angular/material/tree";
import {FuseSidebarService} from "../../../../@fuse/components/sidebar/sidebar.service";
import {MatDialog} from "@angular/material/dialog";
import {FormGroup} from "@angular/forms";
import {fuseAnimations} from "../../../../@fuse/animations";
import {StoreSetupCategoriesCreateComponent} from './store-setup-categories-create/store-setup-categories-create.component';
import {StoreSetupCategoriesService} from 'app/shared/services/store-setup-categories.service';
import { DeleteListModalComponent } from '../delete-list-modal/delete-list-modal.component';

interface CategoriesNode {
    id: number;
    isChildEnabled: boolean;
    parentId: number;
    name: string;
    children?: CategoriesNode[];
}

const TREE_DATA: CategoriesNode[] = [];

interface ExampleFlatNode {
    expandable: boolean;
    name: string;
    level: number;
}

@Component({
    selector: 'app-store-setup-categories',
    templateUrl: './store-setup-categories.component.html',
    styleUrls: ['./store-setup-categories.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class StoreSetupCategoriesComponent implements OnInit {
    private _transformer = (node: CategoriesNode, level: number) => {
        return {
            expandable: !!node.children && node.children.length > 0,
            name: node.name,
            level: level,
            id: node.id,
            isChildEnabled: node.isChildEnabled,
            parentId: node.parentId,
        };
    };
    treeControl = new FlatTreeControl<ExampleFlatNode>(node => node.level, node => node.expandable);
    treeFlattener = new MatTreeFlattener(this._transformer, node => node.level, node => node.expandable, node => node.children);
    dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);
    hasChild = (_: number, node: ExampleFlatNode) => node.expandable;
    dialogRef: any;
    @ViewChild('tree') tree;

    constructor(private storeSetupCategoriesService: StoreSetupCategoriesService,
                private _fuseSidebarService: FuseSidebarService,
                private _matDialog: MatDialog) {
        this.dataSource.data = TREE_DATA;
    }

    ngOnInit(): void {
        this.getStoresCategories();
    }

    getStoresCategories() {
        this.storeSetupCategoriesService.getStoresCategories({'page': -1}).subscribe(data => {
            this.dataSource.data = [{
                id: 0,
                isChildEnabled: true,
                parentId: 0,
                name: 'Categories',
                children: this.storeSetupCategoriesData(data)
            }];
            this.tree.treeControl.expandAll();
        });
    }

    storeSetupCategoriesData(data) {
        if (data && data.length > 0) {
            data.forEach(category => {
                category['children'] = category['subCategories'];
                this.storeSetupCategoriesData(category['children']);
            });
            return data;
        }
    }

    addItem(node) {
        this.dialogRef = this._matDialog.open(StoreSetupCategoriesCreateComponent, {
            panelClass: 'contact-form-dialog',
            data: {action: 'CREATE', node: node}
        });
        this.dialogRef.afterClosed().subscribe((response: FormGroup) => {
            if (!response) {
                return;
            }
            this.getStoresCategories();
        });
    }

    editItem(node) {
        this.dialogRef = this._matDialog.open(StoreSetupCategoriesCreateComponent, {
            panelClass: 'contact-form-dialog',
            data: {action: 'EDIT', node: node}
        });
        this.dialogRef.afterClosed().subscribe((response: FormGroup) => {
            if (!response) {
                return;
            }
            this.getStoresCategories();
        });
    }
    deleteItemModal(items) {
        this.dialogRef = this._matDialog.open(DeleteListModalComponent, {
            panelClass: 'delete-items-dialog',
            data: {data: items}
        });
        this.dialogRef.afterClosed().subscribe((response: boolean) => {
            if (response) {
                this.deleteItem(items.id);
            }
        });

    }
 

    deleteItem(nodeId) {
        this.storeSetupCategoriesService.deleteStoreCategories(nodeId).subscribe(data => {
            if (data) {
                this.getStoresCategories();
            }
        })
    }
}
