import { useState, useEffect } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";

const CustomCursor = () => {
    const [isHovering, setIsHovering] = useState(false);
    // Initialize mobile detection immediately
    const [isMobile, setIsMobile] = useState(() => 
        typeof window !== 'undefined' && ('ontouchstart' in window || navigator.maxTouchPoints > 0)
    );
    const cursorX = useMotionValue(0);
    const cursorY = useMotionValue(0);

    useEffect(() => {
        // Check if device is mobile/touch device
        const checkMobile = () => {
            const mobile = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
            setIsMobile(mobile);
            // Immediately set cursor visibility based on device type
            document.body.style.cursor = mobile ? 'auto' : 'none';
        };
        
        checkMobile();
        window.addEventListener('resize', checkMobile);

        // Early return for mobile - don't add desktop event listeners
        if (isMobile) {
            return () => {
                window.removeEventListener('resize', checkMobile);
            };
        }

        // Desktop-only code
        const handleMouseMove = (e: MouseEvent) => {
            cursorX.set(e.clientX);
            cursorY.set(e.clientY);
        };

        const handleMouseEnter = () => setIsHovering(true);
        const handleMouseLeave = () => setIsHovering(false);

        window.addEventListener('mousemove', handleMouseMove, { passive: true });

        // Add hover effects for interactive elements
        const interactiveElements = document.querySelectorAll('a, button, [role="button"]');
        interactiveElements.forEach(el => {
            el.addEventListener('mouseenter', handleMouseEnter);
            el.addEventListener('mouseleave', handleMouseLeave);
        });

        return () => {
            window.removeEventListener('resize', checkMobile);
            document.body.style.cursor = 'auto';
            window.removeEventListener('mousemove', handleMouseMove);
            interactiveElements.forEach(el => {
                el.removeEventListener('mouseenter', handleMouseEnter);
                el.removeEventListener('mouseleave', handleMouseLeave);
            });
        };
    }, [cursorX, cursorY, isMobile]);

    // Don't render cursor on mobile devices
    if (isMobile) {
        return null;
    }

    return (
        <div className="fixed inset-0 pointer-events-none z-[100]">
            {/* Inner circle - moves at real speed */}
            <motion.div
                className="absolute w-3 h-3 bg-red-500 rounded-full mix-blend-difference"
                style={{
                    x: cursorX,
                    y: cursorY,
                    translateX: '-50%',
                    translateY: '-50%',
                }}
                animate={{
                    scale: isHovering ? 1.5 : 1,
                }}
                transition={{
                    scale: { duration: 0.2 }
                }}
            />

            {/* Middle circle */}
            <motion.div
                className="absolute w-6 h-6 border-2 border-red-400 rounded-full mix-blend-difference"
                style={{
                    x: useSpring(cursorX, { damping: 30, stiffness: 500, mass: 0.1 }),
                    y: useSpring(cursorY, { damping: 30, stiffness: 500, mass: 0.1 }),
                    translateX: '-50%',
                    translateY: '-50%',
                }}
                animate={{
                    scale: isHovering ? 1.3 : 1,
                }}
                transition={{
                    scale: { duration: 0.2 }
                }}
            />

            {/* Third circle */}
            <motion.div
                className="absolute w-10 h-10 border-2 border-red-300 rounded-full mix-blend-difference"
                style={{
                    x: useSpring(cursorX, { damping: 25, stiffness: 250, mass: 0.15 }),
                    y: useSpring(cursorY, { damping: 25, stiffness: 250, mass: 0.15 }),
                    translateX: '-50%',
                    translateY: '-50%',
                }}
                animate={{
                    scale: isHovering ? 1.2 : 1,
                }}
                transition={{
                    scale: { duration: 0.2 }
                }}
            />

            {/* Fourth circle */}
            <motion.div
                className="absolute w-14 h-14 border-2 border-red-200 rounded-full mix-blend-difference"
                style={{
                    x: useSpring(cursorX, { damping: 20, stiffness: 150, mass: 0.2 }),
                    y: useSpring(cursorY, { damping: 20, stiffness: 150, mass: 0.2 }),
                    translateX: '-50%',
                    translateY: '-50%',
                }}
                animate={{
                    scale: isHovering ? 1.1 : 1,
                }}
                transition={{
                    scale: { duration: 0.2 }
                }}
            />
        </div>
    );
};

export default CustomCursor;
