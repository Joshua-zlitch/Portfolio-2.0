import { useEffect, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

export function CursorAura() {
  const x = useMotionValue(-150)
  const y = useMotionValue(-150)
  const [enabled, setEnabled] = useState(false)

  // Smooth out cursor movements using frame springs
  const sx = useSpring(x, { stiffness: 220, damping: 26, mass: 0.3 })
  const sy = useSpring(y, { stiffness: 220, damping: 26, mass: 0.3 })

  useEffect(() => {
    const isCoarse =
      typeof window !== 'undefined' &&
      window.matchMedia &&
      window.matchMedia('(pointer: coarse)').matches

    if (isCoarse) return // Hide on touch devices

    setEnabled(true)
    
    const onMove = (e: PointerEvent) => {
      x.set(e.clientX)
      y.set(e.clientY)
    }

    window.addEventListener('pointermove', onMove, { passive: true })
    return () => window.removeEventListener('pointermove', onMove)
  }, [x, y])

  return (
    <motion.div
      aria-hidden="true"
      className="pointer-events-none fixed left-0 top-0 z-[60] -translate-x-1/2 -translate-y-1/2 h-[350px] w-[350px] rounded-full bg-[radial-gradient(circle_at_center,rgba(0,240,255,0.2)_0%,rgba(168,85,247,0.08)_35%,rgba(0,0,0,0)_65%)] blur-2xl opacity-0 mix-blend-screen"
      style={{ left: sx, top: sy, opacity: enabled ? 1 : 0 }}
    />
  )
}
