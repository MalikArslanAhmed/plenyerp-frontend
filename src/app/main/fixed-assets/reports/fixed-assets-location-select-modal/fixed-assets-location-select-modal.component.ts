import { Component, Inject, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { FlatTreeControl } from '@angular/cdk/tree';
import { MatTreeFlatDataSource, MatTreeFlattener } from '@angular/material/tree';
import { FuseSidebarService } from '@fuse/components/sidebar/sidebar.service';
import { FxaCategoriesService } from 'app/shared/services/fxa-categories.service';
import { FxaAssetsService } from 'app/shared/services/fxa-assets.service';
import { WorkLocationService } from 'app/shared/services/work-location.service';

interface WorkLocationNode {
    id: number;
    isChildEnabled: boolean;
    parentId: number;
    name: string;
    children?: WorkLocationNode[];
}

const TREE_DATA: WorkLocationNode[] = [];

interface ExampleFlatNode {
    expandable: boolean;
    name: string;
    level: number;
}


@Component({
    selector: 'app-fixed-assets-location-select-modal',
    templateUrl: './fixed-assets-location-select-modal.component.html',
    styleUrls: ['./fixed-assets-location-select-modal.component.scss']
})
export class FixedAssetsLocationSelectModalComponent implements OnInit {

    @ViewChild('tree') tree;
    private _transformer = (node: WorkLocationNode, level: number) => {
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
    dialogRef: any;
    segmentName: string;
    segmentId: number;
    levelConfig: any;
    choosenNode: any;
    locationsAllIds = [];
    selectedLocation: any;
    params

    constructor(public matDialogRef: MatDialogRef<FixedAssetsLocationSelectModalComponent>,
        @Inject(MAT_DIALOG_DATA) private _data: any,
        private fxaAssetsService: FxaAssetsService,
        private route: ActivatedRoute,
        private workLocationService: WorkLocationService,
        private _matDialog: MatDialog) {
        this.dataSource.data = TREE_DATA;
    }

    hasChild = (_: number, node: ExampleFlatNode) => node.expandable;

    ngOnInit(): void {
        this.route.paramMap.subscribe(params => {
            this.segmentId = 2;
        });
        this.getList();
    }

    getList(): void {
        this.workLocationService.getWorkLocations({ 'page': -1 }).subscribe(
            data => {
                const treeData: any = {
                    id: 0,
                    isChildEnabled: true,
                    parentId: 0,
                    name: 'Work Locations',
                    children: this.workLocationData(data)
                };
                this.dataSource.data = [treeData];
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

    setCategoryIds(node) {
        this.choosenNode = node;
        this.locationsAllIds = [];
        this.locationsAllIds.push(node);
        this.selectedLocation = node.name;
        this.matDialogRef.close({ location: this.locationsAllIds[0] })

    }
    
    resetSelection() {
        this.choosenNode = undefined;
        this.locationsAllIds = [];
        this.selectedLocation = undefined;
    }
}
