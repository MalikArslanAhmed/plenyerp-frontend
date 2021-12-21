import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {fuseAnimations} from '../../../../../@fuse/animations';
import {FxaCategoriesService} from '../../../../shared/services/fxa-categories.service';

@Component({
    selector: 'app-category-list',
    templateUrl: './category-list.component.html',
    styleUrls: ['./category-list.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class CategoryListComponent implements OnInit {
    displayedColumns = ['id', 'title'];
    categories = [];
    pagination = {
        page: 1,
        total: null,
        perpage: 15,
        pages: null
    };

    constructor(private fxaCategoryService: FxaCategoriesService) {
    }

    ngOnInit(): void {
        this.getCategories();
    }

    getCategories(): void {
        const param = {
            page: this.pagination.page
        };
        this.fxaCategoryService.getCategories(param).subscribe(
            data => {
                this.categories = data.items;
                this.pagination.page = data.page;
                this.pagination.total = data.total;
            }
        );
    }

    onPageChange(page): void {
        this.pagination.page = page.pageIndex + 1;
        this.getCategories();
    }


}
