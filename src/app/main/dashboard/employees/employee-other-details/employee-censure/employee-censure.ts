import {Component, Inject, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {FormBuilder, FormGroup, Validators, FormControl} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {fuseAnimations} from '../../../../../../@fuse/animations';
import * as moment from 'moment';
import {EmployeeOtherDetailsService} from '../../../../../shared/services/employee-other-details.service';

@Component({
    selector: 'app-employee-censure',
    templateUrl: './employee-censure.html',
    styleUrls: ['./employee-censure.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})

// tslint:disable-next-line:component-class-suffix
export class EmployeeCensure implements OnInit {
    data: any;
    dialogTitle: any;
    employeeCensureForm: FormGroup;
    issuedBy = [];
    employeeCensureList = [];
    employeeCensureColumns = ['sno', 'censure', 'dateIssued', 'issuedBy', 'documentType', 'file', 'filePage',  'summary',  'actions'];
    censures = [];
    states = [];
    regions = [];
    lgas = [];
    employeeMembershipId = null;
    files;
    constructor(public matDialogRef: MatDialogRef<EmployeeCensure>,
                @Inject(MAT_DIALOG_DATA) private _data: any,
                private fb: FormBuilder,
                private employeeOtherDetailsService: EmployeeOtherDetailsService,
                ) {
        this.data = _data;
        if (_data.title === 'CENSURE') {
            this.dialogTitle = 'Censure';
        }

    }

    ngOnInit(): void {
        this.refresh();
        this.getCensure();
        this.getIssueBy();
        this.getCensureList();
    }

    refresh() {
        this.employeeCensureForm = this.fb.group({
            censureId: ['', Validators.required],
            dateIssued: ['', Validators.required],
            issuedById: ['', Validators.required],
            fileId: ['', Validators.required],
            documentType: ['', Validators.required],
            filePage: ['', Validators.required],
            summary: ['', Validators.required],
            file: ['', Validators.required],
        });
    }


    editEmployeeCensure(employeeMembershipId: any) {
        this.employeeMembershipId = employeeMembershipId;
        this.employeeCensureList.forEach(val => {
            if (val.id === employeeMembershipId) {
                this.employeeCensureForm.patchValue({
                    censureId: val.censureId,
                    dateIssued: val.dateIssued,
                    issuedById: val.issuedById,
                    fileId: val.fileId,
                    documentType: val.documentType,
                    filePage: val.filePage,
                    summary: val.summary,
                    file: val.file.localPath,
                });
            }
        });
    }

    deleteEmployeeCensure(id: any) {
        this.employeeOtherDetailsService.deleteCensure(id).subscribe(data => {
            this.employeeCensureForm.reset();
            this.getCensureList();
        });
    }
    getCensure() {
        this.employeeOtherDetailsService.censure().subscribe(val => {
            this.censures = val.items;
        });
    }
    getIssueBy() {
        this.employeeOtherDetailsService.issuedBy().subscribe(val => {
            this.issuedBy = val.items;
        });
    }

    getCensureList() {
        this.employeeOtherDetailsService.employeeCensureList(this.data.employeeId).subscribe(data => {
            this.employeeCensureList = data.items;
            let index = 0;
            this.employeeCensureList.forEach(value => {
                index += 1;
                value['sno'] = index;
            });
        });
    }

    addCensure() {
        const f = this.employeeCensureForm.value;
        const joinDate = moment(f.joinAt).format('YYYY-MM-DD');
        const obj = {
            censureId:  f.censureId,
            dateIssued:  joinDate,
            issuedById:  f.issuedById,
            fileId:  f.fileId,
            documentType:  f.documentType,
            filePage:  f.filePage,
            summary:  f.summary,
        };
        this.employeeOtherDetailsService.addEmployeeCensure(this.data.employeeId, obj).subscribe(v => {
            this.employeeCensureForm.reset();
            this.getCensureList();
        });
    }
    updateEmployeeCensure() {
        const f = this.employeeCensureForm.value;
        const joinDate = moment(f.joinAt).format('YYYY-MM-DD');
        const obj = {
            censureId:  f.censureId,
            dateIssued:  joinDate,
            issuedById:  f.issuedById,
            fileId:  f.fileId,
            documentType:  f.documentType,
            filePage:  f.filePage,
            summary:  f.summary,
        };
        this.employeeOtherDetailsService.updateCensure(this.data.employeeId, this.employeeMembershipId, obj).subscribe(data => {
            this.employeeMembershipId = null;
            this.employeeCensureForm.reset();
            this.getCensureList();
        });
    }
    cancelUpdate() {
        this.employeeMembershipId = null;
        this.employeeCensureForm.reset();
    }

    fileUpload(event) {
        const file = event && event.target.files[0];
        const obj = {
            type: 'EMPLOYEE_FILES',
            fileType: 'Normal',
        };
        obj['file'] = file;
        this.employeeOtherDetailsService.uploadFile(obj).subscribe((fileData: any) => {
                this.files = fileData.data;
                this.employeeCensureForm.patchValue({fileId: this.files?.id});
                // this.isEditProfileImage = false;
                // // console.log('---->>>', this.profileImage);
                // if (this.profileImage) {
                //     this.profileForm.patchValue({
                //         fileId:   this.profileImage.id
                //     });
                // }


            }
        );
    }

}
