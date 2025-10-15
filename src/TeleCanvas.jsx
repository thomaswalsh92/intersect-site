//styling
import "./Home.scss";

//react
import { useRef, useEffect } from "react";

//three
import * as THREE from "three";
//r3f
import { Canvas, useThree } from "@react-three/fiber";
import {
  // PerformanceMonitor,
  AccumulativeShadows,
  RandomizedLight,
  Stage,
  Environment,
  Lightformer,
  Text,
  SoftShadows,
} from "@react-three/drei";
// import {
//   EffectComposer,
//   Bloom,
//   DepthOfField,
//   ToneMapping,
// } from "@react-three/postprocessing";

//app
import { Tele } from "./Tele";

export default function TeleCanvas({
  width,
  height,
  contextId,
  TVDialogOpen,
  setTVDialogOpen,
}) {
  return (
    <Canvas
      shadows
      id={contextId}
      gl={(gl) => {
        gl.physicallyCorrectLights = true;
        gl.useLegacyLights = false;
        gl.shadowMap = true;
        gl.shadowMapType = THREE.PCFSoftShadowMap;
      }}
      size={[width, height]}
      // shadows={{ type: "PCFSoftShadowMap" }}
      camera={{ position: [0, 1, 45], fov: 19 }}
    >
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
      {/* <Environment
        // frames={degraded ? 1 : Infinity}
        resolution={256}
        // background
        blur={1}
      >
        <Lightformer
          form="ring"
          intensity={1}
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
      </Environment> */}
      {/* <Stage
        intensity={0.5}
        environment="city"
        shadows={{ type: "accumulative", bias: -0.001, intensity: Math.PI }}
        adjustCamera={false}
      > */}
      <Tele
        TVDialogOpen={TVDialogOpen}
        setTVDialogOpen={(bool) => setTVDialogOpen(bool)}
      />
      {/* </Stage> */}
      <directionalLight
        castShadow
        color={0xffffff}
        position={[7, 10, 15]}
        angle={0.5}
        penumbra={1}
        decay={0}
        intensity={2}
        shadow-mapSize-width={2048} // higher = sharper shadows
        shadow-mapSize-height={2048}
        shadow-camera-near={0.1}
        shadow-camera-far={20}
        shadow-camera-left={-10}
        shadow-camera-right={10}
        shadow-camera-top={10}
        shadow-camera-bottom={-10}
      />
      {/* <spotLight
        castShadows
        color={0xffffff}
        position={[10, 10, 10]}
        angle={0.5}
        penumbra={1}
        decay={0}
        intensity={1.2}
      /> */}
      {/* <pointLight position={[-40, -10, -10]} decay={0} intensity={Math.PI} /> */}
    </Canvas>
  );
}

{
  /* <EffectComposer disableNormalPass>
  <Bloom
    luminanceThreshold={0}
    mipmapBlur
    luminanceSmoothing={0.0}
    intensity={5}
  />
  <DepthOfField
    target={[0, 0, 13]}
    focalLength={0.3}
    bokehScale={15}
    height={700}
  />
</EffectComposer>; */
}
