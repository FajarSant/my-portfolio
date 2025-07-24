"use client";

import { useEffect, useState } from "react";
import { supabase, type Database } from "@/lib/supabase";
import { toast } from "sonner";
import ProfileForm from "@/components/admin/ProfileForm";
import { EducationManager } from "@/components/admin/EducationManager";

type Profile = Database["public"]["Tables"]["profile"]["Row"];
type Education = Database["public"]["Tables"]["education"]["Row"];

export default function AdminProfilePage() {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loadingProfile, setLoadingProfile] = useState(true);

  // State untuk education
  const [education, setEducation] = useState<Education[]>([]);
  const [loadingEducation, setLoadingEducation] = useState(true);

  useEffect(() => {
    // Fetch profil
    async function fetchProfile() {
      const { data, error } = await supabase
        .from("profile")
        .select("*")
        .limit(1)
        .single();

      if (error) {
        toast.error("Gagal mendapatkan profil: " + error.message);
        setLoadingProfile(false);
        return;
      }

      setProfile(data);
      setLoadingProfile(false);
    }

    // Fetch education
    async function fetchEducation() {
      const { data, error } = await supabase
        .from("education")
        .select("*")
        .order("start_date", { ascending: false });

      if (error) {
        toast.error("Gagal mendapatkan pendidikan: " + error.message);
        setLoadingEducation(false);
        return;
      }

      setEducation(data || []);
      setLoadingEducation(false);
    }

    fetchProfile();
    fetchEducation();
  }, []);

  const handleProfileUpdate = (updatedProfile: Profile) => {
    setProfile(updatedProfile);
  };

  const handleEducationUpdate = (updatedEducation: Education[]) => {
    setEducation(updatedEducation);
  };

  if (loadingProfile || loadingEducation)
    return <div className="p-8">Memuat profil dan pendidikan...</div>;

  return (
    <main className="mt-4 p-4">
      <ProfileForm profile={profile} onProfileUpdate={handleProfileUpdate} />
      <EducationManager education={education} onEducationUpdate={handleEducationUpdate} />
    </main>
  );
}
