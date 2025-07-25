"use client";

import { Card, CardContent } from "@/components/ui/card";
import {
  Briefcase,
  FolderOpen,
  GraduationCap,
  Code,
} from "lucide-react";
import { type Database } from "@/lib/supabase";

type Skill = Database["public"]["Tables"]["skills"]["Row"];
type Education = Database["public"]["Tables"]["education"]["Row"];
type Experience = Database["public"]["Tables"]["experience"]["Row"];
type Project = Database["public"]["Tables"]["projects"]["Row"];

interface StatsOverviewProps {
  skills: Skill[];
  education: Education[];
  experience: Experience[];
  projects: Project[];
}

export function StatsOverview({
  skills,
  education,
  experience,
  projects,
}: StatsOverviewProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      <Card>
        <CardContent className="p-4 text-center">
          <Code className="w-8 h-8 mx-auto mb-2 text-green-500" />
          <p className="text-2xl font-bold">{skills.length}</p>
          <p className="text-sm text-muted-foreground">Skills</p>
        </CardContent>
      </Card>
      <Card>
        <CardContent className="p-4 text-center">
          <Briefcase className="w-8 h-8 mx-auto mb-2 text-purple-500" />
          <p className="text-2xl font-bold">{experience.length}</p>
          <p className="text-sm text-muted-foreground">Experience</p>
        </CardContent>
      </Card>
      <Card>
        <CardContent className="p-4 text-center">
          <FolderOpen className="w-8 h-8 mx-auto mb-2 text-orange-500" />
          <p className="text-2xl font-bold">{projects.length}</p>
          <p className="text-sm text-muted-foreground">Projects</p>
        </CardContent>
      </Card>
      <Card>
        <CardContent className="p-4 text-center">
          <GraduationCap className="w-8 h-8 mx-auto mb-2 text-cyan-500" />
          <p className="text-2xl font-bold">{education.length}</p>
          <p className="text-sm text-muted-foreground">Education</p>
        </CardContent>
      </Card>
    </div>
  );
}
