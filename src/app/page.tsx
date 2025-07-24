"use client";

import { useEffect, useState } from "react";
import { HeroSection } from "@/components/public/HeroSection";
import { AboutSection } from "@/components/public/AboutSection";
import { ExperienceSection } from "@/components/public/ExperienceSection";
import Navbar from "@/components/public/navbar";
import { ProjectsSection } from "@/components/public/ProjectsSection";
import { SkillsSection } from "@/components/public/SkillsSection";
import { EducationSection } from "@/components/public/EducationSection";
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

  useEffect(() => {
    async function fetchProfile() {
      const { data, error } = await supabase
        .from("profile")
        .select("*")
        .limit(1)
        .single();
      if (!error && data) setProfile(data);
      else console.error("Failed to load profile", error);
    }

    async function fetchExperience() {
      const { data, error } = await supabase
        .from("experience")
        .select("*")
        .order("start_date", { ascending: false });
      if (!error && data) setExperience(data);
      else console.error("Failed to load experience", error);
    }

    async function fetchProjects() {
      const { data, error } = await supabase
        .from("projects")
        .select("*")
        .order("created_at", { ascending: false });
      if (!error && data) setProjects(data);
      else console.error("Failed to load projects", error);
    }

    async function fetchSkills() {
      const { data, error } = await supabase
        .from("skills")
        .select("*")
        .order("name", { ascending: true });
      if (!error && data) setSkills(data);
      else console.error("Failed to load skills", error);
    }

    async function fetchEducation() {
      const { data, error } = await supabase
        .from("education")
        .select("*")
        .order("start_date", { ascending: false });
      if (!error && data) setEducation(data);
      else console.error("Failed to load education", error);
    }

    async function fetchStats() {
      // Optional: bisa hitung dari data nyata nanti
      setStats({
        total_projects: 12,
        total_skills: 8,
        years_experience: 3,
      });
    }

    fetchProfile();
    fetchExperience();
    fetchProjects();
    fetchSkills();
    fetchEducation();
    fetchStats();
  }, []);

  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div>
      <Navbar />
      <HeroSection profile={profile} onScrollToSection={scrollToSection} />
      <AboutSection profile={profile} stats={stats} />
      <ExperienceSection experience={experience} />
      <ProjectsSection projects={projects} />
      <SkillsSection skills={skills} />
      <EducationSection education={education} />
    </div>
  );
}
