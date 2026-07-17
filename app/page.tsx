import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import About from "@/components/About";
import Process from "@/components/Process";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import WhatsappFloat from "@/components/WhatsappFloat";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Services />
        <Process />
        <About />
        <Contact />
      </main>
      <Footer />
      <WhatsappFloat />
    </>
  );
}
