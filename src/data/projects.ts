import type { ParallaxConfig, GalleryImage } from '@/src/types/parallax'
import { cldImg, cldVideo } from '@/src/utils/cloudinary'

// ─── Alterego · Silvestre y la Naranja — Cloudinary public IDs ────────────────
const ALT = {
  // images
  1:  'CONSTANZASCHWARTZ_projects_silvestreylanaranja-alterego_1_pomaec',   // 4096x2160 — cone of light (teal)
  2:  'CONSTANZASCHWARTZ_projects_silvestreylanaranja-alterego_2_dd0vyv',   // 4096x2160 — man crouching spotlight
  3:  'CONSTANZASCHWARTZ_projects_silvestreylanaranja-alterego_3_he8yzc',   // 4096x2160 — woman in light
  4:  'CONSTANZASCHWARTZ_projects_silvestreylanaranja-alterego_4_k0hhog',   // 4096x2160 — silhouette back / lyric
  5:  'CONSTANZASCHWARTZ_projects_silvestreylanaranja-alterego_5_uplum8',   // 1600x843  — two figures beam
  6:  'CONSTANZASCHWARTZ_projects_silvestreylanaranja-alterego_6_scxova',   // 1600x843  — man standing spotlight
  7:  'CONSTANZASCHWARTZ_projects_silvestreylanaranja-alterego_7_ikyttd',   // 1080x1920 — orange airplane+band (portrait)
  8:  'CONSTANZASCHWARTZ_projects_silvestreylanaranja-alterego_8_ptszmx',   // 1080x675  — purple band instruments
  9:  'CONSTANZASCHWARTZ_projects_silvestreylanaranja-alterego_9_oezpde',   // 1080x675  — purple band stage
  10: 'CONSTANZASCHWARTZ_projects_silvestreylanaranja-alterego_10_gqrn6m',  // 4096x2160 — red/pink faces close
  11: 'CONSTANZASCHWARTZ_projects_silvestreylanaranja-alterego_11_uhiq0e',  // 4096x2160 — blue neon faces
  12: 'CONSTANZASCHWARTZ_projects_silvestreylanaranja-alterego_12_alkmmk',  // 4096x2160 — blue neon hands
  13: 'CONSTANZASCHWARTZ_projects_silvestreylanaranja-alterego_13_kbeyo9',  // 4096x2160 — orange warm abstract
  14: 'CONSTANZASCHWARTZ_projects_silvestreylanaranja-alterego_14_tewhqd',  // 4096x2160 — blue purple neon
  15: 'CONSTANZASCHWARTZ_projects_silvestreylanaranja-alterego_15_fpuxzt',  // 1080x1920 — B&W film strip (portrait)
  16: 'CONSTANZASCHWARTZ_projects_silvestreylanaranja-alterego_16_nv8ht4',  // 1080x1920 — dark shadow shots (portrait)
  // videos
  v1: 'CONSTANZASCHWARTZ_projects_silvestreylanaranja-alterego_1_nksue5',   // 4096x2160 — video clip 1
  v2: 'CONSTANZASCHWARTZ_projects_silvestreylanaranja-alterego_2_xn8am8',   // 4096x2160 — video clip 2
  v3: 'CONSTANZASCHWARTZ_projects_silvestreylanaranja-alterego_3_tjwnjv',   // 4096x2160 — video clip 3
  v4: 'CONSTANZASCHWARTZ_projects_silvestreylanaranja-alterego_4_vswfsd',   // 4096x2160 — video clip 4
  v5: 'CONSTANZASCHWARTZ_projects_silvestreylanaranja-alterego_5_rhs2kx',   // 1920x1012 — video clip 5
  v6: 'CONSTANZASCHWARTZ_projects_silvestreylanaranja-alterego_6_uqdkef',   // 1080x1920 — video clip 6 (portrait)
  v7: 'CONSTANZASCHWARTZ_projects_silvestreylanaranja-alterego_7_rdclow',   // 4096x2160 — video clip 7
} as const

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
        // ─── 1. HERO ────────────────────────────────────────────────
        {
          id: 'hero',
          minHeight: '115vh',
          layers: [
            { type: 'image', src: '/project5/azstill18 1.png', speed: 0.8, isHero: true,
              position: { top: '120px', left: '4.25%', width: '91.5%', height: '561px', zIndex: 1 } },
            { type: 'marquee', content: 'DIRECCIÓN DE ARTE Y EFECTOS LUMÍNICOS.', speed: 0, multiplier: 22,
              position: { top: '86vh', left: '0', width: '100%', height: '72px', zIndex: 2 } },
          ]
        },
        // ─── 2. INTRO TEXT ──────────────────────────────────────────
        {
          id: 'intro-text',
          minHeight: '100vh',
          layers: [
            { type: 'text', speed: 0,
              content: 'Dado que la objetividad es un proyecto inalcanzable, Constanza Schwartz crea con el subjetivismo escénico experiencias intensamente subjetivas por las que el espectador participativo puede ir cambiando su inserción y su influencia en su entorno.',
              position: { top: '15vh', left: '8.4%', width: '38%', height: 'auto', zIndex: 1 } },
            { type: 'text', speed: 0,
              content: 'Somos responsables de los mundos que creamos pero solo en la medida en que aceptamos que nuestra contribución y nuestra influencia va a estar guiada por una extrema subjetividad.',
              position: { top: '15vh', left: '54%', width: '38%', height: 'auto', zIndex: 1 } },
          ]
        },
        // ─── 3. COLLAGE 1 ───────────────────────────────────────────
        {
          id: 'collage-1',
          minHeight: '130vh',
          layers: [
            { type: 'image', src: '/project5/azstill18 1.png', speed: 0.25,
              position: { top: '5vh', left: '4.25%', width: '49.31%', height: '480px', zIndex: 1 } },
            { type: 'image', src: '/project5/St1-07 1.png', speed: 0.45,
              position: { top: '20vh', left: '55.5%', width: '40.25%', height: '380px', zIndex: 2 } },
            { type: 'image', src: '/project5/invstill11 1.png', speed: 0.3,
              position: { top: '65vh', left: '4.25%', width: '32.43%', height: '360px', zIndex: 1 } },
            { type: 'image', src: '/project5/St1-02 1.png', speed: 0.55,
              position: { top: '55vh', left: '38.5%', width: '57.25%', height: '480px', zIndex: 2 } },
          ]
        },
        // ─── 4. TEXT + IMAGE (reactor nuclear) ─────────────────────
        {
          id: 'text-nuclear',
          minHeight: '110vh',
          layers: [
            { type: 'image', src: '/image5.jpg', speed: 0.3,
              position: { top: '5vh', left: '4.25%', width: '40.83%', height: '680px', zIndex: 1 } },
            { type: 'text', speed: 0,
              content: 'Un reactor nuclear hiperrealista permite acercar nuestro cuerpo, y con él nuestra sensibilidad a una distancia de la fuente radioactiva prohibida hasta hoy. Los horrores de su existencia son velozmente atenuados por un bosque de acrílico, altar en homenaje a nuestros orígenes.',
              position: { top: '20vh', left: '50%', width: '42%', height: 'auto', zIndex: 1 } },
            { type: 'text', speed: 0,
              content: 'Extraños testigos de metal espejados nos acompañan incólumes a lo largo de toda esta instalación siendo una compañía fiel entre las múltiples simbolizaciones abstractas que nos rodean.',
              position: { top: '55vh', left: '50%', width: '42%', height: 'auto', zIndex: 1 } },
          ]
        },
        // ─── 5. BROWN SECTION 1 + VIDEOARTE label ──────────────────
        {
          id: 'brown-1',
          minHeight: '60vh',
          backgroundColor: '#3D2B1F',
          layers: [
            { type: 'text', speed: 0,
              content: 'SOMOS RESPONSABLES DE LOS MUNDOS QUE CREAMOS',
              position: { top: '20vh', left: '8.4%', width: '83%', height: 'auto', zIndex: 1 } },
            { type: 'text', speed: 0,
              content: 'VIDEOARTE',
              position: { top: '40vh', left: '8.4%', width: '30%', height: 'auto', zIndex: 2 } },
          ]
        },
        // ─── 6. FULL-WIDTH VIDEO (Videoarte) ────────────────────────
        {
          id: 'fw-video-1',
          minHeight: '80vh',
          type: 'fullwidth-video',
          layers: [
            { type: 'video', src: '/project5/04-azclip1.mp4', speed: 0, autoPlay: true, loop: false, muted: true },
          ]
        },
        // ─── 7. TEXT + IMAGE (barreras racionales) ──────────────────
        {
          id: 'text-barreras',
          minHeight: '110vh',
          layers: [
            { type: 'text', speed: 0,
              content: 'DERRIBAR LAS BARRERAS RACIONALES QUE IMPIDEN FLUIR NUESTRA CREATIVIDAD.',
              position: { top: '15vh', left: '4.25%', width: '42%', height: 'auto', zIndex: 1 } },
            { type: 'text', speed: 0,
              content: '¿De dónde viene la electricidad que fluye hacia las pantallas de nuestros televisores, notebooks, computadoras, teléfonos? Tan familiares.',
              position: { top: '40vh', left: '4.25%', width: '42%', height: 'auto', zIndex: 1 } },
            { type: 'image', src: '/project5/St1-04 1.png', speed: 0.45,
              position: { top: '5vh', left: '50%', width: '45.75%', height: '620px', zIndex: 2 } },
          ]
        },
        // ─── 8. BROWN SECTION 2 (habitar el planeta) ────────────────
        {
          id: 'brown-2',
          minHeight: '80vh',
          backgroundColor: '#3D2B1F',
          layers: [
            { type: 'text', speed: 0,
              content: '¿CÓMO SEGUIR HABITANDO EL PLANETA? ¿CÓMO SEGUIR HABITANDO EL PLANETA?',
              position: { top: '15vh', left: '8.4%', width: '83%', height: 'auto', zIndex: 1 } },
            { type: 'text', speed: 0,
              content: 'Numerosas cuestiones sobre cómo seguir habitando el planeta quedan abiertas directamente a nuestra sensibilidad sin mediación de palabras.',
              position: { top: '45vh', left: '8.4%', width: '40%', height: 'auto', zIndex: 1 } },
            { type: 'image', src: '/project5/azstill12 1.png', speed: 0.3,
              position: { top: '25vh', left: '52%', width: '40%', height: '420px', zIndex: 2 } },
          ]
        },
        // ─── 9. FULL-WIDTH VIDEO (Making Off) ───────────────────────
        {
          id: 'fw-video-2',
          minHeight: '80vh',
          type: 'fullwidth-video',
          layers: [
            // TODO: reemplazar con video making-off real
            { type: 'video', src: '/project5/04-azclip1.mp4', speed: 0, autoPlay: true, loop: false, muted: true },
          ]
        },
        // ─── 10. COLLAGE FINAL (columnas acrílicas) ─────────────────
        {
          id: 'collage-2',
          minHeight: '120vh',
          layers: [
            { type: 'text', speed: 0,
              content: 'VIDEO MAKING OFF',
              position: { top: '5vh', left: '4.25%', width: '40%', height: 'auto', zIndex: 3 } },
            { type: 'image', src: '/project5/St1-03 1.png', speed: 0.25,
              position: { top: '12vh', left: '4.25%', width: '57.49%', height: '520px', zIndex: 1 } },
            { type: 'image', src: '/project5/invstill11 1.png', speed: 0.45,
              position: { top: '30vh', left: '38%', width: '40.83%', height: '460px', zIndex: 2 } },
            { type: 'image', src: '/project5/St1-07 1.png', speed: 0.6,
              position: { top: '70vh', left: '4.25%', width: '91.5%', height: '440px', zIndex: 1 } },
          ]
        },
        // ─── 11. CREDITS ────────────────────────────────────────────
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
        // ─── 1. HERO ────────────────────────────────────────────────
        {
          id: 'hero',
          minHeight: '115vh',
          layers: [
            { type: 'image', src: '/mutek/_DSC3417.jpg', speed: 0.8, isHero: true,
              position: { top: '120px', left: '4.25%', width: '91.5%', height: '623px', zIndex: 1 } },
            { type: 'marquee', content: 'DIRECCIÓN DE ARTE.', speed: 0, multiplier: 22,
              position: { top: '86vh', left: '0', width: '100%', height: '72px', zIndex: 2 } },
          ]
        },
        // ─── 2. INTRO TEXT ──────────────────────────────────────────
        {
          id: 'intro-text',
          minHeight: '60vh',
          layers: [
            { type: 'text', speed: 0,
              content: 'En el marco del festival internacional Mutek dedicada a la promoción de la música electrónica y las artes digitales en Argentina, como Sideshow, Constanza Schwartz en dupla con Francisco Rousset Osio, crearon un show de música e iluminación ao vivo para los espectadores participativos que se adentraban a la instalación. Convocados por COMITÉ357, este proyecto fue promovido por ARTLAB.',
              position: { top: '15vh', left: '8.33%', width: '466px', height: 'auto', zIndex: 1 } },
          ]
        },
        // ─── 3. PORTRAIT COLUMN + RITUAL TEXT ───────────────────────
        {
          id: 'portrait-column',
          minHeight: '200vh',
          layers: [
            { type: 'image', src: '/mutek/_DSC3417_2.jpg', speed: 0.25,
              position: { top: '5vh', left: '8.33%', width: '467px', height: '700px', zIndex: 1 } },
            { type: 'text', speed: 0,
              content: 'Ritual al Vacío',
              position: { top: '10vh', left: '54.17%', width: '467px', height: 'auto', zIndex: 2 } },
            { type: 'text', speed: 0,
              content: 'Desde nuestros comienzos, protegidos por las cavernas, las llamas danzantes proyectaban juegos de luces sobre las paredes envueltas en imágenes con anhelos de permanencia, creando un mundo de formas efímeras que parecían moverse con vida propia.',
              position: { top: '18vh', left: '54.17%', width: '466px', height: 'auto', zIndex: 2 } },
            { type: 'image', src: '/mutek/_DSC3398.jpg', speed: 0.4,
              position: { top: '55vh', left: '33.33%', width: '467px', height: '700px', zIndex: 1 } },
            { type: 'text', speed: 0,
              content: 'Venimos a este espacio a cuestionar la fijeza de algunas ideas, imágenes, estereotipos divisorios que generan la ilusión de permanencia. Los infinitos puntos que construyen la recta se van a soltar ante nuestros ojos.',
              position: { top: '155vh', left: '54.17%', width: '466px', height: 'auto', zIndex: 2 } },
          ]
        },
        // ─── 4. FULL-WIDTH VIDEO ─────────────────────────────────────
        {
          id: 'fw-video',
          minHeight: '80vh',
          type: 'fullwidth-video',
          layers: [
            { type: 'video', src: '/mutek/Mutek2025.mp4', speed: 0, autoPlay: true, loop: false, muted: true },
          ]
        },
        // ─── 5. TEXT + STILLS ────────────────────────────────────────
        {
          id: 'text-stills',
          minHeight: '130vh',
          layers: [
            { type: 'text', speed: 0,
              content: 'Desarmemos para percibir las engañosas imágenes, recuerdos y asociaciones de las totalidades. El valor de lo oscuro y la luz. Exponernos a habitar la experiencia de integrar la desintegración en nuestras percepciones de los otros y de nosotros mismos.',
              position: { top: '5vh', left: '12.5%', width: '466px', height: 'auto', zIndex: 1 } },
            { type: 'image', src: '/mutek/Still_180240_1.45.1.jpg', speed: 0.3,
              position: { top: '30vh', left: '12.5%', width: '831px', height: '466px', zIndex: 1 } },
            { type: 'image', src: '/mutek/Still_180240_1.8.1.jpg', speed: 0.5,
              position: { top: '80vh', left: '62.5%', width: '345px', height: '194px', zIndex: 2 } },
            { type: 'marquee', content: 'COMO UNA CAVERNA SUSPENDIDA EN LO INVISIBLE, ESTAS FORMAS TRANSLÚCIDAS NO BUSCAN ENCERRAR, SINO EVOCAR.', speed: 0, multiplier: 3,
              position: { top: '110vh', left: '0', width: '100%', height: '30px', zIndex: 2 } },
          ]
        },
        // ─── 6. COLLAGE LEFT-RIGHT ───────────────────────────────────
        {
          id: 'collage-left-right',
          minHeight: '180vh',
          layers: [
            { type: 'image', src: '/mutek/_DSC3353.jpg', speed: 0.25,
              position: { top: '5vh', left: '4.24%', width: '710px', height: '473px', zIndex: 1 } },
            { type: 'text', speed: 0,
              content: 'La luz se apaga, todo se disuelve.\nLa caverna desaparece, el ritmo se interrumpe.\nY en ese vaivén constante,\nse funda un nuevo ritual:\nun Ritual al Vacío.',
              position: { top: '30vh', left: '41.67%', width: '467px', height: 'auto', zIndex: 2 } },
            { type: 'image', src: '/mutek/Still_180240_1.5.1.jpg', speed: 0.4,
              position: { top: '60vh', left: '42.29%', width: '831px', height: '467px', zIndex: 1 } },
            { type: 'image', src: '/mutek/Still_180240_1.26.1.jpg', speed: 0.6,
              position: { top: '100vh', left: '25%', width: '345px', height: '194px', zIndex: 2 } },
            { type: 'text', speed: 0,
              content: '¿Y qué es un ritual cuando ya no convoca, cuando no transforma, cuando sólo queda la forma vacía como una piel transparente, invisible colgando del tiempo?',
              position: { top: '130vh', left: '45.83%', width: '467px', height: 'auto', zIndex: 2 } },
          ]
        },
        // ─── 7. TEXT + PORTRAIT + MARQUEE ───────────────────────────
        {
          id: 'text-portrait',
          minHeight: '160vh',
          layers: [
            { type: 'image', src: '/mutek/_DSC3347.jpg', speed: 0.25,
              position: { top: '5vh', left: '58.33%', width: '467px', height: '700px', zIndex: 1 } },
            { type: 'text', speed: 0,
              content: 'La mente creativa no ve en un cuenco vacío algo sin valor, sino que lo percibe como algo en un estado transitorio, a la espera del contenido que terminará por colmarlo. El vacío no es algo inexistente, sino un elemento eminentemente dinámico y activo.',
              position: { top: '10vh', left: '12.5%', width: '467px', height: 'auto', zIndex: 2 } },
            { type: 'image', src: '/mutek/_DSC3435.jpg', speed: 0.4,
              position: { top: '40vh', left: '33.33%', width: '467px', height: '701px', zIndex: 1 } },
            { type: 'marquee', content: 'EL VACÍO NO ES ALGO INEXISTENTE, SINO UN ELEMENTO EMINENTEMENTE DINÁMICO Y ACTIVO.', speed: 0, multiplier: 4,
              position: { top: '55vh', left: '0', width: '100%', height: '30px', zIndex: 2 } },
            { type: 'text', speed: 0,
              content: 'Esta obra apela al lugar donde se operan las transformaciones. Identificar sentimientos que van desde la ambigüedad hasta la ansiedad, el temor, la angustia, ser descartable y reflexionar sobre las situaciones que debemos enfrentar permanentemente en la compleja modernidad de nuestros tiempos.',
              position: { top: '125vh', left: '12.5%', width: '467px', height: 'auto', zIndex: 2 } },
          ]
        },
        // ─── 8. FULL-WIDTH IMAGE + TEXT ─────────────────────────────
        {
          id: 'fw-image-text',
          minHeight: '120vh',
          layers: [
            { type: 'image', src: '/mutek/Still_180240_1.2.2.jpg', speed: 0.15,
              position: { top: '5vh', left: '0', width: '100%', height: '810px', zIndex: 1 } },
            { type: 'text', speed: 0,
              content: 'Una posibilidad. Como umbral donde el símbolo se repite hasta volverse ausencia, y la ausencia, nuevamente, forma.',
              position: { top: '100vh', left: '58.33%', width: '467px', height: 'auto', zIndex: 2 } },
          ]
        },
        // ─── 9. CLOSING STILL + TEXT ────────────────────────────────
        {
          id: 'closing-still',
          minHeight: '120vh',
          layers: [
            { type: 'image', src: '/mutek/Still_180240_1.1.1.jpg', speed: 0.3,
              position: { top: '5vh', left: 'calc(50% - 415px)', width: '831px', height: '467px', zIndex: 1 } },
            { type: 'text', speed: 0,
              content: 'La caverna de luz que sólo existe cuando se enciende.',
              position: { top: '80vh', left: '8.33%', width: '466px', height: 'auto', zIndex: 2 } },
          ]
        },
        // ─── 10. CAROUSEL ───────────────────────────────────────────
        {
          id: 'carousel',
          height: '331px',
          type: 'carousel',
          layers: [
            { type: 'image', src: '/mutek/Still_180240_1.47.1.jpg', speed: 0, alt: 'Mutek Still 1.47' },
            { type: 'image', src: '/mutek/Still_180240_2.2.2.jpg', speed: 0, alt: 'Mutek Still 2.2.2' },
            { type: 'image', src: '/mutek/Still_180240_1.3.1.jpg', speed: 0, alt: 'Mutek Still 1.3' },
            { type: 'image', src: '/mutek/Still_180240_1.7.1.jpg', speed: 0, alt: 'Mutek Still 1.7' },
            { type: 'image', src: '/mutek/Still_180240_1.40.1.jpg', speed: 0, alt: 'Mutek Still 1.40' },
            { type: 'image', src: '/mutek/Still_180240_1.36.1.jpg', speed: 0, alt: 'Mutek Still 1.36' },
          ]
        },
        // ─── 11. CLOSING TEXT ───────────────────────────────────────
        {
          id: 'closing-text',
          minHeight: '50vh',
          layers: [
            { type: 'text', speed: 0,
              content: 'Y aún apagada, espera, al próximo ritual.',
              position: { top: '15vh', left: '41.67%', width: '771px', height: 'auto', zIndex: 1 } },
          ]
        },
        // ─── 12. CREDITS ────────────────────────────────────────────
        {
          id: 'credits',
          minHeight: '60vh',
          layers: [
            { type: 'credits' as const, speed: 0.4, credits: [
              { role: 'Dirección de Arte y Show de Iluminación', name: 'Constanza Schwartz & Francisco Rousset Osio' },
              { role: 'Festival', name: 'MUTEK Argentina 2025' },
              { role: 'Convocado por', name: 'COMITÉ357' },
              { role: 'Promovido por', name: 'ARTLAB' },
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
        // ─── 1. HERO — escultura centrada angosta ───────────────────
        {
          id: 'hero',
          minHeight: '115vh',
          layers: [
            { type: 'image', src: '/design-week-mexico/DESIGNWEEKMEXICO_espigas_portada.jpg', speed: 0.8, isHero: true,
              position: { top: '120px', left: 'calc(50% - 146px)', width: '291px', height: '595px', zIndex: 1 } },
            { type: 'marquee', content: 'INSTALACIÓN.', speed: 0, multiplier: 22,
              position: { top: '86vh', left: '0', width: '100%', height: '72px', zIndex: 2 } },
          ]
        },
        // ─── 2. INTRO TEXT — dos columnas ───────────────────────────
        {
          id: 'intro-text',
          minHeight: '60vh',
          layers: [
            { type: 'text', speed: 0,
              content: 'En el marco de Design Week Mexico 2025, Argentina fue el país invitado. Constanza Schwartz bajo la representación de Comité357, fue una de las artistas seleccionadas para representar al país con Ensayo de Espejismo, híbrido entre objeto espejo y escultura.',
              position: { top: '15vh', left: '12.5%', width: '466px', height: 'auto', zIndex: 1 } },
            { type: 'text', speed: 0,
              content: 'Título: Ensayo de Espejismo\nAño: 2025\nMateriales: Acero Pulido y Cromado, Madera.\nMedidas: 2.10 x 0.72 x 0.30 x 0.16 mts.',
              position: { top: '15vh', left: '62.5%', width: '345px', height: 'auto', zIndex: 1 } },
          ]
        },
        // ─── 3. COLLAGE 1 — CDMX0828 + CDMX0804 ────────────────────
        {
          id: 'collage-1',
          minHeight: '130vh',
          layers: [
            { type: 'image', src: '/design-week-mexico/COMITE_CDMX0804.jpg', speed: 0.35,
              position: { top: '5vh', left: '54.17%', width: '588px', height: '392px', zIndex: 1 } },
            { type: 'image', src: '/design-week-mexico/COMITE_CDMX0828.jpg', speed: 0.5,
              position: { top: '20vh', left: '29.17%', width: '467px', height: '700px', zIndex: 2 } },
          ]
        },
        // ─── 4. STATEMENT ───────────────────────────────────────────
        {
          id: 'statement',
          minHeight: '80vh',
          layers: [
            { type: 'text', speed: 0,
              content: 'Statement',
              position: { top: '10vh', left: '12.5%', width: '765px', height: 'auto', zIndex: 1 } },
            { type: 'text', speed: 0,
              content: 'Pocas personas desconocen totalmente los órganos de los sentidos, pero no todas comprenden la magnitud que tienen en nuestra conexión con el mundo. Se podría decir entonces que un grupo de fantasmas (los sentidos) dirigen toda nuestra vida y desde ya nuestra conexión con el arte, el diseño.',
              position: { top: '25vh', left: '12.5%', width: '466px', height: 'auto', zIndex: 1 } },
          ]
        },
        // ─── 5. COLLAGE 2 + MARQUEE ─────────────────────────────────
        {
          id: 'collage-2-marquee',
          minHeight: '200vh',
          layers: [
            { type: 'image', src: '/design-week-mexico/COMITE_CDMX0800.jpg', speed: 0.3,
              position: { top: '5vh', left: '62.5%', width: '467px', height: '700px', zIndex: 2 } },
            { type: 'image', src: '/design-week-mexico/COMITE_CDMX0850.jpg', speed: 0.5,
              position: { top: '55vh', left: '33.33%', width: '467px', height: '700px', zIndex: 1 } },
            { type: 'marquee', content: 'UN GRUPO DE FANTASMAS (LOS SENTIDOS) DIRIGEN TODA NUESTRA VIDA Y DESDE YA NUESTRA CONEXIÓN CON EL ARTE, EL DISEÑO.', speed: 0, multiplier: 3,
              position: { top: '165vh', left: '0', width: '100%', height: '30px', zIndex: 2 } },
          ]
        },
        // ─── 6. TEXT + CAROUSEL ─────────────────────────────────────
        {
          id: 'text-pre-carousel',
          minHeight: '60vh',
          layers: [
            { type: 'text', speed: 0,
              content: 'Esta obra, híbrido entre objeto espejo y escultura, tiene el propósito de hacer consiente para el participante de esta conexión oculta y trascendental. Combinados testigos de acero pulido y cromados, su comportamiento en función a sus efectos ópticos, relación con su entorno y efectos lumínicos, permite establecer una posibilidad de diálogo donde una forma concreta desvanece sus límites.',
              position: { top: '10vh', left: '54.17%', width: '466px', height: 'auto', zIndex: 1 } },
          ]
        },
        {
          id: 'carousel',
          height: '331px',
          type: 'carousel',
          layers: [
            { type: 'image', src: '/design-week-mexico/Ensayo_de_Espejismo_C.jpg', speed: 0, alt: 'Ensayo de Espejismo C' },
            { type: 'image', src: '/design-week-mexico/Ensayo_de_Espejismo_K.jpg', speed: 0, alt: 'Ensayo de Espejismo K' },
            { type: 'image', src: '/design-week-mexico/Ensayo_de_Espejismo_A.jpg', speed: 0, alt: 'Ensayo de Espejismo A' },
            { type: 'image', src: '/design-week-mexico/Ensayo_de_Espejismo_L.jpg', speed: 0, alt: 'Ensayo de Espejismo L' },
            { type: 'image', src: '/design-week-mexico/Ensayo_de_Espejismo_D.jpg', speed: 0, alt: 'Ensayo de Espejismo D' },
            { type: 'image', src: '/design-week-mexico/Ensayo_de_Espejismo_I.jpg', speed: 0, alt: 'Ensayo de Espejismo I' },
          ]
        },
        // ─── 7. FULL-WIDTH + SCATTERED SMALLS + MARQUEE ─────────────
        {
          id: 'fw-scatter',
          minHeight: '150vh',
          layers: [
            { type: 'image', src: '/design-week-mexico/COMITE_CDMX0855.jpg', speed: 0.6,
              position: { top: '3vh', left: '25%', width: '467px', height: '312px', zIndex: 2 } },
            { type: 'marquee', content: 'ES POSIBLE PERCIBIR UN UNIVERSO SIMBÓLICO EN UNA BÚSQUEDA POR LA DILUCIÓN DE LAS LÍNEAS DIVISORIAS ENTRE LO ARTÍSTICO Y LO COTIDIANO.', speed: 0, multiplier: 3,
              position: { top: '14vh', left: '0', width: '100%', height: '30px', zIndex: 2 } },
            { type: 'image', src: '/design-week-mexico/COMITE_CDMX0826.jpg', speed: 0.2,
              position: { top: '20vh', left: '0', width: '100%', height: '960px', zIndex: 1 } },
            { type: 'image', src: '/design-week-mexico/COMITE_CDMX0877.jpg', speed: 0.5,
              position: { top: '120vh', left: '75%', width: '467px', height: '311px', zIndex: 2 } },
          ]
        },
        // ─── 8. TEXT NARRATIVO ───────────────────────────────────────
        {
          id: 'text-narrative',
          minHeight: '80vh',
          layers: [
            { type: 'text', speed: 0,
              content: 'El espejo nos permite a veces intuir que el cuerpo está presente. En este caso, la conformación de la estructura permite fragmentar las imágenes que se presentan ante él, imágenes que suelen estar unidas pero que en este juego de repetición, de llenos y de vacíos, es posible percibir un universo simbólico en una búsqueda por la dilución de las líneas divisorias entre lo artístico y lo cotidiano, la imagen y el símbolo.',
              position: { top: '10vh', left: '54.17%', width: '466px', height: 'auto', zIndex: 1 } },
          ]
        },
        // ─── 9. 3 RETRATOS EN CASCADA ────────────────────────────────
        {
          id: 'staggered-portraits',
          minHeight: '120vh',
          layers: [
            { type: 'image', src: '/design-week-mexico/Ensayo_de_Espejismo_J.jpg', speed: 0.3,
              position: { top: '5vh', left: '4.17%', width: '345px', height: '518px', zIndex: 1 } },
            { type: 'image', src: '/design-week-mexico/Ensayo_de_Espejismo_E.jpg', speed: 0.5,
              position: { top: '22vh', left: '37.5%', width: '345px', height: '518px', zIndex: 2 } },
            { type: 'image', src: '/design-week-mexico/Ensayo_de_Espejismo_I2.jpg', speed: 0.7,
              position: { top: '42vh', left: '70.83%', width: '345px', height: '518px', zIndex: 3 } },
          ]
        },
        // ─── 10. MARQUEE + TEXTO FINAL ──────────────────────────────
        {
          id: 'text-final',
          minHeight: '80vh',
          layers: [
            { type: 'marquee', content: 'INTENTA FRACTURAR LA COMPLACENCIA CON LA INDUSTRIALIZACIÓN Y LA TECNIFICACIÓN QUE TOMAMOS POR NATURALEZA DEL SIGLO XXI.', speed: 0, multiplier: 3,
              position: { top: '5vh', left: '0', width: '100%', height: '30px', zIndex: 2 } },
            { type: 'text', speed: 0,
              content: 'Ensayo de Espejismo busca apelar a varios sentidos en simultáneo. Asimismo, intenta fracturar la complacencia con la industrialización y la tecnificación que tomamos por naturaleza del siglo XXI. Esta es una obra que resalta la confusión de un acabado "de máquina", "perfecto" cuando su proceso es único y enteramente artesanal.',
              position: { top: '15vh', left: '12.5%', width: '467px', height: 'auto', zIndex: 1 } },
          ]
        },
        // ─── 11. CREDITS ────────────────────────────────────────────
        {
          id: 'credits',
          minHeight: '60vh',
          layers: [
            { type: 'credits' as const, speed: 0.4, credits: [
              { role: 'Artista', name: 'Constanza Schwartz' },
              { role: 'Representada por', name: 'Comité357' },
              { role: 'Evento', name: 'Design Week Mexico 2025' },
              { role: 'País Invitado', name: 'Argentina' },
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
        // ─── 1. HERO ────────────────────────────────────────────────
        {
          id: 'hero',
          minHeight: '115vh',
          layers: [
            { type: 'image', src: '/eco-al-infinito/DSC_0664.jpg', speed: 0.8, isHero: true,
              position: { top: '120px', left: '4.25%', width: '91.5%', height: '561px', zIndex: 1 } },
            { type: 'marquee', content: 'FOTOGRAFÍA DE OBRA.', speed: 0, multiplier: 22,
              position: { top: '86vh', left: '0', width: '100%', height: '72px', zIndex: 2 } },
          ]
        },
        // ─── 2. INTRO TEXT + SCATTERED TRIO ─────────────────────────
        {
          id: 'intro-scattered',
          minHeight: '160vh',
          layers: [
            { type: 'text', speed: 0,
              content: 'Si nombramos al nuevo cerebro, es porque él cambió. Y mucho. No es más ese conjunto de neuronas que no cede en su lucha por mantenernos vivos. Ha pasado años sumergido en las incontables marejadas de tecnología que nos abruma sin piedad desde que pusimos un caballo delante de un arado.',
              position: { top: '5vh', left: '8.33%', width: '463px', height: 'auto', zIndex: 1 } },
            { type: 'image', src: '/eco-al-infinito/DSC_0625.jpg', speed: 0.3,
              position: { top: '10vh', left: '8.47%', width: '345px', height: '517px', zIndex: 2 } },
            { type: 'image', src: '/eco-al-infinito/DSC_0753.jpg', speed: 0.5,
              position: { top: '40vh', left: '33.33%', width: '467px', height: '312px', zIndex: 2 } },
            { type: 'image', src: '/eco-al-infinito/DSC_0627.jpg', speed: 0.35,
              position: { top: '60vh', left: '54.17%', width: '588px', height: '392px', zIndex: 1 } },
          ]
        },
        // ─── 3. TALL SINGLE + TEXT ───────────────────────────────────
        {
          id: 'tall-text',
          minHeight: '130vh',
          layers: [
            { type: 'image', src: '/eco-al-infinito/DSC_0678.jpg', speed: 0.3,
              position: { top: '5vh', left: '16.94%', width: '588px', height: '882px', zIndex: 1 } },
            { type: 'text', speed: 0,
              content: 'Constanza Schwartz tampoco cede, y contestará a la tecnología con más esfuerzo humano. De este modo, surgirán espacios que realmente nos transportan a sitios dentro de nuestro universo a los que no llegamos a menudo. Solo lo haremos guiados por la creatividad y su inclemente convocatoria de presencias arcaicas y míticas, figuras atemporales, intensas, al mismo tiempo, conmovedoras y abstractas.',
              position: { top: '45vh', left: '58.33%', width: '467px', height: 'auto', zIndex: 2 } },
          ]
        },
        // ─── 4. OFFSET PAIR + TEXT ───────────────────────────────────
        {
          id: 'offset-1',
          minHeight: '110vh',
          layers: [
            { type: 'image', src: '/eco-al-infinito/DSC_0849.jpg', speed: 0.3,
              position: { top: '5vh', left: '59.17%', width: '467px', height: '700px', zIndex: 1 } },
            { type: 'image', src: '/eco-al-infinito/DSC_0462.jpg', speed: 0.5,
              position: { top: '35vh', left: '33.33%', width: '467px', height: '311px', zIndex: 2 } },
          ]
        },
        // ─── 5. FULL-WIDTH IMAGE ─────────────────────────────────────
        {
          id: 'fw-1',
          minHeight: '90vh',
          layers: [
            { type: 'image', src: '/eco-al-infinito/DSC_1065.jpg', speed: 0.2,
              position: { top: '0', left: '0', width: '100%', height: '960px', zIndex: 1 } },
          ]
        },
        // ─── 6. OFFSET PAIR + TEXT ───────────────────────────────────
        {
          id: 'offset-2-text',
          minHeight: '110vh',
          layers: [
            { type: 'image', src: '/eco-al-infinito/DSC_0654.jpg', speed: 0.3,
              position: { top: '5vh', left: '8.4%', width: '467px', height: '311px', zIndex: 1 } },
            { type: 'image', src: '/eco-al-infinito/DSC_0623.jpg', speed: 0.5,
              position: { top: '30vh', left: '33.33%', width: '467px', height: '312px', zIndex: 2 } },
            { type: 'text', speed: 0,
              content: 'Al desplazarnos por vacíos y llenos, imposibles convergencias, nos conmovemos al tiempo que nos transformamos en cultores y espectadores participativos de su obra.',
              position: { top: '70vh', left: '8.33%', width: '466px', height: 'auto', zIndex: 3 } },
          ]
        },
        // ─── 7. WIDE PAIR ────────────────────────────────────────────
        {
          id: 'wide-pair',
          minHeight: '120vh',
          layers: [
            { type: 'image', src: '/eco-al-infinito/DSC_0649.jpg', speed: 0.3,
              position: { top: '5vh', left: '46.46%', width: '710px', height: '473px', zIndex: 1 } },
            { type: 'image', src: '/eco-al-infinito/DSC_0730.jpg', speed: 0.5,
              position: { top: '50vh', left: '4.24%', width: '710px', height: '473px', zIndex: 2 } },
          ]
        },
        // ─── 8. OFFSET PAIR + FULL-WIDTH ─────────────────────────────
        {
          id: 'offset-3-fw',
          minHeight: '120vh',
          layers: [
            { type: 'image', src: '/eco-al-infinito/DSC_0570.jpg', speed: 0.3,
              position: { top: '5vh', left: '59.24%', width: '467px', height: '311px', zIndex: 1 } },
            { type: 'image', src: '/eco-al-infinito/DSC_0845.jpg', speed: 0.5,
              position: { top: '25vh', left: '33.82%', width: '467px', height: '312px', zIndex: 2 } },
          ]
        },
        // ─── 9. 3-COLUMN CASCADE + TEXT ─────────────────────────────
        {
          id: 'staggered-3col',
          minHeight: '150vh',
          layers: [
            { type: 'image', src: '/eco-al-infinito/DSC_1052.jpg', speed: 0.3,
              position: { top: '5vh', left: '4.24%', width: '345px', height: '517px', zIndex: 1 } },
            { type: 'image', src: '/eco-al-infinito/DSC_0738.jpg', speed: 0.5,
              position: { top: '20vh', left: '37.99%', width: '345px', height: '517px', zIndex: 2 } },
            { type: 'image', src: '/eco-al-infinito/DSC_0616.jpg', speed: 0.7,
              position: { top: '38vh', left: '71.81%', width: '345px', height: '517px', zIndex: 3 } },
            { type: 'text', speed: 0,
              content: 'La potencia de esta creación no da lugar a ausentarse. Participamos sin descanso, metro a metro, de las síntesis sensibles que reavivan las fraguas más ardientes de la memoria para trasladarnos a espacios libres donde sus elementales e infinitas combinaciones se reproducen y rebobinan en nuestra mente, aunando pasados, presentes y futuros que resurgen ante nuestro caminar buscando un sentido. Hay muchos.',
              position: { top: '100vh', left: '8.33%', width: '467px', height: 'auto', zIndex: 4 } },
          ]
        },
        // ─── 10. FULL-WIDTH IMAGE ────────────────────────────────────
        {
          id: 'fw-2',
          minHeight: '90vh',
          layers: [
            { type: 'image', src: '/eco-al-infinito/DSC_1009.jpg', speed: 0.2,
              position: { top: '0', left: '0', width: '100%', height: '960px', zIndex: 1 } },
          ]
        },
        // ─── 11. PORTRAIT SEQUENCE ───────────────────────────────────
        {
          id: 'portrait-seq',
          minHeight: '150vh',
          layers: [
            { type: 'image', src: '/eco-al-infinito/DSC_0629.jpg', speed: 0.3,
              position: { top: '5vh', left: '21.11%', width: '467px', height: '700px', zIndex: 1 } },
            { type: 'image', src: '/eco-al-infinito/DSC_1004.jpg', speed: 0.5,
              position: { top: '55vh', left: '46.46%', width: '467px', height: '700px', zIndex: 2 } },
          ]
        },
        // ─── 12. WIDE LEFT + TEXT ────────────────────────────────────
        {
          id: 'wide-left-text',
          minHeight: '100vh',
          layers: [
            { type: 'image', src: '/eco-al-infinito/DSC_0847.jpg', speed: 0.3,
              position: { top: '5vh', left: '4.24%', width: '831px', height: '554px', zIndex: 1 } },
            { type: 'text', speed: 0,
              content: 'Una plenitud sin alarmas nos tranquiliza desde la convicción de que este es nuestro universo. Aquí, unidos a Constanza, seguimos caminando sin dudar. Aceptamos ser guiados porque son las formas con las que hemos construido el mundo. Así dejamos huella de nuestro paso por la Tierra. Seguiremos dudando hasta que realmente nos reconozcamos allí. Son infinitos. Son un Eco al Infinito.',
              position: { top: '60vh', left: '58.33%', width: '467px', height: 'auto', zIndex: 2 } },
          ]
        },
        // ─── 13. DIAGONAL + PORTRAIT ─────────────────────────────────
        {
          id: 'diagonal-portrait',
          minHeight: '120vh',
          layers: [
            { type: 'image', src: '/eco-al-infinito/DSC_0492.jpg', speed: 0.4,
              position: { top: '5vh', left: '63.33%', width: '467px', height: '311px', zIndex: 1 } },
            { type: 'image', src: '/eco-al-infinito/DSC_0558.jpg', speed: 0.6,
              position: { top: '25vh', left: '42.22%', width: '467px', height: '701px', zIndex: 2 } },
          ]
        },
        // ─── 14. PORTRAIT PAIR ───────────────────────────────────────
        {
          id: 'portrait-pair',
          minHeight: '150vh',
          layers: [
            { type: 'image', src: '/eco-al-infinito/DSC_0679.jpg', speed: 0.3,
              position: { top: '5vh', left: '8.47%', width: '467px', height: '700px', zIndex: 1 } },
            { type: 'image', src: '/eco-al-infinito/DSC_0732.jpg', speed: 0.5,
              position: { top: '55vh', left: '33.82%', width: '467px', height: '700px', zIndex: 2 } },
          ]
        },
        // ─── 15. FULL-WIDTH IMAGE ────────────────────────────────────
        {
          id: 'fw-3',
          minHeight: '90vh',
          layers: [
            { type: 'image', src: '/eco-al-infinito/DSC_1031.jpg', speed: 0.2,
              position: { top: '0', left: '0', width: '100%', height: '960px', zIndex: 1 } },
          ]
        },
        // ─── 16. SCATTERED SMALLS ────────────────────────────────────
        {
          id: 'scattered-smalls',
          minHeight: '150vh',
          layers: [
            { type: 'image', src: '/eco-al-infinito/DSC_0345.jpg', speed: 0.3,
              position: { top: '5vh', left: '35.69%', width: '467px', height: '311px', zIndex: 1 } },
            { type: 'image', src: '/eco-al-infinito/DSC_0865.jpg', speed: 0.5,
              position: { top: '25vh', left: '58.33%', width: '466px', height: '699px', zIndex: 2 } },
            { type: 'image', src: '/eco-al-infinito/DSC_0809.jpg', speed: 0.4,
              position: { top: '80vh', left: '8.47%', width: '467px', height: '311px', zIndex: 1 } },
            { type: 'image', src: '/eco-al-infinito/DSC_0812.jpg', speed: 0.6,
              position: { top: '100vh', left: '29.58%', width: '467px', height: '311px', zIndex: 2 } },
          ]
        },
        // ─── 17. TEXT + SCATTERED SMALLS ─────────────────────────────
        {
          id: 'text-smalls',
          minHeight: '120vh',
          layers: [
            { type: 'text', speed: 0,
              content: 'Sí, claro. Todavía no conocemos muchos universos, pero puede ser que los haya. Y dentro de ellos, siempre habrá un lugar para el arte que expande nuestra posibilidad de entender y percibir lo diferente. Tal vez nos aterra que esa posibilidad desaparezca. Pero no lo hará. Porque las cosas existen también en nuestras memorias.',
              position: { top: '5vh', left: '8.33%', width: '467px', height: 'auto', zIndex: 1 } },
            { type: 'image', src: '/eco-al-infinito/DSC_0400.jpg', speed: 0.3,
              position: { top: '30vh', left: '59.1%', width: '467px', height: '311px', zIndex: 2 } },
            { type: 'image', src: '/eco-al-infinito/DSC_0795.jpg', speed: 0.5,
              position: { top: '65vh', left: '33.33%', width: '467px', height: '311px', zIndex: 2 } },
          ]
        },
        // ─── 18. CAROUSEL ────────────────────────────────────────────
        {
          id: 'carousel',
          height: '331px',
          type: 'carousel',
          layers: [
            { type: 'image', src: '/eco-al-infinito/DSC_0309.jpg', speed: 0, alt: 'Eco al Infinito 1' },
            { type: 'image', src: '/eco-al-infinito/DSC_0532.jpg', speed: 0, alt: 'Eco al Infinito 2' },
            { type: 'image', src: '/eco-al-infinito/DSC_0555.jpg', speed: 0, alt: 'Eco al Infinito 3' },
            { type: 'image', src: '/eco-al-infinito/DSC_0568.jpg', speed: 0, alt: 'Eco al Infinito 4' },
            { type: 'image', src: '/eco-al-infinito/DSC_0603.jpg', speed: 0, alt: 'Eco al Infinito 5' },
            { type: 'image', src: '/eco-al-infinito/DSC_0552.jpg', speed: 0, alt: 'Eco al Infinito 6' },
            { type: 'image', src: '/eco-al-infinito/DSC_0935.jpg', speed: 0, alt: 'Eco al Infinito 7' },
            { type: 'image', src: '/eco-al-infinito/DSC_0263.jpg', speed: 0, alt: 'Eco al Infinito 8' },
            { type: 'image', src: '/eco-al-infinito/DSC_0564.jpg', speed: 0, alt: 'Eco al Infinito 9' },
          ]
        },
        // ─── 19. CREDITS ────────────────────────────────────────────
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
    image: '/image5.jpg',
    category: 'Dirección de Arte y Efectos Lumínicos',
    parallaxConfig: {
      sections: [
        // ─── 1. HERO ─────────────────────────────────────────────────
        {
          id: 'hero',
          minHeight: '115vh',
          layers: [
            { type: 'image', src: '/image5.jpg', speed: 0.8, isHero: true,
              position: { top: '120px', left: '4.25%', width: '91.5%', height: '490px', zIndex: 1 } },
            { type: 'marquee', content: 'DIRECCIÓN DE ARTE Y EFECTOS LUMÍNICOS.', speed: 0, multiplier: 22,
              position: { top: '86vh', left: '0', width: '100%', height: '72px', zIndex: 2 } },
          ]
        },
        // ─── 2. CONE OF LIGHT — centered medium ──────────────────────
        {
          id: 'cone-light',
          minHeight: '80vh',
          layers: [
            { type: 'image', src: cldImg(ALT[1], 'w_1400'), speed: 0.3,
              position: { top: '5vh', left: 'calc(50% - 350px)', width: '700px', height: '369px', zIndex: 1 } },
          ]
        },
        // ─── 3. STACKED STILLS — film-strip column centered ──────────
        {
          id: 'stacked-stills',
          minHeight: '200vh',
          layers: [
            { type: 'image', src: cldImg(ALT[2], 'w_1200'), speed: 0.2,
              position: { top: '5vh', left: 'calc(50% - 300px)', width: '600px', height: '316px', zIndex: 1 } },
            { type: 'image', src: cldImg(ALT[3], 'w_1200'), speed: 0.35,
              position: { top: '45vh', left: 'calc(50% - 300px)', width: '600px', height: '316px', zIndex: 1 } },
            { type: 'image', src: cldImg(ALT[4], 'w_1200'), speed: 0.5,
              position: { top: '88vh', left: 'calc(50% - 300px)', width: '600px', height: '316px', zIndex: 1 } },
          ]
        },
        // ─── 4. FULL-WIDTH VIDEO 1 ───────────────────────────────────
        {
          id: 'fw-video-1',
          minHeight: '80vh',
          type: 'fullwidth-video' as const,
          layers: [
            { type: 'video', src: cldVideo(ALT.v1),
              speed: 0, autoPlay: true, loop: false, muted: true },
          ]
        },
        // ─── 5. OFFSET PAIR — two landscape stills ───────────────────
        {
          id: 'offset-pair',
          minHeight: '100vh',
          layers: [
            { type: 'image', src: cldImg(ALT[5], 'w_1400'), speed: 0.3,
              position: { top: '5vh', left: '4.25%', width: '710px', height: '374px', zIndex: 1 } },
            { type: 'image', src: cldImg(ALT[6], 'w_1400'), speed: 0.5,
              position: { top: '40vh', left: '45.83%', width: '588px', height: '310px', zIndex: 2 } },
          ]
        },
        // ─── 6. PORTRAIT FEATURE — orange portrait centered ──────────
        {
          id: 'portrait-feature',
          minHeight: '130vh',
          layers: [
            { type: 'image', src: cldImg(ALT[7], 'w_900'), speed: 0.25,
              position: { top: '5vh', left: 'calc(50% - 233px)', width: '466px', height: '828px', zIndex: 1 } },
          ]
        },
        // ─── 7. BAND DUO — purple landscapes ─────────────────────────
        {
          id: 'band-duo',
          minHeight: '110vh',
          layers: [
            { type: 'image', src: cldImg(ALT[8], 'w_1600'), speed: 0.3,
              position: { top: '5vh', left: '4.25%', width: '710px', height: '444px', zIndex: 1 } },
            { type: 'image', src: cldImg(ALT[9], 'w_1600'), speed: 0.5,
              position: { top: '45vh', left: '48%', width: '588px', height: '368px', zIndex: 2 } },
          ]
        },
        // ─── 8. NEON FEATURE — red/pink close-up full width ──────────
        {
          id: 'neon-feature',
          minHeight: '100vh',
          layers: [
            { type: 'image', src: cldImg(ALT[10], 'w_2000'), speed: 0.25,
              position: { top: '5vh', left: '4.25%', width: '91.5%', height: '490px', zIndex: 1 } },
          ]
        },
        // ─── 9. NEON SCATTER — blue/orange quartet ───────────────────
        {
          id: 'neon-scatter',
          minHeight: '200vh',
          layers: [
            { type: 'image', src: cldImg(ALT[11], 'w_1400'), speed: 0.25,
              position: { top: '5vh', left: '4.25%', width: '710px', height: '374px', zIndex: 1 } },
            { type: 'image', src: cldImg(ALT[13], 'w_1400'), speed: 0.45,
              position: { top: '50vh', left: '54.17%', width: '588px', height: '310px', zIndex: 2 } },
            { type: 'image', src: cldImg(ALT[12], 'w_1400'), speed: 0.35,
              position: { top: '110vh', left: '8.33%', width: '467px', height: '246px', zIndex: 1 } },
            { type: 'image', src: cldImg(ALT[14], 'w_1400'), speed: 0.55,
              position: { top: '140vh', left: '54.17%', width: '588px', height: '310px', zIndex: 2 } },
          ]
        },
        // ─── 10. FULL-WIDTH VIDEO 2 ──────────────────────────────────
        {
          id: 'fw-video-2',
          minHeight: '80vh',
          type: 'fullwidth-video' as const,
          layers: [
            { type: 'video', src: cldVideo(ALT.v5),
              speed: 0, autoPlay: true, loop: false, muted: true },
          ]
        },
        // ─── 11. STACKED PORTRAITS — asset 16 (3 panels film strip) ──
        {
          id: 'stacked-portraits',
          minHeight: '120vh',
          layers: [
            { type: 'image', src: cldImg(ALT[16], 'w_900'), speed: 0.25,
              position: { top: '5vh', left: 'calc(50% - 270px)', width: '540px', height: '960px', zIndex: 1 } },
          ]
        },
        // ─── 12. CREDITS — band faces photo + credits overlay ─────────
        {
          id: 'credits',
          minHeight: '100vh',
          layers: [
            // asset 15 = 4-panel B&W composite with both band members' faces
            { type: 'image', src: cldImg(ALT[15], 'w_1800'), speed: 0.1,
              position: { top: '0', left: '0', width: '100%', height: '75vh', zIndex: 1 } },
            { type: 'credits' as const, speed: 0, credits: [
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
            ],
              position: { top: '77vh', left: '0', width: '100%', height: 'auto', zIndex: 2 } },
          ]
        },
      ]
    },
    gallery: [
      { src: '/image5.jpg',              alt: 'Alterego — hero',            position: 'center', size: 'lg' },
      { src: cldImg(ALT[1], 'w_800'),   alt: 'Alterego — cone of light',   position: 'left',   size: 'md' },
      { src: cldImg(ALT[3], 'w_800'),   alt: 'Alterego — woman in light',  position: 'right',  size: 'sm' },
      { src: cldImg(ALT[10], 'w_800'),  alt: 'Alterego — neon faces',      position: 'center', size: 'lg' },
      { src: cldImg(ALT[15], 'w_800'),  alt: 'Alterego — B&W film strip',  position: 'left',   size: 'md' },
    ]
  },
]
