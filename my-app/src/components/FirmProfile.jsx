// src/components/FirmProfile.jsx
import React from "react";
import EnhancedHeader from "./EnhancedHeader"; // Assurez-vous d'importer le composant

/**
 * firmData is the entire JSON object from your scraper.
 * Example structure shown above.
 */
export default function FirmProfile({ firmData }) {
  if (!firmData) {
    return (
      <div className="p-4">
        <p>No data to display.</p>
      </div>
    );
  }

  const {
    company_info,
    decarbonization_target,
    implied_temperature_rise,
    charts,
    controversies,
    esg_ratings
  } = firmData;

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="max-w-5xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
        {/* Nouveau header */}
        <EnhancedHeader companyInfo={company_info} />

        <div className="p-6">
          {/* -- ESG Rating (Overall Letter) */}
          {esg_ratings?.overall && (
            <div className="mb-6">
              <h2 className="text-lg font-semibold text-blue-800">Notation ESG</h2>
              <div className="flex items-center mt-2">
                <div className={`text-3xl font-bold rounded-full w-12 h-12 flex items-center justify-center 
                  ${esg_ratings.overall === 'A' || esg_ratings.overall === 'B' ? 'bg-green-100 text-green-800' : 
                  esg_ratings.overall === 'C' ? 'bg-yellow-100 text-yellow-800' : 
                  'bg-red-100 text-red-800'}`}>
                  {esg_ratings.overall}
                </div>
                <div className="ml-3">
                  <span className="text-sm text-gray-500">Note globale</span>
                </div>
              </div>
            </div>
          )}

          {/* -- Decarbonization Target */}
          <section className="mb-6 bg-gray-50 p-4 rounded-md border-l-4 border-blue-700">
            <h2 className="text-lg font-semibold text-blue-800">Objectif de Décarbonisation</h2>
            {decarbonization_target && Object.keys(decarbonization_target).length > 0 ? (
              <ul className="mt-3 space-y-2">
                {Object.entries(decarbonization_target).map(([question, answer]) => (
                  <li key={question} className="flex items-start">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-600 mr-2 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <div>
                      <strong className="text-gray-700">{question}</strong>: 
                      <span className="text-gray-600 ml-1">{answer}</span>
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-sm text-gray-500 mt-2">Aucune donnée disponible.</p>
            )}
          </section>

          {/* -- Implied Temperature Rise */}
          <section className="mb-6 bg-gray-50 p-4 rounded-md border-l-4 border-blue-700">
            <h2 className="text-lg font-semibold text-blue-800">Hausse de Température Implicite</h2>
            {implied_temperature_rise ? (
              <div className="mt-3 space-y-2">
                <div className="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-red-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                  <p>
                    <strong className="text-gray-700">Valeur:</strong>
                    <span className="ml-1 text-gray-600">{implied_temperature_rise.value || "N/A"}</span>
                  </p>
                </div>
                <div className="pl-7">
                  <p>
                    <strong className="text-gray-700">Explication:</strong>
                    <span className="ml-1 text-gray-600 block mt-1">{implied_temperature_rise.explanation || "N/A"}</span>
                  </p>
                </div>
              </div>
            ) : (
              <p className="text-sm text-gray-500 mt-2">Aucune donnée disponible.</p>
            )}
          </section>

          {/* -- Example: Insert 2C Trajectory SVG */}
          {charts?.["2c_trajectory_svg"] && (
            <section className="mb-6">
              <h2 className="text-lg font-semibold text-blue-800">Trajectoire 2°C</h2>
              <div
                className="mt-3 border border-gray-200 p-3 rounded-md bg-white"
                dangerouslySetInnerHTML={{ __html: charts["2c_trajectory_svg"] }}
              />
            </section>
          )}

          {/* -- Controversies */}
          <section className="mb-6">
            <h2 className="text-lg font-semibold text-blue-800">Controverses</h2>
            {controversies?.list && controversies.list.length > 0 ? (
              <ul className="mt-3 space-y-2">
                {controversies.list.map((item, idx) => (
                  <li
                    key={idx}
                    className="flex items-center justify-between bg-gray-50 px-4 py-3 rounded-md border border-gray-200"
                  >
                    <span className="text-gray-700">{item.name}</span>
                    <span
                      className={`px-3 py-1 text-xs font-medium rounded-full ${
                        item.flag === "Green"
                          ? "bg-green-100 text-green-800"
                          : item.flag === "Yellow"
                          ? "bg-yellow-100 text-yellow-800"
                          : item.flag === "Red"
                          ? "bg-red-100 text-red-800"
                          : "bg-gray-200 text-gray-800"
                      }`}
                    >
                      {item.flag || "Inconnu"}
                    </span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-sm text-gray-500 mt-2">Aucune controverse listée.</p>
            )}
          </section>
        </div>
        
        {/* Pied de page avec les couleurs institutionnelles */}
        <footer className="bg-gray-100 px-6 py-4 border-t border-gray-200">
          <div className="text-xs text-center text-gray-600">
            Données actualisées le {new Date().toLocaleDateString('fr-FR')}
          </div>
          <div className="h-1 w-full bg-gradient-to-r from-blue-700 via-white to-red-600 mt-3"></div>
        </footer>
      </div>
    </div>
  );
}