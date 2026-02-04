import cropCover from "../assets/images/work-crop-cover.jpg";
import darskCover from "../assets/images/work-darsk-cover.jpg";
import johnPeelCover from "../assets/images/work-john-peel-cover.jpg";
import rainydayCover from "../assets/images/work-rainyday-cover.jpg";
import shimmerCover from "../assets/images/work-shimmer-cover.jpg";
import synEightCover from "../assets/images/work-syneight-cover.jpg";

//eventually TS will be useful here
export const projectDetails = [
  {
    slug: "rainyday",
    project: "RAINYDAY WEBSITE",
    client: "RAINYDAY STUDIO",
    disciplines: ["WEB DESIGN", "WEB DEVELOPMENT"],
    published: 2025,
    shortDescription:
      "RAINYDAY Lorem ipsum dolor sit amet, consectetur adipiscing elit. ",
    longDescription:
      "RAINYDAY Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla vel ante diam. Duis rhoncus sapien enim, sagittis ornare dolor mattis sed. Sed id faucibus enim. Aenean porta sagittis nisl eu egestas. Ut felis dolor, ultricies in tristique vitae, venenatis et nisi. Etiam porta consectetur justo quis ornare. Nullam rutrum vulputate.",
    showSmallScreen: true,
    explore: true,
    liveSite: true,
    liveSiteUrl: "https://www.rainydaystudio.co.uk/",
    coverImage: rainydayCover,
    smallScreenImageLayout: [
      { type: "wide", images: [0] },
      { type: "double", aspectRatio: "9 / 16", images: [1, 2] },
    ],
  },
  {
    slug: "john-peel",
    project: "JOHN PEEL COLLECTION",
    client: "OMEGA AUCTIONS",
    disciplines: ["GRAPHIC DESIGN"],
    published: 2025,
    shortDescription:
      "JOHN PEEL Lorem ipsum dolor sit amet, consectetur adipiscing elit. ",
    longDescription:
      "JOHN PEEL Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla vel ante diam. Duis rhoncus sapien enim, sagittis ornare dolor mattis sed. Sed id faucibus enim. Aenean porta sagittis nisl eu egestas. Ut felis dolor, ultricies in tristique vitae, venenatis et nisi. Etiam porta consectetur justo quis ornare. Nullam rutrum vulputate.",
    showSmallScreen: true,
    explore: true,
    liveSite: false,
    coverImage: johnPeelCover,
    smallScreenImageLayout: [
      { type: "wide", images: [0] },
      { type: "double", aspectRatio: "9 / 16", images: [1, 2] },
    ],
  },
  {
    slug: "crop-radio",
    project: "CROP MAGAZINE LAUNCH",
    client: "CROP RADIO",
    disciplines: ["MOTION DESIGN"],
    published: 2025,
    shortDescription:
      "CROP MAGAZINE Lorem ipsum dolor sit amet, consectetur adipiscing elit. ",
    longDescription:
      "CROP MAGAZINE Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla vel ante diam. Duis rhoncus sapien enim, sagittis ornare dolor mattis sed. Sed id faucibus enim. Aenean porta sagittis nisl eu egestas. Ut felis dolor, ultricies in tristique vitae, venenatis et nisi. Etiam porta consectetur justo quis ornare. Nullam rutrum vulputate.",
    showSmallScreen: false,
    explore: true,
    liveSite: false,
    coverImage: cropCover,
    smallScreenImageLayout: [
      { type: "wide", images: [0] },
      { type: "double", aspectRatio: "9 / 16", images: [1, 2] },
    ],
  },
  {
    slug: "darsk",
    project: "DARSK VISUAL IDENTITY",
    client: "DARSK",
    disciplines: ["GRAPHIC DESIGN", "MOTION DESIGN"],
    published: 2025,
    shortDescription:
      "DARSK Lorem ipsum dolor sit amet, consectetur adipiscing elit. ",
    longDescription:
      "DARSK Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla vel ante diam. Duis rhoncus sapien enim, sagittis ornare dolor mattis sed. Sed id faucibus enim. Aenean porta sagittis nisl eu egestas. Ut felis dolor, ultricies in tristique vitae, venenatis et nisi. Etiam porta consectetur justo quis ornare. Nullam rutrum vulputate.",
    actions: undefined,
    showSmallScreen: false,
    explore: true,
    liveSite: false,
    coverImage: darskCover,
    smallScreenImageLayout: [
      { type: "wide", images: [0] },
      { type: "double", aspectRatio: "9 / 16", images: [1, 2] },
    ],
  },
  {
    slug: "shimmer",
    project: "SHIMMER VISUAL INDENTITY",
    client: "SHIMMER",
    disciplines: ["GRAPHIC DESIGN", "MOTION DESIGN"],
    published: 2025,
    shortDescription:
      "SHIMMER Lorem ipsum dolor sit amet, consectetur adipiscing elit. ",
    longDescription:
      "SHIMMER Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla vel ante diam. Duis rhoncus sapien enim, sagittis ornare dolor mattis sed. Sed id faucibus enim. Aenean porta sagittis nisl eu egestas. Ut felis dolor, ultricies in tristique vitae, venenatis et nisi. Etiam porta consectetur justo quis ornare. Nullam rutrum vulputate.",
    showSmallScreen: false,
    explore: true,
    liveSite: false,
    coverImage: shimmerCover,
    smallScreenImageLayout: [
      { type: "wide", images: [0] },
      { type: "double", aspectRatio: "9 / 16", images: [1, 2] },
    ],
  },
  {
    slug: "syn-eight",
    project: "SYN-EIGHT",
    client: "INTERSECT",
    disciplines: ["3D DESIGN", "MOTION DESIGN"],
    published: 2025,
    shortDescription:
      "SYNEIGHT Lorem ipsum dolor sit amet, consectetur adipiscing elit. ",
    longDescription:
      "SYNEIGHT Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla vel ante diam. Duis rhoncus sapien enim, sagittis ornare dolor mattis sed. Sed id faucibus enim. Aenean porta sagittis nisl eu egestas. Ut felis dolor, ultricies in tristique vitae, venenatis et nisi. Etiam porta consectetur justo quis ornare. Nullam rutrum vulputate.",
    showSmallScreen: true,
    explore: true,
    liveSite: false,
    coverImage: synEightCover,
    smallScreenImageLayout: [
      { type: "wide", images: [0] },
      { type: "double", aspectRatio: "9 / 16", images: [1, 2] },
    ],
  },
];
