import { motion } from "motion/react";
import { useTheme } from "@/components/theme-provider";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { FilmProjector } from "./icons";
import ResumeModal from "./resume-modal";
import { useState } from "react";

const InfoCard = ({ title, items, isDark }: { title: string; items: string[]; isDark: boolean }) => (
    <div className={cn("p-8 rounded-xl shadow-lg transition-colors duration-300", isDark ? "bg-neutral-700 border border-neutral-600" : "bg-neutral-200 border border-neutral-300")}>
        <h3 className={cn("text-2xl font-bold mb-4", isDark ? "text-white" : "text-neutral-900")}>{title}</h3>
        <ul className={cn("space-y-3", isDark ? "text-neutral-300" : "text-neutral-700")}>
            {items.map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                    <span className="w-2 h-2 bg-red-600 rounded-full mt-2 flex-shrink-0" />
                    <span>{item}</span>
                </li>
            ))}
        </ul>
    </div>
);

const About = () => {
    const { theme } = useTheme();
    const isDark = theme === "dark";
    const [isResumeModalOpen, setIsResumeModalOpen] = useState(false);

    return (
        <section id="about" className={cn("py-12 sm:py-20 px-4 sm:px-6 transition-colors duration-300", isDark ? "bg-neutral-800" : "bg-neutral-100")}>
            <div className="container mx-auto max-w-6xl">
                <motion.div initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} viewport={{ once: true }} className="text-center mb-12 sm:mb-16">
                    <div className="relative w-20 h-14 sm:w-24 sm:h-16 mx-auto mb-6 sm:mb-8">
                        {/* Static Film Projector */}
                        <div className="absolute inset-0 text-red-600">
                            <FilmProjector />
                        </div>

                        {/* Flickering Projection Cone */}
                        <motion.div
                            animate={{
                                opacity: [0.3, 0.7, 0.4, 0.8, 0.5],
                            }}
                            transition={{
                                duration: 2,
                                repeat: Infinity,
                                ease: "easeInOut"
                            }}
                        >
                            <div
                                className="absolute -right-11 top-4 w-16 h-12 bg-gradient-to-r from-yellow-200/40 to-transparent"
                                style={{
                                    clipPath: "polygon(0 40%, 100% 0%, 100% 100%, 0 60%)",
                                }}
                            />
                        </motion.div>
                    </div>

                    <h2 className={cn("text-3xl sm:text-4xl md:text-6xl font-bold mb-4 sm:mb-6 tracking-tight", isDark ? "text-white" : "text-neutral-900")}>About Kati Fortune</h2>
                    <div className="w-20 sm:w-24 h-1 bg-red-600 mx-auto" />
                </motion.div>

                <div className="grid lg:grid-cols-2 gap-8 sm:gap-16 items-center">
                    <motion.div initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, delay: 0.2 }} viewport={{ once: true }} className="space-y-4 sm:space-y-6">
                        <div className={cn("text-base sm:text-lg leading-relaxed space-y-3 sm:space-y-4", isDark ? "text-neutral-300" : "text-neutral-700")}>
                            <p>Kati Fortune is an accomplished actress with over a decade of experience bringing compelling characters to life in both indie and major productions.</p>
                            <p>Born in Los Angeles, she honed her craft at Juilliard, developing the foundational skills that define her nuanced performances.</p>
                            <p>She’s worked with renowned directors and earned critical acclaim for her authenticity and dedication to storytelling.</p>
                        </div>
                        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="pt-4 sm:pt-6">
                            <Button
                                onClick={() => setIsResumeModalOpen(true)}
                                size="lg"
                                className="bg-red-600 hover:bg-red-700 text-white font-semibold px-6 sm:px-8 py-3 sm:py-4 transition-all duration-300 shadow-lg hover:shadow-xl cursor-none w-full sm:w-auto"
                            >
                                <svg className="w-4 h-4 sm:w-5 sm:h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                </svg>
                                View Acting Resume
                            </Button>
                        </motion.div>
                    </motion.div>

                    <motion.div initial={{ opacity: 0, x: 50 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, delay: 0.4 }} viewport={{ once: true }} className="space-y-6 sm:space-y-8">
                        <InfoCard
                            title="Career Highlights"
                            isDark={isDark}
                            items={[
                                'Lead role in "Shadows at Dawn"',
                                'Supporting actress in Netflix series "Metropolitan"',
                                "Theatre performances at Lincoln Center and Broadway",
                                "Recipient of Regional Emmy Award for Outstanding",
                            ]}
                        />
                        <InfoCard
                            title="Training & Education"
                            isDark={isDark}
                            items={[
                                "MFA in Acting, The Juilliard School",
                                "Method Acting with Stella Adler Studio",
                                "Screen Acting Intensive at UCLA Extension",
                            ]}
                        />
                    </motion.div>
                </div>
            </div>

            <ResumeModal
                isOpen={isResumeModalOpen}
                onClose={() => setIsResumeModalOpen(false)}
            />
        </section>
    );
};

export default About;
