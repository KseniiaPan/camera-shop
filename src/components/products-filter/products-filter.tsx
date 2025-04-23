import { ProductFilters } from '../../types/filter-types';
import { FilterSection } from '../../consts';

type ProductsFilterProps = {
  onCategoryFilterClick: (evt: React.ChangeEvent<HTMLInputElement>) => void;
  onTypeFilterClick: (evt: React.ChangeEvent<HTMLInputElement>) => void;
  onLevelFilterClick: (evt: React.ChangeEvent<HTMLInputElement>) => void;
  onResetFilterClick: () => void;
  onMinPriceChange: (evt: React.ChangeEvent<HTMLInputElement>) => void;
  onMaxPriceChange: (evt: React.ChangeEvent<HTMLInputElement>) => void;
  category: ProductFilters['category'];
  types: ProductFilters['type'][];
  levels: ProductFilters['level'][];
  currentMinPrice: string;
  currentMaxPrice: string;
  requiredMinPrice: string | undefined;
  requiredMaxPrice: string | undefined;
};

function ProductsFilter({
  onCategoryFilterClick,
  onTypeFilterClick,
  onLevelFilterClick,
  onResetFilterClick,
  onMinPriceChange,
  onMaxPriceChange,
  category,
  types,
  levels,
  currentMinPrice,
  currentMaxPrice,
  requiredMinPrice,
  requiredMaxPrice,
}: ProductsFilterProps): JSX.Element {
  return (
    <div className="catalog-filter">
      <form action="#">
        <h2 className="visually-hidden">Фильтр</h2>
        <fieldset className="catalog-filter__block">
          <legend className="title title--h5">Цена, ₽</legend>
          <div className="catalog-filter__price-range">
            <div className="custom-input">
              <label>
                <input
                  type="number"
                  name="price"
                  defaultValue={requiredMinPrice && requiredMinPrice < currentMinPrice ? currentMinPrice : requiredMinPrice}
                  placeholder={currentMinPrice ? currentMinPrice : 'от'}
                  onBlur={onMinPriceChange}
                />
              </label>
            </div>
            <div className="custom-input">
              <label>
                <input
                  type="number"
                  name="priceUp"
                  defaultValue={requiredMaxPrice ? requiredMaxPrice : ''}
                  placeholder={currentMaxPrice ? currentMaxPrice : 'до'}
                  onBlur={onMaxPriceChange}
                />
              </label>
            </div>
          </div>
        </fieldset>
        <fieldset className="catalog-filter__block">
          <legend className="title title--h5">Категория</legend>
          <div className="custom-radio catalog-filter__item">
            <label>
              <input
                type="radio"
                name="category"
                defaultValue={FilterSection.Category.photocamera}
                defaultChecked={FilterSection.Category.photocamera === category}
                onChange={onCategoryFilterClick}
              />
              <span className="custom-radio__icon" />
              <span className="custom-radio__label">Фотокамера</span>
            </label>
          </div>
          <div className="custom-radio catalog-filter__item">
            <label>
              <input
                type="radio"
                name="category"
                defaultValue={FilterSection.Category.videocamera}
                defaultChecked={FilterSection.Category.videocamera === category}
                onChange={onCategoryFilterClick}
              />
              <span className="custom-radio__icon" />
              <span className="custom-radio__label">Видеокамера</span>
            </label>
          </div>
        </fieldset>
        <fieldset className="catalog-filter__block">
          <legend className="title title--h5">Тип камеры</legend>
          <div className="custom-checkbox catalog-filter__item">
            <label>
              <input
                type="checkbox"
                name="digital"
                value={FilterSection.Type.digital}
                defaultChecked={types.includes(FilterSection.Type.digital)}
                onChange={onTypeFilterClick}
              />
              <span className="custom-checkbox__icon" />
              <span className="custom-checkbox__label">Цифровая</span>
            </label>
          </div>
          <div className="custom-checkbox catalog-filter__item">
            <label>
              <input
                type="checkbox"
                name="film"
                value={FilterSection.Type.film}
                defaultChecked={types.includes(FilterSection.Type.film) && category !== FilterSection.Category.videocamera}
                disabled={category === FilterSection.Category.videocamera}
                onChange={onTypeFilterClick}
              />
              <span className="custom-checkbox__icon" />
              <span className="custom-checkbox__label">Плёночная</span>
            </label>
          </div>
          <div className="custom-checkbox catalog-filter__item">
            <label>
              <input
                type="checkbox"
                name="snapshot"
                value={FilterSection.Type.snapshot}
                defaultChecked={types.includes(FilterSection.Type.snapshot) && category !== FilterSection.Category.videocamera}
                disabled={category === FilterSection.Category.videocamera}
                onChange={onTypeFilterClick}
              />
              <span className="custom-checkbox__icon" />
              <span className="custom-checkbox__label">Моментальная</span>
            </label>
          </div>
          <div className="custom-checkbox catalog-filter__item">
            <label>
              <input
                type="checkbox"
                name="collection"
                value={FilterSection.Type.collection}
                defaultChecked={types.includes(FilterSection.Type.collection)}
                onChange={onTypeFilterClick}
              />
              <span className="custom-checkbox__icon" />
              <span className="custom-checkbox__label">Коллекционная</span>
            </label>
          </div>
        </fieldset>
        <fieldset className="catalog-filter__block">
          <legend className="title title--h5">Уровень</legend>
          <div className="custom-checkbox catalog-filter__item">
            <label>
              <input
                type="checkbox"
                name="zero"
                value={FilterSection.Level.zero}
                defaultChecked={levels.includes(FilterSection.Level.zero)}
                onChange={onLevelFilterClick}
              />
              <span className="custom-checkbox__icon" />
              <span className="custom-checkbox__label">Нулевой</span>
            </label>
          </div>
          <div className="custom-checkbox catalog-filter__item">
            <label>
              <input
                type="checkbox"
                name="non-professional"
                value={FilterSection.Level.nonProfessional}
                defaultChecked={levels.includes(FilterSection.Level.nonProfessional)}
                onChange={onLevelFilterClick}
              />
              <span className="custom-checkbox__icon" />
              <span className="custom-checkbox__label">Любительский</span>
            </label>
          </div>
          <div className="custom-checkbox catalog-filter__item">
            <label>
              <input
                type="checkbox"
                name="professional"
                value={FilterSection.Level.professional}
                defaultChecked={levels.includes(FilterSection.Level.professional)}
                onChange={onLevelFilterClick}
              />
              <span className="custom-checkbox__icon" />
              <span className="custom-checkbox__label">Профессиональный</span>
            </label>
          </div>
        </fieldset>
        <button
          className="btn catalog-filter__reset-btn"
          type="reset"
          onClick={onResetFilterClick}
        >
          Сбросить фильтры
        </button>
      </form>
    </div>
  );
}

export default ProductsFilter;
