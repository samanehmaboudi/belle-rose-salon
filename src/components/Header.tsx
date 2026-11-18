import { useEffect, useState } from 'react'

const LINKS = [
  { href: '#coiffure', label: 'Coupe' },
  { href: '#couleur', label: 'Couleur' },
  { href: '#ongles', label: 'Ongles' },
]

export default function Header() {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false)
    }
    document.addEventListener('keydown', onKey)
    document.documentElement.classList.add('menu-open')
    return () => {
      document.removeEventListener('keydown', onKey)
      document.documentElement.classList.remove('menu-open')
    }
  }, [open])

  const close = () => setOpen(false)

  return (
    <header className={`site-header${open ? ' is-open' : ''}`}>
      <a className="site-header__logo" href="#top" onClick={close}>
        Belle Rose
      </a>

      <nav id="site-nav" className="site-nav" aria-label="Navigation principale">
        <ul>
          {LINKS.map((l) => (
            <li key={l.href}>
              <a href={l.href} onClick={close}>
                {l.label}
              </a>
            </li>
          ))}
        </ul>
        <a className="btn btn--small site-nav__cta" href="#reserver" onClick={close}>
          Réserver
        </a>
      </nav>

      <button
        type="button"
        className="menu-toggle"
        aria-expanded={open}
        aria-controls="site-nav"
        onClick={() => setOpen((o) => !o)}
      >
        <span className="menu-toggle__bars" aria-hidden="true" />
        <span className="visually-hidden">{open ? 'Fermer le menu' : 'Ouvrir le menu'}</span>
      </button>
    </header>
  )
}
