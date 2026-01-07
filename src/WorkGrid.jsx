//react
import { useRef, useState, useEffect, useLayoutEffect } from "react";

//gsap
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(useGSAP, ScrollTrigger);

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

  const gridContainer = useRef(null);

  const collapsedHeight = 90;
  const [expandedHeight, setExpandedHeight] = useState(0);
  const [expandedRow, setExpandedRow] = useState(0);

  const rowRefs = useRef([]);
  const imageRowRef = useRef();
  const expandedHeightRef = useRef();

  useEffect(() => {
    const containerHeight = gridContainer.current.offsetHeight;
    const expandedHeight =
      containerHeight - collapsedHeight * (projectDetails.length - 1);
    setExpandedHeight(expandedHeight);
  }, [gridContainer, window.innerHeight]);

  useLayoutEffect(() => {
    if (!gridContainer.current || rowRefs.current.length === 0) return;

    const containerHeight = gridContainer.current.offsetHeight;
    const expandedHeightCalc =
      containerHeight - collapsedHeight * (projectDetails.length - 1);

    // set initial height of first row
    gsap.set(rowRefs.current[0], { height: expandedHeightCalc });

    // store in a ref for later scroll animation
    expandedHeightRef.current = expandedHeightCalc;
  }, []);

  useEffect(() => {
    console.log("hello");
    gsap.to(rowRefs.current, {
      height: collapsedHeight,
      duration: 0.25,
      ease: "power2.inOut",
    });

    gsap.to(rowRefs.current[expandedRow], {
      height: expandedHeightRef.current,
      duration: 0.25,
      ease: "power2.inOut",
    });
  }, [expandedRow]);

  //gsap
  useGSAP(
    () => {
      if (!gridContainer.current) return;
      ScrollTrigger.create({
        trigger: "#work",
        start: "top top",
        end: `+=2400`,
        onUpdate: ({ progress }) => {
          const quantizedScrollPos = Math.min(
            projectDetails.length - 1,
            Math.floor(progress * projectDetails.length)
          );
          console.log(quantizedScrollPos);
          setExpandedRow(quantizedScrollPos);
        },
      });
    },
    { dependencies: [gridContainer] }
  );

  useEffect(() => {
    console.log(expandedRow);
  }, [expandedRow]);

  useLayoutEffect(() => {
    gsap.set(rowRefs.current[0], { height: expandedHeight });
  }, [expandedHeight]);

  return (
    <div id="work-container" ref={gridContainer}>
      <div id="work-gallery">
        {projectDetails.map((proj, index) => {
          return (
            <div
              key={proj.project}
              ref={(el) => (rowRefs.current[index] = el)}
              className="work-grid-row"
              style={{
                position: "relative",
                "--hide-border": index === projectDetails.length - 1 ? 1 : 0,
              }}
            >
              <div className="work-grid-row-main">
                <p id="work-grid-project" className="text-1">
                  {proj.project}
                </p>
                <p id="work-grid-client" className="text-1">
                  {proj.client}
                </p>
                <p id="work-grid-disciplines" className="text-1">
                  {proj.disciplines.map((val, i) => {
                    if (i === proj.disciplines.length - 1) return val;
                    else return val + " / ";
                  })}
                </p>
                <p id="work-grid-published" className="text-1">
                  {proj.published}
                </p>
              </div>
              <div
                ref={imageRowRef}
                style={{ height: expandedHeight - collapsedHeight * 2 }}
                className="work-grid-row-images"
              >
                <div
                  style={{
                    height: expandedHeight - collapsedHeight * 2,
                    aspectRatio: "16 / 9",
                  }}
                  className="work-grid-image-placeholder image-sixteen-nine"
                ></div>
                <div
                  style={{
                    height: expandedHeight - collapsedHeight * 2,
                    aspectRatio: "4 / 5",
                  }}
                  className="work-grid-image-placeholder image-four-five"
                ></div>
              </div>
              <div className="work-grid-row-secondary">
                <p className="text-2">{proj.description}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
