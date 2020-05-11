import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {FormGroup} from "@angular/forms";
import {LanguageCreateComponent} from '../language-create/language-create.component';
import {fuseAnimations} from "../../../../../@fuse/animations";
import {LanguageService} from "../../../../shared/services/language.service";

@Component({
    selector: 'app-language-list',
    templateUrl: './language-list.component.html',
    styleUrls: ['./language-list.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class LanguageListComponent implements OnInit {
    languages = [];
    displayedColumns = ['id', 'name', 'status', 'actions'];
    dialogRef: any;

    constructor(private languageService: LanguageService,
                private _matDialog: MatDialog) {
    }

    ngOnInit(): void {
        this.getLanguages();
    }

    getLanguages() {
        this.languageService.getLanguages({'page': -1}).subscribe(data => {
            this.languages = data.items;

            if (this.languages && this.languages.length > 0) {
                let i = 1;
                this.languages.forEach(language => {
                    language['sno'] = i;
                    i++;
                });
            }
        });
    }

    deleteLanguage(id) {
        this.languageService.deleteLanguage(id).subscribe(data => {
            if (data) {
                this.getLanguages();
            }
        })
    }

    editLanguage(language) {
        this.dialogRef = this._matDialog.open(LanguageCreateComponent, {
            panelClass: 'contact-form-dialog',
            data: {action: 'EDIT', language: language},
        });
        this.dialogRef.afterClosed().subscribe((response: FormGroup) => {
            if (!response) {
                return;
            }
            this.getLanguages();
        });
    }
}
