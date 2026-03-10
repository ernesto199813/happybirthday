'use client';

// ─────────────────────────────────────────────────────────────────────────────
// ✏️  EDITA AQUÍ todos los datos de la invitación
// ─────────────────────────────────────────────────────────────────────────────
const DATA = {
  childName: 'Alahia del Valle',
  age: '1',
  subtitle: '¡Cumple Años!',
  dayName: 'Sábado',
  day: '5',
  month: 'Septiembre',
  year: '2026',
  time: '3:00 PM',
  venue: "Salón de Fiestas 'El Cielo'",
  address: 'Calle Alejandro Rodríguez, Casa Nro 3, Sector Los Pinos, Santa Teresa del Tuy',
  mapsUrl: 'https://maps.google.com',
  // URL de tu Web App de Google Apps Script (Sigue los pasos que te di)
  scriptUrl: 'https://script.google.com/macros/s/AKfycbxcz-_ZqrwAFZ68Pehm8BD0mC_UUL7bk8HSZZJVTRrFCjhazeN22O2s8OAJX99kLW8WVg/exec',
  message: '¡No faltes, será un susto muy divertido! 🎈',
  photo: '',
};
// ─────────────────────────────────────────────────────────────────────────────

import React, { useEffect, useState } from 'react';
import styles from './invitation.module.css';

/* ── Components ────────────────────────────────────────────────────────────── */

function RSVPModal({ isOpen, onClose, scriptUrl }: { isOpen: boolean, onClose: () => void, scriptUrl: string }) {
  const [formData, setFormData] = useState({ name: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!scriptUrl) {
      alert('Configuración pendiente: Primero debes pegar la URL del script en la sección DATA al principio del código.');
      return;
    }

    setStatus('loading');
    try {
      console.log('Enviando RSVP a:', scriptUrl);
      await fetch(scriptUrl, {
        method: 'POST',
        mode: 'no-cors', // Para evitar problemas de CORS con Google Apps Script
        body: JSON.stringify({ ...formData, date: new Date().toLocaleString() }),
      });
      setStatus('success');
      setTimeout(() => {
        onClose();
        setStatus('idle');
        setFormData({ name: '', message: '' });
      }, 2500);
    } catch (error) {
      setStatus('error');
    }
  };

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modalContent} onClick={e => e.stopPropagation()}>
        <button className={styles.modalClose} onClick={onClose}>&times;</button>
        {status === 'success' ? (
          <div className={styles.successMsg}>
            <div className={styles.successIcon}>🎉</div>
            <h3>¡Registro Exitoso!</h3>
            <p>Gracias por registrarte, {formData.name.split(' ')[0]}.</p>
          </div>
        ) : (
          <>
            <h2 className={styles.modalTitle}>Registro de Invitados</h2>
            <form onSubmit={handleSubmit} className={styles.rsvpForm}>
              <div className={styles.formGroup}>
                <label>Nombre y Apellidos</label>
                <input
                  type="text" required placeholder="Ej: Juan Pérez"
                  value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })}
                />
              </div>
              <div className={styles.formGroup}>
                <label>Comentario (opcional)</label>
                <textarea
                  placeholder="Ej: ¡Felicidades Alahia! 🎉"
                  value={formData.message} onChange={e => setFormData({ ...formData, message: e.target.value })}
                />
              </div>
              <button type="submit" className={styles.submitBtn} disabled={status === 'loading'}>
                {status === 'loading' ? 'Enviando...' : 'ENVIAR CONFIRMACIÓN'}
              </button>
              {status === 'error' && <p className={styles.errorText}>Error al enviar. Verifica tu conexión.</p>}
            </form>
          </>
        )}
      </div>
    </div>
  );
}

/* ── SVG Monsters ──────────────────────────────────────────────────────────── */
const MikeWazowski = () => (
  <svg viewBox="0 0 120 140" fill="none" xmlns="http://www.w3.org/2000/svg" className={styles.mikeSvg}>
    {/* Body */}
    <ellipse cx="60" cy="80" rx="52" ry="55" fill="#32cd32" />
    {/* Belly */}
    <ellipse cx="60" cy="95" rx="32" ry="30" fill="#28a428" opacity="0.4" />
    {/* Eye White */}
    <ellipse cx="60" cy="62" rx="30" ry="30" fill="white" />
    {/* Eye Iris */}
    <ellipse cx="62" cy="62" rx="19" ry="20" fill="#00ced1" />
    {/* Eye Pupil */}
    <ellipse cx="63" cy="63" rx="10" ry="11" fill="#1a0a00" />
    {/* Shine */}
    <ellipse cx="57" cy="56" rx="5" ry="5" fill="white" opacity="0.9" />
    {/* Horns */}
    <ellipse cx="45" cy="28" rx="5" ry="10" fill="#28a428" transform="rotate(-15 45 28)" />
    <ellipse cx="75" cy="28" rx="5" ry="10" fill="#28a428" transform="rotate(15 75 28)" />
    {/* Mouth */}
    <path d="M38 105 Q60 122 82 105" stroke="#1a5c1a" strokeWidth="3" fill="#fff" strokeLinecap="round" />
    {/* Teeth */}
    <rect x="46" y="106" width="8" height="8" rx="2" fill="white" />
    <rect x="57" y="109" width="7" height="7" rx="2" fill="white" />
    <rect x="67" y="107" width="7" height="8" rx="2" fill="white" />
    {/* Arms */}
    <ellipse cx="14" cy="90" rx="12" ry="8" fill="#32cd32" transform="rotate(30 14 90)" />
    <ellipse cx="106" cy="90" rx="12" ry="8" fill="#32cd32" transform="rotate(-30 106 90)" />
    {/* Legs */}
    <ellipse cx="45" cy="132" rx="12" ry="8" fill="#32cd32" transform="rotate(10 45 132)" />
    <ellipse cx="75" cy="132" rx="12" ry="8" fill="#32cd32" transform="rotate(-10 75 132)" />
    {/* Hat - MU cap */}
    <path d="M30 32 Q60 15 90 32" stroke="#003bb5" strokeWidth="8" fill="none" strokeLinecap="round" />
    <rect x="20" y="30" width="80" height="10" rx="5" fill="#003bb5" />
    <text x="48" y="42" fontSize="8" fill="white" fontWeight="bold">MU</text>
  </svg>
);

const Sulley = () => (
  <svg viewBox="0 0 130 180" fill="none" xmlns="http://www.w3.org/2000/svg" className={styles.sulleySvg}>
    {/* Body */}
    <ellipse cx="65" cy="110" rx="55" ry="65" fill="#00ced1" />
    {/* Spots */}
    {[
      [30, 80, 9], [85, 70, 11], [55, 60, 7], [100, 105, 8], [25, 120, 10], [75, 130, 6],
    ].map(([cx, cy, r], i) => (
      <ellipse key={i} cx={cx} cy={cy} rx={r} ry={r * 0.8} fill="#a855f7" opacity="0.6" />
    ))}
    {/* Belly */}
    <ellipse cx="65" cy="120" rx="34" ry="38" fill="#7dd9df" opacity="0.5" />
    {/* Jacket */}
    <path d="M20 140 Q65 165 110 140 L115 175 Q65 185 15 175 Z" fill="#1e3a8a" />
    <text x="47" y="168" fontSize="14" fill="white" fontWeight="900">M</text>
    {/* Head */}
    <ellipse cx="65" cy="58" rx="48" ry="48" fill="#00ced1" />
    {/* Spots on head */}
    <ellipse cx="40" cy="45" rx="8" ry="6" fill="#a855f7" opacity="0.5" />
    <ellipse cx="85" cy="40" rx="9" ry="7" fill="#a855f7" opacity="0.5" />
    {/* Horns */}
    <path d="M40 20 Q33 2 42 8" stroke="#00ced1" strokeWidth="10" fill="#00ced1" strokeLinecap="round" />
    <path d="M90 20 Q97 2 88 8" stroke="#00ced1" strokeWidth="10" fill="#00ced1" strokeLinecap="round" />
    {/* Eyes */}
    <ellipse cx="50" cy="55" rx="13" ry="14" fill="white" />
    <ellipse cx="80" cy="55" rx="13" ry="14" fill="white" />
    <ellipse cx="52" cy="56" rx="8" ry="9" fill="#2c4a1a" />
    <ellipse cx="82" cy="56" rx="8" ry="9" fill="#2c4a1a" />
    <ellipse cx="50" cy="53" rx="3" ry="3" fill="white" />
    <ellipse cx="80" cy="53" rx="3" ry="3" fill="white" />
    {/* Mouth */}
    <path d="M42 76 Q65 92 88 76" stroke="#006a70" strokeWidth="3" fill="#fff" strokeLinecap="round" />
    {/* Arms */}
    <ellipse cx="10" cy="115" rx="13" ry="10" fill="#00ced1" transform="rotate(25 10 115)" />
    <ellipse cx="120" cy="115" rx="13" ry="10" fill="#00ced1" transform="rotate(-25 120 115)" />
    {/* Claws */}
    <path d="M4 122 Q0 130 6 128" stroke="#006a70" strokeWidth="2" strokeLinecap="round" />
    <path d="M8 125 Q6 133 12 130" stroke="#006a70" strokeWidth="2" strokeLinecap="round" />
    <path d="M124 122 Q128 130 122 128" stroke="#006a70" strokeWidth="2" strokeLinecap="round" />
    <path d="M120 125 Q122 133 116 130" stroke="#006a70" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

/* ── Countdown ─────────────────────────────────────────────────────────────── */
function Countdown({ iso }: { iso: string }) {
  const [t, setT] = useState({ d: 0, h: 0, m: 0, s: 0 });
  useEffect(() => {
    const tick = () => {
      const diff = new Date(iso).getTime() - Date.now();
      if (diff <= 0) { setT({ d: 0, h: 0, m: 0, s: 0 }); return; }
      setT({
        d: Math.floor(diff / 86400000),
        h: Math.floor((diff % 86400000) / 3600000),
        m: Math.floor((diff % 3600000) / 60000),
        s: Math.floor((diff % 60000) / 1000),
      });
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [iso]);

  return (
    <div className={styles.countdownGrid}>
      {([['d', 'Días'], ['h', 'Hrs'], ['m', 'Min'], ['s', 'Seg']] as const).map(([k, l]) => (
        <div key={k} className={styles.countdownCell}>
          <div className={styles.countdownNum}>{String(t[k]).padStart(2, '0')}</div>
          <div className={styles.countdownLbl}>{l}</div>
        </div>
      ))}
    </div>
  );
}

/* ── Page ──────────────────────────────────────────────────────────────────── */
export default function InvitacionPage() {
  const d = DATA;
  const [showModal, setShowModal] = useState(false);
  const MONTHS: Record<string, string> = {
    enero: '01', febrero: '02', marzo: '03', abril: '04', mayo: '05', junio: '06',
    julio: '07', agosto: '08', septiembre: '09', octubre: '10', noviembre: '11', diciembre: '12',
  };
  const mm = MONTHS[d.month.toLowerCase()] ?? '01';
  const iso = `${d.year}-${mm}-${d.day.padStart(2, '0')}T15:00:00`;

  return (
    <main className={styles.page}>
      {/* RSVP Modal */}
      <RSVPModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        scriptUrl={d.scriptUrl}
      />
      {/* Dot pattern overlay */}
      <div className={styles.dotOverlay} aria-hidden />
      {/* Monster spots */}
      <div className={styles.monsterSpots} aria-hidden />

      {/* ── Garland ── */}
      <div className={styles.garland} aria-hidden>
        {['#d4657a', '#a87dbf', '#ff8c00', '#f9a8d4', '#d4657a', '#a87dbf', '#ff8c00', '#f9a8d4', '#d4657a', '#a87dbf'].map((c, i) => (
          <div
            key={i}
            className={styles.flag}
            style={{
              background: c,
              // Le damos un retraso distinto a cada banderín para que parezca una ola de viento real
              animationDelay: `${i * 0.15}s`
            }}
          />
        ))}
      </div>




      {/* ── Hero ── */}
      <header className={styles.hero}>
        <div className={styles.heroBox}>
          {/* Left: text content */}
          <div className={styles.heroLeft}>
            <p className={styles.heroSub}>¡Tienes una Invitación Especial!</p>
            <h1 className={styles.heroName}>{d.childName}</h1>
            <div className={styles.ageLine}>
              <span className={styles.ageNumber}>{d.age}</span>
              <span className={styles.ageText}>Años</span>
            </div>
          </div>
          {/* Right: Boo */}
          <div className={styles.booHero}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/boo.png" alt="Boo" className={styles.booHeroImg} />
          </div>
        </div>
      </header>

      {/* ── Monsters row: Sulley | Photo | Mike ── */}
      <div className={styles.monstersRow}>
        {/* Sulley — left */}
        <div className={styles.sulleyWrap}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/monster1.png" alt="Sulley" className={styles.sulleyImg} />
        </div>

        {/* Photo — center */}
        <div className={styles.photoCenter}>
          {d.photo ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={d.photo} alt={d.childName} className={styles.photo} />
          ) : (
            <span className={styles.photoEmoji}>🎂</span>
          )}
          <div className={styles.photoBorder} />
        </div>

        {/* Mike — right */}
        <div className={styles.mikeWrap}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/mike.png" alt="Mike Wazowski" className={styles.mikeImg} />
        </div>
      </div>

      {/* ── Countdown ── */}
      <section className={styles.canister}>
        <div className={styles.canisterHeader}>
          <span className={styles.statusText}>TIEMPO PARA LA FIESTA</span>
          <div className={styles.statusDots}>
            <span className={styles.dotRed} />
            <span className={styles.dotYellow} />
            <span className={styles.dotGreen} />
          </div>
        </div>
        <h2 className={styles.canisterTitle}>⏳ Faltan</h2>
        <Countdown iso={iso} />
      </section>

      {/* ── Event details ── */}
      <section className={styles.card}>
        <div className={styles.detailRow}>
          <div className={styles.detailIcon} style={{ background: '#d4657a' }}>📅</div>
          <div>
            <h3 className={styles.detailTitle} style={{ color: '#a87dbf' }}>¿Cuándo?</h3>
            <p className={styles.detailMain}>{d.dayName} {d.day} de {d.month}, {d.year}</p>
            <p className={styles.detailSub}>A las {d.time}</p>
          </div>
        </div>
        <div className={styles.divider} />
        <div className={styles.detailRow}>
          <div className={styles.detailIcon} style={{ background: '#a87dbf' }}>📍</div>
          <div>
            <h3 className={styles.detailTitle} style={{ color: '#d4657a' }}>¿Dónde?</h3>
            <p className={styles.detailMain}>{d.venue}</p>
            <p className={styles.detailAddress}>{d.address}</p>
            <a href={d.mapsUrl} target="_blank" rel="noopener noreferrer" className={styles.mapBtn}>
              🗺️ Ver Mapa
            </a>
          </div>
        </div>
      </section>

      {/* ── RSVP ── */}
      <div className={styles.rsvpWrap}>
        <button
          onClick={() => setShowModal(true)}
          className={styles.rsvpBtn}
        >
          ✅ CONFIRMAR ASISTENCIA
        </button>
        <p className={styles.rsvpMsg}>{d.message}</p>
      </div>

      {/* Footer stars */}
      <footer className={styles.footer}>
        {'⭐🎉👾🎊⭐'}
      </footer>
    </main>
  );
}
