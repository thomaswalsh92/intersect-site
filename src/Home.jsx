//styling
import "./Home.scss";

//react
import { useRef, useState, useEffect, Suspense } from "react";

//gsap
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollSmoother } from "gsap/ScrollSmoother";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { ScrambleTextPlugin } from "gsap/all";
import { SplitText } from "gsap/all";

//app
import {
  IntersectLogoLeft,
  IntersectLogoCenter,
  IntersectLogoRight,
} from "./IntersectLogo";
import rainydayImage from "./assets/images/rainyday-image.png";
import sonyTv from "./assets/images/sony-tv.png";
import useWindowDimensions from "./utils/useWindowDimensions";
import TeleCanvas from "./TeleCanvas";

gsap.registerPlugin(
  useGSAP,
  ScrollTrigger,
  ScrollSmoother,
  ScrollToPlugin,
  ScrambleTextPlugin,
  SplitText
);

export default function Home() {
  const { height, width } = useWindowDimensions();

  //*BG

  //*LANDING
  const landingCapabilties = ["WEB", "UX", "GRAPHICS", "BRAND", "MOTION", "3D"];

  //*REEL
  const [TVDialogOpen, setTVDialogOpen] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  // const handleMouseMove = (event) => {
  //   setMousePosition({
  //     x: event.clientX,
  //     y: event.clientY,
  //   });
  // };

  // useEffect(() => {
  //   console.log(TVDialogOpen);
  // }, [TVDialogOpen]);

  //*WORK
  //get computed size of details section for bg on workDetails section
  const workDetails = useRef(null);
  const [workDetailsHeight, setWorkDetailsHeight] = useState();
  useEffect(() => {
    setWorkDetailsHeight(workDetails.current.clientHeight);
  }, [workDetails]);

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

  //get computed width of work image to align controls section
  const workImage = useRef(null);
  const [workImageWidth, setWorkImageWidth] = useState();
  useEffect(() => {
    setWorkImageWidth(workImage.current.clientWidth);
  }, [workImage]);

  const [selectedProject, setSelectedProject] = useState(0);

  //*INFO
  const infoCapabilities = [
    "WEB DESIGN & DEVELOPMENT",
    "UI/UX",
    "MOTION DESIGN",
    "3D DESIGN, RENDERING & ANIMATION",
    "GRAPHIC DESIGN",
    "BRANDING",
  ];

  //*GSAP
  let pinSectionVal = "+=1200";

  useGSAP(() => {
    // if (!loaded) return;
    //*SCROLL PINNING
    gsap.from("#home-fixed", {
      scrollTrigger: {
        trigger: "#home-fixed",
        start: "top top",
        end: pinSectionVal,
        scrub: true,
        pin: true,
        // pinType: "fixed",
      },
    });

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

    //*LANDING
    //*Landing title anims

    function getStaggeredDuration(i, factor) {
      return Math.round(((i * factor) + factor + Number.EPSILON) * 100) / 100; //prettier-ignore
    }

    let landingTitleSplit = SplitText.create("#landing-title", {
      type: "chars",
      mask: "chars",
    });

    landingTitleSplit.chars.forEach((char, i) => {
      const text = landingTitleSplit._data.orig[0].html[i];
      const duration = getStaggeredDuration(
        Math.round((Math.random() * landingTitleSplit.chars.length) / 2),
        0.2
      );
      gsap.to(char, {
        duration: duration,
        scrambleText: {
          text: text,
          revealDelay: duration,
          speed: 0.8,
        },
      });
    });

    const landingCapabiltiesText = gsap.utils.toArray(
      ".landing-capability-text"
    );

    landingCapabiltiesText.forEach((el, i) => {
      const duration = getStaggeredDuration(i, 0.1);
      gsap.to(el, {
        duration: duration,
        scrambleText: {
          text: el.innerText,
          revealDelay: duration,
          speed: 1.5,
        },
      });
    });

    const landingFlavourText = gsap.utils.toArray(".landing-flavour-text");

    landingFlavourText.forEach((el, i) => {
      const duration = getStaggeredDuration(i, 0.2);
      gsap.to(el, {
        duration: duration,
        scrambleText: {
          text: el.innerText,
          revealDelay: duration,
          speed: 1.5,
        },
      });
    });

    //*Hide Scroll call to action
    let scrollCTATl = gsap.timeline({
      scrollTrigger: {
        trigger: "#home-bg",
        start: "top top",
        end: "+=1200",
        scrub: true,
        // pin: true,
      },
    });

    scrollCTATl
      .to("#landing-scroll-cta", { y: 86, duration: 99 })
      .to("#landing-scroll-cta", { opacity: 0, duration: 1 });
  }, []);

  //* GSAP smooth scroll init
  const wrapper = useRef();
  const content = useRef();
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

  const landingRef = useRef();
  const workRef = useRef();
  const infoRef = useRef();

  const handleNavScroll = (ref) => {
    // ScrollTrigger.getAll().forEach((st) => {
    //   if (st.pin) st.enabled = false;
    // });
    gsap.to(window, {
      duration: 0.2,
      scrollTo: ref,
      ease: "none",
      // onComplete: () => {
      //   ScrollTrigger.getAll().forEach((st) => {
      //     if (st.pin) st.enabled = true;
      //   });
      // },
    });
  };

  return (
    <>
      <div id="navbar">
        <p
          id="navbar-title"
          className="text-1"
          onClick={() => handleNavScroll(landingRef.current)}
        >
          INTERSECT
        </p>
        <div id="navbar-menu">
          <p
            className="text-2"
            onClick={() => handleNavScroll(landingRef.current)}
          >
            HOME
          </p>
          <p
            className="text-2"
            onClick={() => handleNavScroll(workRef.current)}
          >
            WORK
          </p>
          <p
            className="text-2"
            onClick={() => handleNavScroll(infoRef.current)}
          >
            INFO
          </p>
        </div>
      </div>
      <div id="footer">
        <div id="footer-bg"></div>
        <div id="footer-contact">
          <a className="text-2 footer-link">{"CONTACT->"}</a>
          <a className="text-2 footer-link" style={{ marginLeft: 16 }}>
            {"INSTAGRAM->"}
          </a>
        </div>
        <div id="footer-credits">
          <p className="text-2" style={{ marginRight: 32 }}>
            DESIGNED & DEVELOPED BY <span className="text-1">INTERSECT</span>
          </p>
          <p className="text-1">© INTERSECT 2025</p>
        </div>
      </div>
      <div id="smooth-wrapper" ref={wrapper}>
        <div id="smooth-content" ref={content}>
          <div id="home">
            <div id="home-fixed">
              <div id="home-bg-logo-stack">
                <div id="home-bg-logo-container">
                  <IntersectLogoLeft />
                  <IntersectLogoCenter />
                  <IntersectLogoRight />
                </div>
                <div id="home-bg-logo-container">
                  <IntersectLogoLeft />
                  <IntersectLogoCenter />
                  <IntersectLogoRight />
                </div>
                <div id="home-bg-logo-container">
                  <IntersectLogoLeft />
                  <IntersectLogoCenter />
                  <IntersectLogoRight />
                </div>
                <div id="home-bg-logo-container">
                  <IntersectLogoLeft />
                  <IntersectLogoCenter />
                  <IntersectLogoRight />
                </div>
              </div>
              <div id="home-bg-invert-layer"></div>
              <div id="landing-title-container">
                <span id="landing-title" className="text-1">
                  INTERSECT
                </span>
              </div>
            </div>
            <div id="home-content">
              {/* <div id="landing" ref={landingRef}>
                <div id="landing-capabilities" className="text-2">
                  <p className="landing-capability-text">
                    DESIGN & DEVELOPMENT
                  </p>
                  <p className="indent-1 landing-capability-text">{"{"}</p>
                  {landingCapabilties.map((item) => {
                    return (
                      <p className="indent-2 landing-capability-text">{`<${item} />`}</p>
                    );
                  })}
                  <p className="indent-1 landing-capability-text">{"}"}</p>
                </div>
                <div id="landing-flavour">
                  <p className="text-2">
                    <span className="text-1 landing-flavour-text">
                      INTERSECT
                    </span>{" "}
                    <span className="text-2 landing-flavour-text">
                      (verb): the integration technology, art, design, life.
                    </span>
                  </p>
                  <p className="text-2" style={{ "margin-top": 8 }}>
                    {" "}
                    <span className="text-2 landing-flavour-text">
                      In pursuit of
                    </span>{" "}
                    <span className="text-1 landing-flavour-text">DREAMS</span>{" "}
                    <span className="text-2 landing-flavour-text">
                      through digital means.
                    </span>
                  </p>
                </div>
                <div id="landing-scroll-cta-container">
                  <div id="landing-scroll-cta">
                    <p className="text-1">SCROLL</p>
                    <p id="landing-cta-arrow" className="text-1">{`->`}</p>
                  </div>
                </div>
                // {/* <div id="landing-title-container">
                //   <span id="landing-title" className="text-1">
                //     INTERSECT
                //   </span>
                // </div>
              </div> */}
              <div id="reel">
                <div
                  id="reel-tv-dialog"
                  style={{
                    opacity: TVDialogOpen ? "100%" : "0%",
                    top: mousePosition.y + 5,
                    left: mousePosition.x + 5,
                  }}
                ></div>
                {/* <img id="reel-image" src={sonyTv}></img> */}
                {/* <Suspense> */}
                <TeleCanvas
                  height={height}
                  width={width}
                  contextId={"reel-tv-canvas"}
                  TVDialogOpen={TVDialogOpen}
                  setTVDialogOpen={(bool) => setTVDialogOpen(bool)}
                />
                {/* </Suspense> */}
              </div>
              <div id="work" ref={workRef}>
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
                          {projectDetails[0].description}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div id="info" ref={infoRef}>
                <div id="info-text">
                  <p className="text-2 info-heading">
                    WE ARE <span className="text-1">INTERSECT</span>
                  </p>
                  <p className="text-3 info-text" style={{ marginTop: 8 }}>
                    A design studio focusing on the delivery of ideas across
                    digital mediums, pushing creative boundaries and exploration
                    of the fertile space between creativity and technology.
                  </p>
                  <p className="text-1 info-heading" style={{ marginTop: 16 }}>
                    CAPABILITIES
                  </p>
                  <div id="info-capabilities" style={{ marginTop: 8 }}>
                    {infoCapabilities.map((x) => {
                      return <p className="text-3 info-text">{`> ${x}`}</p>;
                    })}
                  </div>
                  {/*Change mail to when domain registered*/}
                  <a
                    href="mailto:test@test.com"
                    style={{ textDecoration: "none" }}
                  >
                    <p id="info-contact" style={{ marginTop: 32 }}>
                      <span className="text-1 info-underlined">GET</span>
                      <span className="text-3 info-non-underlined">_</span>
                      <span className="text-1 info-underlined">IN</span>
                      <span className="text-3 info-non-underlined">_</span>
                      <span className="text-1 info-underlined">TOUCH</span>
                      <span className="text-2 info-non-underlined">{`->`}</span>
                    </p>
                  </a>
                </div>
                <div id="info-image">
                  <img src={sonyTv} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
