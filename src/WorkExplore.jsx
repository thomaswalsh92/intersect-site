//styling
import "./scss/Home.scss";

import { useEffect, useRef, useState } from "react";
import { ScrollSmoother } from "gsap/ScrollSmoother";
import useWindowDimensions from "./utils/useWindowDimensions";

export default function WorkExplore({ active, currentProject, closeProject }) {
  const overlayRef = useRef(null);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape" && active) closeProject();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [active, closeProject]);

  const { width, height } = useWindowDimensions();
  const [railHeight, setRailHeight] = useState(null);
  const [rows, setRows] = useState(null);
  const workExploreGrid = useRef(null);

  useEffect(() => {
    if (!workExploreGrid.current) return;
    const heightUnit = workExploreGrid.current.offsetHeight / 19;
    const sixteenNineHeight = heightUnit * 13;
    const sixteenNineWidth = (sixteenNineHeight / 9) * 16;
    const maxWidth = width * 0.7;
    if (sixteenNineWidth > maxWidth) {
      const maxHeight = (maxWidth / 16) * 9;
      setRailHeight(maxHeight);
    }
  }, [width, height, workExploreGrid]);

  useEffect(() => {
    if (!workExploreGrid.current) return;

    if (railHeight) {
      const heightUnit = Math.floor(workExploreGrid.current.offsetHeight / 19);
      const scalableHeightSection = heightUnit * 15;
      const marginsHeight = Math.floor(scalableHeightSection - railHeight);
      const railHeightUnit = Math.floor(railHeight / 13);

      setRows(
        `${heightUnit}px 1fr repeat(13, ${railHeightUnit}px) 1fr repeat(3, ${heightUnit}px)`
      );
    }
  }, [railHeight, workExploreGrid]);

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
      <div
        id="work-explore-grid"
        ref={workExploreGrid}
        style={{
          height: "100%",
          width: "100%",
          display: "grid",
          gridTemplateColumns: "repeat(38, 1fr)",
          gridTemplateRows: rows !== null ? rows : "repeat(19, 1fr)",
        }}
      >
        {/* ROW 1 - METADATA*/}
        <div
          className="work-grid-block work-explore-dark"
          id="work-explore-project"
          style={{
            gridColumn: "span 5",
            gridRow: "span 1",
          }}
        ></div>
        <div
          className="work-grid-block work-explore-dark"
          id="work-explore-client"
          style={{
            gridColumn: "span 5",
            gridRow: "span 1",
          }}
        ></div>
        <div
          className="work-grid-block work-explore-dark"
          id="work-explore-disciplines"
          style={{
            gridColumn: "span 5",
            gridRow: "span 1",
          }}
        ></div>
        <div
          className="work-grid-block work-explore-dark"
          id="work-explore-published"
          style={{
            gridColumn: "span 5",
            gridRow: "span 1",
          }}
        ></div>
        <div
          className="work-grid-block work-grid-end-block"
          aria-hidden="true"
          style={{
            gridColumn: "span 18",
            gridRow: "span 1",
          }}
        ></div>
        {/* ROW 2 MARGIN */}
        <div
          className="work-grid-block work-grid-end-block"
          aria-hidden="true"
          style={{
            gridColumn: "span 38",
            gridRow: "span 1",
          }}
        ></div>
        {/* ROW 3 IMAGE RAIL */}
        <div
          id="work-explore-image-rail"
          className="work-grid-block work-grid-end-block"
          style={{
            gridColumn: "span 38",
            gridRow: "span 13",
          }}
        >
          <div
            style={{
              height: "100%",
              aspectRatio: "16 / 9",
              background: "#ccc",
            }}
          ></div>
        </div>
        {/* ROW 4 MARGIN */}
        <div
          className="work-grid-block work-grid-end-block"
          aria-hidden="true"
          style={{
            gridColumn: "span 38",
            gridRow: "span 1",
          }}
        ></div>
        {/* ROW 5 DESCRIPTION */}
        <div
          id="work-explore-description"
          className="work-grid-block work-explore-dark"
          style={{
            gridColumn: "span 20",
            gridRow: "span 3",
          }}
        ></div>
        <div
          className="work-grid-block work-grid-end-block"
          style={{
            gridColumn: "span 18",
            gridRow: "span 3",
          }}
        ></div>
      </div>
    </div>
  );
}
