import {Component, Inject, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {fuseAnimations} from "../../../../../../@fuse/animations";
import {FlatTreeControl} from "@angular/cdk/tree";
import {MatTreeFlatDataSource, MatTreeFlattener} from "@angular/material/tree";
import {FormBuilder, FormGroup} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";
import {FuseSidebarService} from "../../../../../../@fuse/components/sidebar/sidebar.service";
import {ActivatedRoute} from "@angular/router";
import {AdminSegmentServices} from "../../../../../shared/services/admin-segment.services";
import {EmployeesService} from "../../../../../shared/services/employees.service";

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
    selector: 'app-admin-segment-employee-select',
    templateUrl: './admin-segment-employee-select.component.html',
    styleUrls: ['./admin-segment-employee-select.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class AdminSegmentEmployeeSelectComponent implements OnInit {
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
    employees = [];
    head: any;
    allowType: any = 'BOTH';
    nodeData = [];

    constructor(public matDialogRef: MatDialogRef<AdminSegmentEmployeeSelectComponent>,
                @Inject(MAT_DIALOG_DATA) private _data: any,
                private _fuseSidebarService: FuseSidebarService,
                private route: ActivatedRoute,
                private _matDialog: MatDialog,
                private adminSegmentServices: AdminSegmentServices,
                private employeesService: EmployeesService,
                private fb: FormBuilder) {
        this.dataSource.data = TREE_DATA;
        if (_data.node) {
            this.nodeData = [_data.node];
        } else {
            this.nodeData = [];
        }
        this.head = _data.head;
        this.allowType = _data.allow;
    }

    treeControl = new FlatTreeControl<ExampleFlatNode>(node => node.level, node => node.expandable);
    treeFlattener = new MatTreeFlattener(this._transformer, node => node.level, node => node.expandable, node => node.children);
    dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);
    dialogRef: any;
    segmentId: number;
    levelConfig: any;
    hasChild = (_: number, node: ExampleFlatNode) => node.expandable;
    displayedColumns = ['Staff ID', 'File No', 'Employee Name', 'Action'];
    pagination = {
        page: 1,
        total: null,
        perpage: 15,
        pages: null
    };
    adminSegmentSearchForm: FormGroup;
    selectedCategory: any;
    adminSegmentAllIds = [];
    choosenNode: any;

    ngOnInit(): void {
        this.adminSegmentSearchForm = this.fb.group({
            search: [''],
        });
        this.route.paramMap.subscribe(params => {
            this.segmentId = 1;
        });
        this.getSegmentList();
        this.getEmployees({});
    }

    getSegmentList() {
        this.adminSegmentServices.getAllSegments(this.segmentId).subscribe(data => {
            if (this.nodeData && this.nodeData.length > 0) {
                this.dataSource.data = this.nodeData;
            } else {
                this.dataSource.data = [data];
            }
            this.tree.treeControl.expandAll();
        });
    }

    onPageChange(page) {
        this.pagination.page = page.pageIndex + 1;
        this.getEmployees({});
    }

    getEmployees(params): void {
        params['page'] = this.pagination.page;
        params['payee'] = 'payee';
        this.employees = [];
        this.employeesService.getEmployees(params).subscribe(data => {
            this.employees = data.items;

            if (this.employees && this.employees.length > 0) {
                let i = 1;
                this.employees.forEach(category => {
                    category['sno'] = i;
                    i++;
                });
            }
            this.pagination.page = data.page;
            this.pagination.total = data.total;
        });
    }

    getItemsBySearch(params) {
        this.selectedCategory = undefined;
        this.getEmployees(params);
    }

    resetTransFilter() {
        this.adminSegmentSearchForm.patchValue({
            'search': '',
        });
        this.selectedCategory = undefined;
        this.getEmployees({});
    }

    setAdminSegment(node) {
        this.choosenNode = node;
        this.adminSegmentAllIds = [];
        this.adminSegmentAllIds.push(node.id);
        this.findAllIds(node);
        this.selectedCategory = node.name;
        this.getEmployees({adminSegmentIds: JSON.stringify(this.adminSegmentAllIds)});
    }

    findAllIds(data) {
        data.children.forEach(item => {
            if (item.children && item.children.length > 0) {
                this.adminSegmentAllIds.push(item.id);
                this.findAllIds(item);
            } else {
                this.adminSegmentAllIds.push(item.id);
                return;
            }
        });
    }

    resetSelection() {
        this.choosenNode = undefined;
        this.adminSegmentAllIds = [];
        this.adminSegmentAllIds = [];
        this.selectedCategory = undefined;
        this.getEmployees({});
    }
}
