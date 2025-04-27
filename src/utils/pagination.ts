import { DISPLAYED_PAGINATION_STEP } from '../consts';

const getVisiblePaginationItems = (allPaginationitems: number[], start: number, end: number, activePage: string) => {
  let i = 0;
  while (i < allPaginationitems.length) {
    const visiblePagination = allPaginationitems.slice(start + i, end + i);
    if (visiblePagination.includes(Number(activePage))) {
      return visiblePagination;
    }
    i = i + DISPLAYED_PAGINATION_STEP;
  }
};

export { getVisiblePaginationItems };
