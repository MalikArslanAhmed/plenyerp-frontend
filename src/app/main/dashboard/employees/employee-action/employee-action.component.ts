import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {fuseAnimations} from "../../../../../@fuse/animations";
import {MatDialog} from "@angular/material/dialog";
import {EmployeeService} from "../../../../shared/services/employee.service";
import {Router} from "@angular/router";

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

    constructor(private employeesService: EmployeeService,
                private _matDialog: MatDialog,
                private router: Router) {
    }

    ngOnInit(): void {
        this.getEmployees();
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
        console.log(employee);
        this.router.navigateByUrl('dashboard/employee/edit/' + employee.id);
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
}
