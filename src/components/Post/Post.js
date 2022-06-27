// @flow strict
import React from 'react';
import { Link } from 'gatsby';
import Author from './Author';
import Comments from './Comments';
import Content from './Content';
import Meta from './Meta';
import Tags from './Tags';
import styles from './Post.module.scss';
import type { Node } from '../../types';

type Props = {
  post: Node
};


function getGitMarkdownUrl(absolutePath) {
  const gitURL = 'https://github.com/nvh95/hung.dev/edit/develop';
  const sliceIndex = absolutePath.indexOf('/content');
  const markdownFileGitPath = absolutePath.slice(sliceIndex);
  const blogPostOnGit = `${gitURL}${markdownFileGitPath}`;
  return blogPostOnGit;
}

const Post = ({ post }: Props) => {
  const { html } = post;
  const { tagSlugs, slug } = post.fields;
  const { tags, title, date } = post.frontmatter;

  return (
    <div className={styles['post']}>
      <Link className={styles['post__home-button']} to="/">All Articles</Link>

      <div className={styles['post__content']}>
        <Content body={html} title={title} />
      </div>

      <div className={styles['post__footer']}>
        <Meta date={date} />
        {tags && tagSlugs && <Tags tags={tags} tagSlugs={tagSlugs} />}
        <a href={getGitMarkdownUrl(post.fileAbsolutePath)} target="_blank" rel="noopener noreferrer">📝 Edit this post on GitHub</a>
        <Author />
      </div>

      <div className={styles['post__comments']}>
        <Comments postSlug={slug} postTitle={post.frontmatter.title} />
      </div>
    </div>
  );
};

export default Post;
