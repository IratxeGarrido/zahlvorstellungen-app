import React from 'react'

export function Fraction({ z, n, size = 1 }) {
  const fontSize = `${1.1 * size}rem`
  return (
    <span className="fraction" style={{ fontSize }}>
      <span className="fraction-num">{z}</span>
      <span className="fraction-den">{n}</span>
    </span>
  )
}

export function Mascot({ size = 80 }) {
  return (
    <svg className="mascot" style={{ width: size, height: size, background: 'transparent' }} viewBox="0 0 100 100">
      <circle cx="50" cy="50" r="44" fill="#F8B8C8" />
      <path d="M28 42 Q33 30 44 36 Q50 30 56 36 Q67 30 72 42 Q78 52 72 62 Q66 72 50 72 Q34 72 28 62 Q22 52 28 42Z" fill="#E891A7" />
      <ellipse cx="40" cy="48" rx="3" ry="3.5" fill="#3B2530" />
      <ellipse cx="60" cy="48" rx="3" ry="3.5" fill="#3B2530" />
      <circle cx="41" cy="47" r="1" fill="white" />
      <circle cx="61" cy="47" r="1" fill="white" />
      <path d="M42 60 Q50 65 58 60" stroke="#3B2530" strokeWidth="2.2" fill="none" strokeLinecap="round" />
      <circle cx="30" cy="55" r="3" fill="#F4A0B5" opacity="0.6" />
      <circle cx="70" cy="55" r="3" fill="#F4A0B5" opacity="0.6" />
    </svg>
  )
}

export function MascotSpeech({ children, size = 80 }) {
  return (
    <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem', margin: '0 0 1.5rem' }}>
      <Mascot size={size} />
      <div className="speech-bubble" style={{ flex: 1, marginTop: 8 }}>
        {children}
      </div>
    </div>
  )
}

export function NiveauBadge({ level }) {
  const map = { C: 'badge-c', D: 'badge-d', E: 'badge-e' }
  return <span className={`badge ${map[level]}`}>Niveau {level}</span>
}

export function FeedbackBanner({ kind, children }) {
  if (!kind) return null
  const cls = kind === 'correct' ? 'feedback-correct' : kind === 'wrong' ? 'feedback-wrong' : 'feedback-neutral'
  const icon = kind === 'correct' ? '✓' : kind === 'wrong' ? '!' : 'i'
  return (
    <div className={`feedback-banner ${cls}`}>
      <span style={{
        width: 28, height: 28, borderRadius: '50%', display: 'inline-flex', alignItems: 'center',
        justifyContent: 'center', background: 'white', flexShrink: 0
      }}>{icon}</span>
      <span>{children}</span>
    </div>
  )
}

export function ItemHeader({ number, total, standard, niveau, teilbereich }) {
  return (
    <div style={{ marginBottom: '1.5rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.5rem' }}>
        <div style={{ display: 'flex', gap: 8, alignItems: 'center', flexWrap: 'wrap' }}>
          <NiveauBadge level={niveau} />
          <span style={{ fontSize: '0.85rem', color: 'var(--plum-soft)', fontWeight: 600 }}>
            {standard} · {teilbereich}
          </span>
        </div>
        <span style={{ fontSize: '0.9rem', color: 'var(--plum-soft)', fontWeight: 700 }}>
          Aufgabe {number} von {total}
        </span>
      </div>
    </div>
  )
}
