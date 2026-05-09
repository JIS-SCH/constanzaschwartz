'use client'

import { PARALLAX } from '@/src/motion/tokens'
import { ParallaxSection } from '@/src/components/parallax/ParallaxSection'
import { ParallaxLayer } from '@/src/components/parallax/ParallaxLayer'
import { PI } from '@/src/components/parallax/ParallaxImg'
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
        
        .alterego-desktop .marquee-item {
          color: #FFF;
          leading-trim: both;
          text-edge: cap;
          padding-top: 14px;
          padding-bottom: 97px;
          font-family: "Helvetica Neue LT Std", sans-serif;
          font-size: 36px;
          font-style: normal;
          font-weight: 250;
          line-height: normal;
          letter-spacing: 1.44px;
          text-transform: uppercase;
          white-space: nowrap;
          padding-right: 80px;
        }
      `}} />

      <div className="alterego-desktop">
        <ParallaxSection id="hero" overflowHidden={false} className="h-screen" style={{ marginTop: '23px' }}>
          <ParallaxLayer
            sectionId="hero"
            layerIndex={0}
            layer={{ type: 'image', src: cldImg(ALT.portada, 'w_2000'), speed: PARALLAX.speed.hero, isHero: true, objectFit: 'cover' }}
            position={{ top: '20px', left: '0', width: '100 % ', height: 'calc(100vh - 80px)', zIndex: 1 }}
          />
        </ParallaxSection>

        {/* Marquee below hero  */}
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

        {/* 2. WIDE LANDSCAPE */}
        <ParallaxSection id="wide-1" style={{ minHeight: '503px' }}>
          <ParallaxLayer
            sectionId="wide-1"
            layer={{ type: 'image', src: cldImg(ALT[1], 'w_2000') }}
            position={{ top: '0', left: '16.67%', width: '66.25%', height: '503px', zIndex: 1 }}
          />
        </ParallaxSection>

        {/* 3. FULL-WIDTH VIDEO 1 */}
        <ParallaxSection id="fw-video-1" className="min-h-screen bg-obsidian">
          <VideoSection id="fw-video-1" src={cldVideo(ALT.v1)} />
        </ParallaxSection>

        <ParallaxSection id="stacked-stills" style={{ minHeight: '735px' }}>
          <div className="relative z-10 mx-auto" style={{ width: '32.3%', marginLeft: '33.33%' }}>
            <PI src={cldImg(ALT[2], 'w_1200')} alt="" className="w-full h-[245px] object-cover block" />
            <PI src={cldImg(ALT[3], 'w_1200')} alt="" className="w-full h-[245px] object-cover block" />
            <PI src={cldImg(ALT[4], 'w_1200')} alt="" className="w-full h-[245px] object-cover block" />
          </div>
        </ParallaxSection>

        {/* 5. PHOTO PAIR  */}
        <ParallaxSection id="photo-pair" style={{ minHeight: 'calc(23vh + 246px)' }}>
          <ParallaxLayer
            sectionId="photo-pair"
            layerIndex={0}
            layer={{ type: 'image', src: cldImg(ALT[5], 'w_1200') }}
            position={{ top: '0', left: '45.83%', width: '32.3%', height: '246px', zIndex: 1 }}
          />
          <ParallaxLayer
            sectionId="photo-pair"
            layerIndex={1}
            layer={{ type: 'image', src: cldImg(ALT[6], 'w_1200') }}
            position={{ top: '18vh', left: '16.67%', width: '32.3%', height: '246px', zIndex: 2 }}
          />
        </ParallaxSection>

        {/* 6. PORTRAIT  */}
        <ParallaxSection id="portrait-st107" style={{ minHeight: '828px' }}>
          <ParallaxLayer
            sectionId="portrait-st107"
            layer={{ type: 'image', src: cldImg(ALT[7], 'w_900') }}
            position={{ top: '0', left: 'calc(50% - 233px)', width: '466px', height: '828px', zIndex: 1 }}
          />
        </ParallaxSection>

        {/* 7. FULL-WIDTH VIDEO 2 */}
        <ParallaxSection id="fw-video-2" className="min-h-[80vh] bg-obsidian">
          <VideoSection id="fw-video-2" src={cldVideo(ALT.v2)} />
        </ParallaxSection>

        {/* 8. PHOTO PAIR 2 */}
        <ParallaxSection id="photo-pair-2" style={{ minHeight: 'calc(20vh + 291px)' }}>
          <ParallaxLayer
            sectionId="photo-pair-2"
            layerIndex={0}
            layer={{ type: 'image', src: cldImg(ALT[8], 'w_1200') }}
            position={{ top: '0', left: '16.67%', width: '32.3%', height: '291px', zIndex: 1 }}
          />
          <ParallaxLayer
            sectionId="photo-pair-2"
            layerIndex={1}
            layer={{ type: 'image', src: cldImg(ALT[9], 'w_1200') }}
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

        {/* 10. INV STILL + VIDEO + IMG11 + IMG12 + IMG13 */}
        <ParallaxSection id="inv-block" overflowHidden={false} style={{ minHeight: 'calc(246px + 678px + 245px + 110px + 245px + 110px + 246px + 110px + 246px)' }}>
          <ParallaxLayer
            sectionId="inv-block"
            layerIndex={0}
            layer={{ type: 'image', src: cldImg(ALT[10], 'w_1200') }}
            position={{ top: '70px', left: '8.33%', width: '32.3%', height: '246px', zIndex: 2 }}
          />
          <ParallaxLayer
            sectionId="inv-block"
            layerIndex={1}
            layer={{ type: 'video', src: cldVideo(ALT.v5), speed: PARALLAX.speed.standard }}
            position={{ top: '246px', left: '0', width: '100%', height: '678px', zIndex: 1 }}
          >
            <VideoPlayer
              id="fw-video-inv"
              src={cldVideo(ALT.v5)}
              autoPlay
              loop={false}
              objectFit="cover"
              style={{ width: '100%', height: '759px' }}
            />
          </ParallaxLayer>
          {/* img 11  */}
          <ParallaxLayer
            sectionId="inv-block"
            layerIndex={2}
            layer={{ type: 'image', src: cldImg(ALT[11], 'w_1200') }}
            position={{ top: 'calc(246px + 668px)', left: '63.5%', width: '32.3%', height: '245px', zIndex: 2 }}
          />
          {/* img 12 */}
          <ParallaxLayer
            sectionId="inv-block"
            layerIndex={3}
            layer={{ type: 'image', src: cldImg(ALT[12], 'w_1200') }}
            position={{ top: 'calc(246px + 678px + 245px + 100px)', left: 'calc(50% - 233px)', width: '32.3%', height: '245px', zIndex: 2 }}
          />
          {/* img 13 */}
          <ParallaxLayer
            sectionId="inv-block"
            layerIndex={4}
            layer={{ type: 'image', src: cldImg(ALT[13], 'w_1200') }}
            position={{ top: 'calc(246px + 678px + 245px + 110px + 245px + 110px)', left: '122px', width: '32.3%', height: '246px', zIndex: 2 }}
          />
          {/* img 14 */}
          <ParallaxLayer
            sectionId="inv-block"
            layerIndex={5}
            layer={{ type: 'image', src: cldImg(ALT[14], 'w_900') }}
            position={{ top: 'calc(246px + 678px + 245px + 110px + 245px + 110px + 246px + 110px)', left: '58.83%', width: '32.3%', height: '246px', zIndex: 2 }}
          />
        </ParallaxSection>

        {/* 15+16. STACKED PORTRAITS  */}
        <ParallaxSection id="stacked-portraits" style={{ minHeight: 'calc(828px + 828px)' }}>
          <ParallaxLayer
            sectionId="stacked-portraits"
            layerIndex={0}
            layer={{ type: 'image', src: cldImg(ALT[15], 'w_900') }}
            position={{ top: '0', left: '33.33%', width: '32.3%', height: '828px', zIndex: 1 }}
          />
          <ParallaxLayer
            sectionId="stacked-portraits"
            layerIndex={1}
            layer={{ type: 'video', src: cldVideo(ALT.v6) }}
            position={{ top: '828px', left: '33.33%', width: '32.3%', height: '828px', zIndex: 1 }}
          />
        </ParallaxSection>

        {/* 16. FULL-WIDTH VIDEO 7  */}
        <ParallaxSection id="fw-video-7" className="min-h-[80vh] bg-obsidian">
          <VideoSection id="fw-video-7" src={cldVideo(ALT.v7)} />
        </ParallaxSection>

        {/* 17. PORTRAIT  */}
        <ParallaxSection id="portrait-img16" style={{ minHeight: '828px' }}>
          <ParallaxLayer
            sectionId="portrait-img16"
            layer={{ type: 'image', src: cldImg(ALT[16], 'w_900') }}
            position={{ top: '0', left: '33.33%', width: '32.3%', height: '828px', zIndex: 1 }}
          />
        </ParallaxSection>

        {/* 18. IMG 17 AND CREDITS  */}
        <section style={{ position: 'relative', width: '100%', paddingBottom: '40px' }}>
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
            fontSize: '15px',
            fontStyle: 'normal',
            lineHeight: '1.45',
            boxSizing: 'border-box',
            transform: 'translateZ(0)',
            zIndex: 2,
          }}>
            {CREDITS.map((entry, i) => (
              <span key={i}>
                {i > 0 && <span style={{ fontWeight: 200 }}>{' / '}</span>}
                <span style={{ fontWeight: 700 }}>
                  {entry.role}:
                </span>
                <span style={{ fontWeight: 200 }}> {' '}{entry.name}</span>
              </span>
            ))}
          </div>
        </section>

      </div>



      {/* ── ALTEREGO MOBILE ─────────────────────────────────────────────── */}
      <div className="alterego-mobile" style={{ backgroundColor: '#0F0F0F', overflow: 'hidden', paddingBottom: '0px' }}>

        {/* 1. HERO */}
        <div data-project-image style={{ position: 'relative', width: '100%', height: '669px', overflow: 'hidden' }}>
          <PI src={cldImg(ALT.portadaMobile, 'w_800')} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} speed={PARALLAX.speed.hero} />
        </div>

        {/* 2.*/}
        <img
          src={cldImg(ALT[1], 'w_800')}
          alt=""
          loading="lazy"
          decoding="async"
          style={{ display: 'block', width: 'calc(100% - 100px)', marginTop: '80px', marginLeft: 'calc(8.33% + 17.5px)' }}
        />

        {/* 3. Video 1 */}
        <div style={{ marginTop: '80px', width: '100%' }}>
          <VideoPlayer id="m-v1" src={cldVideo(ALT.v1)} autoPlay loop={false} style={{ width: '100%', aspectRatio: '390/206' }} />
        </div>

        {/* 4. 3 stacked stills */}
        <div style={{ marginTop: '80px', display: 'flex', flexDirection: 'column', gap: 0 }}>
          <img src={cldImg(ALT[2], 'w_800')} alt="" loading="lazy" decoding="async"
            style={{ display: 'block', width: 'calc(100% - 100px)', marginLeft: 'calc(8.33% + 17.5px)' }} />
          <img src={cldImg(ALT[3], 'w_800')} alt="" loading="lazy" decoding="async"
            style={{ display: 'block', width: 'calc(100% - 100px)', marginLeft: 'calc(8.33% + 17.5px)' }} />
          <img src={cldImg(ALT[4], 'w_800')} alt="" loading="lazy" decoding="async"
            style={{ display: 'block', width: 'calc(100% - 100px)', marginLeft: 'calc(8.33% + 17.5px)' }} />
        </div>

        {/* 5. Photo pair 1 */}
        <div style={{ position: 'relative', marginTop: '80px', height: '144px', width: '100%' }}>
          <PI src={cldImg(ALT[5], 'w_600')} alt="" loading="lazy" decoding="async"
            style={{ position: 'absolute', top: 0, right: '20px', width: '182px', height: '96px', objectFit: 'cover' }} />
          <PI src={cldImg(ALT[6], 'w_600')} alt="" loading="lazy" decoding="async"
            style={{ position: 'absolute', top: '48px', left: '20px', width: '182px', height: '96px', objectFit: 'cover' }} />
        </div>

        {/* 6. Portrait ALT[7]  */}
        <img
          src={cldImg(ALT[7], 'w_800')}
          alt=""
          loading="lazy"
          decoding="async"
          style={{ display: 'block', width: 'calc(100% - 100px)', margin: '128px auto 0' }}
        />

        {/* 7. Video 2 */}
        <div style={{ marginTop: '80px', width: '100%' }}>
          <VideoPlayer id="m-v2" src={cldVideo(ALT.v2)} autoPlay loop={false} style={{ width: '100%', aspectRatio: '390/206' }} />
        </div>

        {/* 8. Photo pair 2 */}
        <div style={{ position: 'relative', marginTop: '80px', height: '171px', width: '100%' }}>
          <PI src={cldImg(ALT[8], 'w_600')} alt="" loading="lazy" decoding="async"
            style={{ position: 'absolute', top: 0, left: '20px', width: '182px', height: '114px', objectFit: 'cover' }} />
          <PI src={cldImg(ALT[9], 'w_600')} alt="" loading="lazy" decoding="async"
            style={{ position: 'absolute', top: '57px', right: '20px', width: '182px', height: '114px', objectFit: 'cover' }} />
        </div>

        {/* 9. Video 3  */}
        <div style={{ marginTop: '81px', width: '100%' }}>
          <VideoPlayer id="m-v3" src={cldVideo(ALT.v3)} autoPlay loop={false} style={{ width: '100%', aspectRatio: '390/206' }} />
        </div>

        {/* 10. Video 4  */}
        <div style={{ marginTop: '80px', display: 'flex', justifyContent: 'center' }}>
          <VideoPlayer id="m-v4" src={cldVideo(ALT.v4)} autoPlay loop={false} style={{ width: 'calc(100% - 100px)', height: '153px' }} />
        </div>

        {/* 11. Scatter section */}
        <div style={{ position: 'relative', marginTop: '80px', height: '642px', width: '100%' }}>
          <PI src={cldImg(ALT[10], 'w_400')} alt="" loading="lazy" decoding="async"
            style={{ position: 'absolute', top: 0, left: '20px', width: '140px', height: '74px', objectFit: 'cover', zIndex: 10 }} />
          <div style={{ position: 'absolute', top: '44px', left: 0, width: '100%', height: '205px' }}>
            <VideoPlayer id="m-v5" src={cldVideo(ALT.v5)} autoPlay loop={false} objectFit="cover" style={{ width: '100%', height: '100%' }} />
          </div>
          <PI src={cldImg(ALT[11], 'w_400')} alt="" loading="lazy" decoding="async"
            style={{ position: 'absolute', top: '226px', right: '20px', width: '140px', height: '74px', objectFit: 'cover', zIndex: 10 }} />
          <PI src={cldImg(ALT[12], 'w_400')} alt="" loading="lazy" decoding="async"
            style={{ position: 'absolute', top: '340px', left: '108px', width: '140px', height: '74px', objectFit: 'cover', zIndex: 10 }} />
          <PI src={cldImg(ALT[13], 'w_400')} alt="" loading="lazy" decoding="async"
            style={{ position: 'absolute', top: '454px', left: '20px', width: '140px', height: '74px', objectFit: 'cover', zIndex: 10 }} />
          <PI src={cldImg(ALT[14], 'w_400')} alt="" loading="lazy" decoding="async"
            style={{ position: 'absolute', top: '568px', right: '20px', width: '140px', height: '74px', objectFit: 'cover', zIndex: 10 }} />
        </div>

        {/* 12. Portrait 15 + Portrait video v6 — centered, touching (no gap) */}
        <div style={{ marginTop: '80px', display: 'flex', flexDirection: 'column', gap: 0, alignItems: 'center' }}>
          <img src={cldImg(ALT[15], 'w_800')} alt="" loading="lazy" decoding="async"
            style={{ display: 'block', width: 'calc(100% - 100px)' }} />
          <VideoPlayer id="m-v6" src={cldVideo(ALT.v6)} autoPlay loop={false} style={{ width: 'calc(100% - 100px)', aspectRatio: '9/16' }} />
        </div>

        {/* 13. Video 7 */}
        <div style={{ marginTop: '80px', width: '100%' }}>
          <VideoPlayer id="m-v7" src={cldVideo(ALT.v7)} autoPlay loop={false} style={{ width: '100%', aspectRatio: '390/206' }} />
        </div>

        {/* 14. Portrait ALT[16] */}
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
          position: 'relative',
          marginTop: '-66px',
          width: '100%',
          paddingTop: '20px',
          paddingBottom: '30px',
          zIndex: 2,
          minHeight: '100px'
        }}>
          <ParallaxLayer
            layer={{ type: 'text', content: '', speed: PARALLAX.speed.subtle }}
            position={{ top: '0', left: '0', width: '100%', height: 'auto', zIndex: 1 }}
          >
            <div style={{
              color: '#FFF',
              fontFamily: '"Space Grotesk", sans-serif',
              fontSize: '15px',
              fontStyle: 'normal',
              lineHeight: '1.45',
              boxSizing: 'border-box',
              transform: 'translateZ(0)',
            }}>
              {CREDITS.map((entry, i) => (
                <span key={i}>
                  {i > 0 && <span style={{ fontWeight: 200 }}>{' / '}</span>}
                  <span style={{ fontWeight: 700 }}>{entry.role}:</span>
                  <span style={{ fontWeight: 200 }}> {entry.name}</span>
                </span>
              ))}
            </div>
          </ParallaxLayer>
        </div>

      </div>
    </div >
  )
}
