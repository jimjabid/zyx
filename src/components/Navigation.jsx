import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { useState, useRef } from "react";
import zyxLogo from "/zyx-logo.png";

gsap.registerPlugin(ScrollTrigger);

const Navigation = () => {
  const navRef = useRef(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { name: "Inicio", href: "#hero" },

    { name: "Entrenamiento", href: "#training" },
    { name: "Acerca de Zyx", href: "#about" },
    { name: "FAQ", href: "#faq" },
    { name: "Contacto", href: "#footer" },
  ];

  useGSAP(() => {
    // Change navigation background on scroll
    gsap.to(navRef.current, {
      backgroundColor: "#171516",
      duration: 0.3,
      ease: "power2.out",
      scrollTrigger: {
        trigger: "body",
        start: "50px top",
        end: "60px top",
        toggleActions: "play none none reverse",
      },
    });

    // Animate navigation items on page load
    gsap.fromTo(
      ".nav-item",
      { opacity: 0, y: -20 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.1,
        delay: 0.2,
      }
    );

    // Animate logo on page load
    gsap.fromTo(
      ".nav-logo",
      { opacity: 0, x: -30 },
      {
        opacity: 1,
        x: 0,
        duration: 0.8,
        delay: 0.1,
      }
    );

    // Animate CTA button on page load
    gsap.fromTo(
      ".nav-cta",
      { opacity: 0, x: -30 },
      {
        opacity: 1,
        x: 0,
        duration: 0.8,
        delay: 0.3,
      }
    );
  }, []);

  const scrollToSection = (href) => {
    const element = document.querySelector(href);
    if (element) {
      const offsetTop = element.offsetTop - 80; // Account for fixed header
      window.scrollTo({
        top: offsetTop,
        behavior: "smooth",
      });
    }
    setIsMenuOpen(false);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleCtaClick = () => {
    window.open(
      "https://wa.me/5491173728608?text=Hola, quiero saber más sobre los programas de entrenamiento",
      "_blank"
    );
  };

  return (
    <nav
      ref={navRef}
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-transparent backdrop-blur-sm"
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center h-16 md:h-20">
          {/* Left Zone - CTA Button */}
          <div className="flex-1 flex justify-start">
            <button
              onClick={handleCtaClick}
              className="nav-cta hidden md:block px-4 py-2 border-2 border-[#70C4B1] text-[#70C4B1] hover:bg-[#70C4B1] hover:text-white transition-all duration-300 font-cabin font-medium text-sm rounded-full"
            >
              Probá una clase
            </button>
          </div>

          {/* Center Zone - Logo */}
          <div className="flex justify-center">
            <div
              className="nav-logo flex items-center space-x-3 cursor-pointer"
              onClick={() => scrollToSection("#hero")}
            >
              <img
                src={zyxLogo}
                alt="ZYX Logo"
                className="h-24 w-auto md:h-40"
              />
            </div>
          </div>

          {/* Right Zone - Desktop Navigation or Mobile Menu Button */}
          <div className="flex-1 flex justify-end">
            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              {navItems.map((item, index) => (
                <button
                  key={index}
                  onClick={() => scrollToSection(item.href)}
                  className="nav-item text-white hover:text-[#70C4B1] transition-colors duration-300 font-cabin font-medium text-lg relative group"
                >
                  {item.name}
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#70C4B1] transition-all duration-300 group-hover:w-full"></span>
                </button>
              ))}
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden text-white hover:text-[#70C4B1] transition-colors duration-300 p-2"
              onClick={toggleMenu}
              aria-label="Toggle menu"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                {isMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div
          className={`md:hidden transition-all duration-300 ease-in-out ${
            isMenuOpen ? "max-h-80 opacity-100" : "max-h-0 opacity-0"
          } overflow-hidden`}
        >
          <div className="py-4 space-y-4 border-t border-gray-700">
            {/* Remove the mobile CTA button from here */}
            {navItems.map((item, index) => (
              <button
                key={index}
                onClick={() => scrollToSection(item.href)}
                className="block w-full text-left text-white hover:text-[#70C4B1] transition-colors duration-300 font-cabin font-medium text-lg py-2"
              >
                {item.name}
              </button>
            ))}
          </div>
        </div>
      </div>{" "}
      {/* Mobile CTA Banner - Full width below navbar */}
      <div className="block md:hidden bg-transparent">
        <div className="container mx-auto px-4 py-3">
          <button
            onClick={handleCtaClick}
            className="w-full block px-6 py-3 bg-[#70C4B1] text-white hover:bg-[#5fb3a0] transition-all duration-300 font-cabin font-medium text-sm rounded-md"
          >
            Probá una clase
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
