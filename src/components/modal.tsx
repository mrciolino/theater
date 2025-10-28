import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useTheme } from "@/components/theme-provider";
import { cn } from "@/lib/utils";

interface PerformanceModalProps {
    isOpen: boolean;
    onClose: () => void;
    performance: {
        title: string;
        role: string;
        year: string;
        image: string;
        description?: string;
        story?: string;
        gallery?: string[];
        venue?: string;
        director?: string;
        duration?: string;
    } | null;
}

const PerformanceModal: React.FC<PerformanceModalProps> = ({ isOpen, onClose, performance }) => {
    const { theme } = useTheme();
    const isDark = theme === "dark";
    const [lightboxImage, setLightboxImage] = useState<string | null>(null);

    if (!performance) return null;

    const handleImageClick = (imageSrc: string) => {
        setLightboxImage(imageSrc);
    };

    const closeLightbox = () => {
        setLightboxImage(null);
    };

    const performanceDetails = {
        "Macbeth": {
            description: "Shakespeare's darkest tragedy comes alive in this haunting portrayal of ambition and guilt.",
            story: "This modern adaptation of Macbeth explores the psychological depths of Lady Macbeth's manipulation and descent into madness. Set in a contemporary corporate world, the production reimagines the Scottish play as a tale of corporate ambition gone wrong. My portrayal of Lady Macbeth focused on the character's vulnerability beneath her steely exterior, showing how power corrupts and ultimately destroys.",
            venue: "Lincoln Center Theater",
            director: "Sarah Chen",
            duration: "2 hours 45 minutes",
            gallery: [
                "/example_vertical.jpg",
                "/example_vertical.jpg",
                "/example_vertical.jpg",
                "/example_vertical.jpg"
            ]
        },
        "Romeo & Juliet": {
            description: "A timeless tale of love and tragedy, reimagined for modern audiences.",
            story: "This production of Romeo & Juliet transported the classic story to 1960s Verona, capturing the social upheaval of the era. Playing Juliet required finding the balance between youthful innocence and fierce determination. The challenge was making this well-known character feel fresh and real, focusing on her journey from sheltered teenager to a young woman willing to defy everything for love.",
            venue: "Broadway Theater",
            director: "Marcus Rodriguez",
            duration: "3 hours 15 minutes",
            gallery: [
                "/example_vertical.jpg",
                "/example_vertical.jpg",
                "/example_vertical.jpg",
                "/example_vertical.jpg"
            ]
        },
        "The Glass Menagerie": {
            description: "Tennessee Williams' memory play explores family, dreams, and the fragility of hope.",
            story: "Playing Laura Wingfield in this intimate production was both challenging and deeply rewarding. Laura's physical and emotional fragility required a delicate touch - showing her strength within vulnerability. The production emphasized the dreamlike quality of memory, with lighting and staging that shifted between reality and Tom's recollections. My approach focused on Laura's inner world and her connection to her glass collection as a metaphor for her own fragile beauty.",
            venue: "Off-Broadway Playhouse",
            director: "Elena Thompson",
            duration: "2 hours 30 minutes",
            gallery: [
                "/example_vertical.jpg",
                "/example_vertical.jpg",
                "/example_vertical.jpg",
                "/example_vertical.jpg"
            ]
        }
    };

    const details = performanceDetails[performance.title as keyof typeof performanceDetails] || {
        description: "A powerful theatrical performance showcasing exceptional talent and storytelling.",
        story: "This production represents a significant milestone in my theatrical journey, offering unique challenges and opportunities for character development.",
        venue: "Regional Theater",
        director: "Theater Director",
        duration: "2 hours 30 minutes",
        gallery: [
            "/example_vertical.jpg",
            "/example_vertical.jpg",
            "/example_vertical.jpg",
            "/example_vertical.jpg"
        ]
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-50 flex items-center justify-center p-4"
                    onClick={onClose}
                >
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
                    />

                    {/* Modal */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8, y: 50 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.8, y: 50 }}
                        transition={{ type: "spring", damping: 25, stiffness: 300 }}
                        className={cn(
                            "relative w-full max-w-6xl max-h-[90vh] overflow-y-auto rounded-2xl shadow-2xl",
                            isDark ? "bg-neutral-800" : "bg-neutral-100"
                        )}
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Close Button */}
                        <button
                            onClick={onClose}
                            className={cn(
                                "absolute top-6 right-6 z-10 w-10 h-10 rounded-full flex items-center justify-center transition-colors",
                                isDark
                                    ? "bg-neutral-700 hover:bg-neutral-600 text-white"
                                    : "bg-white hover:bg-neutral-200 text-neutral-900"
                            )}
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>

                        {/* Hero Image */}
                        <div className="relative h-48 md:h-64 lg:h-80 overflow-hidden rounded-t-2xl">
                            <img
                                src={performance.image}
                                alt={performance.title}
                                className="w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                            <div className="absolute bottom-3 md:bottom-6 left-3 md:left-6 text-white">
                                <motion.h2
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.2 }}
                                    className="text-2xl md:text-4xl lg:text-5xl font-bold mb-1 md:mb-2"
                                >
                                    {performance.title}
                                </motion.h2>
                                <motion.p
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.3 }}
                                    className="text-lg md:text-xl text-white/90"
                                >
                                    {performance.role} • {performance.year}
                                </motion.p>
                            </div>
                        </div>

                        {/* Content */}
                        <div className="p-4 md:p-6 lg:p-8">
                            <div className="grid lg:grid-cols-3 gap-4 md:gap-6 lg:gap-8">
                                {/* Main Content */}
                                <div className="lg:col-span-2 space-y-4 md:space-y-6">
                                    <motion.div
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.4 }}
                                    >
                                        <h3 className={cn(
                                            "text-xl md:text-2xl font-bold mb-2 md:mb-4",
                                            isDark ? "text-white" : "text-neutral-900"
                                        )}>
                                            About the Performance
                                        </h3>
                                        <p className={cn(
                                            "text-sm md:text-base lg:text-lg leading-relaxed",
                                            isDark ? "text-neutral-300" : "text-neutral-700"
                                        )}>
                                            {details.description}
                                        </p>
                                    </motion.div>

                                    <motion.div
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.5 }}
                                    >
                                        <h4 className={cn(
                                            "text-lg md:text-xl font-semibold mb-2 md:mb-3",
                                            isDark ? "text-white" : "text-neutral-900"
                                        )}>
                                            My Journey with This Role
                                        </h4>
                                        <p className={cn(
                                            "text-sm md:text-base leading-relaxed",
                                            isDark ? "text-neutral-300" : "text-neutral-700"
                                        )}>
                                            {details.story}
                                        </p>
                                    </motion.div>

                                    {/* Gallery */}
                                    <motion.div
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.6 }}
                                    >
                                        <h4 className={cn(
                                            "text-lg md:text-xl font-semibold mb-3 md:mb-4",
                                            isDark ? "text-white" : "text-neutral-900"
                                        )}>
                                            Behind the Scenes
                                        </h4>
                                        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-3">
                                            {details.gallery.map((img, index) => (
                                                <motion.div
                                                    key={index}
                                                    initial={{ opacity: 0, scale: 0.8 }}
                                                    animate={{ opacity: 1, scale: 1 }}
                                                    transition={{ delay: 0.7 + index * 0.1 }}
                                                    whileHover={{ scale: 1.05 }}
                                                    className="relative aspect-[3/4] rounded-lg overflow-hidden shadow-md cursor-none border-2 hover:border-red-400"
                                                    onClick={() => handleImageClick(img)}
                                                >
                                                    <img
                                                        src={img}
                                                        alt={`${performance.title} gallery ${index + 1}`}
                                                        className="w-full h-full object-cover"
                                                    />
                                                </motion.div>
                                            ))}
                                        </div>
                                    </motion.div>
                                </div>

                                {/* Sidebar */}
                                <div className="space-y-6">
                                    <motion.div
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: 0.4 }}
                                        className={cn(
                                            "p-6 rounded-xl",
                                            isDark ? "bg-neutral-700" : "bg-white border border-neutral-300"
                                        )}
                                    >
                                        <h4 className={cn(
                                            "text-lg font-semibold mb-4",
                                            isDark ? "text-white" : "text-neutral-900"
                                        )}>
                                            Production Details
                                        </h4>
                                        <div className="space-y-3">
                                            <div>
                                                <span className={cn(
                                                    "text-sm font-medium",
                                                    isDark ? "text-neutral-400" : "text-neutral-600"
                                                )}>
                                                    Venue
                                                </span>
                                                <p className={cn(
                                                    "font-medium",
                                                    isDark ? "text-white" : "text-neutral-900"
                                                )}>
                                                    {details.venue}
                                                </p>
                                            </div>
                                            <div>
                                                <span className={cn(
                                                    "text-sm font-medium",
                                                    isDark ? "text-neutral-400" : "text-neutral-600"
                                                )}>
                                                    Director
                                                </span>
                                                <p className={cn(
                                                    "font-medium",
                                                    isDark ? "text-white" : "text-neutral-900"
                                                )}>
                                                    {details.director}
                                                </p>
                                            </div>
                                            <div>
                                                <span className={cn(
                                                    "text-sm font-medium",
                                                    isDark ? "text-neutral-400" : "text-neutral-600"
                                                )}>
                                                    Duration
                                                </span>
                                                <p className={cn(
                                                    "font-medium",
                                                    isDark ? "text-white" : "text-neutral-900"
                                                )}>
                                                    {details.duration}
                                                </p>
                                            </div>
                                            <div>
                                                <span className={cn(
                                                    "text-sm font-medium",
                                                    isDark ? "text-neutral-400" : "text-neutral-600"
                                                )}>
                                                    Year
                                                </span>
                                                <p className={cn(
                                                    "font-medium",
                                                    isDark ? "text-white" : "text-neutral-900"
                                                )}>
                                                    {performance.year}
                                                </p>
                                            </div>
                                        </div>
                                    </motion.div>

                                </div>
                            </div>
                        </div>
                    </motion.div>
                </motion.div>
            )}

            {/* Lightbox */}
            <AnimatePresence>
                {lightboxImage && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[60] flex items-center justify-center p-4"
                        onClick={closeLightbox}
                    >
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="absolute inset-0 bg-black/90 backdrop-blur-sm"
                        />

                        {/* Close Button */}
                        <button
                            onClick={closeLightbox}
                            className={cn(
                                "absolute top-6 right-6 z-10 w-10 h-10 rounded-full flex items-center justify-center transition-colors",
                                "bg-neutral-700 hover:bg-neutral-600 text-white"
                            )}
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>

                        <motion.img
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.8 }}
                            src={lightboxImage}
                            alt="Gallery image"
                            className="relative max-w-[90vw] max-h-[90vh] object-contain rounded-lg shadow-2xl"
                            onClick={(e) => e.stopPropagation()}
                        />
                    </motion.div>
                )}
            </AnimatePresence>
        </AnimatePresence>
    );
};

export default PerformanceModal;
