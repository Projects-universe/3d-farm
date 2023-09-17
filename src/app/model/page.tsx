"use client";

import { useEffect, useRef } from "react";
import { Canvas, useFrame, extend } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
// import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
// import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { useGLTF } from "@react-three/drei";
import { Mesh, BufferGeometry } from "three";
import { useTexture } from "@react-three/drei";
import * as THREE from "three";
// import {useFrame} from '@react-three/fiber';
import React from "react";

export const dynamic = "force-dynamic";

import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getBaseUrl } from "@/lib/utils";

extend({ BufferGeometry });
type Props = {
  mesh: React.MutableRefObject<Mesh<THREE.BufferGeometry<THREE.NormalBufferAttributes>, THREE.Material | THREE.Material[], THREE.Object3DEventMap>>
};

function MeshComponent(props: Props) {
  const baseUrl = getBaseUrl();
  const fileUrl = `${baseUrl}/shiba/scene.gltf`;
  // const mesh = useRef<Mesh>(null!);
  const gltf = useGLTF(fileUrl);

  const colormap = useTexture(`${baseUrl}/futuristic.jpg`)

  useFrame(() => {
    // props.mesh.current.rotation.y += 0.01;
  });
  return (
    <mesh ref={props.mesh} >
      {/* <coneGeometry args={[1, 2, 2, 2]}  /> */}
      {/* <boxGeometry args={[1, 1, 1]} /> */}
      {/* <boxBufferGeometry args={[1, 1, 1]} />
      <meshBasicMaterial map={colormap} /> */}
      <primitive object={gltf.scene} />
    </mesh>
  );
}

const Model = () => {
  const fileUrl = "/shiba/scene.gltf";
  const mesh = useRef<Mesh>(null!);
  const gltf = useGLTF(fileUrl);

  
  useEffect(() => {
    const audio = new Audio("./mixkit.wav")
    audio.play()

  }, [])
  const handleClick = () => {
    mesh.current.rotation.y += 2;
  };


  return (
    <div className="flex justify-center items-center h-screen">
      <Canvas className=" relative border-2 border-red-800">
        <MeshComponent mesh={mesh} />
        <ambientLight />
        {/* <camera args={[1,1,1]} /> */}
        <pointLight position={[10, 10, 10]} />
        <OrbitControls />
      </Canvas>
        <audio className="hidden top-8 left-2" autoPlay controls src="./mixkit.wav"  />
      <Button className="absolute top-2 left-2" onClick={handleClick}>
        <ArrowRight />
      </Button>
    </div>
  );
};

export default Model;
