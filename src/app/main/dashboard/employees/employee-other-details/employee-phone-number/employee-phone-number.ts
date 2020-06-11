import {Component, Inject, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {FormBuilder, FormGroup, Validators, FormControl} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {fuseAnimations} from '../../../../../../@fuse/animations';
import * as moment from 'moment';
import {EmployeeOtherDetailsService} from '../../../../../shared/services/employee-other-details.service';

@Component({
    selector: 'app-employee-phone-number',
    templateUrl: './employee-phone-number.html',
    styleUrls: ['./employee-phone-number.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})

// tslint:disable-next-line:component-class-suffix
export class EmployeePhoneNumber implements OnInit {
    data: any;
    dialogTitle: any;
    employeePhoneNumberForm: FormGroup;
    phoneDetails = [];
    employeePhoneNumberList = [];
    employeePhoneNumberColumns = ['sno', 'phoneType', 'extension', 'phone', 'actions'];
    employeePhoneNumberId = null;
    constructor(public matDialogRef: MatDialogRef<EmployeePhoneNumber>,
                @Inject(MAT_DIALOG_DATA) private _data: any,
                private fb: FormBuilder,
                private employeeOtherDetailsService: EmployeeOtherDetailsService,
                ) {
        this.data = _data;
        if (_data.title === 'PHONE_NUMBER') {
            this.dialogTitle = 'Phone Numbers';
        }

    }

    ngOnInit(): void {
        this.refresh();
        this.getPhoneNumberTypes();
        this.getPhoneNumberList();
    }

    refresh() {
        this.employeePhoneNumberForm = this.fb.group({
            phoneNumberTypeId: ['', Validators.required],
            extension: ['', Validators.required],
            phone: [''],
        });
    }


    editEmployeePhoneNumber(employeePhoneNumberId: any) {
        this.employeePhoneNumberId = employeePhoneNumberId;
        this.employeePhoneNumberList.forEach(val => {
            if (val.id === employeePhoneNumberId) {
                this.employeePhoneNumberForm.patchValue({
                    phoneNumberTypeId: val.phoneNumberTypeId,
                    extension: val.extension,
                    phone: val.phone,
                });
            }
        });
    }

    deleteEmployeePhoneNumber(id: any) {
        this.employeeOtherDetailsService.deletePhoneNumber(id).subscribe(data => {
            this.employeePhoneNumberForm.reset();
            this.getPhoneNumberList();
        });
    }
    getPhoneNumberTypes() {
        this.employeeOtherDetailsService.phoneNumberTypes({'isActive' : 1}).subscribe(val => {
            this.phoneDetails = val.items;
        });
    }
    getPhoneNumberList() {
        this.employeeOtherDetailsService.employeePhoneNumberList(this.data.employeeId).subscribe(data => {
            this.employeePhoneNumberList = data.items;
            let index = 0;
            this.employeePhoneNumberList.forEach(value => {
                index += 1;
                value['sno'] = index;
            });
        });
    }

    addPhoneNumber() {
        this.employeeOtherDetailsService.addEmployeePhoneNumber(this.data.employeeId, this.employeePhoneNumberForm.value).subscribe(v => {
            this.employeePhoneNumberForm.reset();
            this.getPhoneNumberList();
        });
    }
    updateEmployeePhoneNumber() {
        this.employeeOtherDetailsService.updatePhoneNumber(this.data.employeeId, this.employeePhoneNumberId, this.employeePhoneNumberForm.value).subscribe(data => {
            this.employeePhoneNumberId = null;
            this.employeePhoneNumberForm.reset();
            this.getPhoneNumberList();
        });
    }
    cancelUpdate() {
        this.employeePhoneNumberId = null;
        this.employeePhoneNumberForm.reset();
    }
}
