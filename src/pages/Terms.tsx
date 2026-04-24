import { motion } from 'framer-motion';
import { ShieldCheck, CalendarClock, CreditCard, CheckCircle2 } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Terms() {
  return (
    <div className="terms-page">
      <header className="header">
        <div className="container header-content">
          <Link to="/" className="logo">
            <img src="https://ponlepaneles.com/static/brand/ppa_light.png" alt="PonlePaneles.com" />
          </Link>
          <nav className="nav-links">
            <Link to="/">Volver al Inicio</Link>
          </nav>
        </div>
      </header>

      <main className="container" style={{ paddingTop: '8rem', paddingBottom: '5rem' }}>
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          style={{ fontSize: '3rem', marginBottom: '2rem', color: 'var(--primary)' }}
        >
          Términos y Condiciones
        </motion.h1>

        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="terms-content"
        >
          <p style={{ fontSize: '1.2rem', color: 'var(--text-secondary)', marginBottom: '3rem' }}>
            A continuación se detallan las condiciones comerciales y operativas para la adquisición e instalación de tu sistema de energía solar con PonlePaneles.com.
          </p>

          <div className="terms-grid">
            <div className="term-card">
              <CreditCard className="term-icon" />
              <h3>1. Pagos y Anticipos</h3>
              <p>Se requiere el <strong>75% de anticipo</strong> para iniciar el proyecto y el <strong>25% restante</strong> una vez finalizada la instalación del sistema.</p>
            </div>

            <div className="term-card">
              <CheckCircle2 className="term-icon" />
              <h3>2. Precios e Impuestos</h3>
              <p>Todos los precios mostrados en nuestras cotizaciones <strong>incluyen IVA</strong>. Se toma el tipo de cambio del dólar publicado en el D.O.F. del día de la cotización.</p>
            </div>

            <div className="term-card">
              <CalendarClock className="term-icon" />
              <h3>3. Tiempos de Ejecución</h3>
              <p>El tiempo para comenzar la instalación del sistema es de <strong>2 a 3 semanas</strong> una vez liquidado el anticipo. La instalación física del sistema tarda de <strong>1 a 2 días</strong>.</p>
            </div>

            <div className="term-card">
              <ShieldCheck className="term-icon" />
              <h3>4. Trámites y Cobertura</h3>
              <p>El trámite y gestión del contrato de interconexión con CFE <strong>está incluido</strong>. Las cotizaciones son válidas únicamente en los estados de Nuevo León y Coahuila y tienen una vigencia de 7 días calendario.</p>
            </div>
          </div>
        </motion.div>
      </main>

      <footer>
        <div className="container">
          <img src="https://ponlepaneles.com/static/brand/ppa_light.png" alt="PonlePaneles" style={{ height: '30px', marginBottom: '1rem', opacity: 0.7 }} />
          <p>© 2026 PonlePaneles.com. Todos los derechos reservados.</p>
        </div>
      </footer>
    </div>
  );
}
