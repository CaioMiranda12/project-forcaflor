
import React from 'react'
import { Search, Calendar, User, Eye } from 'lucide-react'
import { connectDatabase } from '@/lib/db'
import { Post } from '@/features/posts/models/Post'
import { Category } from '@/features/posts/models/Category'
import NoticiasList from '@/features/noticias/components/NoticiasList'
import { getPublishedPosts } from '@/features/posts/actions/getPosts'

export default async function Noticias() {
  const newsItems = await getPublishedPosts();

  return <NoticiasList initialNews={newsItems} />;
}
