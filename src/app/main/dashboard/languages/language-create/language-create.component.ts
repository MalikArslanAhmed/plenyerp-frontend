import {Component, Inject, OnInit, ViewEncapsulation} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {fuseAnimations} from "../../../../../@fuse/animations";
import {LanguageService} from "../../../../shared/services/language.service";

@Component({
    selector: 'app-language-create',
    templateUrl: './language-create.component.html',
    styleUrls: ['./language-create.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class LanguageCreateComponent implements OnInit {
    action: any;
    dialogTitle: any;
    languageForm: FormGroup;
    isSubmitted = false;
    languages: any = [];
    updateData: any;

    constructor(public matDialogRef: MatDialogRef<LanguageCreateComponent>,
                @Inject(MAT_DIALOG_DATA) private _data: any,
                private fb: FormBuilder,
                private languageService: LanguageService) {
        this.action = _data.action;
        if (this.action === 'EDIT') {
            this.dialogTitle = 'Edit Language';
            if (_data.language) {
                this.updateData = _data;
            }
        } else {
            this.dialogTitle = 'Add Language';
        }
    }

    ngOnInit(): void {
        this.refresh();
        this.checkForUpdate();
    }

    refresh() {
        this.languageForm = this.fb.group({
            'name': ['', Validators.required]
        });
    }

    checkForUpdate() {
        if (this.updateData) {
            this.languageForm.patchValue({
                'name': this.updateData.language.name
            });
        }
    }

    saveLanguage() {
        this.isSubmitted = true;
        if (!this.languageForm.valid) {
            this.isSubmitted = false;
            return;
        }

        if (this.isSubmitted) {
            this.languageService.addLanguage(this.languageForm.value).subscribe(data => {
                this.languageForm.reset();
                this.isSubmitted = false;
            });
        }
    }

    updateLanguage() {
        this.isSubmitted = true;
        if (!this.languageForm.valid) {
            this.isSubmitted = false;
            return;
        }
        if (this.isSubmitted) {
            this.languageService.updateLanguage(this.updateData.language.id, this.languageForm.value).subscribe(data => {
                this.updateData = undefined;
                this.languageForm.reset();
                this.isSubmitted = false;
            });
        }
    }
}
