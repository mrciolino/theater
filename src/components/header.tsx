import { motion, AnimatePresence } from "motion/react";
import { ModeToggle } from "./mode-toggle";
import { FilmReel } from "./icons";
import { cn } from "@/lib/utils";
import { useTheme } from "@/components/theme-provider";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";

const Header = () => {
    const { theme } = useTheme();
    const isDark = theme === "dark";
    const [activeSection, setActiveSection] = useState("portfolio");
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    // Add scroll detection
    useEffect(() => {
        const handleScroll = () => {
            const sections = ["portfolio", "about", "contact"];
            const scrollPosition = window.scrollY + 100; // Offset for header height

            for (const section of sections) {
                const element = document.getElementById(section);
                if (element) {
                    const { offsetTop, offsetHeight } = element;
                    if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
                        setActiveSection(section);
                        break;
                    }
                }
            }
        };

        window.addEventListener("scroll", handleScroll);
        handleScroll(); // Check initial position

        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <motion.header
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className={cn(
                "fixed top-0 left-0 right-0 z-50",
                isDark
                    ? "bg-gradient-to-b from-neutral-900/90 via-neutral-800/60 to-transparent"
                    : "bg-gradient-to-b from-neutral-100/95 via-neutral-200/70 to-transparent"
            )}
        >
            <div className="container mx-auto max-w-6xl px-4 sm:px-6 py-3 sm:py-4 flex items-center justify-between">
                {/* nameplate */}
                <motion.div
                    className="flex items-center space-x-2 sm:space-x-3"
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.2 }}
                >
                    <motion.div
                        className="w-6 h-6 sm:w-8 sm:h-8 text-red-600"
                        animate={{ rotate: 360 }}
                        transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                    >
                        <FilmReel />
                    </motion.div>
                    <h1>
                        <button
                            type="button"
                            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                            aria-label="Scroll to top"
                            className={cn(
                                "text-lg sm:text-2xl font-bold tracking-wider transition-colors duration-300",
                                isDark ? "text-white" : "text-neutral-900"
                            )}
                        >
                            KATI FORTUNE
                        </button>
                    </h1>
                </motion.div>

                {/* Mobile menu button */}
                <button
                    className="md:hidden p-2 rounded-lg bg-neutral-100 dark:bg-neutral-800"
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    aria-label="Toggle mobile menu"
                >
                    <div className="w-5 h-5 flex flex-col justify-around">
                        <span className={cn("w-full h-0.5 transition-transform", isDark ? "bg-white" : "bg-neutral-900", isMobileMenuOpen && "rotate-45 translate-y-2")} />
                        <span className={cn("w-full h-0.5 transition-opacity", isDark ? "bg-white" : "bg-neutral-900", isMobileMenuOpen && "opacity-0")} />
                        <span className={cn("w-full h-0.5 transition-transform", isDark ? "bg-white" : "bg-neutral-900", isMobileMenuOpen && "-rotate-45 -translate-y-2")} />
                    </div>
                </button>

                {/* Desktop navigation */}
                <nav className="hidden md:flex justify-center flex-1">
                    <div className="flex bg-neutral-100 dark:bg-neutral-800 rounded-lg p-1">
                        {["Portfolio", "About", "Contact"].map((item, i) => (
                            <motion.div
                                key={item}
                                initial={{ opacity: 0, y: -20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.2 + i * 0.1, duration: 0.5 }}
                            >
                                <Button
                                    variant={activeSection === item.toLowerCase() ? "default" : undefined}
                                    size="sm"
                                    onClick={(e: React.MouseEvent) => {
                                        e.preventDefault();
                                        const id = item.toLowerCase();
                                        const el = document.getElementById(id);
                                        if (el) {
                                            el.scrollIntoView({ behavior: "smooth", block: "start" });
                                        }
                                    }}
                                    className={cn(
                                        "text-sm font-medium tracking-wide uppercase mx-1 cursor-none transition-all duration-300 bg-transparent",
                                        activeSection === item.toLowerCase()
                                            ? "bg-red-600 hover:bg-red-700 text-white"
                                            : isDark
                                                ? "text-white/90 hover:text-white hover:bg-red-500"
                                                : "text-neutral-700 hover:text-white hover:bg-red-500"
                                    )}
                                >
                                    {item}
                                </Button>
                            </motion.div>
                        ))}
                    </div>
                </nav>

                {/* mode toggle */}
                <motion.div
                    className="hidden md:flex items-center"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.5, duration: 0.5 }}
                >
                    <ModeToggle />
                </motion.div>
            </div>

            {/* Mobile Navigation Menu */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className={cn(
                            "md:hidden border-t",
                            isDark ? "bg-neutral-900/95 border-neutral-700" : "bg-neutral-100/95 border-neutral-300"
                        )}
                    >
                        <div className="container mx-auto px-4 py-4">
                            <div className="flex flex-col space-y-3">
                                {["Portfolio", "About", "Contact"].map((item) => (
                                    <Button
                                        key={item}
                                        variant={activeSection === item.toLowerCase() ? "default" : "ghost"}
                                        size="lg"
                                        onClick={(e: React.MouseEvent) => {
                                            e.preventDefault();
                                            setIsMobileMenuOpen(false);

                                            const id = item.toLowerCase();
                                            const el = document.getElementById(id);
                                            if (el) {
                                                // Force a small delay to ensure menu closes first
                                                requestAnimationFrame(() => {
                                                    const yOffset = -80;
                                                    const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;

                                                    window.scrollTo({
                                                        top: y,
                                                        behavior: 'smooth'
                                                    });
                                                });
                                            }
                                        }}
                                        className={cn(
                                            "w-full justify-start text-base font-medium tracking-wide uppercase transition-all duration-300",
                                            activeSection === item.toLowerCase()
                                                ? "bg-red-600 hover:bg-red-700 text-white"
                                                : isDark
                                                    ? "text-white/90 hover:text-white hover:bg-neutral-800"
                                                    : "text-neutral-700 hover:text-neutral-900 hover:bg-neutral-200"
                                        )}
                                    >
                                        {item}
                                    </Button>
                                ))}
                                <div className="pt-2">
                                    <ModeToggle />
                                </div>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.header>
    );
};

export default Header;
