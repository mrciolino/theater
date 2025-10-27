"use client"

import { useEffect } from "react"
import { interpolate } from "flubber"
import { motion, useMotionValue, useTransform, animate } from "motion/react"
import { Button } from "@/components/ui/button"
import { useTheme } from "@/components/theme-provider"
import { cn } from "@/lib/utils"

export function ModeToggle() {
    const { theme, setTheme } = useTheme()
    const isDark = theme === "dark"
    const progress = useMotionValue(isDark ? 1 : 0)

    // simplified single-outline variants of Lucide Sun & Moon for flubber
    const sunPath =
        "M12 4a8 8 0 1 0 0 16 8 8 0 0 0 0-16ZM12 0v2M12 22v2M0 12h2M22 12h2M3.5 3.5l1.5 1.5M19 19l1.5 1.5M3.5 20.5l1.5-1.5M19 5l1.5-1.5Z"
    const moonPath =
        "M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79Z"

    const path = useTransform(progress, [0, 1], [sunPath, moonPath], {
        mixer: (a, b) => interpolate(a, b, { maxSegmentLength: 0.5 }),
    })

    useEffect(() => {
        animate(progress, isDark ? 1 : 0, {
            duration: 0.6,
            ease: "easeInOut",
        })
    }, [isDark, progress])

    return (
        <Button
            variant="outline"
            size="icon"
            onClick={() => setTheme(isDark ? "light" : "dark")}
            aria-label="Toggle theme"
            className={cn(
                "transition-all duration-300 hover:scale-110 hover:!bg-red-500 cursor-none",
                isDark
                    ? "border-neutral-700 bg-neutral-800/50 backdrop-blur-sm hover:bg-neutral-700/70 hover:border-neutral-600 text-white"
                    : "border-neutral-300 bg-neutral-100/80 backdrop-blur-sm hover:bg-neutral-200 hover:border-neutral-400 text-neutral-900"
            )}
        >
            <motion.svg
                viewBox="0 0 24 24"
                width="20"
                height="20"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                whileHover={{ scale: 1.5 }}
                whileTap={{ scale: 0.9 }}
            >
                <motion.path d={path} />
            </motion.svg>
        </Button>
    )
}
