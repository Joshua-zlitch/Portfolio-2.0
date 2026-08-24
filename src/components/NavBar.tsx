import { useEffect, useState } from 'react'
import { site } from '../content/site'

const links: Array<{ id: string; label: string }> = [
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'projects', label: 'Projects' },
  { id: 'contact', label: 'Contact' },
]

function scrollToId(id: string) {
  const el = document.getElementById(id)
  if (!el) return
  el.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

export function NavBar() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={[
        'fixed left-0 top-0 right-0 z-[55] transition-all duration-300',
        scrolled
          ? 'border-b border-cyberCyan/20 bg-spaceBlack/80 backdrop-blur-md py-3 shadow-[0_4px_30px_rgba(0,0,0,0.4)]'
          : 'border-b border-transparent bg-transparent py-5',
      ].join(' ')}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6">
        {/* Logo / Gamer Tag */}
        <a
          href="#top"
          onClick={(e) => {
            e.preventDefault()
            scrollToId('top')
          }}
          className="cursor-target font-heading font-black uppercase tracking-[0.25em] text-xs text-textLight transition-all hover:text-cyberCyan hover:text-glow-cyan"
        >
          {site.name}
        </a>

        {/* Navigation Items */}
        <nav className="hidden items-center gap-8 text-[11px] font-heading uppercase tracking-[0.2em] md:flex">
          {links.map((l) => (
            <button
              key={l.id}
              type="button"
              onClick={() => scrollToId(l.id)}
              className="cursor-target text-textMuted transition duration-200 hover:text-cyberCyan hover:text-glow-cyan focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-cyberCyan/70"
            >
              {l.label}
            </button>
          ))}
        </nav>
      </div>
    </header>
  )
}
