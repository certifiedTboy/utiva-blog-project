import React from "react";
import "./About.css";
const Team = () => {
  return (
    <div className="mt-150">
      <div className="container">
        <div className="row">
          <div className="col-lg-8 offset-lg-2 text-center">
            <div className="section-title">
              <h3>
                Our <span className="orange-text">Team</span>
              </h3>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-lg-4 col-md-6"></div>
          <div className="col-lg-4 col-md-6">
            <div className="single-team-item">
              <div className="team-bg team-bg-2"></div>
              <h4>
                Adebisi Tosin <span>MERN stack Developer</span>
              </h4>
              <ul className="social-link-team">
                <li>
                  <a
                    href="https://web.facebook.com/infiniteIdeas12"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <i className="fab fa-facebook-f"></i>
                  </a>
                </li>

                <li>
                  <a
                    href="https://www.tiktok.com/@certifiedtboy"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <i class="fa-brands fa-tiktok"></i>
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="col-lg-4 col-md-6 offset-md-3 offset-lg-0"></div>
        </div>
      </div>
    </div>
  );
};

export default Team;
