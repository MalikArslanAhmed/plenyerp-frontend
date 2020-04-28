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
    parentId: number;
    name: string;
    children?: WorkLocationNode[];
}

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
    private _transformer = (node: WorkLocationNode, level: number) => {
        return {
            expandable: !!node.children && node.children.length > 0,
            name: node.name,
            level: level,
            id: node.id,
            isChildEnabled: node.isChildEnabled,
            parentId: node.parentId
        };
    }
    treeControl = new FlatTreeControl<ExampleFlatNode>(node => node.level, node => node.expandable);
    treeFlattener = new MatTreeFlattener(this._transformer, node => node.level, node => node.expandable, node => node.children);
    dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);
    hasChild = (_: number, node: ExampleFlatNode) => node.expandable;

    dialogRef: any;

    constructor(private workLocationService: WorkLocationService,
                private _fuseSidebarService: FuseSidebarService,
                private _matDialog: MatDialog) {
        this.dataSource.data = TREE_DATA;
    }

    ngOnInit(): void {
        this.getWorkLocations();
    }

    getWorkLocations() {
        this.workLocationService.getWorkLocations({'page': -1}).subscribe(data => {
            this.dataSource.data = [{
                id: 0,
                isChildEnabled: true,
                parentId: 0,
                name: 'Work Locations',
                children: this.workLocationData(data)
            }];
        });
    }

    workLocationData(data) {
        if (data && data.length > 0) {
            data.forEach(workLocation => {
                workLocation['children'] = workLocation['subCategories'];
                this.workLocationData(workLocation['children']);
            });
            return data;
        }
    }

    addItem(node) {
        this.dialogRef = this._matDialog.open(UpdateWorkLocationsComponent, {
            panelClass: 'contact-form-dialog',
            data: {action: 'CREATE', node: node}
        });
        this.dialogRef.afterClosed().subscribe((response: FormGroup) => {
            if (!response) {
                return;
            }
            this.getWorkLocations();
        });
    }

    editItem(node) {
        this.dialogRef = this._matDialog.open(UpdateWorkLocationsComponent, {
            panelClass: 'contact-form-dialog',
            data: {action: 'EDIT', node: node}
        });
        this.dialogRef.afterClosed().subscribe((response: FormGroup) => {
            if (!response) {
                return;
            }
            this.getWorkLocations();
        });
    }

    deleteItem(node) {
        this.workLocationService.deleteWorkLocation(node.id).subscribe(data => {
            if (data) {
                this.getWorkLocations();
            }
        })
    }
}