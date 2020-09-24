import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {fuseAnimations} from "../../../../@fuse/animations";

@Component({
    selector: 'app-journal-voucher',
    templateUrl: './journal-voucher.component.html',
    styleUrls: ['./journal-voucher.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class JournalVoucherComponent implements OnInit {

    constructor() {
    }

    ngOnInit(): void {
    }

}
