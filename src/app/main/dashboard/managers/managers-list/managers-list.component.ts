import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {fuseAnimations} from "../../../../../@fuse/animations";
import {ManagersService} from "../../../../shared/services/managers.service";
import {ManagersCreateComponent} from "../managers-create/managers-create.component";
import {FormGroup} from "@angular/forms";
import {MatDialog} from "@angular/material/dialog";

@Component({
  selector: 'app-managers-list',
  templateUrl: './managers-list.component.html',
  styleUrls: ['./managers-list.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: fuseAnimations
})
export class ManagersListComponent implements OnInit {

  managers = [];
  displayedColumns = ['id', 'name', 'username', 'actions'];
  dialogRef: any;

  constructor(private managersService: ManagersService,
    private _matDialog: MatDialog) { }

  ngOnInit(): void {
    this.getManagers();
  }

  getManagers() {
    this.managersService.getManagers({'page': -1}).subscribe(data => {
        this.managers = data.items;

        if (this.managers && this.managers.length > 0) {
            let i = 1;
            this.managers.forEach(manager => {
                manager['sno'] = i;
                i++;
            });
        }
    });
}

deleteManagers(id) {
    this.managersService.deleteManager(id).subscribe(data => {
        if (data) {
            this.getManagers();
        }
    })
}

editManagers(manager) {
    console.log('id', manager);
    this.dialogRef = this._matDialog.open(ManagersCreateComponent, {
        panelClass: 'contact-form-dialog',
        data: {action: 'EDIT', manager: manager},
    });
    this.dialogRef.afterClosed().subscribe((response: FormGroup) => {
        if (!response) {
            return;
        }
        this.getManagers();
    });
}

}
