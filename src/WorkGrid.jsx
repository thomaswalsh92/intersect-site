//react
import { useRef, useState, useEffect, useLayoutEffect } from "react";

//gsap
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";

gsap.registerPlugin(useGSAP, ScrollTrigger, ScrollToPlugin);

export default function WorkGrid() {
  //! STUBBED DATA to be removed
  const projectDetails = [
    {
      project: "RAINYDAY WEBSITE",
      client: "RAINYDAY STUDIO",
      disciplines: ["WEB DESIGN", "WEB DEVELOPMENT"],
      published: 2025,
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. ",
    },
    {
      project: "JOHN PEEL COLLECTION",
      client: "OMEGA AUCTIONS",
      disciplines: ["GRAPHIC DESIGN"],
      published: 2025,
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. ",
    },
    {
      project: "CROP MAGAZINE LAUNCH",
      client: "CROP RADIO",
      disciplines: ["MOTION DESIGN"],
      published: 2025,
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. ",
    },
    {
      project: "DARSK VISUAL IDENTITY",
      client: "DARSK",
      disciplines: ["GRAPHIC DESIGN", "MOTION DESIGN"],
      published: 2025,
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. ",
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
        background: "red",
      }}
    >
      {/* ROW ONE */}
      <div
        className="work-grid-block"
        id="work-grid-title"
        style={{
          background: "blue",
          gridColumn: "span 4",
          gridRow: "span 1",
        }}
      ></div>
      <div
        className="work-grid-block"
        style={{
          background: "gray",
          gridColumn: "span 2",
          gridRow: "span 1",
        }}
      ></div>
      <div
        className="work-grid-block"
        style={{
          background: "gray",
          gridColumn: "span 3",
          gridRow: "span 1",
        }}
      ></div>
      <div
        className="work-grid-block"
        style={{
          background: "gray",
          gridColumn: "span 1",
          gridRow: "span 1",
        }}
      ></div>
      <div
        className="work-grid-block"
        style={{
          background: "gray",
          gridColumn: "span 8",
          gridRow: "span 1",
        }}
      ></div>
      <div
        className="work-grid-block"
        style={{
          background: "gray",
          gridColumn: "span 1",
          gridRow: "span 1",
        }}
      ></div>
      {/* ROW TWO */}
      <div
        className="work-grid-block"
        style={{
          background: "gray",
          gridColumn: "span 2",
          gridRow: "span 1",
        }}
      ></div>
      <div
        className="work-grid-block"
        id="work-grid-project-list"
        style={{
          background: "blue",
          gridColumn: "span 8",
          gridRow: "span 1",
        }}
      ></div>
      <div
        className="work-grid-block"
        id="work-grid-project-image"
        style={{
          background: "orange",
          gridColumn: "span 8",
          gridRow: "span 1",
        }}
      ></div>
      <div
        className="work-grid-block"
        style={{
          background: "gray",
          gridColumn: "span 1",
          gridRow: "span 1",
        }}
      ></div>
      {/* ROW THREE */}
      <div
        className="work-grid-block"
        style={{
          background: "gray",
          gridColumn: "span 2",
          gridRow: "span 1",
        }}
      ></div>
      <div
        className="work-grid-block"
        style={{
          background: "gray",
          gridColumn: "span 2",
          gridRow: "span 1",
        }}
      ></div>
      <div
        className="work-grid-block"
        style={{
          background: "gray",
          gridColumn: "span 2",
          gridRow: "span 1",
        }}
      ></div>
      <div
        className="work-grid-block"
        style={{
          background: "gray",
          gridColumn: "span 3",
          gridRow: "span 1",
        }}
      ></div>
      <div
        className="work-grid-block"
        style={{
          background: "gray",
          gridColumn: "span 1",
          gridRow: "span 1",
        }}
      ></div>
      <div
        className="work-grid-block"
        style={{
          background: "blue",
          gridColumn: "span 4",
          gridRow: "span 1",
        }}
      ></div>
      <div
        className="work-grid-block"
        style={{
          background: "blue",
          gridColumn: "span 2",
          gridRow: "span 1",
        }}
      ></div>
      <div
        className="work-grid-block"
        style={{
          background: "blue",
          gridColumn: "span 2",
          gridRow: "span 1",
        }}
      ></div>
      <div
        className="work-grid-block"
        style={{
          background: "gray",
          gridColumn: "span 1",
          gridRow: "span 1",
        }}
      ></div>
    </div>
  );
}
