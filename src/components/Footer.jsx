import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import zyxLogo from "/zyx-logo.png";

gsap.registerPlugin(ScrollTrigger);

const Footer = () => {
  useGSAP(() => {
    // Fade up footer on scroll into view
    gsap.fromTo(
      ".footer-content",
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        scrollTrigger: {
          trigger: ".footer-content",
          start: "top 90%",
          toggleActions: "play none none reverse",
        },
      }
    );
  }, []);

  return (
    <footer className="bg-[#171516] border-t border-[#70C4B1]/20">
      <div className="footer-content container mx-auto px-4 py-8">
        <div className="flex flex-col lg:justify-center lg:items-center space-y-4 lg:space-y-0">
          {/* Left content - Contact info */}
          <div className="text-center lg:text-left">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-center lg:justify-start space-y-2 sm:space-y-0 sm:space-x-6 text-white/80 font-cabin">
              <div className="flex items-center justify-center lg:justify-start space-x-2">
                <span>📍</span>
                <span>Buenos Aires, AR</span>
              </div>
              <div className="flex items-center justify-center lg:justify-start space-x-2">
                <span>✉️</span>
                <a
                  href="mailto:contacto@zyxfit.com"
                  className="hover:text-[#70C4B1] transition-colors duration-200"
                >
                  contacto@zyxfit.com
                </a>
              </div>
              <div className="flex items-center justify-center lg:justify-start space-x-2">
                <span>📞</span>
                <a
                  href="https://wa.me/541151533922?text=Hola, quiero saber más sobre los programas de entrenamiento"
                  className="hover:text-[#70C4B1] transition-colors duration-200"
                >
                  +54 11 5153 3922
                </a>
              </div>
            </div>
          </div>

          {/* Right content - Logo */}
          <div className="flex justify-center lg:justify-end">
            <div className="flex items-center space-x-3">
              <img
                src={zyxLogo}
                alt="ZYX Logo"
                className="h-24 w-auto opacity-80 hover:opacity-100 transition-opacity duration-200"
              />
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-6 pt-6 border-t border-gray-800 text-center text-sm text-white/50 font-cabin">
          <p>
            &copy; {new Date().getFullYear()} ZYX. Todos los derechos
            reservados.
          </p>
        </div>
      </div>
      {/* Developer credit */}
      <div className="mt-4 text-sm text-white/60 text-center lg:text-center font-cabin flex flex-col justify-center items-center">
        Landing Page desarrollada y diseñada por{" "}
        <span className="text-[#70C4B1] ">Jabid Jimenez</span>
      </div>
    </footer>
  );
};

export default Footer;
