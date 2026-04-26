'use client'

import { ParallaxSection } from '@/src/components/parallax/ParallaxSection'
import { ParallaxLayer } from '@/src/components/parallax/ParallaxLayer'
import { ASSETS } from './assets'
import { TW, TEXT_BLOCK_STYLE, CH } from '../shared'

export { meta } from './meta'

const TITLE_STYLE: React.CSSProperties = {
  fontFamily: '"Helvetica Neue LT Std", "Helvetica Neue", Helvetica, Arial, sans-serif',
  fontWeight: 100,
  color: '#fff',
  textTransform: 'uppercase',
  lineHeight: 1,
}


export function Component() {
  return (
    <div style={{ width: '100%', position: 'relative', backgroundColor: '#0F0F0F', marginTop: '-80px' }} className="dw-container">
      <style dangerouslySetInnerHTML={{
        __html: `
        /* DESIGN WEEK MEXICO - use global tokens from globals.css */

        .dw-h1, .dw-h2, .dw-h3 { font-family: 'Helvetica Neue LT Std', 'Helvetica Neue', Helvetica, Arial, sans-serif; font-weight: 100; }
        .dw-h1 { font-size: var(--h1-size); line-height: var(--h1-lh); letter-spacing: var(--h1-ls); }
        .dw-h2 { font-size: var(--h2-size); line-height: var(--h2-lh); letter-spacing: var(--h2-ls); }
        .dw-h3 { font-size: var(--h3-size); line-height: var(--h3-lh); letter-spacing: var(--h3-ls); }
        .dw-h4 { font-size: var(--h4-size); line-height: 1.2; font-family: 'Helvetica Neue LT Std', 'Helvetica Neue', Helvetica, Arial, sans-serif; font-weight: 300; letter-spacing: 0.02; }
        .dw-list { font-size: var(--list-size); line-height: var(--list-lh); font-family: 'Helvetica Neue LT Std', 'Helvetica Neue', Helvetica, Arial, sans-serif; font-weight: 300; letter-spacing: var(--list-ls); }
        .dw-p { font-size: var(--p-size); line-height: var(--p-lh); font-family: 'Space Grotesk', sans-serif; font-weight: 300; letter-spacing: var(--p-ls); }

        .marquee-item {
          font-family: 'Helvetica Neue LT Std', 'Helvetica Neue', Helvetica, Arial, sans-serif !important;
          font-weight: 300 !important;
          text-transform: uppercase;
        }

        @media (min-width: 1024px) {
          .dw-h1 { font-size: 280px; }
          .dw-h2 { font-size: 128px; }
          .dw-h3 { font-size: 56px; }
          .dw-h4 { font-size: 36px; }
          .dw-list { font-size: 26px; line-height: 1.21; }
          .dw-p { font-size: 16px; line-height: 1.5; }
        }

        /* ─── LAYOUT TOKENS — edit these, not the JSX ─── */
        .dw-container {
          /* section heights */
          --h-hero: 110vh; --h-intro: 60vh; --h-c1: 100vh;
          --h-stmt: 100vh; --h-c2: 140vh;
          /* intro — left text */
          --it-l-t: 15vh;  --it-l-x: 12.71%; --it-l-w: 32.4305%;
          /* intro — right text (ficha: 345px) */
          --it-r-t: 15vh;  --it-r-x: 63.33%; --it-r-w: 23.96%;
          /* collage-1 img2 (behind, left): left=425px, w=467px, h=451px */
          --c1-a-t: 25vh;  --c1-a-x: 29.51%; --c1-a-w: 32.4305%; --c1-a-h: 50vh;
          /* collage-1 img1 (front, right): left=791px, w=588px */
          --c1-b-t: 0vh;   --c1-b-x: 54.93%; --c1-b-w: 40.83%;   --c1-b-h: 48vh;
          /* statement */
          --stmt-x: 12.71%; --stmt-w: 76%;
          /* collage-2 img3 */
          --c2-a-t: 5vh;   --c2-a-x: 63.33%; --c2-a-w: 32.4305%;
          /* collage-2 img4 */
          --c2-b-t: 40vh;  --c2-b-x: 33.33%; --c2-b-w: 32.4305%;
          /* finish staircase */
          --f-img-w: 23.96%;
          --f-img-h: auto;
          --f-img1-x: 4.24%;
          --f-img1-t: 65vh;
          --f-img2-x: 38.12%;
          --f-img2-t: calc(var(--f-img1-t) + 130px);
          --f-img3-x: 71.81%;
          --f-img3-t: calc(var(--f-img2-t) + 130px);
        }

        /* ─── MOBILE (≤ 768px) — edit numbers here to iterate fast ─── */
        @media (max-width: 768px) {
          .dw-container {
            --h-hero: 70vh; --h-intro: 90vh; --h-c1: 110vh; --h-c2: 120vh;
            /* intro — left text: full width, tight top */
            --it-l-t: 9.5vh; --it-l-x: 20px; --it-l-w: calc(100% - 40px);
            /* intro — right text: stacked below, same left */
            --it-r-t: 38vh;  --it-r-x: 20px; --it-r-w: calc(100% - 40px);
            /* collage-1: 140px + 280px */
            --c1-a-t: 5vh;  --c1-a-x: 20px;  --c1-a-w: 140px; --c1-a-h: 50vh;
            --c1-b-t: 15vh; --c1-b-x: 90px;  --c1-b-w: 280px; --c1-b-h: 50vh;
            /* statement */
            --stmt-x: 20px; --stmt-w: calc(100% - 40px);
            /* collage-2: 183px + 183px side by side */
            --c2-a-t: 5vh;  --c2-a-x: 187px; --c2-a-w: 183px;
            --c2-b-t: 15vh; --c2-b-x: 20px;  --c2-b-w: 183px;
            
            /* finish staircase mobile */
            --f-img-w: 280px;
            --f-img-h: 380px;
            --f-img1-x: 20px;
            --f-img1-t: 40vh;
            --f-img2-x: 60px;
            --f-img2-t: calc(var(--f-img1-t) + 80px);
            --f-img3-x: 100px;
            --f-img3-t: calc(var(--f-img2-t) + 80px);
          }
        }
      `}} />

      {/* 1. HERO — Large centered sculpture */}
      <ParallaxSection
        id="hero"
        style={{ minHeight: 'var(--h-hero)' }}
      >
        {/* Full-width black band behind the sculpture */}
        <ParallaxLayer
          sectionId="hero"
          layerIndex={0}
          layer={{ type: 'text', content: '', speed: 0.4 }}
          position={{ top: '80px', left: '0', width: '100%', height: '80vh', zIndex: 0 }}
        >
          <div style={{ width: '100%', height: '100%', backgroundColor: '#0f0f0f' }} />
        </ParallaxLayer>

        {/* Desktop Hero Image */}
        <div className="dw-desktop" style={{ display: 'block' }}>
          <ParallaxLayer
            sectionId="hero"
            layerIndex={1}
            layer={{ type: 'image', src: ASSETS.hero, speed: 0.8, isHero: true, objectFit: 'contain' }}
            position={{ top: '80px', left: '0', width: '100%', height: '80vh', zIndex: 1 }}
          />
        </div>

        {/* Mobile Hero Image */}
        <div className="dw-mobile" style={{ display: 'none' }}>
          <ParallaxLayer
            sectionId="hero"
            layerIndex={2}
            layer={{ type: 'image', src: ASSETS.heroMobile, speed: 0.8, isHero: true, objectFit: 'contain' }}
            position={{ top: '80px', left: '0', width: '100%', height: '80vh', zIndex: 1 }}
          />
        </div>

        <style dangerouslySetInnerHTML={{
          __html: `
          @media (max-width: 768px) {
            .dw-desktop { display: none !important; }
            .dw-mobile { display: block !important; }
          }
          `
        }} />


      </ParallaxSection>

      {/* 2. INTRO — Two columns of text */}
      <ParallaxSection
        id="intro-texts"
        style={{ minHeight: 'var(--h-intro)' }}
      >
        <ParallaxLayer
          sectionId="intro-texts"
          layerIndex={0}
          layer={{ type: 'text', content: '', speed: 0 }}
          position={{ top: 'var(--it-l-t)', left: 'var(--it-l-x)', width: 'var(--it-l-w)', height: 'auto', zIndex: 1 }}
        >
          <div style={TEXT_BLOCK_STYLE} className="dw-p">
            En el marco de Design Week Mexico 2025, Argentina fue el país invitado.
            Constanza Schwartz bajo la representación de Comité357, fue una de las artistas
            seleccionadas para representar al país con Ensayo de Espejismo, híbrido entre
            objeto espejo y escultura.
          </div>
        </ParallaxLayer>

        <ParallaxLayer
          sectionId="intro-texts"
          layerIndex={1}
          layer={{ type: 'text', content: '', speed: 0 }}
          position={{ top: 'var(--it-r-t)', left: 'var(--it-r-x)', width: 'var(--it-r-w)', height: 'auto', zIndex: 1 }}
        >
          <div style={TEXT_BLOCK_STYLE} className="dw-p">
            <p>Título: Ensayo de Espejismo</p>
            <p>Año: 2025</p>
            <p>Materiales: Acero Pulido y Cromado, Madera.</p>
            <p>Medidas: 2.10 x 0.72 x 0.30 x 0.16 mts.</p>
          </div>
        </ParallaxLayer>
      </ParallaxSection>

      <ParallaxSection
        id="collage-1"
        style={{ minHeight: 'var(--h-c1)' }}
      >
        <ParallaxLayer
          sectionId="collage-1"
          layerIndex={0}
          layer={{ type: 'image', src: ASSETS.img2, speed: 0.3 }}
          position={{ top: 'var(--c1-a-t)', left: 'var(--c1-a-x)', width: 'var(--c1-a-w)', height: 'var(--c1-a-h)', zIndex: 1 }}
        />
        <ParallaxLayer
          sectionId="collage-1"
          layerIndex={1}
          layer={{ type: 'image', src: ASSETS.img1, speed: 0.3 }}
          position={{ top: 'var(--c1-b-t)', left: 'var(--c1-b-x)', width: 'var(--c1-b-w)', height: 'var(--c1-b-h)', zIndex: 2 }}
        />
      </ParallaxSection>

      {/* 4. STATEMENT — Title + Two Paragraphs */}
      <ParallaxSection
        id="statement"
        style={{ minHeight: 'var(--h-stmt)' }}
      >
        <ParallaxLayer
          sectionId="statement"
          layerIndex={0}
          layer={{ type: 'text', content: '', speed: 0 }}
          position={{ top: '10vh', left: 'var(--stmt-x)', width: 'var(--stmt-w)', height: 'auto', zIndex: 1 }}
        >
          <h3 style={TITLE_STYLE} className="dw-h3">STATEMENT</h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', maxWidth: '800px', marginTop: '40px' }}>
            <div style={TEXT_BLOCK_STYLE} className="dw-p">
              Pocas personas desconocen totalmente los órganos de los sentidos, pero no todas
              comprenden la magnitud que tienen en nuestra conexión con el mundo/ la realidad.
              Seguramente es diferente la propiocepción, sentido del que tenemos poca conciencia.
            </div>
            <div style={TEXT_BLOCK_STYLE} className="dw-p">
              Se podría decir entonces que un grupo de fantasmas (los sentidos) dirigen toda nuestra
              vida y desde ya nuestra conexión con el arte, el diseño.
            </div>
          </div>
        </ParallaxLayer>
      </ParallaxSection>
      {/* 5. IMAGES 3 & 4 + MARQUEE */}
      <ParallaxSection
        id="collage-2"
        style={{ minHeight: 'var(--h-c2)' }}
      >
        <ParallaxLayer
          sectionId="collage-2"
          layerIndex={0}
          layer={{ type: 'image', src: ASSETS.img3, speed: 0.3 }}
          position={{ top: 'var(--c2-a-t)', left: 'var(--c2-a-x)', width: 'var(--c2-a-w)', height: '80vh', zIndex: 1 }}
        />
        <ParallaxLayer
          sectionId="collage-2"
          layerIndex={1}
          layer={{ type: 'image', src: ASSETS.img4, speed: 0.3 }}
          position={{ top: 'var(--c2-b-t)', left: 'var(--c2-b-x)', width: 'var(--c2-b-w)', height: '80vh', zIndex: 2 }}
        />
        <ParallaxLayer
          sectionId="collage-2"
          layerIndex={2}
          layer={{ type: 'marquee', content: 'UN GRUPO DE FANTASMAS (LOS SENTIDOS) DIRIGEN TODA NUESTRA VIDA Y DESDE YA NUESTRA CONEXIÓN CON EL ARTE, EL DISEÑO.', speed: 0 }}
          position={{ top: '110vh', left: '0', width: '100%', height: '8vh', zIndex: 3 }}
        />
      </ParallaxSection>

      {/* 6. PARAGRAPHS + CAROUSEL */}
      <ParallaxSection
        id="paragraphs-carousel"
        style={{ minHeight: '100vh' }}
      >
        <ParallaxLayer
          sectionId="paragraphs-carousel"
          layerIndex={0}
          layer={{ type: 'text', content: '', speed: 0 }}
          position={{ top: '10vh', left: '55%', width: TW, height: 'auto', zIndex: 1 }}
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            <div style={TEXT_BLOCK_STYLE} className="dw-p">
              Esta obra, híbrido entre objeto espejo y escultura, tiene el propósito de hacer
              consiente para el participante de esta conexión oculta y trascendental.
            </div>
            <div style={TEXT_BLOCK_STYLE} className="dw-p">
              Combinados testigos de acero pulido y cromados, su comportamiento en función a
              sus efectos ópticos, relación con su entorno y efectos lumínicos, permite
              establecer una posibilidad de diálogo donde una forma concreta desvanece sus límites.
            </div>
          </div>
        </ParallaxLayer>

        {/* Carousel */}
        <ParallaxLayer
          sectionId="paragraphs-carousel"
          layerIndex={1}
          layer={{ type: 'image', src: '', speed: 0 }}
          position={{ top: '65vh', left: '0', width: '100%', height: CH, zIndex: 2 }}
        >
          <div style={{ width: '100%', height: CH, overflow: 'hidden' }}>
            <div style={{ display: 'flex', height: CH, width: 'max-content', animation: 'dwm-carousel-scroll 10s linear infinite' }}>
              {[
                ASSETS.carousel1, ASSETS.carousel2, ASSETS.carousel3,
                ASSETS.carousel4, ASSETS.carousel5, ASSETS.carousel6,
                ASSETS.carousel1, ASSETS.carousel2, ASSETS.carousel3,
                ASSETS.carousel4, ASSETS.carousel5, ASSETS.carousel6,
              ].map((src, i) => (
                <img key={i} src={src} alt="" style={{ height: CH, width: 'auto', display: 'block', flexShrink: 0 }} />
              ))}
            </div>
          </div>
        </ParallaxLayer>
        <style dangerouslySetInnerHTML={{
          __html: `
          @keyframes dwm-carousel-scroll {
            from { transform: translateX(0); }
            to   { transform: translateX(-50%); }
          }
        `}} />
      </ParallaxSection>

      {/* 7. FINAL PARAGRAPH */}
      <ParallaxSection
        id="final-paragraph"
        style={{ minHeight: '60vh' }}
      >
        <ParallaxLayer
          sectionId="final-paragraph"
          layerIndex={0}
          layer={{ type: 'text', content: '', speed: 0 }}
          position={{ top: '15vh', left: 'calc(54.17% + 11px)', width: TW, height: 'auto', zIndex: 1 }}
        >
          <div style={TEXT_BLOCK_STYLE} className="dw-p">
            El espejo nos permite a veces intuir que el cuerpo está presente. En este caso, la
            conformación de la estructura permite fragmentar las imágenes que se presentan ante él,
            imágenes que suelen estar unidas pero que en este juego de repetición, de llenos y
            de vacíos, es posible percibir un universo simbólico en una búsqueda por la dilución
            de las líneas divisorias entre lo artístico y lo cotidiano, la imagen y el símbolo.
          </div>
        </ParallaxLayer>
      </ParallaxSection>

      {/* 8. FINAL COLLAGE (5, 6, 7) + MARQUEE */}
      <ParallaxSection
        id="collage-3"
        style={{ minHeight: '160vh' }}
      >
        <ParallaxLayer
          sectionId="collage-3"
          layerIndex={0}
          layer={{ type: 'marquee', content: 'ES POSIBLE PERCIBIR UN UNIVERSO SIMBÓLICO EN UNA BÚSQUEDA POR LA DILUCIÓN DE LAS LÍNEAS DIVISORIAS ENTRE LO ARTÍSTICO Y LO COTIDIANO, LA IMAGEN Y EL SÍMBOLO.', speed: 0 }}
          position={{ top: '2vh', left: '0', width: '100%', height: '8vh', zIndex: 4 }}
        />
        <ParallaxLayer
          sectionId="collage-3"
          layerIndex={1}
          layer={{ type: 'image', src: ASSETS.img6, speed: 0.3 }}
          position={{ top: '10vh', left: '10%', width: '80%', height: '110vh', zIndex: 1 }}
        />
        <ParallaxLayer
          sectionId="collage-3"
          layerIndex={2}
          layer={{ type: 'image', src: ASSETS.img5, speed: 0.3 }}
          position={{ top: '5vh', left: '8%', width: '30%', height: '35vh', zIndex: 2 }}
        />
        <ParallaxLayer
          sectionId="collage-3"
          layerIndex={3}
          layer={{ type: 'image', src: ASSETS.img7, speed: 0.3 }}
          position={{ top: '80vh', left: '55%', width: '35%', height: '40vh', zIndex: 3 }}
        />
      </ParallaxSection>

      {/* 9. FINAL STEPS (8, 9, 10) + FINAL TEXTS */}
      <ParallaxSection
        id="finish"
        style={{ minHeight: '230vh' }}
      >
        {/* Intro text for this section - Aligned to left like the others */}
        <ParallaxLayer
          sectionId="finish"
          layerIndex={0}
          layer={{ type: 'text', content: '', speed: 0 }}
          position={{ top: '10vh', left: '12.71%', width: TW, height: 'auto', zIndex: 1 }}
        >
          <div style={TEXT_BLOCK_STYLE} className="dw-p">
            Con la utilización de espejos, se posibilita el juego de distorsión de la realidad
            en un claro paralelismo e intento de mirada introspectiva sobre nuestra nueva
            generación de diseño argentino; los materiales innovadores que pueden también
            volver a resinificar formas y formatos de previas épocas gloriosas de experimentación
            vanguardista, piezas únicas y el uso de la fragmentación representando la búsqueda
            incesante de descubrir nuevas y diferentes facetas del diseño. Vínculos y
            comportamientos como sociedad. Traspasar todo limite, libertad sin límites,
            profundidad, amplitud, variabilidad de posibilidades.
          </div>
        </ParallaxLayer>

        {/* Staircase Images */}
        <ParallaxLayer
          sectionId="finish"
          layerIndex={1}
          layer={{ type: 'image', src: ASSETS.img8, speed: 0.3 }}
          position={{ top: 'var(--f-img1-t)', left: 'var(--f-img1-x)', width: 'var(--f-img-w)', height: 'var(--f-img-h)', zIndex: 1 }}
        />
        <ParallaxLayer
          sectionId="finish"
          layerIndex={2}
          layer={{ type: 'image', src: ASSETS.img9, speed: 0.3 }}
          position={{ top: 'var(--f-img2-t)', left: 'var(--f-img2-x)', width: 'var(--f-img-w)', height: 'var(--f-img-h)', zIndex: 2 }}
        />
        <ParallaxLayer
          sectionId="finish"
          layerIndex={3}
          layer={{ type: 'image', src: ASSETS.img10, speed: 0.3 }}
          position={{ top: 'var(--f-img3-t)', left: 'var(--f-img3-x)', width: 'var(--f-img-w)', height: 'var(--f-img-h)', zIndex: 3 }}
        />

        {/* Final Marquee - Overlapping the images */}
        <ParallaxLayer
          sectionId="finish"
          layerIndex={4}
          layer={{ type: 'marquee', content: 'INTENTA FRACTURAR LA COMPLACENCIA CON LA INDUSTRIALIZACIÓN Y LA TECNIFICACIÓN QUE TOMAMOS POR NATURALEZA DEL SIGLO XXI', speed: 0.8 }}
          position={{ top: '140vh', left: '0', width: '100%', height: '8vh', zIndex: 5 }}
        />

        {/* Closing Paragraph - Aligned to left block instead of center */}
        <ParallaxLayer
          sectionId="finish"
          layerIndex={5}
          layer={{ type: 'text', content: '', speed: 0 }}
          position={{ top: '190vh', left: '12.71%', width: TW, height: 'auto', zIndex: 6 }}
        >
          <div style={TEXT_BLOCK_STYLE} className="dw-p">
            Ensayo de Espejismo busca apelar a varios sentidos en simultáneo. Asimismo, intenta
            fracturar la complacencia con la industrialización y la tecnificación que tomamos
            por naturaleza del siglo XXI. Esta es una obra que resalta la confusión de un acabado
            “de máquina”, “perfecto” cuando su proceso es único y enteramente artesanal.
          </div>
        </ParallaxLayer>
      </ParallaxSection>

    </div>
  )
}
