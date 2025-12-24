"use client";

import { useEffect, useRef, useMemo } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

type Props = {
  children: string;
  enableBlur?: boolean;
  baseOpacity?: number;
  baseRotation?: number;
  blurStrength?: number;
  containerClassName?: string;
  textClassName?: string;
};

export default function ScrollReveal({
  children,
  enableBlur = true,
  baseOpacity = 0.2,
  baseRotation = 2,
  blurStrength = 6,
  containerClassName = "",
  textClassName = "",
}: Props) {
  const containerRef = useRef<HTMLDivElement>(null);

  const splitText = useMemo(() => {
  const temp = document.createElement("div");
  temp.innerHTML = children;

  const nodes: React.ReactNode[] = [];

  temp.childNodes.forEach((node, i) => {
    if (node.nodeType === Node.TEXT_NODE) {
      node.textContent?.split(/(\s+)/).forEach((word, j) => {
        if (/^\s+$/.test(word)) {
          nodes.push(word);
        } else {
          nodes.push(
            <span className="word" key={`${i}-${j}`}>
              {word}
            </span>
          );
        }
      });
    } else if (node.nodeType === Node.ELEMENT_NODE && node instanceof HTMLElement) {
      nodes.push(
        <span
          key={i}
          className={`word ${node.className || ""}`}
          dangerouslySetInnerHTML={{ __html: node.innerHTML }}
        />
      );
    }
  });

  return nodes;
}, [children]);


  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const words = el.querySelectorAll(".word");

   /* 🔄 Smooth rotation */
gsap.fromTo(
  el,
  { rotate: baseRotation },
  {
    rotate: 0,
    ease: "none",
    scrollTrigger: {
      trigger: el,
      start: "top bottom+=10%",
      end: "bottom top-=10%",
      scrub: 1.8, // ⏩ slightly faster
    },
  }
);

/* ✨ Balanced blur reveal */
gsap.fromTo(
  words,
  {
    opacity: baseOpacity,
    filter: enableBlur ? `blur(${blurStrength - 2}px)` : "none", // 👈 faster blur clear
    y: 14,
  },
  {
    opacity: 1,
    filter: "blur(0px)",
    y: 0,
    stagger: {
      each: 0.04, // 👈 slightly quicker
    },
    ease: "none",
    scrollTrigger: {
      trigger: el,
      start: "top bottom+=18%", // 👈 starts earlier
      end: "bottom top-=18%",   // 👈 ends sooner
      scrub: 1.6,               // 👈 faster response
    },
  }
);



    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, [enableBlur, baseOpacity, baseRotation, blurStrength]);

  return (
    <>
      {/* Scoped base styles */}
      <style jsx>{`
        .scroll-reveal {
          width: 100%;
        }

        .scroll-reveal-text {
          display: inline;
        }

        .scroll-reveal .word {
          display: inline-block;
          will-change: opacity, filter, transform;
        }
      `}</style>

      <div ref={containerRef} className={`scroll-reveal ${containerClassName}`}>
        <p className={`scroll-reveal-text ${textClassName}`}>
          {splitText}
        </p>
      </div>
    </>
  );
}
