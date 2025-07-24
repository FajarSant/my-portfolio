"use client";

import {
  Home,
  User,
  FileBadge,
  Code2,
  Mail,
  BookText,
  BadgeCheck,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import clsx from "clsx";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

import { supabase, type Database } from "@/lib/supabase";

type Profile = Database["public"]["Tables"]["profile"]["Row"];

const menuItems = [
  { title: "Home", url: "home", icon: Home },
  { title: "Profile", url: "profile", icon: User },
  { title: "Skills", url: "skills", icon: FileBadge },
  { title: "Portfolio", url: "portfolio", icon: Code2 },
  { title: "Kontak Saya", url: "kontak", icon: Mail },
  { title: "Blog", url: "#blog", icon: BookText },
  { title: "Certificate", url: "#certificate", icon: BadgeCheck },
];

export function AdminSidebar() {
  const pathname = usePathname();
  const [profile, setProfile] = useState<Profile | null>(null);

  useEffect(() => {
    async function fetchProfile() {
      const { data, error } = await supabase
        .from("profile")
        .select("*")
        .limit(1)
        .single();

      if (!error && data) {
        setProfile(data);
      } else {
        console.error("Failed to load profile", error);
      }
    }

    fetchProfile();
  }, []);

  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent className="flex flex-col items-center py-8 px-4 mb-2 border-b-4">
            <div className="h-24 w-24 overflow-hidden rounded-full bg-gray-300">
              {profile?.avatar_url ? (
                <Image
                  src={profile.avatar_url}
                  alt="Profile Photo"
                  width={100}
                  height={100}
                  className="rounded-full w-full h-full object-cover object-top"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-gray-600">
                  ?
                </div>
              )}
            </div>

            <h1 className="text-xl font-bold mt-4">
              {profile?.name || "Your Name"}
            </h1>
            <p className="text-gray-500 p-2">{profile?.title || "Your Title"}</p>
          </SidebarGroupContent>

          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => {
                const isActive = pathname === item.url;
                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
                      <Link
                        href={item.url}
                        className={clsx(
                          "flex items-center gap-3 px-4 py-5 transition-colors rounded-md",
                          {
                            "bg-gray-700 text-white font-semibold": isActive,
                            "hover:bg-gray-600 hover:text-white": !isActive,
                          }
                        )}
                      >
                        <item.icon className="w-5 h-5" />
                        <span className="text-lg">{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
