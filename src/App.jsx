import { useEffect, useState } from "react";
import Home from "./Home";
import { projectDetails } from "./data/projectDetails";

export default function App() {
  const [currentProject, setCurrentProject] = useState(undefined);

  // On first load, check URL for a project slug
  useEffect(() => {
    const slug = window.location.pathname.slice(1); // remove leading "/"
    if (slug && projectDetails.find((p) => p.slug === slug)) {
      setCurrentProject(slug);
    }
  }, []);

  // Handle back/forward browser buttons
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

  console.log(currentProject);
  return (
    <>
      <Home
        openProject={openProject}
        closeProject={closeProject}
        currentProject={currentProject}
      />
    </>
  );
}
