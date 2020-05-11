import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {fuseAnimations} from "../../../../@fuse/animations";
import {Router} from "@angular/router";

@Component({
    selector: 'app-employees',
    templateUrl: './employees.component.html',
    styleUrls: ['./employees.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class EmployeesComponent implements OnInit {

    constructor(private router: Router) {
    }

    ngOnInit(): void {
    }

    addEmployee() {
        this.router.navigateByUrl(`/dashboard/add-employee`);
    }
}
