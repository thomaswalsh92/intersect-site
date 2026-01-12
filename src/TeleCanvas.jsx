//styling
import "./scss/Home.scss";

//react
import { useState, useEffect, useRef, Suspense } from "react";

//three
import * as THREE from "three";

//r3f
import { Canvas, useThree, useFrame } from "@react-three/fiber";
import { Environment, Lightformer, SoftShadows } from "@react-three/drei";
// import {
//   EffectComposer,
//   Bloom,
//   Noise,
//   ChromaticAberration,
// } from "@react-three/postprocessing";

//app
import { Tele } from "./Tele";
import { useBreakpoint } from "./utils/useBreakpoint";

// function CanvasVisibilityController() {
//   const { gl, invalidate, setFrameloop } = useThree();

//   useEffect(() => {
//     const canvas = gl.domElement;

//     let visible = false;

//     const observer = new IntersectionObserver(
//       ([entry]) => {
//         if (entry.isIntersecting && !visible) {
//           visible = true;
//           setFrameloop("demand");
//           invalidate(); // force immediate render
//         }

//         if (!entry.isIntersecting && visible) {
//           visible = false;
//           setFrameloop("never");
//         }
//       },
//       { threshold: 0.15 }
//     );

//     observer.observe(canvas);

//     return () => observer.disconnect();
//   }, [gl, invalidate, setFrameloop]);

//   return null;
// }

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

function CameraController({ teleContext }) {
  const lgDown = useBreakpoint("lg", "down");
  const mdDown = useBreakpoint("md", "down");
  const smDown = useBreakpoint("sm", "down");
  const { camera } = useThree();
  //!note Reel here doubles for mobile view when TV appears in landing section
  if (teleContext === "reel") camera.position.set(0, 0, 28);
  if (teleContext === "reel" && lgDown) camera.position.set(0, 0, 28);
  if (teleContext === "info") camera.position.set(0, 0, 38);
  if (teleContext === "info" && lgDown) camera.position.set(0, 0, 70);
  if (teleContext === "info" && mdDown) camera.position.set(0, 0, 100);
  if (teleContext === "info" && smDown) camera.position.set(0, 0, 28);

  return null;
}

export default function TeleCanvas({
  width,
  height,
  onAssetsLoaded,
  onWebGLReady,
  teleContext,
}) {
  return (
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
      <CameraController teleContext={teleContext} />
      {/* </Suspense> */}
      <WebGLReady onWebGLReady={onWebGLReady} />
    </Canvas>
  );
}
