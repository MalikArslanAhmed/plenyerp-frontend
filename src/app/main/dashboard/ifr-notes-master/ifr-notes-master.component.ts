import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {fuseAnimations} from "../../../../@fuse/animations";
import {FormBuilder, FormGroup} from "@angular/forms";
import {MatDialog} from "@angular/material/dialog";
import {AlertService} from "../../../shared/services/alert.service";
import {IfrReportService} from "../../../shared/services/ifr-report.service";

@Component({
    selector: 'app-ifr-notes-master',
    templateUrl: './ifr-notes-master.component.html',
    styleUrls: ['./ifr-notes-master.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class IfrNotesMasterComponent implements OnInit {
    reportFilterForm: FormGroup;
    applicationFundReportData = [];
    panelOpenState: boolean = false;
    dialogRef: any;
    reports = [];
    types = [
        {
            'name': 'Uses of Fund',
            'value': 'USES_OF_FUNDS'
        },
        {
            'name': 'Application of Fund',
            'value': 'APPLICATION_OF_FUNDS'
        }
    ];
    pagination = {
        page: 1,
        total: null,
        perpage: 15,
        pages: null
    };

    constructor(private fb: FormBuilder,
                private _matDialog: MatDialog,
                private alertService: AlertService,
                private ifrReportService: IfrReportService) {
    }

    ngOnInit(): void {
        this.refresh();
    }

    refresh() {
        this.reportFilterForm = this.fb.group({
            'type': ['']
        });
    }

    submit() {
        if (!this.reportFilterForm.getRawValue().type || this.reportFilterForm.getRawValue().type === '') {
            this.alertService.showErrors('Please fill Type.');
            return;
        }
        const param = {
            type: this.reportFilterForm.getRawValue().type
        };
        this.ifrReportService.ifrNotes(param).subscribe(data => {
            if (data) {
                this.applicationFundReportData = data;
            }
        });
    }

    getChildReportData(item) {
        if (item && item.id) {
            this.ifrReportService.ifrNotes({
                type: this.reportFilterForm.getRawValue().type,
                economicSegmentId: item.id
            }).subscribe(data => {
                if (data) {
                    item['childTableData'] = data;
                }
            });
        }
    }

    addNote(id) {
        let params = {
            'economicSegmentId': id,
            'type': this.reportFilterForm.getRawValue().type
        };

        this.ifrReportService.addIfrNote(params).subscribe(data => {
            // console.log('data', data);
            this.submit();
        });
    }

    onPageChange(page) {
        this.pagination.page = page.pageIndex + 1;
        this.submit();
    }
}
