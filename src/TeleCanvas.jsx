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
  // AccumulativeShadows,
  // RandomizedLight,
  Environment,
  Lightformer,
  Text,
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
      id={contextId}
      gl={(gl) => {
        gl.physicallyCorrectLights = true;
        gl.useLegacyLights = false;
      }}
      size={[width, height]}
      shadows
      camera={{ position: [0, 1, 45], fov: 19 }}
    >
      <fog attach="fog" args={["#17171b", 20, 90]} />
      <Environment
        // frames={degraded ? 1 : Infinity}
        resolution={256}
        // background
        blur={1}
      >
        <Lightformer
          form="ring"
          intensity={0.5}
          // rotation-x={Math.PI / 2}
          position={[0, 0, 3]}
          scale={[4, 4, 1]}
          target={[0, 0, 0]}
        />
        <Lightformer
          form="rect"
          intensity={4}
          // rotation-x={Math.PI / 2}
          position={[0, 2, 0]}
          scale={[1, 1, 1]}
          target={[0, 0, 0]}
        />
        <Lightformer
          form="rect"
          intensity={3}
          // rotation-x={Math.PI / 2}
          position={[2, 10, 0]}
          scale={[10, 10, 1]}
          target={[0, 0, 0]}
        />
      </Environment>
      <Tele
        TVDialogOpen={TVDialogOpen}
        setTVDialogOpen={(bool) => setTVDialogOpen(bool)}
      />
      {/* <spotLight
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
