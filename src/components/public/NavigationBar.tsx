"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Moon,
  Sun,
  Code,
  Folder,
  Mail,
  GraduationCap,
  Briefcase,
  Info,
} from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { Database } from "@/lib/supabase";

type Profile = Database["public"]["Tables"]["profile"]["Row"];

interface NavigationBarProps {
  profile: Profile | null;
  activeSection: string;
  onScrollToSection: (sectionId: string) => void;
}

const navItems = [
  { id: "about", name: "About", icon: Info },
  { id: "experience", name: "Experience", icon: Briefcase },
  { id: "projects", name: "Projects", icon: Folder },
  { id: "skills", name: "Skills", icon: Code },
  { id: "education", name: "Education", icon: GraduationCap },
  { id: "contact", name: "Contact", icon: Mail },
];

export function NavigationBar({
  profile,
  activeSection,
  onScrollToSection,
}: NavigationBarProps) {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => setMounted(true), []);

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <>
      {/* Top Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-white/70 dark:bg-gray-900/70 backdrop-blur-xl border-b border-gray-200 dark:border-gray-700 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          {/* Logo or Name */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent"
          >
            {profile?.name || "Flutter Dev"}
          </motion.div>

          {/* Right Side - Desktop nav + theme toggle */}
          <div className="flex items-center gap-6">
            {/* Desktop Navigation */}
            <div className="hidden md:flex gap-6">
              {navItems.map(({ id, name }) => (
                <button
                  key={id}
                  onClick={() => onScrollToSection(id)}
                  className={`relative text-sm font-medium transition-colors ${
                    activeSection === id
                      ? "text-cyan-500 dark:text-cyan-400"
                      : "text-gray-700 dark:text-gray-300 hover:text-cyan-500 dark:hover:text-cyan-300"
                  }`}
                >
                  {name}
                  {activeSection === id && (
                    <motion.div
                      layoutId="underline"
                      className="absolute bottom-0 left-0 w-full h-0.5 bg-cyan-400"
                      transition={{ type: "spring", stiffness: 300, damping: 25 }}
                    />
                  )}
                </button>
              ))}
            </div>

            {/* Theme Toggle */}
            {mounted && (
              <Button
                onClick={toggleTheme}
                variant="outline"
                size="icon"
                aria-label="Toggle Theme"
              >
                {theme === "dark" ? (
                  <Sun className="w-5 h-5 text-yellow-400" />
                ) : (
                  <Moon className="w-5 h-5 text-cyan-600" />
                )}
              </Button>
            )}
          </div>
        </div>
      </nav>

      {/* Mobile Navigation */}
      <nav className="md:hidden fixed bottom-0 w-full z-50 bg-white/70 dark:bg-gray-900/70 backdrop-blur-xl border-t border-gray-200 dark:border-gray-700 shadow-inner flex justify-around items-center h-14">
        {navItems.map(({ id, name, icon: Icon }) => {
          const isActive = activeSection === id;
          return (
            <motion.button
              key={id}
              onClick={() => onScrollToSection(id)}
              whileTap={{ scale: 0.9 }}
              className="flex flex-col items-center justify-center focus:outline-none"
              aria-current={isActive ? "page" : undefined}
              aria-label={name}
              type="button"
            >
              <Icon
                className={`w-6 h-6 transition-colors ${
                  isActive
                    ? "text-cyan-500 dark:text-cyan-400 drop-shadow-md"
                    : "text-gray-500 dark:text-gray-400 hover:text-cyan-500 dark:hover:text-cyan-300"
                }`}
              />
              <span
                className={`text-[10px] mt-1 ${
                  isActive
                    ? "text-cyan-500 dark:text-cyan-400 font-medium"
                    : "text-gray-500 dark:text-gray-400"
                }`}
              >
                {name}
              </span>
            </motion.button>
          );
        })}
      </nav>
    </>
  );
}
