import Navbar from "./navbar";
import Footer from "./footer";
import Router from "./router";

export default function Layout() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="mbe-20">
        <Navbar />
      </header>
      <main className="flex-1">
        <Router />
      </main>
      <Footer />
    </div>
  );
}
