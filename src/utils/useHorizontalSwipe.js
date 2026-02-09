import { useEffect, useRef } from "react";

/**
 * useHorizontalSwipe
 *
 * @param {boolean} active - whether the modal/carousel is active
 * @param {function} onLeft - called when user swipes left (next slide)
 * @param {function} onRight - called when user swipes right (previous slide)
 * @param {number} animationDuration - debounce duration in ms (match your GSAP slide duration)
 */
export default function useHorizontalSwipe(
  active,
  onLeft,
  onRight,
  animationDuration = 300,
) {
  const lastTrigger = useRef(0);

  let lastDelta = 0;

  function isMomentum(delta) {
    return Math.abs(delta) < Math.abs(lastDelta) * 0.85;
  }
  useEffect(() => {
    if (!active) return;

    const handleWheel = (e) => {
      //   if (animatingRef.current) return;
      const now = Date.now();

      // ignore events during animation
      if (now - lastTrigger.current < animationDuration) return;

      const deltaX = e.deltaX;
      const deltaY = e.deltaY;

      // horizontal swipe intent only
      if (Math.abs(deltaX) < Math.abs(deltaY)) return;
      if (Math.abs(deltaX) < 10) return;

      if (isMomentum(deltaX)) return;
      lastDelta = deltaX;

      if (deltaX > 0) {
        onRight(deltaX);
      } else if (deltaX < 0) {
        onLeft(deltaX);
      }

      lastTrigger.current = now;
    };

    window.addEventListener("wheel", handleWheel);

    return () => {
      window.removeEventListener("wheel", handleWheel);
    };
  }, [active, onLeft, onRight, animationDuration]);
}
