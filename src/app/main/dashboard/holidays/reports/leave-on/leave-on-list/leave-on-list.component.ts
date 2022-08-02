import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { FlatTreeControl } from "@angular/cdk/tree";
import { MatTreeFlatDataSource, MatTreeFlattener } from "@angular/material/tree";
import { FormBuilder, FormGroup } from "@angular/forms";
import { ActivatedRoute } from "@angular/router";
import { fuseAnimations } from '@fuse/animations';
import { AdminSegmentServices } from 'app/shared/services/admin-segment.services';
import { EmployeesService } from 'app/shared/services/employees.service';
import { ContactInfoService } from 'app/shared/services/contact-info.service';
import * as moment from 'moment'
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
    selector: 'leave-on-list',
    templateUrl: './leave-on-list.component.html',
    styleUrls: ['./leave-on-list.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class LeaveOnListComponent implements OnInit {
    moment = moment
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

    treeControl = new FlatTreeControl<ExampleFlatNode>(node => node.level, node => node.expandable);
    treeFlattener = new MatTreeFlattener(this._transformer, node => node.level, node => node.expandable, node => node.children);
    dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);
    dialogRef: any;
    segmentId: number;
    levelConfig: any;
    hasChild = (_: number, node: ExampleFlatNode) => node.expandable;
    displayedColumns = ['id', 'File No', 'Employee Name', 'leave type', 'exp start date', 'e duration', 'exp end date','req closed','R.O FileNo','HOD FileNo','HR FileNo'];
    pagination = {
        page: 1,
        total: null,
        perpage: 15,
        pages: null
    };
    paramsTosend: any = {
        search: '',
        fromDate: '',
        toDate: '',
        status: ''
    }
    adminSegmentSearchForm: FormGroup;
    selectedCategory: any;
    adminSegmentAllIds = [];
    choosenNode: any;
    leaveRequestList = []
    dateChecks = {
        fromMinDate: null,
        fromMaxDate: null,
        toMinDate: null,
        toMaxDate: null,
    }
    collapseAdminSegment = true
    constructor(
        private contactInfoService: ContactInfoService,
        private route: ActivatedRoute,
        private adminSegmentServices: AdminSegmentServices,
        private employeesService: EmployeesService,
        private fb: FormBuilder) {
        this.dataSource.data = TREE_DATA;
    }

    ngOnInit(): void {
        this.adminSegmentSearchForm = this.fb.group({
            fromDate: [''],
            toDate: [''],
            search: [''],
        });
        this.route.paramMap.subscribe(params => {
            this.segmentId = 1;
        });
        this.getSegmentList();
        this.getLeaveRequests({});
        this.adminSegmentSearchForm.get('fromDate').valueChanges.subscribe((resp: any) => {
            this.dateChecks.toMinDate = new Date(this.adminSegmentSearchForm.controls.fromDate.value)

        })
        this.adminSegmentSearchForm.get('toDate').valueChanges.subscribe((resp: any) => {
            this.dateChecks.fromMaxDate = new Date(this.adminSegmentSearchForm.controls.toDate.value)

        })
    }
    selectOption(item) {
        this.paramsTosend.status = item
        this.getLeaveRequests(this.paramsTosend)
    }
    fromDateChange() {
        this.paramsTosend.fromDate = moment(this.adminSegmentSearchForm.controls.fromDate.value).format("YYYY-MM-DD HH:mm:ss")
        if (this.adminSegmentSearchForm.controls.fromDate.value && this.adminSegmentSearchForm.controls.toDate.value) {
            this.getLeaveRequests(this.paramsTosend);
        }
    }

    toDateChange() {
        this.paramsTosend.toDate = moment(this.adminSegmentSearchForm.controls.toDate.value).format("YYYY-MM-DD HH:mm:ss")
        if (this.adminSegmentSearchForm.controls.toDate.value && this.adminSegmentSearchForm.controls.fromDate.value) {
            this.getLeaveRequests(this.paramsTosend);
        }
    }

    getLeaveRequests(params) {
        params['page'] = this.pagination.page;
        this.contactInfoService.getLeaveRequestReportList({ ...params, approvedHod: 'approved', approvedHr: 'approved'}).subscribe(data => {
            this.leaveRequestList = data.items;
            this.pagination.page = data.page;
            this.pagination.total = data.total;
            if (this.leaveRequestList && this.leaveRequestList.length > 0) {
                let i = 1;
                this.leaveRequestList.forEach(val => {
                    val['sno'] = i;
                    i++;
                });
            }
        })
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
        this.getLeaveRequests({});
    }

    getItemsBySearch(searchValue) {
        this.selectedCategory = undefined;
        this.paramsTosend.search = searchValue
        this.getLeaveRequests(this.paramsTosend);
    }

    resetTransFilter() {
        this.adminSegmentSearchForm.patchValue({
            'search': '',
            'fromDate': '',
            'toDate': '',
        });
        this.selectedCategory = undefined;
        this.paramsTosend = {
            'search': '',
            'fromDate': '',
            'toDate': '',
        }
        this.getLeaveRequests({});
    }

    setAdminSegment(node) {
        this.choosenNode = node;
        this.adminSegmentAllIds = [];
        this.adminSegmentAllIds.push(node.id);
        this.findAllIds(node);
        this.selectedCategory = node.name;
        this.getLeaveRequests({ adminSegmentIds: JSON.stringify(this.adminSegmentAllIds), ...this.paramsTosend });
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
        this.getLeaveRequests({});
    }
}
