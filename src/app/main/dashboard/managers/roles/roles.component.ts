import {Component, OnInit, Output, ViewEncapsulation, EventEmitter, ViewChild} from '@angular/core';
import {fuseAnimations} from '../../../../../@fuse/animations';
import {FuseSidebarService} from '../../../../../@fuse/components/sidebar/sidebar.service';
import {MatDialog} from '@angular/material/dialog';
import {RolesCreateComponent} from './roles-create/roles-create.component';
import {FormGroup} from '@angular/forms';
import {RolesListComponent} from './roles-list/roles-list.component';

@Component({
  selector: 'app-roles',
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: fuseAnimations
})
export class RolesComponent implements OnInit {
  dialogRef: any;
  @ViewChild(RolesListComponent) getRoles: RolesListComponent;

  constructor(private _fuseSidebarService: FuseSidebarService,
    private _matDialog: MatDialog) { }

  ngOnInit(): void {
  }

  addManager() {
    this.dialogRef = this._matDialog.open(RolesCreateComponent, {
        panelClass: 'contact-form-dialog',
        data: {action: 'CREATE'}
    });
    this.dialogRef.afterClosed().subscribe((response: FormGroup) => {
        if (!response) {
            return;
        }
        this.getRoles.getRoles();
    });
}

}