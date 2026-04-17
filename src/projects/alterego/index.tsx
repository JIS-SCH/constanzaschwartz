'use client'

import { ParallaxSection } from '@/src/components/parallax/ParallaxSection'
import { ParallaxLayer } from '@/src/components/parallax/ParallaxLayer'
import { VideoPlayer } from '@/src/components/media/VideoPlayer'
import { cldImg, cldVideo } from '@/src/utils/cloudinary'
import { ALT } from './assets'

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

export function Component() {
  return (
    <div style={{ width: '100%', position: 'relative' }}>

      {/* 1. HERO ─── image5 + marquee sticky */}
      <ParallaxSection
        id="hero"
        overflowHidden={false}
        style={{ minHeight: '115vh' }}
      >
        <ParallaxLayer
          sectionId="hero"
          layerIndex={0}
          layer={{ type: 'image', src: '/image5.jpg', speed: 0.8, isHero: true }}
          position={{ top: '120px', left: '4.25%', width: '91.5%', height: '490px', zIndex: 1 }}
        />
        <ParallaxLayer
          sectionId="hero"
          layerIndex={1}
          layer={{ type: 'marquee', content: 'DIRECCIÓN DE ARTE Y EFECTOS LUMÍNICOS.', speed: 0, multiplier: 22 }}
          position={{ top: '86vh', left: '0', width: '100%', height: '72px', zIndex: 2 }}
        />
      </ParallaxSection>

      {/* 2. CONE OF LIGHT ─── centered medium */}
      <ParallaxSection id="cone-light" style={{ minHeight: '80vh' }}>
        <ParallaxLayer
          sectionId="cone-light"
          layer={{ type: 'image', src: cldImg(ALT[1], 'w_1400'), speed: 0.3 }}
          position={{ top: '5vh', left: 'calc(50% - 350px)', width: '700px', height: '369px', zIndex: 1 }}
        />
      </ParallaxSection>

      {/* 3. STACKED STILLS ─── film-strip column centered */}
      <ParallaxSection id="stacked-stills" style={{ minHeight: '200vh' }}>
        <ParallaxLayer
          sectionId="stacked-stills"
          layerIndex={0}
          layer={{ type: 'image', src: cldImg(ALT[2], 'w_1200'), speed: 0.2 }}
          position={{ top: '5vh', left: 'calc(50% - 300px)', width: '600px', height: '316px', zIndex: 1 }}
        />
        <ParallaxLayer
          sectionId="stacked-stills"
          layerIndex={1}
          layer={{ type: 'image', src: cldImg(ALT[3], 'w_1200'), speed: 0.35 }}
          position={{ top: '45vh', left: 'calc(50% - 300px)', width: '600px', height: '316px', zIndex: 1 }}
        />
        <ParallaxLayer
          sectionId="stacked-stills"
          layerIndex={2}
          layer={{ type: 'image', src: cldImg(ALT[4], 'w_1200'), speed: 0.5 }}
          position={{ top: '88vh', left: 'calc(50% - 300px)', width: '600px', height: '316px', zIndex: 1 }}
        />
      </ParallaxSection>

      {/* 4. FULL-WIDTH VIDEO 1 */}
      <ParallaxSection id="fw-video-1" style={{ minHeight: '80vh' }}>
        <div style={{
          width: '100%', height: '100%', display: 'flex',
          alignItems: 'center', justifyContent: 'center', background: '#000',
        }}>
          <VideoPlayer
            id="fw-video-1"
            src={cldVideo(ALT.v1)}
            autoPlay
            loop={false}
            style={{ width: '100%', aspectRatio: '21/9', maxHeight: '100%' }}
          />
        </div>
      </ParallaxSection>

      {/* 5. OFFSET PAIR ─── two landscape stills */}
      <ParallaxSection id="offset-pair" style={{ minHeight: '100vh' }}>
        <ParallaxLayer
          sectionId="offset-pair"
          layerIndex={0}
          layer={{ type: 'image', src: cldImg(ALT[5], 'w_1400'), speed: 0.3 }}
          position={{ top: '5vh', left: '4.25%', width: '710px', height: '374px', zIndex: 1 }}
        />
        <ParallaxLayer
          sectionId="offset-pair"
          layerIndex={1}
          layer={{ type: 'image', src: cldImg(ALT[6], 'w_1400'), speed: 0.5 }}
          position={{ top: '40vh', left: '45.83%', width: '588px', height: '310px', zIndex: 2 }}
        />
      </ParallaxSection>

      {/* 6. PORTRAIT FEATURE ─── orange portrait centered */}
      <ParallaxSection id="portrait-feature" style={{ minHeight: '130vh' }}>
        <ParallaxLayer
          sectionId="portrait-feature"
          layer={{ type: 'image', src: cldImg(ALT[7], 'w_900'), speed: 0.25 }}
          position={{ top: '5vh', left: 'calc(50% - 233px)', width: '466px', height: '828px', zIndex: 1 }}
        />
      </ParallaxSection>

      {/* 7. BAND DUO ─── purple landscapes */}
      <ParallaxSection id="band-duo" style={{ minHeight: '110vh' }}>
        <ParallaxLayer
          sectionId="band-duo"
          layerIndex={0}
          layer={{ type: 'image', src: cldImg(ALT[8], 'w_1600'), speed: 0.3 }}
          position={{ top: '5vh', left: '4.25%', width: '710px', height: '444px', zIndex: 1 }}
        />
        <ParallaxLayer
          sectionId="band-duo"
          layerIndex={1}
          layer={{ type: 'image', src: cldImg(ALT[9], 'w_1600'), speed: 0.5 }}
          position={{ top: '45vh', left: '48%', width: '588px', height: '368px', zIndex: 2 }}
        />
      </ParallaxSection>

      {/* 8. NEON FEATURE ─── red/pink close-up full width */}
      <ParallaxSection id="neon-feature" style={{ minHeight: '100vh' }}>
        <ParallaxLayer
          sectionId="neon-feature"
          layer={{ type: 'image', src: cldImg(ALT[10], 'w_2000'), speed: 0.25 }}
          position={{ top: '5vh', left: '4.25%', width: '91.5%', height: '490px', zIndex: 1 }}
        />
      </ParallaxSection>

      {/* 9. NEON SCATTER ─── blue/orange quartet */}
      <ParallaxSection id="neon-scatter" style={{ minHeight: '200vh' }}>
        <ParallaxLayer
          sectionId="neon-scatter"
          layerIndex={0}
          layer={{ type: 'image', src: cldImg(ALT[11], 'w_1400'), speed: 0.25 }}
          position={{ top: '5vh', left: '4.25%', width: '710px', height: '374px', zIndex: 1 }}
        />
        <ParallaxLayer
          sectionId="neon-scatter"
          layerIndex={1}
          layer={{ type: 'image', src: cldImg(ALT[13], 'w_1400'), speed: 0.45 }}
          position={{ top: '50vh', left: '54.17%', width: '588px', height: '310px', zIndex: 2 }}
        />
        <ParallaxLayer
          sectionId="neon-scatter"
          layerIndex={2}
          layer={{ type: 'image', src: cldImg(ALT[12], 'w_1400'), speed: 0.35 }}
          position={{ top: '110vh', left: '8.33%', width: '467px', height: '246px', zIndex: 1 }}
        />
        <ParallaxLayer
          sectionId="neon-scatter"
          layerIndex={3}
          layer={{ type: 'image', src: cldImg(ALT[14], 'w_1400'), speed: 0.55 }}
          position={{ top: '140vh', left: '54.17%', width: '588px', height: '310px', zIndex: 2 }}
        />
      </ParallaxSection>

      {/* 10. FULL-WIDTH VIDEO 2 */}
      <ParallaxSection id="fw-video-2" style={{ minHeight: '80vh' }}>
        <div style={{
          width: '100%', height: '100%', display: 'flex',
          alignItems: 'center', justifyContent: 'center', background: '#000',
        }}>
          <VideoPlayer
            id="fw-video-2"
            src={cldVideo(ALT.v5)}
            autoPlay
            loop={false}
            style={{ width: '100%', aspectRatio: '21/9', maxHeight: '100%' }}
          />
        </div>
      </ParallaxSection>

      {/* 11. STACKED PORTRAITS ─── asset 16 (3 panels film strip) */}
      <ParallaxSection id="stacked-portraits" style={{ minHeight: '120vh' }}>
        <ParallaxLayer
          sectionId="stacked-portraits"
          layer={{ type: 'image', src: cldImg(ALT[16], 'w_900'), speed: 0.25 }}
          position={{ top: '5vh', left: 'calc(50% - 270px)', width: '540px', height: '960px', zIndex: 1 }}
        />
      </ParallaxSection>

      {/* 12. CREDITS ─── band faces photo + credits overlay */}
      <ParallaxSection id="credits" style={{ minHeight: '100vh' }}>
        <ParallaxLayer
          sectionId="credits"
          layerIndex={0}
          layer={{ type: 'image', src: cldImg(ALT[15], 'w_1800'), speed: 0.1 }}
          position={{ top: '0', left: '0', width: '100%', height: '75vh', zIndex: 1 }}
        />
        <ParallaxLayer
          sectionId="credits"
          layerIndex={1}
          layer={{ type: 'credits', speed: 0, credits: CREDITS }}
          position={{ top: '77vh', left: '0', width: '100%', height: 'auto', zIndex: 2 }}
        />
      </ParallaxSection>

    </div>
  )
}
