"use client";
import React from "react";
import Link from "next/link";
import { Github, Twitter, Linkedin, Mail, Heart } from "lucide-react";

export default function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="relative bg-[#030014] border-t border-white/5 pt-20 pb-10 overflow-hidden">
            {/* Decorative Elements */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px bg-linear-to-r from-transparent via-indigo-500/50 to-transparent shadow-[0_0_10px_rgba(99,102,241,0.5)]" />

            <div className="max-w-7xl mx-auto px-6 relative z-10 w-full">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 mb-16">
                    {/* Brand Column */}
                    <div className="space-y-6">
                        <div className="flex items-center gap-2">
                            <div className="relative w-8 h-8 flex items-center justify-center">
                                <img src="/logo.png" alt="Codophile Logo" className="w-full h-full object-contain" />
                            </div>
                            <span className="text-xl font-bold tracking-tight text-white">
                                Codophile
                            </span>
                        </div>
                        <p className="text-gray-400 text-sm leading-relaxed max-w-xs">
                            The ultimate visual CSS editor and component generator for modern developers.
                            Design at the speed of thought.
                        </p>
                        <div className="flex items-center gap-4">
                            {[
                                { icon: Github, href: "https://github.com/digicraft-one", label: "GitHub" },
                                { icon: Twitter, href: "https://twitter.com", label: "Twitter" },
                                { icon: Linkedin, href: "https://www.linkedin.com/company/digicraft-tech/", label: "LinkedIn" },
                                { icon: Mail, href: "mailto:hello@codophile.in", label: "Email" },
                            ].map((social, idx) => (
                                <a
                                    key={idx}
                                    href={social.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="p-2 rounded-lg bg-white/5 text-gray-400 hover:text-white hover:bg-white/10 transition-colors border border-white/5"
                                    aria-label={social.label}
                                >
                                    <social.icon size={18} />
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Product Links */}
                    <div>
                        <h4 className="text-white font-semibold mb-6">Product</h4>
                        <ul className="space-y-4">
                            {[
                                { label: "Features", href: "#features" },
                                { label: "Templates", href: "#templates" },
                                { label: "Integration", href: "#integration" },
                                { label: "Changelog", href: "/changelog" },
                                { label: "Roadmap", href: "/roadmap" },
                            ].map((link, idx) => (
                                <li key={idx}>
                                    <Link
                                        href={link.href}
                                        className="text-gray-400 hover:text-indigo-400 transition-colors text-sm"
                                    >
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Resources Links */}
                    <div>
                        <h4 className="text-white font-semibold mb-6">Resources</h4>
                        <ul className="space-y-4">
                            {[
                                { label: "Documentation", href: "/docs" },
                                { label: "API Reference", href: "/docs/api" },
                                { label: "Community", href: "/community" },
                                { label: "Blog", href: "/blog" },
                                { label: "Help Center", href: "/help" },
                            ].map((link, idx) => (
                                <li key={idx}>
                                    <Link
                                        href={link.href}
                                        className="text-gray-400 hover:text-indigo-400 transition-colors text-sm"
                                    >
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Company Links */}
                    <div>
                        <h4 className="text-white font-semibold mb-6">Company</h4>
                        <ul className="space-y-4">
                            {[
                                { label: "About", href: "/about" },
                                { label: "Careers", href: "/careers" },
                                { label: "Legal", href: "/legal" },
                                { label: "Privacy Policy", href: "/privacy" },
                                { label: "Terms of Service", href: "/terms" },
                            ].map((link, idx) => (
                                <li key={idx}>
                                    <Link
                                        href={link.href}
                                        className="text-gray-400 hover:text-indigo-400 transition-colors text-sm"
                                    >
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4">
                    <p className="text-gray-500 text-xs">
                        © {currentYear} Codophile. A product of <span className="text-gray-300 font-medium">DigiCraft Innovation Pvt. Ltd.</span> All rights reserved.
                    </p>
                    <div className="flex items-center gap-2 text-xs text-gray-500">
                        <span>Made with</span>
                        <Heart size={12} className="text-red-500 fill-red-500" />
                        <span>in India</span>
                    </div>
                </div>
            </div>
        </footer>
    );
}
