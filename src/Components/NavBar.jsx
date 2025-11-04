import React from 'react'
import { navLinks } from "../constants";

const NavBar = () => {
  return (
    <header>
      <nav>
        <img src="/Candera_icon.png" alt="Candera Logo" style={{ width: '40px', height: '40px' }} />
        <ul>
          {navLinks.map(({ label }) => (
            <li key={label}>
              <a href={`#${label.toLowerCase()}`}>{label}</a>
            </li>
          ))}
        </ul>

        <div className="flex-center gap-3">
            <button>
                <img src="/search.svg" alt="Search"/>
            </button>
        </div>
      </nav>
    </header>
  )
}

export default NavBar