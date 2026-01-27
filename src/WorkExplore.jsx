import { useEffect, useRef } from "react";
import { ScrollSmoother } from "gsap/ScrollSmoother";
import WorkExplorePage from "./WorkExplorePage";

export default function WorkExplore({ active, currentProject, closeProject }) {
  const overlayRef = useRef(null);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape" && active) closeProject();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [active, closeProject]);

  if (!active) return null;

  return (
    <div
      id="work-explore"
      ref={overlayRef}
      tabIndex={-1}
      role="dialog"
      aria-modal="true"
      aria-hidden={!active}
      className={active ? "active" : ""}
    >
      <div id="work-explore-inner"></div>
    </div>
  );
}
