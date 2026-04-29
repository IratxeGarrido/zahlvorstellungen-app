import React, { useState, useRef, useEffect } from 'react'
import { Fraction } from '../components/ui.jsx'

export function Item1({ onAnswer }) {
  const correct = ['4','2','3','0','6','0']
  const [zones, setZones] = useState(['','','','','',''])
  const dragRef = useRef(null)

  const onDragStart = (digit) => (e) => {
    dragRef.current = digit
    e.dataTransfer.setData('d', digit)
  }
  const onDrop = (i) => (e) => {
    e.preventDefault()
    const d = e.dataTransfer.getData('d') || dragRef.current
    if (!d) return
    const next = [...zones]; next[i] = d; setZones(next)
  }
  const clearZone = (i) => () => {
    const next = [...zones]; next[i] = ''; setZones(next)
  }
  const check = () => {
    const ok = zones.every((v, i) => v === correct[i])
    onAnswer(ok)
  }

  const labels = ['HT','ZT','T','H','Z','E']
  const palette = ['4','2','3','0','6','0']

  return (
    <div>
      <p style={{ fontSize: '1.15rem', marginBottom: '1.5rem' }}>
        Trage die Zahl <strong>vierhundertdreiundzwanzigtausendsechzig</strong> in die Stellenwerttafel ein.
        Ziehe die Ziffern in die richtigen Felder.
      </p>

      <div style={{ background: 'var(--cream-deep)', borderRadius: 24, padding: '1.5rem' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: 8, marginBottom: 6 }}>
          {labels.map(l => (
            <div key={l} style={{ textAlign: 'center', fontFamily: 'var(--display)', fontWeight: 600, fontSize: '0.85rem', color: 'var(--plum-soft)' }}>{l}</div>
          ))}
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: 8, marginBottom: '1.5rem' }}>
          {zones.map((z, i) => (
            <div key={i} className="dropzone"
              onDragOver={(e) => e.preventDefault()}
              onDrop={onDrop(i)}
              onClick={clearZone(i)}
              style={{ fontFamily: 'var(--display)', fontWeight: 700, fontSize: '1.8rem', color: 'var(--plum)' }}>
              {z}
            </div>
          ))}
        </div>
        <p style={{ fontSize: '0.85rem', color: 'var(--plum-soft)', margin: '0 0 8px' }}>Ziehe von hier:</p>
        <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
          {palette.map((d, i) => (
            <div key={i} className="chip" draggable onDragStart={onDragStart(d)}>{d}</div>
          ))}
        </div>
      </div>

      <div style={{ marginTop: '1.5rem', display: 'flex', justifyContent: 'flex-end' }}>
        <button className="btn-primary" onClick={check}>Weiter</button>
      </div>
    </div>
  )
}

export function Item2({ onAnswer }) {
  const [userX, setUserX] = useState(null)
  const svgRef = useRef(null)

  const handleClick = (e) => {
    const rect = svgRef.current.getBoundingClientRect()
    const x = ((e.clientX - rect.left) / rect.width) * 600
    if (x < 40 || x > 560) return
    setUserX(x)
  }

  const check = () => {
    if (userX === null) { onAnswer(false); return }
    const target = 40 + (3/4) * 520
    const ok = Math.abs(userX - target) <= 15
    onAnswer(ok)
  }

  return (
    <div>
      <p style={{ fontSize: '1.15rem', marginBottom: '1.5rem' }}>
        Wo liegt <Fraction z={3} n={4} /> auf dem Zahlenstrahl? Tippe auf die richtige Stelle.
      </p>

      <div style={{ background: 'var(--cream-deep)', borderRadius: 24, padding: '2rem 1.5rem' }}>
        <svg ref={svgRef} className="numline-svg" viewBox="0 0 600 100" onClick={handleClick}>
          <line x1="40" y1="60" x2="560" y2="60" stroke="#3B2530" strokeWidth="3" strokeLinecap="round" />
          <line x1="40" y1="46" x2="40" y2="74" stroke="#3B2530" strokeWidth="3" strokeLinecap="round" />
          <line x1="560" y1="46" x2="560" y2="74" stroke="#3B2530" strokeWidth="3" strokeLinecap="round" />
          {[170, 300, 430].map(x => (
            <line key={x} x1={x} y1="54" x2={x} y2="66" stroke="#9B7E9D" strokeWidth="1.5" />
          ))}
          <text x="40" y="92" textAnchor="middle" fontFamily="Fredoka" fontSize="18" fill="#3B2530">0</text>
          <text x="560" y="92" textAnchor="middle" fontFamily="Fredoka" fontSize="18" fill="#3B2530">1</text>
          {userX !== null && (
            <g>
              <circle cx={userX} cy="60" r="11" fill="#E891A7" stroke="white" strokeWidth="3" />
              <circle cx={userX} cy="60" r="4" fill="white" />
            </g>
          )}
        </svg>
      </div>

      <div style={{ marginTop: '1.5rem', display: 'flex', justifyContent: 'flex-end' }}>
        <button className="btn-primary" onClick={check}>Weiter</button>
      </div>
    </div>
  )
}

export function Item3({ onAnswer }) {
  const [cells, setCells] = useState(Array(8).fill(false))

  const toggle = (i) => () => {
    const next = [...cells]; next[i] = !next[i]; setCells(next)
  }
  const count = cells.filter(Boolean).length

  const check = () => {
    onAnswer(count === 5)
  }

  return (
    <div>
      <p style={{ fontSize: '1.15rem', marginBottom: '1.5rem' }}>
        Färbe <Fraction z={5} n={8} /> des Rechtecks. Tippe Felder an oder ab.
      </p>

      <div style={{ background: 'var(--cream-deep)', borderRadius: 24, padding: '1.5rem', display: 'flex', justifyContent: 'center' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(8, 56px)', gap: 6 }}>
          {cells.map((on, i) => (
            <div key={i} className={`tile-cell ${on ? 'active' : ''}`} onClick={toggle(i)} />
          ))}
        </div>
      </div>

      <p style={{ marginTop: '1rem', textAlign: 'center', color: 'var(--plum-soft)', fontWeight: 600 }}>
        Gefärbt: {count} von 8
      </p>

      <div style={{ marginTop: '1.5rem', display: 'flex', justifyContent: 'flex-end' }}>
        <button className="btn-primary" onClick={check}>Weiter</button>
      </div>
    </div>
  )
}

export function Item4({ onAnswer }) {
  const numbers = [
    { v: 408000, label: '408 000' },
    { v: 84000, label: '84 000' },
    { v: 480000, label: '480 000' },
    { v: 408500, label: '408 500' }
  ]
  const [pool, setPool] = useState(() => [...numbers].sort(() => Math.random() - 0.5))
  const [slots, setSlots] = useState([null, null, null, null])
  const dragRef = useRef(null)

  const onDragStart = (item, source, idx) => (e) => {
    dragRef.current = { item, source, idx }
  }
  const onDropSlot = (i) => (e) => {
    e.preventDefault()
    const d = dragRef.current; if (!d) return
    const newSlots = [...slots]; const newPool = [...pool]
    if (newSlots[i]) newPool.push(newSlots[i])
    if (d.source === 'pool') newPool.splice(d.idx, 1)
    else newSlots[d.idx] = null
    newSlots[i] = d.item
    setSlots(newSlots); setPool(newPool); dragRef.current = null
  }
  const onDropPool = (e) => {
    e.preventDefault()
    const d = dragRef.current; if (!d || d.source !== 'slot') return
    const newSlots = [...slots]; newSlots[d.idx] = null
    setSlots(newSlots); setPool([...pool, d.item]); dragRef.current = null
  }
  const returnToPool = (i) => () => {
    const s = slots[i]; if (!s) return
    const newSlots = [...slots]; newSlots[i] = null
    setSlots(newSlots); setPool([...pool, s])
  }

  const check = () => {
    if (slots.some(s => s === null)) { onAnswer(false); return }
    const sorted = [...slots.map(s => s.v)].sort((a,b) => a-b)
    onAnswer(slots.every((s, i) => s.v === sorted[i]))
  }

  return (
    <div>
      <p style={{ fontSize: '1.15rem', marginBottom: '1.5rem' }}>
        Ordne die Zahlen der Größe nach. Ziehe die kleinste nach links, die größte nach rechts.
      </p>

      <div style={{ background: 'var(--cream-deep)', borderRadius: 24, padding: '1.5rem' }}>
        <p style={{ fontSize: '0.85rem', color: 'var(--plum-soft)', margin: '0 0 8px' }}>Vorrat:</p>
        <div onDragOver={(e) => e.preventDefault()} onDrop={onDropPool}
          style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginBottom: '1.5rem', minHeight: 72, padding: 8, borderRadius: 12 }}>
          {pool.map((it, i) => (
            <div key={`${it.v}-${i}`} className="chip" draggable onDragStart={onDragStart(it, 'pool', i)}>{it.label}</div>
          ))}
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '32px repeat(4, 1fr) 32px', gap: 8, alignItems: 'center' }}>
          <span style={{ fontSize: '0.8rem', color: 'var(--plum-soft)', textAlign: 'center', fontWeight: 700 }}>klein</span>
          {slots.map((s, i) => (
            <div key={i} className="dropzone" onDragOver={(e) => e.preventDefault()} onDrop={onDropSlot(i)}>
              {s && <div className="chip" draggable onDragStart={onDragStart(s, 'slot', i)} onClick={returnToPool(i)} title="Zurück in den Vorrat" style={{ cursor: 'pointer' }}>{s.label}</div>}
            </div>
          ))}
          <span style={{ fontSize: '0.8rem', color: 'var(--plum-soft)', textAlign: 'center', fontWeight: 700 }}>groß</span>
        </div>
      </div>

      <div style={{ marginTop: '1.5rem', display: 'flex', justifyContent: 'flex-end' }}>
        <button className="btn-primary" onClick={check}>Weiter</button>
      </div>
    </div>
  )
}
