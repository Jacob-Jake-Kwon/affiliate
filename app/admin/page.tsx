"use client";
import * as React from "react";
import { useState, useEffect } from "react";

type Product = {
  id: number;
  title: string;
  description: string;
  category: string;
  url: string;
  image: string;
};

const ADMIN_PASSWORD = "jake1234";

export default function AdminPage() {
  const [isAuthed, setIsAuthed] = useState(false);
  const [inputPassword, setInputPassword] = useState("");

  const [form, setForm] = useState({
    title: "",
    description: "",
    category: "",
    url: "",
    image: ""
  });

  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem("products");
    if (stored) {
      setProducts(JSON.parse(stored));
    }
  }, []);

  useEffect(() => {
    if (isAuthed) {
      localStorage.setItem("products", JSON.stringify(products));
    }
  }, [products, isAuthed]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newProduct = {
      id: Date.now(),
      ...form
    };
    setProducts([...products, newProduct]);
    setForm({ title: "", description: "", category: "", url: "", image: "" });
  };

  const handleDelete = (id: number) => {
    const filtered = products.filter((p) => p.id !== id);
    setProducts(filtered);
  };

  const handleLogin = () => {
    if (inputPassword === ADMIN_PASSWORD) {
      setIsAuthed(true);
    } else {
      alert("비밀번호가 틀렸습니다.");
    }
  };

  if (!isAuthed) {
    return (
      <main className="max-w-sm mx-auto mt-20 space-y-4 text-center">
        <h1 className="text-xl font-bold">🔐 관리자 로그인</h1>
        <input
          type="password"
          placeholder="비밀번호 입력"
          value={inputPassword}
          onChange={(e) => setInputPassword(e.target.value)}
          className="w-full p-2 border rounded"
        />
        <button
          onClick={handleLogin}
          className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
        >
          로그인
        </button>
      </main>
    );
  }

  return (
    <main className="max-w-xl mx-auto p-6 space-y-6">
      <h1 className="text-2xl font-bold text-center">📦 관리자 페이지</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input name="title" placeholder="제품명" value={form.title} className="w-full p-2 border rounded" onChange={handleChange} />
        <input name="description" placeholder="설명" value={form.description} className="w-full p-2 border rounded" onChange={handleChange} />
        <input name="category" placeholder="카테고리" value={form.category} className="w-full p-2 border rounded" onChange={handleChange} />
        <input name="url" placeholder="링크 URL" value={form.url} className="w-full p-2 border rounded" onChange={handleChange} />
        <input name="image" placeholder="이미지 경로 (/product.jpg)" value={form.image} className="w-full p-2 border rounded" onChange={handleChange} />
        <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600">제품 등록</button>
      </form>

      <div className="pt-6 space-y-3">
        <h2 className="text-lg font-semibold">🗂 현재 등록된 제품</h2>
        {products.length === 0 && <p className="text-sm text-gray-500">등록된 제품이 없습니다.</p>}
        {products.map((item, i) => (
          <div key={item.id} className="border p-3 rounded shadow-sm flex justify-between items-center bg-white">
            <div>
              <p className="font-medium">#{i + 1} {item.title}</p>
              <p className="text-xs text-gray-500">{item.description}</p>
            </div>
            <button
              onClick={() => handleDelete(item.id)}
              className="text-sm text-red-500 px-2 py-1 border border-red-400 rounded hover:bg-red-100"
            >
              삭제
            </button>
          </div>
        ))}
      </div>
    </main>
  );
}
