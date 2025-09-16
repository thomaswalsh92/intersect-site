import { Component } from './Component'
import * as THREE from 'three'
import { Canvas, useLoader } from '@react-three/fiber'
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js'
import { OrbitControls } from '@react-three/drei'

function Scene() {
  const gltf = useLoader(GLTFLoader, '/intersect-tv.glb')

  gltf.scene.traverse(function (object) {
    if (object.isMesh) {
      object.material.color.set(0xff0000)
      object.material.transparent = true
      object.material.opacity = 0.5
    }
  })

  return (
    <mesh position={new THREE.Vector3(0, 0, 0)}>
      <primitive object={gltf.scene} />
    </mesh>
  )
}
export default function App() {
  return (
    <Canvas size={[`2000px`, `3000px`]} style={{ width: `100vh`, height: `100vh` }} shadows camera={{ position: [0, 0, 20], fov: 45 }}>
      <OrbitControls />
      {/* <ambientLight intensity={Math.PI / 2} /> */}
      <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} decay={0} intensity={Math.PI} />
      {/* <pointLight position={[-10, -10, -10]} decay={0} intensity={Math.PI} /> */}
      <Scene />
    </Canvas>
  )
}
