import { Component, OnInit, ViewChild, ViewEncapsulation, Output, EventEmitter } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FormGroup } from '@angular/forms';
import { fuseAnimations } from '../../../../../../@fuse/animations';
import { ContactInfoService } from '../../../../../shared/services/contact-info.service';
import { DeleteListModalComponent } from 'app/main/dashboard/delete-list-modal/delete-list-modal.component';
import { InformationCreateComponent } from '../information-create/information-create.component';

@Component({
    selector: 'information-list',
    templateUrl: './information-list.component.html',
    styleUrls: ['./information-list.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class InformationListComponent implements OnInit {
    informationList = [];
    displayedInformationColumns = ['id', 'currentYear', 'actions'];
    dialogRef: any;
    selectIndex = 0;
    @Output() selectedIndexChange: EventEmitter<number>;
    @Output() showAdd = new EventEmitter;

    constructor(private contactInfoService: ContactInfoService,
        private _matDialog: MatDialog) {
    }

    ngOnInit(): void {
        this.getInformationList();
    }

    getInformationList() {
        this.contactInfoService.getInformationList({ 'page': -1 }).subscribe(data => {
            this.informationList = data.items;
            this.showHideAddButton()

            if (this.informationList && this.informationList.length > 0) {
                let i = 1;
                this.informationList.forEach(val => {
                    val['sno'] = i;
                    i++;
                });
            }
        });
    }
    showHideAddButton() {
        if (this.informationList.length == 0) {
            this.showAdd.emit(true)
        } else if (this.informationList.length > 0) {
            let index = this.informationList.findIndex(resp => resp.deletedAt == null)
            if (index > -1) {
                this.showAdd.emit(false)
            } else {
                this.showAdd.emit(true)
            }
        }
    }
    deleteItemModal(items) {
        this.dialogRef = this._matDialog.open(DeleteListModalComponent, {
            panelClass: 'delete-items-dialog',
            data: { data: items }
        });
        this.dialogRef.afterClosed().subscribe((response: boolean) => {
            if (response) {
                this.deleteInformation(items.id);
            }
        });

    }
    deleteInformation(id) {
        this.contactInfoService.deleteInformation(id).subscribe(data => {
            if (data) {
                this.getInformationList();
            }
        });
    }

    editInformation(information) {
        this.dialogRef = this._matDialog.open(InformationCreateComponent, {
            panelClass: 'contact-form-dialog',
            data: { action: 'EDIT', information: information },
        });
        this.dialogRef.afterClosed().subscribe((response: FormGroup) => {
            if (!response) {
                return;
            }
            this.getInformationList();
        });
    }

}
