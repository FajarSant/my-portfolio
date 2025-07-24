"use client";

import { useEffect, useState } from "react";
import { SkillsManager } from "@/components/admin/SKillsManager";
import { supabase, type Database } from "@/lib/supabase";
import { toast } from "sonner";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";

type Skill = Database["public"]["Tables"]["skills"]["Row"];

export default function AdminSkillsPage() {
  const [skills, setSkills] = useState<Skill[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSkills = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from("skills")
        .select("*")
        .order("name", { ascending: true });

      if (error) {
        toast.error("Failed to load skills: " + error.message);
      } else {
        setSkills(data);
      }

      setLoading(false);
    };

    fetchSkills();
  }, []);

  return (
    <main className=" mt-10 px-4 space-y-6">
    

      <Card>
        <CardHeader>
          <CardTitle>Manage Your Skills</CardTitle>
        </CardHeader>
      </Card>

      {loading ? (
        <p className="p-4">Loading skills...</p>
      ) : (
        <SkillsManager skills={skills} onSkillsUpdate={setSkills} />
      )}
    </main>
  );
}
