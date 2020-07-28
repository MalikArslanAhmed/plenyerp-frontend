import {Component, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {fuseAnimations} from "../../../../../@fuse/animations";
import {FlatTreeControl} from "@angular/cdk/tree";
import {MatTreeFlatDataSource, MatTreeFlattener} from "@angular/material/tree";
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import {FuseSidebarService} from "../../../../../@fuse/components/sidebar/sidebar.service";
import {StoreSetupCategoriesService} from 'app/shared/services/store-setup-categories.service';

interface CategoriesNode {
    id: number;
    isChildEnabled: boolean;
    parentId: number;
    name: string;
    children?: CategoriesNode[];
    isActive: boolean;
}

const TREE_DATA: CategoriesNode[] = [];

interface ExampleFlatNode {
    expandable: boolean;
    name: string;
    level: number;
}

@Component({
    selector: 'app-categories-list-select',
    templateUrl: './categories-list-select.component.html',
    styleUrls: ['./categories-list-select.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class CategoriesListSelectComponent implements OnInit {
    private _transformer = (node: CategoriesNode, level: number) => {
        return {
            expandable: !!node.children && node.children.length > 0,
            name: node.name,
            level: level,
            id: node.id,
            isChildEnabled: node.isChildEnabled,
            parentId: node.parentId,
            isActive: node.isActive,
            children: node.children
        };
    };
    treeControl = new FlatTreeControl<ExampleFlatNode>(node => node.level, node => node.expandable);
    treeFlattener = new MatTreeFlattener(this._transformer, node => node.level, node => node.expandable, node => node.children);
    dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);
    hasChild = (_: number, node: ExampleFlatNode) => node.expandable;
    dialogRef: any;
    @ViewChild('tree') tree;

    constructor(public matDialogRef: MatDialogRef<CategoriesListSelectComponent>,
                private storeSetupCategoriesService: StoreSetupCategoriesService,
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
                children: this.storeSetupCategoriesData(data),
                isActive: false
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
}
