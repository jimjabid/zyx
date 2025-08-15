import {
  Navigation,
  Hero,
  TrainingGallery,
  AboutUs,
  FAQ,
  Footer,
} from "../components";

const LandingPage = () => {
  return (
    <main className="bg-[#171516] text-white">
      <Navigation />
      <div id="hero">
        <Hero />
      </div>
      <div id="about">
        <AboutUs />
      </div>
      <div id="training">
        <TrainingGallery />
      </div>
      <div id="faq">
        <FAQ />
      </div>
      <div id="footer">
        <Footer />
      </div>
    </main>
  );
};

export default LandingPage;
