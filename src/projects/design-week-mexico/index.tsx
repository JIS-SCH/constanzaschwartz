'use client'

import { ParallaxSection } from '@/src/components/parallax/ParallaxSection'
import { ParallaxLayer } from '@/src/components/parallax/ParallaxLayer'
import { ASSETS } from './assets'
import { TEXT_BLOCK_STYLE, CH } from '../shared'

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
        .dw-h1, .dw-h2, .dw-h3 { font-family: 'Helvetica Neue LT Std', 'Helvetica Neue', Helvetica, Arial, sans-serif; font-weight: 100; }
        .dw-h1 { font-size: var(--h1-size); line-height: var(--h1-lh); letter-spacing: var(--h1-ls); }
        .dw-h2 { font-size: var(--h2-size); line-height: var(--h2-lh); letter-spacing: var(--h2-ls); }
        .dw-h3 { font-size: var(--h3-size); line-height: var(--h3-lh); letter-spacing: var(--h3-ls); }
        .dw-h4 { font-size: var(--h4-size); line-height: var(--h4-lh); font-family: 'Helvetica Neue LT Std', 'Helvetica Neue', Helvetica, Arial, sans-serif; font-weight: 300; letter-spacing: var(--h4-ls); }
        .dw-p { font-size: var(--p-size); line-height: var(--p-lh); font-family: 'Space Grotesk', sans-serif; font-weight: 300; letter-spacing: var(--p-ls); }

        .marquee-item {
          font-family: 'Helvetica Neue LT Std', 'Helvetica Neue', Helvetica, Arial, sans-serif !important;
          font-weight: 100 !important;
          text-transform: uppercase;
          mix-blend-mode: difference;
        }
        @media (min-width: 769px) {
          .marquee-item {
            font-size: 36px !important;
            font-weight: 100 !important;
            letter-spacing: 0.02em !important;
            line-height: normal !important;
            padding-right: 80px !important;
          }
        }

        /* ─── LAYOUT TOKENS ─── */
        .dw-container {
          /* section heights — fixed-px approach ensures exact 220px gaps */
          /* h-hero = 80vh (image) + 300px (220px gap + 80px for neg-margin) */
          --h-hero: calc(80vh + 300px); --h-intro: 340px; --h-c1: calc(343px + 48.61vw);
          --h-stmt: 480px; --h-c2: calc(72.915vw + 220px);
          --h-pc: 994px; --h-fp: 440px; --h-c3: calc(9vw + 66.67vw + 220px); --h-finish: calc(220px + 260px + 35vw + 20px + 220px + 250px);

          /* intro — starts at section top which is exactly 220px after hero */
          --it-l-t: 0px; --it-l-x: 12.71%; --it-l-w: 32.4305%;
          --it-r-t: 0px; --it-r-x: 63.33%; --it-r-w: 23.96%;

          /* collage-1 — c1-a offset matches Figma (143px below c1-b) */
          --c1-a-t: 143px; --c1-a-x: 29.51%; --c1-a-w: 32.4305%; --c1-a-h: 48.61vw;
          --c1-b-t: 0px;   --c1-b-x: 54.93%; --c1-b-w: 40.83%;   --c1-b-h: 27.22vw;

          /* statement — fixed px: 20px top + ~240px content + 220px gap = 480px */
          --stmt-x: 12.71%; --stmt-w: 32.4305%; --stmt-t: 20px;

          /* collage-2 — c2-a top=0 so 220px gap comes from stmt section tail */
          --c2-a-t: 0px;           --c2-a-x: 63.33%; --c2-a-w: 32.4305%; --c2-a-h: 48.61vw;
          --c2-b-t: calc(24.305vw); --c2-b-x: 33.75%; --c2-b-w: 32.4305%; --c2-b-h: 48.61vw;
          --c2-marquee-t: 42vw;

          /* paragraphs-carousel */
          --pc-text-t: 0px; --pc-text-l: 55%; --pc-text-w: 32.4305%;
          --pc-carousel-t: 444px;

          /* final-paragraph */
          --fp-text-t: 0px; --fp-text-l: 55%; --fp-text-w: 32.4305%;

          /* collage-3: img5 top-left, img6 full-width center, img7 bottom-right */
          --c3-a-t: 0px;      --c3-a-x: 8.47%;  --c3-a-w: 32.4305%; --c3-a-h: 21.67vw;
          --c3-b-t: 9vw;      --c3-b-x: 0%;     --c3-b-w: 100%;     --c3-b-h: 66.67vw;
          --c3-c-t: calc(9vw + 66.67vw - 21.60vw); --c3-c-x: 59.17%; --c3-c-w: 32.4305%; --c3-c-h: 21.60vw;
          --c3-marquee-t: 0px;

          /* finish: now uses flow layout — no positioning vars needed */
        }

        /* ─── MOBILE (≤ 768px) ─── */
        @media (max-width: 768px) {
          .dw-container {
            /* section heights */
            --h-hero: 750px; --h-intro: 320px; --h-c1: 580px;
            --h-stmt: 380px; --h-c2: 810px;
            --h-pc: 720px;   --h-fp: 310px;   --h-c3: 540px; --h-finish: 1500px;

            /* intro */
            --it-l-t: 30px;  --it-l-x: 20px; --it-l-w: calc(100% - 40px);
            --it-r-t: 185px; --it-r-x: 20px; --it-r-w: calc(100% - 40px);

            /* collage-1 */
            --c1-a-t: 148px; --c1-a-x: 20px;  --c1-a-w: 230px; --c1-a-h: 345px;
            --c1-b-t: 0px;   --c1-b-x: 110px; --c1-b-w: 280px; --c1-b-h: 187px;

            /* statement */
            --stmt-x: 20px; --stmt-w: calc(100% - 40px); --stmt-t: 30px;

            /* collage-2 */
            --c2-a-t: 0px;   --c2-a-x: 187px; --c2-a-w: 183px; --c2-a-h: 274px;
            --c2-b-t: 184px; --c2-b-x: 20px;  --c2-b-w: 183px; --c2-b-h: 274px;
            --c2-marquee-t: 500px;

            /* paragraphs-carousel */
            --pc-text-t: 30px; --pc-text-l: 20px; --pc-text-w: calc(100% - 40px);
            --pc-carousel-t: 400px;

            /* final-paragraph */
            --fp-text-t: 20px; --fp-text-l: 20px; --fp-text-w: calc(100% - 40px);

            /* collage-3 */
            --c3-a-t: 60px;  --c3-a-x: 20px;  --c3-a-w: 138px; --c3-a-h: 93px;
            --c3-b-t: 100px; --c3-b-x: 0px;   --c3-b-w: 100%;  --c3-b-h: 261px;
            --c3-c-t: 320px; --c3-c-x: 229px; --c3-c-w: 141px; --c3-c-h: 94px;
            --c3-marquee-t: 40px;

            /* finish */
            --finish-text-t: 30px; --finish-text-l: 20px; --finish-text-w: calc(100% - 40px);
            --finish-marquee-t: 890px;
            --finish-close-t: 1080px; --finish-close-l: 20px; --finish-close-w: calc(100% - 40px);

            /* finish staircase */
            --f-img-w: 140px; --f-img-h: 209px;
            --f-img1-x: 20px;  --f-img1-t: 500px;
            --f-img2-x: 125px; --f-img2-t: 640px;
            --f-img3-x: 230px; --f-img3-t: 780px;
          }
          .dw-desktop { display: none !important; }
          .dw-mobile  { display: block !important; }
        }

        @keyframes dwm-carousel-scroll {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
      `}} />

      {/* 1. HERO */}
      <ParallaxSection id="hero" style={{ minHeight: 'var(--h-hero)' }}>
        <ParallaxLayer
          sectionId="hero" layerIndex={0}
          layer={{ type: 'text', content: '', speed: 0 }}
          position={{ top: '80px', left: '0', width: '100%', height: '80vh', zIndex: 0 }}
        >
          <div style={{ width: '100%', height: '100%', backgroundColor: '#0f0f0f' }} />
        </ParallaxLayer>

        <div className="dw-desktop" style={{ display: 'block' }}>
          <ParallaxLayer
            sectionId="hero" layerIndex={1}
            layer={{ type: 'image', src: ASSETS.hero, speed: 0, isHero: true, objectFit: 'cover' }}
            position={{ top: '80px', left: '0', width: '100%', height: '80vh', zIndex: 1 }}
          />
        </div>

        <div className="dw-mobile" style={{ display: 'none' }}>
          <ParallaxLayer
            sectionId="hero" layerIndex={2}
            layer={{ type: 'image', src: ASSETS.heroMobile, speed: 0, isHero: true, objectFit: 'cover' }}
            position={{ top: '0', left: '0', width: '100%', height: '100%', zIndex: 1 }}
          />
        </div>
      </ParallaxSection>

      {/* 2. INTRO */}
      <ParallaxSection id="intro-texts" style={{ minHeight: 'var(--h-intro)' }}>
        <ParallaxLayer
          sectionId="intro-texts" layerIndex={0}
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
          sectionId="intro-texts" layerIndex={1}
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

      {/* 3. COLLAGE-1 */}
      <ParallaxSection id="collage-1" style={{ minHeight: 'var(--h-c1)' }}>
        <ParallaxLayer
          sectionId="collage-1" layerIndex={0}
          layer={{ type: 'image', src: ASSETS.img2, speed: 0 }}
          position={{ top: 'var(--c1-a-t)', left: 'var(--c1-a-x)', width: 'var(--c1-a-w)', height: 'var(--c1-a-h)', zIndex: 1 }}
        />
        <ParallaxLayer
          sectionId="collage-1" layerIndex={1}
          layer={{ type: 'image', src: ASSETS.img1, speed: 0 }}
          position={{ top: 'var(--c1-b-t)', left: 'var(--c1-b-x)', width: 'var(--c1-b-w)', height: 'var(--c1-b-h)', zIndex: 2 }}
        />
      </ParallaxSection>

      {/* 4. STATEMENT */}
      <ParallaxSection id="statement" style={{ minHeight: 'var(--h-stmt)' }}>
        <ParallaxLayer
          sectionId="statement" layerIndex={0}
          layer={{ type: 'text', content: '', speed: 0 }}
          position={{ top: 'var(--stmt-t)', left: 'var(--stmt-x)', width: 'var(--stmt-w)', height: 'auto', zIndex: 1 }}
        >
          <h3 style={TITLE_STYLE} className="dw-h3">STATEMENT</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', maxWidth: '466px', marginTop: '40px' }}>
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

      {/* 5. COLLAGE-2 + MARQUEE */}
      <ParallaxSection id="collage-2" style={{ minHeight: 'var(--h-c2)' }}>
        <ParallaxLayer
          sectionId="collage-2" layerIndex={0}
          layer={{ type: 'image', src: ASSETS.img3, speed: 0 }}
          position={{ top: 'var(--c2-a-t)', left: 'var(--c2-a-x)', width: 'var(--c2-a-w)', height: 'var(--c2-a-h)', zIndex: 1 }}
        />
        <ParallaxLayer
          sectionId="collage-2" layerIndex={1}
          layer={{ type: 'image', src: ASSETS.img4, speed: 0 }}
          position={{ top: 'var(--c2-b-t)', left: 'var(--c2-b-x)', width: 'var(--c2-b-w)', height: 'var(--c2-b-h)', zIndex: 2 }}
        />
        <ParallaxLayer
          sectionId="collage-2" layerIndex={2}
          layer={{ type: 'marquee', content: 'UN GRUPO DE FANTASMAS (LOS SENTIDOS) DIRIGEN TODA NUESTRA VIDA Y DESDE YA NUESTRA CONEXIÓN CON EL ARTE, EL DISEÑO.', speed: 0 }}
          position={{ top: 'var(--c2-marquee-t)', left: '0', width: '100%', height: '8vh', zIndex: 3 }}
        />
      </ParallaxSection>

      {/* 6. PARAGRAPHS + CAROUSEL */}
      <ParallaxSection id="paragraphs-carousel" style={{ minHeight: 'var(--h-pc)' }}>
        <ParallaxLayer
          sectionId="paragraphs-carousel" layerIndex={0}
          layer={{ type: 'text', content: '', speed: 0 }}
          position={{ top: 'var(--pc-text-t)', left: 'var(--pc-text-l)', width: 'var(--pc-text-w)', height: 'auto', zIndex: 1 }}
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

        <ParallaxLayer
          sectionId="paragraphs-carousel" layerIndex={1}
          layer={{ type: 'image', src: '', speed: 0 }}
          position={{ top: 'var(--pc-carousel-t)', left: '0', width: '100%', height: CH, zIndex: 2 }}
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
      </ParallaxSection>

      {/* 7. FINAL PARAGRAPH */}
      <ParallaxSection id="final-paragraph" style={{ minHeight: 'var(--h-fp)' }}>
        <ParallaxLayer
          sectionId="final-paragraph" layerIndex={0}
          layer={{ type: 'text', content: '', speed: 0 }}
          position={{ top: 'var(--fp-text-t)', left: 'var(--fp-text-l)', width: 'var(--fp-text-w)', height: 'auto', zIndex: 1 }}
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

      {/* 8. COLLAGE-3 + MARQUEE */}
      <ParallaxSection id="collage-3" style={{ minHeight: 'var(--h-c3)' }}>
        <ParallaxLayer
          sectionId="collage-3" layerIndex={0}
          layer={{ type: 'marquee', content: 'ES POSIBLE PERCIBIR UN UNIVERSO SIMBÓLICO EN UNA BÚSQUEDA POR LA DILUCIÓN DE LAS LÍNEAS DIVISORIAS ENTRE LO ARTÍSTICO Y LO COTIDIANO, LA IMAGEN Y EL SÍMBOLO.', speed: 0 }}
          position={{ top: 'var(--c3-marquee-t, 2vh)', left: '0', width: '100%', height: '8vh', zIndex: 4 }}
        />
        <ParallaxLayer
          sectionId="collage-3" layerIndex={1}
          layer={{ type: 'image', src: ASSETS.img6, speed: 0 }}
          position={{ top: 'var(--c3-b-t)', left: 'var(--c3-b-x)', width: 'var(--c3-b-w)', height: 'var(--c3-b-h)', zIndex: 1 }}
        />
        <ParallaxLayer
          sectionId="collage-3" layerIndex={2}
          layer={{ type: 'image', src: ASSETS.img5, speed: 0 }}
          position={{ top: 'var(--c3-a-t)', left: 'var(--c3-a-x)', width: 'var(--c3-a-w)', height: 'var(--c3-a-h)', zIndex: 2 }}
        />
        <ParallaxLayer
          sectionId="collage-3" layerIndex={3}
          layer={{ type: 'image', src: ASSETS.img7, speed: 0 }}
          position={{ top: 'var(--c3-c-t)', left: 'var(--c3-c-x)', width: 'var(--c3-c-w)', height: 'var(--c3-c-h)', zIndex: 3 }}
        />
      </ParallaxSection>

      {/* 9. FINISH — flow layout for natural 220px gaps */}
      <section id="finish" style={{ position: 'relative', width: '100%' }}>
        {/* Text paragraph */}
        <div style={{ paddingLeft: '32.4305%', paddingRight: '35%' }}>
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
        </div>

        {/* 220px gap */}
        <div style={{ height: '220px' }} />

        {/* Staircase images: 3 images in a row, staggered vertically */}
        <div className="dw-staircase" style={{ position: 'relative', width: '100%', height: 'calc(260px + 36vw)' }}>
          <img src={ASSETS.img8} alt="" loading="lazy" decoding="async"
            style={{ position: 'absolute', left: '4.24%', top: 0, width: '23.96%', height: 'auto', display: 'block' }} />
          <img src={ASSETS.img9} alt="" loading="lazy" decoding="async"
            style={{ position: 'absolute', left: '38.12%', top: '130px', width: '23.96%', height: 'auto', display: 'block' }} />
          <img src={ASSETS.img10} alt="" loading="lazy" decoding="async"
            style={{ position: 'absolute', left: '71.81%', top: '260px', width: '23.96%', height: 'auto', display: 'block' }} />
        </div>

        {/* Marquee — touching img10 bottom */}
        <div style={{
          width: '100%', overflow: 'hidden',
          mixBlendMode: 'difference',
          ...(({ WebkitMixBlendMode: 'difference', transform: 'translateZ(0)' }) as any),
        }}>
          <div className="marquee-track" style={{ animationDuration: '88s' }}>
            {[0, 1].map((setIdx) => (
              <div key={setIdx} className="marquee-set">
                {Array.from({ length: 4 }, (_, i) => (
                  <span key={i} className="marquee-item">
                    INTENTA FRACTURAR LA COMPLACENCIA CON LA INDUSTRIALIZACIÓN Y LA TECNIFICACIÓN QUE TOMAMOS POR NATURALEZA DEL SIGLO XXI
                  </span>
                ))}
              </div>
            ))}
          </div>
        </div>

        {/* 220px gap */}
        <div style={{ height: '220px' }} />

        {/* Closing text */}
        <div style={{ paddingLeft: '7.64%', paddingRight: '60%' }}>
          <div style={TEXT_BLOCK_STYLE} className="dw-p">
            Ensayo de Espejismo busca apelar a varios sentidos en simultáneo. Asimismo, intenta
            fracturar la complacencia con la industrialización y la tecnificación que tomamos
            por naturaleza del siglo XXI. Esta es una obra que resalta la confusión de un acabado
            &quot;de máquina&quot;, &quot;perfecto&quot; cuando su proceso es único y enteramente artesanal.
          </div>
        </div>
      </section>

    </div>
  )
}
