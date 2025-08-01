"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { getApiBootcamp } from "../lib/api_bootcamp";

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

// Komponen Card
function BootcampCard({ data }: { data: Bootcamp }) {
  return (
    <div className="w-full bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
      <div className="p-6 pb-4">
        <div className="flex items-start justify-between mb-3">
          <h3 className="text-xl font-semibold text-gray-900 leading-tight">
            {data.title}
          </h3>
          <span className="bg-[#22C55E] text-white px-3 py-1 rounded-full text-xs font-medium ml-4">
            #Bootcamp
          </span>
        </div>
        <p className="text-gray-600 text-sm leading-relaxed mb-4 line-clamp-2">
          {data.skill}
        </p>
      </div>

      <div className="relative px-6">
        <Image
          src={data.preview}
          alt={data.title}
          width={800}
          height={400}
          className="w-full h-48 object-cover rounded-lg"
        />
        <div className="absolute bottom-3 right-3 bg-white bg-opacity-70 text-black px-2 py-1 rounded text-xs font-medium">
          {data.duration}
        </div>
      </div>

      <div className="p-6 pt-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-4 text-sm text-gray-600">
            <span className="font-bold">{data.level}</span>
            <span className="font-bold">{data.review_count} Reviews</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="flex text-yellow-400">
              {"★".repeat(Math.floor(data.rating))}
              {"★".repeat(5 - Math.floor(data.rating)).replace(/★/g, "☆")}
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

export default function BootcampPage() {
  const [bootcamps, setBootcamps] = useState<Bootcamp[]>([]);

  useEffect(() => {
    getApiBootcamp().then(setBootcamps).catch(console.error);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="w-full">
        <div className="grid place-items-center gap-6">
          {bootcamps.map((bootcamp) => (
            <BootcampCard key={bootcamp.id} data={bootcamp} />
          ))}
        </div>
      </div>
    </div>
  );
}
