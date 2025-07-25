"use client";

import { motion } from "framer-motion";
import { ChevronDown, Github, Linkedin, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { type Database } from "@/lib/supabase";
import TypingText from "@/components/public/TextTyping";
import Image from "next/image";

type Profile = Database["public"]["Tables"]["profile"]["Row"];

interface HeroSectionProps {
  profile: Profile | null;
  onScrollToSection: (sectionId: string) => void;
}

export function HeroSection({ profile, onScrollToSection }: HeroSectionProps) {
  return (
    <section
      id="hero"
      className="min-h-screen flex items-center justify-center relative overflow-hidden
                 bg-white dark:bg-gray-900 transition-colors duration-500 px-6"
    >
      {/* Background layers */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900/10 dark:from-blue-900/30 via-purple-900/10 dark:via-purple-900/30 to-cyan-900/10 dark:to-cyan-900/30" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(0,212,255,0.05),transparent_50%)] dark:bg-[radial-gradient(circle_at_50%_50%,rgba(0,212,255,0.2),transparent_50%)]" />

      <div className="relative z-10 max-w-6xl w-full mx-auto flex flex-col-reverse md:flex-row items-center md:items-start justify-between gap-12 py-12">
        {/* Left Content: Text */}
        <div className="text-center md:text-left flex-1">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl md:text-6xl font-bold mb-4 pb-2"
          >
            <span className="block text-gray-900 dark:text-gray-200 mb-2">
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
            className="text-lg md:text-xl text-gray-700 dark:text-gray-300 mb-6"
          >
            {profile?.title || "Mobile App Developer | Cross-Platform Expert"}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="flex justify-center md:justify-start space-x-6 mb-8"
          >
            {profile?.github_url && (
              <a
                href={profile.github_url}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 bg-gray-200 dark:bg-gray-800 rounded-full hover:bg-cyan-500/20 dark:hover:bg-cyan-600/30 transition-all duration-300 hover:scale-110"
              >
                <Github className="w-6 h-6 text-gray-800 dark:text-gray-200" />
              </a>
            )}
            {profile?.linkedin_url && (
              <a
                href={profile.linkedin_url}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 bg-gray-200 dark:bg-gray-800 rounded-full hover:bg-cyan-500/20 dark:hover:bg-cyan-600/30 transition-all duration-300 hover:scale-110"
              >
                <Linkedin className="w-6 h-6 text-gray-800 dark:text-gray-200" />
              </a>
            )}
            {profile?.email && (
              <a
                href={`mailto:${profile.email}`}
                className="p-3 bg-gray-200 dark:bg-gray-800 rounded-full hover:bg-cyan-500/20 dark:hover:bg-cyan-600/30 transition-all duration-300 hover:scale-110"
              >
                <Mail className="w-6 h-6 text-gray-800 dark:text-gray-200" />
              </a>
            )}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <Button
              onClick={() => onScrollToSection("about")}
              className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white px-8 py-3 rounded-full transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-cyan-500/25"
            >
              Explore My Work
            </Button>
          </motion.div>
        </div>

        {/* Right Content: Profile Image */}
        <div className="flex-1 flex justify-center md:justify-end">
          {profile?.avatar_url && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="w-48 h-48 md:w-64 md:h-64 rounded-full overflow-hidden shadow-lg border-4 border-cyan-400 dark:border-cyan-500"
            >
              <Image
                src={profile?.avatar_url || ""}
                alt={profile?.name || "Profile"}
                width={256}
                height={256}
                className="object-cover w-full h-full"
              />
            </motion.div>
          )}
        </div>
      </div>

      {/* Scroll Down Icon */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <ChevronDown className="w-6 h-6 text-cyan-400 dark:text-cyan-300" />
      </div>
    </section>
  );
}
