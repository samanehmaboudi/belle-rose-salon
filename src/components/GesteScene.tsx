import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const BG = '#1e2419'
const PORTRAIT_ZOOM = 1.7

type Props = {
  id: string
  /** Dossier dans public/frames */
  folder: string
  frameCount: number
  /** Position horizontale du sujet dans l'image (0 = gauche, 1 = droite) */
  focusX: number
  /** Côté du texte sur desktop */
  textSide: 'left' | 'right'
  title: string
  lead: string
  services: string[]
  cta: string
}

const frameSrc = (folder: string, i: number) =>
  `/frames/${folder}/frame_${String(i + 1).padStart(3, '0')}.webp`

export default function GesteScene({
  id,
  folder,
  frameCount,
  focusX,
  textSide,
  title,
  lead,
  services,
  cta,
}: Props) {
  const sectionRef = useRef<HTMLElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const section = sectionRef.current
    const canvas = canvasRef.current
    if (!section || !canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const images: HTMLImageElement[] = []
    const state = { frame: 0 }
    let loaded = false

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

      const portrait = h > w * 1.1
      const scale = portrait
        ? (w * PORTRAIT_ZOOM) / img.naturalWidth
        : Math.max(w / img.naturalWidth, h / img.naturalHeight)
      const dw = img.naturalWidth * scale
      const dh = img.naturalHeight * scale
      const dx = Math.min(0, Math.max(w - dw, w / 2 - dw * focusX))
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

    // Les frames ne sont chargées que lorsque la scène approche de l'écran
    const load = () => {
      if (loaded) return
      loaded = true
      for (let i = 0; i < frameCount; i++) {
        const img = new Image()
        img.decoding = 'async'
        img.src = frameSrc(folder, i)
        img.onload = () => {
          if (Math.abs(i - state.frame) < 2) draw()
        }
        images.push(img)
      }
    }

    const gctx = gsap.context(() => {
      ScrollTrigger.create({ trigger: section, start: 'top 250%', once: true, onEnter: load })

      const trigger = { trigger: section, start: 'top top', end: 'bottom bottom', scrub: 0.6 }

      gsap.to(state, { frame: frameCount - 1, ease: 'none', scrollTrigger: trigger, onUpdate: draw })

      gsap
        .timeline({ scrollTrigger: trigger })
        .fromTo('.geste__title', { autoAlpha: 0, y: 60 }, { autoAlpha: 1, y: 0, duration: 1 }, 0)
        .fromTo('.geste__lead', { autoAlpha: 0, y: 30 }, { autoAlpha: 1, y: 0, duration: 1 }, 0.3)
        .fromTo(
          '.geste__services li',
          { autoAlpha: 0, x: textSide === 'right' ? 30 : -30 },
          { autoAlpha: 1, x: 0, duration: 0.8, stagger: 0.25 },
          2,
        )
        .fromTo('.geste__cta', { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.6 }, 3)
        .to({}, { duration: 1.5 }, 3.6)
    }, section)

    window.addEventListener('resize', draw)
    return () => {
      gctx.revert()
      window.removeEventListener('resize', draw)
    }
  }, [folder, frameCount, focusX, textSide])

  return (
    <section ref={sectionRef} id={id} className={`geste geste--text-${textSide}`} aria-labelledby={`${id}-title`}>
      <div className="geste__stage">
        <canvas ref={canvasRef} className="geste__canvas" aria-hidden="true" />
        <div className="geste__shade" aria-hidden="true" />
        <div className="geste__content">
          <h2 className="geste__title" id={`${id}-title`}>
            {title}
          </h2>
          <p className="geste__lead">{lead}</p>
          <ul className="geste__services">
            {services.map((s) => (
              <li key={s}>{s}</li>
            ))}
          </ul>
          <a className="geste__cta" href="#reserver">
            {cta}
          </a>
        </div>
      </div>
    </section>
  )
}
