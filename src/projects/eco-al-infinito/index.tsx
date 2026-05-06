'use client'

import { ParallaxSection } from '@/src/components/parallax/ParallaxSection'
import { ParallaxLayer } from '@/src/components/parallax/ParallaxLayer'
import { PI } from '@/src/components/parallax/ParallaxImg'
import { CustomVimeoPlayer } from '@/src/components/media/CustomVimeoPlayer'
import { ASSETS } from './assets'
import { MARQUEE, CAROUSEL } from '@/src/motion/tokens'
import { TW, CH, HERO_TOP, CAROUSEL_W_NARROW, CAROUSEL_W_WIDE } from '../shared'

/** Consistent vertical gap between sections (px) */
const GAP = '220px'



export { meta } from './meta'

export function Component() {
  return (
    <div style={{ width: '100%', position: 'relative', backgroundColor: '#0F0F0F' }} className="eco-container -mt-20">
      <style dangerouslySetInnerHTML={{
        __html: `
        /* ECO AL INFINITO - use global tokens from globals.css */

        .eco-h1, .eco-h2, .eco-h3 { font-family: 'Helvetica Neue LT Std', 'Helvetica Neue', Helvetica, Arial, sans-serif; font-weight: 100; }
        .eco-h1 { font-size: var(--h1-size); line-height: var(--h1-lh); letter-spacing: var(--h1-ls); }
        .eco-h2 { font-size: var(--h2-size); line-height: var(--h2-lh); letter-spacing: var(--h2-ls); }
        .eco-h3 { font-size: var(--h3-size); line-height: var(--h3-lh); letter-spacing: var(--h3-ls); }
        .eco-h4 { font-size: var(--h4-size); line-height: var(--h4-lh); font-family: 'Helvetica Neue LT Std', 'Helvetica Neue', Helvetica, Arial, sans-serif; font-weight: 250; letter-spacing: var(--h4-ls); }
        .eco-marquee { font-size: var(--h4-size); font-family: 'Helvetica Neue LT Std', 'Helvetica Neue', Helvetica, Arial, sans-serif; font-weight: 250; letter-spacing: 0.72px; text-transform: uppercase; color: #fff; leading-trim: both; text-edge: cap; }
        .marquee-track { display: flex; width: max-content; animation: marquee-scroll linear infinite; will-change: transform; mix-blend-mode: difference !important; }
        .eco-list { font-size: var(--list-size); line-height: var(--list-lh); font-family: 'Helvetica Neue LT Std', 'Helvetica Neue', Helvetica, Arial, sans-serif; font-weight: 300; letter-spacing: var(--list-ls); }
        .eco-p { font-size: var(--p-size); line-height: var(--p-lh); font-family: 'Space Grotesk', sans-serif; font-weight: 200; letter-spacing: var(--p-ls); color: #fff; }
        .eco-credits { font-size: var(--h5-size); font-family: 'Helvetica Neue LT Std', 'Helvetica Neue', Helvetica, Arial, sans-serif; font-weight: 100; letter-spacing: var(--h5-ls); text-transform: uppercase; }


        .eco-placeholder {
          width: 100%;
          height: 100%;
          background: repeating-linear-gradient(45deg, #1a1a1a, #1a1a1a 10px, #222 10px, #222 20px);
          display: flex;
          align-items: center;
          justify-content: center;
          color: rgba(255,255,255,0.3);
          font-family: 'Helvetica Neue', sans-serif;
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

        .eco-container { isolation: isolate; }
        .eco-container section { isolation: auto !important; }
        .eco-container img { 
          outline: 1px solid transparent;
          backface-visibility: hidden;
          transform: translateZ(0) scale(1.005);
        }
      `}} />

      {/* Helper for Vimeo Videos */}
      <style dangerouslySetInnerHTML={{
        __html: `
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
      `}} />

      <div className="eco-desktop">
        {/* 1. HERO — Full width sculpture */}
        <ParallaxSection id="hero" style={{ marginTop: 0, minHeight: '648px', marginBottom: '170px' }}>
          <ParallaxLayer
            sectionId="hero"
            layerIndex={0}
            layer={{ type: 'image', src: ASSETS.hero, speed: 0, isHero: true, objectFit: 'contain' }}
            position={{
              top: '0', width: 'full', height: '648px', zIndex: 1
            }}
          />
        </ParallaxSection>

        {/* ESCULTURA COLGANTE SITE-SPECIFIC. band */}
        <div style={{ padding: '20px 0', overflow: 'hidden', marginBottom: '-30px' }}>
          {/* Marquee 1 — ESCULTURA COLGANTE */}
          <div className="marquee-track" style={{ animationDuration: `${33 * MARQUEE.secondsPerChar}s` }}>
            {[0, 1].map((setIdx) => (
              <div key={setIdx} className="marquee-set">
                {Array.from({ length: MARQUEE.setRepeat }, (_, i) => (
                  <span key={i} className="marquee-item eco-marquee">
                    ESCULTURA COLGANTE SITE-SPECIFIC/
                  </span>
                ))}
              </div>
            ))}
          </div>
        </div>

        {/* 2. INTRO — First paragraph + first collage images */}
        <ParallaxSection id="intro" className="relative bg-obsidian" style={{ marginTop: GAP, paddingBottom: '0px' }}>
          {/* Text Block - THE TOP ANCHOR (Relative pushes the height) */}
          <div className="relative z-10" style={{ marginLeft: 'calc(58.33% + 12px)', width: TW }}>
            <div className="eco-p">
              <p style={{ marginBottom: '1.5rem' }}>
                Si nombramos al nuevo cerebro, es porque él cambió. Y mucho.
              </p>
              <p>
                No es más ese conjunto de neuronas que no cede en su lucha por mantenernos vivos. Ha pasado años sumergido en las incontables marejadas de tecnología que nos abruma sin piedad desde que pusimos un caballo delante de un arado.
              </p>
            </div>
          </div>

          {/* Left image (Img 1) - Floating */}
          <ParallaxLayer
            sectionId="intro"
            layerIndex={1}
            layer={{ type: 'image', src: ASSETS.img1 }}
            position={{ top: '0', left: '8.47%', width: '345px', height: '517px', zIndex: 3 }}
          />

          {/* Center image (Img 2) - Floating */}
          <ParallaxLayer
            sectionId="intro"
            layerIndex={2}
            layer={{ type: 'image', src: ASSETS.img2 }}
            position={{ top: '49vh', left: '54vh', width: '467px', height: '312px', zIndex: 1 }}
          />

          {/* Right image (Img 3) - THE BOTTOM ANCHOR (Pushes the section height further) */}
          <div className="relative z-10" style={{ marginTop: 'calc(74vh - 200px)', marginLeft: '770px', width: '588px', height: '392px' }}>
            <PI src={ASSETS.img3} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </div>
        </ParallaxSection>

        {/* 3. COLLAGE 1 + MARQUEE */}
        <ParallaxSection id="collage-1" style={{ marginTop: GAP }}>
          {/* Tall portrait center - THE ANCHOR (Relative) */}
          <div className="relative mx-auto" style={{ width: '588px', height: '882px', marginLeft: '16.9444%', zIndex: 1 }}>
            <PI src={ASSETS.img4} alt="" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
          </div>

          {/* Marquee overlay - Absolute on top of the anchor */}
          <div style={{ position: 'absolute', top: '100px', left: 0, width: '100%', height: '50px', zIndex: 3, overflow: 'hidden', mixBlendMode: 'difference' }}>
            <div className="marquee-track" style={{ animationDuration: `${59 * MARQUEE.secondsPerChar}s` }}>
              {[0, 1].map((setIdx) => (
                <div key={setIdx} className="marquee-set">
                  {Array.from({ length: MARQUEE.setRepeat }, (_, i) => (
                    <span key={i} className="marquee-item eco-marquee">
                      Si nombramos al nuevo cerebro, es porque él cambió. Y mucho.
                    </span>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </ParallaxSection>

        {/* 4. TEXT + COLLAGE 2 — "Constanza Schwartz tampoco cede..." */}
        <ParallaxSection id="text-collage-2" className="relative" style={{ marginTop: '190px' }}>
          {/* TOP ANCHOR: Left text in flow */}
          <div className="relative z-10" style={{ marginTop: '130px', marginLeft: 'calc(8.33% + 3px)', width: TW }}>
            <div className="eco-p">
              Constanza Schwartz tampoco cede, y contestará a la tecnología con más esfuerzo humano. De este modo, surgirán espacios que realmente nos transportan a sitios dentro de nuestro universo a los que no llegamos a menudo. Solo lo haremos guiados por la creatividad y su inclemente convocatoria de presencias arcaicas y míticas, figuras atemporales, intensas, al mismo tiempo, conmovedoras y abstractas.
            </div>
          </div>

          {/* Right portrait image (Img 5) - Floating */}
          <ParallaxLayer
            sectionId="text-collage-2"
            layerIndex={1}
            layer={{ type: 'image', src: ASSETS.img5 }}
            position={{ top: '0vh', left: '59.10%', width: '467px', height: '700px', zIndex: 1 }}
          />

          {/* BOTTOM ANCHOR: Bottom horizontal image (Img 6) - In flow to push height */}
          <div className="relative z-10" style={{ marginTop: 'calc(74vh - 340px)', marginLeft: '488px', width: '467px', height: '311px' }}>
            <PI src={ASSETS.img6} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </div>
        </ParallaxSection>

        {/* 5. COLLAGE 3 + TEXT — "Al desplazarnos..." */}
        <ParallaxSection id="collage-3" className="relative" style={{ marginTop: GAP }}>
          {/* TOP ANCHOR: Full-width Image 7 in flow */}
          <div className="relative w-full h-[100vh] z-2">
            <PI src={ASSETS.img7} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </div>

          {/* Staggered Image 8 - Floating */}
          <ParallaxLayer
            sectionId="collage-3"
            layerIndex={1}
            layer={{ type: 'image', src: ASSETS.img8 }}
            position={{ top: 'calc(100vh + 220px)', left: '8.54%', width: '476px', height: '311px', zIndex: 20 }}
          />

          {/* BOTTOM ANCHOR: Staggered Image 9 - In flow */}
          <div className="relative z-10" style={{ marginTop: '340px', marginLeft: '33.82%', width: '476px', height: '312px' }}>
            <PI src={ASSETS.img9} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </div>

          {/* Text bottom relative to images */}
          <div className="relative z-10" style={{ marginTop: '210px', marginBottom: '-13px', marginLeft: 'calc(8.33% + 10px)', width: TW }}>
            <div className="eco-p" style={{
              fontSize: '15px',
              fontStyle: 'normal',
              fontFamily: '"Space Grotesk", sans-serif',
              fontWeight: 300,
              lineHeight: '21.75px',
              letterSpacing: 'normal',
              WebkitFontSmoothing: 'antialiased',
              ['leadingTrim' as any]: 'both',
              ['textEdge' as any]: 'cap',
              color: '#fff'
            }}>
              Al desplazarnos por vacíos y llenos, imposibles convergencias, nos conmovemos al tiempo que nos transformamos en cultores y espectadores participativos<br /> de su obra.
            </div>
          </div>
        </ParallaxSection>

        {/* 6. COLLAGE 4 — The 4 Images Strip (10, 11, 12, 13) */}
        <ParallaxSection id="collage-4" className="relative" style={{ marginTop: GAP, }}>
          {/* BIG Top Right Image (Img 10) - Floating */}
          <ParallaxLayer
            sectionId="collage-4"
            layerIndex={0}
            layer={{ type: 'image', src: ASSETS.img10, objectFit: 'cover' }}
            position={{ top: '0', left: '46.46%', width: '710px', height: '473px', zIndex: 1 }}
          />
          {/* BIG Bottom Left Image (Img 11) - Floating */}
          <ParallaxLayer
            sectionId="collage-4"
            layerIndex={1}
            layer={{ type: 'image', src: ASSETS.img11, objectFit: 'cover' }}
            position={{ top: '362px', left: '4.35%', width: '710px', height: '473px', zIndex: 2 }}
          />
          {/* SMALL Top Right Image (Img 12) - Floating */}
          <ParallaxLayer
            sectionId="collage-4"
            layerIndex={2}
            layer={{ type: 'image', src: ASSETS.img12, objectFit: 'cover' }}
            position={{ top: '1057px', left: '59.10%', width: '467px', height: '312px', zIndex: 4 }}
          />
          {/* BOTTOM ANCHOR: SMALL Bottom Left Image (Img 13) - In Flow */}
          <div className="relative z-30" style={{ marginTop: '1270px', marginLeft: '33.82%', width: '467px', height: '312px' }}>
            <PI src={ASSETS.img13} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </div>
        </ParallaxSection>

        {/* 7. VIDEO MAKING OFF (Full Width) */}
        <ParallaxSection id="video-making-off" style={{ marginTop: GAP }}>
          <div className="relative w-full aspect-video z-1">
            <div className="vimeo-container" style={{ width: '100%', height: '100%' }}>
              <CustomVimeoPlayer
                videoUrl={ASSETS.videoMakingOff}
                title="ECO AL INFINITO . Making Off"
              />
            </div>
          </div>
        </ParallaxSection>

        {/* 8. COLLAGE STAIRCASE + PARAGRAPH + IMG 17 & 18 */}
        <ParallaxSection id="collage-14-15-16" className="relative" style={{ marginTop: GAP }}>
          {/* Staircase Image 14 - Floating */}
          <ParallaxLayer
            sectionId="collage-14-15-16"
            layerIndex={0}
            layer={{ type: 'image', src: ASSETS.img14, objectFit: 'contain' }}
            position={{ top: '0', left: '61px', width: '345px', height: '517px', zIndex: 2 }}
          />
          {/* Staircase Image 15 - Floating */}
          <ParallaxLayer
            sectionId="collage-14-15-16"
            layerIndex={1}
            layer={{ type: 'image', src: ASSETS.img15, objectFit: 'contain' }}
            position={{ top: '140px', left: '547px', width: '345px', height: '517px', zIndex: 2 }}
          />
          {/* Staircase Image 16 - Floating */}
          <ParallaxLayer
            sectionId="collage-14-15-16"
            layerIndex={2}
            layer={{ type: 'image', src: ASSETS.img16, objectFit: 'contain' }}
            position={{ top: '333px', left: '1033px', width: '345px', height: '517px', zIndex: 2 }}
          />

          {/* Paragraph below staircase - Flow Anchor */}
          <div className="relative z-10" style={{ marginTop: '1020px', marginLeft: 'calc(8.33% + 3px)', width: TW }}>
            <div className="eco-p">
              La potencia de esta creación no da lugar a ausentarse. Participamos sin descanso, metro a metro, de las síntesis sensibles que reavivan las fraguas más ardientes de la memoria para trasladarnos a espacios libres donde sus elementales e infinitas combinaciones se reproducen y rebobinan en nuestra mente, aunando pasados, presentes y futuros que resurgen ante nuestro caminar buscando un sentido. Hay muchos.
            </div>
          </div>

          {/* Img 17 (Shadows) - Floating */}
          <ParallaxLayer
            sectionId="collage-14-15-16"
            layerIndex={4}
            layer={{ type: 'image', src: ASSETS.img17, objectFit: 'cover' }}
            position={{ top: '1416px', left: '21.11%', width: '467px', height: '700px', zIndex: 3 }}
          />

          {/* BOTTOM ANCHOR: Img 18 (Red Triangles) - In Flow */}
          <div className="relative z-4" style={{ marginTop: 'calc(1960px - 1300px)', marginLeft: '47%', width: '467px', height: '700px' }}>
            <PI src={ASSETS.img18} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </div>

          {/* Marquee Text ON TOP of Img 17 and 18 */}
          <div style={{ position: 'absolute', top: '2460px', left: 0, width: '100%', zIndex: 5, overflow: 'hidden', mixBlendMode: 'difference' }}>
            <div className="marquee-track" style={{ animationDuration: `${74 * MARQUEE.secondsPerChar}s` }}>
              {[0, 1].map((setIdx) => (
                <div key={setIdx} className="marquee-set">
                  {Array.from({ length: MARQUEE.setRepeat }, (_, i) => (
                    <span key={i} className="marquee-item eco-marquee">
                      SE REPRODUCEN Y REBOBINAN EN NUESTRA MENTE, AUNANDO PASADOS, PRESENTES Y FUTUROS ·
                    </span>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </ParallaxSection>



        {/* 10. FINAL FULL IMAGE (19) */}
        <ParallaxSection id="final-image-19" style={{ marginTop: GAP, marginBottom: '-25px' }}>
          <div className="relative w-full h-[66.6vw] z-1">
            <PI src={ASSETS.img19} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </div>
        </ParallaxSection>

        {/* 11. FINAL SEQUENCE: COLLAGE 20-21-22 + TEXT + COLLAGE 23-24 */}
        <ParallaxSection id="final-sequence" className="relative" style={{ marginTop: GAP }}>

          {/* Img 20 (467x312) - Floating */}
          <ParallaxLayer
            sectionId="final-sequence"
            layerIndex={0}
            layer={{ type: 'image', src: ASSETS.img20, objectFit: 'cover' }}
            position={{ top: '0px', left: '63.3%', width: '467', height: '312px', zIndex: 3 }}
          />

          {/* Img 21 (467x312) - Floating */}
          <ParallaxLayer
            sectionId="final-sequence"
            layerIndex={1}
            layer={{ type: 'image', src: ASSETS.img21, objectFit: 'contain' }}
            position={{ top: '170px', left: '41.9%', width: '467px', height: '701px', zIndex: 2 }}
          />

          {/* Img 22 - Floating */}
          <ParallaxLayer
            sectionId="final-sequence"
            layerIndex={2}
            layer={{ type: 'image', src: ASSETS.img22 }}
            position={{ top: '1030px', left: '8.62%', width: '831px', height: '554px', zIndex: 2 }}
          />

          {/* Concluding Paragraph - Flow Anchor */}
          <div className="relative z-10" style={{ marginTop: '1780px', marginLeft: 'calc(58.33% + 12px)', width: TW }}>
            <div className="eco-p">
              Una plenitud sin alarmas nos tranquiliza desde la convicción de que este es nuestro universo.
              Aquí, unidos a Constanza, seguimos caminando sin dudar. Aceptamos ser guiados porque son
              las formas con las que hemos construido el mundo. Así dejamos huella de nuestro paso por
              la Tierra. Nos traslada a los inicios, mientras nos apoyamos confiados en las formas abiertas
              y fundamentales de nuestro alfabeto de formas. No importa el siglo de nuestra ubicación
              defensiva. Seguiremos dudando hasta que realmente nos <br />reconozcamos allí. Somos habitantes
              de un extenso<br />universo que nunca podrá ser resumido a tres o cuatro números. Son infinitos.
              Son un Eco al Infinito. Que se reitera, se reitera, se reitera hasta que logremos ubicarnos.
              Es nuestro universo…
            </div>
          </div>

          <ParallaxLayer
            sectionId="final-sequence"
            layerIndex={4}
            layer={{ type: 'image', src: ASSETS.img23, objectFit: 'cover' }}
            position={{ top: '2290px', left: '8.47%', width: '467px', height: '700px', zIndex: 2 }}
          />

          {/* BOTTOM ANCHOR: Img 24 - In Flow */}
          <div className="relative z-10" style={{ marginTop: 'calc(2962px - 2300px)', marginLeft: '33.82%', width: '470px', height: '700px' }}>
            <PI src={ASSETS.img24} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </div>

          {/* Marquee Text ON TOP of Img 23 and 24 */}
          <div style={{ position: 'absolute', top: '2540px', left: 0, width: '100%', zIndex: 5, overflow: 'hidden', mixBlendMode: 'difference' }}>
            <div className="marquee-track" style={{ animationDuration: `${61 * MARQUEE.secondsPerChar}s` }}>
              {[0, 1].map((setIdx) => (
                <div key={setIdx} className="marquee-set">
                  {Array.from({ length: MARQUEE.setRepeat }, (_, i) => (
                    <span key={i} className="marquee-item eco-marquee">
                      SEGUIREMOS DUDANDO HASTA QUE REALMENTE NOS RECONOZCAMOS ALLÍ ·
                    </span>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </ParallaxSection>
        {/* 13. IMAGE 25 (Full Width) + COLLAGE 26-27 */}
        <ParallaxSection id="final-sequence-25-29" className="relative" style={{ marginTop: GAP, marginBottom: '-250px' }}>
          <div className="relative w-full h-[66.6vw] z-1">
            <PI src={ASSETS.img25} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </div>

          {/* Staggered Duo 26-27 below 25 - Floating */}
          <ParallaxLayer
            sectionId="final-sequence-25-29"
            layerIndex={1}
            layer={{ type: 'image', src: ASSETS.img26, objectFit: 'cover' }}
            position={{ top: '1181px', left: '34.02%', width: '467px', height: '311px', zIndex: 3 }}
          />
          <ParallaxLayer
            sectionId="final-sequence-25-29"
            layerIndex={2}
            layer={{ type: 'image', src: ASSETS.img27, objectFit: 'cover' }}
            position={{ top: '1360px', left: '59.3%', width: '466px', height: '699px', zIndex: 2 }}
          />

          {/* Photos 28 & 29 - Floating */}
          <ParallaxLayer
            sectionId="final-sequence-25-29"
            layerIndex={3}
            layer={{ type: 'image', src: ASSETS.img28, objectFit: 'cover' }}
            position={{ top: '2230px', left: '8.47%', width: '467px', height: '311px', zIndex: 2 }}
          />
          <ParallaxLayer
            sectionId="final-sequence-25-29"
            layerIndex={4}
            layer={{ type: 'image', src: ASSETS.img29, objectFit: 'cover' }}
            position={{ top: '2477px', left: '29.7%', width: '467px', height: '311px', zIndex: 3 }}
          />

          {/* Infinite Carousel - Floating */}
          <ParallaxLayer
            sectionId="final-sequence-25-29"
            layerIndex={5}
            layer={{ type: 'image', src: '' }}
            position={{ top: '2963px', left: '0', width: '100%', height: CH, zIndex: 2 }}
          >
            <div style={{ width: '100%', height: CH, overflow: 'hidden' }}>
              <div style={{ display: 'flex', height: CH, width: 'max-content', willChange: 'transform', WebkitAnimation: `eco-carousel-scroll ${5 * CAROUSEL.durationPerImage}s linear infinite`, animation: `eco-carousel-scroll ${5 * CAROUSEL.durationPerImage}s linear infinite` }}>
                {[ASSETS.carousel1, ASSETS.carousel2, ASSETS.carousel3, ASSETS.carousel4, ASSETS.carousel5,
                ASSETS.carousel1, ASSETS.carousel2, ASSETS.carousel3, ASSETS.carousel4, ASSETS.carousel5].map((src, i) => (
                  <img key={i} src={src} alt="" style={{ height: CH, width: 'auto', display: 'block', flexShrink: 0 }} />
                ))}
              </div>
            </div>
          </ParallaxLayer>

          {/* Final Reflective Text below carousel - BOTTOM ANCHOR */}
          <div className="relative z-10" style={{ marginTop: '2500px', marginLeft: 'calc(8% + 12px)', width: TW, paddingBottom: '100px' }}>
            <div className="eco-p">
              Sí, claro. Todavía no conocemos muchos universos, pero puede ser que los haya.
              Y dentro de ellos, siempre habrá un lugar para el arte que expande nuestra
              posibilidad de entender y percibir lo diferente. Tal vez nos aterra que esa
              posibilidad desaparezca. Pero no lo hará. Porque las cosas existen también en
              nuestras memorias. Quizá aún más intensamente.
            </div>
          </div>
        </ParallaxSection>

        {/* 14. FINAL SEQUENCE 30-35 */}
        <ParallaxSection id="final-sequence-30-35" className="relative" style={{ marginTop: GAP }}>
          {/* Group 30-32 - Floating */}
          <ParallaxLayer
            sectionId="final-sequence-30-35"
            layerIndex={0}
            layer={{ type: 'image', src: ASSETS.img30, objectFit: 'cover' }}
            position={{ top: '100px', left: '59%', width: '467px', height: '311px', zIndex: 3 }}
          />
          <ParallaxLayer
            sectionId="final-sequence-30-35"
            layerIndex={1}
            layer={{ type: 'image', src: ASSETS.img31, objectFit: 'cover' }}
            position={{ top: '345px', left: '34%', width: '467px', height: '311px', zIndex: 2 }}
          />
          <ParallaxLayer
            sectionId="final-sequence-30-35"
            layerIndex={2}
            layer={{ type: 'image', src: ASSETS.img32, objectFit: 'cover' }}
            position={{ top: '871px', left: '126px', width: '345px', height: '517px', zIndex: 3 }}
          />

          {/* Marquee Text ON TOP of Img 32 */}
          {/* Marquee 3 — CREDITS */}
          <div style={{ position: 'absolute', top: '962px', left: 0, width: '100%', zIndex: 5, overflow: 'hidden', mixBlendMode: 'difference' }}>
            <div className="marquee-track" style={{ animationDuration: `${71 * MARQUEE.secondsPerChar}s` }}>
              {[0, 1].map((setIdx) => (
                <div key={setIdx} className="marquee-set">
                  {Array.from({ length: MARQUEE.setRepeat }, (_, i) => (
                    <span key={i} className="marquee-item eco-marquee">
                      SIEMPRE HABRÁ UN LUGAR PARA EL ARTE QUE EXPANDE NUESTRA POSIBILIDAD DE ENTENDER  ·
                    </span>
                  ))}
                </div>
              ))}
            </div>
          </div>

          {/* Group 33 - Floating */}
          <ParallaxLayer
            sectionId="final-sequence-30-35"
            layerIndex={3}
            layer={{ type: 'image', src: ASSETS.img33, objectFit: 'cover' }}
            position={{ top: '1280px', left: '29.82%', width: '467px', height: '312px', zIndex: 2 }}
          />


          {/* Video Timelapse - Floating */}
          <ParallaxLayer
            sectionId="final-sequence-30-35"
            layerIndex={4}
            layer={{ type: 'text', content: '' }}
            position={{ top: '1812px', left: '0', width: '100%', height: '56.25vw', aspectRatio: '16/9', zIndex: 1 }}
          >
            <div className="vimeo-container" style={{ position: 'relative', width: '100%', height: '100%' }}>
              <CustomVimeoPlayer
                videoUrl={ASSETS.videoTimelapse}
                title="ECO AL INFINITO . Timelapse"
              />
            </div>
          </ParallaxLayer>

          {/* Group 34 - Floating */}
          <ParallaxLayer
            sectionId="final-sequence-30-35"
            layerIndex={5}
            layer={{ type: 'image', src: ASSETS.img34, objectFit: 'cover' }}
            position={{ top: '2842px', left: '8.47%', width: '467px', height: '700px', zIndex: 2 }}
          />

          {/* BOTTOM ANCHOR: Group 35 - In Flow */}
          <div className="relative z-30" style={{ marginTop: '3432px', marginLeft: '33.4%', width: '467px', height: '311px' }}>
            <PI src={ASSETS.img35} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </div>
        </ParallaxSection>

        {/* 18. CAROUSEL 2 (carousel6-10) */}
        <ParallaxSection id="carousel-section-2" style={{ marginTop: GAP, marginBottom: '-60px' }}>
          <div className="relative w-full h-[331px] z-2 overflow-hidden">
            <div style={{ display: 'flex', height: '331px', width: 'max-content', willChange: 'transform', WebkitAnimation: `eco-carousel-scroll-2 ${6 * CAROUSEL.durationPerImage}s linear infinite`, animation: `eco-carousel-scroll-2 ${6 * CAROUSEL.durationPerImage}s linear infinite` }}>
              {[ASSETS.carousel6, ASSETS.carousel7, ASSETS.carousel8, ASSETS.carousel9, ASSETS.carousel10, ASSETS.carousel11,
              ASSETS.carousel6, ASSETS.carousel7, ASSETS.carousel8, ASSETS.carousel9, ASSETS.carousel10, ASSETS.carousel11].map((src, i) => (
                <img key={i} src={src} alt="" style={{ height: '331px', width: 'auto', display: 'block', flexShrink: 0 }} />
              ))}
            </div>
          </div>
        </ParallaxSection>

        <style dangerouslySetInnerHTML={{
          __html: `
          @-webkit-keyframes eco-carousel-scroll {
            from { -webkit-transform: translate3d(0,0,0); transform: translate3d(0,0,0); }
            to   { -webkit-transform: translate3d(-50%,0,0); transform: translate3d(-50%,0,0); }
          }
          @keyframes eco-carousel-scroll {
            from { transform: translate3d(0,0,0); }
            to   { transform: translate3d(-50%,0,0); }
          }
          @-webkit-keyframes eco-carousel-scroll-2 {
            from { -webkit-transform: translate3d(0,0,0); transform: translate3d(0,0,0); }
            to   { -webkit-transform: translate3d(-50%,0,0); transform: translate3d(-50%,0,0); }
          }
          @keyframes eco-carousel-scroll-2 {
            from { transform: translate3d(0,0,0); }
            to   { transform: translate3d(-50%,0,0); }
          }
        `}} />

        {/* 19. FINAL COLLAGE 36-37 */}
        <ParallaxSection id="collage-36-37" style={{ marginTop: GAP, marginBottom: '-110px' }}>
          {/* Top image - Floating */}
          <ParallaxLayer
            sectionId="collage-36-37"
            layerIndex={0}
            layer={{ type: 'image', src: ASSETS.img36 }}
            position={{ top: '1vh', left: '67.5694%', width: '345px', height: '517px', zIndex: 2 }}
          />
          {/* BOTTOM ANCHOR: Bottom image - In Flow */}
          <div className="relative z-10" style={{ marginTop: '49vh', marginLeft: '610px', width: TW, height: '311px' }}>
            <PI src={ASSETS.img37} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </div>
        </ParallaxSection>

        {/* 20. FINAL FULL IMAGE (38) */}
        <ParallaxSection id="final-image-38" style={{ marginTop: GAP, minHeight: '960px', marginBottom: '-490px' }}>
          <ParallaxLayer
            sectionId="final-image-38"
            layerIndex={0}
            layer={{ type: 'image', src: ASSETS.img38, objectFit: 'contain' }}
            position={{ top: '0', left: '0', width: '1440px', height: '960px', zIndex: 1 }}
          />
        </ParallaxSection>

        {/* 21. LYRICS SECTION (Sound of Silence) — Figma 1571:1033..1038 + 1867:1262 */}
        <ParallaxSection id="lyrics-section" className="bg-obsidian" style={{ marginTop: GAP, minHeight: '800px', marginBottom: '200px' }}>
          {/* Lyrics */}
          <ParallaxLayer
            sectionId="lyrics-section"
            layerIndex={0}
            layer={{ type: 'text', content: '', speed: 0, className: 'blend-difference' }}
            position={{ top: '110px', left: '0', width: '100%', height: 'auto', zIndex: 1 }}
          >
            <div className="eco-h4 text-white uppercase tracking-[0.72px] leading-none">
              <div style={{ marginLeft: '562px', marginBottom: '70px' }}>BECAUSE A VISION SOFTLY CREEPING</div>
              <div style={{ marginLeft: '61px', marginBottom: '70px' }}>LEFT ITS SEEDS WHILE I WAS SLEEPING</div>
              <div style={{ marginLeft: '600px', marginBottom: '70px' }}>AND THE VISION THAT WAS PLANTED IN MY BRAIN</div>
              <div style={{ marginLeft: 'calc(29.17% - 14px)', marginBottom: '70px' }}>STILL REMAINS</div>
              <div style={{ marginLeft: '720px' }}>WITHIN THE SOUND OF SILENCE</div>
            </div>
          </ParallaxLayer>

          {/* Simon & Garfunkel */}
          <ParallaxLayer
            sectionId="lyrics-section"
            layerIndex={1}
            layer={{ type: 'text', content: '', speed: 0, className: 'blend-difference' }}
            position={{ top: '650px', left: '0', width: '100%', height: 'auto', zIndex: 1 }}
          >
            <div className="text-right text-white font-light text-[var(--p-size)] leading-relaxed" style={{ paddingRight: '96px', paddingTop: '110px' }}>
              Simon &amp; Garfunkel · 1964
            </div>
          </ParallaxLayer>
        </ParallaxSection>

        {/* Credits — pinned to the very bottom of the project */}
        <div style={{ padding: '0 3px 40px', backgroundColor: '#0F0F0F' }}>
          <p style={{ fontSize: '14px', lineHeight: '1.6', width: '100%', maxWidth: 'none', display: 'block', textTransform: 'uppercase', fontFamily: '"Helvetica Neue LT Std", sans-serif', fontWeight: 100, color: '#fff', margin: 0 }}>
            <span style={{ fontWeight: 700 }}>"ECO AL INFINITO"</span> por Constanza Schwartz &nbsp;/&nbsp;
            <span style={{ fontWeight: 700 }}>Realización: </span>
            <span>Gastón Aliaga (INDIGO Lumieres) y Mónica Mostajo + Franco Lavra (GOTA Arquigrafía) &nbsp;/&nbsp;</span>
            <span style={{ fontWeight: 700 }}>Instalación: </span>
            <span>Mónica Mostajo + Franco Lavra (GOTA Arquigrafía) &nbsp;/&nbsp;</span>
            <span style={{ fontWeight: 700 }}>Acompañamiento Curatorial: </span>
            <span>Facundo López &nbsp;/&nbsp;</span>
            <span style={{ fontWeight: 700 }}>Dirección Audiovisual: </span>
            <span>Martín Rois &nbsp;/&nbsp;</span>
            <span style={{ fontWeight: 700 }}>Composición Musical: </span>
            <span>Francisco Rousset Osio &nbsp;/&nbsp;</span>
            <span style={{ fontWeight: 700 }}>Registro Fotográfico: </span>
            <span>Bianca Siffredi &nbsp;/&nbsp;</span>
            <span style={{ fontWeight: 700 }}>2do en Cámara: </span>
            <span>Felipe Malatesta &nbsp;/&nbsp;</span>
            <span style={{ fontWeight: 700 }}>Co-Proyección y Modelado: </span>
            <span>Francisca Gil Sosa &nbsp;/&nbsp;</span>
            <span style={{ fontWeight: 700 }}>Colaboración Integral Post-Montaje: </span>
            <span>Juan Ignacio Scheller</span>
          </p>
        </div>
      </div>{/* /eco-desktop */}

      {/* ── ECO MOBILE ───────────────────────────────────────────────── */}
      <div className="eco-mobile bg-obsidian overflow-hidden">

        {/* Hero */}
        <div data-project-image style={{ position: 'relative', width: '100%', height: '669px', isolation: 'isolate' }}>
          <img src={ASSETS.heroMobile} alt="" style={{ display: 'block', width: '100%', height: '100%', objectFit: 'cover', transform: 'translateZ(0)' }} />
        </div>

        {/* Para 1 */}
        <div className="eco-p" style={{ color: '#fff', marginTop: '50px', width: '350px', marginLeft: '20px', fontSize: 'var(--p-size)', fontFamily: '"Space Grotesk", sans-serif', fontWeight: 300, lineHeight: 1.45 }}>
          <p style={{ marginBottom: '1rem' }}>Si nombramos al nuevo cerebro, es porque él cambió. Y mucho.</p>
          <p>No es más ese conjunto de neuronas que no cede en su lucha por mantenernos vivos. Ha pasado años sumergido en las incontables marejadas de tecnología que nos abruma sin piedad desde que pusimos un caballo delante de un arado.</p>
        </div>

        {/* 3-image cluster (staggered) */}
        <div style={{ position: 'relative', height: '443px', marginTop: '80px' }}>
          <PI src={ASSETS.img1} alt="" style={{ position: 'absolute', left: '0', top: 0, width: '140px', height: '210px', objectFit: 'cover', zIndex: 1 }} />
          <img src={ASSETS.img2} alt="" style={{ position: 'absolute', left: '110px', top: '177px', width: '170px', height: '114px', objectFit: 'cover', zIndex: 3 }} />
          <img src={ASSETS.img3} alt="" style={{ position: 'absolute', left: '190px', top: '275px', width: '200px', height: '133px', objectFit: 'cover', zIndex: 2 }} />
        </div>

        {/* Large portrait + marquee overlay */}
        <div style={{ position: 'relative', width: '100%', height: '525px', marginTop: '46px' }}>
          <img src={ASSETS.img4} alt="" style={{ display: 'block', width: '350px', height: '100%', objectFit: 'cover', margin: '0 auto' }} />

          <div style={{ position: 'absolute', top: '44px', left: 0, width: '100%', height: '30px', overflow: 'hidden', zIndex: 10, mixBlendMode: 'difference' }}>
            <div className="marquee-track" style={{ animationDuration: `${59 * MARQUEE.secondsPerChar}s` }}>
              <div className="marquee-set"><span className="marquee-item eco-marquee">SI NOMBRAMOS AL NUEVO CEREBRO, ES PORQUE ÉL CAMBIÓ. Y MUCHO. ·</span></div>
              <div className="marquee-set"><span className="marquee-item eco-marquee">SI NOMBRAMOS AL NUEVO CEREBRO, ES PORQUE ÉL CAMBIÓ. Y MUCHO. ·</span></div>
            </div>
          </div>
        </div>

        {/* Para 2 */}
        <div className="eco-p" style={{ color: '#fff', marginTop: '80px', width: '350px', marginLeft: '20px', fontSize: 'var(--p-size)', fontFamily: '"Space Grotesk", sans-serif', fontWeight: 300, lineHeight: 1.45 }}>
          Constanza Schwartz tampoco cede, y contestará a la tecnología con más esfuerzo humano. De este modo, surgirán espacios que realmente nos transportan a sitios dentro de nuestro universo a los que no llegamos a menudo. Solo lo haremos guiados por la creatividad y su inclemente convocatoria de presencias arcaicas y míticas, figuras atemporales, intensas, al mismo tiempo, conmovedoras y abstractas.
        </div>

        {/* Image pair */}
        <div style={{ position: 'relative', height: '320px', marginTop: '80px' }}>
          <img src={ASSETS.img6} alt="" style={{ position: 'absolute', left: '0', top: '235px', width: '200px', height: '134px', objectFit: 'cover', zIndex: 2 }} />
          <PI src={ASSETS.img5} alt="" style={{ position: 'absolute', right: '0px', top: '0', width: '200px', height: '300px', objectFit: 'cover' }} />
        </div>

        {/* Full-width */}
        <img src={ASSETS.img7} alt="" style={{ display: 'block', width: '100%', height: '260px', objectFit: 'cover', marginTop: '160px' }} />

        {/* Image pair */}
        <div style={{ position: 'relative', height: '240px', marginTop: '80px' }}>
          <img src={ASSETS.img8} alt="" style={{ position: 'absolute', left: '0px', top: '0', width: '200px', height: '134px', objectFit: 'cover', zIndex: 2 }} />
          <img src={ASSETS.img9} alt="" style={{ position: 'absolute', right: '0px', top: '100px', width: '200px', height: '133px', objectFit: 'cover' }} />
        </div>

        {/* Para 3 */}
        <div className="eco-p" style={{
          color: '#fff',
          marginTop: '70px',
          width: '350px',
          marginLeft: '20px',
          fontSize: '15px',
          fontStyle: 'normal',
          fontFamily: '"Space Grotesk", sans-serif',
          fontWeight: 300,
          lineHeight: '21.75px',
          letterSpacing: 'normal',
          WebkitFontSmoothing: 'antialiased',
          ['leadingTrim' as any]: 'both',
          ['textEdge' as any]: 'cap'
        }}>
          Al desplazarnos por vacíos y llenos, imposibles convergencias, nos conmovemos al tiempo que nos transformamos en cultores y espectadores participativos de su obra.
        </div>

        {/* Image pair staggered */}
        <div style={{ position: 'relative', height: '240px', marginTop: '80px' }}>
          <img src={ASSETS.img10} alt="" style={{ position: 'absolute', right: '0px', top: '0', width: '200px', height: '133px', objectFit: 'cover' }} />
          <img src={ASSETS.img11} alt="" style={{ position: 'absolute', left: '0px', top: '107px', width: '200px', height: '133px', objectFit: 'cover' }} />
        </div>

        {/* Image pair staggered */}
        <div style={{ position: 'relative', height: '240px', marginTop: '76px' }}>
          <img src={ASSETS.img12} alt="" style={{ position: 'absolute', right: '0px', top: '0', width: '200px', height: '133px', objectFit: 'cover', zIndex: 2 }} />
          <img src={ASSETS.img13} alt="" style={{ position: 'absolute', left: '0px', top: '100px', width: '200px', height: '133px', objectFit: 'cover' }} />
        </div>

        {/* Video Making Off - Mobile */}
        <div style={{ position: 'relative', width: '100%', height: '56.25vw', marginTop: '74px', backgroundColor: '#000' }}>
          <div className="vimeo-container" style={{ position: 'absolute', inset: 0 }}>
            <CustomVimeoPlayer
              videoUrl={ASSETS.videoMakingOff}
              title="ECO AL INFINITO . Making Off"
            />
          </div>
        </div>

        {/* Three diagonal images */}
        <div style={{ position: 'relative', height: '420px', marginTop: '80px' }}>
          <PI src={ASSETS.img14} alt="" style={{ position: 'absolute', left: '20px', top: '0', width: '140px', height: '210px', objectFit: 'cover' }} />
          <PI src={ASSETS.img15} alt="" style={{ position: 'absolute', left: '125px', top: '146px', width: '140px', height: '210px', objectFit: 'cover' }} />
          <PI src={ASSETS.img16} alt="" style={{ position: 'absolute', right: '20px', top: '292px', width: '140px', height: '210px', objectFit: 'cover' }} />
        </div>

        {/* Para 4 */}
        <div className="eco-p" style={{ color: '#fff', marginTop: '156px', marginBottom: '80px', width: '350px', marginLeft: '20px', fontSize: 'var(--p-size)', fontFamily: '"Space Grotesk", sans-serif', fontWeight: 300, lineHeight: 1.45 }}>
          La potencia de esta creación no da lugar a ausentarse. Participamos sin descanso, metro a metro, de las síntesis sensibles que reavivan las fraguas más ardientes de la memoria para trasladarnos a espacios libres donde sus elementales e infinitas combinaciones se reproducen y rebobinan en nuestra mente, aunando pasados, presentes y futuros que resurgen ante nuestro caminar buscando un sentido. Hay muchos.
        </div>

        {/* Image pair */}
        <div style={{ position: 'relative', height: '470px', marginTop: '80px' }}>
          <PI src={ASSETS.img17} alt="" style={{ position: 'absolute', left: '20px', top: '0', width: '200px', height: '300px', objectFit: 'cover' }} />
          <PI src={ASSETS.img18} alt="" style={{ position: 'absolute', right: '20px', top: '217px', width: '200px', height: '300px', objectFit: 'cover' }} />
        </div>

        {/* Marquee */}
        <div style={{ position: 'relative', zIndex: 5, marginTop: '40px', height: '30px', overflow: 'hidden', mixBlendMode: 'difference' }}>
          <div className="marquee-track" style={{ animationDuration: `${74 * MARQUEE.secondsPerChar}s` }}>
            <div className="marquee-set"><span className="marquee-item eco-marquee">SE REPRODUCEN Y REBOBINAN EN NUESTRA MENTE, AUNANDO PASADOS, PRESENTES Y FUTUROS ·</span></div>
            <div className="marquee-set"><span className="marquee-item eco-marquee">SE REPRODUCEN Y REBOBINAN EN NUESTRA MENTE, AUNANDO PASADOS, PRESENTES Y FUTUROS ·</span></div>
          </div>
        </div>

        {/* Full-width */}
        <img src={ASSETS.img19} alt="" style={{ display: 'block', width: '100%', height: '260px', objectFit: 'cover', marginTop: '91px', marginBottom: '20px' }} />

        {/* Image pair staggered */}
        <div style={{ position: 'relative', height: '300px', marginTop: '80px' }}>
          <img src={ASSETS.img20} alt="" style={{ position: 'absolute', right: '0px', top: '0', width: '230px', height: 'auto', zIndex: 2 }} />
          <PI src={ASSETS.img21} alt="" style={{ position: 'absolute', left: '20px', top: '100px', width: '230px', height: '346px', objectFit: 'cover' }} />
        </div>

        {/* Full-width */}
        <img src={ASSETS.img22} alt="" style={{ display: 'block', width: '100%', height: '260px', objectFit: 'cover', marginTop: '228px' }} />

        {/* Para 5 */}
        <div className="eco-p" style={{ color: '#fff', marginTop: '80px', width: '350px', marginLeft: '20px', fontSize: 'var(--p-size)', fontFamily: '"Space Grotesk", sans-serif', fontWeight: 300, lineHeight: 1.45 }}>
          Una plenitud sin alarmas nos tranquiliza desde la convicción de que este es nuestro universo. Aquí, unidos a Constanza, seguimos caminando sin dudar. Aceptamos ser guiados porque son las formas con las que hemos construido el mundo. Así dejamos huella de nuestro paso por la Tierra. Nos traslada a los inicios, mientras nos apoyamos confiados en las formas abiertas y fundamentales de nuestro alfabeto de formas. No importa el siglo de nuestra ubicación defensiva. Seguiremos dudando hasta que realmente nos reconozcamos allí. Somos habitantes de un extenso universo que nunca podrá ser resumido a tres o cuatro números. Son infinitos. Son un Eco al Infinito. Que se reitera, se reitera, se reitera hasta que logremos ubicarnos. Es nuestro universo…
        </div>

        {/* Image pair offset */}
        <div style={{ position: 'relative', height: '400px', marginTop: '80px' }}>
          <PI src={ASSETS.img23} alt="" style={{ position: 'absolute', left: '20px', top: '0', width: '200px', height: '300px', objectFit: 'cover' }} />
          <PI src={ASSETS.img24} alt="" style={{ position: 'absolute', right: '20px', top: '195px', width: '200px', height: '300px', objectFit: 'cover' }} />
        </div>

        {/* Marquee */}
        <div style={{ position: 'relative', zIndex: 5, marginTop: '-370px', marginBottom: '515px', height: '30px', overflow: 'hidden', mixBlendMode: 'difference' }}>
          <div className="marquee-track" style={{ animationDuration: `${60 * MARQUEE.secondsPerChar}s` }}>
            <div className="marquee-set"><span className="marquee-item eco-marquee">SEGUIREMOS DUDANDO HASTA QUE REALMENTE NOS RECONOZCAMOS ALLÍ. </span></div>
            <div className="marquee-set"><span className="marquee-item eco-marquee">SEGUIREMOS DUDANDO HASTA QUE REALMENTE NOS RECONOZCAMOS ALLÍ. </span></div>
          </div>
        </div>

        {/* Full-width */}
        <img src={ASSETS.img25} alt="" style={{ display: 'block', width: '100%', height: '260px', objectFit: 'cover', marginTop: '80px' }} />


        <div style={{ position: 'relative', height: '950px', marginTop: '80px' }}>

          <img src={ASSETS.img26} alt="" style={{ position: 'absolute', left: '50%', transform: 'translateX(-50%)', top: '0', width: '170px', height: '113px', objectFit: 'cover', zIndex: 2 }} />


          <PI src={ASSETS.img27} alt="" style={{ position: 'absolute', right: '0px', top: '70px', width: '170px', height: '255px', objectFit: 'cover' }} />


          <img src={ASSETS.img28} alt="" style={{ position: 'absolute', left: '0px', top: '400px', width: '200px', height: '133px', objectFit: 'cover' }} />

          {/* 29 a la derecha */}
          <img src={ASSETS.img29} alt="" style={{ position: 'absolute', right: '0px', top: '494px', width: '200px', height: '133px', objectFit: 'cover' }} />
        </div>


        {/* Carousel 1 */}
        <div style={{ marginTop: '-243px', width: '100%', height: CH, overflow: 'hidden' }}>
          <div style={{ display: 'flex', height: CH, width: 'max-content', animation: `eco-m-c1 ${5 * CAROUSEL.durationPerImage}s linear infinite` }}>
            {[ASSETS.carousel1, ASSETS.carousel2, ASSETS.carousel3, ASSETS.carousel4, ASSETS.carousel5,
            ASSETS.carousel1, ASSETS.carousel2, ASSETS.carousel3, ASSETS.carousel4, ASSETS.carousel5].map((src, i) => (
              <img key={i} src={src} alt="" style={{ height: CH, width: 'auto', display: 'block', flexShrink: 0 }} />
            ))}
          </div>
        </div>
        <style dangerouslySetInnerHTML={{ __html: `@-webkit-keyframes eco-m-c1 { from { -webkit-transform: translate3d(0,0,0); transform: translate3d(0,0,0) } to { -webkit-transform: translate3d(-50%,0,0); transform: translate3d(-50%,0,0) } } @keyframes eco-m-c1 { from { transform: translate3d(0,0,0) } to { transform: translate3d(-50%,0,0) } }` }} />

        <div className="eco-p" style={{
          color: '#fff',
          marginTop: '80px',
          width: '350px',
          marginLeft: '20px',
          fontSize: '15px',
          fontStyle: 'normal',
          fontFamily: '"Space Grotesk", sans-serif',
          fontWeight: 300,
          lineHeight: '21.75px',
          letterSpacing: 'normal',
          WebkitFontSmoothing: 'antialiased',
          ['leadingTrim' as any]: 'both',
          ['textEdge' as any]: 'cap'
        }}>
          Sí, claro. Todavía no conocemos muchos<br />
          universos, pero puede ser que los haya. Y<br />
          dentro de ellos, siempre habrá un lugar para el<br />
          arte que expande nuestra posibilidad de<br />
          entender y percibir lo diferente. Tal vez nos<br />
          aterra que esa posibilidad desaparezca. Pero no<br />
          lo hará. Porque las cosas existen también en<br />
          nuestras memorias. Quizá aún más<br />
          intensamente.
        </div>

        <div style={{ position: 'relative', height: '300px', marginTop: '80px' }}>
          <img src={ASSETS.img30} alt="" style={{ position: 'absolute', right: '0px', top: '0', width: '200px', height: '133px', objectFit: 'cover', zIndex: 2 }} />
          <img src={ASSETS.img31} alt="" style={{ position: 'absolute', left: '0px', top: '101px', width: '200px', height: '133px', objectFit: 'cover' }} />
        </div>

        {/* Image pair (img32/img33) */}
        <div style={{ position: 'relative', height: '320px', marginTop: '12px' }}>
          <PI src={ASSETS.img32} alt="" style={{ position: 'absolute', left: '0px', top: '0', width: '170px', height: '255px', objectFit: 'cover', zIndex: 2 }} />
          <img src={ASSETS.img33} alt="" style={{ position: 'absolute', right: '50px', top: '209px', width: '230px', height: '153px', objectFit: 'cover' }} />
        </div>

        {/* Marquee */}
        <div style={{ position: 'relative', zIndex: 5, marginTop: '-302px', marginBottom: '394px', height: '30px', overflow: 'hidden', mixBlendMode: 'difference' }}>
          <div className="marquee-track" style={{ animationDuration: `${75 * MARQUEE.secondsPerChar}s` }}>
            <div className="marquee-set"><span className="marquee-item eco-marquee">SIEMPRE HABRÁ UN LUGAR PARA EL ARTE QUE EXPANDE NUESTRA POSIBILIDAD DE ENTENDER · </span></div>
            <div className="marquee-set"><span className="marquee-item eco-marquee">SIEMPRE HABRÁ UN LUGAR PARA EL ARTE QUE EXPANDE NUESTRA POSIBILIDAD DE ENTENDER · </span></div>
          </div>
        </div>

        {/* Video timelapse - Mobile */}
        <div style={{ position: 'relative', width: '100%', height: '56.25vw', marginTop: '80px', backgroundColor: '#000' }}>
          <div className="vimeo-container" style={{ position: 'absolute', inset: 0 }}>
            <CustomVimeoPlayer
              videoUrl={ASSETS.videoTimelapse}
              title="ECO AL INFINITO . Timelapse"
            />
          </div>
        </div>

        {/* Image pair (img34/img35) */}
        <div style={{ position: 'relative', height: '340px', marginTop: '80px' }}>
          <PI src={ASSETS.img34} alt="" style={{ position: 'absolute', left: '40px', top: '0', width: '200px', height: '300px', objectFit: 'cover' }} />
          <img src={ASSETS.img35} alt="" style={{ position: 'absolute', right: '0px', top: '248px', width: '200px', height: '133px', objectFit: 'cover' }} />
        </div>

        {/* Carousel 2 */}
        <div style={{ marginTop: '122px', width: '100%', height: '331px', overflow: 'hidden' }}>
          <div style={{ display: 'flex', height: '331px', width: 'max-content', animation: `eco-m-c2 ${6 * CAROUSEL.durationPerImage}s linear infinite` }}>
            {[ASSETS.carousel6, ASSETS.carousel7, ASSETS.carousel8, ASSETS.carousel9, ASSETS.carousel10, ASSETS.carousel11,
            ASSETS.carousel6, ASSETS.carousel7, ASSETS.carousel8, ASSETS.carousel9, ASSETS.carousel10, ASSETS.carousel11].map((src, i) => (
              <img key={i} src={src} alt="" style={{ height: '331px', width: 'auto', display: 'block', flexShrink: 0 }} />
            ))}
          </div>
        </div>
        <style dangerouslySetInnerHTML={{ __html: `@-webkit-keyframes eco-m-c2 { from { -webkit-transform: translate3d(0,0,0); transform: translate3d(0,0,0) } to { -webkit-transform: translate3d(-50%,0,0); transform: translate3d(-50%,0,0) } } @keyframes eco-m-c2 { from { transform: translate3d(0,0,0) } to { transform: translate3d(-50%,0,0) } }` }} />

        {/* Image pair (img36/img37) */}
        <div style={{ position: 'relative', height: '360px', marginTop: '80px' }}>
          <PI src={ASSETS.img36} alt="" style={{ position: 'absolute', right: '20px', top: '0', width: '170px', height: '255px', objectFit: 'cover', zIndex: 2 }} />
          <img src={ASSETS.img37} alt="" style={{ position: 'absolute', left: '20px', top: '195px', width: '230px', height: '153px', objectFit: 'cover' }} />
        </div>

        {/* Full-width */}
        <img src={ASSETS.img38} alt="" style={{ display: 'block', width: '100%', height: '260px', objectFit: 'cover', marginTop: '67px' }} />

        {/* Para 6 */}
        {/* <div className="eco-p" style={{ color: '#fff', padding: '80px 20px 0', maxWidth: '350px' }}>
          Sí, claro. Todavía no conocemos muchos universos, pero puede ser que los haya. Y dentro de ellos, siempre habrá un lugar para el arte que expande nuestra posibilidad de entender y percibir lo diferente. Tal vez nos aterra que esa posibilidad desaparezca. Pero no lo hará. Porque las cosas existen también en nuestras memorias. Quizá aún más intensamente.
        </div> */}

        {/* Lyrics — Figma 1571:1135..1141 (mobile) — Helvetica Neue LT Std Thin 16px, centered */}
        <div style={{ backgroundColor: '#0F0F0F', marginTop: '23px', padding: '60px 20px 0', textAlign: 'center' }}>
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
            <div style={{ marginBottom: '15px', whiteSpace: 'nowrap' }}>AND THE VISION THAT WAS PLANTED IN MY BRAIN</div>
            <div style={{ marginBottom: '15px' }}>STILL REMAINS</div>
            <div>WITHIN THE SOUND OF SILENCE</div>
          </div>
          {/* Simon & Garfunkel — 51px below WITHIN top → marginTop 35px (51 - 16) */}
          <div style={{
            marginTop: '35px',
            marginBottom: '40px',
            color: '#fff',
            fontFamily: '"Space Grotesk", sans-serif',
            fontWeight: 300,
            fontSize: 'var(--p-size)',
            lineHeight: 1.45,
          }}>
            Simon &amp; Garfunkel · 1964
          </div>

          {/* Credits Mobile */}
          {/* <div style={{
            color: '#fff',
            marginTop: '40px',
            padding: '0 20px',
            fontFamily: '"Helvetica Neue LT Std", sans-serif',
            fontWeight: 100,
            fontSize: '12px',
            lineHeight: '1.6',
            mixBlendMode: 'difference',
            textTransform: 'uppercase'
          }}>
            <span style={{ fontWeight: 700 }}>"ECO AL INFINITO"</span> por Constanza Schwartz &nbsp;/&nbsp;
            <span style={{ fontWeight: 700 }}>Realización: </span>
            <span>Gastón Aliaga (INDIGO Lumieres) y Mónica Mostajo + Franco Lavra (GOTA Arquigrafía) &nbsp;/&nbsp;</span>
            <span style={{ fontWeight: 700 }}>Instalación: </span>
            <span>Mónica Mostajo + Franco Lavra (GOTA Arquigrafía) &nbsp;/&nbsp;</span>
            <span style={{ fontWeight: 700 }}>Acompañamiento Curatorial: </span>
            <span>Facundo López &nbsp;/&nbsp;</span>
            <span style={{ fontWeight: 700 }}>Dirección Audiovisual: </span>
            <span>Martín Rois &nbsp;/&nbsp;</span>
            <span style={{ fontWeight: 700 }}>Composición Musical: </span>
            <span>Francisco Rousset Osio &nbsp;/&nbsp;</span>
            <span style={{ fontWeight: 700 }}>Registro Fotográfico: </span>
            <span>Bianca Siffredi &nbsp;/&nbsp;</span>
            <span style={{ fontWeight: 700 }}>2do en Cámara: </span>
            <span>Felipe Malatesta &nbsp;/&nbsp;</span>
            <span style={{ fontWeight: 700 }}>Co-Proyección y Modelado: </span>
            <span>Francisca Gil Sosa &nbsp;/&nbsp;</span>
            <span style={{ fontWeight: 700 }}>Colaboración Integral Post-Montaje: </span>
            <span>Juan Ignacio Scheller</span>
          </div> */}
        </div>

      </div>{/* /eco-mobile */}
    </div>
  )
}
