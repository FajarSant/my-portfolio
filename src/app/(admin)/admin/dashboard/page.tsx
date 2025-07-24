"use client"
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

export default function Profile() {
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProfile = async () => {
      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser();

      if (userError || !user) {
        console.error("Gagal mendapatkan user:", userError?.message);
        setLoading(false);
        return;
      }

      const { data: profileData, error: profileError } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", user.id) // <-- hubungkan lewat ID
        .single();

      if (profileError) {
        console.error("Gagal mendapatkan profil:", profileError.message);
      } else {
        setProfile(profileData);
      }

      setLoading(false);
    };

    loadProfile();
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <h1>Welcome, {profile?.full_name || "User"}</h1>
      <p>Email: {profile?.email}</p>
      <pre>{JSON.stringify(profile, null, 2)}</pre>
    </div>
  );
}
