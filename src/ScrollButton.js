import React, { useState, useEffect } from 'react';

const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  useEffect(() => {
    const toggleVisibility = () => {
      const scrolled = window.scrollY;
      // Показываем кнопку, если прокрутили больше 300px
      setIsVisible(scrolled > 300);
    };

    window.addEventListener('scroll', toggleVisibility);
    // Очистка слушателя при размонтировании
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, );

  return (
    <button
      className={`scroll-to-top \${isVisible ? 'visible' : ''}`}
      onClick={scrollToTop}
      aria-label="Наверх"
    >
      ↑
    </button>
  );
};

export default ScrollToTop;