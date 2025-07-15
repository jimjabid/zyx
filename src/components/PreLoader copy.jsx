import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';

const PreLoader = ({ onComplete }) => {
  const containerRef = useRef(null);
  const lettersRef = useRef([]);
  const veilRef = useRef(null);

  useGSAP(() => {
    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    // Create timeline
    const tl = gsap.timeline({
      onComplete: () => {
        if (onComplete) onComplete();
      }
    });

    // Stage A: Stagger-in letters
    tl.fromTo(lettersRef.current, 
      {
        opacity: 0,
        y: 20
      },
      {
        opacity: 1,
        y: 0,
        duration: 0.5,
        stagger: 0.15,
        ease: "power2.out"
      }
    );

    if (!prefersReducedMotion) {
      // Stage B: Depth rush + veil fade
      tl.to(lettersRef.current, {
        scale: 25,
        z: 600,
        rotation: (index) => index === 0 ? 3 : index === 1 ? -3 : 3, // Z=3°, Y=-3°, X=3°
        duration: 0.8,
        stagger: 0.1,
        ease: "power2.in"
      })
      .to(veilRef.current, {
        opacity: 1,
        duration: 0.2,
        ease: "power2.out"
      }, ">"); // start with the last letter rush
    }

    // Stage C: Fade out wrapper
    tl.to(containerRef.current, {
      opacity: 0,
      duration: 0.4,
      ease: "power2.out"
    }, prefersReducedMotion ? "+=0.3" : "+=0.2"); 

  }, { scope: containerRef });

  return (
    <div 
      ref={containerRef}
      className="fixed inset-0 grid place-items-center bg-[#171516] z-50"
    >
      {/* Mint veil */}
      <div 
        ref={veilRef}
        className="pl-veil absolute inset-0 bg-[#70C4B1] opacity-0 pointer-events-none"
      />
      
      {/* Letters container with perspective */}
      <div className="flex space-x-4 perspective-800">
        {['Z', 'Y', 'X'].map((letter, index) => (
          <span 
            key={letter}
            ref={el => lettersRef.current[index] = el}
            className="pl-letter text-6xl md:text-8xl font-bold text-[#70C4B1]"
            style={{ transformStyle: 'preserve-3d' }}
          >
            {letter}
          </span>
        ))}
      </div>
    </div>
  );
};

export default PreLoader; 