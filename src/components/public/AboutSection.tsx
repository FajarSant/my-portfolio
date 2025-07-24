import { motion } from "framer-motion";
import { Briefcase, Globe, Trophy, Code, MapPin, Phone } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Database } from "@/lib/supabase";

type Profile = Database["public"]["Tables"]["profile"]["Row"];

interface PortfolioStats {
  total_projects: number;
  total_skills: number;
  years_experience: number;
}

interface AboutSectionProps {
  profile: Profile | null;
  stats: PortfolioStats;
}

export function AboutSection({ profile, stats }: AboutSectionProps) {
  return (
    <section
      id="about"
      className="py-20 px-6 bg-white dark:bg-gray-900 transition-colors duration-500"
    >
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl font-bold mb-4
                       bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent"
          >
            About Me
          </motion.h2>
          <div className="w-20 h-1 bg-gradient-to-r from-cyan-400 to-blue-500 mx-auto"></div>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
              {profile?.bio ||
                "Passionate Computer Engineering graduate with a specialized focus on Flutter development. I create beautiful, performant mobile applications that deliver exceptional user experiences across both iOS and Android platforms."}
            </p>
            <div className="flex flex-wrap gap-4 text-gray-700 dark:text-gray-300">
              {profile?.location && (
                <div className="flex items-center space-x-2">
                  <MapPin className="w-5 h-5 text-cyan-400" />
                  <span>{profile.location}</span>
                </div>
              )}
              {profile?.phone && (
                <div className="flex items-center space-x-2">
                  <Phone className="w-5 h-5 text-cyan-400" />
                  <span>{profile.phone}</span>
                </div>
              )}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Card className="bg-gray-100 dark:bg-gray-800 border-gray-300 dark:border-gray-700 backdrop-blur-sm transition-colors duration-500">
              <CardContent className="p-8">
                <div className="grid grid-cols-2 gap-6 text-center text-gray-900 dark:text-gray-100">
                  <div>
                    <Briefcase className="w-12 h-12 text-blue-500 dark:text-blue-400 mx-auto mb-4" />
                    <h3 className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-2">
                      {stats.years_experience}+
                    </h3>
                    <p className="font-medium">Years Experience</p>
                  </div>
                  <div>
                    <Globe className="w-12 h-12 text-green-600 dark:text-green-400 mx-auto mb-4" />
                    <h3 className="text-3xl font-bold text-green-700 dark:text-green-400 mb-2">
                      {stats.total_projects}
                    </h3>
                    <p className="font-medium">Projects Completed</p>
                  </div>
                  <div>
                    <Trophy className="w-12 h-12 text-yellow-500 dark:text-yellow-400 mx-auto mb-4" />
                    <h3 className="text-3xl font-bold text-yellow-600 dark:text-yellow-400 mb-2">
                      {stats.total_skills}
                    </h3>
                    <p className="font-medium">Technologies Mastered</p>
                  </div>
                  <div>
                    <Code className="w-12 h-12 text-purple-600 dark:text-purple-400 mx-auto mb-4" />
                    <h3 className="text-3xl font-bold text-purple-700 dark:text-purple-400 mb-2">
                      100%
                    </h3>
                    <p className="font-medium">Clean Code</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
