import {Component, Inject, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {FormBuilder, FormGroup, Validators, FormControl} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {fuseAnimations} from '../../../../../../@fuse/animations';

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
    issuedBy = [
        {
            name: 'abcd',
            value: 'ABCD'
        },
        {
            name: 'xyz',
            value: 'XYZ'
        }
    ];
    employeeCensureList = [
        {
            sno: 1,
            name: 'abcd',
        },
        {
            sno: 2,
            name: 'abcd1',
        }
    ];
    employeeCensureColumns = ['sno', 'name', 'actions'];
    Censures = [];
    states = [];
    regions = [];
    lgas = [];
    constructor(public matDialogRef: MatDialogRef<EmployeeCensure>,
                @Inject(MAT_DIALOG_DATA) private _data: any,
                private fb: FormBuilder,
                ) {
        this.data = _data;
        if (_data.title === 'CENSURE') {
            this.dialogTitle = 'Censure';
        }

    }

    ngOnInit(): void {
        this.refresh();
    }

    refresh() {
        this.employeeCensureForm = this.fb.group({
            censure: ['', Validators.required],
            dateIssued: ['', Validators.required],
            issuedBy: [''],
            file: ['', Validators.required],
            docType: ['', Validators.required],
            filePage: ['', Validators.required],
            summary: ['', Validators.required],
        });
    }


    editEmployeeCensure(employeeCensure: any) {

    }

    deleteEmployeeCensure(id: any) {

    }

    fileUpload(event) {
        // const file = event && event.target.files[0];
        // const obj = {
        //     type: 'USER_IMAGE',
        //     fileType: 'Normal',
        // };
        // obj['file'] = file;
        // this.userProfileService.uploadFile(obj).subscribe((fileData: any) => {
        //         this.profileImage = fileData.data;
        //         this.isEditProfileImage = false;
        //         // console.log('---->>>', this.profileImage);
        //         if (this.profileImage) {
        //             this.profileForm.patchValue({
        //                 fileId:   this.profileImage.id
        //             });
        //         }
        //
        //
        //     }
        // );
    }

}
