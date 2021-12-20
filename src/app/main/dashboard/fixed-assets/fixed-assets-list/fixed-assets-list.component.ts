import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {fuseAnimations} from '../../../../../@fuse/animations';
import {FxaCategoriesService} from '../../../../shared/services/fxa-categories.service';

@Component({
    selector: 'app-fixed-assets-list',
    templateUrl: './fixed-assets-list.component.html',
    styleUrls: ['./fixed-assets-list.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class FixedAssetsListComponent implements OnInit {
    fixedAssets = [];
    pagination = {
        page: 1,
        total: null,
        perpage: 15,
        pages: null
    };

    constructor(private fxaCategoryService: FxaCategoriesService,) {
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

}
