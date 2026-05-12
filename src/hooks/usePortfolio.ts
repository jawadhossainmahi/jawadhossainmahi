import { useState, useEffect } from "react";

export interface SkillEntry {
  name: string;
  percentage: number;
  color: string;
  icon: string;
}

export interface PortfolioData {
  about: {
    name: string;
    title: string;
    location: string;
    roles: string[];
    bio: string[];
  };
  contact: {
    email: string;
    location: string;
    github: string;
    linkedin: string;
    tagline: string;
  };
  footer: {
    name: string;
    builtWith: string;
  };
  skills: SkillEntry[];
}

export function usePortfolio() {
  const [data, setData] = useState<PortfolioData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${import.meta.env.BASE_URL}portfolio.json`)
      .then((r) => r.json())
      .then((json: PortfolioData) => {
        setData(json);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  return { data, loading };
}
