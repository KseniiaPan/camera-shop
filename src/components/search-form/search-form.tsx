import { useState, useEffect, useRef, ChangeEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import './search-form.css';
import {
  SEARCH_VALUE_MIN_LENGTH,
  RESET_VALUE_MIN_LENGTH,
  AppRoute,
} from '../../consts';
import { useAppSelector } from '../../hooks/index';
import { getProductsData } from '../../store/product-process/selectors';
import { getSearchedProducts } from '../../utils/common';
import { ProductInfo } from '../../types/product-types';
import SearchSelectItem from '../../components/search-select-item/search-select-item';

function SearchForm(): JSX.Element {
  const searchRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  const [isOptionsListOpened, setOptionsListOpened] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [serchedProductsOptions, setSerchedProductsOptions] = useState<
    ProductInfo[]
  >([]);
  const [currentProductIndex, setCurrentProductIndex] = useState(0);

  const allAvailableProducts = useAppSelector(getProductsData);

  const resetSearchForm = () => {
    setOptionsListOpened(false);
    setSearchText('');
    setSerchedProductsOptions([]);
    setCurrentProductIndex(0);
  };

  useEffect(() => {
    const displayedSearchedProducts = getSearchedProducts(
      allAvailableProducts,
      searchText
    );

    if (
      searchText.length >= SEARCH_VALUE_MIN_LENGTH &&
      displayedSearchedProducts.length !== 0
    ) {
      setOptionsListOpened(true);
      setSerchedProductsOptions(displayedSearchedProducts);
    }
    return () => {
      setOptionsListOpened(false);
    };
  }, [searchText, allAvailableProducts]);

  useEffect(() => {
    const hideOptionsList = (evt: MouseEvent) => {
      if (
        evt.target instanceof HTMLElement &&
        searchRef.current &&
        !searchRef.current.contains(evt.target)
      ) {
        resetSearchForm();
      }
    };

    document.addEventListener('click', hideOptionsList);

    return () => {
      document.removeEventListener('click', hideOptionsList);
    };
  }, []);

  const handleSearchValueChange = (
    evt: ChangeEvent<HTMLInputElement>
  ): void => {
    const { value } = evt.target;
    setSearchText(value);
  };

  const handleSearchResetButtonClick = () => {
    resetSearchForm();
  };

  useEffect(() => {
    const handleArrowDownKeyPress = (evt: KeyboardEvent) => {
      if (evt.key === 'ArrowDown') {
        setCurrentProductIndex(
          currentProductIndex === serchedProductsOptions.length - 1
            ? 0
            : currentProductIndex + 1
        );
      }
    };

    document.addEventListener('keydown', handleArrowDownKeyPress);

    return () => {
      document.removeEventListener('keydown', handleArrowDownKeyPress);
    };
  }, [currentProductIndex, serchedProductsOptions.length]);

  useEffect(() => {
    const handleArrowUpKeyPress = (evt: KeyboardEvent) => {
      if (evt.key === 'ArrowUp') {
        setCurrentProductIndex(
          currentProductIndex === 0
            ? serchedProductsOptions.length - 1
            : currentProductIndex - 1
        );
      }
    };

    document.addEventListener('keydown', handleArrowUpKeyPress);

    return () => {
      document.removeEventListener('keydown', handleArrowUpKeyPress);
    };
  }, [currentProductIndex, serchedProductsOptions.length]);

  useEffect(() => {
    const handleEnterKeyPress = (evt: KeyboardEvent) => {
      if (evt.key === 'Enter') {
        if (serchedProductsOptions) {
          const selectedProduct = serchedProductsOptions[currentProductIndex];
          navigate(AppRoute.Product.replace(':id', String(selectedProduct.id)));
          resetSearchForm();
        }
      }
    };
    document.addEventListener('keydown', handleEnterKeyPress);

    return () => {
      document.removeEventListener('keydown', handleEnterKeyPress);
    };
  }, [currentProductIndex, serchedProductsOptions, navigate]);

  useEffect(() => {
    if (isOptionsListOpened) {
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOptionsListOpened]);

  return (
    <div className={`form-search ${isOptionsListOpened ? 'list-opened' : ''}`}>
      <form>
        <label>
          <svg
            className="form-search__icon"
            width={16}
            height={16}
            aria-hidden="true"
          >
            <use xlinkHref="#icon-lens" />
          </svg>
          <input
            className="form-search__input"
            type="text"
            autoComplete="off"
            placeholder="Поиск по сайту"
            ref={searchRef}
            value={searchText}
            onChange={handleSearchValueChange}
          />
        </label>
        {serchedProductsOptions && (
          <ul className="form-search__select-list">
            {serchedProductsOptions.map((product, index) => (
              <SearchSelectItem
                product={product}
                index={index}
                currentFocus={currentProductIndex}
                key={product.id}
              />
            ))}
          </ul>
        )}
      </form>
      <button
        className={`form-search__reset ${
          searchText.length >= RESET_VALUE_MIN_LENGTH ? 'is-active' : ''
        }`}
        type="reset"
        onClick={handleSearchResetButtonClick}
      >
        <svg width={10} height={10} aria-hidden="true">
          <use xlinkHref="#icon-close" />
        </svg>
        <span className="visually-hidden">Сбросить поиск</span>
      </button>
    </div>
  );
}

export default SearchForm;
