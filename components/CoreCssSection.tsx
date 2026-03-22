"use client";
import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Code2, Palette } from "lucide-react";

export default function CoreCssSection() {
    return (
        <section className="py-20 relative overflow-hidden" id="core-css">
            <div className="max-w-7xl w-full mx-auto px-6 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5 }}
                        viewport={{ once: true }}
                    >
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-indigo-500/30 bg-indigo-500/10 text-indigo-400 text-sm mb-6">
                            <Code2 size={16} />
                            <span>Core Fundamentals</span>
                        </div>
                        <h2 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-linear-to-r from-indigo-400 to-cyan-400 mb-6">
                            Master the Art of <br /> Pure CSS
                        </h2>
                        <p className="text-gray-500 dark:text-gray-400 text-lg leading-relaxed mb-8">
                            Dive deep into the cascade. Control every pixel with precision using
                            standard CSS properties. No abstractions, just pure styling power
                            for those who demand absolute control over their design implementation.
                        </p>

                        <div className="flex flex-col gap-4">
                            <div className="flex items-start gap-4">
                                <div className="p-2 rounded-lg bg-gray-800 text-indigo-400">
                                    <Palette size={24} />
                                </div>
                                <div>
                                    <h3 className="text-xl font-semibold text-foreground mb-2">Css Variable Tokens</h3>
                                    <p className="text-gray-500 dark:text-gray-400 text-sm">Define your design system using native CSS custom properties for dynamic theming.</p>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        viewport={{ once: true }}
                        className="relative"
                    >
                        <div className="absolute -inset-1 bg-linear-to-r from-indigo-500 to-cyan-500 rounded-2xl blur opacity-30 animate-pulse"></div>
                        <div className="relative rounded-2xl bg-gray-900 border border-gray-800 p-2 overflow-hidden aspect-video flex items-center justify-center">
                            <Image
                                src="/core_css_visual_1770356429591.png"
                                alt="Core CSS Visualization"
                                width={600}
                                height={400}
                                className="w-full h-full object-cover rounded-xl"
                            />
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
