import { Link } from 'react-router-dom';
import { AppRoute } from '../../consts';
import { initialPaginationItems } from '../../consts';

type CatalogPaginationProps = {
  pageNumber: number;
  onPageNumberClick: (evt: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => void;
}
function CatalogPagination({pageNumber, onPageNumberClick}: CatalogPaginationProps): JSX.Element {

  return (
    <div className="pagination">
      <ul className="pagination__list">
        {initialPaginationItems.map((paginationItem) => (
          <li className="pagination__item" key={paginationItem}>
            <Link className={`pagination__link ${paginationItem === pageNumber ? 'pagination__link--active' : ''}`} to={AppRoute.Main} data-id={paginationItem} onClick={onPageNumberClick}>
              {paginationItem}
            </Link>
          </li>
        ))}
        <li className="pagination__item">
          <a className="pagination__link pagination__link--text" href={'3'}>
        Далее
          </a>
        </li>
      </ul>
    </div>

  );
}

export default CatalogPagination;
