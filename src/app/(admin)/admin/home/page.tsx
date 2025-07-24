"use client";

import { useEffect, useState } from "react";
import { StatsOverview } from "@/components/admin/StatsOverview";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import type { Database } from "@/lib/supabase";

type Profile = Database["public"]["Tables"]["profile"]["Row"];
type Skill = Database["public"]["Tables"]["skills"]["Row"];
type Education = Database["public"]["Tables"]["education"]["Row"];
type Experience = Database["public"]["Tables"]["experience"]["Row"];
type Project = Database["public"]["Tables"]["projects"]["Row"];

export default function HomePage() {
  const supabase = createClientComponentClient<Database>();

  const [profile, setProfile] = useState<Profile | null>(null);
  const [skills, setSkills] = useState<Skill[]>([]);
  const [education, setEducation] = useState<Education[]>([]);
  const [experience, setExperience] = useState<Experience[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        setError(null);
        // Fetch skills
        const { data: skillsData, error: skillsError } = await supabase
          .from("skills")
          .select("*");
        if (skillsError) throw skillsError;
        setSkills(skillsData ?? []);

        // Fetch education
        const { data: educationData, error: educationError } = await supabase
          .from("education")
          .select("*");
        if (educationError) throw educationError;
        setEducation(educationData ?? []);

        // Fetch experience
        const { data: experienceData, error: experienceError } = await supabase
          .from("experience")
          .select("*");
        if (experienceError) throw experienceError;
        setExperience(experienceData ?? []);

        // Fetch projects
        const { data: projectsData, error: projectsError } = await supabase
          .from("projects")
          .select("*");
        if (projectsError) throw projectsError;
        setProjects(projectsData ?? []);

        // Fetch certificates
        const { data: certificatesData, error: certificatesError } =
          await supabase.from("certificates").select("*");
      } catch (error: any) {
        setError(error.message || "Failed to fetch data");
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [supabase]);

  if (loading) return <div className="p-8 text-center">Loading...</div>;

  if (error)
    return <div className="p-8 text-center text-red-600">Error: {error}</div>;

  return (
    <main className="p-8">
      <h1 className="text-4xl font-bold mb-8 text-center">
        Welcome to My Portfolio
      </h1>

      <StatsOverview
        skills={skills}
        education={education}
        experience={experience}
        projects={projects}
      />
    </main>
  );
}
