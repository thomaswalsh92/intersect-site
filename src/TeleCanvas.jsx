//styling
import "./Home.scss";

//react
import { useState, useEffect, useRef, Suspense } from "react";

//three
import * as THREE from "three";

//r3f
import { Canvas, useThree, useFrame } from "@react-three/fiber";
import { Environment, Lightformer, SoftShadows, View } from "@react-three/drei";

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
  view1Ref,
  view2Ref,
}) {
  const teleCanvas = useRef(null);
  console.log(view1Ref.current);

  return (
    <Canvas
      ref={teleCanvas}
      // frameloop="demand"
      shadows
      style={{
        position: "fixed",
        inset: 0,
        pointerEvents: "none",
        zIndex: 0,
      }}
      // id={contextId}
      gl={(gl) => {
        gl.physicallyCorrectLights = true;
        gl.useLegacyLights = false;
        gl.shadowMap = true;
        gl.shadowMapType = THREE.PCFSoftShadowMap;
      }}
      size={[width, height]}
      // shadows={{ type: "PCFSoftShadowMap" }}
      camera={{ position: [0, 0, 5], fov: 19 }}
    >
      <View.Port />
      <View track={view1Ref} camera={{ position: [0, 0, 5], fov: 19 }}>
        <color attach="background" args={["#f5efe6"]} />
        <ambientLight intensity={0.5} />
        <directionalLight position={[3, 3, 3]} />

        <mesh>
          <boxGeometry args={[1, 1, 1]} />
          <meshStandardMaterial color="blue" />
        </mesh>
        {/* <WebGLWarmup />
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
            position={[0, 0, 3]}
            scale={[4, 4, 1]}
            target={[0, 0, 0]}
          />
          <Lightformer
            form="rect"
            intensity={1}
            position={[0, 2, 0]}
            scale={[1, 1, 1]}
            target={[0, 0, 0]}
          />
          <Lightformer
            form="rect"
            intensity={1}
            position={[2, 25, 0]}
            scale={[10, 10, 1]}
            target={[0, 0, 0]}
          />
        </Environment>
        <Tele onAssetsLoaded={onAssetsLoaded} />
        <directionalLight
          castShadow
          color={0xffffff}
          position={[7, 10, 15]}
          angle={5}
          penumbra={0.2}
          decay={0}
          intensity={0.8}
          shadow-mapSize-width={2048}
          shadow-mapSize-height={2048}
          shadow-camera-near={0.1}
          shadow-camera-far={20}
          shadow-camera-left={-10}
          shadow-camera-right={10}
          shadow-camera-top={10}
          shadow-camera-bottom={-10}
        />
        <WebGLReady onWebGLReady={onWebGLReady} /> */}
      </View>
      {/* <View track={view2Ref}> */}
      <ambientLight intensity={0.5} />
      <directionalLight position={[3, 3, 3]} />

      <mesh>
        <sphereGeometry args={[0.75, 32, 32]} />
        <meshStandardMaterial color="red" />
      </mesh>
      {/* <WebGLWarmup />
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
            position={[0, 0, 3]}
            scale={[4, 4, 1]}
            target={[0, 0, 0]}
          />
          <Lightformer
            form="rect"
            intensity={1}
            position={[0, 2, 0]}
            scale={[1, 1, 1]}
            target={[0, 0, 0]}
          />
          <Lightformer
            form="rect"
            intensity={1}
            position={[2, 25, 0]}
            scale={[10, 10, 1]}
            target={[0, 0, 0]}
          />
        </Environment>
        <Tele onAssetsLoaded={onAssetsLoaded} />
        <directionalLight
          castShadow
          color={0xffffff}
          position={[7, 10, 15]}
          angle={5}
          penumbra={0.2}
          decay={0}
          intensity={0.8}
          shadow-mapSize-width={2048}
          shadow-mapSize-height={2048}
          shadow-camera-near={0.1}
          shadow-camera-far={20}
          shadow-camera-left={-10}
          shadow-camera-right={10}
          shadow-camera-top={10}
          shadow-camera-bottom={-10}
        />
        <WebGLReady onWebGLReady={onWebGLReady} /> */}
      {/* </View> */}
    </Canvas>
  );
}
