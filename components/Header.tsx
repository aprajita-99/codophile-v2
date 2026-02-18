"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Github, Search, Command, Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import SearchModal from "@/components/search/SearchModal";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  // ⌘K / Ctrl+K handler
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setIsSearchOpen(true);
      }
      if (e.key === "Escape") {
        setIsSearchOpen(false);
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 border-b border-white/5 bg-[#030014]/80 backdrop-blur-xl">
        {/* Dev Banner */}
        <div className="bg-[#020204] border-b border-white/5 relative overflow-hidden">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,transparent,rgba(124,58,237,0.1)_50%,transparent)] bg-[length:200%_100%] animate-shine opacity-60" />
          <div className="max-w-7xl mx-auto px-4 py-2 flex items-center justify-center gap-3 text-xs font-medium text-gray-400 relative z-10">
            <span className="bg-violet-500/10 text-violet-400 border border-violet-500/20 px-1.5 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider">
              Beta
            </span>
            <span>
              Codophile is currently in active development. Features may
              change rapidly! 🚀
            </span>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between gap-4">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 shrink-0">
            <img src="/logo.png" alt="Codophile Logo" className="w-8 h-8" />
            <span className="text-xl font-bold tracking-tight text-white">
              Codophile
            </span>
          </Link>

          {/* Desktop Search Trigger */}
          <div className="hidden md:flex flex-1 max-w-md relative mx-4">
            <button
              onClick={() => setIsSearchOpen(true)}
              className="w-full text-left pl-10 pr-10 py-2 border border-white/10 rounded-md bg-white/5 text-gray-400 hover:bg-white/10 transition-all"
            >
              Search documentation, templates…
            </button>

            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />

            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-600 text-xs border border-white/10 rounded px-1.5 py-0.5 flex items-center gap-1">
              <Command className="w-3 h-3" /> K
            </span>
          </div>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-4">
            <nav className="flex gap-6">
              {["Playground", "Templates", "Effects", "Docs", "About"].map(
                (item) => (
                  <Link
                    key={item}
                    href={`/${item.toLowerCase()}`}
                    className="text-sm text-gray-400 hover:text-white transition"
                  >
                    {item}
                  </Link>
                )
              )}
            </nav>

            <div className="h-6 w-px bg-white/10" />

            <a
              href="https://github.com/digicraft-one"
              target="_blank"
              className="p-2 text-gray-400 hover:text-white"
            >
              <Github className="w-5 h-5" />
            </a>

            <button className="px-4 py-2 bg-violet-600 text-white font-semibold">
              Get Started
            </button>
          </div>

          {/* Mobile Menu */}
          <div className="lg:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 text-gray-400"
            >
              {isMenuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-16 inset-x-0 bg-[#030014] z-40 p-6 lg:hidden"
          >
            {["Playground", "Templates", "Effects", "Docs", "About"].map(
              (item) => (
                <Link
                  key={item}
                  href={`/${item.toLowerCase()}`}
                  onClick={() => setIsMenuOpen(false)}
                  className="block py-3 text-gray-300"
                >
                  {item}
                </Link>
              )
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Search Modal */}
      {isSearchOpen && (
        <SearchModal onClose={() => setIsSearchOpen(false)} />
      )}
    </>
  );
}