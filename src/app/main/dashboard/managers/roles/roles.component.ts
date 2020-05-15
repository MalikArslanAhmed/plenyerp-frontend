import {Component, OnInit, Output, ViewEncapsulation, EventEmitter, ViewChild} from '@angular/core';
import {fuseAnimations} from '../../../../../@fuse/animations';
import {FuseSidebarService} from '../../../../../@fuse/components/sidebar/sidebar.service';
import {MatDialog} from '@angular/material/dialog';
import {RolesCreateComponent} from './roles-create/roles-create.component';
import {FormGroup} from '@angular/forms';
import {RolesListComponent} from './roles-list/roles-list.component';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-roles',
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: fuseAnimations
})
export class RolesComponent implements OnInit {
  dialogRef: any;

  managerId:any;

  @ViewChild(RolesListComponent) getRoles: RolesListComponent;

  constructor(private _fuseSidebarService: FuseSidebarService,
    private _matDialog: MatDialog,
    private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.managerId = this.activatedRoute.snapshot.params.id;
  }

  addRole() {
    this.dialogRef = this._matDialog.open(RolesCreateComponent, {
        panelClass: 'contact-form-dialog',
        data: {action: 'CREATE', mId: this.managerId}
    });
    this.dialogRef.afterClosed().subscribe((response: FormGroup) => {
        if (!response) {
            return;
        }
        this.getRoles.getRoles(this.managerId);
    });
}

}