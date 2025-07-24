"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Home, Code, Folder, Mail, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { usePathname, useRouter } from "next/navigation";
import { Button } from "../ui/button";

export default function Navbar() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    setMounted(true);
  }, []);

  const navLinks = [
    { href: "/", label: "Home", icon: Home },
    { href: "/skills", label: "Skills", icon: Code },
    { href: "/projects", label: "Projects", icon: Folder },
    { href: "/contact", label: "Contact", icon: Mail },
  ];

  const handleNavClick = (href: string) => {
    router.push(href);
  };

  const toggleTheme = () => setTheme(theme === "dark" ? "light" : "dark");

 return (
    <>
      {/* Navbar Atas (logo + nama + toggle theme) — tampil hanya di md ke atas */}
      <nav className="fixed top-0 w-full z-50 bg-white/50 dark:bg-gray-900/70 backdrop-blur-xl border-b border-gray-200 dark:border-gray-700 shadow-md h-16 px-6 flex items-center justify-between md:flex">
        <div className="flex items-center space-x-2">
          <Home className="w-6 h-6 text-cyan-500 dark:text-cyan-400" />
          <span className="text-cyan-500 dark:text-cyan-400 font-semibold text-lg">
            MyApp
          </span>
        </div>
        <div>
          {mounted && (
            <Button
              onClick={toggleTheme}
              aria-label="Toggle Dark Mode"
              variant={"outline"}
            >
              {theme === "dark" ? (
                <Sun className="w-5 h-5 text-yellow-400 drop-shadow-md" />
              ) : (
                <Moon className="w-5 h-5 text-cyan-600 drop-shadow-md" />
              )}
            </Button>
          )}
        </div>
      </nav>

      {/* Bottom Nav for Mobile — tampil hanya di bawah md */}
      <nav className="md:hidden fixed bottom-0 w-full z-50 bg-white/70 dark:bg-gray-900/70 backdrop-blur-md border-t border-gray-200 dark:border-gray-700 shadow-inner flex justify-around items-center h-14">
        {navLinks.map(({ href, label, icon: Icon }) => {
          const isActive = pathname === href;
          return (
            <motion.button
              key={href}
              onClick={() => handleNavClick(href)}
              className="flex flex-col items-center justify-center focus:outline-none"
              whileTap={{ scale: 0.9 }}
              aria-current={isActive ? "page" : undefined}
              title={label}
              type="button"
            >
              <Icon
                className={`w-6 h-6 transition-colors ${
                  isActive
                    ? "text-cyan-500 dark:text-cyan-400 drop-shadow-lg"
                    : "text-gray-500 dark:text-gray-400 hover:text-cyan-400 dark:hover:text-cyan-300"
                }`}
              />
              <span
                className={`text-[10px] mt-1 ${
                  isActive
                    ? "text-cyan-500 dark:text-cyan-400 font-semibold"
                    : "text-gray-500 dark:text-gray-400"
                }`}
              >
                {label}
              </span>
            </motion.button>
          );
        })}
      </nav>

      {/* Padding supaya konten tidak tertutup navbar */}
      <div className="pt-16 pb-14 md:pt-16 md:pb-0" />
    </>
  );
}
