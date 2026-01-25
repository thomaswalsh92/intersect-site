//libs
import { BrowserRouter, Routes, Route } from "react-router";
import { useState, useEffect, useRef } from "react";

//app
import Home from "./Home";
import { projectDetails } from "./data/projectDetails";
import ExplorePage from "./ExplorePage";
import { TeleProvider } from "./tele/TeleContext";
import TeleCanvas from "./tele/TeleCanvas";
import { useTele } from "./tele/TeleContext";
// import { Component } from "./Component";

export default function App() {
  const [currentProject, setCurrentProject] = useState(null);

  useEffect(() => {
    const slug = window.location.pathname.slice(1); // remove leading "/"
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
    <TeleProvider>
      <AppInner
        currentProject={currentProject}
        openProject={openProject}
        closeProject={closeProject}
      />
    </TeleProvider>
  );

  function AppInner({ currentProject, openProject, closeProject }) {
    const { setCanvasTarget } = useTele();

    const testContainer = useRef(null);
    useEffect(() => {
      if (testContainer.current) {
        setCanvasTarget(testContainer.current);
      }
    }, [testContainer, setCanvasTarget]);

    return (
      <>
        {/* <div ref={testContainer} id="test-canvas-container"></div> */}
        <TeleCanvas />
        <Home onProjectClick={openProject} />
        {currentProject && (
          <ExplorePage slug={currentProject} onClose={closeProject} />
        )}
      </>
    );
  }
  // <BrowserRouter>
  //   <TeleProvider>
  //     {/* Mounted once, persistent WebGL */}
  //     <TeleCanvas />

  //     {/* Normal React Router pages */}
  //     <Routes>
  //       <Route path="/" element={<Home />} />
  //       <Route path="/project/:slug" element={<ProjectPage />} />
  //     </Routes>
  //   </TeleProvider>
  // </BrowserRouter>;
  // return <Home />;
}
