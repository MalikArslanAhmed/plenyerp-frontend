import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {fuseAnimations} from "../../../../@fuse/animations";
import {FuseSidebarService} from "../../../../@fuse/components/sidebar/sidebar.service";
import {FormBuilder, FormGroup} from "@angular/forms";

@Component({
    selector: 'app-report-inventory-ledger',
    templateUrl: './report-inventory-ledger.component.html',
    styleUrls: ['./report-inventory-ledger.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class ReportInventoryLedgerComponent implements OnInit {
    reportInventoryLedgerForm: FormGroup;
    itemsArr = [
        {
            description: 'lorem ipsum',
            quantityIn: 1221,
            unitPriceIn: 100,
            valueIn: 1000,
            quantityOut: 1221,
            unitPriceOut: 100,
            valueOut: 1000,
            quantityBalance: 1221,
            unitPriceBalance: 100,
            valueBalance: 1000,
        },
        {
            description: 'lorem ipsum',
            quantityIn: 1221,
            unitPriceIn: 100,
            valueIn: 1000,
            quantityOut: 1221,
            unitPriceOut: 100,
            valueOut: 1000,
            quantityBalance: 1221,
            unitPriceBalance: 100,
            valueBalance: 1000,
        },
    ];

    constructor(private fb: FormBuilder) {
    }

    ngOnInit(): void {
        this.refresh();
    }

    refresh() {
        this.reportInventoryLedgerForm = this.fb.group({
            openingDate: [''],
            closingDate: [''],
            itemId: [''],
            itemName: [''],
            store: [''],
            costingMethod: []
        });
    }
}
