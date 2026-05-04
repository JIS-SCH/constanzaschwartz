'use client'

import { useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { getLenis } from '@/src/scroll/lenis'
import { ParallaxSection } from '@/src/components/parallax/ParallaxSection'
import { ParallaxLayer } from '@/src/components/parallax/ParallaxLayer'
import { PI } from '@/src/components/parallax/ParallaxImg'
import { CustomVimeoPlayer } from '@/src/components/media/CustomVimeoPlayer'
import { MARQUEE } from '@/src/motion/tokens'
import { ASSETS } from './assets'

const IMG_HERO = ASSETS.hero
// img1–img24: Cloudinary sequentially ordered by scroll position
const IMG_WEB028 = ASSETS.img1   // 467×700
const IMG_WEB009 = ASSETS.img2   // 710×473
const IMG_FULL_1 = ASSETS.img3   // 1440×960  3:2
const IMG_WEB008 = ASSETS.img4   // 345×517
const IMG_WEB025 = ASSETS.img5   // 954×636   3:2
const IMG_GIF1 = 'https://res.cloudinary.com/dapjholek/image/upload/f_gif,fl_animated,q_auto/CONSTANZASCHWARTZ-projects-masalladelinfinito-6_h9gjd7'
const IMG_WEB012 = ASSETS.img7   // 345×517
const IMG_WEB011 = ASSETS.img8   // 345×517
const IMG_WEB007 = ASSETS.img9   // 345×518
const IMG_WEB005 = ASSETS.img10  // 467×700
const IMG_WEB022 = ASSETS.img11  // 467×701
const IMG_GIF2 = 'https://res.cloudinary.com/dapjholek/image/upload/f_gif,fl_animated,q_auto/CONSTANZASCHWARTZ-projects-masalladelinfinito-12_kazkok'
const IMG_WEB016 = ASSETS.img13  // 345×517
const IMG_WEB017 = ASSETS.img14  // 294×441
const IMG_WEB018 = ASSETS.img15  // 294×441
const IMG_WEB014_V = ASSETS.img16  // 690×1034 (Vertical)
const IMG_WEB014 = ASSETS.img17  // 934×622 (Horizontal)
const IMG_WEB013 = ASSETS.img18  // 1176×784 (Horizontal)
const IMG_WEB015 = ASSETS.img19  // 588×392
const IMG_WEB040 = ASSETS.img20  // 480×719
const IMG_WEB037 = ASSETS.img21  // 480×719
const IMG_WEB039 = ASSETS.img22  // 480×719
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
  const duration = images.length * MARQUEE.durationPerImage
  return (
    <div className="w-full h-[var(--carousel-h)] overflow-hidden">
      <style dangerouslySetInnerHTML={{
        __html: `
        @-webkit-keyframes mal-c-${id} {
          from { -webkit-transform: translate3d(0,0,0); transform: translate3d(0,0,0); }
          to   { -webkit-transform: translate3d(-50%,0,0); transform: translate3d(-50%,0,0); }
        }
        @keyframes mal-c-${id} {
          from { transform: translate3d(0,0,0); }
          to   { transform: translate3d(-50%,0,0); }
        }
      `}} />
      <div className="flex h-[var(--carousel-h)] w-max" style={{ willChange: 'transform', WebkitAnimation: `mal-c-${id} ${duration}s linear infinite`, animation: `mal-c-${id} ${duration}s linear infinite` }}>
        {doubled.map((src, i) => (
          <img key={i} src={src} alt="" className="h-[var(--carousel-h)] w-auto block shrink-0" />
        ))}
      </div>
    </div>
  )
}

const HFONT = '"Helvetica Neue LT Std", "Helvetica Neue", Helvetica, Arial, sans-serif'

function TextBlock({ children }: { children: React.ReactNode }) {
  return <div className="mal-p" style={{ color: '#fff' }}>{children}</div>
}



export { meta } from './meta'


export function Component() {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)
    const lenis = getLenis()
    if (lenis) {
      lenis.on('scroll', ScrollTrigger.update)
      gsap.ticker.lagSmoothing(0)
    }
    const t = setTimeout(() => ScrollTrigger.refresh(), 150)
    return () => {
      clearTimeout(t)
      if (lenis) lenis.off('scroll', ScrollTrigger.update)
    }
  }, [])

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
          font-size: 36px;
          padding-top: 2px;
          padding-right: 80px !important;
          letter-spacing: 0.72px;
          white-space: pre !important;
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
          mix-blend-mode: difference !important;
          -webkit-mix-blend-mode: difference !important;
        }

        .mal-container { isolation: isolate; }
        .mal-container section { isolation: auto !important; }
        
        .mal-container img {
          outline: 1px solid transparent;
          backface-visibility: hidden;
          -webkit-backface-visibility: hidden;
          transform: scale(1.005);
          display: block;
        }

        .mal-h4 {
          color: #FFF;
          font-family: "Helvetica Neue LT Std", ${HFONT};
          font-size: 36px;
          font-style: normal;
          font-weight: 250;
          line-height: normal;
          letter-spacing: 0.72px;
          text-transform: uppercase;
        }
        .marquee-track {
          display: flex;
          width: max-content;
          animation: marquee-scroll linear infinite;
          will-change: transform;
        }
        .mal-desktop {
          display: block;
        }
        .mal-mobile { display: none; }
        .mal-mobile { --carousel-h: 280px; }
        @media (max-width: 1023px) {
          .mal-desktop { display: none; }
          .mal-mobile { display: block; }
        }
      `}} />

      <div className="mal-desktop">

        {/* 1. HERO ─────────────────────────────────────────────────────── */}
        <ParallaxSection id="mal-hero" style={{ minHeight: '748px' }}>
          <ParallaxLayer
            layer={{ type: 'image', src: IMG_HERO, speed: 0, isHero: true, objectFit: 'contain', className: 'mal-hero-desktop' }}
            position={{ top: '124px', left: '0', width: '100%', height: '648px', aspectRatio: '20/9', zIndex: 1 }}
          />
          <ParallaxLayer
            layer={{ type: 'image', src: ASSETS.heroMobile, speed: 0, isHero: true, objectFit: 'contain', className: 'mal-hero-mobile' }}
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
        <ParallaxSection id="mal-intro" style={{ minHeight: '1779px', zIndex: 10 }}>
          {/* Disciplines Marquee — 220px gap from hero */}
          <ParallaxLayer
            layer={{
              type: 'marquee',
              content: 'DIRECCIÓN CREATIVA Y EJECUTIVA  /   ESCENOGRAFÍA  /   DISEÑO LUMÍNICO DE ESPECTÁCULOS  /   DISEÑO SONORO QUINTAFÓNICO  /   DIRECCIÓN DE OBRA',
              speed: 0,
              intensity: 24,
              className: 'mal-marquee-blend mal-h4'
            }}
            position={{ top: '220px', left: '0', width: '100%', height: '44px', zIndex: 10 }}
          />
          {/* Left: tall portrait  */}
          <ParallaxLayer
            layer={{ type: 'image', src: IMG_WEB028, speed: 0.3 }}
            position={{ top: '569px', left: '8.4%', width: '467px', height: '700px', zIndex: 10 }}
          />
          {/* Right: intro text  */}
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
            position={{ top: '1100px', left: '0', width: '100%', height: '56px', zIndex: 11 }}
          />
          {/* web009 center — 352px gap from text block (484+~250+352 = 1086) */}
          <ParallaxLayer
            layer={{ type: 'image', src: IMG_WEB009, speed: 0.3 }}
            position={{ top: '1180px', left: '33.8%', width: '710px', height: '473px', zIndex: 1, }}
          />
        </ParallaxSection>

        {/* 3. FULLWIDTH 1 ──────────────────────────────────────────────── */}
        <ParallaxSection id="mal-fw1" style={{ minHeight: '960px', zIndex: 1, top: '100px' }}>
          <ParallaxLayer
            layer={{ type: 'image', src: IMG_FULL_1, speed: 0.3 }}
            position={{ top: '0', left: '0', width: '100%', height: '960px', aspectRatio: '3/2', zIndex: 2 }}
          />
        </ParallaxSection>

        {/* 4. COLLAGE 1: web008 right + text2 left + web025 center ────── */}
        <ParallaxSection id="mal-collage1" style={{ minHeight: '2338px', zIndex: 5 }} overflowHidden={false}>
          {/* img4 (WEB008) — overlapping img3 */}
          <ParallaxLayer
            layer={{ type: 'image', src: IMG_WEB008, speed: 0.3 }}
            position={{ top: '-140px', left: '63.33%', width: '23.96%', height: '517px', aspectRatio: '343/514', zIndex: 30 }}
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
            position={{ top: '809px', left: '16.87%', width: '66.25%', height: '636px', zIndex: 1 }}
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
        <ParallaxSection id="mal-cluster1" style={{ minHeight: '2448px', top: '-30px' }}>
          {/* Sticky marquee 2 — 220px gap from text block 3 */}
          <ParallaxLayer
            layer={{
              type: 'marquee',
              content: 'DERRIBAR LAS BARRERAS RACIONALES QUE impiden fluir nuestra creatividad.',
              speed: 0,
              intensity: 24,
              className: 'mal-marquee-blend mal-h4'
            }}
            position={{ top: '40px', left: '0', width: '100%', height: '56px', zIndex: 0 }}
          />

          {/* Staircase right to left descending */}
          {/* img7 (WEB012) - Top Right */}
          <ParallaxLayer
            layer={{ type: 'image', src: IMG_WEB012, speed: 0.3 }}
            position={{ top: '0px', left: '4.16%', width: '23.96%', height: '517px', aspectRatio: '343/514', zIndex: 1 }}
          />
          {/* img8 (WEB011) - Middle */}
          <ParallaxLayer
            layer={{ type: 'image', src: IMG_WEB011, speed: 0.3 }}
            position={{ top: '150px', left: '38%', width: '23.96%', height: '517px', aspectRatio: '343/514', zIndex: 1 }}
          />
          {/* img9 (WEB007) - Bottom Left */}
          <ParallaxLayer
            layer={{ type: 'image', src: IMG_WEB007, speed: 0.3 }}
            position={{ top: '300px', left: '71.8%', width: '23.96%', height: '517px', aspectRatio: '343/514', zIndex: 1 }}
          />

          {/* img10 (WEB005) - 220px gap from previous block */}
          <ParallaxLayer
            layer={{ type: 'image', src: IMG_WEB005, speed: 0.3 }}
            position={{ top: '1055px', left: '8.47%', width: '467px', height: '700px', zIndex: 1 }}
          />
          {/* img11 (WEB022) - Staggered */}
          <ParallaxLayer
            layer={{ type: 'image', src: IMG_WEB022, speed: 0.3 }}
            position={{ top: '1520px', left: '33.82%', width: '468px', height: '701px', zIndex: 2 }}
          />
        </ParallaxSection>

        <ParallaxSection id="mal-video1" style={{ minHeight: '1016px', top: '-20px' }}>
          {/* Video 1 */}
          <ParallaxLayer
            layer={{ type: 'text', content: '', speed: 0 }}
            position={{ left: '0', width: '100%', height: '810px', zIndex: 2, }}
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
        <ParallaxSection id="mal-gif2" style={{ minHeight: '856px', top: '-29px' }}>
          {/* GIF 2 center wide — 220px gap from video is handled by mal-video1 minHeight */}
          <ParallaxLayer
            layer={{ type: 'image', src: IMG_GIF2, speed: 0.3 }}
            position={{ top: '30px', left: '16.88%', width: '954px', height: '636px', zIndex: 1 }}
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
            position={{ top: '115px', left: '0', width: '100%', height: '56px', zIndex: 3, }}
          />
        </ParallaxSection>

        {/* 8. TEXT 4 ──────────────────────────────────────────────────── */}
        <ParallaxSection id="mal-text4" style={{ minHeight: '400px' }}>
          {/* Text 4 right — 220px gap from GIF is handled by mal-gif2 minHeight */}
          <ParallaxLayer
            layer={{ type: 'text', content: '', speed: 0 }}
            position={{ top: '10px', left: '59.02%', width: '467px', height: 'auto', zIndex: 2 }}
          >
            <TextBlock>
              <p className="mal-p">
                Numerosas cuestiones sobre cómo seguir habitando el planeta quedan abiertas directamente a nuestra sensibilidad sin mediación de palabras. Requiere, sin duda, de una integración de nuestro sentir y pensar. Ciudadana del siglo XXI, Constanza Schwartz, impregna sus raíces en la ambigüedad que nuestra cultura manifiesta entre lo orgánico y lo sintético, la literatura y las computadoras y por qué no, las magníficas y aterradoras creaciones de la inteligencia artificial.
              </p>
            </TextBlock>
          </ParallaxLayer>
        </ParallaxSection>

        {/* 9. PHOTOS CLUSTER 2 ─────────────────────────────────────────── */}
        <ParallaxSection id="mal-cluster2" style={{ minHeight: '919px', top: '33px' }}>
          {/* img16 (WEB016) — 220px gap from paragraph */}
          <ParallaxLayer
            layer={{ type: 'image', src: IMG_WEB016, speed: 0.3 }}
            position={{ top: '20px', left: '29.51%', width: '345px', height: '517px', zIndex: 1 }}
          />
          {/* img17 (WEB017) — Staggered landscape */}
          <ParallaxLayer
            layer={{ type: 'image', src: IMG_WEB017, speed: 0.3 }}
            position={{ top: '258px', left: '50.17%', width: '588px', height: '441px', zIndex: 2 }}
          />
        </ParallaxSection>

        <ParallaxSection id="mal-fw2" style={{ minHeight: '1180px' }}>
          {/* img15 — 220px gap from cluster is handled by mal-cluster2 minHeight */}
          <ParallaxLayer
            layer={{ type: 'image', src: IMG_WEB018, speed: 0.3 }}
            position={{ top: '59px', left: '0', width: '100%', height: '960px', aspectRatio: '3/2', zIndex: 1 }}
          />
        </ParallaxSection>

        {/* 11. PHOTOS CLUSTER 3 ────────────────────────────────────────── */}
        <ParallaxSection id="mal-collage2" style={{ minHeight: '1262px', top: '-18px' }}>
          {/* img16 (Vertical) — Vertical on left */}
          <ParallaxLayer
            layer={{ type: 'image', src: IMG_WEB014_V, speed: 0.3 }}
            position={{ top: '100px', left: '8.47%', width: '345px', height: '517px', zIndex: 1 }}
          />
          {/* img17 (Horizontal) — Middle staggered */}
          <ParallaxLayer
            layer={{ type: 'image', src: IMG_WEB014, speed: 0.3 }}
            position={{ top: '500px', left: '28.19%', width: '467px', height: '311px', zIndex: 2 }}
          />
          {/* img18 (Horizontal) — Bottom staggered */}
          <ParallaxLayer
            layer={{ type: 'image', src: IMG_WEB013, speed: 0.3 }}
            position={{ top: '720px', left: '50.17%', width: '588px', height: '392px', zIndex: 1 }}
          />
        </ParallaxSection>

        {/* 12. FULLWIDTH 3 (img19) ────────────────────────────────── */}
        <ParallaxSection id="mal-fw3" style={{ minHeight: '1180px' }}>
          {/* img19 — 220px gap from cluster is handled by mal-collage2 minHeight */}
          <ParallaxLayer
            layer={{ type: 'image', src: IMG_WEB015, speed: 0.3 }}
            position={{ top: '77px', left: '0', width: '100%', height: '960px', aspectRatio: '3/2', zIndex: 1 }}
          />
        </ParallaxSection>

        {/* 13. COMPLEX FINAL CLUSTER (img20, 21) ──────────────────────── */}
        <ParallaxSection id="mal-final-cluster" style={{ minHeight: '1131px', top: '90px' }}>
          {/* Paragraph left */}
          <ParallaxLayer
            layer={{ type: 'text', content: '', speed: 0 }}
            position={{ top: '230px', left: '10.69%', width: '467px', height: 'auto', zIndex: 1 }}
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
            position={{ top: '630px', left: '0', width: '100%', height: '56px', zIndex: 2 }}
          />

          {/* img20 (WEB040) right portrait */}
          <ParallaxLayer
            layer={{ type: 'image', src: IMG_WEB040, speed: 0.3 }}
            position={{ top: '0', left: '59.09%', width: '467px', height: '700px', zIndex: 1 }}
          />

          {/* img21 (WEB037) center-bottom staggered landscape */}
          <ParallaxLayer
            layer={{ type: 'image', src: IMG_WEB037, speed: 0.3 }}
            position={{ top: '600px', left: '38.5%', width: '467px', height: '311px', zIndex: 2 }}
          />
        </ParallaxSection>

        <ParallaxSection id="mal-img22" style={{ minHeight: '774px', top: '107px' }}>
          {/* img22 — 220px gap from video */}
          <ParallaxLayer
            layer={{ type: 'image', src: IMG_WEB039, speed: 0.3 }}
            position={{ top: '0', left: '7.64%', width: '831px', height: '554px', aspectRatio: '3/2', zIndex: 1 }}
          />
        </ParallaxSection>

        {/* 16. CAROUSEL 1 ─────────────────────────────────────────────── */}
        <ParallaxSection id="mal-carousel-1" style={{ minHeight: '333px', top: '120px' }}>
          {/* Carousel 1 — 220px gap from img22 is handled by mal-img22 minHeight */}
          <ParallaxLayer
            layer={{ type: 'text', content: '', speed: 0 }}
            position={{ top: '0', left: '0', width: '100%', height: '333px', zIndex: 1 }}
          >
            <Carousel images={CAROUSEL_1} id="c1" />
          </ParallaxLayer>
        </ParallaxSection>


        {/* 17. FINAL SEQUENCE: TEXT - PHOTO 23 - TEXT ────────────────── */}
        <ParallaxSection id="mal-final-sequence" style={{ minHeight: '1850px', top: '115px' }}>
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

          {/* img23 */}
          <ParallaxLayer
            layer={{ type: 'image', src: IMG_WEB050, speed: 0.3 }}
            position={{ top: '562px', left: '28%', width: '923px', height: '430px', zIndex: 1 }}
          />

          {/* Text 7 - Left aligned — 220px gap from combo (570 + 430 + 220 = 1220) */}
          <ParallaxLayer
            layer={{ type: 'text', content: '', speed: 0 }}
            position={{ top: '1220px', left: '26.67%', width: '467px', height: 'auto', zIndex: 1 }}
          >
            <TextBlock>
              <p className="mal-p">
                La vibración de esta obra persiste en nuestros sentidos, nos impulsa a buscar nuevas respuestas que tal vez están asociadas a las notas de nostalgia distribuidas con inclemencia en diversos rincones de la muestra. Nuestros afectos y la ternura que suele acompañar a la nostalgia serán solo una parte de la respuesta emocional a esta apelación al amor y la cordura.
              </p>
            </TextBlock>
          </ParallaxLayer>
        </ParallaxSection>

        {/* 18. img24 (Wide) ───────────────────────────────────────────── */}
        <ParallaxSection id="mal-finish-img-24" style={{ height: '1030px', top: '-130px' }}>
          <ParallaxLayer
            layer={{ type: 'image', src: IMG_WEB054, speed: 0 }}
            position={{ top: '0', left: '0', width: '100%', height: '810px', zIndex: 1 }}
          />
        </ParallaxSection>

        {/* 19. FINAL SECTION: CAROUSEL 2, QUOTE & CREDITS ───────────────── */}
        <ParallaxSection id="mal-finish-footer" style={{ height: '475px', top: '-130px' }} overflowHidden={false}>
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
                marginLeft: '45%',
                textAlign: 'left'
              }}>
                SI TIENES APEGO A TU<br />CORDURA, NO ENTRES.
              </p>
            </div>
          </ParallaxLayer>

          <ParallaxLayer
            layer={{ type: 'text', content: '', speed: 0 }}
            position={{ top: '500px', left: '0', width: '100%', height: 'auto', zIndex: 4 }}
          >
            <div style={{
              color: '#fff',
              width: '100%',
              maxWidth: 'none',
              paddingLeft: '3px',
              paddingRight: '3px',
              paddingTop: '10px',
              paddingBottom: '0px',
              mixBlendMode: 'difference',
              transform: 'translateZ(0)',
              textAlign: 'left'
            } as any}>
              <p style={{
                fontFamily: '"Space Grotesk", sans-serif',
                fontSize: '16px',
                lineHeight: '1.5',
                fontWeight: 300,
                width: '100%',
                maxWidth: 'none',
                display: 'block',
              }}>
                <span style={{ fontWeight: 500 }}>“MÁS ALLÁ DEL INFINITO”</span> por Constanza Schwartz<br />
                <span style={{ fontWeight: 500 }}>Acompañamiento Conceptual:</span> Graciela Peyrú &nbsp;&nbsp;/&nbsp;&nbsp;
                <span style={{ fontWeight: 500 }}>Composición Sonora:</span> Francisco Rousset Osio &nbsp;&nbsp;/&nbsp;&nbsp;
                <span style={{ fontWeight: 500 }}>Diseño Lumínico:</span> Renzo Salces &nbsp;&nbsp;/&nbsp;&nbsp;
                <span style={{ fontWeight: 500 }}>Registro Audiovisual:</span> Martín Rois &nbsp;&nbsp;/&nbsp;&nbsp;
                <span style={{ fontWeight: 500 }}>Coproducción <br></br>lumínica de Árboles de Acrílico:</span> Matías Kroitor &nbsp;&nbsp;/&nbsp;&nbsp;
                <span style={{ fontWeight: 500 }}>Coproducción de Escenas y Diseño Lumínico:</span> Manuela Ihan &nbsp;/&nbsp;
                <span style={{ fontWeight: 500 }}>Project Management:</span> Marina Kucbart &nbsp;/&nbsp;
                <span style={{ fontWeight: 500 }}>Co-Proyección y Modelado:</span> <br></br>Francisca Gil Sosa &nbsp;&nbsp;/&nbsp;&nbsp;
                <span style={{ fontWeight: 500 }}>Ayudante Árboles de Acrílico:</span> Juan Lasala
              </p>
            </div>
          </ParallaxLayer>
        </ParallaxSection>

      </div>{/* /mal-desktop */}

      {/* ── MAS ALLA MOBILE ─────────────────────────────────────────────── */}
      <div className="mal-mobile" style={{ backgroundColor: '#0F0F0F', overflow: 'visible', paddingBottom: '40px' }}>

        {/* HERO */}
        <div data-project-image style={{ position: 'relative', height: '85vh', minHeight: '600px' }}>
          <img src={ASSETS.heroMobile} alt="" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} />

          {/* Hero Text */}
          <div style={{ position: 'absolute', bottom: '60px', left: '20px', color: '#fff', zIndex: 3 }}>
          </div>


        </div>

        {/* TEXT 1 */}
        <div className="mal-p" style={{ color: '#fff', marginTop: '80px', width: '350px', marginLeft: '20px', fontSize: 'var(--p-size)', fontFamily: '"Space Grotesk", sans-serif', fontWeight: 300, lineHeight: 1.45 }}>
          <p style={{ marginBottom: '1.5rem' }}>
            Dado que la objetividad es un proyecto inalcanzable, Constanza Schwartz crea con el subjetivismo escénico experiencias intensamente subjetivas por las que el espectador participativo puede ir cambiando su inserción y su influencia en su entorno.
          </p>
          <p>
            Somos responsables de los mundos que creamos pero solo en la medida en que aceptamos que nuestra contribución y nuestra influencia va a estar guiada por una extrema subjetividad.
          </p>
        </div>

        {/* FIRST PAIR: img1 (WEB009) + img2 (WEB028) - Swapped and Marquee Overlapping */}
        <div style={{ position: 'relative', height: '480px', marginTop: '80px' }}>
          <img src={IMG_WEB009} alt="" loading="lazy" style={{ position: 'absolute', left: '20px', top: '0', width: '230px', height: '153px', objectFit: 'cover', zIndex: 1 }} />
          <PI speed={0.2} src={IMG_WEB028} alt="" loading="lazy" style={{ position: 'absolute', right: '20px', top: '140px', width: '200px', height: '300px', objectFit: 'cover', zIndex: 2 }} />

          {/* Marquee overlaying the images */}
          <div style={{ position: 'absolute', top: '370px', left: 0, width: '100%', height: '40px', overflow: 'hidden', zIndex: 3, mixBlendMode: 'difference' }}>
            <div className="marquee-track" style={{ animationDuration: `${MARQUEE.speed.medium}s` }}>
              <div className="marquee-set">
                <span className="marquee-item" style={{
                  fontFamily: '"Helvetica Neue LT Std", sans-serif',
                  fontSize: '28px',
                  fontWeight: 250,
                  letterSpacing: '0.56px',
                  textTransform: 'uppercase',
                  color: '#FFF'
                } as any}>SOMOS RESPONSABLES DE LOS MUNDOS QUE CREAMOS </span>
              </div>
              <div className="marquee-set">
                <span className="marquee-item" style={{
                  fontFamily: '"Helvetica Neue LT Std", sans-serif',
                  fontSize: '28px',
                  fontWeight: 250,
                  letterSpacing: '0.56px',
                  textTransform: 'uppercase',
                  color: '#FFF'
                } as any}>SOMOS RESPONSABLES DE LOS MUNDOS QUE CREAMOS </span>
              </div>
            </div>
          </div>
        </div>




        {/* SECOND PAIR: img3 (FULL_1) + img4 (WEB008) - Staggered with Marquee */}
        <div style={{ position: 'relative', height: '480px', marginTop: '-58px' }}>
          <img src={IMG_FULL_1} alt="" loading="lazy" style={{ position: 'absolute', left: '0', top: '0', width: '100%', height: '100%', objectFit: 'contain', zIndex: 1 }} />
          <PI speed={0.15} src={IMG_WEB008} alt="" loading="lazy" style={{ position: 'absolute', right: '40px', top: '350px', width: '170px', height: '255px', objectFit: 'cover', zIndex: 2 }} />

        </div>

        {/* TEXT 2 */}
        <div className="mal-p" style={{ color: '#fff', marginTop: '200px', width: '350px', marginLeft: '30px', fontSize: 'var(--p-size)', fontFamily: '"Space Grotesk", sans-serif', fontWeight: 300, lineHeight: 1.45 }}>
          <p style={{ marginBottom: '1.5rem' }}>
            La obra de Constanza, instaura el horror en la apelación estática a derribar las barreras racionales que impiden fluir nuestra creatividad.
          </p>
          <p>
            La obra de Constanza insistirá entonces en la apelación continua a derribar las barreras racionales que impiden fluir nuestra creatividad.

            Un reactor nuclear hiperrealista permite acercar nuestro cuerpo, y con él nuestra sensibilidad a una distancia de la fuente radioactiva prohibida hasta hoy. Los horrores de su existencia son velozmente atenuados por un bosque de acrílico, altar en homenaje a nuestros orígenes. En el abismo entre estas dos escenas pueden brotar cuestiones acerca de la validez de nuestro modo de vivir. Esta obra nos permite acercarnos a estímulos con los que cohabitamos diariamente desde planos de conciencia más sensibles que lo que permite el diario trajinar por nuestra civilización industrializada.
          </p>
        </div>
        {/* THIRD PAIR: img5 (WEB025) + img6 (GIF1) - Staggered Overlap */}
        <div style={{ position: 'relative', height: '320px', marginTop: '80px' }}>
          <PI speed={0.2} src={IMG_WEB025} alt="" loading="lazy" style={{ position: 'absolute', right: '20px', top: '0', width: '290px', height: '193px', objectFit: 'cover', zIndex: 1 }} />
          <img src={IMG_GIF1} alt="" loading="lazy" style={{ position: 'absolute', left: '20px', top: '140px', width: '170px', height: '113px', objectFit: 'cover', zIndex: 2 }} />
        </div>



        {/* TEXT 3 */}
        <div className="mal-p" style={{ color: '#fff', marginTop: '10px', width: '350px', marginLeft: '20px', fontSize: 'var(--p-size)', fontFamily: '"Space Grotesk", sans-serif', fontWeight: 300, lineHeight: 1.45 }}>
          <p style={{ marginBottom: '1.5rem' }}>
            Extraños testigos de metal espejados nos acompañan incólumes a lo largo de toda esta instalación siendo una compañía fiel entre las múltiples simbolizaciones abstractas que nos rodean.
          </p>
          <p style={{ marginBottom: '1.5rem' }}>¿De dónde viene la electricidad que fluye hacia las pantallas de nuestros televisores, notebooks, computadoras, teléfonos?</p>
          <p>Tan familiares.</p>
        </div>

        {/* STAIRCASE: img7, img8, img9 */}
        <div style={{ position: 'relative', height: '540px', marginTop: '80px' }}>
          <PI speed={0.15} src={IMG_WEB012} alt="" loading="lazy" style={{ position: 'absolute', left: '20px', top: '0', width: '140px', height: '210px', objectFit: 'cover', zIndex: 1 }} />
          <PI speed={0.2} src={IMG_WEB011} alt="" loading="lazy" style={{ position: 'absolute', left: '125px', top: '140px', width: '140px', height: '210px', objectFit: 'cover', zIndex: 1 }} />
          <PI speed={0.25} src={IMG_WEB007} alt="" loading="lazy" style={{ position: 'absolute', left: '230px', top: '290px', width: '140px', height: '210px', objectFit: 'cover', zIndex: 1 }} />

          {/* Marquee overlaying img7 */}
          <div style={{ position: 'absolute', top: '40px', left: 0, width: '100%', height: '44px', overflow: 'hidden', zIndex: 10, mixBlendMode: 'difference' }}>
            <div className="marquee-track" style={{ animationDuration: `${MARQUEE.speed.medium}s` }}>
              <div className="marquee-set">
                <span className="marquee-item" style={{
                  fontFamily: '"Helvetica Neue LT Std", sans-serif',
                  fontSize: '28px',
                  fontWeight: 250,
                  letterSpacing: '0.56px',
                  textTransform: 'uppercase',
                  color: '#FFF'
                } as any}>DERRIBAR LAS BARRERAS RACIONALES QUE IMPIDEN FLUIR NUESTRA CREATIVIDAD </span>
              </div>
              <div className="marquee-set">
                <span className="marquee-item" style={{
                  fontFamily: '"Helvetica Neue LT Std", sans-serif',
                  fontSize: '28px',
                  fontWeight: 250,
                  letterSpacing: '0.56px',
                  textTransform: 'uppercase',
                  color: '#FFF'
                } as any}>DERRIBAR LAS BARRERAS RACIONALES QUE IMPIDEN FLUIR NUESTRA CREATIVIDAD</span>
              </div>
            </div>
          </div>
        </div>

        {/* PORTRAIT PAIR: img10, img11 */}
        <div style={{ position: 'relative', height: '560px', marginTop: '40px', width: '100%' }}>
          <PI speed={0.2} src={IMG_WEB005} alt="" loading="lazy" style={{ position: 'absolute', left: '0', top: '0', width: '200px', height: '270px', objectFit: 'cover' }} />
          <PI speed={0.25} src={IMG_WEB022} alt="" loading="lazy" style={{ position: 'absolute', right: '0', top: '200px', width: '200px', height: '330px', objectFit: 'cover' }} />
        </div>

        {/* VIDEO 1 */}
        <div style={{ position: 'relative', width: '100%', paddingTop: '56.25%', marginTop: '80px' }}>
          <div className="vimeo-container" style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}>
            <CustomVimeoPlayer
              videoUrl="https://player.vimeo.com/video/1186767280?h=ef4894270a"
              title="Más allá del Infinito - Video Arte"
            />
          </div>
        </div>

        {/* img12 (GIF2) */}
        <div style={{ position: 'relative', marginTop: '80px' }}>
          <img src={IMG_GIF2} alt="" loading="lazy" style={{ display: 'block', width: '300px', height: '233px', objectFit: 'cover', marginLeft: '40px', marginRight: '40px' }} />
          {/* Marquee 4 overlay */}
          <div style={{ position: 'absolute', top: '20px', left: 0, width: '100%', height: '40px', overflow: 'hidden', mixBlendMode: 'difference' }}>
            <div className="marquee-track" style={{ animationDuration: `${MARQUEE.speed.medium}s` }}>
              <div className="marquee-set"><span className="marquee-item" style={{ fontFamily: '"Helvetica Neue LT Std", sans-serif', fontSize: '28px', fontWeight: 250, letterSpacing: '0.56px', textTransform: 'uppercase', color: '#FFF', leadingTrim: 'both', textEdge: 'cap' } as any}>¿CÓMO SEGUIR HABITANDO EL PLANETA? </span></div>
              <div className="marquee-set"><span className="marquee-item" style={{ fontFamily: '"Helvetica Neue LT Std", sans-serif', fontSize: '28px', fontWeight: 250, letterSpacing: '0.56px', textTransform: 'uppercase', color: '#FFF', leadingTrim: 'both', textEdge: 'cap' } as any}>¿CÓMO SEGUIR HABITANDO EL PLANETA? </span></div>
            </div>
          </div>
        </div>

        {/* TEXT 4 */}
        <div className="mal-p" style={{ color: '#fff', marginTop: '72px', width: '350px', marginLeft: '20px', fontSize: 'var(--p-size)', fontFamily: '"Space Grotesk", sans-serif', fontWeight: 300, lineHeight: 1.45 }}>
          <p>
            Numerosas cuestiones sobre cómo seguir habitando el planeta quedan abiertas directamente a nuestra sensibilidad sin mediación de palabras. Ciudadana del siglo XXI, Constanza Schwartz, impregna sus raíces en la ambigüedad que nuestra cultura manifiesta entre lo orgánico y lo sintético.
          </p>
        </div>

        {/* img13 (WEB016) + img14 (WEB017) */}
        <div style={{ position: 'relative', height: '550px', marginTop: '72px' }}>
          <PI speed={0.2} src={IMG_WEB016} alt="" loading="lazy" style={{ position: 'absolute', left: '0px', top: '0', width: '200px', height: '300px', objectFit: 'cover', zIndex: 1 }} />
          <img src={IMG_WEB017} alt="" loading="lazy" style={{ position: 'absolute', right: '25px', top: '180px', width: '230px', height: '345px', objectFit: 'contain', zIndex: 2 }} />
        </div>

        {/* FULL WIDTH img15 (WEB018) */}
        <img src={IMG_WEB018} alt="" loading="lazy" style={{ display: 'block', width: '100%', height: '233px', objectFit: 'cover', marginTop: '-30px', }} />

        {/* img16, img17, img18 Staircase */}
        <div style={{ position: 'relative', height: '520px', marginTop: '80px' }}>
          <PI speed={0.15} src={IMG_WEB014_V} alt="" loading="lazy" style={{ position: 'absolute', left: '0', top: '0', width: '140px', height: '210px', objectFit: 'cover', zIndex: 1 }} />
          <img src={IMG_WEB014} alt="" loading="lazy" style={{ position: 'absolute', left: '110px', top: '170px', width: '170px', height: '113px', objectFit: 'cover', zIndex: 3 }} />
          <img src={IMG_WEB013} alt="" loading="lazy" style={{ position: 'absolute', left: '190px', top: '270px', width: '200px', height: '133px', objectFit: 'cover', zIndex: 2 }} />
        </div>

        {/* FULL WIDTH img19 (WEB015) */}
        <img src={IMG_WEB015} alt="" loading="lazy" style={{ display: 'block', width: '100%', height: '233px', objectFit: 'cover', marginTop: '-35px', marginLeft: '0' }} />

        {/* TEXT 5 */}
        <div className="mal-p" style={{ color: '#fff', marginTop: '80px', width: '350px', marginLeft: '20px', fontSize: 'var(--p-size)', fontFamily: '"Space Grotesk", sans-serif', fontWeight: 300, lineHeight: 1.45 }}>
          <p>
            De esas raíces y las tensiones de nuestra vida cotidiana, nuestra cultura sumerge nuestra vida diaria en el triunfo de la ciencia y la técnica excepcionalmente interrumpidas por el verde de algunas plantitas traviesas que asoman en un balcón.
          </p>
        </div>

        {/* img20 (WEB040) + img21 (WEB037) with Marquee 5 overlay */}
        <div style={{ position: 'relative', height: '540px', marginTop: '80px' }}>
          <PI speed={0.2} src={IMG_WEB040} alt="" loading="lazy" style={{ position: 'absolute', right: '20px', top: '0', width: '200px', height: '300px', objectFit: 'cover', zIndex: 1 }} />
          <img src={IMG_WEB037} alt="" loading="lazy" style={{ position: 'absolute', left: '20px', top: '250px', width: '230px', height: '153px', objectFit: 'cover', zIndex: 2 }} />

          {/* Marquee 5 overlay */}
          <div style={{ position: 'absolute', top: '360px', left: 0, width: '100%', height: '40px', overflow: 'hidden', mixBlendMode: 'difference', zIndex: 3 }}>
            <div className="marquee-track" style={{ animationDuration: `${MARQUEE.speed.medium}s` }}>
              <div className="marquee-set"><span className="marquee-item" style={{ fontFamily: '"Helvetica Neue LT Std", sans-serif', fontSize: '28px', fontWeight: 250, letterSpacing: '0.56px', textTransform: 'uppercase', color: '#FFF', leadingTrim: 'both', textEdge: 'cap' } as any}>NUESTRA CULTURA SUMERGE NUESTRA VIDA DIARIA EN EL TRIUNFO DE LA CIENCIA Y LA TÉCNICA </span></div>
              <div className="marquee-set"><span className="marquee-item" style={{ fontFamily: '"Helvetica Neue LT Std", sans-serif', fontSize: '28px', fontWeight: 250, letterSpacing: '0.56px', textTransform: 'uppercase', color: '#FFF', leadingTrim: 'both', textEdge: 'cap' } as any}>NUESTRA CULTURA SUMERGE NUESTRA VIDA DIARIA EN EL TRIUNFO DE LA CIENCIA Y LA TÉCNICA </span></div>
            </div>
          </div>
        </div>



        {/* img22 (WEB039) */}
        <img src={IMG_WEB039} alt="" loading="lazy" style={{ display: 'block', width: '230px', height: '153px', objectFit: 'cover', marginTop: '-55px', marginLeft: '20px' }} />

        {/* CAROUSEL 1 */}
        <div style={{ marginTop: '80px' }}>
          <Carousel images={CAROUSEL_1} id="c1-m" />
        </div>

        {/* TEXT 6 */}
        <div className="mal-p" style={{ color: '#fff', marginTop: '80px', width: '350px', marginLeft: '20px', fontSize: 'var(--p-size)', fontFamily: '"Space Grotesk", sans-serif', fontWeight: 300, lineHeight: 1.45 }}>
          <p>
            La ciencia y la técnica han triunfado hasta participar de la construcción completa de los paisajes de nuestras ciudades. "Más allá del infinito" es una alerta cruda e implacable que subraya los aspectos amenazantes de esta victoria.
          </p>
        </div>

        {/* img23 (WEB050) */}
        <img src={IMG_WEB050} alt="" loading="lazy" style={{ display: 'block', width: '230px', height: '103px', objectFit: 'cover', marginTop: '80px', marginLeft: 'auto', marginRight: '20px' }} />

        {/* TEXT 7 */}
        <div className="mal-p" style={{ color: '#fff', marginTop: '80px', width: '350px', marginLeft: '20px', fontSize: 'var(--p-size)', fontFamily: '"Space Grotesk", sans-serif', fontWeight: 300, lineHeight: 1.45 }}>
          <p>
            La vibración de esta obra persiste en nuestros sentidos, nos impulsa a buscar nuevas respuestas que tal vez están asociadas a las notas de nostalgia distribuidas con inclemencia en diversos rincones de la muestra. Nuestros afectos y la ternura que suele acompañar a la nostalgia serán solo una parte de la respuesta emocional a esta apelación al amor y la cordura.
          </p>
        </div>

        {/* img24 (WEB054) */}
        <img src={IMG_WEB054} alt="" loading="lazy" style={{ display: 'block', width: '100%', height: '233px', objectFit: 'cover', marginTop: '80px', }} />

        {/* CAROUSEL 2 */}
        <div style={{ marginTop: '80px' }}>
          <Carousel images={CAROUSEL_2} id="c2-m" />
        </div>

        {/* QUOTE MARQUEE */}
        <div style={{ marginTop: '40px', height: '40px', overflow: 'hidden' }}>
          <div className="marquee-track" style={{ animationDuration: `${MARQUEE.speed.medium}s` }}>
            <div className="marquee-set"><span className="marquee-item" style={{ fontFamily: '"Helvetica Neue LT Std", sans-serif', fontSize: '28px', fontWeight: 250, letterSpacing: '0.56px', textTransform: 'uppercase', color: '#FFF', leadingTrim: 'both', textEdge: 'cap' } as any}>SI TIENES APEGO A TU CORDURA NO ENTRES · </span></div>
            <div className="marquee-set"><span className="marquee-item" style={{ fontFamily: '"Helvetica Neue LT Std", sans-serif', fontSize: '28px', fontWeight: 250, letterSpacing: '0.56px', textTransform: 'uppercase', color: '#FFF', leadingTrim: 'both', textEdge: 'cap' } as any}>SI TIENES APEGO A TU CORDURA NO ENTRES · </span></div>
          </div>
        </div>
      </div >

    </div >
  )
}
