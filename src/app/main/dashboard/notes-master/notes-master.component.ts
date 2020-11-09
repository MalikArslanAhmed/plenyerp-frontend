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
    panelOpenState: boolean = false;

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
            if (this.notesMasterData && this.notesMasterData.length > 0) {
                this.notesMasterData.forEach(d => {
                    d['checked'] = false;
                    d['isOpen'] = !this.panelOpenState;
                    this.getChildNotes(d);
                });
                this.panelOpenState = !this.panelOpenState;
            }
        });
    }

    getChildNotes(item) {
        const params = {};
        if (item && item.economicSegmentId) {
            params['parentId'] = item.economicSegmentId;
            this.trialBalanceReportService.getNotesData(params).subscribe(data => {
                item['childs'] = data.items;
            });
        }
    }

    addNote(economicSegmentId) {
        const params = {};
        this.trialBalanceReportService.addNote(economicSegmentId, {}).subscribe(data => {
            params['parentId'] = economicSegmentId;
            params['types'] = 'Trail_balance';
            this.trialBalanceReportService.getNotesData(params).subscribe(data => {
                this.chileNotesData = data.items;
            });
            this.getNotesMasterData({});
        });
    }

    search() {
        this.getNotesMasterData(this.searchNotesMasterForm.value);
    }

    downloadNoteMaster(type) {
        if (this.notesMasterData && this.notesMasterData.length > 0) {
            let notesData = [];
            this.notesMasterData.forEach(note => {
                if (note.checked) {
                    notesData.push({'economicSegmentId': note['economicSegment'].id, 'noteId': note.noteId});
                }
            });
            this.trialBalanceReportService.downloadNoteMasterReport({
                'notesData': JSON.stringify(notesData),
                'type': type
            }).subscribe((success) => {
                window.location.href = success.url;
            });
        }
    }

    openAll() {
        if (this.notesMasterData && this.notesMasterData.length > 0) {
            this.notesMasterData.forEach(d => {
                d['isOpen'] = !this.panelOpenState;
                this.getChildNotes(d);
            });
            this.panelOpenState = !this.panelOpenState;
        }
    }

    reportChecked(index, event) {
        this.notesMasterData[index].checked = event.checked;
    }

    reportCheckedAll() {
        if (this.notesMasterData && this.notesMasterData.length > 0) {
            this.notesMasterData.forEach(notes => {
                notes['checked'] = !notes['checked'];
            });
        }
    }

    resetNoteMaster() {
        this.trialBalanceReportService.deleteAll().subscribe(data => {
            if (data) {
                this.getNotesMasterData({});
            }
        });
    }
}
