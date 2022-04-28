import matter from 'gray-matter';
import { GetStaticProps, GetStaticPaths, GetStaticPropsContext } from 'next';
import { ParsedUrlQuery } from 'querystring';
import { postFilePath } from 'utils/mdx';
import fs from 'fs';
import path from 'path';
import { POSTS_PATH } from 'utils/mdx';
import { MDXRemote } from 'next-mdx-remote';
import { serialize } from 'next-mdx-remote/serialize';
import Image from 'next/image';

interface Params extends ParsedUrlQuery {
  slug: string;
}

interface PostData {
  source: any;
  frontMatter: any;
}

const components = {
  Image: Image,
};

export default function Post({ source, frontMatter }: PostData) {
  console.log({ source, frontMatter });
  return (
    <div className="max-w-2xl mx-5 md:mx-auto ">
      <article className="prose lg:prose-lg">
        <MDXRemote {...source} components={components} />
      </article>
    </div>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = postFilePath
    .map((path) => `${path.replace(/\.mdx$/, '')}`)
    .map((slug) => ({
      params: { slug },
    }));
  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const slug = params!.slug as string;
  const postFilePath = path.join(POSTS_PATH, `${slug}.mdx`);
  console.log('postFilePath', postFilePath);
  const source = fs.readFileSync(postFilePath, 'utf8');
  const { data, content } = matter(source);

  const mdxSource = await serialize(content, {
    mdxOptions: {
      remarkPlugins: [],
      rehypePlugins: [],
    },
    scope: data,
  });

  return {
    props: {
      source: mdxSource,
      frontMatter: data,
    }, // will be passed to the page component as props
  };
};
