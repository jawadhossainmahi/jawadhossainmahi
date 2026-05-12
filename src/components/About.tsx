import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGitHub } from "@/hooks/useGitHub";
import { usePortfolio } from "@/hooks/usePortfolio";

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const { profile } = useGitHub("jawadhossainmahi");
  const { data } = usePortfolio();
  const bio = data?.about?.bio ?? [];

  /* Re-run GSAP only after bio paragraphs are in the DOM */
  useEffect(() => {
    if (!sectionRef.current || bio.length === 0) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".about-text-para",
        { x: -40, opacity: 0 },
        {
          x: 0, opacity: 1,
          duration: 0.9,
          stagger: 0.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
          },
        }
      );
      gsap.fromTo(
        ".stat-card",
        { y: 50, opacity: 0 },
        {
          y: 0, opacity: 1,
          duration: 0.8,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
          },
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, [bio]);

  return (
    <section id="about" ref={sectionRef} className="py-24 relative z-10">
      <div className="container mx-auto px-6">
        <div className="mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-4 text-white">About Me</h2>
          <div className="w-20 h-1 bg-cyan-400 rounded-full" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Bio from portfolio.json */}
          <div className="text-gray-300 text-lg leading-relaxed space-y-6">
            {bio.length > 0
              ? bio.map((paragraph, i) => (
                  <p key={i} className="about-text-para">{paragraph}</p>
                ))
              : [1, 2, 3].map((i) => (
                  <div key={i} className="h-5 bg-white/5 rounded animate-pulse" />
                ))}
          </div>

          {/* Live stats from GitHub API */}
          <div className="grid grid-cols-2 gap-4">
            {[
              { value: profile?.public_repos, label: "Public Repos" },
              { value: profile?.followers,    label: "Followers"    },
              { value: profile?.following,    label: "Following"    },
              { value: "2+",                  label: "Years Exp."   },
            ].map(({ value, label }) => (
              <div
                key={label}
                className="stat-card p-6 rounded-2xl border border-white/5 bg-white/5 hover:border-cyan-400/50 transition-colors group"
              >
                <div className="text-4xl font-bold text-white mb-2 group-hover:text-cyan-400 transition-colors">
                  {value !== undefined && value !== null
                    ? value
                    : <span className="inline-block w-10 h-9 bg-white/10 rounded animate-pulse" />}
                </div>
                <div className="text-sm text-gray-400 uppercase tracking-wider">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
