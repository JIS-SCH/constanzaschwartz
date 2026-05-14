'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { cldImg } from '@/src/utils/cloudinary'
import { useParallax } from '@/src/hooks/useParallax'
import { MARQUEE, CAROUSEL } from '@/src/motion/tokens'

const IMG_PORTRAIT = cldImg('CONSTANZASCHWARTZ_Profile_1_yx5v5r')
const IMG_PORTRAIT_2 = cldImg('CONSTANZASCHWARTZ_Profile_2_uipjg1')
const IMG_YEAR_2021 = cldImg('CONSTANZASCHWARTZ_Profile_2021_iqs673')
const IMG_YEAR_2022 = cldImg('CONSTANZASCHWARTZ_Profile_2022_tjgl6h')
const IMG_YEAR_2023 = cldImg('CONSTANZASCHWARTZ_Profile_2023_smey6p')
const IMG_YEAR_2024 = cldImg('CONSTANZASCHWARTZ_Profile_2024_a0epdc')
const IMG_YEAR_2025 = cldImg('CONSTANZASCHWARTZ_Profile_2025_hxpxl5')
const IMG_YEAR_2026 = cldImg('CONSTANZASCHWARTZ_Profile_2026_mqgsln')

const G2021 = [
  cldImg('CONSTANZASCHWARTZ-Profile-Carrousel2021-1_h2l1bp'),
  cldImg('CONSTANZASCHWARTZ-Profile-Carrousel2021-2_oepyav'),
  cldImg('CONSTANZASCHWARTZ-Profile-Carrousel2021-3_qgcnvq'),
  cldImg('CONSTANZASCHWARTZ-Profile-Carrousel2021-4_ppwihw'),
  cldImg('CONSTANZASCHWARTZ-Profile-Carrousel2021-5_mkr1om'),
  cldImg('CONSTANZASCHWARTZ-Profile-Carrousel2021-6_nxjn9t'),
  cldImg('CONSTANZASCHWARTZ-Profile-Carrousel2021-7_whiggv'),
  cldImg('CONSTANZASCHWARTZ-Profile-Carrousel2021-8_puoc9z'),
]
const G2022 = [
  cldImg('CONSTANZASCHWARTZ-Profile-Carrousel2022-1_xoja9b'),
  cldImg('CONSTANZASCHWARTZ-Profile-Carrousel2022-2_wsj1xc'),
  cldImg('CONSTANZASCHWARTZ-Profile-Carrousel2022-3_qxasvk'),
  cldImg('CONSTANZASCHWARTZ-Profile-Carrousel2022-4_ngxwbx'),
  cldImg('CONSTANZASCHWARTZ-Profile-Carrousel2022-5_ig1thi'),
  cldImg('CONSTANZASCHWARTZ-Profile-Carrousel2022-6_bjmgpg'),
]
const G2023 = [
  cldImg('CONSTANZASCHWARTZ-Profile-Carrousel2023-1_e2vkwq'),
  cldImg('CONSTANZASCHWARTZ-Profile-Carrousel2023-2_fy4n5r'),
  cldImg('CONSTANZASCHWARTZ-Profile-Carrousel2023-3_f3exdc'),
  cldImg('CONSTANZASCHWARTZ-Profile-Carrousel2023-4_yls0pm'),
  cldImg('CONSTANZASCHWARTZ-Profile-Carrousel2023-5_nuu4hy'),
  cldImg('CONSTANZASCHWARTZ-Profile-Carrousel2023-6_bmnmcj'),
  cldImg('CONSTANZASCHWARTZ-Profile-Carrousel2023-7_wjs7jo'),
]
const G2024 = [
  cldImg('CONSTANZASCHWARTZ-Profile-Carrousel2024-1_fdcyyk'),
  cldImg('CONSTANZASCHWARTZ-Profile-Carrousel2024-2_v2axae'),
  cldImg('CONSTANZASCHWARTZ-Profile-Carrousel2024-3_n7a34l'),
  cldImg('CONSTANZASCHWARTZ-Profile-Carrousel2024-4_ylrpdo'),
  cldImg('CONSTANZASCHWARTZ-Profile-Carrousel2024-5_qgc3xq'),
  cldImg('CONSTANZASCHWARTZ-Profile-Carrousel2024-6_tn5ceu'),
  cldImg('CONSTANZASCHWARTZ-Profile-Carrousel2024-7_omr7oc'),
  cldImg('CONSTANZASCHWARTZ-Profile-Carrousel2024-8_dgwinm'),
]
const G2025 = [
  cldImg('CONSTANZASCHWARTZ-Profile-Carrousel2025-1_hzpfei'),
  cldImg('CONSTANZASCHWARTZ-Profile-Carrousel2025-2_ihcd5j'),
  cldImg('CONSTANZASCHWARTZ-Profile-Carrousel2025-3_mqmopi'),
  cldImg('CONSTANZASCHWARTZ-Profile-Carrousel2025-4_o7q8pw'),
  cldImg('CONSTANZASCHWARTZ-Profile-Carrousel2025-5_yqhv7l'),
  cldImg('CONSTANZASCHWARTZ-Profile-Carrousel2025-6_qyemv3'),
  cldImg('CONSTANZASCHWARTZ-Profile-Carrousel2025-7_fpcl9r'),
  cldImg('CONSTANZASCHWARTZ-Profile-Carrousel2025-8_sq00ao'),
  cldImg('CONSTANZASCHWARTZ-Profile-Carrousel2025-9_gpi00l'),
  cldImg('CONSTANZASCHWARTZ-Profile-Carrousel2025-10_zi9esk'),
]
const G2026 = [
  cldImg('CONSTANZASCHWARTZ-Profile-Carrousel2026-1_dizgyq'),
  cldImg('CONSTANZASCHWARTZ-Profile-Carrousel2026-2_l8d11z'),
  cldImg('CONSTANZASCHWARTZ-Profile-Carrousel2026-3_oyz8vd'),
  cldImg('CONSTANZASCHWARTZ-Profile-Carrousel2026-4_pdtaqb'),
  cldImg('CONSTANZASCHWARTZ-Profile-Carrousel2026-5_uaxj0s'),
  cldImg('CONSTANZASCHWARTZ-Profile-Carrousel2026-6_ihh0da'),
]

// ---------------------------------------------------------------------------
// Data
// ---------------------------------------------------------------------------
interface YearData {
  year: string
  yearImg: string
  gallery: string[]
  events: string[]
}

const YEARS: YearData[] = [
  {
    year: '2021', yearImg: IMG_YEAR_2021, gallery: G2021,
    events: [
      'Recital Silvestre Y La Naranja con El Shy, Clara Cava, Zenón Pereyra, Panchito Villa (Konex)',
      'Instalación Inmersiva para Crew Savage (Hipódromo De Palermo)',
      'Instalación Inmersiva para Recital Silvestre Y La Naranja Con Emanuel Horvilleur (Hipódromo De Palermo)',
      'Festival Wakal (Complejo Artmedia)',
    ],
  },
  {
    year: '2022', yearImg: IMG_YEAR_2022, gallery: G2022,
    events: [
      'Instalación Inmersiva "Proyecto Encúpula" (Edificio Bencich)',
      'Recital Silvestre Y La Naranja con Clara Cava, Mia Zeta (Teatro Vorterix)',
      'Instalación Óptica Polisensorial "Laberintos Internos" (Cúpula Edificio Bencich)',
    ],
  },
  {
    year: '2023', yearImg: IMG_YEAR_2023, gallery: G2023,
    events: [
      'Dirección Artística Fiesta "Bonaire"',
      'Taller con Diego Bianchi (CCK)',
      'Performer como Doble Marta Minujín "Casamiento Con La Eternidad" (Malba)',
      'Dirección De Arte en Largometraje "Descansar En Paz" (Sebastián Borensztein)',
      'Clínica de Obra y Taller de Escultura con Luis María Terán',
    ],
  },
  {
    year: '2024', yearImg: IMG_YEAR_2024, gallery: G2024,
    events: [
      'Muestra Individual "Más Allá Del Infinito" (Ungallery)',
      'Muestra Fotográfica Internacional "Pinta Baphoto"',
      'Recital Silvestre y La Naranja, Fabiana Cantillo y Zoe Gotuso (Estadio Obras)',
      'Instalación Interactiva Polisensorial (Comité357)',
    ],
  },
  {
    year: '2025', yearImg: IMG_YEAR_2025, gallery: G2025,
    events: [
      'Taller de Desarrollo de Proyectos Curatoriales con Victoria Noorthoorn',
      'Artista Seleccionada "Design Week Mexico"',
      'Festival Internacional Mutek por Artlab (Comité357)',
      'Videoclip & Visualizers Silvestre y La Naranja "Alterego"',
      'Performer como doble Marta Minujín "Torre De Pisa De Spaghettis" (Centro Cultural Recoleta)',
    ],
  },
  {
    year: '2026', yearImg: IMG_YEAR_2026, gallery: G2026,
    events: [
      'Instalación Site-Specific "Eco Al Infinito" (Lumina San Isidro / Estudio Mario Roberto Álvarez)',
      'Muestra Colectiva "10 Años Ungallery" (Ungallery)',
    ],
  },
]

// ---------------------------------------------------------------------------
// Marquee
// ---------------------------------------------------------------------------
function Marquee() {
  const trackRef = useRef<HTMLDivElement>(null)
  const text = 'Es posible que la objetividad sea un proyecto inalcanzable de la modernidad.'

  useEffect(() => {
    if (!trackRef.current) return
    const duration = text.length * MARQUEE.secondsPerChar
    const tl = gsap.to(trackRef.current, { xPercent: -50, ease: 'none', duration, repeat: -1 })
    return () => { tl.kill() }
  }, [])

  return (
    <div className="overflow-hidden w-full">
      <div ref={trackRef} className="flex whitespace-nowrap w-max">
        {[0, 1].map((i) => (
          <div key={i} className="flex">
            {Array.from({ length: 4 }, (_, j) => (
              <span key={j} className="pr-marquee-text mr-[5em]">
                {text}
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}

function Carousel({ images }: { images: string[]; id: string }) {
  const doubled = [...images, ...images]
  const duration = images.length * CAROUSEL.durationPerImage

  return (
    <div className="w-full h-[331px] overflow-hidden">
      <div
        className="flex h-[331px] w-max"
        style={{ WebkitAnimation: `carousel-scroll ${duration}s linear infinite`, animation: `carousel-scroll ${duration}s linear infinite`, gap: 0 }}
      >
        {doubled.map((src, i) => (
          <img
            key={i}
            src={src}
            alt=""
            className="h-[331px] w-auto flex-shrink-0 block"
            style={{ marginRight: '-1px' }}
          />
        ))}
      </div>
    </div>
  )
}

// ---------------------------------------------------------------------------
// EventList
// ---------------------------------------------------------------------------
function EventList({ events }: { events: string[] }) {
  return (
    <div>
      {events.map((event, i) => (
        <div key={i}>
          <p className="pr-list">{event}</p>
          {i < events.length - 1 && (
            <div className="pr-list-divider" />
          )}
        </div>
      ))}
    </div>
  )
}

// ---------------------------------------------------------------------------
// YearSection — year image behind gallery (overlap via negative margin)
// ---------------------------------------------------------------------------
function YearSection({ data }: { data: YearData }) {
  return (
    <div className="pr-year-section">
      {/* Year typographic image */}
      <div className="pr-year-img">
        <img src={data.yearImg} alt={data.year}
          className="w-full h-full object-cover block" />
      </div>

      {/* Carousel overlaps bottom of year image */}
      <div className="pr-year-carousel">
        <Carousel images={data.gallery} id={data.year} />
      </div>

      {/* Events list */}
      <div className="pr-year-events">
        <EventList events={data.events} />
      </div>
    </div>
  )
}
export function ProfilePage() {
  const portrait1Ref = useRef<HTMLImageElement>(null)
  const portrait2Ref = useRef<HTMLImageElement>(null)

  useParallax(portrait1Ref, { speed: 0.8, withZoom: true })
  useParallax(portrait2Ref, { speed: 0.8, withZoom: true })

  return (
    <div className="pr-root project-page-padding">
      <style dangerouslySetInnerHTML={{ __html: CSS }} />

      {/*
       * INTRO AREA
       * Mobile:  normal flow, stacked vertically
       * Desktop: position:relative + fixed height; all children position:absolute
       *          matching Figma 1440px coordinates
       */}
      <div className="pr-intro">

        {/* Portrait */}
        <div className="pr-portrait">
          <img 
            ref={portrait1Ref}
            src={IMG_PORTRAIT} 
            alt="Constanza Schwartz"
            className="w-full h-full object-cover" 
          />
        </div>

        {/* CONSTANZA / SCHWARTZ — overlays portrait */}
        <div className="pr-title">
          <h1 className="pr-h2 pr-h2--diff">CONSTANZA</h1>
          <h1 className="pr-h2 pr-h2--diff">SCHWARTZ</h1>
        </div>

        {/* STATEMENT */}
        <div className="pr-statement">
          <p className="pr-p pr-p--label">STATEMENT</p>
          <p className="pr-p">
            Como humanista, celebro el poder de las palabras y también me permito extenderme a las
            imágenes, los aromas, las texturas, los sonidos y la iluminación de lo que voy creando.
            Me conmueve la idea medieval de museo que podía llamarse simultáneamente estudio, teatro,
            microcosmos, archivo, biblioteca, casino, gabinete, galería y por sobre todo, un lugar para
            llenar. Cornucopia que media entre un espacio privado y un espacio público.
          </p>
          <p className="pr-p">
            Bondini dice: &ldquo;los lugares en que se venera a las musas deben ser llamados
            museos.&rdquo; Estos son además un espacio que hace de nexo entre las distintas
            disciplinas. Imagino poseer una lupa polisensorial que resalta la singularidad de cada
            percepción y cada artista. Creo que la descripción de mi obra se encuadra adecuadamente
            dentro de la denominación &ldquo;subjetivismo escénico&rdquo;. Busco el máximo contacto
            posible con las emociones evocadas en el espectador participativo.
          </p>
        </div>

        {/* Marquee */}
        <div className="pr-marquee-wrap">
          <Marquee />
        </div>

        {/* Quote */}
        <div className="pr-quote">
          <p className="pr-p">
            Es posible que la objetividad sea un proyecto inalcanzable de la modernidad. Somos
            responsables de los mundos que creamos pero solo en la medida en que admitimos que nuestra
            contribución y nuestra influencia va a estar guiada por la subjetividad. Es necesario para
            cada uno de nosotros, expandir el territorio de su subjetividad para dar sentido a las
            cosas más trascendentales de este mundo.
          </p>
        </div>

        {/* Second portrait */}
        <div className="pr-photo2">
          <img 
            ref={portrait2Ref}
            src={IMG_PORTRAIT_2} 
            alt=""
            className="w-full h-full object-cover" 
          />
        </div>

        {/* Text 2 */}
        <div className="pr-text2">
          <p className="pr-p">
            Yo no soy el traje que llevo puesto, soy lo que cada uno experimenta en las puestas en
            escena que voy realizando. ¿Son puestas? ¿Son escenas? ¿Son escenografías? ¿Son
            instalaciones? ¿Son esculturas? ¿Son obras de teatro? ¿Son homenajes al cine? ¿Son guiños
            a la arquitectura? ¿Son…? ¿Qué son?
          </p>
          <p className="pr-p">
            Los animales habitan medio ambientes. Las personas creamos y construimos mundos. No acepto
            las fronteras rígidas entre las distintas formas y ramas del arte. Mis creaciones son
            inclusivas y trabajan con herramientas de los más diversos lenguajes artísticos. Mi
            objetivo es crear una experiencia distinta dentro de la vida cotidiana y conmover las
            bases mismas en que cada uno concibe su interacción con otros y el planeta.
          </p>
        </div>

        {/* BIO rotated label */}
        <div className="pr-bio-label" aria-hidden="true">
          <span className="pr-bio-word">BIO</span>
        </div>

        {/* BIO text */}
        <div className="pr-bio-text">
          <p className="pr-p">
            <span className="uppercase">Constanza Schwartz</span>
            {' '}(Buenos Aires, 1999).
          </p>
          <p className="pr-p">
            Licenciada en Diseño de Espectáculos en Escenografía y Dirección Cinematográfica en
            Dirección de Arte (Universidad de Palermo) recibiendo premiación por Suma y Magna Cum
            Laude en ambas carreras.
          </p>
          <p className="pr-p">
            Su producción trabaja en un espacio intermedio que incluye, pero también desafía la
            &ldquo;realidad&rdquo; de las percepciones ordinarias. Es una artista que busca crear
            obras de arte experienciales e interactivas. Desarrolla un lenguaje visual que atraviesa
            corporalmente los cruces entre la instalación, la arquitectura, la escultura, el dibujo,
            el video, el diseño lumínico, el diseño sonoro y los aromas. Su foco es generar
            espectáculos totales en los cuales el espectador pueda vivir una experiencia singular
            y única.
          </p>
          <p className="pr-p">
            Participó en diversas clínicas y talleres entre los que se cuentan: Taller de Desarrollo
            de Proyectos Curatoriales con Victoria Noorthoorn, Espacio Munar con la de clínica de
            obra y taller de escultura Luis María Terán, taller con Diego Bianchi en el CCK,
            intercambios con Max Gomez Canle, taller de fotografía Lupe Jelena, entre otros.
          </p>
        </div>

      </div>{/* /pr-intro */}

      {/* YEARS */}
      {YEARS.map((y) => <YearSection key={y.year} data={y} />)}
    </div>
  )
}

// ---------------------------------------------------------------------------
// CSS
// ---------------------------------------------------------------------------
const CSS = `
/* ═══ ROOT ═══════════════════════════════════════════════════════════════ */
.pr-root {
  width: 100%;
  min-height: 100vh;
  background: #000;
  color: #fff;
  overflow-x: hidden;
}

/* ═══ TYPOGRAPHY ═════════════════════════════════════════════════════════ */
.pr-h2 {
  font-family: "Helvetica Neue LT Std", "Helvetica Neue", Helvetica, Arial, sans-serif;
  font-weight: 100;
  text-transform: uppercase;
  color: #fff;
  line-height: var(--h2-lh);
  letter-spacing: var(--h2-ls);
  margin: 0;
  font-size: var(--h2-size);
  overflow: visible;
}
.pr-h2--diff {
  /* blend mode moved to parent container */
}

.pr-bio-word {
  font-family: "Helvetica Neue LT Std", "Helvetica Neue", Helvetica, Arial, sans-serif;
  font-weight: 100;
  text-transform: uppercase;
  color: #fff;
  line-height: var(--h1-lh);
  letter-spacing: var(--h1-ls);
  font-size: var(--h1-size);
  display: block;
  white-space: nowrap;
}

.pr-marquee-text {
  font-family: "Helvetica Neue LT Std", "Helvetica Neue", Helvetica, Arial, sans-serif;
  font-weight: 100;
  font-size: var(--h4-size);
  text-transform: uppercase;
  letter-spacing: var(--h4-ls);
  color: #fff;
  display: inline-block;
}

.pr-p {
  font-family: "Space Grotesk", sans-serif;
  font-weight: 300;
  font-size: var(--p-size);
  line-height: var(--p-lh);
  letter-spacing: var(--p-ls);
  color: #fff;
  margin: 0 0 1em;
}
.pr-p--label { text-transform: uppercase; margin-bottom: 1.5em; }

.pr-list {
  font-family: "Helvetica Neue LT Std", "Helvetica Neue", Helvetica, Arial, sans-serif;
  font-weight: 300;
  font-size: 15px;
  line-height: 114.99999999999999%;
  letter-spacing: 0;
  color: #fff;
  padding: 20px;
  margin: 0;
  vertical-align: middle;
}

@media (min-width: 1024px) {
  .pr-list {
    font-weight: 100;
    font-size: 26px;
    line-height: 121%;
    padding: 30px 0 30px calc(8.33% + 2px);
  }
}

.pr-list-divider {
  border-top: 1px solid rgba(255, 255, 255, 0.3);
  width: 100%;
}

/* ═══ MOBILE INTRO — normal flow ════════════════════════════════════════ */
.pr-intro {
  padding-top: 96px; /* clear fixed navbar */
  position: relative;
}

.pr-portrait {
  width: calc(100% - 40px);
  height: 509px;
  margin: 48px 20px 0;
  overflow: hidden;
}

/* Title overlays portrait */
.pr-title {
  position: absolute;
  top: 84px; /* 48px margin-top del portrait + 36px de distancia */
  left: 21px;
  z-index: 10;
  pointer-events: none;
  mix-blend-mode: difference;
  -webkit-mix-blend-mode: difference;
  transform: translateZ(0);
}


.pr-statement  { padding: 32px 20px; }
.pr-marquee-wrap { padding: 6px 0; }
.pr-quote      { padding: 24px 20px; }
.pr-photo2     { width: 100%; height: 399px; overflow: hidden; }
.pr-text2      { padding: 32px 20px; }

/* BIO — mobile */
.pr-bio-label {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  padding: 24px 0 0 20px;
  overflow: hidden;
}
.pr-bio-text   { padding: 8px 20px 40px; }

/* ═══ YEAR SECTIONS — both viewports ════════════════════════════════════ */
.pr-year-section {
  position: relative;
  margin-bottom: 150px;
}

/*
 * Mobile overlap:
 *   year image h=146px, mb=-35px → carousel overlaps it by 35px from bottom
 *   carousel z-index above year image
 */
.pr-year-img {
  width: 100%;
  height: 146px;
  overflow: visible;
  position: relative;
  z-index: 0;
  margin-bottom: -35px;
  padding-top: 20px;
}
.pr-year-img img {
  object-position: top;
}

.pr-year-carousel {
  position: relative;
  z-index: 1;
  margin-bottom: 40px;
}

.pr-year-events {
  position: relative;
  z-index: 2;
  padding: 0;
  background: transparent;
}

/* ═══ DESKTOP ════════════════════════════════════════════════════════════ */
@media (min-width: 1024px) {

  /*
   * ── Intro area — absolute positioning matching Figma 1440px canvas ──
   *
   * All top values = Figma_top - 96px (fixed navbar height)
   * Figma values measured from page top (with navbar fixed at top: 26px).
   *
   * Key coordinates (from Figma dev mode):
   *   Portrait:  left=61px,  top=297px → adjusted top=201px, w=588px, h=869px
   *   CONSTANZA: left=163px, top=159px → adjusted top=63px
   *   SCHWARTZ:  left=163px, top=287px → adjusted top=191px
   *   Statement: left=730px, top=553px → adjusted top=457px, w=467px
   *   Marquee:   top=1060px            → adjusted top=964px
   *   Quote:     left=730px, top=1130px→ adjusted top=1034px, w=467px
   *   Photo2:    left=660px, top=1460px→ adjusted top=1364px, w=710px, h=400px
   *   Text2:     left=61px,  top=1481px→ adjusted top=1385px, w=467px
   *   BIO label: center=243px,top=2121px→ adjusted top=2025px
   *   BIO text:  left=731px, top=2080px→ adjusted top=1984px, w=467px
   *
   * Container height:  bio_text_top + bio_text_height + gap_to_years
   *   = 1984 + ~430 + ~353 = ~2767px
   */
  .pr-intro {
    padding-top: 0;
    position: relative;
    height: 2800px;
    overflow: visible;
  }

  .pr-portrait {
    position: absolute;
    left: 61px;
    top: 201px;
    width: 588px;
    height: 869px;
    margin: 0;
  }

  .pr-title {
    position: absolute;
    left: 163px;
    top: 159px;
    z-index: 10;
    pointer-events: none;
    mix-blend-mode: difference;
  }

  .pr-statement {
    position: absolute;
    left: 730px;
    top: 457px;
    width: 467px;
    padding: 0;
  }

  .pr-marquee-wrap {
    position: absolute;
    left: 0;
    top: 964px;
    width: 100%;
    padding: 0;
  }

  .pr-quote {
    position: absolute;
    left: 730px;
    top: 1034px;
    width: 467px;
    padding: 0;
  }

  .pr-photo2 {
    position: absolute;
    left: 660px;
    top: 1364px;
    width: 710px;
    height: 400px;
  }

  .pr-text2 {
    position: absolute;
    left: 61px;
    top: 1385px;
    width: 467px;
    padding: 0;
  }

  /*
   * BIO label: Figma uses translateX(-50%) centered at x=243px.
   * 243 - 200/2 = 143px left edge. Height=432px (rotated 280px text).
   */
  .pr-bio-label {
    position: absolute;
    left: 241px;
    top: 2025px;
    width: 250px;
    height: 484px;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0;
    overflow: visible;
  }
  .pr-bio-word { transform: rotate(-90deg); font-size: 250px; line-height: 1; }

  .pr-bio-text {
    position: absolute;
    left: 731px;
    top: 1984px;
    width: 467px;
    padding: 0;
  }

  /* ── Year sections desktop ── */
  .pr-year-section {
    margin-bottom: 280px;
  }
  .pr-year-img {
    height: 528px;
    margin-bottom: -115px;
    padding-top: 40px;
    overflow: visible;
  }
  .pr-year-img img {
    object-position: top;
  }

  .pr-year-carousel {
    margin-bottom: 0;
  }

  .pr-year-events {
    padding-top: 40px;
  }
}`
