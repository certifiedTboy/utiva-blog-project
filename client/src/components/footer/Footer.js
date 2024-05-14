import React from "react";
import "./footer.css";

const Footer = () => {
  return (
    <div className="footer" style={{ paddingTop: "10px" }}>
      <div className="container copyright">
        <p>WebDev Blog</p>
        <div className="footer-social">
          <a
            href="https://www.tiktok.com/@certifiedtboy"
            target="_blank"
            rel="noreferrer"
          >
            <i class="fa-brands fa-tiktok"></i>
          </a>
          <a
            href="https://linkedin.com/in/emmanuel-tosin-817257149"
            target="_blank"
            rel="noreferrer"
          >
            <i className="fab fa-linkedin-in"></i>
          </a>
          <a
            href="https://wa.me/+2348135359082"
            target="_blank"
            rel="noreferrer"
          >
            <i className="fab fa-whatsapp"></i>
          </a>
        </div>
      </div>
    </div>
  );
};

export default Footer;
