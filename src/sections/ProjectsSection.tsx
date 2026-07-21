import { motion } from 'framer-motion'
import { site } from '../content/site'
import { SectionHeading } from '../components/SectionHeading'
import { ProjectCard } from '../components/ProjectCard'

export function ProjectsSection() {
  return (
    <section id="projects" className="relative py-24 scroll-mt-24">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading kicker="Forge Tracks" title="Projects & Missions" />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-10% 0px' }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3"
        >
          {site.projects.map((p, idx) => (
            <motion.div
              key={p.id}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-10% 0px' }}
              transition={{ duration: 0.65, delay: idx * 0.08 }}
            >
              <ProjectCard
                title={p.title}
                subtitle={p.subtitle}
                description={p.description}
                tags={p.tags}
                year={p.year}
                linkLabel={p.linkLabel}
                link={p.link}
              >
                {/* Custom Nested HUD Panels to showcase game dev richness */}
                {p.id === 'fluxdesk' && (
                  <div className="mt-5 rounded border border-cyberCyan/15 bg-spaceBlack/50 p-3 font-heading text-[10px] uppercase tracking-wider text-textLight/70">
                    <div className="flex items-center justify-between text-cyberCyan font-bold">
                      <span>Telemetry Mode:</span>
                      <span>ACTIVE</span>
                    </div>
                    <p className="mt-2 text-[9px] lowercase text-textLight/50 leading-relaxed">
                      $ tauri-cli dev --os windows<br/>
                      initializing win32 virtual workspace handles...
                    </p>
                  </div>
                )}

                {p.id === 'websites' && (
                  <div className="mt-5 space-y-2 border border-cyberPurple/15 bg-spaceBlack/40 p-3 rounded text-[10px] font-heading">
                    <div className="text-cyberPurple uppercase font-bold tracking-wide">// Gallery Releases</div>
                    <div className="space-y-1 text-[9px] text-textLight/60">
                      <div className="flex justify-between border-b border-textLight/5 pb-1">
                        <span>• Samurai Duelist (Current)</span>
                        <span className="text-cyberCyan">DEPLOYED</span>
                      </div>
                      <div className="flex justify-between border-b border-textLight/5 pb-1">
                        <span>• Space Canvas R3F</span>
                        <span className="text-cyberCyan">LIVE</span>
                      </div>
                      <div className="flex justify-between">
                        <span>• Low-GPU Wind Simulators</span>
                        <span className="text-textLight/30">ARCHIVED</span>
                      </div>
                    </div>
                  </div>
                )}

                {p.id === 'games' && (
                  <div className="mt-5 space-y-2 border border-cyberPink/15 bg-spaceBlack/40 p-3 rounded text-[10px] font-heading">
                    <div className="text-cyberPink uppercase font-bold tracking-wide">// Active Playable Builds</div>
                    <div className="flex items-center justify-between text-[9px] text-textLight/60">
                      <span>• Itch.io Arcade Cabinet</span>
                      <span className="animate-pulse text-green-400">READY TO PLAY</span>
                    </div>
                    {/* Retro mini health bar style design */}
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-[8px] text-textLight/40">HP:</span>
                      <div className="h-1.5 flex-1 bg-spaceBlack border border-textLight/5 rounded overflow-hidden flex">
                        <div className="h-full bg-cyberPink w-3/4" />
                        <div className="h-full bg-cyberPurple w-1/4" />
                      </div>
                    </div>
                  </div>
                )}
              </ProjectCard>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
