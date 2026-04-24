import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { DollarSign, SunMedium, Flame, Power, Lock } from 'lucide-react';

export default function Quoter() {
  const [bill, setBill] = useState<number>(5000);
  const [panels, setPanels] = useState<number>(8);
  const [price, setPrice] = useState<number>(72500);
  const [isPoweredOn, setIsPoweredOn] = useState(false);

  useEffect(() => {
    const estimatedKwh = bill / 3.74;
    let requiredPanels = Math.ceil(estimatedKwh / 170);
    
    if (requiredPanels < 4) requiredPanels = 4;
    if (requiredPanels > 40) requiredPanels = 40;

    setPanels(requiredPanels);
    setPrice(28500 + (5500 * requiredPanels));
  }, [bill]);

  // Cálculo de dinero quemado en 10 años (6 bimestres al año * 10 años * factor de inflación aprox)
  const moneyBurned = bill * 60 * 1.35; 

  const handleWhatsAppClick = () => {
    const text = `Hola, acabo de usar la calculadora en su web. Quiero congelar mi sistema de ${panels} Paneles con la inversión de $${price.toLocaleString()} basada en mi recibo de $${bill.toLocaleString()} bimestrales. ¿Qué pasos siguen?`;
    window.open(`https://wa.me/528110656208?text=${encodeURIComponent(text)}`, '_blank');
  };

  return (
    <section id="cotizador" className={`quoter-section ${isPoweredOn ? 'powered-on' : 'powered-off'}`}>
      <div className="container">
        
        {/* ENCABEZADO DINÁMICO */}
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <AnimatePresence mode="wait">
            {!isPoweredOn ? (
              <motion.h2 key="off-title" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="quoter-title off">
                Lo que estás <span>perdiendo</span> sin paneles
              </motion.h2>
            ) : (
              <motion.h2 key="on-title" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="quoter-title on">
                Calcula tu <span>Ahorro Inmediato</span>
              </motion.h2>
            )}
          </AnimatePresence>
          
          <button 
            className={`power-toggle ${isPoweredOn ? 'active' : ''}`}
            onClick={() => setIsPoweredOn(!isPoweredOn)}
          >
            <div className="toggle-track">
              <motion.div 
                className="toggle-thumb" 
                animate={{ x: isPoweredOn ? '100%' : '0%' }}
                transition={{ type: "spring", stiffness: 500, damping: 30 }}
              >
                {isPoweredOn ? <SunMedium size={18} color="#fff" /> : <Power size={18} color="#fff" />}
              </motion.div>
            </div>
            <span className="toggle-label">{isPoweredOn ? 'SISTEMA ENCENDIDO' : 'ENCENDER PANELES'}</span>
          </button>
        </div>

        {/* QUOTER BODY */}
        <div className="compact-quoter">
          <div className="cq-left">
            <AnimatePresence mode="wait">
              {!isPoweredOn ? (
                <motion.div key="text-off" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                  <h3 style={{ color: '#fff' }}>Simulador de Pérdidas CFE</h3>
                  <p style={{ color: '#94a3b8' }}>Ajusta tu pago bimestral y mira cuánto regalarás a CFE en los próximos 10 años.</p>
                </motion.div>
              ) : (
                <motion.div key="text-on" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                  <h3 style={{ color: 'var(--text-primary)' }}>Cotizador Rápido</h3>
                  <p style={{ color: 'var(--text-secondary)' }}>Ajusta tu pago bimestral y descubre tu inversión ideal.</p>
                </motion.div>
              )}
            </AnimatePresence>
            
            <div className="cq-slider-wrap">
              <div className="flex justify-between font-medium" style={{ color: isPoweredOn ? 'var(--text-primary)' : '#fff' }}>
                <span>Tu recibo CFE:</span>
                <span style={{ color: isPoweredOn ? 'var(--primary)' : '#ef4444', fontWeight: 'bold' }}>${bill.toLocaleString()} MXN</span>
              </div>
              <input 
                type="range" 
                min="1000" 
                max="20000" 
                step="500" 
                value={bill} 
                onChange={(e) => setBill(Number(e.target.value))}
                className={`styled-slider ${!isPoweredOn ? 'slider-danger' : ''}`}
              />
            </div>
          </div>
          
          <div className="cq-right">
            <AnimatePresence mode="wait">
              {!isPoweredOn ? (
                <motion.div key="result-off" className="cq-result cq-danger" initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }}>
                  <Flame className="cq-icon-danger" size={32} />
                  <div className="cq-text">
                    <strong style={{ color: '#fca5a5' }}>${moneyBurned.toLocaleString('es-MX', { maximumFractionDigits: 0 })}</strong>
                    <span style={{ color: '#fecaca' }}>Dinero quemado a 10 años</span>
                  </div>
                </motion.div>
              ) : (
                <motion.div key="result-on" style={{ display: 'flex', flexDirection: 'column', gap: '1rem', width: '100%' }} initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }}>
                  <div className="cq-result">
                    <SunMedium className="cq-icon" size={24} />
                    <div className="cq-text">
                      <strong>{panels} Paneles</strong>
                      <span>Sistema Sugerido</span>
                    </div>
                  </div>
                  
                  <div className="cq-result cq-highlight">
                    <DollarSign className="cq-icon-white" size={24} />
                    <div className="cq-text">
                      <strong>${price.toLocaleString()}</strong>
                      <span>Inversión Neta (IVA inc.)</span>
                    </div>
                  </div>

                  {/* CTA LOCK IN */}
                  <button onClick={handleWhatsAppClick} className="lock-in-btn">
                    <Lock size={18} />
                    <span>Congelar esta cotización ahora</span>
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
        
      </div>
    </section>
  );
}
