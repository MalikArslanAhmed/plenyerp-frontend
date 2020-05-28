import {Component, Inject, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {FormBuilder, FormGroup, Validators, FormControl} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {fuseAnimations} from '../../../../../../@fuse/animations';

@Component({
    selector: 'app-employee-military-service',
    templateUrl: './employee-military-service.html',
    styleUrls: ['./employee-military-service.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})

// tslint:disable-next-line:component-class-suffix
export class EmployeeMilitaryService implements OnInit {
    data: any;
    dialogTitle: any;
    employeeMilitaryServiceForm: FormGroup;
    armOfServices = [
        {
            name: 'abcd',
            value: 'ABCD'
        },
        {
            name: 'xyz',
            value: 'XYZ'
        }
    ];
    employeeMilitaryServiceList = [
        {
            sno: 1,
            name: 'abcd',
        },
        {
            sno: 2,
            name: 'abcd1',
        }
    ];
    employeeMilitaryServiceColumns = ['sno', 'name', 'actions'];
    constructor(public matDialogRef: MatDialogRef<EmployeeMilitaryService>,
                @Inject(MAT_DIALOG_DATA) private _data: any,
                private fb: FormBuilder,
                ) {
        this.data = _data;
        if (_data.title === 'MILITARY_SERVICE') {
            this.dialogTitle = 'Military Service';
        }

    }

    ngOnInit(): void {
        this.refresh();
    }

    refresh() {
        this.employeeMilitaryServiceForm = this.fb.group({
            armOfService: ['', Validators.required],
            serviceNumber: ['', Validators.required],
            lastUnit: ['', Validators.required],
            dateOfEngagement: ['', Validators.required],
            dateOfDischarge: ['', Validators.required],
            reasonForLeaving: ['', Validators.required],
        });
    }


    editEmployeeMilitaryService(employeeMilitaryService: any) {

    }

    deleteEmployeeMilitaryService(id: any) {

    }
}
