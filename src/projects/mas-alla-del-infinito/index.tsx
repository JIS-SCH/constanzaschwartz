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
import { GAP, TW, TEXT_BLOCK_STYLE } from '../shared'

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
  return <div className="mal-p" style={{ color: '#fff', ...TEXT_BLOCK_STYLE }}>{children}</div>
}



export { meta } from './meta'


export function Component() {
  // GSAP and Lenis are initialized globally in the layout or scrub.ts

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

        .mal-desktop > section + section { margin-top: ${GAP}; }
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
        <ParallaxSection id="mal-intro">
          {/* Disciplines Marquee — 220px gap from hero */}
          <ParallaxLayer
            layer={{
              type: 'marquee',
              content: 'DIRECCIÓN CREATIVA Y EJECUTIVA  /   ESCENOGRAFÍA  /   DISEÑO LUMÍNICO DE ESPECTÁCULOS  /   DISEÑO SONORO QUINTAFÓNICO  /   DIRECCIÓN DE OBRA',
              speed: 0,
              intensity: 24,
              className: 'mal-marquee-blend mal-h4'
            }}
            position={{ top: '0', left: '0', width: '100%', height: '44px', zIndex: 10 }}
          />

          {/* ANCHOR: Intro text (determines section height) */}
          <div style={{ position: 'relative', marginTop: '264px', marginLeft: '59.2%', width: '467px', zIndex: 2 }}>
            <TextBlock>
              <p className="mal-p" style={{ marginBottom: '1.5rem' }}>
                Dado que la objetividad es un proyecto inalcanzable, Constanza Schwartz crea con el subjetivismo escénico experiencias intensamente subjetivas por las que el espectador participativo puede ir cambiando su inserción y su influencia en su entorno.
              </p>
              <p className="mal-p">
                Somos responsables de los mundos que creamos pero solo en la medida en que aceptamos que nuestra contribución y nuestra influencia va a estar guiada por una extrema subjetividad. La ambición de tratar de ser objetivos nos ha traído demasiadas dificultades y las más diversas guerras. Es necesario para cada uno de nosotros, expandir el territorio de su subjetividad para dar sentido a lo que realmente importa.
              </p>
            </TextBlock>
          </div>

          {/* Left: tall portrait (absolute) */}
          <ParallaxLayer
            layer={{ type: 'image', src: IMG_WEB028 }}
            position={{ top: '349px', left: '8.4%', width: '467px', height: '700px', zIndex: 10 }}
          />

          {/* Sticky marquee — absolute */}
          <ParallaxLayer
            layer={{
              type: 'marquee',
              content: 'Somos responsables de los mundos que creamos',
              speed: 0,
              intensity: 24,
              className: 'mal-marquee-blend mal-h4'
            }}
            position={{ top: '880px', left: '0', width: '100%', height: '56px', zIndex: 11 }}
          />

          {/* web009 center — SECOND ANCHOR to ensure bottom spacing */}
          <div style={{ position: 'relative', marginTop: '224px', marginLeft: '33.8%', width: '710px', height: '473px', zIndex: 1 }}>
            <PI src={IMG_WEB009} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </div>
        </ParallaxSection>

        {/* 3. FULLWIDTH 1 ──────────────────────────────────────────────── */}
        <ParallaxSection id="mal-fw1">
          <div style={{ position: 'relative', width: '100%', aspectRatio: '3/2' }}>
            <img src={IMG_FULL_1} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </div>
        </ParallaxSection>

        {/* 4. COLLAGE 1: web008 right + text2 left + web025 center ────── */}
        <ParallaxSection id="mal-collage1" overflowHidden={false}>
          {/* img4 (WEB008) — absolute */}
          <ParallaxLayer
            layer={{ type: 'image', src: IMG_WEB008 }}
            position={{ top: '-110px', left: '63.33%', width: '23.96%', height: '517px', aspectRatio: '343/514', zIndex: 30 }}
          />

          {/* Text 2 — Absolute */}
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

          {/* ANCHOR: img5 (WEB025) */}
          <div style={{ position: 'relative', marginTop: '809px', marginLeft: '16.87%', width: '66.25%', height: '636px', zIndex: 1 }}>
            <PI src={IMG_WEB025} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </div>

          {/* img6 (IMG_GIF1) — absolute overlapping */}
          <ParallaxLayer
            layer={{ type: 'image', src: IMG_GIF1 }}
            position={{ top: '1400px', left: '4.16%', width: '32.4%', height: '350px', zIndex: 2 }}
          />

          {/* Text 3 — SECOND ANCHOR */}
          <div style={{ position: 'relative', marginTop: '110px', marginLeft: '59.2%', width: '32.4%', zIndex: 2 }}>
            <TextBlock>
              <p className="mal-p" style={{ marginBottom: '1.5rem' }}>
                Extraños testigos de metal espejados nos acompañan incólumes a lo largo de toda esta instalación siendo una compañía fiel entre las múltiples simbolizaciones abstractas que nos rodean.
              </p>
              <p className="mal-p" style={{ marginBottom: '1.5rem' }}>
                ¿De dónde viene la electricidad que fluye hacia las pantallas de nuestros televisores, notebooks, computadoras, teléfonos?
              </p>
              <p className="mal-p">Tan familiares.</p>
            </TextBlock>
          </div>
        </ParallaxSection>

        {/* 5. PHOTOS CLUSTER 1 ─────────────────────────────────────────── */}
        <ParallaxSection id="mal-cluster1" >
          {/* Sticky marquee 2 — absolute behind */}
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

          {/* Absolute images staircase (wrapped to create flow) */}
          <div style={{ position: 'relative', height: '817px' }}>
            <ParallaxLayer
              layer={{ type: 'image', src: IMG_WEB012 }}
              position={{ top: '0px', left: '4.16%', width: '23.96%', height: '517px', aspectRatio: '343/514', zIndex: 1 }}
            />
            <ParallaxLayer
              layer={{ type: 'image', src: IMG_WEB011 }}
              position={{ top: '150px', left: '38%', width: '23.96%', height: '517px', aspectRatio: '343/514', zIndex: 1 }}
            />
            <ParallaxLayer
              layer={{ type: 'image', src: IMG_WEB007 }}
              position={{ top: '300px', left: '71.8%', width: '23.96%', height: '517px', aspectRatio: '343/514', zIndex: 1 }}
            />
          </div>

          {/* ANCHOR: img10 (WEB005) — 220px gap from staircase end */}
          <div style={{ position: 'relative', marginTop: '170px', marginLeft: '8.47%', width: '467px', height: '700px', zIndex: 1 }}>
            <PI src={IMG_WEB005} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </div>

          {/* img11 (WEB022) — Absolute staggered (relative to section top, so it overlaps img10 correctly) */}
          <ParallaxLayer
            layer={{ type: 'image', src: IMG_WEB022 }}
            position={{ top: '1350px', left: '33.82%', width: '468px', height: '701px', zIndex: 2 }}
          />
        </ParallaxSection>

        <ParallaxSection id="mal-video1" style={{ marginTop: '530px' }}>
          {/* ANCHOR: Video 1 */}
          <div style={{ position: 'relative', left: '0', width: '100%', height: '810px', zIndex: 2 }}>
            <div className="vimeo-container" style={{ width: '100%', height: '100%' }}>
              <CustomVimeoPlayer
                videoUrl="https://player.vimeo.com/video/1186767280?h=ef4894270a"
                title="Más allá del Infinito - Video Arte"
              />
            </div>
          </div>
        </ParallaxSection>

        {/* 7. GIF 2 + MARQUEE 3 ────────────────────────────────────────── */}
        <ParallaxSection id="mal-gif2"  >
          {/* ANCHOR: GIF 2 center wide */}
          <div style={{ position: 'relative', marginTop: '30px', marginLeft: '16.88%', width: '954px', height: '636px', zIndex: 1 }}>
            <img src={IMG_GIF2} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </div>

          {/* Sticky marquee 3 — absolute */}
          <ParallaxLayer
            layer={{
              type: 'marquee',
              content: '¿CÓMO SEGUIR HABITANDO EL PLANETA?',
              speed: 0,
              intensity: 24,
              className: 'mal-marquee-blend mal-h4'
            }}
            position={{ top: '115px', left: '0', width: '100%', height: '56px', zIndex: 3 }}
          />
        </ParallaxSection>

        {/* 8. TEXT 4 ──────────────────────────────────────────────────── */}
        <ParallaxSection id="mal-text4">
          {/* ANCHOR: Text 4 right */}
          <div style={{ position: 'relative', marginTop: '-10px', marginLeft: '59.02%', width: '467px', zIndex: 2, marginBottom: '-56px' }}>
            <TextBlock>
              <p className="mal-p">
                Numerosas cuestiones sobre cómo seguir habitando el planeta quedan abiertas directamente a nuestra sensibilidad sin mediación de palabras. Requiere, sin duda, de una integración de nuestro sentir y pensar. Ciudadana del siglo XXI, Constanza Schwartz, impregna sus raíces en la ambigüedad que nuestra cultura manifiesta entre lo orgánico y lo sintético, la literatura y las computadoras y por qué no, las magníficas y aterradoras creaciones de la inteligencia artificial.
              </p>
            </TextBlock>
          </div>
        </ParallaxSection>

        {/* 9. PHOTOS CLUSTER 2 ─────────────────────────────────────────── */}
        <ParallaxSection id="mal-cluster2" style={{ marginBottom: '-66px' }}>
          {/* img16 (WEB016) — Absolute */}
          <ParallaxLayer
            layer={{ type: 'image', src: IMG_WEB016 }}
            position={{ top: '20px', left: '29.51%', width: '345px', height: '517px', zIndex: 1 }}
          />
          {/* ANCHOR: img17 (WEB017) — Staggered landscape */}
          <div style={{ position: 'relative', marginTop: '258px', marginLeft: '50.17%', width: '588px', height: '441px', zIndex: 2 }}>
            <PI src={IMG_WEB017} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </div>
        </ParallaxSection>

        <ParallaxSection id="mal-fw2" style={{ marginBottom: '-142px' }}>
          {/* ANCHOR: img15 */}
          <div style={{ position: 'relative', marginTop: '59px', left: '0', width: '100%', height: '960px', aspectRatio: '3/2', zIndex: 1 }}>
            <img src={IMG_WEB018} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </div>
        </ParallaxSection>

        {/* 11. PHOTOS CLUSTER 3 ────────────────────────────────────────── */}
        <ParallaxSection id="mal-collage2" style={{ marginBottom: '450px' }}>
          {/* img16 (Vertical) — Vertical on left (Absolute) */}
          <ParallaxLayer
            layer={{ type: 'image', src: IMG_WEB014_V }}
            position={{ top: '100px', left: '8.47%', width: '345px', height: '517px', zIndex: 1 }}
          />
          {/* ANCHOR: img17 (Horizontal) — Middle staggered */}
          <div style={{ position: 'relative', marginTop: '500px', marginLeft: '28.19%', width: '467px', height: '311px', zIndex: 2 }}>
            <PI src={IMG_WEB014} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </div>
          {/* img18 (Horizontal) — Bottom staggered (Absolute) */}
          <ParallaxLayer
            layer={{ type: 'image', src: IMG_WEB013 }}
            position={{ top: '720px', left: '50.17%', width: '588px', height: '392px', zIndex: 1 }}
          />
        </ParallaxSection>

        {/* 12. FULLWIDTH 3 (img19) ────────────────────────────────── */}
        <ParallaxSection id="mal-fw3" style={{ marginBottom: '-26px' }}>
          {/* ANCHOR: img19 */}
          <div style={{ position: 'relative', marginTop: '77px', left: '0', width: '100%', height: '960px', aspectRatio: '3/2', zIndex: 1 }}>
            <img src={IMG_WEB015} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </div>
        </ParallaxSection>

        {/* 13. COMPLEX FINAL CLUSTER (img20, 21) ──────────────────────── */}
        <ParallaxSection id="mal-final-cluster">
          {/* ANCHOR: Paragraph left */}
          <div style={{ position: 'relative', marginTop: '230px', marginLeft: '10.69%', width: '467px', zIndex: 1 }}>
            <TextBlock>
              <p className="mal-p">
                De esas raíces y las tensiones de nuestra vida cotidiana, nuestra cultura sumerge nuestra vida diaria en el triunfo de la ciencia y la técnica excepcionalmente interrumpidas por el verde de algunas plantitas traviesas que asoman en un balcón.
              </p>
            </TextBlock>
          </div>

          {/* Marquee behind images (Absolute) */}
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

          {/* img20 (WEB040) right portrait (Absolute) */}
          <ParallaxLayer
            layer={{ type: 'image', src: IMG_WEB040 }}
            position={{ top: '0', left: '59.09%', width: '467px', height: '700px', zIndex: 1 }}
          />

          {/* ANCHOR 2: img21 (WEB037) center-bottom staggered landscape */}
          <div style={{ position: 'relative', marginTop: '230px', marginLeft: '38.5%', width: '467px', height: '311px', zIndex: 2 }}>
            <PI src={IMG_WEB037} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </div>
        </ParallaxSection>

        <ParallaxSection id="mal-img22">
          {/* ANCHOR: img22 */}
          <div style={{ position: 'relative', marginTop: '0', marginLeft: '7.64%', width: '831px', height: '554px', aspectRatio: '3/2', zIndex: 1 }}>
            <img src={IMG_WEB039} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </div>
        </ParallaxSection>

        {/* 16. CAROUSEL 1 ─────────────────────────────────────────────── */}
        <ParallaxSection id="mal-carousel-1">
          {/* ANCHOR: Carousel 1 */}
          <div style={{ position: 'relative', marginTop: '0', left: '0', width: '100%', height: '333px', zIndex: 1 }}>
            <Carousel images={CAROUSEL_1} id="c1" />
          </div>
        </ParallaxSection>


        {/* 17. FINAL SEQUENCE: TEXT - PHOTO 23 - TEXT ────────────────── */}
        <ParallaxSection id="mal-final-sequence">
          {/* ANCHOR: Text 6 - Right aligned */}
          <div style={{ position: 'relative', marginTop: '-10px', marginLeft: '59.16%', width: '467px', zIndex: 1 }}>
            <TextBlock>
              <p className="mal-p">
                La ciencia y la técnica han triunfado hasta participar de la construcción completa de los paisajes de nuestras ciudades. "Más allá del infinito" es una alerta cruda e implacable que subraya los aspectos amenazantes de esta victoria.
              </p>
            </TextBlock>
          </div>

          {/* ANCHOR 2: img23 */}
          <div style={{ position: 'relative', marginTop: '170px', marginLeft: '28%', width: '923px', height: '430px', zIndex: 1 }}>
            <PI src={IMG_WEB050} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </div>

          {/* ANCHOR 3: Text 7 - Left aligned */}
          <div style={{ position: 'relative', marginTop: '220px', marginLeft: '26.67%', width: '467px', zIndex: 1 }}>
            <TextBlock>
              <p className="mal-p">
                La vibración de esta obra persiste en nuestros sentidos, nos impulsa a buscar nuevas respuestas que tal vez están asociadas a las notas de nostalgia distribuidas con inclemencia en diversos rincones de la muestra. Nuestros afectos y la ternura que suele acompañar a la nostalgia serán solo una parte de la respuesta emocional a esta apelación al amor y la cordura.
              </p>
            </TextBlock>
          </div>
        </ParallaxSection>

        {/* 18. img24 (Wide) ───────────────────────────────────────────── */}
        <ParallaxSection id="mal-finish-img-24" style={{ marginTop: '180px' }}>
          <div style={{ position: 'relative', width: '100%', height: '810px', zIndex: 1 }}>
            <PI src={IMG_WEB054} speed={0} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </div>
        </ParallaxSection>

        {/* 19. FINAL SECTION: CAROUSEL 2, QUOTE & CREDITS ───────────────── */}
        <ParallaxSection id="mal-finish-footer" overflowHidden={false} style={{ marginTop: '260px' }}>
          {/* ANCHOR: Carousel 2 */}
          <div style={{ position: 'relative', marginTop: '0', left: '0', width: '100%', height: '333px', zIndex: 1 }}>
            <Carousel images={CAROUSEL_2} id="c2-final" />
          </div>

          {/* ANCHOR 2: Quote */}
          <div style={{ position: 'relative', marginTop: '-30px', width: '100%', zIndex: 3 }}>
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
          </div>

          {/* ANCHOR 3: Credits */}
          <div style={{
            position: 'relative',
            marginTop: '180px',
            color: '#fff',
            width: '100%',
            maxWidth: 'none',
            paddingLeft: '3px',
            paddingRight: '3px',
            paddingTop: '20px',
            paddingBottom: '0px',
            mixBlendMode: 'difference',
            transform: 'translateZ(0)',
            textAlign: 'left'
          }}>
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
        </ParallaxSection>

      </div>{/* /mal-desktop */}

      {/* ── MAS ALLA MOBILE ─────────────────────────────────────────────── */}
      <div className="mal-mobile" style={{ backgroundColor: '#0F0F0F', overflow: 'visible', paddingBottom: '40px' }}>

        {/* HERO */}
        <div data-project-image style={{ position: 'relative', height: '85vh', minHeight: '600px' }}>
          <img src={ASSETS.heroMobile} alt="" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
        </div>

        {/* TEXT 1 */}
        <div style={{ color: '#fff', marginTop: '80px', width: 'calc(100% - 40px)', marginLeft: '20px' }}>
          <TextBlock>
            <p style={{ marginBottom: '1.5rem' }}>
              Dado que la objetividad es un proyecto inalcanzable, Constanza Schwartz crea con el subjetivismo escénico experiencias intensamente subjetivas por las que el espectador participativo puede ir cambiando su inserción y su influencia en su entorno.
            </p>
            <p>
              Somos responsables de los mundos que creamos pero solo en la medida en que aceptamos que nuestra contribución y nuestra influencia va a estar guiada por una extrema subjetividad.
            </p>
          </TextBlock>
        </div>

        {/* FIRST PAIR: img1 (WEB009) + img2 (WEB028) */}
        <div style={{ position: 'relative', marginTop: '80px', width: '100%' }}>
          <div style={{ width: 'calc(100% - 40px)', marginLeft: '20px', aspectRatio: '3/2' }}>
            <img src={IMG_WEB009} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </div>
          <div style={{ position: 'relative', marginTop: '-100px', marginLeft: 'auto', marginRight: '20px', width: '200px', height: '300px', zIndex: 2 }}>
            <PI src={IMG_WEB028} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </div>

          {/* Marquee overlay */}
          <div style={{ position: 'absolute', bottom: '20px', left: 0, width: '100%', height: '40px', overflow: 'hidden', zIndex: 3, mixBlendMode: 'difference' }}>
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
            </div>
          </div>
        </div>

        {/* SECOND PAIR: img3 (FULL_1) + img4 (WEB008) */}
        <div style={{ position: 'relative', marginTop: '80px' }}>
          <div style={{ width: '100%', aspectRatio: '3/2' }}>
            <img src={IMG_FULL_1} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </div>
          <div style={{ position: 'absolute', right: '20px', bottom: '-100px', width: '170px', height: '255px', zIndex: 2 }}>
            <PI src={IMG_WEB008} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </div>
        </div>

        {/* TEXT 2 */}
        <div style={{ color: '#fff', marginTop: '180px', width: 'calc(100% - 40px)', marginLeft: '20px' }}>
          <TextBlock>
            <p style={{ marginBottom: '1.5rem' }}>
              La obra de Constanza, instaura el horror en la apelación estática a derribar las barreras racionales que impiden fluir nuestra creatividad.
            </p>
            <p>
              Un reactor nuclear hiperrealista permite acercar nuestro cuerpo, y con él nuestra sensibilidad a una distancia de la fuente radioactiva prohibida hasta hoy. Los horrores de su existencia son velozmente atenuados por un bosque de acrílico, altar en homenaje a nuestros orígenes.
            </p>
          </TextBlock>
        </div>
        {/* THIRD PAIR: img5 (WEB025) + img6 (GIF1) */}
        <div style={{ position: 'relative', marginTop: '80px', width: '100%' }}>
          <div style={{ width: 'calc(100% - 40px)', marginLeft: '20px', aspectRatio: '3/2' }}>
            <PI src={IMG_WEB025} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </div>
          <div style={{ position: 'relative', marginTop: '-60px', marginLeft: '20px', width: '170px', height: '113px', zIndex: 2 }}>
            <img src={IMG_GIF1} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </div>
        </div>

        {/* TEXT 3 */}
        <div style={{ color: '#fff', marginTop: '40px', width: 'calc(100% - 40px)', marginLeft: '20px' }}>
          <TextBlock>
            <p style={{ marginBottom: '1.5rem' }}>
              Extraños testigos de metal espejados nos acompañan incólumes a lo largo de toda esta instalación siendo una compañía fiel entre las múltiples simbolizaciones abstractas que nos rodean.
            </p>
            <p>¿De dónde viene la electricidad que fluye hacia las pantallas?</p>
          </TextBlock>
        </div>

        {/* STAIRCASE */}
        <div style={{ position: 'relative', marginTop: '80px', height: '540px' }}>
          <PI src={IMG_WEB012} alt="" style={{ position: 'absolute', left: '20px', top: '0', width: '140px', height: '210px' }} />
          <PI src={IMG_WEB011} alt="" style={{ position: 'absolute', left: '115px', top: '140px', width: '140px', height: '210px' }} />
          <PI src={IMG_WEB007} alt="" style={{ position: 'absolute', left: '210px', top: '280px', width: '140px', height: '210px' }} />

          {/* Marquee overlay */}
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
            </div>
          </div>
        </div>

        {/* PORTRAIT PAIR */}
        <div style={{ position: 'relative', marginTop: '40px', height: '560px', width: '100%' }}>
          <PI src={IMG_WEB005} alt="" style={{ position: 'absolute', left: '0', top: '0', width: '200px', height: '270px' }} />
          <PI src={IMG_WEB022} alt="" style={{ position: 'absolute', right: '0', top: '200px', width: '200px', height: '330px' }} />
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

        {/* GIF 2 */}
        <div style={{ position: 'relative', marginTop: '80px' }}>
          <div style={{ width: 'calc(100% - 40px)', marginLeft: '20px', aspectRatio: '3/2' }}>
            <img src={IMG_GIF2} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </div>
          <div style={{ position: 'absolute', top: '20px', left: 0, width: '100%', height: '40px', overflow: 'hidden', mixBlendMode: 'difference' }}>
            <div className="marquee-track" style={{ animationDuration: `${MARQUEE.speed.medium}s` }}>
              <div className="marquee-set">
                <span className="marquee-item" style={{ fontFamily: '"Helvetica Neue LT Std", sans-serif', fontSize: '28px', fontWeight: 250, letterSpacing: '0.56px', textTransform: 'uppercase', color: '#FFF' } as any}>
                  ¿CÓMO SEGUIR HABITANDO EL PLANETA?
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* TEXT 4 */}
        <div style={{ color: '#fff', marginTop: '40px', width: 'calc(100% - 40px)', marginLeft: '20px' }}>
          <TextBlock>
            <p>
              Numerosas cuestiones sobre cómo seguir habitando el planeta quedan abiertas directamente a nuestra sensibilidad sin mediación de palabras. Ciudadana del siglo XXI, Constanza Schwartz, impregna sus raíces en la ambigüedad que nuestra cultura manifiesta entre lo orgánico y lo sintético.
            </p>
          </TextBlock>
        </div>

        {/* CLUSTER 2 */}
        <div style={{ position: 'relative', height: '550px', marginTop: '40px' }}>
          <PI src={IMG_WEB016} alt="" style={{ position: 'absolute', left: '0px', top: '0', width: '200px', height: '300px' }} />
          <PI src={IMG_WEB017} alt="" style={{ position: 'absolute', right: '20px', top: '180px', width: '230px', height: '345px' }} />
        </div>

        {/* FULL WIDTH */}
        <div style={{ width: '100%', aspectRatio: '3/2', marginTop: '40px' }}>
          <img src={IMG_WEB018} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        </div>

        {/* STAIRCASE 2 */}
        <div style={{ position: 'relative', height: '520px', marginTop: '80px' }}>
          <PI src={IMG_WEB014_V} alt="" style={{ position: 'absolute', left: '0', top: '0', width: '140px', height: '210px' }} />
          <img src={IMG_WEB014} alt="" style={{ position: 'absolute', left: '110px', top: '170px', width: '170px', height: '113px', objectFit: 'cover', zIndex: 3 }} />
          <img src={IMG_WEB013} alt="" style={{ position: 'absolute', left: '190px', top: '270px', width: '200px', height: '133px', objectFit: 'cover', zIndex: 2 }} />
        </div>

        {/* FINISH */}
        <div style={{ marginTop: '80px' }}>
          <div style={{ width: '100%', aspectRatio: '3/2' }}>
            <img src={IMG_WEB015} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </div>

          <div style={{ color: '#fff', marginTop: '80px', width: 'calc(100% - 40px)', marginLeft: '20px' }}>
            <TextBlock>
              <p>
                De esas raíces y las tensiones de nuestra vida cotidiana, nuestra cultura sumerge nuestra vida diaria en el triunfo de la ciencia y la técnica excepcionalmente interrumpidas por el verde de algunas plantitas traviesas que asoman en un balcón.
              </p>
            </TextBlock>
          </div>

          <div style={{ position: 'relative', height: '540px', marginTop: '80px' }}>
            <PI src={IMG_WEB040} alt="" style={{ position: 'absolute', right: '20px', top: '0', width: '200px', height: '300px' }} />
            <PI src={IMG_WEB037} alt="" style={{ position: 'absolute', left: '20px', top: '250px', width: '230px', height: '153px' }} />

            {/* Marquee overlay */}
            <div style={{ position: 'absolute', top: '360px', left: 0, width: '100%', height: '40px', overflow: 'hidden', mixBlendMode: 'difference', zIndex: 3 }}>
              <div className="marquee-track" style={{ animationDuration: `${MARQUEE.speed.medium}s` }}>
                <div className="marquee-set">
                  <span className="marquee-item" style={{ fontFamily: '"Helvetica Neue LT Std", sans-serif', fontSize: '28px', fontWeight: 250, letterSpacing: '0.56px', textTransform: 'uppercase', color: '#FFF' } as any}>NUESTRA CULTURA SUMERGE NUESTRA VIDA DIARIA EN EL TRIUNFO DE LA CIENCIA Y LA TÉCNICA </span>
                </div>
              </div>
            </div>
          </div>

          <div style={{ width: '100%', aspectRatio: '3/2', marginTop: '40px' }}>
            <img src={IMG_WEB054} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </div>

          <div style={{ marginTop: '80px' }}>
            <Carousel images={CAROUSEL_2} id="c-mobile-final" />
          </div>

          <div style={{ color: '#fff', marginTop: '80px', padding: '20px' }}>
            <p style={{
              textTransform: 'uppercase',
              fontFamily: '"Helvetica Neue LT Std", sans-serif',
              fontSize: '32px',
              fontWeight: 200,
              lineHeight: '1.1',
            }}>
              SI TIENES APEGO A TU<br />CORDURA, NO ENTRES.
            </p>

            <div style={{ marginTop: '60px', height: '40px', overflow: 'hidden' }}>
              <div className="marquee-track" style={{ animationDuration: `${MARQUEE.speed.medium}s` }}>
                <div className="marquee-set">
                  <span className="marquee-item" style={{ fontFamily: '"Helvetica Neue LT Std", sans-serif', fontSize: '28px', fontWeight: 250, letterSpacing: '0.56px', textTransform: 'uppercase', color: '#FFF' } as any}>SI TIENES APEGO A TU CORDURA NO ENTRES · </span>
                </div>
              </div>
            </div>

            <p style={{
              marginTop: '60px',
              fontFamily: '"Space Grotesk", sans-serif',
              fontSize: '14px',
              lineHeight: '1.5',
              fontWeight: 300,
              opacity: 0.8
            }}>
              <span style={{ fontWeight: 500 }}>“MÁS ALLÁ DEL INFINITO”</span> por Constanza Schwartz<br />
              <span style={{ fontWeight: 500 }}>Acompañamiento Conceptual:</span> Graciela Peyrú<br />
              <span style={{ fontWeight: 500 }}>Composición Sonora:</span> Francisco Rousset Osio<br />
              <span style={{ fontWeight: 500 }}>Diseño Lumínico:</span> Renzo Salces<br />
              <span style={{ fontWeight: 500 }}>Registro Audiovisual:</span> Martín Rois
            </p>
          </div>
        </div>
      </div >

    </div >
  )
}
