import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {TransactionService} from '../../../shared/services/transaction.service';
import {fuseAnimations} from '../../../../@fuse/animations';
import {MatDialogRef} from '@angular/material/dialog';
import {PageEvent} from '@angular/material/paginator';
import {NestedTreeControl} from '@angular/cdk/tree';
import {MatTreeNestedDataSource} from '@angular/material/tree';


interface FoodNode {
    name: string;
    children?: FoodNode[];
}
const TREE_DATA: FoodNode[] = [
    {
        name: 'Fruit',
        children: [
            {name: 'Apple'},
            {name: 'Banana'},
            {name: 'Fruit loops'},
        ]
    },
    {
        name: 'Fruit',
        children: [
            {name: 'Apple'},
            {name: 'Banana'},
            {name: 'Fruit loops'},
        ]
    }
];
@Component({
    selector: 'app-transactions-items',
    templateUrl: './transactions-items.component.html',
    styleUrls: ['./transactions-items.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class TransactionsItemsComponent implements OnInit {
    treeControl = new NestedTreeControl<FoodNode>(node => node.children);
    dataSource = new MatTreeNestedDataSource<FoodNode>();
    storeItems = [];
    pagination = {
        page: 1,
        total: null,
        perpage: 15,
        pages: null
    };
    pageEvent: PageEvent;
    dialogRef: any;
    displayedColumns: string[] = ['sno', 'id', 'description', 'unitPrice', 'category', 'actions'];

    constructor(private transactionService: TransactionService,
                public matDialogRef: MatDialogRef<TransactionsItemsComponent>) {
        this.dataSource.data = TREE_DATA;
    }

    ngOnInit(): void {
        this.getItems();
    }
    hasChild = (_: number, node: FoodNode) => !!node.children && node.children.length > 0;

    getItems(params = {}) {
        this.transactionService.getItems(params).subscribe(data => {
            this.storeItems = data.items;
            console.log(this.storeItems);
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

    onPageChange(page) {
        this.pagination.page = page.pageIndex + 1;
        this.getItems();
    }

    itemsFilter(item) {
        console.log('---', item.name);
    }
}
