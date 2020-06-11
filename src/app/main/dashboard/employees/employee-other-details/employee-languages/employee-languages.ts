import {Component, Inject, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {FormBuilder, FormGroup, Validators, FormControl} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {fuseAnimations} from '../../../../../../@fuse/animations';
import {EmployeeOtherDetailsService} from '../../../../../shared/services/employee-other-details.service';

@Component({
    selector: 'app-employee-languages',
    templateUrl: './employee-languages.html',
    styleUrls: ['./employee-languages.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})

// tslint:disable-next-line:component-class-suffix
export class EmployeeLanguages implements OnInit {
    data: any;
    dialogTitle: any;
    employeeLanguageForm: FormGroup;
    languages = [];
    employeeLanguageList = [];
    proficiency = [
        {
            name: 'NO',
            value: 'NO',
        },
        {
            name: 'POOR',
            value: 'POOR',
        },
        {
            name: 'GOOD',
            value: 'GOOD',
        },
        {
            name: 'VERY GOOD',
            value: 'VERY GOOD',
        }

    ];
    writtenProficiency = [];
    spokenProficiency = [];
    employeeLanguageColumns = ['sno', 'language', 'written', 'spoken', 'certification', 'actions'];
    employeeLanguageId = null;
    constructor(public matDialogRef: MatDialogRef<EmployeeLanguages>,
                @Inject(MAT_DIALOG_DATA) private _data: any,
                private fb: FormBuilder,
                private employeeOtherDetailsService: EmployeeOtherDetailsService,
                ) {
        this.data = _data;
        if (_data.title === 'LANGUAGES') {
            this.dialogTitle = 'Language Profeciency';
        }

    }

    ngOnInit(): void {
        this.refresh();
        this.getLanguage();
        this. getLanguageList();
    }

    refresh() {
        this.employeeLanguageForm = this.fb.group({
            languageId: ['', Validators.required],
            writtenProficiency: ['', Validators.required],
            spokenProficiency: [''],
            certification: ['', Validators.required],
        });
    }
    getLanguage() {
        this.employeeOtherDetailsService.language({'isActive' : 1}).subscribe(val => {
            this.languages = val.items;
        });
    }

    editEmployeeLanguage(employeeLanguageId: any) {
        this.employeeLanguageId = employeeLanguageId;
        this.employeeLanguageList.forEach(val => {
            if (val.id === employeeLanguageId) {
                this.employeeLanguageForm.patchValue({
                    languageId: val.languageId,
                    writtenProficiency: val.writtenProficiency,
                    spokenProficiency: val.spokenProficiency,
                    certification: val.certification,
                });
            }
        });
    }

    deleteEmployeeLanguage(id: any) {
        this.employeeOtherDetailsService.deleteLanguage(id).subscribe(data => {
            this.employeeLanguageForm.reset();
            this.getLanguageList();
        });
    }    
    getLanguageList() {
        this.employeeOtherDetailsService.employeeLanguageList(this.data.employeeId).subscribe(data => {
            this.employeeLanguageList = data.items;
            let index = 0;
            this.employeeLanguageList.forEach(value => {
                index += 1;
                value['sno'] = index;
            });
        });
    }

    addPhoneNumber() {
        this.employeeOtherDetailsService.addEmployeeLanguage(this.data.employeeId, this.employeeLanguageForm.value).subscribe(v => {
            this.employeeLanguageForm.reset();
            this.getLanguageList();
        });
    }
    updateEmployeeLanguage() {
        this.employeeOtherDetailsService.updateLanguage(this.data.employeeId, this.employeeLanguageId, this.employeeLanguageForm.value).subscribe(data => {
            this.employeeLanguageId = null;
            this.employeeLanguageForm.reset();
            this.getLanguageList();
        });
    }
    cancelUpdate() {
        this.employeeLanguageId = null;
        this.employeeLanguageForm.reset();
    }
}
