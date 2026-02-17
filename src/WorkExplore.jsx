//react
import { useEffect, useRef, useState } from "react";

//styling
import "./scss/Home.scss";

//app
// import rainydayNineSixteenNumberOne from "./assets/images/rainyday/rainyday-9-16-num1.jpg";
// import rainydayNineSixteenNumberTwo from "./assets/images/rainyday/rainyday-9-16-num2.jpg";
// import rainydayNineSixteenNumberThree from "./assets/images/rainyday/rainyday-9-16-num3.jpg";
// import rainydaySixteenNineNumberOne from "./assets/images/rainyday/rainyday-16-9-num1.jpg";
// import rainydaySixteenNineNumberTwo from "./assets/images/rainyday/rainyday-16-9-num2.jpg";
import johnPeelSixteenNineOne from "./assets/images/john-peel/john-peel-16-9-num1.jpg";
import johnPeelFourFiveOne from "./assets/images/john-peel/john-peel-4-5-num1.jpg";
import johnPeelFourFiveTwo from "./assets/images/john-peel/john-peel-4-5-num2.jpg";

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
  // const imagePlaceholders = [
  //   { aspectRatio: "16 / 9", img: johnPeelSixteenNineOne },
  //   { aspectRatio: "4 / 5", img: johnPeelFourFiveOne },
  //   { aspectRatio: "4 / 5", img: johnPeelFourFiveTwo },
  //   // { aspectRatio: "16 / 9", img: rainydaySixteenNineNumberOne },
  //   // { aspectRatio: "9 / 16", img: rainydayNineSixteenNumberTwo },
  //   // { aspectRatio: "9 / 16", img: rainydayNineSixteenNumberThree },
  //   // { aspectRatio: "9 / 16", img: rainydayNineSixteenNumberOne },
  //   // { aspectRatio: "16 / 9", img: rainydaySixteenNineNumberTwo },
  // ];
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
          images={currentProjectData.images}
        />
      )}
      <div id="work-explore-scroll">
        {!isDesktop && (
          <WorkExploreSmallScreen
            active={active}
            currentProjectData={currentProjectData}
            images={currentProjectData.images}
          />
        )}
      </div>
    </div>
  );
}
