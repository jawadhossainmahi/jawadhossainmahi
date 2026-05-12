import { useEffect, useRef } from "react";
import { gsap } from "gsap";

export default function Nav() {
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!navRef.current) return;
    
    gsap.fromTo(
      navRef.current,
      { y: -100, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: "power3.out", delay: 0.2 }
    );
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <header
      ref={navRef}
      className="fixed top-0 left-0 right-0 z-50 px-6 py-4 flex justify-between items-center bg-[#0a0a0f]/80 backdrop-blur-md border-b border-white/5"
    >
      <div className="text-xl font-bold tracking-tighter text-white cursor-pointer" onClick={() => scrollTo("hero")}>
        JHM<span className="text-cyan-400">.</span>
      </div>
      <nav className="hidden md:flex gap-8 text-sm font-medium text-gray-300">
        <button onClick={() => scrollTo("about")} className="hover:text-cyan-400 transition-colors hoverable">About</button>
        <button onClick={() => scrollTo("projects")} className="hover:text-cyan-400 transition-colors hoverable">Projects</button>
        <button onClick={() => scrollTo("skills")} className="hover:text-cyan-400 transition-colors hoverable">Skills</button>
        <button onClick={() => scrollTo("timeline")} className="hover:text-cyan-400 transition-colors hoverable">Timeline</button>
      </nav>
      <button 
        onClick={() => scrollTo("contact")}
        className="px-5 py-2 rounded-full border border-cyan-400/30 text-cyan-400 hover:bg-cyan-400/10 transition-colors hoverable text-sm font-medium"
      >
        Contact Me
      </button>
    </header>
  );
}
