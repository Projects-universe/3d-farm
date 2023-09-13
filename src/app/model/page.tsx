"use client";

import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
// import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
// import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { useGLTF } from "@react-three/drei";
import { Mesh } from "three";
// import {useFrame} from '@react-three/fiber';
import React from "react";

type Props = {};

function MeshComponent() {
  const fileUrl = "/shiba/scene.gltf";
  const mesh = useRef<Mesh>(null!);
  const gltf = useGLTF(fileUrl);

  useFrame(() => {
    mesh.current.rotation.y += 0.01;
  });
  return (
    <mesh ref={mesh}>
      <primitive object={gltf.scene} />
    </mesh>
  );
}

const Model = (props: Props) => {
  return (
    // <div>Model</div>
    <div className="flex justify-center items-center h-screen">
      <Canvas className="h-2xl w-2xl">
        <MeshComponent />
        <ambientLight />
        <pointLight position={[10, 10, 10]} />
        <OrbitControls />
      </Canvas>
    </div>
  );
};

export default Model;
