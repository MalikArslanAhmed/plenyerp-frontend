import {Component, Inject, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {FormBuilder, FormGroup, Validators, FormControl} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {fuseAnimations} from '../../../../../../@fuse/animations';

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
    languages = [
        {
            name: 'abcd',
            value: 'ABCD'
        },
        {
            name: 'xyz',
            value: 'XYZ'
        }
    ];
    employeeLanguageList = [
        {
            sno: 1,
            name: 'abcd',
        },
        {
            sno: 2,
            name: 'abcd1',
        }
    ];
    writtenProficiency = [];
    spokenProficiency = [];
    employeeLanguageColumns = ['sno', 'name', 'actions'];
    constructor(public matDialogRef: MatDialogRef<EmployeeLanguages>,
                @Inject(MAT_DIALOG_DATA) private _data: any,
                private fb: FormBuilder,
                ) {
        this.data = _data;
        if (_data.title === 'LANGUAGES') {
            this.dialogTitle = 'Language Profeciency';
        }

    }

    ngOnInit(): void {
        this.refresh();
    }

    refresh() {
        this.employeeLanguageForm = this.fb.group({
            language: ['', Validators.required],
            written: ['', Validators.required],
            spoken: [''],
            certification: ['', Validators.required],
        });
    }


    editEmployeeLanguage(employeeLanguage: any) {
        
    }

    deleteEmployeeLanguage(id: any) {
        
    }
}
