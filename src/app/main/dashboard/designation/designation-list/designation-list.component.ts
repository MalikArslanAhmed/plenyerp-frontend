import {Component, OnInit, ViewChild, ViewEncapsulation, Output, EventEmitter} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {FormGroup} from '@angular/forms';
import {DesignationCreateComponent} from '../designation-create/designation-create.component';
import {fuseAnimations} from '../../../../../@fuse/animations';
import {ContactInfoService} from '../../../../shared/services/contact-info.service';

@Component({
    selector: 'app-designation-list',
    templateUrl: './designation-list.component.html',
    styleUrls: ['./designation-list.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class DesignationListComponent implements OnInit {
    designationList = [];
    displayedDesignationColumns = ['id', 'name', 'status', 'actions'];
    dialogRef: any;    
    selectIndex = 0;
    @Output() selectedIndexChange: EventEmitter<number>;

    constructor(private contactInfoService: ContactInfoService,
                private _matDialog: MatDialog) {
    }

    ngOnInit(): void {
        this.getDesignationList();
    }

    getDesignationList() {
        this.contactInfoService.getDesignationList({'page': -1}).subscribe(data => {
            this.designationList = data.items;

            if (this.designationList && this.designationList.length > 0) {
                let i = 1;
                this.designationList.forEach(val => {
                    val['sno'] = i;
                    i++;
                });
            }
        });
    }


    deleteDesignation(id) {
        this.contactInfoService.deleteDesignation(id).subscribe(data => {
            if (data) {
                this.getDesignationList();
            }
        });
    }

    editDesignation(designation) {
        this.dialogRef = this._matDialog.open(DesignationCreateComponent, {
            panelClass: 'contact-form-dialog',
            data: {action: 'EDIT', designation: designation},
        });
        this.dialogRef.afterClosed().subscribe((response: FormGroup) => {
            if (!response) {
                return;
            }
            this.getDesignationList();
        });
    }

}
