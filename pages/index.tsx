import SocialIcon from 'components/SocialIcon';
import Image from 'next/image';
import { parseISO, format } from 'date-fns';
import { HamburgerMenuIcon } from '@radix-ui/react-icons';
import MobileMenu from 'components/MobileMenu';
import { useState } from 'react';
import Sidebar from 'components/Sidebar';

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
      <div className="mx-auto p-5 md:p-10 max-w-4xl">
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
              <div key={post.slug} className="flex flex-col pb-6">
                <time className="text-sm uppercase">
                  {format(parseISO(post.created), 'MMMM dd, yyyy')}
                </time>
                <h2 className="font-medium text-xl pb-1">{post.title}</h2>
                <p className="dark:text-gray-50">{post.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export async function getStaticProps() {
  const posts = [
    {
      title: 'Hello Next.js',
      description: 'This is the content of the first post',
      slug: 'hello-nextjs',
      created: '2020-05-01T00:00:00.000Z',
    },
    {
      title: 'Các cách đơn giản để sử dụng internet an toàn',
      description:
        'Làm sao để không bị mất nick facebook và không mất tiền trong tài khoản ngân hàng.',
      slug: 'safe-internet',
      created: '2021-05-02T00:00:00.000Z',
    },
    {
      title: 'Be authentic với tích xanh trên Github',
      description:
        'Facebook có tính năng “tích xanh” để xác minh rằng một tài khoản là chính chủ. Vậy đối với developer - người chơi hệ code, liệu có tính năng tương tự không?',
      slug: 'tich-xanh2',
      created: '2021-05-03T00:00:00.000Z',
    },
    {
      title: 'Be authentic với tích xanh trên Github',
      description:
        'Facebook có tính năng “tích xanh” để xác minh rằng một tài khoản là chính chủ. Vậy đối với developer - người chơi hệ code, liệu có tính năng tương tự không?',
      slug: 'tich-xanh',
      created: '2021-05-01T00:00:00.000Z',
    },
    {
      title: 'Be authentic với tích xanh trên Github',
      description:
        'Facebook có tính năng “tích xanh” để xác minh rằng một tài khoản là chính chủ. Vậy đối với developer - người chơi hệ code, liệu có tính năng tương tự không?',
      slug: 'tich-xanh',
      created: '2021-05-01T00:00:00.000Z',
    },
    {
      title: 'Be authentic với tích xanh trên Github',
      description:
        'Facebook có tính năng “tích xanh” để xác minh rằng một tài khoản là chính chủ. Vậy đối với developer - người chơi hệ code, liệu có tính năng tương tự không?',
      slug: 'tich-xanh',
      created: '2021-05-01T00:00:00.000Z',
    },
    {
      title: 'Be authentic với tích xanh trên Github',
      description:
        'Facebook có tính năng “tích xanh” để xác minh rằng một tài khoản là chính chủ. Vậy đối với developer - người chơi hệ code, liệu có tính năng tương tự không?',
      slug: 'tich-xanh',
      created: '2021-05-01T00:00:00.000Z',
    },
    {
      title: 'Be authentic với tích xanh trên Github',
      description:
        'Facebook có tính năng “tích xanh” để xác minh rằng một tài khoản là chính chủ. Vậy đối với developer - người chơi hệ code, liệu có tính năng tương tự không?',
      slug: 'tich-xanh',
      created: '2021-05-01T00:00:00.000Z',
    },
    {
      title: 'Be authentic với tích xanh trên Github',
      description:
        'Facebook có tính năng “tích xanh” để xác minh rằng một tài khoản là chính chủ. Vậy đối với developer - người chơi hệ code, liệu có tính năng tương tự không?',
      slug: 'tich-xanh',
      created: '2021-05-01T00:00:00.000Z',
    },
    {
      title: 'Be authentic với tích xanh trên Github',
      description:
        'Facebook có tính năng “tích xanh” để xác minh rằng một tài khoản là chính chủ. Vậy đối với developer - người chơi hệ code, liệu có tính năng tương tự không?',
      slug: 'tich-xanh',
      created: '2021-05-01T00:00:00.000Z',
    },
    {
      title: 'Be authentic với tích xanh trên Github',
      description:
        'Facebook có tính năng “tích xanh” để xác minh rằng một tài khoản là chính chủ. Vậy đối với developer - người chơi hệ code, liệu có tính năng tương tự không?',
      slug: 'tich-xanh',
      created: '2021-05-01T00:00:00.000Z',
    },
    {
      title: 'Be authentic với tích xanh trên Github',
      description:
        'Facebook có tính năng “tích xanh” để xác minh rằng một tài khoản là chính chủ. Vậy đối với developer - người chơi hệ code, liệu có tính năng tương tự không?',
      slug: 'tich-xanh',
      created: '2021-05-01T00:00:00.000Z',
    },
    {
      title: 'Be authentic với tích xanh trên Github',
      description:
        'Facebook có tính năng “tích xanh” để xác minh rằng một tài khoản là chính chủ. Vậy đối với developer - người chơi hệ code, liệu có tính năng tương tự không?',
      slug: 'tich-xanh',
      created: '2021-05-01T00:00:00.000Z',
    },
  ];
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
