import React, { useState, useEffect } from 'react';
import Icons from "../../assets/icons/icons"
import './Scroll.css'; // Apply your button's styling here

const ScrollToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  const handleScroll = () => {
    if (window.scrollY > 400) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <button
      className={`scroll-to-top-button ${isVisible ? 'visible bg-orange' : ''}`}
      onClick={scrollToTop}
    >
      <Icons.ArrowUp size={24}/>
    </button>
  );
};

export default ScrollToTopButton;