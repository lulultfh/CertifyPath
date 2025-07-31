'use client';
import React from 'react';

export default function GlobalError() {
  return (
      <div
        className="flex items-center justify-center h-screen w-full bg-cover bg-center"
        style={{ backgroundImage: "url('/errorPage.png')" }}
      >
        <div className="text-center px-4 py-8 bg-white bg-opacity-80 rounded-xl shadow-md">
          <img
            src="/error.png"
            alt="Error"
            className="mx-auto mb-6 w-32 h-32 object-contain"
          />
          <h2 className="text-xl font-bold text-gray-800">
            Oops! This feature isn’t available right now.
            We’re working on it, stay tuned for updates!
          </h2>
        </div>
      </div>
  );
}
