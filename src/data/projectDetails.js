import cropCover from "../assets/images/work-crop-cover.jpg";
import darskCover from "../assets/images/work-darsk-cover.jpg";
import johnPeelCover from "../assets/images/work-john-peel-cover.jpg";
import rainydayCover from "../assets/images/work-rainyday-cover.jpg";
import shimmerCover from "../assets/images/work-shimmer-cover.jpg";
import synEightCover from "../assets/images/work-syneight-cover.jpg";

export const projectDetails = [
  {
    slug: "rainyday",
    project: "RAINYDAY WEBSITE",
    client: "RAINYDAY STUDIO",
    disciplines: ["WEB DESIGN", "WEB DEVELOPMENT"],
    published: 2025,
    shortDescription:
      "RAINYDAY Lorem ipsum dolor sit amet, consectetur adipiscing elit. ",
    showSmallScreen: true,
    actions: [
      {
        type: "live-site",
        title: "LIVE SITE",
        url: "https://www.rainydaystudio.co.uk/",
      },
      {
        type: "explore",
        title: "EXPLORE",
      },
    ],
    coverImage: rainydayCover,
  },
  {
    slug: "john-peel",
    project: "JOHN PEEL COLLECTION",
    client: "OMEGA AUCTIONS",
    disciplines: ["GRAPHIC DESIGN"],
    published: 2025,
    shortDescription:
      "JOHN PEEL Lorem ipsum dolor sit amet, consectetur adipiscing elit. ",
    actions: undefined,
    coverImage: johnPeelCover,
    showSmallScreen: true,
    actions: [
      {
        type: "explore",
        title: "EXPLORE",
      },
      undefined,
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
    actions: undefined,
    coverImage: cropCover,
    showSmallScreen: false,
    actions: [
      {
        type: "explore",
        title: "EXPLORE",
      },
      undefined,
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
    actions: undefined,
    coverImage: darskCover,
    showSmallScreen: false,
    actions: [
      {
        type: "explore",
        title: "EXPLORE",
      },
      undefined,
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
    actions: undefined,
    coverImage: shimmerCover,
    showSmallScreen: false,
    actions: [
      {
        type: "explore",
        title: "EXPLORE",
      },
      undefined,
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
    actions: undefined,
    coverImage: synEightCover,
    showSmallScreen: true,
    actions: [
      {
        type: "explore",
        title: "EXPLORE",
      },
      undefined,
    ],
  },
];
