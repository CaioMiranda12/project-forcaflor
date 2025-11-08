import Image from "next/image";
import Link from "next/link";

interface FeaturedPost {
  id: string;
  title: string;
  excerpt: string;
  image: string | null;
  categoryLabel: string;
  categoryColor: string;
  publishDate: string | null;
}

export default function FeaturedNews({ posts }: { posts: FeaturedPost[] }) {
  return (
    <div className="lg:col-span-2">
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">
            Notícias Recentes
          </h2>
        </div>
        <div className="divide-y divide-gray-200">
          {posts.map((post) => (
            <article key={post.id} className="p-6 hover:bg-gray-50 transition-colors duration-200">
              <div className="flex space-x-4">
                {post.image && (
                  <Image
                    src={post.image}
                    alt={post.title}
                    width={80}
                    height={80}
                    className="w-20 h-20 rounded-lg object-cover"
                  />
                )}
                <div className="flex-1 min-w-0">
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    {post.title}
                  </h3>
                  <p className="text-gray-600 text-base mb-2 line-clamp-2">
                    {post.excerpt}
                  </p>
                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <time>
                      {post.publishDate
                        ? new Date(post.publishDate).toLocaleDateString("pt-BR")
                        : "Sem data"}
                    </time>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
        <div className="p-6 border-t border-gray-200">
          <Link href={'/noticias'}>
            <button className="w-full sm:w-auto px-6 py-3 bg-[#E31969] text-white rounded-lg hover:bg-[#c41456] active:bg-[#a01145] disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors duration-200 font-medium cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#E31969] focus:ring-offset-2">
              Ver todas as notícias
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
