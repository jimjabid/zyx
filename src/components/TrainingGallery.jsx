import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { useState, useRef } from "react";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";

gsap.registerPlugin(ScrollTrigger);

const TrainingGallery = () => {
  const containerRef = useRef(null);
  const [loadedImages, setLoadedImages] = useState(new Set());
  const [imageAspects, setImageAspects] = useState(new Map());
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  // Import all gallery images
  const galleryImages = [
    { src: "./gallery-1.png", alt: "Entrenamiento ZYX #1" },
    { src: "./gallery-2.png", alt: "Entrenamiento ZYX #2" },
    { src: "./gallery-3.png", alt: "Entrenamiento ZYX #3" },
    { src: "./gallery-4.png", alt: "Entrenamiento ZYX #4" },
    { src: "./gallery-5.png", alt: "Entrenamiento ZYX #5" },
    { src: "./gallery-6.png", alt: "Entrenamiento ZYX #6" },
    { src: "./gallery-7.png", alt: "Entrenamiento ZYX #7" },
    { src: "./gallery-8.png", alt: "Entrenamiento ZYX #8" },
    { src: "./gallery-9.png", alt: "Entrenamiento ZYX #9" },
  ];

  // Convert images for lightbox
  const lightboxSlides = galleryImages.map((image) => ({
    src: image.src,
    alt: image.alt,
  }));

  // Get dynamic span classes based on aspect ratio
  const getSpanClasses = (index) => {
    const aspectRatio = imageAspects.get(index);
    if (!aspectRatio) return ""; // Default until loaded

    // Define thresholds
    const isWide = aspectRatio > 1.3; // Landscape
    const isTall = aspectRatio < 0.75; // Portrait
    const isSquare = aspectRatio >= 0.75 && aspectRatio <= 1.3; // Square-ish

    // Smart spanning logic - balance the grid while respecting orientation
    if (index === 0) {
      // Hero tile - always large if wide or square
      return isWide || isSquare ? "col-span-2 row-span-2" : "row-span-2";
    } else if (index === 3 && isTall) {
      // Tall image gets extra height
      return "row-span-2";
    } else if (index === 6 && isWide) {
      // Wide image gets extra width
      return "col-span-2";
    } else if (isTall) {
      // Other tall images get some extra height occasionally
      return index % 4 === 1 ? "row-span-2" : "";
    } else if (isWide) {
      // Other wide images get some extra width occasionally
      return index % 5 === 2 ? "col-span-2" : "";
    }

    return ""; // Normal 1x1 tile
  };

  useGSAP(() => {
    // Animate quilt gallery container on scroll
    gsap.fromTo(
      ".quilt-gallery",
      {
        scale: 0.95,
        opacity: 0,
      },
      {
        scale: 1,
        opacity: 1,
        duration: 1.2,
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none reverse",
        },
      }
    );

    // Animate section title
    gsap.fromTo(
      ".gallery-title",
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        scrollTrigger: {
          trigger: ".gallery-title",
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
      }
    );

    // Animate description
    gsap.fromTo(
      ".gallery-description",
      { opacity: 0, y: 20 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        delay: 0.3,
        scrollTrigger: {
          trigger: ".gallery-description",
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
      }
    );
  }, []);

  const handleImageLoad = (index, event) => {
    setLoadedImages((prev) => new Set([...prev, index]));

    // Calculate and store aspect ratio
    const img = event.target;
    const aspectRatio = img.naturalWidth / img.naturalHeight;
    setImageAspects((prev) => new Map([...prev, [index, aspectRatio]]));
  };

  const openLightbox = (index) => {
    setLightboxIndex(index);
    setLightboxOpen(true);
  };

  const handleKeyPress = (event, index) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      openLightbox(index);
    }
  };

  const handleClick = (index) => {
    openLightbox(index);
  };

  return (
    <section className="py-16 md:py-24 bg-[#171516]" ref={containerRef}>
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="gallery-title font-cabin text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
            Entrenamiento
          </h2>
          <p className="gallery-description font-cabin text-lg md:text-xl text-white/80 max-w-3xl mx-auto leading-relaxed">
            Nuestra propuesta se basa en la calistenia, una disciplina que
            utiliza el peso de tu propio cuerpo para desarrollar fuerza,
            movilidad, resistencia y control corporal. Diseñamos cada sesión
            para que sea accesible y progresiva, adaptándose a todos los
            niveles, desde quienes dan sus primeros pasos hasta los más
            avanzados.
          </p>
        </div>

        {/* Quilt Gallery Container */}
        <div className="carousel-container">
          <div className="quilt-gallery grid grid-cols-2 md:grid-cols-3 gap-5 auto-rows-[180px] md:auto-rows-[200px]">
            {galleryImages.map((image, index) => (
              <div
                key={index}
                className={`group relative rounded-xl overflow-hidden shadow-lg transition-all duration-300 hover:ring-4 hover:ring-[#70C4B1]/70 focus:ring-4 focus:ring-[#70C4B1]/70 focus:outline-none cursor-pointer ${getSpanClasses(
                  index
                )}`}
                tabIndex={0}
                onKeyPress={(e) => handleKeyPress(e, index)}
                onClick={() => handleClick(index)}
                role="button"
                aria-label={`Ver imagen: ${image.alt}`}
              >
                <img
                  src={image.src}
                  alt={image.alt}
                  loading="lazy"
                  onLoad={(e) => handleImageLoad(index, e)}
                  className={`w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 group-focus:scale-110 ${
                    loadedImages.has(index) ? "opacity-100" : "opacity-0"
                  }`}
                />

                {/* Loading placeholder */}
                {!loadedImages.has(index) && (
                  <div className="absolute inset-0 flex items-center justify-center bg-gray-800">
                    <div className="w-8 h-8 border-2 border-[#70C4B1] border-t-transparent rounded-full animate-spin"></div>
                  </div>
                )}

                {/* Hover overlay */}
                <div className="absolute inset-0 bg-[#70C4B1]/20 opacity-0 group-hover:opacity-100 group-focus:opacity-100 transition-opacity duration-300" />

                {/* Click indicator */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 group-focus:opacity-100 transition-opacity duration-300">
                  <div className="w-12 h-12 bg-[#70C4B1] rounded-full flex items-center justify-center">
                    <svg
                      className="w-6 h-6 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                      />
                    </svg>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Lightbox */}
      <Lightbox
        open={lightboxOpen}
        close={() => setLightboxOpen(false)}
        index={lightboxIndex}
        slides={lightboxSlides}
        styles={{
          container: { backgroundColor: "rgba(23, 21, 22, 0.95)" },
          toolbar: { backgroundColor: "transparent" },
          button: { color: "#70C4B1" },
        }}
        carousel={{
          preload: 2,
        }}
        controller={{
          closeOnPullDown: true,
          closeOnBackdropClick: true,
        }}
        plugins={[]}
      />

      {/* Custom Gallery Styles */}
      <style jsx>{`
        .quilt-gallery img {
          user-select: none;
          -webkit-user-drag: none;
        }

        /* Fine-tune grid gaps for mobile */
        @media (max-width: 767px) {
          .quilt-gallery {
            gap: 12px;
          }
        }

        /* Ensure smooth focus transitions */
        .quilt-gallery > div:focus {
          transform: scale(1.02);
        }

        /* Lightbox custom styles */
        :global(.yarl__container) {
          backdrop-filter: blur(8px);
        }

        :global(.yarl__slide) {
          display: flex;
          align-items: center;
          justify-content: center;
        }

        :global(.yarl__slide img) {
          max-height: 90vh;
          max-width: 90vw;
          object-fit: contain;
          border-radius: 8px;
        }

        /* Custom lightbox button styling */
        :global(.yarl__button) {
          background: #70c4b1 !important;
          border-radius: 50% !important;
          width: 48px !important;
          height: 48px !important;
          transition: all 0.3s ease !important;
        }

        :global(.yarl__button:hover) {
          background: #5fb3a0 !important;
          transform: scale(1.05) !important;
        }

        :global(.yarl__button svg) {
          color: white !important;
          width: 24px !important;
          height: 24px !important;
        }

        /* Navigation buttons */
        :global(.yarl__button_prev),
        :global(.yarl__button_next) {
          background: #70c4b1 !important;
        }

        /* Close button */
        :global(.yarl__button_close) {
          background: #70c4b1 !important;
          top: 20px !important;
          right: 20px !important;
        }
      `}</style>
    </section>
  );
};

export default TrainingGallery;
