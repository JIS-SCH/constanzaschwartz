import type { ParallaxConfig, GalleryImage } from '@/src/types/parallax'

export interface Project {
  date: string
  title: string
  slug: string
  image: string
  category?: string
  parallaxConfig?: ParallaxConfig
  gallery?: GalleryImage[]
}

export const projects: Project[] = [
  {
    date: 'APR 2025',
    title: 'MÁS ALLÁ DEL INFINITO',
    slug: 'mas-alla-del-infinito',
    image: '/project5/azstill18 1.png',
    category: 'Dirección de Arte y Efectos Lumínicos',
    parallaxConfig: {
      sections: [
        {
          id: 'hero',
          minHeight: '115vh',
          layers: [
            { type: 'image', src: '/project5/azstill18 1.png', speed: 0.8, isHero: true,
              position: { top: '80px', left: '4.25%', width: '91.5%', height: '561px', zIndex: 1 } },
            { type: 'marquee', content: 'DIRECCIÓN DE ARTE Y EFECTOS LUMÍNICOS.', speed: 0, multiplier: 22,
              position: { top: '86vh', left: '0', width: '100%', height: '72px', zIndex: 2 } },
          ]
        },
        {
          id: 'medium-1',
          minHeight: '80vh',
          layers: [
            { type: 'image', src: '/project5/azstill18 1.png', speed: 0.3,
              position: { top: '5vh', left: '16.67%', width: '66.25%', height: '503px', zIndex: 1 } },
          ]
        },
        {
          id: 'fw-video-1',
          minHeight: '80vh',
          type: 'fullwidth-video',
          layers: [
            { type: 'video', src: '/project5/04-azclip1.mp4', speed: 0, autoPlay: true, loop: false, muted: true },
          ]
        },
        {
          id: 'grid-stack',
          minHeight: '110vh',
          layers: [
            { type: 'image', src: '/project5/azstill4.jpg', speed: 0,
              position: { top: '5vh', left: 'calc(50% - 233px)', width: '466px', height: '245px', zIndex: 1 } },
            { type: 'image', src: '/project5/09-azstill2.jpg', speed: 0,
              position: { top: 'calc(5vh + 265px)', left: 'calc(50% - 233px)', width: '466px', height: '245px', zIndex: 1 } },
            { type: 'image', src: '/project5/azstill1.jpg', speed: 0,
              position: { top: 'calc(5vh + 530px)', left: 'calc(50% - 233px)', width: '466px', height: '245px', zIndex: 1 } },
          ]
        },
        {
          id: 'overlap-1',
          minHeight: '90vh',
          layers: [
            { type: 'image', src: '/project5/PHOTO-2025-04-09-14-50-34 1.png', speed: 0.6,
              position: { top: '5vh', left: '45.83%', width: '466px', height: '246px', zIndex: 2 } },
            { type: 'image', src: '/project5/PHOTO-2025-04-09-14-53-45 1.png', speed: 0.2,
              position: { top: '20vh', left: '16.67%', width: '466px', height: '246px', zIndex: 1 } },
          ]
        },
        {
          id: 'portrait-1',
          minHeight: '100vh',
          layers: [
            { type: 'image', src: '/project5/St1-07 1.png', speed: 0.3,
              position: { top: '5vh', left: 'calc(50% - 233px)', width: '466px', height: '828px', zIndex: 1 } },
          ]
        },
        {
          id: 'fw-video-2',
          minHeight: '80vh',
          layers: [
            { type: 'image', src: '/project5/ytclip4 1.png', speed: 0,
              position: { top: '10vh', left: '0', width: '100%', height: '60vh', zIndex: 1 } },
          ]
        },
        {
          id: 'overlap-2',
          minHeight: '90vh',
          layers: [
            { type: 'image', src: '/project5/St1-06 2.png', speed: 0.2,
              position: { top: '5vh', left: '16.67%', width: '466px', height: '291px', zIndex: 1 } },
            { type: 'image', src: '/project5/St1-06 1.png', speed: 0.6,
              position: { top: '18vh', left: '45.83%', width: '466px', height: '291px', zIndex: 2 } },
          ]
        },
        {
          id: 'fw-video-3',
          minHeight: '80vh',
          layers: [
            { type: 'image', src: '/project5/pdsclip1 1.png', speed: 0,
              position: { top: '10vh', left: '0', width: '100%', height: '60vh', zIndex: 1 } },
          ]
        },
        {
          id: 'medium-2',
          minHeight: '80vh',
          layers: [
            { type: 'image', src: '/project5/ytclip1 1.png', speed: 0.3,
              position: { top: '5vh', left: 'calc(50% - 477px)', width: '954px', height: '503px', zIndex: 1 } },
          ]
        },
        {
          id: 'scattered',
          minHeight: '300vh',
          layers: [
            { type: 'image', src: '/project5/invstill11 1.png', speed: 0.8,
              position: { top: '2%', left: '8.33%', width: '466px', height: '246px', zIndex: 2 } },
            { type: 'image', src: '/project5/clipinv3 2 1.png', speed: 0,
              position: { top: '12%', left: '0', width: '100%', height: '50vw', zIndex: 1 } },
            { type: 'image', src: '/project5/10 inv 1 1.png', speed: 0.5,
              position: { top: '35%', left: '62.5%', width: '466px', height: '245px', zIndex: 2 } },
            { type: 'image', src: '/project5/invstill4 1.png', speed: 0.3,
              position: { top: '50%', left: 'calc(50% - 233px)', width: '466px', height: '245px', zIndex: 2 } },
            { type: 'image', src: '/project5/invstill6 1.png', speed: 0.7,
              position: { top: '65%', left: '8.33%', width: '466px', height: '245px', zIndex: 2 } },
            { type: 'image', src: '/project5/invstill12 1.png', speed: 0.4,
              position: { top: '80%', left: '58.33%', width: '466px', height: '246px', zIndex: 2 } },
          ]
        },
        {
          id: 'portraits-seq',
          minHeight: '200vh',
          layers: [
            { type: 'image', src: '/project5/St1-02 1.png', speed: 0.2,
              position: { top: '5%', left: 'calc(50% - 233px)', width: '466px', height: '828px', zIndex: 1 } },
            { type: 'image', src: '/project5/St1-04 1.png', speed: 0.35,
              position: { top: '45%', left: 'calc(50% - 233px)', width: '466px', height: '828px', zIndex: 1 } },
          ]
        },
        {
          id: 'fw-video-4',
          minHeight: '80vh',
          layers: [
            { type: 'image', src: '/project5/azclip2 1.png', speed: 0,
              position: { top: '10vh', left: '0', width: '100%', height: '60vh', zIndex: 1 } },
          ]
        },
        {
          id: 'portrait-3',
          minHeight: '100vh',
          layers: [
            { type: 'image', src: '/project5/St1-03 1.png', speed: 0.3,
              position: { top: '5vh', left: 'calc(50% - 233px)', width: '466px', height: '828px', zIndex: 1 } },
          ]
        },
        {
          id: 'medium-3',
          minHeight: '80vh',
          layers: [
            { type: 'image', src: '/project5/azstill12 1.png', speed: 0.3,
              position: { top: '5vh', left: '16.67%', width: '66.25%', height: '503px', zIndex: 1 } },
          ]
        },
        {
          id: 'credits',
          minHeight: '60vh',
          layers: [
            { type: 'credits' as const, speed: 0.4, credits: [
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
              { role: 'Artistas', name: 'Justo Fernández Madero @justo.fm  Lucas Grasso @lucobyluco  Fernando Laprida @byferla  Francisco Nicholson @franjnicholson' },
            ],
              position: { top: '10vh', left: '0', width: '100%', height: 'auto', zIndex: 1 } },
          ]
        },
      ]
    },
    gallery: [
      { src: '/project5/azstill18 1.png',   alt: 'Az Still 18', position: 'center', size: 'lg' },
      { src: '/project5/St1-07 1.png',       alt: 'Still 07',    position: 'left',   size: 'md' },
      { src: '/project5/invstill11 1.png',   alt: 'Inv Still 11',position: 'right',  size: 'sm' },
      { src: '/project5/St1-02 1.png',       alt: 'Still 02',    position: 'center', size: 'lg' },
      { src: '/project5/azstill12 1.png',    alt: 'Az Still 12', position: 'left',   size: 'md' },
      { src: '/project5/St1-03 1.png',       alt: 'Still 03',    position: 'right',  size: 'md' },
    ]
  },
  // ─────────────────────────────────────────────────────────
  // MUTEK
  // ─────────────────────────────────────────────────────────
  {
    date: '2025',
    title: 'MUTEK',
    slug: 'mutek',
    image: '/mutek/_DSC3417.jpg',
    category: 'Dirección de Arte',
    parallaxConfig: {
      sections: [
        // Hero
        {
          id: 'hero',
          minHeight: '115vh',
          layers: [
            { type: 'image', src: '/mutek/_DSC3417.jpg', speed: 0.8, isHero: true,
              position: { top: '80px', left: '4.25%', width: '91.5%', height: '561px', zIndex: 1 } },
            { type: 'marquee', content: 'DIRECCIÓN DE ARTE.', speed: 0, multiplier: 22,
              position: { top: '86vh', left: '0', width: '100%', height: '72px', zIndex: 2 } },
          ]
        },
        // Left image + right text
        {
          id: 'narrative-1',
          minHeight: '100vh',
          layers: [
            { type: 'image', src: '/mutek/_DSC3417_2.jpg', speed: 0.3,
              position: { top: '5vh', left: '8.4%', width: '32.43%', height: '700px', zIndex: 1 } },
            { type: 'text', content: 'Desde nuestros comienzos nos acompaña un impulso que se manifiesta en los rituales.', speed: 0,
              position: { top: '30vh', left: '54.86%', width: '32.43%', height: 'auto', zIndex: 1 } },
          ]
        },
        // Center image + right text
        {
          id: 'narrative-2',
          minHeight: '100vh',
          layers: [
            { type: 'image', src: '/mutek/_DSC3398.jpg', speed: 0.4,
              position: { top: '5vh', left: '33.75%', width: '32.43%', height: '700px', zIndex: 1 } },
            { type: 'text', content: 'Venimos a este espacio a vivir algo que no podemos vivir en otro lado.', speed: 0,
              position: { top: '60vh', left: '54.86%', width: '32.43%', height: 'auto', zIndex: 1 } },
          ]
        },
        // Wide still + text + marquee
        {
          id: 'still-marquee',
          minHeight: '90vh',
          layers: [
            { type: 'text', content: 'Desarmemos para percibir de nuevo. Dejemos que el cuerpo hable.', speed: 0,
              position: { top: '5vh', left: '12.64%', width: '32.43%', height: 'auto', zIndex: 1 } },
            { type: 'image', src: '/mutek/Still_180240_1.45.1.jpg', speed: 0.3,
              position: { top: '25vh', left: '12.64%', width: '57.49%', height: '466px', zIndex: 1 } },
            { type: 'marquee', content: 'MUTEK 2025 — RITUAL SONORO — EXPERIENCIA INMERSIVA.', speed: 0, multiplier: 22,
              position: { top: '85vh', left: '0', width: '100%', height: '30px', zIndex: 2 } },
          ]
        },
        // Small right + left edge + text
        {
          id: 'composite-1',
          minHeight: '90vh',
          layers: [
            { type: 'image', src: '/mutek/Still_180240_1.8.1.jpg', speed: 0.6,
              position: { top: '0', left: '63.42%', width: '23.88%', height: '193px', zIndex: 2 } },
            { type: 'image', src: '/mutek/_DSC3353.jpg', speed: 0.3,
              position: { top: '20vh', left: '0', width: '49.31%', height: '473px', zIndex: 1 } },
            { type: 'text', content: 'La luz se apaga. Todos cierran los ojos. El sonido se convierte en el único guía.', speed: 0,
              position: { top: '25vh', left: '42.29%', width: '32.43%', height: 'auto', zIndex: 2 } },
          ]
        },
        // Center-right + small left + text
        {
          id: 'scattered-1',
          minHeight: '100vh',
          layers: [
            { type: 'image', src: '/mutek/Still_180240_1.5.1.jpg', speed: 0.3,
              position: { top: '5vh', left: '42.29%', width: '57.71%', height: '467px', zIndex: 1 } },
            { type: 'image', src: '/mutek/Still_180240_1.26.1.jpg', speed: 0.6,
              position: { top: '40vh', left: '25.35%', width: '23.96%', height: '194px', zIndex: 2 } },
            { type: 'text', content: '¿Y qué es un ritual sino una forma de tocar lo sagrado?', speed: 0,
              position: { top: '65vh', left: '46.46%', width: '32.43%', height: 'auto', zIndex: 1 } },
          ]
        },
        // Tall right image + left text
        {
          id: 'tall-right',
          minHeight: '110vh',
          layers: [
            { type: 'text', content: 'La mente creativa necesita un territorio donde las reglas habituales se suspenden.', speed: 0,
              position: { top: '15vh', left: '12.5%', width: '32.43%', height: 'auto', zIndex: 1 } },
            { type: 'image', src: '/mutek/_DSC3347.jpg', speed: 0.4,
              position: { top: '5vh', left: '56.65%', width: '34.95%', height: '755px', zIndex: 1 } },
          ]
        },
        // Center tall + marquee
        {
          id: 'marquee-tall',
          minHeight: '110vh',
          layers: [
            { type: 'image', src: '/mutek/_DSC3435.jpg', speed: 0.4,
              position: { top: '5vh', left: '33.82%', width: '34.95%', height: '755px', zIndex: 1 } },
            { type: 'text', content: 'Esta obra apela a los sentidos que olvidamos que tenemos.', speed: 0,
              position: { top: '75vh', left: '13.96%', width: '32.43%', height: 'auto', zIndex: 1 } },
            { type: 'marquee', content: 'RITUAL — SONIDO — LUZ — CUERPO — PRESENCIA.', speed: 0, multiplier: 22,
              position: { top: '90vh', left: '0', width: '100%', height: '30px', zIndex: 2 } },
          ]
        },
        // Full-width
        {
          id: 'fw-1',
          minHeight: '80vh',
          layers: [
            { type: 'image', src: '/mutek/Still_180240_1.2.2.jpg', speed: 0.2,
              position: { top: '0', left: '0', width: '100%', height: '810px', zIndex: 1 } },
          ]
        },
        // Full-width Mutek2025
        {
          id: 'mutek-wide',
          minHeight: '80vh',
          layers: [
            { type: 'image', src: '/mutek/Mutek2025.jpg', speed: 0.2,
              position: { top: '0', left: '0', width: '100%', height: '810px', zIndex: 1 } },
          ]
        },
        // Closing — centered image + text
        {
          id: 'closing',
          minHeight: '100vh',
          layers: [
            { type: 'text', content: 'Una posibilidad de trascendencia.', speed: 0,
              position: { top: '2vh', left: '59.17%', width: '32.43%', height: 'auto', zIndex: 1 } },
            { type: 'image', src: '/mutek/Still_180240_1.1.1.jpg', speed: 0.3,
              position: { top: '20vh', left: '21.11%', width: '57.71%', height: '467px', zIndex: 1 } },
            { type: 'text', content: 'Y aún apagada, espera, al próximo ritual.', speed: 0,
              position: { top: '80vh', left: '42.22%', width: '53.54%', height: 'auto', zIndex: 1 } },
          ]
        },
        // Credits
        {
          id: 'credits',
          minHeight: '60vh',
          layers: [
            { type: 'credits' as const, speed: 0.4, credits: [
              { role: 'Dirección de Arte', name: 'Constanza Schwartz' },
            ],
              position: { top: '10vh', left: '0', width: '100%', height: 'auto', zIndex: 1 } },
          ]
        },
      ]
    },
  },

  // ─────────────────────────────────────────────────────────
  // DESIGN WEEK MEXICO
  // ─────────────────────────────────────────────────────────
  {
    date: '2025',
    title: 'DESIGN WEEK MEXICO',
    slug: 'design-week-mexico',
    image: '/design-week-mexico/DESIGNWEEKMEXICO_espigas_portada.jpg',
    category: 'Instalación',
    parallaxConfig: {
      sections: [
        // Hero — narrow centered sculpture
        {
          id: 'hero',
          minHeight: '115vh',
          layers: [
            { type: 'image', src: '/design-week-mexico/DESIGNWEEKMEXICO_espigas_portada.jpg', speed: 0.8, isHero: true,
              position: { top: '80px', left: 'calc(50% - 130px)', width: '259px', height: '530px', zIndex: 1 } },
            { type: 'marquee', content: 'INSTALACIÓN.', speed: 0, multiplier: 22,
              position: { top: '86vh', left: '0', width: '100%', height: '72px', zIndex: 2 } },
          ]
        },
        // Offset pair 1 — staggered
        {
          id: 'offset-1',
          minHeight: '110vh',
          layers: [
            { type: 'image', src: '/design-week-mexico/COMITE_CDMX0804.jpg', speed: 0.4,
              position: { top: '5vh', left: '38.06%', width: '40.83%', height: '392px', zIndex: 1 } },
            { type: 'image', src: '/design-week-mexico/COMITE_CDMX0828.jpg', speed: 0.6,
              position: { top: '20vh', left: '12.64%', width: '32.43%', height: '700px', zIndex: 2 } },
          ]
        },
        // Offset pair 2 — equal size
        {
          id: 'offset-2',
          minHeight: '130vh',
          layers: [
            { type: 'image', src: '/design-week-mexico/COMITE_CDMX0800.jpg', speed: 0.3,
              position: { top: '5vh', left: '63.33%', width: '32.43%', height: '700px', zIndex: 1 } },
            { type: 'image', src: '/design-week-mexico/COMITE_CDMX0850.jpg', speed: 0.5,
              position: { top: '45vh', left: '33.75%', width: '32.43%', height: '700px', zIndex: 2 } },
          ]
        },
        // Full-width + scattered smalls
        {
          id: 'scattered-fw',
          minHeight: '150vh',
          layers: [
            { type: 'image', src: '/design-week-mexico/COMITE_CDMX0855.jpg', speed: 0.6,
              position: { top: '3vh', left: '8.47%', width: '32.43%', height: '312px', zIndex: 2 } },
            { type: 'image', src: '/design-week-mexico/COMITE_CDMX0826.jpg', speed: 0.2,
              position: { top: '20vh', left: '0', width: '100%', height: '960px', zIndex: 1 } },
            { type: 'image', src: '/design-week-mexico/COMITE_CDMX0877.jpg', speed: 0.5,
              position: { top: '85vh', left: '59.17%', width: '32.43%', height: '311px', zIndex: 2 } },
          ]
        },
        // 3-column masked cascade
        {
          id: 'staggered-3col',
          minHeight: '120vh',
          layers: [
            { type: 'image', src: '/design-week-mexico/Ensayo_de_Espejismo_J.jpg', speed: 0.3,
              position: { top: '5vh', left: '4.24%', width: '23.96%', height: '518px', zIndex: 1 } },
            { type: 'image', src: '/design-week-mexico/Ensayo_de_Espejismo_E.jpg', speed: 0.5,
              position: { top: '20vh', left: '37.99%', width: '23.96%', height: '518px', zIndex: 2 } },
            { type: 'image', src: '/design-week-mexico/Ensayo_de_Espejismo_I.jpg', speed: 0.7,
              position: { top: '38vh', left: '71.81%', width: '23.96%', height: '518px', zIndex: 3 } },
          ]
        },
        // Credits
        {
          id: 'credits',
          minHeight: '60vh',
          layers: [
            { type: 'credits' as const, speed: 0.4, credits: [
              { role: 'Instalación', name: 'Constanza Schwartz' },
            ],
              position: { top: '10vh', left: '0', width: '100%', height: 'auto', zIndex: 1 } },
          ]
        },
      ]
    },
  },

  // ─────────────────────────────────────────────────────────
  // ECO AL INFINITO
  // ─────────────────────────────────────────────────────────
  {
    date: '2025',
    title: 'ECO AL INFINITO',
    slug: 'eco-al-infinito',
    image: '/eco-al-infinito/DSC_0664.jpg',
    category: 'Fotografía de Obra',
    parallaxConfig: {
      sections: [
        // Hero
        {
          id: 'hero',
          minHeight: '115vh',
          layers: [
            { type: 'image', src: '/eco-al-infinito/DSC_0664.jpg', speed: 0.8, isHero: true,
              position: { top: '80px', left: '4.25%', width: '91.5%', height: '561px', zIndex: 1 } },
            { type: 'marquee', content: 'FOTOGRAFÍA DE OBRA.', speed: 0, multiplier: 22,
              position: { top: '86vh', left: '0', width: '100%', height: '72px', zIndex: 2 } },
          ]
        },
        // Text block
        {
          id: 'text-intro',
          minHeight: '40vh',
          layers: [
            { type: 'text', content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.', speed: 0,
              position: { top: '5vh', left: '63.61%', width: '32.43%', height: 'auto', zIndex: 1 } },
          ]
        },
        // 3-image asymmetric scattered
        {
          id: 'scattered-trio',
          minHeight: '130vh',
          layers: [
            { type: 'image', src: '/eco-al-infinito/DSC_0625.jpg', speed: 0.3,
              position: { top: '5vh', left: '8.47%', width: '23.96%', height: '517px', zIndex: 1 } },
            { type: 'image', src: '/eco-al-infinito/DSC_0753.jpg', speed: 0.5,
              position: { top: '45vh', left: '28.19%', width: '32.43%', height: '312px', zIndex: 2 } },
            { type: 'image', src: '/eco-al-infinito/DSC_0627.jpg', speed: 0.7,
              position: { top: '60vh', left: '50.63%', width: '40.83%', height: '392px', zIndex: 3 } },
          ]
        },
        // Single tall left-offset
        {
          id: 'tall-single',
          minHeight: '100vh',
          layers: [
            { type: 'image', src: '/eco-al-infinito/DSC_0678.jpg', speed: 0.3,
              position: { top: '5vh', left: '16.94%', width: '40.83%', height: '882px', zIndex: 1 } },
          ]
        },
        // Staggered pair — right-top, left-bottom
        {
          id: 'offset-1',
          minHeight: '100vh',
          layers: [
            { type: 'image', src: '/eco-al-infinito/DSC_0849.jpg', speed: 0.3,
              position: { top: '5vh', left: '59.17%', width: '32.43%', height: '700px', zIndex: 1 } },
            { type: 'image', src: '/eco-al-infinito/DSC_0462.jpg', speed: 0.5,
              position: { top: '55vh', left: '33.82%', width: '32.43%', height: '311px', zIndex: 2 } },
          ]
        },
        // Full-width
        {
          id: 'fw-1',
          minHeight: '90vh',
          layers: [
            { type: 'image', src: '/eco-al-infinito/DSC_1065.jpg', speed: 0.2,
              position: { top: '0', left: '0', width: '100%', height: '960px', zIndex: 1 } },
          ]
        },
        // Offset pair — left-upper, right-lower
        {
          id: 'offset-2',
          minHeight: '80vh',
          layers: [
            { type: 'image', src: '/eco-al-infinito/DSC_0654.jpg', speed: 0.3,
              position: { top: '5vh', left: '8.4%', width: '32.43%', height: '311px', zIndex: 1 } },
            { type: 'image', src: '/eco-al-infinito/DSC_0623.jpg', speed: 0.5,
              position: { top: '30vh', left: '33.82%', width: '32.43%', height: '312px', zIndex: 2 } },
          ]
        },
        // Wide pair — right-top, left-bottom (710x473)
        {
          id: 'wide-pair',
          minHeight: '110vh',
          layers: [
            { type: 'image', src: '/eco-al-infinito/DSC_0649.jpg', speed: 0.3,
              position: { top: '5vh', left: '46.46%', width: '49.31%', height: '473px', zIndex: 1 } },
            { type: 'image', src: '/eco-al-infinito/DSC_0730.jpg', speed: 0.5,
              position: { top: '50vh', left: '4.24%', width: '49.31%', height: '473px', zIndex: 2 } },
          ]
        },
        // Offset pair — left-lower, right-upper
        {
          id: 'offset-3',
          minHeight: '80vh',
          layers: [
            { type: 'image', src: '/eco-al-infinito/DSC_0570.jpg', speed: 0.3,
              position: { top: '5vh', left: '59.24%', width: '32.43%', height: '311px', zIndex: 1 } },
            { type: 'image', src: '/eco-al-infinito/DSC_0845.jpg', speed: 0.5,
              position: { top: '30vh', left: '33.82%', width: '32.43%', height: '312px', zIndex: 2 } },
          ]
        },
        // 3-column cascade
        {
          id: 'staggered-3col',
          minHeight: '120vh',
          layers: [
            { type: 'image', src: '/eco-al-infinito/DSC_1052.jpg', speed: 0.3,
              position: { top: '5vh', left: '4.24%', width: '23.96%', height: '517px', zIndex: 1 } },
            { type: 'image', src: '/eco-al-infinito/DSC_0738.jpg', speed: 0.5,
              position: { top: '20vh', left: '37.99%', width: '23.96%', height: '517px', zIndex: 2 } },
            { type: 'image', src: '/eco-al-infinito/DSC_0616.jpg', speed: 0.7,
              position: { top: '38vh', left: '71.81%', width: '23.96%', height: '517px', zIndex: 3 } },
          ]
        },
        // Full-width
        {
          id: 'fw-2',
          minHeight: '90vh',
          layers: [
            { type: 'image', src: '/eco-al-infinito/DSC_1009.jpg', speed: 0.2,
              position: { top: '0', left: '0', width: '100%', height: '960px', zIndex: 1 } },
          ]
        },
        // 2-image vertical overlap
        {
          id: 'overlap-1',
          minHeight: '130vh',
          layers: [
            { type: 'image', src: '/eco-al-infinito/DSC_0629.jpg', speed: 0.3,
              position: { top: '5vh', left: '21.11%', width: '32.43%', height: '700px', zIndex: 1 } },
            { type: 'image', src: '/eco-al-infinito/DSC_1004.jpg', speed: 0.5,
              position: { top: '50vh', left: '46.46%', width: '32.43%', height: '700px', zIndex: 2 } },
          ]
        },
        // Single wide left-offset
        {
          id: 'medium-left',
          minHeight: '70vh',
          layers: [
            { type: 'image', src: '/eco-al-infinito/DSC_0847.jpg', speed: 0.3,
              position: { top: '5vh', left: '4.24%', width: '57.71%', height: '554px', zIndex: 1 } },
          ]
        },
        // 2-image diagonal — left-lower, right-upper
        {
          id: 'overlap-2',
          minHeight: '110vh',
          layers: [
            { type: 'image', src: '/eco-al-infinito/DSC_0492.jpg', speed: 0.4,
              position: { top: '5vh', left: '63.33%', width: '32.43%', height: '311px', zIndex: 1 } },
            { type: 'image', src: '/eco-al-infinito/DSC_0558.jpg', speed: 0.6,
              position: { top: '25vh', left: '42.22%', width: '32.43%', height: '701px', zIndex: 2 } },
          ]
        },
        // 2-image vertical overlap (mirror)
        {
          id: 'overlap-3',
          minHeight: '130vh',
          layers: [
            { type: 'image', src: '/eco-al-infinito/DSC_0679.jpg', speed: 0.3,
              position: { top: '5vh', left: '8.47%', width: '32.43%', height: '700px', zIndex: 1 } },
            { type: 'image', src: '/eco-al-infinito/DSC_0732.jpg', speed: 0.5,
              position: { top: '50vh', left: '33.82%', width: '32.43%', height: '700px', zIndex: 2 } },
          ]
        },
        // Full-width
        {
          id: 'fw-3',
          minHeight: '90vh',
          layers: [
            { type: 'image', src: '/eco-al-infinito/DSC_1031.jpg', speed: 0.2,
              position: { top: '0', left: '0', width: '100%', height: '960px', zIndex: 1 } },
          ]
        },
        // 2-image diagonal — right overflow, left-top
        {
          id: 'offset-4',
          minHeight: '100vh',
          layers: [
            { type: 'image', src: '/eco-al-infinito/DSC_0345.jpg', speed: 0.4,
              position: { top: '5vh', left: '35.69%', width: '32.43%', height: '311px', zIndex: 1 } },
            { type: 'image', src: '/eco-al-infinito/DSC_0865.jpg', speed: 0.6,
              position: { top: '25vh', left: '58.13%', width: '32.43%', height: '700px', zIndex: 2 } },
          ]
        },
        // 2-image horizontal — left-lower, right-upper
        {
          id: 'offset-5',
          minHeight: '80vh',
          layers: [
            { type: 'image', src: '/eco-al-infinito/DSC_0812.jpg', speed: 0.3,
              position: { top: '5vh', left: '29.58%', width: '32.43%', height: '311px', zIndex: 1 } },
            { type: 'image', src: '/eco-al-infinito/DSC_0809.jpg', speed: 0.5,
              position: { top: '30vh', left: '8.47%', width: '32.43%', height: '311px', zIndex: 2 } },
          ]
        },
        // Staggered pair — right-top, left-bottom
        {
          id: 'offset-6',
          minHeight: '80vh',
          layers: [
            { type: 'image', src: '/eco-al-infinito/DSC_0400.jpg', speed: 0.3,
              position: { top: '5vh', left: '59.1%', width: '32.43%', height: '311px', zIndex: 1 } },
            { type: 'image', src: '/eco-al-infinito/DSC_0853.jpg', speed: 0.5,
              position: { top: '25vh', left: '33.75%', width: '32.43%', height: '312px', zIndex: 2 } },
          ]
        },
        // Diagonal — portrait left-upper, landscape right-lower
        {
          id: 'offset-7',
          minHeight: '100vh',
          layers: [
            { type: 'image', src: '/eco-al-infinito/DSC_0481.jpg', speed: 0.3,
              position: { top: '5vh', left: '8.47%', width: '23.96%', height: '517px', zIndex: 1 } },
            { type: 'image', src: '/eco-al-infinito/DSC_0810.jpg', speed: 0.5,
              position: { top: '45vh', left: '25.35%', width: '32.43%', height: '311px', zIndex: 2 } },
          ]
        },
        // Full-width
        {
          id: 'fw-4',
          minHeight: '90vh',
          layers: [
            { type: 'image', src: '/eco-al-infinito/DSC_0989.jpg', speed: 0.2,
              position: { top: '0', left: '0', width: '100%', height: '960px', zIndex: 1 } },
          ]
        },
        // 2-image overlap — left-top, right-bottom
        {
          id: 'overlap-4',
          minHeight: '110vh',
          layers: [
            { type: 'image', src: '/eco-al-infinito/DSC_0281.jpg', speed: 0.3,
              position: { top: '5vh', left: '37.99%', width: '32.43%', height: '700px', zIndex: 1 } },
            { type: 'image', src: '/eco-al-infinito/DSC_0440.jpg', speed: 0.5,
              position: { top: '60vh', left: '63.13%', width: '32.43%', height: '311px', zIndex: 2 } },
          ]
        },
        // Small offset pair
        {
          id: 'offset-8',
          minHeight: '80vh',
          layers: [
            { type: 'image', src: '/eco-al-infinito/DSC_0795.jpg', speed: 0.3,
              position: { top: '5vh', left: '22.64%', width: '32.43%', height: '311px', zIndex: 1 } },
            { type: 'image', src: '/eco-al-infinito/DSC_0405.jpg', speed: 0.5,
              position: { top: '25vh', left: '8.47%', width: '23.96%', height: '517px', zIndex: 2 } },
          ]
        },
        // Credits
        {
          id: 'credits',
          minHeight: '60vh',
          layers: [
            { type: 'credits' as const, speed: 0.4, credits: [
              { role: 'Fotografía de Obra', name: 'Constanza Schwartz' },
            ],
              position: { top: '10vh', left: '0', width: '100%', height: 'auto', zIndex: 1 } },
          ]
        },
      ]
    },
  },
  // ─────────────────────────────────────────────────────────
  // SILVESTRE Y LA NARANJA "ALTEREGO"
  // ─────────────────────────────────────────────────────────
  {
    date: '2025',
    title: 'ALTEREGO . SILVESTRE Y LA NARANJA',
    slug: 'silvestre-y-la-naranja-alterego',
    image: '/project5/azstill18 1.png',
    category: 'Dirección de Arte',
    parallaxConfig: {
      sections: [
        {
          id: 'hero',
          minHeight: '115vh',
          layers: [
            { type: 'image', src: '/project5/azstill18 1.png', speed: 0.8, isHero: true,
              position: { top: '80px', left: '4.25%', width: '91.5%', height: '561px', zIndex: 1 } },
            { type: 'marquee', content: 'DIRECCIÓN DE ARTE . ALTEREGO', speed: 0, multiplier: 22,
              position: { top: '86vh', left: '0', width: '100%', height: '72px', zIndex: 2 } },
          ]
        },
        {
          id: 'medium-1',
          minHeight: '80vh',
          layers: [
            { type: 'image', src: '/project5/azstill18 1.png', speed: 0.3,
              position: { top: '5vh', left: '16.67%', width: '66.25%', height: '503px', zIndex: 1 } },
          ]
        },
        {
          id: 'fw-video-1',
          minHeight: '80vh',
          type: 'fullwidth-video',
          layers: [
            { type: 'video', src: '/project5/04-azclip1.mp4', speed: 0, autoPlay: true, loop: false, muted: true },
          ]
        },
        {
          id: 'overlap-1',
          minHeight: '90vh',
          layers: [
            { type: 'image', src: '/project5/PHOTO-2025-04-09-14-50-34 1.png', speed: 0.6,
              position: { top: '5vh', left: '45.83%', width: '466px', height: '246px', zIndex: 2 } },
            { type: 'image', src: '/project5/PHOTO-2025-04-09-14-53-45 1.png', speed: 0.2,
              position: { top: '20vh', left: '16.67%', width: '466px', height: '246px', zIndex: 1 } },
          ]
        },
        {
          id: 'scattered',
          minHeight: '300vh',
          layers: [
            { type: 'image', src: '/project5/invstill11 1.png', speed: 0.8,
              position: { top: '2%', left: '8.33%', width: '466px', height: '246px', zIndex: 2 } },
            { type: 'image', src: '/project5/clipinv3 2 1.png', speed: 0,
              position: { top: '12%', left: '0', width: '100%', height: '50vw', zIndex: 1 } },
            { type: 'image', src: '/project5/10 inv 1 1.png', speed: 0.5,
              position: { top: '35%', left: '62.5%', width: '466px', height: '245px', zIndex: 2 } },
            { type: 'image', src: '/project5/invstill4 1.png', speed: 0.3,
              position: { top: '50%', left: 'calc(50% - 233px)', width: '466px', height: '245px', zIndex: 2 } },
            { type: 'image', src: '/project5/invstill6 1.png', speed: 0.7,
              position: { top: '65%', left: '8.33%', width: '466px', height: '245px', zIndex: 2 } },
            { type: 'image', src: '/project5/invstill12 1.png', speed: 0.4,
              position: { top: '80%', left: '58.33%', width: '466px', height: '246px', zIndex: 2 } },
          ]
        },
        {
          id: 'credits',
          minHeight: '60vh',
          layers: [
            { type: 'credits' as const, speed: 0.4, credits: [
              { role: 'Dirección de Arte', name: 'Constanza Schwartz' },
              { role: 'Banda', name: 'Silvestre y la Naranja' },
            ],
              position: { top: '10vh', left: '0', width: '100%', height: 'auto', zIndex: 1 } },
          ]
        },
      ]
    }
  },
]
