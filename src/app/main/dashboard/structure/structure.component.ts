import {Component, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {FlatTreeControl} from "@angular/cdk/tree";
import {MatTreeFlatDataSource, MatTreeFlattener} from "@angular/material/tree";
import {FuseSidebarService} from "../../../../@fuse/components/sidebar/sidebar.service";
import {MatDialog} from "@angular/material/dialog";
import {UpdateWorkLocationsComponent} from "../work-locations/update-work-locations/update-work-locations.component";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {StructureService} from "../../../shared/services/structure.service";
import {fuseAnimations} from "../../../../@fuse/animations";
import {AppConstants} from "../../../shared/constants/app-constants";
import {SalaryScalesService} from "../../../shared/services/salary-scales.service";
import {SkillService} from "../../../shared/services/skill.service";

/**
 * Food data with nested structure.
 * Each node has a name and an optional list of subCategories.
 */
interface StructureNode {
    id: number;
    isChildEnabled: boolean;
    parentId: number;
    name: string;
    departmentId: number;
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

/** Flat node with expandable and level information */
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
            isApprovedPosition: ['', Validators.required],
            isActive: ['', Validators.required],
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
        console.log('node', node);
        if (!node.id) {
            this.selectedNodeName = '';
            this.parentId = undefined
        } else {
            this.selectedNodeName = node.name;
            this.parentId = node.id;
        }
        console.log('this.parentId', this.parentId);
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
            this.getStructures();
        });
    }

    deleteItem(node) {
        this.structureService.deleteStructure(node.id).subscribe(data => {
            if (data) {
                this.getStructures();
            }
        })
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
}
