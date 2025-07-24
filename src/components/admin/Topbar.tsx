"use client";

import { useEffect, useState } from "react";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useIsMounted } from "@/hooks/useIsMounted";

export function Topbar() {
  const [time, setTime] = useState<string>("");
  const { setTheme, theme } = useTheme();
  const isMounted = useIsMounted();

  useEffect(() => {
    if (!isMounted) return;

    const updateTime = () => {
      const now = new Date();
      setTime(
        now.toLocaleTimeString("id-ID", {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        })
      );
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, [isMounted]);

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  if (!isMounted) return null; // 🔒 Mencegah render sebelum client mount

  return (
    <div className="flex items-center justify-between px-4 h-14 border-b bg-background shadow-sm w-full">
      <SidebarTrigger />
      <div className="text-sm font-medium text-muted-foreground">{time}</div>
      <button
        onClick={toggleTheme}
        className="p-2 rounded-full hover:bg-muted transition-colors"
        aria-label="Toggle Theme"
      >
        {theme === "dark" ? (
          <Sun size={18} className="text-yellow-400" />
        ) : (
          <Moon size={18} className="text-blue-500" />
        )}
      </button>
    </div>
  );
}