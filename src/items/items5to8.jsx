import React, { useState, useRef, useEffect } from 'react'
import { Fraction } from '../components/ui.jsx'

export function Item5({ onAnswer }) {
  const [chosen, setChosen] = useState(null)
  const [refDots, targetDots] = useRefData()

  const check = () => {
    onAnswer(chosen === 200)
  }

  return (
    <div>
      <p style={{ fontSize: '1.15rem', marginBottom: '1.5rem' }}>
        Im linken Kasten siehst du genau <strong>50 Punkte</strong>. Schätze: Wie viele Punkte sind ungefähr im rechten Kasten?
      </p>

      <div style={{ background: 'var(--cream-deep)', borderRadius: 24, padding: '1.5rem' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: '1.5rem' }}>
          <div>
            <p style={{ fontSize: '0.9rem', color: 'var(--plum-soft)', textAlign: 'center', margin: '0 0 6px', fontWeight: 700 }}>Vergleich: 50 Punkte</p>
            <svg viewBox="0 0 200 140" style={{ width: '100%', background: 'white', borderRadius: 12 }}>
              {refDots.map((d, i) => <circle key={i} cx={d.x} cy={d.y} r="4" fill="#6BC396" />)}
            </svg>
          </div>
          <div>
            <p style={{ fontSize: '0.9rem', color: 'var(--plum-soft)', textAlign: 'center', margin: '0 0 6px', fontWeight: 700 }}>Wie viele hier?</p>
            <svg viewBox="0 0 200 140" style={{ width: '100%', background: 'white', borderRadius: 12 }}>
              {targetDots.map((d, i) => <circle key={i} cx={d.x} cy={d.y} r="3" fill="#5FA8C9" />)}
            </svg>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 10 }}>
          {[120, 200, 350, 600].map(v => (
            <button key={v} className={`option-btn ${chosen === v ? 'selected' : ''}`} onClick={() => setChosen(v)}>
              ca. {v}
            </button>
          ))}
        </div>
      </div>

      <div style={{ marginTop: '1.5rem', display: 'flex', justifyContent: 'flex-end' }}>
        <button className="btn-primary" onClick={check}>Weiter</button>
      </div>
    </div>
  )
}

function useRefData() {
  return useState(() => {
    const ref = []
    for (let i = 0; i < 50; i++) {
      ref.push({ x: 15 + (i % 10) * 18, y: 22 + Math.floor(i / 10) * 22 })
    }
    const target = []
    for (let i = 0; i < 200; i++) {
      target.push({ x: 10 + Math.random() * 180, y: 10 + Math.random() * 120 })
    }
    return [ref, target]
  })[0]
}

export function Item6({ onAnswer }) {
  const pairs = [
    { a: '0,45', b: '0,5', sym: '<' },
    { a: '2,30', b: '2,3', sym: '=' },
    { a: '1,07', b: '1,7', sym: '<' }
  ]
  const [vals, setVals] = useState(['', '', ''])
  const [hover, setHover] = useState(null)
  const dragRef = useRef(null)

  const onDragStart = (s) => () => { dragRef.current = s }
  const onDrop = (i) => (e) => {
    e.preventDefault()
    const s = dragRef.current; if (!s) return
    const next = [...vals]; next[i] = s; setVals(next)
    dragRef.current = null; setHover(null)
  }
  const onDragOver = (i) => (e) => { e.preventDefault(); if (hover !== i) setHover(i) }
  const onDragLeave = () => setHover(null)
  const clearSlot = (i) => () => {
    if (!vals[i]) return
    const next = [...vals]; next[i] = ''; setVals(next)
  }
  const check = () => {
    const right = vals.filter((v, i) => v === pairs[i].sym).length
    onAnswer(right === 3)
  }

  return (
    <div>
      <p style={{ fontSize: '1.15rem', marginBottom: '1.5rem' }}>
        Setze das richtige Zeichen ein. Ziehe ein Symbol in das Feld zwischen den Zahlen.
      </p>

      <div style={{ background: 'var(--cream-deep)', borderRadius: 24, padding: '2rem 1.5rem' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          {pairs.map((p, i) => (
            <div key={i} style={{ display: 'grid', gridTemplateColumns: '1fr 80px 1fr', gap: 12, alignItems: 'center' }}>
              <div style={{ textAlign: 'right', fontFamily: 'var(--display)', fontSize: '1.6rem', fontWeight: 600, color: 'var(--plum)' }}>{p.a}</div>
              <div
                onDragOver={onDragOver(i)}
                onDragLeave={onDragLeave}
                onDrop={onDrop(i)}
                onClick={clearSlot(i)}
                style={{
                  height: 56, background: 'white',
                  border: `3px ${hover === i ? 'solid var(--rose-deep)' : 'dashed var(--rose)'}`,
                  borderRadius: 14, display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontFamily: 'var(--display)', fontSize: '1.6rem', fontWeight: 700,
                  cursor: vals[i] ? 'pointer' : 'default', color: 'var(--plum)'
                }}>
                {vals[i]}
              </div>
              <div style={{ textAlign: 'left', fontFamily: 'var(--display)', fontSize: '1.6rem', fontWeight: 600, color: 'var(--plum)' }}>{p.b}</div>
            </div>
          ))}
        </div>
        <div style={{ display: 'flex', gap: 12, justifyContent: 'center', marginTop: '1.75rem' }}>
          {['<', '=', '>'].map(s => (
            <div key={s} className="symbol-btn" draggable onDragStart={onDragStart(s)} style={{ cursor: 'grab', userSelect: 'none' }}>{s}</div>
          ))}
        </div>
      </div>

      <div style={{ marginTop: '1.5rem', display: 'flex', justifyContent: 'flex-end' }}>
        <button className="btn-primary" onClick={check}>Weiter</button>
      </div>
    </div>
  )
}

export function Item7({ onAnswer }) {
  const candidates = [2, 3, 5, 6, 8, 9, 12, 15, 18, 24]
  const teiler = [2, 3, 6, 8, 12, 24]
  const [picked, setPicked] = useState(new Set())

  const toggle = (n) => {
    const next = new Set(picked)
    if (next.has(n)) next.delete(n); else next.add(n)
    setPicked(next)
  }
  const check = () => {
    const ok = picked.size === teiler.length && teiler.every(t => picked.has(t))
    onAnswer(ok)
  }

  return (
    <div>
      <p style={{ fontSize: '1.15rem', marginBottom: '1.5rem' }}>
        Tippe alle Zahlen an, die <strong>Teiler von 24</strong> sind. Du kannst mehrere auswählen.
      </p>

      <div style={{ background: 'var(--cream-deep)', borderRadius: 24, padding: '1.5rem' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 10 }}>
          {candidates.map(n => (
            <button key={n}
              className={`option-btn ${picked.has(n) ? 'selected' : ''}`}
              onClick={() => toggle(n)}
              style={{ height: 64, fontSize: '1.4rem' }}>
              {n}
            </button>
          ))}
        </div>
      </div>

      <div style={{ marginTop: '1.5rem', display: 'flex', justifyContent: 'flex-end' }}>
        <button className="btn-primary" onClick={check}>Weiter</button>
      </div>
    </div>
  )
}

export function Item8({ onAnswer }) {
  const fractions = [
    { z: 1, n: 2, dec: '0,5', id: 'a' },
    { z: 3, n: 4, dec: '0,75', id: 'b' },
    { z: 1, n: 5, dec: '0,2', id: 'c' },
    { z: 7, n: 10, dec: '0,7', id: 'd' }
  ]
  const [decShuffled] = useState(() => [...fractions].sort(() => Math.random() - 0.5))
  const [pairings, setPairings] = useState({})
  const [active, setActive] = useState(null)

  const click = (kind, id) => {
    const pickKey = `${kind}:${id}`
    if (!active) { setActive(pickKey); return }
    if (active === pickKey) { setActive(null); return }
    const [aKind, aId] = active.split(':')
    if (aKind === kind) { setActive(pickKey); return }
    const fracId = kind === 'frac' ? id : aId
    const decId = kind === 'dec' ? id : aId
    setPairings({ ...pairings, [fracId]: decId })
    setActive(null)
  }

  const check = () => {
    const right = fractions.filter(f => pairings[f.id] === f.id).length
    onAnswer(right === 4)
  }

  const isMatched = (kind, id) => {
    if (kind === 'frac') return pairings[id]
    return Object.values(pairings).includes(id)
  }
  const isPaired = (kind, id) => {
    if (kind === 'frac') return pairings[id] === id
    const entry = Object.entries(pairings).find(([_, v]) => v === id)
    return entry && entry[0] === id
  }
  const isActive = (kind, id) => active === `${kind}:${id}`

  return (
    <div>
      <p style={{ fontSize: '1.15rem', marginBottom: '1.5rem' }}>
        Verbinde jeden Bruch mit der passenden Dezimalzahl. Tippe auf einen Bruch und dann auf die Dezimalzahl.
      </p>

      <div style={{ background: 'var(--cream-deep)', borderRadius: 24, padding: '1.5rem' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 32 }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {fractions.map(f => (
              <div key={f.id}
                className={`match-card ${isActive('frac', f.id) ? 'active' : ''} ${isMatched('frac', f.id) ? 'matched' : ''}`}
                onClick={() => click('frac', f.id)}>
                <Fraction z={f.z} n={f.n} size={1.2} />
              </div>
            ))}
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {decShuffled.map(d => (
              <div key={d.id}
                className={`match-card ${isActive('dec', d.id) ? 'active' : ''} ${isMatched('dec', d.id) ? 'matched' : ''}`}
                onClick={() => click('dec', d.id)}>
                {d.dec}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div style={{ marginTop: '1.5rem', display: 'flex', justifyContent: 'flex-end' }}>
        <button className="btn-primary" onClick={check}>Weiter</button>
      </div>
    </div>
  )
}
