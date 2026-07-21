import { AboutSection } from './sections/AboutSection'
import { ContactSection } from './sections/ContactSection'
import { HeroSection } from './sections/HeroSection'
import { ProjectsSection } from './sections/ProjectsSection'
import { SkillsSection } from './sections/SkillsSection'
import { CursorAura } from './components/CursorAura'
import { NavBar } from './components/NavBar'
import { PageTransition } from './components/PageTransition'

function App() {
  const noiseSvg = `data:image/svg+xml,${encodeURIComponent(`
    <svg xmlns="http://www.w3.org/2000/svg" width="200" height="200">
      <filter id="n">
        <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="4" stitchTiles="stitch"/>
        <feColorMatrix type="matrix" values="
          1 0 0 0 0
          0 1 0 0 0
          0 0 1 0 0
          0 0 0 0.15 0"/>
      </filter>
      <rect width="100%" height="100%" filter="url(#n)"/>
    </svg>
  `)}`

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-spaceBlack text-textLight font-body selection:bg-cyberCyan/30 selection:text-cyberCyan">
      <NavBar />
      <CursorAura />

      {/* Screen noise overlay for CRT / cinematic grain texture */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-[50] opacity-25 mix-blend-overlay"
        style={{ backgroundImage: `url("${noiseSvg}")` }}
      />

      {/* Ambient background glows */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-[0]"
      >
        {/* Top-left Cyan Glow */}
        <div className="absolute top-[-10%] left-[-10%] h-[60vw] w-[60vw] rounded-full bg-[radial-gradient(circle_at_center,rgba(0,240,255,0.08)_0%,transparent_70%)] blur-[80px]" />
        
        {/* Center/Bottom-right Purple/Pink Glow */}
        <div className="absolute bottom-[20%] right-[-10%] h-[70vw] w-[70vw] rounded-full bg-[radial-gradient(circle_at_center,rgba(168,85,247,0.06)_0%,transparent_70%)] blur-[100px]" />

        {/* Global horizontal grid scanner effect */}
        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:100%_4px] pointer-events-none opacity-40" />
      </div>

      <PageTransition>
        <main className="relative z-[20]">
          <HeroSection />
          <AboutSection />
          <SkillsSection />
          <ProjectsSection />
          <ContactSection />
        </main>
      </PageTransition>
    </div>
  )
}

export default App
