import {Component, OnInit, Output, ViewEncapsulation, EventEmitter, ViewChild} from '@angular/core';
import {fuseAnimations} from '../../../../@fuse/animations';
import {FuseSidebarService} from '../../../../@fuse/components/sidebar/sidebar.service';
import {MatDialog} from '@angular/material/dialog';
import {ManagersCreateComponent} from './managers-create/managers-create.component';
import {FormGroup} from '@angular/forms';
import {ManagersListComponent} from './managers-list/managers-list.component';

@Component({
  selector: 'app-managers',
  templateUrl: './managers.component.html',
  styleUrls: ['./managers.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: fuseAnimations
})
export class ManagersComponent implements OnInit {
  dialogRef: any;
  @ViewChild(ManagersListComponent) getManagers: ManagersListComponent;

  constructor(private _fuseSidebarService: FuseSidebarService,
    private _matDialog: MatDialog) { }

  ngOnInit(): void {
  }

  addManager() {
    this.dialogRef = this._matDialog.open(ManagersCreateComponent, {
        panelClass: 'contact-form-dialog',
        data: {action: 'CREATE'}
    });
    this.dialogRef.afterClosed().subscribe((response: FormGroup) => {
        if (!response) {
            return;
        }
        this.getManagers.getManagers();
    });
}

}
