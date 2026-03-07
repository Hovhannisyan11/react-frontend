import { useState, useEffect } from "react";

function HeaderScroll() {
  const [hide, setHide] = useState(false);

  useEffect(() => {
    let lastScroll = 0;

    const handleScroll = () => {
      const currentScroll = window.pageYOffset;

      if (currentScroll > 200 && currentScroll > lastScroll) {
        setHide(true);
      } else {
        setHide(false); 
      }

      lastScroll = currentScroll;
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return hide;
}

export default HeaderScroll;
