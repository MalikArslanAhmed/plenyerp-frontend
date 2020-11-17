import {Component, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {FuseSidebarService} from "../../../../../@fuse/components/sidebar/sidebar.service";
import {MatDialog} from "@angular/material/dialog";
import {fuseAnimations} from "../../../../../@fuse/animations";

@Component({
    selector: 'app-default-setting-voucher-info',
    templateUrl: './default-setting-voucher-info.component.html',
    styleUrls: ['./default-setting-voucher-info.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class DefaultSettingVoucherInfoComponent implements OnInit {
    voucherInfoForm: FormGroup;
    accountHeads = [];
    subOrganisations = [];
    adminSegments = [];
    fundSegments = [];
    programmes = [];
    functionalSegments = [];
    geoCodes = [];
    economicCodes = [];
    checkingOfficers = [];

    constructor(
        private _fuseSidebarService: FuseSidebarService,
        private _matDialog: MatDialog,
        private fb: FormBuilder) {
    }

    ngOnInit(): void {
        this.refresh();
    }

    refresh() {
        this.voucherInfoForm = this.fb.group({
            'accountHeadId': [''],
            'subOrganisationId': [''],
            'adminSegmentId': [''],
            'fundSegmentId': [''],
            'programSegmentId': [''],
            'functionalSegmentId': [''],
            'geoCodeSegmentId': [''],
            'economicSegmentId': [''],
            'checkingOfficerId': [''],
        });
    }
}
