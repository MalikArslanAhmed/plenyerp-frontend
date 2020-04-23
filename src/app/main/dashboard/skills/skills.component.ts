import {Component, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {FuseSidebarService} from "../../../../@fuse/components/sidebar/sidebar.service";
import {MatDialog} from "@angular/material/dialog";
import {FormGroup} from "@angular/forms";
import {SkillCreateComponent} from './skill-create/skill-create.component';
import {SkillListComponent} from "./skill-list/skill-list.component";
import {fuseAnimations} from "../../../../@fuse/animations";

@Component({
    selector: 'app-skills',
    templateUrl: './skills.component.html',
    styleUrls: ['./skills.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class SkillsComponent implements OnInit {
    dialogRef: any;
    @ViewChild(SkillListComponent) getSkill: SkillListComponent;

    constructor(
        private _fuseSidebarService: FuseSidebarService,
        private _matDialog: MatDialog) {
    }

    ngOnInit(): void {
    }

    addSkill() {
        this.dialogRef = this._matDialog.open(SkillCreateComponent, {
            panelClass: 'contact-form-dialog',
            data: {action: 'CREATE'}
        });
        this.dialogRef.afterClosed().subscribe((response: FormGroup) => {
            if (!response) {
                return;
            }
            this.getSkill.getSkills();
        });
    }
}
