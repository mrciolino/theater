import React from "react";
import { motion, AnimatePresence } from "motion/react";
import { useTheme } from "@/components/theme-provider";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface ResumeModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const ResumeModal: React.FC<ResumeModalProps> = ({ isOpen, onClose }) => {
    const { theme } = useTheme();
    const isDark = theme === "dark";

    const handleDownload = () => {
        // Create a link element and trigger download from data folder
        const link = document.createElement('a');
        link.href = '/src/data/resume.pdf';
        link.download = 'Kati_Fortune_Acting_Resume.pdf';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
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

                    {/* Modal - 8.5x11 aspect ratio for standard letter size */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8, y: 50 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.8, y: 50 }}
                        transition={{ type: "spring", damping: 25, stiffness: 300 }}
                        className={cn(
                            "relative w-full max-w-3xl rounded-2xl shadow-2xl overflow-hidden",
                            "aspect-[8.5/11] max-h-[90vh]",
                            isDark ? "bg-neutral-800" : "bg-neutral-100"
                        )}
                        onClick={(e) => e.stopPropagation()}
                        style={{
                            // Ensure the modal maintains proper proportions
                            maxWidth: 'min(90vw, 750px)',
                            height: 'auto'
                        }}
                    >
                        {/* Header */}
                        <div className={cn(
                            "flex items-center justify-between p-4 border-b flex-shrink-0",
                            isDark ? "border-neutral-700" : "border-neutral-300"
                        )}>
                            <div>
                                <h2 className={cn(
                                    "text-xl font-bold",
                                    isDark ? "text-white" : "text-neutral-900"
                                )}>
                                    Acting Resume
                                </h2>
                                <p className={cn(
                                    "text-xs mt-1",
                                    isDark ? "text-neutral-400" : "text-neutral-600"
                                )}>
                                    Kati Fortune
                                </p>
                            </div>
                            
                            <div className="flex items-center gap-2">
                                {/* Download Button */}
                                <motion.div
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    <Button
                                        onClick={handleDownload}
                                        size="sm"
                                        className="bg-red-600 hover:bg-red-700 text-white font-semibold px-3 py-1.5 transition-colors cursor-none"
                                    >
                                        <svg className="w-3 h-3 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                        </svg>
                                        Download
                                    </Button>
                                </motion.div>

                                {/* Close Button */}
                                <button
                                    onClick={onClose}
                                    className={cn(
                                        "w-8 h-8 rounded-full flex items-center justify-center transition-colors",
                                        isDark
                                            ? "bg-neutral-700 hover:bg-neutral-600 text-white"
                                            : "bg-white hover:bg-neutral-200 text-neutral-900 border border-neutral-300"
                                    )}
                                >
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            </div>
                        </div>

                        {/* PDF Viewer - Takes remaining space */}
                        <div className="flex-1 overflow-hidden" style={{ height: 'calc(100% - 80px)' }}>
                            <iframe
                                src="/src/data/resume.pdf#toolbar=0&navpanes=0&scrollbar=1&zoom=page-fit"
                                className="w-full h-full border-0"
                                title="Kati Fortune Acting Resume"
                                onError={() => {
                                    const fallback = document.getElementById('pdf-fallback');
                                    if (fallback) {
                                        fallback.style.opacity = '1';
                                        fallback.style.pointerEvents = 'auto';
                                    }
                                }}
                            />
                        </div>

                        {/* Fallback message if PDF doesn't load */}
                        <div className={cn(
                            "absolute inset-0 flex items-center justify-center",
                            "opacity-0 pointer-events-none transition-opacity duration-300"
                        )} 
                        id="pdf-fallback">
                            <div className="text-center p-6">
                                <svg className="w-12 h-12 mx-auto mb-3 text-neutral-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                </svg>
                                <h3 className={cn("text-lg font-semibold mb-2", isDark ? "text-white" : "text-neutral-900")}>
                                    Resume Preview Unavailable
                                </h3>
                                <p className={cn("mb-3 text-sm", isDark ? "text-neutral-400" : "text-neutral-600")}>
                                    Click the download button to view the full resume
                                </p>
                                <Button
                                    onClick={handleDownload}
                                    size="sm"
                                    className="bg-red-600 hover:bg-red-700 text-white cursor-none"
                                >
                                    Download Resume PDF
                                </Button>
                            </div>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default ResumeModal;
