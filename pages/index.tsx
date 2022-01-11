import SocialIcon from 'components/SocialIcon';
import Image from 'next/image';
import { parseISO, format } from 'date-fns';
import { HamburgerMenuIcon } from '@radix-ui/react-icons';
import MobileMenu from 'components/MobileMenu';
import { useState } from 'react';
import Sidebar from 'components/Sidebar';
import { postFilePath, POSTS_PATH } from 'utils/mdx';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import Link from 'next/link';

interface Post {
  title: string;
  description: string;
  slug: string;
  created: string;
}

export default function HomePage({ posts }: { posts: Post[] }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="min-h-full bg-gray-50 dark:bg-zinc-800 text-black dark:text-white">
      <div className="mx-auto p-5 md:p-10 max-w-7xl">
        {/* Header */}
        <div>
          <button
            className="p-5 mb-5 md:hidden px-5 -mx-5"
            onClick={() => setIsOpen(true)}
          >
            <HamburgerMenuIcon />
          </button>
          <MobileMenu
            open={isOpen}
            onOpenChange={(open: boolean) => setIsOpen(open)}
          />
        </div>
        <div className="flex">
          {/* Sidebar */}
          <Sidebar />
          {/* Blog Posts */}
          <div className="flex flex-col">
            {posts.map((post) => (
              <Link href={`/blog/${post.slug}`}>
                <a>
                  <div key={post.slug} className="flex flex-col pb-6">
                    <time className="text-sm uppercase">
                      {format(parseISO(post.created), 'MMMM dd, yyyy')}
                    </time>
                    <h2 className="font-medium text-xl pb-1">{post.title}</h2>
                    <p className="dark:text-gray-50">{post.description}</p>
                  </div>
                </a>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export async function getStaticProps() {
  const posts = postFilePath.map((filePath) => {
    const source = fs.readFileSync(path.join(POSTS_PATH, filePath), 'utf8');
    const {
      data: { title, description, slug, created },
    } = matter(source);
    return {
      title,
      description,
      slug,
      created,
    };
  });
  posts.sort((a, b) => {
    return Number(
      new Date(b.created).getTime() - new Date(a.created).getTime(),
    );
  });

  return {
    props: {
      posts,
    },
  };
}
