import {Component, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {TransactionService} from '../../../shared/services/transaction.service';
import {fuseAnimations} from '../../../../@fuse/animations';
import {MatDialogRef} from '@angular/material/dialog';
import {PageEvent} from '@angular/material/paginator';
import {FlatTreeControl} from '@angular/cdk/tree';
import {MatTreeFlatDataSource, MatTreeFlattener} from '@angular/material/tree';
import {StoreSetupCategoriesService} from 'app/shared/services/store-setup-categories.service';
import {FormBuilder, FormGroup} from "@angular/forms";

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
    selector: 'app-transactions-items-select',
    templateUrl: './transactions-items-select.component.html',
    styleUrls: ['./transactions-items-select.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class TransactionsItemsSelectComponent implements OnInit {
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
    storeItems = [];
    pagination = {
        page: 1,
        total: null,
        perpage: 15,
        pages: null
    };
    pageEvent: PageEvent;
    displayedColumns: string[] = ['sno', 'id', 'description', 'unitPrice', 'category', 'actions'];
    selectedCategory: any;
    transactionItemsForm: FormGroup;
    itemCategoryAllIds =[];

    constructor(private transactionService: TransactionService,
                public matDialogRef: MatDialogRef<TransactionsItemsSelectComponent>,
                private storeSetupCategoriesService: StoreSetupCategoriesService,
                private fb: FormBuilder) {
        this.dataSource.data = TREE_DATA;
    }

    ngOnInit(): void {
        this.refresh();
        this.getItems();
        this.getStoresCategories();
    }

    refresh() {
        this.transactionItemsForm = this.fb.group({
            search: [''],
        });
    }

    getItems(params = {}) {
        this.transactionService.getItems(params).subscribe(data => {
            this.storeItems = data.items;
            this.pagination.page = data.page;
            this.pagination.total = data.total;
            if (this.storeItems && this.storeItems.length > 0) {
                let i = 1;
                this.storeItems.forEach(company => {
                    company['sno'] = i;
                    i++;
                });
            }
        });
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

    onPageChange(page) {
        this.pagination.page = page.pageIndex + 1;
        this.getItems();
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

    setCategory(node) {
        this.itemCategoryAllIds = [];
        this.itemCategoryAllIds.push(node.id);
        this.findAllIds(node);
        this.selectedCategory = node.name;
        this.getItems({categoryIds: JSON.stringify(this.itemCategoryAllIds)});
    }

    findAllIds(data){
        data.children.forEach(item => {
            if(item.children && item.children.length){
                this.itemCategoryAllIds.push(item.id);
                this.findAllIds(item);
            }else{
                this.itemCategoryAllIds.push(item.id);
                return;
            }
        });
    }

    cancelSelectedCategory() {
        this.selectedCategory = undefined;
        this.getItems();
    }

    resetTransFilter() {
        this.transactionItemsForm.patchValue({
            'search': '',
        });
        this.selectedCategory = undefined;
        this.getItems();
    }

    getItemsBySearch(params) {
        this.selectedCategory = undefined;
        this.getItems(params);
    }
}
