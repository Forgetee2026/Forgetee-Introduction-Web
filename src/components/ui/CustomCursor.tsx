"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { useMediaQuery } from "@/hooks/useMediaQuery";

const SPRING_CONFIG = { damping: 25, stiffness: 300, mass: 0.5 };

function isInteractive(el: Element): boolean {
  const tag = el.tagName.toLowerCase();
  if (tag === "a" || tag === "button" || tag === "input" || tag === "textarea") return true;
  if (el.getAttribute("role") === "button") return true;
  if (el.closest("a, button, [role='button']")) return true;
  return false;
}

export default function CustomCursor() {
  const isDesktop = useMediaQuery("(min-width: 1024px)");
  const [hovering, setHovering] = useState(false);
  const [clicking, setClicking] = useState(false);
  const [visible, setVisible] = useState(false);

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const ringX = useSpring(x, SPRING_CONFIG);
  const ringY = useSpring(y, SPRING_CONFIG);

  useEffect(() => {
    if (!isDesktop) return;

    const onMouseMove = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      if (!visible) setVisible(true);
    };

    const onMouseOver = (e: MouseEvent) => {
      setHovering(isInteractive(e.target as Element));
    };

    const onMouseDown = () => setClicking(true);
    const onMouseUp = () => setClicking(false);
    const onMouseLeave = () => setVisible(false);
    const onMouseEnter = () => setVisible(true);

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseover", onMouseOver);
    window.addEventListener("mousedown", onMouseDown);
    window.addEventListener("mouseup", onMouseUp);
    document.documentElement.addEventListener("mouseleave", onMouseLeave);
    document.documentElement.addEventListener("mouseenter", onMouseEnter);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseover", onMouseOver);
      window.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("mouseup", onMouseUp);
      document.documentElement.removeEventListener("mouseleave", onMouseLeave);
      document.documentElement.removeEventListener("mouseenter", onMouseEnter);
    };
  }, [isDesktop, x, y, visible]);

  if (!isDesktop) return null;

  const ringScale = clicking ? 0.8 : hovering ? 1.5 : 1;
  const dotScale = hovering ? 0 : 1;

  return (
    <>
      {/* 도트 */}
      <motion.div
        style={{ x, y, translateX: "-50%", translateY: "-50%" }}
        animate={{ scale: dotScale, opacity: visible ? 1 : 0 }}
        transition={{ duration: 0.15 }}
        className="pointer-events-none fixed left-0 top-0 z-[9999] h-1.5 w-1.5 rounded-full bg-white mix-blend-difference"
      />
      {/* 링 */}
      <motion.div
        style={{ x: ringX, y: ringY, translateX: "-50%", translateY: "-50%" }}
        animate={{ scale: ringScale, opacity: visible ? 1 : 0 }}
        transition={{ scale: { duration: 0.25, ease: [0.16, 1, 0.3, 1] }, opacity: { duration: 0.2 } }}
        className="pointer-events-none fixed left-0 top-0 z-[9999] h-9 w-9 rounded-full border-[1.5px] border-white mix-blend-difference"
      />
    </>
  );
}
