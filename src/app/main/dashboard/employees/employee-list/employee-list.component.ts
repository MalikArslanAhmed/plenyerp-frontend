import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {CategoriesService} from "../../../../shared/services/categories.service";
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
    employees = [
        {
            'sno': 1,
            'name': 'John Doe',
            'phone': '+91 9988778899',
            'department': 'Technical',
            'position': 'Engineer',
        },
        {
            'sno': 2,
            'name': 'Mary Doe',
            'phone': '+91 6677889988',
            'department': 'Management',
            'position': 'Manager',
        }
    ];
    displayedColumns = ['id', 'name', 'phone', 'department', 'position', 'actions'];
    dialogRef: any;

    constructor(private categoriesService: CategoriesService,
                private _matDialog: MatDialog) {
    }

    ngOnInit(): void {
        // this.getCategories();
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
