import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { fuseAnimations } from '@fuse/animations';


@Component({
    selector: 'app-trial-balance',
    templateUrl: './trial-balance.component.html',
    styleUrls: ['./trial-balance.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class TrialBalanceComponent implements OnInit {
    filterTrialBalanceReportForm: FormGroup;

    constructor(private fb:FormBuilder) {
    }

    ngOnInit(): void {
        this.filterTrialBalanceReportForm = this.fb.group({
            'from': [''],
            'to': ['']
        });

    }

}
