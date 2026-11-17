import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const FRAME_COUNT = 124
const frameSrc = (i: number) => `/frames/hero/frame_${String(i + 1).padStart(3, '0')}.webp`
// Point d'intérêt horizontal de l'image (la rose est à droite)
const FOCUS_X = 0.72
// Sur mobile, l'image fait 1,7 fois la largeur de l'écran
const PORTRAIT_ZOOM = 1.7
const BG = '#1e2419'

const TITLE = 'Belle Rose'

export default function HeroRose() {
  const sectionRef = useRef<HTMLElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const section = sectionRef.current
    if (!canvas || !section) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const images: HTMLImageElement[] = []
    const state = { frame: 0 }

    const draw = () => {
      let i = Math.round(state.frame)
      while (i > 0 && !(images[i]?.complete && images[i].naturalWidth)) i--
      const img = images[i]
      if (!img || !img.naturalWidth) return

      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      const w = canvas.clientWidth
      const h = canvas.clientHeight
      if (canvas.width !== Math.round(w * dpr) || canvas.height !== Math.round(h * dpr)) {
        canvas.width = Math.round(w * dpr)
        canvas.height = Math.round(h * dpr)
      }

      // Portrait (mobile) : on dézoome pour garder la rose ET les cheveux,
      // l'image est placée en haut et le texte reste en bas.
      const portrait = h > w * 1.1
      const scale = portrait
        ? (w * PORTRAIT_ZOOM) / img.naturalWidth
        : Math.max(w / img.naturalWidth, h / img.naturalHeight)
      const dw = img.naturalWidth * scale
      const dh = img.naturalHeight * scale
      const dx = Math.min(0, Math.max(w - dw, w / 2 - dw * FOCUS_X))
      const dy = portrait ? h * 0.36 - dh / 2 : (h - dh) / 2

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      ctx.fillStyle = BG
      ctx.fillRect(0, 0, w, h)
      ctx.drawImage(img, dx, dy, dw, dh)

      if (portrait) {
        const fade = dh * 0.22
        const top = ctx.createLinearGradient(0, dy, 0, dy + fade)
        top.addColorStop(0, BG)
        top.addColorStop(1, 'rgba(30, 36, 25, 0)')
        ctx.fillStyle = top
        ctx.fillRect(0, dy - 1, w, fade + 1)
        const bottom = ctx.createLinearGradient(0, dy + dh - fade, 0, dy + dh)
        bottom.addColorStop(0, 'rgba(30, 36, 25, 0)')
        bottom.addColorStop(1, BG)
        ctx.fillStyle = bottom
        ctx.fillRect(0, dy + dh - fade, w, fade + 1)
      }
    }

    for (let i = 0; i < FRAME_COUNT; i++) {
      const img = new Image()
      img.decoding = 'async'
      img.src = frameSrc(i)
      img.onload = () => {
        if (Math.abs(i - state.frame) < 2) draw()
      }
      images.push(img)
    }

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    const gctx = gsap.context(() => {
      const trigger = { trigger: section, start: 'top top', end: 'bottom bottom', scrub: 0.6 }

      gsap.to(state, { frame: FRAME_COUNT - 1, ease: 'none', scrollTrigger: trigger, onUpdate: draw })

      gsap
        .timeline({ scrollTrigger: trigger })
        .to('.hero__cue', { autoAlpha: 0, duration: 0.4 }, 0.2)
        .to('.hero-beat--1', { autoAlpha: 0, y: -40, duration: 1 }, 1)
        .fromTo('.hero-beat--2', { autoAlpha: 0, y: 40 }, { autoAlpha: 1, y: 0, duration: 1 }, 2)
        .to('.hero-beat--2', { autoAlpha: 0, y: -40, duration: 1 }, 3.5)
        .fromTo('.hero-beat--3', { autoAlpha: 0, y: 40 }, { autoAlpha: 1, y: 0, duration: 1 }, 4.5)
        .to({}, { duration: 1 }, 5.5)

      if (!reduceMotion) {
        gsap.from('.hero__char', {
          yPercent: 110,
          opacity: 0,
          duration: 1.6,
          ease: 'expo.out',
          stagger: 0.06,
          delay: 0.2,
        })
        gsap.from('.hero__lead, .hero__cue', { opacity: 0, y: 16, duration: 1.2, delay: 1, ease: 'power2.out' })
      }
    }, section)

    window.addEventListener('resize', draw)
    return () => {
      gctx.revert()
      window.removeEventListener('resize', draw)
    }
  }, [])

  return (
    <section ref={sectionRef} className="hero" aria-label="Belle Rose">
      <div className="hero__stage">
        <canvas ref={canvasRef} className="hero__canvas" aria-hidden="true" />
        <div className="hero__shade" aria-hidden="true" />

        <div className="hero__beat hero-beat--1">
          <h1 className="hero__title" aria-label={TITLE}>
            {TITLE.split('').map((c, i) => (
              <span className="hero__mask" key={i} aria-hidden="true">
                <span className="hero__char">{c === ' ' ? ' ' : c}</span>
              </span>
            ))}
          </h1>
          <p className="hero__lead">
            Salon de beauté. Coiffure, couleur, ongles et soins du visage, dans le Grand Montréal.
          </p>
        </div>

        <div className="hero__beat hero-beat--2">
          <p className="hero__statement">
            Chaque geste
            <br />
            fait éclore
            <br />
            votre beauté.
          </p>
        </div>

        <div className="hero__beat hero-beat--3">
          <p className="hero__statement">
            Le soin du détail,
            <br />
            de la racine à la pointe.
          </p>
          <a className="btn" href="#reserver">
            Réserver un rendez-vous
          </a>
        </div>

        <p className="hero__cue" aria-hidden="true">
          Défiler
        </p>
      </div>
    </section>
  )
}
