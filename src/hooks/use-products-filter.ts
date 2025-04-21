import { useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';

import { ProductFilters } from '../types/filter-types';
import { FilterSection } from '../consts';

export function useProductFilters() {
  const [searchParams, setSearchParams] = useSearchParams();

  const category = searchParams.get('category') as ProductFilters['category'];
  const types = searchParams.getAll('type') as ProductFilters['type'][];
  const levels = searchParams.getAll('level') as ProductFilters['level'][];
  const minPrice = searchParams.get('minPrice')
    ? (searchParams.get('minPrice') as string)
    : '';
  const maxPrice = searchParams.get('maxPrice')
    ? (searchParams.get('maxPrice') as string)
    : '';

  const setFilters = useCallback(
    (filters: ProductFilters) => {
      setSearchParams((params) => {
        if (filters.category !== undefined) {
          params.set('category', filters.category);
        }

        if (filters.type !== undefined) {
          const isTypeIncluded = types.includes(filters.type);
          if (isTypeIncluded) {
            params.delete('type', filters.type);
          } else {
            params.append('type', filters.type);
          }
        }

        if (filters.level !== undefined) {
          const isLevelIncluded = levels.includes(filters.level);

          if (isLevelIncluded) {
            params.delete('level', filters.level);
          } else {
            params.append('level', filters.level);
          }
        }

        if (filters.minPrice !== undefined) {
          if (minPrice !== undefined) {
            params.delete('minPrice');
          }
          params.set('minPrice', filters.minPrice.toString());
        }

        if (filters.maxPrice !== undefined) {
          params.set('maxPrice', filters.maxPrice.toString());
        }

        return params;
      });
    },
    [setSearchParams, levels, types, minPrice]
  );

  const removeMinPriceFilters = useCallback(() => {
    setSearchParams((params) => {
      params.delete('minPrice');
      return params;
    });
  }, [setSearchParams]);

  const removeMaxPriceFilters = useCallback(() => {
    setSearchParams((params) => {
      params.delete('maxPrice');
      return params;
    });
  }, [setSearchParams]);

  const removeNonValidFilters = useCallback(() => {
    setSearchParams((params) => {
      const activeNonValidTypes = searchParams
        .getAll('type')
        .filter(
          (type) =>
            type === FilterSection.Type.film ||
            type === FilterSection.Type.snapshot
        );
      activeNonValidTypes.map((nonValidType) =>
        params.delete('type', nonValidType)
      );
      return params;
    });
  }, [searchParams, setSearchParams]);
  const removeFilters = useCallback(() => {
    setSearchParams((params) => {
      params.delete('category');
      params.delete('type');
      params.delete('level');
      params.delete('minPrice');
      params.delete('maxPrice');

      return params;
    });
  }, [setSearchParams]);

  return {
    category,
    types,
    levels,
    minPrice,
    maxPrice,
    setFilters,
    removeFilters,
    removeNonValidFilters,
    removeMinPriceFilters,
    removeMaxPriceFilters,
  };
}
