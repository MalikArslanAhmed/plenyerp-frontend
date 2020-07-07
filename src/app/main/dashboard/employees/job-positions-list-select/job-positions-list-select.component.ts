import {Component, Inject, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {fuseAnimations} from "../../../../../@fuse/animations";
import {FlatTreeControl} from "@angular/cdk/tree";
import {MatTreeFlatDataSource, MatTreeFlattener} from "@angular/material/tree";
import {StructureService} from "../../../../shared/services/structure.service";
import {FuseSidebarService} from "../../../../../@fuse/components/sidebar/sidebar.service";
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";

interface StructureNode {
    id: number;
    isChildEnabled: boolean;
    parentId: number;
    name: string;
    departmentId: number;
    departmentName: string;
    designationId: number;
    salaryScaleId: number;
    gradeLevelId: number;
    gradeLevelStepId: number;
    skillId: number;
    costCenter: string;
    jobFamily: string;
    isApprovedPosition: boolean;
    isActive: boolean;
    activities: string;
    competences: string;
    jobDescriptionSummary: string;
    experience: string;
    education: string;
    level: number;
    children?: StructureNode[];
}

const TREE_DATA: StructureNode[] = [];

interface ExampleFlatNode {
    expandable: boolean;
    name: string;
    level: number;
}

@Component({
    selector: 'app-job-positions-list-select',
    templateUrl: './job-positions-list-select.component.html',
    styleUrls: ['./job-positions-list-select.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class JobPositionsListSelectComponent implements OnInit {
    private _transformer = (node: StructureNode, level: number) => {
        return {
            expandable: !!node.children && node.children.length > 0,
            name: node.name,
            level: level,
            id: node.id,
            isChildEnabled: node.isChildEnabled,
            parentId: node.parentId,
            departmentId: node.departmentId,
            departmentName: node.departmentName,
            designationId: node.designationId,
            salaryScaleId: node.salaryScaleId,
            gradeLevelId: node.gradeLevelId,
            gradeLevelStepId: node.gradeLevelStepId,
            skillId: node.skillId,
            costCenter: node.costCenter,
            jobFamily: node.jobFamily,
            isApprovedPosition: node.isApprovedPosition,
            isActive: node.isActive,
            activities: node.activities,
            competences: node.competences,
            jobDescriptionSummary: node.jobDescriptionSummary,
            experience: node.experience,
            education: node.education
        };
    };
    treeControl = new FlatTreeControl<ExampleFlatNode>(node => node.level, node => node.expandable);
    treeFlattener = new MatTreeFlattener(this._transformer, node => node.level, node => node.expandable, node => node.children);
    dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);
    dialogRef: any;
    @ViewChild('tree') tree;

    constructor(public matDialogRef: MatDialogRef<JobPositionsListSelectComponent>,
                @Inject(MAT_DIALOG_DATA) private _data: any,
                private structureService: StructureService,
                private _fuseSidebarService: FuseSidebarService,
                private _matDialog: MatDialog) {
        this.dataSource.data = TREE_DATA;
    }

    hasChild = (_: number, node: ExampleFlatNode) => node.expandable;

    ngOnInit(): void {
        this.getStructures();
    }

    getStructures() {
        this.structureService.getJobLocations({'page': -1,orderby: 'name'}).subscribe(data => {
            this.dataSource.data = [{
                id: null,
                parentId: 0,
                name: 'Job Positions',
                level: 0,
                departmentId: 0,
                departmentName: '',
                designationId: 0,
                salaryScaleId: 0,
                gradeLevelId: 0,
                gradeLevelStepId: 0,
                skillId: 0,
                costCenter: '',
                jobFamily: '',
                isApprovedPosition: false,
                isActive: false,
                activities: '',
                competences: '',
                jobDescriptionSummary: '',
                experience: '',
                education: '',
                isChildEnabled: true,
                children: this.structureData(data),
            }];
            this.tree.treeControl.expandAll();
        });
    }

    structureData(data) {
        if (data && data.length > 0) {
            data.forEach(structure => {
                if (structure && structure['department'] && structure['department'].name) {
                    structure['departmentName'] = structure['department'].name;
                }
                structure['children'] = structure['subCategories'];
                this.structureData(structure['subCategories']);
            });
            return data;
        }
    }
}
