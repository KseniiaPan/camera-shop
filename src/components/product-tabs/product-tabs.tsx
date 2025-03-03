import {useState, SetStateAction} from 'react';
import {useAppSelector} from '../../hooks/index';
import {getDetailedProductData} from '../../store/product-process/selectors';
import {TabOption} from '../../consts';

function ProductTabs(): JSX.Element {
  const currentProduct = useAppSelector(getDetailedProductData);

  const [activeTab, setActiveTab] = useState(TabOption.Characteristics);

  const handleActiveTabChange = (chosenOption: SetStateAction<TabOption>) => {
    setActiveTab(chosenOption);
  };

  const getActiveClass = (chosenOption: SetStateAction<TabOption>) =>
    activeTab === chosenOption ? 'is-active' : '';

  return (
    <div className="tabs product__tabs">
      <div className="tabs__controls product__tabs-controls">
        <button
          className={`tabs__control ${getActiveClass(TabOption.Characteristics)}`}
          type="button"
          onClick={() => handleActiveTabChange(TabOption.Characteristics)}
        >
          Характеристики
        </button>
        <button
          className={`tabs__control ${getActiveClass(TabOption.Description)}`}
          type="button"
          onClick={() => handleActiveTabChange(TabOption.Description)}
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
