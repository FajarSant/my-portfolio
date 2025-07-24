"use client";

import { useEffect, useState } from "react";
import { ExperienceManager } from "@/components/admin/ExperienceManager";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import type { Database } from "@/lib/supabase";

type Experience = Database["public"]["Tables"]["experience"]["Row"];

export default function ExperiencePage() {
  const supabase = createClientComponentClient<Database>();
  const [experience, setExperience] = useState<Experience[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchExperience = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from("experience")
        .select("*")
        .order("start_date", { ascending: false });

      if (error) throw error;
      setExperience(data || []);
    } catch (err: any) {
      setError(err.message || "Failed to load experience.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchExperience();
  }, []);

  if (loading) {
    return <div className="p-8 text-center">Loading...</div>;
  }

  if (error) {
    return <div className="p-8 text-center text-red-600">Error: {error}</div>;
  }

  return (
    <main className="p-8">
      <h1 className="text-3xl font-bold mb-6 text-center">Manage Your Experience</h1>
      <ExperienceManager
        experience={experience}
        onExperienceUpdate={setExperience}
      />
    </main>
  );
}
