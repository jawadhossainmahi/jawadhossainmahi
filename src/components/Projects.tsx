import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGitHub } from "@/hooks/useGitHub";

gsap.registerPlugin(ScrollTrigger);

interface LocalProject {
  title: string;
  description: string;
  technologies: string[];
  category: string;
  github: string;
  live: string;
  featured: boolean;
}

export default function Projects() {
  const sectionRef = useRef<HTMLElement>(null);
  const [activeTab, setActiveTab] = useState<"featured" | "github">("featured");
  const [localProjects, setLocalProjects] = useState<LocalProject[]>([]);
  const { repos } = useGitHub("jawadhossainmahi");

  useEffect(() => {
    fetch(`${import.meta.env.BASE_URL}projects.json`)
      .then(res => res.json())
      .then((json: LocalProject[]) => setLocalProjects(json))
      .catch(() => {/* projects.json unavailable */});
  }, []);

  useEffect(() => {
    if (!sectionRef.current) return;
    const cards = sectionRef.current.querySelectorAll(".project-card");
    
    gsap.fromTo(
      cards,
      { y: 50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.6,
        stagger: 0.1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
        },
      }
    );
  }, [activeTab, localProjects, repos]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>, card: HTMLDivElement) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotateX = ((y - centerY) / centerY) * -10;
    const rotateY = ((x - centerX) / centerX) * 10;

    gsap.to(card, {
      rotateX,
      rotateY,
      transformPerspective: 1000,
      ease: "power2.out",
      duration: 0.3
    });
  };

  const handleMouseLeave = (card: HTMLDivElement) => {
    gsap.to(card, {
      rotateX: 0,
      rotateY: 0,
      ease: "power2.out",
      duration: 0.5
    });
  };

  return (
    <section id="projects" ref={sectionRef} className="py-24 relative z-10">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <h2 className="text-3xl md:text-5xl font-bold mb-4 text-white">Selected Work</h2>
            <div className="w-20 h-1 bg-cyan-400 rounded-full" />
          </div>
          <div className="flex bg-white/5 p-1 rounded-xl border border-white/10">
            <button
              onClick={() => setActiveTab("featured")}
              className={`px-6 py-2 rounded-lg text-sm font-medium transition-colors hoverable ${activeTab === "featured" ? "bg-white/10 text-cyan-400" : "text-gray-400 hover:text-white"}`}
            >
              Featured
            </button>
            <button
              onClick={() => setActiveTab("github")}
              className={`px-6 py-2 rounded-lg text-sm font-medium transition-colors hoverable ${activeTab === "github" ? "bg-white/10 text-cyan-400" : "text-gray-400 hover:text-white"}`}
            >
              GitHub Repos
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {activeTab === "featured" && localProjects.map((project, i) => (
            <div 
              key={i} 
              className="project-card glass-card p-6 rounded-2xl border border-white/10 bg-[#0f0f15]/80 hover:border-cyan-400/50 transition-colors flex flex-col group relative overflow-hidden"
              onMouseMove={(e) => handleMouseMove(e, e.currentTarget)}
              onMouseLeave={(e) => handleMouseLeave(e.currentTarget)}
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-400/10 rounded-full blur-3xl -mr-10 -mt-10 pointer-events-none group-hover:bg-cyan-400/20 transition-colors" />
              <div className="flex justify-between items-start mb-4">
                <div className="px-3 py-1 rounded-full text-xs font-medium bg-cyan-400/10 text-cyan-400 border border-cyan-400/20">
                  {project.category}
                </div>
              </div>
              <h3 className="text-xl font-bold text-white mb-3">{project.title}</h3>
              <p className="text-gray-400 text-sm leading-relaxed mb-6 flex-grow">
                {project.description}
              </p>
              <div className="flex flex-wrap gap-2 mb-6">
                {project.technologies.map((tech, j) => (
                  <span key={j} className="text-xs text-gray-500 bg-white/5 px-2 py-1 rounded-md">
                    {tech}
                  </span>
                ))}
              </div>
              <div className="flex gap-4 mt-auto">
                {project.github !== "#" && (
                  <a href={project.github} target="_blank" rel="noopener noreferrer" className="text-sm font-medium text-white hover:text-cyan-400 transition-colors hoverable">
                    Source Code &rarr;
                  </a>
                )}
              </div>
            </div>
          ))}

          {activeTab === "github" && repos.slice(0, 6).map((repo) => (
            <div 
              key={repo.id} 
              className="project-card glass-card p-6 rounded-2xl border border-white/10 bg-[#0f0f15]/80 hover:border-cyan-400/50 transition-colors flex flex-col group relative overflow-hidden"
              onMouseMove={(e) => handleMouseMove(e, e.currentTarget)}
              onMouseLeave={(e) => handleMouseLeave(e.currentTarget)}
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/10 rounded-full blur-3xl -mr-10 -mt-10 pointer-events-none group-hover:bg-purple-500/20 transition-colors" />
              <h3 className="text-xl font-bold text-white mb-3 truncate">{repo.name}</h3>
              <p className="text-gray-400 text-sm leading-relaxed mb-6 flex-grow line-clamp-3">
                {repo.description || "No description provided."}
              </p>
              <div className="flex justify-between items-center mt-auto pt-4 border-t border-white/5">
                <div className="flex items-center gap-4 text-xs text-gray-500">
                  {repo.language && <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-cyan-400"></span>{repo.language}</span>}
                  <span className="flex items-center gap-1">⭐ {repo.stargazers_count}</span>
                </div>
                <a href={repo.html_url} target="_blank" rel="noopener noreferrer" className="text-sm font-medium text-white hover:text-cyan-400 transition-colors hoverable">
                  View &rarr;
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
