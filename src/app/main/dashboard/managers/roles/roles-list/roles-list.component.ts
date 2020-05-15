import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {fuseAnimations} from "../../../../../../@fuse/animations";
import {RolesService} from "../../../../../shared/services/roles.service";
import {RolesCreateComponent} from "../roles-create/roles-create.component";
import {FormGroup} from "@angular/forms";
import {MatDialog} from "@angular/material/dialog";
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-roles-list',
  templateUrl: './roles-list.component.html',
  styleUrls: ['./roles-list.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: fuseAnimations
})
export class RolesListComponent implements OnInit {

  roles = [];
  displayedColumns = ['id', 'role', 'actions'];
  dialogRef: any;

  managerId:any;

  constructor(private rolesService: RolesService,
    private _matDialog: MatDialog,
    private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.managerId = this.activatedRoute.snapshot.params.id;
    this.getRoles(this.managerId);
  }

  getRoles(id) {
    this.rolesService.getRoles(id,{'page': -1}).subscribe(data => {
        this.roles = data.roles;

        if (this.roles && this.roles.length > 0) {
            let i = 1;
            this.roles.forEach(role => {
                role['sno'] = i;
                i++;
            });
        }
    });
}

deleteRole(mId, roleId) {
    this.rolesService.deleteRoles(mId, roleId).subscribe(data => {
        if (data) {
            this.getRoles(this.managerId);
        }
    })
}

editRole(role) {
    this.dialogRef = this._matDialog.open(RolesCreateComponent, {
        panelClass: 'contact-form-dialog',
        data: {action: 'EDIT', role: role},
    });
    this.dialogRef.afterClosed().subscribe((response: FormGroup) => {
        if (!response) {
            return;
        }
        this.getRoles(this.managerId);
    });
}

}
