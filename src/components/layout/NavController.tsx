'use client'

import { useState } from 'react'
import { Navbar } from './Navbar'
import { NavMenu } from './NavMenu'
import { ContactSection } from './ContactSection'

export function NavController() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [contactOpen, setContactOpen] = useState(false)

  const handleContactClick = () => {
    setMenuOpen(false)
    setContactOpen(true)
  }

  return (
    <>
      <Navbar menuOpen={menuOpen} onMenuToggle={() => setMenuOpen((prev) => !prev)} />
      <NavMenu isOpen={menuOpen} onContactClick={handleContactClick} />
      <ContactSection isOpen={contactOpen} onClose={() => setContactOpen(false)} />
    </>
  )
}
