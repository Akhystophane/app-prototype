// Header amélioré pour FirmProfile.jsx
import React from "react";

export default function EnhancedHeader({ companyInfo }) {
  const { name, ticker, industry, country } = companyInfo || {};

  return (
    <header className="relative mb-8">
      {/* Bande tricolore supérieure */}
      <div className="flex h-2">
        <div className="w-1/3 bg-blue-700"></div>
        <div className="w-1/3 bg-white"></div>
        <div className="w-1/3 bg-red-600"></div>
      </div>
      
      {/* Corps principal du header */}
      <div className="bg-gray-50 p-6 border-l-4 border-blue-700 shadow-md rounded-r-md">
        <div className="flex flex-col md:flex-row md:items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">
              {name || "Nom de l'entreprise"}
              {ticker && <span className="ml-2 text-sm bg-blue-100 text-blue-800 py-1 px-2 rounded-md">{ticker}</span>}
            </h1>
            
            <p className="text-sm text-gray-600 mt-2">
              L'impact écologique des marques en un clic
            </p>
            
            <div className="mt-4 flex flex-wrap gap-3">
              {industry && (
                <span className="inline-flex items-center bg-gray-100 text-gray-700 text-xs font-medium px-2.5 py-1 rounded-md">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                  {industry}
                </span>
              )}
              
              {country && (
                <span className="inline-flex items-center bg-gray-100 text-gray-700 text-xs font-medium px-2.5 py-1 rounded-md">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 21v-4m0 0V5a2 2 0 012-2h6.5l1 1H21l-3 6 3 6h-8.5l-1-1H5a2 2 0 00-2 2zm9-13.5V9" />
                  </svg>
                  {country}
                </span>
              )}
            </div>
          </div>
          
          <div className="mt-4 md:mt-0">
            <div className="flex items-center justify-end">
              <div className="rounded-full bg-blue-700 text-white p-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div className="ml-3 text-right">
                <span className="text-sm font-semibold block text-gray-700">Analyse écologique</span>
                <span className="text-xs text-gray-500">Service officiel</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Séparateur décoratif avec effet de dégradé */}
      <div className="h-1 w-full bg-gradient-to-r from-blue-700 via-white to-red-600 mt-1"></div>
    </header>
  );
}