// src/components/MinimalFooter.jsx
import React from "react";

export default function MinimalFooter() {
  return (
    <footer className="bg-white border-t border-gray-200 mt-auto">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        {/* Message sur les notations */}
        <div className="mb-3 text-xs text-gray-600 text-center">
          <p>
            Les notations ESG sont relatives au secteur d'activité de chaque entreprise et non de manière absolue.
            Base de données construite à partir des données MSCI.
          </p>
        </div>
        
        <div className="flex flex-col sm:flex-row justify-between items-center">
          <p className="text-sm text-gray-500">
            Projet académique "Grand Écrit" &copy; {new Date().getFullYear()}
          </p>
          <p className="text-xs text-gray-400 mt-1 sm:mt-0">
            Non affilié au gouvernement français
          </p>
        </div>
        <div className="flex h-1 mt-3">
          <div className="w-1/3 bg-blue-700"></div>
          <div className="w-1/3 bg-white"></div>
          <div className="w-1/3 bg-red-600"></div>
        </div>
      </div>
    </footer>
  );
}