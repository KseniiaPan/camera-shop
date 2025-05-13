import { useEffect, MutableRefObject } from 'react';

const useClickOutside = (
  isModalOpen: boolean,
  modalRef: MutableRefObject<HTMLDivElement | null>,
  onModalClose: () => void
) => {
  useEffect(() => {
    const handleClickOutside = (evt: MouseEvent) => {
      if (!isModalOpen) {
        return;
      }

      if (
        !modalRef?.current ||
        modalRef.current.contains((evt?.target as Node) || null)
      ) {
        return;
      }
      onModalClose();
    };
    document.addEventListener('pointerdown', handleClickOutside);

    return () => {
      document.removeEventListener('pointerdown', handleClickOutside);
    };
  }, [isModalOpen, onModalClose]);
};

export default useClickOutside;
