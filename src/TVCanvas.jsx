//styling
import "./Home.scss";

//react
import { useRef, useEffect } from "react";

//three
//r3f
import { Canvas, useLoader, useFrame, useThree } from "@react-three/fiber";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";

//app
function Scene({ setTVDialogOpen }) {
  const { camera } = useThree();
  useEffect(() => {
    camera.lookAt(0, -2, 0);
  }, [camera]);
  const ref = useRef();
  const start = Math.PI / 4;
  const end = -Math.PI / 4;
  const { pointer } = useThree();
  useFrame(() => {
    ref.current.rotation.y = -(start + (end - start))* pointer.x; //prettier-ignore
  });
  const gltf = useLoader(GLTFLoader, "/intersect-tv-applied-trans.glb");

  return (
    <primitive
      onPointerOver={(e) => {
        e.stopPropagation();
        setTVDialogOpen(true);
      }}
      onPointerOut={(e) => {
        e.stopPropagation();
        setTVDialogOpen(false);
      }}
      ref={ref}
      object={gltf.scene}
      position={[0, -3, 0]}
      rotation={[0, -Math.PI / 4, 0]}
    >
      <meshStandardMaterial color={"#ffffff"} />
    </primitive>
  );
}

export default function TVCanvas({
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
      <ambientLight intensity={0.2} />
      <spotLight
        color={"ff0000"}
        position={[10, 20, 10]}
        angle={0.5}
        penumbra={1}
        decay={0}
        intensity={1.2}
      />
      {/* <pointLight position={[-10, -10, -10]} decay={0} intensity={Math.PI} /> */}
      <Scene
        TVDialogOpen={TVDialogOpen}
        setTVDialogOpen={(bool) => setTVDialogOpen(bool)}
      />
    </Canvas>
  );
}
