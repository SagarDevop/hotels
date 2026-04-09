"use client";

import React, { useState, useEffect } from "react";
import { motion, useSpring } from "framer-motion";

const CustomCursor = () => {
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
    const [isPointer, setIsPointer] = useState(false);

    const springX = useSpring(0, { stiffness: 150, damping: 20 });
    const springY = useSpring(0, { stiffness: 150, damping: 20 });

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            springX.set(e.clientX);
            springY.set(e.clientY);
            
            const target = e.target as HTMLElement;
            setIsPointer(
                window.getComputedStyle(target).cursor === "pointer" ||
                target.tagName === "BUTTON" ||
                target.tagName === "A"
            );
        };

        window.addEventListener("mousemove", handleMouseMove);
        return () => window.removeEventListener("mousemove", handleMouseMove);
    }, [springX, springY]);

    return (
        <div className="fixed inset-0 pointer-events-none z-[9999] hidden lg:block">
            {/* Dot Cursor */}
            <motion.div
                style={{
                    x: springX,
                    y: springY,
                    translateX: "-50%",
                    translateY: "-50%",
                }}
                className="h-1.5 w-1.5 bg-primary rounded-full"
            />
            
            {/* Ring Cursor */}
            <motion.div
                style={{
                    x: springX,
                    y: springY,
                    translateX: "-50%",
                    translateY: "-50%",
                }}
                animate={{
                    width: isPointer ? 60 : 36,
                    height: isPointer ? 60 : 36,
                    borderWidth: isPointer ? "1px" : "1.5px",
                    borderColor: isPointer ? "#D4AF37" : "rgba(212, 175, 55, 0.4)",
                    backgroundColor: isPointer ? "rgba(212, 175, 55, 0.05)" : "rgba(212, 175, 55, 0)",
                }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                className="rounded-full border border-primary/40 flex items-center justify-center transition-all duration-300"
            >
                 {isPointer && (
                    <motion.span 
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="text-[8px] uppercase tracking-widest text-primary font-bold"
                    >
                        View
                    </motion.span>
                 )}
            </motion.div>
        </div>
    );
};

export default CustomCursor;
