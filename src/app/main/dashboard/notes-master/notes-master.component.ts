import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {TrialBalanceReportService} from 'app/shared/services/trial-balance-report.service';
import {fuseAnimations} from '@fuse/animations';
import {FormBuilder, FormGroup} from '@angular/forms';
import {PermissionConstant} from 'app/shared/constants/permission-constant';
import {AlertService} from "../../../shared/services/alert.service";
import {DeleteListModalComponent} from "../delete-list-modal/delete-list-modal.component";
import {MatDialog} from "@angular/material/dialog";
import {NotesDeleteModalComponent} from './notes-delete-modal/notes-delete-modal.component';

@Component({
    selector: 'app-notes-master',
    templateUrl: './notes-master.component.html',
    styleUrls: ['./notes-master.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class NotesMasterComponent implements OnInit {
    permissionAddNotes = [PermissionConstant.NOTES_MASTER_NOTE_ADD];
    permissionDownloadNotes = [PermissionConstant.REPORTS_FINANCE_NOTES_MASTER_DOWNLOAD_REPORT];
    permissionResetNotes = [PermissionConstant.REPORTS_FINANCE_NOTES_MASTER_RESET_NOTES];
    searchNotesMasterForm: FormGroup;
    notesMasterData = [];
    chileNotesData = [];
    panelOpenState: boolean = false;
    dialogRef: any;

    constructor(private trialBalanceReportService: TrialBalanceReportService,
                private fb: FormBuilder,
                private alertService: AlertService,
                private _matDialog: MatDialog) {
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
            if (notesData && notesData.length > 0) {
                this.trialBalanceReportService.downloadNoteMasterReport({
                    'notesData': JSON.stringify(notesData),
                    'type': type
                }).subscribe((success) => {
                    window.location.href = success.url;
                });
            } else {
                this.alertService.showErrors('Please select notes to download.');
            }
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

    reportCheckedAll(event) {
        if (event['checked']) {
            this.notesMasterData.forEach(notes => {
                notes['checked'] = true;
            });
        } else {
            this.notesMasterData.forEach(notes => {
                notes['checked'] = false;
            });
        }
    }

    resetNoteMaster() {
        this.dialogRef = this._matDialog.open(NotesDeleteModalComponent, {
            panelClass: 'delete-items-dialog',
            data: {data: ''}
        });
        this.dialogRef.afterClosed().subscribe((response: boolean) => {
            if (response) {
                this.trialBalanceReportService.deleteAll().subscribe(data => {
                    if (data) {
                        this.getNotesMasterData({});
                    }
                });
            }
        });
    }
}
