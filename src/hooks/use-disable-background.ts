import { useEffect } from 'react';
const useDisableBackground = (isModalOpen: boolean) => {
  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isModalOpen]);
};

export default useDisableBackground;
