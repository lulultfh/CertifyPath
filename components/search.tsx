"use client";
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { FiSearch, FiX } from "react-icons/fi";
import { getApiArticle } from "../lib/api_article";
import { getApiBootcamp } from "../lib/api_bootcamp";
import { getApiPost } from "../lib/api_post";

const trending = [
  "AI",
  "Web Development",
  "UI/UX Design",
  "Cloud Computing",
  "Machine Learning",
];

type SearchResult = {
  id: number;
  title: string;
  type: "Bootcamp" | "Article" | "Post";
  path: string;
};

type Bootcamp = {
  id: number;
  title: string;
};

type Article = {
  id: number;
  title: string;
};

type Post = {
  id: number;
  title: string;
};

export default function Search() {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const [results, setResults] = useState<SearchResult[]>([]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const fetchResults = async () => {
      if (query.length === 0) {
        setResults([]);
        return;
      }

      try {
        const [bootcampData, articleData, postData]: [
          Bootcamp[],
          Article[],
          Post[]
        ] = await Promise.all([
          getApiBootcamp(),
          getApiArticle(),
          getApiPost(),
        ]);

        const filteredBootcamps = bootcampData.filter((item) =>
          item.title?.toLowerCase().includes(query.toLowerCase())
        );
        const filteredArticles = articleData.filter((item) =>
          item.title?.toLowerCase().includes(query.toLowerCase())
        );
        const filteredPosts = postData.filter((item) =>
          item.title?.toLowerCase().includes(query.toLowerCase())
        );

        const combined: SearchResult[] = [
          ...filteredBootcamps.map((item) => ({
            id: item.id,
            title: item.title,
            type: "Bootcamp",
            path: `/bootcamp/${item.id}`,
          } as const)),
          ...filteredArticles.map((item) => ({
            id: item.id,
            title: item.title,
            type: "Article",
            path: `/article/${item.id}`,
          } as const)),
          ...filteredPosts.map((item) => ({
            id: item.id,
            title: item.title,
            type: "Post",
            path: `/post/${item.id}`,
          } as const)),
        ];

        setResults(combined);
      } catch (err) {
        console.error("Error fetching data:", err);
      }
    };

    fetchResults();
  }, [query]);

  return (
    <div ref={containerRef} className="relative w-full">
      <div className="flex items-center bg-gray-100 rounded-full px-4 py-3 shadow-sm focus-within:ring-2 focus-within:ring-blue-300 transition-all">
        <FiSearch className="text-gray-400 mr-3" />
        <input
          ref={inputRef}
          type="text"
          placeholder="Hi! What would you like to learn today?"
          className="bg-transparent flex-1 outline-none text-sm text-gray-700 placeholder:text-gray-400"
          value={query}
          onFocus={() => setShowDropdown(true)}
          onChange={(e) => setQuery(e.target.value)}
        />
        {query && (
          <button
            onClick={() => {
              setQuery("");
              inputRef.current?.focus();
            }}
          >
            <FiX className="text-gray-400 ml-2 hover:text-gray-600" />
          </button>
        )}
      </div>

      {showDropdown && (
        <div className="absolute top-full mt-2 w-full bg-white border border-gray-200 rounded-lg shadow-md z-50">
          {query === "" ? (
            <div className="p-3">
              <p className="text-sm font-semibold text-gray-600 mb-2">
                Trending Searches
              </p>
              <ul className="space-y-1">
                {trending.map((item, i) => (
                  <li
                    key={i}
                    className="px-3 py-1.5 text-sm text-gray-700 hover:bg-gray-100 rounded cursor-pointer"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ) : results.length > 0 ? (
            <ul className="p-2 space-y-1">
              {results.map((item, i) => (
                <li
                  key={i}
                  onClick={() => router.push(item.path)}
                  className="px-3 py-1.5 text-sm text-gray-700 hover:bg-gray-100 rounded cursor-pointer"
                >
                  <span className="font-semibold text-blue-600 mr-2">
                    {item.type}:
                  </span>
                  {item.title}
                </li>
              ))}
            </ul>
          ) : (
            <p className="p-3 text-sm text-gray-500">No results found.</p>
          )}
        </div>
      )}
    </div>
  );
}
