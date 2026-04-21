'use client'

import { ParallaxSection } from '@/src/components/parallax/ParallaxSection'
import { ParallaxLayer } from '@/src/components/parallax/ParallaxLayer'
import { ASSETS } from './assets'

export { meta } from './meta'

const TEXT_BLOCK_STYLE: React.CSSProperties = {
  color: '#fff',
  fontSize: '1.25rem',
  lineHeight: '1.6',
  fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif",
  fontWeight: 300,
  maxWidth: '800px'
}

const CREDITS_LINE_STYLE: React.CSSProperties = {
  borderTop: '1px solid rgba(255,255,255,0.2)',
  paddingTop: '1rem',
  color: '#fff',
  fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif",
}

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
        .eco-p { font-size: var(--p-m); line-height: 1.5; font-family: "Space Grotesk", sans-serif; font-weight: 300; letter-spacing: 0; }
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

      {/* 1. HERO — Full width sculpture */}
      <ParallaxSection id="hero" style={{ minHeight: '100vh' }}>
        <ParallaxLayer
          sectionId="hero"
          layerIndex={0}
          layer={{ type: 'image', src: ASSETS.hero, speed: 0.4, isHero: true, objectFit: 'cover' }}
          position={{ top: '0', left: '0', width: '100%', height: '100vh', zIndex: 1 }}
        />
      </ParallaxSection>

      {/* 2. INTRO — First paragraph + first collage images */}
      <ParallaxSection id="intro" style={{ minHeight: '150vh' }}>
        {/* Right-column intro text */}
        <ParallaxLayer
          sectionId="intro"
          layerIndex={0}
          layer={{ type: 'text', content: '', speed: 0 }}
          position={{ top: '8vh', left: '59.375%', width: '32.1527%', height: 'auto', zIndex: 3 }}
        >
          <div style={TEXT_BLOCK_STYLE} className="eco-p">
            <p style={{ marginBottom: '1.5rem' }}>
              Si nombramos al nuevo cerebro, es porque él cambió. Y mucho.
            </p>
            <p>
              No es más ese conjunto de neuronas que no cede en su lucha por mantenernos vivos.
              Ha pasado años sumergido en las incontables marejadas de tecnología que nos abruma
              sin piedad desde que pusimos un caballo delante de un arado.
            </p>
          </div>
        </ParallaxLayer>

        {/* Left vertical image (Img 1) - Overlaps Img 2 */}
        <ParallaxLayer
          sectionId="intro"
          layerIndex={1}
          layer={{ type: 'image', src: ASSETS.img1, speed: 0.25 }}
          position={{ top: '25vh', left: '8.4722%', width: '23.9583%', height: '60vh', zIndex: 2 }}
        />

        {/* Center horizontal image (Img 2) - Below others */}
        <ParallaxLayer
          sectionId="intro"
          layerIndex={2}
          layer={{ type: 'image', src: ASSETS.img2, speed: 0.45 }}
          position={{ top: '65vh', left: '28%', width: '32.4305%', height: '28vh', zIndex: 1 }}
        />

        {/* Right wide image (Img 3) - Overlaps Img 2 */}
        <ParallaxLayer
          sectionId="intro"
          layerIndex={3}
          layer={{ type: 'image', src: ASSETS.img3, speed: 0.6 }}
          position={{ top: '85vh', left: '50.6944%', width: '40.8333%', height: '35vh', zIndex: 2 }}
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

        {/* Marquee overlay - Moved higher */}
        <ParallaxLayer
          sectionId="collage-1"
          layerIndex={1}
          layer={{ type: 'marquee', content: 'SI NOMBRAMOS AL NUEVO CEREBRO, ES PORQUE ÉL CAMBIÓ. Y MUCHO.', speed: 0 }}
          position={{ top: '20vh', left: '0', width: '100%', height: '8vh', zIndex: 3 }}
        />
      </ParallaxSection>

      {/* 4. TEXT + COLLAGE 2 — "Constanza Schwartz tampoco cede..." */}
      <ParallaxSection id="text-collage-2" style={{ minHeight: '140vh' }}>
        {/* Left text */}
        <ParallaxLayer
          sectionId="text-collage-2"
          layerIndex={0}
          layer={{ type: 'text', content: '', speed: 0 }}
          position={{ top: '12vh', left: '8.5416%', width: '32.4305%', height: 'auto', zIndex: 2 }}
        >
          <div style={TEXT_BLOCK_STYLE} className="eco-p">
            Constanza Schwartz tampoco cede, y contestará a la tecnología con más esfuerzo humano.
            De este modo, surgirán espacios que realmente nos transportan a sitios dentro de nuestro
            universo a los que no llegamos a menudo. Solo lo haremos guiados por la creatividad y su
            inclemente convocatoria de presencias arcaicas y míticas, figuras atemporales, intensas,
            al mismo tiempo, conmovedoras y abstractas.
          </div>
        </ParallaxLayer>

        {/* Right portrait image (Img 5) */}
        <ParallaxLayer
          sectionId="text-collage-2"
          layerIndex={1}
          layer={{ type: 'image', src: ASSETS.img5, speed: 0.25 }}
          position={{ top: '5vh', left: '59.0972%', width: '32.4305%', height: '80vh', zIndex: 1 }}
        />

        {/* Bottom horizontal image (Img 6) - Touching Img 5 */}
        <ParallaxLayer
          sectionId="text-collage-2"
          layerIndex={2}
          layer={{ type: 'image', src: ASSETS.img6, speed: 0.55 }}
          position={{ top: '80vh', left: '33.8194%', width: '32.4305%', height: '35vh', zIndex: 2 }}
        />
      </ParallaxSection>

      {/* 5. COLLAGE 3 + TEXT — "Al desplazarnos..." */}
      <ParallaxSection id="collage-3" style={{ minHeight: '180vh' }}>
        {/* Full-width Image 7 */}
        <ParallaxLayer
          sectionId="collage-3"
          layerIndex={0}
          layer={{ type: 'image', src: ASSETS.img7, speed: 0.2 }}
          position={{ top: '0', left: '0', width: '100%', height: '80vh', zIndex: 1 }}
        />

        {/* Staggered Image 8 */}
        <ParallaxLayer
          sectionId="collage-3"
          layerIndex={1}
          layer={{ type: 'image', src: ASSETS.img8, speed: 0.45 }}
          position={{ top: '90vh', left: '8.5416%', width: '32.4305%', height: '35vh', zIndex: 2 }}
        />

        {/* Staggered Image 9 */}
        <ParallaxLayer
          sectionId="collage-3"
          layerIndex={2}
          layer={{ type: 'image', src: ASSETS.img9, speed: 0.65 }}
          position={{ top: '105vh', left: '33.8194%', width: '32.4305%', height: '35vh', zIndex: 3 }}
        />

        {/* Text bottom relative to images */}
        <ParallaxLayer
          sectionId="collage-3"
          layerIndex={3}
          layer={{ type: 'text', content: '', speed: 0 }}
          position={{ top: '150vh', left: '8.4722%', width: '32.4305%', height: 'auto', zIndex: 2 }}
        >
          <div style={TEXT_BLOCK_STYLE} className="eco-p">
            Al desplazarnos por vacíos y llenos, imposibles convergencias, nos conmovemos al tiempo
            que nos transformamos en cultores y espectadores participativos de su obra.
          </div>
        </ParallaxLayer>
      </ParallaxSection>

      {/* 6. COLLAGE 4 — The 4 Images Strip (10, 11, 12, 13) */}
      <ParallaxSection id="collage-4" style={{ minHeight: '220vh' }}>
        <ParallaxLayer
          sectionId="collage-4"
          layerIndex={0}
          layer={{ type: 'image', src: ASSETS.img10, speed: 0.2 }}
          position={{ top: '10vh', left: '50.6944%', width: '49.3055%', height: '50vh', zIndex: 1 }}
        />
        <ParallaxLayer
          sectionId="collage-4"
          layerIndex={1}
          layer={{ type: 'image', src: ASSETS.img11, speed: 0.4 }}
          position={{ top: '50vh', left: '4.2361%', width: '49.3055%', height: '50vh', zIndex: 2 }}
        />
        <ParallaxLayer
          sectionId="collage-4"
          layerIndex={2}
          layer={{ type: 'image', src: ASSETS.img12, speed: 0.6 }}
          position={{ top: '100vh', left: '59.0972%', width: '32.4305%', height: '45vh', zIndex: 3 }}
        />
        <ParallaxLayer
          sectionId="collage-4"
          layerIndex={3}
          layer={{ type: 'image', src: ASSETS.img13, speed: 0.8 }}
          position={{ top: '140vh', left: '33.8194%', width: '32.4305%', height: '45vh', zIndex: 4 }}
        />
      </ParallaxSection>

      {/* 7. MAKING-OFF-TEMPLATE */}
      <ParallaxSection id="making-of-intro" style={{ minHeight: '100vh' }}>
        <ParallaxLayer
          sectionId="making-of-intro"
          layerIndex={0}
          layer={{ type: 'image', src: ASSETS.makingOffTemplate, speed: 0.1, objectFit: 'cover' }}
          position={{ top: '0', left: '0', width: '100%', height: '100vh', zIndex: 1 }}
        />
      </ParallaxSection>

      {/* 8. COLLAGE 14-15-16 + PARAGRAPH (Descending staircase) */}
      <ParallaxSection id="collage-14-15-16" style={{ minHeight: '200vh' }}>
        <ParallaxLayer
          sectionId="collage-14-15-16"
          layerIndex={0}
          layer={{ type: 'image', src: ASSETS.img14, speed: 0.2 }}
          position={{ top: '10vh', left: '4.2361%', width: '23.9583%', height: '55vh', zIndex: 2 }}
        />
        <ParallaxLayer
          sectionId="collage-14-15-16"
          layerIndex={1}
          layer={{ type: 'image', src: ASSETS.img15, speed: 0.4 }}
          position={{ top: '35vh', left: '38%', width: '23.9583%', height: '55vh', zIndex: 2 }}
        />
        <ParallaxLayer
          sectionId="collage-14-15-16"
          layerIndex={2}
          layer={{ type: 'image', src: ASSETS.img16, speed: 0.6 }}
          position={{ top: '60vh', left: '71.7361%', width: '23.9583%', height: '60vh', zIndex: 2 }}
        />

        {/* Paragraph below staircase */}
        <ParallaxLayer
          sectionId="collage-14-15-16"
          layerIndex={3}
          layer={{ type: 'text', content: '', speed: 0 }}
          position={{ top: '140vh', left: '8.5416%', width: '32.4305%', height: 'auto', zIndex: 2 }}
        >
          <div style={TEXT_BLOCK_STYLE} className="eco-p">
            La potencia de esta creación no da lugar a ausentarse. Participamos sin descanso, metro
            a metro, de las síntesis sensibles que reavivan las fraguas más ardientes de la memoria
            para trasladarnos a espacios libres donde sus elementales e infinitas combinaciones se
            reproducen y rebobinan en nuestra mente, aunando pasados, presentes y futuros que
            resurgen ante nuestro caminar buscando un sentido. Hay muchos.
          </div>
        </ParallaxLayer>
      </ParallaxSection>
      
      {/* 9. VIDEO MAKING OF (Full Width) */}
      <ParallaxSection id="making-of-video" style={{ minHeight: '120vh' }}>
        <ParallaxLayer
          sectionId="making-of-video"
          layerIndex={0}
          layer={{ type: 'text', content: '', speed: 0.1 }}
          position={{ top: '10vh', left: '0', width: '100%', height: '100vh', zIndex: 1 }}
        >
          <div style={{ position: 'relative', width: '100%', height: '100%' }}>
            {/* Template frame on top */}
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
              <source src={ASSETS.videoMakingOff} type="video/mp4" />
            </video>
          </div>
        </ParallaxLayer>
      </ParallaxSection>

      {/* 10. COLLAGE 17-18 + OVERLAPPING MARQUEE */}
      <ParallaxSection id="collage-17-18" style={{ minHeight: '135vh' }}>
        <ParallaxLayer
          sectionId="collage-17-18"
          layerIndex={0}
          layer={{ type: 'image', src: ASSETS.img17, speed: 0.3 }}
          position={{ top: '5vh', left: '21.1111%', width: '32.4305%', height: '70vh', zIndex: 1 }}
        />
        <ParallaxLayer
          sectionId="collage-17-18"
          layerIndex={1}
          layer={{ type: 'image', src: ASSETS.img18, speed: 0.5 }}
          position={{ top: '25vh', left: '46.4583%', width: '32.4305%', height: '90vh', zIndex: 2 }}
        />
        {/* Overlapping Marquee inside the same section */}
        <ParallaxLayer
          sectionId="collage-17-18"
          layerIndex={2}
          layer={{ type: 'marquee', content: 'SE REPRODUCEN Y REBOBINAN EN NUESTRA MENTE, AUNANDO PASADOS, PRESENTES Y FUTUROS', speed: 0 }}
          position={{ top: '110vh', left: '0', width: '100%', height: '8vh', zIndex: 3 }}
        />
      </ParallaxSection>

      {/* 10. FINAL FULL IMAGE (19) */}
      <ParallaxSection id="final-image-19" style={{ minHeight: '120vh' }}>
        <ParallaxLayer
          sectionId="final-image-19"
          layerIndex={0}
          layer={{ type: 'image', src: ASSETS.img19, speed: 0.2 }}
          position={{ top: '10vh', left: '0', width: '100%', height: '100vh', zIndex: 1 }}
        />
      </ParallaxSection>

      {/* 11. FINAL COLLAGE 20-21-22 (Making Of Close - Pixel Perfect) */}
      <ParallaxSection id="collage-20-21-22" style={{ minHeight: '230vh' }}>
        <ParallaxLayer
          sectionId="collage-20-21-22"
          layerIndex={0}
          layer={{ type: 'image', src: ASSETS.img20, speed: 0.2 }}
          position={{ top: '15vh', left: '63.3333%', width: '32.4305%', height: '35vh', zIndex: 2 }}
        />
        <ParallaxLayer
          sectionId="collage-20-21-22"
          layerIndex={1}
          layer={{ type: 'image', src: ASSETS.img21, speed: 0.4 }}
          position={{ top: '25vh', left: '42.2222%', width: '32.4305%', height: '85vh', zIndex: 3 }}
        />
        <ParallaxLayer
          sectionId="collage-20-21-22"
          layerIndex={2}
          layer={{ type: 'image', src: ASSETS.img22, speed: 0.6 }}
          position={{ top: '135vh', left: '8.4722%', width: '55%', height: '50vh', zIndex: 2 }}
        />
      </ParallaxSection>

      {/* 12. FINAL NARRATIVE + COLLAGE 23-24 (Pixel Perfect) */}
      <ParallaxSection id="final-narrative-23-24" style={{ minHeight: '300vh' }}>
        {/* Concluding Paragraph on the Right */}
        <ParallaxLayer
          sectionId="final-narrative-23-24"
          layerIndex={0}
          layer={{ type: 'text', content: '', speed: 0.1 }}
          position={{ top: '10vh', left: '59.1666%', width: '32.4305%', height: 'auto', zIndex: 2 }}
        >
          <div style={TEXT_BLOCK_STYLE} className="eco-p">
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

        {/* Image 23 on the Left */}
        <ParallaxLayer
          sectionId="final-narrative-23-24"
          layerIndex={1}
          layer={{ type: 'image', src: ASSETS.img23, speed: 0.3 }}
          position={{ top: '80vh', left: '8.4722%', width: '32.4305%', height: '75vh', zIndex: 1 }}
        />

        {/* Overlapping Marquee */}
        <ParallaxLayer
          sectionId="final-narrative-23-24"
          layerIndex={2}
          layer={{ type: 'marquee', content: 'Seguiremos dudando hasta que realmente nos reconozcamos allí.', speed: 0 }}
          position={{ top: '150vh', left: '0', width: '100%', height: '8vh', zIndex: 3 }}
        />

        {/* Image 24 in the Center */}
        <ParallaxLayer
          sectionId="final-narrative-23-24"
          layerIndex={3}
          layer={{ type: 'image', src: ASSETS.img24, speed: 0.5 }}
          position={{ top: '180vh', left: '33.8194%', width: '32.4305%', height: '85vh', zIndex: 2 }}
        />
      </ParallaxSection>
      {/* 13. IMAGE 25 (Full Width) + COLLAGE 26-27 */}
      <ParallaxSection id="final-sequence-25-27" style={{ minHeight: '230vh' }}>
        <ParallaxLayer
          sectionId="final-sequence-25-27"
          layerIndex={0}
          layer={{ type: 'image', src: ASSETS.img25, speed: 0.2 }}
          position={{ top: '10vh', left: '0', width: '100%', height: '100vh', zIndex: 1 }}
        />
        
        {/* Staggered Duo 26-27 below 25 */}
        <ParallaxLayer
          sectionId="final-sequence-25-27"
          layerIndex={1}
          layer={{ type: 'image', src: ASSETS.img26, speed: 0.4 }}
          position={{ top: '125vh', left: '34.0277%', width: '32.4305%', height: '50vh', zIndex: 2 }}
        />
        <ParallaxLayer
          sectionId="final-sequence-25-27"
          layerIndex={2}
          layer={{ type: 'image', src: ASSETS.img27, speed: 0.6 }}
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
          position={{ top: '5vh', left: '0', width: '100%', height: '331px', zIndex: 2 }}
        >
          <div className="flex w-max" style={{ height: '331px', overflow: 'hidden' }}>
            <div className="flex animate-eco-carousel">
              {[ASSETS.carousel1, ASSETS.carousel2, ASSETS.carousel3, ASSETS.carousel4, ASSETS.carousel5, ASSETS.carousel1, ASSETS.carousel2, ASSETS.carousel3, ASSETS.carousel4, ASSETS.carousel5].map((src, i) => (
                <div key={i} className="w-[588px] h-[331px] flex-shrink-0">
                  <img src={src} className="w-full h-full object-cover" style={{ height: '331px' }} alt="" />
                </div>
              ))}
            </div>
          </div>
        </ParallaxLayer>

        <style dangerouslySetInnerHTML={{
          __html: `
          @keyframes eco-carousel-scroll {
            0% { transform: translateX(0); }
            100% { transform: translateX(-${5 * 588}px); }
          }
          .animate-eco-carousel {
            animation: eco-carousel-scroll 18s linear infinite;
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
          position={{ top: '10vh', left: '59.09%', width: '32.43%', height: 'auto', zIndex: 1 }}
        >
          <div style={TEXT_BLOCK_STYLE} className="eco-p">
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
          position={{ top: '60vh', left: '59.0972%', width: '32.4305%', height: '70vh', zIndex: 1 }}
        />

        {/* Image 31 (Center) */}
        <ParallaxLayer
          sectionId="final-sequence-30-33"
          layerIndex={2}
          layer={{ type: 'image', src: ASSETS.img31, speed: 0.5 }}
          position={{ top: '110vh', left: '33.75%', width: '32.4305%', height: '65vh', zIndex: 2 }}
        />

        {/* Image 32 (Left, custom width 345px) - Above 33 */}
        <ParallaxLayer
          sectionId="final-sequence-30-33"
          layerIndex={3}
          layer={{ type: 'image', src: ASSETS.img32, speed: 0.2 }}
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
          layer={{ type: 'image', src: ASSETS.img33, speed: 0.6 }}
          position={{ top: '235vh', left: '29.6527%', width: '32.4305%', height: '40vh', zIndex: 2 }}
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
          layer={{ type: 'image', src: ASSETS.img34, speed: 0.2 }}
          position={{ top: '10vh', left: '8.4722%', width: '32.4305%', height: '70vh', zIndex: 1 }}
        />
        <ParallaxLayer
          sectionId="collage-34-35"
          layerIndex={1}
          layer={{ type: 'image', src: ASSETS.img35, speed: 0.4 }}
          position={{ top: '80vh', left: '33.6111%', width: '32.4305%', height: '50vh', zIndex: 2 }}
        />
      </ParallaxSection>

      {/* 18. CAROUSEL 2 (carousel6-10) */}
      <ParallaxSection id="carousel-section-2" style={{ minHeight: '60vh' }}>
        <ParallaxLayer
          sectionId="carousel-section-2"
          layerIndex={0}
          layer={{ type: 'image', src: '', speed: 0 }}
          position={{ top: '5vh', left: '0', width: '100%', height: '331px', zIndex: 2 }}
        >
          <div className="flex w-max" style={{ height: '331px', overflow: 'hidden' }}>
            <div className="flex animate-eco-carousel-2">
              {[ASSETS.carousel6, ASSETS.carousel7, ASSETS.carousel8, ASSETS.carousel9, ASSETS.carousel10, ASSETS.carousel11, ASSETS.carousel6, ASSETS.carousel7, ASSETS.carousel8, ASSETS.carousel9, ASSETS.carousel10, ASSETS.carousel11].map((src, i) => (
                <div key={i} className="w-[588px] h-[331px] flex-shrink-0">
                  <img src={src} className="w-full h-full object-cover" style={{ height: '331px' }} alt="" />
                </div>
              ))}
            </div>
          </div>
        </ParallaxLayer>

        <style dangerouslySetInnerHTML={{
          __html: `
          @keyframes eco-carousel-scroll-2 {
            0% { transform: translateX(0); }
            100% { transform: translateX(-${6 * 588}px); }
          }
          .animate-eco-carousel-2 {
            animation: eco-carousel-scroll-2 18s linear infinite;
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
          layer={{ type: 'image', src: ASSETS.img37, speed: 0.5 }}
          position={{ top: '70vh', left: '42.2222%', width: '32.4305%', height: '50vh', zIndex: 1 }}
        />
      </ParallaxSection>

      {/* 20. FINAL FULL IMAGE (38) */}
      <ParallaxSection id="final-image-38" style={{ minHeight: '120vh' }}>
        <ParallaxLayer
          sectionId="final-image-38"
          layerIndex={0}
          layer={{ type: 'image', src: ASSETS.img38, speed: 0.1 }}
          position={{ top: '0', left: '0', width: '100%', height: '100vh', zIndex: 1 }}
        />
      </ParallaxSection>

      {/* 21. LYRICS SECTION (Sound of Silence) */}
      <ParallaxSection id="lyrics-section" style={{ minHeight: '800px', backgroundColor: '#121212' }}>
        <div style={{ 
          position: 'relative', 
          width: '100%', 
          height: '100%', 
          color: '#fff', 
          textTransform: 'uppercase', 
          fontSize: '36px', 
          fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif",
          fontWeight: 100,
          letterSpacing: '-0.02em',
          paddingTop: '110px'
        }}>
          {/* Using margins and spacing instead of absolute fixed coordinates to be more responsive but respecting gaps */}
          <div style={{ marginLeft: '39.02%', marginBottom: '44px' }}>BECAUSE A VISION SOFTLY CREEPING</div>
          <div style={{ marginLeft: '28.19%', marginBottom: '44px' }}>LEFT ITS SEEDS WHILE I WAS SLEEPING</div>
          <div style={{ marginLeft: '42.22%', marginBottom: '44px' }}>AND THE VISION THAT WAS PLANTED IN MY BRAIN</div>
          <div style={{ marginLeft: '50.00%', marginBottom: '44px' }}>STILL REMAINS</div>
          <div style={{ marginLeft: '80.27%', marginBottom: '44px' }}>WITHIN THE SOUND OF SILENCE</div>
          
          <div style={{ position: 'absolute', bottom: '110px', right: '97px', fontSize: '18px', opacity: 0.5, fontWeight: 300 }}>
            Simon & Garfunkel · 1964
          </div>
        </div>
      </ParallaxSection>
      <div style={{ height: '30vh', backgroundColor: '#121212' }} />
    </div>
  )
}
