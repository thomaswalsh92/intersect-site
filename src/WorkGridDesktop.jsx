//react
import { useRef, useState, useEffect, useLayoutEffect } from "react";

//gsap
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { useBreakpoint } from "./utils/useBreakpoint";

gsap.registerPlugin(useGSAP, ScrollTrigger, ScrollToPlugin);

export default function WorkGridDesktop({ projectDetails, openProject }) {
  //! STUBBED DATA to be removed
  // supports 2 length array of actions e.g. live site and explore e.g.
  // actions: [{type: string, title: string, url: string}, {type: string, title: string, url: string}]

  //types: "live-site", "explore"

  //* refactor opp -> change to useReducer
  const [width, setWidth] = useState();
  const [height, setHeight] = useState();
  // \/
  const [imageHeight, setImageHeight] = useState();
  const [imageWidth, setImageWidth] = useState();
  const [imageIsMaxVertical, setImageIsMaxVertical] = useState();
  // \/
  const [cols, setCols] = useState();
  const [rows, setRows] = useState();
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

    setRows(`1fr ${imageHeight}px 1fr`);
  }, [imageHeight, imageWidth, imageIsMaxVertical]);

  const projectsSelectedColor = "#f4f4f3";
  const projectsExtraDarkColor = "#1d1e1e";
  // const bgColor = "#2f3031";

  function handleActionClick(actionNum) {
    // const selectedProject = projectDetails[selected];
    // if (selectedProject.actions[actionNum].type === "explore") {
    //   navigate(selectedProject.slug);
    // }
  }

  return (
    <div
      id="work-grid"
      ref={workGrid}
      style={{
        height: "100%",
        width: "100%",
        display: "grid",
        gridTemplateColumns: cols,
        gridTemplateRows: rows,
      }}
    >
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
          gridTemplateRows: `1fr repeat(${projectDetails.length}, ${
            useBreakpoint("4k", "up") ? "86px" : "64px"
          }) 1fr`,
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
              onClick={() => openProject(projectDetails[selected].slug)}
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
              onClick={() => openProject(projectDetails[selected])}
            >
              <p
                style={{
                  color:
                    projectDetails[selected].actions[1] &&
                    projectDetails[selected].actions[1].type === "live-site" &&
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
              onClick={() => openProject(projectDetails[selected].slug)}
            >
              <p
                style={{
                  color:
                    projectDetails[selected].actions[0].type === "live-site" &&
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
