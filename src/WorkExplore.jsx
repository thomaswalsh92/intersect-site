//styling
import "./scss/Home.scss";

import { useEffect, useRef, useState } from "react";
// import { ScrollSmoother } from "gsap/ScrollSmoother";
import useWindowDimensions from "./utils/useWindowDimensions";
import ImageRail from "./ImageRail";
import rainydayNineSixteenNumberOne from "./assets/images/rainyday/rainyday-9-16-num1.jpg";
import rainydayNineSixteenNumberTwo from "./assets/images/rainyday/rainyday-9-16-num2.jpg";
import rainydayNineSixteenNumberThree from "./assets/images/rainyday/rainyday-9-16-num3.jpg";
import rainydaySixteenNineNumberOne from "./assets/images/rainyday/rainyday-16-9-num1.jpg";
import rainydaySixteenNineNumberTwo from "./assets/images/rainyday/rainyday-16-9-num2.jpg";

export default function WorkExplore({ active, currentProject, closeProject }) {
  const imagePlaceholders = [
    { aspectRatio: "16 / 9", img: rainydaySixteenNineNumberOne }, //: rainyday_16_9_num1 },
    { aspectRatio: "9 / 16", img: rainydayNineSixteenNumberTwo }, //: rainyday_9_16_num2 },
    { aspectRatio: "9 / 16", img: rainydayNineSixteenNumberThree }, //: rainyday_9_16_num3 },
    { aspectRatio: "9 / 16", img: rainydayNineSixteenNumberOne }, //: rainyday_9_16_num1 },
    { aspectRatio: "16 / 9", img: rainydaySixteenNineNumberTwo }, //: rainyday_16_9_num2 },
  ];
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
  // const [imagePlaceholders, setImagePlaceholders] = useState();
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
        <ImageRail
          active={active}
          widthUnit={widthUnit}
          imagePlaceholders={imagePlaceholders}
          // handleForward={handleForward}
          // handleBack={handleBack}
        />
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
