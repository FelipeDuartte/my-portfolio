import React from "react";
import "../styles/components/scrollTopFooter.css";
import { useScrollToTop } from "../hooks/useScrollToTop";

function ScrollToTop() {
  useScrollToTop();

  return (
    <a
      href="#"
      id="scrollToTop"
      className="scroll-to-top text-white text-center"
    >
      &#8679;
    </a>
  );
}

export default ScrollToTop;
