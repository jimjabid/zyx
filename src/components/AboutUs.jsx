import { useEffect, useRef, useState, useCallback } from "react";
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
  const leftColumnRef = useRef(null);
  const sectionRef = useRef(null);

  // Array of refs for step elements
  const stepRefs = useRef([]);
  const gsapContextRef = useRef(null);
  const autoplayIntervalRef = useRef(null);
  const intersectionObserverRef = useRef(null);

  // Separate state for images (auto-cycling) and steps (scroll-based)
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isImageTransitioning, setIsImageTransitioning] = useState(false);
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const [isSectionVisible, setIsSectionVisible] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

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

  // Index safety for images
  const safeImageIndex = Math.min(
    Math.max(0, currentImageIndex),
    images.length - 1
  );

  // Dev warnings for mismatched arrays
  useEffect(() => {
    if (process.env.NODE_ENV === "development") {
      if (steps.length !== images.length) {
        console.warn(
          `AboutUs: Steps length (${steps.length}) doesn't match images length (${images.length})`
        );
      }
    }
  }, []);

  // Check for reduced motion preference
  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mediaQuery.matches);

    const handleChange = (e) => setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener("change", handleChange);

    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  // Image preloading
  useEffect(() => {
    let loadedCount = 0;
    const totalImages = images.length;

    const handleImageLoad = () => {
      loadedCount++;
      if (loadedCount === totalImages) {
        setImagesLoaded(true);
        // Refresh ScrollTrigger after images are loaded
        setTimeout(() => {
          ScrollTrigger.refresh();
        }, 100);
      }
    };

    // Preload all images
    images.forEach((src) => {
      const img = new Image();
      img.onload = handleImageLoad;
      img.onerror = handleImageLoad; // Count failed loads too
      img.src = src;
    });

    // Also refresh on window load
    const handleWindowLoad = () => {
      setTimeout(() => {
        ScrollTrigger.refresh();
      }, 100);
    };

    window.addEventListener("load", handleWindowLoad);
    return () => window.removeEventListener("load", handleWindowLoad);
  }, []);

  // IntersectionObserver for image autoplay visibility
  useEffect(() => {
    if (!sectionRef.current) return;

    intersectionObserverRef.current = new IntersectionObserver(
      ([entry]) => {
        setIsSectionVisible(entry.isIntersecting);
      },
      { threshold: 0.3 }
    );

    intersectionObserverRef.current.observe(sectionRef.current);

    return () => {
      if (intersectionObserverRef.current) {
        intersectionObserverRef.current.disconnect();
      }
    };
  }, []);

  // Image crossfade effect (independent of steps)
  useEffect(() => {
    const media = mediaRef.current;
    if (!media || !imagesLoaded) return;

    if (prefersReducedMotion) {
      // Instant update for reduced motion
      media.src = images[safeImageIndex];
      return;
    }

    setIsImageTransitioning(true);

    gsap.to(media, {
      opacity: 0,
      duration: 0.3,
      ease: "power2.out",
      onComplete: () => {
        // Change image source after fade-out completes
        media.src = images[safeImageIndex];
        gsap.to(media, {
          opacity: 1,
          duration: 0.6,
          ease: "power2.out",
          onComplete: () => {
            setIsImageTransitioning(false);
          },
        });
      },
    });
  }, [safeImageIndex, prefersReducedMotion, imagesLoaded]);

  // Auto-cycle images when section is visible (independent of steps)
  useEffect(() => {
    if (!isSectionVisible || prefersReducedMotion) {
      if (autoplayIntervalRef.current) {
        clearInterval(autoplayIntervalRef.current);
        autoplayIntervalRef.current = null;
      }
      return;
    }

    // Clear any existing interval
    if (autoplayIntervalRef.current) {
      clearInterval(autoplayIntervalRef.current);
    }

    // Start autoplay interval for images only
    autoplayIntervalRef.current = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % images.length);
    }, 3500);

    return () => {
      if (autoplayIntervalRef.current) {
        clearInterval(autoplayIntervalRef.current);
        autoplayIntervalRef.current = null;
      }
    };
  }, [isSectionVisible, prefersReducedMotion, images.length]);

  // GSAP setup for step animations only (no image sync)
  useGSAP(
    () => {
      if (prefersReducedMotion || !imagesLoaded) return;

      const container = containerRef.current;
      const leftColumn = leftColumnRef.current;
      if (!container || !leftColumn) return;

      // Create GSAP context for cleanup
      gsapContextRef.current = gsap.context(() => {
        // Desktop setup with matchMedia
        gsap.matchMedia().add("(min-width: 1024px)", () => {
          const leftColumnHeight = leftColumn.scrollHeight;
          const mediaHeight = mediaRef.current?.offsetHeight || 600;
          const pinEnd = Math.max(leftColumnHeight - mediaHeight + 200, 500);

          // Pin the media panel
          const pinTrigger = ScrollTrigger.create({
            trigger: container,
            start: "top top",
            end: `+=${pinEnd}`,
            pin: ".media-panel",
            pinSpacing: true,
            anticipatePin: 1,
          });

          // Create ScrollTrigger for each step (no image changes)
          stepRefs.current.forEach((stepRef, index) => {
            if (!stepRef) return;

            ScrollTrigger.create({
              trigger: stepRef,
              start: "top 70%",
              end: "bottom 30%",
              onToggle: (self) => {
                if (self.isActive) {
                  // Only animate step visibility, no image changes
                  gsap.to(stepRef, {
                    opacity: 1,
                    y: 0,
                    duration: 0.6,
                    ease: "power2.out",
                  });
                } else {
                  gsap.to(stepRef, {
                    opacity: 0.3,
                    y: 20,
                    duration: 0.3,
                    ease: "power2.out",
                  });
                }
              },
            });
          });

          // Initial state for steps
          gsap.set(stepRefs.current.filter(Boolean), {
            opacity: 0.3,
            y: 20,
          });

          // Show first step
          if (stepRefs.current[0]) {
            gsap.set(stepRefs.current[0], {
              opacity: 1,
              y: 0,
            });
          }

          return () => {
            pinTrigger.kill();
          };
        });

        // Mobile setup
        gsap.matchMedia().add("(max-width: 1023px)", () => {
          // Reset any desktop animations
          gsap.set(stepRefs.current.filter(Boolean), {
            opacity: 1,
            y: 0,
          });
        });
      }, container);

      return () => {
        if (gsapContextRef.current) {
          gsapContextRef.current.revert();
        }
      };
    },
    { dependencies: [prefersReducedMotion, imagesLoaded] }
  );

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (gsapContextRef.current) {
        gsapContextRef.current.revert();
      }
      if (autoplayIntervalRef.current) {
        clearInterval(autoplayIntervalRef.current);
      }
      if (intersectionObserverRef.current) {
        intersectionObserverRef.current.disconnect();
      }
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="about"
      className="py-16 px-6 bg-[#171516] lg:min-h-screen"
    >
      <div className="max-w-7xl mx-auto" ref={containerRef}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Left Column - Scrolling Steps */}
          <div
            ref={leftColumnRef}
            className="space-y-8 lg:space-y-24 order-1 lg:order-none"
          >
            <h2 className="text-4xl lg:text-5xl font-bold text-white mb-8 lg:sticky lg:top-8 z-10 bg-[#171516] py-4">
              Acerca de ZYX
            </h2>

            {steps.map((step, index) => (
              <div
                key={index}
                ref={(el) => (stepRefs.current[index] = el)}
                className="step-content"
              >
                <h3 className="text-2xl lg:text-3xl font-bold text-white mb-4">
                  {step.title}
                </h3>
                <p className="text-gray-300 text-lg leading-relaxed">
                  {step.description}
                </p>
              </div>
            ))}
          </div>

          {/* Right Column - Pinned Media Panel with Auto-cycling Images */}
          <div className="lg:sticky lg:top-8 media-panel order-2 lg:order-none">
            <div className="relative aspect-[4/3] rounded-lg overflow-hidden shadow-2xl">
              <img
                ref={mediaRef}
                src={images[safeImageIndex]}
                alt={`ZYX Gimnasio - Gallery ${safeImageIndex + 1}`}
                className="w-full h-full object-cover"
                onError={(e) => {
                  console.error("Image failed to load:", e.target.src);
                  if (e.target.src !== images[0]) {
                    e.target.src = images[0]; // Fallback to first image
                  }
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-purple-500/20 to-transparent"></div>

              {/* Image indicator dots (shows current image, not step) */}
              <div className="absolute bottom-4 left-4 right-4">
                <div className="flex justify-center space-x-2">
                  {images.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      className={`w-3 h-3 rounded-full transition-all duration-300 ${
                        index === safeImageIndex
                          ? "bg-white scale-125"
                          : "bg-white/50 hover:bg-white/75"
                      }`}
                      aria-label={`Go to image ${index + 1}`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
