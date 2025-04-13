// src/App.jsx
import React, { useState } from "react";
import FirmSelector from "./components/FirmSelector";
import FirmProfile from "./components/FirmProfile";
import MinimalFooter from "./components/MinimalFooter";
// The JSON is an object, keyed by firm name, each value is the firm data
import allFirmsData from "./assets/french_esg_results.json";

function App() {
  const [selectedFirm, setSelectedFirm] = useState("");
  const [showAllFirms, setShowAllFirms] = useState(false);
  
  // The firm names are just the keys in the JSON file
  const firmNames = Object.keys(allFirmsData);
  
  // If we have a selection, get that data from the JSON object
  const selectedFirmData = selectedFirm ? allFirmsData[selectedFirm] : null;

  // Fonction pour obtenir le secteur de l'entreprise (si disponible dans les données)
  const getFirmSector = (firmName) => {
    const firmData = allFirmsData[firmName];
    return firmData?.company_info?.industry || "Secteur non spécifié";
  };

  // Limiter le nombre d'entreprises affichées initialement
  const initialVisibleCount = 8;
  const visibleFirms = showAllFirms ? firmNames : firmNames.slice(0, initialVisibleCount);
  const hasMoreFirms = firmNames.length > initialVisibleCount;

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* En-tête avec explications */}
      <div className="relative overflow-hidden bg-white shadow-md">
        {/* Bande tricolore supérieure */}
        <div className="flex h-2">
          <div className="w-1/3 bg-blue-700"></div>
          <div className="w-1/3 bg-white"></div>
          <div className="w-1/3 bg-red-600"></div>
        </div>
        
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="md:flex md:items-center md:justify-between">
            <div className="md:max-w-2xl">
              <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl">
                <span className="block">L'impact écologique</span>
                <span className="block text-blue-700">des entreprises en un clic</span>
              </h1>
              <p className="mt-3 text-base text-gray-500 sm:mt-5 sm:text-lg">
                Visualisez les données environnementales, les objectifs de décarbonisation 
                et les controverses des grandes entreprises.
              </p>
              
              {/* Avertissement projet académique */}
              <div className="mt-4 bg-gray-50 border-l-4 border-yellow-400 p-3 rounded-md">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <svg className="h-5 w-5 text-yellow-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <p className="text-sm text-gray-700">
                      Ce prototype est réalisé dans le cadre d'un travail académique (Grand Écrit) 
                      et n'est pas affilié au gouvernement français.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* SVG décoratif */}
            <div className="hidden md:block mt-6 md:mt-0">
              <svg className="h-48 w-48 text-blue-700" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g opacity="0.2" fill="currentColor">
                  <circle cx="100" cy="100" r="80" />
                </g>
                <g opacity="0.5" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M40,120 Q100,60 160,120" />
                  <path d="M40,140 Q100,80 160,140" strokeDasharray="3,3" />
                </g>
                <g fill="currentColor">
                  <circle cx="100" cy="100" r="5" />
                  <circle cx="80" cy="110" r="3" />
                  <circle cx="120" cy="110" r="3" />
                  <circle cx="60" cy="120" r="3" />
                  <circle cx="140" cy="120" r="3" />
                </g>
                <text x="100" y="160" fontSize="10" fontWeight="bold" textAnchor="middle" fill="currentColor">2°C Trajectory</text>
              </svg>
            </div>
          </div>
        </div>
        
        {/* Séparateur décoratif avec effet de dégradé */}
        <div className="h-1 w-full bg-gradient-to-r from-blue-700 via-white to-red-600"></div>
      </div>

      {/* Contenu principal */}
      <div className="flex-grow">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Affichage des entreprises disponibles */}
          <div className="mb-8">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-semibold text-gray-900">Entreprises disponibles</h2>
              

            </div>
            
            {/* Grille d'entreprises avec limite */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mb-4">
              {visibleFirms.map((firmName) => (
                <button
                  key={firmName}
                  onClick={() => setSelectedFirm(firmName)}
                  className={`flex flex-col items-center p-4 border rounded-lg transition-all ${
                    selectedFirm === firmName
                      ? "border-blue-600 bg-blue-50 shadow-md"
                      : "border-gray-200 bg-white hover:bg-gray-50"
                  }`}
                >
                  <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 mb-3">
                    {firmName.charAt(0)}
                  </div>
                  <span className="font-medium text-center text-gray-900 text-sm">{firmName}</span>
                  <span className="text-xs text-gray-500 mt-1">{getFirmSector(firmName)}</span>
                </button>
              ))}
            </div>
            
            {/* Bouton "Voir plus" si nécessaire */}
            {hasMoreFirms && (
              <div className="text-center">
                <button
                  onClick={() => setShowAllFirms(!showAllFirms)}
                  className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  {showAllFirms ? (
                    <>
                      <svg className="mr-2 h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z" clipRule="evenodd" />
                      </svg>
                      Voir moins
                    </>
                  ) : (
                    <>
                      <svg className="mr-2 h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                      Voir toutes les entreprises ({firmNames.length})
                    </>
                  )}
                </button>
              </div>
            )}
          </div>

          {/* Affichage des données de l'entreprise sélectionnée */}
          {selectedFirmData ? (
            <FirmProfile firmData={selectedFirmData} />
          ) : (
            <div className="text-center py-12 bg-white rounded-lg shadow-sm">
              <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
              </svg>
              <h3 className="mt-2 text-sm font-medium text-gray-900">Aucune entreprise sélectionnée</h3>
              <p className="mt-1 text-sm text-gray-500">Veuillez choisir une entreprise pour afficher ses données environnementales.</p>
            </div>
          )}
        </div>
      </div>

      {/* Footer minimaliste */}
      <MinimalFooter />
    </div>
  );
}

export default App;