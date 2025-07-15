import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import heroImg from "/hero.png";

const Hero = () => {
  useGSAP(() => {
    // Fade in text and slide up CTA on page load
    gsap.fromTo(
      ".hero-heading",
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 1, delay: 0.3 }
    );
    
    gsap.fromTo(
      ".hero-subheading",
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 1, delay: 0.6 }
    );
    
    gsap.fromTo(
      ".hero-cta",
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 1, delay: 0.9 }
    );
  }, []);

  const handleWhatsAppClick = () => {
    // Replace YOUR_NUMBER with actual WhatsApp number
    window.open("https://wa.me/1234567890", "_blank");
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16 md:pt-20">
      {/* Hero Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroImg})` }}
      />
      
      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/60" />
      
      {/* Hero Content */}
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        <h1 className="hero-heading font-cabin text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
          Entrená con tu propio peso
        </h1>
        
        <h2 className="hero-subheading font-cabin text-xl md:text-2xl lg:text-3xl text-white/90 mb-8 font-light">
          Dominá tu cuerpo conectando con tu mente
        </h2>
        
        <button
          className="hero-cta font-cabin bg-[#70C4B1] hover:bg-[#5fb3a0] text-white text-lg md:text-xl font-semibold px-8 py-4 rounded-full transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-[#70C4B1]/30"
          onClick={handleWhatsAppClick}
          role="link"
          aria-label="Reserva tu clase por WhatsApp"
        >
          Probá una clase
        </button>
      </div>
    </section>
  );
};

export default Hero; 