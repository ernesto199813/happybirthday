'use client';

import React, { useState, useRef, MouseEvent, useEffect } from 'react';

export type Theme = 'default' | 'party' | 'sunset' | 'ocean' | 'forest' | 'gold' | 'rose' | 'midnight';

export interface GiftCardProps {
  amount: number;
  sender: string;
  receiver: string;
  message: string;
  age?: number;
  theme: Theme;
}

const CONFETTI_COLORS = [
  '#f43f5e', '#a855f7', '#3b82f6', '#10b981', '#f97316', '#eab308', '#06b6d4', '#ec4899'
];

export default function GiftCard({ amount, sender, receiver, message, age, theme }: GiftCardProps) {
  const [flipped, setFlipped] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [cardCode] = useState(() => {
    const s = (sender || 'XX').substring(0, 2).toUpperCase();
    const r = (receiver || 'YY').substring(0, 2).toUpperCase();
    return `${s}-${Math.floor(1000 + Math.random() * 9000)}-${r}`;
  });

  const cardRef = useRef<HTMLDivElement>(null);

  const formatAmount = (val: number) =>
    new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 0 }).format(val || 0);

  const handleClick = () => {
    if (!flipped) {
      setFlipped(true);
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 3200);
    } else {
      setFlipped(false);
    }
  };

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current || flipped) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = ((e.clientY - rect.top) / rect.height - 0.5) * -16;
    const y = ((e.clientX - rect.left) / rect.width - 0.5) * 16;
    setTilt({ x, y });
  };

  const handleMouseLeave = () => setTilt({ x: 0, y: 0 });

  const confettiPieces = Array.from({ length: 50 }, (_, i) => ({
    id: i,
    color: CONFETTI_COLORS[i % CONFETTI_COLORS.length],
    left: Math.random() * 100,
    delay: Math.random() * 1.5,
    duration: 2 + Math.random() * 1.5,
    size: 6 + Math.random() * 6,
  }));

  return (
    <>
      {/* Confetti */}
      {showConfetti && (
        <div className="confetti-wrap" aria-hidden>
          {confettiPieces.map(p => (
            <div
              key={p.id}
              className="confetti-piece"
              style={{
                left: `${p.left}%`,
                backgroundColor: p.color,
                width: p.size,
                height: p.size * 1.6,
                animationDelay: `${p.delay}s`,
                animationDuration: `${p.duration}s`,
              }}
            />
          ))}
        </div>
      )}

      <div className="card-scene">
        <div
          ref={cardRef}
          className={`card-flip theme-${theme} ${flipped ? 'flipped' : ''}`}
          onClick={handleClick}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          style={{
            transform: flipped
              ? 'rotateY(180deg)'
              : `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
          }}
          role="button"
          tabIndex={0}
          aria-label="Birthday gift card — click to flip"
          onKeyDown={(e) => e.key === 'Enter' && handleClick()}
        >
          {/* ─── Front face ─── */}
          <div className="card-face card-front">
            {age && <div className="age-badge">{age}</div>}
            <div className="card-inner">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div className="card-logo">🎂 Birthday Gift</div>
                <div style={{ textAlign: 'right' }}>
                  <div className="card-amount">{formatAmount(amount)}</div>
                </div>
              </div>
              <div className="card-bottom">
                <div className="card-field">
                  <label>From</label>
                  <span>{sender || 'Someone Special'}</span>
                </div>
                <div className="card-field right">
                  <label>To</label>
                  <span>{receiver || 'You'}</span>
                </div>
              </div>
            </div>
          </div>

          {/* ─── Back face ─── */}
          <div className="card-face card-back-face">
            <div className="magnetic-strip" />
            <div className="card-back-inner">
              <div className="back-message">
                "{message || '¡Feliz Cumpleaños! Que este día sea tan especial como tú. 🎉'}"
              </div>
              <div className="back-code">{cardCode}</div>
              <div className="back-fine">
                Presenta este código al momento de redimir.<br />No canjeable por efectivo.
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
