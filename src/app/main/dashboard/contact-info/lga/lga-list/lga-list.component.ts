import {Component, OnInit, ViewChild, ViewEncapsulation, Output, EventEmitter} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {FormGroup} from '@angular/forms';
import {LgaCreateComponent} from '../lga-create/lga-create.component';
import {fuseAnimations} from '../../../../../../@fuse/animations';
import {ContactInfoService} from '../../../../../shared/services/contact-info.service';

@Component({
    selector: 'app-lga-list',
    templateUrl: './lga-list.component.html',
    styleUrls: ['./lga-list.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class LgaListComponent implements OnInit {
    lgaList = [];
    displayedLgaColumns = ['id', 'country', 'region', 'state', 'name', 'actions'];
    dialogRef: any;    
    selectIndex = 0;
    @Output() selectedIndexChange: EventEmitter<number>;

    constructor(private contactInfoService: ContactInfoService,
                private _matDialog: MatDialog) {
    }

    ngOnInit(): void {
        this.getLgaList();
    }

    getLgaList() {
        this.contactInfoService.getLgaList({'page': -1}).subscribe(data => {
            this.lgaList = data.items;

            if (this.lgaList && this.lgaList.length > 0) {
                let i = 1;
                this.lgaList.forEach(val => {
                    val['sno'] = i;
                    i++;
                });
            }
        });
    }


    deleteLga(id) {
        this.contactInfoService.deleteLga(id).subscribe(data => {
            if (data) {
                this.getLgaList();
            }
        });
    }

    editLga(lga) {
        this.dialogRef = this._matDialog.open(LgaCreateComponent, {
            panelClass: 'contact-form-dialog',
            data: {action: 'EDIT', lga: lga},
        });
        this.dialogRef.afterClosed().subscribe((response: FormGroup) => {
            if (!response) {
                return;
            }
            this.getLgaList();
        });
    }

}
