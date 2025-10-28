import { useState } from "react";
import { motion } from "motion/react";
import { useTheme } from "@/components/theme-provider";
import { cn } from "@/lib/utils";
import { ReactIcon, MotionIcon, ViteIcon } from "./icons";
import ResumeModal from "./resume-modal";

const Footer = () => {
    const { theme } = useTheme();
    const isDark = theme === "dark";
    const [isResumeModalOpen, setIsResumeModalOpen] = useState(false);

    const socialMedia = [
        { name: "Instagram", icon: "📷", href: "#" },
        { name: "Twitter", icon: "🐦", href: "#" },
        { name: "LinkedIn", icon: "💼", href: "#" },
        { name: "IMDb", icon: "🎬", href: "#" }
    ];

    return (
        <footer className={cn(
            "transition-colors duration-300 border-t",
            isDark
                ? "bg-neutral-900 border-neutral-700"
                : "bg-neutral-100 border-neutral-300"
        )}>
            <div className="container mx-auto px-6 py-12">
                <div className="grid md:grid-cols-1 gap-8 place-items-center text-center">

                    {/* Brand Section */}
                    <div className="md:col-span-1">
                        <motion.div
                            className="flex items-center justify-center space-x-3 mb-6"
                            whileHover={{ scale: 1.02 }}
                            transition={{ duration: 0.2 }}
                        >
                            <h3 className={cn(
                                "text-2xl font-bold tracking-wider text-center",
                                isDark ? "text-white" : "text-neutral-900"
                            )}>
                                KATI FORTUNE
                            </h3>
                        </motion.div>
                        <p className={cn(
                            "text-lg leading-relaxed mb-6 max-w-md mx-auto",
                            isDark ? "text-neutral-300" : "text-neutral-700"
                        )}>
                            Bringing stories to life through passionate performances and authentic character portrayals in film and theater.
                        </p>
                        <div className="flex gap-4 justify-center">
                            {socialMedia.map((social) => (
                                <motion.a
                                    key={social.name}
                                    href={social.href}
                                    className={cn(
                                        "w-10 h-10 rounded-full flex items-center justify-center transition-colors duration-300 cursor-none",
                                        isDark
                                            ? "bg-neutral-800 hover:bg-red-600 text-white border border-neutral-700"
                                            : "bg-white hover:bg-red-600 text-neutral-900 hover:text-white border border-neutral-300"
                                    )}
                                    whileHover={{ scale: 1.25 }}
                                    whileTap={{ scale: 0.9 }}
                                    aria-label={social.name}
                                >
                                    <span className="text-sm">{social.icon}</span>
                                </motion.a>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className={cn(
                    "mt-12 pt-8 border-t flex flex-col md:flex-row justify-between items-center gap-4",
                    isDark ? "border-neutral-700" : "border-neutral-300"
                )}>
                    <p className={cn(
                        "text-sm",
                        isDark ? "text-neutral-400" : "text-neutral-600"
                    )}>
                        © {new Date().getFullYear()} Kati Fortune. All rights reserved.
                    </p>
                    <div className={cn(
                        "flex items-center gap-4 text-sm r justify-center flex-wrap gap-2 sm:gap-4 text-sm",
                        isDark ? "text-neutral-400" : "text-neutral-600"
                    )}>
                        {[
                            { icon: <ReactIcon />, label: "React" },
                            { icon: <MotionIcon />, label: "Motion" },
                            { icon: <ViteIcon />, label: "Vite" },
                            { emoji: "❤️", label: "Love" }
                        ].map((item) => (
                            <motion.span
                                key={item.label}
                                className="inline-flex items-center gap-2"
                                whileHover={{ y: -3, scale: 1.05 }}
                                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                                title={`Built with ${item.label}`}
                                aria-label={item.label}
                            >
                                {item.icon ? (
                                    <span className="w-4 h-4">{item.icon}</span>
                                ) : (
                                    <span className="text-lg">{item.emoji}</span>
                                )}
                                <span className="leading-none">{item.label}</span>
                            </motion.span>
                        ))}
                    </div>
                </div>
            </div>

            <ResumeModal
                isOpen={isResumeModalOpen}
                onClose={() => setIsResumeModalOpen(false)}
            />
        </footer>
    );
};

export default Footer;
