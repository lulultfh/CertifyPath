"use client";

import React from "react";
import Image from "next/image";

const imageSources = [
  "./graduate.png",
  "./team.png",
  "./mentor.png",
  "./coding.png",
  "./class.png",
];

export default function AboutCards() {
  return (
    <section className="w-full min-h-screen bg-gradient-to-b from-lime-50 to-white py-12 px-6">
      <h1 className="text-4xl font-bold text-center text-orange-500 mb-8">
        About Us
      </h1>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-6 justify-items-center px-4 mb-12">
        {imageSources.map((src, index) => (
          <div
            key={index}
            className="border-4 rounded-xl overflow-hidden hover:scale-105 transition-transform duration-300"
            style={{ borderColor: ["#A1E3A1", "#97DAF0", "#F2F597"][index % 3] }}
          >
            <img src={src} alt={`about-${index}`} className="w-64 h-48 object-cover" />
          </div>
        ))}
      </div>

      <div className="max-w-3xl mx-auto text-center text-lg text-gray-700 leading-relaxed">
        We are a learning platform built to support students, job seekers, and lifelong
        learners in reaching their career goals. Our mission is to help users discover
        personalized bootcamps, articles, and community posts based on their interests
        and aspirations. Whether you're exploring a specific topic, searching for trending
        skills, or just starting your journey, we provide the tools and community to help
        you succeed.
      </div>
    </section>
  );
}
