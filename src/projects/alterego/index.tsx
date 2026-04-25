'use client'

import { ParallaxSection } from '@/src/components/parallax/ParallaxSection'
import { ParallaxLayer } from '@/src/components/parallax/ParallaxLayer'
import { VideoPlayer } from '@/src/components/media/VideoPlayer'
import { cldImg, cldVideo } from '@/src/utils/cloudinary'
import { ALT } from './assets'
import { HERO_TOP } from '../shared'

export { meta } from './meta'
export { gallery } from './gallery'

const CREDITS = [
  { role: 'Dirección', name: 'Jero Pokle @jeropokle' },
  { role: 'Dirección de Producción', name: 'Mel Flood meelflood' },
  { role: 'Producción General', name: 'Joaquín Toledo Torres @joacotoledotorres' },
  { role: 'Dirección de Fotografía', name: 'Nahuel Varela @nahue.var' },
  { role: 'Dirección de Arte y Efectos Lumínicos', name: 'Constanza Schwartz @constanza.schwartz' },
  { role: 'Estilismo & Vestuario', name: 'Sophie Etchegoyen @sophietchegoyen' },
  { role: 'Make Up & Pelo', name: 'María José Baez @majobaezd' },
  { role: 'Edición', name: 'Franco Farias @franfa_' },
  { role: '2do de Cámara', name: 'Daniel Hernández @_danohernandez' },
  { role: 'Gaffer', name: 'Mauro Tedeschi @mauret_tedeschi' },
  { role: 'Asistente de Arte', name: 'Matilda Mayer @matumayer_' },
  { role: 'Asistente de Vestuario', name: 'Luna Goldin @lunagoldin' },
  { role: 'Diseño de Visuales', name: 'Manuel Blanco @__manublanco' },
  { role: 'Edición & VFX de Visuales', name: 'Franco Farias @franfa_' },
  { role: 'Foto Fija', name: 'Juan Larrazabal @juanlarrazabal.ph' },
  { role: 'Mapping', name: 'Mauro Parissenti @mauroparissenti & EMEPE Audiovisuales @emepeaudiovisuales' },
  { role: 'Diseño Gráfico', name: 'Manuel Blanco @__manublanco & RGII @rg.2nd' },
  { role: 'Comercial', name: 'Franco Panaro @fgpanaro' },
  { role: 'Artistas', name: 'Justo Fernández Madero @justo.fm / Lucas Grasso @lucobyluco / Fernando Laprida @byferla / Francisco Nicholson @franjnicholson' },
]

function VideoSection({ id, src }: { id: string; src: string }) {
  return (
    <div style={{
      width: '100%',
      height: '100%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: '#000',
    }}>
      <VideoPlayer
        id={id}
        src={src}
        autoPlay
        loop={false}
        style={{ width: '100%', aspectRatio: '21/9', maxHeight: '100%' }}
      />
    </div>
  )
}

export function Component() {
  return (
    <div style={{ width: '100%', position: 'relative' }}>

      {/* 1. HERO — portada + marquee */}
      <ParallaxSection id="hero" overflowHidden={false} style={{ minHeight: '115vh' }}>
        <ParallaxLayer
          sectionId="hero"
          layerIndex={0}
          layer={{ type: 'image', src: cldImg(ALT.portada, 'w_2000'), speed: 0.8, isHero: true }}
          position={{ top: HERO_TOP, left: '4.25%', width: '91.5%', height: '490px', zIndex: 1 }}
        />
        <ParallaxLayer
          sectionId="hero"
          layerIndex={1}
          layer={{ type: 'marquee', content: 'DIRECCIÓN DE ARTE Y EFECTOS LUMÍNICOS.', speed: 0, multiplier: 22 }}
          position={{ top: '86vh', left: '0', width: '100%', height: '72px', zIndex: 2 }}
        />
      </ParallaxSection>

      {/* 2. WIDE LANDSCAPE — azstill18 · left 16.67%, width 66.25%, height 503px */}
      <ParallaxSection id="wide-1" style={{ minHeight: '80vh' }}>
        <ParallaxLayer
          sectionId="wide-1"
          layer={{ type: 'image', src: cldImg(ALT[1], 'w_2000'), speed: 0.25 }}
          position={{ top: '5vh', left: '16.67%', width: '66.25%', height: '503px', zIndex: 1 }}
        />
      </ParallaxSection>

      {/* 3. FULL-WIDTH VIDEO 1 — 04-azclip1 */}
      <ParallaxSection id="fw-video-1" style={{ minHeight: '80vh', background: '#000' }}>
        <VideoSection id="fw-video-1" src={cldVideo(ALT.v1)} />
      </ParallaxSection>

      {/* 4. THREE STACKED STILLS — azstill4 / 09-azstill2 / azstill19 at 33.33% */}
      <ParallaxSection id="stacked-stills" style={{ minHeight: '150vh' }}>
        <ParallaxLayer
          sectionId="stacked-stills"
          layerIndex={0}
          layer={{ type: 'image', src: cldImg(ALT[2], 'w_1200'), speed: 0.2 }}
          position={{ top: '5vh', left: '33.33%', width: '32.3%', height: '245px', zIndex: 1 }}
        />
        <ParallaxLayer
          sectionId="stacked-stills"
          layerIndex={1}
          layer={{ type: 'image', src: cldImg(ALT[3], 'w_1200'), speed: 0.35 }}
          position={{ top: '38vh', left: '33.33%', width: '32.3%', height: '245px', zIndex: 1 }}
        />
        <ParallaxLayer
          sectionId="stacked-stills"
          layerIndex={2}
          layer={{ type: 'image', src: cldImg(ALT[4], 'w_1200'), speed: 0.5 }}
          position={{ top: '71vh', left: '33.33%', width: '32.3%', height: '245px', zIndex: 1 }}
        />
      </ParallaxSection>

      {/* 5. PHOTO PAIR — PHOTO-50-34 at 45.83%, PHOTO-53-45 at 16.67% */}
      <ParallaxSection id="photo-pair" style={{ minHeight: '80vh' }}>
        <ParallaxLayer
          sectionId="photo-pair"
          layerIndex={0}
          layer={{ type: 'image', src: cldImg(ALT[5], 'w_1200'), speed: 0.3 }}
          position={{ top: '5vh', left: '45.83%', width: '32.3%', height: '246px', zIndex: 2 }}
        />
        <ParallaxLayer
          sectionId="photo-pair"
          layerIndex={1}
          layer={{ type: 'image', src: cldImg(ALT[6], 'w_1200'), speed: 0.45 }}
          position={{ top: '28vh', left: '16.67%', width: '32.3%', height: '246px', zIndex: 1 }}
        />
      </ParallaxSection>

      {/* 6. PORTRAIT — St1-07 centered, 466px × 828px */}
      <ParallaxSection id="portrait-st107" style={{ minHeight: '130vh' }}>
        <ParallaxLayer
          sectionId="portrait-st107"
          layer={{ type: 'image', src: cldImg(ALT[7], 'w_900'), speed: 0.25 }}
          position={{ top: '5vh', left: 'calc(50% - 233px)', width: '466px', height: '828px', zIndex: 1 }}
        />
      </ParallaxSection>

      {/* 7. FULL-WIDTH VIDEO 2 — ytclip4 */}
      <ParallaxSection id="fw-video-2" style={{ minHeight: '80vh', background: '#000' }}>
        <VideoSection id="fw-video-2" src={cldVideo(ALT.v2)} />
      </ParallaxSection>

      {/* 8. FULL-WIDTH VIDEO 3 — pdsclip1 (St1-06 pair skipped: no Cloudinary assets) */}
      <ParallaxSection id="fw-video-3" style={{ minHeight: '80vh', background: '#000' }}>
        <VideoSection id="fw-video-3" src={cldVideo(ALT.v3)} />
      </ParallaxSection>

      {/* 9. WIDE CENTERED VIDEO — ytclip1, 66.25% wide */}
      <ParallaxSection id="wide-ytclip1" style={{ minHeight: '70vh', background: '#000' }}>
        <div style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#000',
        }}>
          <VideoPlayer
            id="ytclip1"
            src={cldVideo(ALT.v4)}
            autoPlay
            loop={false}
            style={{ width: '66.25%', aspectRatio: '19/10' }}
          />
        </div>
      </ParallaxSection>

      {/* 10. INV STILL — invstill11 at 8.33%, precedes clipinv3 video */}
      <ParallaxSection id="pre-inv" style={{ minHeight: '50vh' }}>
        <ParallaxLayer
          sectionId="pre-inv"
          layer={{ type: 'image', src: cldImg(ALT[11], 'w_1200'), speed: 0.3 }}
          position={{ top: '5vh', left: '8.33%', width: '32.3%', height: '246px', zIndex: 1 }}
        />
      </ParallaxSection>

      {/* 11. FULL-WIDTH VIDEO 4 — clipinv3 */}
      <ParallaxSection id="fw-video-4" style={{ minHeight: '80vh', background: '#000' }}>
        <VideoSection id="fw-video-4" src={cldVideo(ALT.v5)} />
      </ParallaxSection>

      {/* 12. INV SCATTER — 10inv1 right, invstill4 center, invstill12 right */}
      <ParallaxSection id="inv-scatter" style={{ minHeight: '180vh' }}>
        {/* 10 inv 1 — right 62.5% */}
        <ParallaxLayer
          sectionId="inv-scatter"
          layerIndex={0}
          layer={{ type: 'image', src: cldImg(ALT[13], 'w_1200'), speed: 0.4 }}
          position={{ top: '5vh', left: '62.5%', width: '32.3%', height: '245px', zIndex: 2 }}
        />
        {/* invstill4 — centered */}
        <ParallaxLayer
          sectionId="inv-scatter"
          layerIndex={1}
          layer={{ type: 'image', src: cldImg(ALT[14], 'w_1200'), speed: 0.3 }}
          position={{ top: '35vh', left: 'calc(50% - 233px)', width: '32.3%', height: '245px', zIndex: 1 }}
        />
        {/* invstill12 — right 58.33% */}
        <ParallaxLayer
          sectionId="inv-scatter"
          layerIndex={2}
          layer={{ type: 'image', src: cldImg(ALT[12], 'w_1200'), speed: 0.5 }}
          position={{ top: '65vh', left: '58.33%', width: '32.3%', height: '246px', zIndex: 2 }}
        />
      </ParallaxSection>

      {/* 13. PORTRAIT — St1-02 at 33.33%, 466px × 828px */}
      <ParallaxSection id="portrait-st102" style={{ minHeight: '120vh' }}>
        <ParallaxLayer
          sectionId="portrait-st102"
          layer={{ type: 'image', src: cldImg(ALT[15], 'w_900'), speed: 0.25 }}
          position={{ top: '5vh', left: '33.33%', width: '32.3%', height: '828px', zIndex: 1 }}
        />
      </ParallaxSection>

      {/* 14. FULL-WIDTH VIDEO 5 — azclip2 (St1-04 skipped: no Cloudinary asset) */}
      <ParallaxSection id="fw-video-5" style={{ minHeight: '80vh', background: '#000' }}>
        <VideoSection id="fw-video-5" src={cldVideo(ALT.v6)} />
      </ParallaxSection>

      {/* 15. PORTRAIT — St1-03 at 33.33%, 466px × 828px */}
      <ParallaxSection id="portrait-st103" style={{ minHeight: '120vh' }}>
        <ParallaxLayer
          sectionId="portrait-st103"
          layer={{ type: 'image', src: cldImg(ALT[16], 'w_900'), speed: 0.25 }}
          position={{ top: '5vh', left: '33.33%', width: '32.3%', height: '828px', zIndex: 1 }}
        />
      </ParallaxSection>

      {/* 16. WIDE LANDSCAPE — azstill12 · left 16.67%, width 66.25%, height 503px */}
      <ParallaxSection id="wide-az12" style={{ minHeight: '80vh' }}>
        <ParallaxLayer
          sectionId="wide-az12"
          layer={{ type: 'image', src: cldImg(ALT[10], 'w_2000'), speed: 0.25 }}
          position={{ top: '5vh', left: '16.67%', width: '66.25%', height: '503px', zIndex: 1 }}
        />
      </ParallaxSection>

      {/* 17. CREDITS */}
      <ParallaxSection id="credits" style={{ minHeight: '60vh' }}>
        <ParallaxLayer
          sectionId="credits"
          layerIndex={0}
          layer={{ type: 'credits', speed: 0, credits: CREDITS }}
          position={{ top: '10vh', left: '0', width: '100%', height: 'auto', zIndex: 1 }}
        />
      </ParallaxSection>

    </div>
  )
}
