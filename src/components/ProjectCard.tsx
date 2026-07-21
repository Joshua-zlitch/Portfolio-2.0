import type { ReactNode } from 'react'
import { useEffect, useRef, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'
import { Tag } from './Tag'

export function ProjectCard({
  title,
  subtitle,
  description,
  tags,
  year,
  linkLabel,
  link,
  children,
}: {
  title: string
  subtitle?: string
  description: string
  tags: readonly string[]
  year?: string
  linkLabel?: string
  link?: string
  children?: ReactNode
}) {
  const cardRef = useRef<HTMLDivElement | null>(null)
  const [tiltEnabled, setTiltEnabled] = useState(false)

  const rotateX = useMotionValue(0)
  const rotateY = useMotionValue(0)
  const rz = useMotionValue(0)

  // Smooth springs for high fidelity 3D rotations
  const rxs = useSpring(rotateX, { stiffness: 200, damping: 22, mass: 0.25 })
  const rys = useSpring(rotateY, { stiffness: 200, damping: 22, mass: 0.25 })
  const rzs = useSpring(rz, { stiffness: 200, damping: 22, mass: 0.25 })

  useEffect(() => {
    const fine =
      typeof window !== 'undefined' &&
      window.matchMedia &&
      window.matchMedia('(pointer: fine)').matches
    setTiltEnabled(!!fine)
  }, [])

  return (
    <motion.article
      ref={cardRef}
      className="group relative rounded-xl border border-textLight/10 bg-spaceDark/40 p-7 transition-all duration-300 will-change-transform hover:border-cyberCyan/30 hover:shadow-cyanGlow"
      onPointerMove={(e) => {
        if (!tiltEnabled) return
        const el = cardRef.current
        if (!el) return
        const r = el.getBoundingClientRect()
        // Determine offset from card center in [-0.5, 0.5] range
        const px = (e.clientX - r.left) / r.width - 0.5
        const py = (e.clientY - r.top) / r.height - 0.5
        rotateY.set(px * 10)
        rotateX.set(-py * 8)
        rz.set(px * 1.5)
      }}
      onPointerLeave={() => {
        rotateX.set(0)
        rotateY.set(0)
        rz.set(0)
      }}
      style={{
        transformStyle: 'preserve-3d',
        perspective: '800px',
        rotateX: tiltEnabled ? rxs : 0,
        rotateY: tiltEnabled ? rys : 0,
        rotateZ: tiltEnabled ? rzs : 0,
      }}
    >
      {/* Dynamic Cyber Hover Gradient Overlay */}
      <div className="pointer-events-none absolute inset-0 rounded-xl opacity-0 transition-opacity duration-500 group-hover:opacity-100">
        <div className="absolute inset-0 rounded-xl bg-[radial-gradient(circle_at_25%_15%,rgba(0,240,255,0.18)_0%,rgba(168,85,247,0.05)_40%,transparent_70%)]" />
      </div>

      {/* Cyber Corner HUD Tech Brackets */}
      {/* Top Left */}
      <div className="absolute top-0 left-0 h-4 w-4 border-t-2 border-l-2 border-cyberPurple/40 transition-all duration-300 group-hover:border-cyberCyan group-hover:h-5 group-hover:w-5" />
      {/* Top Right */}
      <div className="absolute top-0 right-0 h-4 w-4 border-t-2 border-r-2 border-cyberPurple/40 transition-all duration-300 group-hover:border-cyberCyan group-hover:h-5 group-hover:w-5" />
      {/* Bottom Left */}
      <div className="absolute bottom-0 left-0 h-4 w-4 border-b-2 border-l-2 border-cyberPurple/40 transition-all duration-300 group-hover:border-cyberCyan group-hover:h-5 group-hover:w-5" />
      {/* Bottom Right */}
      <div className="absolute bottom-0 right-0 h-4 w-4 border-b-2 border-r-2 border-cyberPurple/40 transition-all duration-300 group-hover:border-cyberCyan group-hover:h-5 group-hover:w-5" />

      <div className="relative">
        <div className="flex items-start justify-between gap-4">
          <div>
            {subtitle ? (
              <div className="text-[10px] font-heading uppercase tracking-[0.2em] text-cyberPurple group-hover:text-cyberCyan transition-colors">
                {subtitle}
              </div>
            ) : null}
            <h3 className="mt-1 font-heading text-lg font-black tracking-wide uppercase text-textLight transition-colors group-hover:text-glow-cyan">
              {title}
            </h3>
          </div>
          {year ? (
            <div className="text-[10px] font-heading font-medium uppercase tracking-wider text-textLight/40 mt-1">
              {year}
            </div>
          ) : null}
        </div>

        <p className="mt-4 text-xs leading-relaxed text-textLight/70">{description}</p>

        {/* Tech Badge Chips */}
        <div className="mt-5 flex flex-wrap gap-1.5">
          {tags.map((t) => (
            <Tag key={t} label={t} />
          ))}
        </div>

        {/* Custom nested content if provided */}
        {children ? <div className="mt-6">{children}</div> : null}

        {linkLabel && link ? (
          <a
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 flex items-center justify-between border-t border-textLight/5 pt-4 text-[10px] font-heading uppercase tracking-[0.25em] text-textLight/65 transition-colors hover:text-cyberCyan hover:text-glow-cyan"
          >
            <span>{linkLabel}</span>
            <div className="flex h-7 w-7 items-center justify-center rounded-full border border-textLight/10 bg-spaceBlack/40 transition-all group-hover:border-cyberCyan/40 group-hover:bg-cyberCyan/10 text-textLight group-hover:text-cyberCyan">
              <span className="font-semibold text-sm leading-none" aria-hidden="true">›</span>
            </div>
          </a>
        ) : null}
      </div>
    </motion.article>
  )
}
