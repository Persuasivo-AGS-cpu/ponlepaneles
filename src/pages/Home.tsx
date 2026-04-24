import { motion, AnimatePresence } from 'framer-motion';
import { Zap, ArrowRight, CheckCircle2, ShieldCheck, Wrench, ChevronDown, Award, Calculator, Search } from 'lucide-react';
import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import Quoter from '../components/Quoter';

export default function Home() {
  const [formState, setFormState] = useState({ name: '', email: '', phone: '', subject: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormState({ ...formState, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => { setIsSubmitting(false); setSubmitted(true); }, 1500);
  };

  const projectImages = [
    "https://ponlepaneles.com/static/projects/img1.jpg",
    "https://ponlepaneles.com/static/projects/img2.jpg",
    "https://ponlepaneles.com/static/projects/img3.jpg",
    "https://ponlepaneles.com/static/projects/img5.jpg"
  ];

  const faqs = [
    { q: "¿Tengo que seguir pagando a CFE?", a: "Seguirás conectado a CFE, pero tu recibo bajará al cobro mínimo (aprox. $50-$60 pesos bimestrales). Los paneles inyectan energía a la red, y CFE te la toma a favor.", tag: "CFE" },
    { q: "¿Cuánto dura la instalación?", a: "El proceso físico en tu techo dura de 1 a 2 días dependiendo del sistema. El proceso completo con todo y trámite de CFE tarda entre 2 y 3 semanas.", tag: "Instalación" },
    { q: "¿Qué mantenimiento requieren?", a: "Prácticamente nulo. Recomendamos una limpieza de los paneles con agua cada 3 o 6 meses dependiendo del polvo en tu zona para mantener su eficiencia.", tag: "Mantenimiento" },
    { q: "¿Qué garantía ofrecen?", a: "Los paneles LONGi tienen hasta 25 años de garantía de generación, y los inversores Growatt cuentan con monitoreo WiFi y amplias garantías de fábrica. Nosotros garantizamos nuestra instalación.", tag: "Garantías" },
    { q: "¿Qué pasa si genero más energía de la que consumo?", a: "CFE te la guarda a tu favor en una 'Bolsa de Energía' que dura hasta 12 meses. Si generas de más en invierno, lo puedes usar para los aires acondicionados en verano.", tag: "CFE" },
    { q: "¿Los paneles funcionan cuando está nublado?", a: "Sí, aunque la eficiencia disminuye respecto a un día soleado, los paneles modernos siguen captando radiación difusa y generando energía.", tag: "Técnico" },
    { q: "¿Me voy a quedar sin luz si hay apagón en mi colonia?", a: "Sí. Por normativa de seguridad de CFE, los inversores de interconexión (On-Grid) se apagan para no electrocutar a los linieros que estén reparando la falla. Solo los sistemas con baterías pueden dar respaldo.", tag: "Técnico" },
    { q: "¿Las granizadas rompen los paneles?", a: "No. Los paneles Tier 1 como LONGi están diseñados con vidrio templado de grado militar que soporta el impacto de granizo de hasta 2.5 cm cayendo a 80 km/h.", tag: "Mantenimiento" },
    { q: "¿El precio incluye el trámite con CFE?", a: "Totalmente. Nosotros nos encargamos de todo el papeleo, ingeniería y el cambio al medidor bidireccional por ti. Es un servicio llave en mano.", tag: "Instalación" },
    { q: "¿Los paneles dañan el techo o causan goteras?", a: "De ninguna manera. Usamos estructuras de aluminio anodizado ancladas con químicos especiales y sellador de poliuretano, o bien, bases lastradas sin perforación dependiendo del techo.", tag: "Instalación" },
    { q: "¿En cuánto tiempo recupero mi inversión (ROI)?", a: "Si te encuentras en tarifa DAC (Alto Consumo) o tienes tarifa comercial, el retorno promedio en Monterrey es de 2.5 a 4 años.", tag: "Costos" },
    { q: "¿Es legal producir mi propia energía?", a: "100% legal. La reforma energética en México permite la 'Generación Distribuida' en hogares y negocios sin necesidad de permisos especiales, hasta por 500kW.", tag: "Legal" },
    { q: "¿Pueden poner paneles si rento mi casa/negocio?", a: "Sí se puede, pero necesitas la autorización por escrito y firma del propietario del inmueble para poder realizar el trámite de interconexión con CFE.", tag: "Legal" },
    { q: "¿Los paneles se pueden deducir de impuestos?", a: "Sí, de acuerdo al Artículo 34 fracción XIII de la LISR, la inversión en equipo para generación de energía renovable es 100% deducible en el primer año para personas físicas y morales con actividad empresarial.", tag: "Costos" }
  ];

  const allTags = ["Todos", ...Array.from(new Set(faqs.map(f => f.tag)))];
  
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTag, setSelectedTag] = useState('Todos');

  const filteredFaqs = useMemo(() => {
    let filtered = faqs.filter(faq => {
      const matchesSearch = faq.q.toLowerCase().includes(searchQuery.toLowerCase()) || faq.a.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesTag = selectedTag === 'Todos' || faq.tag === selectedTag;
      return matchesSearch && matchesTag;
    });

    // Si no hay búsqueda ni tag seleccionado, mostrar solo el Top 4
    if (searchQuery === '' && selectedTag === 'Todos') {
      return filtered.slice(0, 4);
    }
    
    return filtered;
  }, [searchQuery, selectedTag, faqs]);

  const toggleFaq = (idx: number) => {
    if (activeFaq === idx) setActiveFaq(null);
    else setActiveFaq(idx);
  };

  return (
    <>
      <div className="bg-blobs">
        <div className="blob blob-1"></div>
        <div className="blob blob-2"></div>
      </div>

      <header className="header">
        <div className="container header-content">
          <Link to="/" className="logo">
            <img src="https://ponlepaneles.com/static/brand/ppa_light.png" alt="PonlePaneles.com" />
          </Link>
          <nav className="nav-links">
            <a href="#como-funciona">Pasos</a>
            <a href="#proyectos">Proyectos</a>
            <a href="#faq">Preguntas</a>
            <a href="#contacto">Contacto</a>
          </nav>
          <a href="#cotizador" className="btn-primary">Cotiza en 1 minuto <ArrowRight size={18} /></a>
        </div>
      </header>

      <main>
        {/* HERO SECTION */}
        <section className="hero">
          <div className="hero-glow"></div>
          <div className="container hero-grid">
            <div className="hero-text">
              <motion.h1 initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
                Congela tu recibo de luz y empieza a ahorrar hoy mismo.
              </motion.h1>
              <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }}>
                Sistemas de paneles solares premium para Monterrey, Nuevo León y Saltillo. Equipos LONGi y Growatt con instalación certificada y gestoría CFE 100% incluida.
              </motion.p>
              <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.6, delay: 0.4 }}>
                <a href="#cotizador" className="btn-primary" style={{ fontSize: '1.2rem', padding: '1rem 2.5rem' }}>
                  Obtener Cotización Gratis <Zap size={20} />
                </a>
                <p className="hero-trust">Más de 8 años de experiencia • Trámite CFE Incluido</p>
              </motion.div>
            </div>
            
            <motion.div className="hero-image-wrapper" initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, delay: 0.3 }}>
              <div className="hero-image-container">
                <img src="/hero-installer.png" alt="Instalador Certificado PPA" className="hero-installer-img" />
                <div className="hero-image-badge">
                  <ShieldCheck size={24} color="var(--primary)" />
                  <span>Instalación Certificada PPA</span>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* TRUST BADGES */}
        <section className="trust-section">
          <div className="container">
            <p>CONFIANZA Y EQUIPO CERTIFICADO POR:</p>
            <div className="trust-logos">
              <span className="brand-logo">LONGi</span>
              <span className="brand-logo">Growatt</span>
              <span className="brand-logo">CFE</span>
              <span className="brand-logo">FIDE</span>
            </div>
          </div>
        </section>

        {/* QUOTER SECTION */}
        <Quoter />

        {/* HOW IT WORKS (STEPS) */}
        <section id="como-funciona" className="section-padding">
          <div className="container">
            <h2 className="section-title">El camino hacia tu <span>Independencia Energética</span></h2>
            <div className="steps-wrapper">
              
              <motion.div className="step-card" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
                <div className="step-number">1</div>
                <div className="step-icon"><Calculator /></div>
                <h3>Cotización y Análisis</h3>
                <p>En 1 minuto recibes tu cálculo online. Luego, agendamos una visita técnica en 48 horas para hacer un render 3D y estudio de sombras.</p>
              </motion.div>
              
              <div className="step-connector"></div>

              <motion.div className="step-card" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }}>
                <div className="step-number">2</div>
                <div className="step-icon"><Wrench /></div>
                <h3>Instalación Certificada</h3>
                <p>Aprobado tu anticipo (75%), agendamos e instalamos en 14 días. La obra física toma solo 1 a 2 días con la mejor calidad regiomontana.</p>
              </motion.div>
              
              <div className="step-connector"></div>

              <motion.div className="step-card" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.4 }}>
                <div className="step-number">3</div>
                <div className="step-icon"><ShieldCheck /></div>
                <h3>Trámite y Ahorro</h3>
                <p>Nosotros gestionamos el 100% del contrato de interconexión con CFE. Encendemos tu sistema y comienzas a pagar el mínimo de por vida.</p>
              </motion.div>

            </div>
          </div>
        </section>

        {/* SOCIAL PROOF / PROJECTS */}
        <section id="proyectos" className="section-padding bg-alt">
          <div className="container">
            <h2 className="section-title">Nuestros <span>Proyectos de Éxito</span></h2>
            <div className="gallery-grid">
              {projectImages.map((src, index) => (
                <motion.div key={index} className="gallery-item" initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: index * 0.1 }}>
                  <img src={src} alt={`Proyecto Solar ${index + 1}`} loading="lazy" />
                  <div className="gallery-overlay">
                    <span>Familia Ahorrando #{index + 1}</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ SECTION */}
        <section id="faq" className="section-padding">
          <div className="container" style={{ maxWidth: '900px' }}>
            <h2 className="section-title">Preguntas <span>Frecuentes</span></h2>
            
            {/* OMNI BOX INTELLIGENT */}
            <div className="omni-box-wrapper">
              <div className="omni-search">
                <Search className="omni-icon" />
                <input 
                  type="text" 
                  placeholder="¿Qué duda tienes sobre paneles solares?" 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <div className="omni-tags">
                {allTags.map(tag => (
                  <button 
                    key={tag} 
                    className={`omni-tag ${selectedTag === tag ? 'active' : ''}`}
                    onClick={() => { setSelectedTag(tag); setActiveFaq(null); }}
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>

            <div className="faq-container">
              {filteredFaqs.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '2rem', color: 'var(--text-secondary)' }}>
                  No encontramos preguntas que coincidan con tu búsqueda.
                </div>
              ) : (
                filteredFaqs.map((faq, idx) => (
                  <div key={idx} className={`faq-item ${activeFaq === idx ? 'active' : ''}`}>
                    <button className="faq-question" onClick={() => toggleFaq(idx)}>
                      <span style={{ display: 'flex', alignItems: 'center', gap: '1rem', textAlign: 'left' }}>
                        <span className="faq-tag-pill">{faq.tag}</span>
                        {faq.q}
                      </span>
                      <ChevronDown className={`faq-icon ${activeFaq === idx ? 'rotate' : ''}`} />
                    </button>
                    <AnimatePresence>
                      {activeFaq === idx && (
                        <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="faq-answer">
                          <p>{faq.a}</p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ))
              )}
            </div>
          </div>
        </section>

        {/* CONTACT / FINAL CTA */}
        <section id="contacto" className="contact-section section-padding">
          <div className="contact-dots"></div>
          <div className="container">
            <div className="final-cta-wrapper">
              <div className="cta-info">
                <h2 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>No dejes que el sol se desperdicie.</h2>
                <p style={{ fontSize: '1.2rem', color: 'var(--text-secondary)', marginBottom: '2rem' }}>Recupera tu inversión en un promedio de 2.5 a 3.5 años y disfruta de energía limpia y casi gratuita por 25 años más.</p>
                <ul className="cta-list">
                  <li><CheckCircle2 color="var(--primary)" /> Atención rápida y personalizada</li>
                  <li><Award color="var(--primary)" /> Calidad y experiencia Regiomontana</li>
                  <li><ShieldCheck color="var(--primary)" /> Garantía por escrito y Trámites CFE</li>
                </ul>
              </div>
              
              <div className="form-container">
                {submitted ? (
                  <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} style={{ textAlign: 'center', padding: '2rem 0' }}>
                    <CheckCircle2 color="var(--primary)" size={64} style={{ margin: '0 auto 1.5rem' }} />
                    <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>¡Solicitud Recibida!</h3>
                    <p style={{ color: 'var(--text-secondary)' }}>Te contactaremos lo más rápido posible.</p>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit}>
                    <h3 style={{ marginBottom: '1.5rem', fontSize: '1.5rem' }}>Déjanos tus datos</h3>
                    <div className="form-group">
                      <input type="text" id="name" name="name" required className="form-control" value={formState.name} onChange={handleInputChange} placeholder="Nombre Completo" />
                    </div>
                    <div className="form-group">
                      <input type="tel" id="phone" name="phone" pattern="[0-9]{10}" required className="form-control" value={formState.phone} onChange={handleInputChange} placeholder="Teléfono a 10 dígitos" />
                    </div>
                    <div className="form-group">
                      <input type="email" id="email" name="email" required className="form-control" value={formState.email} onChange={handleInputChange} placeholder="Correo Electrónico" />
                    </div>
                    <button type="submit" className="btn-primary form-submit" disabled={isSubmitting}>
                      {isSubmitting ? 'Procesando...' : 'Quiero mi Cotización'} <ArrowRight size={20} />
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer>
        <div className="container">
          <img src="https://ponlepaneles.com/static/brand/ppa_light.png" alt="PonlePaneles" style={{ height: '30px', marginBottom: '1rem', opacity: 0.7 }} />
          <p>© 2026 PonlePaneles.com. Todos los derechos reservados.</p>
          <div className="footer-links">
            <a href="#" style={{ color: 'var(--text-secondary)' }}>Política de Privacidad</a>
            <Link to="/terminos" style={{ color: 'var(--text-secondary)' }}>Términos y Condiciones</Link>
          </div>
        </div>
      </footer>
    </>
  );
}
