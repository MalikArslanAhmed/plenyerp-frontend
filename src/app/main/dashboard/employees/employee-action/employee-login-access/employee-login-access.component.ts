import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {EmployeeService} from '../../../../../shared/services/employee.service';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

@Component({
    selector: 'app-employee-login-access',
    templateUrl: './employee-login-access.component.html',
    styleUrls: ['./employee-login-access.component.scss']
})
export class EmployeeLoginAccessComponent implements OnInit {
    currentEmployee: any;
    constructor(private employeesService: EmployeeService,
                public matDialogRef: MatDialogRef<EmployeeLoginAccessComponent>,
                @Inject(MAT_DIALOG_DATA) private _data: any,
                private fb: FormBuilder) {
        this.currentEmployee = _data.selectedEmployee;
    }

    employeeLoginAccessForm: FormGroup;

    ngOnInit(): void {
        this.refresh();
    }


    refresh(): void {
        this.employeeLoginAccessForm = this.fb.group({
            password: ['', Validators.required],
        });
    }

    allowLoginAccess() {
        this.employeesService.addLoginAcecss(this.currentEmployee.id, this.employeeLoginAccessForm.value).subscribe(data => {
            this.employeeLoginAccessForm.controls['password'].reset();
        });
    }

}
