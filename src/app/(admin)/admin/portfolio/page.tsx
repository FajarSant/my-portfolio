"use client";

import { useEffect, useState } from "react";
import { supabase, type Database } from "@/lib/supabase";
import { PortfolioManager } from "@/components/admin/PortfolioManager";

type Project = Database["public"]["Tables"]["projects"]["Row"];

export default function PortfolioPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch projects on mount
  useEffect(() => {
    async function fetchProjects() {
      setLoading(true);
      const { data, error } = await supabase
        .from("projects")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Error fetching projects:", error);
        setProjects([]);
      } else if (data) {
        setProjects(data);
      }
      setLoading(false);
    }

    fetchProjects();
  }, []);

  return (
    <main className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">My Portfolio</h1>

      {loading ? (
        <p>Loading projects...</p>
      ) : (
        <PortfolioManager
          projects={projects}
          onProjectsUpdate={(updatedProjects) => setProjects(updatedProjects)}
        />
      )}
    </main>
  );
}
