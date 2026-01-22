//react
import { useRef, useState, useEffect, useLayoutEffect } from "react";

//gsap
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";

gsap.registerPlugin(useGSAP, ScrollTrigger, ScrollToPlugin);

export default function WorkGridSmallScreen({
  projectDetails,
  headerHeight,
  smallScreenProjectHeight,
  smallScreenPinVal,
}) {
  return (
    <div
      id="work-grid"
      style={{
        width: "100%",
        borderTop: "none",
      }}
    >
      {projectDetails.map((proj, index) => {
        return (
          <WorkGridSmallScreenItem
            proj={proj}
            index={index}
            headerHeight={headerHeight}
            smallScreenProjectHeight={smallScreenProjectHeight}
            smallScreenPinVal={smallScreenPinVal}
          />
        );
      })}
    </div>
  );
}

function WorkGridSmallScreenItem({
  proj,
  index,
  headerHeight,
  smallScreenProjectHeight,
  smallScreenPinVal,
}) {
  const itemRef = useRef(null);

  useGSAP(
    () => {
      gsap.from(itemRef.current, {
        scrollTrigger: {
          trigger: itemRef.current,
          start: `top top+=${headerHeight}`,
          end: `"+=${smallScreenPinVal}`,
          scrub: true,
          pin: true,
          pinSpacing: true,
        },
      });
    },
    { dependencies: [itemRef] }
  );
  return (
    <div
      ref={itemRef}
      style={{
        height: smallScreenProjectHeight,
        width: "100%",
        display: "grid",
        gridTemplateRows: "64vh 1fr 1fr 1fr",
        gridTemplateColumns: "1fr 1fr 1fr 1fr",
      }}
    >
      <div
        className="work-grid-block work-grid-project-image"
        style={{
          gridColumn: "span 4",
          gridRow: "span 1",
        }}
      >
        <img src={proj.coverImage} />
      </div>
      <div
        style={{ gridColumn: "span 2", gridRow: "span 1" }}
        className="work-grid-block work-grid-project-block"
        // id="work-grid-title"
      >
        <p className="text-1">{proj.project}</p>
      </div>
      {proj.actions ? (
        Array.isArray(proj.actions) ? (
          <>
            <div
              className="work-grid-block work-grid-action-block"
              id="work-grid-project-action-one"
              style={{
                gridColumn: "span 1",
                gridRow: "span 1",
              }}
            >
              <p
                style={{
                  color: proj.actions[0].type === "live-site" && "#e9ffa8",
                }}
                className="text-2"
              >
                {proj.actions[0] && `${proj.actions[0].title}→`}
              </p>
            </div>
            <div
              className="work-grid-block work-grid-action-block"
              id="work-grid-project-action-two"
              style={{
                gridColumn: "span 1",
                gridRow: "span 1",
              }}
            >
              <p
                style={{
                  color: proj.actions[0].type === "live-site" && "#e9ffa8",
                }}
                className="text-2"
              >
                {proj.actions[1] && `${proj.actions[1].title}→`}
              </p>
            </div>
          </>
        ) : (
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
                  color: proj.actions[0].type === "live-site" && "#e9ffa8",
                }}
                className="text-2"
              >
                {`${proj.actions.title}→`}
              </p>
            </div>
          </>
        )
      ) : (
        <>
          <div
            className="work-grid-block"
            style={{
              gridColumn: "span 2",
              gridRow: "span 1",
            }}
          ></div>
        </>
      )}
      <div
        style={{ gridColumn: "span 2", gridRow: "span 1" }}
        className="work-grid-block work-grid-project-block"
        // id="work-grid-title"
      >
        <p className="text-2">{proj.client}</p>
      </div>
      <div
        style={{ gridColumn: "span 2", gridRow: "span 2" }}
        className="work-grid-block work-grid-project-block"
        // id="work-grid-title"
      >
        <p className="text-1">{proj.shortDescription}</p>
      </div>
      <div
        style={{ gridColumn: "span 2", gridRow: "span 1" }}
        className="work-grid-block work-grid-project-block"
        // id="work-grid-title"
      >
        <p className="text-1">
          {proj.disciplines.map((el, i) => {
            let string = el;
            if (i < proj.disciplines.length - 1) {
              string = string + " / ";
            }
            return string;
          })}
        </p>
      </div>
    </div>
  );
}
