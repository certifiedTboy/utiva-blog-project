import React from "react";
import Banner from "../layouts/banner/Banner";
import wysiwyg from "../../Assets/wysiwyg.jpg";
import code from "../../Assets/code.jpg";

const Hints = () => {
  return (
    <>
      <Banner />
      <div className="container">
        <div className="col-2"></div>
        <div className="col-10">
          <div className="row">
            <div className="col-4">
              <h3>Introduction</h3>{" "}
              <h3 style={{ marginTop: "720px" }}>Creating a blog</h3>
              <h3 style={{ marginTop: "790px" }}>Editting a blog</h3>
            </div>
            <div className="col-8">
              <div>
                <p>
                  For starting purpose, webdev blog relies heavily on WYSIWYG
                  npm package for post builder unlike other blog services. This
                  is pending till we develop a proper post builder that suits
                  our satisfaction
                </p>

                <p>
                  WYSIWYG comes with a host of functionalities that currently
                  serves the primary purpose this blog service was created, but
                  it comes with some level of bottle-necks that might sometimes
                  be annoying to a new user that is not familiar with it.
                </p>
                <img src={wysiwyg} alt="wysiwyg_image" />

                <p className="mt-2">
                  The image above is the display of the post builder (wysiwyg
                  package). It comes with different functions displayed as icons
                  above. The drop down arrows beside some icons signifies other
                  functions in the drop down
                </p>
                <p className="mt-2">
                  The top level icons listed are Bold, HTML Element Type,
                  Font-size, Font, Bullet, Text Alignment, Color picker,
                  Hyperlink, Embedded (Which can be used to add the priview of a
                  web page by just providing the link), Emoji, Image, Erase and
                  Undo
                </p>
              </div>

              <div>
                <p>
                  One of the things that makes webdev blog unique is the ability
                  to insert code snippet directly in our article, which is the
                  reason wysiwyg was integrated as our post builder.
                </p>
                <p>
                  Creating a blog is not a big deal, where issues becomes
                  imminent is wanting to insert a code snippet in our article
                </p>
                <p>
                  To insert a code snippet, always select the CODE option from
                  the block type drop down menu, which is the next option after
                  the bold icon
                </p>
                <img src={code} alt="code_image" />

                <p>
                  Avoid typing your code directly in the post builder, you can
                  copy codes directly from your IDE and paste within the CODE
                  highlighter{" "}
                </p>
                <p>
                  Remove all forms of text styling (bold, italics and irregular
                  fonts) from codes to ensure it displays
                </p>
                <p>
                  Always set font-size of codes to a minimumof 14 and a maximum
                  of 16
                </p>
                <p>
                  Use the preview button to see how codes display before
                  publishing your blog
                </p>
              </div>
              <div>
                <p>
                  One might often have issues of code snippet not displaying
                  when articles are editted, to correct this
                </p>
                <p>check if code snippet is bold. If bold, unbold</p>
                <p>Reset font size to 14 even when it appear it is 14</p>
                <p>
                  Check irregular fonts and set it to normal, also check if code
                  snippet is italize and remove it
                </p>
                <p>
                  Preview article to ensure to displays before updating blog
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      ;
    </>
  );
};

export default Hints;
