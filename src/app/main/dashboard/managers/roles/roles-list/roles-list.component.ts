import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {fuseAnimations} from "../../../../../../@fuse/animations";
import {RolesService} from "../../../../../shared/services/roles.service";
import {RolesCreateComponent} from "../roles-create/roles-create.component";
import {FormGroup} from "@angular/forms";
import {MatDialog} from "@angular/material/dialog";

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

  constructor(private rolesService: RolesService,
    private _matDialog: MatDialog) { }

  ngOnInit(): void {
    this.getRoles();
  }

  getRoles() {
    this.rolesService.getRoles({'page': -1}).subscribe(data => {
        this.roles = data.items;

        if (this.roles && this.roles.length > 0) {
            let i = 1;
            this.roles.forEach(role => {
                role['sno'] = i;
                i++;
            });
        }
    });
}

deleteRoles(id) {
    this.rolesService.deleteRoles(id).subscribe(data => {
        if (data) {
            this.getRoles();
        }
    })
}

editRoles(role) {
    console.log('id', role);
    this.dialogRef = this._matDialog.open(RolesCreateComponent, {
        panelClass: 'contact-form-dialog',
        data: {action: 'EDIT', role: role},
    });
    this.dialogRef.afterClosed().subscribe((response: FormGroup) => {
        if (!response) {
            return;
        }
        this.getRoles();
    });
}

}
