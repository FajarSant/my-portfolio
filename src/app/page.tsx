"use client";

import { useEffect, useState } from "react";
import { HeroSection } from "@/components/public/HeroSection";
import { AboutSection } from "@/components/public/AboutSection";
import { ExperienceSection } from "@/components/public/ExperienceSection";
import { ProjectsSection } from "@/components/public/ProjectsSection";
import { SkillsSection } from "@/components/public/SkillsSection";
import { EducationSection } from "@/components/public/EducationSection";
import { ContactSection } from "@/components/public/ContactSection";
import { FooterSection } from "@/components/public/FooterSection";
import { NavigationBar } from "@/components/public/NavigationBar";
import { supabase, type Database } from "@/lib/supabase";

type Profile = Database["public"]["Tables"]["profile"]["Row"];
type Experience = Database["public"]["Tables"]["experience"]["Row"];
type Project = Database["public"]["Tables"]["projects"]["Row"];
type Skill = Database["public"]["Tables"]["skills"]["Row"];
type Education = Database["public"]["Tables"]["education"]["Row"];

type PortfolioStats = {
  total_projects: number;
  total_skills: number;
  years_experience: number;
};

const SECTION_IDS = [
  "home",
  "about",
  "experience",
  "projects",
  "skills",
  "education",
  "contact",
];

export default function HomePage() {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [experience, setExperience] = useState<Experience[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [skills, setSkills] = useState<Skill[]>([]);
  const [education, setEducation] = useState<Education[]>([]);
  const [stats, setStats] = useState<PortfolioStats>({
    total_projects: 0,
    total_skills: 0,
    years_experience: 0,
  });

  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    async function fetchData() {
      const [{ data: profile }, { data: experience }, { data: projects }, { data: skills }, { data: education }] =
        await Promise.all([
          supabase.from("profile").select("*").limit(1).single(),
          supabase.from("experience").select("*").order("start_date", { ascending: false }),
          supabase.from("projects").select("*").order("created_at", { ascending: false }),
          supabase.from("skills").select("*").order("name", { ascending: true }),
          supabase.from("education").select("*").order("start_date", { ascending: false }),
        ]);

      if (profile) setProfile(profile);
      if (experience) setExperience(experience);
      if (projects) setProjects(projects);
      if (skills) setSkills(skills);
      if (education) setEducation(education);

      // Optional: Replace with actual calculation logic
      setStats({
        total_projects: projects?.length ?? 0,
        total_skills: skills?.length ?? 0,
        years_experience: 3,
      });
    }

    fetchData();
  }, []);

  // Scroll to section
  const scrollToSection = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Detect active section on scroll
useEffect(() => {
  const handleScroll = () => {
    const scrollPosition = window.scrollY + window.innerHeight / 3;

    for (const id of SECTION_IDS) {  // Use `const` here
      const el = document.getElementById(id);
      if (el) {  // Check if the element exists before accessing its properties
        const { offsetTop, offsetHeight } = el;
        if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
          setActiveSection(id);
          break;
        }
      }
    }
  };

  window.addEventListener("scroll", handleScroll, { passive: true });
  return () => window.removeEventListener("scroll", handleScroll);
}, []);


  return (
    <div className="min-h-screen bg-background text-foreground scroll-smooth">
      <NavigationBar
        profile={profile}
        activeSection={activeSection}
        onScrollToSection={scrollToSection}
      />

      <section id="home">
        <HeroSection profile={profile} onScrollToSection={scrollToSection} />
      </section>

      <section id="about">
        <AboutSection profile={profile} stats={stats} />
      </section>

      <section id="experience">
        <ExperienceSection experience={experience} />
      </section>

      <section id="projects">
        <ProjectsSection projects={projects} />
      </section>

      <section id="skills">
        <SkillsSection skills={skills} />
      </section>

      <section id="education">
        <EducationSection education={education} />
      </section>

      <section id="contact">
        <ContactSection profile={profile} />
      </section>

      <FooterSection profile={profile} />
    </div>
  );
}
