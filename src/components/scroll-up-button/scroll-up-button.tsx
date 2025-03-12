type ScrollUpButtonProps = {
  onScrollUpButtonClick: () => void;
};
function ScrollUpButton({ onScrollUpButtonClick }: ScrollUpButtonProps): JSX.Element {
  return (
    <button className="up-btn" onClick={onScrollUpButtonClick}>
      <svg width={12} height={18} aria-hidden="true">
        <use xlinkHref="#icon-arrow2" />
      </svg>
    </button>
  );
}

export default ScrollUpButton;
