import { Suspense, useRef } from 'react'
import { Canvas, useFrame, useLoader } from '@react-three/fiber'
import { Center, ContactShadows, Float, Sparkles } from '@react-three/drei'
import { MTLLoader } from 'three/examples/jsm/loaders/MTLLoader.js'
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader.js'
import type { Group } from 'three'

const MODEL_PATH = '/models/xbox-controller/Controller.obj'
const MATERIAL_PATH = '/models/xbox-controller/Controller.mtl'

function XboxControllerModel() {
  const materials = useLoader(MTLLoader, MATERIAL_PATH)
  const object = useLoader(OBJLoader, MODEL_PATH, (loader) => {
    materials.preload()
    loader.setMaterials(materials)
  })
  const modelRef = useRef<Group | null>(null)

  useFrame(({ clock }) => {
    if (!modelRef.current) return
    const time = clock.getElapsedTime()
    modelRef.current.rotation.y = time * 0.18
    modelRef.current.rotation.x = Math.sin(time * 0.55) * 0.045
    modelRef.current.rotation.z = Math.cos(time * 0.35) * 0.025
  })

  return (
    <Float speed={1.25} rotationIntensity={0.14} floatIntensity={0.35}>
      <Center>
        <primitive
          ref={modelRef}
          object={object}
          scale={0.42}
          rotation={[0.16, -0.34, 0]}
        />
      </Center>
    </Float>
  )
}

function SceneContents() {
  return (
    <>
      <ambientLight intensity={1.6} color="#d8e8ff" />
      <directionalLight
        position={[4, 6, 8]}
        intensity={4.2}
        color="#00f0ff"
      />
      <directionalLight
        position={[-5, 2, -3]}
        intensity={3.2}
        color="#a855f7"
      />
      <pointLight position={[0, -1, 4]} intensity={7} distance={12} color="#ff2bd6" />
      <Sparkles
        count={70}
        scale={[8, 5, 5]}
        size={2.2}
        speed={0.28}
        opacity={0.42}
        color="#78f7ff"
      />
      <XboxControllerModel />
      <ContactShadows
        position={[0, -1.85, 0]}
        opacity={0.35}
        scale={8}
        blur={2.6}
        far={4}
        color="#00f0ff"
      />
    </>
  )
}

export default function GameDevScene() {
  return (
    <div className="relative h-full w-full overflow-hidden bg-spaceBlack">
      <Canvas
        dpr={[1, 1.5]}
        gl={{ alpha: true, antialias: true }}
        camera={{ position: [0, 0.15, 8.5], fov: 38, near: 0.1, far: 100 }}
        onCreated={({ gl }) => gl.setClearColor('#04020a', 0)}
      >
        <Suspense fallback={null}>
          <SceneContents />
        </Suspense>
      </Canvas>

      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-spaceBlack/80 via-transparent to-spaceBlack/35" />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-spaceBlack/65 via-transparent to-spaceBlack/65" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_38%,#04020a_92%)] opacity-70" />
      <div className="pointer-events-none absolute inset-x-0 bottom-[18%] mx-auto h-px max-w-3xl bg-gradient-to-r from-transparent via-cyberCyan/25 to-transparent" />
    </div>
  )
}
