import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {fuseAnimations} from '../../../../@fuse/animations';
import {FxaCategoriesService} from '../../../shared/services/fxa-categories.service';
import {Router} from '@angular/router';
import {DeleteListModalComponent} from '../../dashboard/delete-list-modal/delete-list-modal.component';
import {MatDialog} from '@angular/material/dialog';

@Component({
    selector: 'app-fixed-assets-list',
    templateUrl: './fixed-assets-list.component.html',
    styleUrls: ['./fixed-assets-list.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class FixedAssetsListComponent implements OnInit {
    displayedColumns = ['id', 'title', 'model', 'modelNo', 'dateManufactured', 'dateAcquired', 'actions'];
    fixedAssets = [];
    pagination = {
        page: 1,
        total: null,
        perpage: 15,
        pages: null
    };
    dialogRef: any;

    constructor(private fxaCategoryService: FxaCategoriesService,
                private _matDialog: MatDialog,
                private router: Router) {
    }

    ngOnInit(): void {
        this.getFixedAsset();
    }

    getFixedAsset(): void {
        const param = {
            page: this.pagination.page
        };
        this.fxaCategoryService.get(param).subscribe(
            data => {
                this.fixedAssets = data.items;
                this.pagination.page = data.page;
                this.pagination.total = data.total;
            }
        );
    }

    onPageChange(page): void {
        this.pagination.page = page.pageIndex + 1;
        this.getFixedAsset();
    }

    editFixedAssets(fixedAsset): void {
        this.router.navigateByUrl(`/fixed-assets/` + fixedAsset.id);
    }

    deleteItemModal(fixedAsset): void {
        this.dialogRef = this._matDialog.open(DeleteListModalComponent, {
            panelClass: 'delete-items-dialog',
            data: {data: fixedAsset}
        });
        this.dialogRef.afterClosed().subscribe((response: boolean) => {
            if (response) {
                this.deleteItem(fixedAsset);
            }
        });

    }

    deleteItem(fixedAsset): void {
        this.fxaCategoryService.delete(fixedAsset.id).subscribe(data => {
            this.getFixedAsset();
        });
    }
}
