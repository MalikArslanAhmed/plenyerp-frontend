import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {fuseAnimations} from "../../../../../@fuse/animations";
import {MatDialog} from "@angular/material/dialog";
import {EmployeeService} from "../../../../shared/services/employee.service";
import {Router} from "@angular/router";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {EmployeePreviewComponent} from '../employee-preview/employee-preview.component';
import {DepartmentListSelectComponent} from "../../structure/department-list/department-list-select.component";

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
    statuses = [
        {
            'id': 1,
            'name': 'New'
        },
        {
            'id': 2,
            'name': 'Activated'
        }
    ];
    departments = [];
    employeeFilterForm: FormGroup;

    constructor(private employeesService: EmployeeService,
                private _matDialog: MatDialog,
                private router: Router,
                private fb: FormBuilder) {
    }

    ngOnInit(): void {
        this.refresh();
        this.getEmployees();
    }

    refresh() {
        this.employeeFilterForm = this.fb.group({
            'departmentId': ['', Validators.required],
            'search': ['', Validators.required],
            'statusId': ['', Validators.required]
        });
    }

    getEmployees() {
        this.employeesService.getEmployees({'page': -1}).subscribe(data => {
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
        console.log('this.selectedEmployee', this.selectedEmployee);
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
        });
    }
}
