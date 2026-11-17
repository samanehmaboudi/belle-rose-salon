import { useEffect } from 'react'
import Lenis from 'lenis'
import 'lenis/dist/lenis.css'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import HeroRose from './components/HeroRose'

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

        <section className="next" id="reserver">
          <p className="next__text">La suite arrive : les gestes.</p>
        </section>
      </main>

      <footer className="site-footer">
        <p>Projet concept réalisé par Vysara, entreprise fictive.</p>
      </footer>
    </>
  )
}
