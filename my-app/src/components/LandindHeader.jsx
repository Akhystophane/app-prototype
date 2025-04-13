// src/components/LandingHeader.jsx
import React from "react";

export default function LandingHeader() {
  return (
    <div className="relative overflow-hidden bg-white">
      {/* Bande tricolore supérieure */}
      <div className="flex h-2">
        <div className="w-1/3 bg-blue-700"></div>
        <div className="w-1/3 bg-white"></div>
        <div className="w-1/3 bg-red-600"></div>
      </div>
      
      <div className="max-w-7xl mx-auto">
        <div className="relative z-10 pb-8 bg-white sm:pb-16 md:pb-20 lg:w-full lg:pb-28 xl:pb-32">
          <div className="pt-6 px-4 sm:px-6 lg:px-8">
            <nav className="relative flex items-center justify-between sm:h-10">
              <div className="flex items-center flex-grow flex-shrink-0 lg:flex-grow-0">
                <span className="text-blue-800 font-bold text-xl">ÉcoImpact</span>
              </div>
              <div className="hidden md:block md:ml-10 md:pr-4 md:space-x-8">
                <span className="font-medium text-gray-500">Projet académique - Grand Écrit</span>
              </div>
            </nav>
          </div>

          <main className="mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28">
            <div className="sm:text-center lg:text-left">
              <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
                <span className="block xl:inline">L'impact écologique</span>{" "}
                <span className="block text-blue-700 xl:inline">des entreprises en un clic</span>
              </h1>
              <p className="mt-3 text-base text-gray-500 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
                Visualisez les données environnementales, les objectifs de décarbonisation et les controverses 
                des grandes entreprises. Une interface simple pour comprendre l'impact écologique des acteurs économiques.
              </p>
              
              <div className="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start">
                <div className="rounded-md shadow">
                  <a
                    href="#enterprises"
                    className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-700 hover:bg-blue-800 md:py-4 md:text-lg md:px-10"
                  >
                    Voir les entreprises
                  </a>
                </div>
                <div className="mt-3 sm:mt-0 sm:ml-3">
                  <a
                    href="#about"
                    className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-blue-700 bg-blue-100 hover:bg-blue-200 md:py-4 md:text-lg md:px-10"
                  >
                    À propos du projet
                  </a>
                </div>
              </div>
              
              {/* Notice de limitation et non-affiliation */}
              <div className="mt-6 bg-gray-50 border-l-4 border-yellow-400 p-4 rounded-md">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <svg className="h-5 w-5 text-yellow-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                      <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <p className="text-sm text-gray-700">
                      <strong>Note importante :</strong> Ce prototype est réalisé dans le cadre d'un travail académique (Grand Écrit) 
                      et n'est pas affilié au gouvernement français. Le nombre d'entreprises disponibles est limité pour ce projet de démonstration.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
      
      {/* SVG décoratif */}
      <div className="hidden lg:block lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2">
        <svg className="h-56 w-full text-blue-700 sm:h-72 md:h-80 lg:h-full" viewBox="0 0 900 600" fill="none" xmlns="http://www.w3.org/2000/svg">
          <g opacity="0.2" fill="currentColor">
            <circle cx="769" cy="229" r="8" />
            <circle cx="733" cy="200" r="8" />
            <circle cx="702" cy="175" r="8" />
            <circle cx="669" cy="153" r="8" />
            <circle cx="633" cy="133" r="10" />
            <circle cx="594" cy="117" r="12" />
            <circle cx="551" cy="105" r="14" />
            <circle cx="504" cy="99" r="16" />
            <circle cx="454" cy="99" r="18" />
            <circle cx="402" cy="105" r="20" />
            <circle cx="349" cy="117" r="22" />
            <circle cx="296" cy="133" r="24" />
            <circle cx="244" cy="153" r="26" />
            <circle cx="194" cy="175" r="28" />
            <circle cx="148" cy="200" r="30" />
            <circle cx="108" cy="229" r="32" />
          </g>
          <g opacity="0.5" fill="currentColor">
            <path d="M250,400 Q400,350 550,400 T850,400 L850,600 L50,600 L50,400 Q100,450 250,400" />
          </g>
          <g fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M400,250 Q500,100 600,250" />
            <path d="M300,300 Q400,150 500,300" />
            <path d="M200,350 Q300,200 400,350" />
            <path strokeDasharray="5,5" d="M150,375 L750,375" />
            <path strokeDasharray="3,3" d="M200,400 L700,400" />
          </g>
          <g fill="currentColor">
            <circle cx="400" cy="250" r="10" />
            <circle cx="500" cy="300" r="10" />
            <circle cx="300" cy="300" r="8" />
            <circle cx="400" cy="350" r="8" />
            <circle cx="200" cy="350" r="6" />
          </g>
          <text x="400" y="450" fontSize="12" fontWeight="bold" textAnchor="middle" fill="currentColor">2°C Trajectory</text>
          <text x="400" y="470" fontSize="10" textAnchor="middle" fill="currentColor">Paris Agreement Target</text>
        </svg>
      </div>
      
      {/* Séparateur décoratif avec effet de dégradé */}
      <div className="h-1 w-full bg-gradient-to-r from-blue-700 via-white to-red-600"></div>
    </div>
  );
}