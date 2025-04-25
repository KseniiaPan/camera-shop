import { useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';
import { ProductsCatalogPagination } from '../types/pagination-types';

export function useCatalogPagination() {

  const [searchParams, setSearchParams] = useSearchParams();


  const page = searchParams.get('page') as ProductsCatalogPagination['page'];

  const setPagination = useCallback(
    (pagination: ProductsCatalogPagination) => {
      setSearchParams((params) => {
        if (pagination.page !== undefined) {
          params.set('page', pagination.page);
        }

        return params;
      });
    },
    [setSearchParams]
  );

  return {page, setPagination};
}
