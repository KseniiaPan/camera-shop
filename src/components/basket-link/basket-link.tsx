function BasketLink(): JSX.Element {
  return (
    <a className="header__basket-link" href="#">
      <svg width={16} height={16} aria-hidden="true">
        <use xlinkHref="#icon-basket" />
      </svg>
    </a>
  );
}

export default BasketLink;
