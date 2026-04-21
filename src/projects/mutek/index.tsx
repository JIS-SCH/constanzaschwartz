'use client'

import { ParallaxSection } from '@/src/components/parallax/ParallaxSection'
import { ParallaxLayer } from '@/src/components/parallax/ParallaxLayer'
import { ASSETS } from './assets'

export { meta } from './meta'

const TEXT_BLOCK_STYLE: React.CSSProperties = {
  fontFamily: '"Space Grotesk", sans-serif',
  fontWeight: 300,
  lineHeight: 1.5,
  color: '#fff',
}

const TITLE_STYLE: React.CSSProperties = {
  fontFamily: '"Helvetica Neue LT Std", "Helvetica Neue", Helvetica, Arial, sans-serif',
  fontWeight: 100,
  color: '#fff',
  textTransform: 'uppercase',
  lineHeight: 1,
}

const LOREM_SHORT =
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation.'

const LOREM_MID =
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.'

export function Component() {
  return (
    <div style={{ width: '100%', position: 'relative', backgroundColor: '#0F0F0F' }} className="mutek-container">
      <style dangerouslySetInnerHTML={{
        __html: `
        /* TYPOGRAPHY SYSTEM - MUTEK */
        .mutek-container {
          --h1-d: 280px; --h1-m: 170px;
          --h2-d: 128px; --h2-m: 57px;
          --h3-d: 56px;  --h3-m: 36px;
          --h4-d: 36px;  --h4-m: 28px;
          --list-d: 26px; --list-m: 15px;
          --p-d: 16px;   --p-m: 15px;
          --credits-d: 24px; --credits-m: 16px;
        }

        .mutek-h1 { font-size: var(--h1-m); line-height: 1; font-family: "Helvetica Neue LT Std", "Helvetica Neue", Helvetica; font-weight: 100; letter-spacing: 0; }
        .mutek-h2 { font-size: var(--h2-m); line-height: 1; font-family: "Helvetica Neue LT Std", "Helvetica Neue", Helvetica; font-weight: 100; letter-spacing: 0; }
        .mutek-h3 { font-size: var(--h3-m); line-height: 1; font-family: "Helvetica Neue LT Std", "Helvetica Neue", Helvetica; font-weight: 100; letter-spacing: 0; }
        .mutek-h4 { font-size: var(--h4-m); line-height: 1.2; font-family: "Helvetica Neue LT Std", "Helvetica Neue", Helvetica; font-weight: 300; letter-spacing: 0.02em; }
        .mutek-list { font-size: var(--list-m); line-height: 1.15; font-family: "Helvetica Neue LT Std", "Helvetica Neue", Helvetica; font-weight: 300; letter-spacing: 0; }
        .mutek-p { font-size: var(--p-m); line-height: 1.45; font-family: "Space Grotesk", sans-serif; font-weight: 300; letter-spacing: 0; }
        .mutek-credits { font-size: var(--credits-m); font-family: "Helvetica Neue LT Std", "Helvetica Neue", Helvetica; font-weight: 700; color: #fff; letter-spacing: 0.02em; }

        /* Marquee gap fix: designer requested 80px between phrases on desktop */
        .mutek-container .marquee-item { padding-right: 80px !important; }

        /* Marquees over imagery use difference blend like the navbar */
        .mutek-marquee-blend {
          mix-blend-mode: difference;
          isolation: isolate;
        }

        @media (min-width: 1024px) {
          .mutek-h1 { font-size: var(--h1-d); }
          .mutek-h2 { font-size: var(--h2-d); }
          .mutek-h3 { font-size: var(--h3-d); }
          .mutek-h4 { font-size: var(--h4-d); }
          .mutek-list { font-size: var(--list-d); line-height: 1.21; }
          .mutek-p { font-size: var(--p-d); line-height: 1.5; }
          .mutek-credits { font-size: var(--credits-d); }
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

      {/* 1. HERO — Full-width image, fit so the baked-in title + credits stay visible. */}
      <ParallaxSection id="hero" style={{ minHeight: '100vh' }}>
        <ParallaxLayer
          sectionId="hero"
          layerIndex={0}
          layer={{ type: 'image', src: ASSETS.hero, speed: 0, isHero: true, objectFit: 'cover' }}
          position={{ top: '0', left: '0', width: '100%', height: '100vh', zIndex: 0 }}
        />
      </ParallaxSection>

      {/* 2. INTRO PARAGRAPH + COLLAGE 1 (img1 left tall, img2 portrait below, RITUAL AL VACÍO right) */}
      <ParallaxSection id="intro" style={{ minHeight: '160vh' }}>
        {/* Intro paragraph — left, 466 wide */}
        <ParallaxLayer
          sectionId="intro"
          layerIndex={0}
          layer={{ type: 'text', content: '', speed: 0 }}
          position={{ top: '15vh', left: '8.47%', width: '32.4%', height: 'auto', zIndex: 2 }}
        >
          <div style={TEXT_BLOCK_STYLE} className="mutek-p">
            En el marco del festival internacional Mutek dedicada a la promoción de la música electrónica y las artes digitales en Argentina, como Sideshow, Constanza Schwartz en dupla con Francisco Rousset Osio, crearon un show de música e iluminación ao vivo para los espectadores participativos que se adentraban a la instalación. Convocados por COMITÉ357, este proyecto fue promovido por ARTLAB.
          </div>
        </ParallaxLayer>

        {/* Image 1 — left, 467 wide, tall */}
        <ParallaxLayer
          sectionId="intro"
          layerIndex={1}
          layer={{ type: 'image', src: ASSETS.img1, speed: 0.25 }}
          position={{ top: '55vh', left: '8.47%', width: '32.4%', height: '70vh', zIndex: 1 }}
        />

        {/* RITUAL AL VACÍO title — right column */}
        <ParallaxLayer
          sectionId="intro"
          layerIndex={2}
          layer={{ type: 'text', content: '', speed: 0 }}
          position={{ top: '65vh', left: '54.9%', width: '32.4%', height: 'auto', zIndex: 2 }}
        >
          <h2 style={TITLE_STYLE} className="mutek-h3">RITUAL AL VACÍO</h2>
          <div style={{ ...TEXT_BLOCK_STYLE, marginTop: '2.5rem' }} className="mutek-p">
            Desde nuestros comienzos, protegidos por las cavernas, las llamas danzantes proyectaban juegos de luces sobre las paredes envueltas en imágenes con anhelos de permanencia, creando un mundo de formas efímeras que parecían moverse con vida propia.
          </div>
        </ParallaxLayer>

        {/* Image 2 — portrait centered below */}
        <ParallaxLayer
          sectionId="intro"
          layerIndex={3}
          layer={{ type: 'image', src: ASSETS.img2, speed: 0.5 }}
          position={{ top: '85vh', left: '32.4%', width: '32.4%', height: '70vh', zIndex: 2 }}
        />
      </ParallaxSection>

      {/* 3. TEXT RIGHT + FULL-WIDTH IMAGE + TEXT LEFT */}
      <ParallaxSection id="text-block-1" style={{ minHeight: '140vh' }}>
        {/* Text right — 466 wide, 791 from left */}
        <ParallaxLayer
          sectionId="text-block-1"
          layerIndex={0}
          layer={{ type: 'text', content: '', speed: 0 }}
          position={{ top: '6vh', left: '54.9%', width: '32.4%', height: 'auto', zIndex: 2 }}
        >
          <div style={TEXT_BLOCK_STYLE} className="mutek-p">
            {LOREM_SHORT}
          </div>
        </ParallaxLayer>

        {/* Full-width image */}
        <ParallaxLayer
          sectionId="text-block-1"
          layerIndex={1}
          layer={{ type: 'image', src: ASSETS.img3, speed: 0.2 }}
          position={{ top: '32vh', left: '0', width: '100%', height: '70vh', zIndex: 1 }}
        />

        {/* Text left — 466 wide, 183 from left */}
        <ParallaxLayer
          sectionId="text-block-1"
          layerIndex={2}
          layer={{ type: 'text', content: '', speed: 0 }}
          position={{ top: '110vh', left: '12.7%', width: '32.4%', height: 'auto', zIndex: 2 }}
        >
          <div style={TEXT_BLOCK_STYLE} className="mutek-p">
            {LOREM_MID}
          </div>
        </ParallaxLayer>
      </ParallaxSection>

      {/* 4. IMAGE 831 + MARQUEE (difference blend) + IMAGE 345 PORTRAIT RIGHT */}
      <ParallaxSection id="marquee-1" style={{ minHeight: '110vh' }}>
        {/* Image 831 wide */}
        <ParallaxLayer
          sectionId="marquee-1"
          layerIndex={0}
          layer={{ type: 'image', src: ASSETS.img4, speed: 0.25 }}
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
          layer={{ type: 'image', src: ASSETS.img5, speed: 0.55 }}
          position={{ top: '52vh', left: '64%', width: '24%', height: '32vh', zIndex: 2 }}
        />
      </ParallaxSection>

      {/* 5. COLLAGE — IMAGE 710 LEFT + TEXT RIGHT */}
      <ParallaxSection id="collage-2" style={{ minHeight: '110vh' }}>
        {/* Image 710 wide left */}
        <ParallaxLayer
          sectionId="collage-2"
          layerIndex={0}
          layer={{ type: 'image', src: ASSETS.img6, speed: 0.3 }}
          position={{ top: '8vh', left: '0', width: '49.3%', height: '60vh', zIndex: 1 }}
        />

        {/* Right text block ("La luz se apaga...") */}
        <ParallaxLayer
          sectionId="collage-2"
          layerIndex={1}
          layer={{ type: 'text', content: '', speed: 0 }}
          position={{ top: '32vh', left: '54.9%', width: '32.4%', height: 'auto', zIndex: 2 }}
        >
          <div style={TEXT_BLOCK_STYLE} className="mutek-p">
            {LOREM_SHORT}
          </div>
        </ParallaxLayer>

        {/* Image 831 centered, right-aligned per designer note */}
        <ParallaxLayer
          sectionId="collage-2"
          layerIndex={2}
          layer={{ type: 'image', src: ASSETS.img7, speed: 0.5 }}
          position={{ top: '78vh', left: '34%', width: '57.7%', height: '60vh', zIndex: 1 }}
        />
      </ParallaxSection>

      {/* 6. PORTRAIT 345 + TEXT — "¿Y qué es un ritual..." */}
      <ParallaxSection id="text-block-2" style={{ minHeight: '90vh' }}>
        {/* Image 345 portrait */}
        <ParallaxLayer
          sectionId="text-block-2"
          layerIndex={0}
          layer={{ type: 'image', src: ASSETS.img8, speed: 0.35 }}
          position={{ top: '5vh', left: '20%', width: '24%', height: '40vh', zIndex: 1 }}
        />

        {/* Text "¿Y qué es un ritual cuando ya no convoca..." */}
        <ParallaxLayer
          sectionId="text-block-2"
          layerIndex={1}
          layer={{ type: 'text', content: '', speed: 0 }}
          position={{ top: '52vh', left: '46.5%', width: '32.4%', height: 'auto', zIndex: 2 }}
        >
          <div style={TEXT_BLOCK_STYLE} className="mutek-p">
            {LOREM_SHORT}
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
          position={{ top: '6vh', left: '12.7%', width: '32.4%', height: 'auto', zIndex: 2 }}
        >
          <div style={TEXT_BLOCK_STYLE} className="mutek-p">
            {LOREM_MID}
          </div>
        </ParallaxLayer>

        {/* Image 467 right */}
        <ParallaxLayer
          sectionId="marquee-2"
          layerIndex={1}
          layer={{ type: 'image', src: ASSETS.img9, speed: 0.4 }}
          position={{ top: '0', left: '54.9%', width: '32.4%', height: '70vh', zIndex: 1 }}
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
          layer={{ type: 'image', src: ASSETS.img10, speed: 0.55 }}
          position={{ top: '76vh', left: '33.8%', width: '32.4%', height: '40vh', zIndex: 2 }}
        />
      </ParallaxSection>

      {/* 8. TEXT BLOCK — "Esta obra apela..." */}
      <ParallaxSection id="text-block-3" style={{ minHeight: '50vh' }}>
        <ParallaxLayer
          sectionId="text-block-3"
          layerIndex={0}
          layer={{ type: 'text', content: '', speed: 0 }}
          position={{ top: '8vh', left: '12.7%', width: '32.4%', height: 'auto', zIndex: 2 }}
        >
          <div style={TEXT_BLOCK_STYLE} className="mutek-p">
            {LOREM_MID}
          </div>
        </ParallaxLayer>
      </ParallaxSection>

      {/* 9. BIG FULL-WIDTH IMAGE */}
      <ParallaxSection id="big-image" style={{ minHeight: '90vh' }}>
        <ParallaxLayer
          sectionId="big-image"
          layerIndex={0}
          layer={{ type: 'image', src: ASSETS.img11, speed: 0.2 }}
          position={{ top: '0', left: '0', width: '100%', height: '85vh', zIndex: 1 }}
        />
      </ParallaxSection>

      {/* 10. TEXT RIGHT — "Una posibilidad. Como umbral..." */}
      <ParallaxSection id="text-block-4" style={{ minHeight: '50vh' }}>
        <ParallaxLayer
          sectionId="text-block-4"
          layerIndex={0}
          layer={{ type: 'text', content: '', speed: 0 }}
          position={{ top: '12vh', left: '59.2%', width: '32.4%', height: 'auto', zIndex: 2 }}
        >
          <div style={TEXT_BLOCK_STYLE} className="mutek-p">
            {LOREM_SHORT}
          </div>
        </ParallaxLayer>
      </ParallaxSection>

      {/* 11. IMAGE 831 CENTERED + TEXT LEFT "La caverna de luz..." */}
      <ParallaxSection id="image-text" style={{ minHeight: '90vh' }}>
        <ParallaxLayer
          sectionId="image-text"
          layerIndex={0}
          layer={{ type: 'image', src: ASSETS.img12, speed: 0.3 }}
          position={{ top: '5vh', left: '21.1%', width: '57.7%', height: '60vh', zIndex: 1 }}
        />

        <ParallaxLayer
          sectionId="image-text"
          layerIndex={1}
          layer={{ type: 'text', content: '', speed: 0 }}
          position={{ top: '72vh', left: '8.47%', width: '40%', height: 'auto', zIndex: 2 }}
        >
          <div style={TEXT_BLOCK_STYLE} className="mutek-p">
            {LOREM_SHORT}
          </div>
        </ParallaxLayer>
      </ParallaxSection>

      {/* 12. CAROUSEL — chair-style horizontal scroll (Cloudinary later), full-bleed */}
      <ParallaxSection id="carousel" style={{ minHeight: '50vh' }}>
        <ParallaxLayer
          sectionId="carousel"
          layerIndex={0}
          layer={{ type: 'image', src: '', speed: 0 }}
          position={{ top: '5vh', left: '0', width: '100%', height: '331px', zIndex: 1 }}
        >
          <div className="flex w-max" style={{ height: '331px' }}>
            <div className="flex mutek-animate-carousel">
              {[ASSETS.img1, ASSETS.img4, ASSETS.img7, ASSETS.img1, ASSETS.img4, ASSETS.img7].map((src, i) => (
                <div key={i} className="w-[588px] h-[331px] flex-shrink-0">
                  <img src={src} className="w-full h-full object-cover" style={{ height: '331px' }} alt="" />
                </div>
              ))}
            </div>
          </div>
        </ParallaxLayer>
      </ParallaxSection>

      {/* 13. FINAL TITLE — "Y AÚN APAGADA, ESPERA, AL PRÓXIMO RITUAL." (Helvetica) */}
      <ParallaxSection id="final-title" style={{ minHeight: '60vh' }}>
        <ParallaxLayer
          sectionId="final-title"
          layerIndex={0}
          layer={{ type: 'text', content: '', speed: 0 }}
          position={{ top: '20vh', left: '8.47%', width: '83%', height: 'auto', zIndex: 2 }}
        >
          <h2 style={TITLE_STYLE} className="mutek-h3">
            Y AÚN APAGADA, ESPERA, AL PRÓXIMO RITUAL.
          </h2>
        </ParallaxLayer>
      </ParallaxSection>

    </div>
  )
}
