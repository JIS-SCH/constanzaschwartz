'use client'

import { ParallaxSection } from '@/src/components/parallax/ParallaxSection'
import { ParallaxLayer } from '@/src/components/parallax/ParallaxLayer'
import { ASSETS } from './assets'
import { TW, TEXT_BLOCK_STYLE, CH, HERO_TOP } from '../shared'

export { meta } from './meta'

const TITLE_STYLE: React.CSSProperties = {
  fontFamily: '"Helvetica Neue LT Std", "Helvetica Neue", Helvetica, Arial, sans-serif',
  fontWeight: 100,
  color: '#fff',
  textTransform: 'uppercase',
  lineHeight: 1,
}

const P_CAVE =
  'Venimos a este espacio a cuestionar la fijeza de algunas ideas, imágenes, estereotipos divisorios que generan la ilusión de permanencia. Los infinitos puntos que construyen la recta se van a soltar ante nuestros ojos. '

const P_RITUAL =
  'La luz se apaga, todo se disuelve.\nLa caverna desaparece,\nel ritmo se interrumpe.\nY en ese vaivén constante,\nse funda un nuevo ritual:\nun Ritual al Vacío.'
const P_QUESTION =
  '¿Y qué es un ritual cuando ya no convoca, cuando no transforma, cuando sólo queda la forma vacía como una piel transparente, invisible colgando del tiempo?'

const P_UMBRAL =
  'Una posibilidad. Como umbral donde el símbolo se repite hasta volverse ausencia, y la ausencia, nuevamente, forma.'
const P_CAVERNA =
  'La caverna de luz que sólo existe cuando se enciende.'

const P_VACIO =
  'Desarmemos para percibir las engañosas imágenes, recuerdos y asociaciones de las totalidades. El valor de lo oscuro y la luz. Exponernos a habitar la experiencia de integrar la desintegración en nuestras percepciones de los otros y de nosotros mismos.'

const P_MENTE =
  'La mente creativa no ve en un cuenco vacío algo sin valor, sino que lo percibe como algo en un estado transitorio, a la espera del contenido que terminará por colmarlo. El vacío no es algo inexistente, sino un elemento eminentemente dinámico y activo. '
const P_APELA =
  'Esta obra apela al lugar donde se operan las transformaciones. Identificar sentimientos que van desde la ambigüedad hasta la ansiedad, el temor, la angustia, ser descartable y reflexionar sobre las situaciones que debemos enfrentar permanentemente en la compleja modernidad de nuestros tiempos.'

export function Component() {
  return (
    <div style={{ width: '100%', position: 'relative', backgroundColor: '#0F0F0F', marginTop: '-80px' }} className="mutek-container">
      <style dangerouslySetInnerHTML={{
        __html: `
        /* MUTEK overrides - use global tokens from globals.css */

        .mutek-h1, .mutek-h2, .mutek-h3 { font-family: 'Helvetica Neue LT Std', 'Helvetica Neue', Helvetica, Arial, sans-serif; font-weight: 100; }
        .mutek-h1 { font-size: var(--h1-size); line-height: var(--h1-lh); letter-spacing: var(--h1-ls); }
        .mutek-h2 { font-size: var(--h2-size); line-height: var(--h2-lh); letter-spacing: var(--h2-ls); }
        .mutek-h3 { font-size: var(--h3-size); line-height: var(--h3-lh); letter-spacing: var(--h3-ls); }
        .mutek-h4 { font-size: var(--h4-size); line-height: var(--h4-lh); font-family: 'Helvetica Neue LT Std', 'Helvetica Neue', Helvetica, Arial, sans-serif; font-weight: 300; letter-spacing: var(--h4-ls); }
        .mutek-list { font-size: var(--list-size); line-height: var(--list-lh); font-family: 'Helvetica Neue LT Std', 'Helvetica Neue', Helvetica, Arial, sans-serif; font-weight: 300; letter-spacing: var(--list-ls); }
        .mutek-p { font-size: var(--p-size); line-height: var(--p-lh); font-family: 'Space Grotesk', sans-serif; font-weight: 300; letter-spacing: var(--p-ls); }
        .mutek-credits { font-size: var(--h5-size); font-family: 'Helvetica Neue LT Std', 'Helvetica Neue', Helvetica, Arial, sans-serif; font-weight: 100; letter-spacing: var(--h5-ls); }

        /* Marquee gap fix: designer requested 80px between phrases on desktop */
        .mutek-container .marquee-item { padding-right: 80px !important; }

        /* Marquees over imagery use difference blend like the navbar */
        .mutek-marquee-blend {
          mix-blend-mode: difference;
          -webkit-mix-blend-mode: difference;
          transform: translateZ(0);
          isolation: isolate;
        }

        .mutek-desktop { display: block; }
        .mutek-mobile  { display: none; }
        @media (max-width: 1023px) {
          .mutek-desktop { display: none; }
          .mutek-mobile  { display: block; }
          /* Mobile marquee gap = 40px per Figma annotation */
          .mutek-container .marquee-item { padding-right: 40px !important; padding-left: 0 !important; }
        }

        /* Carousel — chair-style horizontal scroll, refs Cloudinary asset later */
        @keyframes mutek-carousel-scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-${3 * 588}px); }
        }
        .mutek-animate-carousel {
          animation: mutek-carousel-scroll 14s linear infinite;
        }
      `}} />

      <div className="mutek-desktop">
        {/* 1. HERO — Full-width image, fit so the baked-in title + credits stay visible. */}
        <ParallaxSection id="hero" style={{ minHeight: '115vh' }}>
          <ParallaxLayer
            sectionId="hero"
            layerIndex={0}
            layer={{ type: 'image', src: ASSETS.hero, speed: 0.8, isHero: true, objectFit: 'contain' }}
            position={{ top: '80px', left: '4.17%', width: '91.66%', height: '80vh', zIndex: 0 }}
          />
        </ParallaxSection>

        {/* 2. INTRO PARAGRAPH + COLLAGE 1 (img1 left tall, img2 portrait below, RITUAL AL VACÍO right) */}
        <ParallaxSection id="intro" style={{ minHeight: '160vh' }}>
          {/* Intro paragraph — left, 466 wide */}
          <ParallaxLayer
            sectionId="intro"
            layerIndex={0}
            layer={{ type: 'text', content: '', speed: 0 }}
            position={{ top: '15vh', left: '8.47%', width: TW, height: 'auto', zIndex: 2 }}
          >
            <div style={TEXT_BLOCK_STYLE} className="mutek-p">
              En el marco del festival internacional Mutek dedicada a la promoción de la música electrónica y las artes digitales en Argentina, como Sideshow, Constanza Schwartz en dupla con Francisco Rousset Osio, crearon un show de música e iluminación ao vivo para los espectadores participativos que se adentraban a la instalación. Convocados por COMITÉ357, este proyecto fue promovido por ARTLAB.
            </div>
          </ParallaxLayer>

          {/* Image 1 — left, tall */}
          <ParallaxLayer
            sectionId="intro"
            layerIndex={1}
            layer={{ type: 'image', src: ASSETS.img1, speed: 0.3 }}
            position={{ top: '55vh', left: '8.47%', width: '24%', height: '65vh', zIndex: 1 }}
          />

          {/* RITUAL AL VACÍO title — right column */}
          <ParallaxLayer
            sectionId="intro"
            layerIndex={2}
            layer={{ type: 'text', content: '', speed: 0 }}
            position={{ top: '65vh', left: '54.9%', width: TW, height: 'auto', zIndex: 2 }}
          >
            <h2 style={TITLE_STYLE} className="mutek-h3">RITUAL AL VACÍO</h2>
            <div style={{ ...TEXT_BLOCK_STYLE, marginTop: '2.5rem' }} className="mutek-p">
              Desde nuestros comienzos, protegidos por las cavernas, las llamas danzantes proyectaban juegos de luces sobre las paredes envueltas en imágenes con anhelos de permanencia, creando un mundo de formas efímeras que parecían moverse con vida propia.
            </div>
          </ParallaxLayer>

          <ParallaxLayer
            sectionId="intro"
            layerIndex={3}
            layer={{ type: 'image', src: ASSETS.img2, speed: 0.3 }}
            position={{ top: '85vh', left: '33.8%', width: '24%', height: '65vh', zIndex: 2 }}
          />
        </ParallaxSection>

        <ParallaxSection id="text-block-1" style={{ minHeight: 'calc(56.25vw + 80vh)' }}>
          <ParallaxLayer
            sectionId="text-block-1"
            layerIndex={0}
            layer={{ type: 'text', content: '', speed: 0 }}
            position={{ top: '6vh', left: '54.9%', width: TW, height: 'auto', zIndex: 2 }}
          >
            <div style={TEXT_BLOCK_STYLE} className="mutek-p">
              {P_CAVE}
            </div>
          </ParallaxLayer>

          {/* Full-width image */}
          <ParallaxLayer
            sectionId="text-block-1"
            layerIndex={1}
            layer={{ type: 'video', src: ASSETS.vid1, speed: 0.3 }}
            position={{ top: '32vh', left: '0', width: '100%', height: '56.25vw', zIndex: 1 }}
          />

          {/* Text left — 466 wide, 183 from left */}
          <ParallaxLayer
            sectionId="text-block-1"
            layerIndex={2}
            layer={{ type: 'text', content: '', speed: 0 }}
            position={{ top: 'calc(32vh + 56.25vw + 15vh)', left: '12.7%', width: TW, height: 'auto', zIndex: 2 }}
          >
            <div style={TEXT_BLOCK_STYLE} className="mutek-p">
              {P_VACIO}
            </div>
          </ParallaxLayer>
        </ParallaxSection>

        {/* 4. IMAGE 831 + MARQUEE (difference blend) + IMAGE 345 PORTRAIT RIGHT */}
        <ParallaxSection id="marquee-1" style={{ minHeight: '110vh' }}>
          {/* Image 831 wide */}
          <ParallaxLayer
            sectionId="marquee-1"
            layerIndex={0}
            layer={{ type: 'image', src: ASSETS.img3, speed: 0.3 }}
            position={{ top: '8vh', left: '12.7%', width: '57.7%', height: '70vh', zIndex: 1 }}
          />

          {/* Marquee — difference blend, overlapping image */}
          <ParallaxLayer
            sectionId="marquee-1"
            layerIndex={1}
            layer={{ type: 'marquee', content: 'COMO UNA CAVERNA SUSPENDIDA EN LO INVISIBLE, ENVUELTA EN PROYECCIONES TRASLÚCIDAS DE LUZ.', speed: 0, className: 'mutek-marquee-blend' }}
            position={{ top: '60vh', left: '0', width: '100%', height: '8vh', zIndex: 3 }}
          />

          {/* Image 345 portrait right */}
          <ParallaxLayer
            sectionId="marquee-1"
            layerIndex={2}
            layer={{ type: 'image', src: ASSETS.img4, speed: 0.3 }}
            position={{ top: '52vh', left: '64%', width: '24%', height: '32vh', zIndex: 2 }}
          />
        </ParallaxSection>

        {/* 5. COLLAGE — IMAGE 710 LEFT + TEXT RIGHT */}
        <ParallaxSection id="collage-2" style={{ minHeight: '110vh' }}>
          {/* Image 710 wide left */}
          <ParallaxLayer
            sectionId="collage-2"
            layerIndex={0}
            layer={{ type: 'image', src: ASSETS.img5, speed: 0.3 }}
            position={{ top: '8vh', left: '0', width: '49.3%', height: '60vh', zIndex: 1 }}
          />

          {/* Right text block ("La luz se apaga...") */}
          <ParallaxLayer
            sectionId="collage-2"
            layerIndex={1}
            layer={{ type: 'text', content: '', speed: 0 }}
            position={{ top: '32vh', left: '54.9%', width: TW, height: 'auto', zIndex: 2 }}
          >
            <div style={TEXT_BLOCK_STYLE} className="mutek-p">
              {P_RITUAL}
            </div>
          </ParallaxLayer>

          {/* Image 831 centered, right-aligned per designer note */}
          <ParallaxLayer
            sectionId="collage-2"
            layerIndex={2}
            layer={{ type: 'image', src: ASSETS.img6, speed: 0.3 }}
            position={{ top: '78vh', left: '34%', width: '57.7%', height: '60vh', zIndex: 1 }}
          />
        </ParallaxSection>

        {/* 6. PORTRAIT 345 + TEXT — "¿Y qué es un ritual..." */}
        <ParallaxSection id="text-block-2" style={{ minHeight: '90vh' }}>
          {/* Image 345 portrait */}
          <ParallaxLayer
            sectionId="text-block-2"
            layerIndex={0}
            layer={{ type: 'image', src: ASSETS.img7, speed: 0.3 }}
            position={{ top: '5vh', left: '20%', width: '24%', height: '40vh', zIndex: 1 }}
          />

          {/* Text "¿Y qué es un ritual cuando ya no convoca..." */}
          <ParallaxLayer
            sectionId="text-block-2"
            layerIndex={1}
            layer={{ type: 'text', content: '', speed: 0 }}
            position={{ top: '52vh', left: '46.5%', width: TW, height: 'auto', zIndex: 2 }}
          >
            <div style={TEXT_BLOCK_STYLE} className="mutek-p">
              {P_QUESTION}
            </div>
          </ParallaxLayer>
        </ParallaxSection>

        {/* 7. TEXT LEFT + IMAGE 467 RIGHT + MARQUEE (difference blend) */}
        <ParallaxSection id="marquee-2" style={{ minHeight: '120vh' }}>
          {/* Left text "La mente creativa..." */}
          <ParallaxLayer
            sectionId="marquee-2"
            layerIndex={0}
            layer={{ type: 'text', content: '', speed: 0 }}
            position={{ top: '6vh', left: '12.7%', width: TW, height: 'auto', zIndex: 2 }}
          >
            <div style={TEXT_BLOCK_STYLE} className="mutek-p">
              {P_MENTE}
            </div>
          </ParallaxLayer>

          {/* Image 467 right */}
          <ParallaxLayer
            sectionId="marquee-2"
            layerIndex={1}
            layer={{ type: 'image', src: ASSETS.img8, speed: 0.3 }}
            position={{ top: '0', left: '54.9%', width: TW, height: '70vh', zIndex: 1 }}
          />

          {/* Marquee — difference blend */}
          <ParallaxLayer
            sectionId="marquee-2"
            layerIndex={2}
            layer={{ type: 'marquee', content: 'EL VACÍO NO ES ALGO INEXISTENTE, SINO UN ELEMENTO EMINENTEMENTE DINÁMICO Y ACTIVO.', speed: 0, className: 'mutek-marquee-blend' }}
            position={{ top: '60vh', left: '0', width: '100%', height: '8vh', zIndex: 3 }}
          />

          {/* Image 467 portrait — under marquee */}
          <ParallaxLayer
            sectionId="marquee-2"
            layerIndex={3}
            layer={{ type: 'image', src: ASSETS.img9, speed: 0.3 }}
            position={{ top: '76vh', left: '33.8%', width: TW, height: '40vh', zIndex: 2 }}
          />
        </ParallaxSection>

        {/* 8. TEXT BLOCK — "Esta obra apela..." */}
        <ParallaxSection id="text-block-3" style={{ minHeight: '50vh' }}>
          <ParallaxLayer
            sectionId="text-block-3"
            layerIndex={0}
            layer={{ type: 'text', content: '', speed: 0 }}
            position={{ top: '8vh', left: '12.7%', width: TW, height: 'auto', zIndex: 2 }}
          >
            <div style={TEXT_BLOCK_STYLE} className="mutek-p">
              {P_APELA}
            </div>
          </ParallaxLayer>
        </ParallaxSection>

        {/* 9. BIG FULL-WIDTH IMAGE */}
        <ParallaxSection id="big-image" style={{ minHeight: '90vh' }}>
          <ParallaxLayer
            sectionId="big-image"
            layerIndex={0}
            layer={{ type: 'image', src: ASSETS.img10, speed: 0.3 }}
            position={{ top: '0', left: '0', width: '100%', height: '85vh', zIndex: 1 }}
          />
        </ParallaxSection>

        {/* 10. TEXT RIGHT — "Una posibilidad. Como umbral..." */}
        <ParallaxSection id="text-block-4" style={{ minHeight: '50vh' }}>
          <ParallaxLayer
            sectionId="text-block-4"
            layerIndex={0}
            layer={{ type: 'text', content: '', speed: 0 }}
            position={{ top: '12vh', left: '59.2%', width: TW, height: 'auto', zIndex: 2 }}
          >
            <div style={TEXT_BLOCK_STYLE} className="mutek-p">
              {P_UMBRAL}
            </div>
          </ParallaxLayer>
        </ParallaxSection>

        {/* 11. IMAGE 831 CENTERED + TEXT LEFT "La caverna de luz..." */}
        <ParallaxSection id="image-text" style={{ minHeight: '90vh' }}>
          <ParallaxLayer
            sectionId="image-text"
            layerIndex={0}
            layer={{ type: 'image', src: ASSETS.img11, speed: 0.3 }}
            position={{ top: '5vh', left: '21.1%', width: '57.7%', height: '60vh', zIndex: 1 }}
          />

          <ParallaxLayer
            sectionId="image-text"
            layerIndex={1}
            layer={{ type: 'text', content: '', speed: 0 }}
            position={{ top: '72vh', left: '8.47%', width: '40%', height: 'auto', zIndex: 2 }}
          >
            <div style={TEXT_BLOCK_STYLE} className="mutek-p">
              {P_CAVERNA}
            </div>
          </ParallaxLayer>
        </ParallaxSection>

        {/* 12. CAROUSEL — chair-style horizontal scroll */}
        <div style={{ width: '100%', height: CH, overflow: 'hidden' }}>
          <div style={{ display: 'flex', height: CH, width: 'max-content', animation: 'mutek-carousel-scroll 14s linear infinite' }}>
            {[ASSETS.carousel1, ASSETS.carousel2, ASSETS.carousel3, ASSETS.carousel4, ASSETS.carousel5, ASSETS.carousel6, ASSETS.carousel7].map((src, i) => (
              <img key={i} src={src} alt="" style={{ height: CH, width: 'auto', display: 'block', flexShrink: 0 }} />
            ))}
          </div>
        </div>

        {/* 13. FINAL TITLE — Desktop: Stuck to carousel, 110px bottom margin */}
        <div style={{ marginTop: '0', paddingLeft: '46.5%', paddingBottom: '110px', textAlign: 'left', width: '100%' }}>
          <h2 style={{ ...TITLE_STYLE, lineHeight: 1.1 }} className="mutek-h3">
            Y AÚN APAGADA,<br />
            ESPERA, AL PRÓXIMO RITUAL.
          </h2>
        </div>
      </div>{/* /mutek-desktop */}

      {/* ── MUTEK MOBILE ─────────────────────────────────────────────── */}
      <div className="mutek-mobile" style={{ backgroundColor: '#0F0F0F', overflow: 'hidden' }}>

        {/* 1. Hero */}
        <img src={ASSETS.heroMobile} alt="" style={{ display: 'block', width: '100%', height: '573px', objectFit: 'cover' }} />

        {/* 2. Intro para */}
        <div className="mutek-p" style={{ color: '#fff', padding: '110px 0 0', width: '350px', marginLeft: '20px' }}>
          En el marco del festival internacional Mutek dedicada a la promoción de la música electrónica y las artes digitales en Argentina, como Sideshow, Constanza Schwartz en dupla con Francisco Rousset Osio, crearon un show de música e iluminación ao vivo para los espectadores participativos que se adentraban a la instalación. Convocados por COMITÉ357, este proyecto fue promovido por ARTLAB.
        </div>

        {/* 3. First image pair + title + sub-text — absolute layout per Figma */}
        {/* img1 top:0 h:299, title top:252 overlaps tail of img1, img2 right-side top:374 h:300 */}
        <div style={{ position: 'relative', height: '674px', marginTop: '80px' }}>
          <img src={ASSETS.img1} alt="" style={{ position: 'absolute', left: '20px', top: 0, width: '200px', height: '299px', objectFit: 'cover', zIndex: 0 }} />
          <h3 style={{
            position: 'absolute', top: '252px', left: '20px', margin: 0,
            fontFamily: '"Helvetica Neue LT Std","Helvetica Neue",Helvetica,sans-serif',
            fontWeight: 100, fontSize: '36px', lineHeight: 1, color: '#fff', textTransform: 'uppercase',
            zIndex: 1
          }}>
            Ritual al Vacío
          </h3>
          <img src={ASSETS.img2} alt="" style={{ position: 'absolute', left: 'calc(41.67% + 7.5px)', top: '374px', width: '200px', height: '300px', objectFit: 'cover', zIndex: 0 }} />
          <div className="mutek-p" style={{ position: 'absolute', top: '298px', left: '20px', width: '350px', color: '#fff', zIndex: 1 }}>
            Desde nuestros comienzos, protegidos por las cavernas, las llamas danzantes proyectaban juegos de luces sobre las paredes envueltas en imágenes con anhelos de permanencia, creando un mundo de formas efímeras que parecían moverse con vida propia.
          </div>
        </div>

        {/* 4. P_CAVE — 80px after image container */}
        <div className="mutek-p" style={{ color: '#fff', padding: '80px 0 0', width: '350px', marginLeft: '20px' }}>
          {P_CAVE}
        </div>

        {/* 5. Video */}
        <div style={{ width: '100%', height: '219px', marginTop: '110px', overflow: 'hidden' }}>
          <video autoPlay muted loop playsInline style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}>
            <source src={ASSETS.vid1} type="video/mp4" />
          </video>
        </div>

        {/* 6. P_VACIO */}
        <div className="mutek-p" style={{ color: '#fff', padding: '110px 0 0', width: '350px', marginLeft: '20px' }}>
          {P_VACIO}
        </div>

        {/* 7. Stills + marquee + DSC3353 + P_RITUAL + Still 15 + Still 126 — absolute layout */}
        {/* Still145 top:0, Still18 top:136, Marquee top:147, DSC3353 top:342, P_RITUAL top:496, Still15 top:726, Still126 top:854 */}
        <div style={{ position: 'relative', height: '950px', marginTop: '110px' }}>
          <img src={ASSETS.img3} alt="" style={{ position: 'absolute', left: 'calc(8.33% + 17.5px)', top: 0, width: '290px', height: '163px', objectFit: 'cover' }} />
          <img src={ASSETS.img4} alt="" style={{ position: 'absolute', left: 'calc(58.33% - 7.5px)', top: '136px', width: '170px', height: '96px', objectFit: 'cover' }} />

          {/* Marquee 1 — overlaps bottom of Still18 */}
          <div style={{ position: 'absolute', top: '147px', left: 0, width: '100%', height: '40px', overflow: 'hidden' }}>
            <div className="marquee-track" style={{ animationDuration: '20s' }}>
              <div className="marquee-set">
                <span className="marquee-item" style={{
                  fontFamily: '"Helvetica Neue LT Std","Helvetica Neue",Helvetica,sans-serif',
                  fontWeight: 100, fontSize: '28px', letterSpacing: '0.56px', textTransform: 'uppercase', color: '#fff',
                }}>
                  Como una caverna suspendida en lo invisible, estas formas translúcidas no buscan encerrar, sino evocar.
                </span>
              </div>
              <div className="marquee-set">
                <span className="marquee-item" style={{
                  fontFamily: '"Helvetica Neue LT Std","Helvetica Neue",Helvetica,sans-serif',
                  fontWeight: 100, fontSize: '28px', letterSpacing: '0.56px', textTransform: 'uppercase', color: '#fff',
                }}>
                  Como una caverna suspendida en lo invisible, estas formas translúcidas no buscan encerrar, sino evocar.
                </span>
              </div>
            </div>
          </div>

          {/* DSC3353 — left-aligned per Figma annotation */}
          <img src={ASSETS.img5} alt="" style={{ position: 'absolute', left: '20px', top: '342px', width: '280px', height: '187px', objectFit: 'cover' }} />

          {/* P_RITUAL — right-indented, nowrap per Figma */}
          <div className="mutek-p" style={{
            position: 'absolute', top: '496px', left: 'calc(25% + 12.5px)',
            color: '#fff', whiteSpace: 'nowrap',
          }}>
            <p style={{ margin: 0 }}>La luz se apaga, todo se disuelve.</p>
            <p style={{ margin: 0 }}>La caverna desaparece,</p>
            <p style={{ margin: 0 }}>el ritmo se interrumpe.</p>
            <p style={{ margin: 0 }}>Y en ese vaivén constante,</p>
            <p style={{ margin: 0 }}>se funda un nuevo ritual:</p>
            <p style={{ margin: 0 }}>un Ritual al Vacío.</p>
          </div>

          {/* Still 15 — right-aligned */}
          <img src={ASSETS.img6} alt="" style={{ position: 'absolute', right: 0, top: '726px', width: '280px', height: '158px', objectFit: 'cover' }} />

          {/* Still 126 — left edge */}
          <img src={ASSETS.img7} alt="" style={{ position: 'absolute', left: 0, top: '854px', width: '170px', height: '96px', objectFit: 'cover' }} />
        </div>

        {/* 8. P_QUESTION */}
        <div className="mutek-p" style={{ color: '#fff', padding: '110px 0 0', width: '350px', marginLeft: '20px' }}>
          {P_QUESTION}
        </div>

        {/* 9. P_MENTE */}
        <div className="mutek-p" style={{ color: '#fff', padding: '110px 0 0', width: '350px', marginLeft: '20px' }}>
          {P_MENTE}
        </div>

        {/* 10. Second image pair + Marquee 2 — absolute layout */}
        {/* DSC3347(img8) right side top:0 h:300, Marquee2 top:48 overlaps img8, DSC3435(img9) left top:199 h:300 */}
        <div style={{ position: 'relative', height: '499px', marginTop: '100px' }}>
          <img src={ASSETS.img8} alt="" style={{ position: 'absolute', left: 'calc(41.67% + 7.5px)', top: 0, width: '200px', height: '300px', objectFit: 'cover' }} />

          {/* Marquee 2 — overlaps top portion of right image */}
          <div style={{ position: 'absolute', top: '48px', left: 0, width: '100%', height: '40px', overflow: 'hidden' }}>
            <div className="marquee-track" style={{ animationDuration: '22s' }}>
              <div className="marquee-set">
                <span className="marquee-item" style={{
                  fontFamily: '"Helvetica Neue LT Std","Helvetica Neue",Helvetica,sans-serif',
                  fontWeight: 100, fontSize: '28px', letterSpacing: '0.56px', textTransform: 'uppercase', color: '#fff',
                }}>
                  El vacío no es algo inexistente, sino un elemento eminentemente dinámico y activo.
                </span>
              </div>
              <div className="marquee-set">
                <span className="marquee-item" style={{
                  fontFamily: '"Helvetica Neue LT Std","Helvetica Neue",Helvetica,sans-serif',
                  fontWeight: 100, fontSize: '28px', letterSpacing: '0.56px', textTransform: 'uppercase', color: '#fff',
                }}>
                  El vacío no es algo inexistente, sino un elemento eminentemente dinámico y activo.
                </span>
              </div>
            </div>
          </div>

          <img src={ASSETS.img9} alt="" style={{ position: 'absolute', left: '20px', top: '199px', width: '200px', height: '300px', objectFit: 'cover' }} />
        </div>

        {/* 11. P_APELA */}
        <div className="mutek-p" style={{ color: '#fff', padding: '110px 0 0', width: '350px', marginLeft: '20px' }}>
          {P_APELA}
        </div>

        {/* 12. Full-width image (Still 122) 390×572 */}
        <img src={ASSETS.img10} alt="" style={{ display: 'block', width: '100%', height: '572px', objectFit: 'cover', marginTop: '80px' }} />

        {/* 13. P_UMBRAL */}
        <div className="mutek-p" style={{ color: '#fff', paddingTop: '110px', width: '350px', marginLeft: '20px' }}>
          {P_UMBRAL}
        </div>

        {/* 14. Still 111 — centered, 350×197 */}
        <img src={ASSETS.img11} alt="" style={{ display: 'block', width: '350px', height: '197px', objectFit: 'cover', marginTop: '110px', marginLeft: 'auto', marginRight: 'auto' }} />

        {/* 15. P_CAVERNA */}
        <div className="mutek-p" style={{ color: '#fff', padding: '110px 0 0', width: '350px', marginLeft: '20px' }}>
          {P_CAVERNA}
        </div>

        {/* 16. Carousel — 588px wide frames, 331px tall, seamless loop */}
        <div style={{ marginTop: '80px', width: '100%', height: '331px', overflow: 'hidden' }}>
          <div style={{ display: 'flex', height: '331px', width: 'max-content', animation: 'mutek-m-c 14s linear infinite' }}>
            {[ASSETS.carousel1, ASSETS.carousel2, ASSETS.carousel3, ASSETS.carousel4, ASSETS.carousel5, ASSETS.carousel6, ASSETS.carousel7,
            ASSETS.carousel1, ASSETS.carousel2, ASSETS.carousel3, ASSETS.carousel4, ASSETS.carousel5, ASSETS.carousel6, ASSETS.carousel7].map((src, i) => (
              <img key={i} src={src} alt="" style={{ height: '331px', width: '588px', objectFit: 'cover', display: 'block', flexShrink: 0 }} />
            ))}
          </div>
        </div>

        {/* 17. Closing title — Mobile: Stuck to carousel, 110px bottom margin */}
        <div style={{ marginTop: '0', paddingLeft: '80px', paddingBottom: '110px' }}>
          <div style={{
            fontFamily: '"Helvetica Neue LT Std","Helvetica Neue",Helvetica,sans-serif',
            fontWeight: 100, fontSize: '28px', lineHeight: 'normal', color: '#fff',
            textTransform: 'uppercase', letterSpacing: '0.56px',
          }}>
            <div>Y aún apagada,</div>
            <div>espera,</div>
            <div>al próximo ritual.</div>
          </div>
        </div>
        <style dangerouslySetInnerHTML={{ __html: `@keyframes mutek-m-c { from { transform: translateX(0) } to { transform: translateX(-50%) } }` }} />



      </div>

    </div>
  )
}
