
import React from 'react'
import { Heart, MapPin, Phone, Mail, Facebook, Instagram, Youtube } from 'lucide-react'
import Link from 'next/link'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-gray-900 text-white" role="contentinfo">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Logo e Descrição */}
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-full flex items-center justify-center">
                <Heart className="w-6 h-6 text-white" aria-hidden="true" />
              </div>
              <span className="text-xl font-bold">Força Flor</span>
            </div>
            <p className="text-gray-300 text-base leading-relaxed mb-6 max-w-md">
              Transformando vidas desde 2002 através de ações que possibilitam uma transformação na vida da comunidade,
              focando na garantia de direitos da criança e do adolescente.
            </p>
            <div className="flex space-x-4">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-primary-400 active:text-primary-500 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary-500 rounded-lg p-2 cursor-pointer"
                aria-label="Siga-nos no Facebook"
              >
                <Facebook className="w-5 h-5" aria-hidden="true" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-primary-400 active:text-primary-500 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary-500 rounded-lg p-2 cursor-pointer"
                aria-label="Siga-nos no Instagram"
              >
                <Instagram className="w-5 h-5" aria-hidden="true" />
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-primary-400 active:text-primary-500 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary-500 rounded-lg p-2 cursor-pointer"
                aria-label="Inscreva-se no nosso canal do YouTube"
              >
                <Youtube className="w-5 h-5" aria-hidden="true" />
              </a>
            </div>
          </div>

          {/* Links Rápidos */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-white">Links Rápidos</h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/sobre"
                  className="text-gray-300 hover:text-white active:text-gray-100 transition-colors duration-200 text-base focus:outline-none focus:ring-2 focus:ring-primary-500 rounded-lg px-2 py-1"
                >
                  Sobre Nós
                </Link>
              </li>
              <li>
                <Link
                  href="/projetos"
                  className="text-gray-300 hover:text-white active:text-gray-100 transition-colors duration-200 text-base focus:outline-none focus:ring-2 focus:ring-primary-500 rounded-lg px-2 py-1"
                >
                  Nossos Projetos
                </Link>
              </li>
              <li>
                <Link
                  href="/voluntariado"
                  className="text-gray-300 hover:text-white active:text-gray-100 transition-colors duration-200 text-base focus:outline-none focus:ring-2 focus:ring-primary-500 rounded-lg px-2 py-1"
                >
                  Como Ajudar
                </Link>
              </li>
              <li>
                <Link
                  href="/noticias"
                  className="text-gray-300 hover:text-white active:text-gray-100 transition-colors duration-200 text-base focus:outline-none focus:ring-2 focus:ring-primary-500 rounded-lg px-2 py-1"
                >
                  Notícias
                </Link>
              </li>
            </ul>
          </div>

          {/* Contato */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-white">Contato</h3>
            <ul className="space-y-3">
              <li className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-primary-400 mt-0.5 flex-shrink-0" aria-hidden="true" />
                <span className="text-gray-300 text-base">
                  São Pedro, Paracuru - CE<br />
                  89km de Fortaleza
                </span>
              </li>
              <li className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-primary-400 flex-shrink-0" aria-hidden="true" />
                <a
                  href="tel:+5585999999999"
                  className="text-gray-300 hover:text-white active:text-gray-100 transition-colors duration-200 text-base focus:outline-none focus:ring-2 focus:ring-primary-500 rounded-lg px-2 py-1"
                >
                  (85) 9 9999-9999
                </a>
              </li>
              <li className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-primary-400 flex-shrink-0" aria-hidden="true" />
                <a
                  href="mailto:contato@forcaflor.org"
                  className="text-gray-300 hover:text-white active:text-gray-100 transition-colors duration-200 text-base focus:outline-none focus:ring-2 focus:ring-primary-500 rounded-lg px-2 py-1"
                >
                  contato@forcaflor.org
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Linha divisória e copyright */}
        <div className="border-t border-gray-800 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-base mb-4 md:mb-0">
              © {currentYear} Força Flor. Todos os direitos reservados.
            </p>
            <p className="text-gray-400 text-base">
              Fundada em 19 de setembro de 2002
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
