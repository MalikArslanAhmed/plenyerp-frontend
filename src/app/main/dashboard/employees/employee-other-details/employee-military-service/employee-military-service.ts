import {Component, Inject, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {FormBuilder, FormGroup, Validators, FormControl} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {fuseAnimations} from '../../../../../../@fuse/animations';
import * as moment from 'moment';
import {EmployeeOtherDetailsService} from '../../../../../shared/services/employee-other-details.service';

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
    armOfServices = [];
    employeeMilitaryServiceList = [ ];
    employeeMilitaryServiceColumns = ['sno', 'armOfServiceId', 'serviceNumber', 'lastUnit', 'engagedAt', 'dischargedAt', 'reasonToLeave', 'actions'];
    employeeMilitaryServiceId = null;
    constructor(public matDialogRef: MatDialogRef<EmployeeMilitaryService>,
                @Inject(MAT_DIALOG_DATA) private _data: any,
                private fb: FormBuilder,
                private employeeOtherDetailsService: EmployeeOtherDetailsService,
                ) {
        this.data = _data;
        if (_data.title === 'MILITARY_SERVICE') {
            this.dialogTitle = 'Military Service';
        }

    }

    ngOnInit(): void {
        this.refresh();
        this.getArmOfService();
        this.getMilitaryServiceList();
    }

    refresh() {
        this.employeeMilitaryServiceForm = this.fb.group({
            armOfServiceId: ['', Validators.required],
            serviceNumber: ['', Validators.required],
            lastUnit: ['', Validators.required],
            engagedAt: ['', Validators.required],
            dischargedAt: ['', Validators.required],
            reasonToLeave: ['', Validators.required],
        });
    }
   getArmOfService() {
      this.employeeOtherDetailsService.armOfService().subscribe(data => {
          this.armOfServices = data.items;
      });
   }
    getMilitaryServiceList() {
        this.employeeOtherDetailsService.employeeMilitaryServiceList(this.data.employeeId).subscribe(data => {
            this.employeeMilitaryServiceList = data.items;
            let index = 0;
            this.employeeMilitaryServiceList.forEach(value => {
                index += 1;
                value['sno'] = index;
            });
            // console.log( this.employeeMilitaryServiceList);
        });
    }

    editEmployeeMilitaryService(employeeMilitaryServiceId: any) {
        this.employeeMilitaryServiceId = employeeMilitaryServiceId;
        this.employeeMilitaryServiceList.forEach(val => {
            if (val.id === employeeMilitaryServiceId) {
                this.employeeMilitaryServiceForm.patchValue({
                    armOfServiceId: val.armOfServiceId,
                    serviceNumber: val.serviceNumber,
                    lastUnit: val.lastUnit,
                    engagedAt: val.engagedAt,
                    dischargedAt: val.dischargedAt,
                    reasonToLeave: val.reasonToLeave,
                });
            }
        });
    }

    deleteEmployeeMilitaryService(id: any) {
        this.employeeOtherDetailsService.deleteMilitaryService(id).subscribe(data => {
            this.employeeMilitaryServiceForm.reset();
            this.getMilitaryServiceList();
        });
    }
    addMilitaryService() {
        const f = this.employeeMilitaryServiceForm.value;
        const engage = moment(f.engagedAt).format('YYYY-MM-DD');
        const disEngage = moment(f.dischargedAt).format('YYYY-MM-DD');
        const obj = {
            armOfServiceId: f.armOfServiceId,
            engagedAt: engage,
            dischargedAt: disEngage,
            serviceNumber: f.serviceNumber,
            lastUnit: f.lastUnit,
            reasonToLeave: f.reasonToLeave,
        };
        // console.log(obj);
        this.employeeOtherDetailsService.addEmployeeMilitaryService(this.data.employeeId, obj).subscribe(v => {
            // console.log(v);
            this.employeeMilitaryServiceForm.reset();
            this.getMilitaryServiceList();
        });
    }
    updateEmployeeAddress() {
        const f = this.employeeMilitaryServiceForm.value;
        const engage = moment(f.engagedAt).format('YYYY-MM-DD');
        const disEngage = moment(f.dischargedAt).format('YYYY-MM-DD');
        const obj = {
            armOfServiceId: f.armOfServiceId,
            engagedAt: engage,
            dischargedAt: disEngage,
            serviceNumber: f.serviceNumber,
            lastUnit: f.lastUnit,
            reasonToLeave: f.reasonToLeave,
        };
        this.employeeOtherDetailsService.updateMilitaryService(this.data.employeeId, this.employeeMilitaryServiceId, obj).subscribe(data => {
            this.employeeMilitaryServiceId = null;
            this.employeeMilitaryServiceForm.reset();
            this.getMilitaryServiceList();
        });
    }
    cancelUpdate() {
        this.employeeMilitaryServiceId = null;
        this.employeeMilitaryServiceForm.reset();
    }
}
