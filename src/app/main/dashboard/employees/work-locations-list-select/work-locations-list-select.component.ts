import {Component, Inject, OnInit, ViewChild} from '@angular/core';
import {FlatTreeControl} from "@angular/cdk/tree";
import {MatTreeFlatDataSource, MatTreeFlattener} from "@angular/material/tree";
import {WorkLocationService} from "../../../../shared/services/work-location.service";
import {FuseSidebarService} from "../../../../../@fuse/components/sidebar/sidebar.service";
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";
import {UpdateWorkLocationsComponent} from "../../work-locations/update-work-locations/update-work-locations.component";
import {FormGroup} from "@angular/forms";

interface WorkLocationNode {
    id: number;
    isChildEnabled: boolean;
    parentId: number;
    name: string;
    isActive: boolean;
    children?: WorkLocationNode[];
}

const TREE_DATA: WorkLocationNode[] = [];

interface ExampleFlatNode {
    expandable: boolean;
    name: string;
    level: number;
}

@Component({
    selector: 'app-work-locations-list-select',
    templateUrl: './work-locations-list-select.component.html',
    styleUrls: ['./work-locations-list-select.component.scss']
})
export class WorkLocationsListSelectComponent implements OnInit {
    private _transformer = (node: WorkLocationNode, level: number) => {
        return {
            expandable: !!node.children && node.children.length > 0,
            name: node.name,
            level: level,
            id: node.id,
            isChildEnabled: node.isChildEnabled,
            parentId: node.parentId,
            isActive: node.isActive
        };
    };
    treeControl = new FlatTreeControl<ExampleFlatNode>(node => node.level, node => node.expandable);
    treeFlattener = new MatTreeFlattener(this._transformer, node => node.level, node => node.expandable, node => node.children);
    dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);
    hasChild = (_: number, node: ExampleFlatNode) => node.expandable;
    dialogRef: any;
    @ViewChild('tree') tree;

    constructor(public matDialogRef: MatDialogRef<WorkLocationsListSelectComponent>,
                @Inject(MAT_DIALOG_DATA) private _data: any,
                private workLocationService: WorkLocationService,
                private _fuseSidebarService: FuseSidebarService,
                private _matDialog: MatDialog) {
        this.dataSource.data = TREE_DATA;
    }

    ngOnInit(): void {
        this.getWorkLocations();
    }

    getWorkLocations() {
        this.workLocationService.getWorkLocations({'page': -1,orderby: 'name'}).subscribe(data => {
            this.dataSource.data = [{
                id: 0,
                isChildEnabled: true,
                parentId: 0,
                name: 'Work Locations',
                isActive: false,
                children: this.workLocationData(data)
            }];
            this.tree.treeControl.expandAll();
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
}
