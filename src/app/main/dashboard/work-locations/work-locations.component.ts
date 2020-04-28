import {FlatTreeControl} from '@angular/cdk/tree';
import {Component, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {MatTreeFlatDataSource, MatTreeFlattener} from '@angular/material/tree';
import {WorkLocationService} from "../../../shared/services/work-location.service";
import {fuseAnimations} from "../../../../@fuse/animations";
import {FormGroup} from "@angular/forms";
import {FuseSidebarService} from "../../../../@fuse/components/sidebar/sidebar.service";
import {MatDialog} from "@angular/material/dialog";
import {UpdateWorkLocationsComponent} from './update-work-locations/update-work-locations.component';

/**
 * Food data with nested structure.
 * Each node has a name and an optional list of children.
 */
interface WorkLocationNode {
    id: number;
    isChildEnabled: boolean;
    name: string;
    children?: WorkLocationNode[];
}

/*const TREE_DATA: WorkLocationNode[] = [
    {
        id: 1,
        isChildEnabled: true,
        name: 'Fruit',
        children: [
            {name: 'Apple', id: 1, isChildEnabled: true},
            {name: 'Banana', id: 1, isChildEnabled: true},
            {name: 'Fruit loops', id: 1, isChildEnabled: true}
        ]
    },
    {
        id: 2,
        isChildEnabled: true,
        name: 'Vegetables',
        children: [
            {
                id: 2,
                isChildEnabled: true,
                name: 'Green',
                children: [
                    {name: 'Broccoli', id: 1, isChildEnabled: true},
                    {name: 'Brussels sprouts', id: 1, isChildEnabled: true},
                ]
            },
            {
                id: 2,
                isChildEnabled: true,
                name: 'Orange',
                children: [
                    {name: 'Pumpkins', id: 1, isChildEnabled: true},
                    {name: 'Carrots', id: 1, isChildEnabled: true}
                ]
            },
        ]
    },
];*/
// console.log('this.getWorkLocations()', this.workLocations);
const TREE_DATA: WorkLocationNode[] = [];

/** Flat node with expandable and level information */
interface ExampleFlatNode {
    expandable: boolean;
    name: string;
    level: number;
}

@Component({
    selector: 'app-work-locations',
    templateUrl: './work-locations.component.html',
    styleUrls: ['./work-locations.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class WorkLocationsComponent implements OnInit {
    checkLevel = 0;
    private _transformer = (node: WorkLocationNode, level: number) => {
        return {
            expandable: !!node.children && node.children.length > 0,
            name: node.name,
            level: level
        };
    }
    treeControl = new FlatTreeControl<ExampleFlatNode>(node => node.level, node => node.expandable);
    treeFlattener = new MatTreeFlattener(this._transformer, node => node.level, node => node.expandable, node => node.children);
    dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);
    hasChild = (_: number, node: ExampleFlatNode) => node.expandable;

    dialogRef: any;
    workLocations = [];

    constructor(private workLocationService: WorkLocationService,
                private _fuseSidebarService: FuseSidebarService,
                private _matDialog: MatDialog) {
        this.dataSource.data = TREE_DATA;
    }

    ngOnInit(): void {
        this.getWorkLocations();
        // this.dataSource.data = TREE_DATA;
    }

    getWorkLocations() {
        this.workLocationService.getWorkLocations({'page': -1}).subscribe(data => {
            this.dataSource.data = this.workLocationData(data.items);
            // console.log('this.dataSource', this.dataSource);
            // console.log('this.dataSource.data', this.dataSource.data);
        });
    }

    workLocationData(data) {
        data.forEach(workLocation => {
            workLocation['children'] = workLocation['subCategories'];
            this.workLocationData(workLocation['children']);
        });
        return data;
    }

    addItem(node) {
        const data = this.getSelectedItem(node);
        console.log(node);
        this.dialogRef = this._matDialog.open(UpdateWorkLocationsComponent, {
            panelClass: 'contact-form-dialog',
            data: {action: 'CREATE', node: node}
        });
        this.dialogRef.afterClosed().subscribe((response: FormGroup) => {
            if (!response) {
                return;
            }
            // this.getWorkLocations();
        });
    }

    editItem(node) {
        console.log('node', node);
        this.dialogRef = this._matDialog.open(UpdateWorkLocationsComponent, {
            panelClass: 'contact-form-dialog',
            data: {action: 'EDIT', node: node}
        });
        this.dialogRef.afterClosed().subscribe((response: FormGroup) => {
            if (!response) {
                return;
            }
            // this.getWorkLocations();
        });
    }

    deleteItem(node) {
        console.log('node', node);
    }

    getSelectedItem(node) {
        console.log('data', node.level);
        console.log('this.dataSource.data', this.dataSource.data);
        if (this.dataSource.data && this.dataSource.data.length > 0) {
            // console.log('this.dataSource.data', this.dataSource.data[node.level]);
            // this.getSelectedLevelData(node.level, this.dataSource.data);
        }
        return node;
    }

    /*getSelectedLevelData(level) {
        let selectedLevelData = [];
        this.dataSource.data.forEach(data => {
            console.log('data1111111', data);
            // console.log('11111111', this.workLocationData(data['children']));
            selectedLevelData.push(this.workLocationData(data['children']));
        });
        console.log('selectedLevelData', selectedLevelData);
    }*/
}