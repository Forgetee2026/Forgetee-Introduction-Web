import { useState } from "react";
import { useMotionValueEvent, type MotionValue } from "framer-motion";

/**
 * progress가 threshold에 도달하면 true를 반환하는 트리거 훅.
 * 역스크롤 시 히스테리시스로 경계 깜빡임을 방지한다.
 */
export function useScrollTrigger(
  progress: MotionValue<number>,
  threshold: number,
  resetThreshold?: number,
): boolean {
  const [triggered, setTriggered] = useState(false);
  const reset = resetThreshold ?? threshold - 0.05;

  useMotionValueEvent(progress, "change", (v) => {
    if (!triggered && v >= threshold) setTriggered(true);
    if (triggered && v < reset) setTriggered(false);
  });

  return triggered;
}
