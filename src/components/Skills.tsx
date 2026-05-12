import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  SiPhp, SiLaravel, SiJavascript, SiMysql, SiHtml5, SiCss,
  SiFlutter, SiDart, SiTypescript, SiJquery, SiTailwindcss,
  SiCplusplus, SiGit, SiGithub, SiReact,
} from "react-icons/si";
import { usePortfolio } from "@/hooks/usePortfolio";

gsap.registerPlugin(ScrollTrigger);

const ICON_MAP: Record<string, React.ElementType> = {
  SiPhp, SiLaravel, SiJavascript, SiMysql, SiHtml5, SiCss,
  SiFlutter, SiDart, SiTypescript, SiJquery, SiTailwindcss,
  SiCplusplus, SiGit, SiGithub, SiReact,
};

function SkeletonCard() {
  return (
    <div className="skill-card p-6 rounded-2xl border border-white/5 bg-white/5 animate-pulse">
      <div className="flex items-center gap-4 mb-4">
        <div className="w-11 h-11 rounded-xl bg-white/10" />
        <div className="flex-1 space-y-2">
          <div className="h-4 bg-white/10 rounded w-24" />
          <div className="h-3 bg-white/5 rounded w-12" />
        </div>
      </div>
      <div className="w-full bg-white/5 rounded-full h-1.5" />
    </div>
  );
}

export default function Skills() {
  const sectionRef = useRef<HTMLElement>(null);
  const { data, loading } = usePortfolio();
  const skills = data?.skills ?? [];

  useEffect(() => {
    if (loading || !sectionRef.current || skills.length === 0) return;

    const cards = sectionRef.current.querySelectorAll(".skill-card");
    const bars  = sectionRef.current.querySelectorAll(".skill-progress");

    const ctx = gsap.context(() => {
      gsap.fromTo(
        cards,
        { y: 30, opacity: 0 },
        {
          y: 0, opacity: 1,
          duration: 0.6,
          stagger: 0.07,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
          },
        }
      );

      bars.forEach((bar) => {
        const width = bar.getAttribute("data-width");
        gsap.fromTo(
          bar,
          { width: "0%" },
          {
            width: `${width}%`,
            duration: 1.4,
            ease: "power3.out",
            scrollTrigger: {
              trigger: bar,
              start: "top 90%",
            },
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [loading, skills]);

  return (
    <section id="skills" ref={sectionRef} className="py-24 relative z-10 bg-[#0a0a0f]/50">
      <div className="container mx-auto px-6">
        <div className="mb-16 text-center">
          <h2 className="text-3xl md:text-5xl font-bold mb-4 text-white">Technical Arsenal</h2>
          <p className="text-gray-400 mb-4 text-sm">
            Curated from{" "}
            <a
              href="https://github.com/jawadhossainmahi"
              target="_blank"
              rel="noopener noreferrer"
              className="text-cyan-400 hover:underline"
            >
              GitHub repositories
            </a>
            {" "}· proficiency based on real usage
          </p>
          <div className="w-20 h-1 bg-cyan-400 rounded-full mx-auto" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {loading
            ? Array.from({ length: 9 }).map((_, i) => <SkeletonCard key={i} />)
            : skills.map((skill) => {
                const Icon = ICON_MAP[skill.icon] ?? null;
                return (
                  <div
                    key={skill.name}
                    data-testid={`skill-card-${skill.name.toLowerCase().replace(/\s+/g, "-")}`}
                    className="skill-card p-6 rounded-2xl border border-white/5 bg-white/5 hover:bg-white/10 transition-colors group relative overflow-hidden"
                  >
                    <div
                      className="absolute top-0 right-0 w-24 h-24 rounded-full blur-2xl opacity-0 group-hover:opacity-20 transition-opacity duration-500 pointer-events-none"
                      style={{ backgroundColor: skill.color }}
                    />
                    <div className="flex items-center gap-4 mb-4">
                      <div
                        className="p-3 rounded-xl bg-white/5 text-2xl flex items-center justify-center w-11 h-11"
                        style={{ color: skill.color }}
                      >
                        {Icon ? (
                          <Icon />
                        ) : (
                          <span className="text-sm font-bold font-mono">{skill.name.slice(0, 2)}</span>
                        )}
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-white">{skill.name}</h3>
                        <span className="text-xs text-gray-400 font-mono">{skill.percentage}%</span>
                      </div>
                    </div>
                    <div className="w-full bg-white/5 rounded-full h-1.5 overflow-hidden">
                      <div
                        className="skill-progress h-full rounded-full"
                        style={{ backgroundColor: skill.color, boxShadow: `0 0 8px ${skill.color}80` }}
                        data-width={skill.percentage}
                      />
                    </div>
                  </div>
                );
              })}
        </div>
      </div>
    </section>
  );
}
