"use client";
import * as React from "react";
import { useState } from "react";

export default function AdminPage() {
  const [form, setForm] = useState({
    title: "",
    description: "",
    category: "",
    url: "",
    image: ""
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("등록 기능은 아직 연동되지 않았습니다. 입력 내용: " + JSON.stringify(form, null, 2));
  };

  return (
    <main className="max-w-xl mx-auto p-6 space-y-6">
      <h1 className="text-2xl font-bold text-center">📦 관리자 페이지</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input name="title" placeholder="제품명" className="w-full p-2 border rounded" onChange={handleChange} />
        <input name="description" placeholder="설명" className="w-full p-2 border rounded" onChange={handleChange} />
        <input name="category" placeholder="카테고리" className="w-full p-2 border rounded" onChange={handleChange} />
        <input name="url" placeholder="링크 URL" className="w-full p-2 border rounded" onChange={handleChange} />
        <input name="image" placeholder="이미지 경로 (/product.jpg)" className="w-full p-2 border rounded" onChange={handleChange} />
        <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600">제품 등록</button>
      </form>
    </main>
  );
}
