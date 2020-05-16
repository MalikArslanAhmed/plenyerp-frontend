import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {EmployeesService} from "../../../../shared/services/employees.service";
import {MatDialog} from "@angular/material/dialog";
import {CategoriesCreateComponent} from "../../categories/categories-create/categories-create.component";
import {FormGroup} from "@angular/forms";
import {fuseAnimations} from "../../../../../@fuse/animations";

@Component({
    selector: 'app-employee-list',
    templateUrl: './employee-list.component.html',
    styleUrls: ['./employee-list.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class EmployeeListComponent implements OnInit {
    // employees = [
    //     {
    //         'sno': 1,
    //         'name': 'John Doe',
    //         'phone': '+91 9988778899',
    //         'department': 'Technical',
    //         'position': 'Engineer',
    //     },
    //     {
    //         'sno': 2,
    //         'name': 'Mary Doe',
    //         'phone': '+91 6677889988',
    //         'department': 'Management',
    //         'position': 'Manager',
    //     }
    // ];

    employees = [];
    displayedColumns = ['check','id', 'id2', 'fileId', 'lName', 'fName', 'title', 'actions'];
    dialogRef: any;

    constructor(private employeesService: EmployeesService,
                private _matDialog: MatDialog) {
    }

    ngOnInit(): void {
        this.getEmployees();
    }

    getEmployees() {
        this.employeesService.getEmployees({'page': -1}).subscribe(data => {
            this.employees = data.items;

            if (this.employees && this.employees.length > 0) {
                let i = 1;
                this.employees.forEach(category => {
                    category['sno'] = i;
                    i++;
                });
            }
        });
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

    editCategory(employee) {
        console.log(employee);
    }

    deleteCategory(employee) {
        console.log(employee);
    }
}
