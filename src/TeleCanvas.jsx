//styling
import "./scss/Home.scss";

//react
import { useState, useEffect, useRef, Suspense, useLayoutEffect } from "react";

//three
import * as THREE from "three";

//r3f
import { Canvas, useThree, useFrame } from "@react-three/fiber";
import { Environment, Lightformer, SoftShadows } from "@react-three/drei";

//gsap
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

//app
import { Tele } from "./Tele";
import { useBreakpoint } from "./utils/useBreakpoint";

gsap.registerPlugin(useGSAP, ScrollTrigger);

function WebGLWarmup({ assetsLoaded }) {
  const { gl, scene, camera } = useThree();

  useEffect(() => {
    if (!assetsLoaded) return;
    gl.compile(scene, camera);
  }, [assetsLoaded]);

  return null;
}

function WebGLReady({ onWebGLReady }) {
  const fired = useRef(false);

  useFrame(() => {
    if (!fired.current) {
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          fired.current = true;
          onWebGLReady();
        });
      });
    }
  });

  return null;
}

//component nested inside canvas so we can access camera object
function CameraController({ appReady, view, teleCamPos }) {
  const { camera } = useThree();

  useEffect(() => {
    if (!appReady) return;

    camera.position.set(teleCamPos[0], teleCamPos[1], teleCamPos[2]);

    camera.updateProjectionMatrix();
  }, [appReady, view, teleCamPos]);

  return null;
}

export default function TeleCanvas({
  width,
  height,
  onAssetsLoaded,
  onWebGLReady,
  appReady,
  landingRef,
  reelRef,
  workRef,
  infoRef,
}) {
  //* Build out API here for all relevant values for the Tele in realtion to responsive design
  //* AND
  //* Scroll based repositioning of the canvas
  let teleData = {
    xs: {
      pos1: {
        target: "landing",
        targetOffset: 0,
        width: "100%",
        height: "50vh",
        cameraPos: [0, 0, 28],
        styleOverride: { marginTop: "32vh" },
        rotationFixed: undefined,
      },
      pos2: {
        target: "info",
        targetOffset: 0,
        width: "100%",
        height: "50vh",
        cameraPos: [0, 0, 28],
        styleOverride: { marginTop: "40vh" },
        rotationFixed: 0,
      },
    },
    sm: {
      pos1: {
        target: "reel",
        targetOffset: 0,
        width: "100%",
        height: "100%",
        styleOverride: { marginTop: 0 },
        cameraPos: [0, 0, 42],
        rotationFixed: undefined,
      },
      pos2: {
        target: "info",
        targetOffset: 0,
        width: "100%",
        height: "50vh",
        cameraPos: [0, 0, 28],
        styleOverride: { marginTop: "40vh" },
        rotationFixed: 0,
      },
    },
    md: {
      pos1: {
        target: "reel",
        targetOffset: 0,
        width: "100%",
        height: "100%",
        styleOverride: { marginLeft: 0 },
        cameraPos: [0, 0, 36],
        rotationFixed: undefined,
      },
      pos2: {
        target: "info",
        targetOffset: 0,
        width: "50vw",
        height: "100%",
        styleOverride: { marginLeft: "50vw" },
        cameraPos: [0, 0, 64],
        rotationFixed: -15,
      },
    },
    lgUp: {
      pos1: {
        target: "reel",
        targetOffset: 0,
        width: "100%",
        height: "100%",
        styleOverride: { marginLeft: 0 },
        cameraPos: [0, 0, 28],
        rotationFixed: undefined,
      },
      pos2: {
        target: "info",
        //* workaround for scroll pin travel
        targetOffset: 2400,
        width: "50vw",
        height: "100%",
        styleOverride: { marginLeft: "50vw" },
        cameraPos: [0, 0, 48],
        rotationFixed: -15,
      },
    },
  };

  const [view, setView] = useState();
  // const [telePos, setTelePos] = useState();

  function getTeleData() {
    //case XS screens only
    if (view === "xs") return teleData.xs;

    //case SM screens only
    if (view === "sm") return teleData.sm;

    //case MD screens only
    if (view === "md") return teleData.md;

    //case LG screens up
    if (view === "lgUp") return teleData.lgUp;
  }

  // function targetToTop() {}

  function cacheDomHeights() {
    if (view === "xs") {
      domHeightsRef.current.landing = 0;
      domHeightsRef.current.reel = landingRef.current.offsetHeight;
      domHeightsRef.current.work = reelRef.current.offsetHeight;
      domHeightsRef.current.info = workRef.current.offsetHeight;
    }

    if (view !== "xs") {
      domHeightsRef.current.landing = -landingRef.current.offsetHeight;
      domHeightsRef.current.reel = reelRef.current.offsetHeight;
      domHeightsRef.current.work = workRef.current.offsetHeight;
      domHeightsRef.current.info = infoRef.current.offsetHeight;
    }
  }

  function getTargetToTop(target, offset = 0) {
    if (target === "landing") {
      return domHeightsRef.current.landing + offset;
    }

    if (target === "reel") {
      return (
        domHeightsRef.current.landing + domHeightsRef.current.reel + offset
      );
    }

    if (target === "work") {
      return (
        domHeightsRef.current.landing +
        domHeightsRef.current.reel +
        domHeightsRef.current.work +
        offset
      );
    }

    if (target === "info") {
      return (
        domHeightsRef.current.landing +
        domHeightsRef.current.reel +
        domHeightsRef.current.work +
        domHeightsRef.current.info +
        offset
      );
    }
  }
  function applyTeleData(pos) {
    const {
      target,
      targetOffset,
      width,
      height,
      cameraPos,
      styleOverride,
      rotationFixed,
    } = getTeleData()[pos];

    const top = getTargetToTop(target, targetOffset);
    gsap.set(teleContainerRef.current, {
      top: top,
      width: width,
      height: height,
      position: "absolute",
      ...styleOverride,
    });
    setTeleCamPos(cameraPos);
    // setStyleOverride(styleOverride);
    setRotationFixed(rotationFixed);
  }

  const teleContainerRef = useRef(null);
  const domHeightsRef = useRef({ landing: 0, reel: 0, work: 0, info: 0 });
  const [teleCamPos, setTeleCamPos] = useState([0, 0, 0]);
  const [styleOverride, setStyleOverride] = useState({});
  const [rotationFixed, setRotationFixed] = useState(undefined);

  const isXs = useBreakpoint("sm", "down");
  const isSm = useBreakpoint("md", "down") && !isXs;
  const isMd = useBreakpoint("lg", "down") && !isSm;
  const isLgUp = useBreakpoint("lg", "up");

  useEffect(() => {
    if (isXs) setView("xs");
    else if (isSm) setView("sm");
    else if (isMd) setView("md");
    else if (isLgUp) setView("lgUp");
  }, [isXs, isSm, isMd, isLgUp]);

  useEffect(() => {
    if (
      !landingRef.current ||
      !reelRef.current ||
      !workRef.current ||
      !infoRef.current ||
      !teleContainerRef.current ||
      !appReady
    ) {
      return;
    }

    cacheDomHeights();
    //here we get initial position for tele from refs and cache
    applyTeleData("pos1");
  }, [view, appReady]);

  useGSAP(() => {
    if (
      !appReady ||
      !landingRef.current ||
      !reelRef.current ||
      !workRef.current ||
      !infoRef.current ||
      !teleContainerRef.current
    )
      return;

    //be
    ScrollTrigger.create({
      trigger: "#work",
      start: "center-=10 top",
      end: "+=1",
      onEnter: () => applyTeleData("pos2"),
      onEnterBack: () => applyTeleData("pos1"),
    });

    // ScrollTrigger.create({
    //   trigger: "#work",
    //   start: "center+=10 top",
    //   end: "+=1",
    //   onEnter: () => {
    //     console.log("BOTTOM trigger on enter");
    //   },
    //   onEnterBack: () => {
    //     console.log("BOTTOM trigger on enter back");
    //   },
    // });
  }, [appReady]);
  return (
    <div
      id="tele-container"
      ref={teleContainerRef}
      style={{
        display: "flex",
        alignItems: "center",
        zIndex: 10,
        ...styleOverride,
        // height: getTeleData().pos1.height,
        // width: getTeleData().pos1.width,
        // background: getTeleData().pos1.backgroundDebug,
      }}
    >
      <Canvas
        resize={{ scroll: false }}
        //frameloop="demand"
        shadows
        id={"tele-canvas"}
        gl={(gl) => {
          gl.physicallyCorrectLights = true;
          gl.useLegacyLights = false;
          gl.shadowMap = true;
          gl.shadowMapType = THREE.PCFSoftShadowMap;
        }}
        size={[width, height]}
        // shadows={{ type: "PCFSoftShadowMap" }}
        camera={{ position: teleCamPos, fov: 19 }}
      >
        {/* <CanvasVisibilityController /> */}
        <WebGLWarmup />
        <SoftShadows frames={1} size={25} samples={64} focus={0.5} />
        <Environment
          preset="studio"
          //env intensity controlled in tele.jsx
          environmentIntensity={0}
          resolution={256}
          blur={1}
        >
          <Lightformer
            form="ring"
            intensity={2}
            // rotation-x={Math.PI / 2}
            position={[0, 0, 3]}
            scale={[4, 4, 1]}
            target={[0, 0, 0]}
          />
          <Lightformer
            form="rect"
            intensity={1}
            // rotation-x={Math.PI / 2}
            position={[0, 2, 0]}
            scale={[1, 1, 1]}
            target={[0, 0, 0]}
          />
          <Lightformer
            form="rect"
            intensity={1}
            // rotation-x={Math.PI / 2}
            position={[2, 25, 0]}
            scale={[10, 10, 1]}
            target={[0, 0, 0]}
          />
        </Environment>
        <Tele onAssetsLoaded={onAssetsLoaded} rotationFixed={rotationFixed} />
        {/* </Stage> */}
        <directionalLight
          castShadow
          color={0xffffff}
          position={[7, 10, 15]}
          angle={5}
          penumbra={0.2}
          decay={0}
          intensity={0.8}
          shadow-mapSize-width={2048} // higher = sharper shadows
          shadow-mapSize-height={2048}
          shadow-camera-near={0.1}
          shadow-camera-far={20}
          shadow-camera-left={-10}
          shadow-camera-right={10}
          shadow-camera-top={10}
          shadow-camera-bottom={-10}
        />

        <CameraController
          view={view}
          teleCamPos={teleCamPos}
          appReady={appReady}
        />
        {/* </Suspense> */}
        <WebGLReady onWebGLReady={onWebGLReady} />
      </Canvas>
    </div>
  );
}
