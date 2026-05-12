import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Mail, MapPin, Github, Linkedin, ExternalLink } from "lucide-react";
import { usePortfolio } from "@/hooks/usePortfolio";

gsap.registerPlugin(ScrollTrigger);

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null);
  const { data } = usePortfolio();
  const contact = data?.contact;

  useEffect(() => {
    if (!sectionRef.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".contact-elem",
        { y: 30, opacity: 0 },
        {
          y: 0, opacity: 1,
          duration: 0.8,
          stagger: 0.1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
          },
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="contact" ref={sectionRef} className="py-24 relative z-10">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto">
          <div className="contact-elem text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-4 text-white">Let's Connect</h2>
            <p className="text-gray-400">
              {contact?.tagline ?? "Open for opportunities and collaborations."}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Contact Info */}
            <div className="contact-elem p-8 rounded-3xl border border-white/10 bg-[#0f0f15]/80 relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-400/10 rounded-full blur-3xl -mr-10 -mt-10 pointer-events-none group-hover:bg-cyan-400/20 transition-colors" />
              <h3 className="text-2xl font-bold text-white mb-6">Contact Info</h3>

              <div className="space-y-6">
                <a
                  href={contact ? `mailto:${contact.email}` : "#"}
                  className="flex items-center gap-4 text-gray-300 hover:text-cyan-400 transition-colors hoverable group/item"
                >
                  <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center border border-white/10 group-hover/item:border-cyan-400/50 transition-colors">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs text-gray-500 mb-1">Email</div>
                    <div className="font-medium break-all">
                      {contact?.email ?? <span className="animate-pulse text-gray-600">loading…</span>}
                    </div>
                  </div>
                </a>

                <div className="flex items-center gap-4 text-gray-300">
                  <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center border border-white/10">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs text-gray-500 mb-1">Location</div>
                    <div className="font-medium">
                      {contact?.location ?? <span className="animate-pulse text-gray-600">loading…</span>}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Socials */}
            <div className="contact-elem p-8 rounded-3xl border border-white/10 bg-[#0f0f15]/80 relative overflow-hidden group">
              <div className="absolute bottom-0 right-0 w-32 h-32 bg-purple-500/10 rounded-full blur-3xl -mr-10 -mb-10 pointer-events-none group-hover:bg-purple-500/20 transition-colors" />
              <h3 className="text-2xl font-bold text-white mb-6">Socials</h3>

              <div className="flex flex-col gap-4">
                <a
                  href={contact?.github ?? "#"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/5 hover:border-cyan-400/50 text-gray-300 hover:text-white transition-all hoverable"
                >
                  <div className="flex items-center gap-3">
                    <Github className="w-5 h-5" />
                    <span className="font-medium">GitHub</span>
                  </div>
                  <ExternalLink className="w-4 h-4 opacity-50" />
                </a>

                <a
                  href={contact?.linkedin ?? "#"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/5 hover:border-purple-400/50 text-gray-300 hover:text-white transition-all hoverable"
                >
                  <div className="flex items-center gap-3">
                    <Linkedin className="w-5 h-5" />
                    <span className="font-medium">LinkedIn</span>
                  </div>
                  <ExternalLink className="w-4 h-4 opacity-50" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
