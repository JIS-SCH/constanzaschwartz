'use client'

import { ParallaxSection } from '@/src/components/parallax/ParallaxSection'
import { ParallaxLayer } from '@/src/components/parallax/ParallaxLayer'
import { VideoPlayer } from '@/src/components/media/VideoPlayer'
import { cldImg, cldVideo } from '@/src/utils/cloudinary'
import { ALT } from './assets'

export { meta } from './meta'

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
  { role: 'Artistas', name: 'Justo Fernández Madero @justo.fm Lucas Grasso @lucobyluco Fernando Laprida @byferla Francisco Nicholson @franjnicholson' },
]

function VideoSection({ id, src }: { id: string; src: string }) {
  return (
    <div className="w-full h-full flex items-center justify-center bg-obsidian">
      <VideoPlayer
        id={id}
        src={src}
        autoPlay
        loop={false}
        objectFit="contain"
        className="w-full h-full"
      />
    </div>
  )
}

export function Component() {
  return (
    <div style={{ width: '100%', position: 'relative', backgroundColor: '#0F0F0F' }} className="alterego-container -mt-20">
      <style dangerouslySetInnerHTML={{
        __html: `
        .alterego-desktop { display: block; }
        .alterego-mobile  { display: none; }
        @media (max-width: 1023px) {
          .alterego-desktop { display: none; }
          .alterego-mobile  { display: block; }
        }
        .alterego-desktop > section + section { margin-top: 220px; }
      `}} />

      <div className="alterego-desktop">
        <ParallaxSection id="hero" overflowHidden={false} className="h-screen">
          <ParallaxLayer
            sectionId="hero"
            layerIndex={0}
            layer={{ type: 'image', src: cldImg(ALT.portada, 'w_2000'), speed: 0, isHero: true, objectFit: 'cover' }}
            position={{ top: '80px', left: '0', width: '100%', height: 'calc(100vh - 80px)', zIndex: 1 }}
          />
        </ParallaxSection>

        {/* Marquee below hero — 97px top, 97px bottom to first content section */}
        <div className="pt-[97px] pb-[97px]">
          <div className="overflow-hidden w-full">
            <div className="marquee-track" style={{ animationDuration: '88s' }}>
              {[0, 1].map((setIdx) => (
                <div key={setIdx} className="marquee-set">
                  {Array.from({ length: 4 }, (_, i) => (
                    <span key={i} className="marquee-item">DIRECCIÓN DE ARTE Y EFECTOS LUMÍNICOS/</span>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 2. WIDE LANDSCAPE — azstill18 · left 16.67%, width 66.25%, height 503px */}
        <ParallaxSection id="wide-1" style={{ minHeight: '503px' }}>
          <ParallaxLayer
            sectionId="wide-1"
            layer={{ type: 'image', src: cldImg(ALT[1], 'w_2000'), speed: 0.25 }}
            position={{ top: '0', left: '16.67%', width: '66.25%', height: '503px', zIndex: 1 }}
          />
        </ParallaxSection>

        {/* 3. FULL-WIDTH VIDEO 1 — 04-azclip1 */}
        <ParallaxSection id="fw-video-1" className="min-h-screen bg-obsidian">
          <VideoSection id="fw-video-1" src={cldVideo(ALT.v1)} />
        </ParallaxSection>

        <ParallaxSection id="stacked-stills" style={{ minHeight: '735px' }}>
          <ParallaxLayer
            sectionId="stacked-stills"
            layerIndex={0}
            layer={{ type: 'image', src: cldImg(ALT[2], 'w_1200'), speed: 0 }}
            position={{ top: '0', left: '33.33%', width: '32.3%', height: '245px', zIndex: 1 }}
          />
          <ParallaxLayer
            sectionId="stacked-stills"
            layerIndex={1}
            layer={{ type: 'image', src: cldImg(ALT[3], 'w_1200'), speed: 0 }}
            position={{ top: '245px', left: '33.33%', width: '32.3%', height: '245px', zIndex: 1 }}
          />
          <ParallaxLayer
            sectionId="stacked-stills"
            layerIndex={2}
            layer={{ type: 'image', src: cldImg(ALT[4], 'w_1200'), speed: 0 }}
            position={{ top: '490px', left: '33.33%', width: '32.3%', height: '245px', zIndex: 1 }}
          />
        </ParallaxSection>

        {/* 5. PHOTO PAIR — PHOTO-50-34 at 45.83%, PHOTO-53-45 at 16.67% */}
        <ParallaxSection id="photo-pair" style={{ minHeight: 'calc(23vh + 246px)' }}>
          <ParallaxLayer
            sectionId="photo-pair"
            layerIndex={0}
            layer={{ type: 'image', src: cldImg(ALT[5], 'w_1200'), speed: 0.3 }}
            position={{ top: '0', left: '45.83%', width: '32.3%', height: '246px', zIndex: 2 }}
          />
          <ParallaxLayer
            sectionId="photo-pair"
            layerIndex={1}
            layer={{ type: 'image', src: cldImg(ALT[6], 'w_1200'), speed: 0.45 }}
            position={{ top: '23vh', left: '16.67%', width: '32.3%', height: '246px', zIndex: 1 }}
          />
        </ParallaxSection>

        {/* 6. PORTRAIT — St1-07 centered, 466px × 828px */}
        <ParallaxSection id="portrait-st107" style={{ minHeight: '828px' }}>
          <ParallaxLayer
            sectionId="portrait-st107"
            layer={{ type: 'image', src: cldImg(ALT[7], 'w_900'), speed: 0.25 }}
            position={{ top: '0', left: 'calc(50% - 233px)', width: '466px', height: '828px', zIndex: 1 }}
          />
        </ParallaxSection>

        {/* 7. FULL-WIDTH VIDEO 2 — ytclip4 */}
        <ParallaxSection id="fw-video-2" className="min-h-[80vh] bg-obsidian">
          <VideoSection id="fw-video-2" src={cldVideo(ALT.v2)} />
        </ParallaxSection>

        {/* 8. PHOTO PAIR 2 — St1-06 2 and St1-06 1 */}
        <ParallaxSection id="photo-pair-2" style={{ minHeight: 'calc(20vh + 291px)' }}>
          <ParallaxLayer
            sectionId="photo-pair-2"
            layerIndex={0}
            layer={{ type: 'image', src: cldImg(ALT[8], 'w_1200'), speed: 0.3 }}
            position={{ top: '0', left: '16.67%', width: '32.3%', height: '291px', zIndex: 1 }}
          />
          <ParallaxLayer
            sectionId="photo-pair-2"
            layerIndex={1}
            layer={{ type: 'image', src: cldImg(ALT[9], 'w_1200'), speed: 0.45 }}
            position={{ top: '20vh', left: '45.83%', width: '32.3%', height: '291px', zIndex: 2 }}
          />
        </ParallaxSection>

        <ParallaxSection id="fw-video-3" className="min-h-[80vh] bg-obsidian">
          <VideoSection id="fw-video-3" src={cldVideo(ALT.v3)} />
        </ParallaxSection>

        <ParallaxSection id="wide-ytclip1" className="bg-obsidian">
          <div className="w-full flex justify-center bg-obsidian">
            <VideoPlayer
              id="ytclip1"
              src={cldVideo(ALT.v4)}
              autoPlay
              loop={false}
              style={{ width: '66.25%', aspectRatio: '19/10' }}
            />
          </div>
        </ParallaxSection>

        {/* 10. INV STILL + VIDEO + IMG11 + IMG12 + IMG13 — unified block */}
        <ParallaxSection id="inv-block" overflowHidden={false} style={{ minHeight: 'calc(246px + 678px + 245px + 110px + 245px + 110px + 246px + 110px + 246px)' }}>
          <ParallaxLayer
            sectionId="inv-block"
            layerIndex={0}
            layer={{ type: 'image', src: cldImg(ALT[10], 'w_1200'), speed: 0.3 }}
            position={{ top: '0', left: '8.33%', width: '32.3%', height: '246px', zIndex: 2 }}
          />
          <div style={{
            position: 'absolute',
            top: '246px',
            left: '0',
            width: '100%',
            height: '678px',
            background: '#0F0F0F',
            zIndex: 1,
          }}>
            <VideoPlayer
              id="fw-video-5"
              src={cldVideo(ALT.v5)}
              autoPlay
              loop={false}
              objectFit="cover"
              style={{ width: '100%', height: '100%' }}
            />
          </div>
          {/* img 11 — right, after video */}
          <ParallaxLayer
            sectionId="inv-block"
            layerIndex={2}
            layer={{ type: 'image', src: cldImg(ALT[11], 'w_1200'), speed: 0 }}
            position={{ top: 'calc(246px + 678px)', left: '62.5%', width: '32.3%', height: '245px', zIndex: 2 }}
          />
          {/* img 12 — centered, 110px below img 11 */}
          <ParallaxLayer
            sectionId="inv-block"
            layerIndex={3}
            layer={{ type: 'image', src: cldImg(ALT[12], 'w_1200'), speed: 0 }}
            position={{ top: 'calc(246px + 678px + 245px + 110px)', left: 'calc(50% - 233px)', width: '32.3%', height: '245px', zIndex: 2 }}
          />
          {/* img 13 — LEFT, 110px below img 12 */}
          <ParallaxLayer
            sectionId="inv-block"
            layerIndex={4}
            layer={{ type: 'image', src: cldImg(ALT[13], 'w_1200'), speed: 0 }}
            position={{ top: 'calc(246px + 678px + 245px + 110px + 245px + 110px)', left: '122px', width: '32.3%', height: '246px', zIndex: 2 }}
          />
          {/* img 14 — right, 110px below img 13 */}
          <ParallaxLayer
            sectionId="inv-block"
            layerIndex={5}
            layer={{ type: 'image', src: cldImg(ALT[14], 'w_900'), speed: 0 }}
            position={{ top: 'calc(246px + 678px + 245px + 110px + 245px + 110px + 246px + 110px)', left: '45.83%', width: '32.3%', height: '246px', zIndex: 2 }}
          />
        </ParallaxSection>

        {/* 15+16. STACKED PORTRAITS — centered, touching (0px gap) */}
        <ParallaxSection id="stacked-portraits" style={{ minHeight: 'calc(828px + 828px)' }}>
          <ParallaxLayer
            sectionId="stacked-portraits"
            layerIndex={0}
            layer={{ type: 'image', src: cldImg(ALT[15], 'w_900'), speed: 0.25 }}
            position={{ top: '0', left: '33.33%', width: '32.3%', height: '828px', zIndex: 1 }}
          />
          <ParallaxLayer
            sectionId="stacked-portraits"
            layerIndex={1}
            layer={{ type: 'video', src: cldVideo(ALT.v6), speed: 0.25 }}
            position={{ top: '828px', left: '33.33%', width: '32.3%', height: '828px', zIndex: 1 }}
          />
        </ParallaxSection>

        {/* 16. FULL-WIDTH VIDEO 5 — azclip2 */}
        <ParallaxSection id="fw-video-5" className="min-h-[80vh] bg-obsidian">
          <VideoSection id="fw-video-5" src={cldVideo(ALT.v7)} />
        </ParallaxSection>

        {/* 17. PORTRAIT — img 16, centered */}
        <ParallaxSection id="portrait-img16" style={{ minHeight: '828px' }}>
          <ParallaxLayer
            sectionId="portrait-img16"
            layer={{ type: 'image', src: cldImg(ALT[16], 'w_900'), speed: 0 }}
            position={{ top: '0', left: '33.33%', width: '32.3%', height: '828px', zIndex: 1 }}
          />
        </ParallaxSection>

        {/* 18. IMG 17 AND CREDITS — credits overlay bottom of image */}
        <section style={{ position: 'relative', width: '100%', paddingBottom: '168px' }}>
          <div style={{ width: '66.25%', margin: '0 auto' }}>
            <img
              src={cldImg(ALT[17], 'w_2000')}
              alt=""
              loading="lazy"
              decoding="async"
              style={{ width: '100%', height: 'auto', display: 'block' }}
            />
          </div>
          <div style={{
            position: 'relative',
            marginTop: '-66px',
            width: '100%',
            color: '#FFF',
            fontFamily: '"Space Grotesk", sans-serif',
            fontSize: '16px',
            fontStyle: 'normal',
            lineHeight: '150%',
            boxSizing: 'border-box',
            mixBlendMode: 'difference',
            ...({ WebkitMixBlendMode: 'difference' } as any),
            transform: 'translateZ(0)',
            zIndex: 2,
          } as any}>
            {CREDITS.map((entry, i) => (
              <span key={i}>
                {i > 0 && <span>{' / '}</span>}
                <span style={{ fontWeight: 700, textTransform: 'uppercase' }}>
                  {entry.role}:
                </span>
                <span style={{ fontWeight: 300 }}> {' '}{entry.name}</span>
              </span>
            ))}
          </div>
        </section>

      </div>{/* /alterego-desktop */}

      {/* ── ALTEREGO MOBILE ─────────────────────────────────────────────── */}
      <div className="alterego-mobile" style={{ backgroundColor: '#0F0F0F', overflow: 'hidden', paddingBottom: '100px' }}>

        {/* 1. HERO */}
        <div style={{ position: 'relative', width: '100%', height: '75vh' }}>
          <img src={cldImg(ALT.portadaMobile, 'w_800')} alt="" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
          <div style={{ position: 'absolute', bottom: 0, left: 0, width: '100%', overflow: 'hidden', zIndex: 2 }}>
            <div className="marquee-track" style={{ animationDuration: '88s' }}>
              {[0, 1].map((setIdx) => (
                <div key={setIdx} className="marquee-set">
                  {Array.from({ length: 4 }, (_, i) => (
                    <span key={i} className="marquee-item">DIRECCIÓN DE ARTE Y EFECTOS LUMÍNICOS/</span>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 2. azstill18 — left-aligned, 290px wide */}
        <img
          src={cldImg(ALT[1], 'w_800')}
          alt=""
          loading="lazy"
          decoding="async"
          style={{ display: 'block', width: 'calc(100% - 100px)', marginTop: '80px', marginLeft: 'calc(8.33% + 17.5px)' }}
        />

        {/* 3. Video 1 — full-width */}
        <div style={{ marginTop: '80px', width: '100%' }}>
          <VideoPlayer id="m-v1" src={cldVideo(ALT.v1)} autoPlay loop={false} style={{ width: '100%', aspectRatio: '390/206' }} />
        </div>

        {/* 4. 3 stacked stills — left-aligned, no gap between */}
        <div style={{ marginTop: '80px', display: 'flex', flexDirection: 'column', gap: 0 }}>
          <img src={cldImg(ALT[2], 'w_800')} alt="" loading="lazy" decoding="async"
            style={{ display: 'block', width: 'calc(100% - 100px)', marginLeft: 'calc(8.33% + 17.5px)' }} />
          <img src={cldImg(ALT[3], 'w_800')} alt="" loading="lazy" decoding="async"
            style={{ display: 'block', width: 'calc(100% - 100px)', marginLeft: 'calc(8.33% + 17.5px)' }} />
          <img src={cldImg(ALT[4], 'w_800')} alt="" loading="lazy" decoding="async"
            style={{ display: 'block', width: 'calc(100% - 100px)', marginLeft: 'calc(8.33% + 17.5px)' }} />
        </div>

        {/* 5. Photo pair 1 — right/left offset, 182×96px */}
        <div style={{ position: 'relative', marginTop: '80px', height: '144px', width: '100%' }}>
          <img src={cldImg(ALT[5], 'w_600')} alt="" loading="lazy" decoding="async"
            style={{ position: 'absolute', top: 0, right: '20px', width: '182px', height: '96px', objectFit: 'cover' }} />
          <img src={cldImg(ALT[6], 'w_600')} alt="" loading="lazy" decoding="async"
            style={{ position: 'absolute', top: '48px', left: '20px', width: '182px', height: '96px', objectFit: 'cover' }} />
        </div>

        {/* 6. Portrait ALT[7] — centered */}
        <img
          src={cldImg(ALT[7], 'w_800')}
          alt=""
          loading="lazy"
          decoding="async"
          style={{ display: 'block', width: 'calc(100% - 100px)', margin: '128px auto 0' }}
        />

        {/* 7. Video 2 — full-width */}
        <div style={{ marginTop: '80px', width: '100%' }}>
          <VideoPlayer id="m-v2" src={cldVideo(ALT.v2)} autoPlay loop={false} style={{ width: '100%', aspectRatio: '390/206' }} />
        </div>

        {/* 8. Photo pair 2 — left/right offset, 182×114px */}
        <div style={{ position: 'relative', marginTop: '80px', height: '171px', width: '100%' }}>
          <img src={cldImg(ALT[8], 'w_600')} alt="" loading="lazy" decoding="async"
            style={{ position: 'absolute', top: 0, left: '20px', width: '182px', height: '114px', objectFit: 'cover' }} />
          <img src={cldImg(ALT[9], 'w_600')} alt="" loading="lazy" decoding="async"
            style={{ position: 'absolute', top: '57px', right: '20px', width: '182px', height: '114px', objectFit: 'cover' }} />
        </div>

        {/* 9. Video 3 — full-width */}
        <div style={{ marginTop: '81px', width: '100%' }}>
          <VideoPlayer id="m-v3" src={cldVideo(ALT.v3)} autoPlay loop={false} style={{ width: '100%', aspectRatio: '390/206' }} />
        </div>

        {/* 10. Video 4 — centered, narrower */}
        <div style={{ marginTop: '80px', display: 'flex', justifyContent: 'center' }}>
          <VideoPlayer id="m-v4" src={cldVideo(ALT.v4)} autoPlay loop={false} style={{ width: 'calc(100% - 100px)', height: '153px' }} />
        </div>

        {/* 11. Scatter section — 5 thumbnails + video absolutely positioned */}
        <div style={{ position: 'relative', marginTop: '80px', height: '642px', width: '100%' }}>
          <img src={cldImg(ALT[10], 'w_400')} alt="" loading="lazy" decoding="async"
            style={{ position: 'absolute', top: 0, left: '20px', width: '140px', height: '74px', objectFit: 'cover' }} />
          <div style={{ position: 'absolute', top: '44px', left: 0, width: '100%', height: '205px' }}>
            <VideoPlayer id="m-v5" src={cldVideo(ALT.v5)} autoPlay loop={false} objectFit="cover" style={{ width: '100%', height: '100%' }} />
          </div>
          <img src={cldImg(ALT[11], 'w_400')} alt="" loading="lazy" decoding="async"
            style={{ position: 'absolute', top: '226px', right: '20px', width: '140px', height: '74px', objectFit: 'cover' }} />
          <img src={cldImg(ALT[12], 'w_400')} alt="" loading="lazy" decoding="async"
            style={{ position: 'absolute', top: '340px', left: '180px', width: '140px', height: '74px', objectFit: 'cover' }} />
          <img src={cldImg(ALT[13], 'w_400')} alt="" loading="lazy" decoding="async"
            style={{ position: 'absolute', top: '454px', left: '20px', width: '140px', height: '74px', objectFit: 'cover' }} />
          <img src={cldImg(ALT[14], 'w_400')} alt="" loading="lazy" decoding="async"
            style={{ position: 'absolute', top: '568px', right: '20px', width: '140px', height: '74px', objectFit: 'cover' }} />
        </div>

        {/* 12. Portrait 15 + Portrait video v6 — centered, touching (no gap) */}
        <div style={{ marginTop: '80px', display: 'flex', flexDirection: 'column', gap: 0, alignItems: 'center' }}>
          <img src={cldImg(ALT[15], 'w_800')} alt="" loading="lazy" decoding="async"
            style={{ display: 'block', width: 'calc(100% - 100px)' }} />
          <VideoPlayer id="m-v6" src={cldVideo(ALT.v6)} autoPlay loop={false} style={{ width: 'calc(100% - 100px)', aspectRatio: '9/16' }} />
        </div>

        {/* 13. Video 7 — full-width */}
        <div style={{ marginTop: '80px', width: '100%' }}>
          <VideoPlayer id="m-v7" src={cldVideo(ALT.v7)} autoPlay loop={false} style={{ width: '100%', aspectRatio: '390/206' }} />
        </div>

        {/* 14. Portrait ALT[16] — centered */}
        <img
          src={cldImg(ALT[16], 'w_800')}
          alt=""
          loading="lazy"
          decoding="async"
          style={{ display: 'block', width: 'calc(100% - 100px)', margin: '80px auto 0' }}
        />

        {/* 15. ALT[17] landscape — full-width */}
        <img
          src={cldImg(ALT[17], 'w_800')}
          alt=""
          loading="lazy"
          decoding="async"
          style={{ display: 'block', width: '100%', height: 'auto', marginTop: '80px' }}
        />

        {/* 16. Credits — overlapping bottom of ALT[17] */}
        <div style={{
          marginTop: '-32px',
          width: '100%',
          padding: '0 20px',
          color: '#FFF',
          fontFamily: '"Space Grotesk", sans-serif',
          fontSize: '15px',
          fontStyle: 'normal',
          lineHeight: '1.45',
          boxSizing: 'border-box',
          mixBlendMode: 'difference',
          ...({ WebkitMixBlendMode: 'difference' } as any),
          transform: 'translateZ(0)',
          zIndex: 2,
        } as any}>
          {CREDITS.map((entry, i) => (
            <span key={i}>
              {i > 0 && <span>{' / '}</span>}
              <span style={{ fontWeight: 700, textTransform: 'uppercase' }}>{entry.role}:</span>
              <span style={{ fontWeight: 300 }}> {entry.name}</span>
            </span>
          ))}
        </div>

      </div>
    </div>
  )
}
