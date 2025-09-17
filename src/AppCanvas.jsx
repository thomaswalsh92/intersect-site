//libs
import React, { useRef, useState } from "react";
import * as THREE from "three";
import {
  Canvas,
  useLoader,
  extend,
  meshStandardMaterial,
} from "@react-three/fiber";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import { OrbitControls, MeshReflectorMaterial } from "@react-three/drei";

//app
// import { Component } from "./Component";

function Scene() {
  // const ref = useRef();
  const gltf = useLoader(GLTFLoader, "/intersect-tv-applied-trans.glb");

  return (
    <primitive object={gltf.scene}>
      <meshStandardMaterial color={"#ff0000"} />
    </primitive>
  );
}

export default function AppCanvas() {
  return (
    <Canvas
      gl={(gl) => {
        // gl.physicallyCorrectLights = true; // older versions (< r150)
        gl.useLegacyLights = false; // newer versions (r150+)
        // gl.outputEncoding = THREE.sRGBEncoding;
        // gl.toneMapping = THREE.ACESFilmicToneMapping;
        // gl.toneMappingExposure = 1.0;
      }}
      size={[`2000px`, `3000px`]}
      style={{ width: `100vh`, height: `100vh` }}
      shadows
      camera={{ position: [0, 0, 20], fov: 45 }}
    >
      <OrbitControls />
      {/* <ambientLight intensity={Math.PI / 2} /> */}
      <spotLight
        color={"ff0000"}
        position={[10, 10, 10]}
        angle={0.5}
        penumbra={1}
        decay={0}
        intensity={1.2}
      />
      {/* <pointLight position={[-10, -10, -10]} decay={0} intensity={Math.PI} /> */}
      <Scene />
    </Canvas>
  );
}
