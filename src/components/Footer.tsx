import { usePortfolio } from "@/hooks/usePortfolio";

export default function Footer() {
  const { data } = usePortfolio();
  const footer = data?.footer;
  const year = new Date().getFullYear();

  return (
    <footer className="py-8 border-t border-white/10 bg-[#050508] relative z-10">
      <div className="container mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-gray-500">
        <p>
          &copy; {year}{" "}
          <span className="text-gray-400">{footer?.name ?? "Jawad Hossain Mahi"}</span>.
          All rights reserved.
        </p>
        <p>
          Built with{" "}
          <span className="text-cyan-400">{footer?.builtWith ?? "React, GSAP & Tailwind"}</span>
        </p>
      </div>
    </footer>
  );
}
