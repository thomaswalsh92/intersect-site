//react
import { useEffect, useState } from "react";

//gsap
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";

//app
import Home from "./Home";
import WorkExplore from "./WorkExplore";
import { projectDetails } from "./data/projectDetails";

export default function App() {
  const [appReady, setAppReady] = useState(false);
  const [currentProject, setCurrentProject] = useState(null);

  useEffect(() => {
    const slug = window.location.pathname.slice(1);
    if (slug && projectDetails.find((p) => p.slug === slug)) {
      setCurrentProject(slug);
    }
  }, []);

  useEffect(() => {
    const handlePopState = (event) => {
      setCurrentProject(event.state?.project || null);
    };
    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  const openProject = (slug) => {
    setCurrentProject(slug);
    window.history.pushState({ project: slug }, "", `/${slug}`);
  };

  const closeProject = () => {
    gsap.to("#work-explore", {
      x: "100vw",
      duration: 0.6,
      ease: "power2.inOut",
      onComplete: () => {
        setCurrentProject(null);
        window.history.pushState({}, "", "/");
      },
    });
  };

  useGSAP(() => {
    if (!!currentProject && !appReady) {
      gsap.set("#work-explore", {
        x: 0,
      });
    }

    if (currentProject && appReady) {
      gsap.from("#work-explore", {
        x: "100vw",
        duration: 0.6,
        ease: "power2.inOut",
      });
    }
  }, [currentProject]);

  console.log("App ready: ", appReady);
  console.log("Current Project: ", !!currentProject);

  return (
    <>
      <Home
        appReady={appReady}
        setAppReady={setAppReady}
        openProject={openProject}
        closeProject={closeProject}
        currentProject={currentProject}
      />

      <WorkExplore
        active={!!currentProject}
        currentProject={currentProject}
        closeProject={closeProject}
        projectDetails={projectDetails}
      />
    </>
  );
}
