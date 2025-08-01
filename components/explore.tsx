"use client";

import React, { useState, useEffect, useRef } from "react";
import { getApiBootcamp } from "../lib/api_bootcamp";
import { getApiArticle } from "../lib/api_article";
import Image from "next/image";

type Bootcamp = {
  id: string;
  title: string;
  url: string;
  preview: string;
  skill: string;
  duration: string;
  level: string;
  rating: number;
  review_count: number;
};

type RawArticle = {
  id: string;
  title: string;
  image: string;
  category: string;
};

type ArticleData = {
  id: string;
  title: string;
  image: string;
  category: string;
};

export default function Explore() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeFilter, setActiveFilter] = useState("all");
  const [bootcamps, setBootcamps] = useState<Bootcamp[]>([]);
  const [articles, setArticles] = useState<ArticleData[]>([]);
  const [loading, setLoading] = useState(true);

  const categories = [
    { id: "all", label: "All" },
    { id: "UI/UX", label: "UI/UX" },
    { id: "Frontend Engineering", label: "Frontend Engineering" },
    { id: "Digital Marketing", label: "Digital Marketing" },
    { id: "Machine Learning", label: "Machine Learning" },
    { id: "Product Management", label: "Product Management" },
    { id: "Product Engineer", label: "Product Engineer" },
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const bootcampRaw = await getApiBootcamp();
        const articleRaw: RawArticle[] = await getApiArticle();

        const mappedArticles: ArticleData[] = articleRaw.map((item: RawArticle) => ({
          id: item.id,
          title: item.title || "Untitled Article",
          image: item.image,
          category: item.category,
        }));

        setBootcamps(bootcampRaw);
        setArticles(mappedArticles);
      } catch (err) {
        console.error("Failed to fetch data:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const getFilteredBootcamps = (filter: string) => {
    if (filter === "all") return bootcamps;
    return bootcamps.filter((b) => b.skill.toLowerCase().includes(filter.toLowerCase()));
  };

  const getFilteredArticles = (filter: string) => {
    if (filter === "all") return articles;
    return articles.filter((a) => a.category.toLowerCase() === filter.toLowerCase());
  };

  const filteredBootcamps = getFilteredBootcamps(activeFilter);
  const filteredArticles = getFilteredArticles(activeFilter);

  if (loading) return <div className="p-8 text-center">Loading...</div>;

  const Card = ({
    image,
    title,
    subTitle,
    tag,
  }: {
    image: string;
    title: string;
    subTitle?: string;
    tag?: string;
  }) => {
    const tagClass = tag === "#bootcamp" ? "bg-green-500 text-white" : "bg-blue-500 text-white";

    return (
      <div className="w-[250px] flex-shrink-0 bg-white border rounded-xl shadow-sm hover:scale-105 transition-transform overflow-hidden">
        <div className="relative w-full h-40">
          <Image src={image} alt={title} fill className="object-cover" />
          {tag && (
            <div
              className={`absolute top-2 right-2 rounded-full px-2 py-1 text-xs font-semibold ${tagClass}`}
            >
              {tag}
            </div>
          )}
        </div>
        <div className="p-3 text-sm">
          <h3 className="font-semibold mb-1 line-clamp-2">{title}</h3>
          {subTitle && <p className="text-gray-500 text-xs">{subTitle}</p>}
        </div>
      </div>
    );
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="flex items-center gap-2 px-4 pb-4 bg-white">
        <div
          ref={scrollRef}
          className="flex gap-2 overflow-x-auto no-scrollbar max-w-full py-2"
        >
          {categories.map((cat) => (
            <div
              key={cat.id}
              className="min-w-fit rounded-full bg-gradient-to-r from-[#5FC6FE] to-[#C2E144] p-0.5"
            >
              <button
                onClick={() => setActiveFilter(cat.id)}
                className={`font-medium text-xs px-3 py-1.5 rounded-full whitespace-nowrap bg-white transition-all ${
                  activeFilter.toLowerCase() === cat.id.toLowerCase()
                    ? "ring-2 ring-red-500 text-red-500"
                    : "text-gray-700 hover:text-red-500"
                }`}
              >
                {cat.label}
              </button>
            </div>
          ))}
        </div>
      </div>

      <div className="px-4 pb-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Recommendation Bootcamp</h2>
        <div
          className={`${
            activeFilter === "all"
              ? "flex gap-4 overflow-x-auto no-scrollbar pb-6"
              : "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
          }`}
        >
          {filteredBootcamps
            .slice(0, activeFilter === "all" ? undefined : 3)
            .map((item) => (
              <Card
                key={item.id}
                image={item.preview}
                title={item.title}
                subTitle={item.duration}
                tag="#bootcamp"
              />
            ))}
        </div>

        <h2 className="text-xl font-semibold text-gray-900 mb-4 mt-8">Recommendation Articles</h2>
        <div
          className={`${
            activeFilter === "all"
              ? "flex gap-4 overflow-x-auto no-scrollbar pb-6"
              : "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
          }`}
        >
          {filteredArticles
            .slice(0, activeFilter === "all" ? undefined : 3)
            .map((item) => (
              <Card key={item.id} image={item.image} title={item.title} tag="#article" />
            ))}
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
