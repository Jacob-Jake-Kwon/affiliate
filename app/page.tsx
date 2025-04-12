"use client";
import * as React from "react";
import { useState, useEffect } from "react";
import { Search, Sun, Moon, Copy } from "lucide-react";
import { Card, CardContent } from "./components/ui/card";
import { Button } from "./components/ui/button";

const links = [
  {
    id: 1,
    title: "룰루레몬 폼롤러 더블롤러",
    description: "안소희가 사용한 폼롤러",
    category: "운동용품",
    url: "https://link.coupang.com/a/cn604A",
    image: "/lululemon.jpg",
  },
   {
    id: 2,
    title: '브이라인 마사지기 관리밴드',
    description: '레드벨벳 조이가 사용한 브이라인 마사지기',
    category: '관리용품',
    url: 'https://link.coupang.com/a/cn7FgH',
    image: '/joy_ems.jpg',
  },
  {
    id: 3,
    title: '진해양봉 생로얄제리',
    description: '하지원이 먹은 건강관리 템',
    category: '건강용품',
    url: 'https://link.coupang.com/a/cob3Zs',
    image: '/hajiwon.jpg',
  },
  {
    id: 4,
    title: 'Norda 노다 002 여성 신더',
    description: '레드벨벳 슬기의 등산화',
    category: '운동용품',
    url: 'https://link.coupang.com/a/coddTa',
    image: '/seulgi.jpg',
  }
  
];

const categories = ["전체", "운동용품", '관리용품', '건강용품'];

export default function Home() {
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("전체");
  const [theme, setTheme] = useState("light");
  const [copiedLinkId, setCopiedLinkId] = useState<number | null>(null);
  const [visitCount, setVisitCount] = useState(0);

  useEffect(() => {
    const saved = localStorage.getItem("theme");
    if (saved === "dark") {
      document.documentElement.classList.add("dark");
      setTheme("dark");
    }

    const today = new Date().toISOString().split("T")[0];
    const visitKey = `visit-${today}`;
    const visited = localStorage.getItem(visitKey);
    if (!visited) {
      const count = Number(localStorage.getItem("visit-count") || "0") + 1;
      localStorage.setItem("visit-count", count.toString());
      localStorage.setItem(visitKey, "true");
      setVisitCount(count);
    } else {
      setVisitCount(Number(localStorage.getItem("visit-count")));
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    document.documentElement.classList.toggle("dark");
    localStorage.setItem("theme", newTheme);
    setTheme(newTheme);
  };

  const handleCopy = async (id: number, url: string) => {
    await navigator.clipboard.writeText(url);
    setCopiedLinkId(id);
    setTimeout(() => setCopiedLinkId(null), 1500);
  };

  const filteredLinks = links
    .map((link, i) => ({ ...link, originalIndex: i }))
    .filter(
      (link) =>
        (selectedCategory === "전체" || link.category === selectedCategory) &&
        (link.title.toLowerCase().includes(search.toLowerCase()) ||
          link.description.toLowerCase().includes(search.toLowerCase()) ||
          search === String(link.originalIndex + 1))
    );

  return (
    <main className="max-w-xl mx-auto p-4 space-y-6">
      <div className="flex justify-between items-center">
        <div className="space-y-1">
          <h1 className="text-2xl font-semibold">📌 연예인들의 꿀템 리스트</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400">🤫연예인들의 추천템들만 모았어요</p>
        </div>
        <button onClick={toggleTheme} className="p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-800">
          {theme === "light" ? <Moon size={18} /> : <Sun size={18} />}
        </button>
      </div>

      <div className="relative">
        <input
          type="text"
          placeholder="추천 번호나 제목으로 검색..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full border rounded-full px-10 py-2 text-sm shadow focus:outline-none focus:ring-2 focus:ring-blue-300 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
        />
        <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
      </div>

      <div className="flex justify-center space-x-2">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-4 py-1 rounded-full text-sm border ${
              selectedCategory === cat
                ? "bg-blue-500 text-white border-blue-500"
                : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100 dark:bg-gray-800 dark:text-gray-200 dark:border-gray-600 dark:hover:bg-gray-700"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {filteredLinks.map((link) => (
        <div key={link.id} className="transition hover:scale-[1.01] active:scale-[0.99]">
          <Card className="overflow-hidden rounded-xl shadow-lg hover:bg-gray-50 dark:hover:bg-gray-800 bg-white dark:bg-gray-800 transition">
            <img src={link.image} alt={link.title} className="w-full h-40 object-cover" />
            <CardContent className="space-y-2 py-4">
              <div className="flex items-center space-x-2">
                <span className="text-sm font-bold text-blue-500">#{link.originalIndex + 1}</span>
                <h2 className="text-lg font-medium">{link.title}</h2>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-300">{link.description}</p>
              <p className="text-xs text-gray-400 dark:text-gray-500">
                이 포스팅은 쿠팡 파트너스 활동의 일환으로, 이에 따른 일정액의 수수료를 제공받습니다.
              </p>
              <div className="flex gap-2 items-center">
                <Button asChild>
                  <a
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    링크 보기
                  </a>
                </Button>
                <button
                  onClick={() => handleCopy(link.id, link.url)}
                  className="text-sm px-3 py-2 border rounded hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  {copiedLinkId === link.id ? "복사됨!" : <Copy size={14} />}
                </button>
              </div>
            </CardContent>
          </Card>
        </div>
      ))}

      {filteredLinks.length === 0 && (
        <p className="text-sm text-gray-500 text-center mt-4 dark:text-gray-400">검색 결과가 없어요.</p>
      )}

      <div className="text-center text-xs text-gray-400 dark:text-gray-500 mt-10">
        {/*오늘의 방문자 수: {visitCount}*/}
      </div>
    </main>
  );
}
