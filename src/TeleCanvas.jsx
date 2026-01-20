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
import { useGSAP } from "@gsap/react";

//app
import { Tele } from "./Tele";
import { useBreakpoint } from "./utils/useBreakpoint";

gsap.registerPlugin(useGSAP);

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

function CameraController({ teleCamRef }) {
  // const { camera } = useThree();
  // teleCamRef.current && camera.position.set(teleCamRef.current.cameraPos);

  return null;
}

export default function TeleCanvas({
  width,
  height,
  onAssetsLoaded,
  onWebGLReady,
  appReady,
  teleContext,
  teleTargetLanding,
  teleTargetInfo,
  teleTargetReel,
}) {
  let teleData = {
    xs: {
      pos1: {
        target: teleTargetLanding,
        targetOffset: null,
        width: "100%",
        height: "100%",
        cameraPos: [0, 0, 28],
        backgroundDebug: "green",
      },
      pos2: {
        target: teleTargetInfo,
        targetOffset: null,
        width: "100%",
        height: "100%",
        cameraPos: [0, 0, 28],
        backgroundDebug: "green",
      },
    },
    sm: {
      pos1: {
        target: teleTargetReel,
        targetOffset: null,
        width: "100%",
        height: "100%",
        cameraPos: [0, 0, 28],
        backgroundDebug: "blue",
      },
      pos2: {
        target: teleTargetInfo,
        targetOffset: null,
        width: "100%",
        height: "100%",
        cameraPos: [0, 0, 28],
        backgroundDebug: "blue",
      },
    },
    mdUp: {
      pos1: {
        target: teleTargetReel,
        targetOffset: null,
        width: "100%",
        height: "100%",
        cameraPos: [0, 0, 28],
        backgroundDebug: "red",
      },
      pos2: {
        target: teleTargetInfo,
        targetOffset: null,
        width: "100%",
        height: "100%",
        cameraPos: [0, 0, 28],
        backgroundDebug: "red",
      },
    },
  };

  const [view, setView] = useState();

  function getTeleData() {
    //case XS screens only
    if (view === "xs") return teleData.xs;

    //case SM screens only
    if (view === "sm") return teleData.sm;

    //case all larger screen
    if (view === "md-up") return teleData.mdUp;
  }

  const teleContainerRef = useRef(null);
  const telePositionRef = useRef({ top: 0, left: 0 });
  const teleSizeRef = useRef({ width: "", height: "" });
  const teleCamRef = useRef({ cameraPos: [] });

  const isXs = useBreakpoint("sm", "down");
  const isSm = useBreakpoint("md", "down") && !isXs;
  const isMdUp = useBreakpoint("md", "up");

  useEffect(() => {
    if (isXs) setView("xs");
    else if (isSm) setView("sm");
    else if (isMdUp) setView("md-up");
  }, [isXs, isSm, isMdUp]);

  useEffect(() => {
    if (
      !teleTargetLanding.current ||
      !teleTargetReel.current ||
      !teleTargetInfo.current ||
      !teleContainerRef.current ||
      !appReady
    ) {
      return;
    }

    //here we get initial position for tele from refs and cache
    if (view === "xs") {
      telePositionRef.current.top =
        getTeleData().pos1.target.current.getBoundingClientRect().top +
        window.scrollY -
        window.innerHeight;
      telePositionRef.current.left =
        getTeleData().pos1.target.current.getBoundingClientRect().left +
        window.scrollX;
    }

    if (view === "sm" || view === "md-up") {
      telePositionRef.current.top =
        getTeleData().pos1.target.current.getBoundingClientRect().top +
        window.scrollY -
        window.innerHeight;
      telePositionRef.current.left =
        getTeleData().pos1.target.current.getBoundingClientRect().left +
        window.scrollX;
    }

    teleSizeRef.current.width = getTeleData().pos1.width;
    teleSizeRef.current.height = getTeleData().pos1.height;
    teleCamRef.current.cameraPos = getTeleData().pos1.cameraPos;

    //and set initial top and left values for the container based on the ref
    gsap.set(teleContainerRef.current, {
      top: telePositionRef.current.top,
      left: telePositionRef.current.left,
      width: teleSizeRef.current.width,
      height: teleSizeRef.current.height,
      position: "absolute",
    });
  }, [view, appReady]);

  // useEffect(() => {
  //   if (!teleTargetLanding.current) return;
  //   if (!teleTargetReel.current) return;
  //   if (!teleTargetInfo.current) return;

  //   //define default positions for tele
  //   if (useBreakpoint("sm", "down")) {
  //     setTop(teleTargetLanding.current.getBoundingClientRect().top);
  //     setLeft(teleTargetLanding.current.getBoundingClientRect().left);
  //   }
  // }, [teleTargetLanding, teleTargetReel, teleTargetInfo]);

  // console.log(top, left);
  // console.log(getTeleData().pos1.width);
  return (
    <div
      id="tele-container"
      ref={teleContainerRef}
      style={{
        display: "flex",
        alignItems: "center",
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
        camera={{ position: [0, 0, 28], fov: 19 }}
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
        <Tele onAssetsLoaded={onAssetsLoaded} teleContext={teleContext} />
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
        <CameraController teleCamRef={teleCamRef} />
        {/* </Suspense> */}
        <WebGLReady onWebGLReady={onWebGLReady} />
      </Canvas>
    </div>
  );
}
