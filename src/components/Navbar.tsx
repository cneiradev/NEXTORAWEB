"use client";

import Link from "next/link";
import { useState } from "react";

const menuItems = [
  { name: "Inicio", href: "/" },
  { name: "Nosotros", href: "/nosotros" },
  { name: "Servicios", href: "/servicios" },
  { name: "Productos", href: "/productos", hasDropdown: true },
];

const dropdownProducts = [
  { name: "Archivador Digital - Prevención de Riesgos", href: "/productos/archivador-digital-prevencion-riesgos" },
  { name: "Calidad Plywood", href: "/productos/calidad-plywood" },
];

export function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur-md">
      <div className="px-6 mx-auto max-w-7xl flex flex-col md:flex-row justify-between items-center gap-4">
        <Link
          href="/"
          className="flex items-center gap-2 font-bold text-xl text-foreground"
        >
          <span className="w-9 h-9 rounded-xl bg-primary flex items-center justify-center text-white text-xs font-bold tracking-wider">
            N
          </span>
          <span className="tracking-tight">NEXORA TECH</span>
        </Link>
        <div className="hidden md:flex items-center gap-8 text-sm font-medium">
          {menuItems.map((item) => (
            item.hasDropdown ? (
              <div key={item.name} className="relative group">
                <Link
                  href={item.href}
                  className="text-foreground font-medium hover:text-primary transition-colors"
                >
                  {item.name}
                </Link>
                <div className="absolute left-0 mt-2 w-56 bg-card border border-border rounded-xl shadow-lg py-3 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                  {dropdownProducts.map((p) => (
                    <Link
                      key={p.name}
                      href={p.href}
                      className="block px-4 py-2 text-sm text-foreground hover:bg-primary hover:text-primary-foreground transition-colors"
                    >
                      {p.name}
                    </Link>
                  ))}
                </div>
              </div>
            ) : (
              <Link
                key={item.name}
                href={item.href}
                className="text-foreground font-medium hover:text-primary transition-colors"
              >
                {item.name}
              </Link>
            )
          ))}
        </div>
        <a
          href="/contacto"
          className="px-6 py-3 rounded-xl bg-primary text-primary-foreground text-sm font-semibold hover:bg-primary/90 transition-colors shadow-sm shadow-primary/20"
        >
          Contactar
        </a>
        <div className="md:hidden">
          <button
            onClick={() => setOpen(!open)}
            className="text-foreground hover:text-primary p-2"
          >
            ☰
          </button>
        </div>
      </div>
    </nav>
  );
}