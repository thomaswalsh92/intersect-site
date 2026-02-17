//react
import { useEffect, useLayoutEffect, useRef, useState } from "react";

import { useBreakpoint } from "./utils/useBreakpoint";
import useWindowDimensions from "./utils/useWindowDimensions";

export default function WorkExploreSmallScreen({
  active,
  currentProjectData,
  imagePlaceholders,
}) {
  const workExploreGrid = useRef(null);
  const [widthUnit, setWidthUnit] = useState(() =>
    typeof window !== "undefined" ? window.innerWidth / 19 : 0,
  );
  const [columns, setColumns] = useState();

  const { width } = useWindowDimensions();
  const isMedium = useBreakpoint("md", "up");
  useLayoutEffect(() => {
    if (isMedium) setColumns("repeat(19, 1fr)");
    if (!isMedium) setColumns("repeat(16, 1fr");
  }, [width]);

  useLayoutEffect(() => {
    if (!active) return;
    setWidthUnit(window.innerWidth / 19);
  }, [active]);
  return (
    <div
      id="work-explore-small-grid"
      ref={workExploreGrid}
      style={{
        width: "100%",
      }}
    >
      <WorkExploreDetailsBlock
        widthUnit={widthUnit}
        currentProjectData={currentProjectData}
        columns={columns}
        isMedium={isMedium}
      />
      {currentProjectData.smallScreenImageLayout.map((row) => {
        return (
          <>
            {isMedium && <WorkExploreSpacerBlock widthUnit={widthUnit} />}
            {row.type === "wide" && (
              <WorkExploreWideBlock
                images={row.images}
                columns={columns}
                isMedium={isMedium}
              />
            )}
            {row.type === "double" && (
              <WorkExploreDoubleBlock
                images={row.images}
                aspectRatio={row.aspectRatio}
                columns={columns}
                isMedium={isMedium}
              />
            )}
          </>
        );
      })}
      <div
        aria-hidden="true"
        id="dynamic-spacer"
        style={{
          height: useBreakpoint("sm", "up") ? 96 : 112,
          width: "100vw",
        }}
      ></div>
    </div>
  );
}

function WorkExploreDetailsBlock({
  widthUnit,
  currentProjectData,
  columns,
  isMedium,
}) {
  return (
    <div
      style={{
        height: isMedium ? widthUnit : widthUnit * 2,
        display: "grid",
        gridTemplateColumns: columns,
      }}
      className="work-explore-details-block"
    >
      {isMedium && (
        <div
          style={{
            gridColumn: "span 1",
          }}
          className="work-grid-block"
          aria-hidden="true"
        ></div>
      )}
      <div
        style={{
          gridColumn: "span 4",
        }}
        className="work-grid-block work-explore-dark"
        id="work-explore-project"
      >
        <p className="text-1">{currentProjectData.project}</p>
      </div>
      <div
        style={{
          gridColumn: "span 4",
        }}
        className="work-grid-block work-explore-dark"
        id="work-explore-client"
      >
        <p className="text-2">{currentProjectData.client}</p>
      </div>
      {isMedium && (
        <div
          style={{
            gridColumn: "span 1",
          }}
          className="work-grid-block"
          aria-hidden="true"
        ></div>
      )}
      <div
        style={{
          gridColumn: "span 4",
        }}
        className="work-grid-block work-explore-dark"
        id="work-explore-disciplines"
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
        style={{
          gridColumn: "span 4",
        }}
        className={`work-grid-block work-explore-dark ${!isMedium && "work-grid-end-block"}`}
        id="work-explored-published"
      >
        <p className="text-2">{currentProjectData.published}</p>
      </div>
      {isMedium && (
        <div
          style={{
            gridColumn: "span 1",
          }}
          className="work-grid-block work-grid-end-block"
          aria-hidden="true"
        ></div>
      )}
    </div>
  );
}

//single 16 x 9 image block
function WorkExploreWideBlock({ images, columns, isMedium }) {
  return (
    <div
      style={{ display: "grid", gridTemplateColumns: columns }}
      className="work-explore-wide-block"
    >
      {isMedium && (
        <div
          style={{ height: "100%", gridColumn: "span 1" }}
          className="work-grid-block"
          aria-hidden="true"
        ></div>
      )}
      <div
        style={{
          aspectRatio: "16 / 9",
          gridColumn: "span 17",
        }}
        className={`work-grid-block work-explore-image-block ${!isMedium && "work-grid-end-block"}`}
      >
        <img src={images[0]} />
      </div>
      {isMedium && (
        <div
          style={{
            height: "100%",
            gridColumn: "span 1",
          }}
          className="work-grid-block work-grid-end-block"
          aria-hidden="true"
        ></div>
      )}
    </div>
  );
}

//double image block with variable aspect ratio
function WorkExploreDoubleBlock({ images, aspectRatio, isMedium, columns }) {
  return (
    <div
      style={{ display: "grid", gridTemplateColumns: columns }}
      className="work-explore-double-block"
    >
      {isMedium && (
        <div
          style={{ gridColumn: "span 1" }}
          className="work-grid-block"
          aria-hidden="true"
        ></div>
      )}
      <div
        style={{
          aspectRatio: aspectRatio,
          gridColumn: "span 8",
        }}
        className="work-grid-block work-explore-image-block"
      >
        <img src={images[0]}></img>
      </div>
      {isMedium && (
        <div
          style={{ gridColumn: "span 1" }}
          className="work-grid-block"
          aria-hidden="true"
        ></div>
      )}
      <div
        style={{
          aspectRatio: aspectRatio,
          gridColumn: "span 8",
        }}
        className={`work-grid-block work-explore-image-block ${!isMedium && "work-grid-end-block"}`}
      >
        <img src={images[1]}></img>
      </div>
      {isMedium && (
        <div
          style={{
            gridColumn: "span 1",
          }}
          className="work-grid-block work-grid-end-block"
          aria-hidden="true"
        ></div>
      )}
    </div>
  );
}

function WorkExploreSpacerBlock({ widthUnit }) {
  return (
    <div
      style={{
        height: widthUnit,
        display: "grid",
        gridTemplateColumns: "repeat(19, 1fr)",
      }}
      className="work-explore-spacer-block"
      aria-hidden="true"
    >
      <div
        style={{
          gridColumn: "span 1",
        }}
        className="work-grid-block"
        aria-hidden="true"
      ></div>
      <div
        style={{
          gridColumn: "span 8",
        }}
        className="work-grid-block"
        aria-hidden="true"
      ></div>
      <div
        style={{
          gridColumn: "span 1",
        }}
        className="work-grid-block"
        aria-hidden="true"
      ></div>
      <div
        style={{
          gridColumn: "span 8",
        }}
        className="work-grid-block"
        aria-hidden="true"
      ></div>
      <div
        style={{
          gridColumn: "span 1",
        }}
        className="work-grid-block work-grid-end-block"
        aria-hidden="true"
      ></div>
    </div>
  );
}
