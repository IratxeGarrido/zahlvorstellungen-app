import React, { useState, useRef } from 'react'
import { Fraction } from '../components/ui.jsx'

function NumberLineMarker({ ticks, labels, target, tolerance = 12, viewBox = "0 0 600 110", padding = [40, 560], yPos = 60 }) {
  const [userX, setUserX] = useState(null)
  const svgRef = useRef(null)

  const handleClick = (e) => {
    const rect = svgRef.current.getBoundingClientRect()
    const x = ((e.clientX - rect.left) / rect.width) * 600
    if (x < padding[0] - 5 || x > padding[1] + 5) return
    setUserX(x)
  }

  const checkAnswer = () => {
    if (userX === null) return null
    return Math.abs(userX - target) <= tolerance
  }

  return { userX, checkAnswer, render: (
    <svg ref={svgRef} className="numline-svg" viewBox={viewBox} onClick={handleClick}>
      <line x1={padding[0]} y1={yPos} x2={padding[1]} y2={yPos} stroke="#3B2530" strokeWidth="3" strokeLinecap="round" />
      <line x1={padding[0]} y1={yPos - 14} x2={padding[0]} y2={yPos + 14} stroke="#3B2530" strokeWidth="3" strokeLinecap="round" />
      <line x1={padding[1]} y1={yPos - 14} x2={padding[1]} y2={yPos + 14} stroke="#3B2530" strokeWidth="3" strokeLinecap="round" />
      {ticks.map((t, i) => (
        <line key={i} x1={t.x} y1={yPos - (t.big ? 10 : 6)} x2={t.x} y2={yPos + (t.big ? 10 : 6)}
          stroke={t.big ? "#6E4F70" : "#9B7E9D"} strokeWidth={t.big ? 1.8 : 1.2} />
      ))}
      {labels.map((l, i) => (
        <text key={i} x={l.x} y={yPos + 32} textAnchor="middle"
          fontFamily="Fredoka" fontSize="16" fontWeight="500" fill="#3B2530">{l.text}</text>
      ))}
      {userX !== null && (
        <g>
          <circle cx={userX} cy={yPos} r="11" fill="#E891A7" stroke="white" strokeWidth="3" />
          <circle cx={userX} cy={yPos} r="4" fill="white" />
        </g>
      )}
    </svg>
  )}
}

export function Item9({ onAnswer }) {
  const ticks = []
  for (let i = 1; i < 10; i++) {
    ticks.push({ x: 40 + (i / 10) * 520, big: false })
  }
  const labels = [{ x: 40, text: '0' }, { x: 560, text: '1' }]
  const line = NumberLineMarker({ ticks, labels, target: 40 + (6/10) * 520, tolerance: 12 })

  const check = () => {
    const result = line.checkAnswer()
    onAnswer(result === true)
  }

  return (
    <div>
      <p style={{ fontSize: '1.15rem', marginBottom: '1.5rem' }}>
        Markiere <Fraction z={6} n={10} /> auf dem Zahlenstrahl. Tippe auf die richtige Stelle.
      </p>
      <div style={{ background: 'var(--cream-deep)', borderRadius: 24, padding: '2rem 1.5rem' }}>
        {line.render}
      </div>
      <div style={{ marginTop: '1.5rem', display: 'flex', justifyContent: 'flex-end' }}>
        <button className="btn-primary" onClick={check}>Weiter</button>
      </div>
    </div>
  )
}

export function Item10({ onAnswer }) {
  const ticks = []
  for (let i = 1; i < 20; i++) {
    ticks.push({ x: 40 + (i / 20) * 520, big: i % 5 === 0 })
  }
  const labels = [{ x: 40, text: '0' }, { x: 560, text: '1' }]
  const line = NumberLineMarker({ ticks, labels, target: 40 + (5/20) * 520, tolerance: 10 })

  const check = () => {
    const result = line.checkAnswer()
    onAnswer(result === true)
  }

  return (
    <div>
      <p style={{ fontSize: '1.15rem', marginBottom: '1.5rem' }}>
        Markiere <Fraction z={5} n={20} /> auf dem Zahlenstrahl. Tippe auf die richtige Stelle.
      </p>
      <div style={{ background: 'var(--cream-deep)', borderRadius: 24, padding: '2rem 1.5rem' }}>
        {line.render}
      </div>
      <div style={{ marginTop: '1.5rem', display: 'flex', justifyContent: 'flex-end' }}>
        <button className="btn-primary" onClick={check}>Weiter</button>
      </div>
    </div>
  )
}

export function Item11({ onAnswer }) {
  const ticks = []
  const labels = []
  for (let i = 0; i <= 9; i++) {
    const x = 40 + (i / 9) * 520
    if (i > 0 && i < 9) ticks.push({ x, big: false })
    labels.push({ x, text: String(i * 10) })
  }
  const line = NumberLineMarker({ ticks, labels, target: 40 + (30/90) * 520, tolerance: 12 })

  const check = () => {
    const result = line.checkAnswer()
    onAnswer(result === true)
  }

  return (
    <div>
      <p style={{ fontSize: '1.15rem', marginBottom: '1.5rem' }}>
        Markiere <Fraction z={1} n={3} /> von <strong>90</strong> auf dem Zahlenstrahl.
      </p>
      <div style={{ background: 'var(--cream-deep)', borderRadius: 24, padding: '2rem 1.5rem' }}>
        {line.render}
      </div>
      <div style={{ marginTop: '1.5rem', display: 'flex', justifyContent: 'flex-end' }}>
        <button className="btn-primary" onClick={check}>Weiter</button>
      </div>
    </div>
  )
}
