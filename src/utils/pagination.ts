import { DISPLAYED_PAGINATION_STEP, PAGINATION_ITEMS_MIN_COUNT, PAGINATION_ITEMS_MAX_COUNT } from '../consts';

const getVisiblePaginationItems = (allPaginationitems: number[], activePage: string) => {
  let i = 0;
  while (i < allPaginationitems.length) {
    const visiblePagination = allPaginationitems.slice(PAGINATION_ITEMS_MIN_COUNT + i, PAGINATION_ITEMS_MAX_COUNT + i);
    if (visiblePagination.includes(Number(activePage))) {
      return visiblePagination;
    }
    i = i + DISPLAYED_PAGINATION_STEP;
  }
};

export { getVisiblePaginationItems };
