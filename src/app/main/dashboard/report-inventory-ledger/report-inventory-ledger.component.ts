import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {fuseAnimations} from "../../../../@fuse/animations";
import {FuseSidebarService} from "../../../../@fuse/components/sidebar/sidebar.service";

@Component({
    selector: 'app-report-inventory-ledger',
    templateUrl: './report-inventory-ledger.component.html',
    styleUrls: ['./report-inventory-ledger.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class ReportInventoryLedgerComponent implements OnInit {
    constructor(private _fuseSidebarService: FuseSidebarService) {
    }

    ngOnInit(): void {
    }
}
