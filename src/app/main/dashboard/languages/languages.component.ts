import {Component, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {FuseSidebarService} from "../../../../@fuse/components/sidebar/sidebar.service";
import {MatDialog} from "@angular/material/dialog";
import {FormGroup} from "@angular/forms";
import {LanguageListComponent} from "./language-list/language-list.component";
import {LanguageCreateComponent} from "./language-create/language-create.component";
import {fuseAnimations} from "../../../../@fuse/animations";

@Component({
    selector: 'app-languages',
    templateUrl: './languages.component.html',
    styleUrls: ['./languages.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class LanguagesComponent implements OnInit {
    dialogRef: any;
    @ViewChild(LanguageListComponent) getLanguage: LanguageListComponent;

    constructor(
        private _fuseSidebarService: FuseSidebarService,
        private _matDialog: MatDialog) {
    }

    ngOnInit(): void {
    }

    addLanguage() {
        this.dialogRef = this._matDialog.open(LanguageCreateComponent, {
            panelClass: 'contact-form-dialog',
            data: {action: 'CREATE'}
        });
        this.dialogRef.afterClosed().subscribe((response: FormGroup) => {
            if (!response) {
                return;
            }
            this.getLanguage.getLanguages();
        });
    }
}
