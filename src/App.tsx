import { useEffect } from 'react'
import Lenis from 'lenis'
import 'lenis/dist/lenis.css'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import HeroRose from './components/HeroRose'
import GesteScene from './components/GesteScene'
import Reservation from './components/Reservation'

gsap.registerPlugin(ScrollTrigger)

export default function App() {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const lenis = new Lenis({ lerp: 0.08 })
    lenis.on('scroll', ScrollTrigger.update)
    const raf = (time: number) => lenis.raf(time * 1000)
    gsap.ticker.add(raf)
    gsap.ticker.lagSmoothing(0)
    return () => {
      gsap.ticker.remove(raf)
      lenis.destroy()
    }
  }, [])

  return (
    <>
      <header className="site-header">
        <a className="site-header__logo" href="#">
          Belle Rose
        </a>
        <a className="btn btn--small" href="#reserver">
          Réserver
        </a>
      </header>

      <main>
        <HeroRose />

        <GesteScene
          id="coiffure"
          folder="coiffure"
          frameCount={124}
          focusX={0.2}
          textSide="right"
          title="La coupe"
          lead="Un geste net et précis, pensé pour votre visage, votre texture et votre quotidien."
          services={['Coupe femme', 'Coupe homme', 'Frange et retouches', 'Brushing et mise en plis']}
          cta="Réserver une coupe"
        />

        <GesteScene
          id="couleur"
          folder="couleur"
          frameCount={124}
          focusX={0.78}
          textSide="left"
          title="La couleur"
          lead="Des nuances sur mesure, posées avec patience pour une brillance qui dure."
          services={['Coloration complète', 'Balayage', 'Reflets et gloss', 'Soin protecteur de la couleur']}
          cta="Réserver une couleur"
        />

        <GesteScene
          id="ongles"
          folder="ongles"
          frameCount={124}
          focusX={0.2}
          textSide="right"
          title="Les ongles"
          lead="Manucure et pédicure soignées, jusqu'au dernier reflet."
          services={['Manucure classique', 'Pose de vernis semi-permanent', 'Pédicure spa', 'Soin des cuticules']}
          cta="Réserver une manucure"
        />

        <Reservation />
      </main>

      <footer className="site-footer">
        <p>Projet concept réalisé par Vysara, entreprise fictive.</p>
      </footer>
    </>
  )
}
