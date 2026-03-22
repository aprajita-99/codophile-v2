"use client";
import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Wind, Zap } from "lucide-react";

export default function TailwindSection() {
    return (
        <section className="py-20 relative overflow-hidden" id="tailwind-gen">
            {/* Background decorative elements */}
            <div className="absolute top-0 right-0 w-1/3 h-full bg-cyan-900/10 blur-[100px] pointer-events-none" />

            <div className="max-w-7xl w-full mx-auto px-6 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center lg:flex-row-reverse">
                    {/* Visual Side */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5 }}
                        viewport={{ once: true }}
                        className="order-2 lg:order-1"
                    >
                        <div className="relative rounded-2xl bg-slate-900 border border-slate-800 p-2 shadow-2xl overflow-hidden aspect-video flex items-center justify-center">
                            <Image
                                src="/tailwind_visual_1770356446795.png"
                                alt="Tailwind CSS Generation"
                                width={600}
                                height={400}
                                className="w-full h-full object-cover rounded-xl"
                            />
                        </div>
                    </motion.div>

                    {/* Text Side */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        viewport={{ once: true }}
                        className="order-1 lg:order-2"
                    >
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-cyan-500/30 bg-cyan-500/10 text-cyan-400 text-sm mb-6">
                            <Zap size={16} />
                            <span>Rapid Development</span>
                        </div>
                        <h2 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-linear-to-r from-cyan-400 to-teal-300 mb-6">
                            Tailwind CSS <br /> Generation
                        </h2>
                        <p className="text-gray-500 dark:text-gray-400 text-lg leading-relaxed mb-8">
                            Accelerate your workflow with utility-first CSS. Our engine intelligently generates
                            optimized Tailwind classes based on your design tokens, ensuring consistency and
                            reducing the bundle size of your final application.
                        </p>
                        <ul className="space-y-4">
                            {['Automatic Class Ordering', 'Conflict Resolution', 'Custom Config Integration'].map((item, idx) => (
                                <li key={idx} className="flex items-center gap-3 text-gray-300">
                                    <div className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                                    {item}
                                </li>
                            ))}
                        </ul>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
