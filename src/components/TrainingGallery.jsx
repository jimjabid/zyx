import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { useState, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

gsap.registerPlugin(ScrollTrigger);

const TrainingGallery = () => {
  const containerRef = useRef(null);
  const [loadedImages, setLoadedImages] = useState(new Set());

  // Import all gallery images
  const galleryImages = [
    { src: "/gallery-1.png", alt: "Entrenamiento ZYX #1" },
    { src: "/gallery-2.png", alt: "Entrenamiento ZYX #2" },
    { src: "/gallery-3.png", alt: "Entrenamiento ZYX #3" },
    { src: "/gallery-4.png", alt: "Entrenamiento ZYX #4" },
    { src: "/gallery-5.png", alt: "Entrenamiento ZYX #5" },
    { src: "/gallery-6.png", alt: "Entrenamiento ZYX #6" },
    { src: "/gallery-7.png", alt: "Entrenamiento ZYX #7" },
    { src: "/gallery-8.png", alt: "Entrenamiento ZYX #8" },
    { src: "/gallery-9.png", alt: "Entrenamiento ZYX #9" },
  ];

  useGSAP(() => {
    // Animate carousel container on scroll
    gsap.fromTo(
      ".carousel-container",
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

  const handleImageLoad = (index) => {
    setLoadedImages((prev) => new Set([...prev, index]));
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
            Entrenamientos de calistenia y bodyweight para todas las edades.
            Mejora fuerza, movilidad y conciencia corporal sin máquinas.
          </p>
        </div>

        {/* Carousel Container */}
        <div className="carousel-container">
          <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            spaceBetween={20}
            slidesPerView={1}
            centeredSlides={true}
            loop={true}
            autoplay={{
              delay: 3000,
              disableOnInteraction: false,
            }}
            navigation={{
              prevEl: ".swiper-button-prev-custom",
              nextEl: ".swiper-button-next-custom",
            }}
            pagination={{
              el: ".swiper-pagination-custom",
              clickable: true,
            }}
            breakpoints={{
              640: {
                slidesPerView: 2,
                spaceBetween: 20,
              },
              768: {
                slidesPerView: 2,
                spaceBetween: 30,
              },
              1024: {
                slidesPerView: 3,
                spaceBetween: 40,
              },
            }}
            className="training-carousel"
          >
            {galleryImages.map((image, index) => (
              <SwiperSlide key={index}>
                <div className="group relative overflow-hidden rounded-lg aspect-square bg-gray-800">
                  <img
                    src={image.src}
                    alt={image.alt}
                    loading="lazy"
                    onLoad={() => handleImageLoad(index)}
                    className={`w-full h-full object-cover transition-all duration-500 group-hover:scale-110 ${
                      loadedImages.has(index) ? "opacity-100" : "opacity-0"
                    }`}
                  />

                  {/* Loading placeholder */}
                  {!loadedImages.has(index) && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-8 h-8 border-2 border-[#70C4B1] border-t-transparent rounded-full animate-spin"></div>
                    </div>
                  )}

                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-[#70C4B1]/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Custom Navigation */}
          <div className="flex justify-center items-center mt-8 space-x-4">
            <button className="swiper-button-prev-custom w-10 h-10 rounded-full bg-[#70C4B1] hover:bg-[#5fb3a0] text-white flex items-center justify-center transition-colors duration-300">
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>

            <div className="swiper-pagination-custom flex space-x-2"></div>

            <button className="swiper-button-next-custom w-10 h-10 rounded-full bg-[#70C4B1] hover:bg-[#5fb3a0] text-white flex items-center justify-center transition-colors duration-300">
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Custom Swiper Styles */}
      <style jsx>{`
        .swiper-button-prev-custom,
        .swiper-button-next-custom {
          display: none; 
        }

        .training-carousel {
          padding-bottom: 60px;
        }

        .swiper-pagination-custom .swiper-pagination-bullet {
          width: 12px;
          height: 12px;
          background: rgba(255, 255, 255, 0.3);
          border-radius: 50%;
          margin: 0 4px;
          cursor: pointer;
          transition: all 0.3s ease;
        }
        .swiper-pagination-horizontal {
          width: auto !important;
        }

        .swiper-pagination-custom .swiper-pagination-bullet-active {
          background: #70c4b1;
          transform: scale(1.2);
        }

        .swiper-slide img {
          user-select: none;
          -webkit-user-drag: none;
        }
      `}</style>
    </section>
  );
};

export default TrainingGallery;
