'use client';

import React, { useState } from "react";
import { Search, Calendar, User, Eye, ImageOff, X } from "lucide-react";

interface NewsItem {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  publishDate: string;
  image: string;
  categoryLabel: string;
  categoryColor?: string;
}

export default function NoticiasList({ initialNews }: { initialNews: NewsItem[] }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedNews, setSelectedNews] = useState<NewsItem | null>(null);

  const filteredNews = initialNews.filter(
    (item) =>
      item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.excerpt.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">Notícias</h1>
        <p className="text-lg text-gray-600">
          Fique por dentro das últimas novidades da ONG Força Flor
        </p>
      </div>

      {/* Search */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Buscar notícias..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#E31969] focus:border-[#E31969]"
          />
        </div>
      </div>

      {/* News Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredNews.map((item) => (
          <article
            key={item.id}
            className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow duration-200 cursor-pointer"
            onClick={() => setSelectedNews(item)}
          >
            <div className="relative">
              {item.image ? (
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-48 object-cover"
                />
              ) : (
                <div className="w-full h-48 flex items-center justify-center bg-gray-100 text-gray-400">
                  <ImageOff className="w-10 h-10" />
                </div>
              )}

              <div className="absolute top-4 left-4">
                <span
                  className="px-3 py-1 text-sm font-medium rounded-full text-white"
                  style={{ backgroundColor: item.categoryColor }}
                >
                  {item.categoryLabel}
                </span>
              </div>
            </div>

            <div className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">{item.title}</h3>
              <p className="text-base text-gray-600 mb-4 line-clamp-3">{item.excerpt}</p>

              <div className="flex items-center justify-between text-sm text-gray-500">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center">
                    <User className="w-4 h-4 mr-1" />
                    {item.author}
                  </div>
                  <div className="flex items-center">
                    <Calendar className="w-4 h-4 mr-1" />
                    {new Date(item.publishDate).toLocaleDateString("pt-BR")}
                  </div>
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>

      {filteredNews.length === 0 && (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-12 text-center">
          <h3 className="text-lg font-medium text-gray-900 mb-2">Nenhuma notícia encontrada</h3>
          <p className="text-base text-gray-600">
            Tente ajustar sua busca para encontrar o que procura.
          </p>
        </div>
      )}

      {/* Modal de notícia */}
      {selectedNews && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Overlay */}
          <div
            className="fixed inset-0 bg-black/50"
            onClick={() => setSelectedNews(null)}
          />

          {/* Modal Content */}
          <div className="relative bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              {/* Header */}
              <div className="flex justify-between items-start mb-6">
                <div>
                  <span
                    className="inline-block px-3 py-1 text-sm font-medium rounded-full text-white mb-4"
                    style={{ backgroundColor: selectedNews.categoryColor }}
                  >
                    {selectedNews.categoryLabel}
                  </span>
                  <h2 className="text-2xl font-bold text-gray-900">
                    {selectedNews.title}
                  </h2>
                </div>
                <button
                  onClick={() => setSelectedNews(null)}
                  className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Image */}
              {selectedNews.image ? (
                <img
                  src={selectedNews.image}
                  alt={selectedNews.title}
                  className="w-full h-64 object-contain rounded-lg mb-6"
                />
              ) : (
                <div className="w-full h-64 flex items-center justify-center bg-gray-100 text-gray-400 rounded-lg mb-6">
                  <ImageOff className="w-16 h-16" />
                </div>
              )}

              {/* Meta Info */}
              <div className="flex flex-wrap gap-6 text-sm text-gray-500 mb-6 pb-6 border-b border-gray-200">
                <div className="flex items-center">
                  <User className="w-4 h-4 mr-2" />
                  {selectedNews.author}
                </div>
                <div className="flex items-center">
                  <Calendar className="w-4 h-4 mr-2" />
                  {new Date(selectedNews.publishDate).toLocaleDateString("pt-BR")}
                </div>
              </div>

              {/* Content */}
              <div className="prose prose-gray max-w-none mb-8">
                <p className="text-base text-gray-700 whitespace-pre-line leading-relaxed">
                  {selectedNews.content}
                </p>
              </div>

              {/* Footer */}
              <div className="pt-6 border-t border-gray-200">
                <button
                  onClick={() => setSelectedNews(null)}
                  className="px-6 py-3 bg-[#E31969] text-white rounded-lg hover:bg-[#c41456] transition-colors font-medium cursor-pointer"
                >
                  Fechar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}