import { useEffect, useState } from "react";
import Header from "./header";
import PerformanceModal from "./modal";
import { motion, AnimatePresence } from "motion/react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const Hero = () => {
    const featuredShows = [
        { title: "Hamlet", description: "A powerful portrayal of Shakespeare's tragic prince, exploring themes of revenge, madness, and mortality in a contemporary setting.", image: "/example_landscape.jpg", category: "Classical Drama", year: "2024", role: "Featured" },
        { title: "Les Misérables", description: "An emotional journey through 19th-century France, bringing Victor Hugo's masterpiece to life with stunning vocals and choreography.", image: "/example_landscape.jpg", category: "Musical Theater", year: "2023", role: "Featured" },
        { title: "A Streetcar Named Desire", description: "Tennessee Williams' intense drama of desire and destruction, featuring complex characters and raw emotional performances.", image: "/example_landscape.jpg", category: "Contemporary Drama", year: "2024", role: "Featured" }
    ];
    const theaterHighlights = [
        { title: "Macbeth", role: "Lady Macbeth", year: "2024", image: "/example_vertical.jpg" },
        { title: "Romeo & Juliet", role: "Juliet", year: "2023", image: "/example_vertical.jpg" },
        { title: "The Glass Menagerie", role: "Laura", year: "2023", image: "/example_vertical.jpg" },
        { title: "Death of a Salesman", role: "Linda Loman", year: "2022", image: "/example_vertical.jpg" },
        { title: "A Doll's House", role: "Nora", year: "2022", image: "/example_vertical.jpg" },
        { title: "The Tempest", role: "Miranda", year: "2021", image: "/example_vertical.jpg" },
        { title: "Who's Afraid of Virginia Woolf?", role: "Honey", year: "2021", image: "/example_vertical.jpg" },
        { title: "Cat on a Hot Tin Roof", role: "Maggie", year: "2020", image: "/example_vertical.jpg" }
    ];
    type Performance = {
        title: string;
        image: string;
        year: string;
        description?: string;
        category?: string;
        role: string;
        gallery?: string[];
        story?: string;
        venue?: string;
        director?: string;
        duration?: string;
    };

    const [currentFeatured, setCurrentFeatured] = useState<number>(0);
    const [selectedPerformance, setSelectedPerformance] = useState<Performance | null>(null);
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    useEffect(() => { const interval = setInterval(() => setCurrentFeatured(p => (p + 1) % featuredShows.length), 8000); return () => clearInterval(interval); }, []);

    const handlePerformanceClick = (performance: Performance) => {
        setSelectedPerformance(performance);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedPerformance(null);
    };

    return (
        <div className="relative min-h-screen w-full bg-neutral-200 dark:bg-neutral-900 overflow-hidden">
            <Header />
            <div className="relative h-[60vh] sm:h-[50vh] overflow-hidden">
                <AnimatePresence>
                    {featuredShows.map((s, i) => i === currentFeatured && (
                        <motion.div key={i} className="absolute inset-0 overflow-hidden"
                            initial={{ opacity: 0, scale: 1.05 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.98 }}
                            transition={{ duration: 1.2, ease: [0.4, 0, 0.2, 1] }}>
                            <motion.div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${s.image})` }}
                                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 1.2, ease: "easeInOut" }} />
                            <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent" />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                            <div className="relative h-full flex items-center">
                                <div className="container mx-auto px-4 sm:px-6 max-w-2xl">
                                    <motion.span initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.3, duration: 0.6 }}
                                        className="text-red-500 text-xs sm:text-sm font-semibold uppercase tracking-wider mb-2 sm:mb-3 block">{s.category} • {s.year}</motion.span>
                                    <motion.h1 initial={{ opacity: 0, y: 25 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5, duration: 0.6 }}
                                        className="text-3xl sm:text-5xl md:text-7xl font-bold text-white mb-4 sm:mb-6 leading-tight">{s.title}</motion.h1>
                                    <motion.p initial={{ opacity: 0, y: 25 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7, duration: 0.6 }}
                                        className="text-sm sm:text-lg text-white/90 mb-6 sm:mb-8 leading-relaxed">{s.description}</motion.p>
                                    <motion.div initial={{ opacity: 0, y: 25 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.9, duration: 0.6 }}>
                                        <Button
                                            size="lg"
                                            className="bg-red-600 hover:bg-red-700 text-white font-semibold px-6 sm:px-8 py-3 sm:py-4 transition-colors rounded-xl shadow-md cursor-none hover:scale-105 w-full sm:w-auto"
                                            onClick={() => handlePerformanceClick(s)}
                                        >
                                            View Performance
                                        </Button>
                                    </motion.div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </AnimatePresence>
                <div className="absolute bottom-4 sm:bottom-8 left-4 sm:left-6 flex space-x-2">
                    {featuredShows.map((_, i) => (
                        <motion.button key={i} onClick={() => setCurrentFeatured(i)}
                            className={cn("h-1 rounded-full transition-all duration-300 touch-manipulation", i === currentFeatured ? "bg-neutral-400 w-8 sm:w-12" : "bg-white/30 w-6 sm:w-8")}
                            whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} />
                    ))}
                </div>
            </div>

            <motion.div id="portfolio" className="relative py-8 sm:py-12 bg-neutral-200 dark:bg-neutral-900" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.1, duration: 1 }}>
                <div className="container mx-auto px-4 sm:px-6">
                    <motion.h2 className="text-xl sm:text-2xl font-bold text-neutral-900 dark:text-white mb-2 sm:mb-3"
                        initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.5, duration: 0.8 }}>Theater Highlights</motion.h2>
                    <motion.p className="text-xs sm:text-sm text-neutral-700 dark:text-neutral-300 mb-4 sm:mb-6"
                        initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.6, duration: 0.6 }}>Tap any image to expand and view more details.</motion.p>
                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
                        {theaterHighlights.map((show, i) => (
                            <motion.div
                                key={i}
                                className="group touch-manipulation"
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 1.2 + i * 0.1, duration: 0.6 }}
                                onClick={() => handlePerformanceClick(show)}
                            >
                                <motion.div
                                    className="relative aspect-[3/4] border-2 sm:border-4 border-transparent rounded-lg overflow-hidden transition-all duration-300 group-hover:border-red-500 group-active:border-red-500"
                                    whileHover={{
                                        scale: 1.075,
                                        rotateX: Math.round((Math.abs(Math.sin(i * 12.9898) * 43758.5453) % 1) * 20 - 10),
                                        rotateY: Math.round((Math.abs(Math.sin((i + 7) * 7.1234) * 12345.678) % 1) * 20 - 10),
                                        transition: { duration: 0.1 } // instant tilt on hover
                                    }}
                                    whileTap={{ scale: 0.95 }}
                                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                                    style={{ transformStyle: "preserve-3d", transformPerspective: 1000 }}
                                >
                                    <img src={show.image} alt={`${show.title} - ${show.role}`} className="w-full h-full object-cover rounded-lg shadow-xl" />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 group-active:opacity-100 transition-opacity duration-300 rounded-lg" />
                                    <div className="absolute bottom-0 left-0 right-0 p-2 sm:p-4 translate-y-4 group-hover:translate-y-0 group-active:translate-y-0 opacity-0 group-hover:opacity-100 group-active:opacity-100 transition-all duration-300">
                                        <p className="text-white text-sm sm:text-lg font-medium">{show.title}</p>
                                        <p className="text-white/70 text-xs sm:text-md">{show.role} • {show.year}</p>
                                    </div>
                                </motion.div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </motion.div>

            <PerformanceModal
                isOpen={isModalOpen}
                onClose={closeModal}
                performance={selectedPerformance}
            />
        </div>
    );
};
export default Hero;
