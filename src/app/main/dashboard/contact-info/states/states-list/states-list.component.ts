import {Component, OnInit, ViewChild, ViewEncapsulation, Output, EventEmitter} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {FormGroup} from '@angular/forms';
import {StatesCreateComponent} from '../states-create/states-create.component';
import {fuseAnimations} from '../../../../../../@fuse/animations';
import {ContactInfoService} from '../../../../../shared/services/contact-info.service';

@Component({
    selector: 'app-states-list',
    templateUrl: './states-list.component.html',
    styleUrls: ['./states-list.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class StatesListComponent implements OnInit {
    statesList = [];
    displayedStatesColumns = ['id', 'country', 'region', 'name', 'actions'];
    dialogRef: any;    
    selectIndex = 0;
    @Output() selectedIndexChange: EventEmitter<number>;

    constructor(private contactInfoService: ContactInfoService,
                private _matDialog: MatDialog) {
    }

    ngOnInit(): void {
        this.getStatesList();
    }

    getStatesList() {
        this.contactInfoService.getStateList({'page': -1}).subscribe(data => {
            this.statesList = data.items;

            if (this.statesList && this.statesList.length > 0) {
                let i = 1;
                this.statesList.forEach(val => {
                    val['sno'] = i;
                    i++;
                });
            }
        });
    }


    deleteStates(id) {
        this.contactInfoService.deleteStates(id).subscribe(data => {
            if (data) {
                this.getStatesList();
            }
        });
    }

    editStates(state) {
        this.dialogRef = this._matDialog.open(StatesCreateComponent, {
            panelClass: 'contact-form-dialog',
            data: {action: 'EDIT', state: state},
        });
        this.dialogRef.afterClosed().subscribe((response: FormGroup) => {
            if (!response) {
                return;
            }
            this.getStatesList();
        });
    }

}
