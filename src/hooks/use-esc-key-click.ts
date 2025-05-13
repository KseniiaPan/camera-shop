import { useEffect } from 'react';

const useEscKeyClick = (onModalClose: () => void) => {
  useEffect(() => {
    const handleEscKeyClick = (evt: KeyboardEvent) => {
      if (evt.key === 'Escape') {
        onModalClose();
      }
    };

    document.addEventListener('keydown', handleEscKeyClick);

    return () => {
      document.removeEventListener('keydown', handleEscKeyClick);
    };
  }, [onModalClose]);
};

export default useEscKeyClick;
