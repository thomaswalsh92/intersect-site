import { useEffect, useState } from "react";
import Home from "./Home";
import WorkExplore from "./WorkExplore";
import { projectDetails } from "./data/projectDetails";

export default function App() {
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
    setCurrentProject(null);
    window.history.pushState({}, "", "/");
  };

  return (
    <>
      <Home
        openProject={openProject}
        closeProject={closeProject}
        currentProject={currentProject}
      />

      <WorkExplore
        active={!!currentProject}
        currentProject={currentProject}
        closeProject={closeProject}
      />
    </>
  );
}
