import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {TrialBalanceReportService} from 'app/shared/services/trial-balance-report.service';
import {fuseAnimations} from '@fuse/animations';
import {FormBuilder, FormGroup} from '@angular/forms';
import {PermissionConstant} from 'app/shared/constants/permission-constant';

@Component({
    selector: 'app-notes-master',
    templateUrl: './notes-master.component.html',
    styleUrls: ['./notes-master.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class NotesMasterComponent implements OnInit {

    permissionAddNotes = [PermissionConstant.NOTES_MASTER_NOTE_ADD];
    searchNotesMasterForm: FormGroup;
    notesMasterData = [];
    chileNotesData = [];
    notesMasterColumn = ['Note Id', 'Full Code', 'Debit', 'Credit', 'Balance'];
    constructor(private trialBalanceReportService: TrialBalanceReportService,
                private fb: FormBuilder) {
    }

    ngOnInit(): void {
        this.getNotesMasterData({});

        this.searchNotesMasterForm = this.fb.group({
            'id': [''],
        });
    }

    getNotesMasterData(params) {
        this.trialBalanceReportService.getNotesData(params).subscribe(data => {
            this.notesMasterData = data.items;
        });
    }

    getChildNotes(data) {
        const params = {};
        if (data && data.economicSegmentId) {
            params['parentId'] = data.economicSegmentId;
            this.chileNotesData = [];
            this.trialBalanceReportService.getNotesData(params).subscribe(data => {
                this.chileNotesData = data.items;
            });
        }
    }

    addNote(economicSegmentId) {
        const params = {};
        this.trialBalanceReportService.addNote(economicSegmentId, {}).subscribe(data => {
            //console.log('data', data);
            params['parentId'] = economicSegmentId;
            this.trialBalanceReportService.getNotesData(params).subscribe(data => {
                this.chileNotesData = data.items;
            });
            this.getNotesMasterData({});
        });
    }

    search() {
        this.getNotesMasterData(this.searchNotesMasterForm.value);
    }

    downloadNoteMaster(data) {
        this.trialBalanceReportService.downloadNoteMasterReport({columns: JSON.stringify(data)}).subscribe((success) => {
            window.location.href = success.url;
        });
    }
}
