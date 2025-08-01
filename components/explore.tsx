"use client";
import React, { useState, useEffect, useRef } from 'react';
import { getApiBootcamp } from '../lib/api_bootcamp';
import { getApiArticle } from '../lib/api_article';

function ContentCard({ data }) {
  return (
    <div className="bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300">
      <div className="relative">
        <img src={data.image} alt={data.title} className="w-full h-40 object-cover" />
        <div className="absolute top-3 left-3">
          <span className="bg-blue-500 text-white px-3 py-1 rounded-full text-xs font-medium">
            {data.tag}
          </span>
        </div>
      </div>
      <div className="p-4">
        <h3 className="font-medium text-gray-900 mb-2 line-clamp-2">{data.title}</h3>
        <div className="flex items-center justify-between text-sm text-gray-600">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1">
              <span className="text-yellow-400">★</span>
              <span className="font-medium">{data.rating}</span>
            </span>
            <span>{data.students} students</span>
          </div>
          <span>{data.reviews} reviews</span>
        </div>
      </div>
    </div>
  );
}

export default function Explore() {
  const scrollRef = useRef(null);
  const [activeFilter, setActiveFilter] = useState("all");
  const [bootcamps, setBootcamps] = useState([]);
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  const categories = [
    { id: "all", label: "All" },
    { id: "UI/UX", label: "UI/UX" },
    { id: "Frontend", label: "Frontend Engineering" },
    { id: "digital-marketing", label: "Digital Marketing" },
    { id: "MLOps", label: "Machine Learning" },
    { id: "Product Management", label: "Product Management" },
    { id: "product-engineer", label: "Product Engineer" }

  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [bootcampRes, articleRes] = await Promise.all([
          getApiBootcamp(),
          getApiArticle(),
        ]);
        setBootcamps(bootcampRes);
        setArticles(articleRes);
      } catch (err) {
        console.error("Failed to fetch data:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const getFilteredData = (data, filter) => {
    if (filter === "all") return data;
    return data.filter(item => item.category === filter);
  };

  const handleFilterChange = (filterId) => {
    setActiveFilter(filterId);
  };

  if (loading) {
    return <div className="p-8 text-center">Loading...</div>;
  }

  const filteredBootcamps = getFilteredData(bootcamps, activeFilter);
  const filteredArticles = getFilteredData(articles, activeFilter);

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Filter Pills */}
      <div className="flex items-center gap-2 px-4 pb-4 bg-white">
        <div ref={scrollRef} className="flex gap-2 overflow-x-auto no-scrollbar max-w-full py-2">
          {categories.map((category) => (
            <div key={category.id} className="min-w-fit rounded-full bg-gradient-to-r from-[#5FC6FE] to-[#C2E144] p-0.5">
              <button
                onClick={() => handleFilterChange(category.id)}
                className={`font-medium text-xs px-3 py-1.5 rounded-full whitespace-nowrap bg-white transition-all ${
                  activeFilter === category.id
                    ? "ring-2 ring-red-500 text-red-500"
                    : "text-gray-700 hover:text-red-500"
                }`}
              >
                {category.label}
              </button>
            </div>
          ))}
        </div>
        <button
          onClick={() => scrollRef.current?.scrollBy({ left: 200, behavior: "smooth" })}
          className="w-8 h-8 shrink-0 flex items-center justify-center rounded-full border bg-white hover:bg-gray-50"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      {/* Content Sections */}
      <div className="px-4 pb-8">
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Recommendation Bootcamp</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredBootcamps.map((item) => (
              <ContentCard key={`bootcamp-${item.id}`} data={item} />
            ))}
          </div>
        </div>

        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Recommendation Article</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredArticles.map((item) => (
              <ContentCard key={`article-${item.id}`} data={item} />
            ))}
          </div>
        </div>

        {filteredBootcamps.length === 0 && filteredArticles.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No content found</h3>
            <p className="text-gray-600">Try selecting a different category</p>
          </div>
        )}
      </div>
    </div>
  );
}
