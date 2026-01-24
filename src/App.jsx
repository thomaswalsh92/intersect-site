//libs
import { BrowserRouter, Routes, Route } from "react-router";

//app
import Home from "./Home";
import { projectDetails } from "./data/projectDetails";
import ExplorePage from "./ExplorePage";
// import { Component } from "./Component";

export default function App() {
  console.log();
  return (
    <BrowserRouter>
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
    </BrowserRouter>
  );
  // return <Home />;
}
