import Hero from "./components/Hero";
import Menu from "./components/Menu";
import Navbar from "./components/Navbar";
import About from "./components/About";
import Contact from "./components/Contact"
import Comments from "./components/Comments";
import Footer from "./components/Footer";

function App() {
  return (
    
    <div className="min-h-screen bg-brand-cream">
      <Navbar />
      <section id="hero"><Hero /></section>
      <section id="menu"><Menu /></section>
      <section id="about">
        <About /><Comments />
      </section>
      <section id="contact"><Contact /><Footer /></section>
    </div>
  );
}

export default App;
