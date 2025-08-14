import galleryImg from "/gallery-3.png";

const AboutUs = () => {
  return (
    <section className="py-16 px-6 bg-[#171516]">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Content */}
          <div className="space-y-6">
            <h2 className="text-4xl lg:text-5xl font-bold text-white mb-8">
              Acerca de ZYX
            </h2>
            <div className="space-y-4 text-gray-300 text-lg leading-relaxed">
              <p>
                Te acompañamos paso a paso para que alcances tus metas, mientras compartís entrenamientos con personas que, como vos, buscan superarse.
              </p>
              <p>
                Zyx es más que un gimnasio: es un lugar donde cada logro se celebra y cada esfuerzo cuenta.
              </p>
            </div>
          </div>
          
          {/* Right Column - Image */}
          <div className="flex justify-center lg:justify-end">
            <div className="relative">
              <img 
                src={galleryImg} 
                alt="ZYX Gimnasio" 
                className="rounded-lg shadow-2xl max-w-full h-auto object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-purple-500/20 to-transparent rounded-lg"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
