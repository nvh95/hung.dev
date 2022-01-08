import SocialIcon from 'components/SocialIcon';
import Image from 'next/image';
import { parseISO, format } from 'date-fns';

interface Post {
  title: string;
  description: string;
  slug: string;
  created: string;
}

export default function HomePage({ posts }: { posts: Post[] }) {
  return (
    <div className="bg-gray-50 dark:bg-zinc-800 text-black dark:text-white">
      <div className="flex mx-auto p-10 max-w-4xl">
        {/* Sidebar */}
        <div className="md:flex flex-col self-start sticky top-10 pr-10 hidden">
          <Image
            className="shrink-0 rounded-full"
            src="/photo.gif"
            alt="avatar"
            layout="fixed"
            width={75}
            height={75}
          />
          <h1 className="font-bold text-lg py-4">Hung.Dev</h1>
          <p className="pb-4 text-gray-600 dark:text-gray-400">
            Software Engineer. Amateur Triathlete
          </p>

          <nav>
            <ul className="flex flex-col gap-3 py-4">
              <li>Blogs</li>
              <li>About me</li>
              <li>Contact me</li>
              <li>Wordpress Blog</li>
            </ul>
          </nav>
          <ul className="flex gap-2 py-4">
            <SocialIcon name="twitter" url="https://www.twitter.com/hung_dev" />
            <SocialIcon name="github" url="https://github.com/nvh95" />
            <SocialIcon
              name="linkedin"
              url="https://www.linkedin.com/in/nvh95"
            />
            <SocialIcon name="facebook" url="https://www.facebook.com/nvh95" />
          </ul>
        </div>
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
