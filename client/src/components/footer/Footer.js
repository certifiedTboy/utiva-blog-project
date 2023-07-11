import React from "react";
import "./footer.css";

const Footer = () => {
  return (
    <div className="footer" style={{ paddingTop: "10px" }}>
      <div className="container copyright">
        <p>WebDev Blog</p>
        <div className="footer-social">
          <a
            href="https://twitter.com/Certified_Tboy1"
            target="_blank"
            rel="noreferrer">
            <i className="fab fa-twitter"></i>
          </a>

          <a
            href="https://web.facebook.com/infiniteIdeas12"
            target="_blank"
            rel="noreferrer">
            <i className="fab fa-facebook"></i>
          </a>
          <a
            href="https://web.facebook.com/infiniteIdeas12"
            target="_blank"
            rel="noreferrer">
            <i className="fab fa-facebook-messenger"></i>
          </a>
          <a
            href="https://linkedin.com/in/emmanuel-tosin-817257149"
            target="_blank"
            rel="noreferrer">
            <i className="fab fa-linkedin-in"></i>
          </a>
          <a
            href="https://wa.me/+2347018810562"
            target="_blank"
            rel="noreferrer">
            <i className="fab fa-whatsapp"></i>
          </a>
        </div>
      </div>
    </div>
  );
};

export default Footer;
