import {Component, Inject, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {FormBuilder, FormGroup, Validators, FormControl} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {fuseAnimations} from '../../../../../../@fuse/animations';
import * as moment from 'moment';
import {EmployeeOtherDetailsService} from '../../../../../shared/services/employee-other-details.service';

@Component({
    selector: 'app-employee-background',
    templateUrl: './employee-background.html',
    styleUrls: ['./employee-background.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})

// tslint:disable-next-line:component-class-suffix
export class EmployeeBackground implements OnInit {
    data: any;
    dialogTitle: any;
    employeeBackgroundForm: FormGroup;
    employeeBackgroundList = [ ];
    employeeBackgroundColumns = ['sno', 'background', 'actions'];
    employeeBackgroundId = null;
    constructor(public matDialogRef: MatDialogRef<EmployeeBackground>,
                @Inject(MAT_DIALOG_DATA) private _data: any,
                private fb: FormBuilder,
                private employeeOtherDetailsService: EmployeeOtherDetailsService,
                ) {
        this.data = _data;
        if (_data.title === 'BACKGROUND') {
            this.dialogTitle = 'Background';
        }

    }

    ngOnInit(): void {
        this.refresh();
        this.getBackgroundList();
    }

    refresh() {
        this.employeeBackgroundForm = this.fb.group({
            details: ['', Validators.required]
        });
    }
    getBackgroundList() {
        this.employeeOtherDetailsService.employeeBackgroundList(this.data.employeeId).subscribe(data => {
            this.employeeBackgroundList = data.items;
            let index = 0;
            this.employeeBackgroundList.forEach(value => {
                index += 1;
                value['sno'] = index;
            });
        });
    }

    editEmployeeBackground(employeeBackgroundId: any) {
        this.employeeBackgroundId = employeeBackgroundId;
        this.employeeBackgroundList.forEach(val => {
            if (val.id === employeeBackgroundId) {
                this.employeeBackgroundForm.patchValue({
                    details: val.details,
                });
            }
        });
    }

    deleteEmployeeBackground(id: any) {
        this.employeeOtherDetailsService.deleteBackground(id).subscribe(data => {
            this.employeeBackgroundForm.reset();
            this.getBackgroundList();
        });
    }
    addBackground() {
        this.employeeOtherDetailsService.addEmployeeBackground(this.data.employeeId, this.employeeBackgroundForm.value).subscribe(v => {
            this.employeeBackgroundForm.reset();
            this.getBackgroundList();
        });
    }
    updateEmployeeBackground() {
        this.employeeOtherDetailsService.updateBackground(this.data.employeeId, this.employeeBackgroundId, this.employeeBackgroundForm.value).subscribe(data => {
            this.employeeBackgroundId = null;
            this.employeeBackgroundForm.reset();
            this.getBackgroundList();
        });
    }
    cancelUpdate() {
        this.employeeBackgroundId = null;
        this.employeeBackgroundForm.reset();
    }
}
