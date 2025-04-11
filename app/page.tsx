"use client";
import * as React from 'react';
import { useState, useEffect } from 'react';
import { Search, Sun, Moon, Copy } from "lucide-react";
import { Card, CardContent } from './components/ui/card';
import { Button } from './components/ui/button';

const links = [
  {
    id: 1,
    title: '룰루레몬 폼롤러 더블롤러',
    description: '안소희가 사용한 폼롤러',
    category: '운동용품',
    url: 'https://link.coupang.com/a/cn604A',
    image: '/lululemon.jpg',
  },
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

const categories = ['전체', '운동용품'];

export default function Home() {
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('전체');
  const [theme, setTheme] = useState('light');
  const [clickCounts, setClickCounts] = useState({});
  const [copiedLinkId, setCopiedLinkId] = useState<number | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem('theme');
    if (saved === 'dark') {
      document.documentElement.classList.add('dark');
      setTheme('dark');
    }

    const storedCounts = localStorage.getItem('clickCounts');
    if (storedCounts) {
      setClickCounts(JSON.parse(storedCounts));
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    document.documentElement.classList.toggle('dark');
    localStorage.setItem('theme', newTheme);
    setTheme(newTheme);
  };

  const handleClick = (id: number) => {
    const newCounts = { ...clickCounts, [id]: (clickCounts[id] || 0) + 1 };
    setClickCounts(newCounts);
    localStorage.setItem('clickCounts', JSON.stringify(newCounts));
  };

  const handleCopy = async (id: number, url: string) => {
    await navigator.clipboard.writeText(url);
    setCopiedLinkId(id);
    setTimeout(() => setCopiedLinkId(null), 1500);
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

              <div className="flex gap-2 items-center">
                <Button asChild>
                  <a
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => handleClick(link.id)}
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

              <p className="text-xs text-gray-400 mt-1">
                👁️ {clickCounts[link.id] || 0}회 클릭됨
              </p>
            </CardContent>
          </Card>
        </div>
      ))}

      {filteredLinks.length === 0 && (
        <p className="text-sm text-gray-500 text-center mt-4 dark:text-gray-400">검색 결과가 없어요.</p>
      )}
    
      <div className="text-xs text-gray-400 dark:text-gray-500 mt-10 border-t pt-4 border-gray-200 dark:border-gray-700 space-y-2">
        <p className="font-semibold">*활동 시 주의 사항</p>
        <ol className="list-decimal list-inside space-y-1">
          <li>
            게시글 작성 시, 아래 문구를 반드시 기재해 주세요.<br />
            <span className="text-[13px] text-blue-500">"이 포스팅은 쿠팡 파트너스 활동의 일환으로, 이에 따른 일정액의 수수료를 제공받습니다."</span>
          </li>
          <li>
            쿠팡 파트너스의 활동은 공정거래위원회의 심사지침에 따라 추천, 보증인인 파트너스 회원과 당사의 경제적 이해관계에 대하여 공개하여야 합니다.
            자세한 내용은 "도움말 &gt; 자주묻는질문 &gt; 이용문의 &gt; 광고 삽입 시 대가성 문구를 써야하나요?"를 참고해 주세요.
          </li>
          <li>
            바로가기 아이콘 이용 시, 수신자의 사전 동의를 얻지 않은 메신저, SNS 등으로 메시지를 발송하는 행위는
            불법 스팸 전송 행위로 간주되어 규제기관의 행정제재(3천만원 이하의 과태료) 또는 형사 처벌
            (1년 이하의 징역 또는 1천만원 이하의 벌금)의 대상이 될 수 있으니 이 점 유의하시기 바랍니다.
          </li>
        </ol>
      </div>
    </main>

  );
}
