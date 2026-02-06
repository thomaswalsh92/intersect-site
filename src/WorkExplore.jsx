//react
import { useEffect, useRef, useState } from "react";

//styling
import "./scss/Home.scss";

//app
import rainydayNineSixteenNumberOne from "./assets/images/rainyday/rainyday-9-16-num1.jpg";
import rainydayNineSixteenNumberTwo from "./assets/images/rainyday/rainyday-9-16-num2.jpg";
import rainydayNineSixteenNumberThree from "./assets/images/rainyday/rainyday-9-16-num3.jpg";
import rainydaySixteenNineNumberOne from "./assets/images/rainyday/rainyday-16-9-num1.jpg";
import rainydaySixteenNineNumberTwo from "./assets/images/rainyday/rainyday-16-9-num2.jpg";
import { useBreakpoint } from "./utils/useBreakpoint";
import WorkExploreDesktop from "./WorkExploreDesktop";
import WorkExploreSmallScreen from "./WorkExploreSmallScreen";

export default function WorkExplore({
  active,
  currentProject,
  closeProject,
  projectDetails,
}) {
  const isDesktop = useBreakpoint("lg", "up");
  const currentProjectData = projectDetails.find(
    ({ slug }) => slug === currentProject,
  );
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
      {isDesktop && (
        <WorkExploreDesktop
          active={active}
          currentProjectData={currentProjectData}
          imagePlaceholders={imagePlaceholders}
        />
      )}
      <div id="work-explore-scroll">
        {!isDesktop && (
          <WorkExploreSmallScreen
            active={active}
            currentProjectData={currentProjectData}
            imagePlaceholders={imagePlaceholders}
          />
        )}
      </div>
    </div>
  );
}
