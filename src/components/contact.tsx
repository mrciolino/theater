import React, { useState } from "react";
import { motion } from "motion/react";
import { useTheme } from "@/components/theme-provider";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { FilmReel } from "./icons";

const Contact = () => {
    const { theme } = useTheme(), isDark = theme === "dark";
    const [formData, setFormData] = useState({ name: "", email: "", subject: "", message: "" });
    const [isSubmitting, setIsSubmitting] = useState(false), [submitted, setSubmitted] = useState(false);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
        setFormData({ ...formData, [e.target.name]: e.target.value });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault(); setIsSubmitting(true);
        setTimeout(() => {
            setIsSubmitting(false); setSubmitted(true);
            setFormData({ name: "", email: "", subject: "", message: "" });
            setTimeout(() => setSubmitted(false), 5000);
        }, 2000);
    };

    return (
        <section id="contact" className={cn("py-12 sm:py-20 px-4 sm:px-6 duration-300", isDark ? "bg-neutral-900" : "bg-neutral-200")}>
            <div className="container mx-auto max-w-6xl">
                <motion.div initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: "easeOut" }} viewport={{ once: true }} className="text-center mb-12 sm:mb-16">
                    <motion.div className="w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-6 sm:mb-8 text-red-600" animate={{ rotate: 360 }} transition={{ duration: 15, repeat: Infinity, ease: "linear" }}><FilmReel /></motion.div>
                    <h2 className={cn("text-3xl sm:text-4xl md:text-6xl font-bold mb-4 sm:mb-6 tracking-tight", isDark ? "text-white" : "text-neutral-900")}>Get In Touch</h2>
                    <div className="w-20 sm:w-24 h-1 bg-red-600 mx-auto mb-4 sm:mb-6" />
                    <p className={cn("text-base sm:text-lg max-w-2xl mx-auto", isDark ? "text-neutral-300" : "text-neutral-700")}>Ready to collaborate on your next project? I'd love to hear from you.</p>
                </motion.div>

                <motion.div initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, delay: 0.2 }} viewport={{ once: true }}
                    className={cn("p-6 sm:p-8 rounded-xl shadow-lg duration-300", isDark ? "bg-neutral-800 border border-neutral-700" : "bg-neutral-100 border border-neutral-300")}>
                    {submitted ? (
                        <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-8 sm:py-12">
                            <div className="w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-4 sm:mb-6 bg-green-600 rounded-full flex items-center justify-center">
                                <svg className="w-6 h-6 sm:w-8 sm:h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                            </div>
                            <h3 className={cn("text-xl sm:text-2xl font-bold mb-2", isDark ? "text-white" : "text-neutral-900")}>Message Sent!</h3>
                            <p className={cn("text-base sm:text-lg", isDark ? "text-neutral-300" : "text-neutral-700")}>Thank you for reaching out. I'll get back to you soon.</p>
                        </motion.div>
                    ) : (
                        <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
                            {[
                                { label: "Name *", name: "name", type: "text", placeholder: "Your full name" },
                                { label: "Email *", name: "email", type: "email", placeholder: "your.email@example.com" },
                            ].map(({ label, name, type, placeholder }) => (
                                <div key={name} className="space-y-2">
                                    <label className={cn("block text-sm font-medium", isDark ? "text-white" : "text-neutral-900")}>{label}</label>
                                    <input
                                        type={type}
                                        name={name}
                                        value={formData[name as keyof typeof formData]}
                                        onChange={handleInputChange}
                                        required
                                        placeholder={placeholder}
                                        className={cn(
                                            "w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-red-600 transition-colors",
                                            isDark
                                                ? "bg-neutral-700 border-neutral-600 text-white placeholder-neutral-400"
                                                : "bg-white border-neutral-300 text-neutral-900 placeholder-neutral-500"
                                        )}
                                    />
                                </div>
                            ))}

                            <div>
                                <label className={cn("block text-sm font-medium mb-2", isDark ? "text-white" : "text-neutral-900")}>Message *</label>
                                <textarea name="message" value={formData.message} onChange={handleInputChange} required rows={5}
                                    className={cn("w-full px-4 py-3 rounded-lg border resize-none focus:outline-none focus:ring-2 focus:ring-red-600",
                                        isDark ? "bg-neutral-700 border-neutral-600 text-white placeholder-neutral-400" : "bg-white border-neutral-300 text-neutral-900 placeholder-neutral-500")}
                                    placeholder="Tell me about your project or inquiry..." />
                            </div>
                            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                                <Button type="submit" disabled={isSubmitting} size="lg" className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-4 duration-300 shadow-lg hover:shadow-xl disabled:opacity-50 cursor-none touch-manipulation">
                                    {isSubmitting ? <div className="flex items-center gap-2"><div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />Sending...</div> : "Send Message"}
                                </Button>
                            </motion.div>
                        </form>
                    )}
                </motion.div>
            </div>
        </section>
    );
};
export default Contact;
