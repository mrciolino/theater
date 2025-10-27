import { Theater } from "./icons";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";

const LoadingScreen = ({ onComplete }: { onComplete: () => void }) => {
  const [progress, setProgress] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => setIsComplete(true), 300);
          setTimeout(onComplete, 1400);
          return 100;
        }
        return prev + 2;
      });
    }, 50);
    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {!isComplete && (
        <motion.div
          key="loading"
          className="fixed inset-0 flex items-center justify-center bg-black overflow-hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 2 }}
          transition={{ duration: 1, ease: [0.4, 0, 0.2, 1] }}
        >
          <div className="flex flex-col items-center space-y-4 sm:space-y-8 px-4">
            {/* Cinematic Stage */}
            <motion.div
              className="relative"
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 1.2, ease: "easeOut" }}
            >
              <motion.svg
                width="320"
                height="320"
                viewBox="0 0 640 640"
                className="w-80 h-80 sm:w-[640px] sm:h-[640px]"
                animate={{
                  scale: [1, 1.02, 1],
                  rotate: [0, 0.2, 0],
                }}
                transition={{
                  duration: 6,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <Theater />
              </motion.svg>
            </motion.div>

            {/* Dual Loading Bars */}
            <div className="w-64 sm:w-80 h-2 bg-gray-800 rounded-full overflow-hidden relative">
              <motion.div
                className="absolute left-0 top-0 h-full bg-white"
                style={{ width: `${progress / 2}%` }}
                transition={{ duration: 0.2, ease: "easeOut" }}
              />
              <motion.div
                className="absolute right-0 top-0 h-full bg-white"
                style={{ width: `${progress / 2}%` }}
                transition={{ duration: 0.2, ease: "easeOut" }}
              />
            </div>

            {/* Text Elements */}
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="text-white text-sm sm:text-lg tracking-[0.3em] font-light text-center"
            >
              ENTERING THE STAGE
            </motion.p>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="text-white/60 text-sm"
            >
              {Math.round(progress)}%
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LoadingScreen;
