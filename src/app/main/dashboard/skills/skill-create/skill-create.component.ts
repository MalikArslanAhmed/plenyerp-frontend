import {Component, Inject, OnInit, ViewEncapsulation} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {SkillService} from 'app/shared/services/skill.service';
import {fuseAnimations} from "../../../../../@fuse/animations";

@Component({
    selector: 'app-skill-create',
    templateUrl: './skill-create.component.html',
    styleUrls: ['./skill-create.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class SkillCreateComponent implements OnInit {
    action: any;
    dialogTitle: any;
    skillForm: FormGroup;
    isSubmitted = false;
    skills: any = [];
    updateData: any;

    constructor(public matDialogRef: MatDialogRef<SkillCreateComponent>,
                @Inject(MAT_DIALOG_DATA) private _data: any,
                private fb: FormBuilder,
                private skillService: SkillService) {
        this.action = _data.action;
        if (this.action === 'EDIT') {
            this.dialogTitle = 'Edit Skill';
            if (_data.skill) {
                this.updateData = _data;
            }
        } else {
            this.dialogTitle = 'Add Skill';
        }
    }

    ngOnInit(): void {
        this.refresh();
        this.checkForUpdate();
    }

    refresh() {
        this.skillForm = this.fb.group({
            'name': ['', Validators.required]
        });
    }

    checkForUpdate() {
        if (this.updateData) {
            this.skillForm.patchValue({
                'name': this.updateData.skill.name
            });
        }
    }

    saveSkill() {
        this.isSubmitted = true;
        if (!this.skillForm.valid) {
            this.isSubmitted = false;
            return;
        }

        if (this.isSubmitted) {
            this.skillService.addSkill(this.skillForm.value).subscribe(data => {
                this.skillForm.reset();
                this.isSubmitted = false;
            });
        }
    }

    updateSkill() {
        this.isSubmitted = true;
        if (!this.skillForm.valid) {
            this.isSubmitted = false;
            return;
        }
        if (this.isSubmitted) {
            this.skillService.updateSkill(this.updateData.skill.id, this.skillForm.value).subscribe(data => {
                this.updateData = undefined;
                this.skillForm.reset();
                this.isSubmitted = false;
            });
        }
    }
}
