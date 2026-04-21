'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'

// ---------------------------------------------------------------------------
// Figma asset URLs — valid 7 days. Replace with Cloudinary / /public paths.
// ---------------------------------------------------------------------------
const IMG_PORTRAIT   = 'https://www.figma.com/api/mcp/asset/4eafe89c-7a5b-40cb-905e-5e04bdd2b3a4'
const IMG_PORTRAIT_2 = 'https://www.figma.com/api/mcp/asset/3a9aa890-6c80-4b16-95c8-60db820d3701'
const IMG_YEAR_2021  = 'https://www.figma.com/api/mcp/asset/b1bfe3e9-0be0-44e7-bd84-43972dd5411c'
const IMG_YEAR_2022  = 'https://www.figma.com/api/mcp/asset/eeab0f23-3268-44e1-9ff2-f3c387a384f5'
const IMG_YEAR_2023  = 'https://www.figma.com/api/mcp/asset/11fc8a0e-7ea5-4201-8430-a166f57ed950'
const IMG_YEAR_2024  = 'https://www.figma.com/api/mcp/asset/e1dbd8fc-eb6c-488d-99db-d886116c97bb'
const IMG_YEAR_2025  = 'https://www.figma.com/api/mcp/asset/4c0f2ea4-4c42-4202-aaa5-5ae75e33bc0d'
const IMG_YEAR_2026  = 'https://www.figma.com/api/mcp/asset/36dd7d3d-a454-4cba-9b0c-2382686bba1e'

const G2021 = [
  'https://www.figma.com/api/mcp/asset/cafda851-c4db-48a0-a766-c063217e3753',
  'https://www.figma.com/api/mcp/asset/2c2ebd72-ceee-43e0-aea4-8716c5763593',
  'https://www.figma.com/api/mcp/asset/b7ce8b64-361d-4d48-87c7-25122006761f',
  'https://www.figma.com/api/mcp/asset/9460f1de-95e6-4483-a1a6-eb785d347340',
  'https://www.figma.com/api/mcp/asset/8436d8a6-f5a8-4068-b780-da98a1d69d8e',
  'https://www.figma.com/api/mcp/asset/16dfa231-3720-4ed7-9f24-ddb919a73654',
  'https://www.figma.com/api/mcp/asset/eed3f105-a577-4974-a35b-0095c69abe12',
  'https://www.figma.com/api/mcp/asset/7fe3625c-a3b3-4646-a911-16a27374111f',
]
const G2022 = [
  'https://www.figma.com/api/mcp/asset/55960c01-76ce-4873-8bc3-f15095ac316f',
  'https://www.figma.com/api/mcp/asset/24b72493-0afc-4fae-8432-97e531ee4dae',
  'https://www.figma.com/api/mcp/asset/410e016a-ea68-433b-9e61-7c1d6c00a134',
  'https://www.figma.com/api/mcp/asset/9b8cf08f-684c-48f4-bcb1-46d7c828c2ab',
]
const G2023 = [
  'https://www.figma.com/api/mcp/asset/370cfe71-f164-4ce8-ae04-68351cc3ee0d',
  'https://www.figma.com/api/mcp/asset/e7a7f349-49cd-4526-863a-0f57059ef9e4',
  'https://www.figma.com/api/mcp/asset/61e339b9-297e-44ba-b282-806476fda737',
  'https://www.figma.com/api/mcp/asset/91b1ec3e-3b2f-4e9b-ac83-aba296d8c2fe',
  'https://www.figma.com/api/mcp/asset/3a2a2aef-6fac-47fe-9337-146ca9c72f73',
  'https://www.figma.com/api/mcp/asset/24d2ce22-90d8-467a-beaa-a3a4bf34ac13',
  'https://www.figma.com/api/mcp/asset/0c490c49-d695-41aa-bd80-fb7100eb93e3',
]
const G2024 = [
  'https://www.figma.com/api/mcp/asset/07bf478a-97bf-4337-b05f-6f9871ab880e',
  'https://www.figma.com/api/mcp/asset/0a96d2e1-50a0-460b-a218-e3872a906411',
  'https://www.figma.com/api/mcp/asset/827ba9b4-ec68-426b-9f2f-7c8f53bee110',
  'https://www.figma.com/api/mcp/asset/d31be1cd-3e67-4e4e-b30f-069cd1dd6fc5',
  'https://www.figma.com/api/mcp/asset/5aba3d35-5a40-4388-94c8-c6fde0c82466',
  'https://www.figma.com/api/mcp/asset/28a02b90-e846-4a18-92d0-aaf88031625a',
  'https://www.figma.com/api/mcp/asset/22bd843e-4c7d-4e54-badd-2e3c7f70bf30',
]
const G2025 = [
  'https://www.figma.com/api/mcp/asset/de1a2242-fb8b-4ca6-bf60-fb1ceb87230f',
  'https://www.figma.com/api/mcp/asset/41ca14f9-fea3-41a3-8c33-e824f8dbf23b',
  'https://www.figma.com/api/mcp/asset/415eaf57-1567-4f71-aef0-a81fafbbff07',
  'https://www.figma.com/api/mcp/asset/de1a2242-fb8b-4ca6-bf60-fb1ceb87230f',
  'https://www.figma.com/api/mcp/asset/41ca14f9-fea3-41a3-8c33-e824f8dbf23b',
]
const G2026 = [
  'https://www.figma.com/api/mcp/asset/f080bb0f-2630-4e62-bd10-dec867131ced',
  'https://www.figma.com/api/mcp/asset/30a463d6-b144-47eb-863b-0f0f9d659f3d',
  'https://www.figma.com/api/mcp/asset/58e09741-deed-4de5-98d8-435fb550a4c3',
  'https://www.figma.com/api/mcp/asset/548366ce-63da-4aaf-9f97-8d04ada3eb3a',
  'https://www.figma.com/api/mcp/asset/a892f474-1ce4-43ad-b01b-7b52d37c255b',
  'https://www.figma.com/api/mcp/asset/7fc85b27-36c4-422f-907b-3d0799bd1448',
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
  useEffect(() => {
    const track = trackRef.current
    if (!track) return
    const tl = gsap.to(track, { xPercent: -50, ease: 'none', duration: 28, repeat: -1 })
    return () => { tl.kill() }
  }, [])

  const text = 'Es posible que la objetividad sea un proyecto inalcanzable de la modernidad.'

  return (
    <div style={{ overflow: 'hidden', width: '100%' }}>
      <div ref={trackRef} style={{ display: 'flex', whiteSpace: 'nowrap', width: 'max-content' }}>
        {[0, 1].map((i) => (
          <span key={i} className="pr-marquee-text" style={{ marginRight: '5em' }}>
            {text}
          </span>
        ))}
      </div>
    </div>
  )
}

// ---------------------------------------------------------------------------
// Carousel — same pattern as eco-al-infinito / ProjectPage
// ---------------------------------------------------------------------------
function Carousel({ images, id }: { images: string[]; id: string }) {
  const doubled = [...images, ...images]
  const totalWidth = images.length * 588
  const duration = images.length * 3.5

  return (
    <div style={{ width: '100%', height: '331px', overflow: 'hidden' }}>
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes pr-carousel-${id} {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-${totalWidth}px); }
        }
      `}} />
      <div style={{
        display: 'flex',
        height: '331px',
        width: 'max-content',
        animation: `pr-carousel-${id} ${duration}s linear infinite`,
      }}>
        {doubled.map((src, i) => (
          <div key={i} style={{ width: '588px', height: '331px', flexShrink: 0 }}>
            <img src={src} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
          </div>
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
          <p className="pr-list" style={{ margin: 0, padding: '10px 0' }}>{event}</p>
          {i < events.length - 1 && (
            <div style={{ borderTop: '1px solid rgba(255,255,255,0.3)' }} />
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
          style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
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

// ---------------------------------------------------------------------------
// ProfilePage
// ---------------------------------------------------------------------------
export function ProfilePage() {
  return (
    <div className="pr-root">
      <style dangerouslySetInnerHTML={{ __html: CSS }} />

      {/*
       * INTRO AREA
       * Mobile:  normal flow, stacked vertically
       * Desktop: position:relative + fixed height; all children position:absolute
       *          matching Figma 1440px coordinates (adjusted -96px for fixed navbar)
       */}
      <div className="pr-intro">

        {/* Portrait */}
        <div className="pr-portrait">
          <img src={IMG_PORTRAIT} alt="Constanza Schwartz"
            style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        </div>

        {/* CONSTANZA / SCHWARTZ — overlays portrait */}
        <div className="pr-title">
          <h1 className="pr-h2">CONSTANZA</h1>
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
          <img src={IMG_PORTRAIT_2} alt=""
            style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
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
            <span style={{ textTransform: 'uppercase' }}>Constanza Schwartz</span>
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

      <div style={{ height: '80px' }} />
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
  line-height: 1;
  letter-spacing: 0;
  margin: 0;
  font-size: 57px;
}
.pr-h2--diff { mix-blend-mode: difference; }

.pr-bio-word {
  font-family: "Helvetica Neue LT Std", "Helvetica Neue", Helvetica, Arial, sans-serif;
  font-weight: 100;
  text-transform: uppercase;
  color: #fff;
  line-height: 1;
  font-size: 170px;
  display: block;
  white-space: nowrap;
}

.pr-marquee-text {
  font-family: "Helvetica Neue LT Std", "Helvetica Neue", Helvetica, Arial, sans-serif;
  font-weight: 100;
  font-size: 28px;
  text-transform: uppercase;
  letter-spacing: 0.02em;
  color: #fff;
  display: inline-block;
}

.pr-p {
  font-family: "Space Grotesk", sans-serif;
  font-weight: 300;
  font-size: 15px;
  line-height: 1.45;
  color: #fff;
  margin: 0 0 1em;
}
.pr-p--label { text-transform: uppercase; margin-bottom: 1.5em; }

.pr-list {
  font-family: "Helvetica Neue LT Std", "Helvetica Neue", Helvetica, Arial, sans-serif;
  font-weight: 300;
  font-size: 15px;
  line-height: 1.15;
  color: #fff;
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
  top: calc(96px + 48px);   /* align with portrait top */
  left: 21px;
  z-index: 2;
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
}

/*
 * Mobile overlap:
 *   year image h=146px, mb=-35px → carousel overlaps it by 35px from bottom
 *   carousel z-index above year image
 */
.pr-year-img {
  width: 100%;
  height: 146px;
  overflow: hidden;
  position: relative;
  z-index: 0;
  margin-bottom: -35px; /* carousel slides over bottom of year image */
}

.pr-year-carousel {
  position: relative;
  z-index: 1;
  margin-bottom: -35px; /* events slide over bottom of carousel strip */
}

.pr-year-events {
  position: relative;
  z-index: 2;
  padding: 40px 20px 32px;
  background: #000; /* opaque so it covers carousel bleed */
}

/* ═══ DESKTOP ════════════════════════════════════════════════════════════ */
@media (min-width: 1024px) {

  /* ── Typography ── */
  .pr-h2        { font-size: 128px; }
  .pr-bio-word  { font-size: 280px; }
  .pr-p         { font-size: 16px; line-height: 1.5; }
  .pr-list      { font-size: 26px; line-height: 1.21; }
  .pr-marquee-text { font-size: 36px; }

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
    top: 63px;
    z-index: 2;
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
    left: 143px;
    top: 2025px;
    width: 200px;
    height: 432px;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0;
    overflow: visible;
  }
  .pr-bio-word { transform: rotate(-90deg); }

  .pr-bio-text {
    position: absolute;
    left: 731px;
    top: 1984px;
    width: 467px;
    padding: 0;
  }

  /* ── Year sections desktop ── */
  /*
   * Desktop overlap (from Figma):
   *   year img h=528px; gallery starts 413px into it → gallery overlaps last 115px
   *   events follow gallery in normal flow
   */
  .pr-year-img {
    height: 528px;
    margin-bottom: -115px; /* gallery overlaps bottom 115px of year image */
  }

  .pr-year-carousel {
    margin-bottom: 0;
  }

  .pr-year-events {
    padding: 40px calc(8.33% + 2px);
  }

  .pr-list { font-size: 26px; }
}`
