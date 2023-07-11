import React, { useState, useEffect } from "react";
import Layout from "./components/layouts/Layout";
import GeneralRoutes from "./components/Routes/GeneralRoutes";

function App() {
  const [scrollTop, setScrollTop] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollTop(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  return (
    <Layout scrollTop={scrollTop}>
      <GeneralRoutes />
    </Layout>
  );
}

export default App;
