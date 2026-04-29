import React, { useState } from 'react'
import { Item1, Item2, Item3, Item4 } from './items/items1to4.jsx'
import { Item5, Item6, Item7, Item8 } from './items/items5to8.jsx'
import { Item9, Item10, Item11 } from './items/items9to11.jsx'
import { Item12, Item13, Item14 } from './items/items12to14.jsx'
import { Mascot, MascotSpeech, ItemHeader, NiveauBadge } from './components/ui.jsx'

const ITEMS = [
  { n: 1, std: 'ZD3', niv: 'C', bereich: 'Zahlen darstellen', cls: 5, comp: Item1 },
  { n: 2, std: 'ZO4', niv: 'D', bereich: 'Zahlen ordnen', cls: 5, comp: Item2 },
  { n: 3, std: 'ZD4', niv: 'D', bereich: 'Zahlen darstellen', cls: 5, comp: Item3 },
  { n: 4, std: 'ZO3', niv: 'C', bereich: 'Zahlen ordnen', cls: 5, comp: Item4 },
  { n: 5, std: 'ZD3', niv: 'C', bereich: 'Zahlen darstellen', cls: 5, comp: Item5 },
  { n: 6, std: 'ZO4', niv: 'D', bereich: 'Zahlen ordnen', cls: 5, comp: Item6 },
  { n: 7, std: 'ZB3', niv: 'C', bereich: 'Zahlbeziehungen', cls: 5, comp: Item7 },
  { n: 8, std: 'ZB4', niv: 'D', bereich: 'Zahlbeziehungen', cls: 5, comp: Item8 },
  { n: 9, std: 'ZO4', niv: 'D', bereich: 'Zahlen ordnen', cls: 5, comp: Item9 },
  { n: 10, std: 'ZO4', niv: 'D', bereich: 'Zahlen ordnen', cls: 5, comp: Item10 },
  { n: 11, std: 'ZB4', niv: 'D', bereich: 'Zahlbeziehungen', cls: 5, comp: Item11 },
  { n: 12, std: 'ZD5', niv: 'E', bereich: 'Zahlen darstellen', cls: 6, comp: Item12 },
  { n: 13, std: 'ZO5', niv: 'E', bereich: 'Zahlen ordnen', cls: 6, comp: Item13 },
  { n: 14, std: 'ZB5', niv: 'E', bereich: 'Zahlbeziehungen', cls: 6, comp: Item14 }
]

const ENCOURAGEMENT = [
  'Klasse gemacht!', 'Toll, weiter so!', 'Super!', 'Stark!', 'Wunderbar!', 'Spitze!'
]

export default function App() {
  const [screen, setScreen] = useState('welcome')
  const [currentIndex, setCurrentIndex] = useState(0)
  const [answers, setAnswers] = useState([])
  const [pupilName, setPupilName] = useState('')

  const start = (klasse) => {
    const itemsForClass = ITEMS.filter(i => klasse === 'all' || i.cls === klasse)
    setAnswers([])
    setCurrentIndex(0)
    setScreen('item')
    window._items = itemsForClass
  }

  const items = window._items || ITEMS
  const current = items[currentIndex]

  const onAnswer = (correct) => {
    const next = [...answers, { item: current, correct }]
    setAnswers(next)
    if (currentIndex + 1 < items.length) {
      setCurrentIndex(currentIndex + 1)
    } else {
      setScreen('result')
    }
  }

  const skip = () => {
    const next = [...answers, { item: current, correct: false, skipped: true }]
    setAnswers(next)
    if (currentIndex + 1 < items.length) {
      setCurrentIndex(currentIndex + 1)
    } else {
      setScreen('result')
    }
  }

  const reset = () => {
    setScreen('welcome')
    setAnswers([])
    setCurrentIndex(0)
  }

  return (
    <div className="app-shell">
      <div className="container" style={{ paddingTop: '2rem', paddingBottom: '3rem' }}>
        {screen === 'welcome' && <Welcome onStart={start} pupilName={pupilName} setPupilName={setPupilName} />}
        {screen === 'item' && current && (
          <ItemScreen
            item={current}
            currentIndex={currentIndex}
            total={items.length}
            onAnswer={onAnswer}
            onSkip={skip}
            pupilName={pupilName}
          />
        )}
        {screen === 'result' && <Result answers={answers} onReset={reset} pupilName={pupilName} />}
      </div>
      <footer style={{ textAlign: 'center', padding: '1.5rem', fontSize: '0.85rem', color: 'var(--plum-soft)' }}>
        Lernstandserhebung Zahlvorstellungen · Klasse 5 / 6 · RLP Berlin-Brandenburg
      </footer>
    </div>
  )
}

function Welcome({ onStart, pupilName, setPupilName }) {
  return (
    <div className="card fade-up" style={{ textAlign: 'center', padding: '3rem 2rem' }}>
      <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1rem' }}>
        <Mascot size={120} />
      </div>
      <h1 style={{ marginBottom: '0.75rem' }}>Hallo! Ich bin Lumi.</h1>
      <p style={{ fontSize: '1.15rem', maxWidth: 560, margin: '0 auto 2rem', color: 'var(--plum)' }}>
        Wir machen heute ein paar Aufgaben zu Zahlen, Brüchen und Zahlengeraden.
        Manches ist leicht, manches kniffliger — versuch einfach dein Bestes.
      </p>

      <div style={{ maxWidth: 360, margin: '0 auto 2rem' }}>
        <label style={{ display: 'block', textAlign: 'left', marginBottom: 6, fontWeight: 700, color: 'var(--plum)' }}>
          Wie heißt du?
        </label>
        <input
          type="text"
          value={pupilName}
          onChange={(e) => setPupilName(e.target.value)}
          placeholder="Dein Name"
          style={{
            width: '100%', padding: '14px 18px', borderRadius: 16,
            border: '2px solid var(--cream-deep)', fontSize: '1.05rem',
            fontFamily: 'var(--body)', outline: 'none', background: 'white'
          }}
        />
      </div>

      <h3 style={{ marginBottom: '1rem' }}>Welche Klasse besuchst du?</h3>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, justifyContent: 'center' }}>
        <button className="btn-primary" onClick={() => onStart(5)}>Klasse 5 starten</button>
        <button className="btn-primary" onClick={() => onStart(6)}>Klasse 6 starten</button>
        <button className="btn-secondary" onClick={() => onStart('all')}>Alle 14 Aufgaben</button>
      </div>
    </div>
  )
}

function ItemScreen({ item, currentIndex, total, onAnswer, onSkip, pupilName }) {
  const Comp = item.comp
  const progress = ((currentIndex + 1) / total) * 100

  return (
    <div className="fade-up" key={item.n}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: '1.5rem' }}>
        <div style={{ flex: 1 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8, fontSize: '0.85rem', fontWeight: 700, color: 'var(--plum-soft)' }}>
            <span>{pupilName ? `Hallo, ${pupilName}!` : 'Fortschritt'}</span>
            <span>{currentIndex + 1} / {total}</span>
          </div>
          <div className="progress-bar">
            <div className="progress-fill" style={{ width: `${progress}%` }} />
          </div>
        </div>
      </div>

      <div className="card">
        <ItemHeader
          number={item.n}
          total={total}
          standard={item.std}
          niveau={item.niv}
          teilbereich={item.bereich}
        />
        <Comp onAnswer={onAnswer} />
        <div style={{ marginTop: '1rem', textAlign: 'center' }}>
          <button onClick={onSkip} style={{ background: 'transparent', color: 'var(--plum-soft)', fontSize: '0.9rem', padding: '8px 16px' }}>
            Aufgabe überspringen →
          </button>
        </div>
      </div>
    </div>
  )
}

function Result({ answers, onReset, pupilName }) {
  const correctCount = answers.filter(a => a.correct).length
  const total = answers.length
  const percent = Math.round((correctCount / total) * 100)
  const medal = percent >= 80 ? 'gold' : percent >= 50 ? 'silver' : 'bronze'
  const medalLabel = medal === 'gold' ? 'Gold' : medal === 'silver' ? 'Silber' : 'Bronze'

  const byBereich = answers.reduce((acc, a) => {
    const k = a.item.bereich
    if (!acc[k]) acc[k] = { correct: 0, total: 0 }
    acc[k].total++
    if (a.correct) acc[k].correct++
    return acc
  }, {})

  const byNiveau = answers.reduce((acc, a) => {
    const k = a.item.niv
    if (!acc[k]) acc[k] = { correct: 0, total: 0 }
    acc[k].total++
    if (a.correct) acc[k].correct++
    return acc
  }, {})

  return (
    <div className="card fade-up" style={{ padding: '3rem 2rem' }}>
      <div className={`medal medal-${medal}`}>{medalLabel === 'Gold' ? '★' : medalLabel === 'Silber' ? '✦' : '♦'}</div>
      <h1 style={{ textAlign: 'center', marginTop: '1.5rem', marginBottom: '0.5rem' }}>
        {pupilName ? `Toll gemacht, ${pupilName}!` : 'Toll gemacht!'}
      </h1>
      <p style={{ textAlign: 'center', fontSize: '1.2rem', color: 'var(--plum)', marginBottom: '2rem' }}>
        Du hast <strong>{correctCount} von {total}</strong> Aufgaben richtig gelöst.
      </p>

      <h3 style={{ marginBottom: '1rem' }}>Nach Teilbereich</h3>
      <div style={{ display: 'grid', gap: 12, marginBottom: '2rem' }}>
        {Object.entries(byBereich).map(([k, v]) => (
          <BarRow key={k} label={k} correct={v.correct} total={v.total} />
        ))}
      </div>

      <h3 style={{ marginBottom: '1rem' }}>Nach Niveaustufe</h3>
      <div style={{ display: 'grid', gap: 12, marginBottom: '2rem' }}>
        {['C', 'D', 'E'].filter(k => byNiveau[k]).map(k => (
          <div key={k} style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <NiveauBadge level={k} />
            <BarRow label={`${byNiveau[k].correct} von ${byNiveau[k].total}`} correct={byNiveau[k].correct} total={byNiveau[k].total} compact />
          </div>
        ))}
      </div>

      <h3 style={{ marginBottom: '1rem' }}>Übersicht aller Aufgaben</h3>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(56px, 1fr))', gap: 8, marginBottom: '2rem' }}>
        {answers.map((a, i) => (
          <div key={i} style={{
            aspectRatio: '1', borderRadius: 12,
            background: a.correct ? '#DFF4E8' : '#FCE4EC',
            border: `2px solid ${a.correct ? 'var(--mint-deep)' : 'var(--rose-deep)'}`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontFamily: 'var(--display)', fontWeight: 700, color: a.correct ? '#1F6B45' : '#8B2942'
          }}>
            {a.item.n}
          </div>
        ))}
      </div>

      <div style={{ textAlign: 'center' }}>
        <button className="btn-primary" onClick={onReset}>Noch einmal von vorn</button>
      </div>
    </div>
  )
}

function BarRow({ label, correct, total, compact = false }) {
  const pct = (correct / total) * 100
  return (
    <div style={{ flex: 1 }}>
      {!compact && (
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4, fontSize: '0.95rem', fontWeight: 600 }}>
          <span style={{ color: 'var(--plum)' }}>{label}</span>
          <span style={{ color: 'var(--plum-soft)' }}>{correct} / {total}</span>
        </div>
      )}
      <div style={{ height: 12, background: 'var(--cream-deep)', borderRadius: 999, overflow: 'hidden' }}>
        <div style={{
          height: '100%', width: `${pct}%`,
          background: pct >= 70 ? 'var(--mint-deep)' : pct >= 40 ? 'var(--sun-deep)' : 'var(--rose-deep)',
          borderRadius: 999, transition: 'width 0.6s ease'
        }} />
      </div>
      {compact && (
        <div style={{ marginTop: 4, fontSize: '0.85rem', color: 'var(--plum-soft)', fontWeight: 600 }}>{label}</div>
      )}
    </div>
  )
}
