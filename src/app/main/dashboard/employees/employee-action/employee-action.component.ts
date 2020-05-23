import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {fuseAnimations} from '../../../../../@fuse/animations';
import {MatDialog} from '@angular/material/dialog';
import {EmployeeService} from '../../../../shared/services/employee.service';
import {Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {EmployeePreviewComponent} from '../employee-preview/employee-preview.component';
import {DepartmentListSelectComponent} from '../../structure/department-list/department-list-select.component';

@Component({
    selector: 'app-employee-action',
    templateUrl: './employee-action.component.html',
    styleUrls: ['./employee-action.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class EmployeeActionComponent implements OnInit {
    employees = [];
    displayedColumns = ['select', 'id', 'empId', 'fileNo', 'lastName', 'firstName', 'title', 'actions'];
    dialogRef: any;
    selectedEmployee = [];
    selectedStatus;
    nextStatus;
    statuses = [
        {
            'value': 'NEW',
            'name': 'New'
        },
        {
            'value': 'ACTIVE',
            'name': 'Activated'
        },
        {
            'value': 'RETIRE',
            'name': 'Retire'
        },
        {
            'value': 'RETIREMENT_DUE',
            'name': 'Retirement Due'
        },
        {
            'value': 'CONFIRMED',
            'name': 'Confirmed'
        },
        {
            'value': 'CONFIRMATION_DUE',
            'name': 'Confirmtion Due'
        },
        {
            'value': 'INCREMENT',
            'name': 'Increment'
        },
        {
            'value': 'INCREMENT_DUE',
            'name': 'Increment Due'
        },
        {
            'value': 'PROMOTION',
            'name': 'Promotion'
        },
        {
            'value': 'PROMOTION_DUE',
            'name': 'Promotion Due'
        }
    ];
    departments = [];
    employeeFilterForm: FormGroup;
    isSubmitted = false;

    constructor(private employeesService: EmployeeService,
                private _matDialog: MatDialog,
                private router: Router,
                private fb: FormBuilder) {
    }

    ngOnInit(): void {
        this.refresh();
        this.getEmployees({});
    }

    refresh() {
        this.employeeFilterForm = this.fb.group({
            'departmentId': [''],
            'search': [''],
            'statusId': ['']
        });
    }

    getEmployees(params) {
        if (params.status === 'NEW') {
            this.nextStatus = 'ACTIVE';
        } else if (params.status === 'RETIREMENT_DUE') {
            this.nextStatus = 'RETIRE';
        } else if (params.status === 'CONFIRMATION_DUE') {
            this.nextStatus = 'CONFIRMED';
        } else if (params.status === 'INCREMENT_DUE') {
            this.nextStatus = 'INCREMENT';
        } else if (params.status === 'PROMOTION_DUE') {
            this.nextStatus = 'PROMOTION';
        }else {
            this.nextStatus = '';
        }
        this.employeesService.getEmployees(params).subscribe(data => {
            this.employees = data.items;

            if (this.employees && this.employees.length > 0) {
                let i = 1;
                this.employees.forEach(employee => {
                    employee['sno'] = i;
                    i++;
                });
            }
        });
    }

    editEmployee(employee) {
        console.log(3);
        this.router.navigateByUrl('dashboard/employee/edit/' + employee.id);
    }

    previewEmployee(employee) {
        this.dialogRef = this._matDialog.open(EmployeePreviewComponent, {
            panelClass: 'contact-form-dialog',
            data: {action: 'PREVIEW', employee: employee},
        });
        this.dialogRef.afterClosed().subscribe((response: FormGroup) => {
            if (!response) {
                return;
            }
        });
    }

    checkEmployee(employee) {
        let found = false;
        if (this.selectedEmployee && this.selectedEmployee.length > 0) {
            let i = 0;
            this.selectedEmployee.forEach(selectedEmployee => {
                if (selectedEmployee.id === employee.id) {
                    this.selectedEmployee.splice(i, 1);
                    found = true;
                }
                i++;
            });
        }

        if (!found) {
            this.selectedEmployee.push(employee);
        }
    }

    addEmployee() {
        this.router.navigateByUrl(`/dashboard/add-employee`);
    }

    adminUnitListSelect() {
        this.dialogRef = this._matDialog.open(DepartmentListSelectComponent, {
            panelClass: 'contact-form-dialog',
        });
        this.dialogRef.afterClosed().subscribe((response) => {
            if (!response) {
                return;
            }
            this.departments = [{
                'name': response.name,
                'id': response.id
            }];
            this.employeeFilterForm.patchValue({
                departmentId: response.id,
                disabled: true
            });
            this.getEmployees({'departmentId': response.id});
        });
    }

    activateEmployee() {
        console.log(this.nextStatus);
        this.isSubmitted = true;
        if (this.isSubmitted) {
            const params = {
                'status': this.nextStatus,
                'employeeIds': this.selectedEmployee.map(i => i.id)
            };

            console.log(params);
            this.employeesService.setStatusEmployee(params).subscribe(data => {
                this.isSubmitted = false;
            });
        }
    }
}
