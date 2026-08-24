import { Suspense, useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { Canvas, useFrame, useLoader, useThree } from '@react-three/fiber'
import { Center, ContactShadows, Float, Sparkles } from '@react-three/drei'
import { MathUtils, Plane, Vector2, Vector3 } from 'three'
import type { Group, Mesh, Points } from 'three'
import { MTLLoader } from 'three/examples/jsm/loaders/MTLLoader.js'
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader.js'

const MODEL_PATH = '/models/xbox-controller/Controller.obj'
const MATERIAL_PATH = '/models/xbox-controller/Controller.mtl'

function deterministicUnit(seed: number) {
  const value = Math.sin(seed * 12.9898) * 43758.5453
  return value - Math.floor(value)
}

type BurstState = {
  id: number
  x: number
  y: number
} | null

type ParticleBurstProps = {
  screenPoint: {
    x: number
    y: number
  }
}

type GameDevSceneProps = {
  onReady?: () => void
}

type XboxControllerModelProps = {
  onReady?: () => void
}

function XboxControllerModel({ onReady }: XboxControllerModelProps) {
  const materials = useLoader(MTLLoader, MATERIAL_PATH)
  const object = useLoader(OBJLoader, MODEL_PATH, (loader) => {
    materials.preload()
    loader.setMaterials(materials)
  })
  const modelRef = useRef<Group | null>(null)
  const scrollProgressRef = useRef(0)

  useEffect(() => {
    onReady?.()
  }, [onReady])

  useEffect(() => {
    const updateScrollProgress = () => {
      const scrollableHeight = Math.max(
        document.documentElement.scrollHeight - window.innerHeight,
        1,
      )
      scrollProgressRef.current = MathUtils.clamp(
        window.scrollY / scrollableHeight,
        0,
        1,
      )
    }

    updateScrollProgress()
    window.addEventListener('scroll', updateScrollProgress, { passive: true })
    return () => window.removeEventListener('scroll', updateScrollProgress)
  }, [])

  useFrame(({ clock }) => {
    if (!modelRef.current) return

    const time = clock.getElapsedTime()
    const scroll = scrollProgressRef.current
    const scrollTurn = scroll * Math.PI * 0.6

    // The supplied OBJ's face-button deck already points toward the +Z camera.
    modelRef.current.rotation.x = Math.sin(time * 0.55) * 0.025 + scroll * 0.12
    modelRef.current.rotation.y = Math.sin(time * 0.18) * 0.035 + scrollTurn
    modelRef.current.rotation.z = Math.cos(time * 0.35) * 0.018 - scroll * 0.16
    modelRef.current.position.x = Math.sin(scroll * Math.PI) * 0.65
    modelRef.current.position.y = Math.sin(time * 0.8) * 0.06 - scroll * 0.42

    const scale = 0.42 + scroll * 0.045
    modelRef.current.scale.setScalar(scale)
  })

  return (
    <Float speed={1.15} rotationIntensity={0.08} floatIntensity={0.18}>
      <Center>
        <primitive ref={modelRef} object={object} rotation={[0, 0, 0]} />
      </Center>
    </Float>
  )
}

function ParticleBurst({ screenPoint }: ParticleBurstProps) {
  const pointsRef = useRef<Points | null>(null)
  const ringRef = useRef<Mesh | null>(null)
  const elapsedRef = useRef(0)
  const { camera, raycaster, size } = useThree()

  const origin = useMemo(() => {
    const pointer = new Vector2(
      (screenPoint.x / size.width) * 2 - 1,
      -(screenPoint.y / size.height) * 2 + 1,
    )
    const plane = new Plane(new Vector3(0, 0, 1), 0)
    const point = new Vector3()
    raycaster.setFromCamera(pointer, camera)
    raycaster.ray.intersectPlane(plane, point)
    return point
  }, [camera, raycaster, screenPoint.x, screenPoint.y, size.height, size.width])

  const particleData = useMemo(() => {
    const count = 52
    const positions = new Float32Array(count * 3)
    const velocities = Array.from({ length: count }, (_, index) => {
      const angle = deterministicUnit(index + 1) * Math.PI * 2
      const speed = 0.45 + deterministicUnit(index + 101) * 1.1
      return {
        x: Math.cos(angle) * speed,
        y: Math.sin(angle) * speed,
        z: (deterministicUnit(index + 301) - 0.5) * 0.7,
      }
    })

    for (let index = 0; index < count; index += 1) {
      positions[index * 3] = origin.x
      positions[index * 3 + 1] = origin.y
      positions[index * 3 + 2] = origin.z + (deterministicUnit(index + 201) - 0.5) * 0.05
    }

    return { positions, velocities }
  }, [origin.x, origin.y, origin.z])
  const particlePositionsRef = useRef(particleData.positions)

  useFrame((_, delta) => {
    elapsedRef.current += delta
    const elapsed = elapsedRef.current
    const positions = particlePositionsRef.current

    for (let index = 0; index < particleData.velocities.length; index += 1) {
      const velocity = particleData.velocities[index]
      const offset = index * 3
      positions[offset] += velocity.x * delta
      positions[offset + 1] += velocity.y * delta
      positions[offset + 2] += velocity.z * delta
    }

    const positionAttribute = pointsRef.current?.geometry.attributes.position
    if (positionAttribute) positionAttribute.needsUpdate = true

    const fade = Math.max(0, 1 - elapsed / 0.85)
    if (pointsRef.current?.material && !Array.isArray(pointsRef.current.material)) {
      pointsRef.current.material.opacity = fade
    }
    if (ringRef.current?.material && !Array.isArray(ringRef.current.material)) {
      ringRef.current.material.opacity = fade * 0.7
    }
    if (ringRef.current) {
      const ringScale = 1 + elapsed * 2.8
      ringRef.current.scale.set(ringScale, ringScale, ringScale)
      ringRef.current.rotation.z = elapsed * 1.8
    }
  })

  return (
    <group>
      <points ref={pointsRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[particleData.positions, 3]}
          />
        </bufferGeometry>
        <pointsMaterial
          color="#78f7ff"
          size={0.07}
          transparent
          opacity={1}
          depthWrite={false}
          blending={2}
        />
      </points>
      <mesh ref={ringRef} position={[origin.x, origin.y, origin.z + 0.02]}>
        <ringGeometry args={[0.16, 0.2, 48]} />
        <meshBasicMaterial
          color="#ff2bd6"
          transparent
          opacity={0.7}
          depthWrite={false}
          blending={2}
        />
      </mesh>
    </group>
  )
}

type SceneContentsProps = {
  burst: BurstState
}

function SceneContents({ burst, onReady }: SceneContentsProps & XboxControllerModelProps) {
  return (
    <>
      <ambientLight intensity={1.6} color="#d8e8ff" />
      <directionalLight position={[4, 6, 8]} intensity={4.2} color="#00f0ff" />
      <directionalLight position={[-5, 2, -3]} intensity={3.2} color="#a855f7" />
      <pointLight position={[0, -1, 4]} intensity={7} distance={12} color="#ff2bd6" />
      <Sparkles
        count={70}
        scale={[8, 5, 5]}
        size={2.2}
        speed={0.28}
        opacity={0.42}
        color="#78f7ff"
      />
      <XboxControllerModel onReady={onReady} />
      {burst ? <ParticleBurst key={burst.id} screenPoint={burst} /> : null}
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

export default function GameDevScene({ onReady }: GameDevSceneProps) {
  const sceneRef = useRef<HTMLDivElement | null>(null)
  const burstIdRef = useRef(0)
  const [burst, setBurst] = useState<BurstState>(null)

  const triggerBurst = useCallback((x: number, y: number) => {
    const id = burstIdRef.current + 1
    burstIdRef.current = id
    setBurst({ id, x, y })

    if ('vibrate' in navigator) navigator.vibrate(16)

    window.setTimeout(() => {
      setBurst((current) => (current?.id === id ? null : current))
    }, 900)
  }, [])

  useEffect(() => {
    const handlePointerDown = (event: PointerEvent) => {
      const scene = sceneRef.current
      if (!scene) return

      const rect = scene.getBoundingClientRect()
      const x = event.clientX - rect.left
      const y = event.clientY - rect.top
      const nearController =
        x >= rect.width * 0.2 &&
        x <= rect.width * 0.8 &&
        y >= rect.height * 0.16 &&
        y <= rect.height * 0.86

      if (nearController) triggerBurst(x, y)
    }

    window.addEventListener('pointerdown', handlePointerDown, { passive: true })
    return () => window.removeEventListener('pointerdown', handlePointerDown)
  }, [triggerBurst])

  return (
    <div ref={sceneRef} className="relative h-full w-full overflow-hidden bg-spaceBlack">
      <Canvas
        dpr={[1, 1.5]}
        gl={{ alpha: true, antialias: true }}
        camera={{ position: [0, 0, 8.8], fov: 44, near: 0.1, far: 100 }}
        onCreated={({ gl }) => gl.setClearColor('#04020a', 0)}
      >
        <Suspense fallback={null}>
          <SceneContents burst={burst} onReady={onReady} />
        </Suspense>
      </Canvas>

      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-spaceBlack/80 via-transparent to-spaceBlack/35" />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-spaceBlack/65 via-transparent to-spaceBlack/65" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_38%,#04020a_92%)] opacity-70" />
      <div className="pointer-events-none absolute inset-x-0 bottom-[18%] mx-auto h-px max-w-3xl bg-gradient-to-r from-transparent via-cyberCyan/25 to-transparent" />
    </div>
  )
}
