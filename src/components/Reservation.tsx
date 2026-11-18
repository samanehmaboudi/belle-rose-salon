import { useState, type FormEvent } from 'react'

const SERVICES = ['Coupe', 'Couleur', 'Ongles', 'Soins du visage']
const MOMENTS = ['Matin', 'Après-midi', 'Soir']

export default function Reservation() {
  const [sent, setSent] = useState(false)

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setSent(true)
  }

  return (
    <section className="booking" id="reserver" aria-labelledby="booking-title">
      <div className="booking__bg" aria-hidden="true" />

      <div className="booking__inner">
        <div className="booking__intro">
          <h2 className="booking__title" id="booking-title">
            Prendre
            <br />
            rendez-vous
          </h2>
          <p className="booking__lead">
            Dites-nous ce qui vous ferait plaisir. Nous vous proposons un moment qui vous convient.
          </p>

          <dl className="booking__hours">
            <div>
              <dt>Mardi au vendredi</dt>
              <dd>10 h à 20 h</dd>
            </div>
            <div>
              <dt>Samedi</dt>
              <dd>9 h à 17 h</dd>
            </div>
            <div>
              <dt>Dimanche et lundi</dt>
              <dd>Fermé</dd>
            </div>
          </dl>
          <p className="booking__place">Grand Montréal</p>
        </div>

        {sent ? (
          <div className="booking__done" role="status">
            <p className="booking__done-title">Merci, votre demande est prête.</p>
            <p>Ce site est un projet de démonstration : aucune demande n'est réellement envoyée.</p>
            <button type="button" className="booking__again" onClick={() => setSent(false)}>
              Faire une autre demande
            </button>
          </div>
        ) : (
          <form className="booking__form" onSubmit={onSubmit}>
            <label className="field">
              <span>Nom</span>
              <input name="nom" autoComplete="name" required />
            </label>

            <label className="field">
              <span>Téléphone ou courriel</span>
              <input name="contact" autoComplete="email" required />
            </label>

            <div className="field-row">
              <label className="field">
                <span>Service</span>
                <select name="service" defaultValue="" required>
                  <option value="" disabled>
                    Choisir
                  </option>
                  {SERVICES.map((s) => (
                    <option key={s}>{s}</option>
                  ))}
                </select>
              </label>

              <label className="field">
                <span>Moment préféré</span>
                <select name="moment" defaultValue="" required>
                  <option value="" disabled>
                    Choisir
                  </option>
                  {MOMENTS.map((m) => (
                    <option key={m}>{m}</option>
                  ))}
                </select>
              </label>
            </div>

            <label className="field">
              <span>Message (facultatif)</span>
              <textarea name="message" rows={3} />
            </label>

            <button type="submit" className="btn booking__submit">
              Envoyer ma demande
            </button>
          </form>
        )}
      </div>
    </section>
  )
}
