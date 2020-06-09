import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {fuseAnimations} from "../../../../../@fuse/animations";
import {ManagersService} from "../../../../shared/services/managers.service";
import {ManagersCreateComponent} from "../managers-create/managers-create.component";
import {FormGroup} from "@angular/forms";
import {MatDialog} from "@angular/material/dialog";
import {PageEvent} from '@angular/material/paginator';
import {DeleteListModalComponent} from '../../delete-list-modal/delete-list-modal.component';

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
    pagination = {
        page: 1,
        total: null,
        perpage: 15,
        pages: null
    };
    pageEvent: PageEvent;
  constructor(private managersService: ManagersService,
    private _matDialog: MatDialog) { }

  ngOnInit(): void {
    this.getManagers();
  }

  getManagers() {
      this.managers = [];
    this.managersService.getManagers({page: this.pagination.page}).subscribe(data => {
        this.managers = data.items;

        if (this.managers && this.managers.length > 0) {
            let i = 1;
            this.managers.forEach(manager => {
                manager['sno'] = i;
                i++;
            });
        }
        this.pagination.page = data.page;
        this.pagination.total = data.total;
    });
}
    deleteItemModal(items) {
        this.dialogRef = this._matDialog.open(DeleteListModalComponent, {
            panelClass: 'delete-items-dialog',
            data: {data: items}
        });
        this.dialogRef.afterClosed().subscribe((response: boolean) => {
            if (response) {
                this.deleteManagers(items.id);
            }
        });

    }

deleteManagers(id) {
    this.managersService.deleteManager(id).subscribe(data => {
        if (data) {
            this.getManagers();
        }
    });
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
    onPageChange(page) {
        this.pagination.page = page.pageIndex + 1;
        this.getManagers();
    }

}
