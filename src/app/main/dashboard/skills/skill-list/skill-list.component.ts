import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {FormGroup} from '@angular/forms';
import {SkillService} from 'app/shared/services/skill.service';
import {SkillCreateComponent} from '../skill-create/skill-create.component';
import {fuseAnimations} from '../../../../../@fuse/animations';
import {PageEvent} from '@angular/material/paginator';

@Component({
    selector: 'app-skill-list',
    templateUrl: './skill-list.component.html',
    styleUrls: ['./skill-list.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class SkillListComponent implements OnInit {
    skills = [];
    displayedColumns = ['id', 'name', 'status', 'actions'];
    dialogRef: any;
    pagination = {
        page: 1,
        total: null,
        perpage: 15,
        pages: null
    };
    pageEvent: PageEvent;
    constructor(private skillService: SkillService,
                private _matDialog: MatDialog) {
    }

    ngOnInit(): void {
        this.getSkills();
    }

    getSkills() {
        this.skills = [];
        this.skillService.getSkills({page: this.pagination.page}).subscribe(data => {
            this.skills = data.items;

            if (this.skills && this.skills.length > 0) {
                let i = 1;
                this.skills.forEach(skill => {
                    skill['sno'] = i;
                    i++;
                });
            }
            this.pagination.page = data.page;
            this.pagination.total = data.total;
        });
    }

    deleteSkill(id) {
        this.skillService.deleteSkill(id).subscribe(data => {
            if (data) {
                this.getSkills();
            }
        });
    }

    editSkill(skill) {
        this.dialogRef = this._matDialog.open(SkillCreateComponent, {
            panelClass: 'contact-form-dialog',
            data: {action: 'EDIT', skill: skill},
        });
        this.dialogRef.afterClosed().subscribe((response: FormGroup) => {
            if (!response) {
                return;
            }
            this.getSkills();
        });
    }
    onPageChange(page) {
        this.pagination.page = page.pageIndex + 1;
        this.getSkills();
    }
}
