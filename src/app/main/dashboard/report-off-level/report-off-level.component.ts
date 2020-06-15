import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {fuseAnimations} from "../../../../@fuse/animations";
import {FormBuilder, FormGroup} from "@angular/forms";

@Component({
    selector: 'app-report-off-level',
    templateUrl: './report-off-level.component.html',
    styleUrls: ['./report-off-level.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class ReportOffLevelComponent implements OnInit {
    reportOffLevelForm: FormGroup;
    itemsArr = [
        {
            description: 'New Item 1',
            minMaxReorderLevel: 10,
            onHand: 12,
            quantity: 1221,
            variance: 1221,
            unitOfMeasure: 'kg',
            store: 'New Store '
        },
        {
            description: 'New Item 2',
            minMaxReorderLevel: 20,
            onHand: 20,
            quantity: 221,
            variance: 221,
            unitOfMeasure: 'kg',
            store: 'New Store 1'
        }
    ];

    constructor(private fb: FormBuilder) {
    }

    ngOnInit(): void {
        this.refresh();
    }

    refresh() {
        this.reportOffLevelForm = this.fb.group({
            openingDate: [''],
            closingDate: [''],
            itemId: [''],
            itemName: [''],
            store: [''],
            costingMethod: []
        });
    }
}
