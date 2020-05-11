import {FlatTreeControl} from '@angular/cdk/tree';
import {Component, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {MatTreeFlatDataSource, MatTreeFlattener} from '@angular/material/tree';
import {MatDialog} from '@angular/material/dialog';

import {fuseAnimations} from '../../../../../@fuse/animations';
import {FuseSidebarService} from '../../../../../@fuse/components/sidebar/sidebar.service';
import {AddCreateAdminSegmentsComponent} from '../add-create-admin-segments/add-create-admin-segments.component';
import {AdminSegmentServices} from '../../../../shared/services/admin-segment.services';
import {FormGroup} from '@angular/forms';

/**
 * Food data with nested structure.
 * Each node has a name and an optional list of children.
 */
interface SegmentNode {
    id: number;
    parentId: number;
    name: string;
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

/** Flat node with expandable and level information */
interface ExampleFlatNode {
    expandable: boolean;
    name: string;
    level: number;
}

@Component({
    selector: 'segment-details-component',
    templateUrl: './segment-details.component.html',
    styleUrls: ['./segment-details.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})

export class SegmentDetailsComponent implements OnInit {
    private _transformer = (node: SegmentNode, level: number) => {
        return {
            expandable: !!node.children && node.children.length > 0,
            name: node.name,
            level: level,
            id: node.id,
            isActive: node.isActive,
            parentId: node.parentId,
            maxLevel: node.maxLevel,
            individualCode: node.individualCode,
            characterCount: node.characterCount,
            children: node.children
        };
    };

    treeControl = new FlatTreeControl<ExampleFlatNode>(node => node.level, node => node.expandable);
    treeFlattener = new MatTreeFlattener(this._transformer, node => node.level, node => node.expandable, node => node.children);
    dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);

    dialogRef: any;
    segmentName: string;
    segmentId: number;

    constructor(private _fuseSidebarService: FuseSidebarService, private route: ActivatedRoute,
                private _matDialog: MatDialog, private adminSegmentServices: AdminSegmentServices) {
        this.dataSource.data = TREE_DATA;
    }

    hasChild = (_: number, node: ExampleFlatNode) => node.expandable;

    ngOnInit(): void {
        this.route.paramMap.subscribe(params => {
            this.segmentId = +params.get('segmentId');
        });
        this.getSegmentList();
    }

    getSegmentList(){
        this.adminSegmentServices.getAllSegments(this.segmentId).subscribe(data => {
            this.segmentName = data.name;
            this.dataSource.data = [data];
        });
    }

    addItem(node){
        this.dialogRef = this._matDialog.open(AddCreateAdminSegmentsComponent, {
            panelClass: 'contact-form-dialog',
            data: {action: 'CREATE', node: node}
        });
        this.dialogRef.afterClosed().subscribe((response: FormGroup) => {
            console.log(response);
            if (!response) {
                return;
            }
            this.getSegmentList();
        });
    }

    editItem(node) {
        this.dialogRef = this._matDialog.open(AddCreateAdminSegmentsComponent, {
            panelClass: 'contact-form-dialog',
            data: {action: 'EDIT', node: node}
        });
        this.dialogRef.afterClosed().subscribe((response: FormGroup) => {
            console.log(response);
            if (!response) {
                return;
            }
            this.getSegmentList();
        });
    }
}
