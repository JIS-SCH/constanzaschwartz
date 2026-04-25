'use client'

import { ParallaxSection } from '@/src/components/parallax/ParallaxSection'
import { ParallaxLayer } from '@/src/components/parallax/ParallaxLayer'
import { TW, CH, HERO_TOP } from '../shared'

// ---------------------------------------------------------------------------
// Figma asset URLs — expire 7 days. Replace with /public or Cloudinary paths.
// ---------------------------------------------------------------------------
const IMG_HERO   = 'https://www.figma.com/api/mcp/asset/d26b3f9e-af13-46ad-af13-f6983f521da1'
const IMG_FULL_1 = 'https://www.figma.com/api/mcp/asset/6c291b28-87c4-41a6-affe-47ab95bbd620'
const IMG_FULL_2 = 'https://www.figma.com/api/mcp/asset/61e5452d-e39e-4b11-ae6c-f719f6774ddc'
const IMG_FULL_3 = 'https://www.figma.com/api/mcp/asset/9d3b273f-3d48-4c1d-a532-0ca0ea3f13cb'
const IMG_WEB028 = 'https://www.figma.com/api/mcp/asset/b8f6378a-1222-403a-80fc-a91f851f4c78'
const IMG_WEB009 = 'https://www.figma.com/api/mcp/asset/3763a9b0-d3a7-444e-9d95-7b191992c53b'
const IMG_WEB008 = 'https://www.figma.com/api/mcp/asset/80b6e87b-6939-4440-871e-d334e6c7b34d'
const IMG_WEB025 = 'https://www.figma.com/api/mcp/asset/a733d542-3ede-4429-8821-633bddc65ff2'
const IMG_GIF1   = 'https://www.figma.com/api/mcp/asset/128b55b2-da1a-4406-b8b5-945b6dbe95d4'
const IMG_WEB005 = 'https://www.figma.com/api/mcp/asset/cd4d9d9d-a1d0-4fd7-9918-d8a263b0db48'
const IMG_WEB007 = 'https://www.figma.com/api/mcp/asset/1fc805f6-64bd-444c-b4af-6b618cfcb30e'
const IMG_WEB012 = 'https://www.figma.com/api/mcp/asset/e370a77b-e74e-4d99-a424-0e486b364dcf'
const IMG_WEB011 = 'https://www.figma.com/api/mcp/asset/432c479c-ec6f-49de-ad2c-60a6f90dfc09'
const IMG_WEB022 = 'https://www.figma.com/api/mcp/asset/46e71884-3d90-493e-b82f-4ba49603a056'
const IMG_GIF2   = 'https://www.figma.com/api/mcp/asset/cb540c54-d08f-4291-8ef0-1464e5116844'
const IMG_WEB016 = 'https://www.figma.com/api/mcp/asset/6115b668-e9e3-4969-817c-cbbe527d65e3'
const IMG_WEB017 = 'https://www.figma.com/api/mcp/asset/78e0910c-dffe-41da-bea4-72a6a790e061'
const IMG_WEB018 = 'https://www.figma.com/api/mcp/asset/253eea5c-4481-470b-a710-bcb823b4f2ab'
const IMG_WEB014 = 'https://www.figma.com/api/mcp/asset/9f768831-5d23-405f-9948-f2a48d9f1da2'
const IMG_WEB013 = 'https://www.figma.com/api/mcp/asset/9db8b950-f388-4620-8a50-8d72e474e6f0'
const IMG_WEB015 = 'https://www.figma.com/api/mcp/asset/9506da6a-6aef-4c30-a95a-bd0aa42180b6'
const IMG_WEB039 = 'https://www.figma.com/api/mcp/asset/b179ab40-ae44-41a2-9d81-6604759d28d8'
const IMG_WEB037 = 'https://www.figma.com/api/mcp/asset/c4ffec83-c4e6-411c-9a1d-e8f5c94be90b'
const IMG_WEB040 = 'https://www.figma.com/api/mcp/asset/dee231be-2674-45db-b56c-eb25ea80c0a8'
const IMG_WEB050 = 'https://www.figma.com/api/mcp/asset/e36b2445-7436-4366-bea3-e6097c5570f7'
const IMG_WEB054 = 'https://www.figma.com/api/mcp/asset/c8509396-56a9-4bae-9418-4470efc8c53c'
const IMG_WEB047 = 'https://www.figma.com/api/mcp/asset/f2f9186c-5e9c-43ca-a42d-56aa7a18bfcd'
const IMG_WEB048 = 'https://www.figma.com/api/mcp/asset/3deb62f8-4d97-4e98-8e13-3a4f2191ddb1'
const IMG_WEB055 = 'https://www.figma.com/api/mcp/asset/56f700d2-1054-457b-9582-8481e76fde59'

const CAROUSEL_1 = [
  'https://www.figma.com/api/mcp/asset/40a27c65-8184-46ac-a09d-22099dfe3f1c',
  'https://www.figma.com/api/mcp/asset/9e110396-f106-4df7-ae59-57b87f8dc667',
  'https://www.figma.com/api/mcp/asset/f8ee7084-fd58-44be-b59a-e19aa3eaa144',
  'https://www.figma.com/api/mcp/asset/09c8c1e6-211e-4175-96c0-58b61b86c5f4',
  'https://www.figma.com/api/mcp/asset/b7afc93d-9d8d-45fa-9b84-ad51f310b1f8',
  'https://www.figma.com/api/mcp/asset/d8bcf8a3-edf4-4ba3-822b-2c017a2f3fd6',
  'https://www.figma.com/api/mcp/asset/f59f1daf-032d-443f-879e-de41e8aac24c',
  'https://www.figma.com/api/mcp/asset/16c4caf4-4e03-4fdc-b935-8237e3a2a278',
  'https://www.figma.com/api/mcp/asset/3ca7d9e8-3755-4195-bbf8-3ee2ac5b0083',
  'https://www.figma.com/api/mcp/asset/baf98d55-8c38-41a6-b3dd-ee90a3587474',
]

const CAROUSEL_2 = [
  'https://www.figma.com/api/mcp/asset/b3739a44-e8ef-48fb-82bd-6c8bd586d4f0',
  'https://www.figma.com/api/mcp/asset/96342fa2-2387-49c0-af16-351faa04e9bb',
  'https://www.figma.com/api/mcp/asset/0700a4ac-c0c4-41d0-8516-2c5de350aa20',
  'https://www.figma.com/api/mcp/asset/22604f6b-1ae9-4353-a50f-8897d876a318',
  'https://www.figma.com/api/mcp/asset/d1aab912-3fc6-4a99-96ff-8fd6966eb52a',
  'https://www.figma.com/api/mcp/asset/23ebb734-ed57-43ec-a729-830e985b6905',
  'https://www.figma.com/api/mcp/asset/5cd9c8f0-89b4-481c-b11a-adc0aa119260',
  'https://www.figma.com/api/mcp/asset/40db325d-5760-4d4e-b4ee-5b9108710a93',
  'https://www.figma.com/api/mcp/asset/25bafe49-8035-4496-95d2-3dfe04841e3e',
  'https://www.figma.com/api/mcp/asset/ec82a107-e59b-4f4e-b58e-206f8d57c792',
  'https://www.figma.com/api/mcp/asset/1e1878a0-999d-4edc-9f91-fe8813de527c',
  'https://www.figma.com/api/mcp/asset/56f9b0a3-a223-4846-b442-215f23fc726a',
  'https://www.figma.com/api/mcp/asset/5ab22b9c-f40a-4bdc-802d-6ebc7b98033c',
  'https://www.figma.com/api/mcp/asset/83b6a000-2ab6-43bf-b4b5-978df8a04888',
  'https://www.figma.com/api/mcp/asset/71812a1f-1b96-43e2-93c1-49588eb07f51',
  'https://www.figma.com/api/mcp/asset/d249c063-3fae-4eee-9b1d-0a670d1ece1c',
]

// ---------------------------------------------------------------------------
// Carousel — CSS keyframe infinite scroll (same pattern across all projects)
// ---------------------------------------------------------------------------
function Carousel({ images, id }: { images: string[]; id: string }) {
  const doubled = [...images, ...images]
  const duration = images.length * 3.5
  return (
    <div style={{ width: '100%', height: CH, overflow: 'hidden' }}>
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes mal-c-${id} {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
      `}} />
      <div style={{
        display: 'flex',
        height: CH,
        width: 'max-content',
        animation: `mal-c-${id} ${duration}s linear infinite`,
      }}>
        {doubled.map((src, i) => (
          <img key={i} src={src} alt="" style={{ height: CH, width: 'auto', display: 'block', flexShrink: 0 }} />
        ))}
      </div>
    </div>
  )
}

// ---------------------------------------------------------------------------
// Shared content helpers
// ---------------------------------------------------------------------------
const HFONT = '"Helvetica Neue LT Std", "Helvetica Neue", Helvetica, Arial, sans-serif'

function TextBlock({ children }: { children: React.ReactNode }) {
  return <div className="mal-p" style={{ color: '#fff' }}>{children}</div>
}

function VideoPlaceholder({ label }: { label: string }) {
  return (
    <div style={{
      width: '100%', height: '100%',
      background: 'rgba(249,148,64,0.3)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
    }}>
      <p style={{
        fontFamily: "'Space Grotesk', sans-serif",
        fontWeight: 300, fontSize: '40px', color: '#fff',
        textAlign: 'center', whiteSpace: 'nowrap',
      }}>{label}</p>
    </div>
  )
}

export { meta } from './meta'

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------
export function Component() {
  return (
    <div style={{ width: '100%', position: 'relative', backgroundColor: '#0f0f0f' }} className="mal-container">
      <style dangerouslySetInnerHTML={{ __html: `
        .mal-container {
          --p-d: 16px; --p-m: 15px;
        }
        .mal-p {
          font-family: "Space Grotesk", sans-serif;
          font-weight: 300;
          font-size: var(--p-m);
          line-height: 1.5;
        }
        @media (min-width: 1024px) {
          .mal-p { font-size: var(--p-d); }
        }
        .mal-container .marquee-item {
          font-family: ${HFONT} !important;
          font-weight: 100 !important;
          text-transform: uppercase;
        }
      `}} />

      {/* 1. HERO ─────────────────────────────────────────────────────── */}
      <ParallaxSection id="mal-hero" style={{ minHeight: '90vh' }}>
        <ParallaxLayer
          layer={{ type: 'image', src: IMG_HERO, speed: 0.3, isHero: true }}
          position={{ top: HERO_TOP, left: '0', width: '100%', height: '90vh', zIndex: 1 }}
        />
      </ParallaxSection>

      {/* 2. INTRO: text right + web028 left + marquee-1 ─────────────── */}
      <ParallaxSection id="mal-intro" style={{ minHeight: '150vh' }}>
        {/* Left: tall portrait */}
        <ParallaxLayer
          layer={{ type: 'image', src: IMG_WEB028, speed: 0.3 }}
          position={{ top: '5vh', left: '8.33%', width: TW, height: '70vh', zIndex: 1 }}
        />
        {/* Right: intro text */}
        <ParallaxLayer
          layer={{ type: 'text', content: '', speed: 0 }}
          position={{ top: '8vh', left: '58.33%', width: TW, height: 'auto', zIndex: 2 }}
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
        {/* Sticky marquee */}
        <ParallaxLayer
          layer={{ type: 'marquee', content: 'Somos responsables de los mundos que creamos', speed: 0, multiplier: 24 }}
          position={{ left: '0', width: '100%', height: '56px', zIndex: 3 }}
        />
        {/* web009 center — visible below text */}
        <ParallaxLayer
          layer={{ type: 'image', src: IMG_WEB009, speed: 0.3 }}
          position={{ top: '85vh', left: '25%', width: '49.31%', height: '48vh', zIndex: 1 }}
        />
      </ParallaxSection>

      {/* 3. FULLWIDTH 1 ──────────────────────────────────────────────── */}
      <ParallaxSection id="mal-fw1" style={{ minHeight: '100vh' }}>
        <ParallaxLayer
          layer={{ type: 'image', src: IMG_FULL_1, speed: 0.3 }}
          position={{ top: '0', left: '0', width: '100%', height: '100vh', zIndex: 1 }}
        />
      </ParallaxSection>

      {/* 4. COLLAGE 1: web008 right + text2 left + web025 center ────── */}
      <ParallaxSection id="mal-collage1" style={{ minHeight: '180vh' }}>
        {/* web008 right small */}
        <ParallaxLayer
          layer={{ type: 'image', src: IMG_WEB008, speed: 0.3 }}
          position={{ top: '5vh', left: '62.5%', width: '24%', height: '52vh', zIndex: 1 }}
        />
        {/* Text 2 left */}
        <ParallaxLayer
          layer={{ type: 'text', content: '', speed: 0 }}
          position={{ top: '25vh', left: '20.83%', width: TW, height: 'auto', zIndex: 2 }}
        >
          <TextBlock>
            <p className="mal-p" style={{ marginBottom: '1.5rem' }}>
              La obra de Constanza insistirá entonces en la apelación continua a derribar las barreras racionales que impiden fluir nuestra creatividad.
            </p>
            <p className="mal-p">
              Un reactor nuclear hiperrealista permite acercar nuestro cuerpo, y con él nuestra sensibilidad a una distancia de la fuente radioactiva prohibida hasta hoy. Los horrores de su existencia son velozmente atenuados por un bosque de acrílico, altar en homenaje a nuestros orígenes. En el abismo entre estas dos escenas pueden brotar cuestiones acerca de la validez de nuestro modo de vivir.
            </p>
          </TextBlock>
        </ParallaxLayer>
        {/* web025 center wide */}
        <ParallaxLayer
          layer={{ type: 'image', src: IMG_WEB025, speed: 0.3 }}
          position={{ top: '85vh', left: '16.67%', width: '66.25%', height: '55vh', zIndex: 1 }}
        />
        {/* GIF 1 left */}
        <ParallaxLayer
          layer={{ type: 'image', src: IMG_GIF1, speed: 0 }}
          position={{ top: '145vh', left: '4.17%', width: TW, height: '28vh', zIndex: 2 }}
        />
      </ParallaxSection>

      {/* 5. TEXT 3 + PHOTOS CLUSTER ──────────────────────────────────── */}
      <ParallaxSection id="mal-cluster1" style={{ minHeight: '160vh' }}>
        {/* Text 3 right */}
        <ParallaxLayer
          layer={{ type: 'text', content: '', speed: 0 }}
          position={{ top: '5vh', left: '58.33%', width: TW, height: 'auto', zIndex: 2 }}
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
        {/* web012 left small */}
        <ParallaxLayer
          layer={{ type: 'image', src: IMG_WEB012, speed: 0.3 }}
          position={{ top: '5vh', left: '4.17%', width: '24%', height: '52vh', zIndex: 1 }}
        />
        {/* Sticky marquee 2 */}
        <ParallaxLayer
          layer={{ type: 'marquee', content: 'DERRIBAR LAS BARRERAS RACIONALES QUE impiden fluir nuestra creatividad.', speed: 0, multiplier: 24 }}
          position={{ left: '0', width: '100%', height: '56px', zIndex: 3 }}
        />
        {/* web011 center small */}
        <ParallaxLayer
          layer={{ type: 'image', src: IMG_WEB011, speed: 0.3 }}
          position={{ top: '55vh', left: '38%', width: '24%', height: '52vh', zIndex: 1 }}
        />
        {/* web007 right */}
        <ParallaxLayer
          layer={{ type: 'image', src: IMG_WEB007, speed: 0.3 }}
          position={{ top: '45vh', left: '70.83%', width: '24%', height: '52vh', zIndex: 1 }}
        />
        {/* web005 left tall */}
        <ParallaxLayer
          layer={{ type: 'image', src: IMG_WEB005, speed: 0.3 }}
          position={{ top: '95vh', left: '8.33%', width: TW, height: '55vh', zIndex: 1 }}
        />
      </ParallaxSection>

      {/* 6. WEB022 + VIDEO 1 ─────────────────────────────────────────── */}
      <ParallaxSection id="mal-web022" style={{ minHeight: '160vh' }}>
        {/* web022 center — masked in Figma, regular image here */}
        <ParallaxLayer
          layer={{ type: 'image', src: IMG_WEB022, speed: 0.3 }}
          position={{ top: '5vh', left: '33.33%', width: TW, height: '62vh', zIndex: 1 }}
        />
        {/* Video 1 */}
        <ParallaxLayer
          layer={{ type: 'text', content: '', speed: 0 }}
          position={{ top: '75vh', left: '0', width: '100%', height: '70vh', zIndex: 2 }}
        >
          <VideoPlaceholder label="VIDEOARTE" />
        </ParallaxLayer>
      </ParallaxSection>

      {/* 7. GIF 2 + MARQUEE 3 ────────────────────────────────────────── */}
      <ParallaxSection id="mal-gif2" style={{ minHeight: '110vh' }}>
        {/* GIF 2 center wide */}
        <ParallaxLayer
          layer={{ type: 'image', src: IMG_GIF2, speed: 0.3 }}
          position={{ top: '10vh', left: '16.67%', width: '66.25%', height: '55vh', zIndex: 1 }}
        />
        {/* Sticky marquee 3 */}
        <ParallaxLayer
          layer={{ type: 'marquee', content: '¿cómo seguir habitando el planeta?', speed: 0, multiplier: 20 }}
          position={{ left: '0', width: '100%', height: '56px', zIndex: 3 }}
        />
      </ParallaxSection>

      {/* 8. TEXT 4 + PHOTOS ──────────────────────────────────────────── */}
      <ParallaxSection id="mal-text4" style={{ minHeight: '160vh' }}>
        {/* Text 4 right */}
        <ParallaxLayer
          layer={{ type: 'text', content: '', speed: 0 }}
          position={{ top: '5vh', left: '58.33%', width: TW, height: 'auto', zIndex: 2 }}
        >
          <TextBlock>
            <p className="mal-p">
              Numerosas cuestiones sobre cómo seguir habitando el planeta quedan abiertas directamente a nuestra sensibilidad sin mediación de palabras. Requiere, sin duda, de una integración de nuestro sentir y pensar. Ciudadana del siglo XXI, Constanza Schwartz, impregna sus raíces en la ambigüedad que nuestra cultura manifiesta entre lo orgánico y lo sintético, la literatura y las computadoras y por qué no, las magníficas y aterradoras creaciones de la inteligencia artificial.
            </p>
          </TextBlock>
        </ParallaxLayer>
        {/* web016 center */}
        <ParallaxLayer
          layer={{ type: 'image', src: IMG_WEB016, speed: 0.3 }}
          position={{ top: '5vh', left: '29.17%', width: '24%', height: '52vh', zIndex: 1 }}
        />
        {/* web017 + web018 pair */}
        <ParallaxLayer
          layer={{ type: 'image', src: IMG_WEB017, speed: 0.3 }}
          position={{ top: '70vh', left: '50%', width: '20.42%', height: '48vh', zIndex: 1 }}
        />
        <ParallaxLayer
          layer={{ type: 'image', src: IMG_WEB018, speed: 0.3 }}
          position={{ top: '70vh', left: '71%', width: '20.42%', height: '48vh', zIndex: 1 }}
        />
      </ParallaxSection>

      {/* 9. FULLWIDTH 2 ──────────────────────────────────────────────── */}
      <ParallaxSection id="mal-fw2" style={{ minHeight: '100vh' }}>
        <ParallaxLayer
          layer={{ type: 'image', src: IMG_FULL_2, speed: 0.3 }}
          position={{ top: '0', left: '0', width: '100%', height: '100vh', zIndex: 1 }}
        />
      </ParallaxSection>

      {/* 10. COLLAGE 2: web014 + web013 + web015 ────────────────────── */}
      <ParallaxSection id="mal-collage2" style={{ minHeight: '130vh' }}>
        {/* web014 left */}
        <ParallaxLayer
          layer={{ type: 'image', src: IMG_WEB014, speed: 0.3 }}
          position={{ top: '5vh', left: '8.33%', width: '24%', height: '52vh', zIndex: 1 }}
        />
        {/* web013 center */}
        <ParallaxLayer
          layer={{ type: 'image', src: IMG_WEB013, speed: 0.3 }}
          position={{ top: '40vh', left: '29.17%', width: TW, height: '32vh', zIndex: 2 }}
        />
        {/* web015 right */}
        <ParallaxLayer
          layer={{ type: 'image', src: IMG_WEB015, speed: 0.3 }}
          position={{ top: '20vh', left: '50%', width: '40.83%', height: '42vh', zIndex: 1 }}
        />
      </ParallaxSection>

      {/* 11. THREE COLUMNS ───────────────────────────────────────────── */}
      <ParallaxSection id="mal-threecol" style={{ minHeight: '80vh' }}>
        <ParallaxLayer
          layer={{ type: 'image', src: IMG_WEB040, speed: 0.3 }}
          position={{ top: '0', left: '0', width: '33.33%', height: '75vh', zIndex: 1 }}
        />
        <ParallaxLayer
          layer={{ type: 'image', src: IMG_WEB037, speed: 0.3 }}
          position={{ top: '0', left: '33.33%', width: '33.33%', height: '75vh', zIndex: 1 }}
        />
        <ParallaxLayer
          layer={{ type: 'image', src: IMG_WEB039, speed: 0.3 }}
          position={{ top: '0', left: '66.67%', width: '33.33%', height: '75vh', zIndex: 1 }}
        />
      </ParallaxSection>

      {/* 12. WEB050 + TEXT 5 + WEB054 + MARQUEE 4 ───────────────────── */}
      <ParallaxSection id="mal-text5" style={{ minHeight: '170vh' }}>
        {/* web050 right tall */}
        <ParallaxLayer
          layer={{ type: 'image', src: IMG_WEB050, speed: 0.3 }}
          position={{ top: '5vh', left: '58.33%', width: TW, height: '65vh', zIndex: 1 }}
        />
        {/* Text 5 left */}
        <ParallaxLayer
          layer={{ type: 'text', content: '', speed: 0 }}
          position={{ top: '25vh', left: '10.71%', width: TW, height: 'auto', zIndex: 2 }}
        >
          <TextBlock>
            <p className="mal-p">
              De esas raíces y las tensiones de nuestra vida cotidiana, nuestra cultura sumerge nuestra vida diaria en el triunfo de la ciencia y la técnica excepcionalmente interrumpidas por el verde de algunas plantitas traviesas que asoman en un balcón.
            </p>
          </TextBlock>
        </ParallaxLayer>
        {/* web054 center */}
        <ParallaxLayer
          layer={{ type: 'image', src: IMG_WEB054, speed: 0.3 }}
          position={{ top: '75vh', left: '37.5%', width: TW, height: '32vh', zIndex: 2 }}
        />
        {/* Sticky marquee 4 */}
        <ParallaxLayer
          layer={{ type: 'marquee', content: 'nuestra cultura sumerge nuestra vida diaria en el triunfo de la ciencia y la técnica excepcionalmente interrumpidas por el verde', speed: 0, multiplier: 24 }}
          position={{ left: '0', width: '100%', height: '56px', zIndex: 3 }}
        />
        {/* Video 2 */}
        <ParallaxLayer
          layer={{ type: 'text', content: '', speed: 0 }}
          position={{ top: '115vh', left: '0', width: '100%', height: '50vh', zIndex: 2 }}
        >
          <VideoPlaceholder label="VIDEO MAKING OFF" />
        </ParallaxLayer>
      </ParallaxSection>

      {/* 13. WEB047 + CAROUSEL 1 ─────────────────────────────────────── */}
      <ParallaxSection id="mal-carousel1" style={{ minHeight: '100vh' }}>
        {/* web047 wide left */}
        <ParallaxLayer
          layer={{ type: 'image', src: IMG_WEB047, speed: 0.3 }}
          position={{ top: '5vh', left: '7.64%', width: '57.71%', height: '55vh', zIndex: 1 }}
        />
        {/* Carousel 1 */}
        <ParallaxLayer
          layer={{ type: 'text', content: '', speed: 0 }}
          position={{ top: '68vh', left: '0', width: '100%', height: CH, zIndex: 2 }}
        >
          <Carousel images={CAROUSEL_1} id="c1" />
        </ParallaxLayer>
      </ParallaxSection>

      {/* 14. TEXT 6 + PHOTOS PAIR ────────────────────────────────────── */}
      <ParallaxSection id="mal-text6" style={{ minHeight: '130vh' }}>
        {/* Text 6 right */}
        <ParallaxLayer
          layer={{ type: 'text', content: '', speed: 0 }}
          position={{ top: '5vh', left: '58.33%', width: TW, height: 'auto', zIndex: 2 }}
        >
          <TextBlock>
            <p className="mal-p">
              La ciencia y la técnica han triunfado hasta participar de la construcción completa de los paisajes de nuestras ciudades. "Más allá del infinito" es una alerta cruda e implacable que subraya los aspectos amenazantes de esta victoria.
            </p>
          </TextBlock>
        </ParallaxLayer>
        {/* web048 wide */}
        <ParallaxLayer
          layer={{ type: 'image', src: IMG_WEB048, speed: 0.3 }}
          position={{ top: '30vh', left: '25%', width: '44.77%', height: '45vh', zIndex: 1 }}
        />
        {/* web055 right small */}
        <ParallaxLayer
          layer={{ type: 'image', src: IMG_WEB055, speed: 0.3 }}
          position={{ top: '30vh', left: '70.83%', width: '19.93%', height: '45vh', zIndex: 1 }}
        />
        {/* Text 7 left */}
        <ParallaxLayer
          layer={{ type: 'text', content: '', speed: 0 }}
          position={{ top: '80vh', left: '20.83%', width: TW, height: 'auto', zIndex: 2 }}
        >
          <TextBlock>
            <p className="mal-p">
              La vibración de esta obra persiste en nuestros sentidos, nos impulsa a buscar nuevas respuestas que tal vez están asociadas a las notas de nostalgia distribuidas con inclemencia en diversos rincones de la muestra. Nuestros afectos y la ternura que suele acompañar a la nostalgia serán solo una parte de la respuesta emocional a esta apelación al amor y la cordura.
            </p>
          </TextBlock>
        </ParallaxLayer>
      </ParallaxSection>

      {/* 15. FULLWIDTH 3 ─────────────────────────────────────────────── */}
      <ParallaxSection id="mal-fw3" style={{ minHeight: '100vh' }}>
        <ParallaxLayer
          layer={{ type: 'image', src: IMG_FULL_3, speed: 0.3 }}
          position={{ top: '0', left: '0', width: '100%', height: '100vh', zIndex: 1 }}
        />
      </ParallaxSection>

      {/* 16. CAROUSEL 2 + CLOSING QUOTE ─────────────────────────────── */}
      <ParallaxSection id="mal-carousel2" style={{ minHeight: '80vh' }} overflowHidden={false}>
        <ParallaxLayer
          layer={{ type: 'text', content: '', speed: 0 }}
          position={{ top: '0', left: '0', width: '100%', height: CH, zIndex: 1 }}
        >
          <Carousel images={CAROUSEL_2} id="c2" />
        </ParallaxLayer>
        {/* Closing quote */}
        <ParallaxLayer
          layer={{ type: 'text', content: '', speed: 0 }}
          position={{ top: '40vh', left: '0', width: '100%', height: 'auto', zIndex: 2 }}
        >
          <div style={{
            padding: '0 clamp(20px, 4.65%, 67px)',
            maxWidth: '1440px',
            margin: '0 auto',
          }}>
            <p style={{
              fontFamily: HFONT,
              fontWeight: 100,
              fontSize: 'clamp(28px, 3.89vw, 56px)',
              lineHeight: 1,
              color: '#fff',
              textTransform: 'uppercase',
              letterSpacing: 0,
            }}>
              Si tienes apego a tu cordura, no entres.
            </p>
          </div>
        </ParallaxLayer>
      </ParallaxSection>

    </div>
  )
}
