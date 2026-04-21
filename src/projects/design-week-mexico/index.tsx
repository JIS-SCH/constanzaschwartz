'use client'

import { ParallaxSection } from '@/src/components/parallax/ParallaxSection'
import { ParallaxLayer } from '@/src/components/parallax/ParallaxLayer'
import { ASSETS } from './assets'

export { meta } from './meta'
// export { gallery } from './gallery'

const TEXT_BLOCK_STYLE: React.CSSProperties = {
  fontFamily: '"Space Grotesk", sans-serif',
  fontWeight: 300,
  lineHeight: 1.5,
  color: '#fff',
}

const TITLE_STYLE: React.CSSProperties = {
  fontFamily: '"Helvetica Neue LT Std", "Helvetica Neue", Helvetica, Arial, sans-serif',
  fontWeight: 100, // 35 Thin
  color: '#fff',
  textTransform: 'uppercase',
  lineHeight: 1,
}

export function Component() {
  return (
    <div style={{ width: '100%', position: 'relative', backgroundColor: '#0F0F0F' }} className="dw-container">
      <style dangerouslySetInnerHTML={{
        __html: `
        /* TYPOGRAPHY SYSTEM - DESIGN WEEK MEXICO */
        .dw-container {
          --h1-d: 280px; --h1-m: 170px;
          --h2-d: 128px; --h2-m: 57px;
          --h3-d: 56px;  --h3-m: 36px;
          --h4-d: 36px;  --h4-m: 28px;
          --list-d: 26px; --list-m: 15px;
          --p-d: 16px;   --p-m: 15px;
        }

        .dw-h1 { font-size: var(--h1-m); line-height: 1; font-family: "Helvetica Neue LT Std", "Helvetica Neue", Helvetica; font-weight: 100; letter-spacing: 0; }
        .dw-h2 { font-size: var(--h2-m); line-height: 1; font-family: "Helvetica Neue LT Std", "Helvetica Neue", Helvetica; font-weight: 100; letter-spacing: 0; }
        .dw-h3 { font-size: var(--h3-m); line-height: 1; font-family: "Helvetica Neue LT Std", "Helvetica Neue", Helvetica; font-weight: 100; letter-spacing: 0; }
        .dw-h4 { font-size: var(--h4-m); line-height: 1.2; font-family: "Helvetica Neue LT Std", "Helvetica Neue", Helvetica; font-weight: 300; letter-spacing: 0.02em; }
        .dw-list { font-size: var(--list-m); line-height: 1.15; font-family: "Helvetica Neue LT Std", "Helvetica Neue", Helvetica; font-weight: 300; letter-spacing: 0; }
        .dw-p { font-size: var(--p-m); line-height: 1.45; font-family: "Space Grotesk", sans-serif; font-weight: 300; letter-spacing: 0; }

        .marquee-item {
          font-family: "Helvetica Neue LT Std", "Helvetica Neue", Helvetica, Arial, sans-serif !important;
          font-weight: 300 !important;
          text-transform: uppercase;
        }

        @media (min-width: 1024px) {
          .dw-h1 { font-size: var(--h1-d); }
          .dw-h2 { font-size: var(--h2-d); }
          .dw-h3 { font-size: var(--h3-d); }
          .dw-h4 { font-size: var(--h4-d); }
          .dw-list { font-size: var(--list-d); line-height: 1.21; }
          .dw-p { font-size: var(--p-d); line-height: 1.5; }
        }
      `}} />

      {/* 1. HERO — Large centered sculpture */}
      <ParallaxSection
        id="hero"
        style={{ minHeight: '110vh' }}
      >
        {/* Full-width black band behind the sculpture */}
        <ParallaxLayer
          sectionId="hero"
          layerIndex={0}
          layer={{ type: 'text', content: '', speed: 0.4 }}
          position={{ top: '12vh', left: '0', width: '100%', height: '80vh', zIndex: 0 }}
        >
          <div style={{ width: '100%', height: '100%', backgroundColor: '#000' }} />
        </ParallaxLayer>

        <ParallaxLayer
          sectionId="hero"
          layerIndex={1}
          layer={{ type: 'image', src: ASSETS.hero, speed: 0.4, isHero: true, objectFit: 'contain' }}
          position={{ top: '12vh', left: '35%', width: '30%', height: '80vh', zIndex: 1 }}
        />
      </ParallaxSection>

      {/* 2. INTRO — Two columns of text */}
      <ParallaxSection
        id="intro-texts"
        style={{ minHeight: '60vh' }}
      >
        <ParallaxLayer
          sectionId="intro-texts"
          layerIndex={0}
          layer={{ type: 'text', content: '', speed: 0 }} // We use children for custom rendering
          position={{ top: '15vh', left: '12%', width: '38%', height: 'auto', zIndex: 1 }}
        >
          <div style={TEXT_BLOCK_STYLE} className="dw-list">
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
          position={{ top: '15vh', left: '60%', width: '30%', height: 'auto', zIndex: 1 }}
        >
          <div style={TEXT_BLOCK_STYLE} className="dw-list">
            <p><strong>Título:</strong> Ensayo de Espejismo</p>
            <p><strong>Año:</strong> 2025</p>
            <p><strong>Materiales:</strong> Acero Pulido y Cromado, Madera.</p>
            <p><strong>Medidas:</strong> 2.10 x 0.72 x 0.30 x 0.16 mts.</p>
          </div>
        </ParallaxLayer>
      </ParallaxSection>

      <ParallaxSection
        id="collage-1"
        style={{ minHeight: '140vh' }}
      >
        <ParallaxLayer
          sectionId="collage-1"
          layerIndex={0}
          layer={{ type: 'image', src: ASSETS.img1, speed: 0.2 }}
          position={{ top: '20vh', left: '15%', width: '32.4%', height: '90vh', zIndex: 1 }}
        />
        <ParallaxLayer
          sectionId="collage-1"
          layerIndex={1}
          layer={{ type: 'image', src: ASSETS.img2, speed: 0.6 }}
          position={{ top: '5vh', left: '40.4%', width: '40.8%', height: '60vh', zIndex: 2 }}
        />
      </ParallaxSection>

      {/* 4. STATEMENT — Title + Two Paragraphs */}
      <ParallaxSection
        id="statement"
        style={{ minHeight: '100vh' }}
      >
        <ParallaxLayer
          sectionId="statement"
          layerIndex={0}
          layer={{ type: 'text', content: '', speed: 0 }}
          position={{ top: '10vh', left: '12%', width: '76%', height: 'auto', zIndex: 1 }}
        >
          <h2 style={TITLE_STYLE} className="dw-h2">STATEMENT</h2>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', maxWidth: '800px', marginTop: '4rem' }}>
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
        style={{ minHeight: '140vh' }}
      >
        <ParallaxLayer
          sectionId="collage-2"
          layerIndex={0}
          layer={{ type: 'image', src: ASSETS.img3, speed: 0.4 }}
          position={{ top: '5vh', left: '63.3%', width: '32.4%', height: '80vh', zIndex: 1 }}
        />
        <ParallaxLayer
          sectionId="collage-2"
          layerIndex={1}
          layer={{ type: 'image', src: ASSETS.img4, speed: 0.6 }}
          position={{ top: '40vh', left: '33.7%', width: '32.4%', height: '80vh', zIndex: 2 }}
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
          position={{ top: '10vh', left: '55%', width: '35%', height: 'auto', zIndex: 1 }}
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
          position={{ top: '65vh', left: '0', width: '100%', height: '331px', zIndex: 2 }}
        >
          <div className="flex w-max" style={{ height: '331px' }}>
            <div className="flex animate-carousel">
              {[ASSETS.img5, ASSETS.img6, ASSETS.img7, ASSETS.img5, ASSETS.img6, ASSETS.img7].map((src, i) => (
                <div key={i} className="w-[588px] h-[331px] flex-shrink-0">
                  <img src={src} className="w-full h-full object-cover" style={{ height: '331px' }} alt="" />
                </div>
              ))}
            </div>
          </div>
        </ParallaxLayer>
        <style dangerouslySetInnerHTML={{
          __html: `
          @keyframes carousel-scroll {
            0% { transform: translateX(0); }
            100% { transform: translateX(-${3 * 588}px); }
          }
          .animate-carousel {
            animation: carousel-scroll 10s linear infinite;
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
          position={{ top: '15vh', left: '15%', width: '70%', height: 'auto', zIndex: 1 }}
        >
          <div style={{ ...TEXT_BLOCK_STYLE, maxWidth: '800px' }} className="dw-p">
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
          layer={{ type: 'image', src: ASSETS.img6, speed: 0.2 }}
          position={{ top: '10vh', left: '10%', width: '80%', height: '110vh', zIndex: 1 }}
        />
        <ParallaxLayer
          sectionId="collage-3"
          layerIndex={2}
          layer={{ type: 'image', src: ASSETS.img5, speed: 0.45 }}
          position={{ top: '5vh', left: '8%', width: '30%', height: '35vh', zIndex: 2 }}
        />
        <ParallaxLayer
          sectionId="collage-3"
          layerIndex={3}
          layer={{ type: 'image', src: ASSETS.img7, speed: 0.7 }}
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
          position={{ top: '10vh', left: '12%', width: '32%', height: 'auto', zIndex: 1 }}
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
          layer={{ type: 'image', src: ASSETS.img8, speed: 0.25 }}
          position={{ top: '65vh', left: '8%', width: '24%', height: '70vh', zIndex: 1 }}
        />
        <ParallaxLayer
          sectionId="finish"
          layerIndex={2}
          layer={{ type: 'image', src: ASSETS.img9, speed: 0.5 }}
          position={{ top: '80vh', left: '38%', width: '24%', height: '65vh', zIndex: 2 }}
        />
        <ParallaxLayer
          sectionId="finish"
          layerIndex={3}
          layer={{ type: 'image', src: ASSETS.img10, speed: 0.8 }}
          position={{ top: '95vh', left: '68%', width: '24%', height: '70vh', zIndex: 3 }}
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
          position={{ top: '190vh', left: '12%', width: '38%', height: 'auto', zIndex: 6 }}
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
