import {Component, OnInit, ViewEncapsulation, EventEmitter, Output} from '@angular/core';
import {EmployeesService} from "../../../../shared/services/employees.service";
import {MatDialog} from "@angular/material/dialog";
import {CategoriesCreateComponent} from "../../categories/categories-create/categories-create.component";
import {FormGroup} from "@angular/forms";
import {fuseAnimations} from "../../../../../@fuse/animations";
import {EmpListHeadersComponent} from "./emp-list-headers/emp-list-headers.component";
import {PageEvent} from '@angular/material/paginator';

@Component({
    selector: 'app-employee-list',
    templateUrl: './employee-list.component.html',
    styleUrls: ['./employee-list.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class EmployeeListComponent implements OnInit {

    employees = [];
    displayedColumns = ['SN', 'Title', 'File No', 'Staff ID', 'First Name', 'Last Name'];
    dialogRef: any;
    pagination = {
        page: 1,
        total: null,
        perpage: 15,
        pages: null
    };
    pageEvent: PageEvent;
    @Output() selectedEmployee = new EventEmitter<any>();

    constructor(private employeesService: EmployeesService,
                private _matDialog: MatDialog) {
    }

    ngOnInit(): void {
        this.getEmployees();
    }

    downloadReport(data): void {

        this.employeesService.downloadReport({columns: JSON.stringify(data)}).subscribe((success) => {
            window.location.href = success.url;
        });
    }

    updateList(): void {
        this.dialogRef = this._matDialog.open(EmpListHeadersComponent, {
            panelClass: 'contact-form-dialog',
            data: {action: 'CREATE', selectedCol: this.displayedColumns}
        });
        this.dialogRef.afterClosed().subscribe((response: FormGroup) => {
            if (!response) {
                return;
            }
            // this.getEmployees();
            const formData = response.getRawValue();
            this.displayedColumns = formData.headers;
        });
    }

    selectEmployee(employeeData): void {
        this.selectedEmployee.emit(employeeData);
    }

    getEmployees(): void {
        this.employees = [];
        this.employeesService.getEmployees({page: this.pagination.page}).subscribe(data => {
            this.employees = data.items;

            if (this.employees && this.employees.length > 0) {
                let i = 1;
                this.employees.forEach(category => {
                    category['sno'] = i;
                    i++;
                });
            }
            this.pagination.page = data.page;
            this.pagination.total = data.total;
        });
    }
    onPageChange(page) {
        this.pagination.page = page.pageIndex + 1;
        this.getEmployees();
    }

    /*getCategories() {
        this.categoriesService.getCategories({'page': -1}).subscribe(data => {
            this.categories = data.items;

            if (this.categories && this.categories.length > 0) {
                let i = 1;
                this.categories.forEach(category => {
                    category['sno'] = i;
                    i++;
                });
            }
        });
    }

    deleteCategory(id) {
        this.categoriesService.deleteCategory(id).subscribe(data => {
            if (data) {
                this.getCategories();
            }
        })
    }

    editCategory(category) {
        this.dialogRef = this._matDialog.open(CategoriesCreateComponent, {
            panelClass: 'contact-form-dialog',
            data: {action: 'EDIT', category: category},
        });
        this.dialogRef.afterClosed().subscribe((response: FormGroup) => {
            if (!response) {
                return;
            }
            this.getCategories();
        });
    }*/

    editCategory(employee): void {
        console.log(employee);
    }

    deleteCategory(employee): void {
        console.log(employee);
    }
}
