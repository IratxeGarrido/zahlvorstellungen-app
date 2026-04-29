import React, { useState, useRef } from 'react'
import { Fraction } from '../components/ui.jsx'

export function Item12({ onAnswer }) {
  const [userX, setUserX] = useState(null)
  const svgRef = useRef(null)
  const xFor = v => 300 + v * 80

  const handleClick = (e) => {
    const rect = svgRef.current.getBoundingClientRect()
    const x = ((e.clientX - rect.left) / rect.width) * 600
    if (x < 30 || x > 570) return
    setUserX(x)
  }

  const check = () => {
    if (userX === null) { onAnswer(false); return }
    onAnswer(Math.abs(userX - xFor(-1.5)) <= 12)
  }

  const ticks = []
  for (let v = -3; v <= 3; v++) ticks.push({ x: xFor(v), big: true, label: v })
  for (let v = -2.5; v <= 2.5; v++) ticks.push({ x: xFor(v), big: false })

  return (
    <div>
      <p style={{ fontSize: '1.15rem', marginBottom: '1.5rem' }}>
        Markiere die Zahl <strong>−1,5</strong> auf der Zahlengeraden.
      </p>
      <div style={{ background: 'var(--cream-deep)', borderRadius: 24, padding: '2rem 1.5rem' }}>
        <svg ref={svgRef} className="numline-svg" viewBox="0 0 600 120" onClick={handleClick}>
          <line x1="20" y1="60" x2="580" y2="60" stroke="#3B2530" strokeWidth="3" strokeLinecap="round" />
          <polygon points="580,60 568,53 568,67" fill="#3B2530" />
          <polygon points="20,60 32,53 32,67" fill="#3B2530" />
          {ticks.map((t, i) => (
            <line key={i} x1={t.x} y1={60 - (t.big ? 10 : 6)} x2={t.x} y2={60 + (t.big ? 10 : 6)}
              stroke={t.big ? "#3B2530" : "#9B7E9D"} strokeWidth={t.big ? 2 : 1.2} />
          ))}
          {ticks.filter(t => t.big).map((t, i) => (
            <text key={i} x={t.x} y={92} textAnchor="middle"
              fontFamily="Fredoka" fontSize="16" fontWeight="500" fill="#3B2530">{t.label}</text>
          ))}
          {userX !== null && (
            <g>
              <circle cx={userX} cy="60" r="11" fill="#7F77DD" stroke="white" strokeWidth="3" />
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

export function Item13({ onAnswer }) {
  const items = [
    { v: -0.5, id: 'a', display: '−0,5' },
    { v: 0.25, id: 'b', display: '25 %' },
    { v: 0.75, id: 'c', frac: { z: 3, n: 4 } },
    { v: 0, id: 'd', display: '0' },
    { v: 1.2, id: 'e', display: '1,2' }
  ]
  const [pool, setPool] = useState(() => [...items].sort(() => Math.random() - 0.5))
  const [slots, setSlots] = useState([null, null, null, null, null])
  const dragRef = useRef(null)

  const onDragStart = (item, source, idx) => () => { dragRef.current = { item, source, idx } }
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

  const renderItem = (it) => it.frac ? <Fraction z={it.frac.z} n={it.frac.n} size={1.05} /> : it.display

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
          style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginBottom: '1.5rem', minHeight: 72 }}>
          {pool.map((it, i) => (
            <div key={`${it.id}-${i}`} className="chip" draggable onDragStart={onDragStart(it, 'pool', i)}>
              {renderItem(it)}
            </div>
          ))}
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '32px repeat(5, 1fr) 32px', gap: 8, alignItems: 'center' }}>
          <span style={{ fontSize: '0.8rem', color: 'var(--plum-soft)', textAlign: 'center', fontWeight: 700 }}>klein</span>
          {slots.map((s, i) => (
            <div key={i} className="dropzone" onDragOver={(e) => e.preventDefault()} onDrop={onDropSlot(i)}>
              {s && <div className="chip" draggable onDragStart={onDragStart(s, 'slot', i)} onClick={returnToPool(i)} title="Zurück in den Vorrat" style={{ cursor: 'pointer' }}>{renderItem(s)}</div>}
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

export function Item14({ onAnswer }) {
  const [userX, setUserX] = useState(null)
  const svgRef = useRef(null)
  const xFor = v => 300 + v * 65

  const handleClick = (e) => {
    const rect = svgRef.current.getBoundingClientRect()
    const x = ((e.clientX - rect.left) / rect.width) * 600
    if (x < 30 || x > 570) return
    setUserX(x)
  }

  const check = () => {
    if (userX === null) { onAnswer(false); return }
    onAnswer(Math.abs(userX - xFor(-2.5)) <= 12)
  }

  const intTicks = []
  for (let v = -4; v <= 4; v++) intTicks.push(v)
  const halfTicks = []
  for (let v = -3.5; v <= 3.5; v++) halfTicks.push(v)

  return (
    <div>
      <p style={{ fontSize: '1.15rem', marginBottom: '1.5rem' }}>
        Die Zahl <strong style={{ color: '#1F6B45' }}>a</strong> ist auf der Zahlengeraden markiert.
        Markiere die <strong>Gegenzahl von a</strong>.
      </p>
      <div style={{ background: 'var(--cream-deep)', borderRadius: 24, padding: '2rem 1.5rem' }}>
        <svg ref={svgRef} className="numline-svg" viewBox="0 0 600 130" onClick={handleClick}>
          <line x1="20" y1="70" x2="580" y2="70" stroke="#3B2530" strokeWidth="3" strokeLinecap="round" />
          <polygon points="580,70 568,63 568,77" fill="#3B2530" />
          <polygon points="20,70 32,63 32,77" fill="#3B2530" />
          {intTicks.map(v => (
            <line key={v} x1={xFor(v)} y1="60" x2={xFor(v)} y2="80"
              stroke={v === 0 ? "#3B2530" : "#6E4F70"} strokeWidth={v === 0 ? 2.5 : 1.8} />
          ))}
          {halfTicks.map(v => (
            <line key={`h${v}`} x1={xFor(v)} y1="65" x2={xFor(v)} y2="75" stroke="#9B7E9D" strokeWidth="1" />
          ))}
          {intTicks.map(v => (
            <text key={`l${v}`} x={xFor(v)} y={102} textAnchor="middle"
              fontFamily="Fredoka" fontSize="14" fill="#6E4F70">{v}</text>
          ))}
          <circle cx={xFor(2.5)} cy="70" r="11" fill="#6BC396" stroke="white" strokeWidth="3" />
          <text x={xFor(2.5)} y={48} textAnchor="middle" fontFamily="Fredoka" fontSize="18" fontWeight="600" fill="#1F6B45">a</text>
          {userX !== null && (
            <g>
              <circle cx={userX} cy="70" r="11" fill="#7F77DD" stroke="white" strokeWidth="3" />
              <circle cx={userX} cy="70" r="4" fill="white" />
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
