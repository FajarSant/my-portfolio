"use client";
import { useEffect, useState } from "react";
import { AdminSidebar } from "@/components/admin/admin-sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AuthService } from "@/lib/auth";
import { supabase } from "@/lib/supabase";
import { Topbar } from "@/components/admin/Topbar";

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const [authChecked, setAuthChecked] = useState(false);

  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        const { user } = await AuthService.getCurrentUser();
        if (!user) {
          window.location.replace("/login");
          return;
        }
        setAuthChecked(true);
      } catch (error) {
        console.error("Auth check error:", error);
        window.location.replace("/login");
      }
    };

    checkAuthStatus();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!session) {
        window.location.replace("/login");
      }
    });

    return () => {
      subscription?.unsubscribe();
    };
  }, []);

  if (!authChecked) {
    return null;
  }

  return (
     <SidebarProvider>
      <div className="flex min-h-screen w-full bg-background text-foreground">
        <AdminSidebar />
        <div className="flex flex-col flex-1 min-w-0">
          <Topbar />
          <main className="flex-1 overflow-y-auto p-4 bg-muted dark:bg-muted/80">
            {children}
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}
