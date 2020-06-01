import {Component, Inject, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {FormBuilder, FormGroup, Validators, FormControl} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {fuseAnimations} from '../../../../../../@fuse/animations';
import {EmployeeOtherDetailsService} from '../../../../../shared/services/employee-other-details.service';
import * as moment from 'moment';

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
    employeeHistoryList = [

    ];
    employeeHistoryColumns = ['sno', 'employer', 'engaged', 'disengaged', 'totalRemuneration', 'filePage', 'actions'];
    employeeHistoryId = null;
    constructor(public matDialogRef: MatDialogRef<EmployeeHistory>,
                @Inject(MAT_DIALOG_DATA) private _data: any,
                private fb: FormBuilder,
                private employeeOtherDetailsService: EmployeeOtherDetailsService,
                ) {
        this.data = _data;
        if (_data.title === 'EMPLOYMENT_HISTORY') {
            this.dialogTitle = 'History';
        }

    }

    ngOnInit(): void {
        this.refresh();
        this.getHistoryList();
    }

    refresh() {
        this.employeeHistoryForm = this.fb.group({
            employer: ['', Validators.required],
            engaged: ['', Validators.required],
            disengaged: ['', Validators.required],
            totalRemuneration: ['', Validators.required],
            filePage: ['', Validators.required],
        });
    }
    getHistoryList() {
        this.employeeOtherDetailsService.employeeHistoryList(this.data.employeeId).subscribe(data => {
            this.employeeHistoryList = data.items;
            let index = 0;
            this.employeeHistoryList.forEach(value => {
                index += 1;
                value['sno'] = index;
            });
            // console.log( this.employeeHistoryList);
        });
    }

    editEmployeeHistory(employeeHistoryId: any) {
        this.employeeHistoryId = employeeHistoryId;
        this.employeeHistoryList.forEach(val => {
            if (val.id === employeeHistoryId) {
                this.employeeHistoryForm.patchValue({
                    employer: val.employer,
                    engaged: val.engaged,
                    disengaged: val.disengaged,
                    totalRemuneration: val.totalRemuneration,
                    filePage: val.filePage,
                });
            }
        });
    }

    deleteEmployeeHistory(id: any) {
        this.employeeOtherDetailsService.deleteHistory(id).subscribe(data => {
            this.employeeHistoryForm.reset();
            this.getHistoryList();
        });
    }
    addAddress() {
        const f = this.employeeHistoryForm.value;
        const engage = moment(f.engaged).format('YYYY-MM-DD');
        const disEngage = moment(f.disengaged).format('YYYY-MM-DD');
        const obj = {
            employer: f.employer,
            engaged: engage,
            disengaged: disEngage,
            totalRemuneration: f.totalRemuneration,
            filePage: f.filePage,
        };
        // console.log(obj);
        this.employeeOtherDetailsService.addEmployeeHistory(this.data.employeeId, obj).subscribe(v => {
            // console.log(v);
            this.employeeHistoryForm.reset();
            this.getHistoryList();
        });
    }
    updateEmployeeHistory() {
        const f = this.employeeHistoryForm.value;
        const engage = moment(f.engaged).format('YYYY-MM-DD');
        const disEngage = moment(f.disengaged).format('YYYY-MM-DD');
        const obj = {
            employer: f.employer,
            engaged: engage,
            disengaged: disEngage,
            totalRemuneration: f.totalRemuneration,
            filePage: f.filePage,
        };
        this.employeeOtherDetailsService.updateHistory(this.data.employeeId, this.employeeHistoryId, obj).subscribe(data => {
            this.employeeHistoryId = null;
            this.employeeHistoryForm.reset();
            this.getHistoryList();
        });
    }
    cancelUpdate() {
        this.employeeHistoryId = null;
        this.employeeHistoryForm.reset();
    }
}
