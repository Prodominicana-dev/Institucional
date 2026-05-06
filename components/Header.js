"use client";
import { useState } from 'react'
import Link from 'next/link'

export default function Header({ activePage, onNavClick }) {
  const [menuOpen, setMenuOpen] = useState(false)

  const navItems = [
    { label: 'Inicio', id: 'inicio' },
    { label: 'Las 4 Rutas', id: 'rutas' },
    { label: 'Recursos', id: 'recursos' },
    { label: 'Instituciones', id: 'instituciones' },
    { label: 'Noticias', id: 'noticias' },
    { label: 'Acerca del Repositorio', id: 'acerca' },
  ]

  return (
    <header className="bg-white border-b border-gray-100 sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <button
            onClick={() => onNavClick && onNavClick('inicio')}
            className="flex items-center gap-2 shrink-0"
          >
            <div className="flex flex-col leading-none">
              <span className="font-bold text-navy text-lg tracking-tight">Pro<span className="text-gold">Dominicana</span></span>
              <span className="text-[9px] uppercase tracking-widest text-gray-500 font-medium">Centro de Exportación e Inversión</span>
            </div>
          </button>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1">
            {navItems.map(item => (
              <button
                key={item.id}
                onClick={() => onNavClick && onNavClick(item.id)}
                className={`px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                  activePage === item.id
                    ? 'text-blue-700 bg-blue-50 border-b-2 border-blue-600'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>

          {/* Search + Login */}
          <div className="hidden md:flex items-center gap-3">
            <div className="relative">
              <input
                type="text"
                placeholder="Buscar recursos..."
                className="pl-9 pr-4 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-200 w-44"
              />
              <svg className="absolute left-2.5 top-2.5 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <button className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-navy border border-navy rounded-lg hover:bg-navy hover:text-white transition-colors">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              Ingresar
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 rounded-lg text-gray-600 hover:bg-gray-100"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {menuOpen
                ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              }
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="md:hidden py-3 border-t border-gray-100">
            {navItems.map(item => (
              <button
                key={item.id}
                onClick={() => { onNavClick && onNavClick(item.id); setMenuOpen(false) }}
                className="block w-full text-left px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50"
              >
                {item.label}
              </button>
            ))}
          </div>
        )}
      </div>
    </header>
  )
}