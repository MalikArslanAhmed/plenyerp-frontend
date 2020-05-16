import {Component, Inject, OnInit, ViewEncapsulation, ViewChild} from '@angular/core';
import {FlatTreeControl} from "@angular/cdk/tree";
import {MatTreeFlatDataSource, MatTreeFlattener} from "@angular/material/tree";
import {FuseSidebarService} from "../../../../../@fuse/components/sidebar/sidebar.service";
import {ActivatedRoute} from "@angular/router";
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";
import {AdminSegmentServices} from "../../../../shared/services/admin-segment.services";
import {AddCreateAdminSegmentsComponent} from "../../admin-segments/add-create-admin-segments/add-create-admin-segments.component";
import {FormGroup} from "@angular/forms";
import {fuseAnimations} from "../../../../../@fuse/animations";

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
    selector: 'app-department-list-select',
    templateUrl: './department-list-select.component.html',
    styleUrls: ['./department-list-select.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class DepartmentListSelectComponent implements OnInit {
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
    @ViewChild('tree') tree;

    constructor(public matDialogRef: MatDialogRef<DepartmentListSelectComponent>,
                @Inject(MAT_DIALOG_DATA) private _data: any,
                private _fuseSidebarService: FuseSidebarService,
                private route: ActivatedRoute,
                private _matDialog: MatDialog,
                private adminSegmentServices: AdminSegmentServices) {
        this.dataSource.data = TREE_DATA;
    }

    hasChild = (_: number, node: ExampleFlatNode) => node.expandable;

    ngOnInit(): void {
        this.route.paramMap.subscribe(params => {
            this.segmentId = 1;
        });
        this.getSegmentList();
    }

    getSegmentList() {
        this.adminSegmentServices.getAllSegments(this.segmentId).subscribe(data => {
            this.segmentName = data.name;
            this.dataSource.data = [data];
            this.tree.treeControl.expandAll();
        })
    }

    addItem(node) {
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
