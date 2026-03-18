import Image from 'next/image'

export function ComingSoon() {
  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        overflow: 'hidden',
        fontFamily: 'HelveticaLTStd, Helvetica, Arial, sans-serif',
      }}
    >
      {/* Background image */}
      <Image
        src="/CONSTANZA-SCHWARTZ_comingsoon_bkf.webp"
        alt=""
        fill
        priority
        style={{ objectFit: 'cover', objectPosition: 'center' }}
      />

      {/* Content overlay */}
      <div
        style={{
          position: 'relative',
          zIndex: 1,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100%',
          width: '100%',
        }}
      >
        {/* Logo */}
        <img
          src="/CONSTANZA SCHWARTZ_logowhitevertical.svg"
          alt="Constanza Schwartz"
          style={{ width: 'min(240px, 50vw)', height: 'auto' }}
        />

        {/* Coming soon text */}
        <p
          style={{
            position: 'absolute',
            bottom: 'clamp(32px, 6vh, 64px)',
            color: 'white',
            fontSize: 'clamp(12px, 1.2vw, 16px)',
            letterSpacing: '0.15em',
            textTransform: 'lowercase',
          }}
        >
          coming soon
        </p>
      </div>
    </div>
  )
}
