"use client";

import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import { effectsData } from "./data";

export default function EffectsPage() {
    return (
        <div className="min-h-screen bg-[#030014] text-white selection:bg-pink-500/30 font-sans overflow-hidden">
            <Header />

            {/* Background */}
            <div className="absolute inset-0 -z-10">
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-size-[24px_24px] mask-[radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
            </div>

            <main className="pt-32 pb-20 px-6 max-w-7xl mx-auto">

                {/* Hero Section */}
                <div className="text-center mb-20">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-pink-500/10 border border-pink-500/20 text-pink-400 text-xs font-semibold uppercase tracking-widest mb-6"
                    >
                        <Sparkles className="w-3 h-3" /> Visual Magic
                    </motion.div>
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-4xl md:text-7xl font-bold tracking-tight mb-6"
                    >
                        Cool CSS <span className="text-transparent bg-clip-text bg-linear-to-r from-pink-400 via-purple-400 to-indigo-400 animate-gradient-x">Effects</span>
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="text-gray-400 text-lg max-w-2xl mx-auto leading-relaxed"
                    >
                        A curated collection of stunning visual effects, ready to copy-paste.
                        Explore, tweak, and implement modern UI magic.
                    </motion.p>
                </div>

                {/* Effects Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {effectsData.map((effect, idx) => (
                        <EffectCard key={effect.id} effect={effect} index={idx} />
                    ))}
                </div>

            </main>
            <Footer />
        </div>
    );
}

function EffectCard({ effect, index }: { effect: any, index: number }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 + 0.3 }}
        >
            <Link href={`/effects/${effect.id}`} className="group relative block h-full">
                <div className="absolute inset-0 bg-linear-to-r from-pink-600 to-purple-600 rounded-2xl opacity-0 group-hover:opacity-10 blur-xl transition-opacity duration-500" />
                <div className="relative h-full bg-[#0a0a0a]/50 backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden flex flex-col transition-all duration-300 hover:border-pink-500/30 hover:-translate-y-1">

                    {/* Preview Window (Mini) */}
                    <div className="h-48 bg-[#111] relative overflow-hidden flex items-center justify-center p-4 group-hover:bg-[#151515] transition-colors">
                        {/* Grid Pattern */}
                        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-size-[16px_16px]" />

                        {/* Render the specific visual based on ID - A simplified version for the card */}
                        <div className="relative z-10 pointer-events-none scale-75">
                            {effect.id === 'neon-button' && (
                                <div className="px-6 py-2 border-2 border-[#03e9f4] text-[#03e9f4] shadow-[0_0_15px_#03e9f4] rounded uppercase tracking-widest font-bold">
                                    Neon
                                </div>
                            )}
                            {effect.id === 'glass-morphism' && (
                                <div className="w-32 h-20 bg-white/10 backdrop-blur-md border border-white/20 rounded-xl shadow-lg flex items-center justify-center">
                                    <span className="text-xs text-white/70">Glass</span>
                                </div>
                            )}
                            {effect.id === 'magnetic-button' && (
                                <div className="px-6 py-3 bg-indigo-600 text-white rounded-full shadow-lg">
                                    Magnetic
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Content */}
                    <div className="p-6 flex-1 flex flex-col">
                        <h3 className="text-xl font-bold mb-2 group-hover:text-pink-400 transition-colors">{effect.title}</h3>
                        <p className="text-gray-400 text-sm leading-relaxed mb-6 line-clamp-2">
                            {effect.description}
                        </p>
                        <div className="mt-auto flex items-center text-sm font-medium text-pink-300 group-hover:gap-2 transition-all">
                            View Code <ArrowRight className="w-4 h-4 ml-1" />
                        </div>
                    </div>
                </div>
            </Link>
        </motion.div>
    );
}
