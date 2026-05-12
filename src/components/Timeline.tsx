import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const timelineData = [
  {
    type: "Experience",
    title: "Full Stack Developer",
    organization: "Webshinez Technologies",
    date: "2023 – Present",
    description: "Building production Laravel + Flutter applications. Architecting backend services and creating seamless user experiences across platforms.",
  },
  {
    type: "Education",
    title: "B.Sc. in Computer Science & Engineering",
    organization: "Green University of Bangladesh",
    date: "Ongoing",
    description: "Focusing on software engineering principles, algorithms, and modern application development.",
  },
  {
    type: "Education",
    title: "Higher Secondary Certificate (HSC)",
    organization: "Narayanganj College",
    date: "2023",
    description: "Science group with strong foundation in mathematics and physics.",
  },
  {
    type: "Education",
    title: "Secondary School Certificate (SSC)",
    organization: "Adarsha School",
    date: "2021",
    description: "Science group.",
  }
];

export default function Timeline() {
  const sectionRef = useRef<HTMLElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current || !lineRef.current) return;
    
    const items = sectionRef.current.querySelectorAll(".timeline-item");
    
    gsap.fromTo(
      lineRef.current,
      { height: 0 },
      {
        height: "100%",
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 60%",
          end: "bottom 80%",
          scrub: 1,
        }
      }
    );

    items.forEach((item, i) => {
      gsap.fromTo(
        item,
        { x: i % 2 === 0 ? 50 : -50, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: item,
            start: "top 80%",
          }
        }
      );
    });
  }, []);

  return (
    <section id="timeline" ref={sectionRef} className="py-24 relative z-10">
      <div className="container mx-auto px-6">
        <div className="mb-20 text-center">
          <h2 className="text-3xl md:text-5xl font-bold mb-4 text-white">Journey</h2>
          <div className="w-20 h-1 bg-cyan-400 rounded-full mx-auto" />
        </div>

        <div className="relative max-w-4xl mx-auto">
          {/* Vertical Line Base */}
          <div className="absolute left-[20px] md:left-1/2 top-0 bottom-0 w-0.5 bg-white/10 -translate-x-1/2" />
          {/* Animated Fill Line */}
          <div ref={lineRef} className="absolute left-[20px] md:left-1/2 top-0 w-0.5 bg-gradient-to-b from-cyan-400 to-purple-500 -translate-x-1/2 shadow-[0_0_15px_rgba(0,212,255,0.5)]" />

          {timelineData.map((item, i) => (
            <div key={i} className={`timeline-item relative flex flex-col md:flex-row items-start md:items-center mb-12 ${i % 2 === 0 ? "md:flex-row-reverse" : ""}`}>
              <div className="absolute left-[20px] md:left-1/2 w-4 h-4 bg-[#0a0a0f] border-2 border-cyan-400 rounded-full -translate-x-1/2 mt-1.5 md:mt-0 z-10 shadow-[0_0_10px_rgba(0,212,255,0.8)]" />
              
              <div className="w-full md:w-1/2 pl-12 md:pl-0 md:pr-12 md:text-right">
                {i % 2 !== 0 && (
                  <div className="glass-card p-6 rounded-2xl border border-white/10 bg-white/5 hover:border-cyan-400/30 transition-colors text-left">
                    <span className="text-xs font-bold text-cyan-400 uppercase tracking-wider mb-2 block">{item.type}</span>
                    <h3 className="text-xl font-bold text-white mb-1">{item.title}</h3>
                    <div className="text-gray-300 font-medium mb-2">{item.organization}</div>
                    <div className="text-gray-500 text-sm mb-4">{item.date}</div>
                    <p className="text-gray-400 text-sm leading-relaxed">{item.description}</p>
                  </div>
                )}
              </div>
              
              <div className="w-full md:w-1/2 pl-12">
                {i % 2 === 0 && (
                  <div className="glass-card p-6 rounded-2xl border border-white/10 bg-white/5 hover:border-cyan-400/30 transition-colors text-left">
                    <span className="text-xs font-bold text-purple-400 uppercase tracking-wider mb-2 block">{item.type}</span>
                    <h3 className="text-xl font-bold text-white mb-1">{item.title}</h3>
                    <div className="text-gray-300 font-medium mb-2">{item.organization}</div>
                    <div className="text-gray-500 text-sm mb-4">{item.date}</div>
                    <p className="text-gray-400 text-sm leading-relaxed">{item.description}</p>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
