//styling
import "./Home.scss";

//react
import { useState, useEffect, useRef, Suspense } from "react";

//three
import * as THREE from "three";

//r3f
import { Canvas, useThree, useFrame } from "@react-three/fiber";
import { Environment, Lightformer, SoftShadows } from "@react-three/drei";

//app
import { Tele } from "./Tele";

function WebGLWarmup() {
  const { gl, scene, camera } = useThree();

  useEffect(() => {
    gl.compile(scene, camera);
  }, [gl, scene, camera]);

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

export default function TeleCanvas({
  width,
  height,
  contextId,
  onAssetsLoaded,
  onWebGLReady,
}) {
  console.log(width);
  console.log(height);
  return (
    <Canvas
      // frameloop="demand"
      shadows
      id="tele-canvas"
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
      <WebGLWarmup />
      {/* <Suspense fallback={<LoadingScreen setLoaded={setLoaded} />}> */}
      {/* <AccumulativeShadows
        frames={100}
        alphaTest={0.85}
        opacity={0.8}
        color="red"
        scale={20}
        position={[0, -0.005, 0]}
      >
        <RandomizedLight
          amount={8}
          radius={6}
          ambient={0.5}
          intensity={1}
          position={[-1.5, 2.5, -2.5]}
          bias={0.001}
        />
      </AccumulativeShadows> */}
      {/* <fog attach="fog" args={["#17171b", 20, 90]} /> */}
      <SoftShadows size={25} samples={64} focus={0.5} />
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
      <Tele onAssetsLoaded={onAssetsLoaded} />
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
      {/* </Suspense> */}
      <WebGLReady onWebGLReady={onWebGLReady} />
    </Canvas>
  );
}
