export default function WorkActions({
  selectedProject,
  openProject,
  screenSize,
}) {
  const hasLiveSite = selectedProject.liveSite;
  const exploreSpan = hasLiveSite
    ? screenSize === "desktop"
      ? "span 2"
      : "span 1"
    : screenSize === "desktop"
      ? "span 4"
      : "span 2";

  return (
    <>
      {selectedProject.explore ? (
        <div
          className="work-grid-block work-grid-action-block"
          id="work-grid-action-explore"
          style={{ gridColumn: exploreSpan, gridRow: "span 1" }}
          onClick={() => openProject(selectedProject.slug)}
        >
          <p className="text-2">{"EXPLORE->"}</p>
        </div>
      ) : (
        <div
          className="work-grid-block"
          style={{ gridColumn: exploreSpan, gridRow: "span 1" }}
        ></div>
      )}
      {hasLiveSite && (
        <div
          className="work-grid-block work-grid-action-block"
          id="work-grid-action-live-site"
          style={{
            gridColumn: screenSize === "desktop" ? "span 2" : "span 1",
            gridRow: "span 1",
          }}
        >
          <a href={selectedProject.liveSiteUrl}>
            <p className="text-2">{"LIVE SITE->"}</p>
          </a>
        </div>
      )}
    </>
  );
}
// <>
//   {selectedProject.actions ? (
//     Array.isArray(selectedProject.actions) ? (
//       <>
//         <div
//           className="work-grid-block work-grid-action-block"
//           id="work-grid-project-action-one"
//           style={{
//             gridColumn: "span 2",
//             gridRow: "span 1",
//           }}
//           onClick={() => openProject(projectDetails[selected].slug)}
//         >
//           <p
//             style={{
//               color:
//                 projectDetails[selected].actions[0].type === "live-site" &&
//                 "#e9ffa8",
//             }}
//             className="text-2"
//           >
//             {projectDetails[selected].actions[0] &&
//               `${projectDetails[selected].actions[0].title}→`}
//           </p>
//         </div>
//         <div
//           className="work-grid-block work-grid-action-block"
//           id="work-grid-project-action-two"
//           style={{
//             gridColumn: "span 2",
//             gridRow: "span 1",
//           }}
//           onClick={() => openProject(projectDetails[selected])}
//         >
//           <p
//             style={{
//               color:
//                 projectDetails[selected].actions[1] &&
//                 projectDetails[selected].actions[1].type === "live-site" &&
//                 "#e9ffa8",
//             }}
//             className="text-2"
//           >
//             {projectDetails[selected].actions[1] &&
//               `${projectDetails[selected].actions[1].title}→`}
//           </p>
//         </div>
//       </>
//     ) : (
//       <>
//         <div
//           className="work-grid-block work-grid-action-block"
//           id="work-grid-project-action-one"
//           style={{
//             gridColumn: "span 4",
//             gridRow: "span 1",
//           }}
//           onClick={() => openProject(projectDetails[selected].slug)}
//         >
//           <p
//             style={{
//               color:
//                 projectDetails[selected].actions[0].type === "live-site" &&
//                 "#e9ffa8",
//             }}
//             className="text-2"
//           >
//             {`${projectDetails[selected].actions.title}→`}
//           </p>
//         </div>
//       </>
//     )
//   ) : (
//     <>
//       <div
//         className="work-grid-block"
//         style={{
//           gridColumn: "span 4",
//           gridRow: "span 1",
//         }}
//       ></div>
//     </>
//   )}
// </>
