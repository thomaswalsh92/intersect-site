//styling
import "./Home.scss";

//react
import { useRef, useState, useEffect } from "react";

//gsap
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollSmoother } from "gsap/ScrollSmoother";
import { SplitText } from "gsap/all";

//app
import {
  IntersectLogoLeft,
  IntersectLogoCenter,
  IntersectLogoRight,
} from "./IntersectLogo";
import rainydayImage from "./assets/images/rainyday-image.png";

gsap.registerPlugin(useGSAP, ScrollTrigger, ScrollSmoother);

export default function Home() {
  //todo - remove stubbed data
  const landingCapabilties = ["WEB", "UX", "GRAPHICS", "BRAND", "MOTION", "3D"];

  const projectDetails = [
    {
      project: "RAINYDAY WEBSITE",
      client: "RAINYDAY STUDIO",
      disciplines: ["WEB DESIGN", "WEB DEVELOPMENT"],
      published: 2025,
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec mollis interdum tellus ut ultricies. In et faucibus enim, in suscipit nisi. Suspendisse quis ultrices turpis, quis pellentesque felis. Mauris et orci massa. Aenean ut dui urna. Morbi mauris dolor, cursus.",
      image: rainydayImage,
    },
    { placeholder: true, placeholderNum: 2 },
    { placeholder: true, placeholderNum: 3 },
    { placeholder: true, placeholderNum: 4 },
    { placeholder: true, placeholderNum: 5 },
    { placeholder: true, placeholderNum: 6 },
    { placeholder: true, placeholderNum: 7 },
    { placeholder: true, placeholderNum: 8 },
  ];

  //todo end of stubbed data

  const wrapper = useRef();
  const content = useRef();

  //get computed size of details section for bg on workDetails section
  const workDetails = useRef(null);
  const [workDetailsHeight, setWorkDetailsHeight] = useState();
  useEffect(() => {
    setWorkDetailsHeight(workDetails.current.clientHeight);
  }, [workDetails]);

  //get computed width of work image to align controls section
  const workImage = useRef(null);
  const [workImageWidth, setWorkImageWidth] = useState();
  useEffect(() => {
    setWorkImageWidth(workImage.current.clientWidth);
  }, [workImage]);

  const [selectedProject, setSelectedProject] = useState(0);

  useGSAP(() => {
    console.log("select proj val is: ", selectedProject);
  }, [selectedProject]);
  //*GSAP* scroll pinning//
  let pinSectionVal = "+=600";

  // useGSAP(() => {
  //   gsap.from("#home-bg-logo-container", {
  //     scrollTrigger: {
  //       trigger: "body",
  //       start: "top top",
  //       end: "+=300",
  //       pin: true,
  //       markers: true,
  //     },
  //   });
  // });

  useGSAP(() => {
    gsap.from("#landing", {
      scrollTrigger: {
        trigger: "#landing",
        start: "top top",
        end: pinSectionVal,
        scrub: true,
        pin: true,
      },
    });

    gsap.from("#reel", {
      scrollTrigger: {
        trigger: "#reel",
        start: "top top",
        end: pinSectionVal,
        scrub: true,
        pin: true,
      },
    });

    gsap.from("#work", {
      scrollTrigger: {
        trigger: "#work",
        start: "top top",
        end: pinSectionVal,
        scrub: true,
        pin: true,
      },
    });

    gsap.from("#info", {
      scrollTrigger: {
        trigger: "#info",
        start: "top top",
        end: pinSectionVal,
        scrub: true,
        pin: true,
      },
    });
  });

  //* GSAP smooth scroll init
  useGSAP(
    () => {
      wrapper.current = ScrollSmoother.create({
        wrapper: wrapper.current,
        content: content.current,
        smooth: 1.5,
        effects: true,
        //normalizeScroll: true,
      });
    },
    { scope: wrapper }
  );

  return (
    <>
      <div id="navbar">
        <p id="navbar-title" className="text-1">
          INTERSECT
        </p>
        <div id="navbar-menu">
          <p className="text-2">HOME</p>
          <p className="text-2">WORK</p>
          <p className="text-2">INFO</p>
        </div>
      </div>
      <div id="footer">
        <div id="footer-contact">
          <a className="text-2 footer-link">{"CONTACT->"}</a>
          <a className="text-2 footer-link" style={{ marginLeft: 16 }}>
            {"INSTAGRAM->"}
          </a>
        </div>
        <div id="footer-credits">
          <div id="footer-bg"></div>
          <p className="text-2" style={{ color: "#393a3b", marginRight: 32 }}>
            DESIGNED & DEVELOPED BY{" "}
            <span className="text-1" style={{ color: "#161717" }}>
              INTERSECT
            </span>
          </p>
          <p className="text-1">© INTERSECT 2025</p>
        </div>
      </div>
      <div id="smooth-wrapper" ref={wrapper}>
        <div id="smooth-content" ref={content}>
          <div id="home">
            <div id="home-content">
              <div id="landing">
                <div id="landing-capabilities" className="text-2">
                  <p>DESIGN & DEVELOPMENT</p>
                  <p className="indent-1">{"{"}</p>
                  {landingCapabilties.map((item) => {
                    return <p className="indent-2">{`<${item} />`}</p>;
                  })}
                  <p className="indent-1">{"}"}</p>
                </div>
                <div id="landing-flavour">
                  <p className="text-2">
                    <span className="text-1">INTERSECT</span> (verb): the
                    integration technology, art, design, life.
                  </p>
                  <p className="text-2" style={{ "margin-top": 8 }}>
                    {" "}
                    In pursuit of <span className="text-1">DREAMS</span> through
                    digital means.
                  </p>
                </div>
                <div id="landing-title-container">
                  <div id="home-fixed">
                    <div id="home-bg-logo-container">
                      <IntersectLogoLeft />
                      <IntersectLogoCenter />
                      <IntersectLogoRight />
                    </div>
                    <div id="home-bg-invert-layer"></div>
                  </div>
                  <div>
                    <span id="landing-title" className="text-1">
                      INTERSECT
                    </span>
                  </div>
                </div>
              </div>
              <div id="reel">
                <span id="landing-title" className="text-1">
                  REEL
                </span>
              </div>
              <div id="work">
                <div id="work-grid">
                  <div id="work-gallery-container">
                    <div id="work-gallery-image-container">
                      <img
                        ref={workImage}
                        id="work-gallery-image"
                        src={rainydayImage}
                      />
                    </div>
                    <div id="work-gallery-controls-container">
                      <div
                        style={{ width: workImageWidth }}
                        id="work-gallery-controls"
                      >
                        <div
                          className="work-gallery-controls-click-area"
                          id="work-gallery-controls-click-area-l"
                          onClick={() =>
                            selectedProject > 0 &&
                            setSelectedProject(selectedProject - 1)
                          }
                        ></div>
                        <div
                          className="work-gallery-controls-arrow"
                          id="work-gallery-controls-arrow-l"
                        ></div>
                        <div
                          id="work-gallery-controls-indicator"
                          style={{
                            width:
                              12 +
                              (projectDetails.length - 1) * 8 +
                              24 +
                              4 * projectDetails.length,
                          }}
                        >
                          {projectDetails.map((project, index) => {
                            return (
                              <div
                                style={{
                                  width: index === selectedProject ? 12 : 8,
                                  height: index === selectedProject ? 12 : 8,
                                  marginLeft: 2,
                                  marginRight: 2,
                                  background: "#e2e2e1",
                                  clipPath: `circle(${
                                    index === selectedProject ? 6 : 4
                                  }px)`,
                                }}
                              ></div>
                            );
                          })}
                        </div>
                        <div
                          className="work-gallery-controls-arrow"
                          id="work-gallery-controls-arrow-r"
                        ></div>
                        <div
                          className="work-gallery-controls-click-area"
                          id="work-gallery-controls-click-area-r"
                          onClick={() =>
                            selectedProject < projectDetails.length - 1 &&
                            setSelectedProject(selectedProject + 1)
                          }
                        ></div>
                      </div>
                    </div>
                  </div>
                  <div id="work-details-container">
                    <div
                      id="work-details-bg"
                      style={{ height: workDetailsHeight }}
                    ></div>
                    <div id="work-details" ref={workDetails}>
                      {/*! stubbed data below */}
                      <div id="work-details-col-1">
                        <p
                          id="work-details-project-heading"
                          className="text-2 work-details-heading"
                        >
                          PROJECT
                        </p>
                        <p
                          id="work-details-project-text"
                          className="text-2 work-details-text"
                        >
                          {projectDetails[0].project}
                        </p>
                        <p
                          id="work-details-client-heading"
                          className="text-2 work-details-heading"
                        >
                          CLIENT
                        </p>
                        <p
                          id="work-details-client-text"
                          className="text-2 work-details-text"
                        >
                          {projectDetails[0].client}
                        </p>
                        <p
                          id="work-details-disciplines-heading"
                          className="text-2 work-details-heading"
                        >
                          DISCIPLINES
                        </p>
                        <div id="work-details-disciplines-badges-container">
                          {projectDetails[0].disciplines.map((item, index) => {
                            return (
                              <div
                                className="work-details-discipline-badge"
                                key={item + ":" + index}
                              >
                                <p className="text-2 work-details-discipline-badge-text">
                                  {item}
                                </p>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                      <div id="work-details-col-2">
                        <p
                          id="work-details-published-heading"
                          className="text-2 work-details-heading"
                        >
                          PUBLISHED
                        </p>
                        <p
                          id="work-details-published-text"
                          className="text-2 work-details-text"
                        >
                          2025
                        </p>
                        <p
                          id="work-details-description-text"
                          className="text-2 work-details-text"
                        >
                          Lorem ipsum dolor sit amet, consectetur adipiscing
                          elit. Donec mollis interdum tellus ut ultricies. In et
                          faucibus enim, in suscipit nisi. Suspendisse quis
                          ultrices turpis, quis pellentesque felis. Mauris et
                          orci massa. Aenean ut dui urna. Morbi mauris dolor,
                          cursus.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div id="info">
                <span id="landing-title" className="text-1">
                  INFO
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
