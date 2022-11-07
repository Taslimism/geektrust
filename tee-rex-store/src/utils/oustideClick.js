import { useEffect } from 'react';

const useClickOutside = (ref, eventHandler) => {
  useEffect(() => {
    const listener = event => {
      if (ref.current && ref.current.contains(event.target)) {
        return;
      }
      eventHandler();
    };

    document.addEventListener('mousedown', listener);
    document.addEventListener('touchstart', listener);

    () => {
      document.removeEventListener('mousedown', listener);
      document.removeEventListener('touchstart', listener);
    };
  }, [ref, eventHandler]);
};

export default useClickOutside;
