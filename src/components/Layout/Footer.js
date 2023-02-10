import React from "react";
import "./styles/Footer.css";
import useWindowSize from "../../customHooks/useWindowSize";

const Footer = () => {
  const size = useWindowSize();
  return (
    <footer>
      <p>
        height: {size.height} width: {size.width}
      </p>
    </footer>
  );
};

export default Footer;
