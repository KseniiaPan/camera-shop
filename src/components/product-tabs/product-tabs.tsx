import { useEffect, useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useAppSelector } from '../../hooks/index';
import { getCurrentProductData } from '../../store/product-process/selectors';
import { TabOption } from '../../consts';
import { ProductTabOption } from '../../types/product-types';

function ProductTabs(): JSX.Element {
  const currentProduct = useAppSelector(getCurrentProductData);
  const [searchParams, setSearchParams] = useSearchParams();
  const tab = searchParams.get('tab') as ProductTabOption['tab'];


  const setActiveTab = useCallback(
    (activeTab: ProductTabOption) => {
      setSearchParams((params) => {
        if (activeTab.tab !== undefined) {
          params.set('tab', activeTab.tab);
        }
        return params;
      });
    },
    [setSearchParams]
  );

  useEffect(() => {
    if (tab === null) {
      setActiveTab({
        tab: TabOption.Characteristics as ProductTabOption['tab'],
      });
    }
  }, [tab, setActiveTab]);

  const handleActiveTabChange = (evt: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    const { name } = evt.target as HTMLButtonElement;
    setActiveTab({
      tab: name as ProductTabOption['tab'],
    });
  };

  const getActiveClass = (chosenOption: TabOption) =>
    tab === chosenOption ? 'is-active' : '';

  return (
    <div className="tabs product__tabs">
      <div className="tabs__controls product__tabs-controls">
        <button
          className={`tabs__control ${getActiveClass(TabOption.Characteristics)}`}
          type="button"
          name={TabOption.Characteristics}
          onClick={handleActiveTabChange}
        >
          Характеристики
        </button>
        <button
          className={`tabs__control ${getActiveClass(TabOption.Description)}`}
          type="button"
          name={TabOption.Description}
          onClick={handleActiveTabChange}
        >
          Описание
        </button>
      </div>
      <div className="tabs__content">
        <div className={`tabs__element ${getActiveClass(TabOption.Characteristics)}`}>
          <ul className="product__tabs-list">
            <li className="item-list">
              <span className="item-list__title">Артикул:</span>
              <p className="item-list__text"> {currentProduct && currentProduct.vendorCode}</p>
            </li>
            <li className="item-list">
              <span className="item-list__title">Категория:</span>
              <p className="item-list__text">{currentProduct && currentProduct.category}</p>
            </li>
            <li className="item-list">
              <span className="item-list__title">Тип камеры:</span>
              <p className="item-list__text">{currentProduct && currentProduct.type}</p>
            </li>
            <li className="item-list">
              <span className="item-list__title">Уровень:</span>
              <p className="item-list__text">{currentProduct && currentProduct.level}</p>
            </li>
          </ul>
        </div>
        <div className={`tabs__element ${getActiveClass(TabOption.Description)}`}>
          <div className="product__tabs-text">
            <p>
              {currentProduct && currentProduct.description}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductTabs;
