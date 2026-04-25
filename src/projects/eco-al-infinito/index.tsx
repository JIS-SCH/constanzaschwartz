'use client'

import { ParallaxSection } from '@/src/components/parallax/ParallaxSection'
import { ParallaxLayer } from '@/src/components/parallax/ParallaxLayer'
import { ASSETS } from './assets'
import { TW, CH, HERO_TOP, CAROUSEL_W_NARROW, CAROUSEL_W_WIDE } from '../shared'

// Carousel widths per Figma component 5/6 — narrow=221px, wide=496px
const CAROUSEL_1_WIDTHS = [
  CAROUSEL_W_NARROW, CAROUSEL_W_NARROW, CAROUSEL_W_WIDE, CAROUSEL_W_NARROW, CAROUSEL_W_NARROW,
] as const
const CAROUSEL_2_WIDTHS = [
  CAROUSEL_W_WIDE, CAROUSEL_W_NARROW, CAROUSEL_W_WIDE, CAROUSEL_W_NARROW, CAROUSEL_W_NARROW, CAROUSEL_W_WIDE,
] as const

export { meta } from './meta'

export function Component() {
  return (
    <div style={{ width: '100%', position: 'relative', backgroundColor: '#0F0F0F' }} className="eco-container">
      <style dangerouslySetInnerHTML={{
        __html: `
        /* TYPOGRAPHY SYSTEM - ECO AL INFINITO */
        .eco-container {
          --h1-d: 280px; --h1-m: 170px;
          --h2-d: 128px; --h2-m: 57px;
          --h3-d: 56px;  --h3-m: 36px;
          --h4-d: 36px;  --h4-m: 28px;
          --list-d: 26px; --list-m: 15px;
          --p-d: 16px;   --p-m: 15px;
          --credits-d: 32px; --credits-m: 20px;
        }

        .eco-h1 { font-size: var(--h1-m); line-height: 1; font-family: "Helvetica Neue LT Std", "Helvetica Neue", Helvetica; font-weight: 100; letter-spacing: 0; }
        .eco-h2 { font-size: var(--h2-m); line-height: 1; font-family: "Helvetica Neue LT Std", "Helvetica Neue", Helvetica; font-weight: 100; letter-spacing: 0; }
        .eco-h3 { font-size: var(--h3-m); line-height: 1; font-family: "Helvetica Neue LT Std", "Helvetica Neue", Helvetica; font-weight: 100; letter-spacing: 0; }
        .eco-h4 { font-size: var(--h4-m); line-height: 1.2; font-family: "Helvetica Neue LT Std", "Helvetica Neue", Helvetica; font-weight: 100; letter-spacing: 0.02em; }
        .eco-list { font-size: var(--list-m); line-height: 1.15; font-family: "Helvetica Neue LT Std", "Helvetica Neue", Helvetica; font-weight: 300; letter-spacing: 0; }
        .eco-p { font-size: var(--p-m); line-height: 1.5; font-family: "Space Grotesk", sans-serif; font-weight: 300; letter-spacing: 0; color: #fff; }
        .eco-credits { font-size: var(--credits-m); line-height: 1.4; font-family: "Helvetica Neue LT Std", "Helvetica Neue", Helvetica; font-weight: 100; letter-spacing: 0; text-transform: uppercase; }

        .marquee-item {
          font-family: "Helvetica Neue LT Std", "Helvetica Neue", Helvetica, Arial, sans-serif !important;
          font-weight: 100 !important;
          text-transform: uppercase;
        }

        .eco-placeholder {
          width: 100%;
          height: 100%;
          background: repeating-linear-gradient(45deg, #1a1a1a, #1a1a1a 10px, #222 10px, #222 20px);
          display: flex;
          align-items: center;
          justify-content: center;
          color: rgba(255,255,255,0.3);
          font-family: "Helvetica Neue", sans-serif;
          font-size: 14px;
          letter-spacing: 0.1em;
          text-transform: uppercase;
        }

        .eco-desktop { display: block; }
        .eco-mobile  { display: none; }
        @media (max-width: 1023px) {
          .eco-desktop { display: none; }
          .eco-mobile  { display: block; }
        }

        @media (min-width: 1024px) {
          .eco-h1 { font-size: var(--h1-d); }
          .eco-h2 { font-size: var(--h2-d); }
          .eco-h3 { font-size: var(--h3-d); }
          .eco-h4 { font-size: var(--h4-d); }
          .eco-list { font-size: var(--list-d); line-height: 1.21; }
          .eco-p { font-size: var(--p-d); line-height: 1.5; }
          .eco-credits { font-size: var(--credits-d); }
        }
      `}} />

      <div className="eco-desktop">
      {/* 1. HERO — Full width sculpture */}
      <ParallaxSection id="hero" style={{ minHeight: '100vh' }}>
        <ParallaxLayer
          sectionId="hero"
          layerIndex={0}
          layer={{ type: 'image', src: ASSETS.hero, speed: 0.3, isHero: true, objectFit: 'cover' }}
          position={{ top: HERO_TOP, left: '0', width: '100%', height: '100vh', zIndex: 1 }}
        />
      </ParallaxSection>

      {/* ESCULTURA COLGANTE SITE-SPECIFIC. band */}
      <div style={{ padding: '28px 0', overflow: 'hidden', backgroundColor: '#0F0F0F' }}>
        <div className="marquee-track" style={{ animationDuration: '32s' }}>
          {[0, 1].map((setIdx) => (
            <div key={setIdx} className="marquee-set">
              {Array.from({ length: 4 }, (_, i) => (
                <span key={i} style={{ fontFamily: '"Helvetica Neue LT Std", "Helvetica Neue", Helvetica, sans-serif', fontSize: '36px', fontWeight: 250, letterSpacing: '0.72px', textTransform: 'uppercase', color: '#fff', whiteSpace: 'nowrap', paddingRight: '5em', lineHeight: 'normal' }}>
                  ESCULTURA COLGANTE SITE-SPECIFIC.
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* 2. INTRO — First paragraph + first collage images */}
      <ParallaxSection id="intro" style={{ 
        minHeight: '1400px', 
        position: 'relative',
        backgroundColor: '#0F0F0F' 
      }}>
        {/* Text Block */}
        <ParallaxLayer
          sectionId="intro"
          layerIndex={0}
          layer={{ type: 'text', content: '', speed: 0.1 }}
          position={{ top: '15vh', left: 'calc(58.33% + 12px)', width: TW, height: 'auto', zIndex: 3 }}
        >
          <div className="eco-p" style={{ fontSize: '16px', lineHeight: '1.5' }}>
            <p style={{ marginBottom: '1.5rem' }}>
              Si nombramos al nuevo cerebro, es porque él cambió. Y mucho.
            </p>
            <p>
              No es más ese conjunto de neuronas que no cede en su lucha por mantenernos vivos.
              Ha pasado años sumergido en las incontables marejadas de tecnología que nos abruma
              sin piedad desde que pusimos el caballo delante de un arado.
            </p>
          </div>
        </ParallaxLayer>

        {/* Left image (Img 1) */}
        <ParallaxLayer
          sectionId="intro"
          layerIndex={1}
          layer={{ type: 'image', src: ASSETS.img1, speed: 0.3 }}
          position={{ top: '15vh', left: '8.47%', width: '23.96%', height: '60vh', zIndex: 2 }}
        />

        {/* Center image (Img 2) */}
        <ParallaxLayer
          sectionId="intro"
          layerIndex={2}
          layer={{ type: 'image', src: ASSETS.img2, speed: 0.3 }}
          position={{ top: '60vh', left: '29.16%', width: '32.43%', height: '35vh', zIndex: 1 }}
        />

        {/* Right image (Img 3) */}
        <ParallaxLayer
          sectionId="intro"
          layerIndex={3}
          layer={{ type: 'image', src: ASSETS.img3, speed: 0.3 }}
          position={{ top: '85vh', left: '50.69%', width: '40.83%', height: '40vh', zIndex: 2 }}
        />
      </ParallaxSection>

      {/* 3. COLLAGE 1 + MARQUEE */}
      <ParallaxSection id="collage-1" style={{ minHeight: '130vh' }}>
        {/* Tall portrait center */}
        <ParallaxLayer
          sectionId="collage-1"
          layerIndex={0}
          layer={{ type: 'image', src: ASSETS.img4, speed: 0.3, objectFit: 'contain' }}
          position={{ top: '5vh', left: '16.9444%', width: '40.8333%', height: '110vh', zIndex: 1 }}
        />

        {/* Marquee overlay - H4 Helvetica Thin style */}
        <ParallaxLayer
          sectionId="collage-1"
          layerIndex={1}
          layer={{ type: 'marquee', content: 'Si nombramos al nuevo cerebro, es porque él cambió. Y mucho.', speed: 0 }}
          position={{ top: '20vh', left: '0', width: '100%', height: '50px', zIndex: 3 }}
        >
          <div style={{ overflow: 'hidden', width: '100%' }}>
            <div className="marquee-track" style={{ animationDuration: '32s' }}>
              {[0, 1].map((setIdx) => (
                <div key={setIdx} className="marquee-set">
                  {Array.from({ length: 4 }, (_, i) => (
                    <span key={i} style={{ fontFamily: '"Helvetica Neue LT Std", "Helvetica Neue", Helvetica, sans-serif', fontSize: '36px', fontWeight: 250, letterSpacing: '0.72px', textTransform: 'uppercase', color: '#fff', whiteSpace: 'nowrap', paddingRight: '5em', lineHeight: 'normal' }}>
                      Si nombramos al nuevo cerebro, es porque él cambió. Y mucho.
                    </span>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </ParallaxLayer>
      </ParallaxSection>

      {/* 4. TEXT + COLLAGE 2 — "Constanza Schwartz tampoco cede..." */}
      <ParallaxSection id="text-collage-2" style={{ minHeight: '140vh', position: 'relative' }}>
        {/* Left text */}
        <ParallaxLayer
          sectionId="text-collage-2"
          layerIndex={0}
          layer={{ type: 'text', content: '', speed: 0.1 }}
          position={{ top: '15vh', left: 'calc(8.33% + 3px)', width: TW, height: 'auto', zIndex: 2 }}
        >
          <div className="eco-p" style={{ fontSize: '16px', lineHeight: '1.5' }}>
            Constanza Schwartz tampoco cede, y contestará a la tecnología con más esfuerzo humano.
            De este modo, surgirán espacios que realmente nos transportan a sitios dentro de nuestro
            universo a los que no llegamos a menudo. Solo lo haremos guiados por la creatividad y su
            inclemente convocatoria de presencias arcaicas y míticas, figuras atemporales, intensas,
            al mismo tiempo, conmovedoras y abstractas.
          </div>
        </ParallaxLayer>

        {/* Bottom horizontal image (Img 6) - Overlaps Img 5 */}
        <ParallaxLayer
          sectionId="text-collage-2"
          layerIndex={2}
          layer={{ type: 'image', src: ASSETS.img6, speed: 0.5 }}
          position={{ top: '65vh', left: '33.82%', width: '32.43%', height: '35vh', zIndex: 3 }}
        />

        {/* Right portrait image (Img 5) - Behind Img 6 */}
        <ParallaxLayer
          sectionId="text-collage-2"
          layerIndex={1}
          layer={{ type: 'image', src: ASSETS.img5, speed: 0.2 }}
          position={{ top: '15vh', left: '59.10%', width: '32.43%', height: '85vh', zIndex: 1 }}
        />
      </ParallaxSection>

      {/* 5. COLLAGE 3 + TEXT — "Al desplazarnos..." */}
      <ParallaxSection id="collage-3" style={{ minHeight: 'calc(100vh + 1200px)', position: 'relative' }}>
        {/* Full-width Image 7 */}
        <ParallaxLayer
          sectionId="collage-3"
          layerIndex={0}
          layer={{ type: 'image', src: ASSETS.img7, speed: 0.3, objectFit: 'cover' }}
          position={{ top: '0', left: '0', width: '100%', height: '100vh', zIndex: 1 }}
        />

        {/* Staggered Image 8 */}
        <ParallaxLayer
          sectionId="collage-3"
          layerIndex={1}
          layer={{ type: 'image', src: ASSETS.img8, speed: 0.2 }}
          position={{ top: 'calc(100vh + 220px)', left: '8.54%', width: '32.43%', height: '400px', zIndex: 2 }}
        />

        {/* Staggered Image 9 - Overlaps Img 8 */}
        <ParallaxLayer
          sectionId="collage-3"
          layerIndex={2}
          layer={{ type: 'image', src: ASSETS.img9, speed: 0.35 }}
          position={{ top: 'calc(100vh + 434px)', left: '33.82%', width: '32.43%', height: '400px', zIndex: 3 }}
        />

        {/* Text bottom relative to images */}
        <ParallaxLayer
          sectionId="collage-3"
          layerIndex={3}
          layer={{ type: 'text', content: '', speed: 0.1 }}
          position={{ top: 'calc(100vh + 1054px)', left: 'calc(8.33% + 2px)', width: TW, height: 'auto', zIndex: 2 }}
        >
          <div className="eco-p" style={{ fontSize: '16px', lineHeight: '1.5' }}>
            Al desplazarnos por vacíos y llenos, imposibles convergencias, nos conmovemos al tiempo
            que nos transformamos en cultores y espectadores participativos de su obra.
          </div>
        </ParallaxLayer>
      </ParallaxSection>

      {/* 6. COLLAGE 4 — The 4 Images Strip (10, 11, 12, 13) */}
      <ParallaxSection id="collage-4" style={{ minHeight: '2200px', position: 'relative' }}>
        {/* BIG Top Right Image (Img 10) - 710px width */}
        <ParallaxLayer
          sectionId="collage-4"
          layerIndex={0}
          layer={{ type: 'image', src: ASSETS.img10, speed: 0.1 }}
          position={{ top: '220px', left: '46.46%', width: '49.31%', height: '550px', zIndex: 1 }}
        />
        
        {/* BIG Bottom Left Image (Img 11) - 710px width */}
        <ParallaxLayer
          sectionId="collage-4"
          layerIndex={1}
          layer={{ type: 'image', src: ASSETS.img11, speed: 0.2 }}
          position={{ top: '550px', left: '4.24%', width: '49.31%', height: '550px', zIndex: 2 }}
        />
        
        {/* SMALL Top Right Image (Img 12) - 467px width. Starts 220px after Img 11 */}
        <ParallaxLayer
          sectionId="collage-4"
          layerIndex={2}
          layer={{ type: 'image', src: ASSETS.img12, speed: 0.1 }}
          position={{ top: '1320px', left: '59.10%', width: '32.43%', height: '450px', zIndex: 3 }}
        />

        {/* SMALL Bottom Left Image (Img 13) - 467px width */}
        <ParallaxLayer
          sectionId="collage-4"
          layerIndex={3}
          layer={{ type: 'image', src: ASSETS.img13, speed: 0.2 }}
          position={{ top: '1550px', left: '33.82%', width: '32.43%', height: '450px', zIndex: 4 }}
        />
      </ParallaxSection>

      {/* 7. MAKING-OFF-TEMPLATE */}
      <ParallaxSection id="making-of-intro" style={{ minHeight: '100vh' }}>
        <ParallaxLayer
          sectionId="making-of-intro"
          layerIndex={0}
          layer={{ type: 'image', src: ASSETS.makingOffTemplate, speed: 0.3, objectFit: 'cover' }}
          position={{ top: '0', left: '0', width: '100%', height: '100vh', zIndex: 1 }}
        />
      </ParallaxSection>

      {/* 8. COLLAGE STAIRCASE + PARAGRAPH + IMG 17 & 18 */}
      <ParallaxSection id="collage-14-15-16" style={{ minHeight: '2900px', position: 'relative' }}>
        {/* Staircase Image 14 */}
        <ParallaxLayer
          sectionId="collage-14-15-16"
          layerIndex={0}
          layer={{ type: 'image', src: ASSETS.img14, speed: 0.1 }}
          position={{ top: '220px', left: '4.24%', width: '23.96%', height: 'auto', zIndex: 2 }}
        />
        {/* Staircase Image 15 */}
        <ParallaxLayer
          sectionId="collage-14-15-16"
          layerIndex={1}
          layer={{ type: 'image', src: ASSETS.img15, speed: 0.1 }}
          position={{ top: '440px', left: '38.02%', width: '23.96%', height: 'auto', zIndex: 2 }}
        />
        {/* Staircase Image 16 */}
        <ParallaxLayer
          sectionId="collage-14-15-16"
          layerIndex={2}
          layer={{ type: 'image', src: ASSETS.img16, speed: 0.1 }}
          position={{ top: '660px', left: '71.74%', width: '23.96%', height: 'auto', zIndex: 2 }}
        />

        {/* Paragraph below staircase */}
        <ParallaxLayer
          sectionId="collage-14-15-16"
          layerIndex={3}
          layer={{ type: 'text', content: '', speed: 0.1 }}
          position={{ top: '1400px', left: 'calc(8.33% + 3px)', width: TW, height: 'auto', zIndex: 2 }}
        >
          <div className="eco-p" style={{ fontSize: '16px', lineHeight: '1.5' }}>
            La potencia de esta creación no da lugar a ausentarse. Participamos sin descanso, metro
            a metro, de las síntesis sensibles que reavivan las fraguas más ardientes de la memoria
            para trasladarnos a espacios libres donde sus elementales e infinitas combinaciones se
            reproducen y rebobinan en nuestra mente, aunando pasados, presentes y futuros que
            resurgen ante nuestro caminar buscando un sentido. Hay muchos.
          </div>
        </ParallaxLayer>

        {/* Img 17 (Shadows) */}
        <ParallaxLayer
          sectionId="collage-14-15-16"
          layerIndex={4}
          layer={{ type: 'image', src: ASSETS.img17, speed: 0.1 }}
          position={{ top: '1770px', left: '21.11%', width: '32.43%', height: 'auto', zIndex: 3 }}
        />

        {/* Img 18 (Red Triangles) */}
        <ParallaxLayer
          sectionId="collage-14-15-16"
          layerIndex={5}
          layer={{ type: 'image', src: ASSETS.img18, speed: 0.1 }}
          position={{ top: '2070px', left: '46.46%', width: '32.43%', height: 'auto', zIndex: 4 }}
        />

        {/* Marquee Text ON TOP of Img 17 and 18 */}
        <ParallaxLayer
          sectionId="collage-14-15-16"
          layerIndex={6}
          layer={{ type: 'text', content: '', speed: 0.1 }}
          position={{ top: '2650px', left: '0', width: '100%', height: 'auto', zIndex: 5 }}
        >
          <div style={{ padding: '0', overflow: 'hidden' }}>
            <div className="marquee-track" style={{ animationDuration: '32s' }}>
              {[0, 1].map((setIdx) => (
                <div key={setIdx} className="marquee-set">
                  {Array.from({ length: 4 }, (_, i) => (
                    <span key={i} style={{ fontFamily: '"Helvetica Neue LT Std", "Helvetica Neue", Helvetica, sans-serif', fontSize: '36px', fontWeight: 250, letterSpacing: '0.72px', textTransform: 'uppercase', color: '#fff', whiteSpace: 'nowrap', paddingRight: '5em', lineHeight: 'normal' }}>
                      SE REPRODUCEN Y REBOBINAN EN NUESTRA MENTE, AUNANDO PASADOS, PRESENTES Y FUTUROS
                    </span>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </ParallaxLayer>
      </ParallaxSection>
      


      {/* 10. FINAL FULL IMAGE (19) */}
      <ParallaxSection id="final-image-19" style={{ minHeight: '120vh' }}>
        <ParallaxLayer
          sectionId="final-image-19"
          layerIndex={0}
          layer={{ type: 'image', src: ASSETS.img19, speed: 0.3 }}
          position={{ top: '10vh', left: '0', width: '100%', height: '100vh', zIndex: 1 }}
        />
      </ParallaxSection>

      {/* 11. FINAL SEQUENCE: COLLAGE 20-21-22 + TEXT + COLLAGE 23-24 */}
      <ParallaxSection id="final-sequence" style={{ minHeight: '3400px', position: 'relative' }}>
        
        {/* Img 21 (Tall one, back) */}
        <ParallaxLayer
          sectionId="final-sequence"
          layerIndex={0}
          layer={{ type: 'image', src: ASSETS.img21, speed: 0.1 }}
          position={{ top: '220px', left: '42.22%', width: '32.43%', height: 'auto', zIndex: 2 }}
        />

        {/* Img 20 (Short one, front) */}
        <ParallaxLayer
          sectionId="final-sequence"
          layerIndex={1}
          layer={{ type: 'image', src: ASSETS.img20, speed: 0.2 }}
          position={{ top: '400px', left: '63.33%', width: '32.43%', height: 'auto', zIndex: 3 }}
        />

        {/* Img 22 (Wide one below 20-21) - 608px width */}
        <ParallaxLayer
          sectionId="final-sequence"
          layerIndex={2}
          layer={{ type: 'image', src: ASSETS.img22, speed: 0.15 }}
          position={{ top: '1040px', left: '8.47%', width: '42.22%', height: 'auto', zIndex: 2 }}
        />

        {/* Concluding Paragraph on the Right */}
        <ParallaxLayer
          sectionId="final-sequence"
          layerIndex={3}
          layer={{ type: 'text', content: '', speed: 0.1 }}
          position={{ top: '1660px', left: 'calc(58.33% + 12px)', width: TW, height: 'auto', zIndex: 2 }}
        >
          <div className="eco-p" style={{ fontSize: '16px', lineHeight: '1.5' }}>
            Una plenitud sin alarmas nos tranquiliza desde la convicción de que este es nuestro universo.
            Aquí, unidos a Constanza, seguimos caminando sin dudar. Aceptamos ser guiados porque son
            las formas con las que hemos construido el mundo. Así dejamos huella de nuestro paso por
            la Tierra. Nos traslada a los inicios, mientras nos apoyamos confiados en las formas abiertas
            y fundamentales de nuestro alfabeto de formas. No importa el siglo de nuestra ubicación
            defensiva. Seguiremos dudando hasta que realmente nos reconozcamos allí. Somos habitantes
            de un extenso universo que nunca podrá ser resumido a tres o cuatro números. Son infinitos.
            Son un Eco al Infinito. Que se reitera, se reitera, se reitera hasta que logremos ubicarnos.
            Es nuestro universo…
          </div>
        </ParallaxLayer>

        {/* Img 23 (Left) */}
        <ParallaxLayer
          sectionId="final-sequence"
          layerIndex={4}
          layer={{ type: 'image', src: ASSETS.img23, speed: 0.1 }}
          position={{ top: '2130px', left: '8.47%', width: '32.43%', height: 'auto', zIndex: 2 }}
        />

        {/* Img 24 (Right, overlapping 23) */}
        <ParallaxLayer
          sectionId="final-sequence"
          layerIndex={5}
          layer={{ type: 'image', src: ASSETS.img24, speed: 0.15 }}
          position={{ top: '2450px', left: '33.82%', width: '32.43%', height: 'auto', zIndex: 3 }}
        />

        {/* Marquee Text ON TOP of Img 23 and 24 */}
        <ParallaxLayer
          sectionId="final-sequence"
          layerIndex={6}
          layer={{ type: 'text', content: '', speed: 0.1 }}
          position={{ top: '2400px', left: '0', width: '100%', height: 'auto', zIndex: 5 }}
        >
          <div style={{ padding: '0', overflow: 'hidden' }}>
            <div className="marquee-track" style={{ animationDuration: '32s' }}>
              {[0, 1].map((setIdx) => (
                <div key={setIdx} className="marquee-set">
                  {Array.from({ length: 4 }, (_, i) => (
                    <span key={i} style={{ fontFamily: '"Helvetica Neue LT Std", "Helvetica Neue", Helvetica, sans-serif', fontSize: '36px', fontWeight: 250, letterSpacing: '0.72px', textTransform: 'uppercase', color: '#fff', whiteSpace: 'nowrap', paddingRight: '5em', lineHeight: 'normal' }}>
                      SEGUIREMOS DUDANDO HASTA QUE REALMENTE NOS RECONOZCAMOS ALLÍ.
                    </span>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </ParallaxLayer>
      </ParallaxSection>
      {/* 13. IMAGE 25 (Full Width) + COLLAGE 26-27 */}
      <ParallaxSection id="final-sequence-25-27" style={{ minHeight: '230vh' }}>
        <ParallaxLayer
          sectionId="final-sequence-25-27"
          layerIndex={0}
          layer={{ type: 'image', src: ASSETS.img25, speed: 0.3 }}
          position={{ top: '10vh', left: '0', width: '100%', height: '100vh', zIndex: 1 }}
        />
        
        {/* Staggered Duo 26-27 below 25 */}
        <ParallaxLayer
          sectionId="final-sequence-25-27"
          layerIndex={1}
          layer={{ type: 'image', src: ASSETS.img26, speed: 0.3 }}
          position={{ top: '125vh', left: '34.0277%', width: TW, height: '50vh', zIndex: 2 }}
        />
        <ParallaxLayer
          sectionId="final-sequence-25-27"
          layerIndex={2}
          layer={{ type: 'image', src: ASSETS.img27, speed: 0.3 }}
          position={{ top: '150vh', left: '60%', width: '30%', height: '70vh', zIndex: 3 }}
        />
      </ParallaxSection>

      {/* 14. CAROUSEL 28-29 */}
      <ParallaxSection id="carousel-section" style={{ minHeight: '60vh' }}>
        {/* Infinite Carousel */}
        <ParallaxLayer
          sectionId="carousel-section"
          layerIndex={0}
          layer={{ type: 'image', src: '', speed: 0 }}
          position={{ top: '5vh', left: '0', width: '100%', height: CH, zIndex: 2 }}
        >
          <div style={{ width: '100%', height: CH, overflow: 'hidden' }}>
            <div style={{ display: 'flex', height: CH, width: 'max-content', animation: 'eco-carousel-scroll 18s linear infinite' }}>
              {[ASSETS.carousel1, ASSETS.carousel2, ASSETS.carousel3, ASSETS.carousel4, ASSETS.carousel5,
                ASSETS.carousel1, ASSETS.carousel2, ASSETS.carousel3, ASSETS.carousel4, ASSETS.carousel5].map((src, i) => (
                <img key={i} src={src} alt="" style={{ height: CH, width: CAROUSEL_1_WIDTHS[i % CAROUSEL_1_WIDTHS.length], objectFit: 'cover', display: 'block', flexShrink: 0 }} />
              ))}
            </div>
          </div>
        </ParallaxLayer>

        <style dangerouslySetInnerHTML={{ __html: `
          @keyframes eco-carousel-scroll {
            from { transform: translateX(0); }
            to   { transform: translateX(-50%); }
          }
        `}} />
      </ParallaxSection>

      {/* 15. FINAL SEQUENCE 30-33 + MARQUEE */}
      <ParallaxSection id="final-sequence-30-33" style={{ minHeight: '350vh' }}>
        {/* Final Reflective Text (Right aligned per figma) */}
        <ParallaxLayer
          sectionId="final-sequence-30-33"
          layerIndex={0}
          layer={{ type: 'text', content: '', speed: 0 }}
          position={{ top: '10vh', left: 'calc(58.33% + 12px)', width: TW, height: 'auto', zIndex: 1 }}
        >
          <div className="eco-p">
            Sí, claro. Todavía no conocemos muchos universos, pero puede ser que los haya. 
            Y dentro de ellos, siempre habrá un lugar para el arte que expande nuestra 
            posibilidad de entender y percibir lo diferente. Tal vez nos aterra que esa 
            posibilidad desaparezca. Pero no lo hará. Porque las cosas existen también en 
            nuestras memorias. Quizá aún más intensamente.
          </div>
        </ParallaxLayer>

        {/* Image 30 (Far Right - Aligned with text) */}
        <ParallaxLayer
          sectionId="final-sequence-30-33"
          layerIndex={1}
          layer={{ type: 'image', src: ASSETS.img30, speed: 0.3 }}
          position={{ top: '60vh', left: '59.0972%', width: TW, height: '70vh', zIndex: 1 }}
        />

        {/* Image 31 (Center) */}
        <ParallaxLayer
          sectionId="final-sequence-30-33"
          layerIndex={2}
          layer={{ type: 'image', src: ASSETS.img31, speed: 0.3 }}
          position={{ top: '110vh', left: '33.75%', width: TW, height: '65vh', zIndex: 2 }}
        />

        {/* Image 32 (Left, custom width 345px) - Above 33 */}
        <ParallaxLayer
          sectionId="final-sequence-30-33"
          layerIndex={3}
          layer={{ type: 'image', src: ASSETS.img32, speed: 0.3 }}
          position={{ top: '185vh', left: '8.5416%', width: '23.9583%', height: '90vh', zIndex: 3 }}
        />

        {/* Marquee crossing the TOP part of 32 */}
        <ParallaxLayer
          sectionId="final-sequence-30-33"
          layerIndex={4}
          layer={{ type: 'marquee', content: 'SIEMPRE HABRÁ UN LUGAR PARA EL ARTE QUE EXPANDE NUESTRA POSIBILIDAD DE ENTENDER', speed: 0 }}
          position={{ top: '190vh', left: '0', width: '100%', height: '8vh', zIndex: 4 }}
        />

        {/* Image 33 (Bottom Center) - Square format, below 32 */}
        <ParallaxLayer
          sectionId="final-sequence-30-33"
          layerIndex={5}
          layer={{ type: 'image', src: ASSETS.img33, speed: 0.3 }}
          position={{ top: '235vh', left: '29.6527%', width: TW, height: '40vh', zIndex: 2 }}
        />
      </ParallaxSection>

      {/* 16. VIDEO TIMELAPSE (Full Width) */}
      <ParallaxSection id="video-timelapse" style={{ minHeight: '120vh' }}>
        <ParallaxLayer
          sectionId="video-timelapse"
          layerIndex={0}
          layer={{ type: 'text', content: '', speed: 0.1 }}
          position={{ top: '10vh', left: '0', width: '100%', height: '100vh', zIndex: 1 }}
        >
          <div style={{ position: 'relative', width: '100%', height: '100%' }}>
            {/* The template frame goes on top */}
            <img 
              src={ASSETS.makingOffTemplate} 
              alt="" 
              style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', zIndex: 2, pointerEvents: 'none', objectFit: 'contain' }} 
            />
            <video 
              autoPlay 
              muted 
              loop 
              playsInline 
              crossOrigin="anonymous" 
              style={{ width: '100%', height: '100%', objectFit: 'cover', zIndex: 1 }}
            >
              <source src={ASSETS.videoTimelapse} type="video/mp4" />
            </video>
          </div>
        </ParallaxLayer>
      </ParallaxSection>

      {/* 17. FINAL COLLAGE 34-35 */}
      <ParallaxSection id="collage-34-35" style={{ minHeight: '180vh' }}>
        <ParallaxLayer
          sectionId="collage-34-35"
          layerIndex={0}
          layer={{ type: 'image', src: ASSETS.img34, speed: 0.3 }}
          position={{ top: '10vh', left: '8.4722%', width: TW, height: '70vh', zIndex: 1 }}
        />
        <ParallaxLayer
          sectionId="collage-34-35"
          layerIndex={1}
          layer={{ type: 'image', src: ASSETS.img35, speed: 0.3 }}
          position={{ top: '80vh', left: '33.6111%', width: TW, height: '50vh', zIndex: 2 }}
        />
      </ParallaxSection>

      {/* 18. CAROUSEL 2 (carousel6-10) */}
      <ParallaxSection id="carousel-section-2" style={{ minHeight: '60vh' }}>
        <ParallaxLayer
          sectionId="carousel-section-2"
          layerIndex={0}
          layer={{ type: 'image', src: '', speed: 0 }}
          position={{ top: '5vh', left: '0', width: '100%', height: CH, zIndex: 2 }}
        >
          <div style={{ width: '100%', height: CH, overflow: 'hidden' }}>
            <div style={{ display: 'flex', height: CH, width: 'max-content', animation: 'eco-carousel-scroll-2 18s linear infinite' }}>
              {[ASSETS.carousel6, ASSETS.carousel7, ASSETS.carousel8, ASSETS.carousel9, ASSETS.carousel10, ASSETS.carousel11,
                ASSETS.carousel6, ASSETS.carousel7, ASSETS.carousel8, ASSETS.carousel9, ASSETS.carousel10, ASSETS.carousel11].map((src, i) => (
                <img key={i} src={src} alt="" style={{ height: CH, width: CAROUSEL_2_WIDTHS[i % CAROUSEL_2_WIDTHS.length], objectFit: 'cover', display: 'block', flexShrink: 0 }} />
              ))}
            </div>
          </div>
        </ParallaxLayer>

        <style dangerouslySetInnerHTML={{ __html: `
          @keyframes eco-carousel-scroll-2 {
            from { transform: translateX(0); }
            to   { transform: translateX(-50%); }
          }
        `}} />
      </ParallaxSection>

      {/* 19. FINAL COLLAGE 36-37 */}
      <ParallaxSection id="collage-36-37" style={{ minHeight: '180vh' }}>
        <ParallaxLayer
          sectionId="collage-36-37"
          layerIndex={0}
          layer={{ type: 'image', src: ASSETS.img36, speed: 0.3 }}
          position={{ top: '10vh', left: '67.5694%', width: '23.9583%', height: '75vh', zIndex: 2 }}
        />
        <ParallaxLayer
          sectionId="collage-36-37"
          layerIndex={1}
          layer={{ type: 'image', src: ASSETS.img37, speed: 0.3 }}
          position={{ top: '70vh', left: '42.2222%', width: TW, height: '50vh', zIndex: 1 }}
        />
      </ParallaxSection>

      {/* 20. FINAL FULL IMAGE (38) */}
      <ParallaxSection id="final-image-38" style={{ minHeight: '120vh' }}>
        <ParallaxLayer
          sectionId="final-image-38"
          layerIndex={0}
          layer={{ type: 'image', src: ASSETS.img38, speed: 0.3 }}
          position={{ top: '0', left: '0', width: '100%', height: '100vh', zIndex: 1 }}
        />
      </ParallaxSection>

      {/* 21. LYRICS SECTION (Sound of Silence) — Figma 1571:1033..1038 + 1867:1262 */}
      <ParallaxSection id="lyrics-section" style={{ minHeight: 'auto', backgroundColor: '#0F0F0F' }}>
        <div style={{ position: 'relative', width: '100%', paddingTop: '110px', paddingBottom: '0' }}>
          {/* Lyrics — H4 Helvetica Neue LT Std Thin 36px / line-height normal / tracking 0.72px */}
          <div style={{
            color: '#fff',
            textTransform: 'uppercase',
            fontFamily: '"Helvetica Neue LT Std", "Helvetica Neue", Helvetica, Arial, sans-serif',
            fontSize: '36px',
            fontWeight: 100,
            letterSpacing: '0.72px',
            lineHeight: 1,
          }}>
            {/* Figma top deltas = 106px. With lineHeight 1 (36px text), marginBottom 70 → top-to-top = 106 ✓ */}
            <div style={{ marginLeft: 'calc(37.5% + 22px)', marginBottom: '70px' }}>BECAUSE A VISION SOFTLY CREEPING</div>
            <div style={{ marginLeft: 'calc(4.17% + 1px)', marginBottom: '70px' }}>LEFT ITS SEEDS WHILE I WAS SLEEPING</div>
            <div style={{ marginLeft: 'calc(41.67% + 8px)', marginBottom: '70px' }}>AND THE VISION THAT WAS PLANTED IN MY BRAIN</div>
            <div style={{ marginLeft: 'calc(29.17% - 14px)', marginBottom: '70px' }}>STILL REMAINS</div>
            <div style={{ marginLeft: '50%' }}>WITHIN THE SOUND OF SILENCE</div>
          </div>

          {/* Simon & Garfunkel · 1964 — Space Grotesk Light 16px, 110px below WITHIN, right-anchored at 97px from right edge */}
          <div style={{
            marginTop: '110px',
            marginRight: '6.74%' /* 97/1440 */,
            textAlign: 'right',
            color: '#fff',
            fontFamily: '"Space Grotesk", sans-serif',
            fontWeight: 300,
            fontSize: '16px',
            lineHeight: 1.5,
          }}>
            Simon &amp; Garfunkel · 1964
          </div>

          {/* Credits — Space Grotesk 16px, 292px below Simon & Garfunkel, full-width with 3px left offset */}
          <div style={{
            marginTop: '292px',
            marginLeft: '3px',
            color: '#fff',
            fontFamily: '"Space Grotesk", sans-serif',
            fontWeight: 300,
            fontSize: '16px',
            lineHeight: 1.5,
          }}>
            <span style={{ fontWeight: 700 }}>Realización: </span>
            <span>Gastón Aliaga (INDIGO Lumieres) y Mónica Mostajo + Franco Lavra (GOTA Arquigrafía)   /   </span>
            <span style={{ fontWeight: 700 }}>Instalación: </span>
            <span>Mónica Mostajo + Franco Lavra (GOTA Arquigrafía)   /   </span>
            <span style={{ fontWeight: 700 }}>Acompañamiento Curatorial: </span>
            <span>Facundo López   /   </span>
            <span style={{ fontWeight: 700 }}>Dirección Audiovisual: </span>
            <span>Martín Rois   /   </span>
            <span style={{ fontWeight: 700 }}>Composición Musical: </span>
            <span>Francisco Rousset Osio   /   </span>
            <span style={{ fontWeight: 700 }}>Registro Fotográfico: </span>
            <span>Bianca Siffredi   /   </span>
            <span style={{ fontWeight: 700 }}>2do en Cámara: </span>
            <span>Felipe Malatesta   /   </span>
            <span style={{ fontWeight: 700 }}>Co-Proyección y Modelado: </span>
            <span>Francisca Gil Sosa   /   </span>
            <span style={{ fontWeight: 700 }}>Colaboración Integral Post-Montaje: </span>
            <span>Juan Ignacio Scheller</span>
          </div>
        </div>
      </ParallaxSection>
      </div>{/* /eco-desktop */}

      {/* ── ECO MOBILE ───────────────────────────────────────────────── */}
      <div className="eco-mobile" style={{ backgroundColor: '#0F0F0F', overflow: 'hidden' }}>

        {/* Hero */}
        <img src={ASSETS.hero} alt="" style={{ display: 'block', width: '100%', height: '561px', objectFit: 'cover' }} />

        {/* Para 1 */}
        <div className="eco-p" style={{ color: '#fff', padding: '80px 20px 0', maxWidth: '350px' }}>
          <p style={{ marginBottom: '1rem' }}>Si nombramos al nuevo cerebro, es porque él cambió. Y mucho.</p>
          <p>No es más ese conjunto de neuronas que no cede en su lucha por mantenernos vivos. Ha pasado años sumergido en las incontables marejadas de tecnología que nos abruma sin piedad desde que pusimos un caballo delante de un arado.</p>
        </div>

        {/* 3-image cluster (staggered) */}
        <div style={{ position: 'relative', height: '380px', marginTop: '60px' }}>
          <img src={ASSETS.img1} alt="" style={{ position: 'absolute', left: '0px', top: '0', width: '140px', height: '210px', objectFit: 'cover' }} />
          <img src={ASSETS.img2} alt="" style={{ position: 'absolute', left: '110px', top: '80px', width: '170px', height: '114px', objectFit: 'cover' }} />
          <img src={ASSETS.img3} alt="" style={{ position: 'absolute', right: '0px', top: '240px', width: '200px', height: '133px', objectFit: 'cover' }} />
        </div>

        {/* Large portrait + marquee overlay */}
        <div style={{ position: 'relative', width: '100%', height: '525px', marginTop: '20px' }}>
          <img src={ASSETS.img4} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          <div style={{ position: 'absolute', top: '40px', left: 0, width: '100%', height: '30px', overflow: 'hidden' }}>
            <div className="marquee-track" style={{ animationDuration: '22s' }}>
              <div className="marquee-set"><span className="marquee-item" style={{ fontSize: '22px', padding: '0 30px' }}>SI NOMBRAMOS AL NUEVO CEREBRO, ES PORQUE ÉL CAMBIÓ. Y MUCHO. ·</span></div>
              <div className="marquee-set"><span className="marquee-item" style={{ fontSize: '22px', padding: '0 30px' }}>SI NOMBRAMOS AL NUEVO CEREBRO, ES PORQUE ÉL CAMBIÓ. Y MUCHO. ·</span></div>
            </div>
          </div>
        </div>

        {/* Para 2 */}
        <div className="eco-p" style={{ color: '#fff', padding: '80px 20px 0', maxWidth: '350px' }}>
          Constanza Schwartz tampoco cede, y contestará a la tecnología con más esfuerzo humano. De este modo, surgirán espacios que realmente nos transportan a sitios dentro de nuestro universo a los que no llegamos a menudo. Solo lo haremos guiados por la creatividad y su inclemente convocatoria de presencias arcaicas y míticas, figuras atemporales, intensas, al mismo tiempo, conmovedoras y abstractas.
        </div>

        {/* Image pair */}
        <div style={{ position: 'relative', height: '320px', marginTop: '60px' }}>
          <img src={ASSETS.img6} alt="" style={{ position: 'absolute', left: '0px', top: '100px', width: '200px', height: '134px', objectFit: 'cover' }} />
          <img src={ASSETS.img5} alt="" style={{ position: 'absolute', right: '0px', top: '0', width: '200px', height: '300px', objectFit: 'cover' }} />
        </div>

        {/* Full-width */}
        <img src={ASSETS.img7} alt="" style={{ display: 'block', width: '100%', height: '260px', objectFit: 'cover', marginTop: '40px' }} />

        {/* Image pair */}
        <div style={{ position: 'relative', height: '240px', marginTop: '40px' }}>
          <img src={ASSETS.img8} alt="" style={{ position: 'absolute', left: '0px', top: '0', width: '200px', height: '134px', objectFit: 'cover' }} />
          <img src={ASSETS.img9} alt="" style={{ position: 'absolute', right: '0px', top: '80px', width: '200px', height: '133px', objectFit: 'cover' }} />
        </div>

        {/* Para 3 */}
        <div className="eco-p" style={{ color: '#fff', padding: '80px 20px 0', maxWidth: '350px' }}>
          Al desplazarnos por vacíos y llenos, imposibles convergencias, nos conmovemos al tiempo que nos transformamos en cultores y espectadores participativos de su obra.
        </div>

        {/* Image pair staggered */}
        <div style={{ position: 'relative', height: '230px', marginTop: '60px' }}>
          <img src={ASSETS.img10} alt="" style={{ position: 'absolute', right: '0px', top: '0', width: '200px', height: '133px', objectFit: 'cover' }} />
          <img src={ASSETS.img11} alt="" style={{ position: 'absolute', left: '0px', top: '80px', width: '200px', height: '133px', objectFit: 'cover' }} />
        </div>

        {/* Image pair staggered */}
        <div style={{ position: 'relative', height: '230px', marginTop: '20px' }}>
          <img src={ASSETS.img13} alt="" style={{ position: 'absolute', right: '0px', top: '0', width: '200px', height: '133px', objectFit: 'cover' }} />
          <img src={ASSETS.img12} alt="" style={{ position: 'absolute', left: '0px', top: '80px', width: '200px', height: '133px', objectFit: 'cover' }} />
        </div>

        {/* Video placeholder - making off */}
        <div style={{ width: '100%', height: '219px', marginTop: '40px', background: 'rgba(249,148,64,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <span className="eco-p" style={{ color: '#fff', letterSpacing: '0.05em' }}>VIDEO MAKING OFF</span>
        </div>

        {/* Three diagonal images */}
        <div style={{ position: 'relative', height: '420px', marginTop: '40px' }}>
          <img src={ASSETS.img14} alt="" style={{ position: 'absolute', left: '20px', top: '0', width: '140px', height: '210px', objectFit: 'cover' }} />
          <img src={ASSETS.img15} alt="" style={{ position: 'absolute', left: '125px', top: '100px', width: '140px', height: '210px', objectFit: 'cover' }} />
          <img src={ASSETS.img16} alt="" style={{ position: 'absolute', right: '20px', top: '200px', width: '140px', height: '210px', objectFit: 'cover' }} />
        </div>

        {/* Para 4 */}
        <div className="eco-p" style={{ color: '#fff', padding: '80px 20px 0', maxWidth: '350px' }}>
          La potencia de esta creación no da lugar a ausentarse. Participamos sin descanso, metro a metro, de las síntesis sensibles que reavivan las fraguas más ardientes de la memoria para trasladarnos a espacios libres donde sus elementales e infinitas combinaciones se reproducen y rebobinan en nuestra mente, aunando pasados, presentes y futuros que resurgen ante nuestro caminar buscando un sentido. Hay muchos.
        </div>

        {/* Image pair */}
        <div style={{ position: 'relative', height: '470px', marginTop: '60px' }}>
          <img src={ASSETS.img17} alt="" style={{ position: 'absolute', left: '20px', top: '0', width: '200px', height: '300px', objectFit: 'cover' }} />
          <img src={ASSETS.img18} alt="" style={{ position: 'absolute', right: '20px', top: '150px', width: '200px', height: '300px', objectFit: 'cover' }} />
        </div>

        {/* Marquee */}
        <div style={{ marginTop: '60px', height: '30px', overflow: 'hidden' }}>
          <div className="marquee-track" style={{ animationDuration: '24s' }}>
            <div className="marquee-set"><span className="marquee-item" style={{ fontSize: '22px', padding: '0 30px' }}>SE REPRODUCEN Y REBOBINAN EN NUESTRA MENTE, AUNANDO PASADOS, PRESENTES Y FUTUROS ·</span></div>
            <div className="marquee-set"><span className="marquee-item" style={{ fontSize: '22px', padding: '0 30px' }}>SE REPRODUCEN Y REBOBINAN EN NUESTRA MENTE, AUNANDO PASADOS, PRESENTES Y FUTUROS ·</span></div>
          </div>
        </div>

        {/* Full-width */}
        <img src={ASSETS.img19} alt="" style={{ display: 'block', width: '100%', height: '260px', objectFit: 'cover', marginTop: '40px' }} />

        {/* Image pair staggered */}
        <div style={{ position: 'relative', height: '300px', marginTop: '40px' }}>
          <img src={ASSETS.img20} alt="" style={{ position: 'absolute', left: '20px', top: '0', width: '200px', height: '200px', objectFit: 'cover' }} />
          <img src={ASSETS.img21} alt="" style={{ position: 'absolute', right: '20px', top: '80px', width: '200px', height: '200px', objectFit: 'cover' }} />
        </div>

        {/* Full-width */}
        <img src={ASSETS.img22} alt="" style={{ display: 'block', width: '100%', height: '260px', objectFit: 'cover', marginTop: '40px' }} />

        {/* Para 5 */}
        <div className="eco-p" style={{ color: '#fff', padding: '80px 20px 0', maxWidth: '350px' }}>
          Una plenitud sin alarmas nos tranquiliza desde la convicción de que este es nuestro universo. Aquí, unidos a Constanza, seguimos caminando sin dudar. Aceptamos ser guiados porque son las formas con las que hemos construido el mundo. Así dejamos huella de nuestro paso por la Tierra. Nos traslada a los inicios, mientras nos apoyamos confiados en las formas abiertas y fundamentales de nuestro alfabeto de formas. No importa el siglo de nuestra ubicación defensiva. Seguiremos dudando hasta que realmente nos reconozcamos allí. Somos habitantes de un extenso universo que nunca podrá ser resumido a tres o cuatro números. Son infinitos. Son un Eco al Infinito. Que se reitera, se reitera, se reitera hasta que logremos ubicarnos. Es nuestro universo…
        </div>

        {/* Image pair offset */}
        <div style={{ position: 'relative', height: '360px', marginTop: '60px' }}>
          <img src={ASSETS.img23} alt="" style={{ position: 'absolute', right: '20px', top: '0', width: '200px', height: '270px', objectFit: 'cover' }} />
          <img src={ASSETS.img24} alt="" style={{ position: 'absolute', left: '20px', top: '100px', width: '200px', height: '170px', objectFit: 'cover' }} />
        </div>

        {/* Marquee */}
        <div style={{ marginTop: '60px', height: '30px', overflow: 'hidden' }}>
          <div className="marquee-track" style={{ animationDuration: '28s' }}>
            <div className="marquee-set"><span className="marquee-item" style={{ fontSize: '22px', padding: '0 30px' }}>Seguiremos dudando hasta que realmente nos reconozcamos allí. ·</span></div>
            <div className="marquee-set"><span className="marquee-item" style={{ fontSize: '22px', padding: '0 30px' }}>Seguiremos dudando hasta que realmente nos reconozcamos allí. ·</span></div>
          </div>
        </div>

        {/* Full-width */}
        <img src={ASSETS.img25} alt="" style={{ display: 'block', width: '100%', height: '260px', objectFit: 'cover', marginTop: '40px' }} />

        {/* Image pair 170px */}
        <div style={{ position: 'relative', height: '310px', marginTop: '40px' }}>
          <img src={ASSETS.img26} alt="" style={{ position: 'absolute', left: '20px', top: '0', width: '170px', height: '210px', objectFit: 'cover' }} />
          <img src={ASSETS.img27} alt="" style={{ position: 'absolute', right: '20px', top: '80px', width: '170px', height: '210px', objectFit: 'cover' }} />
        </div>

        {/* Image pair 200px */}
        <div style={{ position: 'relative', height: '300px', marginTop: '20px' }}>
          <img src={ASSETS.img30} alt="" style={{ position: 'absolute', left: '20px', top: '0', width: '200px', height: '200px', objectFit: 'cover' }} />
          <img src={ASSETS.img31} alt="" style={{ position: 'absolute', right: '20px', top: '80px', width: '200px', height: '200px', objectFit: 'cover' }} />
        </div>

        {/* Carousel 1 */}
        <div style={{ marginTop: '60px', width: '100%', height: CH, overflow: 'hidden' }}>
          <div style={{ display: 'flex', height: CH, width: 'max-content', animation: 'eco-m-c1 14s linear infinite' }}>
            {[ASSETS.carousel1, ASSETS.carousel2, ASSETS.carousel3, ASSETS.carousel4, ASSETS.carousel5,
              ASSETS.carousel1, ASSETS.carousel2, ASSETS.carousel3, ASSETS.carousel4, ASSETS.carousel5].map((src, i) => (
              <img key={i} src={src} alt="" style={{ height: CH, width: CAROUSEL_1_WIDTHS[i % CAROUSEL_1_WIDTHS.length], objectFit: 'cover', display: 'block', flexShrink: 0 }} />
            ))}
          </div>
        </div>
        <style dangerouslySetInnerHTML={{ __html: `@keyframes eco-m-c1 { from { transform: translateX(0) } to { transform: translateX(-50%) } }` }} />

        {/* Image pair (img32/img33) */}
        <div style={{ position: 'relative', height: '320px', marginTop: '60px' }}>
          <img src={ASSETS.img32} alt="" style={{ position: 'absolute', left: '20px', top: '0', width: '170px', height: '230px', objectFit: 'cover' }} />
          <img src={ASSETS.img33} alt="" style={{ position: 'absolute', right: '20px', top: '80px', width: '170px', height: '200px', objectFit: 'cover' }} />
        </div>

        {/* Marquee */}
        <div style={{ marginTop: '60px', height: '30px', overflow: 'hidden' }}>
          <div className="marquee-track" style={{ animationDuration: '26s' }}>
            <div className="marquee-set"><span className="marquee-item" style={{ fontSize: '22px', padding: '0 30px' }}>SIEMPRE HABRÁ UN LUGAR PARA EL ARTE QUE EXPANDE NUESTRA POSIBILIDAD DE ENTENDER ·</span></div>
            <div className="marquee-set"><span className="marquee-item" style={{ fontSize: '22px', padding: '0 30px' }}>SIEMPRE HABRÁ UN LUGAR PARA EL ARTE QUE EXPANDE NUESTRA POSIBILIDAD DE ENTENDER ·</span></div>
          </div>
        </div>

        {/* Video timelapse placeholder */}
        <div style={{ width: '100%', height: '219px', marginTop: '40px', background: 'rgba(249,148,64,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <span className="eco-p" style={{ color: '#fff', letterSpacing: '0.05em' }}>VIDEO TIMELAPSE</span>
        </div>

        {/* Image pair (img34/img35) */}
        <div style={{ position: 'relative', height: '340px', marginTop: '40px' }}>
          <img src={ASSETS.img34} alt="" style={{ position: 'absolute', left: '20px', top: '0', width: '200px', height: '230px', objectFit: 'cover' }} />
          <img src={ASSETS.img35} alt="" style={{ position: 'absolute', right: '20px', top: '90px', width: '200px', height: '200px', objectFit: 'cover' }} />
        </div>

        {/* Carousel 2 */}
        <div style={{ marginTop: '60px', width: '100%', height: CH, overflow: 'hidden' }}>
          <div style={{ display: 'flex', height: CH, width: 'max-content', animation: 'eco-m-c2 18s linear infinite' }}>
            {[ASSETS.carousel6, ASSETS.carousel7, ASSETS.carousel8, ASSETS.carousel9, ASSETS.carousel10, ASSETS.carousel11,
              ASSETS.carousel6, ASSETS.carousel7, ASSETS.carousel8, ASSETS.carousel9, ASSETS.carousel10, ASSETS.carousel11].map((src, i) => (
              <img key={i} src={src} alt="" style={{ height: CH, width: CAROUSEL_2_WIDTHS[i % CAROUSEL_2_WIDTHS.length], objectFit: 'cover', display: 'block', flexShrink: 0 }} />
            ))}
          </div>
        </div>
        <style dangerouslySetInnerHTML={{ __html: `@keyframes eco-m-c2 { from { transform: translateX(0) } to { transform: translateX(-50%) } }` }} />

        {/* Image pair (img36/img37) */}
        <div style={{ position: 'relative', height: '360px', marginTop: '60px' }}>
          <img src={ASSETS.img36} alt="" style={{ position: 'absolute', right: '20px', top: '0', width: '200px', height: '270px', objectFit: 'cover' }} />
          <img src={ASSETS.img37} alt="" style={{ position: 'absolute', left: '20px', top: '100px', width: '200px', height: '170px', objectFit: 'cover' }} />
        </div>

        {/* Full-width */}
        <img src={ASSETS.img38} alt="" style={{ display: 'block', width: '100%', height: '260px', objectFit: 'cover', marginTop: '40px' }} />

        {/* Para 6 */}
        <div className="eco-p" style={{ color: '#fff', padding: '80px 20px 0', maxWidth: '350px' }}>
          Sí, claro. Todavía no conocemos muchos universos, pero puede ser que los haya. Y dentro de ellos, siempre habrá un lugar para el arte que expande nuestra posibilidad de entender y percibir lo diferente. Tal vez nos aterra que esa posibilidad desaparezca. Pero no lo hará. Porque las cosas existen también en nuestras memorias. Quizá aún más intensamente.
        </div>

        {/* Lyrics — Figma 1571:1135..1141 (mobile) — Helvetica Neue LT Std Thin 16px, centered */}
        <div style={{ backgroundColor: '#0F0F0F', marginTop: '40px', padding: '60px 20px 0', textAlign: 'center' }}>
          <div style={{
            color: '#fff',
            textTransform: 'uppercase',
            fontFamily: '"Helvetica Neue LT Std", "Helvetica Neue", Helvetica, Arial, sans-serif',
            fontSize: '16px',
            fontWeight: 100,
            lineHeight: 1,
          }}>
            {/* Figma top deltas = 31px → marginBottom 15px (16 text + 15 gap) */}
            <div style={{ marginBottom: '15px' }}>BECAUSE A VISION SOFTLY CREEPING</div>
            <div style={{ marginBottom: '15px' }}>LEFT ITS SEEDS WHILE I WAS SLEEPING</div>
            <div style={{ marginBottom: '15px' }}>AND THE VISION THAT WAS PLANTED IN MY BRAIN</div>
            <div style={{ marginBottom: '15px' }}>STILL REMAINS</div>
            <div>WITHIN THE SOUND OF SILENCE</div>
          </div>
          {/* Simon & Garfunkel — 51px below WITHIN top → marginTop 35px (51 - 16) */}
          <div style={{
            marginTop: '35px',
            color: '#fff',
            fontFamily: '"Space Grotesk", sans-serif',
            fontWeight: 300,
            fontSize: '15px',
            lineHeight: 1.45,
          }}>
            Simon &amp; Garfunkel · 1964
          </div>
        </div>

      </div>{/* /eco-mobile */}
    </div>
  )
}
