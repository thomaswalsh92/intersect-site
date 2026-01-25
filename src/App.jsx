//libs
import { BrowserRouter, Routes, Route } from "react-router";

//app
import Home from "./Home";
import { projectDetails } from "./data/projectDetails";
import ExplorePage from "./ExplorePage";
import { TeleProvider } from "./tele/TeleContext";
import TeleCanvas from "./TeleCanvas";
// import { Component } from "./Component";

export default function App() {
  return (
    <BrowserRouter>
      <TeleProvider>
        <TeleCanvas />
        <Routes>
          <Route path="/" element={<Home />} />
          {Object.values(projectDetails).map((proj) => (
            <Route
              key={proj.slug}
              path={`/${proj.slug}`}
              element={<ExplorePage proj={proj} />}
            />
          ))}
        </Routes>
      </TeleProvider>
    </BrowserRouter>
  );

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
