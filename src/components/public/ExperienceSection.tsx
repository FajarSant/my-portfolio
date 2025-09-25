"use client";

import { motion } from "framer-motion";
import { Briefcase } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Database } from "@/lib/supabase";

type Experience = Database["public"]["Tables"]["experience"]["Row"];

interface ExperienceSectionProps {
  experience: Experience[] | null; // null = loading
}

const colorSchemes = [
  {
    bgLight: "bg-cyan-500/20",
    bgDark: "bg-cyan-500/30",
    textLight: "text-cyan-400",
    textDark: "text-cyan-300",
    borderLight: "border-cyan-500/30",
    borderDark: "border-cyan-400/50",
  },
  {
    bgLight: "bg-blue-500/20",
    bgDark: "bg-blue-500/30",
    textLight: "text-blue-400",
    textDark: "text-blue-300",
    borderLight: "border-blue-500/30",
    borderDark: "border-blue-400/50",
  },
  {
    bgLight: "bg-purple-500/20",
    bgDark: "bg-purple-500/30",
    textLight: "text-purple-400",
    textDark: "text-purple-300",
    borderLight: "border-purple-500/30",
    borderDark: "border-purple-400/50",
  },
  {
    bgLight: "bg-green-500/20",
    bgDark: "bg-green-500/30",
    textLight: "text-green-400",
    textDark: "text-green-300",
    borderLight: "border-green-500/30",
    borderDark: "border-green-400/50",
  },
  {
    bgLight: "bg-pink-500/20",
    bgDark: "bg-pink-500/30",
    textLight: "text-pink-400",
    textDark: "text-pink-300",
    borderLight: "border-pink-500/30",
    borderDark: "border-pink-400/50",
  },
  {
    bgLight: "bg-orange-500/20",
    bgDark: "bg-orange-500/30",
    textLight: "text-orange-400",
    textDark: "text-orange-300",
    borderLight: "border-orange-500/30",
    borderDark: "border-orange-400/50",
  },
  {
    bgLight: "bg-indigo-500/20",
    bgDark: "bg-indigo-500/30",
    textLight: "text-indigo-400",
    textDark: "text-indigo-300",
    borderLight: "border-indigo-500/30",
    borderDark: "border-indigo-400/50",
  },
  {
    bgLight: "bg-teal-500/20",
    bgDark: "bg-teal-500/30",
    textLight: "text-teal-400",
    textDark: "text-teal-300",
    borderLight: "border-teal-500/30",
    borderDark: "border-teal-400/50",
  },
];

export function ExperienceSection({ experience }: ExperienceSectionProps) {
  const isLoading = experience === null;



  function truncateWords(text: string, wordLimit: number) {
  const words = text.split(/\s+/);
  if (words.length <= wordLimit) return text;
  return words.slice(0, wordLimit).join(" ") + "...";
}

  return (
    <section
      id="experience"
      className="py-20 px-6 min-h-screen bg-gray-100 dark:bg-gray-900/30 transition-colors duration-500"
    >
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl font-bold mb-4 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent"
          >
            Experience
          </motion.h2>
          <div className="w-20 h-1 bg-gradient-to-r from-cyan-400 to-blue-500 mx-auto"></div>
        </div>

        <div className="space-y-8">
          {/* Skeleton Loading */}
          {isLoading &&
            Array.from({ length: 3 }).map((_, idx) => (
              <Card
                key={idx}
                className="bg-gray-100 dark:bg-gray-900/30 backdrop-blur-sm"
              >
                <CardContent className="p-8">
                  <div className="flex items-start space-x-4">
                    {/* Icon */}
                    <Skeleton className="w-12 h-12 rounded-lg" />
                    <div className="flex-1 space-y-3">
                      <Skeleton className="h-6 w-40" />
                      <Skeleton className="h-4 w-28" />
                      <Skeleton className="h-20 w-full" />
                      <div className="flex gap-2">
                        <Skeleton className="h-6 w-16 rounded" />
                        <Skeleton className="h-6 w-20 rounded" />
                        <Skeleton className="h-6 w-24 rounded" />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}

          {/* Data */}
          {!isLoading && experience.length > 0
            ? experience.map((exp, index) => {
                const colorScheme = colorSchemes[index % colorSchemes.length];
                return (
                  <motion.div
                    key={exp.id}
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                  >
                    <Card className="bg-gray-100 dark:bg-gray-900/30 backdrop-blur-sm transition-all duration-300">
                      <CardContent className="p-8">
                        <div className="flex items-start space-x-4">
                          {/* Icon */}
                          <div
                            className={`p-3 rounded-lg ${colorScheme.bgLight} dark:${colorScheme.bgDark}`}
                          >
                            <Briefcase
                              className={`w-8 h-8 ${colorScheme.textLight} dark:${colorScheme.textDark}`}
                            />
                          </div>

                          {/* Content */}
                          <div className="flex-1">
                            <div className="flex justify-between items-start mb-4">
                              <div>
                                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                                  {exp.position}
                                </h3>
                                <p
                                  className={`font-medium ${colorScheme.textLight} dark:${colorScheme.textDark}`}
                                  dangerouslySetInnerHTML={{
                                    __html: exp.company,
                                  }}
                                />
                              </div>
                              <Badge
                                className={`
                                ${colorScheme.bgLight} ${colorScheme.textLight} ${colorScheme.borderLight}
                                dark:${colorScheme.bgDark} dark:${colorScheme.textDark} dark:${colorScheme.borderDark}
                              `}
                              >
                                {new Date(exp.start_date).getFullYear()} -{" "}
                                {exp.end_date
                                  ? new Date(exp.end_date).getFullYear()
                                  : "Present"}
                              </Badge>
                            </div>

                            <div className="text-gray-700 dark:text-gray-300 mb-4 text-justify leading-relaxed whitespace-pre-line">
                              {truncateWords(exp.description || "", 50)}
                            </div>

                            <div className="flex flex-wrap gap-2">
                              {exp.technologies.map((tech) => (
                                <Badge
                                  key={tech}
                                  variant="secondary"
                                  className="bg-gray-200 dark:bg-gray-800 text-gray-800 dark:text-gray-300"
                                >
                                  {tech}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                );
              })
            : !isLoading &&
              Array.from({ length: 2 }).map((_, idx) => (
                <Card
                  key={idx}
                  className="bg-gray-100 dark:bg-gray-900/30 backdrop-blur-sm"
                >
                  <CardContent className="p-8">
                    <div className="flex items-start space-x-4">
                      <Skeleton className="w-12 h-12 rounded-lg" />
                      <div className="flex-1 space-y-3">
                        <Skeleton className="h-6 w-40" />
                        <Skeleton className="h-4 w-28" />
                        <Skeleton className="h-20 w-full" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
        </div>
      </div>
    </section>
  );
}
