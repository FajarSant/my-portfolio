"use client";

import { motion } from "framer-motion";
import { ChevronDown, Github, Linkedin, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { type Database } from "@/lib/supabase";
import TypingText from "@/components/public/TextTyping";

type Profile = Database["public"]["Tables"]["profile"]["Row"];

interface HeroSectionProps {
  profile: Profile | null;
  onScrollToSection: (sectionId: string) => void;
}

export function HeroSection({ profile, onScrollToSection }: HeroSectionProps) {
  return (
    <section
      id="hero"
      className="min-h-screen min-w-screen flex items-center justify-center relative overflow-hidden
                 bg-white dark:bg-gray-900 transition-colors duration-500"
    >
      {/* Background gradients with light/dark mode adjustments */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900/10 dark:from-blue-900/30 via-purple-900/10 dark:via-purple-900/30 to-cyan-900/10 dark:to-cyan-900/30"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(0,212,255,0.05),transparent_50%)] dark:bg-[radial-gradient(circle_at_50%_50%,rgba(0,212,255,0.2),transparent_50%)]"></div>

      <div className="relative z-10 text-center mx-auto px-6">
        <div className="mb-8">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-5xl md:text-7xl font-bold mb-6 pb-2
                       bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent"
          >
            <span className="block text-gray-900 dark:text-gray-200">
              Hello, I am
            </span>
            <TypingText
              words={[profile?.name || "Your Name"]}
              loop={true}
              className="block bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent"
            />
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl md:text-2xl
                       text-gray-700 dark:text-gray-300 mb-8"
          >
            {profile?.title || "Mobile App Developer | Cross-Platform Expert"}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex justify-center space-x-6 mb-12"
          >
            {profile?.github_url && (
              <a
                href={profile.github_url}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 bg-gray-200 dark:bg-gray-800 rounded-full
                           hover:bg-cyan-500/20 dark:hover:bg-cyan-600/30
                           transition-all duration-300 hover:scale-110"
              >
                <Github className="w-6 h-6 text-gray-800 dark:text-gray-200" />
              </a>
            )}
            {profile?.linkedin_url && (
              <a
                href={profile.linkedin_url}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 bg-gray-200 dark:bg-gray-800 rounded-full
                           hover:bg-cyan-500/20 dark:hover:bg-cyan-600/30
                           transition-all duration-300 hover:scale-110"
              >
                <Linkedin className="w-6 h-6 text-gray-800 dark:text-gray-200" />
              </a>
            )}
            {profile?.email && (
              <a
                href={`mailto:${profile.email}`}
                className="p-3 bg-gray-200 dark:bg-gray-800 rounded-full
                           hover:bg-cyan-500/20 dark:hover:bg-cyan-600/30
                           transition-all duration-300 hover:scale-110"
              >
                <Mail className="w-6 h-6 text-gray-800 dark:text-gray-200" />
              </a>
            )}
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <Button
            onClick={() => onScrollToSection("about")}
            className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700
                       text-white px-8 py-3 rounded-full transition-all duration-300 hover:scale-105
                       shadow-lg hover:shadow-cyan-500/25"
          >
            Explore My Work
          </Button>
        </motion.div>

        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <ChevronDown className="w-6 h-6 text-cyan-400 dark:text-cyan-300" />
        </div>
      </div>
    </section>
  );
}
