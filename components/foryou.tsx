"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { getApiArticle } from "../lib/api_article";
import { getApiBootcamp } from "../lib/api_bootcamp";
import { getApiPost } from "../lib/api_post";

type ForYouItem = {
  id: number;
  title: string;
  type: "Article" | "Bootcamp" | "Post";
  image?: string;
  description?: string;
  duration?: string;
  reviews?: string;
  level?: string;
  rating?: number;
  path: string;
};

function ForYouCard({ data }: { data: ForYouItem }) {
  return (
    <div
      onClick={() => (window.location.href = data.path)}
      className="w-full bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-md transition-shadow cursor-pointer"
    >
      <div className="p-6 pb-4">
        <div className="flex items-start justify-between mb-3">
          <h3 className="text-xl font-semibold text-gray-900 leading-tight">
            {data.title}
          </h3>
          <span className="bg-[#2EA9F8] text-white px-3 py-1 rounded-full text-xs font-medium ml-4">
            #{data.type}
          </span>
        </div>
        <p className="text-gray-600 text-sm leading-relaxed mb-4">
          {data.description}
        </p>
      </div>

      {data.image && (
        <div className="relative px-6">
          <Image
            src={data.image.startsWith("http") ? data.image : data.image || "/placeholder.png"}
            alt={data.title}
            width={800}
            height={192}
            className="w-full h-48 object-cover rounded-lg"
          />
          {data.duration && (
            <div className="absolute bottom-3 right-3 bg-white bg-opacity-70 text-black px-2 py-1 rounded text-xs font-medium">
              {data.duration}
            </div>
          )}
        </div>
      )}

      <div className="p-6 pt-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-4 text-sm text-gray-600">
            {data.reviews && <span className="font-bold">{data.reviews}</span>}
            {data.level && <span className="font-bold">{data.level}</span>}
          </div>
          {data.rating && (
            <div className="flex items-center gap-1">
              <div className="flex text-yellow-400">
                {"★".repeat(Math.floor(data.rating))}
                <span className="text-gray-300">★</span>
              </div>
              <span className="text-sm font-bold text-gray-700 ml-1">
                {data.rating} Ratings
              </span>
            </div>
          )}
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

export default function ForYouPage() {
  const [items, setItems] = useState<ForYouItem[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [articles, bootcamps, posts] = await Promise.all([
          getApiArticle(),
          getApiBootcamp(),
          getApiPost(),
        ]);

        const formatted: ForYouItem[] = [
          ...articles.map((a: {
            id: number;
            title: string;
            image?: string;
            excerpt?: string;
          }) => ({
            id: a.id,
            title: a.title,
            type: "Article",
            image: a.image,
            description: a.excerpt,
            path: `/article/${a.id}`,
          })),
          ...bootcamps.map((b: {
            id: number;
            title: string;
            image?: string;
            description?: string;
            duration?: string;
            reviews?: string;
            level?: string;
            rating?: number;
          }) => ({
            id: b.id,
            title: b.title,
            type: "Bootcamp",
            image: b.image,
            description: b.description,
            duration: b.duration,
            reviews: b.reviews,
            level: b.level,
            rating: b.rating,
            path: `/bootcamp/${b.id}`,
          })),
          ...posts.map((p: {
            id: number;
            title: string;
            image?: string;
            description?: string;
          }) => ({
            id: p.id,
            title: p.title,
            type: "Post",
            image: p.image,
            description: p.description,
            path: `/post/${p.id}`,
          })),
        ];

        setItems(formatted.sort(() => Math.random() - 0.5));
      } catch (error) {
        console.error("Gagal mengambil data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-col gap-6">
          {items.map((item) => (
            <ForYouCard key={`${item.type}-${item.id}`} data={item} />
          ))}
        </div>
      </div>
    </div>
  );
}
