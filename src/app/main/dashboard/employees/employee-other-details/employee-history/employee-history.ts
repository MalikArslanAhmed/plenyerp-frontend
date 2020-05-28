import {Component, Inject, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {FormBuilder, FormGroup, Validators, FormControl} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {fuseAnimations} from '../../../../../../@fuse/animations';

@Component({
    selector: 'app-employee-history',
    templateUrl: './employee-history.html',
    styleUrls: ['./employee-history.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})

// tslint:disable-next-line:component-class-suffix
export class EmployeeHistory implements OnInit {
    data: any;
    dialogTitle: any;
    employeeHistoryForm: FormGroup;
    typeOfAddress = [
        {
            name: 'abcd',
            value: 'ABCD'
        },
        {
            name: 'xyz',
            value: 'XYZ'
        }
    ];
    employeeHistoryList = [
        {
            sno: 1,
            name: 'abcd',
        },
        {
            sno: 2,
            name: 'abcd1',
        } 
    ];
    employeeHistoryColumns = ['sno', 'name', 'actions'];
    constructor(public matDialogRef: MatDialogRef<EmployeeHistory>,
                @Inject(MAT_DIALOG_DATA) private _data: any,
                private fb: FormBuilder,
                ) {
        this.data = _data;
        if (_data.title === 'EMPLOYMENT_HISTORY') {
            this.dialogTitle = 'History';
        }

    }

    ngOnInit(): void {
        this.refresh();
    }

    refresh() {
        this.employeeHistoryForm = this.fb.group({
            employer: ['', Validators.required],
            dateEngaged: ['', Validators.required],
            dateDisEngaged: ['', Validators.required],
            totalRenumeration: ['', Validators.required],
            filePage: ['', Validators.required],
        });
    }


    editEmployeeHistory(employeeHistory: any) {
        
    }

    deleteEmployeeHistory(id: any) {
        
    }
}
