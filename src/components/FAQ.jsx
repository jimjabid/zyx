import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { useState } from "react";

gsap.registerPlugin(ScrollTrigger);

const FAQ = () => {
  const [openItem, setOpenItem] = useState(null);

  const faqItems = [
    {
      question: "¿Necesito experiencia previa?",
      answer: "No es necesario tener experiencia previa. Nuestros entrenamientos están diseñados para adaptarse a todos los niveles, desde principiantes hasta avanzados. Cada ejercicio tiene modificaciones para que puedas progresar a tu ritmo."
    },
    {
      question: "¿Cuánto dura cada clase?",
      answer: "Cada sesión de entrenamiento dura aproximadamente 60 minutos, incluyendo calentamiento, trabajo principal y relajación. También ofrecemos sesiones express de 30 minutos para quienes tienen poco tiempo."
    },
    {
      question: "¿Qué debo traer a la clase?",
      answer: "Solo necesitas ropa cómoda para moverte, una botella de agua y una toalla. Nosotros proporcionamos todas las colchonetas y equipos necesarios para el entrenamiento."
    },
    {
      question: "¿Hay clases para diferentes edades?",
      answer: "Sí, tenemos clases adaptadas para todas las edades. Desde adolescentes hasta adultos mayores, cada grupo tiene ejercicios específicos que respetan las capacidades y necesidades de cada etapa de la vida."
    },
    {
      question: "¿Cuántas veces por semana debo entrenar?",
      answer: "Recomendamos comenzar con 2-3 sesiones por semana para permitir que tu cuerpo se adapte. A medida que ganes fuerza y resistencia, puedes aumentar la frecuencia según tus objetivos personales."
    },
    {
      question: "¿Ofrecen clases online?",
      answer: "Sí, además de nuestras clases presenciales, ofrecemos sesiones online en vivo y entrenamientos grabados para que puedas entrenar desde casa cuando no puedas asistir presencialmente."
    }
  ];

  useGSAP(() => {
    // Animate FAQ section on scroll
    gsap.fromTo(
      ".faq-title",
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        scrollTrigger: {
          trigger: ".faq-title",
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
      }
    );

    gsap.fromTo(
      ".faq-item",
      { opacity: 0, y: 20 },
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        stagger: 0.1,
        scrollTrigger: {
          trigger: ".faq-container",
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      }
    );
  }, []);

  const toggleItem = (index) => {
    setOpenItem(openItem === index ? null : index);
  };

  return (
    <section className="py-16 md:py-24 bg-gray-900">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="faq-title font-cabin text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
            Preguntas Frecuentes
          </h2>
        </div>

        {/* FAQ Container */}
        <div className="faq-container max-w-4xl mx-auto">
          <div className="grid gap-4 lg:grid-cols-2 lg:gap-6 items-start">
            {faqItems.map((item, index) => (
              <div
                key={index}
                className="faq-item bg-[#171516] rounded-lg border border-gray-800 overflow-hidden group"
              >
                <button
                  className="w-full text-left p-6 focus:outline-none focus:bg-gray-800/50 transition-colors duration-200"
                  onClick={() => toggleItem(index)}
                  aria-expanded={openItem === index}
                >
                  <div className="flex justify-between items-center">
                    <h3 className="font-cabin text-lg md:text-xl font-semibold text-white pr-4">
                      {item.question}
                    </h3>
                    <div
                      className={`w-6 h-6 text-[#70C4B1] transition-transform duration-300 flex-shrink-0 ${
                        openItem === index ? 'rotate-180' : ''
                      }`}
                    >
                      <svg
                        className="w-full h-full"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    </div>
                  </div>
                </button>
                
                <div
                  className={`overflow-hidden transition-all duration-300 ease-in-out ${
                    openItem === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                  }`}
                >
                  <div className="px-6 pb-6 font-cabin text-white/80 leading-relaxed">
                    {item.answer}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQ; 