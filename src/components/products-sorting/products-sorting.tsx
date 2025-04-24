import {SortingSection} from '../../consts';
import { ProductSorting } from '../../types/sorting-types';

type ProductsSortingProps = {
  onSortClick: (evt: React.ChangeEvent<HTMLInputElement>) => void;
  onSortDirectionClick: (evt: React.ChangeEvent<HTMLInputElement>) => void;
  sort: ProductSorting['sort'];
  direction: ProductSorting['direction'];
}

function ProductsSorting({onSortClick, onSortDirectionClick, sort, direction}: ProductsSortingProps): JSX.Element {
  return (
    <div className="catalog-sort">
      <form action="#">
        <div className="catalog-sort__inner">
          <p className="title title--h5">Сортировать:</p>
          <div className="catalog-sort__type">
            <div className="catalog-sort__btn-text">
              <input type="radio" id="sortPrice" value="price" name="sort" checked={SortingSection.Sort.price === sort} onChange={onSortClick}/>
              <label htmlFor="sortPrice">по цене</label>
            </div>
            <div className="catalog-sort__btn-text">
              <input type="radio" id="sortPopular" value="popular" name="sort" checked={SortingSection.Sort.popular === sort} onChange={onSortClick}/>
              <label htmlFor="sortPopular">по популярности</label>
            </div>
          </div>
          <div className="catalog-sort__order">
            <div className="catalog-sort__btn catalog-sort__btn--up">
              <input
                type="radio"
                id="up"
                value="up"
                name="sort-icon"
                checked={SortingSection.Direction.up === direction}
                aria-label="По возрастанию"
                onChange={onSortDirectionClick}
              />
              <label htmlFor="up">
                <svg width={16} height={14} aria-hidden="true">
                  <use xlinkHref="#icon-sort" />
                </svg>
              </label>
            </div>
            <div className="catalog-sort__btn catalog-sort__btn--down">
              <input
                type="radio"
                id="down"
                value="down"
                name="sort-icon"
                checked={SortingSection.Direction.down === direction}
                aria-label="По убыванию"
                onChange={onSortDirectionClick}
              />
              <label htmlFor="down">
                <svg width={16} height={14} aria-hidden="true">
                  <use xlinkHref="#icon-sort" />
                </svg>
              </label>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

export default ProductsSorting;
