import * as React from 'react';
import { Card, CardContent } from "./components/ui/card";
import { Button } from "./components/ui/button";
import { motion } from "framer-motion";

const links = [
  {
    id: 1,
    title: "쿠팡 - 내가 실제로 산 전동칫솔",
    description: "3개월째 쓰는 중인데 너무 만족스러워요. 강추!",
    url: "https://link.coupang.com/recommend/toothbrush",
    image: "/toothbrush.jpg",
  },
  {
    id: 2,
    title: "YES24 - 요즘 읽고 있는 책",
    description: "생각이 깊어지는 인문학 책이에요.",
    url: "https://www.yes24.com/product/book",
    image: "/book.jpg",
  },
];

export default function Home() {
  return (
    <main className="max-w-xl mx-auto p-4 space-y-6">
      <h1 className="text-2xl font-semibold">🧑‍💻 OOO의 추천 리스트</h1>
      {links.map((link) => (
        <motion.div
          key={link.id}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <Card className="overflow-hidden">
            <img src={link.image} alt={link.title} className="w-full h-40 object-cover" />
            <CardContent className="space-y-2 py-4">
              <h2 className="text-lg font-medium">{link.title}</h2>
              <p className="text-sm text-gray-600">{link.description}</p>
              <Button asChild>
                <a href={link.url} target="_blank" rel="noopener noreferrer">
                  링크 보기
                </a>
              </Button>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </main>
  );
}
