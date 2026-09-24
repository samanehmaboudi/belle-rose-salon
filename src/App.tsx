import "./App.css";

import heroSalon from "./assets/hero-salon.png";
import gallery1 from "./assets/gallery-1.jpg";
import gallery2 from "./assets/gallery-2.jpg";
import gallery3 from "./assets/gallery-3.jpg";
import gallery4 from "./assets/gallery-4.jpg";

const services = [
  {
    number: "01",
    title: "Coupe femme",
    price: "À partir de 45 $",
    description:
      "Une coupe personnalisée selon votre style, votre visage et vos habitudes.",
  },
  {
    number: "02",
    title: "Coupe homme",
    price: "À partir de 30 $",
    description:
      "Une coupe soignée, moderne et facile à entretenir au quotidien.",
  },
  {
    number: "03",
    title: "Coloration",
    price: "À partir de 80 $",
    description:
      "Coloration complète, retouches ou transformation selon vos envies.",
  },
  {
    number: "04",
    title: "Mise en plis",
    price: "À partir de 35 $",
    description:
      "Une finition élégante pour votre quotidien ou vos événements spéciaux.",
  },
  {
    number: "05",
    title: "Soins capillaires",
    price: "À partir de 50 $",
    description:
      "Des soins nourrissants pour renforcer, protéger et révéler vos cheveux.",
  },
  {
    number: "06",
    title: "Coiffure enfant",
    price: "À partir de 25 $",
    description:
      "Une expérience simple et rassurante pour les plus jeunes.",
  },
];

const galleryImages = [
  {
    image: gallery1,
    title: "Coupe moderne",
  },
  {
    image: gallery2,
    title: "Coloration lumineuse",
  },
  {
    image: gallery3,
    title: "Mise en plis",
  },
  {
    image: gallery4,
    title: "Soins capillaires",
  },
];

function App() {
  return (
    <div className="app">
      {/* ================= HEADER ================= */}
      <header className="header">
        <a href="#top" className="brand">
          <span className="brand-main">Belle Rose</span>
          <span className="brand-sub">Salon</span>
        </a>

        <nav className="main-nav">
          <a href="#services">Services</a>
          <a href="#about">À propos</a>
          <a href="#gallery">Galerie</a>
          <a href="#contact">Contact</a>
        </nav>

        <a href="#contact" className="header-cta">
          Prendre rendez-vous
        </a>
      </header>

      <main id="top">
        {/* ================= HERO ================= */}
        <section className="hero">
          <div className="hero-copy">
            <p className="eyebrow">SALON DE COIFFURE À REPENTIGNY</p>

            <h1>
              Prenez soin de vos cheveux.
              <span> Révélez votre style.</span>
            </h1>

            <p className="hero-text">
              Belle Rose Salon vous accueille dans une ambiance douce et
              élégante pour des services de coiffure adaptés à votre style,
              votre rythme et vos envies.
            </p>

            <div className="hero-actions">
              <a href="#contact" className="btn btn-primary">
                Prendre rendez-vous
              </a>

              <a href="#services" className="btn btn-secondary">
                Découvrir nos services
              </a>
            </div>

            <div className="hero-meta">
              <span>✓ Service personnalisé</span>
              <span>✓ Ambiance chaleureuse</span>
              <span>✓ Repentigny</span>
            </div>
          </div>

          <div className="hero-visual">
            <div className="hero-image-wrap">
              <img
                src={heroSalon}
                alt="Ambiance et accessoires de coiffure Belle Rose Salon"
              />

              <div className="hero-card">
                <span className="hero-card-label">Belle Rose</span>
                <strong>Une beauté qui vous ressemble.</strong>
              </div>
            </div>
          </div>
        </section>

        {/* ================= SERVICES ================= */}
        <section id="services" className="section services-section">
          <div className="section-heading">
            <div>
              <p className="eyebrow">NOS SERVICES</p>
              <h2>Des soins pensés pour vous</h2>
            </div>

            <p>
              Des prestations simples, professionnelles et personnalisées pour
              prendre soin de vos cheveux en toute confiance.
            </p>
          </div>

          <div className="services-grid">
            {services.map((service) => (
              <article className="service-card" key={service.title}>
                <span className="service-number">{service.number}</span>

                <div>
                  <h3>{service.title}</h3>
                  <p className="service-price">{service.price}</p>
                  <p className="service-description">
                    {service.description}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* ================= ABOUT ================= */}
        <section id="about" className="section about-section">
          <div className="about-copy">
            <p className="eyebrow">À PROPOS</p>

            <h2>Un moment pour vous, dans une ambiance douce.</h2>

            <p className="about-intro">
              Chez Belle Rose Salon, chaque rendez-vous est pensé comme un
              moment de détente. Nous prenons le temps de comprendre vos
              attentes pour vous proposer un résultat naturel et adapté à
              votre quotidien.
            </p>

            <div className="about-features">
              <div className="feature-item">
                <span>01</span>
                <div>
                  <h3>Écoute</h3>
                  <p>
                    Nous commençons par comprendre votre style et vos besoins.
                  </p>
                </div>
              </div>

              <div className="feature-item">
                <span>02</span>
                <div>
                  <h3>Conseils personnalisés</h3>
                  <p>
                    Chaque recommandation est adaptée à vos cheveux et à votre
                    routine.
                  </p>
                </div>
              </div>

              <div className="feature-item">
                <span>03</span>
                <div>
                  <h3>Résultat soigné</h3>
                  <p>
                    Une attention particulière est portée aux détails et aux
                    finitions.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="about-panel">
            <span className="about-panel-small">BELLE ROSE SALON</span>
            <h3>Coiffure moderne. Service humain.</h3>

            <p>
              Un salon pensé pour offrir une expérience simple, élégante et
              accueillante.
            </p>

            <a href="#contact" className="text-link">
              Planifier une visite →
            </a>
          </div>
        </section>

        {/* ================= GALLERY ================= */}
        <section id="gallery" className="section gallery-section">
          <div className="section-heading gallery-heading">
            <div>
              <p className="eyebrow">INSPIRATIONS</p>
              <h2>Quelques styles Belle Rose</h2>
            </div>

            <p>
              Une sélection d’ambiances, de couleurs et de coiffures pour
              inspirer votre prochaine visite.
            </p>
          </div>

          <div className="gallery-grid">
            {galleryImages.map((item) => (
              <figure className="gallery-card" key={item.title}>
                <img src={item.image} alt={item.title} />

                <figcaption>{item.title}</figcaption>
              </figure>
            ))}
          </div>
        </section>

        {/* ================= CONTACT ================= */}
        <section id="contact" className="section contact-section">
          <div className="contact-heading">
            <p className="eyebrow">PRENDRE RENDEZ-VOUS</p>
            <h2>Prête pour votre prochain changement ?</h2>
            <p>
              Appelez-nous ou envoyez-nous un courriel pour discuter de votre
              prochain rendez-vous.
            </p>
          </div>

          <div className="contact-grid">
            <div className="contact-info">
              <div className="contact-line">
                <span>Adresse</span>
                <p>
                  123 Rue Principale
                  <br />
                  Repentigny, Québec
                </p>
              </div>

              <div className="contact-line">
                <span>Téléphone</span>
                <p>514-555-1234</p>
              </div>

              <div className="contact-line">
                <span>Courriel</span>
                <p>contact@bellerose-demo.com</p>
              </div>

              <div className="contact-line">
                <span>Heures</span>
                <p>
                  Mardi au vendredi : 9 h – 18 h
                  <br />
                  Samedi : 9 h – 16 h
                  <br />
                  Dimanche et lundi : fermé
                </p>
              </div>

              <div className="contact-actions">
                <a href="tel:+15145551234" className="btn btn-primary">
                  Appeler maintenant
                </a>

                <a
                  href="mailto:contact@bellerose-demo.com"
                  className="btn btn-secondary"
                >
                  Envoyer un courriel
                </a>
              </div>
            </div>

            <div className="map-box">
              <span className="map-kicker">NOUS TROUVER</span>

              <h3>Repentigny, Québec</h3>

              <p>
                Un emplacement facile d’accès pour votre prochain rendez-vous
                beauté.
              </p>

              <a
                href="https://www.google.com/maps/search/?api=1&query=Repentigny%20QC"
                target="_blank"
                rel="noreferrer"
                className="map-link"
              >
                Ouvrir dans Google Maps →
              </a>
            </div>
          </div>
        </section>
      </main>

      {/* ================= FOOTER ================= */}
      <footer className="footer">
        <div>
          <strong>Belle Rose Salon</strong>
          <span>Projet démo par VYSA Solutions</span>
        </div>

        <p>© 2026 Belle Rose Salon</p>
      </footer>
    </div>
  );
}

export default App;