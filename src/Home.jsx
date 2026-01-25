//styling
import "./scss/Home.scss";

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

//three
import * as THREE from "three";

//app
import {
  IntersectLogoLeft,
  IntersectLogoCenter,
  IntersectLogoRight,
} from "./IntersectLogo";
import loadingGIF from "./assets/images/loading.gif";
import useWindowDimensions from "./utils/useWindowDimensions";
import WorkGridDesktop from "./WorkGridDesktop";
import WorkGridSmallScreen from "./WorkGridSmallScreen";
import { useBreakpoint } from "./utils/useBreakpoint";
import { BREAKPOINTS } from "./scss/breakpoints";
import { projectDetails } from "./data/projectDetails";
import { useTele } from "./tele/TeleContext";

THREE.Cache.enabled = true;

gsap.registerPlugin(
  useGSAP,
  ScrollTrigger,
  ScrollSmoother,
  ScrollToPlugin,
  ScrambleTextPlugin,
  SplitText
);

function LoadingScreen() {
  const counterRef = useRef(null);

  useGSAP(() => {
    gsap.fromTo(
      counterRef.current,
      { innerText: 0 },
      {
        innerText: 100,
        duration: 2,
        ease: "power1.out",
        snap: { innerText: 1 },
      }
    );
  });

  return (
    <div id="loading-screen">
      <img src={loadingGIF} alt="Loading..." />
      <p className="text-1">
        LOADING
        <span className="text-1" id="loading-underscore-blink">
          _
        </span>
      </p>
    </div>
  );
}

export default function Home() {
  const landingRef = useRef();
  const workRef = useRef();
  const reelRef = useRef();
  const infoRef = useRef();

  //*LANDING
  const landingCapabilties = ["WEB", "UX", "GRAPHICS", "BRAND", "MOTION", "3D"];
  const landingTitleScrollInner = useRef();

  //*TELE
  // const teleTargetLanding = useRef();
  // const teleTargetReel = useRef();
  // const teleTargetInfo = useRef();

  //*REEL
  const [currentBreakpoint, setCurrentBreakpoint] = useState();

  //*WORK
  const headerHeight = 48;
  let footerHeight = 48;
  if (useBreakpoint("sm", "down")) footerHeight = 64;
  const smallScreenProjects = projectDetails.filter(
    (proj) => proj.showSmallScreen
  );

  const smallScreenProjectHeight =
    window.innerHeight - headerHeight - footerHeight;

  const smallScreenPinVal = 400;

  //horrible
  const smallScreenWorkHeight =
    (smallScreenProjectHeight + smallScreenPinVal) *
      smallScreenProjects.length +
    headerHeight * smallScreenProjects.length;

  //*LOADING
  function onTeleAssetsLoaded() {
    setTeleAssetsLoaded(true);
  }

  const [teleAssetsLoaded, setTeleAssetsLoaded] = useState(true);

  function onTeleWebGLReady() {
    setTeleWebGLReady(true);
  }

  const [teleWebGLReady, setTeleWebGLReady] = useState(true);

  const [appReady, setAppReady] = useState(false);

  useEffect(() => {
    if (teleAssetsLoaded && teleWebGLReady) {
      // console.log("all checks done");
      if ("scrollRestoration" in window.history) {
        window.history.scrollRestoration = "manual";
      }

      // Force scroll to top
      window.scrollTo({ top: 0, left: 0, behavior: "auto" });
      setAppReady(true);
      document.documentElement.style.overflow = "auto";
      document.body.style.overflow = "auto";
    }
  }, [teleAssetsLoaded, teleWebGLReady]);

  //*INFO
  const infoCapabilities = [
    "WEB DESIGN & DEVELOPMENT",
    "UI/UX",
    "MOTION DESIGN",
    "3D DESIGN, RENDERING & ANIMATION",
    "GRAPHIC DESIGN",
    "BRANDING",
  ];

  //*TELE
  // const { setCanvasTarget } = useTele();

  // useEffect(() => {
  //   if (reelRef.current) {
  //     setCanvasTarget(reelRef.current);
  //   }
  // }, [reelRef, setCanvasTarget]);

  let pinSectionVal = "+=1200";

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      // mm.add("(max-width: 1023px)", () => {
      //   gsap.to(".box", { x: 120 });
      // });
      if (!appReady) return;
      //*SCROLL PINNING
      // gsap.from("#landing", {
      //   scrollTrigger: {
      //     trigger: "#landing",
      //     start: "top top",
      //     end: pinSectionVal,
      //     scrub: true,
      //     pin: true,
      //   },
      // });

      ScrollTrigger.create({
        trigger: "#home",
        start: "top top",
        end: "+=50000",
        pin: "#blend-stage",
        pinSpacing: false, // critical
        anticipatePin: 1,
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

      //larger screen scroll pinning
      mm.add(`(min-width: ${BREAKPOINTS.lg}px)`, () => {
        gsap.from("#work", {
          scrollTrigger: {
            trigger: "#work",
            start: "top top",
            end: "+=2400",
            scrub: true,
            pin: true,
          },
        });
      });

      // gsap.from("#info", {
      //   scrollTrigger: {
      //     trigger: "#info",
      //     start: "top top",
      //     end: pinSectionVal,
      //     scrub: true,
      //     pin: true,
      //   },
      // });

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
            speed: 1,
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

      if (landingTitleScrollInner.current) {
        const scrollWidth = landingTitleScrollInner.current.scrollWidth / 2;
        gsap.to("#landing-title-scroll-inner", {
          x: -scrollWidth,
          repeat: -1,
          ease: "none",
          duration: 10,
          modifiers: {
            x: gsap.utils.unitize((x) => (parseFloat(x) % scrollWidth) / 2),
          },
        });
      }
      //*Hide Scroll call to action
      let scrollCTATl = gsap.timeline({
        scrollTrigger: {
          trigger: "#nav-bar",
          start: "top top",
          end: "+=128",
          scrub: true,
        },
      });

      scrollCTATl
        .to("#landing-scroll-cta", { y: 256, duration: 99, ease: "none" })
        .to("#landing-scroll-cta", { opacity: 0, duration: 1, ease: "none" });

      // if (!useBreakpoint("sm", "down")) {
      //* slightly hacky way of getting the canvas in two spots in the site
      // const landingY = landingRef.current.getBoundingClientRect().top;
      // const reelY = reelRef.current.getBoundingClientRect().top;
      // const infoY = infoRef.current.getBoundingClientRect().top;
      // if (currentBreakpoint !== "xs") {
      //   const translateTeleY = infoY - reelY - 1200;
      //   const translateTeleX = window.innerWidth / 2;

      //   ScrollTrigger.create({
      //     trigger: "#work",
      //     start: "top top",
      //     onEnter: () => {
      //       gsap.set("#tele-container", { left: translateTeleX });
      //       gsap.set("#tele-container", { top: translateTeleY });
      //       gsap.set("#tele-container", { width: "50%" });
      //       setTeleContext("info");
      //     },
      //     onEnterBack: () => {
      //       gsap.set("#tele-container", { left: 0 });
      //       gsap.set("#tele-container", { top: 0 });
      //       gsap.set("#tele-container", { width: "100%" });
      //       setTeleContext("reel");
      //     },
      //   });
      // } else {
      //   const translateTeleY = infoY + window.innerHeight * 0.15 - 60;
      //   const resetTeleY = window.innerHeight * 0.375;
      //   ScrollTrigger.create({
      //     trigger: "#work",
      //     start: "top top",
      //     onEnter: () => {
      //       gsap.set("#tele-container", { top: translateTeleY });
      //       gsap.set("#tele-container", { width: "100%" });
      //       setTeleContext("info");
      //     },
      //     onEnterBack: () => {
      //       gsap.set("#tele-container", { top: resetTeleY });
      //       gsap.set("#tele-container", { width: "100%" });
      //       setTeleContext("reel");
      //     },
      //   });
      // }

      gsap.to("#intersect-logo-left", {
        y: -100,
        ease: "none",
        scrollTrigger: {
          trigger: "#home",
          start: "top top",
          end: "+=5000",
          scrub: true,
        },
      });

      gsap.to("#intersect-logo-center", {
        y: -160,
        ease: "none",
        scrollTrigger: {
          trigger: "#home",
          start: "top top",
          end: "+=5000",
          scrub: true,
        },
      });

      gsap.to("#intersect-logo-right", {
        y: -220,
        ease: "none",
        scrollTrigger: {
          trigger: "#home",
          start: "top top",
          end: "+=5000",
          scrub: true,
        },
      });
    },
    { dependencies: [appReady, landingTitleScrollInner] }
  );

  //* GSAP smooth scroll init
  const wrapper = useRef();
  const content = useRef();
  useGSAP(
    () => {
      if (!appReady) return;
      wrapper.current = ScrollSmoother.create({
        wrapper: wrapper.current,
        content: content.current,
        smooth: 1,
        effects: true,
        normalizeScroll: true,
      });
    },
    { scope: wrapper, dependencies: [appReady] }
  );

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

  const getCTATop = () => {
    return window.innerHeight - 48 - 86;
  };

  //! test/dev utility - so we can track in console what BP we're at
  useEffect(() => {
    let lastBreakpoint = null;

    function getBreakpoint(width) {
      switch (true) {
        case width < BREAKPOINTS.sm:
          return "xs";
        case width < BREAKPOINTS.md:
          return "sm";
        case width < BREAKPOINTS.lg:
          return "md";
        case width < BREAKPOINTS.xl:
          return "lg";
        case width < BREAKPOINTS["2xl"]:
          return "xl";
        case width < BREAKPOINTS["4k"]:
          return "2xl";
        default:
          return "4k+";
      }
    }

    function handleResize() {
      const width = window.innerWidth;
      const currentBreakpoint = getBreakpoint(width);
      setCurrentBreakpoint(currentBreakpoint);

      if (currentBreakpoint !== lastBreakpoint) {
        lastBreakpoint = currentBreakpoint;
        console.log(`[Breakpoint] ${currentBreakpoint} — ${width}px`);
      }
    }

    handleResize(); // initial log
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <>
      {/* <LoadingScreen /> */}
      {!appReady && <LoadingScreen />}
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
          <a id="footer-contact-link" className="text-2 footer-link">
            {"CONTACT->"}
          </a>
          <a id="footer-instagram-link" className="text-2 footer-link">
            {"INSTAGRAM->"}
          </a>
        </div>
        <div id="footer-credits">
          <p id="footer-credits-credit" className="text-2">
            DESIGNED & DEVELOPED BY{" "}
            <span id="footer-credits-credit-intersect" className="text-1">
              INTERSECT
            </span>
          </p>
          <p id="footer-credits-copyright" className="text-1">
            © INTERSECT 2025
          </p>
        </div>
      </div>
      {/* <div id="home-bg-logo-container">
        <IntersectLogoLeft />
        <IntersectLogoCenter />
        <IntersectLogoRight />
      </div> */}

      {/* <div id="home-bg-invert-layer"></div> */}
      <div id="smooth-wrapper" ref={wrapper}>
        <div id="smooth-content" ref={content}>
          <div id="blend-stage">
            <div id="home-bg-logo-container">
              <IntersectLogoLeft />
              <IntersectLogoCenter />
              <IntersectLogoRight />
            </div>
            <div id="home-bg-invert-layer" />
          </div>
          <div id="landing-title-container">
            {useBreakpoint("sm", "down") ? (
              <div
                id="landing-title-scroll-inner"
                ref={landingTitleScrollInner}
              >
                <span id="landing-title-scroll" className="text-1">
                  INTERSECT
                </span>
                <span id="landing-title-scroll" className="text-1">
                  INTERSECT
                </span>
                <span id="landing-title-scroll" className="text-1">
                  INTERSECT
                </span>
                <span id="landing-title-scroll" className="text-1">
                  INTERSECT
                </span>
              </div>
            ) : (
              <span id="landing-title" className="text-1">
                INTERSECT
              </span>
            )}
          </div>
          <div id="home">
            <div id="home-content">
              <div id="landing" ref={landingRef}>
                {!useBreakpoint("sm", "down") && (
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
                )}
                {/* {useBreakpoint("sm", "down") && (
                  <TeleCanvas
                    height={height}
                    width={width}
                    assetsLoaded={teleAssetsLoaded}
                    onAssetsLoaded={onTeleAssetsLoaded}
                    onWebGLReady={onTeleWebGLReady}
                    appReady={appReady}
                    landingRef={landingRef}
                    reelRef={reelRef}
                    workRef={workRef}
                    infoRef={infoRef}
                    // cameraPos={
                    //   teleContext === "reel" ? [0, 0, 28] : [0, 0, 100]
                    // }
                  />
                )} */}
                {/* {useBreakpoint("sm", "down") && (
                  <div
                    id="tele-container"
                    style={{
                      height: "42vh",
                      width: "100%",
                      position: "absolute",
                      display: "flex",
                      justifyContent: "center",
                      left: 0,
                      top: "37.5vh",
                      // width: teleContext === "reel" ? "100%" : "50%",
                    }}
                  > */}
                {/* </div>
                )} */}
                <div id="landing-flavour">
                  <p className="text-2">
                    <span className="text-1 landing-flavour-text">
                      INTERSECT
                    </span>{" "}
                    <span className="text-2 landing-flavour-text">
                      (verb): the integration technology, art, design, life.
                    </span>
                  </p>
                  <p className="text-2" style={{ marginTop: 8 }}>
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
                <div
                  id="landing-scroll-cta-container"
                  style={{ top: getCTATop() }}
                >
                  <div id="landing-scroll-cta">
                    <p className="text-1">SCROLL</p>
                    <p id="landing-cta-arrow" className="text-1">{`->`}</p>
                  </div>
                </div>
              </div>
              <div id="reel" ref={reelRef}>
                {/* {!useBreakpoint("sm", "down") && (
                  <TeleCanvas
                    height={height}
                    width={width}
                    assetsLoaded={teleAssetsLoaded}
                    onAssetsLoaded={onTeleAssetsLoaded}
                    onWebGLReady={onTeleWebGLReady}
                    appReady={appReady}
                    landingRef={landingRef}
                    reelRef={reelRef}
                    workRef={workRef}
                    infoRef={infoRef}
                    // cameraPos={
                    //   teleContext === "reel" ? [0, 0, 28] : [0, 0, 100]
                    // }
                  />
                )} */}
                {/* {!useBreakpoint("sm", "down") && (
                  <div
                    id="tele-container"
                    style={{
                      height: "100%",
                      width: "100%",
                      position: "absolute",
                      left: 0,
                      top: 0,
                      // width: teleContext === "reel" ? "100%" : "50%",
                    }}
                  >
                    <TeleCanvas
                      height={height}
                      width={width}
                      assetsLoaded={teleAssetsLoaded}
                      onAssetsLoaded={onTeleAssetsLoaded}
                      onWebGLReady={onTeleWebGLReady}
                      // cameraPos={
                      //   teleContext === "reel" ? [0, 0, 28] : [0, 0, 100]
                      // }
                      teleContext={teleContext}
                    />
                  </div>
                )} */}
              </div>
              <div
                style={{
                  height: useBreakpoint("lg", "down")
                    ? smallScreenWorkHeight
                    : "100vh",
                }}
                id="work"
                ref={workRef}
              >
                <div id="work-outer">
                  {!useBreakpoint("lg", "down") && (
                    <WorkGridDesktop projectDetails={projectDetails} />
                  )}
                  {useBreakpoint("lg", "down") && (
                    <WorkGridSmallScreen
                      projectDetails={smallScreenProjects}
                      smallScreenProjectHeight={smallScreenProjectHeight}
                      headerHeight={headerHeight}
                      smallScreenPinVal={smallScreenPinVal}
                      // smallScreenWorkHeight={smallScreenWorkHeight}
                    />
                  )}
                </div>
              </div>
              <div id="info" ref={infoRef}>
                <div id="info-inner">
                  <div id="info-color-margin"></div>
                  <div id="info-text-container">
                    <div id="info-text">
                      <p className="text-2 info-heading">
                        WE ARE <span className="text-1">INTERSECT</span>
                      </p>
                      <p className="text-3 info-text" style={{ marginTop: 8 }}>
                        A design studio focusing on the delivery of ideas across
                        digital mediums, pushing creative boundaries and
                        exploration of the fertile space between creativity and
                        technology.
                      </p>
                      <p
                        className="text-1 info-heading"
                        style={{ marginTop: 16 }}
                      >
                        CAPABILITIES
                      </p>
                      <div id="info-capabilities" style={{ marginTop: 8 }}>
                        {infoCapabilities.map((x) => {
                          return <p className="text-3 info-text">{`> ${x}`}</p>;
                        })}
                      </div>
                    </div>
                    <a
                      href="mailto:test@test.com"
                      style={{ textDecoration: "none" }}
                    >
                      <p id="info-contact" style={{ marginTop: 32 }}>
                        <span className="text-1 info-underlined">GET</span>
                        <span className="text-3 info-non-underlined">
                          _{"\u200B"}
                        </span>
                        <span className="text-1 info-underlined">IN</span>
                        <span className="text-3 info-non-underlined">
                          _{"\u200B"}
                        </span>
                        <span className="text-1 info-underlined">TOUCH</span>
                        <span className="text-2 info-non-underlined">{`→`}</span>
                      </p>
                    </a>
                    {/*Change mail to when domain registered*/}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
