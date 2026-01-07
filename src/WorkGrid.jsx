import { useRef, useState, useEffect, Suspense } from "react";

export default function WorkGrid() {
  //! STUBBED DATA to be removed
  const projectDetails = [
    {
      project: "RAINYDAY WEBSITE",
      client: "RAINYDAY STUDIO",
      disciplines: ["WEB DESIGN", "WEB DEVELOPMENT"],
      published: 2025,
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec mollis interdum tellus ut ultricies. In et faucibus enim, in suscipit nisi. Suspendisse quis ultrices turpis, quis pellentesque felis. Mauris et orci massa. Aenean ut dui urna. Morbi mauris dolor, cursus.",
    },
    {
      project: "JOHN PEEL COLLECTION",
      client: "OMEGA AUCTIONS",
      disciplines: ["GRAPHIC DESIGN"],
      published: 2025,
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec mollis interdum tellus ut ultricies. In et faucibus enim, in suscipit nisi. Suspendisse quis ultrices turpis, quis pellentesque felis. Mauris et orci massa. Aenean ut dui urna. Morbi mauris dolor, cursus.",
    },
    {
      project: "CROP MAGAZINE LAUNCH",
      client: "CROP RADIO",
      disciplines: ["MOTION DESIGN"],
      published: 2025,
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec mollis interdum tellus ut ultricies. In et faucibus enim, in suscipit nisi. Suspendisse quis ultrices turpis, quis pellentesque felis. Mauris et orci massa. Aenean ut dui urna. Morbi mauris dolor, cursus.",
    },
    {
      project: "DARSK VISUAL IDENTITY",
      client: "DARSK",
      disciplines: ["GRAPHIC DESIGN", "MOTION DESIGN"],
      published: 2025,
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec mollis interdum tellus ut ultricies. In et faucibus enim, in suscipit nisi. Suspendisse quis ultrices turpis, quis pellentesque felis. Mauris et orci massa. Aenean ut dui urna. Morbi mauris dolor, cursus.",
    },
  ];

  const getGridTemplateRows = (length) => {
    let string = "";
    for (let i = 0; i < length; i++) {
      string = string.concat("90px");
      if (i < length - 1) string = string.concat(" ");
    }
    return string;
  };

  const gridContainer = useRef(null);
  //   if (gridContainer.current) {
  //     console.log(gridContainer.current.innerHeight);
  //   }

  useEffect(() => {
    if (!gridContainer.current) return;
    const containerHeight = gridContainer.current.offsetHeight;
    console.log("containerHeight", containerHeight);
    const expandedRowHeight =
      containerHeight - (projectDetails.length - 1) * 96;

    console.log("expandedRowHeight", expandedRowHeight);
    projectDetails.map((project) => {
      return;
    });
  }, [gridContainer.current]);

  return (
    <div id="work-container" ref={gridContainer}>
      <div
        id="work-gallery"
        style={{
          gridTemplateRows: getGridTemplateRows(projectDetails.length),
        }}
      >
        {projectDetails.map((project, index) => {
          return (
            <div
              className="grid-test-row"
              style={{
                gridRow: index + 1,
                backgroundColor: index % 2 === 0 ? "blue" : "red",
              }}
            >
              {project.name}
            </div>
          );
        })}
      </div>
    </div>
  );
}
