'use client'

import { ParallaxSection } from '@/src/components/parallax/ParallaxSection'
import { ParallaxLayer } from '@/src/components/parallax/ParallaxLayer'
import { CustomVimeoPlayer } from '@/src/components/media/CustomVimeoPlayer'
import { TW, CH } from '../shared'
import { ASSETS } from './assets'

const IMG_HERO = ASSETS.hero
// img1–img24: Cloudinary sequentially ordered by scroll position
const IMG_WEB028 = ASSETS.img1   // 467×700
const IMG_WEB009 = ASSETS.img2   // 710×473
const IMG_FULL_1 = ASSETS.img3   // 1440×960  3:2
const IMG_WEB008 = ASSETS.img4   // 345×517
const IMG_WEB025 = ASSETS.img5   // 954×636   3:2
const IMG_GIF1 = ASSETS.img6   // 467×311
const IMG_WEB012 = ASSETS.img7   // 345×517
const IMG_WEB011 = ASSETS.img8   // 345×517
const IMG_WEB007 = ASSETS.img9   // 345×518
const IMG_WEB005 = ASSETS.img10  // 467×700
const IMG_WEB022 = ASSETS.img11  // 467×701
const IMG_GIF2 = ASSETS.img12  // 954×636
const IMG_WEB016 = ASSETS.img13  // 345×517
const IMG_WEB017 = ASSETS.img14  // 294×441
const IMG_WEB018 = ASSETS.img15  // 294×441
const IMG_FULL_2 = ASSETS.img16  // 1440×960  3:2
const IMG_WEB014 = ASSETS.img17  // 345×517
const IMG_WEB013 = ASSETS.img18  // 467×311
const IMG_WEB015 = ASSETS.img19  // 588×392
const IMG_WEB040 = ASSETS.img20  // 480×719   leftmost column
const IMG_WEB037 = ASSETS.img21  // 480×719   center column
const IMG_WEB039 = ASSETS.img22  // 480×719   right column
const IMG_WEB050 = ASSETS.img23  // 467×700
const IMG_WEB054 = ASSETS.img24  // 467×311
// pending Cloudinary upload — using fresh Figma URLs (7-day TTL)
const IMG_WEB047 = 'https://www.figma.com/api/mcp/asset/a582ab2b-d381-4ff9-9a45-56136a00222b'
const IMG_WEB048 = 'https://www.figma.com/api/mcp/asset/dc0076ab-5d33-40fe-a236-3aff32fb06cc'
const IMG_WEB055 = 'https://www.figma.com/api/mcp/asset/93dabdaf-ee66-43c5-8817-838bcd1db5e9'
const IMG_FULL_3 = 'https://www.figma.com/api/mcp/asset/d1ce6b09-dbdb-475d-8a50-42f92427f523'

const CAROUSEL_1 = [
  ASSETS.carousel1, ASSETS.carousel2, ASSETS.carousel3, ASSETS.carousel4, ASSETS.carousel5,
  ASSETS.carousel6, ASSETS.carousel7, ASSETS.carousel8, ASSETS.carousel9, ASSETS.carousel10,
]

const CAROUSEL_2 = [
  ASSETS.carousel11, ASSETS.carousel12, ASSETS.carousel13, ASSETS.carousel14,
  ASSETS.carousel15, ASSETS.carousel16, ASSETS.carousel17, ASSETS.carousel18,
  ASSETS.carousel19, ASSETS.carousel20, ASSETS.carousel21, ASSETS.carousel22,
  ASSETS.carousel23, ASSETS.carousel24, ASSETS.carousel25, ASSETS.carousel26,
]

// ---------------------------------------------------------------------------
// Carousel — CSS keyframe infinite scroll (same pattern across all projects)
// ---------------------------------------------------------------------------
function Carousel({ images, id }: { images: string[]; id: string }) {
  const doubled = [...images, ...images]
  const duration = images.length * 3.5
  return (
    <div className="w-full h-[var(--carousel-h)] overflow-hidden">
      <style dangerouslySetInnerHTML={{
        __html: `
        @keyframes mal-c-${id} {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
      `}} />
      <div className="flex h-[var(--carousel-h)] w-max" style={{ animation: `mal-c-${id} ${duration}s linear infinite` }}>
        {doubled.map((src, i) => (
          <img key={i} src={src} alt="" className="h-[var(--carousel-h)] w-auto block shrink-0" />
        ))}
      </div>
    </div>
  )
}

// ---------------------------------------------------------------------------
// Shared content helpers
// ---------------------------------------------------------------------------
const HFONT = '"Helvetica Neue LT Std", "Helvetica Neue", Helvetica, Arial, sans-serif'

function TextBlock({ children }: { children: React.ReactNode }) {
  return <div className="mal-p" style={{ color: '#fff' }}>{children}</div>
}

function VideoPlaceholder({ label }: { label: string }) {
  return (
    <div style={{
      width: '100%', height: '100%',
      background: 'rgba(249,148,64,0.3)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
    }}>
      <p style={{
        fontFamily: "'Space Grotesk', sans-serif",
        fontWeight: 300, fontSize: '40px', color: '#fff',
        textAlign: 'center', whiteSpace: 'nowrap',
      }}>{label}</p>
    </div>
  )
}

export { meta } from './meta'


export function Component() {
  return (
    <div style={{ width: '100%', position: 'relative', backgroundColor: '#0F0F0F' }} className="mal-container -mt-20">
      <style dangerouslySetInnerHTML={{
        __html: `
        .mal-p {
          font-family: "Space Grotesk", sans-serif;
          font-weight: 200;
          font-size: var(--p-size);
          line-height: var(--p-lh);
          letter-spacing: var(--p-ls);
        }
        .mal-container .marquee-item {
          font-family: ${HFONT} !important;
          font-weight: 100 !important;
          text-transform: uppercase;
        }
        .vimeo-container {
          position: relative;
          width: 100%;
          height: 100%;
          background: #000;
        }
        .vimeo-container iframe {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
        }

        .mal-marquee-blend {
          mix-blend-mode: difference;
          -webkit-mix-blend-mode: difference;
          transform: translateZ(0);
        }

        .mal-h4 {
          font-family: "Helvetica Neue LT Std", ${HFONT};
          font-weight: 100;
          font-size: 36px;
          line-height: normal;
          letter-spacing: 0.72px;
          text-transform: uppercase;
          color: #FFF;
        }
      `}} />

      {/* 1. HERO ─────────────────────────────────────────────────────── */}
      <ParallaxSection id="mal-hero" style={{ minHeight: '728px' }}>
        <ParallaxLayer
          layer={{ type: 'image', src: IMG_HERO, speed: 0.8, isHero: true, objectFit: 'cover', className: 'mal-hero-desktop' }}
          position={{ top: '80px', left: '0', width: '100%', height: '648px', aspectRatio: '20/9', zIndex: 1 }}
        />
        <ParallaxLayer
          layer={{ type: 'image', src: ASSETS.heroMobile, speed: 0.8, isHero: true, objectFit: 'cover', className: 'mal-hero-mobile' }}
          position={{ top: '0', left: '0', width: '100%', height: '100vh', zIndex: 1 }}
        />
        <style dangerouslySetInnerHTML={{
          __html: `
          .mal-hero-mobile { display: none !important; }
          @media (max-width: 1023px) {
            .mal-hero-desktop { display: none !important; }
            .mal-hero-mobile { display: block !important; }
          }
        ` }} />
      </ParallaxSection>

      {/* 2. INTRO: text right + web028 left + marquee-1 ─────────────── */}
      <ParallaxSection id="mal-intro" style={{ minHeight: '1779px' }}>
        {/* Disciplines Marquee — 220px gap from hero */}
        <ParallaxLayer
          layer={{
            type: 'marquee',
            content: 'DIRECCIÓN CREATIVA Y EJECUTIVA   /   ESCENOGRAFÍA   /   DISEÑO LUMÍNICO DE ESPECTÁCULOS   /   DISEÑO SONORO QUINTAFÓNICO   /   DIRECCIÓN DE OBRA',
            speed: 0,
            intensity: 24,
            className: 'mal-marquee-blend mal-h4'
          }}
          position={{ top: '220px', left: '0', width: '100%', height: '44px', zIndex: 4 }}
        />
        {/* Left: tall portrait — 220px gap from marquee (220+44+220 = 484) */}
        <ParallaxLayer
          layer={{ type: 'image', src: IMG_WEB028, speed: 0.3 }}
          position={{ top: '484px', left: '8.4%', width: '467px', height: '700px', zIndex: 1 }}
        />
        {/* Right: intro text — 220px gap from marquee */}
        <ParallaxLayer
          layer={{ type: 'text', content: '', speed: 0 }}
          position={{ top: '484px', left: '59.2%', width: '467px', height: 'auto', zIndex: 2 }}
        >
          <TextBlock>
            <p className="mal-p" style={{ marginBottom: '1.5rem' }}>
              Dado que la objetividad es un proyecto inalcanzable, Constanza Schwartz crea con el subjetivismo escénico experiencias intensamente subjetivas por las que el espectador participativo puede ir cambiando su inserción y su influencia en su entorno.
            </p>
            <p className="mal-p">
              Somos responsables de los mundos que creamos pero solo en la medida en que aceptamos que nuestra contribución y nuestra influencia va a estar guiada por una extrema subjetividad. La ambición de tratar de ser objetivos nos ha traído demasiadas dificultades y las más diversas guerras. Es necesario para cada uno de nosotros, expandir el territorio de su subjetividad para dar sentido a lo que realmente importa.
            </p>
          </TextBlock>
        </ParallaxLayer>
        {/* Sticky marquee — 216px gap from paragraph bottom (734 + 216 = 950) */}
        <ParallaxLayer
          layer={{
            type: 'marquee',
            content: 'Somos responsables de los mundos que creamos',
            speed: 0,
            intensity: 24,
            className: 'mal-marquee-blend mal-h4'
          }}
          position={{ top: '950px', left: '0', width: '100%', height: '56px', zIndex: 3 }}
        />
        {/* web009 center — 352px gap from text block (484+~250+352 = 1086) */}
        <ParallaxLayer
          layer={{ type: 'image', src: IMG_WEB009, speed: 0.3 }}
          position={{ top: '1086px', left: '33.8%', width: '710px', height: '473px', zIndex: 2 }}
        />
      </ParallaxSection>

      {/* 3. FULLWIDTH 1 ──────────────────────────────────────────────── */}
      <ParallaxSection id="mal-fw1" style={{ minHeight: '960px' }}>
        <ParallaxLayer
          layer={{ type: 'image', src: IMG_FULL_1, speed: 0.3 }}
          position={{ top: '0', left: '0', width: '100%', height: '960px', aspectRatio: '3/2', zIndex: 1 }}
        />
      </ParallaxSection>

      {/* 4. COLLAGE 1: web008 right + text2 left + web025 center ────── */}
      <ParallaxSection id="mal-collage1" style={{ minHeight: '2500px', zIndex: 10 }}>
        {/* img4 (WEB008) — overlapping img3 */}
        <ParallaxLayer
          layer={{ type: 'image', src: IMG_WEB008, speed: 0.3 }}
          position={{ top: '-150px', left: '63.33%', width: '23.96%', height: '517px', aspectRatio: '343/514', zIndex: 3 }}
        />
        {/* Text 2 — 222px gap from img3 bottom */}
        <ParallaxLayer
          layer={{ type: 'text', content: '', speed: 0 }}
          position={{ top: '222px', left: '21.1%', width: '32.4%', height: 'auto', zIndex: 2 }}
        >
          <TextBlock>
            <p className="mal-p" style={{ marginBottom: '1.5rem' }}>
              La obra de Constanza, instaura el horror en la apelación estática a derribar las barreras racionales que impiden fluir nuestra creatividad.
            </p>
            <p className="mal-p">
              Un reactor nuclear hiperrealista permite acercar nuestro cuerpo, y con él nuestra sensibilidad a una distancia de la fuente radioactiva prohibida hasta hoy. Los horrores de su existencia son velozmente atenuados por un bosque de acrílico, sitar en homenaje a nuestros orígenes. En el abismo entre estas dos escenas pueden brotar cuestiones acerca de la validez de nuestro modo de vivir. Esta obra nos permite acercarnos a estímulos con los que cohabitamos diariamente desde planos de conciencia más sensibles que lo que permite el diario trajinar por nuestra civilización industrializada.
            </p>
          </TextBlock>
        </ParallaxLayer>
        {/* img5 (WEB025) — 220px gap from text */}
        <ParallaxLayer
          layer={{ type: 'image', src: IMG_WEB025, speed: 0.3 }}
          position={{ top: '900px', left: '16.87%', width: '66.25%', height: '636px', zIndex: 1 }}
        />
        {/* img6 (IMG_GIF1) — overlapping img5 */}
        <ParallaxLayer
          layer={{ type: 'image', src: IMG_GIF1, speed: 0.3 }}
          position={{ top: '1400px', left: '4.16%', width: '32.4%', height: '350px', zIndex: 2 }}
        />
        {/* Text 3 — 110px gap from img6 bottom (1400+350+110 = 1860) */}
        <ParallaxLayer
          layer={{ type: 'text', content: '', speed: 0 }}
          position={{ top: '1860px', left: '59.2%', width: '32.4%', height: 'auto', zIndex: 2 }}
        >
          <TextBlock>
            <p className="mal-p" style={{ marginBottom: '1.5rem' }}>
              Extraños testigos de metal espejados nos acompañan incólumes a lo largo de toda esta instalación siendo una compañía fiel entre las múltiples simbolizaciones abstractas que nos rodean.
            </p>
            <p className="mal-p" style={{ marginBottom: '1.5rem' }}>
              ¿De dónde viene la electricidad que fluye hacia las pantallas de nuestros televisores, notebooks, computadoras, teléfonos?
            </p>
            <p className="mal-p">Tan familiares.</p>
          </TextBlock>
        </ParallaxLayer>
      </ParallaxSection>

      {/* 5. PHOTOS CLUSTER 1 ─────────────────────────────────────────── */}
      <ParallaxSection id="mal-cluster1" style={{ minHeight: '2758px' }}>
        {/* Sticky marquee 2 — 220px gap from text block 3 */}
        <ParallaxLayer
          layer={{
            type: 'marquee',
            content: 'DERRIBAR LAS BARRERAS RACIONALES QUE impiden fluir nuestra creatividad.',
            speed: 0,
            intensity: 24,
            className: 'mal-marquee-blend mal-h4'
          }}
          position={{ top: '0', left: '0', width: '100%', height: '56px', zIndex: 3 }}
        />

        {/* Staircase right to left descending */}
        {/* img7 (WEB012) - Top Right */}
        <ParallaxLayer
          layer={{ type: 'image', src: IMG_WEB012, speed: 0.3 }}
          position={{ top: '150px', left: '4.16%', width: '23.96%', height: '517px', aspectRatio: '343/514', zIndex: 1 }}
        />
        {/* img8 (WEB011) - Middle */}
        <ParallaxLayer
          layer={{ type: 'image', src: IMG_WEB011, speed: 0.3 }}
          position={{ top: '450px', left: '38%', width: '23.96%', height: '517px', aspectRatio: '343/514', zIndex: 1 }}
        />
        {/* img9 (WEB007) - Bottom Left */}
        <ParallaxLayer
          layer={{ type: 'image', src: IMG_WEB007, speed: 0.3 }}
          position={{ top: '750px', left: '71.8%', width: '23.96%', height: '517px', aspectRatio: '343/514', zIndex: 1 }}
        />

        {/* img10 (WEB005) - 220px gap from previous block */}
        <ParallaxLayer
          layer={{ type: 'image', src: IMG_WEB005, speed: 0.3 }}
          position={{ top: '1487px', left: '8.47%', width: '467px', height: '700px', zIndex: 1 }}
        />
        {/* img11 (WEB022) - Staggered */}
        <ParallaxLayer
          layer={{ type: 'image', src: IMG_WEB022, speed: 0.3 }}
          position={{ top: '1837px', left: '33.82%', width: '468px', height: '701px', zIndex: 2 }}
        />
      </ParallaxSection>

      <ParallaxSection id="mal-video1" style={{ minHeight: '1016px' }}>
        {/* Video 1 */}
        <ParallaxLayer
          layer={{ type: 'text', content: '', speed: 0 }}
          position={{ top: '0', left: '0', width: '100%', height: '810px', zIndex: 2 }}
        >
          <div className="vimeo-container" style={{ width: '100%', height: '100%' }}>
            <CustomVimeoPlayer
              videoUrl="https://player.vimeo.com/video/1186767280?h=ef4894270a"
              title="Más allá del Infinito - Video Arte"
            />
          </div>
        </ParallaxLayer>
      </ParallaxSection>

      {/* 7. GIF 2 + MARQUEE 3 ────────────────────────────────────────── */}
      <ParallaxSection id="mal-gif2" style={{ minHeight: '856px' }}>
        {/* GIF 2 center wide — 220px gap from video is handled by mal-video1 minHeight */}
        <ParallaxLayer
          layer={{ type: 'image', src: IMG_GIF2, speed: 0.3 }}
          position={{ top: '0', left: '16.88%', width: '954px', height: '636px', zIndex: 1 }}
        />
        {/* Sticky marquee 3 — higher on image */}
        <ParallaxLayer
          layer={{
            type: 'marquee',
            content: '¿CÓMO SEGUIR HABITANDO EL PLANETA?',
            speed: 0,
            intensity: 24,
            className: 'mal-marquee-blend mal-h4'
          }}
          position={{ top: '160px', left: '0', width: '100%', height: '56px', zIndex: 3 }}
        />
      </ParallaxSection>

      {/* 8. TEXT 4 ──────────────────────────────────────────────────── */}
      <ParallaxSection id="mal-text4" style={{ minHeight: '400px' }}>
        {/* Text 4 right — 220px gap from GIF is handled by mal-gif2 minHeight */}
        <ParallaxLayer
          layer={{ type: 'text', content: '', speed: 0 }}
          position={{ top: '0', left: '59.02%', width: '467px', height: 'auto', zIndex: 2 }}
        >
          <TextBlock>
            <p className="mal-p">
              Numerosas cuestiones sobre cómo seguir habitando el planeta quedan abiertas directamente a nuestra sensibilidad sin mediación de palabras. Requiere, sin duda, de una integración de nuestro sentir y pensar. Ciudadana del siglo XXI, Constanza Schwartz, impregna sus raíces en la ambigüedad que nuestra cultura manifiesta entre lo orgánico y lo sintético, la literatura y las computadoras y por qué no, las magníficas y aterradoras creaciones de la inteligencia artificial.
            </p>
          </TextBlock>
        </ParallaxLayer>
      </ParallaxSection>

      {/* 9. PHOTOS CLUSTER 2 ─────────────────────────────────────────── */}
      <ParallaxSection id="mal-cluster2" style={{ minHeight: '919px' }}>
        {/* img13 (WEB016) — 220px gap from paragraph */}
        <ParallaxLayer
          layer={{ type: 'image', src: IMG_WEB016, speed: 0.3 }}
          position={{ top: '0', left: '29.51%', width: '345px', height: '517px', zIndex: 1 }}
        />
        {/* img14 (WEB017) — Staggered landscape */}
        <ParallaxLayer
          layer={{ type: 'image', src: IMG_WEB017, speed: 0.3 }}
          position={{ top: '258px', left: '44.17%', width: '588px', height: '441px', zIndex: 2 }}
        />
      </ParallaxSection>

      {/* 10. FULLWIDTH 2 (img15) ────────────────────────────────────── */}
      <ParallaxSection id="mal-fw2" style={{ minHeight: '1180px' }}>
        {/* img15 — 220px gap from cluster is handled by mal-cluster2 minHeight */}
        <ParallaxLayer
          layer={{ type: 'image', src: IMG_WEB018, speed: 0.3 }}
          position={{ top: '0', left: '0', width: '100%', height: '960px', aspectRatio: '3/2', zIndex: 1 }}
        />
      </ParallaxSection>

      {/* 11. PHOTOS CLUSTER 3 ────────────────────────────────────────── */}
      <ParallaxSection id="mal-collage2" style={{ minHeight: '789px' }}>
        {/* img16 (WEB014) — 220px gap from img15 */}
        <ParallaxLayer
          layer={{ type: 'image', src: IMG_WEB014, speed: 0.3 }}
          position={{ top: '0', left: '8.47%', width: '345px', height: '517px', zIndex: 1 }}
        />
        {/* img17 (WEB013) — Middle staggered */}
        <ParallaxLayer
          layer={{ type: 'image', src: IMG_WEB013, speed: 0.3 }}
          position={{ top: '258px', left: '28.19%', width: '467px', height: '311px', zIndex: 2 }}
        />
      </ParallaxSection>

      {/* 12. FULLWIDTH 3 (img18/19) ────────────────────────────────── */}
      <ParallaxSection id="mal-fw3" style={{ minHeight: '1180px' }}>
        {/* img18/19 — 220px gap from cluster is handled by mal-collage2 minHeight */}
        <ParallaxLayer
          layer={{ type: 'image', src: IMG_WEB015, speed: 0.3 }}
          position={{ top: '0', left: '0', width: '100%', height: '960px', aspectRatio: '3/2', zIndex: 1 }}
        />
      </ParallaxSection>

      {/* 13. COMPLEX FINAL CLUSTER (img20, 21) ──────────────────────── */}
      <ParallaxSection id="mal-final-cluster" style={{ minHeight: '1131px' }}>
        {/* Paragraph left */}
        <ParallaxLayer
          layer={{ type: 'text', content: '', speed: 0 }}
          position={{ top: '150px', left: '10.69%', width: '467px', height: 'auto', zIndex: 1 }}
        >
          <TextBlock>
            <p className="mal-p">
              De esas raíces y las tensiones de nuestra vida cotidiana, nuestra cultura sumerge nuestra vida diaria en el triunfo de la ciencia y la técnica excepcionalmente interrumpidas por el verde de algunas plantitas traviesas que asoman en un balcón.
            </p>
          </TextBlock>
        </ParallaxLayer>

        {/* Marquee behind images */}
        <ParallaxLayer
          layer={{
            type: 'marquee',
            content: 'NUESTRA CULTURA SUMERGE NUESTRA VIDA DIARIA EN EL TRIUNFO DE LA CIENCIA Y LA TÉCNICA',
            speed: 0,
            intensity: 24,
            className: 'mal-marquee-blend mal-h4'
          }}
          position={{ top: '450px', left: '0', width: '100%', height: '56px', zIndex: 1 }}
        />

        {/* img20 (WEB040) right portrait */}
        <ParallaxLayer
          layer={{ type: 'image', src: IMG_WEB040, speed: 0.3 }}
          position={{ top: '0', left: '59.09%', width: '467px', height: '700px', zIndex: 2 }}
        />

        {/* img21 (WEB037) center-bottom staggered landscape */}
        <ParallaxLayer
          layer={{ type: 'image', src: IMG_WEB037, speed: 0.3 }}
          position={{ top: '600px', left: '26%', width: '467px', height: '311px', zIndex: 2 }}
        />
      </ParallaxSection>

      {/* 14. VIDEO MAKING OFF ───────────────────────────────────────── */}
      <ParallaxSection id="mal-video2" style={{ minHeight: '1030px' }}>
        <ParallaxLayer
          layer={{ type: 'text', content: '', speed: 0 }}
          position={{ top: '0', left: '0', width: '100%', height: '810px', zIndex: 1 }}
        >
          <div className="vimeo-container" style={{ width: '100%', height: '100%' }}>
            <VideoPlaceholder label="VIDEO MAKING OFF" />
          </div>
        </ParallaxLayer>
      </ParallaxSection>

      {/* 15. PHOTO img22 (WEB039) ───────────────────────────────────── */}
      <ParallaxSection id="mal-img22" style={{ minHeight: '1030px' }}>
        {/* img22 — 220px gap from video */}
        <ParallaxLayer
          layer={{ type: 'image', src: IMG_WEB039, speed: 0.3 }}
          position={{ top: '0', left: '7.64%', width: '1220px', height: '810px', zIndex: 1 }}
        />
      </ParallaxSection>

      {/* 16. CAROUSEL 1 ─────────────────────────────────────────────── */}
      <ParallaxSection id="mal-carousel-1" style={{ minHeight: '333px' }}>
        {/* Carousel 1 — 220px gap from img22 is handled by mal-img22 minHeight */}
        <ParallaxLayer
          layer={{ type: 'text', content: '', speed: 0 }}
          position={{ top: '0', left: '0', width: '100%', height: '333px', zIndex: 1 }}
        >
          <Carousel images={CAROUSEL_1} id="c1" />
        </ParallaxLayer>
      </ParallaxSection>


      {/* 17. FINAL SEQUENCE: TEXT - PHOTO 23 - TEXT ────────────────── */}
      <ParallaxSection id="mal-final-sequence" style={{ minHeight: '1850px' }}>
        {/* Text 6 - Right aligned — 220px gap from Carousel 1 */}
        <ParallaxLayer
          layer={{ type: 'text', content: '', speed: 0 }}
          position={{ top: '220px', left: '59.16%', width: '467px', height: 'auto', zIndex: 1 }}
        >
          <TextBlock>
            <p className="mal-p">
              La ciencia y la técnica han triunfado hasta participar de la construcción completa de los paisajes de nuestras ciudades. "Más allá del infinito" es una alerta cruda e implacable que subraya los aspectos amenazantes de esta victoria.
            </p>
          </TextBlock>
        </ParallaxLayer>

        {/* img23 (Tall) — 220px gap from Text 6 (220 + ~150 + 220 = 590) */}
        <ParallaxLayer
          layer={{ type: 'image', src: IMG_WEB050, speed: 0.3 }}
          position={{ top: '590px', left: '8.47%', width: '467px', height: '700px', zIndex: 1 }}
        />

        {/* Text 7 - Left aligned — 220px gap from img23 (590 + 700 + 220 = 1510) */}
        <ParallaxLayer
          layer={{ type: 'text', content: '', speed: 0 }}
          position={{ top: '1510px', left: '26.67%', width: '467px', height: 'auto', zIndex: 1 }}
        >
          <TextBlock>
            <p className="mal-p">
              La vibración de esta obra persiste en nuestros sentidos, nos impulsa a buscar nuevas respuestas que tal vez están asociadas a las notas de nostalgia distribuidas con inclemencia en diversos rincones de la muestra. Nuestros afectos y la ternura que suele acompañar a la nostalgia serán solo una parte de la respuesta emocional a esta apelación al amor y la cordura.
            </p>
          </TextBlock>
        </ParallaxLayer>
      </ParallaxSection>

      {/* 18. img24 (Wide) ───────────────────────────────────────────── */}
      <ParallaxSection id="mal-finish-img-24" style={{ height: '1030px' }}>
        {/* img24 — 220px gap from Text 7 handled by Section 17 height */}
        {/* speed 0 to ensure exact 220px layout gap to carousel */}
        <ParallaxLayer
          layer={{ type: 'image', src: IMG_WEB054, speed: 0 }}
          position={{ top: '0', left: '0', width: '100%', height: '810px', zIndex: 1 }}
        />
      </ParallaxSection>

      {/* 19. FINAL SECTION: CAROUSEL 2, QUOTE & CREDITS ───────────────── */}
      <ParallaxSection id="mal-finish-footer" style={{ height: '650px' }}>
        {/* Carousel 2 — background — 220px gap from img24 handled by Section 18 height */}
        <ParallaxLayer
          layer={{ type: 'text', content: '', speed: 0 }}
          position={{ top: '0', left: '0', width: '100%', height: '333px', zIndex: 1 }}
        >
          <Carousel images={CAROUSEL_2} id="c2-final" />
        </ParallaxLayer>

        {/* Quote — 2 lines, baseline of 2nd line at 216px from bottom (650 - 216 = 434) */}
        {/* If line-height is 56px, line 1 is at 434 - 56 = 378. */}
        <ParallaxLayer
          layer={{ type: 'text', content: '', speed: 0 }}
          position={{ top: '300px', left: '0', width: '100%', height: 'auto', zIndex: 3 }}
        >
          <div style={{ textAlign: 'right', paddingRight: '4.24%' }}>
            <p style={{
              color: '#fff',
              textTransform: 'uppercase',
              fontFamily: '"Helvetica Neue LT Std", sans-serif',
              fontSize: '56px',
              fontWeight: 200,
              lineHeight: '56px',
              maxWidth: '850px',
              marginLeft: 'auto',
              textAlign: 'left'
            }}>
              SI TIENES APEGO A TU<br />CORDURA, NO ENTRES.
            </p>
          </div>
        </ParallaxLayer>

        <ParallaxLayer
          layer={{ type: 'text', content: '', speed: 0 }}
          position={{ top: '554px', left: '0', width: '100%', height: 'auto', zIndex: 4 }}
        >
          <div style={{
            color: '#fff',
            width: '100%',
            maxWidth: 'none',
            padding: '0 3px',
            mixBlendMode: 'difference',
            WebkitMixBlendMode: 'difference',
            transform: 'translateZ(0)',
            textAlign: 'left'
          } as any}>
            <p style={{ fontSize: '14px', lineHeight: '1.6', width: '100%', maxWidth: 'none', display: 'block' }}>
              <span style={{ fontWeight: 700 }}>"MÁS ALLÁ DEL INFINITO"</span> por Constanza Schwartz &nbsp;/&nbsp;
              <span style={{ fontWeight: 700 }}>Acompañamiento Conceptual:</span> Graciela Peyrú &nbsp;/&nbsp;
              <span style={{ fontWeight: 700 }}>Composición Sonora:</span> Francisco Rousset Osio &nbsp;/&nbsp;
              <span style={{ fontWeight: 700 }}>Diseño Lumínico:</span> Renzo Salces &nbsp;/&nbsp;
              <span style={{ fontWeight: 700 }}>Registro Audiovisual:</span> Martín Rois &nbsp;/&nbsp;
              <span style={{ fontWeight: 700 }}>Coproducción lumínica de Árboles de Acrílico:</span> Matías Kroitor &nbsp;/&nbsp;
              <span style={{ fontWeight: 700 }}>Coproducción de Escenas y Diseño Lumínico:</span> Manuela Ihan &nbsp;/&nbsp;
              <span style={{ fontWeight: 700 }}>Project Management:</span> Marina Kucbart &nbsp;/&nbsp;
              <span style={{ fontWeight: 700 }}>Co-Proyección y Modelado:</span> Francisca Gil Sosa &nbsp;/&nbsp;
              <span style={{ fontWeight: 700 }}>Ayudante Árboles de Acrílico:</span> Juan Lasala
            </p>
          </div>
        </ParallaxLayer>
      </ParallaxSection>

    </div>
  )
}
