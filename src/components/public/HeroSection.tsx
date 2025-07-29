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
      id="home"
      className="relative min-h-screen flex items-center justify-center bg-white dark:bg-gray-900 px-6 py-20 overflow-hidden"
    >
      {/* Background blob */}
      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-gradient-to-br from-cyan-400 to-blue-500 rounded-full blur-[120px] opacity-30 z-0"></div>

      <div className="relative z-10 max-w-7xl w-full grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        {/* Gambar di atas untuk mobile */}
        <div className="block md:hidden">
          {profile?.avatar_url && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="relative w-full max-w-[220px] sm:max-w-[260px] mx-auto mb-8"
            >
              <div className="absolute -z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[250px] h-[250px] bg-gradient-to-br from-cyan-400 to-blue-500 rounded-full blur-[100px] opacity-30"></div>

              <div className="relative rounded-xl overflow-hidden shadow-2xl border border-white/10 backdrop-blur-lg">
                <Image
                  src={profile.avatar_url}
                  alt="Profile"
                  width={300}
                  height={300}
                  className="w-full h-auto object-cover rounded-xl"
                />
              </div>

              <div className="absolute top-2 right-2 bg-gradient-to-r from-pink-500 to-red-500 text-white text-[10px] px-2 py-1 rounded shadow font-semibold">
                GRAPHIC DESIGN
              </div>
              <div className="absolute top-1/2 -left-8 -translate-y-1/2 rotate-[-90deg] bg-gradient-to-r from-purple-500 to-indigo-500 text-white text-[10px] px-2 py-1 rounded shadow font-semibold">
                UI/UX
              </div>
              <div className="absolute bottom-2 left-2 bg-gradient-to-r from-yellow-400 to-orange-500 text-white text-[10px] px-2 py-1 rounded shadow font-semibold">
                BRANDING
              </div>
            </motion.div>
          )}
        </div>

        {/* Kiri: Teks */}
        <div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-2xl md:text-5xl font-bold mb-4 text-gray-900 dark:text-white text-center md:text-left"
          >
            Hi, I’m{" "}
            <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              <TypingText
                words={[profile?.name || "Your Name"]}
                loop={true}
                className="inline "
              />
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-lg md:text-xl text-gray-700 dark:text-gray-300 mb-6 text-center md:text-left"
          >
            {profile?.title || "Mobile App Developer | Cross-Platform Expert"}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="flex flex-wrap justify-center md:justify-start gap-4 mb-8"
          >
            <Button
              onClick={() => onScrollToSection("contact")}
              className="bg-cyan-600 hover:bg-cyan-700 text-white px-6 py-3 rounded-md"
            >
              Contact Me
            </Button>
            <Button
              variant="outline"
              onClick={() => onScrollToSection("projects")}
              className="border border-cyan-600 text-cyan-600 hover:bg-cyan-50 px-6 py-3 rounded-md"
            >
              Projects →
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex justify-center md:justify-start space-x-4"
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
        </div>

        {/* Gambar hanya muncul di kanan untuk desktop */}
        <div className="hidden md:block">
          {profile?.avatar_url && (
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative w-full max-w-[320px] mx-auto"
            >
              <div className="absolute -z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[360px] h-[360px] bg-gradient-to-br from-cyan-400 to-blue-500 rounded-full blur-[100px] opacity-30"></div>

              <div className="relative rounded-xl overflow-hidden shadow-2xl border border-white/10 backdrop-blur-lg">
                <Image
                  src={profile.avatar_url}
                  alt="Profile"
                  width={400}
                  height={400}
                  className="w-full h-auto object-cover rounded-xl"
                />
              </div>

              <div className="absolute top-2 right-2 bg-gradient-to-r from-pink-500 to-red-500 text-white text-xs px-3 py-1 rounded shadow font-semibold">
                FULLSTACK
              </div>
              <div className="absolute top-1/2 -left-12 -translate-y-1/2 rotate-[-90deg] bg-gradient-to-r from-purple-500 to-indigo-500 text-white text-xs px-3 py-1 rounded shadow font-semibold">
                UI/UX
              </div>
              <div className="absolute bottom-2 left-2 bg-gradient-to-r from-yellow-400 to-orange-500 text-white text-xs px-3 py-1 rounded shadow font-semibold">
                BRANDING
              </div>
            </motion.div>
          )}
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce z-9">
        <ChevronDown className="w-6 h-6 text-cyan-400 dark:text-cyan-300" />
      </div>
    </section>
  );
}
