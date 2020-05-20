import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {fuseAnimations} from "../../../../@fuse/animations";
import {Router} from "@angular/router";

import * as moment from 'moment';

@Component({
    selector: 'app-employees',
    templateUrl: './employees.component.html',
    styleUrls: ['./employees.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class EmployeesComponent implements OnInit {
    selectedEmployee;

    constructor(private router: Router) {
    }

    ngOnInit(): void {
    }

    addEmployee() {
        this.router.navigateByUrl(`/dashboard/add-employee`);
    }

    getSelectedEmployee(selected){
        if(selected){
            this.selectedEmployee = selected;
            console.log("selectedEmployee---->", selected);
        }

    }
}
