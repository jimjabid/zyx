import { useEffect, useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Import gallery images
import gallery1 from "/gallery-1.png";
import gallery2 from "/gallery-2.png";
import gallery3 from "/gallery-3.png";
import gallery4 from "/gallery-4.png";

gsap.registerPlugin(ScrollTrigger);

const AboutUs = () => {
  const containerRef = useRef(null);
  const mediaRef = useRef(null);
  const [currentStep, setCurrentStep] = useState(0);

  // Debug currentStep changes
  useEffect(() => {
    console.log(
      "Current step changed to:",
      currentStep,
      "Image:",
      images[currentStep]
    );
  }, [currentStep]);
  const [isMobile, setIsMobile] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  // Check for reduced motion preference
  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mediaQuery.matches);

    const handleChange = (e) => setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener("change", handleChange);

    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  // Check if mobile
  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth < 1024;
      setIsMobile(mobile);
      console.log("Mobile check:", mobile, "Width:", window.innerWidth);

      // If switching to mobile, immediately cleanup all ScrollTriggers
      if (mobile) {
        ScrollTrigger.getAll().forEach((trigger) => {
          if (
            trigger.vars.pin === ".media-panel" ||
            trigger.vars.trigger === containerRef.current
          ) {
            trigger.kill();
          }
        });
      }
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Mobile auto-cycle effect
  useEffect(() => {
    console.log("Mobile auto-cycle effect:", {
      isMobile,
      prefersReducedMotion,
    });
    if (isMobile && !prefersReducedMotion) {
      console.log("Starting mobile auto-cycle");
      // Start cycling immediately
      const interval = setInterval(() => {
        setCurrentStep((prev) => {
          const next = (prev + 1) % 4;
          console.log("Auto-cycling to step:", next);
          return next;
        });
      }, 3500);

      return () => clearInterval(interval);
    }
  }, [isMobile, prefersReducedMotion]);

  const steps = [
    {
      title: "El comienzo",
      description:
        "Zyx nació de una charla entre dos amigos que, desde hace mucho tiempo, soñaban con trabajar juntos para promover el bienestar de las personas.",
    },
    {
      title: "De idea a proyecto",
      description:
        "De esa idea surgió este proyecto: un espacio pensado no solo para entrenar, sino también para disfrutar, divertirse y compartir buenos momentos en comunidad.",
    },
    {
      title: "Más que un gimnasio",
      description:
        "Zyx es mucho más que un gimnasio. Es un lugar donde cada logro se celebra y cada esfuerzo tiene valor.",
    },
    {
      title: "Acompañarte paso a paso",
      description:
        "Estamos para acompañarte paso a paso en tu camino, ayudándote a alcanzar tus metas mientras entrenás junto a personas que, como vos, buscan crecer y superarse día a día.",
    },
  ];
  const images = [gallery1, gallery2, gallery3, gallery4];

  useGSAP(
    () => {
      if (prefersReducedMotion) return;

      const container = containerRef.current;
      const media = mediaRef.current;

      if (!container || !media) return;

      // Clean up any existing ScrollTriggers
      ScrollTrigger.getAll().forEach((trigger) => {
        if (trigger.vars.pin === ".media-panel") {
          trigger.kill();
        }
      });

      // Desktop scrollytelling setup
      if (!isMobile) {
        // Pin the right column
        ScrollTrigger.create({
          trigger: container,
          start: "top top",
          end: "bottom bottom",
          pin: ".media-panel",
          pinSpacing: false,
          //markers: true,
        });

        // Create step animations
        steps.forEach((_, index) => {
          const stepElement = container.querySelector(`[data-step="${index}"]`);
          if (!stepElement) return;

          // Fade in animation for each step
          ScrollTrigger.create({
            trigger: stepElement,
            start: "top 70%",
            end: "bottom 30%",
            //markers: true,
            pinSpacing: false,
            onEnter: () => {
              setCurrentStep(index);
              gsap.to(stepElement, {
                opacity: 1,
                y: 0,
                duration: 0.6,
                ease: "power2.out",
              });
            },
            onLeave: () => {
              gsap.to(stepElement, {
                opacity: 0.3,
                y: 20,
                duration: 0.3,
                ease: "power2.out",
              });
            },
            onEnterBack: () => {
              setCurrentStep(index);
              gsap.to(stepElement, {
                opacity: 1,
                y: 0,
                duration: 0.6,
                ease: "power2.out",
              });
            },
            onLeaveBack: () => {
              gsap.to(stepElement, {
                opacity: 0.3,
                y: 20,
                duration: 0.3,
                ease: "power2.out",
              });
            },
          });
        });
      }

      // Initial state for steps (desktop only)
      if (!isMobile) {
        gsap.set("[data-step]", {
          opacity: 0.3,
          y: 20,
        });

        // Show first step
        gsap.set("[data-step='0']", {
          opacity: 1,
          y: 0,
        });
      }
    },
    { dependencies: [isMobile, prefersReducedMotion] }
  );

  // Cleanup ScrollTriggers on unmount or mobile switch
  useEffect(() => {
    return () => {
      // Kill all ScrollTriggers when component unmounts or mobile state changes
      ScrollTrigger.getAll().forEach((trigger) => {
        if (
          trigger.vars.pin === ".media-panel" ||
          trigger.vars.trigger === containerRef.current
        ) {
          trigger.kill();
        }
      });
    };
  }, [isMobile]);

  // Image crossfade effect
  useEffect(() => {
    if (prefersReducedMotion) return;

    const media = mediaRef.current;
    if (!media) return;

    gsap.to(media, {
      opacity: 0,
      duration: 0.3,
      ease: "power2.out",
      onComplete: () => {
        gsap.to(media, {
          opacity: 1,
          duration: 0.6,
          ease: "power2.out",
        });
      },
    });
  }, [currentStep, prefersReducedMotion]);

  return (
    <section id="about" className="py-16 px-6 bg-[#171516] lg:min-h-screen">
      <div className="max-w-7xl mx-auto" ref={containerRef}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Left Column - Scrolling Steps */}
          <div className="space-y-8 lg:space-y-24 order-1 lg:order-none">
            <h2 className="text-4xl lg:text-5xl font-bold text-white mb-8 lg:sticky lg:top-8 z-10 bg-[#171516] py-4">
              Acerca de ZYX
            </h2>

            {steps.map((step, index) => (
              <div key={index} data-step={index} className="step-content">
                <h3 className="text-2xl lg:text-3xl font-bold text-white mb-4">
                  {step.title}
                </h3>
                <p className="text-gray-300 text-lg leading-relaxed">
                  {step.description}
                </p>
              </div>
            ))}
          </div>

          {/* Right Column - Pinned Media Panel */}
          <div className="lg:sticky lg:top-8 media-panel order-2 lg:order-none">
            <div className="relative aspect-[4/3] rounded-lg overflow-hidden shadow-2xl">
              <img
                ref={mediaRef}
                src={images[currentStep] || images[0]}
                alt={`ZYX Gimnasio - ${
                  steps[currentStep]?.title || steps[0]?.title
                }`}
                className="w-full h-full object-cover transition-opacity duration-300"
                onError={(e) => {
                  console.error("Image failed to load:", e.target.src);
                  e.target.src = images[0]; // Fallback to first image
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-purple-500/20 to-transparent"></div>

              {/* Step indicator for mobile */}
              {isMobile && (
                <div className="absolute bottom-4 left-4 right-4">
                  <div className="flex justify-center space-x-2">
                    {steps.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentStep(index)}
                        className={`w-3 h-3 rounded-full transition-all duration-300 ${
                          index === currentStep
                            ? "bg-white scale-125"
                            : "bg-white/50 hover:bg-white/75"
                        }`}
                        aria-label={`Go to step ${index + 1}`}
                      />
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
