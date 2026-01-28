//styling
import "./scss/Home.scss";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
// import { ScrollSmoother } from "gsap/ScrollSmoother";
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
  const [widthUnit, setWidthUnit] = useState();
  const [heightUnit, setHeightUnit] = useState();
  const [railHeight, setRailHeight] = useState(null);
  const [rows, setRows] = useState(null);
  const [imagePlaceholders, setImagePlaceholders] = useState([
    { aspectRatio: "16 / 9", color: "red" },
    { aspectRatio: "4 / 5", color: "green" },
    { aspectRatio: "9 / 16", color: "blue" },
  ]);
  const workExploreGrid = useRef(null);

  useEffect(() => {
    if (!workExploreGrid.current && !active) return;
    setHeightUnit(workExploreGrid.current.offsetHeight / 19);
    setWidthUnit(workExploreGrid.current.offsetWidth / 38);
  }, [workExploreGrid, active]);

  useEffect(() => {
    const sixteenNineHeight = heightUnit * 13;
    const sixteenNineWidth = (sixteenNineHeight / 9) * 16;
    const maxWidth = width * 0.8;
    if (sixteenNineWidth > maxWidth) {
      const maxHeight = (maxWidth / 16) * 9;
      setRailHeight(maxHeight);
    }
  }, [width, height, widthUnit, heightUnit]);

  useEffect(() => {
    if (railHeight) {
      const heightUnit = Math.floor(workExploreGrid.current.offsetHeight / 19);
      const railHeightUnit = Math.floor(railHeight / 13);
      setRows(
        `${heightUnit}px 1fr repeat(13, ${railHeightUnit}px) 1fr repeat(3, ${heightUnit}px)`,
      );
    }
  }, [railHeight, workExploreGrid]);

  function handleForward() {
    setImagePlaceholders((prev) => {
      if (prev.length === 0) return prev;
      return [prev[prev.length - 1], ...prev.slice(0, prev.length - 1)];
    });
  }

  function handleBack() {
    setImagePlaceholders((prev) => {
      if (prev.length === 0) return prev;
      return [...prev.slice(1), prev[0]];
    });
  }

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
            gap: widthUnit * 2,
          }}
        >
          <button onClick={handleBack} className="work-explore-button left">
            <span className="text-1">{`<-`}</span>
          </button>
          <button onClick={handleForward} className="work-explore-button right">
            <span className="text-1">{`->`}</span>
          </button>
          {imagePlaceholders.map(({ aspectRatio, color }) => {
            return (
              <div
                className="work-explore-image-container"
                style={{
                  height: "100%",
                  aspectRatio: aspectRatio,
                  background: color,
                }}
              ></div>
            );
          })}
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
