import { Link } from 'react-router-dom';
import { AppRoute } from '../../consts';

type CatalogPaginationProps = {
  pageNumber: number;
  paginationItems: number[] | undefined;
  isPreviousButtonVisible: boolean | undefined;
  isNextButtonVisible: boolean | undefined;
  onPageNumberClick: (evt: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => void;
  onNextButtonClick: (evt: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => void;
  onPreviousButtonClick: (evt: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => void;
}
function CatalogPagination({pageNumber, paginationItems, isPreviousButtonVisible, isNextButtonVisible, onPageNumberClick, onNextButtonClick, onPreviousButtonClick}: CatalogPaginationProps): JSX.Element {

  return (
    <div className="pagination" data-testid="pagination">
      {
        paginationItems &&
        <ul className="pagination__list">
          {isPreviousButtonVisible && (
            <li className="pagination__item">
              <Link className="pagination__link pagination__link--text" to={AppRoute.Main} onClick={onPreviousButtonClick}>
          Назад
              </Link>
            </li>
          )}
          {paginationItems.map((paginationItem) => (
            <li className="pagination__item" key={paginationItem}>
              <Link className={`pagination__link ${paginationItem === pageNumber ? 'pagination__link--active' : ''}`} to={AppRoute.Main} data-id={paginationItem} onClick={onPageNumberClick}>
                {paginationItem}
              </Link>
            </li>
          ))}
          {isNextButtonVisible && (
            <li className="pagination__item">
              <Link className="pagination__link pagination__link--text" to={AppRoute.Main} onClick={onNextButtonClick}>
        Далее
              </Link>
            </li>
          )}
        </ul>
      }
    </div>
  );
}

export default CatalogPagination;
