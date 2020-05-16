import {Component, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {FlatTreeControl} from "@angular/cdk/tree";
import {MatTreeFlatDataSource, MatTreeFlattener} from "@angular/material/tree";
import {FuseSidebarService} from "../../../../@fuse/components/sidebar/sidebar.service";
import {MatDialog} from "@angular/material/dialog";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {StructureService} from "../../../shared/services/structure.service";
import {fuseAnimations} from "../../../../@fuse/animations";
import {SalaryScalesService} from "../../../shared/services/salary-scales.service";
import {SkillService} from "../../../shared/services/skill.service";
import {DepartmentListSelectComponent} from "./department-list/department-list-select.component";

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
    selector: 'app-structure',
    templateUrl: './structure.component.html',
    styleUrls: ['./structure.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})

export class StructureComponent implements OnInit {
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
    hasChild = (_: number, node: ExampleFlatNode) => node.expandable;
    dialogRef: any;
    @ViewChild('tree') tree;
    jobPositionForm: FormGroup;
    designations = [];
    salaryScales = [];
    skills = [];
    gradeLevels = [];
    gradeLevelSteps = [];
    isSubmitted = false;
    parentId: any;
    selectedNodeName: any;
    jobPostionInitText = "Add Job Position";
    updateId: any;
    departments = [];

    constructor(private structureService: StructureService,
                private _fuseSidebarService: FuseSidebarService,
                private _matDialog: MatDialog,
                private salaryScalesService: SalaryScalesService,
                private skillService: SkillService,
                private fb: FormBuilder) {
        this.dataSource.data = TREE_DATA;
    }

    ngOnInit(): void {
        this.getDesignations();
        this.getSalaryScales();
        this.getSkills();
        this.getStructures();
        this.refresh();
    }

    refresh() {
        this.jobPositionForm = this.fb.group({
            name: ['', Validators.required],
            departmentId: ['', Validators.required],
            designationId: ['', Validators.required],
            salaryScaleId: ['', Validators.required],
            gradeLevelId: ['', Validators.required],
            gradeLevelStepId: ['', Validators.required],
            skillId: ['', Validators.required],
            costCenter: ['', Validators.required],
            jobFamily: ['', Validators.required],
            isApprovedPosition: [false, Validators.required],
            isActive: [false, Validators.required],
            activities: [''],
            competences: [''],
            jobDescriptionSummary: [''],
            experience: [''],
            education: ['']
        });
    }

    getStructures() {
        this.structureService.getJobLocations({'page': -1}).subscribe(data => {
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

    getDesignations() {
        this.structureService.getDesignations({'page': -1}).subscribe(data => {
            this.designations = data.items
        });
    }

    getSalaryScales() {
        this.salaryScalesService.getSalaryScales({'page': -1}).subscribe(data => {
            this.salaryScales = data
        });
    }

    getSkills() {
        this.skillService.getSkills({'page': -1}).subscribe(data => {
            this.skills = data.items;
        });
    }

    chooseScale(event) {
        if (this.salaryScales && this.salaryScales.length > 0) {
            this.salaryScales.forEach(salaryScale => {
                if (salaryScale.id === event) {
                    this.gradeLevels = salaryScale['gradeLevels'];
                }
            });
        }
    }

    chooseGradeLevel(event) {
        if (this.gradeLevels && this.gradeLevels.length > 0) {
            this.gradeLevels.forEach(gradeLevel => {
                if (gradeLevel.id === event) {
                    this.gradeLevelSteps = gradeLevel['gradeLevelSteps'];
                }
            });
        }
    }

    addItem(node) {
        if (this.updateId) {
            this.jobPositionForm.reset();
            this.jobPostionInitText = "Add Job Position";
            this.updateId = undefined;
        }
        if (!node.id) {
            this.selectedNodeName = '';
            this.parentId = undefined;
        } else {
            this.selectedNodeName = node.name;
            this.parentId = node.id;
        }
    }

    editItem(node) {
        this.chooseScale(node.salaryScaleId);
        this.chooseGradeLevel(node.gradeLevelId);
        this.selectedNodeName = node.name;
        this.parentId = node.parentId ? node.parentId : '';
        this.jobPostionInitText = "Update Job Position";
        this.updateId = node.id;
        this.departments = [{
            'name': node.departmentName,
            'id': node.departmentId
        }];
        this.jobPositionForm.patchValue({
            name: node.name ? node.name : '',
            departmentId: node.departmentId ? node.departmentId : '',
            designationId: node.designationId ? node.designationId : '',
            salaryScaleId: node.salaryScaleId ? node.salaryScaleId : '',
            gradeLevelId: node.gradeLevelId ? node.gradeLevelId : '',
            gradeLevelStepId: node.gradeLevelStepId ? node.gradeLevelStepId : '',
            skillId: node.skillId ? node.skillId : '',
            costCenter: node.costCenter ? node.costCenter : '',
            jobFamily: node.jobFamily ? node.jobFamily : '',
            isApprovedPosition: node.isApprovedPosition ? node.isApprovedPosition : '',
            isActive: node.isActive ? node.isActive : '',
            activities: node.activities ? node.activities : '',
            competences: node.competences ? node.competences : '',
            jobDescriptionSummary: node.jobDescriptionSummary ? node.jobDescriptionSummary : '',
            experience: node.experience ? node.experience : '',
            education: node.education ? node.education : '',
        });
    }

    deleteItem(node) {
        this.structureService.deleteJobPosition(node.id).subscribe(data => {
            if (data) {
                this.getStructures();
                this.jobPositionForm.reset();
                this.isSubmitted = false;
                this.getStructures();
                this.selectedNodeName = '';
                this.parentId = undefined;
                this.jobPostionInitText = "Add Job Position";
                this.updateId = undefined;
            }
        })
    }

    updateStructure() {
        this.isSubmitted = true;
        if (!this.jobPositionForm.valid) {
            this.isSubmitted = false;
            return;
        }

        if (this.isSubmitted) {
            if (this.parentId) {
                this.jobPositionForm.value['parentId'] = this.parentId;
            }
            this.structureService.updateJobPosition(this.updateId, this.jobPositionForm.value).subscribe(data => {
                this.jobPositionForm.reset();
                this.isSubmitted = false;
                this.getStructures();
                this.selectedNodeName = '';
                this.parentId = undefined;
                this.jobPostionInitText = "Add Job Position";
                this.updateId = undefined;
            });
        }
    }

    saveStructure() {
        this.isSubmitted = true;
        if (!this.jobPositionForm.valid) {
            this.isSubmitted = false;
            return;
        }

        if (this.isSubmitted) {
            if (this.parentId) {
                this.jobPositionForm.value['parentId'] = this.parentId;
            }
            this.structureService.addJobPosition(this.jobPositionForm.value).subscribe(data => {
                this.jobPositionForm.reset();
                this.isSubmitted = false;
                this.getStructures();
                this.selectedNodeName = '';
                this.parentId = undefined
            });
        }
    }

    departmentSelect() {
        this.dialogRef = this._matDialog.open(DepartmentListSelectComponent, {
            panelClass: 'contact-form-dialog',
        });
        this.dialogRef.afterClosed().subscribe((response) => {
            if (!response) {
                return;
            }
            this.departments = [{
                'name': response.name,
                'id': response.id
            }];
            this.jobPositionForm.patchValue({
                departmentId: response.id,
                disabled: true
            });
        });
    }
}
