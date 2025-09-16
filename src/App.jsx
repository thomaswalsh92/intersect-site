//libs
import React, { useRef, useState } from "react";
import * as THREE from "three";
import { Canvas, useLoader } from "@react-three/fiber";
import {
  useGLTF,
  MeshReflectorMaterial,
  MeshTransmissionMaterial,
  BakeShadows,
} from "@react-three/drei";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import { OrbitControls } from "@react-three/drei";

//app
// import { Component } from "./Component";

function Scene() {
  // const ref = useRef();
  const gltf = useLoader(GLTFLoader, "/intersect-tv-applied-trans.glb");

  const meshes = [];
  gltf.scene.traverse((object) => {
    if (object.isMesh) {
      meshes.push(
        <mesh geometry={object.geometry}>
          <MeshReflectorMaterial
            blur={[0, 0]} // Blur ground reflections (width, height), 0 skips blur
            mixBlur={0} // How much blur mixes with surface roughness (default = 1)
            mixStrength={1} // Strength of the reflections
            mixContrast={1} // Contrast of the reflections
            resolution={256} // Off-buffer resolution, lower=faster, higher=better quality, slower
            mirror={0} // Mirror environment, 0 = texture colors, 1 = pick up env colors
            depthScale={0} // Scale the depth factor (0 = no depth, default = 0)
            minDepthThreshold={0.9} // Lower edge for the depthTexture interpolation (default = 0)
            maxDepthThreshold={1} // Upper edge for the depthTexture interpolation (default = 0)
            depthToBlurRatioBias={0.25} // Adds a bias factor to the depthTexture before calculating the blur amount [blurFactor = blurTexture * (depthTexture + bias)]. It accepts values between 0 and 1, default is 0.25. An amount > 0 of bias makes sure that the blurTexture is not too sharp because of the multiplication with the depthTexture
            distortion={1} // Amount of distortion based on the distortionMap texture
            //distortionMap={distortionTexture} // The red channel of this texture is used as the distortion map. Default is null
            reflectorOffset={0.2} // Offsets the virtual camera that projects the reflection. Useful when the reflective surface is some distance from the object's origin (default = 0)
          />
          ;
        </mesh>
      );
    }
  });
  return meshes;
}

export default function App() {
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
