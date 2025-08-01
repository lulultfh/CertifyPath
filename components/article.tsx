"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { getApiArticle } from "../lib/api_article";

interface ArticleData {
  id: string;
  title: string;
  description: string;
  image: string;
  duration: string;
  reviews: string;
  level: string;
  rating: number;
}

// Komponen Card
function ArticleCard({ data }: { data: ArticleData }) {
  return (
    <div className="w-full bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
      <div className="p-6 pb-4">
        <div className="flex items-start justify-between mb-3">
          <h3 className="text-xl font-semibold text-gray-900 leading-tight">
            {data.title}
          </h3>
          <span className="bg-[#2EA9F8] text-white px-3 py-1 rounded-full text-xs font-medium ml-4">
            #Article
          </span>
        </div>
        <p className="text-gray-600 text-sm leading-relaxed mb-4">
          {data.description}
        </p>
      </div>

      <div className="relative px-6">
        <Image
          src={data.image}
          alt={data.title || "Bootcamp Image"}
          width={800}
          height={400}
          className="w-full h-48 object-cover rounded-lg"
          priority={false}
        />
        <div className="absolute bottom-3 right-3 bg-white bg-opacity-70 text-black px-2 py-1 rounded text-xs font-medium">
          {data.duration}
        </div>
      </div>

      <div className="p-6 pt-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-4 text-sm text-gray-600">
            <span className="font-bold">{data.reviews}</span>
            <span className="font-bold">{data.level}</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="flex text-yellow-400">
              {"★".repeat(Math.floor(data.rating))}
              <span className="text-gray-300">★</span>
            </div>
            <span className="text-sm font-bold text-gray-700 ml-1">
              {data.rating} Ratings
            </span>
          </div>
        </div>

        <div className="flex justify-between items-center">
          <div className="flex gap-2">
            <Image
              src="/like.svg"
              alt="Like"
              width={64}
              height={24}
              className="w-16 h-6 cursor-pointer"
            />
            <Image
              src="/comment.svg"
              alt="Comment"
              width={88}
              height={24}
              className="w-22 h-6 cursor-pointer"
            />
          </div>
          <div className="flex gap-2">
            <Image
              src="/save.svg"
              alt="Save"
              width={64}
              height={24}
              className="w-16 h-6 cursor-pointer"
            />
            <Image
              src="/share.svg"
              alt="Share"
              width={64}
              height={24}
              className="w-16 h-6 cursor-pointer"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default function UserArticlesPage() {
  const [articles, setArticles] = useState<ArticleData[]>([]);

  useEffect(() => {
    getApiArticle().then(setArticles).catch(console.error);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="w-full">
        <div className="grid place-items-center gap-6">
          {articles.map((article) => (
            <ArticleCard key={article.id} data={article} />
          ))}
        </div>
      </div>
    </div>
  );
}
