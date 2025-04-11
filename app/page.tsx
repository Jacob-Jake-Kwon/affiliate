"use client";
import * as React from 'react';
import { useState, useEffect } from 'react';
import { Search, Sun, Moon } from "lucide-react";
import { Card, CardContent } from './components/ui/card';
import { Button } from './components/ui/button';

const links = [
  {
    id: 1,
    title: '쿠팡 - 내가 실제로 산 전동칫솔',
    description: '3개월째 쓰는 중인데 너무 만족스러워요. 강추!',
    category: '전자기기',
    url: 'https://link.coupang.com/recommend/toothbrush',
    image: '/toothbrush.jpg',
  },
  {
    id: 2,
    title: 'YES24 - 요즘 읽고 있는 책',
    description: '생각이 깊어지는 인문학 책이에요.',
    category: '책',
    url: 'https://www.yes24.com/product/book',
    image: '/book.jpg',
  },
];

const categories = ['전체', '전자기기', '책'];

export default function Home() {
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('전체');
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    const saved = localStorage.getItem('theme');
    if (saved === 'dark') {
      document.documentElement.classList.add('dark');
      setTheme('dark');
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    document.documentElement.classList.toggle('dark');
    localStorage.setItem('theme', newTheme);
    setTheme(newTheme);
  };

  const filteredLinks = links
    .map((link, i) => ({ ...link, originalIndex: i }))
    .filter((link) =>
      (selectedCategory === '전체' || link.category === selectedCategory) &&
      (
        link.title.toLowerCase().includes(search.toLowerCase()) ||
        link.description.toLowerCase().includes(search.toLowerCase()) ||
        search === String(link.originalIndex + 1)
      )
    );

  return (
    <main className="max-w-xl mx-auto p-4 space-y-6">
      <div className="flex justify-between items-center">
        <div className="space-y-1">
          <h1 className="text-2xl font-semibold">📌 Jake의 추천 리스트</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400">진짜 써보고 괜찮았던 것만 모았어요</p>
        </div>
        <button onClick={toggleTheme} className="p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-800">
          {theme === 'light' ? <Moon size={18} /> : <Sun size={18} />}
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
                ? 'bg-blue-500 text-white border-blue-500'
                : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-100 dark:bg-gray-800 dark:text-gray-200 dark:border-gray-600 dark:hover:bg-gray-700'
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
              <Button asChild>
                <a href={link.url} target="_blank" rel="noopener noreferrer">
                  링크 보기
                </a>
              </Button>
            </CardContent>
          </Card>
        </div>
      ))}

      {filteredLinks.length === 0 && (
        <p className="text-sm text-gray-500 text-center mt-4 dark:text-gray-400">검색 결과가 없어요.</p>
      )}
    </main>
  );
}
