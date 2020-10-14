import {FlatTreeControl} from '@angular/cdk/tree';
import {Component, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {MatTreeFlatDataSource, MatTreeFlattener} from '@angular/material/tree';
import {MatDialog} from '@angular/material/dialog';
import {fuseAnimations} from '../../../../../@fuse/animations';
import {FuseSidebarService} from '../../../../../@fuse/components/sidebar/sidebar.service';
import {AddCreateAdminSegmentsComponent} from '../add-create-admin-segments/add-create-admin-segments.component';
import {AdminSegmentServices} from '../../../../shared/services/admin-segment.services';
import {FormGroup} from '@angular/forms';

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
            combinedCode: node.combinedCode,
            children: node.children,
            showDelete: node.children.length === 0
        };
    };
    @ViewChild('tree') tree;

    constructor(private _fuseSidebarService: FuseSidebarService, private route: ActivatedRoute,
                private _matDialog: MatDialog, private adminSegmentServices: AdminSegmentServices) {
        this.dataSource.data = TREE_DATA;
    }

    treeControl = new FlatTreeControl<ExampleFlatNode>(node => node.level, node => node.expandable);
    treeFlattener = new MatTreeFlattener(this._transformer, node => node.level, node => node.expandable, node => node.children);
    dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);

    dialogRef: any;
    segmentName: string;
    segmentId: number;
    levelConfig: any;

    hasChild = (_: number, node: ExampleFlatNode) => node.expandable;

    ngOnInit(): void {
        this.route.paramMap.subscribe(params => {
            this.segmentId = +params.get('segmentId');
            console.log('this.segmentId', this.segmentId);
        });
        this.getSegmentList();
    }

    getSegmentList() {
        this.adminSegmentServices.getAllSegments(this.segmentId).subscribe(data => {
            // console.log('data', data);
            this.segmentName = data.name;
            this.levelConfig = data.levelConfig;
            this.dataSource.data = [data];
            this.tree.treeControl.expandAll();
        });
    }

    addItem(node) {
        this.dialogRef = this._matDialog.open(AddCreateAdminSegmentsComponent, {
            panelClass: 'contact-form-dialog',
            data: {action: 'CREATE', node: node, levelConfig: this.levelConfig}
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
            data: {action: 'EDIT', node: node, levelConfig: this.levelConfig}
        });
        this.dialogRef.afterClosed().subscribe((response: FormGroup) => {
            console.log(response);
            if (!response) {
                return;
            }
            this.getSegmentList();
        });
    }

    deleteItem(node) {
        this.adminSegmentServices.deleteSegment(node.id).subscribe(data => {
            this.getSegmentList();
        });
    }
}
