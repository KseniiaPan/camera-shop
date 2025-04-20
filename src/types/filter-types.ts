export type ProductFilters = {
  category?: 'videocamera' | 'photocamera';
  type?: 'digital' | 'film' | 'snapshot' | 'collection';
  level?: 'zero' | 'non-professional' | 'professional';
  minPrice?: string;
  maxPrice?: string;
};
