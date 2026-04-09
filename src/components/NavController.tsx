'use client'

import { useState } from 'react'
import { Navbar } from './Navbar'
import { NavMenu } from './NavMenu'

export function NavController() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <>
      <Navbar menuOpen={menuOpen} onMenuToggle={() => setMenuOpen((prev) => !prev)} />
      <NavMenu isOpen={menuOpen} />
    </>
  )
}
