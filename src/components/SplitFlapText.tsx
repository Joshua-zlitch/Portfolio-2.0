import { useEffect, useMemo, useState } from 'react'
import type { CSSProperties, HTMLAttributes } from 'react'
import './SplitFlapText.css'

const DEFAULT_WORDS = ['LAUNCH READY', 'SYNC ONLINE', 'SIGNAL LIVE']

type SplitFlapTextProps = Omit<HTMLAttributes<HTMLDivElement>, 'style'> & {
  words?: string[]
  text?: string
  flipDuration?: number
  stagger?: number
  cycleDelay?: number
  tileColor?: string
  textColor?: string
  tileRadius?: number | string
  gap?: number | string
  fontSize?: number | string
  loop?: boolean
  padTo?: number
  className?: string
  style?: CSSProperties
}

type SplitFlapStyle = CSSProperties & {
  '--split-flap-tile-color': string
  '--split-flap-text-color': string
  '--split-flap-radius': string
  '--split-flap-gap': string
  '--split-flap-font-size': string
  '--split-flap-flip-duration': string
}

function toCssUnit(value: number | string) {
  return typeof value === 'number' ? `${value}px` : value
}

function normalizePhrase(phrase: string, width: number) {
  return String(phrase).padEnd(width, ' ').slice(0, width)
}

export default function SplitFlapText({
  words = DEFAULT_WORDS,
  text,
  flipDuration = 0.12,
  stagger = 0.06,
  cycleDelay = 2400,
  tileColor = '#111827',
  textColor = '#f8fafc',
  tileRadius = 8,
  gap = 6,
  fontSize = 52,
  loop = true,
  padTo = 12,
  className = '',
  style,
  ...props
}: SplitFlapTextProps) {
  const sourceWords = Array.isArray(words) && words.length > 0 ? words : DEFAULT_WORDS
  const phrasesKey = typeof text === 'string' ? text : sourceWords.join('\u001f')
  const phrases = useMemo(
    () => phrasesKey.split('\u001f').filter((phrase) => phrase.length > 0),
    [phrasesKey],
  )
  const width = useMemo(() => {
    const longest = phrases.reduce((max, phrase) => Math.max(max, phrase.length), 1)
    return Math.max(1, Math.ceil(Number(padTo) || 0), longest)
  }, [padTo, phrases])
  const normalizedPhrases = useMemo(
    () => phrases.map((phrase) => normalizePhrase(phrase, width)),
    [phrases, width],
  )
  const [phraseIndex, setPhraseIndex] = useState(0)

  useEffect(() => {
    if (normalizedPhrases.length <= 1 || typeof window === 'undefined') return

    const delay = Math.max(800, Number(cycleDelay) || 2400)
    const timer = window.setInterval(() => {
      setPhraseIndex((current) => {
        const next = current + 1
        if (next >= normalizedPhrases.length && !loop) return current
        return next % normalizedPhrases.length
      })
    }, delay)

    return () => window.clearInterval(timer)
  }, [cycleDelay, loop, normalizedPhrases])

  const activePhrase = normalizedPhrases[phraseIndex] ?? normalizePhrase('', width)
  const settledText = activePhrase.trimEnd()
  const componentStyle: SplitFlapStyle = {
    '--split-flap-tile-color': tileColor,
    '--split-flap-text-color': textColor,
    '--split-flap-radius': toCssUnit(tileRadius),
    '--split-flap-gap': toCssUnit(gap),
    '--split-flap-font-size': toCssUnit(fontSize),
    '--split-flap-flip-duration': `${Math.max(0.04, Number(flipDuration) || 0.12)}s`,
    ...style,
  }

  return (
    <div
      className={`split-flap-text ${className}`.trim()}
      style={componentStyle}
      role="text"
      aria-live="polite"
      aria-label={settledText || undefined}
      {...props}
    >
      {activePhrase.split('').map((character, index) => {
        const displayCharacter = character === ' ' ? '\u00A0' : character
        const tileStyle = { animationDelay: `${index * stagger}s` }
        return (
          <span className="split-flap-text__tile" aria-hidden="true" key={`${phraseIndex}-${index}`}>
            <span className="split-flap-text__half split-flap-text__half--top">
              <span className="split-flap-text__char">{displayCharacter}</span>
            </span>
            <span className="split-flap-text__half split-flap-text__half--bottom">
              <span className="split-flap-text__char">{displayCharacter}</span>
            </span>
            <span className="split-flap-text__flap split-flap-text__flap--front" style={tileStyle}>
              <span className="split-flap-text__char">{displayCharacter}</span>
            </span>
            <span className="split-flap-text__flap split-flap-text__flap--back" style={tileStyle}>
              <span className="split-flap-text__char">{displayCharacter}</span>
            </span>
          </span>
        )
      })}
    </div>
  )
}
