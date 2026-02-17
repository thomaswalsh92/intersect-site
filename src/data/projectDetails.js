//images
import rainydayCover from "../assets/images/work-rainyday-cover.jpg";
import johnPeelCover from "../assets/images/work-john-peel-cover.jpg";
import cropCover from "../assets/images/work-crop-cover.jpg";
import darskCover from "../assets/images/work-darsk-cover.jpg";
import shimmerCover from "../assets/images/work-shimmer-cover.jpg";
import synEightCover from "../assets/images/work-syneight-cover.jpg";

//rainydayImages
import rainydayNineSixteenNumberOne from "../assets/images/rainyday/rainyday-9-16-num1.jpg";
import rainydayNineSixteenNumberTwo from "../assets/images/rainyday/rainyday-9-16-num2.jpg";
import rainydayNineSixteenNumberThree from "../assets/images/rainyday/rainyday-9-16-num3.jpg";
import rainydaySixteenNineNumberOne from "../assets/images/rainyday/rainyday-16-9-num1.jpg";
import rainydaySixteenNineNumberTwo from "../assets/images/rainyday/rainyday-16-9-num2.jpg";

//johnPeelImages
import johnPeelSixteenNineOne from "../assets/images/john-peel/john-peel-16-9-num1.jpg";
import johnPeelFourFiveOne from "../assets/images/john-peel/john-peel-4-5-num1.jpg";
import johnPeelFourFiveTwo from "../assets/images/john-peel/john-peel-4-5-num2.jpg";

//darsk
import darskNineSixteenOne from "../assets/images/darsk/darsk-9-16-num1.jpg";
import darskSixteenNineOne from "../assets/images/darsk/darsk-16-9-num1.jpg";

//shimmer
import shimmerSixteenNineOne from "../assets/images/shimmer/shimmer-16-9-num1.jpg";
import shimmerSixteenNineTwo from "../assets/images/shimmer/shimmer-16-9-num2.jpg";
import shimmerFourFiveOne from "../assets/images/shimmer/shimmer-4-5-num1.jpg";

//syneight
import synEightNineSixteenOne from "../assets/images/syneight/syneight-9-16-num1.jpg";
import synEightNineSixteenTwo from "../assets/images/syneight/syneight-9-16-num2.jpg";
import synEightNineSixteenThree from "../assets/images/syneight/syneight-9-16-num3.jpg";
import synEightNineSixteenFour from "../assets/images/syneight/syneight-9-16-num4.jpg";
import synEightNineSixteenFive from "../assets/images/syneight/syneight-9-16-num5.jpg";

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
    images: [
      { aspectRatio: "16 / 9", img: rainydaySixteenNineNumberOne },
      { aspectRatio: "9 / 16", img: rainydayNineSixteenNumberTwo },
      { aspectRatio: "9 / 16", img: rainydayNineSixteenNumberThree },
      { aspectRatio: "9 / 16", img: rainydayNineSixteenNumberOne },
      { aspectRatio: "16 / 9", img: rainydaySixteenNineNumberTwo },
    ],
    smallScreenImageLayout: [
      { type: "wide", images: [rainydaySixteenNineNumberOne] },
      {
        type: "double",
        aspectRatio: "9 / 16",
        images: [rainydayNineSixteenNumberTwo, rainydayNineSixteenNumberThree],
      },
      { type: "wide", images: [rainydaySixteenNineNumberTwo] },
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
    images: [
      { aspectRatio: "4 / 5", img: johnPeelFourFiveOne },
      { aspectRatio: "4 / 5", img: johnPeelFourFiveTwo },
      { aspectRatio: "16 / 9", img: johnPeelSixteenNineOne },
    ],
    smallScreenImageLayout: [
      {
        type: "double",
        aspectRatio: "4 / 5",
        images: [johnPeelFourFiveOne, johnPeelFourFiveTwo],
      },
      { type: "wide", images: [johnPeelSixteenNineOne] },
    ],
  },
  // {
  //   slug: "crop-radio",
  //   project: "CROP MAGAZINE LAUNCH",
  //   client: "CROP RADIO",
  //   disciplines: ["MOTION DESIGN"],
  //   published: 2025,
  //   shortDescription:
  //     "CROP MAGAZINE Lorem ipsum dolor sit amet, consectetur adipiscing elit. ",
  //   longDescription:
  //     "CROP MAGAZINE Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla vel ante diam. Duis rhoncus sapien enim, sagittis ornare dolor mattis sed. Sed id faucibus enim. Aenean porta sagittis nisl eu egestas. Ut felis dolor, ultricies in tristique vitae, venenatis et nisi. Etiam porta consectetur justo quis ornare. Nullam rutrum vulputate.",
  //   showSmallScreen: false,
  //   explore: true,
  //   liveSite: false,
  //   coverImage: cropCover,
  //   //! TEST PLACEHOLDER
  //   images: [
  //     { aspectRatio: "16 / 9", img: rainydaySixteenNineNumberOne },
  //     { aspectRatio: "16 / 9", img: rainydaySixteenNineNumberOne },
  //   ],
  //   smallScreenImageLayout: [
  //     { type: "wide", images: [0] },
  //     { type: "double", aspectRatio: "9 / 16", images: [1, 2] },
  //   ],
  // },
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
    images: [
      // { aspectRatio: "4 / 5", img: darskCover },
      { aspectRatio: "9 / 16", img: darskNineSixteenOne },
      { aspectRatio: "16 / 9", img: darskSixteenNineOne },
    ],
    // smallScreenImageLayout: [
    //   { type: "wide", images: [0] },
    //   { type: "double", aspectRatio: "9 / 16", images: [1, 2] },
    // ],
  },
  {
    slug: "shimmer",
    project: "SHIMMER VISUAL IDENTITY",
    client: "SHIMMER",
    disciplines: ["GRAPHIC DESIGN", "MOTION DESIGN"],
    published: 2025,
    shortDescription:
      "SHIMMER Lorem ipsum dolor sit amet, consectetur adipiscing elit. ",
    longDescription:
      "SHIMMER Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla vel ante diam. Duis rhoncus sapien enim, sagittis ornare dolor mattis sed. Sed id faucibus enim. Aenean porta sagittis nisl eu egestas. Ut felis dolor, ultricies in tristique vitae, venenatis et nisi. Etiam porta consectetur justo quis ornare. Nullam rutrum vulputate.",
    showSmallScreen: true,
    explore: true,
    liveSite: false,
    coverImage: shimmerCover,
    images: [
      { aspectRatio: "16 / 9", img: shimmerSixteenNineOne },
      { aspectRatio: "4 / 5", img: shimmerFourFiveOne },
      { aspectRatio: "16 / 9", img: shimmerSixteenNineTwo },
    ],
    smallScreenImageLayout: [
      { type: "wide", images: [shimmerSixteenNineOne] },
      {
        type: "double",
        aspectRatio: "4 / 5",
        images: [shimmerFourFiveOne, shimmerCover],
      },
      { type: "wide", images: [shimmerSixteenNineTwo] },
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
    showSmallScreen: false,
    explore: true,
    liveSite: false,
    coverImage: synEightCover,
    images: [
      { aspectRatio: "9 / 16", img: synEightNineSixteenOne },
      { aspectRatio: "9 / 16", img: synEightNineSixteenTwo },
      { aspectRatio: "9 / 16", img: synEightNineSixteenThree },
      { aspectRatio: "9 / 16", img: synEightNineSixteenFour },
      { aspectRatio: "9 / 16", img: synEightNineSixteenFive },
    ],
    // smallScreenImageLayout: [
    //   { type: "wide", images: [0] },
    //   { type: "double", aspectRatio: "9 / 16", images: [1, 2] },
    // ],
  },
];
