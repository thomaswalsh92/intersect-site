//react
import { useEffect, useLayoutEffect, useRef, useState } from "react";

//app
import useWindowDimensions from "./utils/useWindowDimensions";
import ImageRail from "./ImageRail";

export default function WorkExploreDesktop({
  active,
  currentProjectData,
  imagePlaceholders,
}) {
  const [width, setWidth] = useState();
  const [widthUnit, setWidthUnit] = useState();
  const [heightUnit, setHeightUnit] = useState();
  const [railHeight, setRailHeight] = useState(null);
  const [rows, setRows] = useState(null);
  const workExploreGrid = useRef(null);

  useLayoutEffect(() => {
    setWidth(window.innerWidth);
  }, []);
  useEffect(() => {
    function handleResize() {
      const width = window.innerWidth;
      // const height = window.innerHeight;
      setWidth(width);
    }

    handleResize(); // initial log
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

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
  }, [width, widthUnit, heightUnit]);

  useEffect(() => {
    if (railHeight) {
      const heightUnit = Math.floor(workExploreGrid.current.offsetHeight / 19);
      const railHeightUnit = Math.floor(railHeight / 13);
      setRows(
        `${heightUnit}px 1fr repeat(13, ${railHeightUnit}px) 1fr repeat(3, ${heightUnit}px)`,
      );
    }
  }, [railHeight, workExploreGrid]);

  return (
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
      >
        <p className="text-1">{currentProjectData.project}</p>
      </div>
      <div
        className="work-grid-block work-explore-dark"
        id="work-explore-client"
        style={{
          gridColumn: "span 5",
          gridRow: "span 1",
        }}
      >
        <p className="text-2">{currentProjectData.client}</p>
      </div>
      <div
        className="work-grid-block work-explore-dark"
        id="work-explore-disciplines"
        style={{
          gridColumn: "span 5",
          gridRow: "span 1",
        }}
      >
        <p className="text-2">
          {currentProjectData.disciplines.map((el, i) => {
            let string = el;
            if (i < currentProjectData.disciplines.length - 1) {
              string = string + " / ";
            }
            return string;
          })}
        </p>
      </div>
      <div
        className="work-grid-block work-explore-dark"
        id="work-explore-published"
        style={{
          gridColumn: "span 5",
          gridRow: "span 1",
        }}
      >
        <p className="text-2">{currentProjectData.published}</p>
      </div>
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
      {widthUnit && (
        <ImageRail
          active={active}
          width={width}
          widthUnit={widthUnit}
          imagePlaceholders={imagePlaceholders}
          // handleForward={handleForward}
          // handleBack={handleBack}
        />
      )}
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
      >
        {/* Change eventually to a long description */}
        <p className="text-2">{currentProjectData.longDescription}</p>
      </div>
      <div
        className="work-grid-block work-grid-end-block"
        aria-hidden="true"
        style={{
          gridColumn: "span 18",
          gridRow: "span 3",
        }}
      ></div>
    </div>
  );
}
