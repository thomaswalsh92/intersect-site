//react
import { useRef, useState, useEffect, useLayoutEffect } from "react";

//gsap
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import cropCover from "../src/assets/images/work-crop-cover.jpg";
import darskCover from "../src/assets/images/work-darsk-cover.jpg";
import johnPeelCover from "../src/assets/images/work-john-peel-cover.jpg";
import rainydayCover from "../src/assets/images/work-rainyday-cover.jpg";
import shimmerCover from "../src/assets/images/work-shimmer-cover.jpg";
import synEightCover from "../src/assets/images/work-syneight-cover.jpg";

gsap.registerPlugin(useGSAP, ScrollTrigger, ScrollToPlugin);

export default function WorkGrid() {
  //! STUBBED DATA to be removed
  // supports 2 length array of actions e.g. live site and explore e.g.
  // actions: {type: string, title: string, url: string}
  // OR
  // actions: [{type: string, title: string, url: string}, {type: string, title: string, url: string}]

  //types: "live-site", "explore"
  const projectDetails = [
    {
      project: "RAINYDAY WEBSITE",
      client: "RAINYDAY STUDIO",
      disciplines: ["WEB DESIGN", "WEB DEVELOPMENT"],
      published: 2025,
      shortDescription:
        "RAINYDAY Lorem ipsum dolor sit amet, consectetur adipiscing elit. ",
      actions: {
        type: "live-site",
        title: "LIVE SITE",
        url: "https://www.rainydaystudio.co.uk/",
      },

      coverImage: rainydayCover,
    },
    {
      project: "JOHN PEEL COLLECTION",
      client: "OMEGA AUCTIONS",
      disciplines: ["GRAPHIC DESIGN"],
      published: 2025,
      shortDescription:
        "JOHN PEEL Lorem ipsum dolor sit amet, consectetur adipiscing elit. ",
      actions: undefined,
      coverImage: johnPeelCover,
    },
    {
      project: "CROP MAGAZINE LAUNCH",
      client: "CROP RADIO",
      disciplines: ["MOTION DESIGN"],
      published: 2025,
      shortDescription:
        "CROP MAGAZINE Lorem ipsum dolor sit amet, consectetur adipiscing elit. ",
      actions: undefined,
      coverImage: cropCover,
    },
    {
      project: "DARSK VISUAL IDENTITY",
      client: "DARSK",
      disciplines: ["GRAPHIC DESIGN", "MOTION DESIGN"],
      published: 2025,
      shortDescription:
        "DARSK Lorem ipsum dolor sit amet, consectetur adipiscing elit. ",
      actions: undefined,
      coverImage: darskCover,
    },
    {
      project: "SHIMMER VISUAL INDENTITY",
      client: "SHIMMER",
      disciplines: ["GRAPHIC DESIGN", "MOTION DESIGN"],
      published: 2025,
      shortDescription:
        "SHIMMER Lorem ipsum dolor sit amet, consectetur adipiscing elit. ",
      actions: undefined,
      coverImage: shimmerCover,
    },
    {
      project: "SYN-EIGHT",
      client: "INTERSECT",
      disciplines: ["3D DESIGN", "MOTION DESIGN"],
      published: 2025,
      shortDescription:
        "SYNEIGHT Lorem ipsum dolor sit amet, consectetur adipiscing elit. ",
      actions: undefined,
      coverImage: synEightCover,
    },
  ];

  //* refactor opp -> change to useReducer
  const [width, setWidth] = useState();
  const [height, setHeight] = useState();
  // \/
  const [imageHeight, setImageHeight] = useState();
  const [imageWidth, setImageWidth] = useState();
  const [imageIsMaxVertical, setImageIsMaxVertical] = useState();
  // \/
  const [cols, setCols] = useState();
  const workGrid = useRef(null);

  const [selected, setSelected] = useState(0);

  useEffect(() => {
    function handleResize() {
      const width = window.innerWidth;
      const height = window.innerHeight;
      setWidth(width);
      setHeight(height);
    }

    handleResize(); // initial log
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  //chain of effect hooks computes grid sizes for responsive 4 / 5 image container
  useEffect(() => {
    if (!workGrid.current) return;
    const gridWidth = workGrid.current.offsetWidth;
    let widthUnit = gridWidth / 19;
    const gridHeight = workGrid.current.offsetHeight;
    const minimumTopBottomSize = 112;
    const maxVerticalSize = gridHeight - minimumTopBottomSize * 2;
    //in this case the imageHeight is fixed as maxVerticalSize, width derived from that
    if (widthUnit * 10 > maxVerticalSize) {
      setImageHeight(maxVerticalSize);
      setImageWidth((maxVerticalSize / 5) * 4);
      setImageIsMaxVertical(true);
    }

    //in this case the image size is computed as 4 / 5 from widthUnits
    if (widthUnit * 10 <= maxVerticalSize) {
      setImageHeight(widthUnit * 10);
      setImageWidth(widthUnit * 8);
      setImageIsMaxVertical(false);
    }
  }, [width, height, workGrid]);

  useEffect(() => {
    if (imageIsMaxVertical) {
      setCols(`repeat(10, 1fr) repeat(8, ${imageWidth / 8}px) 1fr`);
    }

    if (!imageIsMaxVertical) {
      setCols("repeat(19, 1fr)");
    }
  }, [imageHeight, imageWidth, imageIsMaxVertical]);

  const projectsSelectedColor = "#f4f4f3";
  const projectsExtraDarkColor = "#1d1e1e";
  // const bgColor = "#2f3031";

  return (
    <div
      id="work-grid"
      ref={workGrid}
      style={{
        height: "100%",
        width: "100%",
        display: "grid",
        gridTemplateColumns: cols,
        gridTemplateRows: `1fr ${imageHeight}px 1fr`,
      }}
    >
      {/* ROW ONE */}
      <div
        className="work-grid-block"
        id="work-grid-title"
        style={{
          background: projectsExtraDarkColor,
          gridColumn: "span 4",
          gridRow: "span 1",
        }}
      >
        <p className="text-1">WORKS</p>
      </div>
      <div
        className="work-grid-block"
        style={{
          gridColumn: "span 2",
          gridRow: "span 1",
        }}
      ></div>
      <div
        className="work-grid-block"
        style={{
          gridColumn: "span 3",
          gridRow: "span 1",
        }}
      ></div>
      <div
        className="work-grid-block"
        style={{
          gridColumn: "span 1",
          gridRow: "span 1",
        }}
      ></div>
      <div
        className="work-grid-block"
        style={{
          gridColumn: "span 8",
          gridRow: "span 1",
        }}
      ></div>
      <div
        className="work-grid-block"
        style={{
          gridColumn: "span 1",
          gridRow: "span 1",
        }}
      ></div>
      {/* ROW TWO */}
      <div
        className="work-grid-block"
        style={{
          gridColumn: "span 2",
          gridRow: "span 1",
        }}
      ></div>
      <div
        // className="work-grid-block"
        id="work-grid-project-list"
        style={{
          gridColumn: "span 8",
          gridRow: "span 1",
          display: "grid",
          gridTemplateColumns: "repeat(8, 1fr)",
          gridTemplateRows: `1fr repeat(${projectDetails.length}, 64px) 1fr`,
        }}
      >
        <div
          className="work-grid-block"
          style={{
            gridColumn: "span 2",
            gridRow: "span 1",
          }}
        ></div>
        <div
          className="work-grid-block"
          style={{
            gridColumn: "span 2",
            gridRow: "span 1",
          }}
        ></div>
        <div
          className="work-grid-block"
          style={{
            gridColumn: "span 3",
            gridRow: "span 1",
          }}
        ></div>
        <div
          className="work-grid-block"
          style={{
            gridColumn: "span 1",
            gridRow: "span 1",
          }}
        ></div>
        {projectDetails.map((proj, index) => {
          return (
            <div
              className="work-grid-project-row"
              style={{
                gridColumn: "span 8",
                gridRow: "span 1",
                display: "grid",
                gridTemplateColumns: "repeat(8, 1fr)",
                gridTemplateRows: "1fr",
                cursor: "pointer",
                background:
                  selected === index
                    ? projectsSelectedColor
                    : projectsExtraDarkColor,
              }}
              onClick={() => setSelected(index)}
            >
              <div
                style={{ gridColumn: "span 2", gridRow: "span 1" }}
                className="work-grid-block work-grid-project-block"
              >
                <p className="text-1">{proj.project}</p>
              </div>
              <div
                style={{ gridColumn: "span 2", gridRow: "span 1" }}
                className="work-grid-block work-grid-project-block"
              >
                <p className="text-2">{proj.client}</p>
              </div>
              <div
                style={{ gridColumn: "span 3", gridRow: "span 1" }}
                className="work-grid-block work-grid-project-block"
              >
                <p className="text-2">
                  {proj.disciplines.map((el, i) => {
                    let string = el;
                    if (i < proj.disciplines.length - 1) {
                      string = string + " / ";
                    }
                    return string;
                  })}
                </p>
              </div>
              <div
                style={{ gridColumn: "span 1", gridRow: "span 1" }}
                className="work-grid-block work-grid-project-block"
              >
                <p className="text-2">{proj.published}</p>
              </div>
            </div>
          );
        })}
        <div
          className="work-grid-block"
          style={{
            gridColumn: "span 2",
            gridRow: "span 1",
          }}
        ></div>
        <div
          className="work-grid-block"
          style={{
            gridColumn: "span 2",
            gridRow: "span 1",
          }}
        ></div>
        <div
          className="work-grid-block"
          style={{
            gridColumn: "span 3",
            gridRow: "span 1",
          }}
        ></div>
        <div
          className="work-grid-block"
          style={{
            gridColumn: "span 1",
            gridRow: "span 1",
          }}
        ></div>
      </div>
      <div
        className="work-grid-block"
        id="work-grid-project-image"
        style={{
          gridColumn: "span 8",
          gridRow: "span 1",
        }}
      >
        <img src={projectDetails[selected].coverImage} />
      </div>
      <div
        className="work-grid-block"
        style={{
          gridColumn: "span 1",
          gridRow: "span 1",
        }}
      ></div>
      {/* ROW THREE */}
      <div
        className="work-grid-block"
        style={{
          gridColumn: "span 2",
          gridRow: "span 1",
        }}
      ></div>
      <div
        className="work-grid-block"
        style={{
          gridColumn: "span 2",
          gridRow: "span 1",
        }}
      ></div>
      <div
        className="work-grid-block"
        style={{
          gridColumn: "span 2",
          gridRow: "span 1",
        }}
      ></div>
      <div
        className="work-grid-block"
        style={{
          gridColumn: "span 3",
          gridRow: "span 1",
        }}
      ></div>
      <div
        className="work-grid-block"
        style={{
          gridColumn: "span 1",
          gridRow: "span 1",
        }}
      ></div>
      <div
        className="work-grid-block"
        id="work-grid-project-short-description"
        style={{
          gridColumn: "span 4",
          gridRow: "span 1",
          background: projectsExtraDarkColor,
        }}
      >
        <p className="text-2">{projectDetails[selected].shortDescription}</p>
      </div>
      {projectDetails[selected].actions ? (
        Array.isArray(projectDetails[selected].actions) ? (
          <>
            <div
              className="work-grid-block work-grid-action-block"
              id="work-grid-project-action-one"
              style={{
                gridColumn: "span 2",
                gridRow: "span 1",
              }}
            >
              <p
                style={{
                  color:
                    projectDetails[selected].actions[0].type === "live-site" &&
                    "#e9ffa8",
                }}
                className="text-2"
              >
                {projectDetails[selected].actions[0] &&
                  `${projectDetails[selected].actions[0].title}→`}
              </p>
            </div>
            <div
              className="work-grid-block work-grid-action-block"
              id="work-grid-project-action-two"
              style={{
                gridColumn: "span 2",
                gridRow: "span 1",
              }}
            >
              <p
                style={{
                  color:
                    projectDetails[selected].actions[0].type === "live-site" &&
                    "#e9ffa8",
                }}
                className="text-2"
              >
                {projectDetails[selected].actions[1] &&
                  `${projectDetails[selected].actions[1].title}→`}
              </p>
            </div>
          </>
        ) : (
          <>
            <div
              className="work-grid-block work-grid-action-block"
              id="work-grid-project-action-one"
              style={{
                gridColumn: "span 4",
                gridRow: "span 1",
              }}
            >
              <p
                style={{
                  color:
                    projectDetails[selected].actions.type === "live-site" &&
                    "#e9ffa8",
                }}
                className="text-2"
              >
                {`${projectDetails[selected].actions.title}→`}
              </p>
            </div>
          </>
        )
      ) : (
        <>
          <div
            className="work-grid-block"
            style={{
              gridColumn: "span 4",
              gridRow: "span 1",
            }}
          ></div>
        </>
      )}

      <div
        className="work-grid-block"
        style={{
          gridColumn: "span 1",
          gridRow: "span 1",
        }}
      ></div>
    </div>
  );
}
