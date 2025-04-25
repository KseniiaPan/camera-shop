import { useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';
import { ProductSorting } from '../types/sorting-types';


export function useProductSorting() {

  const [searchParams, setSearchParams] = useSearchParams();

  const sort = searchParams.get('sort') as ProductSorting['sort'];
  const direction = searchParams.get('direction') as ProductSorting['direction'];

  const setSorting = useCallback(
    (sorting: ProductSorting) => {
      setSearchParams((params) => {
        if (sorting.sort !== undefined) {
          params.set('sort', sorting.sort);
        }

        if (sorting.direction !== undefined) {
          params.set('direction', sorting.direction);
        }
        return params;
      });
    },
    [setSearchParams]
  );

  return {
    sort,
    direction,
    setSorting
  };
}
