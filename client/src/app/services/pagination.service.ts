import {Injectable} from '@angular/core';

@Injectable()

export class PaginationService {
    getPagination(totalItems: number, currentPage: number = 1, amount: number = 10) {
        // calculate total pages
        let totalPages = Math.ceil(totalItems / amount);

        let startPage: number, endPage: number;
        if (totalPages <= 9) {
            // less than 9 total pages so show all
            startPage = 1;
            endPage = totalPages;
        } else {
            // more than 9 total pages so calculate start and end pages
            if (currentPage <= 5) {
                startPage = 1;
                endPage = 9;
            } else if (currentPage + 3 >= totalPages) {
                startPage = totalPages - 8;
                endPage = totalPages;
            } else {
                startPage = currentPage - 4;
                endPage = currentPage + 4;
            }
        }

        // calculate start and end item indexes
        let startIndex = (currentPage - 1) * amount;
        let endIndex = currentPage * amount;

        // create an array of pages to ng-repeat in the pagination control
        let pages = new Array(endPage - startPage + 1);

        for (let i = startPage; i <= endPage; i++) {
            pages[i - startPage] = i;
        }

        // return object with all pagination properties required by the view
        return {
            totalItems: totalItems,
            currentPage: currentPage,
            amount: amount,
            totalPages: totalPages,
            startPage: startPage,
            endPage: endPage,
            startIndex: startIndex,
            endIndex: endIndex,
            pages: pages
        };
    }
}