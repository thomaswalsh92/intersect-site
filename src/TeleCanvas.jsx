//styling
import "./Home.scss";

//react
import { useState, useEffect, Suspense } from "react";

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
  useProgress,
} from "@react-three/drei";
// import {
//   EffectComposer,
//   Bloom,
//   DepthOfField,
//   ToneMapping,
// } from "@react-three/postprocessing";

//app
import { Tele } from "./Tele";

const TeleFallback = () => {
  const progress = useProgress();
  let loaded = progress.loaded;
  let percentageLoaded = Math.floor((loaded / 33) * 100);

  return (
    <div id="fallback-test">
      <p className="text-1">{percentageLoaded}%</p>
    </div>
  );
};

export default function TeleCanvas({
  width,
  height,
  contextId,
  setLoaded,
  TVDialogOpen,
  setTVDialogOpen,
}) {
  return (
    <Suspense fallback={<TeleFallback />}>
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
        camera={{ position: [0, 1, 35], fov: 19 }}
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
        <Tele
          setLoaded={setLoaded}
          TVDialogOpen={TVDialogOpen}
          setTVDialogOpen={(bool) => setTVDialogOpen(bool)}
        />
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
    </Suspense>
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
