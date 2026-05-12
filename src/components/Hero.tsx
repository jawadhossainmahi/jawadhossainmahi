import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { useGitHub } from "@/hooks/useGitHub";
import { usePortfolio } from "@/hooks/usePortfolio";

export default function Hero() {
  const containerRef  = useRef<HTMLDivElement>(null);
  const typedTextRef  = useRef<HTMLSpanElement>(null);
  const cursorBlinkRef = useRef<HTMLSpanElement>(null);

  const { profile } = useGitHub("jawadhossainmahi");
  const { data }    = usePortfolio();
  const roles = data?.about?.roles ?? [
    "Full Stack Developer",
    "Laravel Developer",
    "Flutter Enthusiast",
    "CSE Student",
  ];

  /* ── GSAP entrance animation ── */
  useEffect(() => {
    if (!containerRef.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".hero-elem",
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, stagger: 0.15, ease: "power3.out", delay: 0.3 }
      );
    }, containerRef);
    return () => ctx.revert();
  }, []);

  /* ── Typewriter animation ── */
  useEffect(() => {
    if (!typedTextRef.current || !cursorBlinkRef.current) return;
    const el     = typedTextRef.current;
    const blink  = cursorBlinkRef.current;
    let roleIdx  = 0;
    let charIdx  = 0;
    let isDeleting = false;
    let raf: ReturnType<typeof setTimeout>;

    // blinking cursor
    const blinkTl = gsap.to(blink, {
      opacity: 0,
      duration: 0.5,
      repeat: -1,
      yoyo: true,
      ease: "power2.inOut",
    });

    function type() {
      const current = roles[roleIdx];

      if (!isDeleting) {
        el.textContent = current.slice(0, charIdx + 1);
        charIdx++;
        if (charIdx === current.length) {
          isDeleting = true;
          raf = setTimeout(type, 1800); // pause before deleting
          return;
        }
        raf = setTimeout(type, 80);
      } else {
        el.textContent = current.slice(0, charIdx - 1);
        charIdx--;
        if (charIdx === 0) {
          isDeleting = false;
          roleIdx = (roleIdx + 1) % roles.length;
          raf = setTimeout(type, 300); // pause before typing next
          return;
        }
        raf = setTimeout(type, 45);
      }
    }

    raf = setTimeout(type, 1200); // initial delay

    return () => {
      clearTimeout(raf);
      blinkTl.kill();
    };
  }, [roles]);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="hero"
      ref={containerRef}
      className="min-h-[100dvh] relative flex items-center justify-center pt-20 overflow-hidden"
    >
      {/* Radial mesh background */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-cyan-900/20 via-[#0a0a0f] to-[#0a0a0f] -z-10" />

      {/* Subtle grid */}
      <div
        className="absolute inset-0 -z-10 opacity-[0.03]"
        style={{
          backgroundImage: "linear-gradient(#00d4ff 1px, transparent 1px), linear-gradient(90deg, #00d4ff 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      <div className="container mx-auto px-6 z-10 flex flex-col items-center text-center">
        {/* Avatar */}
        <div className="hero-elem mb-8">
          {profile?.avatar_url ? (
            <div className="w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden border-2 border-cyan-400/40 p-1 shadow-[0_0_40px_rgba(0,212,255,0.15)]">
              <img
                src={profile.avatar_url}
                alt={`${profile.name ?? "Jawad Hossain Mahi"} avatar`}
                className="w-full h-full rounded-full object-cover"
                loading="eager"
                width={160}
                height={160}
              />
            </div>
          ) : (
            <div className="w-32 h-32 md:w-40 md:h-40 rounded-full border-2 border-cyan-400/30 bg-white/5 animate-pulse" />
          )}
        </div>

        {/* Location badge */}
        <div className="hero-elem inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 mb-6 text-sm text-gray-300">
          <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
          {profile?.location ?? data?.about?.location ?? "Narayanganj, Bangladesh"}
        </div>

        {/* Name */}
        <h1 className="hero-elem text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter mb-6 text-white">
          {data?.about?.name ?? "Jawad Hossain Mahi"}
        </h1>

        {/* Typewriter */}
        <h2 className="hero-elem text-xl md:text-3xl font-medium text-gray-400 mb-10 h-10 flex items-center gap-0">
          <span className="text-gray-400">I am a&nbsp;</span>
          <span ref={typedTextRef} className="text-cyan-400 font-bold" />
          <span
            ref={cursorBlinkRef}
            className="inline-block w-[3px] h-[1.1em] bg-cyan-400 ml-0.5 align-middle rounded-sm"
          />
        </h2>

        {/* CTA buttons */}
        <div className="hero-elem flex flex-wrap gap-4 justify-center">
          <a
            href={profile?.html_url ?? data?.contact?.github ?? "https://github.com/jawadhossainmahi"}
            target="_blank"
            rel="noopener noreferrer"
            data-testid="link-github"
            className="hoverable px-8 py-3 rounded-full bg-cyan-500 text-black font-semibold hover:bg-cyan-400 transition-colors shadow-[0_0_24px_rgba(0,212,255,0.3)]"
          >
            GitHub
          </a>
          <button
            onClick={() => scrollTo("projects")}
            data-testid="button-scroll-projects"
            className="hoverable px-8 py-3 rounded-full bg-white/5 border border-white/10 text-white font-semibold hover:bg-white/10 transition-colors"
          >
            Projects
          </button>
          <button
            onClick={() => scrollTo("contact")}
            data-testid="button-scroll-contact"
            className="hoverable px-8 py-3 rounded-full bg-white/5 border border-white/10 text-white font-semibold hover:bg-white/10 transition-colors"
          >
            Contact
          </button>
        </div>
      </div>
    </section>
  );
}
