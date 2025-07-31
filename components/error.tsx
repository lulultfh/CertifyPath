import React from "react";

export default function FeatureUnavailable() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center p-8 bg-white shadow-md rounded-xl">
        <h2 className="text-2xl font-bold text-red-500 mb-2">🚧 Fitur Belum Tersedia</h2>
        <p className="text-gray-600 mb-4">Tenang beb, fitur ini masih dikembangin sama tim yaa. Tungguin update selanjutnya ya! 💻✨</p>
        <a href="/" className="inline-block mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
          Balik ke Beranda
        </a>
      </div>
    </div>
  );
}
