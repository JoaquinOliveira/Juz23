// useBodyClassName.js
import { useEffect } from 'react';

const useBodyClassName = (className) => {
  useEffect(() => {
    document.body.classList.add(className);
    return () => {
      document.body.classList.remove(className);
    };
  }, [className]);
};

export default useBodyClassName;